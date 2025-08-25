import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInfoNode          from "../Core/X3DInfoNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function GeoMetadata (executionContext)
{
   X3DInfoNode  .call (this, executionContext);
   X3DUrlObject .call (this, executionContext);

   this .addType (X3DConstants .GeoMetadata);
}

Object .assign (Object .setPrototypeOf (GeoMetadata .prototype, X3DInfoNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DInfoNode  .prototype .initialize .call (this);
      X3DUrlObject .prototype .initialize .call (this);
   },
   async requestImmediateLoad (cache = true)
   { },
   dispose ()
   {
      X3DUrlObject .prototype .dispose .call (this);
      X3DInfoNode  .prototype .dispose .call (this);
   },
});

Object .defineProperties (GeoMetadata,
{
   ... X3DNode .getStaticProperties ("GeoMetadata", "Geospatial", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "summary",              new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "data",                 new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GeoMetadata;
