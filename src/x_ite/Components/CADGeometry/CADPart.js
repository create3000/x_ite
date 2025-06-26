import Fields                       from "../../Fields.js";
import X3DFieldDefinition           from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray         from "../../Base/FieldDefinitionArray.js";
import X3DNode                      from "../Core/X3DNode.js";
import X3DTransformNode             from "../Grouping/X3DTransformNode.js";
import X3DProductStructureChildNode from "./X3DProductStructureChildNode.js";
import X3DConstants                 from "../../Base/X3DConstants.js";

function CADPart (executionContext)
{
   X3DTransformNode             .call (this, executionContext);
   X3DProductStructureChildNode .call (this, executionContext);

   this .addType (X3DConstants .CADPart);
}

Object .setPrototypeOf (CADPart .prototype, X3DTransformNode .prototype);

Object .defineProperties (CADPart,
{
   ... X3DNode .getStaticProperties ("CADPart", "CADGeometry", 2, "children", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
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

export default CADPart;
