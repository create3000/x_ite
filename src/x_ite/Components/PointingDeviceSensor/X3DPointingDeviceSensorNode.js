import X3DNode                       from "../Core/X3DNode.js";
import X3DSensorNode                 from "../Core/X3DSensorNode.js";
import X3DConstants                  from "../../Base/X3DConstants.js";
import ObjectCache                   from "../../../standard/Utility/ObjectCache.js";
import Vector4                       from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4                       from "../../../standard/Math/Numbers/Matrix4.js";

const PointingDeviceSensors = ObjectCache (PointingDeviceSensorContainer);

function PointingDeviceSensorContainer ()
{
   this .node             = null;
   this .hit              = null;
   this .modelViewMatrix  = new Matrix4 ();
   this .projectionMatrix = new Matrix4 ();
   this .viewport         = new Vector4 ();
}

Object .assign (PointingDeviceSensorContainer .prototype,
{
   set (node, modelViewMatrix, projectionMatrix, viewport)
   {
      this .node = node;

      this .modelViewMatrix  .assign (modelViewMatrix);
      this .projectionMatrix .assign (projectionMatrix);
      this .viewport         .assign (viewport);
   },
   set_over__ (over, hit)
   {
      this .node .set_over__ (over, hit, this .modelViewMatrix, this .projectionMatrix, this .viewport);
   },
   set_active__ (active, hit)
   {
      this .node .set_active__ (active, hit, this .modelViewMatrix, this .projectionMatrix, this .viewport);
   },
   set_motion__ (hit)
   {
      this .node .set_motion__ (hit, this .modelViewMatrix, this .projectionMatrix, this .viewport);
   },
   dispose ()
   {
      this .hit = null;

      // Return container

      PointingDeviceSensors .push (this);
   },
});

function X3DPointingDeviceSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DPointingDeviceSensorNode);
}

Object .assign (Object .setPrototypeOf (X3DPointingDeviceSensorNode .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      X3DSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this ._enabled .addInterest ("set_live__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
      {
         this .getBrowser () .addPointingDeviceSensor (this);

         delete this .push;
      }
      else
      {
         this .getBrowser () .removePointingDeviceSensor (this);

         if (this ._isActive .getValue ())
            this ._isActive = false;

         if (this ._isOver .getValue ())
            this ._isOver = false;

         this .push = Function .prototype;
      }
   },
   set_over__ (over, hit)
   {
      if (over !== this ._isOver .getValue ())
      {
         this ._isOver = over;

         if (over)
            this .getBrowser () .setDescription (this ._description);
      }
   },
   set_active__ (active, hit)
   {
      if (active !== this ._isActive .getValue ())
         this ._isActive = active
   },
   set_motion__ (hit)
   { },
   push (renderObject, sensors)
   {
      const sensor = PointingDeviceSensors .pop ();

      sensor .set (this,
                   renderObject .getModelViewMatrix  () .get (),
                   renderObject .getProjectionMatrix () .get (),
                   renderObject .getViewVolume () .getViewport ())

      this .getBrowser () .addSensor (sensor);

      sensors .push (sensor);
   },
});

Object .defineProperties (X3DPointingDeviceSensorNode, X3DNode .getStaticProperties ("X3DPointingDeviceSensorNode", "PointingDeviceSensor", 1));

export default X3DPointingDeviceSensorNode;
