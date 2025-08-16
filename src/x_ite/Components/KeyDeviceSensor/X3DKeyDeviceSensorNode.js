import X3DNode       from "../Core/X3DNode.js";
import X3DSensorNode from "../Core/X3DSensorNode.js";
import X3DConstants  from "../../Base/X3DConstants.js";

function X3DKeyDeviceSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DKeyDeviceSensorNode);
}

Object .assign (Object .setPrototypeOf (X3DKeyDeviceSensorNode .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      X3DSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue ())
      {
         this ._enabled .addInterest ("set_enabled__", this);

         if (this ._enabled .getValue ())
            this .enable ();
      }
      else
      {
         this ._enabled .removeInterest ("set_enabled__", this);

         this .disable ();
      }
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .enable ();
      else
         this .disable ();
   },
   enable ()
   {
      this .getBrowser () .addKeyDeviceSensorNode (this);
   },
   disable ()
   {
      this .getBrowser () .removeKeyDeviceSensorNode (this);

      this .release ();
   },
   keydown () { },
   keyup () { },
   release () { },
});

Object .defineProperties (X3DKeyDeviceSensorNode, X3DNode .getStaticProperties ("X3DKeyDeviceSensorNode", "KeyDeviceSensor", 1));

export default X3DKeyDeviceSensorNode;
