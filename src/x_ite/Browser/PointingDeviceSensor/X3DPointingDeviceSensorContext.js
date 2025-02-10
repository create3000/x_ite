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
import PointingBuffer from "../../Rendering/PointingBuffer.js";
import TraverseType   from "../../Rendering/TraverseType.js";
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Vector4        from "../../../standard/Math/Numbers/Vector4.js";
import Line3          from "../../../standard/Math/Geometry/Line3.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import StopWatch      from "../../../standard/Time/StopWatch.js";

const
   _pointingDevice            = Symbol (),
   _pointingDeviceSensorNodes = Symbol (),
   _cursorType                = Symbol (),
   _pointer                   = Symbol (),
   _hit                       = Symbol (),
   _overSensors               = Symbol (),
   _activeSensors             = Symbol (),
   _pointingLayer             = Symbol (),
   _pointingTime              = Symbol (),
   _pointingBuffer            = Symbol (),
   _pointingShaders           = Symbol (),
   _inputSource               = Symbol (),
   _id                        = Symbol (),
   _pointingContexts          = Symbol (),
   _processEvents             = Symbol .for ("X_ITE.X3DRoutingContext.processEvents");

function X3DPointingDeviceSensorContext ()
{
   this [_pointingDevice]            = new PointingDevice (this .getPrivateScene ());
   this [_pointingDeviceSensorNodes] = new Set ();
   this [_pointer]                   = new Vector2 ();
   this [_overSensors]               = [ ];
   this [_activeSensors]             = new Map ();
   this [_pointingLayer]             = null;
   this [_pointingTime]              = new StopWatch ();
   this [_pointingBuffer]            = new PointingBuffer (this);
   this [_pointingShaders]           = new Map ();
   this [_pointingContexts]          = [ ];

   this [_hit] = {
      id: 0,
      pointer: this [_pointer],
      ray: new Line3 (),
      sensors: [ ],
      modelViewMatrix: new Matrix4 (),
      point: new Vector3 (),
      normal: new Vector3 (),
      texCoord: new Vector4 (),
      layerNode: null,
      shapeNode: null,
      copy ()
      {
         return {
            id: this .id,
            pointer: this .pointer .copy (),
            ray: this .ray .copy (),
            sensors: this .sensors .slice (),
            modelViewMatrix: this .modelViewMatrix .copy (),
            point: this .point .copy (),
            normal: this .normal .copy (),
            texCoord: this .texCoord .copy (),
            layerNode: this .layerNode,
            shapeNode: this .shapeNode,
            copy: this .copy,
         };
      },
   };
}

