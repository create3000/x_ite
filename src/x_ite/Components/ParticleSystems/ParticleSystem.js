import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DShapeNode         from "../Shape/X3DShapeNode.js";
import ParticleSampler      from "../../Browser/ParticleSystems/ParticleSampler.js";
import GeometryContext      from "../../Browser/Rendering/GeometryContext.js";
import GeometryType         from "../../Browser/Shape/GeometryType.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import AlphaMode            from "../../Browser/Shape/AlphaMode.js";
import LineSet              from "../Rendering/LineSet.js";
import Coordinate           from "../Rendering/Coordinate.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Matrix3              from "../../../standard/Math/Numbers/Matrix3.js";
import BVH                  from "../../../standard/Math/Utility/BVH.js";

const PointGeometry = new Float32Array ([0, 0, 0, 1]);

// p4 ------ p3
// |       / |
// |     /   |
// |   /     |
// | /       |
// p1 ------ p2

const QuadGeometry = new Float32Array ([
   // TexCoords
   0, 0, 0, 1,
   1, 0, 0, 1,
   1, 1, 0, 1,
   0, 0, 0, 1,
   1, 1, 0, 1,
   0, 1, 0, 1,
   // Normal
   0, 0, 1,
   // Vertices
   -0.5, -0.5, 0, 1,
    0.5, -0.5, 0, 1,
    0.5,  0.5, 0, 1,
   -0.5, -0.5, 0, 1,
    0.5,  0.5, 0, 1,
   -0.5,  0.5, 0, 1,
]);

function ParticleSystem (executionContext)
{
   X3DShapeNode .call (this, executionContext);

   this .addType (X3DConstants .ParticleSystem);

   // Units

   this ._particleSize .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this .addAlias ("colorRamp",    this ._color);
      this .addAlias ("texCoordRamp", this ._texCoord);
   }

   // Private properties

   const browser = this .getBrowser ();

   this .maxParticles             = 0;
   this .numParticles             = 0;
   this .samplers                 = new Set ();
   this .forcePhysicsModelNodes   = [ ];
   this .forces                   = new Float32Array (4);
   this .boundedPhysicsModelNodes = [ ];
   this .boundedNormals           = [ ];
   this .boundedVertices          = [ ];
   this .colorRamp                = new Float32Array ();
   this .texCoordRamp             = new Float32Array ();
   this .scaleRamp                = new Float32Array ();
   this .geometryContext          = new GeometryContext ({ textureCoordinateNode: browser .getDefaultTextureCoordinate () });
   this .creationTime             = 0;
   this .pauseTime                = 0;
   this .deltaTime                = 0;
   this .particlesStride          = Float32Array .BYTES_PER_ELEMENT * 7 * 4; // 7 x vec4
   this .particleOffsets          = Array .from ({length: 7}, (_, i) => Float32Array .BYTES_PER_ELEMENT * 4 * i); // i x vec4
   this .particleOffset           = this .particleOffsets [0];
   this .colorOffset              = this .particleOffsets [1];
   this .velocityOffset           = this .particleOffsets [2];
   this .matrixOffset             = this .particleOffsets [3];
   this .texCoordOffset           = 0;
   this .instancesStride          = this .particlesStride;
}

