import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";

// Register key.

ExtensionKeys .add ("VOLUME_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_ThicknessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function VolumeMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .VolumeMaterialExtension);

   // Units

   this ._thickness           .setUnit ("length");
   this ._attenuationDistance .setUnit ("length");

   // Private properties

   this .attenuationColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (VolumeMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._thickness           .addInterest ("set_thickness__",           this);
      this ._thicknessTexture    .addInterest ("set_thicknessTexture__",    this);
      this ._attenuationDistance .addInterest ("set_attenuationDistance__", this);
      this ._attenuationColor    .addInterest ("set_attenuationColor__",    this);

      this .set_thickness__ ();
      this .set_thicknessTexture__ ();
      this .set_attenuationDistance__ ();
      this .set_attenuationColor__ ();
   },
   set_thickness__ ()
   {
      this .thickness = Math .max (this ._thickness .getValue (), 0);
   },
   set_thicknessTexture__ ()
   {
      this .thicknessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._thicknessTexture);

      this .setTexture (0, this .thicknessTextureNode);
   },
   set_attenuationDistance__ ()
   {
      this .attenuationDistance = Math .max (this ._attenuationDistance .getValue (), 0);
   },
   set_attenuationColor__ ()
   {
      this .attenuationColorArray .set (this ._attenuationColor .getValue ());
   },
   getExtensionKey ()
   {
      return ExtensionKeys .VOLUME_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_VOLUME_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .thicknessTextureNode ?.getShaderOptions (options, "THICKNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_ThicknessEXT");
      uniforms .push ("x3d_AttenuationDistanceEXT");
      uniforms .push ("x3d_AttenuationColorEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_ThicknessEXT,           this .thickness);
      gl .uniform1f  (shaderObject .x3d_AttenuationDistanceEXT, this .attenuationDistance);
      gl .uniform3fv (shaderObject .x3d_AttenuationColorEXT,    this .attenuationColorArray);

      if (!+this .getTextureBits ())
         return;

      this .thicknessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         shaderObject .x3d_ThicknessTextureEXT,
         this ._thicknessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (VolumeMaterialExtension,
{
   ... X3DNode .getStaticProperties ("VolumeMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "thickness",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "thicknessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "thicknessTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attenuationDistance",     new Fields .SFFloat (1_000_000)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attenuationColor",        new Fields .SFColor (1, 1, 1)),
      ]),
      enumerable: true,
   },
});

export default VolumeMaterialExtension;
