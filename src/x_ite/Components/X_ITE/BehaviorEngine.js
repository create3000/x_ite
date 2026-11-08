import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import GLTFPointerAliases   from "../../Parser/GLTFPointerAliases.js";
import * as Interactivity   from "../../../../node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";
import Color4               from "../../../standard/Math/Numbers/Color4.js";
import Matrix3              from "../../../standard/Math/Numbers/Matrix3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Quaternion           from "../../../standard/Math/Numbers/Quaternion.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

const
   _cycleInterval = Symbol (),
   _active        = Symbol (),
   _doneCallback  = Symbol (),
   _animation     = Symbol ();

const Types = new Map ([
   [X3DConstants .SFBool,       "bool"],
   [X3DConstants .SFColor,      "float3"],
   [X3DConstants .SFColorRGBA,  "float4"],
   [X3DConstants .SFDouble,     "float"],
   [X3DConstants .SFFloat,      "float"],
   [X3DConstants .SFInt32,      "int"],
   [X3DConstants .SFMatrix3d,   "float3x3"],
   [X3DConstants .SFMatrix3f,   "float3x3"],
   [X3DConstants .SFMatrix4d,   "float4x4"],
   [X3DConstants .SFMatrix4f,   "float4x4"],
   [X3DConstants .SFQuaternion, "float4"],
   [X3DConstants .SFRotation,   "float4"],
   [X3DConstants .SFTime,       "float"],
   [X3DConstants .SFVec2d,      "float2"],
   [X3DConstants .SFVec2f,      "float2"],
   [X3DConstants .SFVec3d,      "float3"],
   [X3DConstants .SFVec3f,      "float3"],
   [X3DConstants .SFVec4d,      "float4"],
   [X3DConstants .SFVec4f,      "float4"],
]);

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function BehaviorEngine (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .BehaviorEngine);

   // Private properties

   this .hoverabilityNodes  = [ ];
   this .selectabilityNodes = [ ];
   this .animations         = [ ];
   this .transformNodes     = new Map ();
   this .parents            = new Map ();
   this .pointers           = new Map ();
   this .cache              = new Map ();
}

