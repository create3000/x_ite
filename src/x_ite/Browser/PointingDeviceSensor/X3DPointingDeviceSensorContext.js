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
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Vector4        from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";

const
   _pointingDevice  = Symbol (),
   _cursorType      = Symbol (),
   _pointer         = Symbol (),
   _hit             = Symbol (),
   _overSensors     = Symbol (),
   _activeSensors   = Symbol (),
   _activeLayer     = Symbol (),
   _pointerTime     = Symbol (),
   _pickingBuffer   = Symbol (),
   _pickShaders     = Symbol (),
   _id              = Symbol (),
   _pickingContexts = Symbol (),
   _reshape         = Symbol ();

function X3DPointingDeviceSensorContext ()
{
   this [_pointingDevice]  = new PointingDevice (this);
   this [_pointer]         = new Vector2 (0, 0);
   this [_overSensors]     = [ ];
   this [_activeSensors]   = [ ];
   this [_activeLayer]     = null;
   this [_pointerTime]     = 0;
   this [_pickingBuffer]   = new PickingBuffer (this, 300, 150);
   this [_pickShaders]     = new Map ();
   this [_pickingContexts] = [ ];

   this [_hit] = {
      id: 0,
      pointer: this [_pointer],
      hitRay: null,
      sensors: [ ],
      modelViewMatrix: new Matrix4 (),
      point: new Vector3 (0, 0, 0),
      normal: new Vector3 (0, 0, 0),
      texCoord: new Vector4 (0, 0, 0, 0),
      layerNode: null,
      shapeNode: null,
   };
}

X3DPointingDeviceSensorContext .prototype =
{
   initialize: function ()
   {
      this .setCursor ("DEFAULT");

      this .getViewport () .addInterest (_reshape, this);

      this [_pointingDevice] .setup ();
   },
   getPointerTime: function ()
   {
      return this [_pointerTime];
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
   getActivePickLayer: function ()
   {
      return this [_activeLayer];
   },
   getHit: function ()
   {
      return this [_hit];
   },
   addPickingShape: function (pickingContext)
   {
      const id = ++ this [_id];

      this [_pickingContexts] [id] = pickingContext;

      return id;
   },
   buttonPressEvent: function (x, y)
   {
      if (!this .touch (x, y))
         return false;

      const hit = this [_hit];

      this [_activeSensors] = hit .sensors;
      this [_activeLayer]   = hit .layerNode;

      for (const sensor of this [_activeSensors])
         sensor .set_active__ (true, hit);

      return !! hit .sensors .length;
   },
   buttonReleaseEvent: function ()
   {
      this [_activeSensors] = Array .prototype;
      this [_activeLayer]   = null;

      for (const sensor of this [_activeSensors])
         sensor .set_active__ (false, null);
   },
   motionNotifyEvent: function (x, y)
   {
      this .touch (x, y);
      this .motion ();

      return !! this [_hit] .sensors .length;
   },
   leaveNotifyEvent: function ()
   { },
   touch: function (x, y, pickOnlySensors)
   {
      const t0 = Date .now ();

      if (this .getViewer () ._isActive .getValue ())
      {
         this [_pointerTime] = 0;
         return false;
      }

      // Pick.

      const hit = this [_hit];

      this [_id] = 0;

      this [_pointer] .set (x, y);
      this [_pickingBuffer] .bind (x, y);

      this .getWorld () .traverse (TraverseType .POINTER, null);

      this [_pickingBuffer] .getHit (x, y, hit);
      this [_pickingBuffer] .unbind ();

      if (hit .id)
      {
         const
            pickingContext = this [_pickingContexts] [hit .id],
            shapeNode      = pickingContext .shapeNode,
            appearanceNode = shapeNode .getAppearance (),
            geometryNode   = shapeNode .getGeometry ();

         hit .hitRay    = pickingContext .renderObject .getHitRay ();
         hit .sensors   = pickingContext .sensors;
         hit .layerNode = pickingContext .renderObject;
         hit .shapeNode = shapeNode;

         hit .modelViewMatrix .assign (pickingContext .modelViewMatrix);

         if (geometryNode .getNormals () .length)
            hit .modelViewMatrix .submatrix .inverse () .transpose () .multVecMatrix (hit .normal) .normalize ();
         else
            hit .normal .assign (Vector3 .Zero)

         if (geometryNode .getMultiTexCoords () .length)
            appearanceNode .getTextureTransform () .multVecMatrix (hit .texCoord);
         else
            hit .texCoord .assign (Vector4 .wAxis);
      }
      else
      {
         hit .hitRay    = this [_activeLayer] ? this [_activeLayer] .getHitRay () : null;
         hit .sensors   = Array .prototype;
         hit .layerNode = this [_activeLayer];
         hit .shapeNode = null;

         hit .modelViewMatrix .assign (Matrix4 .Identity);
      }

      // Picking end.

      this .addBrowserEvent ();
      this [_pointerTime] = Date .now () - t0;

      return !! hit .id;
   },
   motion: function ()
   {
      const hit = this [_hit];

      // Set isOver to FALSE for appropriate nodes

      if (hit .id)
      {
         var difference = this [_overSensors] .filter (a => !hit .sensors .find (b => a .node === b .node));
      }
      else
      {
         var difference = this [_overSensors];
      }

      for (const sensor of difference)
         sensor .set_over__ (false, hit);

      // Set isOver to TRUE for appropriate nodes

      if (hit .id)
      {
         this [_overSensors] = hit .sensors;

         for (const sensor of this [_overSensors])
            sensor .set_over__ (true, hit);
      }
      else
      {
         this [_overSensors] = Array .prototype;
      }

      // Forward motion event to active drag sensor nodes

      for (const sensor of this [_activeSensors])
         sensor .set_motion__ (hit);
   },
   getPickShader: function (numClipPlanes, particles)
   {
      let key = "";

      key += numClipPlanes;
      key += particles ? "1" : "0";

      return this [_pickShaders] .get (key) || this .createPickShader (key, numClipPlanes, particles);
   },
   createPickShader: function (key, numClipPlanes, particles)
   {
      const options = [ ];

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES");
         options .push ("X3D_NUM_CLIP_PLANES " + numClipPlanes);
      }

      if (particles)
         options .push ("X3D_PARTICLE_SYSTEM");

      const shaderNode = this .createShader ("PickShader", "Pick", "Pick", options);

      this [_pickShaders] .set (key, shaderNode);

      return shaderNode;
   },
   [_reshape]: function ()
   {
      const viewport = this .getViewport ();

      if (this [_pickingBuffer] .getWidth ()  === viewport [2] &&
          this [_pickingBuffer] .getHeight () === viewport [3])
      return;

      this [_pickingBuffer] .dispose ();

      this [_pickingBuffer] = new PickingBuffer (this, viewport [2], viewport [3]);
   },
};

export default X3DPointingDeviceSensorContext;
