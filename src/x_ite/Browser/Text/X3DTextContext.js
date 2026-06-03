import FontStyle     from "../../Components/Text/FontStyle.js";
import URLs          from "../Networking/URLs.js";
import FontLibrary   from "../../Components/Text/FontLibrary.js";
import * as OpenType from "../../../../node_modules/opentype.js/dist/opentype.mjs";
import FileLoader    from "../../InputOutput/FileLoader.js";
import DEVELOPMENT   from "../../DEVELOPMENT.js";

const
   _defaultFontStyle = Symbol (),
   _fontCache        = Symbol (),
   _library          = Symbol (),
   _woff2Decoder     = Symbol ();

function X3DTextContext ()
{
   this [_fontCache] = new Map ();
   this [_library]   = new WeakMap ();
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
   loadFont (fileURL, node)
   {
      let promise = node .getCache () ? this [_fontCache] .get (fileURL .href) : null;

      if (!promise)
      {
         promise = new Promise (async (resolve, reject) =>
         {
            new FileLoader (node, { dataAsString: false }) .loadDocument ([fileURL], async (data, url) =>
            {
               this .URL = new URL (url);

               if (data === null)
               {
                  if (fileURL .protocol !== "data:")
                     console .warn (`Error loading font '${decodeURI (fileURL)}':`);

                  resolve (null);
               }
               else if (data instanceof ArrayBuffer)
               {
                  const
                     decompressed = await this .decompressFont (data),
                     font         = OpenType .parse (decompressed);

                  if (DEVELOPMENT)
                  {
                     if (fileURL .protocol !== "data:")
                        console .info (`Done loading font '${decodeURI (fileURL)}'.`);
                  }

                  resolve (font);
               }
               else
               {
                  throw new Error (`${node .getTypeName ()}: no suitable file type handler found.`);
               }
            });
         });

         if (!fileURL .search)
            this [_fontCache] .set (fileURL .href, promise);
      }

      return promise;
   },
   registerFontLibrary (executionContext, fontFamily, font)
   {
      const library = this [_library] .getOrInsertComputed (executionContext, () => new Map ());

      // if (this .getBrowserOption ("Debug"))
      //    console .info (`Registering font named ${fontFamily}.`);

      library .set (fontFamily .toUpperCase (), font);
   },
   async getFont (executionContext, fontFamily)
   {
      try
      {
         fontFamily = fontFamily .toUpperCase ();

         for (;;)
         {
            const font = this [_library] .get (executionContext) ?.get (fontFamily);

            if (font)
               return font;

            const fontLibraries = Array .from (this .getLoadingObjects ())
               .filter (object => object instanceof FontLibrary)
               .map (object => object .loading ());

            await Promise .any (fontLibraries);
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
