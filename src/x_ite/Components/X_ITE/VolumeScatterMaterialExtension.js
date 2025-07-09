import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import ScatterSamples           from "../../Browser/X_ITE/ScatterSamples.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";
import RenderPass               from "../../Rendering/RenderPass.js";

// Register key.

ExtensionKeys .add ("VOLUME_SCATTER_MATERIAL_EXTENSION");

// Register shaders.

import ShaderRegistry        from "../../Browser/Shaders/ShaderRegistry.js";
import Scatter2              from "../../../assets/shaders/webgl2/pbr/Scatter2.glsl.js";
import SubsurfaceScattering2 from "../../../assets/shaders/webgl2/pbr/SubsurfaceScattering2.glsl.js";

ShaderRegistry .addInclude ("Scatter",              undefined, Scatter2);
ShaderRegistry .addInclude ("SubsurfaceScattering", undefined, SubsurfaceScattering2);

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

      this .scatterSamples   = ScatterSamples .SCATTER_SAMPLES;
      this .scatterMinRadius = ScatterSamples .SCATTER_MIN_RADIUS;

      this ._multiscatterColor .addInterest ("set_multiscatterColor__", this);
      this ._scatterAnisotropy .addInterest ("set_scatterAnisotropy__", this);

      this .set_multiscatterColor__ ();
      this .set_scatterAnisotropy__ ();
   },
   set_multiscatterColor__ ()
   {
      this .multiscatterColorArray .set (this ._multiscatterColor .getValue ());
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
      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      options .push ("X3D_VOLUME_SCATTER_MATERIAL_EXT");
      options .push (`X3D_SCATTER_SAMPLES_COUNT_EXT ${ScatterSamples .SCATTER_SAMPLES_COUNT}`);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ScatterMaterialIdEXT");
      uniforms .push ("x3d_MultiscatterColorEXT");
      uniforms .push ("x3d_ScatterAnisotropyEXT");
      uniforms .push ("x3d_ScatterSamplesEXT");
      uniforms .push ("x3d_ScatterMinRadiusEXT");
      uniforms .push ("x3d_ScatterSamplerEXT");
      uniforms .push ("x3d_ScatterIBLSamplerEXT");
      uniforms .push ("x3d_ScatterDepthSamplerEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      if (renderObject .getRenderPass () === RenderPass .VOLUME_SCATTER_KEY)
      {
         gl .uniform1f  (shaderObject .x3d_ScatterMaterialIdEXT, this .getId ());
         gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
         return;
      }

      const browser = this .getBrowser ();

      gl .uniform3fv (shaderObject .x3d_MultiscatterColorEXT, this .multiscatterColorArray);
      gl .uniform1f  (shaderObject .x3d_ScatterAnisotropyEXT, this .scatterAnisotropy);
      gl .uniform3fv (shaderObject .x3d_ScatterSamplesEXT,    this .scatterSamples);
      gl .uniform1f  (shaderObject .x3d_ScatterMinRadiusEXT,  this .scatterMinRadius);

      // Set scatter framebuffer textures.

      const
         scatterSampleBuffer       = browser .getVolumeScatterBuffer (),
         scatterSampleUnit         = browser .getTextureUnit (),
         scatterIBLSampleUnit      = browser .getTextureUnit (),
         scatterDepthSampleUnit    = browser .getTextureUnit (),
         scatterSampleTexture      = scatterSampleBuffer .getColorTexture (0),
         scatterIBLSampleTexture   = scatterSampleBuffer .getColorTexture (1),
         scatterDepthSampleTexture = scatterSampleBuffer .getDepthTexture ();

      gl .activeTexture (gl .TEXTURE0 + scatterSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterSamplerEXT, scatterSampleUnit);

      gl .activeTexture (gl .TEXTURE0 + scatterIBLSampleUnit);
      gl .bindTexture (gl .TEXTURE_2D, scatterIBLSampleTexture);
      gl .uniform1i (shaderObject .x3d_ScatterIBLSamplerEXT, scatterIBLSampleUnit);

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
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "multiscatterColor", new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scatterAnisotropy", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default VolumeScatterMaterialExtension;
