import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DFontStyleNode     from "./X3DFontStyleNode.js";
import PolygonText          from "../../Browser/Text/PolygonText.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function FontStyle (executionContext)
{
   X3DFontStyleNode .call (this, executionContext);

   this .addType (X3DConstants .FontStyle);

   // Units

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (FontStyle .prototype, X3DFontStyleNode .prototype),
{
   getTextGeometry (text)
   {
      return new PolygonText (text, this);
   },
   getScale ()
   {
      return this ._size .getValue ();
   },
   getContentScale ()
   {
      return 1;
   },
});

Object .defineProperties (FontStyle,
{
   ... X3DNode .getStaticProperties ("FontStyle", "Text", 1, "fontStyle", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "language",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "family",      new Fields .MFString ("SERIF")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "style",       new Fields .SFString ("PLAIN")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "spacing",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "horizontal",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftToRight", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topToBottom", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "justify",     new Fields .MFString ("BEGIN")),
      ]),
      enumerable: true,
   },
});

export default FontStyle;
