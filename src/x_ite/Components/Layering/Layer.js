import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLayerNode         from "./X3DLayerNode.js";
import Viewpoint            from "../Navigation/Viewpoint.js";
import Group                from "../Grouping/Group.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Layer (executionContext)
{
   X3DLayerNode .call (this,
                       executionContext,
                       new Viewpoint (executionContext),
                       new Group (executionContext));

   this .addType (X3DConstants .Layer);
}

Object .assign (Object .setPrototypeOf (Layer .prototype, X3DLayerNode .prototype),
{
   initialize ()
   {
      X3DLayerNode .prototype .initialize .call (this);

      const groupNode = this .getGroups () ._children [0] .getValue ();

      this ._addChildren    .addFieldInterest (groupNode ._addChildren);
      this ._removeChildren .addFieldInterest (groupNode ._removeChildren);
      this ._children       .addFieldInterest (groupNode ._children);

      groupNode ._children = this ._children;

      groupNode .setPrivate (true);
      groupNode .setup ();

      this .getGroups () .setup ();
   },
});

Object .defineProperties (Layer,
{
   ... X3DNode .getStaticProperties ("Layer", "Layering", 1, "layers", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pickable",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "objectType",     new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointerEvents",  new Fields .SFBool (true)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewport",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Layer;
