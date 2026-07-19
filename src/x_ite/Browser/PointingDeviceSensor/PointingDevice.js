import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

const CONTEXT_MENU_TIME = 1200;

function PointingDevice (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .over     = false;
   this .grabbing = false;
}

Object .assign (Object .setPrototypeOf (PointingDevice .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      const surface = this .getBrowser () .getSurface ();

      $.on (this, surface, "mousedown", event => this .mousedown  (event));
      $.on (this, surface, "mouseup",   event => this .mouseup    (event));
      $.on (this, surface, "dblclick",  event => this .dblclick   (event));
      $.on (this, surface, "mousemove", event => this .mousemove  (event));
      $.on (this, surface, "mouseout",  event => this .onmouseout (event));

      $.on (this, surface, "touchstart", event => this .touchstart (event));
      $.on (this, surface, "touchend",   event => this .touchend   (event));
   },
   mousedown (event, touch)
   {
      if (!touch && this .touch)
         return;

      const
         browser = this .getBrowser (),
         surface = browser .getSurface ();

      browser .getElement () .focus ();

      if (browser .getShiftKey () && (browser .getControlKey () || browser .getCommandKey ()))
         return;

      if (event .button === 0)
      {
         $.off (this, surface, "mousemove");
         $.on (this, document, "mouseup",   event => this .mouseup   (event));
         $.on (this, document, "mousemove", event => this .mousemove (event));

         $.on (this, document, "touchend" , event => this .touchend  (event));
         $.on (this, document, "touchmove", event => this .touchmove (event));

         const { x, y } = browser .getPointerFromEvent (event);

         if (browser .buttonPressEvent (x, y))
         {
            // Stop event propagation.

            event .preventDefault ();
            event .stopImmediatePropagation ();

            this .grabbing = Array .from (browser .getHit () .sensors .keys ())
               .some (node => node .getType () .includes (X3DConstants .X3DDragSensorNode));

            browser .setCursor ("POINTER");

            this .onverifymotion (x, y);
         }
      }
   },
   mouseup (event)
   {
      if (event .button !== 0)
         return;

      // Handle button release.

      const
         browser = this .getBrowser (),
         surface = browser .getSurface ();

      const { x, y } = browser .getPointerFromEvent (event);

      $.off (this, document);
      $.on (this, surface, "mousemove", event => this .mousemove (event));

      this .grabbing = false;

      browser .buttonReleaseEvent ();
      browser .setCursor (this .over ? "POINTER" : "DEFAULT");
      this .onverifymotion (x, y);

      if (!this .over)
         return;

      // Stop event propagation.

      event .preventDefault ();
   },
   dblclick (event)
   {
      const browser = this .getBrowser ();

      if (browser .getShiftKey () && (browser .getControlKey () || browser .getCommandKey ()))
         return;

      if (!this .over)
         return;

      // Stop event propagation.

      event .preventDefault ();
      event .stopImmediatePropagation ();
   },
   mousemove (event, touch)
   {
      if (!touch && this .touch)
         return;

      // Motion.

      const browser = this .getBrowser ();

      const { x, y } = browser .getPointerFromEvent (event);

      this .onmotion (x, y, true);

      if (!this .over)
         return;

      // Stop event propagation.

      event .preventDefault ();
   },
   touchstart (event)
   {
      const touches = event .touches;

      switch (touches .length)
      {
         case 1:
         {
            this .touch = true;

            // button 0.

            event = this .getBrowser () .copyEvent (event);

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousedown (event, true);

            // Show context menu on long tab.

            const hit = this .getBrowser () .getHit ();

            if (!hit .id || !hit .sensors .size)
            {
               this .touchX       = event .pageX;
               this .touchY       = event .pageY;
               this .touchTimeout = setTimeout (() => this .showContextMenu (event), CONTEXT_MENU_TIME);
            }
            break;
         }
         case 2:
         {
            this .touchend (event);
            break;
         }
      }
   },
   touchend (event)
   {
      this .touch = false;

      event = this .getBrowser () .copyEvent (event);

      event .button = 0;

      this .mouseup (event, true);

      clearTimeout (this .touchTimeout);
   },
   touchmove (event)
   {
      const touches = event .touches;

      switch (touches .length)
      {
         case 1:
         {
            // button 0.
            event = this .getBrowser () .copyEvent (event);

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousemove (event, true);

            if (Math .hypot (this .touchX - event .pageX, this .touchY - event .pageY) > 7)
               clearTimeout (this .touchTimeout);

            break;
         }
      }
   },
   onmotion (x, y, move = false)
   {
      const browser = this .getBrowser ();

      this .over = browser .motionNotifyEvent (x, y);

      if (browser .getViewer () .isActive ())
         return;

      if (this .over)
         browser .setCursor (this .grabbing && move ? "GRABBING" : "POINTER");
      else
         browser .setCursor (this .grabbing && move ? "GRABBING" : "DEFAULT");
   },
   onmouseout ()
   {
      this .getBrowser () .leaveNotifyEvent ();
   },
   async onverifymotion (x, y)
   {
      // Verify isOver state. This is necessary if an Switch changes on buttonReleaseEvent
      // and the new child has a sensor node inside. This sensor node must be updated to
      // reflect the correct isOver state.

      await this .getBrowser () .nextFrame ();

      this .onmotion (x, y);
   },
   showContextMenu (event)
   {
      this .getBrowser () .getContextMenu () .show (event);
   },
});

Object .defineProperties (PointingDevice,
{
   typeName:
   {
      value: "PointingDevice",
      enumerable: true,
   },
});

export default PointingDevice;
