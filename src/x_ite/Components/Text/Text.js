import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Text (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Text);

   // Units

   this ._length     .setUnit ("length");
   this ._maxExtent  .setUnit ("length");
   this ._origin     .setUnit ("length");
   this ._textBounds .setUnit ("length");
   this ._lineBounds .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Text .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._fontStyle .addInterest ("set_fontStyle__", this);

      this .set_fontStyle__ ();
   },
   getMatrix ()
   {
      return this .textGeometry .getMatrix ();
   },
   getLength (index)
   {
      if (index < this ._length .length)
         return Math .max (0, this ._length [index]);

      return 0;
   },
   set_live__ ()
   {
      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
      {
         browser .getBrowserOptions () ._PrimitiveQuality .addInterest ("requestRebuild", this);
         browser .getBrowserOptions () ._TextCompression  .addInterest ("requestRebuild", this);

         this .requestRebuild ();
      }
      else
      {
         browser .getBrowserOptions () ._PrimitiveQuality .removeInterest ("requestRebuild", this);
         browser .getBrowserOptions () ._TextCompression  .removeInterest ("requestRebuild", this);
      }
   },
   set_fontStyle__ ()
   {
      this .fontStyleNode ?.removeInterest ("requestRebuild", this);

      this .fontStyleNode = X3DCast (X3DConstants .X3DFontStyleNode, this ._fontStyle)
         ?? this .getBrowser () .getDefaultFontStyle ();

      this .fontStyleNode .addInterest ("requestRebuild", this);

      this .textGeometry = this .fontStyleNode .createTextGeometry (this);
   },
   build ()
   {
      this .textGeometry .update ();
      this .textGeometry .build ();

      this .setSolid (this ._solid .getValue ());
   },
   traverse (type, renderObject)
   {
      this .textGeometry .traverse (type, renderObject);

      X3DGeometryNode .prototype .traverse .call (this, type, renderObject);
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      this .textGeometry .displaySimple (gl, renderContext, shaderNode);

      X3DGeometryNode .prototype .displaySimple .call (this, gl, renderContext, shaderNode);
   },
   display (gl, renderContext)
   {
      this .textGeometry .display (gl, renderContext);

      X3DGeometryNode .prototype .display .call (this, gl, renderContext);

      renderContext .textureNode = null;
   },
   transformLine (line)
   {
      // Apply screen nodes transformation in place here.
      return this .textGeometry .transformLine (line);
   },
   transformMatrix (matrix)
   {
      // Apply screen nodes transformation in place here.
      return this .textGeometry .transformMatrix (matrix);
   },
});

Object .defineProperties (Text,
{
   ... X3DNode .getStaticProperties ("Text", "Text", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "string",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "length",     new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxExtent",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "origin",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "textBounds", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "lineBounds", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fontStyle",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Text;
