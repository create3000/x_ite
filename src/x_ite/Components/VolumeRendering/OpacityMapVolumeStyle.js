import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function OpacityMapVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .OpacityMapVolumeStyle);
}

Object .assign (Object .setPrototypeOf (OpacityMapVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._transferFunction .addInterest ("set_transferFunction__", this);

      this .set_transferFunction__ ();
   },
   set_transferFunction__ ()
   {
      this .transferFunctionNode = X3DCast (X3DConstants .X3DTexture2DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = this .getBrowser () .getDefaultTransferFunction ();
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transferFunction_" + this .getId (), new Fields .SFNode (this .transferFunctionNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// OpacityMapVolumeStyle\n";
      string += "\n";

      if (this .transferFunctionNode .getType () .includes (X3DConstants .X3DTexture2DNode))
      {
         string += "uniform sampler2D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rg);\n";
         string += "}\n";
      }
      else
      {
         string += "uniform sampler3D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rgb);\n";
         string += "}\n";
      }

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // OpacityMapVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getOpacityMapStyle_" + this .getId () + " (textureColor);\n";

      return string;
   },
});

Object .defineProperties (OpacityMapVolumeStyle,
{
   ... X3DNode .getStaticProperties ("OpacityMapVolumeStyle", "VolumeRendering", 1, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transferFunction", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default OpacityMapVolumeStyle;
