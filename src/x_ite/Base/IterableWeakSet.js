import Features from "../Features.js";

export default Features .WEAK_REF && Features .FINALIZATION_REGISTRY ?
/**
 * IterableWeakSet is a writable set-like class.
 */
class IterableWeakSet
{
   #map      = new Map ();
   #registry = new FinalizationRegistry (id => this .#map .delete (id));

   constructor (objects)
   {
      if (objects)
      {
         for (const object of objects)
            this .add (object);
      }
   }

   *[Symbol .iterator] ()
   {
      yield* this .values ();
   }

   get size ()
   {
      return this .#map .size;
   }

   add (object)
   {
      this .#map .set (object .getId (), new WeakRef (object));
      this .#registry .register (object, object .getId (), object);
   }

   clear ()
   {
      for (const object of this .values ())
         this .#registry .unregister (object);

      this .#map .clear ();
   }

   delete (object)
   {
      this .#map .delete (object .getId ());
      this .#registry .unregister (object);
   }

   forEach (callbackFn, thisArg)
   {
      for (const object of this .values ())
         callbackFn .call (thisArg, object, object, this);
   }

   has (object)
   {
      return this .#map .has (object .getId ());
   }

   *entries ()
   {
      for (const object of this .values ())
         yield [object, object];
   }

   *keys ()
   {
      yield *this .values ();
   }

   *values ()
   {
      for (const weakRef of this .#map .values ())
      {
         const object = weakRef .deref ();

         if (object)
            yield object;
      }
   }
}
:
class IterableWeakSet extends Set
{
   constructor (objects)
   {
      super (objects);
   }
};