Object .assign (Object .setPrototypeOf (BehaviorEngine .prototype, X3DChildNode .prototype),
{
   Color3: new Color3 (),
   Color4: new Color4 (),
   Matrix3: new Matrix3 (),
   Matrix4: new Matrix4 (),
   Quaternion: new Quaternion (),
   Rotation4: new Rotation4 (),
   Vector2: new Vector2 (),
   Vector3: new Vector3 (),
   Vector4: new Vector4 (),
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      // Engine

      this .fps      = 60;
      this .eventBus = new Interactivity .DOMEventBus ();
      this .engine   = new Interactivity .BasicBehaveEngine (this .fps, this .eventBus);

      this .engine .getWorld           = () => this .getWorld ();
      this .engine .startAnimation     = (... args) => this .startAnimation (... args);
      this .engine .stopAnimation      = (... args) => this .stopAnimation (... args);
      this .engine .stopAnimationAt    = (... args) => this .stopAnimationAt (... args);
      this .engine .getParentNodeIndex = (... args) => this .getParentNodeIndex (... args);

      // Events

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled       .addInterest ("set_enabled__",       this);
      this ._graph         .addInterest ("set_graph__",         this);
      this ._graphs        .addInterest ("set_graph__",         this);
      this ._hoverability  .addInterest ("set_hoverability__",  this);
      this ._selectability .addInterest ("set_selectability__", this);
      this ._animations    .addInterest ("set_animations__",    this);
      this ._nodes         .addInterest ("set_nodes__",         this);

      this .set_enabled__ ();
      this .set_hoverability__ ();
      this .set_selectability__ ();
      this .set_animations__ ();
      this .set_nodes__ ();
      this .set_graph__ ();
   },
   set_enabled__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
         this .engine .playEventQueue ();
      else
         this .engine .pauseEventQueue ();
   },
   set_graph__ ()
   {
      try
      {
         const
            graph = this ._graphs [this ._graph .getValue ()],
            run   = this .getLive () .getValue () && this ._enabled .getValue ();

         this .engine .clearEventList ();
         this .engine .clearPointerInterpolation ();
         this .engine .clearVariableInterpolation ();
         this .engine .clearScheduledDelays ();
         this .engine .clearValueEvaluationCache ();

         this .engine .loadBehaveGraph (JSON .parse (graph), run);
      }
      catch (error)
      {
         console .error (new Error (`${this .getTypeName ()}: Couldn't parse graph ${this ._graph}.`, { cause: error }));

         this .engine .loadBehaveGraph ({ }, false);
      }
   },
   set_hoverability__ ()
   {
      for (const hoverabilityNode of this .hoverabilityNodes)
         hoverabilityNode ._isOver .removeInterest ("set_over__", this);

      this .hoverabilityNodes .length = 0;

      for (const node of this ._hoverability)
      {
         const hoverabilityNode = X3DCast (X3DConstants .TouchSensor, node);

         if (hoverabilityNode)
            this .hoverabilityNodes .push (hoverabilityNode);
      }

      for (const hoverabilityNode of this .hoverabilityNodes)
      {
         const nodeIndex = +hoverabilityNode .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

         hoverabilityNode ._isOver .addInterest ("set_over__", this, nodeIndex);
      }
   },
   set_selectability__ ()
   {
      for (const selectabilityNode of this .selectabilityNodes)
         selectabilityNode ._touchTime .removeInterest ("set_touchTime__", this);

      this .selectabilityNodes .length = 0;

      for (const node of this ._selectability)
      {
         const selectabilityNode = X3DCast (X3DConstants .TouchSensor, node);

         if (selectabilityNode)
            this .selectabilityNodes .push (selectabilityNode);
      }

      for (const selectabilityNode of this .selectabilityNodes)
      {
         const nodeIndex = +selectabilityNode .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

         selectabilityNode ._touchTime .addInterest ("set_touchTime__", this, nodeIndex);
      }
   },
   set_animations__ ()
   {
      this .animations .length = 0;

      for (const node of this ._animations)
         this .animations .push (X3DCast (X3DConstants .TimeSensor, node));

      for (const timeSensor of this .animations)
         timeSensor [_cycleInterval] = timeSensor ._cycleInterval .getValue ();

      // Register JSON Pointers

      this .world = null;

      const numAnimations = this .animations .length;

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}`,
         (pointer) => [pointer],
         Function .prototype,
         "ref",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/isPlaying`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               timeSensor     = this .animations [animationIndex];

            return [!! timeSensor ?.[_active]];
         },
         Function .prototype,
         "bool",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/minTime`,
         () => [0],
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/maxTime`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               timeSensor     = this .animations [animationIndex];

            return [timeSensor ?.[_cycleInterval] ?? 0];
         },
         Function .prototype,
         "float",
         true
      );

      // The playhead returns a number between 0 and maxTime

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/playhead`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               timeSensor     = this .animations [animationIndex];

            return [timeSensor ? timeSensor ._fraction_changed .getValue () * timeSensor ._cycleInterval .getValue () : NaN];
         },
         Function .prototype,
         "float",
         true
      );

      // The virtual playhead return the current time on the infinite timeline. Can be negative or larger than maxTime

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/virtualPlayhead`,
         (pointer) =>
         {
            const
               animationIndex = +pointer .match (/^\/animations\/(\d+)\//) [1],
               timeSensor     = this .animations [animationIndex],
               browser        = this .getBrowser ();

            return [timeSensor ? browser .getCurrentTime () - timeSensor ._startTime .getValue () : NaN];
         },
         Function .prototype,
         "float",
         true
      );
   },
   set_nodes__ ()
   {
      this .transformNodes .clear ();
      this .parents        .clear ();
      this .pointers       .clear ();
      this .cache          .clear ();

      for (const node of this ._nodes)
      {
         const _node = X3DCast (X3DConstants .X3DNode, node);

         if (!_node)
            continue;

         const matrixNode = X3DCast (X3DConstants .X3DTransformMatrix3DNode, node);

         if (matrixNode)
         {
            const nodeIndex = +matrixNode .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

            if (nodeIndex >= 0)
            {
               this .transformNodes .set (nodeIndex, _node);

               for (const child of matrixNode ._children)
               {
                  const childNode = X3DCast (X3DConstants .X3DTransformMatrix3DNode, child);

                  if (childNode)
                     this .parents .set (childNode, nodeIndex);
               }
            }
         }

         const pointers = _node .getMetaData ("Interactivity/pointer", new Fields .MFString ());

         for (const pointer of pointers)
            this .pointers .set (pointer, _node);
      }

      // Register material pointers.

      const numMaterials = Array .from (this .pointers .keys (),
            key => key .match (/^\/materials\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the number of material nodes.
      this .engine .registerJsonPointer (
         "/materials.length",
         () => [numMaterials],
         Function .prototype,
         "int",
         true
      );

      // Register meshes pointers.

      const numMeshes = Array .from (this .pointers .keys (),
            key => key .match (/^\/meshes\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      const numPrimitives = Array .from (this .pointers .keys (),
            key => key .match (/^\/meshes\/\d+\/primitives\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the material index of the mesh.
      this .engine .registerJsonPointer (
         `/meshes/${numMeshes}/primitives/${numPrimitives}/material`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  materialNode  = this .pointers .get (pointer),
                  materialIndex = +materialNode .getMetaData ("Interactivity/material", new Fields .SFInt32 (-1));

               return [`/materials/${materialIndex}`];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // Register node pointers.

      const numNodes = Array .from (this .pointers .keys (),
            key => key .match (/^\/nodes\/(\d+)\//) ?.[1] ?? -1)
         .reduce ((p, c) => Math .max (p, c), -1) + 1;

      // Returns the parent node of the node.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/parent`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex       = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  parentNodeIndex = this .getParentNodeIndex (nodeIndex);

               if (parentNodeIndex !== undefined)
                  return [`/nodes/${parentNodeIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // Returns the number of child nodes.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/children.length`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  node      = this .transformNodes .get (nodeIndex);

               const numChildren = node ?._children
                  .reduce ((count, child) => count + !!child ?.getValue () .getType ()
                     .includes (X3DConstants .X3DTransformMatrix3DNode), 0);

               return [numChildren];
            });
         },
         Function .prototype,
         "int",
         true
      );

      // Returns the child node of the node.
      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/children/${numNodes}`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  match      = pointer .match (/^\/nodes\/(\d+)\/children\/(\d+)/),
                  nodeIndex  = +match [1],
                  childIndex = +match [2],
                  node       = this .transformNodes .get (nodeIndex);

               const children = node ._children .flatMap (child => child ?.getValue ())
                  .filter (childNode => childNode ?.getType ()
                     .includes (X3DConstants .X3DTransformMatrix3DNode));

               const
                  childNode      = children [childIndex],
                  childNodeIndex = +childNode ?.getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

               if (childNodeIndex >= 0)
                  return [`/nodes/${childNodeIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/matrix`,
         (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const node = this .pointers .get (pointer);

            return [... node .getMatrix ()];
         },
         Function .prototype,
         "float4x4",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/globalMatrix`,
         (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const
               node      = this .pointers .get (pointer),
               nodeIndex = +node .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

            return [... this .getModelMatrix (nodeIndex, this .Matrix4 .assign (Matrix4 .IDENTITY))];
         },
         Function .prototype,
         "float4x4",
         true
      );

      this .engine .registerJsonPointer (
         `/nodes/${numNodes}/mesh`,
         (pointer) =>
         {
            return this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
                  node      = this .transformNodes .get (nodeIndex),
                  meshIndex = +node .getMetaData ("Interactivity/mesh", new Fields .SFInt32 (-1));

               if (meshIndex >= 0)
                  return [`/meshes/${meshIndex}`];

               return [undefined];
            });
         },
         Function .prototype,
         "ref",
         true
      );

      // // Register pointers for the node weights.

      // this .engine .registerJsonPointer (
      //    `/nodes/${numNodes}/weights.length`,
      //    (pointer) =>
      //    {
      //       return this .cache .getOrInsertComputed (pointer, () =>
      //       {
      //          const
      //             nodeIndex = +pointer .match (/^\/nodes\/(\d+)\//) [1],
      //             weights   = this .pointers .get (`/nodes/${nodeIndex}/weights`);

      //          return [weights ?._value .length];
      //       });
      //    },
      //    Function .prototype,
      //    "int",
      //    true
      // );

      // this .engine .registerJsonPointer (
      //    `/nodes/${numNodes}/weights`,
      //    (pointer) =>
      //    {
      //       console .log (pointer)
      //    },
      //    (pointer, value) =>
      //    {
      //       console .log (pointer)
      //    },
      //    "float",
      //    false
      // );

      // console .log (this .engine .resolveJsonPtr ("/nodes/947/weights/0") ?.getterCallback ("/nodes/947/weights/0"));

      // Register pointers for the active camera.

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/position`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode)
               return [NaN, NaN, NaN];

            viewpointNode .getCameraSpaceMatrix () .getTransform (this .Vector3);

            return [... this .Vector3];
         },
         Function .prototype,
         "float3",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/rotation`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode)
               return [NaN, NaN, NaN, NaN];

            viewpointNode .getCameraSpaceMatrix () .getTransform (null, this .Rotation4);

            return [... this .Rotation4 .getQuaternion (this .Quaternion)];
         },
         Function .prototype,
         "float4",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/yfov`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getUserFieldOfView ()];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/znear`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getNearDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/zfar`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint) ?? true)
               return [NaN];

            return [viewpointNode .getFarDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/perspective/aspectRatio`,
         () =>
         {
            const layerNode = this .getBrowser () .getActiveLayer ();

            if (!layerNode)
               return [NaN];

            const viewport = layerNode .getViewport () .getRectangle ();

            return [viewport [2] / viewport [3]];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/znear`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getNearDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/zfar`,
         () =>
         {
            const
               browser       = this .getBrowser (),
               viewpointNode = browser .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getFarDistance (browser .getActiveNavigationInfo ())];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/xmag`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getUserSizeX () / 2];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/ymag`,
         () =>
         {
            const viewpointNode = this .getBrowser () .getActiveViewpoint ();

            if (!viewpointNode ?.getType () .includes (X3DConstants .OrthoViewpoint))
               return [NaN];

            return [viewpointNode .getUserSizeY () / 2];
         },
         Function .prototype,
         "float",
         true
      );

      this .engine .registerJsonPointer (
         `/extensions/KHR_interactivity/activeCamera/orthographic/aspectRatio`,
         () =>
         {
            const layerNode = this .getBrowser () .getActiveLayer ();

            if (!layerNode)
               return [NaN];

            const viewport = layerNode .getViewport () .getRectangle ();

            return [viewport [2] / viewport [3]];
         },
         Function .prototype,
         "float",
         true
      );

      // Register common node pointers.

      const nums = {
         materials: numMaterials,
         meshes: numMeshes,
         nodes: numNodes,
      };

      const pointers = new Map (Array .from (this .pointers, ([pointer, node]) =>
      {
         return [
            pointer .replace (/^\/([^/]+)\/\d+\//, (m, p1) => `/${p1}/${nums [p1] ?? 0}/`),
            node,
         ];
      }));

      pointers .delete (`/nodes/${numNodes}/matrix`);
      pointers .delete (`/nodes/${numNodes}/globalMatrix`);

      for (const [pointer, node] of pointers)
         this .registerJsonPointer (pointer, node);

      // DEBUG
      // console .log (this .engine .resolveJsonPtr ("/extensions/KHR_interactivity/activeCamera/perspective/yfov") ?.getterCallback ("/extensions/KHR_interactivity/activeCamera/perspective/yfov"));
   },
   registerJsonPointer (pointer, node)
   {
      // Register getter and setter for the property.

      if (/(?:^\/meshes\/)/ .test (pointer))
         return;

      const
         field     = node .getField (GLTFPointerAliases .getAlias (pointer, node)),
         baseColor = GLTFPointerAliases .isBaseColor (node, field),
         type      = baseColor ? "float4" : Types .get (field .getType ());

      if (!type)
         return;

      this .engine .registerJsonPointer (
         pointer,
         field .isReadable () ? (pointer) =>
         {
            // if (DEVELOPMENT)
            //    console .log ("get", pointer);

            const [baseColor, field, transparency] = this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  node      = this .pointers .get (pointer),
                  field     = node .getField (GLTFPointerAliases .getAlias (pointer, node)),
                  baseColor = GLTFPointerAliases .isBaseColor (node, field);

               return [baseColor, field, node ._transparency];
            });

            switch (field .getType ())
            {
               case X3DConstants .SFBool:
               case X3DConstants .SFDouble:
               case X3DConstants .SFFloat:
               case X3DConstants .SFInt32:
               case X3DConstants .SFTime:
                  return [field .getValue ()];
               case X3DConstants .SFColor:
                  return baseColor ? [... field, 1 - transparency .getValue ()] : [... field];
               case X3DConstants .SFRotation:
                  return [... field .getValue () .getQuaternion (this .Quaternion)];
               default:
                  return [... field];
            }
         } : () => [ ],
         field .isWritable () ? (pointer, value) =>
         {
            const [baseColor, field, transparency] = this .cache .getOrInsertComputed (pointer, () =>
            {
               const
                  node      = this .pointers .get (pointer),
                  field     = node .getField (GLTFPointerAliases .getAlias (pointer, node)),
                  baseColor = GLTFPointerAliases .isBaseColor (node, field);

               return [baseColor, field, node ._transparency];
            });

            // if (DEVELOPMENT)
            //    console .log ("set", pointer, field .getName (), value);

            switch (field .getType ())
            {
               case X3DConstants .SFBool:
               case X3DConstants .SFDouble:
               case X3DConstants .SFFloat:
               case X3DConstants .SFInt32:
               case X3DConstants .SFTime:
                  field .setValue (value);
                  break;
               case X3DConstants .SFColor:
               {
                  field .setValue (this .Color3 .set (... value));

                  if (baseColor)
                     transparency .setValue (1 - value [3]);

                  break;
               }
               case X3DConstants .SFColorRGBA:
                  field .setValue (this .Color4 .set (... value));
                  break;
               case X3DConstants .SFMatrix3d:
               case X3DConstants .SFMatrix3f:
                  field .setValue (this .Matrix3 .set (... value));
                  break;
               case X3DConstants .SFMatrix4d:
               case X3DConstants .SFMatrix4f:
                  field .setValue (this .Matrix4 .set (... value));
                  break;
               case X3DConstants .SFQuaternion:
                  field .setValue (this .Quaternion .set (... value));
                  break;
               case X3DConstants .SFRotation:
                  field .setQuaternion (this .Quaternion .set (... value));
                  break;
               case X3DConstants .SFVec2d:
               case X3DConstants .SFVec2f:
                  field .setValue (this .Vector2 .set (... value));
                  break;
               case X3DConstants .SFVec3d:
               case X3DConstants .SFVec3f:
                  field .setValue (this .Vector3 .set (... value));
                  break;
               case X3DConstants .SFVec4d:
               case X3DConstants .SFVec4f:
                  field .setValue (this .Vector4 .set (... value));
                  break;
            }
         } : Function .prototype,
         type,
         !field .isWritable () // read-only
      );
   },
   set_over__ (nodeIndex, over)
   {
      const hit = this .getBrowser () .getHit ();

      this .engine .hoverOn (over .getValue () ? this .getHitNodeIndex (hit, nodeIndex) : undefined);
   },
   set_touchTime__ (nodeIndex)
   {
      const hit = this .getBrowser () .getHit ();

      // Pass nodeIndex, hitPoint and hitRay.point.

      this .engine .select (this .getHitNodeIndex (hit, nodeIndex), 0, [... hit .point], [... hit .ray .point]);

      if (DEVELOPMENT)
         console .log ("select", nodeIndex, this .getHitNodeIndex (hit, nodeIndex));
   },
   getWorld ()
   {
      return this .world ??= (() =>
      {
         return {
            animations: new Array (this .animations .length),
         };
      })();
   },
   startAnimation (animationIndex, startTime, stopTime, speed, endCallback)
   {
      const timeSensor = this .animations [animationIndex];

      if (!timeSensor)
         return;

      const
         currentTime    = this .getBrowser () .getCurrentTime (),
         cycleInterval  = timeSensor [_cycleInterval],
         signedDuration = (stopTime - startTime) % cycleInterval;

      if (startTime < 0 || startTime > cycleInterval)
         startTime = Algorithm .interval (startTime, 0, cycleInterval);

      if (Number .isFinite (stopTime))
      {
         if (stopTime < 0 || stopTime > cycleInterval)
            stopTime = startTime + signedDuration;
      }

      const
         duration = Math .abs (signedDuration),
         reverse  = stopTime < startTime;

      console .log ("start", animationIndex, startTime, stopTime, cycleInterval, startTime === stopTime)

      timeSensor ._cycleInterval = cycleInterval * speed;
      timeSensor ._reverse       = reverse;
      timeSensor ._range [0]     = startTime / cycleInterval;
      timeSensor ._startTime     = currentTime;

      if (Number .isFinite (duration))
      {
         timeSensor ._range [2] = stopTime / cycleInterval;

         if (reverse)
            timeSensor ._range [2] = 1 - timeSensor ._range [2];
      }
      else
      {
         timeSensor ._loop = true;
      }

      timeSensor [_active]       = true;
      timeSensor [_doneCallback] = endCallback;

      timeSensor ._isActive .addFieldCallback (_animation, value =>
      {
         if (value)
            return;

         timeSensor ._isActive .removeFieldCallback (_animation);

         timeSensor [_active] = false;

         timeSensor ._cycleInterval = cycleInterval;
         timeSensor ._loop          = false;
         timeSensor ._range         = [0, 0, 1];

         timeSensor [_doneCallback] ();

         console .log ("start done", animationIndex, timeSensor ._fraction_changed .getValue ())
      });
   },
   stopAnimation (animationIndex)
   {
      const timeSensor = this .animations [animationIndex];

      if (!timeSensor)
         return;

      console .log ("stop", animationIndex)

      timeSensor ._stopTime = this .getBrowser () .getCurrentTime ();
   },
   stopAnimationAt (animationIndex, stopTime, stopCallback)
   {
      const timeSensor = this .animations [animationIndex];

      if (!timeSensor)
         return;

      if (!timeSensor [_active])
         return;

      if (stopTime >= timeSensor [_cycleInterval])
         return;

      timeSensor ._range [2] = stopTime / timeSensor [_cycleInterval];

      timeSensor [_doneCallback] = stopCallback;

      console .log ("stop at", animationIndex, stopTime)
   },
   getHitNodeIndex (hit, nodeIndex)
   {
      const
         shapeParent = hit .shapeParent,
         parentIndex = +shapeParent .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

      if (parentIndex >= 0)
         nodeIndex = parentIndex;

      return nodeIndex;
   },
   getParentNodeIndex (nodeIndex)
   {
      return this .parents .get (this .transformNodes .get (nodeIndex));
   },
   getModelMatrix (nodeIndex, modelMatrix)
   {
      let node;

      while ((node = this .transformNodes .get (nodeIndex)))
      {
         modelMatrix .multRight (node .getMatrix ());

         nodeIndex = this .parents .get (node);
      }

      return modelMatrix;
   },
});

Object .defineProperties (BehaviorEngine,
{
   ... X3DNode .getStaticProperties ("BehaviorEngine", "X_ITE", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graph",         new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graphs",        new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "hoverability",  new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "selectability", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "animations",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "nodes",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default BehaviorEngine;
