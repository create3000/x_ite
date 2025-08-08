function X3DArrayFollowerTemplate (Type)
{
   function X3DArrayFollowerObject ()
   {
      this .array = this .getArray ();
      this .zero  = this .getVector ();
   }

   Object .assign (X3DArrayFollowerObject .prototype,
   {
      getArray ()
      {
         const array = [ ];

         array .assign = function (value)
         {
            const
               minLength = Math .min (this .length, value .length),
               maxLength = value .length;

            if (Array .isArray (value))
            {
               for (let i = 0; i < minLength; ++ i)
                  this [i] .assign (value [i]);

               for (let i = minLength; i < maxLength; ++ i)
                  this [i] = value [i] .copy ();

               this .length = maxLength;
            }
            else
            {
               for (let i = 0; i < minLength; ++ i)
                  this [i] .assign (value [i] .getValue ());

               for (let i = minLength; i < maxLength; ++ i)
                  this [i] = value [i] .getValue () .copy ();

               this .length = maxLength;
            }
         };

         return array;
      },
      getValue ()
      {
         return this ._set_value;
      },
      getDestination ()
      {
         return this ._set_destination;
      },
      getInitialValue ()
      {
         return this ._initialValue;
      },
      getInitialDestination ()
      {
         return this ._initialDestination;
      },
      setValue (value)
      {
         if (Array .isArray (value))
         {
            const value_changed = this ._value_changed;

            for (var i = 0, length = value .length; i < length; ++ i)
               value_changed [i] = value [i];

            value_changed .length = length;
         }
         else
         {
            this ._value_changed = value;
         }
      },
      duplicate (value)
      {
         const array = this .getArray ();

         array .assign (value);

         return array;
      },
      equals (lhs, rhs, tolerance)
      {
         if (lhs .length !== rhs .length)
            return false;

         const a = this .a;

         let distance = 0;

         for (let i = 0, length = lhs .length; i < length; ++ i)
           distance = Math .max (a .assign (lhs [i]) .subtract (rhs [i]) .norm (), distance);

         return distance < tolerance;
      },
      interpolate (source, destination, weight)
      {
         const array = this .array;

         array .assign (source);

         for (let i = 0, length = array .length; i < length; ++ i)
            array [i] .lerp (destination [i] || this .zero, weight);

         return array;
      },
      set_destination__ ()
      {
         const
            buffers = this .getBuffer (),
            l       = this ._set_destination .length;

         for (let i = 0, length = buffers .length; i < length; ++ i)
         {
            const buffer = buffers [i];

            for (let b = buffer .length; b < l; ++ b)
               buffer [b] = this .getVector ();

            buffer .length = l;
         }

         Type .prototype .set_destination__ .call (this);
      },
   });

   return X3DArrayFollowerObject;
}

export default X3DArrayFollowerTemplate;
