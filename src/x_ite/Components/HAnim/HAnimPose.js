import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DChildNode            from "../Core/X3DChildNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import X3DCast                 from "../../Base/X3DCast.js";
import TimeSensor              from "../Time/TimeSensor.js";
import PositionInterpolator    from "../Interpolation/PositionInterpolator.js";
import OrientationInterpolator from "../Interpolation/OrientationInterpolator.js";

function HAnimPose (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimPose);

   // Private properties

   this .timeSensor = new TimeSensor (this .getExecutionContext ());
   this .poseJoints = [ ];
}

Object .assign (Object .setPrototypeOf (HAnimPose .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      // TimeSensor

      this ._enabled            .addFieldInterest (this .timeSensor ._enabled);
      this ._transitionDuration .addFieldInterest (this .timeSensor ._cycleInterval);
      this ._set_startTime      .addFieldInterest (this .timeSensor ._startTime);

      this .timeSensor ._isActive .addFieldInterest (this ._isActive);

      this .timeSensor ._enabled       = this ._enabled;
      this .timeSensor ._cycleInterval = this ._transitionDuration;

      // Fields

      this ._commencePose .addInterest ("set_commencePose__", this);
      this ._set_fraction .addInterest ("set_fraction__",     this);
      this ._poseJoints   .addInterest ("set_poseJoints__",   this);

      this .set_poseJoints__ ();
   },
   set_commencePose__ ()
   {

   },
   set_fraction__ ()
   {

   },
   set_poseJoints__ ()
   {
      this .poseJoints .length = 0;

      for (const node of this ._poseJoints)
      {
         const jointNode = X3DCast (X3DConstants .HAnimJoint, node);

         if (jointNode)
            this .poseJoints .push (jointNode);
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "resetOtherJoints",   new Fields .SFBool (true)),
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
