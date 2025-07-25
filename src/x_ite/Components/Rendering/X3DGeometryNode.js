import Fields       from "../../Fields.js";
import VertexArray  from "../../Rendering/VertexArray.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import MikkTSpace   from "../../Browser/Rendering/MikkTSpace.js";
import Vector2      from "../../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";
import Plane3       from "../../../standard/Math/Geometry/Plane3.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";
import DEVELOPMENT  from "../../DEVELOPMENT.js";

// Box normals for bbox / line intersection.
const boxNormals = [
   new Vector3 (0,  0,  1), // front
   new Vector3 (0,  0, -1), // back
   new Vector3 (0,  1,  0), // top
   new Vector3 (0, -1,  0), // bottom
   new Vector3 (1,  0,  0)  // right
   // left: We do not need to test for left.
];

function X3DGeometryNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DGeometryNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "bbox_changed", new Fields .SFTime (),
                          X3DConstants .outputOnly, "rebuild",      new Fields .SFTime (Date .now () / 1000));

   // Members

   const browser = this .getBrowser ();

   this .min                      = new Vector3 ();
   this .max                      = new Vector3 ();
   this .bbox                     = Box3 .Extents (this .min, this .max);
   this .solid                    = true;
   this .primitiveMode            = browser .getContext () .TRIANGLES;
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
   this .planes                   = [ ];

   for (let i = 0; i < 5; ++ i)
      this .planes [i] = new Plane3 ();
}

class GeometryArray extends Array
{
   #typedArray = new Float32Array ();

