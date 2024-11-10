import URLs from "../Networking/URLs.js";

// See: https://github.com/donmccurdy/mikktspace-wasm

export default new class MikkTSpace
{
   #promise;

   async initialize ()
   {
      return this .#promise = this .#promise ?? new Promise (async resolve =>
      {
         const imports =
         {
            wbg:
            {
               __wbindgen_string_new: (arg0, arg1) =>
               {
                  const ret = this .#getStringFromWasm0 (arg0, arg1);

                  return this .#addHeapObject (ret);
               },
               __wbindgen_rethrow: (arg0) =>
               {
                  throw this .#takeObject (arg0);
               },
            },
         };

         const input = await fetch (URLs .getLibraryURL ("mikktspace_bg.wasm"));

         const { instance } = await this .#load (input, imports);

         this .#wasm = instance .exports;

         resolve ();
      });
   }

   isInitialized ()
   {
      return !! this .#wasm;
   }

   async #load (response, imports)
   {
      if (typeof WebAssembly .instantiateStreaming === "function")
      {
         try
         {
            return await WebAssembly .instantiateStreaming (response, imports);
         }
         catch (error)
         {
            if (response .headers .get ("Content-Type") !== "application/wasm")
            {
               // console .warn ("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", error);
            }
            else
            {
               throw error;
            }
         }
      }

      const bytes = await response .arrayBuffer ();

      return await WebAssembly .instantiate (bytes, imports);
   }

   /**
   * Generates vertex tangents for the given position/normal/texcoord attributes.
   * @param {Float32Array} position vec3
   * @param {Float32Array} normal vec3
   * @param {Float32Array} texcoord vec2
   * @returns {Float32Array} vec4
   */
   generateTangents (position, normal, texcoord)
   {
      try
      {
         const
            retptr = this .#wasm .__wbindgen_add_to_stack_pointer (-16),
            ptr0   = this .#passArrayF32ToWasm0 (position, this .#wasm .__wbindgen_malloc),
            len0   = this .#WASM_VECTOR_LEN,
            ptr1   = this .#passArrayF32ToWasm0 (normal, this .#wasm .__wbindgen_malloc),
            len1   = this .#WASM_VECTOR_LEN,
            ptr2   = this .#passArrayF32ToWasm0 (texcoord, this .#wasm .__wbindgen_malloc),
            len2   = this .#WASM_VECTOR_LEN;

         this .#wasm .generateTangents (retptr, ptr0, len0, ptr1, len1, ptr2, len2);

         const
            r0 = this .#getInt32Memory0 () [retptr / 4 + 0],
            r1 = this .#getInt32Memory0 () [retptr / 4 + 1],
            v3 = this .#getArrayF32FromWasm0 (r0, r1) .slice ();

         this .#wasm .__wbindgen_free (r0, r1 * 4);

         return v3;
      }
      finally
      {
         this .#wasm .__wbindgen_add_to_stack_pointer (16);
      }
   }

   #wasm;
   #textDecoder = new TextDecoder ("utf-8", { ignoreBOM: true, fatal: true });
   #uint8Memory0;

   #getUint8Memory0 ()
   {
      if (this .#uint8Memory0 ?.buffer !== this .#wasm .memory .buffer)
         this .#uint8Memory0 = new Uint8Array (this .#wasm .memory .buffer);

      return this .#uint8Memory0;
   }

   #getStringFromWasm0 (ptr, len)
   {
      return this .#textDecoder .decode (this .#getUint8Memory0 () .subarray (ptr, ptr + len));
   }

   #heap = new Array (32) .fill (undefined) .toSpliced (32, 0, undefined, null, true, false);
   #heap_next = this .#heap .length;

   #addHeapObject (obj)
   {
      if (this .#heap_next === this .#heap .length)
         this .#heap .push (this .#heap .length + 1);

      const i = this .#heap_next;

      this .#heap_next = this .#heap [i];
      this .#heap [i]  = obj;

      return i;
   }

   #getObject (i)
   {
      return this .#heap [i];
   }

   #dropObject (i)
   {
      if (i < 36)
         return;

      this .#heap [i] = this .#heap_next;

      this .#heap_next = i;
   }

   #takeObject (i)
   {
      const ret = this .#getObject (i);

      this .#dropObject (i);

      return ret;
   }

   #float32Memory0;

   #getFloat32Memory0 ()
   {
      if (this .#float32Memory0 ?.buffer !== this .#wasm .memory .buffer)
         this .#float32Memory0 = new Float32Array (this .#wasm .memory .buffer);

      return this .#float32Memory0;
   }

   #WASM_VECTOR_LEN = 0;

   #passArrayF32ToWasm0 (arg, malloc)
   {
      const ptr = malloc (arg .length * 4);

      this .#getFloat32Memory0 () .set (arg, ptr / 4);

      this .#WASM_VECTOR_LEN = arg .length;

      return ptr;
   }

   #int32Memory0;

   #getInt32Memory0 ()
   {
      if (this .#int32Memory0 ?.buffer !== this .#wasm .memory .buffer)
         this .#int32Memory0 = new Int32Array (this .#wasm .memory .buffer);

      return this .#int32Memory0;
   }

   #getArrayF32FromWasm0 (ptr, len)
   {
      return this .#getFloat32Memory0 () .subarray (ptr / 4, ptr / 4 + len);
   }
};
