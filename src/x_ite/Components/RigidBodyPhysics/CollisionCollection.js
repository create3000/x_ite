import Fields                from "../../Fields.js";
import X3DFieldDefinition    from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray  from "../../Base/FieldDefinitionArray.js";
import X3DNode               from "../Core/X3DNode.js";
import X3DChildNode          from "../Core/X3DChildNode.js";
import X3DBoundedObject      from "../Grouping/X3DBoundedObject.js";
import X3DConstants          from "../../Base/X3DConstants.js";
import X3DCast               from "../../Base/X3DCast.js";
import AppliedParametersType from "../../Browser/RigidBodyPhysics/AppliedParametersType.js";
import Algorithm             from "../../../standard/Math/Algorithm.js";

function CollisionCollection (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .CollisionCollection);

   // Units

   this ._minBounceSpeed           .setUnit ("speed");
   this ._surfaceSpeed             .setUnit ("speed");
   this ._softnessConstantForceMix .setUnit ("force");

   // Private properties

   this .appliedParameters = new Set ();
   this .collidableNodes   = [ ];
   this .material          = { };
}

Object .assign (Object .setPrototypeOf (CollisionCollection .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._appliedParameters .addInterest ("set_appliedParameters__", this);
      this ._appliedParameters .addInterest ("set_material__",          this);
      this ._collidables       .addInterest ("set_collidables__",       this);
      this ._collidables       .addInterest ("set_material__",          this);

      this .set_appliedParameters__ ();
      this .set_collidables__ ();
      this .set_material__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return bbox .set ();

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   set_appliedParameters__: (() =>
   {
      const appliedParametersIndex = new Map ([
         ["BOUNCE",                 AppliedParametersType .BOUNCE],
         ["USER_FRICTION",          AppliedParametersType .USER_FRICTION],
         ["FRICTION_COEFFICIENT-2", AppliedParametersType .FRICTION_COEFFICIENT_2],
         ["ERROR_REDUCTION",        AppliedParametersType .ERROR_REDUCTION],
         ["CONSTANT_FORCE",         AppliedParametersType .CONSTANT_FORCE],
         ["SPEED-1",                AppliedParametersType .SPEED_1],
         ["SPEED-2",                AppliedParametersType .SPEED_2],
         ["SLIP-1",                 AppliedParametersType .SLIP_1],
         ["SLIP-2",                 AppliedParametersType .SLIP_2],
      ]);

      return function ()
      {
         const { appliedParameters } = this;

         appliedParameters .clear ();

         for (const appliedParameter of this ._appliedParameters)
            appliedParameters .add (appliedParametersIndex .get (appliedParameter));
      };
   })(),
   set_collidables__ ()
   {
      const { collidableNodes } = this;

      collidableNodes .length = 0;

      for (const node of this ._collidables)
      {
         const collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, node)
            ?? X3DCast (X3DConstants .X3DNBodyCollisionSpaceNode, node);

         if (collidableNode)
            collidableNodes .push (collidableNode);
      }
   },
   set_material__ ()
   {
      const { collidableNodes, material } = this;

      material .staticFriction  = Math .max (this ._frictionCoefficients .x, 0);
      material .dynamicFriction = Math .max (this ._frictionCoefficients .y, 0);
      material .restitution     = Algorithm .clamp (this ._bounce .getValue (), 0, 1);

      for (const collidableNode of collidableNodes)
         collidableNode .setPhysicsMaterial (material);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (CollisionCollection,
{
   ... X3DNode .getStaticProperties ("CollisionCollection", "RigidBodyPhysics", 1, "collider", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",              new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appliedParameters",        new Fields .MFString ("BOUNCE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bounce",                   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "minBounceSpeed",           new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "frictionCoefficients",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceSpeed",             new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "slipFactors",              new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "softnessConstantForceMix", new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "softnessErrorCorrection",  new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                 new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",               new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "collidables",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollisionCollection;
