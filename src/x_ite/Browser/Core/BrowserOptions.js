import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DBaseNode          from "../../Base/X3DBaseNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import PrimitiveQuality     from "./PrimitiveQuality.js";
import Shading              from "./Shading.js";
import TextureQuality       from "./TextureQuality.js";
import TextCompression      from "./TextCompression.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

// https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/networking.html#BrowserProperties
// String values are considered to be case insensitive.

function BrowserOptions (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addAlias ("AntiAliased", this ._Antialiased);

   const browser = this .getBrowser ();

   this .localStorage     = browser .getLocalStorage () .addNameSpace ("BrowserOptions.");
   this .textureQuality   = TextureQuality .MEDIUM
   this .primitiveQuality = PrimitiveQuality .MEDIUM;
   this .shading          = Shading .GOURAUD;
}

Object .assign (Object .setPrototypeOf (BrowserOptions .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .localStorage .setDefaultValues ({
         Rubberband:        this ._Rubberband        .getValue (),
         PrimitiveQuality:  this ._PrimitiveQuality  .getValue (),
         TextureQuality:    this ._TextureQuality    .getValue (),
         StraightenHorizon: this ._StraightenHorizon .getValue (),
         Timings:           this ._Timings           .getValue (),
      });

      this ._Rubberband                   .addInterest ("set_Rubberband__",                   this);
      this ._Antialiased                  .addInterest ("set_Antialiased__",                  this);
      this ._PrimitiveQuality             .addInterest ("set_PrimitiveQuality__",             this);
      this ._TextureQuality               .addInterest ("set_TextureQuality__",               this);
      this ._Shading                      .addInterest ("set_Shading__",                      this);
      this ._StraightenHorizon            .addInterest ("set_StraightenHorizon__",            this);
      this ._AutoUpdate                   .addInterest ("set_AutoUpdate__",                   this);
      this ._ContentScale                 .addInterest ("set_ContentScale__",                 this);
      this ._Exposure                     .addInterest ("set_Exposure__",                     this);
      this ._LogarithmicDepthBuffer       .addInterest ("set_LogarithmicDepthBuffer__",       this);
      this ._Multisampling                .addInterest ("set_Multisampling__",                this);
      this ._Mute                         .addInterest ("set_Mute__",                         this);
      this ._OrderIndependentTransparency .addInterest ("set_OrderIndependentTransparency__", this);
      this ._Timings                      .addInterest ("set_Timings__",                      this);
      this ._XRSessionMode                .addInterest ("set_XRSessionMode__",                this);

      this .set_Antialiased__                  (this ._Antialiased);
      this .set_Shading__                      (this ._Shading);
      this .set_AutoUpdate__                   (this ._AutoUpdate);
      this .set_ContentScale__                 (this ._ContentScale);
      this .set_Exposure__                     (this ._Exposure);
      this .set_LogarithmicDepthBuffer__       (this ._LogarithmicDepthBuffer);
      this .set_Multisampling__                (this ._Multisampling);
      this .set_OrderIndependentTransparency__ (this ._OrderIndependentTransparency);
      this .set_XRSessionMode__                (this ._XRSessionMode);

      this .reset ();
   },
   reset: (() =>
   {
      const attributes = new Set ([
         "Antialiased",
         "AutoUpdate",
         "Cache",
         "ColorSpace",
         "ContentScale",
         "ContextMenu",
         "Debug",
         "Exposure",
         "LogarithmicDepthBuffer",
         "Multisampling",
         "Notifications",
         "OrderIndependentTransparency",
         "SplashScreen",
         "TextCompression",
         "ToneMapping",
         "XRSessionMode",
      ]);

      const mappings = new Map ([
         ["AutoUpdate",    "update"],
         ["XRSessionMode", "xrSessionMode"],
      ]);

      const restorable = new Set ([
         "PrimitiveQuality",
         "Rubberband",
         "StraightenHorizon",
         "TextureQuality",
         "Timings",
      ]);

      return function ()
      {
         const
            browser      = this .getBrowser (),
            localStorage = this .localStorage;

         for (const { name, value } of this .getFieldDefinitions ())
         {
            if (attributes .has (name))
            {
               const
                  attribute = mappings .get (name) ?? $.toLowerCaseFirst (name),
                  value     = browser .getElement () .attr (attribute);

               if (value !== undefined)
               {
                  browser .attributeChangedCallback (attribute, null, value);
                  continue;
               }
            }

            if (restorable .has (name))
            {
               const
                  value = localStorage [name],
                  field = this .getField (name);

               if (value !== field .getValue ())
                  field .setValue (value);

               continue;
            }

            const field = this .getField (name);

            if (field .equals (value))
               continue;

            field .assign (value);
         }
      };
   })(),
   getPrimitiveQuality ()
   {
      return this .primitiveQuality;
   },
   getQualityWhenMoving ()
   {
      const qualityWhenMoving = this ._QualityWhenMoving .getValue () .toUpperCase ();

      return PrimitiveQuality .get (qualityWhenMoving);
   },
   getTextureQuality ()
   {
      return this .textureQuality;
   },
   getShading ()
   {
      return this .shading;
   },
   getTextCompression ()
   {
      switch (this ._TextCompression .getValue () .toUpperCase ())
      {
         default: // CHAR_SPACING
            return TextCompression .CHAR_SPACING;
         case "SCALING":
            return TextCompression .SCALING;
      }
   },
   set_Rubberband__ (rubberband)
   {
      this .localStorage .Rubberband = rubberband .getValue ();
   },
   set_Antialiased__ ()
   {
      this .set_Multisampling__ (this ._Multisampling);
   },
   set_PrimitiveQuality__ (value)
   {
      const
         browser          = this .getBrowser (),
         primitiveQuality = value .getValue () .toUpperCase ();

      this .localStorage .PrimitiveQuality = primitiveQuality;
      this .primitiveQuality               = PrimitiveQuality .get (primitiveQuality) ?? PrimitiveQuality .MEDIUM;

      browser .setPrimitiveQuality2D ?.(this .primitiveQuality);
      browser .setPrimitiveQuality3D ?.(this .primitiveQuality);
   },
   set_TextureQuality__ (value)
   {
      const
         browser        = this .getBrowser (),
         textureQuality = value .getValue () .toUpperCase ();

      this .localStorage .TextureQuality = textureQuality;
      this .textureQuality               = TextureQuality .get (textureQuality) ?? TextureQuality .MEDIUM;

      browser .setTextureQuality ?.(this .textureQuality);
   },
   set_Shading__: (() =>
   {
      const strings = new Map (Object .entries (Shading) .map (entry => entry .reverse ()));

      return function (value)
      {
         const
            browser = this .getBrowser (),
            shading = value .getValue () .toUpperCase () .replace ("POINTSET", "POINT");

         this .shading = Shading .get (shading) ?? Shading .GOURAUD;

         browser .getRenderingProperties () ._Shading = strings .get (this .shading);
         browser .setShading (this .shading);
      };
   })(),
   set_StraightenHorizon__ (straightenHorizon)
   {
      this .localStorage .StraightenHorizon = straightenHorizon .getValue ();

      if (straightenHorizon .getValue ())
         this .getBrowser () .getActiveLayer () ?.straightenView ();
   },
   set_AutoUpdate__ (autoUpdate)
   {
      const
         browser = this .getBrowser (),
         element = browser .getElement () [0];

      const documentEvents = ["visibilitychange"]
         .map (event => `${event}.${this .getTypeName ()}${this .getId ()}`)
         .join (" ");

      $(document) .off (documentEvents);

      this .intersectionObserver ?.disconnect ();

      if (!autoUpdate .getValue ())
         return;

      $(document) .on (documentEvents, () => this .checkUpdate ());

      this .intersectionObserver ??= new IntersectionObserver (entries =>
      {
         this .isIntersecting = entries .some (entry => entry .isIntersecting);

         this .checkUpdate ();
      });

      this .intersectionObserver .observe (element);
   },
   checkUpdate ()
   {
      if (!this ._AutoUpdate .getValue ())
         return;

      const browser = this .getBrowser ();

      if ((!document .hidden && this .isIntersecting) || browser .getPose ())
      {
         if (!browser .isLive ())
            browser .beginUpdate ();
      }
      else
      {
         if (browser .isLive ())
            browser .endUpdate ();
      }
   },
   set_ContentScale__ (contentScale)
   {
      const browser = this .getBrowser ();

      if (this .removeUpdateContentScale)
         this .removeUpdateContentScale ();

      if (contentScale .getValue () === -1)
         this .updateContentScale ();
      else
         browser .getRenderingProperties () ._ContentScale = Math .max (contentScale .getValue (), 0) || 1;

      browser .reshape ();
   },
   updateContentScale ()
   {
      const
         browser = this .getBrowser (),
         media   = window .matchMedia (`(resolution: ${window .devicePixelRatio}dppx)`),
         update  = this .updateContentScale .bind (this);

      if (this .removeUpdateContentScale)
         this .removeUpdateContentScale ();

      this .removeUpdateContentScale = function () { media .removeEventListener ("change", update) };

      media .addEventListener ("change", update);

      browser .getRenderingProperties () ._ContentScale = window .devicePixelRatio;

      browser .reshape ();
   },
   set_Exposure__ ()
   {
      const
         browser  = this .getBrowser (),
         gl       = browser .getContext (),
         exposure = Math .max (this ._Exposure .getValue (), 0);

      for (const shaderNode of browser .getShaders () .values ())
      {
         gl .useProgram (shaderNode .getProgram ());
         gl .uniform1f (shaderNode .x3d_Exposure, exposure);
      }
   },
   set_LogarithmicDepthBuffer__ (logarithmicDepthBuffer)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      browser .getRenderingProperties () ._LogarithmicDepthBuffer = logarithmicDepthBuffer .getValue ();
   },
   set_Multisampling__ (multisampling)
   {
      const
         browser = this .getBrowser (),
         samples = Algorithm .clamp (multisampling .getValue (), 0, browser .getMaxSamples ());

      browser .getRenderingProperties () ._Multisampling = this ._Antialiased .getValue () ? samples : 0;
      browser .getRenderingProperties () ._Antialiased   = samples > 0;

      browser .reshape ();
   },
   set_Mute__ (mute)
   {
      const
         browser      = this .getBrowser (),
         audioContext = browser .getAudioContext ();

      if (mute .getValue ())
         browser .stopAudioElement (audioContext, "suspend");
      else
         browser .startAudioElement (audioContext, "resume");
   },
   set_OrderIndependentTransparency__ ()
   {
      this .getBrowser () .reshape ();
   },
   set_Timings__ (timings)
   {
      this .localStorage .Timings = timings .getValue ();
   },
   set_XRSessionMode__ ()
   {
      this .getBrowser () .xrUpdateButton ();
   },
});

