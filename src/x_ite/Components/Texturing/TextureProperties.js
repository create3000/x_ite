import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function TextureProperties (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .TextureProperties);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this ._minificationFilter  = "FASTEST";
      this ._magnificationFilter = "FASTEST";
      this ._textureCompression  = "FASTEST";
   }
}

Object .assign (Object .setPrototypeOf (TextureProperties .prototype, X3DNode .prototype),
{
   getBorderWidth ()
   {
      // https://stackoverflow.com/questions/27760277/webgl-border-color-shader?lq=1
      return Algorithm .clamp (this ._borderWidth .getValue (), 0, 1);
   },
   getBoundaryMode: (() =>
   {
      const boundaryModes = new Map ([
         ["CLAMP",             "CLAMP_TO_EDGE"], // "CLAMP"
         ["CLAMP_TO_EDGE",     "CLAMP_TO_EDGE"],
         ["CLAMP_TO_BOUNDARY", "CLAMP_TO_EDGE"], // "CLAMP_TO_BORDER"
         ["MIRRORED_REPEAT",   "MIRRORED_REPEAT"],
         ["REPEAT",            "REPEAT"],
      ]);

      return function (string)
      {
         return boundaryModes .get (string) ?? "REPEAT";
      };
   })(),
   getBoundaryModeS ()
   {
      return this .getBoundaryMode (this ._boundaryModeS .getValue ());
   },
   getBoundaryModeT ()
   {
      return this .getBoundaryMode (this ._boundaryModeT .getValue ());
   },
   getBoundaryModeR ()
   {
      return this .getBoundaryMode (this ._boundaryModeR .getValue ());
   },
   getMinificationFilter: (() =>
   {
      const minificationFilters = new Map ([
         ["AVG_PIXEL_AVG_MIPMAP",         ["LINEAR",  "LINEAR_MIPMAP_LINEAR"]],
         ["AVG_PIXEL",                    ["LINEAR",  "LINEAR"]],
         ["AVG_PIXEL_NEAREST_MIPMAP",     ["LINEAR",  "LINEAR_MIPMAP_NEAREST"]],
         ["NEAREST_PIXEL_AVG_MIPMAP",     ["NEAREST", "NEAREST_MIPMAP_LINEAR"]],
         ["NEAREST_PIXEL_NEAREST_MIPMAP", ["NEAREST", "NEAREST_MIPMAP_NEAREST"]],
         ["NEAREST_PIXEL",                ["NEAREST", "NEAREST"]],
         ["NICEST",                       ["LINEAR",  "LINEAR_MIPMAP_LINEAR"]],
         ["FASTEST",                      ["NEAREST", "NEAREST"]],
      ]);

      return function (mipMaps = true)
      {
         const i = mipMaps && this ._generateMipMaps .getValue () ? 1 : 0;

         return minificationFilters .get (this ._minificationFilter .getValue ()) ?.[i]
            ?? this .getBrowser () .getDefaultTextureProperties () .getMinificationFilter (mipMaps);
      };
   })(),
   getMagnificationFilter: (() =>
   {
      const magnificationFilters = new Map ([
         ["AVG_PIXEL",     "LINEAR"],
         ["NEAREST_PIXEL", "NEAREST"],
         ["NICEST",        "LINEAR"],
         ["FASTEST",       "NEAREST"],
      ]);

      return function ()
      {
         return magnificationFilters .get (this ._magnificationFilter .getValue ())
            ?? this .getBrowser () .getDefaultTextureProperties () .getMagnificationFilter ();
      };
   })(),
   getTextureCompression: (() =>
   {
      const textureCompressions = new Map ([
         ["DEFAULT", "RGBA"],
         ["NICEST",  "RGBA"],
         ["FASTEST", "RGBA"],
         ["LOW",     "RGBA"],
         ["MEDIUM",  "RGBA"],
         ["HIGH",    "RGBA"],
      ]);

      return function ()
      {
         const
            browser            = this .getBrowser (),
            gl                 = browser .getContext (),
            compressedTexture  = gl .getExtension ("WEBGL_compressed_texture_etc"), // TODO: find suitable compression.
            textureCompression = compressedTexture ?.[textureCompressions .get (this ._textureCompression .getValue ())];

         return textureCompression ?? gl .RGBA;
      };
   })(),
});

Object .defineProperties (TextureProperties,
{
   ... X3DNode .getStaticProperties ("TextureProperties", "Texturing", 2, "textureProperties", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "borderColor",         new Fields .SFColorRGBA ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "borderWidth",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "anisotropicDegree",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "generateMipMaps",     new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "minificationFilter",  new Fields .SFString ("DEFAULT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "magnificationFilter", new Fields .SFString ("DEFAULT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "boundaryModeS",       new Fields .SFString ("REPEAT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "boundaryModeT",       new Fields .SFString ("REPEAT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "boundaryModeR",       new Fields .SFString ("REPEAT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "textureCompression",  new Fields .SFString ("DEFAULT")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texturePriority",     new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default TextureProperties;
