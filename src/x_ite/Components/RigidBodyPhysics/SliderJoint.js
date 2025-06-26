import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DRigidJointNode    from "./X3DRigidJointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Ammo                 from "../../../lib/ammojs/AmmoClass.js";

function SliderJoint (executionContext)
{
   X3DRigidJointNode .call (this, executionContext);

   this .addType (X3DConstants .SliderJoint);

   // Units

   this ._minSeparation  .setUnit ("length");
   this ._maxSeparation  .setUnit ("length");
   this ._sliderForce    .setUnit ("force");
   this ._separation     .setUnit ("force");
   this ._separationRate .setUnit ("speed");

   // Private properties

   this .joint   = null;
   this .outputs = new Set ();
}

Object .assign (Object .setPrototypeOf (SliderJoint .prototype, X3DRigidJointNode .prototype),
{
   initialize ()
   {
      X3DRigidJointNode .prototype .initialize .call (this);

      this ._axis          .addInterest ("set_joint__",       this);
      this ._minSeparation .addInterest ("set_separation__",  this);
      this ._maxSeparation .addInterest ("set_separation__",  this);
   },
   addJoint: (() =>
   {
      const
         axisRotation = new Rotation4 (),
         matrixA      = new Matrix4 (),
         matrixB      = new Matrix4 (),
         origin       = new Ammo .btVector3 (0, 0, 0),
         frameInA     = new Ammo .btTransform (),
         frameInB     = new Ammo .btTransform ();

      return function ()
      {
         if (! this .getCollection ())
            return;

         if (! this .getBody1 ())
            return;

         if (! this .getBody2 ())
            return;

         if (this .getBody1 () .getCollection () !== this .getCollection ())
            return;

         if (this .getBody2 () .getCollection () !== this .getCollection ())
            return;

         axisRotation .setFromToVec (Vector3 .xAxis, this ._axis .getValue ());

         matrixA .set (this .getBody1 () ._position .getValue (), this .getBody1 () ._orientation .getValue () .copy () .multRight (axisRotation));
         matrixB .set (this .getBody1 () ._position .getValue (), this .getBody1 () ._orientation .getValue () .copy () .multRight (axisRotation));

         origin .setValue (matrixA [12], matrixA [13], matrixA [14]);

         frameInA .getBasis () .setValue (matrixA [0], matrixA [4], matrixA [8],
                                          matrixA [1], matrixA [5], matrixA [9],
                                          matrixA [2], matrixA [6], matrixA [10]);

         frameInA .setOrigin (origin);

         origin .setValue (matrixB [12], matrixB [13], matrixB [14]);

         frameInA .getBasis () .setValue (matrixB [0], matrixB [4], matrixB [8],
                                          matrixB [1], matrixB [5], matrixB [9],
                                          matrixB [2], matrixB [6], matrixB [10]);

         frameInB .setOrigin (origin);

         this .joint = new Ammo .btSliderConstraint (this .getBody1 () .getRigidBody (),
                                                     this .getBody2 () .getRigidBody (),
                                                     frameInA,
                                                     frameInB,
                                                     true);

         this .joint .setLowerAngLimit (0);
         this .joint .setUpperAngLimit (0);

         this .set_separation__ ();

         this .getCollection () .getDynamicsWorld () .addConstraint (this .joint, true);
      };
   })(),
   removeJoint ()
   {
      if (! this .joint)
         return;

      this .getCollection () ?.getDynamicsWorld () .removeConstraint (this .joint);

      Ammo .destroy (this .joint);
      this .joint = null;
   },
   set_forceOutput__ ()
   {
      this .outputs .clear ();

      for (const value of this ._forceOutput)
      {
         if (value == "ALL")
         {
            this .outputs .add ("separation");
            this .outputs .add ("separationRate");
         }
         else
         {
            this .outputs .add (value);
         }
      }

      this .setOutput (!! this .outputs .size);
   },
   set_separation__ ()
   {
      if (! this .joint)
         return;

      this .joint .setLowerLinLimit (this ._minSeparation .getValue ());
      this .joint .setUpperLinLimit (this ._maxSeparation .getValue ());
   },
});

Object .defineProperties (SliderJoint,
{
   ... X3DNode .getStaticProperties ("SliderJoint", "RigidBodyPhysics", 2, "joints", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "forceOutput",         new Fields .MFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "axis",                new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minSeparation",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "maxSeparation",       new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sliderForce",         new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopBounce",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopErrorCorrection", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "separation",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "separationRate",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",               new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SliderJoint;
