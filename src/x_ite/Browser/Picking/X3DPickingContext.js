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

import TraverseType from "../../Rendering/TraverseType.js";
import StopWatch    from "../../../standard/Time/StopWatch.js";

const
   _transformSensorNodes = Symbol (),
   _pickSensorNodes      = Symbol (),
   _pickingHierarchy     = Symbol (),
   _pickable             = Symbol (),
   _pickingTime          = Symbol ();

function X3DPickingContext ()
{
   this [_transformSensorNodes] = new Set ();
   this [_pickSensorNodes]      = [ new Set () ];
   this [_pickingHierarchy]     = [ ];
   this [_pickable]             = [ false ];
   this [_pickingTime]          = new StopWatch ();
}

Object .assign (X3DPickingContext .prototype,
{
   addTransformSensor (transformSensorNode)
   {
      this [_transformSensorNodes] .add (transformSensorNode);
      this .enablePicking ();
   },
   removeTransformSensor (transformSensorNode)
   {
      this [_transformSensorNodes] .delete (transformSensorNode);
      this .enablePicking ();
   },
   addPickSensor (pickSensorNode)
   {
      this [_pickSensorNodes] [0] .add (pickSensorNode);
      this .enablePicking ();
   },
   removePickSensor (pickSensorNode)
   {
      this [_pickSensorNodes] [0] .delete (pickSensorNode);
      this .enablePicking ();
   },
   getPickSensors ()
   {
      return this [_pickSensorNodes];
   },
   getPickingHierarchy ()
   {
      return this [_pickingHierarchy];
   },
   getPickable ()
   {
      return this [_pickable];
   },
   enablePicking ()
   {
      if (this [_transformSensorNodes] .size || this [_pickSensorNodes] [0] .size)
         this ._sensorEvents .addInterest ("picking", this);
      else
         this ._sensorEvents .removeInterest ("picking", this);
   },
   picking ()
   {
      this [_pickingTime] .start ();

      this .getWorld () .traverse (TraverseType .PICKING);

      for (const transformSensorNode of this [_transformSensorNodes])
      {
         transformSensorNode .process ();
      }

      for (const pickSensorNode of this [_pickSensorNodes] [0])
      {
         pickSensorNode .process ();
      }

      this [_pickingTime] .stop ();
   },
   getPickingTime ()
   {
      return this [_pickingTime];
   },
});

export default X3DPickingContext;
