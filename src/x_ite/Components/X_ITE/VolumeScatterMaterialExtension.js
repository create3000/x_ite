import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import ScatterSamples           from "../../Browser/X_ITE/ScatterSamples.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";

// Register key.

ExtensionKeys .add ("VOLUME_SCATTER_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_MultiscatterColorTextureEXT");

// Register shaders.

import ShaderRegistry        from "../../Browser/Shaders/ShaderRegistry.js";
import Scatter2              from "../../../assets/shaders/webgl2/pbr/Scatter2.glsl.js";
import SubsurfaceScattering2 from "../../../assets/shaders/webgl2/pbr/SubsurfaceScattering2.glsl.js";

ShaderRegistry .addInclude ("Scatter",              Scatter2);
ShaderRegistry .addInclude ("SubsurfaceScattering", SubsurfaceScattering2);

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function VolumeScatterMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .VolumeScatterMaterialExtension);

   // Private properties

   this .multiscatterColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (VolumeScatterMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._scatterStrength          .addInterest ("set_scatterStrength__",          this);
      this ._scatterStrengthTexture   .addInterest ("set_scatterStrengthTexture__",   this);
      this ._scatterAnisotropy        .addInterest ("set_scatterAnisotropy__",        this);
      this ._multiscatterColor        .addInterest ("set_multiscatterColor__",        this);
      this ._multiscatterColorTexture .addInterest ("set_multiscatterColorTexture__", this);

      this .set_scatterStrength__ ();
      this .set_scatterStrengthTexture__ ();
      this .set_multiscatterColor__ ();
      this .set_multiscatterColorTexture__ ();
      this .set_scatterAnisotropy__ ();
   },
   set_scatterStrength__ ()
   {
      this .scatterStrength = Algorithm .clamp (this ._scatterStrength .getValue (), 0, 1);
   },
   set_scatterStrengthTexture__ ()
   {
      this .scatterStrengthTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._scatterStrengthTexture);

      this .addTexture (0, this .scatterStrengthTextureNode);
   },
   set_multiscatterColor__ ()
   {
      this .multiscatterColorArray .set (this ._multiscatterColor .getValue ());
   },
   set_multiscatterColorTexture__ ()
   {
      this .multiscatterColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._multiscatterColorTexture);

      this .addTexture (1, this .multiscatterColorTextureNode);
   },
   set_scatterAnisotropy__ ()
   {
      this .scatterAnisotropy = Algorithm .clamp (this ._scatterAnisotropy .getValue (), -1, 1);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .VOLUME_SCATTER_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");
      options .push (`X3D_SCATTER_SAMPLES_COUNT_EXT ${ScatterSamples .SCATTER_SAMPLES_COUNT}`);

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .scatterStrengthTextureNode   ?.getShaderOptions (options, "SCATTER_STRENGTH",   true);
      this .multiscatterColorTextureNode ?.getShaderOptions (options, "MULTISCATTER_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ScatterMaterialIdEXT");
      uniforms .push ("x3d_ScatterStrengthEXT");
      uniforms .push ("x3d_MultiscatterColorEXT");
      uniforms .push ("x3d_ScatterAnisotropyEXT");
      uniforms .push ("x3d_ScatterSamplesEXT");
      uniforms .push ("x3d_ScatterMinRadiusEXT");
      uniforms .push ("x3d_ScatterSamplerEXT");
      uniforms .push ("x3d_ScatterDepthSamplerEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      const browser = this .getBrowser ();

      this .scatterStrengthTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_ScatterStrengthTextureEXT,
         this ._scatterStrengthTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .multiscatterColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_MultiscatterColorTextureEXT,
         this ._multiscatterColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (shaderObject .volumeScatterPass)
      {
         gl .uniform1f  (shaderObject .x3d_ScatterMaterialIdEXT, browser .getShapeId ());
         gl .uniform1f  (shaderObject .x3d_ScatterStrengthEXT,   this .scatterStrength);
         gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
         return;
      }

      gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
      gl .uniform1f  (shaderObject .x3d_ScatterAnisotropyEXT, this .scatterAnisotropy);
      gl .uniform3fv (shaderObject .x3d_ScatterSamplesEXT,    ScatterSamples .SCATTER_SAMPLES);
      gl .uniform1f  (shaderObject .x3d_ScatterMinRadiusEXT,  ScatterSamples .SCATTER_MIN_RADIUS);

      // Set scatter framebuffer textures.

      const
         scatterSampleBuffer       = browser .getVolumeScatterBuffer (),
         scatterSampleUnit         = browser .popTextureUnit (),
         scatterDepthSampleUnit    = browser .popTextureUnit (),
         scatterSampleTexture      = scatterSampleBuffer .getColorTexture (),
         scatterDepthSampleTexture = scatterSampleBuffer .getDepthTexture ();

      gl .activeTexture (gl .TEXTURE0 + scatterSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterSamplerEXT, scatterSampleUnit);

      gl .activeTexture (gl .TEXTURE0 + scatterDepthSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterDepthSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterDepthSamplerEXT, scatterDepthSampleUnit);
   },
});

Object .defineProperties (VolumeScatterMaterialExtension,
{
   ... X3DNode .getStaticProperties ("VolumeScatterMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterStrength",                 new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterStrengthTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterStrengthTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "multiscatterColor",               new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "multiscatterColorTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "multiscatterColorTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterAnisotropy",               new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default VolumeScatterMaterialExtension;
