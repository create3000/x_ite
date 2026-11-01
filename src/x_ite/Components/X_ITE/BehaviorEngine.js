import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import * as Interactivity   from "../../../../node_modules/@khronosgroup/gltf-interactivity-engine/build/index.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function BehaviorEngine (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .BehaviorEngine);

   // Private properties
}

Object .assign (Object .setPrototypeOf (BehaviorEngine .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled .addInterest ("set_enabled__", this);
      this ._graph   .addInterest ("set_graph__",   this);
      this ._graphs  .addInterest ("set_graph__",   this);

      this .fps      = 60;
      this .eventBus = new Interactivity .DOMEventBus ();
      this .engine   = new Interactivity .BasicBehaveEngine (this .fps, this .eventBus);

      this .engine .startAnimation  = (... args) => this .startAnimation (... args);
      this .engine .stopAnimation   = (... args) => this .stopAnimation (... args);
      this .engine .stopAnimationAt = (... args) => this .stopAnimationAt (... args);

      console .log (this .engine);

      this .set_enabled__ ();
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
   startAnimation (animationIndex, startTime, endTime, speed, callback)
   {
      console .log ("startAnimation", animationIndex, startTime, endTime, speed);
   },
   stopAnimation (animationIndex)
   {
      console .log ("stopAnimation", animationIndex);
   },
   stopAnimationAt (animationIndex, stopTime, callback)
   {
      console .log ("stopAnimationAt", animationIndex, stopTime);
   },
});

Object .defineProperties (BehaviorEngine,
{
   ... X3DNode .getStaticProperties ("BehaviorEngine", "X_ITE", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graph",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "graphs",     new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "animations", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default BehaviorEngine;
