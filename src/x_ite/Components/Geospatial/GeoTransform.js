import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DTransformMatrix3DNode from "../Grouping/X3DTransformMatrix3DNode.js";
import X3DGeospatialObject      from "./X3DGeospatialObject.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Matrix4                  from "../../../standard/Math/Numbers/Matrix4.js";

function GeoTransform (executionContext)
{
   X3DTransformMatrix3DNode .call (this, executionContext);
   X3DGeospatialObject      .call (this, executionContext);

   this .addType (X3DConstants .GeoTransform);

   // Units

   this ._translation .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (GeoTransform .prototype, X3DTransformMatrix3DNode .prototype),
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
      const
         matrix         = new Matrix4 (),
         locationMatrix = new Matrix4 ();

      return function ()
      {
         this .getLocationMatrix (this ._geoCenter .getValue (), locationMatrix);

         matrix .set (this ._translation        .getValue (),
                        this ._rotation         .getValue (),
                        this ._scale            .getValue (),
                        this ._scaleOrientation .getValue ());

         this .setMatrix (matrix .multRight (locationMatrix) .multLeft (locationMatrix .inverse ()));
      };
   })(),
   dispose ()
   {
      X3DGeospatialObject      .prototype .dispose .call (this);
      X3DTransformMatrix3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoTransform,
{
   ... X3DNode .getStaticProperties ("GeoTransform", "Geospatial", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",        new Fields .MFString ("GD", "WE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geoCenter",        new Fields .SFVec3d ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoTransform;
