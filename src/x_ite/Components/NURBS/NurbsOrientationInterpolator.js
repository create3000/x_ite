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
import NurbsCurve           from "./NurbsCurve.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function NurbsOrientationInterpolator (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsOrientationInterpolator);

   this .addChildObjects (X3DConstants .inputOutput, "rebuild", new Fields .SFTime ());

   this .geometry = new NurbsCurve (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsOrientationInterpolator .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._order        .addFieldInterest (this .geometry ._order);
      this ._knot         .addFieldInterest (this .geometry ._knot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._tessellation = 2;
      this .geometry ._order        = this ._order;
      this .geometry ._knot         = this ._knot;
      this .geometry ._weight       = this ._weight;
      this .geometry ._controlPoint = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      this .derivative = surface .evaluator (1);
   },
   set_fraction__: (() =>
   {
      const
         direction = new Vector3 (),
         rotation  = new Rotation4 ();

      return function ()
      {
         const fraction = Algorithm .clamp (this ._set_fraction .getValue (), 0, 1);

         this .derivative (direction, fraction);

         this ._value_changed = rotation .setFromToVec (Vector3 .zAxis, direction);
      };
   })(),
});

Object .defineProperties (NurbsOrientationInterpolator,
{
   ... X3DNode .getStaticProperties ("NurbsOrientationInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",         new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knot",          new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default NurbsOrientationInterpolator;