Object .assign (Object .setPrototypeOf (ParticleSystem .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Connect fields.

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled           .addInterest ("set_enabled__",           this);
      this ._geometryType      .addInterest ("set_geometryType__",      this);
      this ._geometryType      .addInterest ("set_texCoord__",          this);
      this ._maxParticles      .addInterest ("set_enabled__",           this);
      this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
      this ._particleLifetime  .addInterest ("set_bbox__",              this);
      this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
      this ._lifetimeVariation .addInterest ("set_bbox__",              this);
      this ._particleSize      .addInterest ("set_particleSize__",      this);
      this ._emitter           .addInterest ("set_emitter__",           this);
      this ._emitter           .addInterest ("set_bbox__",              this);
      this ._physics           .addInterest ("set_physics__",           this);
      this ._colorKey          .addInterest ("set_color__",             this);
      this ._color             .addInterest ("set_colorRamp__",         this);
      this ._texCoordKey       .addInterest ("set_texCoord__",          this);
      this ._texCoord          .addInterest ("set_texCoordRamp__",      this);
      this ._scaleKey          .addInterest ("set_scale__",              this);
      this ._scale             .addInterest ("set_scaleRamp__",          this);

      // Create particles stuff.

      this .inputParticles = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new VertexArray (gl),
         thickLinesVertexArrayObject: new VertexArray (gl),
      });

      this .outputParticles = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new VertexArray (gl),
         thickLinesVertexArrayObject: new VertexArray (gl),
      });

      // Create textures for forces, colors, texCoords, scales.

      this .boundedTexture = this .createTexture ();

      for (const symbol of Object .values (ParticleSampler))
         this [symbol] = this .createTexture ();

      // Create GL stuff.

      this .geometryBuffer  = this .createBuffer ();
      this .texCoordBuffers = new Array (browser .getMaxTexCoords ()) .fill (this .geometryBuffer);

      // Create geometry for LINE geometryType.

      this .lineGeometryNode   = new LineSet (this .getExecutionContext ());
      this .lineCoordinateNode = new Coordinate (this .getExecutionContext ());

      this .lineCoordinateNode ._point = [0, 0, -0.5,   0, 0, 0.5];

      this .lineGeometryNode ._vertexCount = [2];
      this .lineGeometryNode ._coord       = this .lineCoordinateNode;

      this .lineCoordinateNode .setup ();
      this .lineGeometryNode   .setup ();

      // Init fields.
      // Call order is very important at startup.

      this .set_emitter__ ();
      this .set_enabled__ ();
      this .set_geometryType__ ();
      this .set_particleLifetime__ ();
      this .set_lifetimeVariation__ ();
      this .set_particleSize__ ();
      this .set_physics__ ();
      this .set_colorRamp__ ();
      this .set_texCoordRamp__ ();
      this .set_scaleRamp__ ();
      this .set_bbox__ ();
   },
   getShapeKey ()
   {
      return this .numTexCoords ? 2 : 1;
   },
   getGeometryContext ()
   {
      switch (this .geometryType)
      {
         case GeometryType .GEOMETRY:
            return this .getGeometry ();
         default:
            return this .geometryContext;
      }
   },
   getGeometryType ()
   {
      return this .geometryType;
   },
   getNumInstances ()
   {
      return this .numParticles;
   },
   getInstances ()
   {
      return this .outputParticles;
   },
   set_bbox__ ()
   {
      if (this .isDefaultBBoxSize ())
      {
         if (this .boundedPhysicsModelNodes .length)
         {
            this .bbox .set ();

            for (const boundedPhysicsModelNode of this .boundedPhysicsModelNodes)
            {
               const bbox = boundedPhysicsModelNode .getBBox ();

               if (bbox)
                  this .bbox .add (bbox);
            }
         }
         else
         {
            this .emitterNode ?.getBBox (this .bbox, this);
         }
      }
      else
      {
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_transparent__ ()
   {
      const alphaMode = this .appearanceNode .getAlphaMode ();

      if (alphaMode === AlphaMode .AUTO)
      {
         this .setTransparent (this .getAppearance () .isTransparent () ||
                               this .colorRampNode ?.isTransparent () ||
                               (this .geometryType === GeometryType .GEOMETRY &&
                                this .geometryNode ?.isTransparent ()));

         this .setAlphaMode (this .isTransparent () ? AlphaMode .BLEND : AlphaMode .OPAQUE);
      }
      else
      {
         this .setTransparent (alphaMode === AlphaMode .BLEND);
         this .setAlphaMode (alphaMode);
      }
   },
   set_live__ ()
   {
      if (this .getLive () .getValue ())
      {
         if (this ._isActive .getValue () && this ._maxParticles .getValue ())
         {
            this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

            if (this .pauseTime)
            {
               this .creationTime += Date .now () / 1000 - this .pauseTime;
               this .pauseTime     = 0;
            }
         }
      }
      else
      {
         if (this ._isActive .getValue () && this ._maxParticles .getValue ())
         {
            this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

            if (this .pauseTime === 0)
               this .pauseTime = Date .now () / 1000;
         }
      }
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue () && this ._maxParticles .getValue ())
      {
         if (!this ._isActive .getValue ())
         {
            if (this .getLive () .getValue ())
            {
               this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

               this .pauseTime = 0;
            }
            else
            {
               this .pauseTime = Date .now () / 1000;
            }

            this ._isActive = true;

            delete this .traverse;
         }
      }
      else
      {
         if (this ._isActive .getValue ())
         {
            if (this .getLive () .getValue ())
               this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

            this ._isActive = false;

            this .numParticles = 0;
            this .traverse     = Function .prototype;
         }
      }

      this .set_maxParticles__ ();
   },
   set_geometryType__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Get geometryType.

      this .geometryType = GeometryType .get (this ._geometryType .getValue ()) ?? GeometryType .QUAD;

      // Create buffers.

      switch (this .geometryType)
      {
         case GeometryType .POINT:
         {
            this .geometryContext .geometryType = 0;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount  = 0;
            this .vertexCount    = 1;
            this .hasNormals     = false;
            this .verticesOffset = 0;
            this .primitiveMode  = gl .POINTS;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, PointGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case GeometryType .LINE:
         {
            this .geometryContext .geometryType = 1;
            this .geometryContext .hasNormals   = false;

            this .texCoordCount = 0;
            break;
         }
         case GeometryType .TRIANGLE:
         case GeometryType .QUAD:
         case GeometryType .SPRITE:
         {
            this .geometryContext .geometryType = 2;
            this .geometryContext .hasNormals   = true;

            this .texCoordCount   = 4;
            this .vertexCount     = 6;
            this .hasNormals      = true;
            this .texCoordsOffset = 0;
            this .normalOffset    = Float32Array .BYTES_PER_ELEMENT * 24;
            this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 27;
            this .primitiveMode   = gl .TRIANGLES;

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

            break;
         }
         case GeometryType .GEOMETRY:
         {
            this .texCoordCount = 0;
            break;
         }
      }

      this .geometryContext .updateGeometryKey ();
      this .updateVertexArrays ();

      this .set_objects__ ();
   },
   set_maxParticles__ ()
   {
      const
         lastNumParticles = this .numParticles,
         maxParticles     = Math .max (0, this ._maxParticles .getValue ());

      this .maxParticles = maxParticles;
      this .numParticles = Math .min (lastNumParticles, maxParticles);

      if (!this .emitterNode .isExplosive ())
         this .creationTime = Date .now () / 1000;

      this .resizeBuffers (lastNumParticles);
      this .updateVertexArrays ();

      this .set_objects__ ();
   },
   set_particleLifetime__ ()
   {
      this .particleLifetime = Math .max (this ._particleLifetime .getValue (), 0);
   },
   set_lifetimeVariation__ ()
   {
      this .lifetimeVariation = Math .max (this ._lifetimeVariation .getValue (), 0);
   },
   set_particleSize__ ()
   {
      this .lineCoordinateNode ._point [0] .z = -this ._particleSize .y / 2;
      this .lineCoordinateNode ._point [1] .z = +this ._particleSize .y / 2;
   },
   set_emitter__ ()
   {
      this .emitterNode ?._bbox_changed .removeInterest ("set_bbox__", this);

      this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this ._emitter)
         ?? this .getBrowser () .getDefaultEmitter ();

      this .emitterNode ._bbox_changed .addInterest ("set_bbox__", this);
   },
   set_physics__ ()
   {
      const
         physics                  = this ._physics .getValue (),
         forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
         boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

      for (const boundedPhysicsModelNode of boundedPhysicsModelNodes)
      {
         boundedPhysicsModelNode .removeInterest ("set_boundedPhysics__", this);
         boundedPhysicsModelNode .removeInterest ("set_bbox__",           this);
      }

      forcePhysicsModelNodes   .length = 0;
      boundedPhysicsModelNodes .length = 0;

      for (let i = 0, length = physics .length; i < length; ++ i)
      {
         try
         {
            const
               innerNode = physics [i] .getValue () .getInnerNode (),
               type      = innerNode .getType ();

            for (let t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .ForcePhysicsModel:
                  case X3DConstants .WindPhysicsModel:
                  {
                     forcePhysicsModelNodes .push (innerNode);
                     break;
                  }
                  case X3DConstants .BoundedPhysicsModel:
                  {
                     boundedPhysicsModelNodes .push (innerNode);
                     break;
                  }
                  default:
                     continue;
               }

               break;
            }
         }
         catch
         { }
      }

      for (const boundedPhysicsModelNode of boundedPhysicsModelNodes)
      {
         boundedPhysicsModelNode .addInterest ("set_boundedPhysics__", this);
         boundedPhysicsModelNode .addInterest ("set_bbox__",           this);
      }

      this .set_boundedPhysics__ ();
   },
   set_boundedPhysics__ ()
   {
      const
         gl                       = this .getBrowser () .getContext (),
         boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
         boundedNormals           = this .boundedNormals,
         boundedVertices          = this .boundedVertices;

      boundedNormals  .length = 0;
      boundedVertices .length = 0;

      for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
      {
         boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
      }

      // Texture

      const
         boundedHierarchy       = new BVH (boundedVertices, boundedNormals) .toArray ([ ]),
         numBoundedVertices     = boundedVertices .length / 4,
         numBoundedNormals      = boundedNormals .length / 3,
         boundedHierarchyLength = boundedHierarchy .length / 4,
         boundedArraySize       = Math .ceil (Math .sqrt (numBoundedVertices + numBoundedNormals + boundedHierarchyLength)),
         boundedArray           = new Float32Array (boundedArraySize * boundedArraySize * 4);

      this .boundedVerticesIndex  = 0;
      this .boundedNormalsIndex   = numBoundedVertices;
      this .boundedHierarchyIndex = this .boundedNormalsIndex + numBoundedNormals;
      this .boundedHierarchyRoot  = this .boundedHierarchyIndex + boundedHierarchyLength - 1;

      boundedArray .set (boundedVertices);

      for (let s = this .boundedNormalsIndex * 4, n = 0, l = boundedNormals .length; n < l; s += 4, n += 3)
      {
         boundedArray [s + 0] = boundedNormals [n + 0];
         boundedArray [s + 1] = boundedNormals [n + 1];
         boundedArray [s + 2] = boundedNormals [n + 2];
      }

      boundedArray .set (boundedHierarchy, this .boundedHierarchyIndex * 4);

      if (boundedArraySize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this .boundedTexture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedArraySize, boundedArraySize, 0, gl .RGBA, gl .FLOAT, boundedArray);
      }
   },
   set_colorRamp__ ()
   {
      this .colorRampNode ?.removeInterest ("set_color__", this);

      this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorRampNode ?.addInterest ("set_color__", this);

      this .set_color__ ();
      this .set_transparent__ ();
   },
   set_color__ ()
   {
      const
         gl          = this .getBrowser () .getContext (),
         key         = this ._colorKey,
         numKeys     = key .length,
         textureSize = Math .ceil (Math .sqrt (numKeys * 2));

      let ramp = this .colorRamp;

      if (textureSize * textureSize * 4 > ramp .length)
         ramp = this .colorRamp = new Float32Array (textureSize * textureSize * 4);

      for (let i = 0; i < numKeys; ++ i)
         ramp [i * 4] = key [i];

      if (this .colorRampNode)
         ramp .set (this .colorRampNode .addColors ([ ], numKeys) .slice (0, numKeys * 4), numKeys * 4);
      else
         ramp .fill (1, numKeys * 4);

      if (textureSize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this [ParticleSampler .colors]);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, ramp);
      }

      this .numColors                      = numKeys;
      this .geometryContext .colorMaterial = !! (numKeys && this .colorRampNode);

      if (numKeys)
         this .samplers .add (ParticleSampler .colors);
      else
         this .samplers .delete (ParticleSampler .colors);

      this .geometryContext .updateGeometryKey ();
      this .updateVertexArrays ();
   },
   set_texCoordRamp__ ()
   {
      this .texCoordRampNode ?.removeInterest ("set_texCoord__", this);

      this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordRampNode ?.addInterest ("set_texCoord__", this);

      this .set_texCoord__ ();
   },
   set_texCoord__ ()
   {
      const
         gl          = this .getBrowser () .getContext (),
         key         = this ._texCoordKey,
         numKeys     = key .length,
         textureSize = Math .ceil (Math .sqrt (numKeys + numKeys * this .texCoordCount));

      let ramp = this .texCoordRamp;

      if (textureSize * textureSize * 4 > ramp .length)
         ramp = this .texCoordRamp = new Float32Array (textureSize * textureSize * 4);
      else
         ramp .fill (0);

      for (let i = 0; i < numKeys; ++ i)
         ramp [i * 4] = key [i];

      if (this .texCoordRampNode)
         ramp .set (this .texCoordRampNode .addPoints ([ ]) .slice (0, numKeys * this .texCoordCount * 4), numKeys * 4);

      if (textureSize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this [ParticleSampler .texCoords]);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, ramp);
      }

      this .numTexCoords = this .texCoordRampNode ? numKeys : 0;

      if (numKeys)
         this .samplers .add (ParticleSampler .texCoords);
      else
         this .samplers .delete (ParticleSampler .texCoords);

      this .updateVertexArrays ();
   },
   set_scaleRamp__ ()
   {
      this .scaleRampNode ?.removeInterest ("set_scale__", this);

      this .scaleRampNode = X3DCast (X3DConstants .Coordinate, this ._scale);

      this .scaleRampNode ?.addInterest ("set_scale__", this);

      this .set_scale__ ();
   },
   set_scale__ ()
   {
      const
         gl           = this .getBrowser () .getContext (),
         key          = this ._scaleKey,
         numKeys      = key .length,
         textureSize  = Math .ceil (Math .sqrt (numKeys * 2)); // keys + values

      let ramp = this .scaleRamp;

      if (textureSize * textureSize * 4 > ramp .length)
         ramp = this .scaleRamp = new Float32Array (textureSize * textureSize * 4);
      else
         ramp .fill (0);

      for (let i = 0; i < numKeys; ++ i)
         ramp [i * 4] = key [i];

      if (this .scaleRampNode)
         ramp .set (this .scaleRampNode .addPoints ([ ], numKeys) .slice (0, numKeys * 4), numKeys * 4);
      else
         ramp .fill (1, numKeys * 4);

      if (textureSize)
      {
         gl .bindTexture (gl .TEXTURE_2D, this [ParticleSampler .scales]);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, ramp);
      }

      this .numScales = numKeys;

      if (numKeys)
         this .samplers .add (ParticleSampler .scales);
      else
         this .samplers .delete (ParticleSampler .scales);

      this .updateVertexArrays ();
   },
   updateVertexArrays ()
   {
      this .inputParticles  .vertexArrayObject .update ();
      this .outputParticles .vertexArrayObject .update ();

      this .inputParticles  .thickLinesVertexArrayObject .update ();
      this .outputParticles .thickLinesVertexArrayObject .update ();
   },
   createTexture ()
   {
      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

      return texture;
   },
   createBuffer ()
   {
      const
         gl     = this .getBrowser () .getContext (),
         buffer = gl .createBuffer ();

      gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
      gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (), gl .DYNAMIC_DRAW);

      return buffer;
   },
   resizeBuffers (lastNumParticles)
   {
      const
         gl              = this .getBrowser () .getContext (),
         maxParticles    = this .maxParticles,
         particlesStride = this .particlesStride,
         outputParticles = Object .assign (gl .createBuffer (), this .outputParticles),
         data            = new Uint8Array (maxParticles * particlesStride);

      // Resize input buffer.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .inputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      // Resize output buffer.

      gl .bindBuffer (gl .COPY_READ_BUFFER, this .outputParticles);
      gl .bindBuffer (gl .ARRAY_BUFFER, outputParticles);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
      gl .copyBufferSubData (gl .COPY_READ_BUFFER, gl .ARRAY_BUFFER, 0, 0, Math .min (maxParticles * particlesStride, lastNumParticles * particlesStride));
      gl .deleteBuffer (this .outputParticles);

      this .outputParticles = outputParticles;
   },
   animateParticles ()
   {
      const
         browser     = this .getBrowser (),
         gl          = browser .getContext (),
         emitterNode = this .emitterNode;

      // Determine delta time

      const
         DELAY = 15, // Delay in frames when dt fully applies.
         dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

      // let deltaTime is only for the emitter, this.deltaTime is for the forces.
      let deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

      // Determine numParticles

      if (emitterNode .isExplosive ())
      {
         const
            now              = Date .now () / 1000,
            particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

         if (now - this .creationTime > particleLifetime)
         {
            this .creationTime    = now;
            this .numParticles    = this .maxParticles;
            this .createParticles = this ._createParticles .getValue ();

            deltaTime = Number .POSITIVE_INFINITY;

            this .set_objects__ ();
         }
         else
         {
            this .createParticles = false;
         }
      }
      else
      {
         this .createParticles = this ._createParticles .getValue ();

         if (this .numParticles < this .maxParticles)
         {
            const
               now          = Date .now () / 1000,
               newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

            if (newParticles)
               this .creationTime = now;

            this .numParticles = Math .min (this .maxParticles, this .numParticles + newParticles);

            this .set_objects__ ();
         }
      }

      // Apply forces.

      if (emitterNode .getMass ())
      {
         const forcePhysicsModelNodes = this .forcePhysicsModelNodes;

         let
            numForces  = forcePhysicsModelNodes .length,
            forces     = this .forces,
            timeByMass = deltaTime / emitterNode .getMass ();

         // Collect forces in velocities and collect turbulences.

         if (numForces * 4 > forces .length)
            forces = this .forces = new Float32Array (numForces * 4);

         let disabledForces = 0;

         for (let i = 0; i < numForces; ++ i)
         {
            disabledForces += !forcePhysicsModelNodes [i] .addForce (i - disabledForces, emitterNode, timeByMass, forces);
         }

         this .numForces = numForces -= disabledForces;

         if (numForces)
         {
            gl .bindTexture (gl .TEXTURE_2D, this [ParticleSampler .forces]);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, numForces, 1, 0, gl .RGBA, gl .FLOAT, forces);

            this .samplers .add (ParticleSampler .forces);
         }
         else
         {
            this .samplers .delete (ParticleSampler .forces);
         }
      }
      else
      {
         this .numForces = 0;

         this .samplers .delete (ParticleSampler .forces);
      }

      // Swap buffers.

      const inputParticles  = this .outputParticles;
      this .outputParticles = this .inputParticles;
      this .inputParticles  = inputParticles;

      // Determine particle position, velocity and colors.

      emitterNode .animate (this, deltaTime);

      browser .addBrowserEvent ();
   },
   updateSprite: (() =>
   {
      const data = new Float32Array (QuadGeometry);

      const quad = [
         new Vector3 (-0.5, -0.5, 0),
         new Vector3 ( 0.5, -0.5, 0),
         new Vector3 ( 0.5,  0.5, 0),
         new Vector3 (-0.5, -0.5, 0),
         new Vector3 ( 0.5,  0.5, 0),
         new Vector3 (-0.5,  0.5, 0),
      ];

      const
         vertex = new Vector3 (),
         size   = new Vector3 ();

      return function (gl, rotation)
      {
         // Normal

         for (let i = 0; i < 3; ++ i)
            data [24 + i] = rotation [6 + i];

         // Vertices

         size .set (this ._particleSize .x, this ._particleSize .y, 1);

         for (let i = 0; i < 6; ++ i)
         {
            const index = 27 + i * 4;

            rotation .multVecMatrix (vertex .assign (quad [i]) .multVec (size))

            data [index + 0] = vertex .x;
            data [index + 1] = vertex .y;
            data [index + 2] = vertex .z;
         }

         gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
      };
   })(),
   displaySimple (gl, renderContext, shaderNode)
   {
      // Display geometry.

      switch (this .geometryType)
      {
         case GeometryType .LINE:
         {
            this .lineGeometryNode .displaySimpleInstanced (gl, shaderNode, this);
            break;
         }
         case GeometryType .GEOMETRY:
         {
            this .getGeometry () .displaySimpleInstanced (gl, shaderNode, this);
            break;
         }
         case GeometryType .SPRITE:
         {
            this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
            // Proceed with next case:
         }
         default:
         {
            const outputParticles = this .outputParticles;

            if (outputParticles .vertexArrayObject .enable (shaderNode .getProgram ()))
            {
               const particlesStride = this .particlesStride;

               shaderNode .enableParticleAttribute       (gl, outputParticles, particlesStride, this .particleOffset, 1);
               shaderNode .enableInstanceMatrixAttribute (gl, outputParticles, particlesStride, this .matrixOffset,   1);
               shaderNode .enableVertexAttribute         (gl, this .geometryBuffer, 0, this .verticesOffset);
            }

            gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);
            break;
         }
      }
   },
   display (gl, renderContext)
   {
      // Display geometry.

      switch (this .geometryType)
      {
         case GeometryType .LINE:
         {
            this .lineGeometryNode .displayInstanced (gl, renderContext, this);
            break;
         }
         case GeometryType .GEOMETRY:
         {
            this .getGeometry () .displayInstanced (gl, renderContext, this);
            break;
         }
         case GeometryType .SPRITE:
         {
            this .updateSprite (gl, this .getScreenAlignedRotation (renderContext .modelViewMatrix));
            // Proceed with next case:
         }
         case GeometryType .QUAD:
         case GeometryType .TRIANGLE:
         {
            const positiveScale = Matrix4 .prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

            gl .frontFace (positiveScale ? gl .CCW : gl .CW);
            gl .enable (gl .CULL_FACE);

            // Proceed with next case:
         }
         default:
         {
            const
               viewport        = renderContext .viewport,
               browser         = this .getBrowser (),
               appearanceNode  = this .getAppearance (),
               renderModeNodes = appearanceNode .getRenderModes (),
               shaderNode      = appearanceNode .getShader (this .geometryContext, renderContext),
               primitiveMode   = browser .getPrimitiveMode (this .primitiveMode);

            // Set viewport.

            gl .viewport (... viewport);

            // Enable render mode nodes.

            for (const node of renderModeNodes)
               node .enable (gl);

            // Setup shader.

            shaderNode .enable (gl);
            shaderNode .setUniforms (gl, renderContext, this .geometryContext);

            if (this .numTexCoords)
            {
               const textureUnit = browser .getTextureUnit ();

               gl .activeTexture (gl .TEXTURE0 + textureUnit);
               gl .bindTexture (gl .TEXTURE_2D, this [ParticleSampler .texCoords]);
               gl .uniform1i (shaderNode .x3d_TexCoordRamp, textureUnit);
            }

            // Setup vertex attributes.

            const outputParticles = this .outputParticles;

            if (outputParticles .vertexArrayObject .enable (shaderNode .getProgram ()))
            {
               const { particlesStride } = this;

               shaderNode .enableParticleAttribute         (gl, outputParticles, particlesStride, this .particleOffset, 1);
               shaderNode .enableParticleVelocityAttribute (gl, outputParticles, particlesStride, this .velocityOffset, 1);
               shaderNode .enableInstanceMatrixAttribute   (gl, outputParticles, particlesStride, this .matrixOffset,   1);

               if (this .geometryContext .colorMaterial)
               {
                  shaderNode .enableColorAttribute (gl, outputParticles, particlesStride, this .colorOffset);
                  shaderNode .colorAttributeDivisor (gl, 1);
               }

               if (this .texCoordCount)
                  shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, this .texCoordOffset);

               if (this .hasNormals)
               {
                  shaderNode .enableNormalAttribute (gl, this .geometryBuffer, 0, this .normalOffset);
                  shaderNode .normalAttributeDivisor (gl, this .maxParticles);
               }

               shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, this .verticesOffset);
            }

            gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, this .numParticles);

            // Disable render mode nodes.

            for (const node of renderModeNodes)
               node .disable (gl);

            // Reset texture units.

            browser .resetTextureUnits ();
            break;
         }
      }
   },
   getScreenAlignedRotation: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         billboardToScreen  = new Vector3 (),
         viewerYAxis        = new Vector3 (),
         y                  = new Vector3 (),
         rotation           = new Matrix3 (9);

      return function (modelViewMatrix)
      {
         invModelViewMatrix .assign (modelViewMatrix) .inverse ();
         invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .Z_AXIS));
         invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .Y_AXIS));

         const x = viewerYAxis .cross (billboardToScreen);
         y .assign (billboardToScreen) .cross (x);
         const z = billboardToScreen;

         // Compose rotation matrix.

         x .normalize ();
         y .normalize ();
         z .normalize ();

         rotation .set (x .x, x .y, x .z,
                        y .x, y .y, y .z,
                        z .x, z .y, z .z);

         return rotation;
      };
   })(),
});

Object .defineProperties (ParticleSystem,
{
   ... X3DNode .getStaticProperties ("ParticleSystem", "ParticleSystems", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "createParticles",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geometryType",      new Fields .SFString ("QUAD")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxParticles",      new Fields .SFInt32 (200)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleLifetime",  new Fields .SFFloat (5)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lifetimeVariation", new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleSize",      new Fields .SFVec2f (0.02, 0.02)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "emitter",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "physics",           new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorKey",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "color",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordKey",       new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoord",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "scaleKey",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "scale",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents",     new Fields .SFBool (true)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ParticleSystem;
