import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DCoordinateNode    from "./X3DCoordinateNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Coordinate (executionContext)
{
   X3DCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .Coordinate);

   // Units

   this ._point .setUnit ("length");
}

Object .setPrototypeOf (Coordinate .prototype, X3DCoordinateNode .prototype);

Object .defineProperties (Coordinate,
{
   ... X3DNode .getStaticProperties ("Coordinate", "Rendering", 1, "coord", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default Coordinate;
