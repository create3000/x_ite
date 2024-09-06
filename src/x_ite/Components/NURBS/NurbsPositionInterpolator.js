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
import PositionInterpolator from "../Interpolation/PositionInterpolator.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import NURBS                from "../../Browser/NURBS/NURBS.js";
import nurbs                from "../../../lib/nurbs/nurbs.js";

function NurbsPositionInterpolator (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsPositionInterpolator);

   this .addChildObjects (X3DConstants .inputOutput, "rebuild", new Fields .SFTime ());

   this .interpolator  = new PositionInterpolator (executionContext);
   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ 128 ] };
}

Object .assign (Object .setPrototypeOf (NurbsPositionInterpolator .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._order        .addInterest ("requestRebuild",     this);
      this ._knot         .addInterest ("requestRebuild",     this);
      this ._weight       .addInterest ("requestRebuild",     this);
      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this ._rebuild .addInterest ("build", this);

      this ._set_fraction .addFieldInterest (this .interpolator ._set_fraction);
      this .interpolator ._value_changed .addFieldInterest (this ._value_changed);

      this .interpolator .setup ();

      this .set_controlPoint__ ();
   },
   set_controlPoint__ ()
   {
      if (this .controlPointNode)
         this .controlPointNode .removeInterest ("requestRebuild", this);

      this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

      if (this .controlPointNode)
         this .controlPointNode .addInterest ("requestRebuild", this);

      this .requestRebuild ();
   },
   getClosed (order, knot, weight, controlPointNode)
   {
      return NURBS .getClosed (order, knot, weight, controlPointNode);
   },
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS .getKnots (result, closed, order, dimension, knot);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPointNode)
   {
      return NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
   },
   requestRebuild ()
   {
      this ._rebuild .addEvent ();
   },
   build ()
   {
      if (this ._order .getValue () < 2)
         return;

      if (!this .controlPointNode)
         return;

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
         weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
         scale = knots .at (-1) - knots [0];

      // Initialize NURBS tessellator

      const degree = this ._order .getValue () - 1;

      this .surface = (this .surface ?? nurbs) ({
         boundary: ["open"],
         degree: [degree],
         knots: [knots],
         points: controlPoints,
         debug: false,
      });

      this .sampleOptions .haveWeights = !! weights;

      const
         mesh         = nurbs .sample (this .mesh, this .surface, this .sampleOptions),
         points       = mesh .points,
         interpolator = this .interpolator;

      interpolator ._key      .length = 0;
      interpolator ._keyValue .length = 0;

      for (let i = 0, length = points .length; i < length; i += 3)
      {
         interpolator ._key      .push (i / (length - 3));
         interpolator ._keyValue .push (new Fields .SFVec3f (points [i], points [i + 1], points [i + 2]));
      }
   },
});

Object .defineProperties (NurbsPositionInterpolator,
{
   ... X3DNode .getStaticProperties ("NurbsPositionInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",         new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knot",          new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default NurbsPositionInterpolator;
