import Fields       from "../../Fields.js";
import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

$.fn.textWidth = function (string)
{
   const
      self     = $(this),
      children = self .children (),
      html     = self .html (),
      span     = $("<span></span>") .html (html);

   self .html (span);
   const width = span .width ();
   self .empty () .append (children);
   return width;
};

function Notification (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .inputOutput, "string", new Fields .SFString ());
}

Object .assign (Object .setPrototypeOf (Notification .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .element = $("<div></div>")
         .css ("visibility", "hidden")
         .addClass ("x_ite-private-notification")
         .appendTo (this .getBrowser () .getSurface ())
         .css ("width", 0);

      $("<span></span>") .appendTo (this .element);

      this ._string .addInterest ("set_string__", this);
   },
   set_string__ ()
   {
      if (! this .getBrowser () .getBrowserOption ("Notifications"))
         return;

      if (this ._string .length === 0)
         return;

      clearTimeout (this .timeoutId);

      this .element .children () .text (this ._string .getValue ());

      this .element .css ({
         visibility: "visible",
         width: this .element .textWidth (),
         transition: "width 300ms ease-in-out",
      });

      this .timeoutId = setTimeout (() =>
      {
         this .element .css ({
            visibility: "hidden",
            width: 0,
            transition: "visibility 0s 300ms, width 300ms ease-in-out",
         });
      },
      5000);
   },
});

Object .defineProperties (Notification,
{
   typeName:
   {
      value: "Notification",
      enumerable: true,
   },
});

export default Notification;
