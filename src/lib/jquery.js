Object .assign ($,
{
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
   async gunzip (arrayBuffer)
   {
      try
      {
         const
            inputStream  = new Blob ([arrayBuffer]) .stream (),
            outputStream = inputStream .pipeThrough (new DecompressionStream ("gzip"));

         return await new Response (outputStream) .arrayBuffer ();
      }
      catch
      {
         return arrayBuffer;
      }
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
