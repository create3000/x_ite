import X3DFlyViewer from "./X3DFlyViewer.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4    from "../../../standard/Math/Numbers/Rotation4.js";

function WalkViewer (executionContext, navigationInfo)
{
   X3DFlyViewer .call (this, executionContext, navigationInfo);
}

Object .assign (Object .setPrototypeOf (WalkViewer .prototype, X3DFlyViewer .prototype),
{
   initialize ()
   {
      X3DFlyViewer .prototype .initialize .call (this);

      this .getBrowser () .addCollision (this);
   },
   getStraightenHorizon ()
   {
      return true;
   },
   getFlyDirection (fromVector, toVector, direction)
   {
      return direction .assign (toVector) .subtract (fromVector);
   },
   getTranslationOffset: (() =>
   {
      const
         localYAxis      = new Vector3 (),
         userOrientation = new Rotation4 (),
         rotation        = new Rotation4 ();

      return function (velocity)
      {
         const
            viewpoint = this .getActiveViewpoint (),
            upVector  = viewpoint .getUpVector ();

         userOrientation .assign (viewpoint .getUserOrientation ());
         userOrientation .multVecRot (localYAxis .assign (Vector3 .yAxis));
         rotation        .setFromToVec (localYAxis, upVector);

         const orientation = userOrientation .multRight (rotation);

         return orientation .multVecRot (velocity);
      };
   })(),
   constrainPanDirection (direction)
   {
      if (direction .y < 0)
         direction .y = 0;

      return direction;
   },
   dispose ()
   {
      this .getBrowser () .removeCollision (this);

      X3DFlyViewer .prototype .dispose .call (this);
   },
});

Object .defineProperties (WalkViewer,
{
   typeName:
   {
      value: "WalkViewer",
      enumerable: true,
   },
});

export default WalkViewer;
