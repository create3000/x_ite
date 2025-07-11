import X3DNode         from "../Core/X3DNode.js";
import X3DFollowerNode from "./X3DFollowerNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";

function X3DChaserNode (executionContext)
{
   X3DFollowerNode .call (this, executionContext);

   this .addType (X3DConstants .X3DChaserNode);

   this .destination   = null;
   this .previousValue = null;
   this .bufferEndTime = 0;
   this .stepTime      = 0;

   // Auxillary variables
   this .deltaOut = this .getVector ();
}

Object .assign (Object .setPrototypeOf (X3DChaserNode .prototype, X3DFollowerNode .prototype),
{
   initialize ()
   {
      X3DFollowerNode .prototype .initialize .call (this);

      this ._set_value       .addInterest ("set_value__",       this);
      this ._set_destination .addInterest ("set_destination__", this);
      this ._duration        .addInterest ("set_duration__",    this);

      this .set_duration__ ();

      const
         buffer             = this .getBuffer (),
         initialValue       = this .getInitialValue (),
         initialDestination = this .getInitialDestination (),
         numBuffers         = this .getNumBuffers ();

      this .bufferEndTime = this .getBrowser () .getCurrentTime ();
      this .previousValue = this .duplicate (initialValue);

      buffer [0] = this .duplicate (initialDestination);

      for (let i = 1; i < numBuffers; ++ i)
         buffer [i] = this .duplicate (initialValue);

      this .destination = this .duplicate (initialDestination);

      if (this .equals (initialDestination, initialValue, this .getTolerance ()))
         this .setValue (initialDestination);

      else
         this .set_active (true);
   },
   getNumBuffers ()
   {
      return 60;
   },
   getTolerance ()
   {
      return 1e-8;
   },
   getArray ()
   {
      return this .getVector ();
   },
   setPreviousValue (value)
   {
      this .previousValue .assign (value);
   },
   step (value1, value2, t)
   {
      this .output .add (this .deltaOut .assign (value1) .subtract (value2) .multiply (t));
   },
   stepResponse (t)
   {
      if (t <= 0)
         return 0;

      const duration = this ._duration .getValue ();

      if (t >= duration)
         return 1;

      return 0.5 - 0.5 * Math .cos ((t / duration) * Math .PI);
   },
   set_value__ ()
   {
      if (! this ._isActive .getValue ())
         this .bufferEndTime = this .getBrowser () .getCurrentTime ();

      const
         buffer = this .getBuffer (),
         value  = this .getValue ();

      for (let i = 0, length = buffer .length; i < length; ++ i)
         this .assign (buffer, i, value);

      this .setPreviousValue (value);
      this .setValue (value);

      this .set_active (true);
   },
   set_destination__ ()
   {
      this .setDestination (this .getDestination ());

      if (! this ._isActive .getValue ())
         this .bufferEndTime = this .getBrowser () .getCurrentTime ();

      this .set_active (true);
   },
   set_duration__ ()
   {
      this .stepTime = this ._duration .getValue () / this .getNumBuffers ();
   },
   prepareEvents ()
   {
      const
         buffer     = this .getBuffer (),
         numBuffers = buffer .length,
         fraction   = this .updateBuffer ();

      this .output = this .interpolate (this .previousValue,
                                          buffer [numBuffers - 1],
                                          this .stepResponse ((numBuffers - 1 + fraction) * this .stepTime));

      for (let i = numBuffers - 2; i >= 0; -- i)
      {
         this .step (buffer [i], buffer [i + 1], this .stepResponse ((i + fraction) * this .stepTime));
      }

      this .setValue (this .output);

      if (this .equals (this .output, this .destination, this .getTolerance ()))
         this .set_active (false);
   },
   updateBuffer ()
   {
      const
         buffer     = this .getBuffer (),
         numBuffers = buffer .length;

      let fraction = (this .getBrowser () .getCurrentTime () - this .bufferEndTime) / this .stepTime;

      if (fraction >= 1)
      {
         const seconds = Math .floor (fraction);

         fraction -= seconds;

         if (seconds < numBuffers)
         {
            this .setPreviousValue (buffer [numBuffers - seconds]);

            for (let i = numBuffers - 1; i >= seconds; -- i)
            {
               this .assign (buffer, i, buffer [i - seconds])
            }

            for (let i = 0; i < seconds; ++ i)
            {
               const alpha = i / seconds;

               this .assign (buffer, i, this .interpolate (this .destination, buffer [seconds], alpha))
            }
         }
         else
         {
            this .setPreviousValue (seconds == numBuffers ? buffer [0] : this .destination);

            for (let i = 0; i < numBuffers; ++ i)
               this .assign (buffer, i, this .destination);
         }

         this .bufferEndTime += seconds * this .stepTime;
      }

      return fraction;
   },
});

Object .defineProperties (X3DChaserNode, X3DNode .getStaticProperties ("X3DChaserNode", "Followers", 1));

export default X3DChaserNode;
