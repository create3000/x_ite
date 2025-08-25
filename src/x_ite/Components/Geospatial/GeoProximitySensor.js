import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "../EnvironmentalSensor/X3DEnvironmentalSensorNode.js";
import X3DGeospatialObject        from "./X3DGeospatialObject.js";
import ProximitySensor            from "../EnvironmentalSensor/ProximitySensor.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";

function GeoProximitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);
   X3DGeospatialObject        .call (this, executionContext);

   this .addType (X3DConstants .GeoProximitySensor);

   // Units

   this ._position_changed         .setUnit ("length");
   this ._centerOfRotation_changed .setUnit ("length");

   // Private properties

   this .proximitySensor = new ProximitySensor (executionContext);
}

Object .assign (Object .setPrototypeOf (GeoProximitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);
      X3DGeospatialObject        .prototype .initialize .call (this);

      this ._enabled .addFieldInterest (this .proximitySensor ._enabled);
      this ._size    .addFieldInterest (this .proximitySensor ._size);
      this ._center  .addFieldInterest (this .proximitySensor ._center);

      this ._geoCenter .addFieldInterest (this ._center);

      this .proximitySensor ._isActive                 .addFieldInterest (this ._isActive);
      this .proximitySensor ._enterTime                .addFieldInterest (this ._enterTime);
      this .proximitySensor ._exitTime                 .addFieldInterest (this ._exitTime);
      this .proximitySensor ._position_changed         .addFieldInterest (this ._position_changed);
      this .proximitySensor ._orientation_changed      .addFieldInterest (this ._orientation_changed);
      this .proximitySensor ._centerOfRotation_changed .addFieldInterest (this ._centerOfRotation_changed);

      this .proximitySensor ._position_changed .addInterest ("set_position__", this);

      this .proximitySensor ._enabled = this ._enabled;
      this .proximitySensor ._size    = this ._size;
      this .proximitySensor ._center  = this ._center;

      this .proximitySensor .setup ();

      this .connectChildNode (this .proximitySensor);
   },
   set_position__: (() =>
   {
      const geoCoord = new Vector3 ();

      return function ()
      {
         this ._geoCoord_changed = this .getGeoCoord (this .proximitySensor ._position_changed .getValue (), geoCoord);
      };
   })(),
   traverse (type, renderObject)
   {
      this .proximitySensor .traverse (type, renderObject);
   },
   dispose ()
   {
      X3DGeospatialObject        .prototype .dispose .call (this);
      X3DEnvironmentalSensorNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoProximitySensor,
{
   ... X3DNode .getStaticProperties ("GeoProximitySensor", "Geospatial", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",                new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "size",                     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                   new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCenter",                new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "enterTime",                new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "exitTime",                 new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geoCoord_changed",         new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "orientation_changed",      new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "centerOfRotation_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default GeoProximitySensor;
