import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import GLTFPointerAliases   from "../../Parser/GLTFPointerAliases.js";
import * as Interactivity   from "../../../../node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js";

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
   this .nodes              = new Map ();
}

Object .assign (Object .setPrototypeOf (BehaviorEngine .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      // Engine

      this .fps      = 60;
      this .eventBus = new Interactivity .DOMEventBus ();
      this .engine   = new Interactivity .BasicBehaveEngine (this .fps, this .eventBus);

      this .engine .getWorld        = () => this .getWorld ();
      this .engine .startAnimation  = (... args) => this .startAnimation (... args);
      this .engine .stopAnimation   = (... args) => this .stopAnimation (... args);
      this .engine .stopAnimationAt = (... args) => this .stopAnimationAt (... args);

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
      if (this .isLive () && this ._enabled .getValue ())
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
            run   = this .isLive () && this ._enabled .getValue ();

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
         const index = +hoverabilityNode .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

         hoverabilityNode ._isOver .addInterest ("set_over__", this, index);
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
         const index = +selectabilityNode .getMetaData ("Interactivity/node", new Fields .SFInt32 (-1));

         selectabilityNode ._touchTime .addInterest ("set_touchTime__", this, index);
      }
   },
   set_animations__ ()
   {
      this .animations .length = 0;

      for (const node of this ._animations)
         this .animations .push (X3DCast (X3DConstants .TimeSensor, node) && node);

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
               index     = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation = this .animations [index];

            return [!! animation ?.isActive];
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
               index     = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation = this .animations [index];

            return [animation ?.cycleInterval ?? 0];
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
               index     = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation = this .animations [index];

            return [animation ? animation .cycleInterval * animation .fraction_changed : NaN];
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
               index     = +pointer .match (/^\/animations\/(\d+)\//) [1],
               animation = this .animations [index],
               browser   = this .getBrowser ();

            return [animation ? browser .getCurrentTime () - animation .startTime : NaN];
         },
         Function .prototype,
         "float",
         true
      );
   },
   set_nodes__ ()
   {
      this .nodes .clear ();

      for (const node of this ._nodes)
      {
         const _node = X3DCast (X3DConstants .X3DNode, node);

         if (!_node)
            continue;

         const pointers = _node .getMetaData ("Interactivity/pointer", new Fields .MFString ());

         for (const pointer of pointers)
            this .nodes .set (pointer, _node);
      }

      this .engine .registerJsonPointer (
         "/materials.length",
         () => [Array .from (this .nodes .values ())
            .filter (node => node .getType () .includes (X3DConstants .X3DMaterialNode) .length)],
         Function .prototype,
         "int",
         true
      );

      for (const [pointer, node] of this .nodes)
         this .registerJSONPointer (pointer, node);
   },
   registerJSONPointer (pointer, node)
   {
      // Register getter and setter for the property.

      const property = pointer .match (/\/nodes\/\d+\/([^/]+)$/) [1];

      switch (property)
      {
         case "matrix":
         case "globalMatrix":
         {
            if (!node .getType () .includes (X3DConstants .X3DTransformNode))
               return console .warn (`Couldn't add pointer '${pointer}' for '${node .getTypeName ()}'.`);

            this .engine .registerJsonPointer (
               pointer,
               (pointer) =>
               {
                  console .log ("get", pointer);

                  const node = this .nodes .get (pointer);

                  const matrix = new Fields .SFMatrix4f ();

                  matrix .setTransform (node .translation,
                                        node .rotation,
                                        node .scale,
                                        node .scaleOrientation,
                                        node .center);

                  return [... matrix];
               },
               Function .prototype,
               "float4x4",
               true
            );

            break;
         }
         default:
         {
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
                  console .log ("get", pointer);

                  const
                     node      = this .nodes .get (pointer),
                     field     = node .getField (GLTFPointerAliases .getAlias (pointer, node)),
                     baseColor = GLTFPointerAliases .isBaseColor (node, field);

                  switch (field .getType ())
                  {
                     case X3DConstants .SFRotation:
                        return [... field .getQuaternion ()];
                     default:
                        return baseColor ? [... field, node ._transparency .getValue ()] : [... field];
                  }
               } : () => [ ],
               field .isWritable () ? (pointer, value) =>
               {
                  const
                     node      = this .nodes .get (pointer),
                     field     = node .getField (GLTFPointerAliases .getAlias (pointer, node)),
                     baseColor = GLTFPointerAliases .isBaseColor (node, field);

                  console .log ("set", pointer, field .getName (), value);

                  if (baseColor)
                     node ._transparency = value [3];

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
                     case X3DConstants .SFColorRGBA:
                     case X3DConstants .SFMatrix3d:
                     case X3DConstants .SFMatrix3f:
                     case X3DConstants .SFMatrix4d:
                     case X3DConstants .SFMatrix4f:
                     case X3DConstants .SFQuaternion:
                     case X3DConstants .SFVec2d:
                     case X3DConstants .SFVec2f:
                     case X3DConstants .SFVec3d:
                     case X3DConstants .SFVec3f:
                     case X3DConstants .SFVec4d:
                     case X3DConstants .SFVec4f:
                        field .assign (new field .constructor (... value));
                        break;
                     case X3DConstants .SFRotation:
                        field .setQuaternion (new Fields .SFQuaternion (... value));
                        break;
                  }
               } : Function .prototype,
               type,
               !field .isWritable () // read-only
            );

            break;
         }
      }

   },
   set_over__ (index, over)
   {
      this .engine .hoverOn (over .getValue () ? index : undefined);
   },
   set_touchTime__ (index)
   {
      this .engine .select (index);
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
   startAnimation (index, startTime, stopTime, speed, callback)
   {
      const animation = this .animations [index];

      if (!animation)
         return;

      const
         currentTime = this .getBrowser () .getCurrentTime (),
         key         = Symbol ();

      animation .startTime = currentTime + startTime;
      animation .stopTime  = currentTime + stopTime;

      animation .addFieldCallback (key, "isActive", value =>
      {
         if (value)
            return;

         animation .removeFieldCallback (key, "isActive");
         callback ();
      });
   },
   stopAnimation (index)
   {
      const animation = this .animations [index];

      if (!animation)
         return;

      const currentTime = this .getBrowser () .getCurrentTime ();

      animation .stopTime = currentTime;
   },
   stopAnimationAt (index, stopTime, callback)
   {
      const animation = this .animations [index];

      if (!animation)
         return;

      const
         currentTime = this .getBrowser () .getCurrentTime (),
         key         = Symbol ();

      animation .stopTime = currentTime + stopTime;

      animation .addFieldCallback (key, "isActive", value =>
      {
         if (value)
            return;

         animation .removeFieldCallback (key, "isActive");
         callback ();
      });
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "graph",         new Fields .SFInt32 ()),
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
