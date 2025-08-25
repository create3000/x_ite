import X3DChildObject from "./X3DChildObject.js";

const
   _array     = Symbol (),
   _index     = Symbol (),
   _valueType = Symbol ();

const handler =
{
   get (target, key)
   {
      const value = target [key];

      if (value !== undefined)
         return value;

      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index))
            return target [_array] [index];

         return;
      }
   },
   set (target, key, value)
   {
      if (target [key] === undefined)
         return false;

      target [key] = value;
      return true;
   },
   has (target, key)
   {
      if (Number .isInteger (+key))
         return key < target [_array] .length;

      return key in target;
   },
   ownKeys (target)
   {
      return Object .keys (target [_array]);
   },
   getOwnPropertyDescriptor (target, key)
   {
      if (typeof key !== "string")
         return;

      const index = +key;

      if (Number .isInteger (index) && index < target [_array] .length)
      {
         const propertyDescriptor = Object .getOwnPropertyDescriptor (target [_array], key);

         if (propertyDescriptor)
            propertyDescriptor .writable = false;

         return propertyDescriptor;
      }
   },
};

function X3DInfoArray (values, valueType)
{
   const proxy = new Proxy (this, handler);

   X3DChildObject .call (this);

   this [_array]     = [ ];
   this [_index]     = new Map ();
   this [_valueType] = valueType;

   for (const [key, value] of values)
      this .add (key, value);

   return proxy;
}

Object .assign (Object .setPrototypeOf (X3DInfoArray .prototype, X3DChildObject .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this [_array];
   },
   copy ()
   {
      const copy = new (this .constructor) ();

      copy .assign (this);

      return copy;
   },
   clear ()
   {
      this [_array] .length = 0;
      this [_index] .clear ();

      this .addEvent ();
   },
   assign (array)
   {
      if (!(array instanceof this .constructor))
         throw new Error ("Couldn't assign info array, wrong type.");

      this [_array] = Array .from (array [_array]);
      this [_index] = new Map (array [_index]);

      this .addEvent ();
   },
   equals (array)
   {
      const
         a      = this [_array],
         b      = array [_array],
         length = a .length;

      if (a === b)
         return true;

      if (length !== b .length)
         return false;

      for (let i = 0; i < length; ++ i)
      {
         if (a [i] !== b [i])
            return false;
      }

      return true;
   },
   has (key)
   {
      return this [_index] .has (key);
   },
   get (key)
   {
      return this [_index] .get (key);
   },
   add (key, value)
   {
      if (this [_index] .has (key))
         throw new Error (`Couldn't add value to ${this .getTypeName ()}, key '${key}' already exists.`);

      if (!(value instanceof this [_valueType]))
         throw new Error (`Couldn't add value to ${this .getTypeName ()}, value for key '${key}' has wrong type.`);

      this [_array] .push (value);
      this [_index] .set (key, value);

      this .addEvent ();
   },
   alias (alias, value)
   {
      this [_index] .set (alias, value);

      this .addEvent ();
   },
   update (oldKey, newKey, value)
   {
      // TODO: update alias.

      if (!(value instanceof this [_valueType]))
         throw new Error (`Couldn't update value of ${this .getTypeName ()}, value for key '${key}' has wrong type.`);

      const oldValue = this [_index] .get (oldKey);

      if (oldKey !== newKey)
         this .remove (newKey);

      this [_index] .delete (oldKey);
      this [_index] .set (newKey, value);

      if (oldValue !== undefined)
      {
         const index = this [_array] .indexOf (oldValue);

         if (index > -1)
            this [_array] [index] = value;
      }
      else
      {
         this [_array] .push (value);
      }

      this .addEvent ();
   },
   remove (key)
   {
      // TODO: remove alias.

      const value = this [_index] .get (key);

      if (value === undefined)
         return;

      const index = this [_array] .indexOf (value);

      this [_index] .delete (key);

      if (index > -1)
         this [_array] .splice (index, 1);

      this .addEvent ();
   },
   at: Array .prototype .at,
   // concat: Array .prototype .concat,
   // copyWithin: Array.prototype.copyWithin,
   entries: Array .prototype .entries,
   every: Array .prototype .every,
   // fill: Array .prototype .fill,
   filter (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .filter .call (this, callbackFn, thisArg));
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
   map (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .map .call (this, callbackFn, thisArg));
   },
   reduce: Array .prototype .reduce,
   reduceRight: Array .prototype .reduceRight,
   // reverse: Array .prototype .reverse,
   slice (start, end)
   {
      return new (this .constructor) (Array .prototype .slice .call (this, start, end));
   },
   some: Array .prototype .some,
   // sort: Array .prototype .sort,
   toReversed ()
   {
      return new (this .constructor) ([... this] .reverse ());
   },
   toSorted (compareFn)
   {
      return new (this .constructor) ([... this] .sort (compareFn));
   },
   toSpliced (start, deleteCount, ... insertValues)
   {
      const array = [... this];

      array .splice (start, deleteCount, ... insertValues)

      return new (this .constructor) (array);
   },
   values: Array .prototype .values,
   with (index, value)
   {
      const array = [... this];

      array [index] = value;

      return new (this .constructor) (array);
   },
   toVRMLStream (generator)
   {
      for (const value of this [_array])
      {
         try
         {
            value .toVRMLStream (generator);

            generator .string += generator .Break ();

            if (this .getTypeName () .match (/Proto/))
               generator .string += generator .TidyBreak ();
         }
         catch (error)
         {
            // console .error (error);
         }
      }
   },
   toXMLStream (generator)
   {
      for (const value of this [_array])
      {
         try
         {
            value .toXMLStream (generator);

            generator .string += generator .TidyBreak ();
         }
         catch (error)
         {
            // console .error (error);
         }
      }
   },
   toJSONStream (generator, comma)
   {
      let lastProperty = false;

      for (const value of this [_array])
      {
         try
         {
            value .toJSONStream (generator, true);

            generator .string += ',';
            generator .string += generator .TidyBreak ();

            lastProperty = true;
         }
         catch (error)
         {
            // console .error (error);
         }
      }

      if (lastProperty && !comma)
         generator .JSONRemoveComma ();

      return lastProperty;
   },
});

for (const key of Object .keys (X3DInfoArray .prototype))
   Object .defineProperty (X3DInfoArray .prototype, key, { enumerable: false });

Object .defineProperties (X3DInfoArray .prototype,
{
   length:
   {
      get () { return this [_array] .length; },
   },
});

export default X3DInfoArray;
