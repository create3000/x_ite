import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DBaseNode          from "../../Base/X3DBaseNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

// https://www.web3d.org/documents/specifications/19775-2/V3.3/Part02/servRef.html#getRenderingProperties
// https://www.web3d.org/documents/specifications/19777-1/V3.3/Part1/functions.html#t-FunctionsBrowserObject

function RenderingProperties (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addAlias ("AntiAliased", this ._Antialiased);
}

Object .assign (Object .setPrototypeOf (RenderingProperties .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      this ._ContentScale .addInterest ("set_contentScale__", this);

      this ._MaxTextureSize       = browser .getMaxTextureSize ();
      this ._TextureUnits         = browser .getMaxCombinedTextureUnits ();
      this ._MaxLights            = browser .getMaxLights ();
      this ._ColorDepth           = browser .getColorDepth ();
      this ._TextureMemory        = browser .getTextureMemory ();
      this ._MaxAnisotropicDegree = browser .getMaxAnisotropicDegree ();
      this ._MaxSamples           = browser .getMaxSamples ();

      this .set_contentScale__ ();
   },
   set_contentScale__ ()
   {
      const
         inches         = $("<div></div>") .hide () .css ("height", "10in") .appendTo ($("body")),
         pixelsPerPoint = inches .height () / 720 || 1;

      inches .remove ();

      this ._PixelsPerPoint = pixelsPerPoint * this ._ContentScale .getValue ();
   }
});

Object .defineProperties (RenderingProperties,
{
   typeName:
   {
      value: "RenderingProperties",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .outputOnly, "Shading",                new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxTextureSize",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "TextureUnits",           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxLights",              new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "Antialiased",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "ColorDepth",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "TextureMemory",          new Fields .SFDouble ()),
         // non-standard fields
         new X3DFieldDefinition (X3DConstants .outputOnly, "ContentScale",           new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "LogarithmicDepthBuffer", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxAnisotropicDegree",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "MaxSamples",             new Fields .SFInt32 (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "Multisampling",          new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "PixelsPerPoint",         new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly, "XRSession",              new Fields .SFBool ()),
      ]),
      enumerable: true,
   }
});

export default RenderingProperties;
