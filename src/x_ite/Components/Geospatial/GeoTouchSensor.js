import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTouchSensorNode   from "../PointingDeviceSensor/X3DTouchSensorNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function GeoTouchSensor (executionContext)
{
   X3DTouchSensorNode  .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoTouchSensor);

   // Units

   this ._hitPoint_changed .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoTouchSensor .prototype, X3DTouchSensorNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DTouchSensorNode  .prototype .initialize .call (this);
      X3DGeospatialObject .prototype .initialize .call (this);
   },
   set_over__: (() =>
   {
      const geoCoords = new Vector3 ();

      return function (over, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         X3DTouchSensorNode .prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

         if (this ._isOver .getValue ())
            this ._hitGeoCoord_changed = this .getGeoCoord (this ._hitPoint_changed .getValue (), geoCoords);
      };
   })(),
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DTouchSensorNode  .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoTouchSensor,
{
   ... X3DNode .getStaticProperties ("GeoTouchSensor", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",           new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitTexCoord_changed", new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitNormal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitPoint_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "hitGeoCoord_changed", new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isOver",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "touchTime",           new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default GeoTouchSensor;
