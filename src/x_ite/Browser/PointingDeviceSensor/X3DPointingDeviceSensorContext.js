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

import PointingDevice from "./PointingDevice.js";
import PickingBuffer  from "../../Rendering/PickingBuffer.js";
import TraverseType   from "../../Rendering/TraverseType.js";
import Line3          from "../../../standard/Math/Geometry/Line3.js";
import ViewVolume     from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import MergeSort      from "../../../standard/Math/Algorithms/MergeSort.js";

const
   _pointingDevice  = Symbol (),
   _cursorType      = Symbol (),
   _pointer         = Symbol (),
   _hitRay          = Symbol (),
   _hits            = Symbol (),
   _enabledSensors  = Symbol (),
   _pickOnlySensors = Symbol (),
   _selectedLayer   = Symbol (),
   _overSensors     = Symbol (),
   _activeSensors   = Symbol (),
   _hitPointSorter  = Symbol (),
   _layerNumber     = Symbol (),
   _layerSorter     = Symbol (),
   _pointerTime     = Symbol ();

const line = new Line3 (Vector3 .Zero, Vector3 .Zero);

function X3DPointingDeviceSensorContext ()
{
   this [_pointingDevice] = new PointingDevice (this);
   this [_pointer]        = new Vector2 (0, 0);
   this [_hitRay]         = new Line3 (Vector3 .Zero, Vector3 .Zero);
   this [_hits]           = [ ];
   this [_enabledSensors] = [[ ]];
   this [_selectedLayer]  = null;
   this [_overSensors]    = [ ];
   this [_activeSensors]  = [ ];
   this [_hitPointSorter] = new MergeSort (this [_hits], function (lhs, rhs) { return lhs .intersection .point .z < rhs .intersection .point .z; });
   this [_layerSorter]    = new MergeSort (this [_hits], function (lhs, rhs) { return lhs .layerNumber < rhs .layerNumber; });
   this [_pointerTime]    = 0;
}

