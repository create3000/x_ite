/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Browser/Rendering/VertexArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Browser/Core/Shading",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Box3",
   "standard/Math/Geometry/Plane3",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Algorithm",
],
function (Fields,
          VertexArray,
          X3DNode,
          X3DConstants,
          Shading,
          Vector2,
          Vector3,
          Matrix4,
          Box3,
          Plane3,
          Triangle3,
          Algorithm)
{
"use strict";

   const ARRAY_TYPE = "Array"; // For color, texCoord, normal, and vertex array, can be MFFloat or Array;

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

      this .addChildObjects ("transparent",  new Fields .SFBool (),
                             "bbox_changed", new Fields .SFTime (),
                             "rebuild",      new Fields .SFTime ());

      this ._transparent  .setAccessType (X3DConstants .outputOnly);
      this ._bbox_changed .setAccessType (X3DConstants .outputOnly);
      this ._rebuild      .setAccessType (X3DConstants .outputOnly);

      // Members

      this .min                      = new Vector3 (0, 0, 0);
      this .max                      = new Vector3 (0, 0, 0);
      this .bbox                     = new Box3 (this .min, this .max, true);
      this .solid                    = true;
      this .geometryType             = 3;
      this .flatShading              = undefined;
      this .colorMaterial            = false;
      this .attribNodes              = [ ];
      this .attribArrays             = [ ];
      this .textureCoordinateMapping = new Map ();
      this .multiTexCoords           = [ ];
      this .texCoords                = X3DGeometryNode .createArray ();
      this .fogDepths                = X3DGeometryNode .createArray ();
      this .colors                   = X3DGeometryNode .createArray ();
      this .normals                  = X3DGeometryNode .createArray ();
      this .flatNormals              = X3DGeometryNode .createArray ();
      this .vertices                 = X3DGeometryNode .createArray ();
      this .fogCoords                = false;
      this .vertexCount              = 0;
      this .planes                   = [ ];

      for (let i = 0; i < 5; ++ i)
         this .planes [i] = new Plane3 (Vector3 .Zero, Vector3 .zAxis);
   }

   // Function to select ether Array or MFFloat for color/normal/vertex arrays.
   X3DGeometryNode .createArray = function ()
   {
      if (ARRAY_TYPE == "MFFloat")
         return new Fields .MFFloat ();

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
         if (this .length !== this .typedArray .length)
            this .typedArray = new Float32Array (this);
         else
            this .typedArray .set (this);
      };

      return array;
   }

   X3DGeometryNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DGeometryNode,
      setup: function ()
      {
         X3DNode .prototype .setup .call (this);

         this .rebuild ();
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         this .isLive () .addInterest ("set_live__", this);

         this .addInterest ("requestRebuild", this);
         this ._rebuild .addInterest ("rebuild", this);

         this .primitiveMode         = gl .TRIANGLES;
         this .frontFace             = gl .CCW;
         this .attribBuffers         = [ ];
         this .textureCoordinateNode = browser .getDefaultTextureCoordinate ();
         this .texCoordBuffers       = Array .from ({length: browser .getMaxTextures ()}, () => gl .createBuffer ());
         this .fogDepthBuffer        = gl .createBuffer ();
         this .colorBuffer           = gl .createBuffer ();
         this .normalBuffer          = gl .createBuffer ();
         this .vertexBuffer          = gl .createBuffer ();
         this .vertexArray           = new VertexArray (gl);

         this .set_live__ ();
      },
      setGeometryType: function (value)
      {
         this .geometryType = value;
      },
      getGeometryType: function ()
      {
         return this .geometryType;
      },
      setTransparent: function (value)
      {
         if (value !== this ._transparent .getValue ())
            this ._transparent = value;
      },
      getTransparent: function ()
      {
         return this ._transparent .getValue ();
      },
      getBBox: function ()
      {
         // With screen matrix applied.
         return this .bbox;
      },
      setBBox: function (bbox)
      {
         if (bbox .equals (this .bbox))
            return;

         bbox .getExtents (this .min, this .max);

         this .bbox .assign (bbox);

         for (let i = 0; i < 5; ++ i)
            this .planes [i] .set (i % 2 ? this .min : this .max, boxNormals [i]);

         this ._bbox_changed .addEvent ();
      },
      getMin: function ()
      {
         // With screen matrix applied.
         return this .min;
      },
      getMax: function ()
      {
         // With screen matrix applied.
         return this .max;
      },
      getMatrix: function ()
      {
         return Matrix4 .Identity;
      },
      setPrimitiveMode: function (value)
      {
         this .primitiveMode = value;
      },
      getPrimitiveMode: function ()
      {
         return this .primitiveMode;
      },
      setSolid: function (value)
      {
         this .solid = value;
      },
      setCCW: function (value)
      {
         this .frontFace = value ? this .getBrowser () .getContext () .CCW : this .getBrowser () .getContext () .CW;
      },
      getAttrib: function ()
      {
         return this .attribNodes;
      },
      getAttribs: function ()
      {
         return this .attribArrays;
      },
      setFogDepths: function (value)
      {
         this .fogDepths .assign (value);
      },
      getFogDepths: function ()
      {
         return this .fogDepths;
      },
      setColors: function (value)
      {
         this .colors .assign (value);
      },
      getColors: function ()
      {
         return this .colors;
      },
      setMultiTexCoords: function (value)
      {
         const
            multiTexCoords = this .multiTexCoords,
            length         = value .length;

         for (let i = 0; i < length; ++ i)
            multiTexCoords [i] = value [i];

         multiTexCoords .length = length;
      },
      getMultiTexCoords: function ()
      {
         return this .multiTexCoords;
      },
      getTexCoords: function ()
      {
         return this .texCoords;
      },
      setTextureCoordinate: function (value)
      {
         this .textureCoordinateNode .removeInterest ("updateTextureCoordinateMapping", this);

         if (value)
            this .textureCoordinateNode = value;
         else
            this .textureCoordinateNode = this .getBrowser () .getDefaultTextureCoordinate ();

         this .textureCoordinateNode .addInterest ("updateTextureCoordinateMapping", this);

         this .updateTextureCoordinateMapping ();
      },
      updateTextureCoordinateMapping: function ()
      {
         this .textureCoordinateMapping .clear ();

         this .textureCoordinateNode .getTextureMapping (this .textureCoordinateMapping);
      },
      setNormals: function (value)
      {
         this .normals .assign (value);
      },
      getNormals: function ()
      {
         return this .normals;
      },
      setVertices: function (value)
      {
         this .vertices .assign (value);
      },
      getVertices: function ()
      {
         return this .vertices;
      },
      updateVertexArrays: function ()
      {
         this .vertexArray .update ();

         this .updateParticlesShadow = true;
         this .updateParticles       = true;
      },
      buildTexCoords: function ()
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
      getTexCoordParams: (function ()
      {
         const texCoordParams = { min: new Vector3 (0, 0, 0), Ssize: 0, Sindex: 0, Tindex: 0 };

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
               texCoordParams .Ssize = Xsize; texCoordParams .Sindex = 0;

               if (Ysize >= Zsize)
                  texCoordParams .Tindex = 1;
               else
                  texCoordParams .Tindex = 2;
            }
            else if ((Ysize >= Xsize) && (Ysize >= Zsize))
            {
               // Y size largest
               texCoordParams .Ssize = Ysize; texCoordParams .Sindex = 1;

               if (Xsize >= Zsize)
                  texCoordParams .Tindex = 0;
               else
                  texCoordParams .Tindex = 2;
            }
            else
            {
               // Z is the largest
               texCoordParams .Ssize = Zsize; texCoordParams .Sindex = 2;

               if (Xsize >= Ysize)
                  texCoordParams .Tindex = 0;
               else
                  texCoordParams .Tindex = 1;
            }

            return texCoordParams;
         };
      })(),
      refineNormals: function (normalIndex, normals, creaseAngle)
      {
         if (creaseAngle === 0)
            return normals;

         const
            cosCreaseAngle = Math .cos (Algorithm .clamp (creaseAngle, 0, Math .PI)),
            normals_       = [ ];

         for (const i in normalIndex) // Don't use forEach
         {
            const vertex = normalIndex [i];

            for (const p of vertex)
            {
               const
                  P = normals [p],
                  N = new Vector3 (0, 0, 0);

               for (const q of vertex)
               {
                  const Q = normals [q];

                  if (Q .dot (P) >= cosCreaseAngle)
                     N .add (Q);
               }

               normals_ [p] = N .normalize ();
            }
         }

         return normals_;
      },
      isClipped: function (point, clipPlanes)
      {
         return clipPlanes .some (function (clipPlane)
         {
            return clipPlane .isClipped (point);
         });
      },
      transformLine: function (hitRay)
      {
         // Apply sceen nodes transformation in place here.
      },
      transformMatrix: function (hitRay)
      {
         // Apply sceen nodes transformation in place here.
      },
      intersectsLine: (function ()
      {
         const
            modelViewMatrix = new Matrix4 (),
            uvt             = { u: 0, v: 0, t: 0 },
            v0              = new Vector3 (0, 0, 0),
            v1              = new Vector3 (0, 0, 0),
            v2              = new Vector3 (0, 0, 0),
            clipPoint       = new Vector3 (0, 0, 0);

         return function (hitRay, clipPlanes, modelViewMatrix_, intersections)
         {
            try
            {
               if (this .intersectsBBox (hitRay))
               {
                  this .transformLine   (hitRay);                                       // Apply screen transformations from screen nodes.
                  this .transformMatrix (modelViewMatrix .assign (modelViewMatrix_)); // Apply screen transformations from screen nodes.

                  const
                     texCoords  = this .multiTexCoords [0] .getValue (),
                     normals    = this .normals .getValue (),
                     vertices   = this .vertices .getValue ();

                  for (let i = 0, length = this .vertexCount; i < length; i += 3)
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

                        if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
                           continue;

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
            }
            catch (error)
            {
               console .log (error);
               return false;
            }
         };
      })(),
      intersectsBBox: (function ()
      {
         const intersection = new Vector3 (0, 0, 0);

         return function (hitRay, offset = 0)
         {
            const
               planes = this .planes,
               min    = this .min,
               max    = this .max,
               minX   = min .x - offset,
               maxX   = max .x + offset,
               minY   = min .y - offset,
               maxY   = max .y + offset,
               minZ   = min .z - offset,
               maxZ   = max .z + offset;

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
      intersectsBox: (function ()
      {
         const
            v0        = new Vector3 (0, 0, 0),
            v1        = new Vector3 (0, 0, 0),
            v2        = new Vector3 (0, 0, 0),
            invMatrix = new Matrix4 (),
            clipPoint = new Vector3 (0, 0, 0);

         return function (box, clipPlanes, modelViewMatrix)
         {
            try
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
            }
            catch (error)
            {
               console .log (error);
               return false;
            }
         };
      })(),
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
            this .getBrowser () .getBrowserOptions () ._Shading .addInterest ("set_shading__", this);
         else
            this .getBrowser () .getBrowserOptions () ._Shading .removeInterest ("set_shading__", this);
      },
      set_shading__: (function ()
      {
         const
            v0     = new Vector3 (0, 0, 0),
            v1     = new Vector3 (0, 0, 0),
            v2     = new Vector3 (0, 0, 0),
            normal = new Vector3 (0, 0, 0);

         return function (shading)
         {
            if (this .geometryType < 2)
               return;

            const flatShading = this .getBrowser () .getBrowserOptions () .getShading () === Shading .FLAT;

            if (flatShading === this .flatShading)
               return;

            this .flatShading = flatShading;

            // Generate flat normals if needed.

            const gl = this .getBrowser () .getContext ();

            if (flatShading)
            {
               if (! this .flatNormals .length)
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
         };
      })(),
      requestRebuild: function ()
      {
         this ._rebuild .addEvent ();
      },
      rebuild: (function ()
      {
         const point = new Vector3 (0, 0, 0);

         return function ()
         {
            this .clear ();
            this .build ();

            // Shrink arrays before transfer to graphics card.

            for (const attribArray of this .attribArrays)
               attribArray .shrinkToFit ();

            for (const multiTexCoord of this .multiTexCoords)
               multiTexCoord .shrinkToFit ();

            this .fogDepths .shrinkToFit ();
            this .colors    .shrinkToFit ();
            this .normals   .shrinkToFit ();
            this .vertices  .shrinkToFit ();

            // Determine bbox.

            const
               min      = this .min,
               max      = this .max,
               vertices = this .vertices .getValue ();

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

            if (this .multiTexCoords .length === 0)
               this .buildTexCoords ();

            if (this .multiTexCoords .length)
            {
               const maxTextures = this .getBrowser () .getMaxTextures ();

               for (let i = this .multiTexCoords .length; i < maxTextures; ++ i)
                  this .multiTexCoords [i] = this .multiTexCoords .at (-1);

               this .multiTexCoords .length = maxTextures;
            }

            // Upload normals or flat normals.

            this .set_shading__ (this .getBrowser () .getBrowserOptions () ._Shading);

            // Upload arrays.

            this .transfer ();
         };
      })(),
      clear: function ()
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
               attribArrays [a] = X3DGeometryNode .createArray ();

            attribArrays .length = length;
         }

         // Buffer

         this .flatShading = undefined;

         this .fogDepths      .length = 0;
         this .colors         .length = 0;
         this .multiTexCoords .length = 0;
         this .texCoords      .length = 0;
         this .normals        .length = 0;
         this .flatNormals    .length = 0;
         this .vertices       .length = 0;
      },
      transfer: function ()
      {
         const gl = this .getBrowser () .getContext ();

         // Transfer attribArrays.

         for (let i = this .attribBuffers .length, length = this .attribArrays .length; i < length; ++ i)
            this .attribBuffers .push (gl .createBuffer ());

         for (let i = 0, length = this .attribArrays .length; i < length; ++ i)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, this .attribBuffers [i]);
            gl .bufferData (gl .ARRAY_BUFFER, this .attribArrays [i] .getValue (), gl .DYNAMIC_DRAW);
         }

         // Transfer fog depths.

         const lastFogCoords = this .fogCoords;

         gl .bindBuffer (gl .ARRAY_BUFFER, this .fogDepthBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, this .fogDepths .getValue (), gl .DYNAMIC_DRAW);

         this .fogCoords = !! (this .fogDepths .length);

         if (this .fogCoords !== lastFogCoords)
            this .updateVertexArrays ();

         // Transfer colors.

         const lastColorMaterial = this .colorMaterial;

         gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, this .colors .getValue (), gl .DYNAMIC_DRAW);

         this .colorMaterial = !! (this .colors .length);

         if (this .colorMaterial !== lastColorMaterial)
            this .updateVertexArrays ();

         // Transfer multiTexCoords.

         for (let i = 0, length = this .multiTexCoords .length; i < length; ++ i)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [i]);
            gl .bufferData (gl .ARRAY_BUFFER, this .multiTexCoords [i] .getValue (), gl .DYNAMIC_DRAW);
         }

         // Transfer vertices.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, this .vertices .getValue (), gl .DYNAMIC_DRAW);

         this .vertexCount = this .vertices .length / 4;

         // Setup render functions.

         if (this .vertexCount)
         {
            // Use default render functions.

            delete this .depth;
            delete this .display;
            delete this .displayParticlesDepth;
            delete this .displayParticles;
         }
         else
         {
            // Use no render function.

            this .depth                 = Function .prototype;
            this .display               = Function .prototype;
            this .displayParticlesDepth = Function .prototype;
            this .displayParticles      = Function .prototype;
         }
      },
      traverse: function (type, renderObject)
      { },
      depth: function (gl, context, shaderNode)
      {
         shaderNode .enableVertexAttribute (gl, this .vertexBuffer, 0, 0);

         gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
      },
      display: function (gl, context)
      {
         const
            appearanceNode   = context .shapeNode .getAppearance (),
            materialNode     = appearanceNode .materialNode,
            backMaterialNode = appearanceNode .backMaterialNode,
            frontShaderNode  = appearanceNode .shaderNode || materialNode .getShader (context .browser, context .shadow);

         if (this .solid || !backMaterialNode || frontShaderNode .wireframe)
         {
            this .displayGeometry (gl, context, appearanceNode, frontShaderNode, true, true);
         }
         else
         {
            const backShaderNode = appearanceNode .shaderNode || backMaterialNode .getShader (context .browser, context .shadow)

            this .displayGeometry (gl, context, appearanceNode, backShaderNode,  true,  false);
            this .displayGeometry (gl, context, appearanceNode, frontShaderNode, false, true);
         }
      },
      displayGeometry: function (gl, context, appearanceNode, shaderNode, back, front)
      {
         if (shaderNode .isValid ())
         {
            const
               blendModeNode = appearanceNode .blendModeNode,
               attribNodes   = this .attribNodes,
               attribBuffers = this .attribBuffers;

            if (blendModeNode)
               blendModeNode .enable (gl);

            shaderNode .enable (gl);
            shaderNode .setLocalUniforms (gl, context, front);

            // Setup vertex attributes.

            if (this .vertexArray .enable (gl, shaderNode))
            {
               for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

               if (this .fogCoords)
                  shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

               if (this .colorMaterial)
                  shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

               shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
               shaderNode .enableNormalAttribute   (gl, this .normalBuffer,    0, 0);
               shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);
            }

            // Draw depending on wireframe, solid and transparent.

            if (shaderNode .wireframe)
            {
               // Points and Wireframes.

               if (shaderNode .primitiveMode === gl .POINTS)
               {
                  gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
               }
               else
               {
                  for (let i = 0, length = this .vertexCount; i < length; i += 3)
                     gl .drawArrays (shaderNode .primitiveMode, i, 3);
               }
            }
            else
            {
               const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

               gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));

               if (context .transparent || back !== front)
               {
                  // Render transparent or back or front.

                  gl .enable (gl .CULL_FACE);

                  // Render back.

                  if (back && !this .solid)
                  {
                     gl .cullFace (gl .FRONT);
                     gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
                  }

                  // Render front.

                  if (front)
                  {
                     gl .cullFace (gl .BACK);
                     gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
                  }
               }
               else
               {
                  // Render solid or both sides.

                  if (this .solid)
                     gl .enable (gl .CULL_FACE);
                  else
                     gl .disable (gl .CULL_FACE);

                  gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
               }
            }

            this .vertexArray .disable (gl);
            shaderNode .disable (gl);

            if (blendModeNode)
               blendModeNode .disable (gl);
         }
      },
      displayParticlesDepth: function (gl, context, shaderNode, particleSystem)
      {
         const outputParticles = particleSystem .outputParticles;

         if (outputParticles .shadowArray .enable (gl ,shaderNode) || this .updateParticlesShadow)
         {
            this .updateParticlesShadow = false;

            const particleStride = particleSystem .particleStride;

            shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, particleSystem .particleOffset, 1);
            shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, particleSystem .matrixOffset,   1);
            shaderNode .enableVertexAttribute         (gl, this .vertexBuffer, 0, 0);
         }

         gl .drawArraysInstanced (shaderNode .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);

         outputParticles .shadowArray .disable (gl);
         shaderNode .disable (gl);
      },
      displayParticles: function (gl, context, particleSystem)
      {
         const
            appearanceNode   = context .shapeNode .getAppearance (),
            materialNode     = appearanceNode .materialNode,
            backMaterialNode = appearanceNode .backMaterialNode,
            frontShaderNode  = appearanceNode .shaderNode || materialNode .getShader (context .browser, context .shadow);

         if (this .solid || !backMaterialNode || frontShaderNode .wireframe)
         {
            this .displayParticlesGeometry (gl, context, appearanceNode, frontShaderNode, true, true, particleSystem);
         }
         else
         {
            const backShaderNode = appearanceNode .shaderNode || backMaterialNode .getShader (context .browser, context .shadow);

            this .displayParticlesGeometry (gl, context, appearanceNode, backShaderNode,  true,  false, particleSystem);
            this .displayParticlesGeometry (gl, context, appearanceNode, frontShaderNode, false, true,  particleSystem);
         }
      },
      displayParticlesGeometry: function (gl, context, appearanceNode, shaderNode, back, front, particleSystem)
      {
         if (shaderNode .isValid ())
         {
            const
               blendModeNode = appearanceNode .blendModeNode,
               attribNodes   = this .attribNodes,
               attribBuffers = this .attribBuffers;

            if (blendModeNode)
               blendModeNode .enable (gl);

            // Setup shader.

            shaderNode .enable (gl);
            shaderNode .setLocalUniforms (gl, context, front);

            // Setup vertex attributes.

            const outputParticles = particleSystem .outputParticles;

            if (outputParticles .vertexArray .enable (gl ,shaderNode) || this .updateParticles)
            {
               this .updateParticles = false;

               const particleStride = particleSystem .particleStride;

               shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, particleSystem .particleOffset, 1);
               shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, particleSystem .matrixOffset,   1);

               for (let i = 0, length = attribNodes .length; i < length; ++ i)
                  attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

               if (this .fogCoords)
                  shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer, 0, 0);

               if (this .colorMaterial)
                  shaderNode .enableColorAttribute (gl, this .colorBuffer, 0, 0);

               shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, 0);
               shaderNode .enableNormalAttribute   (gl, this .normalBuffer,    0, 0);
               shaderNode .enableVertexAttribute   (gl, this .vertexBuffer,    0, 0);
            }

            // Draw depending on wireframe, solid and transparent.

            if (shaderNode .wireframe)
            {
               // Points and Wireframes.

               if (shaderNode .primitiveMode === gl .POINTS)
               {
                  gl .drawArraysInstanced (shaderNode .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);
               }
               else
               {
                  for (let i = 0, length = this .vertexCount; i < length; i += 3)
                     gl .drawArraysInstanced (shaderNode .primitiveMode, i, 3, particleSystem .numParticles);
               }
            }
            else
            {
               const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

               gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));

               if (context .transparent || back !== front)
               {
                  // Render transparent or back or front.

                  gl .enable (gl .CULL_FACE);

                  if (back && !this .solid)
                  {
                     gl .cullFace (gl .FRONT);
                     gl .drawArraysInstanced (shaderNode .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);
                  }

                  if (front)
                  {
                     gl .cullFace (gl .BACK);
                     gl .drawArraysInstanced (shaderNode .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);
                  }
               }
               else
               {
                  // Render solid or both sides.

                  if (this .solid)
                     gl .enable (gl .CULL_FACE);
                  else
                     gl .disable (gl .CULL_FACE);

                  gl .drawArraysInstanced (shaderNode .primitiveMode, 0, this .vertexCount, particleSystem .numParticles);
               }
            }

            outputParticles .shadowArray .disable (gl);
            shaderNode .disable (gl);

            if (blendModeNode)
               blendModeNode .disable (gl);
         }
      },
   });

   return X3DGeometryNode;
});
