import Fields           from "../../Fields.js";
import X3DNode          from "../Core/X3DNode.js";
import X3DSensorNode    from "../Core/X3DSensorNode.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import MatchCriterion   from "../../Browser/Picking/MatchCriterion.js";
import IntersectionType from "../../Browser/Picking/IntersectionType.js";
import SortOrder        from "../../Browser/Picking/SortOrder.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";
import QuickSort        from "../../../standard/Math/Algorithms/QuickSort.js";
import ObjectCache      from "../../../standard/Utility/ObjectCache.js";

const ModelMatrixCache = ObjectCache (Matrix4);

function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

function X3DPickSensorNode (executionContext)
{
   X3DSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DPickSensorNode);

   // Private properties

   this .objectType          = new Set ();
   this .intersectionType    = IntersectionType .BOUNDS;
   this .sortOrder           = SortOrder .CLOSEST;
   this .pickTargetNodes     = new Set ();
   this .modelMatrices       = [ ];
   this .targets             = [ ];
   this .targets .size       = 0;
   this .pickedTargets       = [ ];
   this .pickedTargetsSorter = new QuickSort (this .pickedTargets, compareDistance);
   this .pickedGeometries    = new Fields .MFNode (); // Must be unique for each X3DPickSensorNode.
}

Object .assign (Object .setPrototypeOf (X3DPickSensorNode .prototype, X3DSensorNode .prototype),
{
   initialize ()
   {
      this .getLive () .addInterest ("set_live__", this);

      this ._enabled          .addInterest ("set_live__",             this);
      this ._objectType       .addInterest ("set_objectType__",       this);
      this ._matchCriterion   .addInterest ("set_matchCriterion__",   this);
      this ._intersectionType .addInterest ("set_intersectionType__", this);
      this ._sortOrder        .addInterest ("set_sortOrder__",        this);
      this ._pickTarget       .addInterest ("set_pickTarget__",       this);

      this .set_objectType__ ();
      this .set_matchCriterion__ ();
      this .set_intersectionType__ ();
      this .set_sortOrder__ ();
      this .set_pickTarget__ ();
   },
   getObjectType ()
   {
      return this .objectType;
   },
   getMatchCriterion ()
   {
      return this .matchCriterion;
   },
   getIntersectionType ()
   {
      return this .intersectionType;
   },
   getSortOrder ()
   {
      return this .sortOrder;
   },
   getModelMatrices ()
   {
      return this .modelMatrices;
   },
   getTargets ()
   {
      return this .targets;
   },
   getPickShape: (() =>
   {
      const pickShapes = new WeakMap ();

      return function (geometryNode)
      {
         const pickShape = pickShapes .get (geometryNode);

         if (pickShape !== undefined)
            return pickShape;

         const
            browser             = this .getBrowser (),
            privateScene        = browser .getPrivateScene (),
            shapeNode           = privateScene .createNode ("Shape",           false),
            collidableShapeNode = privateScene .createNode ("CollidableShape", false);

         shapeNode .setPrivate (true);
         collidableShapeNode .setPrivate (true);

         shapeNode ._geometry             = geometryNode;
         collidableShapeNode ._convexHull = true;
         collidableShapeNode ._shape      = shapeNode;

         shapeNode           .setup ();
         collidableShapeNode .setup ();

         pickShapes .set (geometryNode, collidableShapeNode);

         return collidableShapeNode;
      };
   })(),
   getPickedGeometries ()
   {
      const
         targets          = this .targets,
         numTargets       = targets .size,
         pickedTargets    = this .pickedTargets,
         pickedGeometries = this .pickedGeometries;

      // Filter intersecting targets.

      pickedTargets .length = 0;

      for (let i = 0; i < numTargets; ++ i)
      {
         const target = targets [i];

         if (target .intersected)
            pickedTargets .push (target);
      }

      // No pickedTargets, return.

      if (pickedTargets .length === 0)
      {
         pickedGeometries .length = 0;

         return pickedGeometries;
      }

      // Return sorted pickedTargets.

      switch (this .sortOrder)
      {
         case SortOrder .CLOSEST:
         {
            this .pickedTargetsSorter .sort (0, pickedTargets .length);

            // Proceed with next case:
         }
         case SortOrder .ANY:
         {
            pickedGeometries [0] = null;

            const numPickedTargets = pickedTargets .length;

            for (let i = 0; i < numPickedTargets; ++ i)
            {
               if (pickedGeometries [0] = this .getPickedGeometry (pickedTargets [i]))
                  break;
            }

            pickedGeometries .length = 1;
            break;
         }
         case SortOrder .ALL_SORTED:
         {
            this .pickedTargetsSorter .sort (0, pickedTargets .length);

            // Proceed with next case:
         }
         case SortOrder .ALL:
         {
            const numPickedTargets = pickedTargets .length;

            for (let i = 0; i < numPickedTargets; ++ i)
               pickedGeometries [i] = this .getPickedGeometry (pickedTargets [i]);

            pickedGeometries .length = numPickedTargets;
            break;
         }
      }

      pickedGeometries .assign (pickedGeometries .filter (node => node));

      return pickedGeometries;
   },
   getPickedGeometry (target)
   {
      const geometryNode = target .geometryNode;

      if (geometryNode .isPrivate ())
         return null;

      if (geometryNode .getExecutionContext () .isPrivate ())
         return null;

      return geometryNode;
   },
   getPickedTargets ()
   {
      return this .pickedTargets;
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue () && ! this .objectType .has ("NONE"))
      {
         this .getBrowser () .addPickSensor (this);
         this .setPickableObject (true);
      }
      else
      {
         this .getBrowser () .removePickSensor (this);
         this .setPickableObject (false);
      }
   },
   set_objectType__ ()
   {
      this .objectType .clear ();

      for (const objectType of this ._objectType)
         this .objectType .add (objectType);

      this .set_live__ ();
   },
   set_matchCriterion__: (() =>
   {
      const matchCriterions = new Map ([
         ["MATCH_ANY",      MatchCriterion .MATCH_ANY],
         ["MATCH_EVERY",    MatchCriterion .MATCH_EVERY],
         ["MATCH_ONLY_ONE", MatchCriterion .MATCH_ONLY_ONE],
      ]);

      return function ()
      {
         this .matchCriterion = matchCriterions .get (this ._matchCriterion .getValue ())
            ?? MatchCriterion .MATCH_ANY;
      };
   })(),
   set_intersectionType__: (() =>
   {
      const intersectionTypes = new Map ([
         ["BOUNDS",   IntersectionType .BOUNDS],
         ["GEOMETRY", IntersectionType .GEOMETRY],
      ]);

      return function ()
      {
         this .intersectionType = intersectionTypes .get (this ._intersectionType .getValue ())
            ?? IntersectionType .BOUNDS;
      };
   })(),
   set_sortOrder__: (() =>
   {
      const sortOrders = new Map ([
         ["ANY",        SortOrder .ANY],
         ["CLOSEST",    SortOrder .CLOSEST],
         ["ALL",        SortOrder .ALL],
         ["ALL_SORTED", SortOrder .ALL_SORTED],
      ]);

      return function ()
      {
         this .sortOrder = sortOrders .get (this ._sortOrder .getValue ())
            ?? SortOrder .CLOSEST;
      };
   })(),
   set_pickTarget__ ()
   {
      this .pickTargetNodes .clear ();

      for (const node of this ._pickTarget)
      {
         try
         {
            const
               innerNode = node .getValue () .getInnerNode (),
               type      = innerNode .getType ();

            for (let t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .Inline:
                  case X3DConstants .Shape:
                  case X3DConstants .X3DGroupingNode:
                  {
                     this .pickTargetNodes .add (innerNode);
                     break;
                  }
                  default:
                     continue;
               }
            }
         }
         catch
         { }
      }
   },
   traverse (type, renderObject)
   {
      this .modelMatrices .push (ModelMatrixCache .pop () .assign (renderObject .getModelViewMatrix () .get ()));
   },
   collect (geometryNode, modelMatrix, pickingHierarchy)
   {
      const
         pickTargetNodes = this .pickTargetNodes,
         haveTarget      = pickingHierarchy .some (node => pickTargetNodes .has (node));

      if (!haveTarget)
         return;

      const targets = this .targets;

      let target;

      if (targets .size < targets .length)
      {
         target = targets [targets .size];
      }
      else
      {
         targets .push (target = {
            modelMatrix: new Matrix4 (),
            pickedPoint: [ ],
            intersections: [ ],
         });
      }

      ++ targets .size;

      target .intersected           = false;
      target .geometryNode          = geometryNode;
      target .pickedPoint .length   = 0;
      target .intersections .length = 0;
      target .modelMatrix .assign (modelMatrix);
   },
   process ()
   {
      for (const modelMatrix of this .modelMatrices)
         ModelMatrixCache .push (modelMatrix);

      this .modelMatrices .length = 0;
      this .targets .size         = 0;
   },
});

Object .defineProperties (X3DPickSensorNode, X3DNode .getStaticProperties ("X3DPickSensorNode", "Picking", 1));

export default X3DPickSensorNode;