X3DPointingDeviceSensorContext .prototype =
{
   initialize: function ()
   {
      this .setCursor ("DEFAULT");

      this [_pointingDevice] .setup ();
   },
   setCursor: function (value)
   {
      const div = this .getSurface ();

      this [_cursorType] = value;

      switch (value)
      {
         case "HAND": // Hand with finger
            div .css ("cursor", "pointer");
            break;
         case "MOVE": // Hand grabed something
            div .css ("cursor", "move");
            break;
         case "CROSSHAIR":
            div .css ("cursor", "crosshair");
            break;
         default:
         {
            if (this ._loadCount .getValue ())
               div .css ("cursor", "wait");
            else if (this [_pointingDevice] && this [_pointingDevice] .isOver)
               div .css ("cursor", "pointer");
            else
               div .css ("cursor", "default");
            break;
         }
      }
   },
   getCursor: function ()
   {
      return this [_cursorType];
   },
   getPointer: function ()
   {
      return this [_pointer];
   },
   isPointerInRectangle: function (rectangle)
   {
      return this [_pointer] .x > rectangle .x &&
             this [_pointer] .x < rectangle .x + rectangle .z &&
             this [_pointer] .y > rectangle .y &&
             this [_pointer] .y < rectangle .y + rectangle .w;
   },
   setLayerNumber: function (value)
   {
      this [_layerNumber] = value;
   },
   getSelectedLayer: function ()
   {
      return this [_selectedLayer];
   },
   setHitRay: function (projectionMatrix, viewport)
   {
      ViewVolume .unProjectRay (this [_pointer] .x, this [_pointer] .y, Matrix4 .Identity, projectionMatrix, viewport, this [_hitRay]);
   },
   getHitRay: function ()
   {
      return this [_hitRay];
   },
   getSensors: function ()
   {
      return this [_enabledSensors];
   },
   getPickOnlySensors: function ()
   {
      return this [_pickOnlySensors];
   },
   addHit: function (intersection, layer, shape, modelViewMatrix)
   {
      this [_hits] .push ({
         pointer:         this [_pointer],
         hitRay:          this [_hitRay],
         intersection:    intersection,
         sensors:         this [_enabledSensors] .at (-1) .slice (),
         layer:           layer,
         layerNumber:     this [_layerNumber],
         shape:           shape,
         modelViewMatrix: modelViewMatrix .copy (),
      });
   },
   getHits: function ()
   {
      return this [_hits];
   },
   getNearestHit: function ()
   {
      return this [_hits] .at (-1);
   },
   buttonPressEvent: function (x, y)
   {
      this .touch (x, y, true);

      if (this [_hits] .length === 0)
         return false;

      const nearestHit = this .getNearestHit ();

      this [_selectedLayer] = nearestHit .layer;
      this [_activeSensors] = nearestHit .sensors;

      for (const sensor of this [_activeSensors])
         sensor .set_active__ (true, nearestHit);

      return !! nearestHit .sensors .length;
   },
   buttonReleaseEvent: function ()
   {
      this [_selectedLayer] = null;

      for (const sensor of this [_activeSensors])
         sensor .set_active__ (false, null);

      this [_activeSensors] = [ ];

      // Selection

      return true;
   },
   motionNotifyEvent: function (x, y)
   {
      this .touch (x, y, true);
      this .motion ();

      return !! (this [_hits] .length && this [_hits] .at (-1) .sensors .length);
   },
   leaveNotifyEvent: function ()
   { },
   touch: function (x, y, pickOnlySensors)
   {
      if (this .getViewer () ._isActive .getValue ())
      {
         this [_pointerTime] = 0;
         return;
      }

      const t0 = Date .now ();

      this [_pickOnlySensors] = pickOnlySensors;

      this [_pointer] .set (x, y);

      if (!this .pickingBuffer)
         this .pickingBuffer = new PickingBuffer (this, this .getViewport () [2], (this .getViewport () [3]));

      this .pickingBuffer .bind (x, y);
      this .getWorld () .traverse (TraverseType .DISPLAY, null);
      console .log (... this .pickingBuffer .readPixel (x, y));
      this .pickingBuffer .unbind ();

      // Clear hits.

      this [_hits] .length = 0;

      // Pick.

      this .getWorld () .traverse (TraverseType .POINTER, null);

      // Picking end.

      this [_hitPointSorter] .sort (0, this [_hits] .length);
      this [_layerSorter]    .sort (0, this [_hits] .length);

      this .addBrowserEvent ();
      this [_pointerTime] = Date .now () - t0;
   },
   motion: function ()
   {
      if (this [_hits] .length)
      {
         var nearestHit = this [_hits] .at (-1);
      }
      else
      {
         var nearestHit = {
            pointer:         this [_pointer],
            modelViewMatrix: new Matrix4 (),
            hitRay:          this [_selectedLayer] ? this [_hitRay] : line,
            intersection:    null,
            sensors:         [ ],
            shape:           null,
            layer:           null,
            layerNumber:     0,
         };
      }

      // Set isOver to FALSE for appropriate nodes

      if (this [_hits] .length)
      {
         var difference = this [_overSensors] .filter (a => !nearestHit .sensors .find (b => a .node === b .node));
      }
      else
      {
         var difference = this [_overSensors];
      }

      for (const sensor of difference)
         sensor .set_over__ (false, nearestHit);

      // Set isOver to TRUE for appropriate nodes

      if (this [_hits] .length)
      {
         this [_overSensors] = nearestHit .sensors;

         for (const sensor of this [_overSensors])
            sensor .set_over__ (true, nearestHit);
      }
      else
      {
         this [_overSensors] = [ ];
      }

      // Forward motion event to active drag sensor nodes

      for (const sensor of this [_activeSensors])
         sensor .set_motion__ (nearestHit);
   },
   getPointerTime: function ()
   {
      return this [_pointerTime];
   },
};

export default X3DPointingDeviceSensorContext;
