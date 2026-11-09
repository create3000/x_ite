import Fields       from "../../Fields.js";
import X3DNode      from "./X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import TraverseType from "../../Rendering/TraverseType.js";

const _flagKey = Symbol ();

let i = 0;

const
   BOUNDED_INDEX   = i ++,
   POINTING_INDEX  = i ++,
   CAMERA_INDEX    = i ++,
   PICKABLE_INDEX  = i ++,
   COLLISION_INDEX = i ++,
   SHADOW_INDEX    = i ++,
   VISIBLE_INDEX   = i ++;

function X3DChildNode (executionContext)
{
   if (this .getExecutionContext ())
      return;

   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DChildNode);

   this .addChildObjects (X3DConstants .outputOnly, "childFlags", new Fields .SFInt32 ());
}

Object .assign (Object .setPrototypeOf (X3DChildNode .prototype, X3DNode .prototype),
{
   getChildFlag (index)
   {
      return !! (this ._childFlags .getValue () & (1 << index));
   },
   setChildFlag (index, value)
   {
      let flags = this ._childFlags .getValue ();

      if (value)
         flags |= 1 << index;
      else
         flags &= ~(1 << index);

      if (flags !== this ._childFlags .getValue ())
         this ._childFlags = flags;
   },
   setBoundedObject (value)
   {
      this .setChildFlag (BOUNDED_INDEX, value);
   },
   isBoundedObject ()
   {
      return this .getChildFlag (BOUNDED_INDEX);
   },
   setPointingObject (value)
   {
      this .setChildFlag (POINTING_INDEX, value);
   },
   isPointingObject ()
   {
      return this .getChildFlag (POINTING_INDEX);
   },
   setCameraObject (value)
   {
      this .setChildFlag (CAMERA_INDEX, value);
   },
   isCameraObject ()
   {
      return this .getChildFlag (CAMERA_INDEX);
   },
   setPickableObject (value)
   {
      this .setChildFlag (PICKABLE_INDEX, value);
   },
   isPickableObject ()
   {
      return this .getChildFlag (PICKABLE_INDEX);
   },
   setShadowObject (value)
   {
      this .setChildFlag (SHADOW_INDEX, value);
   },
   isShadowObject ()
   {
      return this .getChildFlag (SHADOW_INDEX);
   },
   setCollisionObject (value)
   {
      this .setChildFlag (COLLISION_INDEX, value);
   },
   isCollisionObject ()
   {
      return this .getChildFlag (COLLISION_INDEX);
   },
   setVisibleObject (value)
   {
      this .setChildFlag (VISIBLE_INDEX, value);
   },
   isVisibleObject ()
   {
      return this .getChildFlag (VISIBLE_INDEX);
   },
   isVisible ()
   {
      // This function will be overloaded by X3DBoundedObject.
      return true;
   },
   connectChildNode (childNode, excludes)
   {
      childNode ._childFlags .addFieldCallback (_flagKey, flags =>
      {
         if (!excludes ?.includes (TraverseType .BBOX))
            this .setBoundedObject (flags & (1 << BOUNDED_INDEX));

         if (!excludes ?.includes (TraverseType .POINTER))
            this .setPointingObject (flags & (1 << POINTING_INDEX));

         if (!excludes ?.includes (TraverseType .CAMERA))
            this .setCameraObject (flags & (1 << CAMERA_INDEX));

         if (!excludes ?.includes (TraverseType .PICKING))
            this .setPickableObject (flags & (1 << PICKABLE_INDEX));

         if (!excludes ?.includes (TraverseType .COLLISION))
            this .setCollisionObject (flags & (1 << COLLISION_INDEX));

         if (!excludes ?.includes (TraverseType .SHADOW))
            this .setShadowObject (flags & (1 << SHADOW_INDEX));

         if (!excludes ?.includes (TraverseType .DISPLAY))
            this .setVisibleObject (flags & (1 << VISIBLE_INDEX));
      });
   },
   disconnectChildNode (childNode)
   {
      childNode ._childFlags .removeFieldCallback (_flagKey);
   },
   getShapes (shapes, modelMatrix)
   {
      return shapes;
   },
});

Object .defineProperties (X3DChildNode, X3DNode .getStaticProperties ("X3DChildNode", "Core", 1));

export default X3DChildNode;
