Object .assign ($,
{
   isEmptyObject (object)
   {
      if (!(object instanceof Object))
         return true;

      for (const key in object)
         return false;

      return true;
   },
   parseXML (xmlString)
   {
      const
         parser        = new DOMParser (),
         errorDoc      = parser .parseFromString ("INVALID", "application/xml"),
         parsererrorNS = errorDoc .getElementsByTagName ("parsererror") [0] .namespaceURI,
         xml           = parser .parseFromString (xmlString, 'application/xml');

      if (xml .getElementsByTagNameNS (parsererrorNS, "parsererror") .length > 0)
         throw new Error ("Invalid XML.");

      return xml;
   },
   decodeText (input)
   {
      if (typeof input === "string")
         return input;

      return new TextDecoder () .decode (input);
   },
   sleep (ms)
   {
      return new Promise (resolve => setTimeout (resolve, ms));
   },
   toLowerCaseFirst (string)
   {
      return string [0] .toLowerCase () + string .slice (1);
   },
   toUpperCaseFirst (string)
   {
      return string [0] .toUpperCase () + string .slice (1);
   },
   try (callback, logError = false)
   {
      try
      {
         return callback ();
      }
      catch (error)
      {
         if (logError)
            console .error (error);
      }
   },
   /**
    * Decompresses an ArrayBuffer or Blob and returns an ArrayBuffer.
    *
    * @param {ArrayBuffer | Blob} data
    * @returns ArrayBuffer
    */
   async gunzip (data)
   {
      const
         blob  = data instanceof Blob ? data : new Blob ([data]),
         magic = await blob .slice (0, 2) .arrayBuffer ();

      if (!$.isGzip (magic))
         return await blob .arrayBuffer ();

      try
      {
         const
            inputStream  = blob .stream (),
            outputStream = inputStream .pipeThrough (new DecompressionStream ("gzip"));

         return await new Response (outputStream) .arrayBuffer ();
      }
      catch
      {
         return await blob .arrayBuffer ();
      }
   },
   isGzip (arrayBuffer)
   {
      if (arrayBuffer .byteLength < 2)
         return false;

      const bytes = new Uint8Array (arrayBuffer);

      return bytes [0] === 0x1f && bytes [1] === 0x8b;
   },
});

// // decorator: @iffe fn (... args) { return function () { }; }
// function iife (target, key, descriptor)
// {
//    descriptor .value = descriptor .value ();
//
//    return descriptor;
// }
//
// class C {
//   @iffe fn (... args) { return function () { }; }
// }

export default $;
