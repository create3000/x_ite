import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Collision (executionContext)
{
   X3DGroupingNode .call (this, executionContext);
   X3DSensorNode   .call (this, executionContext);

   this .addType (X3DConstants .Collision);

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("collide", this ._enabled); // VRML2
}

Object .assign (Object .setPrototypeOf (Collision .prototype, X3DGroupingNode .prototype),
   X3DSensorNode .prototype,
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);
      // X3DSensorNode .prototype .initialize .call (this); // We can only call the base of a *Objects.

      this .getLive () .addInterest ("set_live__",     this);
      this ._enabled   .addInterest ("set_enabled__",  this);
      this ._proxy     .addInterest ("set_children__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
         this .getBrowser () .addCollision (this);

      else
         this .getBrowser () .removeCollision (this);
   },
   set_enabled__ ()
   {
      this .set_live__ ();
      this .set_children__ ();
   },
   set_active (value)
   {
      if (this ._isActive .getValue () === value)
         return;

      this ._isActive = value;

      if (value)
         this ._collideTime = this .getBrowser () .getCurrentTime ();
   },
   set_collisionObjects__ ()
   {
      const proxyNode = X3DCast (X3DConstants .X3DChildNode, this ._proxy);

      if (!this ._enabled .getValue ())
      {
         this .collisionObjects .clear ();
      }
      else if (proxyNode)
      {
         this .collisionObjects .clear ();
         this .collisionObjects .add (proxyNode);
      }

      X3DGroupingNode .prototype .set_collisionObjects__ .call (this);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .COLLISION:
         {
            const collisions = renderObject .getCollisions ();

            collisions .push (this);

            X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

            collisions .pop ();
            return;
         }
         default:
         {
            X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
            return;
         }
      }
   },
   dispose ()
   {
      // X3DSensorNode .prototype .dispose .call (this); // We can only call the base of a *Objects.
      X3DGroupingNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (Collision,
{
   ... X3DNode .getStaticProperties ("Collision", "Navigation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "collideTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "proxy",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Collision;
