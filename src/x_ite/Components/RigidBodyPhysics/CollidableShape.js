import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DNBodyCollidableNode from "./X3DNBodyCollidableNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4              from "../../../standard/Math/Numbers/Rotation4.js";
import Quaternion             from "../../../standard/Math/Numbers/Quaternion.js";

function CollidableShape (executionContext)
{
   X3DNBodyCollidableNode .call (this, executionContext);

   this .addType (X3DConstants .CollidableShape);

   // Private properties

   this .scale = new Vector3 (1, 1, 1);

   this .materialParameters = {
      restitution: 0,
      staticFriction: 0,
      dynamicFriction: 0,
      restitutionCombine: "AVERAGE",
      frictionCombine: "AVERAGE",
   };
}

Object .assign (Object .setPrototypeOf (CollidableShape .prototype, X3DNBodyCollidableNode .prototype),
{
   async initialize ()
   {
      await X3DNBodyCollidableNode .prototype .initialize .call (this);

      this .pose            = new this .PhysX .PxTransform ();
      this .physicsMaterial = this .physics .createMaterial ();

      this .setPhysicsMaterial (this .materialParameters);

      this ._enabled    .addInterest ("set_enabled__",  this);
      this ._convexHull .addInterest ("requestRebuild", this);
      this ._shape      .addInterest ("requestRebuild", this);

      this .set_enabled__ ();
      this .set_child__ ();
   },
   setEnabled (parentEnabled)
   {
      this .parentEnabled = parentEnabled;
      this .enabled       = this ._enabled .getValue () && parentEnabled;

      if (!this .PhysX)
         return;

      const
         word0      = this .enabled ? 0x80000000 : 0, // group id
         word1      = this .enabled ? 0xffffffff : 0, // collides with mask
         filterData = new this .PhysX .PxFilterData (word0, word1, 0, 0);

      this .convexShape  ?.setSimulationFilterData (filterData);
      this .concaveShape ?.setSimulationFilterData (filterData);

      this .PhysX .destroy (filterData);
   },
   setLocalPose: (() =>
   {
      const
         translation = new Vector3 (),
         rotation    = new Rotation4 (),
         quaternion  = new Quaternion ();

      return function (parentMatrix)
      {
         this .parentMatrix .assign (parentMatrix);

         if (this .isRoot ())
            this .offsetMatrix .set () .scale (this ._scale .getValue ()) .multRight (parentMatrix);
         else
            this .offsetMatrix .assign (this .getMatrix ()) .multRight (parentMatrix);

         const pose = this .pose;

         if (!pose)
            return;

         const { p, q } = pose;

         this .offsetMatrix .get (translation, rotation, this .scale);

         rotation .getQuaternion (quaternion);

         p .x = translation .x;
         p .y = translation .y;
         p .z = translation .z;

         q .x = quaternion .x;
         q .y = quaternion .y;
         q .z = quaternion .z;
         q .w = quaternion .w;

         this .convexShape  ?.setLocalPose (pose);
         this .concaveShape ?.setLocalPose (pose);

         switch (this .type)
         {
            case X3DConstants .Box:
            {
               const
                  box         = this .geometryNode,
                  size        = box ._size .getValue (),
                  scale       = this .scale,
                  geometry    = this .convexGeometry,
                  halfExtents = geometry .halfExtents;

               halfExtents .x = size .x / 2 * scale .x;
               halfExtents .y = size .y / 2 * scale .y;
               halfExtents .z = size .z / 2 * scale .z;

               this .convexShape .setGeometry (geometry);
               break;
            }
            case X3DConstants .X3DGeometryNode:
            {
               const
                  scale     = new this .PhysX .PxVec3 (... this .scale),
                  quat      = new this .PhysX .PxQuat (0, 0, 0, 1),
                  meshScale = new this .PhysX .PxMeshScale (scale, quat);

               if (this .convexGeometry)
               {
                  const geometry = this .convexGeometry;

                  geometry .scale = meshScale;

                  this .convexShape .setGeometry (geometry);
               }

               if (this .concaveGeometry !== this .convexGeometry)
               {
                  const geometry = this .concaveGeometry;

                  geometry .scale = meshScale;

                  this .concaveShape .setGeometry (geometry);
               }

               this .PhysX .destroy (scale);
               this .PhysX .destroy (quat);
               this .PhysX .destroy (meshScale);
               break;
            }
         }

         const body = this .getBody ();

         if (body)
         {
            body .set_mass__ ();
            body .set_centerOfMass__ ();
            body .set_inertia__ ();
         }
      };
   })(),
   setPhysicsMaterial (appliedParameters)
   {
      const { materialParameters, physicsMaterial } = this;

      Object .assign (materialParameters, appliedParameters);

      if (!physicsMaterial)
         return;

      physicsMaterial .setRestitution (materialParameters .restitution);
      physicsMaterial .setStaticFriction (materialParameters .staticFriction);
      physicsMaterial .setDynamicFriction (materialParameters .dynamicFriction);

      physicsMaterial .setRestitutionCombineMode (this .getCombineMode (materialParameters .restitutionCombine));
      physicsMaterial .setFrictionCombineMode (this .getCombineMode (materialParameters .frictionCombine));
   },
   getCombineMode (mode)
   {
      switch (mode)
      {
         default:
         case "AVERAGE":
               return this .PhysX .PxCombineModeEnum .eAVERAGE;
         case "MINIMUM":
               return this .PhysX .PxCombineModeEnum .eMIN;
         case "MAXIMUM":
               return this .PhysX .PxCombineModeEnum .eMAX;
         case "MULTIPLY":
               return this .PhysX .PxCombineModeEnum .eMULTIPLY;
      }
   },
   setBody (body, root)
   {
      if (this .getActor ())
      {
         if (this .convexShape && this .getActor () instanceof this .PhysX .PxRigidDynamic)
            this .getActor () .detachShape (this .convexShape);

         else if (this .concaveShape && this .getActor () instanceof this .PhysX .PxRigidStatic)
            this .getActor () .detachShape (this .concaveShape);
      }

      X3DNBodyCollidableNode .prototype .setBody .call (this, body, root);

      if (this .getActor ())
      {
         if (this .convexShape && this .getActor () instanceof this .PhysX .PxRigidDynamic)
            this .getActor () .attachShape (this .convexShape);

         else if (this .concaveShape && this .getActor () instanceof this .PhysX .PxRigidStatic)
            this .getActor () .attachShape (this .concaveShape);
      }

      if (body)
      {
         body .set_mass__ ();
         body .set_centerOfMass__ ();
         body .set_inertia__ ();
      }
   },
   getActor ()
   {
      return this .getBody () ?.getActor ();
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
         tolerances    = this .physics .getTolerancesScale (),
         cookingParams = new this .PhysX .PxCookingParams (tolerances),
         mesh          = this .PhysX .CreateConvexMesh (cookingParams, desc);

      const
         scale     = new this .PhysX .PxVec3 (... this .scale),
         quat      = new this .PhysX .PxQuat (0, 0, 0, 1),
         meshScale = new this .PhysX .PxMeshScale (scale, quat),
         flags     = new this .PhysX .PxConvexMeshGeometryFlags (),
         geometry  = new this .PhysX .PxConvexMeshGeometry (mesh, meshScale, flags);

      this .PhysX .destroy (scale);
      this .PhysX .destroy (quat);
      this .PhysX .destroy (meshScale);
      this .PhysX .destroy (flags);
      this .PhysX .destroy (cookingParams);
      this .PhysX .destroy (desc);

      this .convexGeometry = geometry;

      return this .physics .createShape (geometry, this .physicsMaterial, false, shapeFlags);
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
         tolerances    = this .physics .getTolerancesScale (),
         cookingParams = new this .PhysX .PxCookingParams (tolerances),
         mesh          = this .PhysX .CreateTriangleMesh (cookingParams, desc);

      const
         scale     = new this .PhysX .PxVec3 (... this .scale),
         quat      = new this .PhysX .PxQuat (0, 0, 0, 1),
         meshScale = new this .PhysX .PxMeshScale (scale, quat),
         flags     = new this .PhysX .PxMeshGeometryFlags (),
         geometry  = new this .PhysX .PxTriangleMeshGeometry (mesh, meshScale, flags);

      this .PhysX .destroy (scale);
      this .PhysX .destroy (quat);
      this .PhysX .destroy (meshScale);
      this .PhysX .destroy (flags);
      this .PhysX .destroy (cookingParams);
      this .PhysX .destroy (desc);

      this .concaveGeometry = geometry;

      return this .physics .createShape (geometry, this .physicsMaterial, false, shapeFlags);
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
                     scale    = this .scale,
                     hx       = size .x / 2 * scale .x,
                     hy       = size .y / 2 * scale .y,
                     hz       = size .z / 2 * scale .z,
                     geometry = new this .PhysX .PxBoxGeometry (hx, hy, hz),
                     shape    = this .physics .createShape (geometry, this .physicsMaterial, false, shapeFlags);

                  this .type           = X3DConstants .Box;
                  this .convexGeometry = geometry;
                  this .convexShape    = shape;
                  this .concaveShape   = shape;
                  break;
               }
               case X3DConstants .Cone:
               case X3DConstants .Cylinder:
               {
                  const shape = this .createConvexShape (shapeFlags);

                  this .type         = X3DConstants .X3DGeometryNode;
                  this .convexShape  = shape;
                  this .concaveShape = shape;
                  break;
               }
               // case X3DConstants .ElevationGrid:
               // {
               //    const elevationGrid = this .geometryNode;

               //    if (elevationGrid ._xDimension .getValue () > 1 && elevationGrid ._zDimension .getValue () > 1)
               //    {
               //       const heightField = this .heightField = Ammo ._malloc (4 * elevationGrid ._xDimension .getValue () * elevationGrid ._zDimension .getValue ());

               //       let
               //          min = Number .POSITIVE_INFINITY,
               //          max = Number .NEGATIVE_INFINITY;

               //       for (let i = 0, i4 = 0, length = elevationGrid ._height .length; i < length; ++ i)
               //       {
               //          const value = elevationGrid ._height [i];

               //          min = Math .min (min, value);
               //          max = Math .max (max, value);

               //          Ammo .HEAPF32 [heightField + i4 >>> 2] = elevationGrid ._height [i];

               //          i4 += 4;
               //       }

               //       this .collisionShape = new Ammo .btHeightfieldTerrainShape (elevationGrid ._xDimension .getValue (),
               //                                                                   elevationGrid ._zDimension .getValue (),
               //                                                                   heightField,
               //                                                                   1,
               //                                                                   min,
               //                                                                   max,
               //                                                                   1,
               //                                                                   "PHY_FLOAT",
               //                                                                   true);

               //       this .collisionShape .setMargin (MARGIN);
               //       this .collisionShape .setLocalScaling (new Ammo .btVector3 (elevationGrid ._xSpacing .getValue (), 1, elevationGrid ._zSpacing .getValue ()));

               //       this .setOffset (elevationGrid ._xSpacing .getValue () * (elevationGrid ._xDimension .getValue () - 1) * 0.5,
               //                        (min + max) * 0.5,
               //                        elevationGrid ._zSpacing .getValue () * (elevationGrid ._zDimension .getValue () - 1) * 0.5);
               //    }

               //    break;
               // }
               case X3DConstants .Sphere:
               {
                  const
                     sphere   = this .geometryNode,
                     geometry = new this .PhysX .PxSphereGeometry (sphere ._radius .getValue ()),
                     shape    = this .physics .createShape (geometry, this .physicsMaterial, false, shapeFlags);

                  this .type           = X3DConstants .Sphere;
                  this .convexGeometry = geometry;
                  this .convexShape    = shape;
                  this .concaveShape   = shape;
                  break;
               }
               case X3DConstants .X3DGeometryNode:
               {
                  this .type = X3DConstants .X3DGeometryNode;

                  this .concaveShape = this ._convexHull .getValue ()
                     ? this .createConvexShape (shapeFlags)
                     : this .createConcaveShape (shapeFlags);

                  this .convexShape = this ._convexHull .getValue ()
                     ? this .concaveShape
                     : this .createConvexShape (shapeFlags);

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
         this .type            = undefined;
         this .convexGeometry  = null;
         this .concaveGeometry = null;
         this .convexShape     = null;
         this .concaveShape    = null;
      }

      this .convexShape ?.setContactOffset (0.001);
      this .convexShape ?.setRestOffset (0.0);

      this .concaveShape ?.setContactOffset (0.001);
      this .concaveShape ?.setRestOffset (0.0);

      if (this .getActor ())
      {
         if (this .convexShape && this .getActor () instanceof this .PhysX .PxRigidDynamic)
            this .getActor () .attachShape (this .convexShape);

         else if (this .concaveShape && this .getActor () instanceof this .PhysX .PxRigidStatic)
            this .getActor () .attachShape (this .concaveShape);
      }

      this .setEnabled (this .parentEnabled);
      this .setLocalPose (this .parentMatrix);

      this .PhysX .destroy (shapeFlags);
   },
   removeCollidableGeometry ()
   {
      if (this .getActor ())
      {
         if (this .convexShape && this .getActor () instanceof this .PhysX .PxRigidDynamic)
            this .getActor () .detachShape (this .convexShape);

         else if (this .concaveShape && this .getActor () instanceof this .PhysX .PxRigidStatic)
            this .getActor () .detachShape (this .concaveShape);
      }

      this .convexShape ?.release ();

      if (this .concaveShape !== this .convexShape)
         this .concaveShape ?.release ();
   },
   dispose ()
   {
      this .removeCollidableGeometry ();

      if (this .pose)
      {
         this .PhysX .destroy (this .pose);
         this .PhysX .destroy (this .physicsMaterial);
      }

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
