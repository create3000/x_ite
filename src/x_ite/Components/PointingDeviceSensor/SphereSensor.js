import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDragSensorNode    from "./X3DDragSensorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Triangle3            from "../../../standard/Math/Geometry/Triangle3.js";
import Plane3               from "../../../standard/Math/Geometry/Plane3.js";
import Sphere3              from "../../../standard/Math/Geometry/Sphere3.js";

function SphereSensor (executionContext)
{
   X3DDragSensorNode .call (this, executionContext);

   this .addType (X3DConstants .SphereSensor);
}

Object .assign (Object .setPrototypeOf (SphereSensor .prototype, X3DDragSensorNode .prototype),
{
   initialize ()
   {
      X3DDragSensorNode .prototype .initialize .call (this);

      this .modelViewMatrix    = new Matrix4 ();
      this .invModelViewMatrix = new Matrix4 ();

      this .sphere      = null;
      this .zPlane      = null;
      this .behind      = false;
      this .fromVector  = new Vector3 ();
      this .startPoint  = new Vector3 ();
      this .startOffset = new Rotation4 ();
   },
   getTrackPoint (hitRay, trackPoint, behind)
   {
      const exit = new Vector3 ();

      if (this .sphere .intersectsLine (hitRay, trackPoint, exit))
      {
         if ((hitRay .point .distance (exit) < hitRay .point .distance (trackPoint)) - behind)
            trackPoint .assign (exit);

         return true;
      }

      return false;
   },
   set_active__ (active, hit, modelViewMatrix, projectionMatrix, viewport)
   {
      X3DDragSensorNode .prototype .set_active__ .call (this, active, hit, modelViewMatrix, projectionMatrix, viewport);

      if (this ._isActive .getValue ())
      {
         this .modelViewMatrix    .assign (modelViewMatrix);
         this .invModelViewMatrix .assign (modelViewMatrix) .inverse ();

         const
            hitPoint = this .invModelViewMatrix .multVecMatrix (hit .point .copy ()),
            center   = new Vector3 ();

         this .zPlane = new Plane3 (center, this .invModelViewMatrix .multDirMatrix (new Vector3 (0, 0, 1)) .normalize ()); // Screen aligned Z-plane
         this .sphere = new Sphere3 (hitPoint .norm (), center);
         this .behind = this .zPlane .getDistanceToPoint (hitPoint) < 0;

         this .fromVector  .assign (hitPoint);
         this .startPoint  .assign (hitPoint);
         this .startOffset .assign (this ._offset .getValue ());

         this ._trackPoint_changed = hitPoint;
         this ._rotation_changed   = this ._offset .getValue ();
      }
      else
      {
         if (this ._autoOffset .getValue ())
            this ._offset = this ._rotation_changed;
      }
   },
   set_motion__ (hit)
   {
      const
         hitRay     = hit .ray .copy () .multLineMatrix (this .invModelViewMatrix),
         trackPoint = new Vector3 ();

      if (this .getTrackPoint (hitRay, trackPoint, this .behind))
      {
         const zAxis = this .invModelViewMatrix .multDirMatrix (new Vector3 (0, 0, 1)) .normalize (); // Camera direction

         this .zPlane = new Plane3 (trackPoint, zAxis); // Screen aligned Z-plane
      }
      else
      {
         // Find trackPoint on the plane with sphere

         const tangentPoint = new Vector3 ();

         this .zPlane .intersectsLine (hitRay, tangentPoint);

         hitRay .set (tangentPoint, this .sphere .center .copy () .subtract (tangentPoint) .normalize ());

         //console .log (hitRay .toString ());

         this .getTrackPoint (hitRay, trackPoint, false);

         // Find trackPoint behind sphere

         const
            triNormal     = Triangle3 .normal (this .sphere .center, trackPoint, this .startPoint, new Vector3 ()),
            dirFromCenter = trackPoint .copy () .subtract (this .sphere .center) .normalize (),
            normal        = triNormal .copy () .cross (dirFromCenter) .normalize ();

         const point1 = trackPoint .copy () .subtract (normal .multiply (tangentPoint .copy () .subtract (trackPoint) .norm ()));

         hitRay .set (point1, this .sphere .center .copy () .subtract (point1) .normalize ());

         this .getTrackPoint (hitRay, trackPoint, false);
      }

      this ._trackPoint_changed = trackPoint;

      const
         toVector = trackPoint .copy () .subtract (this .sphere .center),
         rotation = new Rotation4 (this .fromVector, toVector);

      if (this .behind)
         rotation .inverse ();

      this ._rotation_changed = this .startOffset .copy () .multRight (rotation);
   },
});

Object .defineProperties (SphereSensor,
{
   ... X3DNode .getStaticProperties ("SphereSensor", "PointingDeviceSensor", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",        new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoOffset",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",             new Fields .SFRotation (0, 1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "trackPoint_changed", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "rotation_changed",   new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",           new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default SphereSensor;
