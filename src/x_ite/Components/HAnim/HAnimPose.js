import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function HAnimPose (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimPose);
}

Object .assign (Object .setPrototypeOf (HAnimPose .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "resetOtherJoints",   new Fields .SFBool (true)),
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
