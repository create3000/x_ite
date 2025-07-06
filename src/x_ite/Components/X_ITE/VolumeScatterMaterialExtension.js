import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
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

// Define global constants.

const ScatterSamplesCount = 64; // Number of samples for the Burley diffusion profile.

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
   initialize: (function ()
   {
      let computedScatterSamples;

      return function ()
      {
         X3DMaterialExtensionNode .prototype .initialize .call (this);

         const [scatterSamples, minRadius] = computedScatterSamples ??= this .computeScatterSamples ();

         this .scatterSamples   = scatterSamples;
         this .scatterMinRadius = minRadius;

         this ._multiscatterColor .addInterest ("set_multiscatterColor__", this);
         this ._scatterAnisotropy .addInterest ("set_scatterAnisotropy__", this);

         this .set_multiscatterColor__ ();
         this .set_scatterAnisotropy__ ();
      };
   })(),
   /**
    * Using blender implementation of Burley diffusion profile.
    */
   computeScatterSamples ()
   {
      // Precompute sample position with white albedo.
      const d = this .burleySetup (1, 1);

      const randU = 0.2; // Random value between 0 and 1, fixed here for determinism.
      const randV = 0.5;

      // Find minimum radius that we can represent because we are only sampling the largest radius.
      let min_radius = 1;

      const goldenAngle  = Math .PI * (3 - Math .sqrt (5));
      const uniformArray = [ ];

      for (let i = 0; i < ScatterSamplesCount; ++ i)
      {
         const theta = goldenAngle * i + Math .PI * 2 * randU;
         const x     = (randV + i) / ScatterSamplesCount;
         const r     = this .burleySample (d, x);

         min_radius = Math .min (min_radius, r);

         uniformArray .push (theta, r , 1 / this .burleyPdf (d, r));
      }

      // Avoid float imprecision.
      min_radius = Math .max (min_radius, 0.00001);

      return [new Float32Array (uniformArray), min_radius];
   },
   burleySample (d, xRand)
   {
      xRand *= 0.9963790093708328;

      const tolerance         = 1e-6;
      const maxIterationCount = 10;

      let r;

      if (xRand <= 0.9)
         r = Math .exp (xRand * xRand * 2.4) - 1;
      else
         r = 15;

      // Solve against scaled radius.
      for (let i = 0; i < maxIterationCount; ++ i)
      {
         const exp_r_3 = Math .exp (-r / 3);
         const exp_r   = exp_r_3 * exp_r_3 * exp_r_3;
         const f       = 1 - 0.25 * exp_r - 0.75 * exp_r_3 - xRand;
         const f_      = 0.25 * exp_r + 0.25 * exp_r_3;

         if (Math .abs (f) < tolerance || f_ === 0)
            break;

         r = r - f / f_;
         r = Math .max (r, 0);
      }

      return r * d;
   },
   burleyEval (d, r)
   {
      if (r >= 16 * d)
         return 0;

      const exp_r_3_d = Math .exp (-r / (3 * d));
      const exp_r_d   = exp_r_3_d * exp_r_3_d * exp_r_3_d;

      return (exp_r_d + exp_r_3_d) / (8 * Math .PI * d);
   },
   burleyPdf (d, r)
   {
      return this .burleyEval (d, r) / 0.9963790093708328;
   },
   burleySetup (radius, albedo)
   {
      const m_1_pi = 0.318309886183790671538;
      const s      = 1.9 - albedo + 3.5 * ((albedo - 0.8) * (albedo - 0.8));
      const l      = 0.25 * m_1_pi * radius;

      return l / s;
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
      options .push (`X3D_SCATTER_SAMPLES_COUNT_EXT ${ScatterSamplesCount}`);
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
