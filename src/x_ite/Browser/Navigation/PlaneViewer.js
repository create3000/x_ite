import X3DViewer from "./X3DViewer.js";
import Vector3   from "../../../standard/Math/Numbers/Vector3.js";

typeof jquery_mousewheel; // import plugin

const macOS = /Mac OS X/i .test (navigator .userAgent)

const SCROLL_FACTOR = macOS ? 1 / 160 : 1 / 20;

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
}

Object .assign (Object .setPrototypeOf (PlaneViewer .prototype, X3DViewer .prototype),
{
   initialize ()
   {
      X3DViewer .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         element = browser .getSurface ();

      element .on ("mousedown.PlaneViewer",  this .mousedown  .bind (this));
      element .on ("mouseup.PlaneViewer",    this .mouseup    .bind (this));
      element .on ("mousemove.PlaneViewer",  this .mousemove  .bind (this));
      element .on ("mousewheel.PlaneViewer", this .mousewheel .bind (this));
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
         case 1:
         {
            // Stop event propagation.

            event .preventDefault ();

            // Start move.

            this .button = event .button;

            this .getBrowser () .getSurface () .off ("mousemove.PlaneViewer");
            $(document) .on ("mouseup.PlaneViewer"   + this .getId (), this .mouseup .bind (this));
            $(document) .on ("mousemove.PlaneViewer" + this .getId (), this .mousemove .bind (this));

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

      $(document) .off (".PlaneViewer" + this .getId ());
      this .getBrowser () .getSurface () .on ("mousemove.PlaneViewer", this .mousemove .bind (this));

      this .getBrowser () .setCursor ("DEFAULT");

      this ._isActive = false;
   },
   mousemove (event)
   {
      const { x, y } = this .getBrowser () .getPointerFromEvent (event);

      switch (this .getButton (this .button))
      {
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
   mousewheel (event)
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

      if (event .deltaY > 0) // Move backwards.
      {
         viewpoint ._fieldOfViewScale = Math .max (0.00001, viewpoint ._fieldOfViewScale .getValue () * (1 - SCROLL_FACTOR));
      }
      else if (event .deltaY < 0) // Move forwards.
      {
         viewpoint ._fieldOfViewScale = viewpoint ._fieldOfViewScale .getValue () * (1 + SCROLL_FACTOR);

         this .constrainFieldOfViewScale ();
      }

      const
         toPoint     = this .getPointOnCenterPlane (x, y, this .toPoint),
         translation = viewpoint .getUserOrientation () .multVecRot (vector .assign (fromPoint) .subtract (toPoint));

      viewpoint ._positionOffset         = positionOffset         .assign (viewpoint ._positionOffset         .getValue ()) .add (translation);
      viewpoint ._centerOfRotationOffset = centerOfRotationOffset .assign (viewpoint ._centerOfRotationOffset .getValue ()) .add (translation);
   },
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
      this .getBrowser () .getSurface () .off (".PlaneViewer");
      $(document) .off (".PlaneViewer" + this .getId ());
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
