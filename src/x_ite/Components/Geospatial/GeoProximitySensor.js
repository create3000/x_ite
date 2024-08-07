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

import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "../EnvironmentalSensor/X3DEnvironmentalSensorNode.js";
import X3DGeospatialObject        from "./X3DGeospatialObject.js";
import ProximitySensor            from "../EnvironmentalSensor/ProximitySensor.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";

var geoCoord = new Vector3 ();

function GeoProximitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);
   X3DGeospatialObject        .call (this, executionContext);

   this .addType (X3DConstants .GeoProximitySensor);

   this ._position_changed         .setUnit ("length");
   this ._centerOfRotation_changed .setUnit ("length");

   this .proximitySensor = new ProximitySensor (executionContext);

   this .setCameraObject   (this .proximitySensor .isCameraObject ());
   this .setPickableObject (this .proximitySensor .isPickableObject ());
}

Object .assign (Object .setPrototypeOf (GeoProximitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);
      X3DGeospatialObject        .prototype .initialize .call (this);

      this ._enabled .addFieldInterest (this .proximitySensor ._enabled);
      this ._size    .addFieldInterest (this .proximitySensor ._size);
      this ._center  .addFieldInterest (this .proximitySensor ._center);

      this ._geoCenter .addFieldInterest (this ._center);

      this .proximitySensor ._isCameraObject   .addFieldInterest (this ._isCameraObject);
      this .proximitySensor ._isPickableObject .addFieldInterest (this ._isPickableObject);

      this .proximitySensor ._isActive                 .addFieldInterest (this ._isActive);
      this .proximitySensor ._enterTime                .addFieldInterest (this ._enterTime);
      this .proximitySensor ._exitTime                 .addFieldInterest (this ._exitTime);
      this .proximitySensor ._position_changed         .addFieldInterest (this ._position_changed);
      this .proximitySensor ._orientation_changed      .addFieldInterest (this ._orientation_changed);
      this .proximitySensor ._centerOfRotation_changed .addFieldInterest (this ._centerOfRotation_changed);

      this .proximitySensor ._position_changed .addInterest ("set_position__", this);

      this .proximitySensor ._enabled = this ._enabled;
      this .proximitySensor ._size    = this ._size;
      this .proximitySensor ._center  = this ._center;

      this .proximitySensor .setup ();
   },
   set_position__ (position)
   {
      this ._geoCoord_changed = this .getGeoCoord (this .proximitySensor ._position_changed .getValue (), geoCoord);
   },
   traverse (type, renderObject)
   {
      this .proximitySensor .traverse (type, renderObject);
   },
   dispose ()
   {
      X3DGeospatialObject        .prototype .dispose .call (this);
      X3DEnvironmentalSensorNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoProximitySensor, X3DNode .getStaticProperties ("GeoProximitySensor", "Geospatial", 2, "children", "3.2"));

Object .defineProperties (GeoProximitySensor,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                   new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCenter",                new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geoCoord_changed",         new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default GeoProximitySensor;
