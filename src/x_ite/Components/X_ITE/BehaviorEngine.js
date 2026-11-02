import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import * as Interactivity   from "../../../../node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js";

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

      console .log (this .engine);

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
      this .set_graph__ ();
      this .set_hoverability__ ();
      this .set_selectability__ ();
      this .set_animations__ ();
      this .set_nodes__ ();
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
         this .animations .push (X3DCast (X3DConstants .TimeSensor, node) && node);

      // Register JSON Pointers

      this .world = null;

      const numAnimations = this .animations .length;

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}`,
         (path) => [path],
         Function .prototype,
         "ref",
         true
      );

      this .engine .registerJsonPointer (
         `/animations/${numAnimations}/extensions/KHR_interactivity/isPlaying`,
         (path) =>
         {
            const
               index     = +path .match (/\/animations\/(\d+)\//) [1],
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
         (path) =>
         {
            const
               index     = +path .match (/\/animations\/(\d+)\//) [1],
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
         (path) =>
         {
            const
               index     = +path .match (/\/animations\/(\d+)\//) [1],
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
         (path) =>
         {
            const
               index     = +path .match (/\/animations\/(\d+)\//) [1],
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
         const x3dnode = X3DCast (X3DConstants .X3DNode, node);

         if (x3dnode)
         {
            const pointer = x3dnode .getMetaData ("Interactivity/pointer", new Fields .SFString ()) .getValue ();

            this .nodes .set (pointer, x3dnode);
         }
      }
   },
   set_over__ (nodeIndex, over)
   {
      this .engine .hoverOn (over .getValue () ? nodeIndex : undefined);
   },
   set_touchTime__ (nodeIndex)
   {
      this .engine .select (nodeIndex);
   },
   getWorld ()
   {
      return this .world ??= (() =>
      {
         return {
            animations: this .animations .map (() => undefined),
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
