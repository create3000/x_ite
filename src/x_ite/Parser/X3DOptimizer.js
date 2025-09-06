import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../standard/Math/Geometry/Box3.js";
import X3DConstants from "../Base/X3DConstants.js";

function X3DOptimizer () { }

Object .assign (X3DOptimizer .prototype,
{
   removeEmptyGroups: false,
   combineGroupingNodes: false,
   optimizeInterpolators: false,
   optimizeSceneGraph (nodes)
   {
      const removedNodes = [ ];

      nodes .setValue (this .optimizeNodes (null, nodes, true, removedNodes));

      removedNodes
         .filter (node => node .getValue () .getCloneCount () === 0)
         .forEach (node => node .dispose ());
   },
   optimizeNodes (parent, nodes, combine, removedNodes)
   {
      return Array .from (nodes) .flatMap (node => this .optimizeNode (parent, node, combine, removedNodes));
   },
   optimizeNode (parent, node, combine, removedNodes)
   {
      if (!node)
         return [ ];

      if (this .optimizeInterpolators)
         this .removeInterpolatorsWithOnlyOneValue (node, removedNodes);

      switch (node .getNodeTypeName ())
      {
         case "Transform":
         {
            node .children = this .optimizeNodes (node, node .children, true, removedNodes);

            if (this .removeEmptyGroups)
            {
               if (node .children .length === 0)
                  return [ ];
            }

            break;
         }
         case "Anchor":
         case "Group":
         {
            node .children = this .optimizeNodes (node, node .children, true, removedNodes);

            return this .removeIfNoChildren (node, removedNodes);
         }
         case "Collision":
         case "LOD":
         case "Switch":
         {
            this .optimizeNodes (node, node .children, false, removedNodes);

            return this .removeIfNoChildren (node, removedNodes);
         }
         case "HAnimJoint":
         case "HAnimSegment":
         case "HAnimSite":
         {
            node .children = this .optimizeNodes (node, node .children, true, removedNodes);

            switch (parent ?.getNodeTypeName ())
            {
               case "HAnimHumanoid":
               case "HAnimJoint":
               case "HAnimSegment":
               case "HAnimSite":
               {
                  return node;
               }
               default:
               {
                  removedNodes .push (node);

                  return [ ];
               }
            }
         }
         case "HAnimHumanoid":
         {
            node .skeleton = this .optimizeNodes (node, node .skeleton, true, removedNodes);
            node .skin     = this .optimizeNodes (node, node .skin,     true, removedNodes);

            return this .removeIfNoChildren (node, removedNodes);
         }
         default:
         {
            return node;
         }
      }

      if (!combine)
         return node;

      if (!this .combineGroupingNodes)
         return node;

      if (node .getValue () .hasRoutes ())
         return node;

      if (node .getNodeTypeName () === "Transform")
      {
         node = this .combineSingleChild (node, removedNodes);

         if (!node .translation ?.getValue () .equals (Vector3 .ZERO))
            return node;

         if (!node .rotation ?.getValue () .equals (Rotation4 .IDENTITY))
            return node;

         if (!node .scale ?.getValue () .equals (Vector3 .ONE))
            return node;
      }

      if (!node .children)
         return node;

      const children = Array .from (node .children);

      removedNodes .push (this .removeChildren (node));

      return children;
   },
   removeChildren (node)
   {
      for (const field of node .getValue () .getFields ())
      {
         switch (field .getType ())
         {
            case X3DConstants .SFNode:
               field .setValue (null);
               break;
            case X3DConstants .MFNode:
               field .length = 0;
               break;
         }
      }

      return node;
   },
   removeIfNoChildren (node, removedNodes)
   {
      if (!this .removeEmptyGroups)
         return node;

      switch (node .getNodeTypeName ())
      {
         case "HAnimHumanoid":
         {
            if (node .skeleton .length || node .skin .length)
               return node;

            break;
         }
         default:
         {
            if (node .children .length !== 0)
               return node;

            break;
         }
      }

      removedNodes .push (node);

      return [ ];
   },
   removeInterpolatorsWithOnlyOneValue (node, removedNodes)
   {
      for (const field of node .getValue () .getFields ())
      {
         if (field .getInputRoutes () .size !== 1)
            continue;

         const
            route      = Array .from (field .getInputRoutes ()) [0],
            sourceNode = route .sourceNode;

         if (!sourceNode .getNodeType () .includes (X3DConstants .X3DInterpolatorNode))
            continue;

         if (sourceNode .key .length !== 1)
            continue;

         node [route .destinationField] = sourceNode .keyValue [0];

         removedNodes .push (this .removeChildren (sourceNode));

         route .dispose ();
      }
   },
   combineSingleChild (node, removedNodes)
   {
      if (node .children .length !== 1)
         return node;

      if (!node .visible)
         return node;

      const child = node .children [0];

      if (child .getValue () .getCloneCount () > 1)
         return node;

      if (child .getValue () .hasRoutes ())
         return node;

      switch (child .getNodeTypeName ())
      {
         case "Transform":
         case "HAnimHumanoid":
            return this .combineTransform (node, child, removedNodes);
         case "DirectionalLight":
         case "PointLight":
         case "SpotLight":
            return this .combineLight (node, child, removedNodes);
         case "Viewpoint":
         case "OrthoViewpoint":
            return this .combineViewpoint (node, child, removedNodes);
         default:
            return node;
      }
   },
   combineTransform (node, child, removedNodes)
   {
      // Combine single Transform nodes.

      const
         translation      = new Vector3 (),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1),
         scaleOrientation = new Rotation4 (),
         nodeMatrix       = new Matrix4 (),
         childMatrix      = new Matrix4 ();

      nodeMatrix .set (node .translation .getValue (),
                       node .rotation .getValue (),
                       node .scale .getValue (),
                       node .scaleOrientation .getValue (),
                       node .center .getValue ());

      childMatrix .set (child .translation .getValue (),
                        child .rotation .getValue (),
                        child .scale .getValue (),
                        child .scaleOrientation .getValue (),
                        child .center .getValue ());

      nodeMatrix .multLeft (childMatrix);

      nodeMatrix .get (translation, rotation, scale, scaleOrientation, child .center .getValue ());

      child .translation      = translation;
      child .rotation         = rotation;
      child .scale            = scale;
      child .scaleOrientation = scaleOrientation;

      if (!child .getNodeTypeName () && node .getNodeTypeName ())
      {
         const executionContext = child .getExecutionContext ();

         executionContext .addNamedNode (executionContext .getUniqueName (node .getNodeTypeName ()), child);
      }

      removedNodes .push (this .removeChildren (node));

      return child;
   },
   combineLight (node, child, removedNodes)
   {
      // Combine single light nodes.

      const nodeMatrix = new Matrix4 ();

      nodeMatrix .set (node .translation .getValue (),
                       node .rotation .getValue (),
                       node .scale .getValue (),
                       node .scaleOrientation .getValue (),
                       node .center .getValue ());

      if (child .location)
         child .location = nodeMatrix .multVecMatrix (child .location .getValue ());

      if (child .direction)
         child .direction = nodeMatrix .multDirMatrix (child .direction .getValue ()) .normalize ();

      removedNodes .push (this .removeChildren (node));

      return child;
   },
   combineViewpoint (node, child, removedNodes)
   {
      // Combine single viewpoint nodes.

      const
         nodeMatrix      = new Matrix4 (),
         viewpointMatrix = new Matrix4 (),
         translation     = new Vector3 (),
         rotation        = new Rotation4 ();

      nodeMatrix .set (node .translation .getValue (),
                       node .rotation .getValue (),
                       node .scale .getValue (),
                       node .scaleOrientation .getValue (),
                       node .center .getValue ());

      viewpointMatrix .set (child .position .getValue (),
                            child .orientation .getValue ());

      viewpointMatrix
         .multRight (nodeMatrix)
         .get (translation, rotation);

      child .position         = translation;
      child .orientation      = rotation;
      child .centerOfRotation = nodeMatrix .multVecMatrix (child .centerOfRotation .getValue ());

      removedNodes .push (this .removeChildren (node));

      return child;
   },
   viewpointsCenterOfRotation (scene)
   {
      const
         bbox        = scene .getBBox (new Box3 ()),
         modelMatrix = new Matrix4 (),
         seen        = new Set ();

      this .viewpointsCenterOfRotationNodes (scene .rootNodes, bbox, modelMatrix, seen);
   },
   viewpointsCenterOfRotationNodes (nodes, bbox, modelMatrix, seen)
   {
      for (const node of nodes)
         this .viewpointsCenterOfRotationNode (node ?.getValue (), bbox, modelMatrix, seen);
   },
   viewpointsCenterOfRotationNode (node, bbox, modelMatrix, seen)
   {
      if (!node)
         return;

      if (seen .has (node))
         return;

      seen .add (node);

      if (node .getMatrix)
         modelMatrix = modelMatrix .copy () .multLeft (node .getMatrix ());

      switch (node .getType () .at (-1))
      {
         case X3DConstants .Viewpoint:
         case X3DConstants .OrthoViewpoint:
         {
            node ._centerOfRotation = modelMatrix .copy () .inverse () .multVecMatrix (bbox .center);
            break;
         }
      }

      for (const field of node .getFields ())
      {
         switch (field .getType ())
         {
            case X3DConstants .SFNode:
               this .viewpointsCenterOfRotationNode (field .getValue (), bbox, modelMatrix, seen);
               break;
            case X3DConstants .MFNode:
               this .viewpointsCenterOfRotationNodes (field, bbox, modelMatrix, seen);
               break;
         }
      }
   },
});

export default X3DOptimizer;
