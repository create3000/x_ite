import X3DFlyViewer from "./X3DFlyViewer.js";

function FlyViewer (executionContext, navigationInfo)
{
   X3DFlyViewer .call (this, executionContext, navigationInfo);
}

Object .assign (Object .setPrototypeOf (FlyViewer .prototype, X3DFlyViewer .prototype),
{
   addCollision ()
   {
      this .getBrowser () .addCollision (this);
   },
   removeCollision ()
   {
      this .getBrowser () .removeCollision (this);
   },
   getFlyDirection (fromVector, toVector, direction)
   {
      return direction .assign (toVector) .subtract (fromVector);
   },
   getTranslationOffset (velocity)
   {
      return this .getActiveViewpoint () .getUserOrientation () .multVecRot (velocity);
   },
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
