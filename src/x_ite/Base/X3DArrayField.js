import X3DField from "./X3DField.js";

import "../Features.js";

function X3DArrayField (value)
{
   X3DField .call (this, value);
}

Object .assign (Object .setPrototypeOf (X3DArrayField .prototype, X3DField .prototype),
{
   // Add all function possible in Array and TypedArray:
   ... Object .fromEntries ([
      "at",
      "concat",
      "entries",
      "every",
      "fill",
      "find",
      "findIndex",
      "findLast",
      "findLastIndex",
      "flat",
      "flatMap",
      "forEach",
      "includes",
      "indexOf",
      "join",
      "keys",
      "lastIndexOf",
      "reduce",
      "reduceRight",
      "reverse",
      "some",
      "sort",
      "values",
   ]
   .map (name => [name, Array .prototype [name]])),
   filter (... args)
   {
      return this .constructor .from (Array .prototype .filter .call (this, ... args));
   },
   map (... args)
   {
      return this .constructor .from (this, ... args);
   },
   slice (... args)
   {
      return this .constructor .from (Array .prototype .slice .call (this, ... args));
   },
   toReversed ()
   {
      return this .copy () .reverse ();
   },
   toSorted (... args)
   {
      return this .copy () .sort (... args);
   },
   toSpliced (... args)
   {
      const copy = this .copy ();

      copy .splice (... args);

      return copy;
   },
   with (index, value)
   {
      const copy = this .copy ();

      copy [index] = value;

      return copy;
   },
});

for (const key of Object .keys (X3DArrayField .prototype))
   Object .defineProperty (X3DArrayField .prototype, key, { enumerable: false });

Object .defineProperties (X3DArrayField,
{
   addStaticProperties:
   {
      value (constructor, typeName)
      {
         X3DField .addStaticProperties (constructor, typeName);

         Object .defineProperties (constructor,
         {
            from:
            {
               value (... args)
               {
                  const
                     array  = new constructor (),
                     target = array .getTarget ();

                  for (const v of Array .from (... args))
                     target .push (v);

                  return array;
               },
            },
         });
      },
   },
});

export default X3DArrayField;
