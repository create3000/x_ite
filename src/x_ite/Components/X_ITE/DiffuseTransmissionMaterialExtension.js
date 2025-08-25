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

ExtensionKeys .add ("DIFFUSE_TRANSMISSION_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_DiffuseTransmissionTextureEXT");
MaterialTextures .add ("x3d_DiffuseTransmissionColorTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function DiffuseTransmissionMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .DiffuseTransmissionMaterialExtension);

   this .diffuseTransmissionColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (DiffuseTransmissionMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._diffuseTransmission             .addInterest ("set_diffuseTransmission__",             this);
      this ._diffuseTransmissionTexture      .addInterest ("set_diffuseTransmissionTexture__",      this);
      this ._diffuseTransmissionColor        .addInterest ("set_diffuseTransmissionColor__",        this);
      this ._diffuseTransmissionColorTexture .addInterest ("set_diffuseTransmissionColorTexture__", this);

      this .set_diffuseTransmission__ ();
      this .set_diffuseTransmissionTexture__ ();
      this .set_diffuseTransmissionColor__ ();
      this .set_diffuseTransmissionColorTexture__ ();
   },
   set_diffuseTransmission__ ()
   {
      this .diffuseTransmission = Algorithm .clamp (this ._diffuseTransmission .getValue (), 0, 1);
   },
   set_diffuseTransmissionTexture__ ()
   {
      this .diffuseTransmissionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._diffuseTransmissionTexture);

      this .setTexture (0, this .diffuseTransmissionTextureNode);
   },
   set_diffuseTransmissionColor__ ()
   {
      this .diffuseTransmissionColorArray .set (this ._diffuseTransmissionColor .getValue ());
   },
   set_diffuseTransmissionColorTexture__ ()
   {
      this .diffuseTransmissionColorTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._diffuseTransmissionColorTexture);

      this .setTexture (1, this .diffuseTransmissionColorTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .DIFFUSE_TRANSMISSION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_DIFFUSE_TRANSMISSION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .diffuseTransmissionTextureNode      ?.getShaderOptions (options, "DIFFUSE_TRANSMISSION",       true);
      this .diffuseTransmissionColorTextureNode ?.getShaderOptions (options, "DIFFUSE_TRANSMISSION_COLOR", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_DiffuseTransmissionEXT");
      uniforms .push ("x3d_DiffuseTransmissionColorEXT");
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f  (shaderObject .x3d_DiffuseTransmissionEXT,      this .diffuseTransmission);
      gl .uniform3fv (shaderObject .x3d_DiffuseTransmissionColorEXT, this .diffuseTransmissionColorArray);

      if (!+this .getTextureBits ())
         return;

      this .diffuseTransmissionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTransmissionTextureEXT,
         this ._diffuseTransmissionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      this .diffuseTransmissionColorTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_DiffuseTransmissionColorTextureEXT,
         this ._diffuseTransmissionColorTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (DiffuseTransmissionMaterialExtension,
{
   ... X3DNode .getStaticProperties ("DiffuseTransmissionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmission",                    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmissionTextureMapping",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmissionTexture",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmissionColor",               new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmissionColorTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "diffuseTransmissionColorTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default DiffuseTransmissionMaterialExtension;
