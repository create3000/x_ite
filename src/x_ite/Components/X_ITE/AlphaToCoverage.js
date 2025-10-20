import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DBlendModeNode       from "./X3DBlendModeNode.js"
import X3DConstants           from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function AlphaToCoverage (executionContext)
{
   X3DBlendModeNode .call (this, executionContext);

   this .addType (X3DConstants .AlphaToCoverage);
}

Object .assign (Object .setPrototypeOf (AlphaToCoverage .prototype, X3DBlendModeNode .prototype),
{
   enable (gl)
   {
      gl .enable (gl .SAMPLE_ALPHA_TO_COVERAGE);
      gl .enable (gl .BLEND);
      gl .blendFuncSeparate (gl .ONE, gl .ZERO, gl .ZERO, gl .ONE);
   },
   disable (gl)
   {
      gl .disable (gl .SAMPLE_ALPHA_TO_COVERAGE);
      gl .disable (gl .BLEND);
      gl .blendFuncSeparate (gl .SRC_ALPHA, gl .ONE_MINUS_SRC_ALPHA, gl .ONE, gl .ONE_MINUS_SRC_ALPHA);
   },
});

Object .defineProperties (AlphaToCoverage,
{
   ... X3DNode .getStaticProperties ("AlphaToCoverage", "X_ITE", 1, "blendMode", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default AlphaToCoverage;
