Object .assign ($,
{
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

// // @iffe fn (...args) { return function () { }; }
// function iife (target, key, { value: fn, configurable, enumerable })
// {
//    return {
//       configurable,
//       enumerable,
//       value: fn (),
//    };
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
