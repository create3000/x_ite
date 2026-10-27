import X3DParser   from "./X3DParser.js";
import GLTF2Parser from "./GLTF2Parser.js";
import $           from "../../lib/helper.js";

const
   MAGIC_OFFSET   = 0,
   MAGIC          = 0x46546C67, // glTF
   VERSION_OFFSET = 4,
   LENGTH_OFFSET  = 8,
   JSON_CHUNK     = 0x4e4f534a,
   BUFFER_CHUNK   = 0x004e4942;

const VERSION_LAYOUT = {
   2: { headerLength: 12, chunkHeaderLength: 8,  alignment: 4 },
   3: { headerLength: 16, chunkHeaderLength: 16, alignment: 8 },
};

function GLB2Parser (scene)
{
   X3DParser .call (this, scene);

   this .json    = [ ];
   this .buffers = [ ];
}

Object .assign (Object .setPrototypeOf (GLB2Parser .prototype, X3DParser .prototype),
{
   getEncoding ()
   {
      return "ARRAY_BUFFER";
   },
   setInput (input)
   {
      this .arrayBuffer = input;
      this .dataView    = new DataView (input);
   },
   isValid ()
   {
      if (!(this .arrayBuffer instanceof ArrayBuffer))
         return false;

      const { dataView } = this;

      if (dataView .byteLength < 8)
         return false;

      if (dataView .getUint32 (MAGIC_OFFSET, true) !== MAGIC) // glTF
         return false;

      this .version = this .dataView .getUint32 (VERSION_OFFSET, true);
      this .layout  = VERSION_LAYOUT [this .version];

      if (!this .layout) // Version
         return false;

      if (dataView .byteLength < this .layout .headerLength)
         return false;

      if (this .version >= 3)
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
   parseIntoScene (resolve, reject)
   {
      this .glb ()
         .then (resolve)
         .catch (reject);
   },
   async glb ()
   {
      this .chunks ();

      const parser = new GLTF2Parser (this .getScene ());

      parser .setBuffers (this .buffers);

      for (const json of this .json)
      {
         parser .setInput (json);

         if (!parser .isValid ())
            continue;

         await parser .rootObject (parser .input);
      }

      return this .getScene ();
   },
   chunks ()
   {
      const { dataView, arrayBuffer, json, buffers } = this;

      for (let i = this .layout .headerLength; i < dataView .byteLength;)
      {
         const { type, encoding, length } = this .chunkHeader (dataView, i);

         i += this .layout .chunkHeaderLength;

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

         i += length;
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
            encoding = undefined,
            type     = dataView .getUint32 (i + 4, true);

         return { type, encoding, length };
      }
   },
});

export default GLB2Parser;
