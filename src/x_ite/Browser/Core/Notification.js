import Fields       from "../../Fields.js";
import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

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

      this .element = (() =>
      {
         const element = document .createElement ("div");

         element .style .visibility = "hidden";

         element .append (document .createElement ("span"));
         element .classList .add ("x_ite-private-notification");

         this .getBrowser () .getSurface () .append (element);

         return element;
      })();

      this ._string .addInterest ("set_string__", this);
   },
   set_string__ ()
   {
      if (!this .getBrowser () .getBrowserOption ("Notifications"))
         return;

      if (this ._string .length === 0)
         return;

      clearTimeout (this .timeoutId);

      this .element .querySelector ("span") .textContent = this ._string .getValue ();

      Object .assign (this .element .style,
      {
         visibility: "visible",
         width: `${this .textWidth (this .element)}px`,
         transition: "width 300ms ease-in-out",
      });

      this .timeoutId = setTimeout (() =>
      {
         Object .assign (this .element .style,
         {
            visibility: "hidden",
            width: "0px",
            transition: "visibility 0s 300ms, width 300ms ease-in-out",
         });
      },
      5000);
   },
   textWidth (element)
   {
      const
         children = Array .from (element .children),
         span     = document .createElement ("span");

      span .textContent = element .textContent;

      element .replaceChildren (span);

      const width = span .clientWidth;

      element .replaceChildren (... children);

      return width;
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
