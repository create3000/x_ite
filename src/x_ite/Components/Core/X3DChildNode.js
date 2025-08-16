import Fields       from "../../Fields.js";
import X3DNode      from "./X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import TraverseType from "../../Rendering/TraverseType.js";

function X3DChildNode (executionContext)
{
   if (this .getExecutionContext ())
      return;

   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DChildNode);

   this .addChildObjects (X3DConstants .outputOnly, "isBoundedObject",   new Fields .SFBool (),
                          X3DConstants .outputOnly, "isPointingObject",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "isCameraObject",    new Fields .SFBool (),
                          X3DConstants .outputOnly, "isPickableObject",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "isCollisionObject", new Fields .SFBool (),
                          X3DConstants .outputOnly, "isShadowObject",    new Fields .SFBool (),
                          X3DConstants .outputOnly, "isVisibleObject",   new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (X3DChildNode .prototype, X3DNode .prototype),
{
   setBoundedObject (value)
   {
      if (!!value !== this ._isBoundedObject .getValue ())
         this ._isBoundedObject = value;
   },
   isBoundedObject ()
   {
      return this ._isBoundedObject .getValue ();
   },
   setPointingObject (value)
   {
      if (!!value !== this ._isPointingObject .getValue ())
         this ._isPointingObject = value;
   },
   isPointingObject ()
   {
      return this ._isPointingObject .getValue ();
   },
   setCameraObject (value)
   {
      if (!!value !== this ._isCameraObject .getValue ())
         this ._isCameraObject = value;
   },
   isCameraObject ()
   {
      return this ._isCameraObject .getValue ();
   },
   setPickableObject (value)
   {
      if (!!value !== this ._isPickableObject .getValue ())
         this ._isPickableObject = value;
   },
   isPickableObject ()
   {
      return this ._isPickableObject .getValue ();
   },
   setShadowObject (value)
   {
      if (!!value !== this ._isShadowObject .getValue ())
         this ._isShadowObject = value;
   },
   isShadowObject ()
   {
      return this ._isShadowObject .getValue ();
   },
   setCollisionObject (value)
   {
      if (!!value !== this ._isCollisionObject .getValue ())
         this ._isCollisionObject = value;
   },
   isCollisionObject ()
   {
      return this ._isCollisionObject .getValue ();
   },
   setVisibleObject (value)
   {
      if (!!value !== this ._isVisibleObject .getValue ())
         this ._isVisibleObject = value;
   },
   isVisibleObject ()
   {
      return this ._isVisibleObject .getValue ();
   },
   isVisible ()
   {
      // This function will be overloaded by X3DBoundedObject.
      return true;
   },
   connectChildNode (childNode, excludes)
   {
      if (!excludes ?.includes (TraverseType .BBOX))
      {
         childNode ._isBoundedObject .addFieldInterest (this ._isBoundedObject);
         this .setBoundedObject (childNode .isBoundedObject ());
      }

      if (!excludes ?.includes (TraverseType .POINTER))
      {
         childNode ._isPointingObject .addFieldInterest (this ._isPointingObject);
         this .setPointingObject (childNode .isPointingObject ());
      }

      if (!excludes ?.includes (TraverseType .CAMERA))
      {
         childNode ._isCameraObject .addFieldInterest (this ._isCameraObject);
         this .setCameraObject (childNode .isCameraObject ());
      }

      if (!excludes ?.includes (TraverseType .PICKING))
      {
         childNode ._isPickableObject .addFieldInterest (this ._isPickableObject);
         this .setPickableObject (childNode .isPickableObject ());
      }

      if (!excludes ?.includes (TraverseType .COLLISION))
      {
         childNode ._isCollisionObject .addFieldInterest (this ._isCollisionObject);
         this .setCollisionObject (childNode .isCollisionObject ());
      }

      if (!excludes ?.includes (TraverseType .SHADOW))
      {
         childNode ._isShadowObject .addFieldInterest (this ._isShadowObject);
         this .setShadowObject (childNode .isShadowObject ());
      }

      if (!excludes ?.includes (TraverseType .DISPLAY))
      {
         childNode ._isVisibleObject .addFieldInterest (this ._isVisibleObject);
         this .setVisibleObject (childNode .isVisibleObject ());
      }
   },
   disconnectChildNode (childNode)
   {
      childNode ._isBoundedObject   .removeFieldInterest (this ._isBoundedObject);
      childNode ._isPointingObject  .removeFieldInterest (this ._isPointingObject);
      childNode ._isCameraObject    .removeFieldInterest (this ._isCameraObject);
      childNode ._isPickableObject  .removeFieldInterest (this ._isPickableObject);
      childNode ._isCollisionObject .removeFieldInterest (this ._isCollisionObject);
      childNode ._isShadowObject    .removeFieldInterest (this ._isShadowObject);
      childNode ._isVisibleObject   .removeFieldInterest (this ._isVisibleObject);
   },
   getShapes (shapes, modelMatrix)
   {
      return shapes;
   },
});

Object .defineProperties (X3DChildNode, X3DNode .getStaticProperties ("X3DChildNode", "Core", 1));

export default X3DChildNode;
