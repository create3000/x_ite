import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "./X3DGroupingNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Switch (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .Switch);

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("choice", this ._children);
}

Object .assign (Object .setPrototypeOf (Switch .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._whichChoice .addInterest ("requestRebuild", this);
   },
   addChildren ()
   { },
   removeChildren ()
   { },
   set_addChildren__ ()
   {
      X3DGroupingNode .prototype .set_addChildren__ .call (this);

      this .set_children__ ();
   },
   set_removeChildren__ ()
   {
      X3DGroupingNode .prototype .set_removeChildren__ .call (this);

      this .set_children__ ();
   },
   set_children__ ()
   {
      this .clearChildren ();

      // Add single child.

      const whichChoice = this ._whichChoice .getValue ();

      if (whichChoice >= 0 && whichChoice < this ._children .length)
         this .addChild (this ._children [whichChoice]);

      this .set_objects__ ();
   },
});

Object .defineProperties (Switch,
{
   ... X3DNode .getStaticProperties ("Switch", "Grouping", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichChoice",    new Fields .SFInt32 (-1)),
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

export default Switch;