Object .defineProperties (BrowserOptions,
{
   typeName:
   {
      value: "BrowserOptions",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "SplashScreen",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Dashboard",                    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Rubberband",                   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "EnableInlineViewpoints",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Antialiased",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "TextureQuality",               new Fields .SFString ("MEDIUM")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "PrimitiveQuality",             new Fields .SFString ("MEDIUM")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "QualityWhenMoving",            new Fields .SFString ("SAME")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Shading",                      new Fields .SFString ("GOURAUD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "MotionBlur",                   new Fields .SFBool ()),
         // Additional options:
         // Always update geometries, even if browser is not live.
         new X3DFieldDefinition (X3DConstants .inputOutput, "AlwaysUpdateGeometries",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "AutoUpdate",                   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Cache",                        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ColorSpace",                   new Fields .SFString ("LINEAR_WHEN_PHYSICAL_MATERIAL")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ContentScale",                 new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ContextMenu",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Debug",                        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Exposure",                     new Fields .SFDouble (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Gravity",                      new Fields .SFDouble (9.80665)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "LoadUrlObjects",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "LogarithmicDepthBuffer",       new Fields .SFBool ()),
         // A string, which is set to the *reference* field of metadata nodes, when they are created.
         new X3DFieldDefinition (X3DConstants .inputOutput, "MetadataReference",            new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Multisampling",                new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Mute",                         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Notifications",                new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "OrderIndependentTransparency", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "StraightenHorizon",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "TextCompression",              new Fields .SFString ("CHAR_SPACING")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "Timings",                      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "ToneMapping",                  new Fields .SFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "XRSessionMode",                new Fields .SFString ("IMMERSIVE_VR")),
      ]),
      enumerable: true,
   },
});

export default BrowserOptions;
