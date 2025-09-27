import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DMaterialExtensionNode from "./X3DMaterialExtensionNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import X3DCast                  from "../../Base/X3DCast.js";
import ExtensionKeys            from "../../Browser/X_ITE/ExtensionKeys.js";
import Algorithm                from "../../../standard/Math/Algorithm.js";

// Register key.

ExtensionKeys .add ("SHEEN_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_SheenColorTextureEXT");
MaterialTextures .add ("x3d_SheenRoughnessTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function SheenMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .SheenMaterialExtension);

   this .sheenColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (SheenMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      // Preload LUTs.
      this .getBrowser () .getLibraryTexture ("lut_charlie.png");
      this .getBrowser () .getLibraryTexture ("lut_sheen_E.png");

      this ._sheenColor            .addInterest ("set_sheenColor__",            this);
      this ._sheenColorTexture     .addInterest ("set_sheenColorTexture__",     this);
      this ._sheenRoughness        .addInterest ("set_sheenRoughness__",        this);
      this ._sheenRoughnessTexture .addInterest ("set_sheenRoughnessTexture__", this);

      this .set_sheenColor__ ();
      this .set_sheenColorTexture__ ();
      this .set_sheenRoughness__ ();
      this .set_sheenRoughnessTexture__ ();
   },
   set_sheenColor__ ()
   {
      this .sheenColorArray .set (this ._sheenColor .getValue ());
   },
   set_sheenColorTexture__ ()
   {
      this .sheenColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._sheenColorTexture);

      this .setTexture (0, this .sheenColorTextureNode);
   },
   set_sheenRoughness__ ()
   {
      this .sheenRoughness = Algorithm .clamp (this ._sheenRoughness .getValue (), 0, 1);
   },
   set_sheenRoughnessTexture__ ()
   {
      this .sheenRoughnessTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._sheenRoughnessTexture);

      this .setTexture (1, this .sheenRoughnessTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .SHEEN_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_SHEEN_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .sheenColorTextureNode     ?.getShaderOptions (options, "SHEEN_COLOR",     true);
      this .sheenRoughnessTextureNode ?.getShaderOptions (options, "SHEEN_ROUGHNESS", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_SheenColorEXT");
      uniforms .push ("x3d_SheenRoughnessEXT");
      uniforms .push ("x3d_SheenELUTTextureEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_SheenColorEXT,     this .sheenColorArray);
      gl .uniform1f  (shaderObject .x3d_SheenRoughnessEXT, this .sheenRoughness);

      const
         browser              = this .getBrowser (),
         SheenELUTTexture     = browser .getLibraryTexture ("lut_sheen_E.png"),
         SheenELUTTextureUnit = browser .getTextureUnit ();

      gl .activeTexture (gl .TEXTURE0 + SheenELUTTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, SheenELUTTexture .getTexture ());
      gl .uniform1i (shaderObject .x3d_SheenELUTTextureEXT, SheenELUTTextureUnit);

      if (!+this .getTextureBits ())
         return;

      this .sheenColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SheenColorTextureEXT,
         this ._sheenColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .sheenRoughnessTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_SheenRoughnessTextureEXT,
         this ._sheenRoughnessTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (SheenMaterialExtension,
{
   ... X3DNode .getStaticProperties ("SheenMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColor",                   new Fields .SFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColorTextureMapping",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenColorTexture",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughness",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughnessTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sheenRoughnessTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SheenMaterialExtension;
