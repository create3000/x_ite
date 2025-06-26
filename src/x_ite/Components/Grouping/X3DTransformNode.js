import X3DNode                  from "../Core/X3DNode.js";
import X3DTransformMatrix3DNode from "./X3DTransformMatrix3DNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function X3DTransformNode (executionContext)
{
   X3DTransformMatrix3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTransformNode);

   // Units

   this ._translation .setUnit ("length");
   this ._center      .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (X3DTransformNode .prototype, X3DTransformMatrix3DNode .prototype),
{
   initialize ()
   {
      X3DTransformMatrix3DNode .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed ()
   {
      this .setTransform (this ._translation      .getValue (),
                          this ._rotation         .getValue (),
                          this ._scale            .getValue (),
                          this ._scaleOrientation .getValue (),
                          this ._center           .getValue ());
   },
});

Object .defineProperties (X3DTransformNode, X3DNode .getStaticProperties ("X3DTransformNode", "Grouping", 1));

export default X3DTransformNode;
