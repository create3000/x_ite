import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DAnnotationNode    from "./X3DAnnotationNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function GroupAnnotation (executionContext)
{
   X3DGroupingNode   .call (this, executionContext);
   X3DAnnotationNode .call (this, executionContext);

   this .addType (X3DConstants .GroupAnnotation);
}

Object .assign (Object .setPrototypeOf (GroupAnnotation .prototype, X3DGroupingNode .prototype),
   X3DAnnotationNode .prototype,
{
   initialize ()
   {
      X3DGroupingNode   .prototype .initialize .call (this);
      X3DAnnotationNode .prototype .initialize .call (this);
   },
   dispose ()
   {
      X3DAnnotationNode .prototype .dispose .call (this);
      X3DGroupingNode   .prototype .dispose .call (this);
   },
});

Object .defineProperties (GroupAnnotation,
{
   ... X3DNode .getStaticProperties ("GroupAnnotation", "Annotation", 1, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "annotationGroupID", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displayPolicy",     new Fields .SFString ("NEVER")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default GroupAnnotation;
