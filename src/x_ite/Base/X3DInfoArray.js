import X3DChildObject from "./X3DChildObject.js";

const
   _array     = Symbol (),
   _index     = Symbol (),
   _valueType = Symbol ();

const handler =
{
   get (target, key, receiver)
   {
      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index) && index >= 0)
            return target [_array] [index];
      }

      return Reflect .get (target, key, receiver);
   },
   set (target, key, value, receiver)
   {
      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index) && index >= 0)
            return false;
      }

      return Reflect .set (target, key, value, receiver);
   },
   has (target, key)
   {
      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index) && index >= 0)
            return index < target [_array] .length;
      }

      return Reflect .has (target, key);
   },
   ownKeys (target)
   {
      return Object .keys (target [_array]) .concat (Reflect .ownKeys (target));
   },
   getOwnPropertyDescriptor (target, key)
   {
      if (typeof key === "string")
      {
         const index = +key;

         if (Number .isInteger (index) && index >= 0)
         {
            if (index < target [_array] .length)
            {
               const propertyDescriptor = Reflect .getOwnPropertyDescriptor (target [_array], key);

               if (propertyDescriptor)
                  propertyDescriptor .writable = false;

               return propertyDescriptor;
            }
         }
      }

      return Reflect .getOwnPropertyDescriptor (target, key);
   },
};

const properties = {
   length: {
      get () { return this [_array] .length; },
   },
};

function X3DInfoArray (values, valueType)
{
   const proxy = new Proxy (this, handler);

   X3DChildObject .call (this);

   Object .defineProperties (this, properties);

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
   // Public functions:
   copy ()
   {
      const copy = new (this .constructor) ();

      copy .assign (this);

      return copy;
   },
   // Private functions:
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
   // Public functions:
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
   // Private functions:
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
         throw new Error (`Couldn't update value of ${this .getTypeName ()}, value for key '${newKey}' has wrong type.`);

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
   // Public functions:
   // Add all non destructive functions:
   ... Object .fromEntries ([
      "at",
      "entries",
      "every",
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
      "some",
      "values",
   ]
   .map (name => [name, Array .prototype [name]])),
   filter (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .filter .call (this, callbackFn, thisArg));
   },
   map (callbackFn, thisArg)
   {
      return new (this .constructor) (Array .prototype .map .call (this, callbackFn, thisArg));
   },
   slice (start, end)
   {
      return new (this .constructor) (Array .prototype .slice .call (this, start, end));
   },
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

      array .splice (start, deleteCount, ... insertValues);

      return new (this .constructor) (array);
   },
   with (index, value)
   {
      const array = [... this];

      array [index] = value;

      return new (this .constructor) (array);
   },
   // Private functions:
   toVRMLStream (generator)
   {
      const proto = this .getTypeName () .includes ("Proto");

      for (const value of this [_array])
      {
         try
         {
            value .toVRMLStream (generator);

            generator .Break ();

            if (proto)
               generator .TidyBreak ();
         }
         catch
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

            generator .TidyBreak ();
         }
         catch
         {
            // console .error (error);
         }
      }
   },
   toJSONStream (generator, comma = false)
   {
      for (const value of this [_array])
      {
         try
         {
            if (comma)
               generator .string += ',';

            value .toJSONStream (generator, true);

            comma = true;
         }
         catch
         {
            generator .RemoveComma ();
         }
      }

      return comma;
   },
});

for (const key of Object .keys (X3DInfoArray .prototype))
   Object .defineProperty (X3DInfoArray .prototype, key, { enumerable: false });

export default X3DInfoArray;
