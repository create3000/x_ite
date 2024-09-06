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
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

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
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._uOrder       .addFieldInterest (this .geometry ._uOrder);
      this ._vOrder       .addFieldInterest (this .geometry ._vOrder);
      this ._uDimension   .addFieldInterest (this .geometry ._uDimension);
      this ._vDimension   .addFieldInterest (this .geometry ._vDimension);
      this ._uKnot        .addFieldInterest (this .geometry ._uKnot);
      this ._vKnot        .addFieldInterest (this .geometry ._vKnot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._uTessellation = 2;
      this .geometry ._vTessellation = 2;
      this .geometry ._uOrder        = this ._uOrder;
      this .geometry ._vOrder        = this ._vOrder;
      this .geometry ._uDimension    = this ._uDimension;
      this .geometry ._vDimension    = this ._vDimension;
      this .geometry ._uKnot         = this ._uKnot;
      this .geometry ._vKnot         = this ._vKnot;
      this .geometry ._weight        = this ._weight;
      this .geometry ._controlPoint  = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      this .derivativeU = surface .evaluator ([1, 0]);
      this .derivativeV = surface .evaluator ([0, 1]);
   },
   set_fraction__: (() =>
   {
      const
         u        = new Vector3 (),
         v        = new Vector3 (),
         position = new Vector3 ();

      return function ()
      {
         const
            fraction  = this ._set_fraction .getValue (),
            fractionU = Algorithm .clamp (fraction .x, 0, 1),
            fractionV = Algorithm .clamp (fraction .y, 0, 1),
            surface   = this .geometry .getSurface ();

         this .derivativeU (u, fractionU, fractionV);
         this .derivativeV (v, fractionU, fractionV);
         surface .evaluate (position, fractionU, fractionV);

         this ._normal_changed   = u .cross (v);
         this ._position_changed = position;
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
