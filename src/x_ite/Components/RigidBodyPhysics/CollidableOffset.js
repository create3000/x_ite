import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";

function CollidableOffset (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableOffset);
}

Object .assign (Object .setPrototypeOf (CollidableOffset .prototype, X3DNBodyCollidableNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._enabled    .addInterest ("set_collidableGeometry__", this);
      this ._collidable .addInterest ("requestRebuild",           this);

      this .set_child__ ();
   },
   set_child__ ()
   {
      // Remove node.

      if (this .getChild ())
      {
         const collidableNode = this .getChild ();

         collidableNode .removeInterest ("addNodeEvent", this);
         collidableNode ._compoundShape .removeFieldInterest (this ._compoundShape);
      }

      // Add node.

      const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._collidable);

      this .setChild (collidableNode);

      if (collidableNode)
      {
         collidableNode .addInterest ("addNodeEvent", this);
         collidableNode ._compoundShape .addFieldInterest (this ._compoundShape);
      }

      this .set_collidableGeometry__ ();
   },
   set_collidableGeometry__ ()
   {
      if (this .getCompoundShape () .getNumChildShapes ())
         this .getCompoundShape () .removeChildShapeByIndex (0);

      if (this .getChild () && this ._enabled .getValue ())
         this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .getChild () .getCompoundShape ());

      this ._compoundShape = this .getBrowser () .getCurrentTime ();
   },
});

Object .defineProperties (CollidableOffset,
{
   ... X3DNode .getStaticProperties ("CollidableOffset", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "collidable",  new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollidableOffset;
