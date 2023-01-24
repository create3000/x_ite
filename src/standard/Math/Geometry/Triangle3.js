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

import Vector3 from "../Numbers/Vector3.js";

const Triangle3 = {
   area: (function ()
   {
      const
         B = new Vector3 (0, 0, 0),
         C = new Vector3 (0, 0, 0);

      return function (a, b, c)
      {
         return B .assign (b) .subtract (a) .cross (C .assign (c) .subtract (a)) .magnitude () / 2;
      };
   })(),
   normal: function (v1, v2, v3, normal)
   {
      const
         x1 = v3 .x - v2 .x,
         y1 = v3 .y - v2 .y,
         z1 = v3 .z - v2 .z,
         x2 = v1 .x - v2 .x,
         y2 = v1 .y - v2 .y,
         z2 = v1 .z - v2 .z;

      normal .set (y1 * z2 - z1 * y2,
                   z1 * x2 - x1 * z2,
                   x1 * y2 - y1 * x2);

      return normal .normalize ();
   },
   quadNormal: function (v1, v2, v3, v4, normal)
   {
      const
         x1 = v3 .x - v1 .x,
         y1 = v3 .y - v1 .y,
         z1 = v3 .z - v1 .z,
         x2 = v4 .x - v2 .x,
         y2 = v4 .y - v2 .y,
         z2 = v4 .z - v2 .z;

      normal .set (y1 * z2 - z1 * y2,
                   z1 * x2 - x1 * z2,
                   x1 * y2 - y1 * x2);

      return normal .normalize ();
   },
   triangulatePolygon: (function ()
   {
      const tessy = (function ()
      {
         // Function called for each vertex of tesselator output.
         function vertexCallback (data, polyVertArray)
         {
            //console .log (data);
            polyVertArray [polyVertArray .length] = data;
         }

         function beginCallback (type)
         {
            if (type !== libtess .primitiveType .GL_TRIANGLES)
               console .log ('expected TRIANGLES but got type: ' + type);
         }

         function errorCallback (errno)
         {
            console .log ('error callback');
            console .log ('error number: ' + errno);
         }

         // Callback for when segments intersect and must be split.
         function combineCallback (coords, data, weight)
         {
            //console.log ('combine callback');
            return data [0];
         }

         function edgeCallback (flag)
         {
            // Don't really care about the flag, but need no-strip/no-fan behavior.
            // console .log ('edge flag: ' + flag);
         }

         const tessy = new libtess .GluTesselator ();

         tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
         tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_BEGIN,        beginCallback);
         tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_ERROR,        errorCallback);
         tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE,      combineCallback);
         tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_EDGE_FLAG,    edgeCallback);
         tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_TOLERANCE,    0);
         tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule .GLU_TESS_WINDING_ODD);

         return tessy;
      })();

      return function (/* contour, [ contour, ..., ] triangles */)
      {
         const triangles = arguments [arguments .length - 1];

         tessy .gluTessBeginPolygon (triangles);

         for (let i = 0, length = arguments .length - 1; i < length; ++ i)
         {
            tessy .gluTessBeginContour ();

            for (const point of arguments [i])
            {
               tessy .gluTessVertex (point, point);
            }

            tessy .gluTessEndContour ();
         }

         tessy .gluTessEndPolygon ();

         return triangles;
      };
   })(),
   triangulateConvexPolygon: function (vertices, triangles)
   {
      // Fallback: Very simple triangulation for convex polygons.
      for (let i = 1, length = vertices .length - 1; i < length; ++ i)
         triangles .push (vertices [0], vertices [i], vertices [i + 1]);
   },
   getPolygonNormal: function (vertices, normal)
   {
      // Determine polygon normal.
      // We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

      normal .set (0, 0, 0);

      var next = vertices [0];

      for (let i = 0, length = vertices .length; i < length; ++ i)
      {
         var
            current = next,
            next    = vertices [(i + 1) % length];

         normal .x += (current .y - next .y) * (current .z + next .z);
         normal .y += (current .z - next .z) * (current .x + next .x);
         normal .z += (current .x - next .x) * (current .y + next .y);
      }

      return normal .normalize ();
   },
};

export default Triangle3;
