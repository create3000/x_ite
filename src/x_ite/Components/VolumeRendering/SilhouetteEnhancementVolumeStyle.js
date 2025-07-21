import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function SilhouetteEnhancementVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .SilhouetteEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (SilhouetteEnhancementVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
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

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteRetainedOpacity_" + this .getId (), this ._silhouetteRetainedOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteBoundaryOpacity_" + this .getId (), this ._silhouetteBoundaryOpacity .copy ());
      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteSharpness_"       + this .getId (), this ._silhouetteSharpness       .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteSharpness_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getSilhouetteEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "   \n";
      string += "   float silhouetteRetainedOpacity = silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteBoundaryOpacity = silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteSharpness       = silhouetteSharpness_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (silhouetteRetainedOpacity + silhouetteBoundaryOpacity * pow (1.0 - abs (dot (surfaceNormal .xyz, normalize (vertex))), silhouetteSharpness)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getSilhouetteEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (SilhouetteEnhancementVolumeStyle,
{
   ... X3DNode .getStaticProperties ("SilhouetteEnhancementVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteRetainedOpacity", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteBoundaryOpacity", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteSharpness",       new Fields .SFFloat (0.5)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",            new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SilhouetteEnhancementVolumeStyle;
