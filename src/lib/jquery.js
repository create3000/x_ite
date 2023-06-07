$.decodeText = function (input)
{
   if (typeof input === "string")
      return input;

   return new TextDecoder () .decode (input);
};

$.ungzip = function (arrayBuffer)
{
   try
   {
      return pako .ungzip (arrayBuffer, { to: "raw" }) .buffer;
   }
   catch (exception)
   {
      return arrayBuffer;
   }
};

$.toLowerCaseFirst = function (string)
{
   return string [0] .toLowerCase () + string .slice (1);
};

$.try = callback => { try { return callback () } catch (error) { } };

$.enum = function (object, property, defaultValue)
{
   return object .hasOwnProperty (property) ? object [property] : defaultValue;
};

$.fn.isInViewport = function ()
{
   const
      $this          = $(this),
      $window        = $(window),
      elementTop     = $this .offset () .top,
      elementBottom  = elementTop + $this .outerHeight (),
      viewportTop    = $window .scrollTop (),
      viewportBottom = viewportTop + $window .height ();

   return elementBottom > viewportTop && elementTop < viewportBottom;
};

export default $;
