import X3DNode         from "../Core/X3DNode.js";
import X3DFollowerNode from "./X3DFollowerNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Algorithm       from "../../../standard/Math/Algorithm.js";

function X3DDamperNode (executionContext)
{
   X3DFollowerNode .call (this, executionContext);

   this .addType (X3DConstants .X3DDamperNode);
}

Object .assign (Object .setPrototypeOf (X3DDamperNode .prototype, X3DFollowerNode .prototype),
{
   initialize ()
   {
      X3DFollowerNode .prototype .initialize .call (this);

      this ._order           .addInterest ("set_order__", this);
      this ._set_value       .addInterest ("set_value__", this);
      this ._set_destination .addInterest ("set_destination__", this);

      const
         buffer             = this .getBuffer (),
         initialValue       = this .getInitialValue (),
         initialDestination = this .getInitialDestination ();

      buffer [0] = this .duplicate (initialDestination);

      for (let i = 1, length = this .getOrder () + 1; i < length; ++ i)
         buffer [i] = this .duplicate (initialValue);

      if (this .equals (initialDestination, initialValue, this .getTolerance ()))
         this .setValue (initialDestination);

      else
         this .set_active (true);
   },
   getOrder ()
   {
      return Algorithm .clamp (this ._order .getValue (), 0, 5);
   },
   getTolerance ()
   {
      if (this ._tolerance .getValue () < 0)
         return 1e-4;

      return this ._tolerance .getValue ();
   },
   prepareEvents ()
   {
      const buffer = this .getBuffer ();

      let order  = buffer .length - 1;

      if (this ._tau .getValue ())
      {
         const
            delta = 1 / this .getBrowser () .currentFrameRate,
            alpha = Math .exp (-delta / this ._tau .getValue ());

         for (let i = 0; i < order; ++ i)
         {
            this .assign (buffer, i + 1, this .interpolate (buffer [i], buffer [i + 1], alpha));
         }

         this .setValue (buffer [order]);

         if (! this .equals (buffer [order], buffer [0], this .getTolerance ()))
            return;
      }
      else
      {
         this .setValue (buffer [0]);

         order = 0;
      }

      for (let i = 1, length = buffer .length; i < length; ++ i)
         this .assign (buffer, i, buffer [order]);

      this .set_active (false);
   },
   set_value__ ()
   {
      const
         buffer = this .getBuffer (),
         value  = this .getValue ();

      for (let i = 1, length = buffer .length; i < length; ++ i)
         this .assign (buffer, i, value);

      this .setValue (value);

      this .set_active (true);
   },
   set_destination__ ()
   {
      this .assign (this .getBuffer (), 0, this .getDestination ());

      this .set_active (true);
   },
   set_order__ ()
   {
      const
         buffer = this .getBuffer (),
         value  = buffer [buffer .length - 1];

      for (let i = buffer .length, length = this .getOrder () + 1; i < length; ++ i)
         buffer [i] = this .duplicate (value);

      buffer .length = length;
   },
});

Object .defineProperties (X3DDamperNode, X3DNode .getStaticProperties ("X3DDamperNode", "Followers", 1));

export default X3DDamperNode;
