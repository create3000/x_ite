import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

void (typeof jquery_mousewheel); // import plugin

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
      const element = this .getBrowser () .getSurface ();

      //element .on ("mousewheel.PointingDevice", this .mousewheel .bind (this));
      element .on ("mousedown.PointingDevice" + this .getId (), this .mousedown  .bind (this));
      element .on ("mouseup.PointingDevice"   + this .getId (), this .mouseup    .bind (this));
      element .on ("dblclick.PointingDevice"  + this .getId (), this .dblclick   .bind (this));
      element .on ("mousemove.PointingDevice" + this .getId (), this .mousemove  .bind (this));
      element .on ("mouseout.PointingDevice"  + this .getId (), this .onmouseout .bind (this));

      element .on ("touchstart.PointingDevice" + this .getId (), this .touchstart .bind (this));
      element .on ("touchend.PointingDevice"   + this .getId (), this .touchend   .bind (this));
   },
   mousewheel (event)
   { },
   mousedown (event)
   {
      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      browser .getElement () .focus ();

      if (browser .getShiftKey () && (browser .getControlKey () || browser .getCommandKey ()))
         return;

      if (event .button === 0)
      {
         const { x, y } = browser .getPointerFromEvent (event);

         element .off ("mousemove.PointingDevice" + this .getId ());

         $(document)
            .on ("mouseup.PointingDevice"   + this .getId (), this .mouseup   .bind (this))
            .on ("mousemove.PointingDevice" + this .getId (), this .mousemove .bind (this))
            .on ("touchend.PointingDevice"  + this .getId (), this .touchend  .bind (this))
            .on ("touchmove.PointingDevice" + this .getId (), this .touchmove .bind (this));

         if (browser .buttonPressEvent (x, y))
         {
            // Stop event propagation.

            event .preventDefault ();
            event .stopImmediatePropagation (); // Keeps the rest of the handlers from being executed

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

      // Stop event propagation.

      event .preventDefault ();

      // Handle button release.

      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      const { x, y } = browser .getPointerFromEvent (event);

      $(document) .off (".PointingDevice" + this .getId ());
      element .on ("mousemove.PointingDevice" + this .getId (), this .mousemove .bind (this));

      this .grabbing = false;

      browser .buttonReleaseEvent ();
      browser .setCursor (this .over ? "POINTER" : "DEFAULT");
      this .onverifymotion (x, y);
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
   mousemove (event)
   {
      // Stop event propagation.

      event .preventDefault ();

      // Motion.

      const browser = this .getBrowser ();

      const { x, y } = browser .getPointerFromEvent (event);

      this .onmotion (x, y, true);
   },
   touchstart (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // button 0.

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousedown (event);

            // Show context menu on long tab.

            const hit = this .getBrowser () .getHit ();

            if (hit .id === 0 || hit .sensors .size === 0)
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
      event .button = 0;

      this .mouseup (event);

      clearTimeout (this .touchTimeout);
   },
   touchmove (event)
   {
      const touches = event .originalEvent .touches;

      switch (touches .length)
      {
         case 1:
         {
            // button 0.

            event .button = 0;
            event .pageX  = touches [0] .pageX;
            event .pageY  = touches [0] .pageY;

            this .mousemove (event);

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
   onmouseout (event)
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
