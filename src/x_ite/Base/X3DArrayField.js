import X3DField from "./X3DField.js";
import Features from "../Features.js";

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
   filter (/* callbackFn, thisArg */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .filter .call (this, ... arguments))
         array .push (v);

      return array;
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
   map (/* callbackFn, thisArg */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .map .call (this, ... arguments))
         array .push (v);

      return array;
   },
   reduce: Array .prototype .reduce,
   reduceRight: Array .prototype .reduceRight,
   reverse: Array .prototype .reverse,
   slice (/* start, end */)
   {
      const array = new (this .constructor) ();

      for (const v of Array .prototype .slice .call (this, ... arguments))
         array .push (v);

      return array;
   },
   some: Array .prototype .some,
   sort: Array .prototype .sort,
   toReversed ()
   {
      return this .copy () .reverse ();
   },
   toSorted (/* compareFn */)
   {
      return this .copy () .sort (... arguments);
   },
   toSpliced (/* start, deleteCount, ... insertValues */)
   {
      const copy = this .copy ();

      copy .splice (... arguments);

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

export default X3DArrayField;
