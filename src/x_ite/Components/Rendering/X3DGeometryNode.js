import Fields       from "../../Fields.js";
import VertexArray  from "../../Rendering/VertexArray.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import MikkTSpace   from "../../Browser/Rendering/MikkTSpace.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";
import Plane3       from "../../../standard/Math/Geometry/Plane3.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";
import DEVELOPMENT  from "../../DEVELOPMENT.js";

// Box normals for bbox / line intersection.
const boxNormals = [
   Vector3 .Z_AXIS,          // front
   Vector3 .NEGATIVE_Z_AXIS, // back
   Vector3 .Y_AXIS,          // top
   Vector3 .NEGATIVE_Y_AXIS, // bottom
   Vector3 .X_AXIS,          // right
   // left: We do not need to test for left.
];

function X3DGeometryNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DGeometryNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "bbox_changed", new Fields .SFTime (),
                          X3DConstants .outputOnly, "rebuild",      new Fields .SFTime (Date .now () / 1000));

   // Private members

   this .min                      = new Vector3 ();
   this .max                      = new Vector3 ();
   this .bbox                     = Box3 .fromExtents (this .min, this .max);
   this .solid                    = true;
   this .geometryType             = 3;
   this .colorMaterial            = false;
   this .attribNodes              = [ ];
   this .attribArrays             = [ ];
   this .textureCoordinateMapping = new Map ();
   this .multiTexCoords           = [ ];
   this .coordIndices             = X3DGeometryNode .createArray ();
   this .texCoords                = X3DGeometryNode .createArray ();
   this .fogDepths                = X3DGeometryNode .createArray ();
   this .colors                   = X3DGeometryNode .createArray ();
   this .tangents                 = X3DGeometryNode .createArray ();
   this .normals                  = X3DGeometryNode .createArray ();
   this .vertices                 = X3DGeometryNode .createArray ();
   this .hasFogCoords             = false;
   this .hasNormals               = false;
   this .geometryKey              = "";
   this .vertexCount              = 0;
   this .planes                   = Array .from ({ length: 5 }, () => new Plane3 ()); // For LinePickSensor
}

class GeometryArray extends Array
{
   #typedArray = new Float32Array ();

   assign (value)
   {
      const length = value .length;

      this .length = length;

      for (let i = 0; i < length; ++ i)
         this [i] = value [i];
   }

   getValue ()
   {
      return this .#typedArray;
   }

