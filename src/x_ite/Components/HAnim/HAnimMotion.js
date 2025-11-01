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

      // Connect interpolators to joint nodes.

      for (const [j, joint] of this .interpolators .entries ())
      {
         if (j < channelsEnabled .length && !channelsEnabled [j])
            continue;

         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         for (const [name, interpolator] of Object .entries (joint))
            interpolator ._value_changed .addFieldInterest (jointNode .getField (name));
      }
   },
   disconnectJoints (jointNodes)
   {
      const
         joints      = this .joints,
         jointsIndex = this .getJointsIndex (jointNodes);

      // Disconnect interpolators from joint nodes.

      for (const [j, joint] of this .interpolators .entries ())
      {
         const jointNode = jointsIndex .get (joints [j]);

         if (!jointNode)
            continue;

         for (const [name, interpolator] of Object .entries (joint))
            interpolator ._value_changed .removeFieldInterest (jointNode .getField (name));
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

      for (const joint of this .interpolators)
      {
         for (const interpolator of joint)
         {
            Array .from (interpolator ._value_changed .getFieldInterests ())
               .forEach (field => interpolator ._value_changed .removeFieldInterest (field));
         }
      }
   },
   set_interpolators__: (() =>
   {
      const defaultOrder = ["X", "Y", "Z"];

      return function ()
      {
         // Disconnect old interpolators.

         const timeSensor = this .timeSensor;

         Array .from (timeSensor ._fraction_changed .getFieldInterests ())
            .forEach (field => timeSensor ._fraction_changed .removeFieldInterest (field));

         // Create interpolators.

         const channels = this ._channels .getValue ()
            .replace (/^[\s,\d]+|[\s,\d]+$/sg, "")
            .split (/[\s,]+\d+[\s,]+/s)
            .map (string => string .split (/[\s,]+/s));

         // console .time ("set_interpolators__");

         const
            values        = this ._values,
            numChannels   = channels .reduce ((v, c) => v + c .length, 0),
            frameCount    = Math .floor (numChannels ? values .length / numChannels : 0),
            interpolators = Array .from ({ length: channels .length }, () => ({ })),
            position      = new Vector3 (),
            rotation      = new Rotation4 (),
            scale         = new Vector3 ();

         this .interpolators = interpolators;

         for (let frame = 0, v = 0; frame < frameCount; ++ frame)
         {
            const key = frame / (frameCount - 1);

            for (const [j, joint] of channels .entries ())
            {
               let
                  Xposition = 0, Yposition = 0, Zposition = 0, positionChannels,
                  Xrotation = 0, Yrotation = 0, Zrotation = 0, rotationOrder = "",
                  Xscale    = 1, Yscale    = 1, Zscale    = 1, scaleChannels;

               for (const channel of joint)
               {
                  switch (channel)
                  {
                     case "Xposition":
                        positionChannels = true;
                        Xposition        = values [v ++];
                        break;
                     case "Yposition":
                        positionChannels = true;
                        Yposition        = values [v ++];
                        break;
                     case "Zposition":
                        positionChannels = true;
                        Zposition        = values [v ++];
                        break;
                     case "Xrotation":
                        rotationOrder += "X";
                        Xrotation      = Algorithm .radians (values [v ++]);
                        break;
                     case "Yrotation":
                        rotationOrder += "Y";
                        Yrotation      = Algorithm .radians (values [v ++]);
                        break;
                     case "Zrotation":
                        rotationOrder += "Z";
                        Zrotation      = Algorithm .radians (values [v ++]);
                        break;
                     case "Xscale":
                        scaleChannels = true;
                        Xscale        = values [v ++];
                        break;
                     case "Yscale":
                        scaleChannels = true;
                        Yscale        = values [v ++];
                        break;
                     case "Zscale":
                        scaleChannels = true;
                        Zscale        = values [v ++];
                        break;
                     default:
                        v ++;
                        break;
                  }
               }

               if (positionChannels)
               {
                  const interpolator = interpolators [j] .translation ??= (() =>
                  {
                     const interpolator = new PositionInterpolator (this .getExecutionContext ());

                     timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);

                     return interpolator;
                  })();


                  interpolator ._key      .push (key);
                  interpolator ._keyValue .push (position .set (Xposition, Yposition, Zposition));
               }

               if (rotationOrder .length)
               {
                  const interpolator = interpolators [j] .rotation ??= (() =>
                  {
                     const interpolator = new OrientationInterpolator (this .getExecutionContext ());

                     timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);

                     return interpolator;
                  })();

                  if (rotationOrder .length !== 3)
                  {
                     if (rotationOrder .length < 3)
                     {
                        for (const o of defaultOrder)
                        {
                           if (rotationOrder .includes (o))
                              continue;

                           rotationOrder += o;
                        }
                     }
                     else if (rotationOrder .length > 3)
                     {
                        rotationOrder = rotationOrder .slice (0, 3);
                     }
                  }

                  interpolator ._key      .push (key);
                  interpolator ._keyValue .push (rotation .setEuler (Xrotation, Yrotation, Zrotation, rotationOrder));
               }

               if (scaleChannels)
               {
                  const interpolator = interpolators [j] .scale ??= (() =>
                  {
                     const interpolator = new PositionInterpolator (this .getExecutionContext ());

                     timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);

                     return interpolator;
                  })();

                  interpolator ._key      .push (key);
                  interpolator ._keyValue .push (scale .set (Xscale, Yscale, Zscale));
               }
            }
         }

         for (const joint of interpolators)
         {
            for (const interpolator of Object .values (joint))
               interpolator .setup ();
         }

         // console .timeEnd ("set_interpolators__");

         this ._frameIndex = 0;
         this ._startFrame = 0;
         this ._endFrame   = frameCount - 1;
         this ._frameCount = frameCount;

         this .set_frameDuration__ ();
      };
   })(),
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
   getFraction ()
   {
      for (const field of this .timeSensor ._fraction_changed .getFieldInterests ())
         return field .getValue ();

      return 0;
   },
});

Object .defineProperties (HAnimMotion,
{
   ... X3DNode .getStaticProperties ("HAnimMotion", "HAnim", 2, "motions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",            new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loa",             new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
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
