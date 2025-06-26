import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "../Interpolation/X3DInterpolatorNode.js";
import X3DGeospatialObject  from "./X3DGeospatialObject.js";
import Geocentric           from "../../Browser/Geospatial/Geocentric.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function GeoPositionInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);
   X3DGeospatialObject .call (this, executionContext);

   this .addType (X3DConstants .GeoPositionInterpolator);

   // Units

   this ._value_changed .setUnit ("length");

   // Private properties

   this .geocentric = new Geocentric ();
}

Object .assign (Object .setPrototypeOf (GeoPositionInterpolator .prototype, X3DInterpolatorNode .prototype),
   X3DGeospatialObject .prototype,
{
   setup ()
   {
      X3DGeospatialObject .prototype .initialize .call (this);

      X3DInterpolatorNode .prototype .setup .call (this);
   },
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const
         key      = this ._key,
         keyValue = this ._keyValue;

      if (keyValue .length < key .length)
         keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
   },
   interpolate: (() =>
   {
      const
         keyValue0 = new Vector3 (),
         keyValue1 = new Vector3 (),
         geovalue  = new Vector3 ();

      return function (index0, index1, weight)
      {
         this .getCoord (this ._keyValue [index0] .getValue (), keyValue0);
         this .getCoord (this ._keyValue [index1] .getValue (), keyValue1);

         const coord = this .geocentric .slerp (keyValue0, keyValue1, weight);

         this ._geovalue_changed = this .getGeoCoord (coord, geovalue);
         this ._value_changed    = coord;
      };
   })(),
   dispose ()
   {
      X3DGeospatialObject .prototype .dispose .call (this);
      X3DInterpolatorNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoPositionInterpolator,
{
   ... X3DNode .getStaticProperties ("GeoPositionInterpolator", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "key",              new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "keyValue",         new Fields .MFVec3d ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "geovalue_changed", new Fields .SFVec3d ()),
      ]),
      enumerable: true,
   },
});

export default GeoPositionInterpolator;
