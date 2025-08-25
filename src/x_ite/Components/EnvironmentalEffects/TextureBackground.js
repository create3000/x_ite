import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DBackgroundNode    from "./X3DBackgroundNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";

function TextureBackground (executionContext)
{
   X3DBackgroundNode .call (this, executionContext);

   this .addType (X3DConstants .TextureBackground);
}

Object .assign (Object .setPrototypeOf (TextureBackground .prototype, X3DBackgroundNode .prototype),
{
   initialize ()
   {
      X3DBackgroundNode .prototype .initialize .call (this);

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 4);
      this ._bottomTexture .addInterest ("set_texture__", this, 5);

      this .set_texture__ (0, this ._frontTexture);
      this .set_texture__ (1, this ._backTexture);
      this .set_texture__ (2, this ._leftTexture);
      this .set_texture__ (3, this ._rightTexture);
      this .set_texture__ (4, this ._topTexture);
      this .set_texture__ (5, this ._bottomTexture);
   },
   set_texture__ (index, textureNode)
   {
      X3DBackgroundNode .prototype .set_texture__ .call (this, index, X3DCast (X3DConstants .X3DTextureNode, textureNode));
   },
});

Object .defineProperties (TextureBackground,
{
   ... X3DNode .getStaticProperties ("TextureBackground", "EnvironmentalEffects", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyAngle",      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "skyColor",      new Fields .MFColor (new Color3 ())),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundAngle",   new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "groundColor",   new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transparency",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",      new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frontTexture",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "backTexture",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftTexture",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "rightTexture",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topTexture",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bottomTexture", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default TextureBackground;
