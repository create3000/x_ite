import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DDragSensorNode    from "./X3DDragSensorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Line2                from "../../../standard/Math/Geometry/Line2.js";
import Line3                from "../../../standard/Math/Geometry/Line3.js";
import Plane3               from "../../../standard/Math/Geometry/Plane3.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

const
   screenLine     = new Line2 (),
   trackPoint1    = new Vector2 (),
   trackPointLine = new Line3 ();

function PlaneSensor (executionContext)
{
   X3DDragSensorNode .call (this, executionContext);

   this .addType (X3DConstants .PlaneSensor);

   // Units

   this ._offset              .setUnit ("length");
   this ._minPosition         .setUnit ("length");
   this ._maxPosition         .setUnit ("length");
   this ._translation_changed .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (PlaneSensor .prototype, X3DDragSensorNode .prototype),
{
   initialize ()
   {
      X3DDragSensorNode .prototype .initialize .call (this);

      this ._axisRotation .addInterest ("set_fields__", this);
      this ._minPosition  .addInterest ("set_fields__", this);
      this ._maxPosition  .addInterest ("set_fields__", this);

      this .modelViewMatrix    = new Matrix4 ();
      this .invModelViewMatrix = new Matrix4 ();
      this .projectionMatrix   = new Matrix4 ();
      this .viewport           = new Vector4 ();

      this .planeSensor = true;
      this .plane       = null;
      this .line        = null;
      this .startOffset = new Vector3 ();
      this .startPoint  = new Vector3 ();
   },
   getLineTrackPoint (pointer, line, trackPoint)
   {
      ViewVolume .projectLine (line, this .modelViewMatrix, this .projectionMatrix, this .viewport, screenLine);
      screenLine .getClosestPointToPoint (pointer, trackPoint1);
      ViewVolume .unProjectRay (trackPoint1 .x, trackPoint1 .y, this .modelViewMatrix, this .projectionMatrix, this .viewport, trackPointLine);

      return line .getClosestPointToLine (trackPointLine, trackPoint);
   },
   set_fields__ ()
   {
      if (!this ._isActive .getValue ())
         return;

      this .activate (this .activateHit);
      this .set_motion__ (this .motionHit ?? this .activateHit);
   },
   set_active__ (active, hit, modelViewMatrix, projectionMatrix, viewport)
   {
      X3DDragSensorNode .prototype .set_active__ .call (this, active, hit, modelViewMatrix, projectionMatrix, viewport);

      if (this ._isActive .getValue ())
      {
         this .activateHit = hit .copy ();
         this .motionHit   = null;

         this .modelViewMatrix    .assign (modelViewMatrix);
         this .projectionMatrix   .assign (projectionMatrix);
         this .viewport           .assign (viewport);
         this .invModelViewMatrix .assign (modelViewMatrix) .inverse ();

         this .activate (hit);
      }
      else
      {
         if (this ._autoOffset .getValue ())
            this ._offset = this ._translation_changed;
      }
   },
   activate (hit)
   {
      const
         hitRay   = hit .ray .copy () .multLineMatrix (this .invModelViewMatrix),
         hitPoint = this .invModelViewMatrix .multVecMatrix (hit .point .copy ());

      const axisRotation = this ._axisRotation .getValue ();

      if (this ._minPosition .x === this ._maxPosition .x)
      {
         this .planeSensor = false;

         const direction = axisRotation .multVecRot (new Vector3 (0, Math .abs (this ._maxPosition .y - this ._minPosition .y), 0));

         this .line = new Line3 (hitPoint, direction .normalize ());
      }
      else if (this ._minPosition .y === this ._maxPosition .y)
      {
         this .planeSensor = false;

         const direction = axisRotation .multVecRot (new Vector3 (Math .abs (this ._maxPosition .x - this ._minPosition .x), 0, 0));

         this .line = new Line3 (hitPoint, direction .normalize ());
      }
      else
      {
         this .planeSensor = true;
         this .plane       = new Plane3 (hitPoint, axisRotation .multVecRot (new Vector3 (0, 0, 1)));
      }

      if (this .planeSensor)
      {
         if (this .plane .intersectsLine (hitRay, this .startPoint))
         {
            this .trackStart (this .startPoint);
         }

         // new Plane3 (Vector3 .Zero, this .plane .normal) .intersectsLine (hitRay, trackPoint);
      }
      else
      {
         if (this .getLineTrackPoint (hit .pointer, this .line, this .startPoint))
         {
            const trackPoint = new Vector3 ();

            try
            {
               this .getLineTrackPoint (hit .pointer, new Line3 (this .line .direction, this .line .direction), trackPoint);
            }
            catch
            {
               trackPoint .assign (this .startPoint);
            }

            this .trackStart (trackPoint);
         }
      }
   },
   trackStart (trackPoint)
   {
      this .startOffset .assign (this ._offset .getValue ());

      this ._trackPoint_changed  = trackPoint;
      this ._translation_changed = this ._offset .getValue ();
   },
   set_motion__ (hit)
   {
      try
      {
         this .motionHit = hit .copy ();

         if (this .planeSensor)
         {
            const
               hitRay   = hit .ray .copy () .multLineMatrix (this .invModelViewMatrix),
               endPoint = new Vector3 ();

            if (this .plane .intersectsLine (hitRay, endPoint))
               this .track (endPoint, endPoint .copy ());
            else
               throw new Error ("Plane and line are parallel.");
         }
         else
         {
            const
               endPoint   = new Vector3 (),
               trackPoint = new Vector3 ();

            if (this .getLineTrackPoint (hit .pointer, this .line, endPoint))
            {
               try
               {
                  this .getLineTrackPoint (hit .pointer, new Line3 (Vector3 .Zero, this .line .direction), trackPoint);
               }
               catch
               {
                  trackPoint .assign (endPoint);
               }

               this .track (endPoint, trackPoint);
            }
            else
            {
               throw new Error ("Lines are parallel.");
            }
         }
      }
      catch
      {
         this ._trackPoint_changed  .addEvent ();
         this ._translation_changed .addEvent ();
      }
   },
   track (endPoint, trackPoint)
   {
      const
         axisRotation = this ._axisRotation .getValue (),
         translation  = axisRotation .copy () .inverse () .multVecRot (endPoint .add (this .startOffset) .subtract (this .startPoint));

      // X component

      if (!(this ._minPosition .x > this ._maxPosition .x))
         translation .x = Algorithm .clamp (translation .x, this ._minPosition .x, this ._maxPosition .x);

      // Y component

      if (!(this ._minPosition .y > this ._maxPosition .y))
         translation .y = Algorithm .clamp (translation .y, this ._minPosition .y, this ._maxPosition .y);

      axisRotation .multVecRot (translation);

      if (!this ._trackPoint_changed .getValue () .equals (trackPoint))
         this ._trackPoint_changed = trackPoint;

      if (!this ._translation_changed .getValue () .equals (translation))
         this ._translation_changed = translation;
   },
});

Object .defineProperties (PlaneSensor,
{
   ... X3DNode .getStaticProperties ("PlaneSensor", "PointingDeviceSensor", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axisRotation",        new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoOffset",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",              new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minPosition",         new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxPosition",         new Fields .SFVec2f (-1, -1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "trackPoint_changed",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "translation_changed", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",            new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default PlaneSensor;
