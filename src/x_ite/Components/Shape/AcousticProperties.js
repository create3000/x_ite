import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function AcousticProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .AcousticProperties);
}

Object .setPrototypeOf (AcousticProperties .prototype, X3DAppearanceChildNode .prototype);

Object .defineProperties (AcousticProperties,
{
   ... X3DNode .getStaticProperties ("AcousticProperties", "Shape", 5, "acousticProperties", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuse",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specular",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "refraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "absorption",  new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default AcousticProperties;
