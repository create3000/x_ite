import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DTransformMatrix3DNode from "../Grouping/X3DTransformMatrix3DNode.js";
import X3DGeospatialObject      from "./X3DGeospatialObject.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Matrix4                  from "../../../standard/Math/Numbers/Matrix4.js";

function GeoLocation (executionContext)
{
   X3DTransformMatrix3DNode .call (this, executionContext);
   X3DGeospatialObject      .call (this, executionContext);

   this .addType (X3DConstants .GeoLocation);
}

Object .assign (Object .setPrototypeOf (GeoLocation .prototype, X3DTransformMatrix3DNode .prototype),
   X3DGeospatialObject .prototype,
{
   initialize ()
   {
      X3DTransformMatrix3DNode .prototype .initialize .call (this);
      X3DGeospatialObject      .prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   eventsProcessed: (() =>
   {
      const locationMatrix = new Matrix4 ();

      return function ()
      {
         this .setMatrix (this .getLocationMatrix (this ._geoCoords .getValue (), locationMatrix));
      };
   })(),
   dispose ()
   {
      X3DGeospatialObject      .prototype .dispose .call (this);
      X3DTransformMatrix3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoLocation,
{
   ... X3DNode .getStaticProperties ("GeoLocation", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",      new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords",      new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoLocation;
