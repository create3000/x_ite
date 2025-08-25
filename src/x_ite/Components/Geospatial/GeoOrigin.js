import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import GeospatialObject     from "../../Browser/Geospatial/GeospatialObject.js";

function GeoOrigin (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .GeoOrigin);

   this .radians = false;
}

Object .assign (Object .setPrototypeOf (GeoOrigin .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this ._geoSystem .addInterest ("set_geoSystem__", this);

      this .set_geoSystem__ ();
   },
   set_geoSystem__ ()
   {
      this .referenceFrame = GeospatialObject .getReferenceFrame (this ._geoSystem, this .radians);
   },
   getOrigin (result)
   {
      return this .referenceFrame .convert (this ._geoCoords .getValue (), result);
   },
});

Object .defineProperties (GeoOrigin,
{
   ... X3DNode .getStaticProperties ("GeoOrigin", "Geospatial", 1, "geoOrigin", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem", new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCoords", new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "rotateYUp", new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default GeoOrigin;
