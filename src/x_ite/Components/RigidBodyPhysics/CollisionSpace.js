import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DNBodyCollisionSpaceNode from "./X3DNBodyCollisionSpaceNode.js";
import X3DBoundedObject           from "../Grouping/X3DBoundedObject.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import X3DCast                    from "../../Base/X3DCast.js";

function CollisionSpace (executionContext)
{
   X3DNBodyCollisionSpaceNode .call (this, executionContext);

   this .addType (X3DConstants .CollisionSpace);

   this .collidableNodes     = [ ];
   this .collisionSpaceNodes = [ ];
}

Object .assign (Object .setPrototypeOf (CollisionSpace .prototype, X3DNBodyCollisionSpaceNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollisionSpaceNode .prototype .initialize .call (this);

      this ._collidables .addInterest ("set_collidables__", this);

      this .set_collidables__ ();
   },
   getBBox (bbox, shadows)
   {
      // TODO: add space node.
      if (this .isDefaultBBoxSize ())
         return X3DBoundedObject .prototype .getBBox .call (this, this .collidableNodes, bbox, shadows);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getCollidables ()
   {
      return this .collidableNodes;
   },
   set_collidables__ ()
   {
      const collisionSpaceNodes = this .collisionSpaceNodes;

      for (const collisionSpaceNode of collisionSpaceNodes)
         collisionSpaceNode .removeInterest ("collect", this);

      collisionSpaceNodes .length = 0;

      for (const node of this ._collidables)
      {
         const collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, node);

         if (collisionSpaceNode)
            collisionSpaceNodes .push (collisionSpaceNode);
      }

      for (const collisionSpaceNode of collisionSpaceNodes)
         collisionSpaceNode .addInterest ("collect", this);

      this .collect ();
   },
   collect ()
   {
      const
         collidableNodes     = this .collidableNodes,
         collisionSpaceNodes = this .collisionSpaceNodes;

      collidableNodes     .length = 0;
      collisionSpaceNodes .length = 0;

      for (const node of this ._collidables)
      {
         const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, node);

         if (collidableNode)
         {
            collidableNodes .push (collidableNode);
            continue;
         }

         const collisionSpaceNode = X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, this ._collidables [i]);

         if (collisionSpaceNode)
         {
            collidableNodes .push (... collisionSpaceNode .getCollidables ());
            continue;
         }
      }

      this .addNodeEvent ();
   },
});

Object .defineProperties (CollisionSpace,
{
   ... X3DNode .getStaticProperties ("CollisionSpace", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "useGeometry", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "collidables", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollisionSpace;
