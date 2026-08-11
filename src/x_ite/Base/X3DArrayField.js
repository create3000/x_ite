import X3DField from "./X3DField.js";

import "../Features.js";

function X3DArrayField (value)
{
   X3DField .call (this, value);
}

Object .assign (Object .setPrototypeOf (X3DArrayField .prototype, X3DField .prototype),
{
   // Implement all function also in TypedArray, if possible.
   at: Array .prototype .at,
   concat: Array .prototype .concat,
   // copyWithin: Array.prototype.copyWithin,
   entries: Array .prototype .entries,
   every: Array .prototype .every,
   fill: Array .prototype .fill,
   filter (... args)
   {
      return this .constructor .from (Array .prototype .filter .call (this, ... args));
   },
   find: Array .prototype .find,
   findIndex: Array .prototype .findIndex,
   findLast: Array .prototype .findLast,
   findLastIndex: Array .prototype .findLastIndex,
   flat: Array .prototype .flat,
   flatMap: Array .prototype .flatMap,
   forEach: Array .prototype .forEach,
   includes: Array .prototype .includes,
   indexOf: Array .prototype .indexOf,
   join: Array .prototype .join,
   keys: Array .prototype .keys,
   lastIndexOf: Array .prototype .lastIndexOf,
   map (... args)
   {
      return this .constructor .from (Array .prototype .map .call (this, ... args));
   },
   reduce: Array .prototype .reduce,
   reduceRight: Array .prototype .reduceRight,
   reverse: Array .prototype .reverse,
   slice (... args)
   {
      return this .constructor .from (Array .prototype .slice .call (this, ... args));
   },
   some: Array .prototype .some,
   sort: Array .prototype .sort,
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
   values: Array .prototype .values,
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
               value (items, mapFn, thisArg)
               {
                  const array = new constructor ();

                  for (const v of mapFn ? Array .from (items, mapFn, thisArg) : items)
                     array .push (v);

                  return array;
               },
            },
         });
      },
   },
});

export default X3DArrayField;