   shrinkToFit ()
   {
      if (this .length === this .#typedArray .length)
         this .#typedArray .set (this);
      else
         this .#typedArray = new Float32Array (this);

      return this .#typedArray;
   }
}

Object .defineProperty (X3DGeometryNode, "createArray",
{
   // Function to select ether Array or MFFloat for color/normal/vertex arrays.
   // Array version runs faster, see BeyondGermany and TreasureIsland.
   value ()
   {
      // return new Fields .MFFloat ();

      return new GeometryArray ();
   },
})

Object .assign (Object .setPrototypeOf (X3DGeometryNode .prototype, X3DNode .prototype),
{
   setup ()
   {
      X3DNode .prototype .setup .call (this);

      this .rebuild ();
   },
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .getLive () .addInterest ("set_live__", this);

      this .addInterest ("requestRebuild", this);
      this ._rebuild .addInterest ("rebuild", this);

      this .coordIndexBuffer      = gl .createBuffer ();
      this .attribBuffers         = [ ];
      this .textureCoordinateNode = browser .getDefaultTextureCoordinate ();
      this .texCoordBuffers       = Array .from ({ length: browser .getMaxTexCoords () }, () => gl .createBuffer ());
      this .fogDepthBuffer        = gl .createBuffer ();
      this .colorBuffer           = gl .createBuffer ();
      this .tangentBuffer         = gl .createBuffer ();
      this .normalBuffer          = gl .createBuffer ();
      this .vertexBuffer          = gl .createBuffer ();
      this .vertexArrayObject     = new VertexArray (gl);

      this .setCCW (true);
      this .set_live__ ();
   },
   getGeometryType ()
   {
      return this .geometryType;
   },
   setGeometryType (value)
   {
      this .geometryType = value;
   },
   setTransparent (value)
   {
      if (!!value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent ()
   {
      return this ._transparent .getValue ();
   },
   getBBox ()
   {
      // With screen matrix applied.
      return this .bbox;
   },
   setBBox (bbox)
   {
      if (bbox .equals (this .bbox))
         return;

      const { min, max } = this;

      bbox .getExtents (min, max);

      this .bbox .assign (bbox);
      this .planes .forEach ((plane, i) => plane .set (i % 2 ? min : max, boxNormals [i]));

      this ._bbox_changed .addEvent ();
   },
   getMin ()
   {
      // With screen matrix applied.
      return this .min;
   },
   getMax ()
   {
      // With screen matrix applied.
      return this .max;
   },
   getMatrix ()
   {
      return Matrix4 .IDENTITY;
   },
   isSolid ()
   {
      return this .solid;
   },
   setSolid (value)
   {
      this .solid = value;
   },
   getCCW ()
   {
      const gl = this .getBrowser () .getContext ();

      return this .frontFace ===  gl .CCW;
   },
   setCCW (value)
   {
      const gl = this .getBrowser () .getContext ();

      this .frontFace = value ? gl .CCW : gl .CW;
      this .backFace  = value ? gl .CW  : gl .CCW;
   },
   getCoordIndices ()
   {
      return this .coordIndices;
   },
   getAttrib ()
   {
      return this .attribNodes;
   },
   getAttribs ()
   {
      return this .attribArrays;
   },
   getAttribBuffers ()
   {
      return this .attribBuffers;
   },
   getFogDepths ()
   {
      return this .fogDepths;
   },
   getColors ()
   {
      return this .colors;
   },
   getMultiTexCoords ()
   {
      return this .multiTexCoords;
   },
   getTexCoords ()
   {
      return this .texCoords;
   },
   getTextureCoordinate ()
   {
      return this .textureCoordinateNode;
   },
   setTextureCoordinate (value)
   {
      this .textureCoordinateNode .removeInterest ("updateTextureCoordinateMapping", this);

      this .textureCoordinateNode = value ?? this .getBrowser () .getDefaultTextureCoordinate ();

      this .textureCoordinateNode .addInterest ("updateTextureCoordinateMapping", this);

      this .updateTextureCoordinateMapping ();
   },
   getTextureCoordinateMapping ()
   {
      return this .textureCoordinateMapping;
   },
   updateTextureCoordinateMapping ()
   {
      this .textureCoordinateMapping .clear ();

      this .textureCoordinateNode .getTextureCoordinateMapping (this .textureCoordinateMapping);
   },
   getTangents ()
   {
      return this .tangents;
   },
   getNormals ()
   {
      return this .normals;
   },
   getVertices ()
   {
      return this .vertices;
   },
   updateVertexArrays ()
   {
      this .vertexArrayObject .update ();

      this .updateInstances = true;
   },
   generateTexCoords ()
   {
      const texCoords = this .texCoords;

      if (texCoords .length === 0)
      {
         const
            p         = this .getTexCoordParams (),
            min       = p .min,
            Sindex    = p .Sindex,
            Tindex    = p .Tindex,
            Ssize     = p .Ssize,
            S         = min [Sindex],
            T         = min [Tindex],
            vertices  = this .vertices .getValue (),
            length    = vertices .length;

         for (let i = 0; i < length; i += 4)
         {
            texCoords .push ((vertices [i + Sindex] - S) / Ssize,
                             (vertices [i + Tindex] - T) / Ssize,
                             0,
                             1);
         }

         texCoords .shrinkToFit ();
      }

      this .getMultiTexCoords () .push (texCoords);
   },
   getTexCoordParams: (() =>
   {
      const texCoordParams = { min: new Vector3 (), Ssize: 0, Sindex: 0, Tindex: 0 };

      return function ()
      {
         const
            bbox  = this .getBBox (),
            size  = bbox .size,
            Xsize = size .x,
            Ysize = size .y,
            Zsize = size .z;

         texCoordParams .min .assign (bbox .center) .subtract (size .divide (2));

         if ((Xsize >= Ysize) && (Xsize >= Zsize))
         {
            // X size largest
            texCoordParams .Ssize  = Xsize;
            texCoordParams .Sindex = 0;

            if (Ysize >= Zsize)
               texCoordParams .Tindex = 1;
            else
               texCoordParams .Tindex = 2;
         }
         else if ((Ysize >= Xsize) && (Ysize >= Zsize))
         {
            // Y size largest
            texCoordParams .Ssize  = Ysize;
            texCoordParams .Sindex = 1;

            if (Xsize >= Zsize)
               texCoordParams .Tindex = 0;
            else
               texCoordParams .Tindex = 2;
         }
         else
         {
            // Z is the largest
            texCoordParams .Ssize  = Zsize;
            texCoordParams .Sindex = 2;

            if (Xsize >= Ysize)
               texCoordParams .Tindex = 0;
            else
               texCoordParams .Tindex = 1;
         }

         return texCoordParams;
      };
   })(),
   generateTangents ()
   {
      try
      {
         if (this .geometryType < 2)
            return;

         if (!this .vertices .length)
            return;

         if (!MikkTSpace .isInitialized ())
         {
            return void (MikkTSpace .initialize () .then (() =>
            {
               this .generateTangents ();
               this .transfer ();
               this .updateGeometryKey ();
               this .updateRenderFunctions ();
               this .getBrowser () .addBrowserEvent ();
            }));
         }

         const
            vertices  = this .vertices .getValue () .filter ((v, i) => i % 4 < 3),
            normals   = this .normals .getValue (),
            texCoords = this .multiTexCoords [0] .getValue () .filter ((v, i) => i % 4 < 2),
            tangents  = MikkTSpace .generateTangents (vertices, normals, texCoords),
            length    = tangents .length;

         // Convert coordinate system handedness to respect output format of MikkTSpace.
         for (let i = 3; i < length; i += 4)
            tangents [i] = -tangents [i]; // Flip w-channel.

         this .tangents .assign (tangents);
         this .tangents .shrinkToFit ();
      }
      catch (error)
      {
         if (DEVELOPMENT)
            console .error (error);
      }
   },
   refineNormals (normalIndex, normals, creaseAngle)
   {
      if (creaseAngle <= 0)
         return normals;

      const
         cosCreaseAngle = Math .cos (Algorithm .clamp (creaseAngle, 0, Math .PI)),
         refinedNormals = [ ];

      for (const vertex of normalIndex .values ())
      {
         for (const p of vertex)
         {
            const
               P = normals [p],
               N = new Vector3 ();

            for (const q of vertex)
            {
               const Q = normals [q];

               if (Q .dot (P) > cosCreaseAngle)
                  N .add (Q);
            }

            refinedNormals [p] = N .normalize ();
         }
      }

      return refinedNormals;
   },
   set_live__ ()
   {
      // Is overloaded by primitives with option nodes.
   },
   connectOptions (options)
   {
      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
      {
         options .addInterest ("requestRebuild", this);

         if (options .getModificationTime () >= this ._rebuild .getValue ())
            this .requestRebuild ();
      }
      else
      {
         options .removeInterest ("requestRebuild", this);
      }
   },
   requestRebuild ()
   {
      this ._rebuild = Date .now () / 1000;
   },
   rebuild ()
   {
      this .clear ();
      this .build ();

      // Shrink arrays before transferring them to graphics card.

      for (const attribArray of this .attribArrays)
         attribArray .shrinkToFit ();

      for (const multiTexCoord of this .multiTexCoords)
         multiTexCoord .shrinkToFit ();

      this .coordIndices .shrinkToFit ();
      this .fogDepths    .shrinkToFit ();
      this .colors       .shrinkToFit ();
      this .tangents     .shrinkToFit ();
      this .normals      .shrinkToFit ();
      this .vertices     .shrinkToFit ();

      this .updateBBox ();

      // Generate texCoord if needed.

      if (!this .multiTexCoords .length)
         this .generateTexCoords ();

      // Generate tangents if needed.

      if (!this .tangents .length)
         this .generateTangents ();

      // Transfer arrays and update.

      this .transfer ();
      this .updateGeometryKey ();
      this .updateRenderFunctions ();
   },
   clear ()
   {
      // BBox

      this .min .set (Number .POSITIVE_INFINITY);
      this .max .set (Number .NEGATIVE_INFINITY);

      // Create attribArray arrays.
      {
         const attribArrays = this .attribArrays;

         for (const attribArray of attribArrays)
            attribArray .length = 0;

         const length = this .attribNodes .length;

         for (let a = attribArrays .length; a < length; ++ a)
            attribArrays [a] = X3DGeometryNode .createArray ();

         attribArrays .length = length;
      }

      // Buffer

      this .coordIndices   .length = 0;
      this .fogDepths      .length = 0;
      this .colors         .length = 0;
      this .multiTexCoords .length = 0;
      this .texCoords      .length = 0;
      this .tangents       .length = 0;
      this .normals        .length = 0;
      this .vertices       .length = 0;
   },
   updateBBox: (() =>
   {
      const point = new Vector3 ();

      return function ()
      {
         // Determine bbox.

         const
            vertices    = this .vertices .getValue (),
            numVertices = vertices .length,
            min         = this .min,
            max         = this .max;

         if (numVertices)
         {
            if (min .x === Number .POSITIVE_INFINITY)
            {
               for (let i = 0; i < numVertices; i += 4)
               {
                  const { [i]: v1, [i + 1]: v2, [i + 2]: v3 } = vertices;

                  point .set (v1, v2, v3);

                  min .min (point);
                  max .max (point);
               }
            }

            this .bbox .setExtents (min, max);
         }
         else
         {
            this .bbox .setExtents (min .set (0), max .set (0));
         }

         for (let i = 0; i < 5; ++ i)
            this .planes [i] .set (i % 2 ? min : max, boxNormals [i]);

         this ._bbox_changed .addEvent ();
      };
   })(),
   transfer ()
   {
      const gl = this .getBrowser () .getContext ();

      // Transfer coord indices.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .coordIndexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .coordIndices .getValue (), gl .DYNAMIC_DRAW);

      // Transfer attribArrays.

      for (let i = this .attribBuffers .length, length = this .attribArrays .length; i < length; ++ i)
         this .attribBuffers .push (gl .createBuffer ());

      for (let i = 0, length = this .attribArrays .length; i < length; ++ i)
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .attribBuffers [i]);
         gl .bufferData (gl .ARRAY_BUFFER, this .attribArrays [i] .getValue (), gl .DYNAMIC_DRAW);
      }

      // Transfer fog depths.

      const lastHasFogCoords = this .hasFogCoords;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .fogDepthBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .fogDepths .getValue (), gl .DYNAMIC_DRAW);

      this .hasFogCoords = !! this .fogDepths .length;

      if (this .hasFogCoords !== lastHasFogCoords)
         this .updateVertexArrays ();

      // Transfer colors.

      const lastColorMaterial = this .colorMaterial;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .colors .getValue (), gl .DYNAMIC_DRAW);

