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
import X3DInterpolatorNode  from "../Interpolation/X3DInterpolatorNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import Geocentric           from "../../Browser/Geospatial/Geocentric.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function GeoPositionInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoPositionInterpolator);

   // Units

   this ._value_changed .setUnit ("length");

   // Private properties
   
   this .geocentric = new Geocentric ();
}

Object .assign (Object .setPrototypeOf (GeoPositionInterpolator .prototype, X3DInterpolatorNode .prototype),
   X3DGeospatialObject .prototype,
{
   setup ()
   {
      X3DGeospatialObject .prototype .initialize .call (this);

      X3DInterpolatorNode .prototype .setup .call (this);
   },
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
   },
   interpolate: (() =>
   {
      const
         keyValue0 = new Vector3 (),
         keyValue1 = new Vector3 (),
         geovalue  = new Vector3 ();

      return function (index0, index1, weight)
      {
         this .getCoord (this ._keyValue [index0] .getValue (), keyValue0);
         this .getCoord (this ._keyValue [index1] .getValue (), keyValue1);

         const coord = this .geocentric .slerp (keyValue0, keyValue1, weight);

         this ._geovalue_changed = this .getGeoCoord (coord, geovalue);
         this ._value_changed    = coord;
      };
   })(),
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DInterpolatorNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoPositionInterpolator,
{
   ... X3DNode .getStaticProperties ("GeoPositionInterpolator", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "key",              new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "keyValue",         new Fields .MFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geovalue_changed", new Fields .SFVec3d ()),
      ]),
      enumerable: true,
   },
});

export default GeoPositionInterpolator;
