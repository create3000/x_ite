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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode",
   "x_ite/Components/Geospatial/X3DGeospatialObject",
   "x_ite/Components/EnvironmentalSensor/ProximitySensor",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentalSensorNode,
          X3DGeospatialObject,
          ProximitySensor,
          X3DConstants,
          Vector3)
{
"use strict";

   var geoCoord = new Vector3 (0, 0, 0);

   function GeoProximitySensor (executionContext)
   {
      X3DEnvironmentalSensorNode .call (this, executionContext);
      X3DGeospatialObject        .call (this, executionContext);

      this .addType (X3DConstants .GeoProximitySensor);

      this .position_changed_         .setUnit ("length");
      this .centerOfRotation_changed_ .setUnit ("length");

      this .proximitySensor = new ProximitySensor (executionContext);

      this .setCameraObject   (this .proximitySensor .getCameraObject ());
      this .setPickableObject (this .proximitySensor .getPickableObject ());
   }

   GeoProximitySensor .prototype = Object .assign (Object .create (X3DEnvironmentalSensorNode .prototype),
      X3DGeospatialObject .prototype,
   {
      constructor: GeoProximitySensor,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geoCoord_changed",         new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "GeoProximitySensor";
      },
      getComponentName: function ()
      {
         return "Geospatial";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DEnvironmentalSensorNode .prototype .initialize .call (this);
         X3DGeospatialObject        .prototype .initialize .call (this);

         this .enabled_ .addFieldInterest (this .proximitySensor .enabled_);
         this .size_    .addFieldInterest (this .proximitySensor .size_);
         this .center_  .addFieldInterest (this .proximitySensor .center_);

         this .proximitySensor .isCameraObject_   .addFieldInterest (this .isCameraObject_);
         this .proximitySensor .isPickableObject_ .addFieldInterest (this .isPickableObject_);

         this .proximitySensor .isActive_                 .addFieldInterest (this .isActive_);
         this .proximitySensor .enterTime_                .addFieldInterest (this .enterTime_);
         this .proximitySensor .exitTime_                 .addFieldInterest (this .exitTime_);
         this .proximitySensor .position_changed_         .addFieldInterest (this .position_changed_);
         this .proximitySensor .orientation_changed_      .addFieldInterest (this .orientation_changed_);
         this .proximitySensor .centerOfRotation_changed_ .addFieldInterest (this .centerOfRotation_changed_);

         this .proximitySensor .position_changed_ .addInterest ("set_position__", this);

         this .proximitySensor .enabled_ = this .enabled_;
         this .proximitySensor .size_    = this .size_;
         this .proximitySensor .center_  = this .center_;

         this .proximitySensor .setup ();
      },
      set_position__: function (position)
      {
         this .geoCoord_changed_ = this .getGeoCoord (this .proximitySensor .position_changed_ .getValue (), geoCoord);
      },
      traverse: function (type, renderObject)
      {
         this .proximitySensor .traverse (type, renderObject);
      },
   });

   return GeoProximitySensor;
});
