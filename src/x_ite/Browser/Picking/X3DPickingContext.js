import TraverseType from "../../Rendering/TraverseType.js";
import StopWatch    from "../../../standard/Time/StopWatch.js";

const
   _transformSensorNodes = Symbol (),
   _pickSensorNodes      = Symbol (),
   _pickingHierarchy     = Symbol (),
   _pickable             = Symbol (),
   _pickingTime          = Symbol ();

function X3DPickingContext ()
{
   this [_transformSensorNodes] = new Set ();
   this [_pickSensorNodes]      = [ new Set () ];
   this [_pickingHierarchy]     = [ ];
   this [_pickable]             = [ false ];
   this [_pickingTime]          = new StopWatch ();
}

Object .assign (X3DPickingContext .prototype,
{
   addTransformSensor (transformSensorNode)
   {
      this [_transformSensorNodes] .add (transformSensorNode);
      this .enablePicking ();
   },
   removeTransformSensor (transformSensorNode)
   {
      this [_transformSensorNodes] .delete (transformSensorNode);
      this .enablePicking ();
   },
   addPickSensor (pickSensorNode)
   {
      this [_pickSensorNodes] [0] .add (pickSensorNode);
      this .enablePicking ();
   },
   removePickSensor (pickSensorNode)
   {
      this [_pickSensorNodes] [0] .delete (pickSensorNode);
      this .enablePicking ();
   },
   getPickSensors ()
   {
      return this [_pickSensorNodes];
   },
   getPickingHierarchy ()
   {
      return this [_pickingHierarchy];
   },
   getPickable ()
   {
      return this [_pickable];
   },
   enablePicking ()
   {
      if (this [_transformSensorNodes] .size || this [_pickSensorNodes] [0] .size)
         this ._sensorEvents .addInterest ("picking", this);
      else
         this ._sensorEvents .removeInterest ("picking", this);
   },
   picking ()
   {
      this [_pickingTime] .start ();

      this .getWorld () .traverse (TraverseType .PICKING);

      for (const transformSensorNode of this [_transformSensorNodes])
      {
         transformSensorNode .process ();
      }

      for (const pickSensorNode of this [_pickSensorNodes] [0])
      {
         pickSensorNode .process ();
      }

      this [_pickingTime] .stop ();
   },
   getPickingTime ()
   {
      return this [_pickingTime];
   },
});

export default X3DPickingContext;
