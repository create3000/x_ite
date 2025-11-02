import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import TimeSensor           from "../Time/TimeSensor.js";

function HAnimPose (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimPose);

   // Private properties

   this .timeSensor     = new TimeSensor (this .getExecutionContext ());
   this .interpolators  = [ ];
   this .poseJointNodes = new Map ();
   this .joints         = new Set ();
}

Object .assign (Object .setPrototypeOf (HAnimPose .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      // TimeSensor

      this ._enabled            .addFieldInterest (this .timeSensor ._enabled);
      this ._transitionDuration .addFieldInterest (this .timeSensor ._cycleInterval);

      this .timeSensor ._isActive .addFieldInterest (this ._isActive);

      this .timeSensor ._enabled       = this ._enabled;
      this .timeSensor ._cycleInterval = this ._transitionDuration;

      this .timeSensor .setup ();

      // Fields

      this ._commencePose  .addInterest ("set_commencePose__", this);
      this ._set_startTime .addInterest ("set_startTime__",    this);
      this ._set_fraction  .addInterest ("set_fraction__",     this);
      this ._poseJoints    .addInterest ("set_poseJoints__",   this);

      this .set_poseJoints__ ();
   },
   addJoints (jointNodes)
   {
      this .joints .add (jointNodes);

      this .needsUpdateInterpolators = true;
   },
   removeJoints (jointNodes)
   {
      this .joints .delete (jointNodes);
   },
   setNeedsUpdateInterpolators ()
   {
      this .needsUpdateInterpolators = true;
   },
   updateInterpolators ()
   {
      this .needsUpdateInterpolators = false;

      for (const interpolator of this .interpolators)
         this .timeSensor ._fraction_changed .removeFieldInterest (interpolator ._set_fraction);

      this .interpolators .length = 0;

      for (const humanoid of this .joints)
      {
         for (const jointNode of humanoid)
            this .processJoint (jointNode);
      }

      for (const interpolator of this .interpolators)
         this .timeSensor ._fraction_changed .addFieldInterest (interpolator ._set_fraction);
   },
   processJoint: (() =>
   {
      const interpolators = [
         ["translation", "PositionInterpolator"],
         ["rotation",    "OrientationInterpolator"],
         ["scale",       "PositionInterpolator"],
      ];

      return function (jointNode)
      {
         const poseJointNode = this .poseJointNodes .get (jointNode ._name .getValue ());

         if (!poseJointNode && this .poseJointNodes .size)
            return;

         const executionContext = this .getExecutionContext ();

         for (const [name, interpolatorName] of interpolators)
         {
            const jointField = jointNode .getField (name);

            const destinationField = poseJointNode
               ? poseJointNode .getField (name)
               : jointNode .getFieldDefinition (name) .value;

            if (jointField .equals (destinationField))
               continue;

            const interpolator = executionContext .createNode (interpolatorName, false);

            interpolator ._value_changed .addFieldInterest (jointField);

            interpolator ._key      = [0, 1];
            interpolator ._keyValue = [... jointField, ... destinationField];

            interpolator .setup ();

            this .interpolators .push (interpolator);
         }
      };
   })(),
   set_commencePose__ ()
   {
      if (!this ._commencePose .getValue ())
         return;

      this .set_startTime__ ();
   },
   set_startTime__ ()
   {
      this .updateInterpolators ();

      this .timeSensor ._startTime = Date .now () / 1000;
   },
   set_fraction__ ()
   {
      if (this .needsUpdateInterpolators)
         this .updateInterpolators ();

      const fraction = this ._set_fraction .getValue ();

      for (const interpolator of this .interpolators)
         interpolator ._set_fraction = fraction;
   },
   set_poseJoints__ ()
   {
      this .poseJointNodes .clear ();

      for (const node of this ._poseJoints)
      {
         const jointNode = X3DCast (X3DConstants .HAnimJoint, node);

         if (jointNode)
            this .poseJointNodes .set (jointNode ._name .getValue (), jointNode);
      }
   },
});

Object .defineProperties (HAnimPose,
{
   ... X3DNode .getStaticProperties ("HAnimPose", "HAnim", 3, "poses", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",               new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loa",                new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transitionDuration", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "commencePose",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_startTime",      new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "poseJoints",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default HAnimPose;
