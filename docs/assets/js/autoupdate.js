// $ .fn .isInViewport = function ()
// {
//    const
//       elementTop     = $(this) .offset () .top,
//       elementBottom  = elementTop + $(this) .outerHeight (),
//       viewportTop    = $(window) .scrollTop (),
//       viewportBottom = viewportTop + $(window) .height ();

//    return elementBottom > viewportTop && elementTop < viewportBottom;
// };

// $(window) .on ("resize scroll load", () =>
// {
//    for (const element of $("x3d-canvas"))
//    {
//       if ($(element) .isInViewport ())
//       {
//          element .browser .beginUpdate ();
//       }
//       else
//       {
//          element .browser .endUpdate ();
//       }
//    }
// });