      this .colorMaterial = !! this .colors .length;

      if (this .colorMaterial !== lastColorMaterial)
         this .updateVertexArrays ();

      // Transfer multiTexCoords.

      for (let i = 0, length = this .multiTexCoords .length; i < length; ++ i)
      {
         gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [i]);
         gl .bufferData (gl .ARRAY_BUFFER, this .multiTexCoords [i] .getValue (), gl .DYNAMIC_DRAW);
      }

      // Transfer tangents.

      const lastHasTangents = this .hasTangents;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .tangentBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .tangents .getValue (), gl .DYNAMIC_DRAW);

      this .hasTangents = !! this .tangents .length;

      if (this .hasTangents !== lastHasTangents)
         this .updateVertexArrays ();

      // Transfer normals or flat normals.

      const lastHasNormals = this .hasNormals;

      gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .normals .getValue (), gl .DYNAMIC_DRAW);

      this .hasNormals = !! this .normals .length;

      if (this .hasNormals !== lastHasNormals)
         this .updateVertexArrays ();

      // Transfer vertices.

      gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
      gl .bufferData (gl .ARRAY_BUFFER, this .vertices .getValue (), gl .DYNAMIC_DRAW);

      this .vertexCount = this .vertices .length / 4;
   },
   updateGeometryKey ()
   {
      let key = "";

      key += this .geometryType;
      key += this .hasFogCoords  ? 1 : 0;
      key += this .colorMaterial ? 1 : 0;
      key += this .hasTangents   ? 1 : 0;
      key += this .hasNormals    ? 1 : 0;

      this .geometryKey = key;
   },
   updateRenderFunctions ()
   {
      if (this .vertexCount)
      {
         // Use default render functions.

         delete this .displaySimple;
         delete this .display;
         delete this .displaySimpleInstanced;
         delete this .displayInstanced;

         if (this .base)
            this .setBase (this .base);
      }
      else
      {
         // Use no render function.

         this .displaySimple          = Function .prototype;
         this .display                = Function .prototype;
         this .displaySimpleInstanced = Function .prototype;
         this .displayInstanced       = Function .prototype;
      }
   },
   setBase: (() =>
   {
      // Actually all functions that are overloaded must be listed here.

      const functions = [
         "intersectsLine",
         "updateVertexArrays",
         "updateLengthSoFar",
         "generateTexCoords",
         "displaySimple",
         "displaySimpleThick",
         "displaySimpleInstanced",
         "displaySimpleInstancedThick",
         "display",
         "displayThick",
         "displayInstanced",
         "displayInstancedThick",
      ];

      return function (base)
      {
         this .base = base;

         for (const fn of functions)
            this [fn] = base [fn];
      };
   })(),
   displaySimple (gl, renderContext, shaderNode)
   {
      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         if (this .multiTexCoords .length)
            shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);

         if (this .hasNormals)
            shaderNode .enableNormalAttribute (gl, this .normalBuffer, 0, 0);

         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);
      }

      gl .drawArrays (gl .TRIANGLES, 0, this .vertexCount);
   },
   display (gl, renderContext)
   {
      const
         { viewport, appearanceNode, modelViewMatrix } = renderContext,
         browser         = this .getBrowser (),
         primitiveMode   = browser .getPrimitiveMode (gl .TRIANGLES),
         renderModeNodes = appearanceNode .getRenderModes (),
         shaderNode      = appearanceNode .getShader (this, renderContext);

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Handle negative scale.

      const positiveScale = Matrix4 .prototype .determinant3 .call (modelViewMatrix) > 0;

      gl .frontFace (positiveScale ? this .frontFace : this .backFace);

      // Draw front and back faces.

      if (this .solid || !appearanceNode .getBackMaterial ())
      {
         this .displayGeometry (gl, renderContext, shaderNode, primitiveMode, true, true);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayGeometry (gl, renderContext, backShaderNode, primitiveMode, true,  false);
         this .displayGeometry (gl, renderContext, shaderNode,     primitiveMode, false, true);
      }

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();
   },
   displayGeometry (gl, renderContext, shaderNode, primitiveMode, back, front)
   {
      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this, front);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute (gl, this .tangentBuffer, 0, 0);

         shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
         shaderNode .enableNormalAttribute   (gl, this .normalBuffer,    0, 0);
         shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);
      }

      // Draw depending on wireframe, solid and transparent.

      if (renderContext .transparent || back !== front)
      {
         // Render transparent or back or front.

         gl .enable (gl .CULL_FACE);

         // Render back.

         if (back && !this .solid)
         {
            gl .cullFace (gl .FRONT);
            gl .drawArrays (primitiveMode, 0, this .vertexCount);
         }

         // Render front.

         if (front)
         {
            gl .cullFace (gl .BACK);
            gl .drawArrays (primitiveMode, 0, this .vertexCount);
         }
      }
      else
      {
         // Render solid or both sides.

         if (this .solid)
            gl .enable (gl .CULL_FACE);
         else
            gl .disable (gl .CULL_FACE);

         gl .drawArrays (primitiveMode, 0, this .vertexCount);
      }
   },
   displaySimpleInstanced (gl, shaderNode, shapeNode)
   {
      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, matrixOffset, normalMatrixOffset } = shapeNode;

         if (particleOffset !== undefined)
            shaderNode .enableParticleAttribute (gl, instances, instancesStride, particleOffset, 1);

         shaderNode .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);

         if (normalMatrixOffset !== undefined)
            shaderNode .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 1);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
         shaderNode .enableNormalAttribute   (gl, this .normalBuffer,    0, 0);
         shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);

         this .updateInstances = false;
      }

      gl .drawArraysInstanced (gl .TRIANGLES, 0, this .vertexCount, shapeNode .getNumInstances ());
   },
   displayInstanced (gl, renderContext, shapeNode)
   {
      const
         { viewport, appearanceNode, modelViewMatrix } = renderContext,
         browser         = this .getBrowser (),
         primitiveMode   = browser .getPrimitiveMode (gl .TRIANGLES),
         renderModeNodes = appearanceNode .getRenderModes (),
         shaderNode      = appearanceNode .getShader (this, renderContext);

      // Set viewport.

      gl .viewport (... viewport);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Handle negative scale.

      const positiveScale = Matrix4 .prototype .determinant3 .call (modelViewMatrix) > 0;

      gl .frontFace (positiveScale ? this .frontFace : this .backFace);

      // Draw front and back faces.

      if (this .solid || !appearanceNode .getBackMaterial ())
      {
         this .displayInstancedGeometry (gl, renderContext, shaderNode, primitiveMode, true, true, shapeNode);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayInstancedGeometry (gl, renderContext, backShaderNode, primitiveMode, true,  false, shapeNode);
         this .displayInstancedGeometry (gl, renderContext, shaderNode,     primitiveMode, false, true,  shapeNode);
      }

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);

      // Reset texture units.

      browser .resetTextureUnits ();
   },
   displayInstancedGeometry (gl, renderContext, shaderNode, primitiveMode, back, front, shapeNode)
   {
      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, renderContext, this, front);

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, velocityOffset, matrixOffset, normalMatrixOffset } = shapeNode;

         const
            attribNodes   = this .getAttrib (),
            attribBuffers = this .getAttribBuffers ();

         if (particleOffset !== undefined)
            shaderNode .enableParticleAttribute (gl, instances, instancesStride, particleOffset, 1);

         if (velocityOffset !== undefined)
            shaderNode .enableParticleVelocityAttribute (gl, instances, instancesStride, velocityOffset, 1);

         shaderNode .enableInstanceMatrixAttribute (gl, instances, instancesStride, matrixOffset, 1);

         if (normalMatrixOffset !== undefined)
            shaderNode .enableInstanceNormalMatrixAttribute (gl, instances, instancesStride, normalMatrixOffset, 1);

         if (this .coordIndices .length)
            shaderNode .enableCoordIndexAttribute (gl, this .coordIndexBuffer, 0, 0);

         for (let i = 0, length = attribNodes .length; i < length; ++ i)
            attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

         if (this .hasFogCoords)
            shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

         if (this .colorMaterial)
            shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

         if (this .hasTangents)
            shaderNode .enableTangentAttribute  (gl, this .tangentBuffer, 0, 0);

         shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
         shaderNode .enableNormalAttribute   (gl, this .normalBuffer,    0, 0);
         shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);

         this .updateInstances = false;
      }

      // Draw depending on wireframe, solid and transparent.

      if (renderContext .transparent || back !== front)
      {
         // Render transparent or back or front.

         gl .enable (gl .CULL_FACE);

         if (back && !this .solid)
         {
            gl .cullFace (gl .FRONT);
            gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());
         }

         if (front)
         {
            gl .cullFace (gl .BACK);
            gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());
         }
      }
      else
      {
         // Render solid or both sides.

         if (this .solid)
            gl .enable (gl .CULL_FACE);
         else
            gl .disable (gl .CULL_FACE);

         gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());
      }
   },
},
// Common functions for all X3DComposedGeometryNode types and some other nodes:
{
   getFogCoord ()
   {
      return this .fogCoordNode;
   },
   getColor ()
   {
      return this .colorNode;
   },
   getTexCoord ()
   {
      return this .texCoordNode;
   },
   getTangent ()
   {
      return this .tangentNode;
   },
   getNormal ()
   {
      return this .normalNode;
   },
   getCoord ()
   {
      return this .coordNode;
   },
   set_attrib__ ()
   {
      const attribNodes = this .getAttrib ();

      for (const attribNode of attribNodes)
      {
         attribNode .removeInterest ("requestRebuild", this);
         attribNode ._attribute_changed .removeInterest ("updateVertexArrays", this);
      }

      attribNodes .length = 0;

      for (const node of this ._attrib)
      {
         const attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, node);

         if (attribNode)
            attribNodes .push (attribNode);
      }

      for (const attribNode of attribNodes)
      {
         attribNode .addInterest ("requestRebuild", this);
         attribNode ._attribute_changed .addInterest ("updateVertexArrays", this);
      }

      this .updateVertexArrays ();
   },
   set_fogCoord__ ()
   {
      this .fogCoordNode ?.removeInterest ("requestRebuild", this);

      this .fogCoordNode = X3DCast (X3DConstants .FogCoordinate, this ._fogCoord);

      this .fogCoordNode ?.addInterest ("requestRebuild", this);
   },
   set_color__ ()
   {
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent ());
   },
   set_texCoord__ ()
   {
      this .texCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordNode ?.addInterest ("requestRebuild", this);

      this .setTextureCoordinate (this .texCoordNode);
   },
   set_tangent__ ()
   {
      this .tangentNode ?.removeInterest ("requestRebuild", this);

      this .tangentNode = X3DCast (X3DConstants .X3DTangentNode, this ._tangent);

      this .tangentNode ?.addInterest ("requestRebuild", this);
   },
   set_normal__ ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
   },
   set_coord__ ()
   {
      this .coordNode ?.removeInterest ("requestRebuild", this);

      this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._coord);

      this .coordNode ?.addInterest ("requestRebuild", this);
   },
});

Object .defineProperties (X3DGeometryNode, X3DNode .getStaticProperties ("X3DGeometryNode", "Rendering", 1));

export default X3DGeometryNode;
