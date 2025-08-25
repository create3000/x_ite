import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLayerNode         from "../Layering/X3DLayerNode.js";
import Viewpoint            from "../Navigation/Viewpoint.js";
import Group                from "../Grouping/Group.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function AnnotationLayer (executionContext)
{
   X3DLayerNode .call (this,
                       executionContext,
                       new Viewpoint (executionContext),
                       new Group (executionContext));

   this .addType (X3DConstants .AnnotationLayer);
}

Object .assign (Object .setPrototypeOf (AnnotationLayer .prototype, X3DLayerNode .prototype),
{
   initialize ()
   {
      X3DLayerNode .prototype .initialize .call (this);
   },
});

Object .defineProperties (AnnotationLayer,
{
   ... X3DNode .getStaticProperties ("AnnotationLayer", "Annotation", 1, "layers", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "isPickable",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "layoutPolicy", new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "shownGroupID", new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewport",     new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default AnnotationLayer;
