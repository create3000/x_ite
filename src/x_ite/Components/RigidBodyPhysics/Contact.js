import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Contact (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .Contact);

   // Units

   this ._position                 .setUnit ("length");
   this ._depth                    .setUnit ("length");
   this ._minBounceSpeed           .setUnit ("speed");
   this ._surfaceSpeed             .setUnit ("speed");
   this ._softnessConstantForceMix .setUnit ("force");
}

Object .setPrototypeOf (Contact .prototype, X3DNode .prototype);

Object .defineProperties (Contact,
{
   ... X3DNode .getStaticProperties ("Contact", "RigidBodyPhysics", 2, "contacts", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",                 new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "contactNormal",            new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depth",                    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "appliedParameters",        new Fields .MFString ("BOUNCE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bounce",                   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minBounceSpeed",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frictionDirection",        new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frictionCoefficients",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceSpeed",             new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "slipCoefficients",         new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "softnessConstantForceMix", new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "softnessErrorCorrection",  new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry1",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry2",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",                    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",                    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Contact;
