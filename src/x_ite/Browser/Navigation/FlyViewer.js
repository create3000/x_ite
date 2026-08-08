import X3DFlyViewer from "./X3DFlyViewer.js";
import Rotation4    from "../../../standard/Math/Numbers/Rotation4.js";

function FlyViewer (executionContext, navigationInfo)
{
   X3DFlyViewer .call (this, executionContext, navigationInfo);
}

Object .assign (Object .setPrototypeOf (FlyViewer .prototype, X3DFlyViewer .prototype),
{
   isCollidable ()
   {
      return this .isActive ();
   },
   getFlyDirection (fromVector, toVector, direction)
   {
      return direction .assign (toVector) .subtract (fromVector);
   },
   getTranslationOffset: (() =>
   {
      const userOrientation = new Rotation4 ();

      return function (velocity)
      {
         return this .getActiveViewpoint () .getUserOrientation (userOrientation) .multVecRot (velocity);
      };
   })(),
   constrainPanDirection (direction)
   {
      return direction;
   },
});

Object .defineProperties (FlyViewer,
{
   typeName:
   {
      value: "FlyViewer",
      enumerable: true,
   },
});

export default FlyViewer;
