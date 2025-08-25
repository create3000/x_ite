import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DOneSidedMaterialNode from "./X3DOneSidedMaterialNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function UnlitMaterial (executionContext)
{
   X3DOneSidedMaterialNode .call (this, executionContext);

   this .addType (X3DConstants .UnlitMaterial);
}

Object .assign (Object .setPrototypeOf (UnlitMaterial .prototype, X3DOneSidedMaterialNode .prototype),
{
   initialize ()
   {
      X3DOneSidedMaterialNode .prototype .initialize .call (this);

      this ._emissiveTexture .addInterest ("set_transparent__", this);

      this .set_transparent__ ();
   },
   getMaterialKey ()
   {
      return 0;
   },
   getTextureIndices: (() =>
   {
      let i = 0;

      const textureIndices = {
         EMISSIVE_TEXTURE: i ++,
         NORMAL_TEXTURE: i ++,
      };

      return function ()
      {
         return textureIndices;
      };
   })(),
   set_emissiveTexture__ ()
   {
      this .getBaseTexture () ?._transparent .removeInterest ("set_transparent__", this);

      X3DOneSidedMaterialNode .prototype .set_emissiveTexture__ .call (this);

      this .getBaseTexture () ?._transparent .addInterest ("set_transparent__", this);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = this .getShaderOptions (geometryContext, renderContext);

      options .push ("X3D_UNLIT_MATERIAL");

      const shaderNode = browser .createShader ("Unlit", "Default", "Unlit", options);

      browser .getShaders () .set (key, shaderNode);

      return shaderNode;
   },
});

Object .defineProperties (UnlitMaterial,
{
   ... X3DNode .getStaticProperties ("UnlitMaterial", "Shape", 1, "material", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveColor",          new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTextureMapping", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "emissiveTexture",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalScale",            new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTextureMapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalTexture",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",           new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

for (const index of Object .values (UnlitMaterial .prototype .getTextureIndices ()))
{
   UnlitMaterial .prototype [`setTexture${index}`] = function (index, textureNode)
   {
      this .setTexture (index, textureNode);
   };
}

export default UnlitMaterial;
