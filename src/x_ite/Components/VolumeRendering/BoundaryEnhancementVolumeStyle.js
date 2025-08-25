import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";

function BoundaryEnhancementVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .BoundaryEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BoundaryEnhancementVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "retainedOpacity_" + this .getId (), this ._retainedOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "boundaryOpacity_" + this .getId (), this ._boundaryOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "opacityFactor_"   + this .getId (), this ._opacityFactor   .copy ());
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float retainedOpacity_" + this .getId () + ";\n";
      string += "uniform float boundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float opacityFactor_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getBoundaryEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   float f0 = texture (x3d_Texture3D [0], texCoord) .r;\n";
      string += "   float f1 = texture (x3d_Texture3D [0], texCoord + vec3 (0.0, 0.0, 1.0 / float (textureSize (x3d_Texture3D [0], 0) .z))) .r;\n";
      string += "   float f  = abs (f0 - f1);\n";
      string += "\n";
      string += "   float retainedOpacity = retainedOpacity_" + this .getId () + ";\n";
      string += "   float boundaryOpacity = boundaryOpacity_" + this .getId () + ";\n";
      string += "   float opacityFactor   = opacityFactor_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (retainedOpacity + boundaryOpacity * pow (f, opacityFactor)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBoundaryEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BoundaryEnhancementVolumeStyle,
{
   ... X3DNode .getStaticProperties ("BoundaryEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainedOpacity", new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "boundaryOpacity", new Fields .SFFloat (0.9)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "opacityFactor",   new Fields .SFFloat (2)),
      ]),
      enumerable: true,
   },
});

export default BoundaryEnhancementVolumeStyle;
