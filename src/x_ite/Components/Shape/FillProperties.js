import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function FillProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .FillProperties);

   this .addChildObjects (X3DConstants .outputOnly, "transparent", new Fields .SFBool ());

   this .hatchColor = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (FillProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      this ._filled     .addInterest ("set_filled__",     this);
      this ._hatched    .addInterest ("set_hatched__",    this);
      this ._hatchColor .addInterest ("set_hatchColor__", this);
      this ._hatchStyle .addInterest ("set_hatchStyle__", this);

      this .set_filled__ ();
      this .set_hatched__ ();
      this .set_hatchColor__ ();
      this .set_hatchStyle__ ();

      // Preload texture.
      this .getBrowser () .getHatchStyleTexture (this .hatchStyle);
   },
   getStyleKey ()
   {
      return this .hatched ? 2 : 1;
   },
   set_filled__ ()
   {
      this .filled = this ._filled .getValue ();

      this .setTransparent (!this .filled);
   },
   set_hatched__ ()
   {
      this .hatched = this ._hatched .getValue ();
   },
   set_hatchColor__ ()
   {
      this .hatchColor [0] = this ._hatchColor [0];
      this .hatchColor [1] = this ._hatchColor [1];
      this .hatchColor [2] = this ._hatchColor [2];
   },
   set_hatchStyle__ ()
   {
      let hatchStyle = this ._hatchStyle .getValue ();

      if (hatchStyle < 1 || hatchStyle > 19)
         hatchStyle = 1;

      this .hatchStyle = hatchStyle;
   },
   setTransparent (value)
   {
      if (!!value !== this ._transparent .getValue ())
         this ._transparent = value;
   },
   isTransparent ()
   {
      return this ._transparent .getValue ();
   },
   setShaderUniforms (gl, shaderObject)
   {
      const hatched = this .hatched;

      gl .uniform1i (shaderObject .x3d_FillPropertiesFilled,  this .filled);
      gl .uniform1i (shaderObject .x3d_FillPropertiesHatched, hatched);

      if (hatched)
      {
         const
            browser     = this .getBrowser (),
            texture     = browser .getHatchStyleTexture (this .hatchStyle),
            textureUnit = browser .getTextureUnit ();

         gl .uniform3fv (shaderObject .x3d_FillPropertiesHatchColor, this .hatchColor);
         gl .uniform1f  (shaderObject .x3d_FillPropertiesScale,      browser .getRenderingProperty ("ContentScale"));

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         gl .uniform1i (shaderObject .x3d_FillPropertiesTexture, textureUnit);
      }
   },
});

Object .defineProperties (FillProperties,
{
   ... X3DNode .getStaticProperties ("FillProperties", "Shape", 3, "fillProperties", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "filled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatched",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchStyle", new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hatchColor", new Fields .SFColor (1, 1, 1)),
      ]),
      enumerable: true,
   },
});

export default FillProperties;
