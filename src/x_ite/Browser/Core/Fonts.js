import URLs from "../Networking/URLs.js";

function add (path, bold, italic)
{
   try
   {
      // In case of people embed the CSS file in a HTML page, we need to check if the
      // font is already loaded. If so, we should not add it again.

      document .fonts .add (new FontFace ("X_ITE PT Sans", `url(${URLs .getFontsURL (path)})`,
      {
         style: italic ? "italic" : "normal",
         weight: bold ? "700" : "400",
      }));
   }
   catch (error)
   {
      console .error (error);
   }
}

add ("PT_Sans/PTSans-Regular.woff2",    false, false);
add ("PT_Sans/PTSans-Bold.woff2",       true,  false);
add ("PT_Sans/PTSans-Italic.woff2",     false, true);
// add ("PT_Sans/PTSans-BoldItalic.woff2", true,  true);
