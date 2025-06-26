const
   storages   = new WeakMap (),
   namespaces = new WeakMap (),
   defaults   = new WeakMap ();

const handler =
{
   get (target, key)
   {
      const property = target [key];

      if (property !== undefined)
         return property;

      const value = target .getStorage () [target .getNameSpace () + key];

      if (String (value) .match (/^(?:undefined|null)$/))
         return target .getDefaultValue (key);

      return JSON .parse (value);
   },
   set (target, key, value)
   {
      if (value === undefined)
         target .getStorage () .removeItem (target .getNameSpace () + key);

      else
         target .getStorage () [target .getNameSpace () + key] = JSON .stringify (value);

      return true;
   },
};

function DataStorage (storage, namespace)
{
   this .target  = this;

   storages   .set (this, storage);
   namespaces .set (this, namespace);
   defaults   .set (this, { });

   return new Proxy (this, handler);
}

Object .assign (DataStorage .prototype,
{
   getStorage ()
   {
      return storages .get (this .target);
   },
   getNameSpace ()
   {
      return namespaces .get (this .target);
   },
   addNameSpace (namespace)
   {
      return new DataStorage (this .getStorage (), this .getNameSpace () + namespace);
   },
   setDefaultValues (object)
   {
      Object .assign (defaults .get (this .target), object);
   },
   getDefaultValue (key)
   {
      const value = defaults .get (this .target) [key];

      return value === undefined ? undefined : JSON .parse (JSON .stringify (value));
   },
   clear ()
   {
      const
         storage   = this .getStorage (),
         namespace = this .getNameSpace ();

      for (const key of Object .keys (storage))
      {
         if (key .startsWith (namespace))
            storage .removeItem (key)
      }
   },
});

export default DataStorage;
