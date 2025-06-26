import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "../Shape/X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function DepthMode (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .DepthMode);

   this .addAlias ("depthFunc", this ._depthFunction);
}

Object .assign (Object .setPrototypeOf (DepthMode .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      this ._depthFunction .addInterest ("set_depthFunction__", this);

      this .set_depthFunction__ ();
   },
   set_depthFunction__: (() =>
   {
      const depthFunctions = new Map ([
         ["NEVER",         "NEVER"],
         ["LESS",          "LESS"],
         ["EQUAL",         "EQUAL"],
         ["LESS_EQUAL",    "LEQUAL"],
         ["GREATER",       "GREATER"],
         ["NOT_EQUAL",     "NOTEQUAL"],
         ["GREATER_EQUAL", "GEQUAL"],
         ["ALWAYS",        "ALWAYS"],
      ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         this .depthFunction = gl [depthFunctions .get (this ._depthFunction .getValue ()) ?? "LEQUAL"];
      };
   })(),
   enable (gl)
   {
      this .depthTest      = gl .isEnabled (gl .DEPTH_TEST);
      this .depthWriteMask = gl .getParameter (gl .DEPTH_WRITEMASK);

      gl .enable (gl .POLYGON_OFFSET_FILL);
      gl .polygonOffset (... this ._polygonOffset);

      if (this ._depthTest .getValue ())
         gl .enable (gl .DEPTH_TEST);
      else
         gl .disable (gl .DEPTH_TEST);

      gl .depthFunc (this .depthFunction);
      gl .depthRange (... this ._depthRange .getValue ());
      gl .depthMask (this ._depthMask .getValue ());
   },
   disable (gl)
   {
      gl .disable (gl .POLYGON_OFFSET_FILL);

      if (this .depthTest)
         gl .enable (gl .DEPTH_TEST);
      else
         gl .disable (gl .DEPTH_TEST);

      gl .depthFunc (gl .LEQUAL);
      gl .depthRange (0, 1);
      gl .depthMask (this .depthWriteMask);
   },
});

Object .defineProperties (DepthMode,
{
   ... X3DNode .getStaticProperties ("DepthMode", "X_ITE", 1, "depthMode", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "polygonOffset", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthRange",    new Fields .SFVec2f (0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthTest",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthFunction", new Fields .SFString ("LESS_EQUAL")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depthMask",     new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default DepthMode;
