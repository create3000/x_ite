import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DShaderNode               from "./X3DShaderNode.js";
import X3DUrlObject                from "../Networking/X3DUrlObject.js";
import X3DProgrammableShaderObject from "./X3DProgrammableShaderObject.js";
import X3DConstants                from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS NOT SUPPORTED.
 */

function PackagedShader (executionContext)
{
   X3DShaderNode               .call (this, executionContext);
   X3DUrlObject                .call (this, executionContext);
   X3DProgrammableShaderObject .call (this, executionContext);

   this .addType (X3DConstants .PackagedShader);
}

Object .assign (Object .setPrototypeOf (PackagedShader .prototype, X3DShaderNode .prototype),
   X3DUrlObject .prototype,
   X3DProgrammableShaderObject .prototype,
{
   getSourceText ()
   {
      return this ._url;
   },
   requestImmediateLoad (cache = true)
   { },
   initialize ()
   {
      X3DShaderNode               .prototype .initialize .call (this);
      X3DUrlObject                .prototype .initialize .call (this);
      X3DProgrammableShaderObject .prototype .initialize .call (this);
   },
   dispose ()
   {
      X3DProgrammableShaderObject .prototype .dispose .call (this);
      X3DUrlObject                .prototype .dispose .call (this);
      X3DShaderNode               .prototype .dispose .call (this);
   },
});

Object .defineProperties (PackagedShader,
{
   ... X3DNode .getStaticProperties ("PackagedShader", "Shaders", 1, "shaders", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "activate",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isSelected",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isValid",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "language",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      enumerable: true,
   },
});

export default PackagedShader;
