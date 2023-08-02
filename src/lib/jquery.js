Object .assign ($,
{
   removeBOM (input)
   {
      if (input .startsWith ("ï»¿"))
         return input .substring (3);

      return input;
   },
   decodeText (input)
   {
      if (typeof input === "string")
         return input;

      return new TextDecoder () .decode (input);
   },
   ungzip (arrayBuffer)
   {
      try
      {
         return pako .ungzip (arrayBuffer, { to: "raw" }) .buffer;
      }
      catch (exception)
      {
         return arrayBuffer;
      }
   },
   toLowerCaseFirst (string)
   {
      return string [0] .toLowerCase () + string .slice (1);
   },
   try (callback)
   {
      try { return callback () } catch { }
   },
   enum (object, property, defaultValue)
   {
      return object .hasOwnProperty (property) ? object [property] : defaultValue;
   },
});

// // decorator: @iffe fn (... args) { return function () { }; }
// function iife (target, key, descriptor)
// {
//    descriptor .value = descriptor .value ();

//    return descriptor;
// }

Object .assign ($.fn,
{
   isInViewport ()
   {
      const
         $this          = $(this),
         $window        = $(window),
         elementTop     = $this .offset () .top,
         elementBottom  = elementTop + $this .outerHeight (),
         viewportTop    = $window .scrollTop (),
         viewportBottom = viewportTop + $window .height ();

      return elementBottom > viewportTop && elementTop < viewportBottom;
   },
});

export default $;
