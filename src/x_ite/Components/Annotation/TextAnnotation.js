import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DAnnotationNode    from "./X3DAnnotationNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function TextAnnotation (executionContext)
{
   X3DAnnotationNode .call (this, executionContext);

   this .addType (X3DConstants .TextAnnotation);
}

Object .assign (Object .setPrototypeOf (TextAnnotation .prototype, X3DAnnotationNode .prototype),
{
   initialize ()
   {
      X3DAnnotationNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (TextAnnotation,
{
   ... X3DNode .getStaticProperties ("TextAnnotation", "Annotation", 1, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "annotationGroupID", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displayPolicy",     new Fields .SFString ("NEVER")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "contentType",       new Fields .SFString ("text/plain")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "text",              new Fields .SFString ()),
      ]),
      enumerable: true,
   },
});

export default TextAnnotation;
