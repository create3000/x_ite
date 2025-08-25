import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DShaderNode        from "./X3DShaderNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function ProgramShader (executionContext)
{
   X3DShaderNode .call (this, executionContext);

   this .addType (X3DConstants .ProgramShader);
}

Object .setPrototypeOf (ProgramShader .prototype, X3DShaderNode .prototype);

Object .defineProperties (ProgramShader,
{
   ... X3DNode .getStaticProperties ("ProgramShader", "Shaders", 1, "shaders", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "activate",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isSelected", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isValid",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "language",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "programs",   new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ProgramShader;
