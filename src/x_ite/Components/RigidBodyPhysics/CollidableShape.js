import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import Matrix4                from "../../../standard/Math/Numbers/Matrix4.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4              from "../../../standard/Math/Numbers/Rotation4.js";
import Quaternion             from "../../../standard/Math/Numbers/Quaternion.js";
import Ammo                   from "../../../lib/ammojs/AmmoClass.js";

const
   MARGIN = 0.0001;

function CollidableShape (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableShape);
}

Object .assign (Object .setPrototypeOf (CollidableShape .prototype, X3DNBodyCollidableNode .prototype),
{
   async initialize ()
   {
      await X3DNBodyCollidableNode .prototype .initialize .call (this);

      this .material = this .physics .createMaterial (1, 1, 0);

      this .material .setStaticFriction (1);
      this .material .setDynamicFriction (1);
      this .material .setRestitution (0);
      this .material .setFrictionCombineMode (this .PhysX .PxCombineModeEnum .eAVERAGE);
      this .material .setRestitutionCombineMode (this .PhysX .PxCombineModeEnum .eAVERAGE);

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
   setLocalPose: (() =>
   {
      const
         t = new Vector3 (),
         r = new Rotation4 (),
         q = new Quaternion ();

      return function (parentMatrix)
      {
         this .parentMatrix .assign (parentMatrix);

         if (this .getBody ())
            this .offsetMatrix .assign (parentMatrix);
         else
            this .offsetMatrix .assign (this .getMatrix ()) .multRight (parentMatrix);

         if (!this .shape)
            return;

         this .offsetMatrix .get (t, r);

         const
            translation = new this .PhysX .PxVec3 (... t),
            rotation    = new this .PhysX .PxQuat (... r .getQuaternion (q)),
            pose        = new this .PhysX .PxTransform (translation, rotation);

         this .shape .setLocalPose (pose);

         this .PhysX .destroy (translation);
         this .PhysX .destroy (rotation);
         this .PhysX .destroy (pose);
      };
   })(),
   getShape ()
   {
      return this .shape;
   },
   createShape (shapeFlags)
   {
      // if (this ._convexHull .getValue ())
      //    return this .createConvexShape (shapeFlags);
      // else
         return this .createConcaveShape (shapeFlags);
   },
   createConvexShape (shapeFlags)
   {
      const
         vertices    = this .geometryNode .getVertices () .getValue () .filter ((_, i) => i % 4 < 3),
         numVertices = vertices .length;

      if (!numVertices)
         return null;

      const desc = new this .PhysX .PxConvexMeshDesc ();

      desc .points .stride = vertices .BYTES_PER_ELEMENT * 3;
      desc .points .count  = vertices .length / 3;
      desc .points .data   = this .malloc (vertices);

      const descFlags = 0
         | this .PhysX ._emscripten_enum_PxConvexFlagEnum_eCOMPUTE_CONVEX ()
         | this .PhysX ._emscripten_enum_PxConvexFlagEnum_eQUANTIZE_INPUT ()
         | this .PhysX ._emscripten_enum_PxConvexFlagEnum_eDISABLE_MESH_VALIDATION ();

      desc .flags = new this .PhysX .PxConvexFlags (descFlags);

      const
         tolerances    = new this .PhysX .PxTolerancesScale (),
         cookingParams = new this .PhysX .PxCookingParams (tolerances),
         mesh          = this .PhysX .CreateConvexMesh (cookingParams, desc);

      const
         scale     = new this .PhysX .PxVec3 (1, 1, 1),
         quat      = new this .PhysX .PxQuat (0, 0, 0, 1),
         meshScale = new this .PhysX .PxMeshScale (scale, quat),
         flags     = new this .PhysX .PxConvexMeshGeometryFlags (),
         geometry  = new this .PhysX .PxConvexMeshGeometry (mesh, meshScale, flags);

      this .PhysX .destroy (scale);
      this .PhysX .destroy (quat);
      this .PhysX .destroy (meshScale);
      this .PhysX .destroy (flags);
      this .PhysX .destroy (cookingParams);
      this .PhysX .destroy (tolerances);
      this .PhysX .destroy (desc);

      return this .physics .createShape (geometry, this .material, true, shapeFlags);
   },
   createConcaveShape (shapeFlags)
   {
      const
         vertices    = this .geometryNode .getVertices () .getValue () .filter ((_, i) => i % 4 < 3),
         indices     = Uint32Array .from ({ length: vertices .length / 3 }, (_, i) => i),
         numVertices = vertices .length;

      if (!numVertices)
         return null;

      const desc = new this .PhysX .PxTriangleMeshDesc ();

      desc .points .stride = vertices .BYTES_PER_ELEMENT * 3;
      desc .points .count  = vertices .length / 3;
      desc .points .data   = this .malloc (vertices);

      desc .triangles .stride = indices .BYTES_PER_ELEMENT * 3;
      desc .triangles .count  = indices .length / 3;
      desc .triangles .data   = this .malloc (indices);

      const
         tolerances    = new this .PhysX .PxTolerancesScale (),
         cookingParams = new this .PhysX .PxCookingParams (tolerances),
         mesh          = this .PhysX .CreateTriangleMesh (cookingParams, desc);

      const
         scale     = new this .PhysX .PxVec3 (1, 1, 1),
         quat      = new this .PhysX .PxQuat (0, 0, 0, 1),
         meshScale = new this .PhysX .PxMeshScale (scale, quat),
         flags     = new this .PhysX .PxMeshGeometryFlags (),
         geometry  = new this .PhysX .PxTriangleMeshGeometry (mesh, meshScale, flags);

      this .PhysX .destroy (scale);
      this .PhysX .destroy (quat);
      this .PhysX .destroy (meshScale);
      this .PhysX .destroy (flags);
      this .PhysX .destroy (cookingParams);
      this .PhysX .destroy (tolerances);
      this .PhysX .destroy (desc);

      return this .physics .createShape (geometry, this .material, true, shapeFlags);
   },
   malloc (f, q)
   {
      const nDataBytes = f .length * f .BYTES_PER_ELEMENT;

      q ??= this .PhysX ._webidl_malloc (nDataBytes);

      const dataHeap = new Uint8Array (this .PhysX .HEAPU8 .buffer, q, nDataBytes);

      dataHeap .set (new Uint8Array (f .buffer));

      return q;
   },
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

      const shapeFlags = new this .PhysX .PxShapeFlags (
         this .PhysX .PxShapeFlagEnum .eSCENE_QUERY_SHAPE |
         this .PhysX .PxShapeFlagEnum .eSIMULATION_SHAPE
      );

      if (this .geometryNode ?.getGeometryType () >= 2)
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

                  this .shape = this .physics .createShape (geometry, this .material, true, shapeFlags);
                  break;
               }
               case X3DConstants .Cone:
               case X3DConstants .Cylinder:
               {
                  this .shape = this .createConvexShape (shapeFlags);
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

                  this .shape = this .physics .createShape (geometry, this .material, true, shapeFlags);
                  break;
               }
               case X3DConstants .X3DGeometryNode:
               {
                  this .shape = this .createShape (shapeFlags);
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

      this ._physicsShape = this .getBrowser () .getCurrentTime ();

      this .setEnabled (this .parentEnabled);
      this .setLocalPose (this .parentMatrix);

      this .PhysX .destroy (shapeFlags);
   },
   removeCollidableGeometry ()
   {
      this .shape ?.release ();
   },
   dispose ()
   {
      this .removeCollidableGeometry ();

      if (this .material)
         this .PhysX .destroy (this .material);

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
