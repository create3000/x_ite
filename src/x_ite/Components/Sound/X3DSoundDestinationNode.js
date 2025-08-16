import X3DNode      from "../Core/X3DNode.js";
import X3DSoundNode from "./X3DSoundNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DSoundDestinationNode (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundDestinationNode);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .childNodes       = [ ];
   this .audioDestination = new GainNode (audioContext, { gain: 0 });
}

Object .assign (Object .setPrototypeOf (X3DSoundDestinationNode .prototype, X3DSoundNode .prototype),
{
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled               .addInterest ("set_enabled__",               this);
      this ._gain                  .addInterest ("set_gain__",                  this);
      this ._channelCount          .addInterest ("set_channelCount__",          this);
      this ._channelCountMode      .addInterest ("set_channelCountMode__",      this);
      this ._channelInterpretation .addInterest ("set_channelInterpretation__", this);
      this ._children              .addInterest ("set_children__",              this);

      this .set_enabled__ ();
      this .set_gain__ ();
      this .set_channelCount__ ();
      this .set_channelCountMode__ ();
      this .set_channelInterpretation__ ();
      this .set_children__ ();
   },
   getAudioDestination ()
   {
      return this .audioDestination;
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue () && this .getLive () .getValue ())
         this .audioDestination .connect (this .getSoundDestination ());
      else
         this .audioDestination .disconnect ();

      this ._isActive = this ._enabled;
   },
   set_gain__ ()
   {
      this .audioDestination .gain .value = this ._gain .getValue ();
   },
   set_channelCount__ ()
   {
      this .audioDestination .channelCount = Algorithm .clamp (this ._channelCount .getValue (), 1, 32);
   },
   set_channelCountMode__: (() =>
   {
      const channelCountModes = new Map ([
         ["MAX",         "max"],
         ["CLAMPED-MAX", "clamped-max"],
         ["EXPLICIT",    "explicit"],
      ]);

      return function ()
      {
         if (!this ._enabled .getValue ())
            return;

         this .audioDestination .channelCountMode = channelCountModes .get (this ._channelCountMode .getValue ()) ?? "max";
      };
   })(),
   set_channelInterpretation__: (() =>
   {
      const channelInterpretations = new Map ([
         ["SPEAKERS", "speakers"],
         ["DISCRETE", "discrete"],
      ]);

      return function ()
      {
         if (!this ._enabled .getValue ())
            return;

         this .audioDestination .channelInterpretation = channelInterpretations .get (this ._channelInterpretation .getValue ()) ?? "speakers";
      };
   })(),
   set_children__ ()
   {
      for (const childNode of this .childNodes)
         childNode .getAudioSource () .disconnect (this .audioDestination);

      this .childNodes .length = 0;

      for (const child of this ._children)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!childNode)
            continue;

         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DSoundChannelNode:
               case X3DConstants .X3DSoundProcessingNode:
               case X3DConstants .X3DSoundSourceNode:
                  this .childNodes .push (childNode);
                  break;
               default:
                  continue;
            }

            break;
         }
      }

      for (const childNode of this .childNodes)
         childNode .getAudioSource () .connect (this .audioDestination);
   },
});

Object .defineProperties (X3DSoundDestinationNode, X3DNode .getStaticProperties ("X3DSoundDestinationNode", "Sound", 2));

export default X3DSoundDestinationNode;
