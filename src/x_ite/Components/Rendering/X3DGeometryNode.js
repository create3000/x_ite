/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields       from "../../Fields.js";
import VertexArray  from "../../Rendering/VertexArray.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import MikkTSpace   from "../../Browser/Rendering/MikkTSpace.js";
import Shading      from "../../Browser/Core/Shading.js";
import Vector2      from "../../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";
import Plane3       from "../../../standard/Math/Geometry/Plane3.js";
import Triangle3    from "../../../standard/Math/Geometry/Triangle3.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

// Box normals for bbox / line intersection.
const boxNormals = [
   new Vector3 (0,  0,  1), // front
   new Vector3 (0,  0, -1), // back
   new Vector3 (0,  1,  0), // top
   new Vector3 (0, -1,  0), // bottom
   new Vector3 (1,  0,  0)  // right
   // left: We do not have to test for left.
];

function X3DGeometryNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DGeometryNode);

   this .addChildObjects (X3DConstants .outputOnly, "transparent",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "bbox_changed", new Fields .SFTime (),
                          X3DConstants .outputOnly, "rebuild",      new Fields .SFTime ());

   // Members

   const browser = this .getBrowser ();

   this .min                      = new Vector3 ();
   this .max                      = new Vector3 ();
   this .bbox                     = Box3 .Extents (this .min, this .max);
   this .solid                    = true;
   this .primitiveMode            = browser .getContext () .TRIANGLES;
   this .geometryType             = 3;
   this .flatShading              = undefined;
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
   this .flatNormals              = X3DGeometryNode .createArray ();
   this .vertices                 = X3DGeometryNode .createArray ();
   this .hasFogCoords             = false;
   this .hasNormals               = false;
   this .geometryKey              = "";
   this .vertexCount              = 0;
   this .planes                   = [ ];

   for (let i = 0; i < 5; ++ i)
      this .planes [i] = new Plane3 ();
}

