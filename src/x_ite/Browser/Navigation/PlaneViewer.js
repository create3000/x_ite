import X3DViewer from "./X3DViewer.js";
import Vector2   from "../../../standard/Math/Numbers/Vector2.js";
import Vector3   from "../../../standard/Math/Numbers/Vector3.js";
import $         from "../../../lib/helper.js";


const
   MAC_OS        = /Mac OS X/i .test (navigator .userAgent),
   SCROLL_FACTOR = MAC_OS ? 1 / 160 : 1 / 20;

const
   vector                 = new Vector3 (),
   positionOffset         = new Vector3 (),
   centerOfRotationOffset = new Vector3 ();

function PlaneViewer (executionContext, navigationInfo)
{
   X3DViewer .call (this, executionContext, navigationInfo);

   this .button    = -1;
   this .fromPoint = new Vector3 ();
   this .toPoint   = new Vector3 ();
   this .touchMode = 0;
   this .touch1    = new Vector2 ();
   this .touch2    = new Vector2 ();
}

Object .assign (Object .setPrototypeOf (PlaneViewer .prototype, X3DViewer .prototype),
{
   initialize ()
   {
      X3DViewer .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         surface = browser .getSurface ();

      $.on (this, surface, "mousedown", event => this .mousedown (event));
      $.on (this, surface, "mouseup",   event => this .mouseup   (event));
      $.on (this, surface, "wheel",     event => this .wheel     (event));

      $.on (this, surface, "touchstart", event => this .touchstart (event));
      $.on (this, surface, "touchend",   event => this .touchend   (event));
   },
   mousedown (event)
   {
      if (this .button >= 0)
         return;

      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      switch (this .getButton (event .button))
      {
         case 0:
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start move.

            this .button = event .button;

            $.on (this, document, "mouseup",   event => this .mouseup   (event));
            $.on (this, document, "mousemove", event => this .mousemove (event));
            $.on (this, document, "touchend",  event => this .touchend  (event));
            $.on (this, document, "touchmove", event => this .touchmove (event));

            this .getActiveViewpoint () .transitionStop ();
            this .getBrowser () .setCursor ("MOVE");

            this .getPointOnCenterPlane (x, y, this .fromPoint);

            this ._isActive = true;
            break;
         }
      }
   },
   mouseup (event)
   {
      if (event .button !== this .button)
         return;

      // Stop event propagation.

      event .preventDefault ();

      // Disable all.

      this .button = -1;

      $.off (this, document);
      $.on (this, this .getBrowser () .getSurface (), "mousemove", event => this .mousemove (event));

      this .getBrowser () .setCursor ("DEFAULT");

      this ._isActive = false;
   },
   mousemove (event)
   {
      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      switch (this .getButton (this .button))
      {
         case 0:
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Move.

            const
               viewpoint   = this .getActiveViewpoint (),
               toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
               translation = viewpoint .getUserOrientation () .multVecRot (this .fromPoint .subtract (toPoint));

            viewpoint ._positionOffset         = positionOffset         .assign (viewpoint ._positionOffset         .getValue ()) .add (translation);
            viewpoint ._centerOfRotationOffset = centerOfRotationOffset .assign (viewpoint ._centerOfRotationOffset .getValue ()) .add (translation);

            this .fromPoint .assign (toPoint);
            break;
         }
      }
   },
   wheel (event)
   {
      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      if (!this .isPointerInRectangle (x, y))
         return;

      // Stop event propagation.

      event .preventDefault ();

      // Change viewpoint position.

      const
         viewpoint = this .getActiveViewpoint (),
         fromPoint = this .getPointOnCenterPlane (x, y, this .fromPoint);

      viewpoint .transitionStop ();

      const
         fieldOfViewScale = viewpoint ._fieldOfViewScale .getValue (),
         zoomFactor       = event .zoomFactor || SCROLL_FACTOR;

      if (event .deltaY < 0) // Move backwards.
      {
         viewpoint ._fieldOfViewScale = Math .max (0.00001, fieldOfViewScale * (1 - zoomFactor));
      }
      else if (event .deltaY > 0) // Move forwards.
      {
         viewpoint ._fieldOfViewScale = fieldOfViewScale * (1 + zoomFactor);

         this .constrainFieldOfViewScale ();
      }

      const
         toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
         translation = viewpoint .getUserOrientation () .multVecRot (vector .assign (fromPoint) .subtract (toPoint));

      viewpoint ._positionOffset         = positionOffset         .assign (viewpoint ._positionOffset         .getValue ()) .add (translation);
      viewpoint ._centerOfRotationOffset = centerOfRotationOffset .assign (viewpoint ._centerOfRotationOffset .getValue ()) .add (translation);
   },
   touchstart (event)
   {
      event = this .getBrowser () .copyEvent (event);

      const touches = event .touches;

      switch (touches .length)
      {
         case 2:
         {
            // Start move (button 1).

            event .button = 0;
            event .pageX  = (touches [0] .pageX + touches [1] .pageX) / 2;
            event .pageY  = (touches [0] .pageY + touches [1] .pageY) / 2;

            this .mousedown (event);

            // Start zoom (mouse wheel).

            this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
            this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
            break;
         }
      }
   },
   touchend (event)
   {
      event = this .getBrowser () .copyEvent (event);

      switch (this .button)
      {
         case 0:
         {
            // End move (button 1).

            this .touchMode = 0;
            event .button   = 0;

            this .mouseup (event);
            break;
         }
      }
   },
   touchmove: (() =>
   {
      const
         MOVE_ANGLE   = 0.7,
         ZOOM_ANGLE   = -0.7,
         touch1Change = new Vector2 (),
         touch2Change = new Vector2 ();

      return function (event)
      {
         event = this .getBrowser () .copyEvent (event);

         const touches = event .touches;

         switch (touches .length)
         {
            case 2:
            {
               touch1Change .set (touches [0] .pageX, touches [0] .pageY) .subtract (this .touch1) .normalize ();
               touch2Change .set (touches [1] .pageX, touches [1] .pageY) .subtract (this .touch2) .normalize ();

               const
                  move = touch1Change .dot (touch2Change) > MOVE_ANGLE,
                  zoom = touch1Change .dot (touch2Change) < ZOOM_ANGLE,
                  mode = this .touchMode || (move ? 1 : (zoom ? 2 : 0));

               switch (mode)
               {
                  case 1:
                  {
                     // Move (button 1).

                     this .touchMode = 1;

                     event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
                     event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;

                     this .mousemove (event);
                     break;
                  }
                  case 2:
                  {
                     // Zoom (mouse wheel).

                     this .touchMode = 2;

                     const distance1 = this .touch1 .distance (this .touch2);

                     this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
                     this .touch2 .set (touches [1] .pageX, touches [1] .pageY);

                     const
                        distance2 = this .touch1 .distance (this .touch2),
                        delta     = distance1 - distance2;

                     event .deltaY     = delta;
                     event .zoomFactor = Math .abs (delta) / window .innerWidth;

                     event .pageX = (touches [0] .pageX + touches [1] .pageX) / 2;
                     event .pageY = (touches [0] .pageY + touches [1] .pageY) / 2;

                     this .wheel (event);
                     break;
                  }
               }

               this .touch1 .set (touches [0] .pageX, touches [0] .pageY);
               this .touch2 .set (touches [1] .pageX, touches [1] .pageY);
               break;
            }
         }
      };
   })(),
   constrainFieldOfViewScale ()
   {
      const viewpoint = this .getActiveViewpoint ();

      if (viewpoint .getTypeName () .match (/^(?:Viewpoint|GeoViewpoint)$/))
      {
         if (viewpoint ._fieldOfView .getValue () * viewpoint ._fieldOfViewScale .getValue () >= Math .PI)
            viewpoint ._fieldOfViewScale = (Math .PI - 0.001) / viewpoint ._fieldOfView .getValue ();
      }
   },
   dispose ()
   {
      $.off (this, this .getBrowser () .getSurface ());
      $.off (this, document);
   },
});

Object .defineProperties (PlaneViewer,
{
   typeName:
   {
      value: "PlaneViewer",
      enumerable: true,
   },
});

export default PlaneViewer;
