import Fields                             from "../../Fields.js";
import X3DFieldDefinition                 from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray               from "../../Base/FieldDefinitionArray.js";
import X3DNode                            from "../Core/X3DNode.js";
import X3DComposableVolumeRenderStyleNode from "./X3DComposableVolumeRenderStyleNode.js";
import X3DConstants                       from "../../Base/X3DConstants.js";
import X3DCast                            from "../../Base/X3DCast.js";

function ShadedVolumeStyle (executionContext)
{
   X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ShadedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ShadedVolumeStyle .prototype, X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._material       .addInterest ("set_material__",       this);
      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_material__ ();
      this .set_surfaceNormals__ ();
   },
   set_material__ ()
   {
      if (this .materialNode)
         this .materialNode .removeInterest ("addNodeEvent", this);

      this .materialNode = X3DCast (X3DConstants .X3DMaterialNode, this ._material);

      if (this .materialNode)
         this .materialNode .addInterest ("addNodeEvent", this);
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      if (this .materialNode)
      {
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "ambientIntensity_" + this .getId (), this .materialNode ._ambientIntensity .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "diffuseColor_"     + this .getId (), this .materialNode ._diffuseColor     .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "specularColor_"    + this .getId (), this .materialNode ._specularColor    .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "emissiveColor_"    + this .getId (), this .materialNode ._emissiveColor    .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "shininess_"        + this .getId (), this .materialNode ._shininess        .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transparency_"     + this .getId (), this .materialNode ._transparency     .copy ());
      }

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_SHADING");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ShadedVolumeStyle\n";
      string += "\n";
      string += "uniform float ambientIntensity_" + this .getId () + ";\n";
      string += "uniform vec3  diffuseColor_" + this .getId () + ";\n";
      string += "uniform vec3  specularColor_" + this .getId () + ";\n";
      string += "uniform vec3  emissiveColor_" + this .getId () + ";\n";
      string += "uniform float shininess_" + this .getId () + ";\n";
      string += "uniform float transparency_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getShadedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 shadedColor   = vec4 (0.0);\n";

      if (this ._lighting .getValue ())
      {
         if (this .materialNode)
         {
            string += "   vec3 diffuseFactor = diffuseColor_" + this .getId () + ";\n";
            string += "   vec3 ambientTerm   = diffuseFactor * ambientIntensity_" + this .getId () + ";\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   vec3 diffuseFactor = originalColor .rgb;\n";
            string += "   vec3 ambientTerm   = vec3 (0.0);\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a;\n";
         }

         string += "\n";
         string += "   vec3 N = surfaceNormal .xyz;\n";
         string += "   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position\n";
         string += "\n";
         string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
         string += "   {\n";
         string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
         string += "\n";
         string += "      vec3  vL = light .location - vertex; // Light to fragment\n";
         string += "      float dL = length (light .matrix * vL);\n";
         string += "      bool  di = light .type == x3d_DirectionalLight;\n";
         string += "\n";
         string += "      if (di || dL <= light .radius)\n";
         string += "      {\n";
         string += "         vec3 d = light .direction;\n";
         string += "         vec3 c = light .attenuation;\n";
         string += "         vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.\n";
         string += "         vec3 H = normalize (L + V);             // Specular term\n";
         string += "\n";
         string += "         float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.\n";
         string += "         vec3  diffuseTerm    = diffuseFactor * lightAngle;\n";
         string += "         float specularFactor = shininess_" + this .getId () + " > 0.0 ? pow (max (dot (N, H), 0.0), shininess_" + this .getId () + " * 128.0) : 1.0;\n";
         string += "         vec3  specularTerm   = light .intensity * specularColor_" + this .getId () + " * specularFactor;\n";
         string += "\n";
         string += "         float attenuationFactor     = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);\n";
         string += "         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor (light .cutOffAngle, light .beamWidth, L, d) : 1.0;\n";
         string += "         float attenuationSpotFactor = attenuationFactor * spotFactor;\n";
         string += "         vec3  ambientColor          = light .ambientIntensity * ambientTerm;\n";
         string += "         vec3  diffuseSpecularColor  = light .intensity * (diffuseTerm + specularTerm);\n";
         string += "\n";
         string += "         shadedColor .rgb += attenuationSpotFactor * light .color * (ambientColor + diffuseSpecularColor);\n";
         string += "      }\n";
         string += "\n";
         string += "      shadedColor .rgb += emissiveColor_" + this .getId () + ";\n";
         string += "   }\n";
      }
      else
      {
         if (this .materialNode)
         {
            string += "   shadedColor .rgb = diffuseColor_" + this .getId () + ";\n";
            string += "   shadedColor .a   = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   shadedColor = originalColor;\n";
         }
      }

      string += "\n";
      string += "   return shadedColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ShadedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getShadedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ShadedVolumeStyle,
{
   ... X3DNode .getStaticProperties ("ShadedVolumeStyle", "VolumeRendering", 3, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lighting",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "phaseFunction",  new Fields .SFString ("Henyey-Greenstein")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "material",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceNormals", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ShadedVolumeStyle;
