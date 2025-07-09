import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";

// Register key.

ExtensionKeys .add ("IRIDESCENCE_MATERIAL_EXTENSION");

// Register shaders.

import ShaderRegistry from "../../Browser/Shaders/ShaderRegistry.js";
import Iridescence2   from "../../../assets/shaders/webgl2/pbr/Iridescence2.glsl.js";

ShaderRegistry .addInclude ("Iridescence", Iridescence2);

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_IridescenceTextureEXT");
MaterialTextures .add ("x3d_IridescenceThicknessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function IridescenceMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .IridescenceMaterialExtension);
}

Object .assign (Object .setPrototypeOf (IridescenceMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._iridescence                  .addInterest ("set_iridescence__",                  this);
      this ._iridescenceTexture           .addInterest ("set_iridescenceTexture__",           this);
      this ._iridescenceIndexOfRefraction .addInterest ("set_iridescenceIndexOfRefraction__", this);
      this ._iridescenceThicknessMinimum  .addInterest ("set_iridescenceThicknessMinimum__",  this);
      this ._iridescenceThicknessMaximum  .addInterest ("set_iridescenceThicknessMaximum__",  this);
      this ._iridescenceThicknessTexture  .addInterest ("set_iridescenceThicknessTexture__",  this);

      this .set_iridescence__ ();
      this .set_iridescenceTexture__ ();
      this .set_iridescenceIndexOfRefraction__ ();
      this .set_iridescenceThicknessMinimum__ ();
      this .set_iridescenceThicknessMaximum__ ();
      this .set_iridescenceThicknessTexture__ ();
   },
   set_iridescence__ ()
   {
      this .iridescence = Math .max (this ._iridescence .getValue (), 0);
   },
   set_iridescenceTexture__ ()
   {
      this .iridescenceTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._iridescenceTexture);

      this .setTexture (0, this .iridescenceTextureNode);
   },
   set_iridescenceIndexOfRefraction__ ()
   {
      this .iridescenceIndexOfRefraction = Math .max (this ._iridescenceIndexOfRefraction .getValue (), 1);
   },
   set_iridescenceThicknessMinimum__ ()
   {
      this .iridescenceThicknessMinimum = Math .max (this ._iridescenceThicknessMinimum .getValue (), 0);
   },
   set_iridescenceThicknessMaximum__ ()
   {
      this .iridescenceThicknessMaximum = Math .max (this ._iridescenceThicknessMaximum .getValue (), 0);
   },
   set_iridescenceThicknessTexture__ ()
   {
      this .iridescenceThicknessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._iridescenceThicknessTexture);

      this .setTexture (1, this .iridescenceThicknessTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .IRIDESCENCE_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_IRIDESCENCE_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .iridescenceTextureNode          ?.getShaderOptions (options, "IRIDESCENCE",           true);
      this .iridescenceThicknessTextureNode ?.getShaderOptions (options, "IRIDESCENCE_THICKNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_IridescenceEXT");
      uniforms .push ("x3d_IridescenceIndexOfRefractionEXT");
      uniforms .push ("x3d_IridescenceThicknessMinimumEXT");
      uniforms .push ("x3d_IridescenceThicknessMaximumEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_IridescenceEXT,                  this .iridescence);
      gl .uniform1f (shaderObject .x3d_IridescenceIndexOfRefractionEXT, this .iridescenceIndexOfRefraction);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMinimumEXT,  this .iridescenceThicknessMinimum);
      gl .uniform1f (shaderObject .x3d_IridescenceThicknessMaximumEXT,  this .iridescenceThicknessMaximum);

      if (!+this .getTextureBits ())
         return;

      this .iridescenceTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         shaderObject .x3d_IridescenceTextureEXT,
         this ._iridescenceTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .iridescenceThicknessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         shaderObject .x3d_IridescenceThicknessTextureEXT,
         this ._iridescenceThicknessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (IridescenceMaterialExtension,
{
   ... X3DNode .getStaticProperties ("IridescenceMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescence",                        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceTextureMapping",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceTexture",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceIndexOfRefraction",       new Fields .SFFloat (1.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceThicknessMinimum",        new Fields .SFFloat (100)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceThicknessMaximum",        new Fields .SFFloat (400)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceThicknessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "iridescenceThicknessTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IridescenceMaterialExtension;
