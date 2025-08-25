import X3DNode                     from "../Core/X3DNode.js";
import X3DPointingDeviceSensorNode from "./X3DPointingDeviceSensorNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import Vector2                     from "../../../standard/Math/Numbers/Vector2.js";
import Vector3                     from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4                     from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTouchSensorNode (executionContext)
{
   X3DPointingDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTouchSensorNode);
}

Object .assign (Object .setPrototypeOf (X3DTouchSensorNode .prototype, X3DPointingDeviceSensorNode .prototype),
{
   set_active__ (active, hit)
   {
      X3DPointingDeviceSensorNode .prototype .set_active__ .call (this, active, hit);

      if (this ._enabled .getValue () && this ._isOver .getValue () && !active)
         this ._touchTime = this .getBrowser () .getCurrentTime ();
   },
   set_over__: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         texCoord           = new Vector2 (),
         normal             = new Vector3 (),
         point              = new Vector3 ();

      return function (over, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         X3DPointingDeviceSensorNode .prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

         if (!this ._isOver .getValue ())
            return;

         invModelViewMatrix .assign (modelViewMatrix) .inverse ();

         texCoord .assign (hit .texCoord) .divide (hit .texCoord .w);
         normal   .assign (hit .normal);
         point    .assign (hit .point);

         this ._hitTexCoord_changed = texCoord;
         this ._hitNormal_changed   = modelViewMatrix .multMatrixDir (normal) .normalize ();
         this ._hitPoint_changed    = invModelViewMatrix .multVecMatrix (point);
      };
   })(),
});

Object .defineProperties (X3DTouchSensorNode, X3DNode .getStaticProperties ("X3DTouchSensorNode", "PointingDeviceSensor", 1));

export default X3DTouchSensorNode;
