import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function LayoutGroup (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .LayoutGroup);

   this .setCollisionObject (false);

   // Private properties

   this .matrix          = new Matrix4 ();
   this .modelViewMatrix = new Matrix4 ();
   this .screenMatrix    = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (LayoutGroup .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._viewport .addInterest ("set_viewport__",       this);
      this ._layout   .addInterest ("set_layout__",         this);
      this ._bboxSize .addInterest ("set_visibleObjects__", this);

      this .set_viewport__ ();
      this .set_layout__ ();
   },
   set_viewport__ ()
   {
      this .viewportNode = X3DCast (X3DConstants .X3DViewportNode, this ._viewport);
   },
   set_layout__ ()
   {
      this .layoutNode = X3DCast (X3DConstants .X3DLayoutNode, this ._layout);
   },
   set_collisionObjects__ ()
   { },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size || this .bboxObjects .size || this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
   getBBox (bbox, shadows)
   {
      return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadows) .multRight (this .getMatrix ());
   },
   getMatrix ()
   {
      if (this .layoutNode)
         return this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);

      return this .matrix .identity ();
   },
   traverse (type, renderObject)
   {
      this .viewportNode ?.push ();

      if (this .layoutNode)
      {
         const modelViewMatrix = renderObject .getModelViewMatrix ();

         this .modelViewMatrix .assign (modelViewMatrix .get ());
         this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

         modelViewMatrix .push (this .screenMatrix);
         renderObject .getLayouts () .push (this .layoutNode);

         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

         renderObject .getLayouts () .pop ();
         modelViewMatrix .pop ();
      }
      else
      {
         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
      }

      this .viewportNode ?.pop ();
   },
});

Object .defineProperties (LayoutGroup,
{
   ... X3DNode .getStaticProperties ("LayoutGroup", "Layout", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "layout",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewport",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LayoutGroup;
