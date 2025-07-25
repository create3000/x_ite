import FontStyle     from "../../Components/Text/FontStyle.js";
import URLs          from "../Networking/URLs.js";
import * as OpenType from "../../../lib/opentype/opentype.mjs";
import DEVELOPMENT   from "../../DEVELOPMENT.js";

const
   _defaultFontStyle = Symbol (),
   _fontCache        = Symbol (),
   _loadingFonts     = Symbol (),
   _families         = Symbol (),
   _library          = Symbol (),
   _woff2Decoder     = Symbol ();

function X3DTextContext ()
{
   this [_loadingFonts] = new Set ();
   this [_fontCache]    = new Map ();
   this [_families]     = new WeakMap ();
   this [_library]      = new WeakMap ();
}

Object .assign (X3DTextContext .prototype,
{
   getDefaultFontStyle ()
   {
      return this [_defaultFontStyle] ??= (() =>
      {
         const defaultFontStyle = new FontStyle (this .getPrivateScene ());

         defaultFontStyle .setup ();

         return defaultFontStyle;
      })();
   },
   /**
    *
    * @param {URL} fileURL
    * @param {boolean} cache
    * @returns Promise<OpenType.Font>
    */
   loadFont (fileURL, cache = true)
   {
      let promise = cache ? this [_fontCache] .get (fileURL .href) : null;

      if (!promise)
      {
         promise = new Promise (async (resolve, reject) =>
         {
            try
            {
               const response = await fetch (fileURL, { cache: cache ? "default" : "reload" });

               if (!response .ok)
                  throw new Error (response .statusText || response .status);

               const
                  arrayBuffer  = await response .arrayBuffer (),
                  decompressed = await this .decompressFont (arrayBuffer),
                  font         = OpenType .parse (decompressed);

               if (DEVELOPMENT)
               {
                  if (fileURL .protocol !== "data:")
                     console .info (`Done loading font '${decodeURI (fileURL)}'.`);
               }

               resolve (font);
            }
            catch (error)
            {
               if (fileURL .protocol !== "data:")
                  console .warn (`Error loading font '${decodeURI (fileURL)}':`, error);

               resolve (null);
            }
            finally
            {
               this [_loadingFonts] .delete (promise);
            }
         });

         this [_loadingFonts] .add (promise);

         if (!fileURL .search)
            this [_fontCache] .set (fileURL .href, promise);
      }

      return promise;
   },
   registerFont (executionContext, font)
   {
      const families = this [_families] .getOrInsertComputed (executionContext, () => new Map ());

      // fontFamily - fontStyle

      const fontFamilies = new Map (Object .values (font .names)
         .flatMap (name => Object .values (name .fontFamily ?? { }) .map (fontFamily => [fontFamily, name])));

      for (const [fontFamily, name] of fontFamilies)
      {
         const fontStyles = families .getOrInsertComputed (fontFamily .toUpperCase (), () => new Map ());

         for (const fontStyle of new Set (Object .values (name .fontSubfamily ?? { })))
         {
            if (this .getBrowserOption ("Debug"))
               console .info (`Registering font family ${fontFamily} - ${fontStyle}.`);

            fontStyles .set (fontStyle .toUpperCase () .replaceAll (" ", ""), font);
         }
      }

      // console .log (name .preferredFamily);
      // console .log (name .preferredSubfamily);
   },
   registerFontLibrary (executionContext, fontFamily, font)
   {
      const library = this [_library] .getOrInsertComputed (executionContext, () => new Map ());

      // if (this .getBrowserOption ("Debug"))
      //    console .info (`Registering font named ${fontFamily}.`);

      library .set (fontFamily .toUpperCase (), font);
   },
   async getFont (executionContext, fontFamily, fontStyle)
   {
      try
      {
         fontFamily = fontFamily .toUpperCase ();
         fontStyle  = fontStyle .toUpperCase () .replaceAll (" ", "");

         for (;;)
         {
            const
               library  = this [_library]  .get (executionContext),
               families = this [_families] .get (executionContext);

            const font = library ?.get (fontFamily)
               ?? families ?.get (fontFamily) ?.get (fontStyle);

            if (font)
               return font;

            await Promise .any (this [_loadingFonts]);
         }
      }
      catch
      {
         return null;
      }
   },
   async decompressFont (arrayBuffer)
   {
      if (this .isWoff2 (arrayBuffer))
      {
         const decompress = await this .getWoff2Decoder ();

         return await decompress (arrayBuffer);
      }

      return arrayBuffer;
   },
   isWoff2 (arrayBuffer)
   {
      if (arrayBuffer .byteLength < 4)
         return false;

      const
         dataView = new DataView (arrayBuffer),
         magic    = dataView .getUint32 (0, false);

      return magic === 0x774F4632; // 'wOF2'
   },
   async getWoff2Decoder ()
   {
      return this [_woff2Decoder] ??= await this .loadWoff2Decoder ();
   },
   async loadWoff2Decoder ()
   {
      // https://www.npmjs.com/package/woff2-encoder

      const
         fileURL  = URLs .getLibraryURL ("woff2_decoder.js"),
         response = await fetch (fileURL);

      if (!response .ok)
         throw new Error (response .statusText || response .status);

      const
         text    = await response .text (),
         decoder = (new Function (text)) ();

      return decoder;
   },
});

export default X3DTextContext;
