import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import Ammo                   from "../../../lib/ammojs/AmmoClass.js";

const
   MARGIN = 0.0001;

function CollidableShape (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableShape);

   this .parentEnabled = true;
   this .enabled       = true;
}

Object .assign (Object .setPrototypeOf (CollidableShape .prototype, X3DNBodyCollidableNode .prototype),
{
   async initialize ()
   {
      await X3DNBodyCollidableNode .prototype .initialize .call (this);

      this ._enabled    .addInterest ("set_enabled__",            this);
      this ._convexHull .addInterest ("set_collidableGeometry__", this);
      this ._shape      .addInterest ("requestRebuild",           this);

      this .set_child__ ();
   },
   setEnabled (parentEnabled)
   {
      this .parentEnabled = parentEnabled;
      this .enabled       = this ._enabled .getValue () && parentEnabled;

      if (!this .shape)
         return;

      const
         word0      = this .enabled ? 0x80000000 : 0, // group id
         word1      = this .enabled ? 0xffffffff : 0, // collides with mask
         filterData = new this .PhysX .PxFilterData (word0, word1, 0, 0);

      this .shape .setSimulationFilterData (filterData);

      this .PhysX .destroy (filterData);
   },
   getShape ()
   {
      return this .shape;
   },
   createGeometry ()
   {
      if (this ._convexHull .getValue ())
         return this .createConvexGeometry ();
      else
         return this .createConcaveGeometry ();
   },
   createConvexGeometry: (() =>
   {
      const p = new Ammo .btVector3 ();

      return function ()
      {
         const
            vertices    = this .geometryNode .getVertices () .getValue (),
            numVertices = vertices .length;

         if (!numVertices)
            return null;

         const convexHull = new Ammo .btConvexHullShape ();

         for (let i = 0; i < numVertices; i += 4)
         {
            p .setValue (vertices [i], vertices [i + 1], vertices [i + 2]);

            convexHull .addPoint (p, false);
         }

         convexHull .setMargin (MARGIN);
         convexHull .initializePolyhedralFeatures ();
         convexHull .recalcLocalAabb ();

         return convexHull;
      };
   })(),
   createConcaveGeometry: (() =>
   {
      const
         p1 = new Ammo .btVector3 (),
         p2 = new Ammo .btVector3 (),
         p3 = new Ammo .btVector3 ();

      return function ()
      {
         const
            vertices    = this .geometryNode .getVertices () .getValue (),
            numVertices = vertices .length;

         if (!numVertices)
            return null;

         this .triangleMesh = new Ammo .btTriangleMesh ();

         for (let i = 0; i < numVertices; i += 12)
         {
            p1 .setValue (vertices [i],     vertices [i + 1], vertices [i + 2]);
            p2 .setValue (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
            p3 .setValue (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

            this .triangleMesh .addTriangle (p1, p2, p3);
         }

         return new Ammo .btBvhTriangleMeshShape (this .triangleMesh, false);
      };
   })(),
   set_enabled__ ()
   {
      this .setEnabled (this .parentEnabled);
   },
   set_child__ ()
   {
      // Remove node.

      this .getChild () ?._geometry .removeInterest ("set_geometry__", this);

      // Add node.

      const shapeNode = X3DCast (X3DConstants .Shape, this ._shape);

      this .setChild (shapeNode);

      shapeNode ?._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      this .geometryNode ?._rebuild .removeInterest ("set_collidableGeometry__", this);

      this .geometryNode = this .getChild () ?.getGeometry () ?? null;

      this .geometryNode ?._rebuild .addInterest ("set_collidableGeometry__", this);

      this .set_collidableGeometry__ ();
   },
   set_collidableGeometry__ ()
   {
      this .removeCollidableGeometry ();

      const material = this .physics .createMaterial (0, 0, 1);

      const shapeFlags = new this .PhysX .PxShapeFlags (
         this .PhysX .PxShapeFlagEnum .eSCENE_QUERY_SHAPE |
         this .PhysX .PxShapeFlagEnum .eSIMULATION_SHAPE |
         this .PhysX .PxShapeFlagEnum .eVISUALIZATION
      );

      if (this .geometryNode && this .geometryNode .getGeometryType () >= 2)
      {
         const type = this .geometryNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .Box:
               {
                  const
                     box      = this .geometryNode,
                     size     = box ._size .getValue (),
                     geometry = new this .PhysX .PxBoxGeometry (size .x / 2, size .y / 2, size .z / 2);

                  this .shape = this .physics .createShape (geometry, material, true, shapeFlags);
                  break;
               }
               case X3DConstants .Cone:
               {
                  const cone = this .geometryNode;

                  // if (cone ._side .getValue () && cone ._bottom .getValue ())
                  // {
                  //    this .collisionShape = new Ammo .btConeShape (cone ._bottomRadius .getValue (), cone ._height .getValue ());

                  //    this .collisionShape .setMargin (MARGIN);
                  // }
                  // else
                  // {
                  //    this .collisionShape = this .createGeometry ();
                  // }

                  break;
               }
               case X3DConstants .Cylinder:
               {
                  const
                     cylinder  = this .geometryNode,
                     radius    = cylinder ._radius .getValue (),
                     height1_2 = cylinder ._height .getValue () * 0.5;

                  // if (cylinder ._side .getValue () && cylinder ._top .getValue () && cylinder ._bottom .getValue ())
                  // {
                  //    this .collisionShape = new Ammo .btCylinderShape (new Ammo .btVector3 (radius, height1_2, radius));

                  //    this .collisionShape .setMargin (MARGIN);
                  // }
                  // else
                  // {
                  //    this .collisionShape = this .createGeometry ();
                  // }

                  break;
               }
               case X3DConstants .ElevationGrid:
               {
                  const elevationGrid = this .geometryNode;

                  // if (elevationGrid ._xDimension .getValue () > 1 && elevationGrid ._zDimension .getValue () > 1)
                  // {
                  //    const heightField = this .heightField = Ammo ._malloc (4 * elevationGrid ._xDimension .getValue () * elevationGrid ._zDimension .getValue ());

                  //    let
                  //       min = Number .POSITIVE_INFINITY,
                  //       max = Number .NEGATIVE_INFINITY;

                  //    for (let i = 0, i4 = 0, length = elevationGrid ._height .length; i < length; ++ i)
                  //    {
                  //       const value = elevationGrid ._height [i];

                  //       min = Math .min (min, value);
                  //       max = Math .max (max, value);

                  //       Ammo .HEAPF32 [heightField + i4 >>> 2] = elevationGrid ._height [i];

                  //       i4 += 4;
                  //    }

                  //    this .collisionShape = new Ammo .btHeightfieldTerrainShape (elevationGrid ._xDimension .getValue (),
                  //                                                                elevationGrid ._zDimension .getValue (),
                  //                                                                heightField,
                  //                                                                1,
                  //                                                                min,
                  //                                                                max,
                  //                                                                1,
                  //                                                                "PHY_FLOAT",
                  //                                                                true);

                  //    this .collisionShape .setMargin (MARGIN);
                  //    this .collisionShape .setLocalScaling (new Ammo .btVector3 (elevationGrid ._xSpacing .getValue (), 1, elevationGrid ._zSpacing .getValue ()));

                  //    this .setOffset (elevationGrid ._xSpacing .getValue () * (elevationGrid ._xDimension .getValue () - 1) * 0.5,
                  //                     (min + max) * 0.5,
                  //                     elevationGrid ._zSpacing .getValue () * (elevationGrid ._zDimension .getValue () - 1) * 0.5);
                  // }

                  break;
               }
               case X3DConstants .Sphere:
               {
                  const
                     sphere   = this .geometryNode,
                     geometry = new this .PhysX .PxSphereGeometry (sphere ._radius .getValue ());

                  this .shape = this .physics .createShape (geometry, material, true, shapeFlags);
                  break;
               }
               case X3DConstants .X3DGeometryNode:
               {
                  // this .collisionShape = this .createGeometry ();
                  break;
               }
               default:
               {
                  continue;
               }
            }

            break;
         }
      }
      else
      {
         this .shape = null;
      }

      this .set_enabled__ ();

      this .PhysX .destroy (material);
      this .PhysX .destroy (shapeFlags);

      // this .addNodeEvent ();
      this ._physicsShape = this .getBrowser () .getCurrentTime ();
   },
   removeCollidableGeometry ()
   {
      if (this .shape)
      {
         this .PhysX .destroy (this .shape);
      }
   },
   dispose ()
   {
      this .removeCollidableGeometry ();

      X3DNBodyCollidableNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (CollidableShape,
{
   ... X3DNode .getStaticProperties ("CollidableShape", "RigidBodyPhysics", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",       new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "convexHull",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shape",       new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default CollidableShape;
