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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DChildNode            from "../Core/X3DChildNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import TimeSensor              from "../Time/TimeSensor.js";
import PositionInterpolator    from "../Interpolation/PositionInterpolator.js";
import OrientationInterpolator from "../Interpolation/OrientationInterpolator.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Algorithm               from "../../../standard/Math/Algorithm.js";

function HAnimMotion (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimMotion);

   this .timeSensor    = new TimeSensor (this .getExecutionContext ());
   this .interpolators = [ ];
}

Object .assign (Object .setPrototypeOf (HAnimMotion .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._loop .addFieldInterest (this .timeSensor ._loop);

      this .timeSensor ._cycleTime   .addFieldInterest (this ._cycleTime);
      this .timeSensor ._elapsedTime .addFieldInterest (this ._elapsedTime);

      this .timeSensor ._enabled  = false;
      this .timeSensor ._loop     = this ._loop;
      this .timeSensor ._stopTime = 1;

      this .timeSensor .setup ();

      this ._enabled         .addInterest ("set_enabled__",           this);
      this ._joints          .addInterest ("set_joints__",            this);
      this ._channels        .addInterest ("set_interpolators__",     this);
      this ._values          .addInterest ("set_interpolators__",     this);
      this ._next            .addInterest ("set_next_or_previous__",  this,  1);
      this ._previous        .addInterest ("set_next_or_previous__",  this, -1);
      this ._frameIndex      .addInterest ("set_frameIndex__",        this);
      this ._frameDuration   .addInterest ("set_frameDuration__",     this);
      this ._frameIncrement  .addInterest ("set_frameIncrement__",    this);
      this ._startFrame      .addInterest ("set_start_or_endFrame__", this);
      this ._endFrame        .addInterest ("set_start_or_endFrame__", this);

      this .set_enabled__ ();
      this .set_joints__ ();
      this .set_frameIncrement__ ();
      this .set_interpolators__ ();
   },
   connectJoints (jointNodes)
   {
      const
         channelsEnabled = this ._channelsEnabled,
         joints          = this .joints,
         jointsIndex     = this .getJointsIndex (jointNodes);

      // Connect interpolators.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         if (j < channelsEnabled .length && !channelsEnabled [j])
            continue;

         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .addFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .addFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .addFieldInterest (jointNode ._scale);
      }
   },
   disconnectJoints (jointNodes)
   {
      const
         joints      = this .joints,
         jointsIndex = this .getJointsIndex (jointNodes);

      // Disconnect joint nodes.

      for (const [j, { positionInterpolator, orientationInterpolator, scaleInterpolator }] of this .interpolators .entries ())
      {
         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         positionInterpolator    ?._value_changed .removeFieldInterest (jointNode ._translation);
         orientationInterpolator ?._value_changed .removeFieldInterest (jointNode ._rotation);
         scaleInterpolator       ?._value_changed .removeFieldInterest (jointNode ._scale);
      }
   },
   getJointsIndex (jointNodes)
   {
      const jointsIndex = new Map (jointNodes .map (jointNode => [jointNode ._name .getValue () .trim (), jointNode]));

      jointsIndex .delete ("IGNORED");
      jointsIndex .set ("HumanoidRoot", jointsIndex .get ("humanoid_root"));

      return jointsIndex;
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .timeSensor ._startTime = Date .now () / 1000;
      else
         this .timeSensor ._stopTime = Date .now () / 1000;
   },
   set_joints__ ()
   {
      this .joints = this ._joints .getValue () .replace (/^[\s,]+|[\s,]+$/sg, "") .split (/[\s,]+/s);

      // Disconnect all joint nodes.

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of this .interpolators)
      {
         positionInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => positionInterpolator ._value_changed .removeFieldInterest (field));

         orientationInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => orientationInterpolator ._value_changed .removeFieldInterest (field));

         scaleInterpolator ?._value_changed .getFieldInterests ()
            .forEach (field => scaleInterpolator ._value_changed .removeFieldInterest (field));
      }
   },
   set_interpolators__ ()
   {
      // Disconnect old interpolators.

      const timeSensor = this .timeSensor;

      timeSensor ._fraction_changed .getFieldInterests ()
         .forEach (field => timeSensor ._fraction_changed .removeFieldInterest (field));

      // Create interpolators.

      const channels = this ._channels .getValue ()
         .replace (/^[\s,\d]+|[\s,\d]+$/sg, "")
         .split (/[\s,]+\d+[\s,]+/s)
         .map (string => string .split (/[\s,]+/s));

      const
         values        = this ._values,
         numChannels   = channels .reduce ((v, c) => v + c .length, 0),
         frameCount    = Math .floor (numChannels ? values .length / numChannels : 0),
         types         = new Map (),
         interpolators = Array .from ({length: channels .length}, () => ({ }));

      this .interpolators = interpolators;

      for (let frame = 0, v = 0; frame < frameCount; ++ frame)
      {
         for (const [j, joint] of channels .entries ())
         {
            types .clear ();

            for (const channel of joint)
               types .set (channel, values [v ++]);

            if (types .has ("Xposition") || types .has ("Yposition") || types .has ("Zposition"))
            {
               const interpolator = interpolators [j] .positionInterpolator
                  ?? this .createPositionInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new Vector3 (types .get ("Xposition") ?? 0,
                                          types .get ("Yposition") ?? 0,
                                          types .get ("Zposition") ?? 0);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xrotation") || types .has ("Yrotation") || types .has ("Zrotation"))
            {
               const interpolator = interpolators [j] .orientationInterpolator
                  ?? this .createOrientationInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = Rotation4 .fromEuler (Algorithm .radians (types .get ("Xrotation") ?? 0),
                                                   Algorithm .radians (types .get ("Yrotation") ?? 0),
                                                   Algorithm .radians (types .get ("Zrotation") ?? 0));

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }

            if (types .has ("Xscale") || types .has ("Yscale") || types .has ("Zscale"))
            {
               const interpolator = interpolators [j] .scaleInterpolator
                  ?? this .createScaleInterpolator (interpolators, j);

               const
                  key      = frame / (frameCount - 1),
                  keyValue = new Vector3 (types .get ("Xscale") ?? 1,
                                          types .get ("Yscale") ?? 1,
                                          types .get ("Zscale") ?? 1);

               interpolator ._key      .push (key);
               interpolator ._keyValue .push (keyValue);

               timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
            }
         }
      }

      for (const { positionInterpolator, orientationInterpolator, scaleInterpolator } of interpolators)
      {
         positionInterpolator    ?.setup ();
         orientationInterpolator ?.setup ();
         scaleInterpolator       ?.setup ();
      }

      this ._frameIndex = 0;
      this ._startFrame = 0;
      this ._endFrame   = frameCount - 1;
      this ._frameCount = frameCount;

      this .set_frameDuration__ ();
   },
   set_next_or_previous__ (direction, field)
   {
      if (!field .getValue ())
         return;

      const
         fraction       = this .getFraction (),
         frameCount     = this ._frameCount .getValue (),
         frameIncrement = this ._frameIncrement .getValue (),
         frameIndex     = (frameCount > 1 ? Math .floor (fraction * (frameCount - 1)) : 0) + frameIncrement * direction;

      if (frameIndex > this .endFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .startFrame;
      }
      else if (frameIndex < this .startFrame)
      {
         if (!this ._loop .getValue ())
            return;

         this ._frameIndex = this .endFrame;
      }
      else
      {
         this ._frameIndex = frameIndex;
      }
   },
   set_frameIndex__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         frameIndex = Algorithm .clamp (this ._frameIndex .getValue (), 0, frameCount),
         fraction   = frameCount > 1 ? frameIndex / (frameCount - 1) : 0;

      this .timeSensor ._range [0] = fraction;

      if (this .timeSensor ._isActive .getValue ())
         return;

      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         field .setValue (fraction);
   },
   set_frameDuration__ ()
   {
      const
         frameCount    = this ._frameCount .getValue (),
         frameDuration = Math .max (this ._frameDuration .getValue (), 0);

      this .timeSensor ._cycleInterval = frameCount > 1 ? (frameCount - 1) * frameDuration : 0;
   },
   set_frameIncrement__ ()
   {
      this .timeSensor ._enabled = this ._frameIncrement .getValue ();
   },
   set_start_or_endFrame__ ()
   {
      const
         frameCount = this ._frameCount .getValue (),
         startFrame = Algorithm .clamp (this ._startFrame .getValue (), 0, frameCount),
         endFrame   = Algorithm .clamp (this ._endFrame   .getValue (), 0, frameCount);

      this .startFrame             = Math .min (startFrame, endFrame);
      this .endFrame               = Math .max (startFrame, endFrame);
      this .timeSensor ._range [1] = frameCount > 1 ? this .startFrame / (frameCount - 1) : 0;
      this .timeSensor ._range [2] = frameCount > 1 ? this .endFrame   / (frameCount - 1) : 0;
   },
   createPositionInterpolator (interpolators, j)
   {
      return interpolators [j] .positionInterpolator = new PositionInterpolator (this .getExecutionContext ());
   },
   createOrientationInterpolator (interpolators, j)
   {
      return interpolators [j] .orientationInterpolator = new OrientationInterpolator (this .getExecutionContext ());
   },
   createScaleInterpolator (interpolators, j)
   {
      return interpolators [j] .scaleInterpolator = new PositionInterpolator (this .getExecutionContext ());
   },
   getFraction ()
   {
      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         return field .getValue ();

      return 0;
   },
});

Object .defineProperties (HAnimMotion,
{
   typeName:
   {
      value: "HAnimMotion",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "HAnim", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "motions",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "4.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",            new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loa",             new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "joints",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelsEnabled", new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channels",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "values",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loop",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "next",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "previous",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameIndex",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameDuration",   new Fields .SFTime (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frameIncrement",  new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "startFrame",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "endFrame",        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "cycleTime",       new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",     new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "frameCount",      new Fields .SFInt32 ()),
      ]),
      enumerable: true,
   },
});

export default HAnimMotion;
