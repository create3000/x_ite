Object .assign ($,
{
   decodeText (input)
   {
      if (typeof input === "string")
         return input;

      return new TextDecoder () .decode (input);
   },
   enum (object, property)
   {
      if (object .hasOwnProperty (property))
         return object [property];
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

Object .assign ($.fn,
{
   isInViewport ()
   {
      const
         $this          = $(this),
         $window        = $(window),
         elementTop     = $this .offset () .top,
         elementBottom  = elementTop + $this .outerHeight (),
         viewportTop    = Math .max ($window .scrollTop (), 0),
         viewportBottom = viewportTop + $window .height ();

      return elementBottom > viewportTop && elementTop < viewportBottom;
   },
});

export default $;