Object .assign (X3DPointingDeviceSensorContext .prototype,
{
   initialize ()
   {
      this .setCursor ("DEFAULT");

      this [_pointingDevice] .setup ();
   },
   getPointingTime ()
   {
      return this [_pointingTime];
   },
   addPointingDeviceSensor (node)
   {
      this [_pointingDeviceSensorNodes] .add (node);
   },
   removePointingDeviceSensor (node)
   {
      this [_pointingDeviceSensorNodes] .delete (node);
   },
   setCursor (value)
   {
      const div = this .getSurface ();

      this [_cursorType] = value;

      switch (value)
      {
         case "HAND": // Hand with finger
            div .css ("cursor", "pointer");
            break;
         case "MOVE": // Hand grabbed something
            div .css ("cursor", "move");
            break;
         case "CROSSHAIR":
            div .css ("cursor", "crosshair");
            break;
         default:
         {
            if (this .getDisplayLoadCount ())
               div .css ("cursor", "wait");
            else if (this [_pointingDevice] ?.isOver)
               div .css ("cursor", "pointer");
            else
               div .css ("cursor", "default");
            break;
         }
      }
   },
   getCursor ()
   {
      return this [_cursorType];
   },
   getPointer ()
   {
      return this [_pointer];
   },
   getPointerFromEvent ({ pageX, pageY })
   {
      const
         offset   = this .getSurface () .offset (),
         rect     = this .getSurface () [0] .getBoundingClientRect (),
         viewport = this .getViewport (),
         x        =      (pageX - offset .left) / rect .width   * viewport [2],
         y        = (1 - (pageY - offset .top)  / rect .height) * viewport [3];

      return new Vector2 (x, y);
   },
   isPointerInRectangle (rectangle, pointer = this [_pointer])
   {
      return pointer .x >= rectangle .x &&
             pointer .x <= rectangle .x + rectangle .z &&
             pointer .y >= rectangle .y &&
             pointer .y <= rectangle .y + rectangle .w;
   },
   getPointingInputSource ()
   {
      return this [_inputSource];
   },
   getPointingLayer ()
   {
      return this [_pointingLayer];
   },
   getHit ()
   {
      return this [_hit];
   },
   addPointingShape (pointingContext)
   {
      const id = ++ this [_id];

      this [_pointingContexts] [id] = pointingContext;

      return id;
   },
   buttonPressEvent (x, y, hit = this [_hit])
   {
      if (!this [_pointingDeviceSensorNodes] .size)
         return false;

      if (hit === this [_hit])
      {
         if (!this .touch (x, y))
            return false;
      }

      this [_pointingLayer] = hit .layerNode;

      for (const sensor of hit .sensors)
      {
         if (this [_activeSensors] .has (sensor .node))
            continue;

         this [_activeSensors] .set (sensor .node, sensor);

         sensor .set_active__ (true, hit);
      }

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();

      return !! hit .sensors .length;
   },
   buttonReleaseEvent (hit = this [_hit])
   {
      if (!this [_pointingDeviceSensorNodes] .size)
         return;

      this [_pointingLayer] = null;

      for (const [node, sensor] of this [_activeSensors])
      {
         if (sensor .hit !== hit)
            continue;

         sensor .set_active__ (false, hit);

         this [_activeSensors] .delete (node);
      }

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();
   },
   motionNotifyEvent (x, y, hit = this [_hit])
   {
      if (!this [_pointingDeviceSensorNodes] .size)
         return false;

      if (hit === this [_hit])
         this .touch (x, y);

      this .motion (hit);

      // Immediately process events to be able
      // to do audio and window.open stuff.
      this [_processEvents] ();

      return !! hit .sensors .length;
   },
   leaveNotifyEvent ()
   { },
   touch (x, y, inputSource = null, hit = this [_hit])
   {
      this [_pointingTime] .start ();

      if (this .getViewer () ._isActive .getValue ())
      {
         this [_pointingTime] .reset ();
         return false;
      }

      if (Boolean (this .getPose ()) !== Boolean (inputSource))
         return false;

      // Pick.

      hit .sensors .length = 0;

      this [_inputSource] = inputSource;
      this [_id]          = 0;

      this [_pointer] .set (x, y);
      this [_pointingBuffer] .bind ();

      this .getWorld () .traverse (TraverseType .POINTER);

      this [_pointingBuffer] .getHit (hit);

      if (Number .isInteger (hit .id) && hit .id > 0 && hit .id <= this [_id])
      {
         const
            pointingContext = this [_pointingContexts] [hit .id],
            shapeNode       = pointingContext .shapeNode,
            appearanceNode  = shapeNode .getAppearance (),
            geometryContext = shapeNode .getGeometryContext ();

         hit .ray .assign (pointingContext .renderObject .getHitRay ());
         hit .sensors .push (... pointingContext .sensors);
         hit .sensors .forEach (sensor => sensor .hit = hit);

         hit .layerNode = pointingContext .renderObject;
         hit .shapeNode = shapeNode;

         hit .modelViewMatrix .assign (pointingContext .modelViewMatrix);

         // A ParticleSystem has only a geometry context.

         if (geometryContext .hasNormals)
            hit .modelViewMatrix .submatrix .inverse () .transpose () .multVecMatrix (hit .normal) .normalize ();
         else
            hit .normal .assign (Vector3 .zAxis);

         appearanceNode .getTextureTransform () .transformPoint (hit .texCoord);
      }
      else
      {
         hit .id = 0;

         if (this [_pointingLayer])
            hit .ray .assign (this [_pointingLayer] .getHitRay ());

         hit .layerNode = this [_pointingLayer];
         hit .shapeNode = null;

         hit .modelViewMatrix .assign (Matrix4 .Identity);
      }

      // Picking end.

      this .addBrowserEvent ();
      this [_pointingTime] .stop ();

      return !! hit .id;
   },
   motion (hit = this [_hit])
   {
      // Set isOver to FALSE for appropriate nodes

      const sensors = hit .combinedSensors ?? hit .sensors;

      for (const sensor of this [_overSensors])
      {
         if (sensors .some (other => sensor .node === other .node))
            continue;

         sensor .set_over__ (false, hit);
      }

      // Set isOver to TRUE for appropriate nodes

      this [_overSensors] .length = 0;

      if (sensors .length)
      {
         this [_overSensors] .push (... sensors);

         for (const sensor of this [_overSensors])
            sensor .set_over__ (true, hit);
      }

      // Forward motion event to active drag sensor nodes

      for (const sensor of this [_activeSensors] .values ())
      {
         if (sensor .hit !== hit)
            continue;

         sensor .set_motion__ (hit);
      }
   },
   getPointingShader (numClipPlanes, shapeNode, hAnimNode)
   {
      const { geometryType, hasNormals } = shapeNode .getGeometryContext ();

      let key = "";

      key += numClipPlanes; // Could be more than 9.
      key += hAnimNode ?.getHAnimKey () ?? "[]";
      key += shapeNode .getShapeKey ();
      key += geometryType;
      key += hasNormals ? 1 : 0;

      if (geometryType >= 2)
      {
         key += "0.0.0";
      }
      else
      {
         const appearanceNode = shapeNode .getAppearance ();

         key += appearanceNode .getStyleProperties (geometryType) ? 1 : 0;
         key += ".";
         key += appearanceNode .getTextureBits () .toString (16); // Textures for point and line.
         key += ".";
         key += appearanceNode .getMaterial () .getTextureBits () .toString (16); // Textures for point and line.
      }

      return this [_pointingShaders] .get (key)
         ?? this .createPointingShader (key, numClipPlanes, shapeNode, hAnimNode);
   },
   createPointingShader (key, numClipPlanes, shapeNode, hAnimNode)
   {
      const
         appearanceNode  = shapeNode .getAppearance (),
         geometryContext = shapeNode .getGeometryContext (),
         options         = [ ];

      options .push ("X3D_DEPTH_SHADER");

      if (geometryContext .hasNormals)
         options .push ("X3D_NORMALS");

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES");
         options .push ("X3D_NUM_CLIP_PLANES " + numClipPlanes);
      }

      switch (shapeNode .getShapeKey ())
      {
         case 1:
         case 2:
            options .push ("X3D_INSTANCING");
            break;
         case 3:
            options .push ("X3D_INSTANCING", "X3D_INSTANCE_NORMAL");
            break;
      }

      options .push (`X3D_GEOMETRY_${geometryContext .geometryType}D`);

      if (appearanceNode .getStyleProperties (geometryContext .geometryType))
         options .push ("X3D_STYLE_PROPERTIES");

      if (+appearanceNode .getMaterial () .getTextureBits ())
         options .push ("X3D_MATERIAL_TEXTURES");

      if (+appearanceNode .getTextureBits ())
         options .push ("X3D_TEXTURE");

      if (hAnimNode)
      {
         options .push ("X3D_SKINNING");
         options .push (`X3D_NUM_JOINT_SETS ${hAnimNode .getNumJoints () / 4}`);
         options .push (`X3D_NUM_DISPLACEMENTS ${hAnimNode .getNumDisplacements ()}`);
      }

      const shaderNode = this .createShader ("Pointing", "Pointing", "Pointing", options);

      this [_pointingShaders] .set (key, shaderNode);

      return shaderNode;
   },
});

export default X3DPointingDeviceSensorContext;
