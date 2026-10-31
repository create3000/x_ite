import X3DParser   from "./X3DParser.js";
import GLTF2Parser from "./GLTF2Parser.js";
import $           from "../../lib/helper.js";

const
   MAGIC                = 0x46546C67, // glTF
   MAGIC_OFFSET         = 0,
   VERSION_OFFSET       = 4,
   LENGTH_OFFSET        = 8,
   CHUNK_ENCODING_PLAIN = 0x00000000,
   JSON_CHUNK           = 0x4e4f534a,
   BUFFER_CHUNK         = 0x004e4942;

const VERSION_LAYOUT = {
   2: { headerLength: 12, chunkHeaderLength: 8,  alignment: 4 },
   3: { headerLength: 16, chunkHeaderLength: 16, alignment: 8 },
};

function GLBParser (scene)
{
   X3DParser .call (this, scene);

   this .json    = [ ];
   this .buffers = [ ];
}

Object .assign (GLBParser,
{
   getEncoding ()
   {
      return "ARRAY_BUFFER";
   },
   isValid (input)
   {
      const
         arrayBuffer = input,
         dataView    = new DataView (input);

      if (!(arrayBuffer instanceof ArrayBuffer))
         return false;

      if (dataView .byteLength < 8)
         return false;

      if (dataView .getUint32 (MAGIC_OFFSET, true) !== MAGIC) // glTF
         return false;

      const
         version = dataView .getUint32 (VERSION_OFFSET, true),
         layout  = VERSION_LAYOUT [version];

      if (!layout) // Version
         return false;

      if (dataView .byteLength < layout .headerLength)
         return false;

      if (version >= 3)
      {
         if (Number (dataView .getBigUint64 (LENGTH_OFFSET, true)) !== dataView .byteLength)
            return false;
      }
      else
      {
         if (dataView .getUint32 (LENGTH_OFFSET, true) !== dataView .byteLength)
            return false;
      }

      return true;
   },
});

Object .assign (Object .setPrototypeOf (GLBParser .prototype, X3DParser .prototype),
{
   setInput (input)
   {
      this .arrayBuffer = input;
      this .dataView    = new DataView (input);
   },
   parseIntoScene (resolve, reject)
   {
      this .glb ()
         .then (resolve)
         .catch (reject);
   },
   async glb ()
   {
      this .version = this .dataView .getUint32 (VERSION_OFFSET, true);
      this .layout  = VERSION_LAYOUT [this .version];

      this .chunks ();

      const parser = new GLTF2Parser (this .getScene ());

      parser .setBuffers (this .buffers);

      for (const string of this .json)
      {
         try
         {
            const json = JSON .parse (string);

            if (!GLTF2Parser .isValid (json))
               continue;

            parser .setInput (json);

            await parser .rootObject (parser .input);
         }
         catch
         {
            continue;
         }
      }

      return this .getScene ();
   },
   chunks ()
   {
      const { layout, dataView, arrayBuffer, json, buffers } = this;

      for (let i = layout .headerLength; i < dataView .byteLength;)
      {
         if (i + layout .chunkHeaderLength > dataView .byteLength)
            throw new Error ("GLB Parser: Invalid chuck header length.");

         const { type, encoding, length } = this .chunkHeader (dataView, i);

         i += layout .chunkHeaderLength;

         if (i + length > dataView .byteLength)
            throw new Error ("GLB Parser: Invalid chunk length.");

         if (encoding === CHUNK_ENCODING_PLAIN)
         {
            switch (type)
            {
               case JSON_CHUNK: // Structured JSON Content
               {
                  json .push ($.decodeText (arrayBuffer .slice (i, i + length)));
                  break;
               }
               case BUFFER_CHUNK: // Binary Buffer
               {
                  buffers .push (arrayBuffer .slice (i, i + length));
                  break;
               }
            }
         }

         i = this .alignUp (i + length, layout .alignment);
      }
   },
   chunkHeader (dataView, i)
   {
      if (this .version >= 3)
      {
         const
            type     = dataView .getUint32 (i, true),
            encoding = dataView .getUint32 (i + 4, true),
            length   = Number (dataView .getBigUint64 (i + 8, true));

         return { type, encoding, length };
      }
      else
      {
         const
            length   = dataView .getUint32 (i, true),
            encoding = CHUNK_ENCODING_PLAIN,
            type     = dataView .getUint32 (i + 4, true);

         return { type, encoding, length };
      }
   },
   alignUp (value, alignment)
   {
      return Math .ceil (value / alignment) * alignment;
   },
});

export default GLBParser;
