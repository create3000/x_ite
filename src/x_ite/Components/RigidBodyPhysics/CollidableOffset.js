import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import Matrix4                from "../../../standard/Math/Numbers/Matrix4.js";

function CollidableOffset (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableOffset);

   // Private properties

   this .material = { };
}

Object .assign (Object .setPrototypeOf (CollidableOffset .prototype, X3DNBodyCollidableNode .prototype),
{
   initialize ()
   {
      X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._enabled    .addInterest ("set_enabled__", this);
      this ._collidable .addInterest ("requestRebuild", this);

      this .set_child__ ();
   },
   setEnabled (parentEnabled)
   {
      this .parentEnabled = parentEnabled;
      this .enabled       = this ._enabled .getValue () && parentEnabled;

      this .getChild () ?.setEnabled (this .enabled);
   },
   setLocalPose (parentMatrix)
   {
      this .parentMatrix .assign (parentMatrix);

      if (this .isRoot ())
         this .offsetMatrix .assign (parentMatrix);
      else
         this .offsetMatrix .assign (this .getMatrix ()) .multRight (parentMatrix);

      this .getChild () ?.setLocalPose (this .offsetMatrix);
   },
   setPhysicsMaterial (material)
   {
      Object .assign (this .material, material);

      this .getChild () ?.setPhysicsMaterial (material);
   },
   setBody (body, root)
   {
      X3DNBodyCollidableNode .prototype .setBody .call (this, body, root);

      this .getChild () ?.setBody (body);
   },
   set_enabled__ ()
   {
      this .setEnabled (this .parentEnabled);
   },
   set_child__ ()
   {
      // Remove node.

      if (this .getChild ())
      {
         const collidableNode = this .getChild ();

         collidableNode .setBody (null);
         collidableNode .setEnabled (true);
         collidableNode .setLocalPose (Matrix4 .IDENTITY);
      }

      // Add node.

      const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this ._collidable);

      this .setChild (collidableNode);

      this .setBody (this .getBody ());
      this .setEnabled (this .parentEnabled);
      this .setLocalPose (this .parentMatrix);
      this .setPhysicsMaterial (this .material);
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",       new Fields .SFVec3f (1, 1, 1)),
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