Object .defineProperty (X3DGeometryNode, "createArray",
{
   // Function to select ether Array or MFFloat for color/normal/vertex arrays.
   // Array version runs faster, see BeyondGermany and TreasureIsland.
   value ()
   {
      // return new Fields .MFFloat ();

      const array = [ ];

      array .typedArray = new Float32Array ();

      array .assign = function (value)
      {
         const length = value .length;

         for (let i = 0; i < length; ++ i)
            this [i] = value [i];

         this .length = length;
      };

      array .getValue = function ()
      {
         return this .typedArray;
      };

      array .shrinkToFit = function ()
      {
         if (this .length === this .typedArray .length)
            this .typedArray .set (this);
         else
            this .typedArray = new Float32Array (this);
      };

      return array;
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

      this .frontFace             = gl .CCW;
      this .backFace              = new Map ([[gl .CCW, gl .CW], [gl .CW, gl .CCW]]);
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

      this .set_live__ ();
   },
   setGeometryType (value)
   {
      this .geometryType = value;
   },
   getGeometryType ()
   {
      return this .geometryType;
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
   setPrimitiveMode (value)
   {
      this .primitiveMode = value;
   },
   getPrimitiveMode ()
   {
      return this .primitiveMode;
   },
   setSolid (value)
   {
      this .solid = value;
   },
   setCCW (value)
   {
      const gl = this .getBrowser () .getContext ();

      this .frontFace = value ? gl .CCW : gl .CW;
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
   setFogDepths (value)
   {
      this .fogDepths .assign (value);
   },
   getFogDepths ()
   {
      return this .fogDepths;
   },
   setColors (value)
   {
      this .colors .assign (value);
   },
   getColors ()
   {
      return this .colors;
   },
   setMultiTexCoords (value)
   {
      const
         multiTexCoords = this .multiTexCoords,
         length         = value .length;

      for (let i = 0; i < length; ++ i)
         multiTexCoords [i] = value [i];

      multiTexCoords .length = length;
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
   setTangents (value)
   {
      this .tangents .assign (value);
   },
   getTangents ()
   {
      return this .tangents;
   },
   setNormals (value)
   {
      this .normals .assign (value);
   },
   getNormals ()
   {
      return this .normals;
   },
   setVertices (value)
   {
      this .vertices .assign (value);
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
            vertices  = this .vertices .getValue ();

         for (let i = 0, length = vertices .length; i < length; i += 4)
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
   },
   refineNormals (normalIndex, normals, creaseAngle)
   {
      if (creaseAngle === 0)
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

               if (Q .dot (P) >= cosCreaseAngle)
                  N .add (Q);
            }

            refinedNormals [p] = N .normalize ();
         }
      }

      return refinedNormals;
   },
   transformLine (hitRay)
   {
      // Apply sceen nodes transformation in place here.
   },
   transformMatrix (hitRay)
   {
      // Apply sceen nodes transformation in place here.
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

                  const
                     u = uvt .u,
                     v = uvt .v,
                     t = uvt .t;

                  // Determine vectors for X3DPointingDeviceSensors.

                  const point = new Vector3 (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
                                             t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
                                             t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

                  if (clipPlanes .length)
                  {
                     if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                        continue;
                  }

                  const texCoord = new Vector2 (t * texCoords [i4]     + u * texCoords [i4 + 4] + v * texCoords [i4 + 8],
                                                t * texCoords [i4 + 1] + u * texCoords [i4 + 5] + v * texCoords [i4 + 9]);

                  const i3 = i * 3;

                  const normal = new Vector3 (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
                                              t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
                                              t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);

                  intersections .push ({ texCoord: texCoord, normal: normal, point: this .getMatrix () .multVecMatrix (point) });
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
         planes = [ ];

      for (let i = 0; i < 5; ++ i)
         planes [i] = new Plane3 ();

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
      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getBrowserOptions () ._Shading .addInterest ("set_shading__", this);
      else
         this .getBrowser () .getBrowserOptions () ._Shading .removeInterest ("set_shading__", this);
   },
   set_shading__: (() =>
   {
      const
         v0     = new Vector3 (),
         v1     = new Vector3 (),
         v2     = new Vector3 (),
         normal = new Vector3 ();

      return function (shading)
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         if (this .geometryType < 2)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, this .normals .getValue (), gl .DYNAMIC_DRAW);
         }
         else
         {
            const flatShading = browser .getBrowserOptions () .getShading () === Shading .FLAT;

            if (flatShading === this .flatShading)
               return;

            this .flatShading = flatShading;

            // Generate flat normals if needed.

            if (flatShading)
            {
               if (!this .flatNormals .length)
               {
                  const
                     cw          = this .frontFace === gl .CW,
                     flatNormals = this .flatNormals,
                     vertices    = this .vertices .getValue ();

                  for (let i = 0, length = vertices .length; i < length; i += 12)
                  {
                     Triangle3 .normal (v0 .set (vertices [i],     vertices [i + 1], vertices [i + 2]),
                                        v1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]),
                                        v2 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]),
                                        normal);

                     if (cw)
                        normal .negate ();

                     flatNormals .push (normal .x, normal .y, normal .z,
                                        normal .x, normal .y, normal .z,
                                        normal .x, normal .y, normal .z);
                  }

                  flatNormals .shrinkToFit ();
               }
            }

            // Transfer normals.

            gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, flatShading ? this .flatNormals .getValue () : this .normals .getValue (), gl .DYNAMIC_DRAW);
         }
      };
   })(),
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   rebuild: (() =>
   {
      const point = new Vector3 ();

      return async function ()
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

         // Determine bbox.

         const
            vertices = this .vertices .getValue (),
            min      = this .min,
            max      = this .max;

         if (vertices .length)
         {
            if (min .x === Number .POSITIVE_INFINITY)
            {
               for (let i = 0, length = vertices .length; i < length; i += 4)
               {
                  point .set (vertices [i], vertices [i + 1], vertices [i + 2]);

                  min .min (point);
                  max .max (point);
               }
            }

            this .bbox .setExtents (min, max);
         }
         else
         {
            this .bbox .setExtents (min .set (0, 0, 0), max .set (0, 0, 0));
         }

         this ._bbox_changed .addEvent ();

         for (let i = 0; i < 5; ++ i)
            this .planes [i] .set (i % 2 ? min : max, boxNormals [i]);

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
      };
   })(),
   clear ()
   {
      // BBox

      this .min .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
      this .max .set (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

      // Create attribArray arrays.
      {
         const attribArrays = this .attribArrays;

         for (const attribArray of attribArrays)
            attribArray .length = 0;

         const length = this .attribNodes .length;

         for (let a = attribArrays .length; a < length; ++ a)
            attribArrays [a] = new Fields .MFFloat ();

         attribArrays .length = length;
      }

      // Buffer

      this .flatShading = undefined;

      this .coordIndices   .length = 0;
      this .fogDepths      .length = 0;
      this .colors         .length = 0;
      this .multiTexCoords .length = 0;
      this .texCoords      .length = 0;
      this .tangents       .length = 0;
      this .normals        .length = 0;
      this .flatNormals    .length = 0;
      this .vertices       .length = 0;
   },
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

      this .set_shading__ (this .getBrowser () .getBrowserOptions () ._Shading);

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
      this .geometryKey  = "";
      this .geometryKey += this .geometryType;
      this .geometryKey += this .hasFogCoords  ? "1" : "0";
      this .geometryKey += this .colorMaterial ? "1" : "0";
      this .geometryKey += this .hasNormals    ? "1" : "0";
      this .geometryKey += this .hasTangents   ? "1" : "0";
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
         browser        = this .getBrowser (),
         appearanceNode = renderContext .appearanceNode,
         shaderNode     = appearanceNode .getShader (this, renderContext);

      if (this .solid || !appearanceNode .getBackMaterial () || browser .getWireframe ())
      {
         this .displayGeometry (gl, renderContext, appearanceNode, shaderNode, true, true);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayGeometry (gl, renderContext, appearanceNode, backShaderNode, true,  false);
         this .displayGeometry (gl, renderContext, appearanceNode, shaderNode,     false, true);
      }
   },
   displayGeometry (gl, renderContext, appearanceNode, shaderNode, back, front)
   {
      const
         browser         = this .getBrowser (),
         renderModeNodes = appearanceNode .getRenderModes (),
         attribNodes     = this .attribNodes,
         attribBuffers   = this .attribBuffers,
         primitiveMode   = browser .getPrimitiveMode (this .primitiveMode);

      for (const node of renderModeNodes)
         node .enable (gl);

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, this, renderContext, front);

      // Setup vertex attributes.

      if (this .vertexArrayObject .enable (shaderNode .getProgram ()))
      {
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

      if (browser .getWireframe ())
      {
         for (let i = 0, length = this .vertexCount; i < length; i += 3)
            gl .drawArrays (primitiveMode, i, 3);
      }
      else
      {
         const positiveScale = Matrix4 .prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

         gl .frontFace (positiveScale ? this .frontFace : this .backFace .get (this .frontFace));

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
      }

      for (const node of renderModeNodes)
         node .disable (gl);
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

         if (this .hasTangents)
            shaderNode .enableTangentAttribute  (gl, this .tangentBuffer, 0, 0);

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
         browser        = this .getBrowser (),
         appearanceNode = renderContext .appearanceNode,
         shaderNode     = appearanceNode .getShader (this, renderContext);

      if (this .solid || !appearanceNode .getBackMaterial () || browser .getWireframe ())
      {
         this .displayInstancedGeometry (gl, renderContext, appearanceNode, shaderNode, true, true, shapeNode);
      }
      else
      {
         const backShaderNode = appearanceNode .getBackShader (this, renderContext);

         this .displayInstancedGeometry (gl, renderContext, appearanceNode, backShaderNode, true,  false, shapeNode);
         this .displayInstancedGeometry (gl, renderContext, appearanceNode, shaderNode,     false, true,  shapeNode);
      }
   },
   displayInstancedGeometry (gl, renderContext, appearanceNode, shaderNode, back, front, shapeNode)
   {
      const
         browser         = this .getBrowser (),
         renderModeNodes = appearanceNode .getRenderModes (),
         attribNodes     = this .attribNodes,
         attribBuffers   = this .attribBuffers,
         primitiveMode   = browser .getPrimitiveMode (this .primitiveMode);

      for (const node of renderModeNodes)
         node .enable (gl);

      // Setup shader.

      shaderNode .enable (gl);
      shaderNode .setUniforms (gl, this, renderContext, front);

      // Setup vertex attributes.

      const instances = shapeNode .getInstances ();

      if (instances .vertexArrayObject .update (this .updateInstances) .enable (shaderNode .getProgram ()))
      {
         const { instancesStride, particleOffset, velocityOffset, matrixOffset, normalMatrixOffset } = shapeNode;

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

      const positiveScale = Matrix4 .prototype .determinant3 .call (renderContext .modelViewMatrix) > 0;

      gl .frontFace (positiveScale ? this .frontFace : this .backFace .get (this .frontFace));

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

      for (const node of renderModeNodes)
         node .disable (gl);
   },
});

Object .defineProperties (X3DGeometryNode, X3DNode .getStaticProperties ("X3DGeometryNode", "Rendering", 1));

export default X3DGeometryNode;
