import Fields         from "../../Fields.js";
import X3DBaseNode    from "../../Base/X3DBaseNode.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import OrthoViewpoint from "../../Components/Navigation/OrthoViewpoint.js";
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import Box3           from "../../../standard/Math/Geometry/Box3.js";
import ViewVolume     from "../../../standard/Math/Geometry/ViewVolume.js";

function X3DViewer (executionContext, navigationInfoNode)
{
   X3DBaseNode .call (this, executionContext);

   this .addChildObjects (X3DConstants .outputOnly, "isActive", new Fields .SFBool ());

   // Private properties

   this .navigationInfoNode = navigationInfoNode;
}

Object .assign (Object .setPrototypeOf (X3DViewer .prototype, X3DBaseNode .prototype),
{
   isActive ()
   {
      return this ._isActive .getValue ();
   },
   getActiveLayer ()
   {
      return this .getBrowser () .getActiveLayer ();
   },
   getViewport ()
   {
      return this .getBrowser () .getActiveLayer () .getViewport () .getRectangle ();
   },
   getNavigationInfo ()
   {
      return this .navigationInfoNode;
   },
   getActiveViewpoint ()
   {
      return this .getBrowser () .getActiveLayer () .getViewpoint ();
   },
   getStraightenHorizon ()
   {
      const browser = this .getBrowser ();

      return browser .getBrowserOption ("StraightenHorizon") || !! browser .getPose ();
   },
   getButton (button)
   {
      // If Alt key is pressed and button 0, then emulate button 1 (middle).
      if (button === 0)
      {
         if (this .getBrowser () .getAltKey ())
         {
            return 1;
         }
      }

      return button;
   },
   isPointerInRectangle: (() =>
   {
      const pointer = new Vector2 ();

      return function (x, y)
      {
         const
            browser   = this .getBrowser (),
            rectangle = this .getViewport ();

         return browser .isPointerInRectangle (rectangle, pointer .set (x, y));
      };
   })(),
   getPointOnCenterPlane: (() =>
   {
      const
         axis     = new Vector3 (0, 0, -1),
         distance = new Vector3 (),
         far      = new Vector3 ();

      return function (x, y, result)
      {
         const
            navigationInfoNode = this .getNavigationInfo (),
            viewpointNode      = this .getActiveViewpoint (),
            viewport           = this .getViewport (),
            nearValue          = viewpointNode .getNearDistance (navigationInfoNode),
            farValue           = viewpointNode .getFarDistance (navigationInfoNode),
            projectionMatrix   = viewpointNode .getProjectionMatrixWithLimits (nearValue, farValue, viewport);

         // Far plane point
         ViewVolume .unProjectPoint (x, y, 0.9, Matrix4 .Identity, projectionMatrix, viewport, far);

         if (viewpointNode instanceof OrthoViewpoint)
            return result .set (far .x, far .y, -this .getDistanceToCenter (distance) .norm ());

         const direction = far .normalize ();

         return result .assign (direction) .multiply (this .getDistanceToCenter (distance) .norm () / direction .dot (axis));
      };
   })(),
   getDistanceToCenter (distance, positionOffset)
   {
      const viewpointNode = this .getActiveViewpoint ();

      return (distance
         .assign (viewpointNode .getPosition ())
         .add (positionOffset || viewpointNode ._positionOffset .getValue ())
         .subtract (viewpointNode .getUserCenterOfRotation ()));
   },
   trackballProjectToSphere (x, y, vector)
   {
      const viewport = this .getViewport ();

      x = (x - viewport [0]) / viewport [2] - 0.5;
      y = (y - viewport [1]) / viewport [3] - 0.5;

      return vector .set (x, y, tbProjectToSphere (0.5, x, y));
   },
   lookAtPoint (x, y, straightenHorizon)
   {
      if (!this .touch (x, y))
         return;

      const
         viewpointNode = this .getActiveViewpoint (),
         hit           = this .getBrowser () .getHit ();

      viewpointNode .lookAtPoint (this .getActiveLayer (), hit .point, 1, 2 - 1.618034, straightenHorizon);
   },
   lookAtBBox (x, y, straightenHorizon)
   {
      if (!this .touch (x, y))
         return;

      const
         viewpointNode = this .getActiveViewpoint (),
         hit           = this .getBrowser () .getHit ();

      const bbox = hit .shapeNode .getBBox (new Box3 ())
         .multRight (hit .modelViewMatrix)
         .multRight (viewpointNode .getCameraSpaceMatrix ());

      viewpointNode .lookAtBBox (this .getActiveLayer (), bbox, 1, 2 - 1.618034, straightenHorizon);
   },
   touch (x, y)
   {
      return this .getBrowser () .touch (x, y);
   },
   disconnect ()
   { },
});

function tbProjectToSphere (r, x, y)
{
   const d = Math .hypot (x, y);

   if (d < r * Math .SQRT1_2) // Inside sphere
   {
      return Math .sqrt (r * r - d * d);
   }

   // On hyperbola

   const t = r / Math .SQRT2;

   return t * t / d;
}

export default X3DViewer;
