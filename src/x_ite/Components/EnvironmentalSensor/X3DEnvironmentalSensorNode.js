import Fields        from "../../Fields.js";
import X3DNode       from "../Core/X3DNode.js";
import X3DSensorNode from "../Core/X3DSensorNode.js";
import X3DConstants  from "../../Base/X3DConstants.js";
import Vector3       from "../../../standard/Math/Numbers/Vector3.js";

function X3DEnvironmentalSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DEnvironmentalSensorNode);

   this .addChildObjects (X3DConstants .outputOnly, "traversed", new Fields .SFBool (true));

   // Units

   this ._size   .setUnit ("length");
   this ._center .setUnit ("length");

   // Private properties

   this .zeroTest         = false;
   this .currentTraversed = true;
}

Object .assign (Object .setPrototypeOf (X3DEnvironmentalSensorNode .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      X3DSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled   .addInterest ("set_live__", this);
      this ._size      .addInterest ("set_live__", this);
      this ._traversed .addInterest ("set_live__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this ._traversed .getValue () && this .getLive () .getValue () && this ._enabled .getValue () && !(this .zeroTest && this ._size. getValue () .equals (Vector3 .Zero)))
      {
         this .getBrowser () .sensorEvents () .addInterest ("update", this);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);

         if (this ._isActive .getValue ())
         {
            this ._isActive = false;
            this ._exitTime = this .getBrowser () .getCurrentTime ();
         }
      }
   },
   setZeroTest (value)
   {
      this .zeroTest = value;
   },
   getZeroTest ()
   {
      return this .zeroTest;
   },
   setTraversed (value)
   {
      if (value)
      {
         if (this ._traversed .getValue () === false)
            this ._traversed = true;
      }
      else
      {
         if (this .currentTraversed !== this ._traversed .getValue ())
            this ._traversed = this .currentTraversed;
      }

      this .currentTraversed = value;
   },
   getTraversed ()
   {
      return this .currentTraversed;
   },
   update () { },
});

Object .defineProperties (X3DEnvironmentalSensorNode, X3DNode .getStaticProperties ("X3DEnvironmentalSensorNode", "EnvironmentalSensor", 1));

export default X3DEnvironmentalSensorNode;
