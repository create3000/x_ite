import X3DNode      from "../Core/X3DNode.js";
import X3DChildNode from "../Core/X3DChildNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DFollowerNode (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .X3DFollowerNode);

   this .buffer = [ ];

   // Auxillary variables
   this .a      = this .getVector ();
   this .vector = this .getVector ();
}

Object .assign (Object .setPrototypeOf (X3DFollowerNode .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);
   },
   getBuffer ()
   {
      return this .buffer;
   },
   getValue ()
   {
      return this ._set_value .getValue ();
   },
   getDestination ()
   {
      return this ._set_destination .getValue ();
   },
   getInitialValue ()
   {
      return this ._initialValue .getValue ();
   },
   getInitialDestination ()
   {
      return this ._initialDestination .getValue ();
   },
   setValue (value)
   {
      this ._value_changed = value;
   },
   setDestination (value)
   {
      this .destination .assign (value);
   },
   duplicate (value)
   {
      return value .copy ();
   },
   assign (buffer, i, value)
   {
      buffer [i] .assign (value);
   },
   equals (lhs, rhs, tolerance)
   {
      return this .a .assign (lhs) .subtract (rhs) .norm () < tolerance;
   },
   interpolate (source, destination, weight)
   {
      return this .vector .assign (source) .lerp (destination, weight);
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._isActive .getValue ())
      {
         this .getBrowser () .prepareEvents () .addInterest ("prepareEvents", this);
         this .getBrowser () .addBrowserEvent ();
      }
      else
         this .getBrowser () .prepareEvents () .removeInterest ("prepareEvents", this);
   },
   set_active (value)
   {
      if (value !== this ._isActive .getValue ())
      {
         this ._isActive = value;

         this .set_live__ ();
      }
   },
});

Object .defineProperties (X3DFollowerNode, X3DNode .getStaticProperties ("X3DFollowerNode", "Followers", 1));

export default X3DFollowerNode;
