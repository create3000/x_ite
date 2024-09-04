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

import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DNurbsSurfaceGeometryNode from "./X3DNurbsSurfaceGeometryNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import X3DCast                     from "../../Base/X3DCast.js";
import Vector3                     from "../../../standard/Math/Numbers/Vector3.js";
import Triangle2                   from "../../../standard/Math/Geometry/Triangle2.js";
import Triangle3                   from "../../../standard/Math/Geometry/Triangle3.js";
import libtess                     from "../../../lib/libtess.js";
import Algorithm from "../../../standard/Math/Algorithm.js";

function NurbsTrimmedSurface (executionContext)
{
   X3DNurbsSurfaceGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsTrimmedSurface);

   this .trimmingContourNodes = [ ];
   this .trimmingContours     = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsTrimmedSurface .prototype, X3DNurbsSurfaceGeometryNode .prototype),
{
   initialize ()
   {
      X3DNurbsSurfaceGeometryNode .prototype .initialize .call (this);

      this ._addTrimmingContour    .addInterest ("set_addTrimmingContour__",    this);
      this ._removeTrimmingContour .addInterest ("set_removeTrimmingContour__", this);
      this ._trimmingContour       .addInterest ("set_trimmingContour__",       this);

      this .set_trimmingContour__ ();
   },
   set_addTrimmingContour__ ()
   {
      this ._addTrimmingContour .setTainted (true);
      this ._addTrimmingContour .assign (filter (this ._addTrimmingContour, this ._trimmingContour), this ._addTrimmingContour .length);

      for (const trimmingContour of this ._addTrimmingContour)
         this ._trimmingContour .push (trimmingContour);

      this ._addTrimmingContour .length = 0;
      this ._addTrimmingContour .setTainted (false);
   },
   set_removeTrimmingContour__ ()
   {
      this ._removeTrimmingContour .setTainted (true);
      this ._trimmingContour .assign (filter (this ._trimmingContour, this ._removeTrimmingContour));

      this ._removeTrimmingContour .length = 0;
      this ._removeTrimmingContour .setTainted (false);
   },
   set_trimmingContour__ ()
   {
      const trimmingContourNodes = this .trimmingContourNodes;

      for (const trimmingContourNode of trimmingContourNodes)
         trimmingContourNode .removeInterest ("addNodeEvent", this);

      trimmingContourNodes .length = 0;

      for (const node of this ._trimmingContour)
      {
         const trimmingContourNode = X3DCast (X3DConstants .Contour2D, node);

         if (trimmingContourNode)
            trimmingContourNodes .push (trimmingContourNode);
      }

      for (const trimmingContourNode of trimmingContourNodes)
         trimmingContourNode .addInterest ("addNodeEvent", this);
   },
   getTrimmingContours (offset, scale, trimmingContours)
   {
      for (const trimmingContourNode of this .trimmingContourNodes)
         trimmingContourNode .addTrimmingContour (offset, scale, trimmingContours);

      return trimmingContours;
   },
   trimSurface (uKnots, vKnots)
   {
      const
         uMin   = uKnots .at (0),
         vMin   = vKnots .at (0),
         uMax   = uKnots .at (-1),
         vMax   = vKnots .at (-1),
         uScale = uMax - uMin,
         vScale = vMax - vMin;

      const
         offset = new Vector3 (uMin, vMin, 0),
         scale  = new Vector3 (uScale, vScale, 1)

      const unitSquare = [
         new Vector3 (0, 0, 0),
         new Vector3 (1, 0, 0),
         new Vector3 (1, 1, 0),
         new Vector3 (0, 1, 0),
      ];

      const
         defaultTriangles     = this .createDefaultNurbsTriangles ([ ]),
         numDefaultTriangles  = defaultTriangles .length,
         trimmingContours     = this .getTrimmingContours (offset, scale, [unitSquare]),
         trimmingTriangles    = this .triangulatePolygon (trimmingContours, [ ]),
         numTrimmingTriangles = trimmingTriangles .length,
         contours             = [ ];

      for (let i = 0; i < numDefaultTriangles; i += 3)
         contours .push ([defaultTriangles [i], defaultTriangles [i + 1], defaultTriangles [i + 2]])

      for (let i = 0; i < numTrimmingTriangles; i += 3)
         contours .push ([trimmingTriangles [i], trimmingTriangles [i + 1], trimmingTriangles [i + 2]]);

      const
         trimmedTriangles = this .triangulatePolygon (contours, [ ]),
         trimmedTexCoords = [ ],
         trimmedNormals   = [ ],
         trimmedVertices  = [ ],
         texCoordArray    = this .getTexCoords (),
         normalArray      = this .getNormals (),
         vertexArray      = this .getVertices (),
         uvt              = { };

      console .log (trimmedTriangles .toString ());

      const EPSILON = 1e-3;

      for (const p of trimmedTriangles)
      {
         for (let d = 0; d < numDefaultTriangles; d += 3)
         {
            const
               a = defaultTriangles [d],
               b = defaultTriangles [d + 1],
               c = defaultTriangles [d + 2];

            const { u, v, t } = Triangle2 .toBarycentric (p, a, b, c, uvt);

            if (Math .abs (u - 0.5) > 0.5 + EPSILON)
               continue;

            if (Math .abs (v - 0.5) > 0.5 + EPSILON)
               continue;

            if (Math .abs (t - 0.5) > 0.5 + EPSILON)
               continue;

            trimmedTexCoords .push (
               u * texCoordArray [d * 4 + 0] + v * texCoordArray [d * 4 + 4] + t * texCoordArray [d * 4 + 8],
               u * texCoordArray [d * 4 + 1] + v * texCoordArray [d * 4 + 5] + t * texCoordArray [d * 4 + 9],
               u * texCoordArray [d * 4 + 2] + v * texCoordArray [d * 4 + 6] + t * texCoordArray [d * 4 + 10],
               1);

            trimmedNormals .push (
               u * normalArray [d * 3 + 0] + v * normalArray [d * 3 + 3] + t * normalArray [d * 3 + 6],
               u * normalArray [d * 3 + 1] + v * normalArray [d * 3 + 4] + t * normalArray [d * 3 + 7],
               u * normalArray [d * 3 + 2] + v * normalArray [d * 3 + 5] + t * normalArray [d * 3 + 8]);

            trimmedVertices .push (
               u * vertexArray [d * 4 + 0] + v * vertexArray [d * 4 + 4] + t * vertexArray [d * 4 + 8],
               u * vertexArray [d * 4 + 1] + v * vertexArray [d * 4 + 5] + t * vertexArray [d * 4 + 9],
               u * vertexArray [d * 4 + 2] + v * vertexArray [d * 4 + 6] + t * vertexArray [d * 4 + 10],
               1);

            break;
         }
      }

      texCoordArray .assign (trimmedTexCoords);
      normalArray   .assign (trimmedNormals);
      vertexArray   .assign (trimmedVertices);
   },
   createDefaultNurbsTriangles (triangles)
   {
      const
         texCoordArray = this .createDefaultNurbsTexCoords ([ ]),
         numTexCoords  = texCoordArray .length;

      for (let i = 0; i < numTexCoords; i += 4)
         triangles .push (new Vector3 (texCoordArray [i], texCoordArray [i + 1], 0));

      return triangles;
   },
   triangulatePolygon: (() =>
   {
      // Function called for each vertex of tessellator output.

      function vertexCallback (point, triangles)
      {
         triangles .push (point);
      }

      function combineCallback (coords, data, weight)
      {
         return new Vector3 (... coords);
      }

      const tessy = new libtess .GluTesselator ();

      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE,      combineCallback);
      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule .GLU_TESS_WINDING_ODD);
      tessy .gluTessNormal (0, 0, 1);

      return function (contours, triangles)
      {
         tessy .gluTessBeginPolygon (triangles);

         for (const points of contours)
         {
            tessy .gluTessBeginContour ();

            for (const point of points)
               tessy .gluTessVertex (point, point);

            tessy .gluTessEndContour ();
         }

         tessy .gluTessEndPolygon ();

         return triangles;
      };
   })(),
});

function filter (array, remove)
{
   const set = new Set (remove);

   return array .filter (value => !set .has (value));
}

Object .defineProperties (NurbsTrimmedSurface,
{
   ... X3DNode .getStaticProperties ("NurbsTrimmedSurface", "NURBS", 4, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "uTessellation",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vTessellation",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uClosed",               new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vClosed",               new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",                new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",                new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",                 new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",                 new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",                new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addTrimmingContour",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeTrimmingContour", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trimmingContour",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default NurbsTrimmedSurface;
