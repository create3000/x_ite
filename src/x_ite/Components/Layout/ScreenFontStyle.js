import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DFontStyleNode     from "../Text/X3DFontStyleNode.js";
import ScreenText           from "../../Browser/Layout/ScreenText.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function ScreenFontStyle (executionContext)
{
   X3DFontStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ScreenFontStyle);
}

Object .assign (Object .setPrototypeOf (ScreenFontStyle .prototype, X3DFontStyleNode .prototype),
{
   initialize ()
   {
      X3DFontStyleNode .prototype .initialize .call (this);

      this .getBrowser () .getRenderingProperties () ._ContentScale .addInterest ("addNodeEvent", this);
   },
   getTextGeometry (text)
   {
      return new ScreenText (text, this);
   },
   getScale ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getRenderingProperty ("PixelsPerPoint");
   },
   getContentScale ()
   {
      return this .getBrowser () .getRenderingProperty ("ContentScale");
   },
});

Object .defineProperties (ScreenFontStyle,
{
   ... X3DNode .getStaticProperties ("ScreenFontStyle", "Layout", 2, "fontStyle", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "language",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "family",      new Fields .MFString ("SERIF")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "style",       new Fields .SFString ("PLAIN")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSize",   new Fields .SFFloat (12)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "spacing",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "horizontal",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftToRight", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topToBottom", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "justify",     new Fields .MFString ("BEGIN")),
      ]),
      enumerable: true,
   },
});

export default ScreenFontStyle;
