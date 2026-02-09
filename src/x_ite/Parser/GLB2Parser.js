import X3DParser   from "./X3DParser.js";
import GLTF2Parser from "./GLTF2Parser.js";

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

      if (dataView .byteLength < 12)
         return false;

      if (dataView .getUint32 (0, true) !== 0x46546C67) // glTF
         return false;

      if (dataView .getUint32 (4, true) !== 2) // Version
         return false;

      if (dataView .getUint32 (8, true) !== dataView .byteLength)
         return false;

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

      for (let i = 12; i < dataView .byteLength;)
      {
         const
            length = dataView .getUint32 (i, true),
            type   = dataView .getUint32 (i + 4, true);

         i += 8;

         switch (type)
         {
            case 0x4e4f534a: // Structured JSON content
            {
               json .push ($.decodeText (arrayBuffer .slice (i, i + length)));
               break;
            }
            case 0x004e4942: // Binary buffer
            {
               buffers .push (arrayBuffer .slice (i, i + length));
               break;
            }
         }

         i += length;
      }
   },
});

export default GLB2Parser;
