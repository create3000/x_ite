import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "./X3DEnvironmentalSensorNode.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4                  from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                    from "../../../standard/Math/Numbers/Matrix4.js";
import ObjectCache                from "../../../standard/Utility/ObjectCache.js";

const
   ModelMatrixCache  = ObjectCache (Matrix4),
   TargetMatrixCache = ObjectCache (Matrix4);

function TransformSensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);

   this .addType (X3DConstants .TransformSensor);

   this .setZeroTest (true);

   // Units

   this ._position_changed .setUnit ("length");

   // Private properties

   this .min            = new Vector3 ();
   this .max            = new Vector3 ();
   this .modelMatrices  = [ ];
   this .targetMatrices = [ ];
}

Object .assign (Object .setPrototypeOf (TransformSensor .prototype, X3DEnvironmentalSensorNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled      .addInterest ("set_enabled__",      this);
      this ._size         .addInterest ("set_enabled__",      this);
      this ._size         .addInterest ("set_extents__",      this);
      this ._center       .addInterest ("set_extents__",      this);
      this ._targetObject .addInterest ("set_targetObject__", this);

      this .set_extents__ ();
      this .set_targetObject__ ();
   },
   set_live__ ()
   { },
   set_enabled__ ()
   {
      if (this .getLive () .getValue () && this .targetObjectNode && this ._enabled .getValue () && !this ._size. getValue () .equals (Vector3 .Zero))
      {
         this .setPickableObject (true);
         this .getBrowser () .addTransformSensor (this);
         this .targetObjectNode .addTransformSensor (this);
      }
      else
      {
         this .setPickableObject (false);
         this .getBrowser () .removeTransformSensor (this);
         this .targetObjectNode ?.removeTransformSensor (this);

         if (this ._isActive .getValue ())
         {
            this ._isActive = false;
            this ._exitTime = this .getBrowser () .getCurrentTime ();
         }
      }
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
   set_targetObject__ ()
   {
      this .targetObjectNode = null;

      try
      {
         const
            node = this ._targetObject .getValue () .getInnerNode (),
            type = node .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DGroupingNode:
               case X3DConstants .X3DShapeNode:
               {
                  this .targetObjectNode = node;
                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }
      catch
      { }

      this .set_enabled__ ();
   },
   traverse (type, renderObject)
   {
      this .modelMatrices .push (ModelMatrixCache .pop () .assign (renderObject .getModelViewMatrix () .get ()));
   },
   collect (targetMatrix)
   {
      this .targetMatrices .push (TargetMatrixCache .pop () .assign (targetMatrix));
   },
   process: (() =>
   {
      const
         position    = new Vector3 (),
         orientation = new Rotation4 ();

      return function ()
      {
         const
            modelMatrices  = this .modelMatrices,
            targetMatrices = this .targetMatrices,
            matrix         = this .intersects ();

         if (matrix)
         {
            matrix .get (position, orientation);

            if (this ._isActive .getValue ())
            {
               if (!this ._position_changed .getValue () .equals (position))
                  this ._position_changed = position;

               if (!this ._orientation_changed .getValue () .equals (orientation))
                  this ._orientation_changed = orientation;
            }
            else
            {
               this ._isActive            = true;
               this ._enterTime           = this .getBrowser () .getCurrentTime ();
               this ._position_changed    = position;
               this ._orientation_changed = orientation;
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

         for (const modelMatrix of modelMatrices)
            ModelMatrixCache .push (modelMatrix);

         for (const targetMatrix of targetMatrices)
            TargetMatrixCache .push (targetMatrix);

         modelMatrices  .length = 0;
         targetMatrices .length = 0;
      };
   })(),
   intersects: (() =>
   {
      const infinity = new Vector3 (-1);

      return function ()
      {
         const
            modelMatrices  = this .modelMatrices,
            targetMatrices = this .targetMatrices,
            always         = this ._size .getValue () .equals (infinity);

         for (const modelMatrix of modelMatrices)
         {
            const invModelMatrix = modelMatrix .inverse ();

            for (const targetMatrix of targetMatrices)
            {
               const matrix = targetMatrix .multRight (invModelMatrix);

               if (always || this .containsPoint (matrix .origin))
               {
                  return matrix;
               }
            }
         }

         return null;
      };
   })(),
   containsPoint (point)
   {
      const
         min = this .min,
         max = this .max;

      return min .x <= point .x &&
             max .x >= point .x &&
             min .y <= point .y &&
             max .y >= point .y &&
             min .z <= point .z &&
             max .z >= point .z;
   },
});

Object .defineProperties (TransformSensor,
{
   ... X3DNode .getStaticProperties ("TransformSensor", "EnvironmentalSensor", 3, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",                new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",              new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",           new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",            new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "position_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "orientation_changed", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "targetObject",        new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default TransformSensor;
