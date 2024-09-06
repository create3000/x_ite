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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import NurbsPatchSurface    from "./NurbsPatchSurface.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Triangle2            from "../../../standard/Math/Geometry/Triangle2.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function NurbsSurfaceInterpolator (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsSurfaceInterpolator);

   this .geometry = new NurbsPatchSurface (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSurfaceInterpolator .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._uOrder       .addFieldInterest (this .geometry ._uOrder);
      this ._vOrder       .addFieldInterest (this .geometry ._vOrder);
      this ._uDimension   .addFieldInterest (this .geometry ._uDimension);
      this ._vDimension   .addFieldInterest (this .geometry ._vDimension);
      this ._uKnot        .addFieldInterest (this .geometry ._uKnot);
      this ._vKnot        .addFieldInterest (this .geometry ._vKnot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._uTessellation = 128;
      this .geometry ._vTessellation = 128;
      this .geometry ._uOrder        = this ._uOrder;
      this .geometry ._vOrder        = this ._vOrder;
      this .geometry ._uDimension    = this ._uDimension;
      this .geometry ._vDimension    = this ._vDimension;
      this .geometry ._uKnot         = this ._uKnot;
      this .geometry ._vKnot         = this ._vKnot;
      this .geometry ._weight        = this ._weight;
      this .geometry ._controlPoint  = this ._controlPoint;

      this .geometry .setup ();
   },
   set_fraction__: (() =>
   {
      const
         a        = new Vector2 (),
         b        = new Vector2 (),
         c        = new Vector2 (),
         uvt      = { },
         normal   = new Vector3 (),
         position = new Vector3 ();

      return function ()
      {
         const
            fraction       = this ._set_fraction .getValue (),
            texCoordsArray = this .geometry .getTexCoords (),
            normalArray    = this .geometry .getNormals (),
            verticesArray  = this .geometry .getVertices (),
            numTexCoords   = texCoordsArray .length;

         const MIN_BARYCENTRIC_DISTANCE = 1e-5;

         for (let i4 = 0, i3 = 0; i4 < numTexCoords; i4 += 12, i3 += 9)
         {
            a .set (texCoordsArray [i4 + 0], texCoordsArray [i4 + 1]);
            b .set (texCoordsArray [i4 + 4], texCoordsArray [i4 + 5]);
            c .set (texCoordsArray [i4 + 8], texCoordsArray [i4 + 9]);

            const { u, v, t } = Triangle2 .toBarycentric (fraction, a, b, c, uvt);

            // Check if fraction lies in triangle.

            if (Math .abs (u - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
               continue;

            if (Math .abs (v - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
               continue;

            if (Math .abs (t - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
               continue;

            // Interpolate point on surface.

            normal .set (
               u * normalArray [i3 + 0] + v * normalArray [i3 + 3] + t * normalArray [i3 + 6],
               u * normalArray [i3 + 1] + v * normalArray [i3 + 4] + t * normalArray [i3 + 7],
               u * normalArray [i3 + 2] + v * normalArray [i3 + 5] + t * normalArray [i3 + 8],
            );

            position .set (
               u * verticesArray [i4 + 0] + v * verticesArray [i4 + 4] + t * verticesArray [i4 + 8],
               u * verticesArray [i4 + 1] + v * verticesArray [i4 + 5] + t * verticesArray [i4 + 9],
               u * verticesArray [i4 + 2] + v * verticesArray [i4 + 6] + t * verticesArray [i4 + 10],
            );

            this ._normal_changed   = normal;
            this ._position_changed = position;

            break;
         }
      };
   })(),
});

Object .defineProperties (NurbsSurfaceInterpolator,
{
   ... X3DNode .getStaticProperties ("NurbsSurfaceInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",           new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "normal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default NurbsSurfaceInterpolator;
