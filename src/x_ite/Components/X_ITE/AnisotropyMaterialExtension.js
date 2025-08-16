import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";

// Register key.

ExtensionKeys .add ("ANISOTROPY_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_AnisotropyTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function AnisotropyMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .AnisotropyMaterialExtension);

   // Units

   this ._anisotropyRotation .setUnit ("angle");

   // Private properties

   this .anisotropyArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (AnisotropyMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._anisotropyStrength .addInterest ("set_anisotropyStrength__", this);
      this ._anisotropyRotation .addInterest ("set_anisotropyRotation__", this);
      this ._anisotropyTexture  .addInterest ("set_anisotropyTexture__",  this);

      this .set_anisotropyStrength__ ();
      this .set_anisotropyRotation__ ();
      this .set_anisotropyTexture__ ();
   },
   set_anisotropyStrength__ ()
   {
      this .anisotropyArray [2] = Math .max (this ._anisotropyStrength .getValue (), 0);
   },
   set_anisotropyRotation__ ()
   {
      const anisotropyRotation = this ._anisotropyRotation .getValue ();

      this .anisotropyArray [0] = Math .cos (anisotropyRotation);
      this .anisotropyArray [1] = Math .sin (anisotropyRotation);
   },
   set_anisotropyTexture__ ()
   {
      this .anisotropyTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._anisotropyTexture);

      this .setTexture (0, this .anisotropyTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .ANISOTROPY_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_ANISOTROPY_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .anisotropyTextureNode ?.getShaderOptions (options, "ANISOTROPY", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_AnisotropyEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_AnisotropyEXT, this .anisotropyArray);

      this .anisotropyTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_AnisotropyTextureEXT,
         this ._anisotropyTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (AnisotropyMaterialExtension,
{
   ... X3DNode .getStaticProperties ("AnisotropyMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anisotropyStrength",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anisotropyRotation",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anisotropyTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "anisotropyTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default AnisotropyMaterialExtension;
