import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function ComposedVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ComposedVolumeStyle);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._renderStyle .addInterest ("set_renderStyle__", this);

      this .set_renderStyle__ ();
   },
   addVolumeData (volumeDataNode)
   {
      X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .removeVolumeData (volumeDataNode);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);
   },
   getDefines (defines)
   {
      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .getDefines (defines);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getUniformsText ();

      string += "\n";
      string += "vec4\n";
      string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
      string += "{\n";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getFunctionsText ();

      string += "\n";
      string += "   return textureColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ComposedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   }
});

Object .defineProperties (ComposedVolumeStyle,
{
   ... X3DNode .getStaticProperties ("ComposedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ComposedVolumeStyle;
