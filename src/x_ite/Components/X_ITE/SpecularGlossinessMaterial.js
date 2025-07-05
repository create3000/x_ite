import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DOneSidedMaterialNode from "../Shape/X3DOneSidedMaterialNode.js";
import X3DCast                 from "../../Base/X3DCast.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Algorithm               from "../../../standard/Math/Algorithm.js";

// Register shaders.

import ShaderRegistry              from "../../Browser/Shaders/ShaderRegistry.js";
import SpecularGlossiness2         from "../../../assets/shaders/webgl2/pbr/SpecularGlossiness2.glsl.js";
import SpecularGlossinessFragment1 from "../../../assets/shaders/webgl1/SpecularGlossiness1.fs.js";
import SpecularGlossinessFragment2 from "../../../assets/shaders/webgl2/SpecularGlossiness2.fs.js";

ShaderRegistry .addInclude  ("SpecularGlossiness", SpecularGlossiness2);
ShaderRegistry .addFragment ("SpecularGlossiness", SpecularGlossinessFragment1, SpecularGlossinessFragment2);

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_SpecularGlossinessTexture");

/**
 * THIS NODE IS DEPRECIATED SINCE X3D VERSION 4.0.
 */

function SpecularGlossinessMaterial (executionContext)
{
   console .warn ("SpecularGlossinessMaterial is depreciated, please use PhysicalMaterial instead.");

   X3DOneSidedMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .SpecularGlossinessMaterial);

   this .diffuseColorArray  = new Float32Array (3);
   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SpecularGlossinessMaterial .prototype, X3DOneSidedMaterialNode .prototype),
{
   initialize ()
   {
      X3DOneSidedMaterialNode .prototype .initialize .call (this);

      this ._diffuseColor              .addInterest ("set_diffuseColor__",              this);
      this ._diffuseTexture            .addInterest ("set_diffuseTexture__",            this);
      this ._diffuseTexture            .addInterest ("set_transparent__",               this);
      this ._specularColor             .addInterest ("set_specularColor__",             this);
      this ._glossiness                .addInterest ("set_glossiness__",                this);
      this ._specularGlossinessTexture .addInterest ("set_specularGlossinessTexture__", this);
      this ._occlusionStrength         .addInterest ("set_occlusionStrength__",         this);
      this ._occlusionTexture          .addInterest ("set_occlusionTexture__",          this);

      this .set_diffuseColor__ ();
      this .set_diffuseTexture__ ();
      this .set_specularColor__ ();
      this .set_glossiness__ ();
      this .set_specularGlossinessTexture__ ();
      this .set_occlusionStrength__ ();
      this .set_occlusionTexture__ ();
      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return 4;
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         DIFFUSE_TEXTURE: i ++,
         SPECULAR_GLOSSINESS_TEXTURE: i ++,
         EMISSIVE_TEXTURE: i ++,
         OCCLUSION_TEXTURE: i ++,
         NORMAL_TEXTURE: i ++,
      };

      return function ()
      {
         return textureIndices;
      };
   })(),
   getBaseTexture ()
   {
      return this .diffuseTextureNode;
   },
   set_diffuseColor__ ()
   {
      this .diffuseColorArray .set (this ._diffuseColor .getValue ());
   },
   set_diffuseTexture__ ()
   {
      const index = this .getTextureIndices () .DIFFUSE_TEXTURE;

      if (this .diffuseTextureNode)
      {
         this .diffuseTextureNode ._transparent .removeInterest ("set_transparent__",  this);
         this .diffuseTextureNode ._linear      .removeInterest (`setTexture${index}`, this);
      }

      this .diffuseTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._diffuseTexture);

      if (this .diffuseTextureNode)
      {
         this .diffuseTextureNode ._transparent .addInterest ("set_transparent__",  this);
         this .diffuseTextureNode ._linear      .addInterest (`setTexture${index}`, this, index, this .diffuseTextureNode);
      }

      this .setTexture (index, this .diffuseTextureNode);
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_glossiness__ ()
   {
      this .glossiness = Algorithm .clamp (this ._glossiness .getValue (), 0, 1);
   },
   set_specularGlossinessTexture__ ()
   {
      this .specularGlossinessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularGlossinessTexture);

      this .setTexture (this .getTextureIndices () .SPECULAR_GLOSSINESS_TEXTURE, this .specularGlossinessTextureNode);
   },
   set_occlusionStrength__ ()
   {
      this .occlusionStrength = Algorithm .clamp (this ._occlusionStrength .getValue (), 0, 1);
   },
   set_occlusionTexture__ ()
   {
      this .occlusionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._occlusionTexture);

      this .setTexture (this .getTextureIndices () .OCCLUSION_TEXTURE, this .occlusionTextureNode);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = this .getShaderOptions (geometryContext, renderContext);

      options .push ("X3D_PHYSICAL_MATERIAL", "X3D_MATERIAL_SPECULAR_GLOSSINESS");

      if (+this .getTextureBits ())
      {
         this .diffuseTextureNode            ?.getShaderOptions (options, "DIFFUSE");
         this .specularGlossinessTextureNode ?.getShaderOptions (options, "SPECULAR_GLOSSINESS");
         this .occlusionTextureNode          ?.getShaderOptions (options, "OCCLUSION");
      }

      const shaderNode = browser .createShader ("SpecularGlossiness", "Default", "SpecularGlossiness", options);

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      X3DOneSidedMaterialNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

      gl .uniform3fv (shaderObject .x3d_DiffuseColor,  this .diffuseColorArray);
      gl .uniform3fv (shaderObject .x3d_SpecularColor, this .specularColorArray);
      gl .uniform1f  (shaderObject .x3d_Glossiness,    this .glossiness);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTexture,
         this ._diffuseTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularGlossinessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SpecularGlossinessTexture,
         this ._specularGlossinessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .occlusionTextureNode)
      {
         gl .uniform1f (shaderObject .x3d_OcclusionStrength, this .occlusionStrength);

         this .occlusionTextureNode .setNamedShaderUniforms (gl,
            shaderObject,
            renderObject,
            shaderObject .x3d_OcclusionTexture,
            this ._occlusionTextureMapping .getValue (),
            textureTransformMapping,
            textureCoordinateMapping);
      }
   },
});

Object .defineProperties (SpecularGlossinessMaterial,
{
   ... X3DNode .getStaticProperties ("SpecularGlossinessMaterial", "X_ITE", 1, "material", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",                     new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTextureMapping",            new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTexture",                   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",                    new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "glossiness",                       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularGlossinessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularGlossinessTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",                    new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",                  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionStrength",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTextureMapping",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTexture",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",                      new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",                    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",                     new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (SpecularGlossinessMaterial .prototype .getTextureIndices ()))
{
   SpecularGlossinessMaterial .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

export default SpecularGlossinessMaterial;
