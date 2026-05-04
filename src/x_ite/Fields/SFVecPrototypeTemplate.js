import X3DField from "../Base/X3DField.js";

function SFVecPrototypeTemplate (Constructor, TypeName, Vector, double, properties = { })
{
   const _formatter = double ? "DoubleFormat" : "FloatFormat";

   X3DField .addStaticProperties (Constructor, TypeName);

   Object .assign (Object .setPrototypeOf (Constructor .prototype, X3DField .prototype),
   {
      *[Symbol .iterator] ()
      {
         yield* this .getValue ();
      },
      copy ()
      {
         return Constructor .fromValue (this .getValue () .copy ());
      },
      equals (vector)
      {
         return this .getValue () .equals (vector .getValue ());
      },
      isDefaultValue ()
      {
         return this .getValue () .equals (Vector .ZERO);
      },
      set (value)
      {
         this .getValue () .assign (value);
      },
      abs ()
      {
         return Constructor .fromValue (this .getValue () .copy () .abs ());
      },
      add (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .add (vector .getValue ()));
      },
      clamp (low, high)
      {
         return Constructor .fromValue (this .getValue () .copy () .clamp (low .getValue (), high .getValue ()));
      },
      distance (vector)
      {
         return this .getValue () .distance (vector .getValue ());
      },
      divide (value)
      {
         return Constructor .fromValue (this .getValue () .copy () .divide (+value));
      },
      divVec (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .divVec (vector .getValue ()));
      },
      dot (vector)
      {
         return this .getValue () .dot (vector .getValue ());
      },
      inverse ()
      {
         return Constructor .fromValue (this .getValue () .copy () .inverse ());
      },
      length ()
      {
         return this .getValue () .norm ();
      },
      lerp (destination, t)
      {
         return Constructor .fromValue (this .getValue () .copy () .lerp (destination, +t));
      },
      max (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .max (vector .getValue ()));
      },
      min (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .min (vector .getValue ()));
      },
      multiply (value)
      {
         return Constructor .fromValue (this .getValue () .copy () .multiply (+value));
      },
      multVec (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .multVec (vector .getValue ()));
      },
      negate ()
      {
         return Constructor .fromValue (this .getValue () .copy () .negate ());
      },
      normalize ()
      {
         return Constructor .fromValue (this .getValue () .copy () .normalize ());
      },
      reflect (normal)
      {
         return Constructor .fromValue (this .getValue () .copy () .reflect (normal .getValue ()));
      },
      subtract (vector)
      {
         return Constructor .fromValue (this .getValue () .copy () .subtract (vector .getValue ()));
      },
      toStream (generator)
      {
         const
            value    = this .getValue (),
            last     = value .length - 1,
            category = this .getUnit ();

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator [_formatter] (generator .ToUnit (category, value [i]));
            generator .Space ();
         }

         generator .string += generator [_formatter] (generator .ToUnit (category, value [last]));
      },
      toVRMLStream (generator)
      {
         this .toStream (generator);
      },
      toXMLStream (generator)
      {
         this .toStream (generator);
      },
      toJSONStream (generator)
      {
         generator .string += '[';
         generator .TidySpace ();

         this .toJSONStreamValue (generator);

         generator .TidySpace ();
         generator .string += ']';
      },
      toJSONStreamValue (generator)
      {
         const
            value    = this .getValue (),
            last     = value .length - 1,
            category = this .getUnit ();

         for (let i = 0; i < last; ++ i)
         {
            generator .string += generator .Number (generator [_formatter] (generator .ToUnit (category, value [i])));
            generator .string += ',';
            generator .TidySpace ();
         }

         generator .string += generator .Number (generator [_formatter] (generator .ToUnit (category, value [last])));
      },
   },
   properties);

   for (const key of Object .keys (Constructor .prototype))
      Object .defineProperty (Constructor .prototype, key, { enumerable: false });

   const x = {
      get ()
      {
         return this .getValue () .x;
      },
      set (value)
      {
         this .getValue () .x = +value;
         this .addEvent ();
      },
   };

   const y = {
      get ()
      {
         return this .getValue () .y;
      },
      set (value)
      {
         this .getValue () .y = +value;
         this .addEvent ();
      },
   };

   const z = {
      get ()
      {
         return this .getValue () .z;
      },
      set (value)
      {
         this .getValue () .z = +value;
         this .addEvent ();
      },
   };

   const w = {
      get ()
      {
         return this .getValue () .w;
      },
      set (value)
      {
         this .getValue () .w = +value;
         this .addEvent ();
      },
   };

   const indices = [
      [0, x],
      [1, y],
      [2, z],
      [3, w],
   ];

   const props = [
      ["x", Object .assign ({ enumerable: true }, x)],
      ["y", Object .assign ({ enumerable: true }, y)],
      ["z", Object .assign ({ enumerable: true }, z)],
      ["w", Object .assign ({ enumerable: true }, w)],
   ];

   const constants = [
      "X_AXIS",
      "Y_AXIS",
      "Z_AXIS",
      "W_AXIS",
   ];

   indices   .length = Vector .prototype .length;
   props     .length = Vector .prototype .length;
   constants .length = Vector .prototype .length;

   Object .defineProperties (Constructor .prototype, Object .fromEntries (indices .concat (props)));

   Object .defineProperties (Constructor, Object .fromEntries ([
      "ONE",
      "ZERO",
      ... constants,
   ]
   .map (key => [key, { value: Constructor .fromValue (Vector [key]), enumerable: true }])));

   return Constructor;
}

export default SFVecPrototypeTemplate;
