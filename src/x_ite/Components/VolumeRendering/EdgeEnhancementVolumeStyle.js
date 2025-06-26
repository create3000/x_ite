import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function EdgeEnhancementVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .EdgeEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (EdgeEnhancementVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

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

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "edgeColor_"         + this .getId (), this ._edgeColor         .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "gradientThreshold_" + this .getId (), this ._gradientThreshold .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform vec4  edgeColor_" + this .getId () + ";\n";
      string += "uniform float gradientThreshold_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getEdgeEnhacementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4  edgeColor         = edgeColor_" + this .getId () + ";\n";
      string += "   float gradientThreshold = gradientThreshold_" + this .getId () + ";\n";
      string += "\n";
      string += "   float angle = abs (dot (surfaceNormal .xyz, normalize (vertex)));\n";
      string += "\n";
      string += "   if (angle >= cos (gradientThreshold))\n";
      string += "      return originalColor;\n";
      string += "   else\n";
      string += "      return vec4 (mix (edgeColor .rgb, originalColor.rgb, angle), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getEdgeEnhacementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (EdgeEnhancementVolumeStyle,
{
   ... X3DNode .getStaticProperties ("EdgeEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "edgeColor",         new Fields .SFColorRGBA (0, 0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gradientThreshold", new Fields .SFFloat (0.4)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default EdgeEnhancementVolumeStyle;
