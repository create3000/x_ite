import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "./X3DEnvironmentalSensorNode.js";
import TraverseType               from "../../Rendering/TraverseType.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4                  from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                    from "../../../standard/Math/Numbers/Matrix4.js";

function ProximitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);

   this .addType (X3DConstants .ProximitySensor);

   this .setCameraObject (true);
   this .setZeroTest (true);

   // Units

   this ._centerOfRotation_changed .setUnit ("length");
   this ._position_changed         .setUnit ("length");

   // Private properties

   this .min           = new Vector3 ();
   this .max           = new Vector3 ();
   this .layerNode     = null;
   this .modelMatrix   = new Matrix4 ();
   this .inside        = false;
}

Object .assign (Object .setPrototypeOf (ProximitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);

      this ._size   .addInterest ("set_extents__", this);
      this ._center .addInterest ("set_extents__", this);

      this ._enabled   .addFieldInterest (this ._isVisibleObject);
      this ._traversed .addFieldInterest (this ._isCameraObject);

      this .setVisibleObject (this ._enabled .getValue ());

      this .set_extents__ ();
   },
   set_extents__ ()
   {
      const
         s  = this ._size .getValue (),
         c  = this ._center .getValue (),
         sx = s .x / 2,
         sy = s .y / 2,
         sz = s .z / 2,
         cx = c .x,
         cy = c .y,
         cz = c .z;

      this .min .set (cx - sx, cy - sy, cz - sz);
      this .max .set (cx + sx, cy + sy, cz + sz);
   },
   update: (() =>
   {
      const
         position               = new Vector3 (),
         orientation            = new Rotation4 (),
         centerOfRotation       = new Vector3 (),
         centerOfRotationMatrix = new Matrix4 ();

      return function ()
      {
         if (this .inside && this .getTraversed ())
         {
            if (this .layerNode)
            {
               const
                  browser        = this .getBrowser (),
                  viewpointNode  = this .layerNode .getViewpoint (),
                  invModelMatrix = this .modelMatrix .inverse ()

               centerOfRotationMatrix
                  .assign (viewpointNode .getModelMatrix ())
                  .translate (viewpointNode .getUserCenterOfRotation ())
                  .multRight (invModelMatrix)
                  .get (centerOfRotation);

               invModelMatrix .multLeft (viewpointNode .getCameraSpaceMatrix ());

               if (this .layerNode === browser .getActiveLayer ())
               {
                  const pose = browser .getPose ();

                  if (pose)
                     invModelMatrix .multLeft (pose .cameraSpaceMatrix);
               }

               invModelMatrix .get (position, orientation);

               if (this ._isActive .getValue ())
               {
                  if (!this ._position_changed .getValue () .equals (position))
                     this ._position_changed = position;

                  if (!this ._orientation_changed .getValue () .equals (orientation))
                     this ._orientation_changed = orientation;

                  if (!this ._centerOfRotation_changed .getValue () .equals (centerOfRotation))
                     this ._centerOfRotation_changed = centerOfRotation;
               }
               else
               {
                  this ._isActive                 = true;
                  this ._enterTime                = browser .getCurrentTime ();
                  this ._position_changed         = position;
                  this ._orientation_changed      = orientation;
                  this ._centerOfRotation_changed = centerOfRotation;
               }
            }
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               this ._isActive = false;
               this ._exitTime = this .getBrowser () .getCurrentTime ();
            }
         }

         this .inside    = false;
         this .layerNode = null;

         this .setTraversed (false);
      };
   })(),
   traverse: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         infinity           = new Vector3 (-1);

      return function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .CAMERA:
            {
               this .layerNode = renderObject .getLayer ();
               this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
               return;
            }
            case TraverseType .DISPLAY:
            {
               this .setTraversed (true);

               if (this .inside)
                  return;

               if (this ._size .getValue () .equals (infinity))
               {
                  this .inside = true;
               }
               else
               {
                  invModelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()) .inverse ();

                  this .inside = this .containsPoint (invModelViewMatrix .origin);
               }

               return;
            }
         }
      };
   })(),
   containsPoint ({ x: px, y: py, z: pz })
   {
      const
         min = this .min,
         max = this .max;

      return min .x <= px &&
             max .x >= px &&
             min .y <= py &&
             max .y >= py &&
             min .z <= pz &&
             max .z >= pz;
   },
});

Object .defineProperties (ProximitySensor,
{
   ... X3DNode .getStaticProperties ("ProximitySensor", "EnvironmentalSensor", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",                   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default ProximitySensor;
