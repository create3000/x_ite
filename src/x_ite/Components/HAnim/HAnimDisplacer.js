import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "../Rendering/X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function HAnimDisplacer (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimDisplacer);

   // Units

   this ._displacements .setUnit ("length");
}

Object .setPrototypeOf (HAnimDisplacer .prototype, X3DGeometricPropertyNode .prototype);

Object .defineProperties (HAnimDisplacer,
{
   ... X3DNode .getStaticProperties ("HAnimDisplacer", "HAnim", 1, "displacers", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coordIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displacements", new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default HAnimDisplacer;