   assign (value)
   {
      const length = value .length;

      for (let i = 0; i < length; ++ i)
         this [i] = value [i];

      this .length = length;
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
      this .texCoordBuffers       = Array .from ({length: browser .getMaxTexCoords ()}, () => gl .createBuffer ());
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

      bbox .getExtents (this .min, this .max);

      this .bbox .assign (bbox);

      for (let i = 0; i < 5; ++ i)
         this .planes [i] .set (i % 2 ? this .min : this .max, boxNormals [i]);

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
      return Matrix4 .Identity;
   },
   getPrimitiveMode ()
   {
      return this .primitiveMode;
   },
   setPrimitiveMode (value)
   {
      this .primitiveMode = value;
   },
   setSolid (value)
   {
      this .solid = value;
   },
   isSolid ()
   {
      return this .solid;
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
            return void (MikkTSpace .initialize () .then (() => this .requestRebuild ()));

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
   transformLine (hitRay)
   {
      // Apply screen nodes transformation in place here.
   },
   transformMatrix (hitRay)
   {
      // Apply screen nodes transformation in place here.
   },
   isClipped (point, clipPlanes)
   {
      return clipPlanes .some (clipPlane => clipPlane .isClipped (point));
   },
   intersectsLine: (() =>
   {
      const
         modelViewMatrix = new Matrix4 (),
         uvt             = { u: 0, v: 0, t: 0 },
         v0              = new Vector3 (),
         v1              = new Vector3 (),
         v2              = new Vector3 (),
         clipPoint       = new Vector3 ();

      return function (hitRay, matrix, clipPlanes, intersections)
      {
         if (this .intersectsBBox (hitRay))
         {
            this .transformLine (hitRay); // Apply screen transformations from screen nodes.
            this .transformMatrix (modelViewMatrix .assign (matrix)); // Apply screen transformations from screen nodes.

            const
               texCoords   = this .multiTexCoords [0] .getValue (),
               normals     = this .normals .getValue (),
               vertices    = this .vertices .getValue (),
               vertexCount = this .vertexCount;

            for (let i = 0; i < vertexCount; i += 3)
            {
               const i4 = i * 4;

               v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
               v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
               v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

               if (hitRay .intersectsTriangle (v0, v1, v2, uvt))
               {
                  // Get barycentric coordinates.

                  const { u, v, t } = uvt;

                  // Determine vectors for X3DPointingDeviceSensors.

                  const point = new Vector3 (u * vertices [i4]     + v * vertices [i4 + 4] + t * vertices [i4 +  8],
                                             u * vertices [i4 + 1] + v * vertices [i4 + 5] + t * vertices [i4 +  9],
                                             u * vertices [i4 + 2] + v * vertices [i4 + 6] + t * vertices [i4 + 10]);

                  if (clipPlanes .length)
                  {
                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                        continue;
                  }

                  const texCoord = new Vector2 (u * texCoords [i4]     + v * texCoords [i4 + 4] + t * texCoords [i4 + 8],
                                                u * texCoords [i4 + 1] + v * texCoords [i4 + 5] + t * texCoords [i4 + 9]);

                  const i3 = i * 3;

                  const normal = new Vector3 (u * normals [i3]     + v * normals [i3 + 3] + t * normals [i3 + 6],
                                              u * normals [i3 + 1] + v * normals [i3 + 4] + t * normals [i3 + 7],
                                              u * normals [i3 + 2] + v * normals [i3 + 5] + t * normals [i3 + 8]);

                  intersections .push ({ texCoord, normal, point: this .getMatrix () .multVecMatrix (point) });
               }
            }
         }

         return intersections .length;
      };
   })(),
   getPlanesWithOffset: (() =>
   {
      const
         min    = new Vector3 (),
         max    = new Vector3 (),
         planes = Array .from ({ length: 5 }, () => new Plane3 ());

      return function (minX, minY, minZ, maxX, maxY, maxZ)
      {
         min .set (minX, minY, minZ);
         max .set (maxX, maxY, maxZ);

         for (let i = 0; i < 5; ++ i)
            planes [i] .set (i % 2 ? min : max, boxNormals [i]);

         return planes;
      };
   })(),
   intersectsBBox: (() =>
   {
      const intersection = new Vector3 ();

      return function (hitRay, offsets)
      {
         if (offsets)
         {
            var
               min    = this .min,
               max    = this .max,
               minX   = min .x - offsets .x,
               maxX   = max .x + offsets .x,
               minY   = min .y - offsets .y,
               maxY   = max .y + offsets .y,
               minZ   = min .z - offsets .z,
               maxZ   = max .z + offsets .z,
               planes = this .getPlanesWithOffset (minX, minY, minZ, maxX, maxY, maxZ);
         }
         else
         {
            var
               min    = this .min,
               max    = this .max,
               minX   = min .x,
               maxX   = max .x,
               minY   = min .y,
               maxY   = max .y,
               minZ   = min .z,
               maxZ   = max .z,
               planes = this .planes;
         }

         // front
         if (planes [0] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .y >= minY && intersection .y <= maxY)
               return true;
         }

         // back
         if (planes [1] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .y >= minY && intersection .y <= maxY)
               return true;
         }

         // top
         if (planes [2] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         // bottom
         if (planes [3] .intersectsLine (hitRay, intersection))
         {
            if (intersection .x >= minX && intersection .x <= maxX &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         // right
         if (planes [4] .intersectsLine (hitRay, intersection))
         {
            if (intersection .y >= minY && intersection .y <= maxY &&
                intersection .z >= minZ && intersection .z <= maxZ)
               return true;
         }

         return false;
      };
   })(),
   intersectsBox: (() =>
   {
      const
         v0        = new Vector3 (),
         v1        = new Vector3 (),
         v2        = new Vector3 (),
         invMatrix = new Matrix4 (),
         clipPoint = new Vector3 ();

      return function (box, clipPlanes, modelViewMatrix)
      {
         if (box .intersectsBox (this .bbox))
         {
            box .multRight (invMatrix .assign (this .getMatrix ()) .inverse ());

            this .transformMatrix (modelViewMatrix); // Apply screen transformations from screen nodes.

            const vertices = this .vertices .getValue ();

            for (let i = 0, length = this .vertexCount; i < length; i += 3)
            {
               const i4 = i * 4;

               v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
               v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
               v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

               if (box .intersectsTriangle (v0, v1, v2))
               {
                  if (clipPlanes .length)
                  {
                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v0)), clipPlanes))
                        continue;

                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v1)), clipPlanes))
                        continue;

                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v2)), clipPlanes))
                        continue;
                  }

                  return true;
               }
            }
         }

         return false;
      };
   })(),
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
   traverse (type, renderObject)
   { },
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

      gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
   },
   display (gl, renderContext)
   {
      const
         appearanceNode  = renderContext .appearanceNode,
         renderModeNodes = appearanceNode .getRenderModes (),
         shaderNode      = appearanceNode .getShader (this, renderContext);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Handle negative scale.

      const positiveScale = Matrix4 .prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

      gl .frontFace (positiveScale ? this .frontFace : this .backFace);

      // Draw front and back faces.

      if (this .solid || !appearanceNode .getBackMaterial ())
      {
         this .displayGeometry (gl, renderContext, shaderNode, true, true);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayGeometry (gl, renderContext, backShaderNode, true,  false);
         this .displayGeometry (gl, renderContext, shaderNode,     false, true);
      }

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);
   },
   displayGeometry (gl, renderContext, shaderNode, back, front)
   {
      const
         browser       = this .getBrowser (),
         primitiveMode = browser .getPrimitiveMode (this .primitiveMode);

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

      gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, shapeNode .getNumInstances ());
   },
   displayInstanced (gl, renderContext, shapeNode)
   {
      const
         browser         = this .getBrowser (),
         appearanceNode  = renderContext .appearanceNode,
         renderModeNodes = appearanceNode .getRenderModes (),
         shaderNode      = appearanceNode .getShader (this, renderContext);

      // Enable render mode nodes.

      for (const node of renderModeNodes)
         node .enable (gl);

      // Handle negative scale.

      const positiveScale = Matrix4 .prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

      gl .frontFace (positiveScale ? this .frontFace : this .backFace);

      // Draw front and back faces.

      if (this .solid || !appearanceNode .getBackMaterial ())
      {
         this .displayInstancedGeometry (gl, renderContext, shaderNode, true, true, shapeNode);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayInstancedGeometry (gl, renderContext, backShaderNode, true,  false, shapeNode);
         this .displayInstancedGeometry (gl, renderContext, shaderNode,     false, true,  shapeNode);
      }

      // Disable render mode nodes.

      for (const node of renderModeNodes)
         node .disable (gl);
   },
   displayInstancedGeometry (gl, renderContext, shaderNode, back, front, shapeNode)
   {
      const
         browser       = this .getBrowser (),
         primitiveMode = browser .getPrimitiveMode (this .primitiveMode);

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
