import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function AnnotationTarget (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .AnnotationTarget);
}

Object .assign (Object .setPrototypeOf (AnnotationTarget .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (AnnotationTarget,
{
   ... X3DNode .getStaticProperties ("AnnotationTarget", "Annotation", 1, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "referencePoint", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leadLineStyle",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "marker",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "annotations",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default AnnotationTarget;
