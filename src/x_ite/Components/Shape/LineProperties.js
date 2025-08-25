import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function LineProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .LineProperties);
}

Object .assign (Object .setPrototypeOf (LineProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      browser .getRenderingProperties () ._ContentScale .addInterest ("set_linewidthScaleFactor__", this);

      this ._applied              .addInterest ("set_applied__",              this);
      this ._linetype             .addInterest ("set_linetype__",             this);
      this ._linewidthScaleFactor .addInterest ("set_linewidthScaleFactor__", this);

      this .set_applied__ ();
      this .set_linetype__ ();
      this .set_linewidthScaleFactor__ ();

      // Preload texture.
      browser .getLinetypeTexture ();
   },
   getStyleKey ()
   {
      return this .applied ? 2 : 1;
   },
   getApplied ()
   {
      return this .applied;
   },
   getLinetype ()
   {
      return this .linetype;
   },
   getLinewidthScaleFactor ()
   {
      return this .linewidthScaleFactor;
   },
   getTransformLines ()
   {
      return this .transformLines;
   },
   set_applied__ ()
   {
      this .applied = this ._applied .getValue ();
   },
   set_linetype__ ()
   {
      let linetype = this ._linetype .getValue ();

      if (linetype < 1 || linetype > 16)
         linetype = 1;

      this .linetype = linetype;
   },
   set_linewidthScaleFactor__ ()
   {
      const
         browser               = this .getBrowser (),
         gl                    = browser .getContext (),
         contentScale          = browser .getRenderingProperty ("ContentScale"),
         aliasedLineWidthRange = gl .getParameter (gl .ALIASED_LINE_WIDTH_RANGE);

      this .linewidthScaleFactor = Math .max (1, this ._linewidthScaleFactor .getValue ()) * contentScale;
      this .transformLines       = this .linewidthScaleFactor > 1 && this .linewidthScaleFactor > aliasedLineWidthRange [1];
   },
   setShaderUniforms (gl, shaderObject)
   {
      const browser = this .getBrowser ();

      if (this .applied)
      {
         const textureUnit = browser .getTextureUnit ();

         if (!this .transformLines)
            gl .lineWidth (this .linewidthScaleFactor);

         gl .uniform1i (shaderObject .x3d_LinePropertiesLinetype, this .linetype);
         gl .uniform1f (shaderObject .x3d_LineStippleScale,       browser .getLineStippleScale ());

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, browser .getLinetypeTexture () .getTexture ());
         gl .uniform1i (shaderObject .x3d_LinePropertiesTexture, textureUnit);
      }
      else
      {
         if (!this .transformLines)
            gl .lineWidth (browser .getRenderingProperty ("ContentScale"));

         gl .uniform1i (shaderObject .x3d_LinePropertiesLinetype, 16);
         gl .uniform1f (shaderObject .x3d_LineStippleScale,       1);
      }
   },
});

Object .defineProperties (LineProperties,
{
   ... X3DNode .getStaticProperties ("LineProperties", "Shape", 2, "lineProperties", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "applied",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linetype",             new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linewidthScaleFactor", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default LineProperties;
