import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";

// Register key.

ExtensionKeys .add ("SPECULAR_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_SpecularTextureEXT");
MaterialTextures .add ("x3d_SpecularColorTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function SpecularMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .SpecularMaterialExtension);

   this .specularColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SpecularMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._specular             .addInterest ("set_specular__",             this);
      this ._specularTexture      .addInterest ("set_specularTexture__",      this);
      this ._specularColor        .addInterest ("set_specularColor__",        this);
      this ._specularColorTexture .addInterest ("set_specularColorTexture__", this);

      this .set_specular__ ();
      this .set_specularTexture__ ();
      this .set_specularColor__ ();
      this .set_specularColorTexture__ ();
   },
   set_specular__ ()
   {
      this .specular = Math .max (this ._specular .getValue (), 0);
   },
   set_specularTexture__ ()
   {
      this .specularTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularTexture);

      this .setTexture (0, this .specularTextureNode);
   },
   set_specularColor__ ()
   {
      this .specularColorArray .set (this ._specularColor .getValue ());
   },
   set_specularColorTexture__ ()
   {
      this .specularColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._specularColorTexture);

      this .setTexture (1, this .specularColorTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .SPECULAR_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SPECULAR_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .specularTextureNode      ?.getShaderOptions (options, "SPECULAR",       true);
      this .specularColorTextureNode ?.getShaderOptions (options, "SPECULAR_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_SpecularEXT");
      uniforms .push ("x3d_SpecularColorEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_SpecularEXT,      this .specular);
      gl .uniform3fv (shaderObject .x3d_SpecularColorEXT, this .specularColorArray);

      if (!+this .getTextureBits ())
         return;

      this .specularTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SpecularTextureEXT,
         this ._specularTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .specularColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SpecularColorTextureEXT,
         this ._specularColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (SpecularMaterialExtension,
{
   ... X3DNode .getStaticProperties ("SpecularMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specular",                    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTextureMapping",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularTexture",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColor",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColorTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "specularColorTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SpecularMaterialExtension;
