import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function ToneMappedVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ToneMappedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ToneMappedVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "coolColor_" + this .getId (), this ._coolColor .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "warmColor_" + this .getId (), this ._warmColor .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ToneMappedVolumeStyle\n";
      string += "\n";
      string += "uniform vec4 coolColor_" + this .getId () + ";\n";
      string += "uniform vec4 warmColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getToneMappedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec3 toneColor = vec3 (0.0);\n";
      string += "   vec3 coolColor = coolColor_" + this .getId () + " .rgb;\n";
      string += "   vec3 warmColor = warmColor_" + this .getId () + " .rgb;\n";
      string += "\n";
      string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
      string += "   {\n";
      string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
      string += "\n";
      string += "      vec3  L           = light .type == x3d_DirectionalLight ? -light .direction : normalize (light .location - vertex);\n";
      string += "      float colorFactor = dot (L, surfaceNormal .xyz) * 0.5 + 0.5;\n";
      string += "\n";
      string += "      toneColor += mix (warmColor .rgb, coolColor .rgb, colorFactor);\n";
      string += "   }\n";
      string += "\n";
      string += "   return vec4 (toneColor, originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ToneMappedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getToneMappedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ToneMappedVolumeStyle,
{
   ... X3DNode .getStaticProperties ("ToneMappedVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coolColor",      new Fields .SFColorRGBA (0, 0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "warmColor",      new Fields .SFColorRGBA (1, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ToneMappedVolumeStyle;
