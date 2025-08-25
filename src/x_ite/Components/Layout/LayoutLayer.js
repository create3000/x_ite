import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLayerNode         from "../Layering/X3DLayerNode.js";
import LayoutGroup          from "./LayoutGroup.js";
import OrthoViewpoint       from "../Navigation/OrthoViewpoint.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LayoutLayer (executionContext)
{
   X3DLayerNode .call (this,
                       executionContext,
                       new OrthoViewpoint (executionContext),
                       new LayoutGroup (executionContext));

   this .addType (X3DConstants .LayoutLayer);
}

Object .assign (Object .setPrototypeOf (LayoutLayer .prototype, X3DLayerNode .prototype),
{
   initialize ()
   {
      X3DLayerNode .prototype .initialize .call (this);

      const groupNode = this .getGroups () ._children [0] .getValue ();

      this ._layout         .addFieldInterest (groupNode ._layout);
      this ._addChildren    .addFieldInterest (groupNode ._addChildren);
      this ._removeChildren .addFieldInterest (groupNode ._removeChildren);
      this ._children       .addFieldInterest (groupNode ._children);

      groupNode ._layout   = this ._layout;
      groupNode ._children = this ._children;

      groupNode .setPrivate (true);
      groupNode .setup ();

      this .getGroups () .setup ();
   },
});

Object .defineProperties (LayoutLayer,
{
   ... X3DNode .getStaticProperties ("LayoutLayer", "Layout", 1, "layers", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pickable",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "objectType",     new Fields .MFString ("ALL")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointerEvents",  new Fields .SFBool (true)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "layout",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewport",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LayoutLayer;
