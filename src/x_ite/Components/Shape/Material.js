import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DOneSidedMaterialNode from "./X3DOneSidedMaterialNode.js";
import Shading                 from "../../Browser/Core/Shading.js";
import X3DCast                 from "../../Base/X3DCast.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Algorithm               from "../../../standard/Math/Algorithm.js";

function Material (executionContext)
{
   X3DOneSidedMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .Material);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .getMaterialKey = getMaterialKey;

   // Private properties

   this .diffuseColorArray  = new Float32Array (3);
   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (Material .prototype, X3DOneSidedMaterialNode .prototype),
{
   initialize ()
   {
      X3DOneSidedMaterialNode .prototype .initialize .call (this);

      this ._ambientIntensity  .addInterest ("set_ambientIntensity__",  this);
      this ._ambientTexture    .addInterest ("set_ambientTexture__",    this);
      this ._diffuseColor      .addInterest ("set_diffuseColor__",      this);
      this ._diffuseTexture    .addInterest ("set_diffuseTexture__",    this);
      this ._diffuseTexture    .addInterest ("set_transparent__",       this);
      this ._specularColor     .addInterest ("set_specularColor__",     this);
      this ._specularTexture   .addInterest ("set_specularTexture__",   this);
      this ._shininess         .addInterest ("set_shininess__",         this);
      this ._shininessTexture  .addInterest ("set_shininessTexture__",  this);
      this ._occlusionStrength .addInterest ("set_occlusionStrength__", this);
      this ._occlusionTexture  .addInterest ("set_occlusionTexture__",  this);

      this .set_ambientIntensity__ ();
      this .set_ambientTexture__ ();
      this .set_diffuseColor__ ();
      this .set_diffuseTexture__ ();
      this .set_specularColor__ ();
      this .set_specularTexture__ ();
      this .set_shininess__ ();
      this .set_shininessTexture__ ();
      this .set_occlusionStrength__ ();
      this .set_occlusionTexture__ ();
      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return 2;
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         AMBIENT_TEXTURE: i ++,
         DIFFUSE_TEXTURE: i ++,
         SPECULAR_TEXTURE: i ++,
         EMISSIVE_TEXTURE: i ++,
         SHININESS_TEXTURE: i ++,
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
   set_ambientIntensity__ ()
   {
      this .ambientIntensity = Algorithm .clamp (this ._ambientIntensity .getValue (), 0, 1);
   },
   set_ambientTexture__ ()
   {
      const index = this .getTextureIndices () .AMBIENT_TEXTURE

      this .ambientTextureNode ?._linear .removeInterest (`setTexture${index}`, this);

      this .ambientTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._ambientTexture);

      this .ambientTextureNode ?._linear .addInterest (`setTexture${index}`, this, index, this .ambientTextureNode);

      this .setTexture (index, this .ambientTextureNode);
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
   set_specularTexture__ ()
   {
      const index = this .getTextureIndices () .SPECULAR_TEXTURE;

      this .specularTextureNode ?._linear .removeInterest (`setTexture${index}`, this);

      this .specularTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularTexture);

      this .specularTextureNode ?._linear .addInterest (`setTexture${index}`, this, index, this .specularTextureNode);

      this .setTexture (index, this .specularTextureNode);
   },
   set_shininess__ ()
   {
      this .shininess = Algorithm .clamp (this ._shininess .getValue (), 0, 1);
   },
   set_shininessTexture__ ()
   {
      this .shininessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._shininessTexture);

      this .setTexture (this .getTextureIndices () .SHININESS_TEXTURE, this .shininessTextureNode);
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

      if (geometryContext .hasNormals)
      {
         if (+this .getTextureBits ())
         {
            this .ambientTextureNode   ?.getShaderOptions (options, "AMBIENT");
            this .diffuseTextureNode   ?.getShaderOptions (options, "DIFFUSE");
            this .specularTextureNode  ?.getShaderOptions (options, "SPECULAR");
            this .shininessTextureNode ?.getShaderOptions (options, "SHININESS");
            this .occlusionTextureNode ?.getShaderOptions (options, "OCCLUSION");
         }

         switch (this .getMaterialKey ())
         {
            case 1:
            {
               options .push ("X3D_GOURAUD_MATERIAL");

               var shaderNode = browser .createShader ("Gouraud", "Default", "Material", options);
               break;
            }
            case 2:
            {
               options .push ("X3D_PHONG_MATERIAL");

               var shaderNode = browser .createShader ("Phong", "Default", "Material", options);
               break;
            }
         }
      }
      else
      {
         // If the Material node is used together with unlit points and lines, geometry shall be rendered as unlit and only the emissiveColor is used.

         options .push ("X3D_UNLIT_MATERIAL");

         var shaderNode = browser .createShader ("Unlit", "Default", "Unlit", options);
      }

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      X3DOneSidedMaterialNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping);

      gl .uniform1f  (shaderObject .x3d_AmbientIntensity, this .ambientIntensity);
      gl .uniform3fv (shaderObject .x3d_DiffuseColor,     this .diffuseColorArray);
      gl .uniform3fv (shaderObject .x3d_SpecularColor,    this .specularColorArray);
      gl .uniform1f  (shaderObject .x3d_Shininess,        this .shininess);

      if (!+this .getTextureBits ())
         return;

      this .ambientTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_AmbientTexture,
         this ._ambientTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .diffuseTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTexture,
         this ._diffuseTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_SpecularTexture,
         this ._specularTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .shininessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_ShininessTexture,
         this ._shininessTextureMapping .getValue (),
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

function getMaterialKey ()
{
   switch (this .getBrowser () .getBrowserOptions () .getShading ())
   {
      default:
         return 1;
      case Shading .PHONG:
         return 2;
   }
}

Object .defineProperties (Material,
{
   ... X3DNode .getStaticProperties ("Material", "Shape", 1, "material", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientIntensity",         new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTextureMapping",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ambientTexture",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseColor",             new Fields .SFColor (0.8, 0.8, 0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTextureMapping",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTexture",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",            new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",            new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininess",                new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTextureMapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shininessTexture",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionStrength",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTextureMapping",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "occlusionTexture",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",              new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",             new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (Material .prototype .getTextureIndices ()))
{
   Material .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

export default Material;
