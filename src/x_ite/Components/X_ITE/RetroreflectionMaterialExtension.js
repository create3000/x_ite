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

ExtensionKeys .add ("RETROREFLECTION_MATERIAL_EXTENSION");

// Register textures.

import MaterialTextures from "../../../assets/shaders/MaterialTextures.js";

MaterialTextures .add ("x3d_RetroreflectionTextureEXT");

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function RetroreflectionMaterialExtension (executionContext)
{
   X3DMaterialExtensionNode .call (this, executionContext);

   this .addType (X3DConstants .RetroreflectionMaterialExtension);
}

Object .assign (Object .setPrototypeOf (RetroreflectionMaterialExtension .prototype, X3DMaterialExtensionNode .prototype),
{
   initialize ()
   {
      X3DMaterialExtensionNode .prototype .initialize .call (this);

      this ._retroreflection        .addInterest ("set_retroreflection__",        this);
      this ._retroreflectionTexture .addInterest ("set_retroreflectionTexture__", this);

      this .set_retroreflection__ ();
      this .set_retroreflectionTexture__ ();
   },
   set_retroreflection__ ()
   {
      this .retroreflection = Algorithm .clamp (this ._retroreflection .getValue (), 0, 1);
   },
   set_retroreflectionTexture__ ()
   {
      this .retroreflectionTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._retroreflectionTexture);

      this .addTexture (0, this .retroreflectionTextureNode);
   },
   getExtensionKey ()
   {
      return ExtensionKeys .RETROREFLECTION_MATERIAL_EXTENSION;
   },
   getShaderOptions (options)
   {
      options .push ("X3D_RETROREFLECTION_MATERIAL_EXT");

      if (!+this .getTextureBits ())
         return;

      options .push ("X3D_MATERIAL_TEXTURES");

      this .retroreflectionTextureNode ?.getShaderOptions (options, "RETROREFLECTION", true);
   },
   getShaderUniforms (uniforms)
   {
      uniforms .push ("x3d_RetroreflectionEXT");
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform1f (shaderObject .x3d_RetroreflectionEXT, this .retroreflection);

      this .retroreflectionTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject .x3d_RetroreflectionTextureEXT,
         this ._retroreflectionTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (RetroreflectionMaterialExtension,
{
   ... X3DNode .getStaticProperties ("RetroreflectionMaterialExtension", "X_ITE", 1, "extensions", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retroreflection",               new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retroreflectionTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retroreflectionTexture",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default RetroreflectionMaterialExtension;
