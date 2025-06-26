import DEVELOPMENT from "./DEVELOPMENT.js";

const MODULE = false;

const Features =
{
   get ENVIRONMENT ()
   {
      if (DEVELOPMENT)
         return "BROWSER";

      if (MODULE)
         return "MODULE";

      if ((typeof process === "object") && (process .release .name .search (/node|io.js/) !== -1))
         return "NODE";

      return "BROWSER";
   },
   WEAK_REF: typeof WeakRef !== "undefined",
   FINALIZATION_REGISTRY: typeof FinalizationRegistry !== "undefined",
};

(() =>
{
   // Added at February 2022
   // https://github.com/tc39/proposal-relative-indexing-method#polyfill

   function at (n)
   {
      // ToInteger() abstract op
      n = Math.trunc(n) || 0;
      // Allow negative indexing from the end
      if (n < 0) n += this.length;
      // OOB access is guaranteed to return undefined
      if (n < 0 || n >= this.length) return undefined;
      // Otherwise, this is just normal property access
      return this[n];
   }

   const TypedArray = Reflect .getPrototypeOf (Int8Array);
   for (const C of [Array, String, TypedArray])
   {
      if (C .prototype .at === undefined)
      {
         Object .defineProperty (C .prototype, "at",
         {
            value: at,
            writable: true,
            enumerable: false,
            configurable: true,
         });
      }
   }
})();

(() =>
{
   if (!Features .WEAK_REF)
   {
      if (DEVELOPMENT)
         console .info ("Added shim for WeakRef.");

      window .WeakRef = class WeakRef
      {
         #object;

         constructor (object)
         {
            this .#object = object;
         }

         deref ()
         {
            return this .#object;
         }
      };
   }

   if (!Features .FINALIZATION_REGISTRY)
   {
      if (DEVELOPMENT)
         console .info ("Added shim for FinalizationRegistry.");

      window .FinalizationRegistry = class FinalizationRegistry
      {
         register () { }
         unregister () { }
      };
   }
})();

(() =>
{
   // https://tc39.es/proposal-upsert/

   for (const Class of [Map, WeakMap])
   {
      Class .prototype .getOrInsert ??= function (key, value)
      {
         if (this .has (key))
            return this .get (key);

         this .set (key, value);

         return value;
      };
   }

   for (const Class of [Map, WeakMap])
   {
      Class .prototype .getOrInsertComputed ??= function (key, callbackfn)
      {
         if (this .has (key))
            return this .get (key);

         const value = callbackfn (key);

         this .set (key, value);

         return value;
      };
   }
})();

export default Features;
