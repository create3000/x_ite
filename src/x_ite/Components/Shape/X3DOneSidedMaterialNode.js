import X3DNode         from "../Core/X3DNode.js";
import X3DMaterialNode from "./X3DMaterialNode.js";
import X3DCast         from "../../Base/X3DCast.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";

function X3DOneSidedMaterialNode (executionContext)
{
   X3DMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .X3DOneSidedMaterialNode);

   this .emissiveColorArray = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (X3DOneSidedMaterialNode .prototype, X3DMaterialNode .prototype),
{
   initialize ()
   {
      X3DMaterialNode .prototype .initialize .call (this);

      this ._emissiveColor   .addInterest ("set_emissiveColor__",   this);
      this ._emissiveTexture .addInterest ("set_emissiveTexture__", this);
      this ._normalScale     .addInterest ("set_normalScale__",     this);
      this ._normalTexture   .addInterest ("set_normalTexture__",   this);
      this ._transparency    .addInterest ("set_transparency__",    this);
      this ._transparency    .addInterest ("set_transparent__",     this);

      this .set_emissiveColor__ ();
      this .set_emissiveTexture__ ();
      this .set_normalScale__ ();
      this .set_normalTexture__ ();
      this .set_transparency__ ();
   },
   set_emissiveColor__ ()
   {
      this .emissiveColorArray .set (this ._emissiveColor .getValue ());
   },
   set_emissiveTexture__ ()
   {
      const index = this .getTextureIndices () .EMISSIVE_TEXTURE;

      this .emissiveTextureNode ?._linear .removeInterest (`setTexture${index}`, this);

      this .emissiveTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._emissiveTexture);

      this .emissiveTextureNode ?._linear .addInterest (`setTexture${index}`, this, index, this .emissiveTextureNode);

      this .setTexture (index, this .emissiveTextureNode);
   },
   set_normalScale__ ()
   {
      this .normalScale = Math .max (this ._normalScale .getValue (), 0);
   },
   set_normalTexture__ ()
   {
      this .normalTextureNode = X3DCast (X3DConstants .X3DSingleTextureNode, this ._normalTexture);

      this .setTexture (this .getTextureIndices () .NORMAL_TEXTURE, this .normalTextureNode);
   },
   set_transparency__ ()
   {
      this .transparency = Algorithm .clamp (this ._transparency .getValue (), 0, 1);
   },
   set_transparent__ ()
   {
      this .setTransparent (this .transparency || this .getBaseTexture () ?.isTransparent ());
   },
   getBaseTexture ()
   {
      return this .emissiveTextureNode;
   },
   getShaderOptions (geometryContext, renderContext)
   {
      const options = X3DMaterialNode .prototype .getShaderOptions .call (this, geometryContext, renderContext);

      if (+this .getTextureBits ())
      {
         this .emissiveTextureNode ?.getShaderOptions (options, "EMISSIVE");
         this .normalTextureNode   ?.getShaderOptions (options, "NORMAL");
      }

      return options;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      gl .uniform3fv (shaderObject .x3d_EmissiveColor, this .emissiveColorArray);
      gl .uniform1f  (shaderObject .x3d_Transparency,  this .transparency);

      if (!+this .getTextureBits ())
         return;

      this .emissiveTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_EmissiveTexture,
         this ._emissiveTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);

      if (this .normalTextureNode)
         gl .uniform1f (shaderObject .x3d_NormalScale, this .normalScale);

      this .normalTextureNode ?.setNamedShaderUniforms (gl,
         shaderObject,
         renderObject,
         shaderObject .x3d_NormalTexture,
         this ._normalTextureMapping .getValue (),
         textureTransformMapping,
         textureCoordinateMapping);
   },
});

Object .defineProperties (X3DOneSidedMaterialNode, X3DNode .getStaticProperties ("X3DOneSidedMaterialNode", "Shape", 4));

export default X3DOneSidedMaterialNode;
