import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "./SFNodeCache.js";

const
   _target = Symbol (),
   _proxy  = Symbol ();

const handler =
{
   get (target, key)
   {
      try
      {
         const value = target [key];

         if (value !== undefined)
            return value;

         const
            node  = target .getValue (),
            field = node .getField (key);

         // Specification conform would be: accessType & X3DConstants .outputOnly.
         // But we allow read access to plain fields, too.
         if (field .getAccessType () === X3DConstants .inputOnly)
            return undefined;

         return field .valueOf ();
      }
      catch
      {
         return undefined;
      }
   },
   set (target, key, value)
   {
      if (key in target)
      {
         target [key] = value;
         return true;
      }

      try
      {
         const
            node       = target .getValue (),
            field      = node .getField (key),
            accessType = field .getAccessType ();

         if (accessType !== X3DConstants .outputOnly)
            field .setValue (value);

         return true;
      }
      catch (error)
      {
         console .error (target, key, error);
         return false;
      }
   },
   has (target, key)
   {
      try
      {
         return !! target .getValue () .getField (key);
      }
      catch
      {
         return key in target;
      }
   },
   ownKeys (target)
   {
      const
         value   = target .getValue (),
         ownKeys = [ ];

      if (value)
      {
         for (const fieldDefinition of value .getFieldDefinitions ())
            ownKeys .push (fieldDefinition .name);
      }

      return ownKeys;
   },
   getOwnPropertyDescriptor (target, key)
   {
      const value = target .getValue ();

      if (value)
      {
         const fieldDefinition = value .getFieldDefinitions () .get (key);

         if (fieldDefinition)
         {
            return {
               value: this .get (target, key),
               writable: fieldDefinition .accessType !== X3DConstants .outputOnly,
               enumerable: true,
               configurable: true,
            };
         }
      }
   },
};

function SFNode (value)
{
   // Node need to test for X3DBaseNode, because there is a special version of SFNode in Script.

   const proxy = new Proxy (this, handler);

   this [_target] = this;
   this [_proxy]  = proxy;

   if (value ?.getType () .includes (X3DConstants .X3DNode))
   {
      value .addParent (proxy);

      X3DField .call (this, value);
   }
   else
   {
      X3DField .call (this, null);
   }

   return proxy;
}

Object .assign (Object .setPrototypeOf (SFNode .prototype, X3DField .prototype),
{
   [_target]: null,
   [_proxy]: null,
   copy (instance)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value && instance)
      {
         const copy = value .copy (instance);

         copy .setup ();

         return new SFNode (copy);
      }

      return new SFNode (value);
   },
   equals (node)
   {
      const target = this [_target];

      if (node)
         return target .getValue () === node .getValue ();

      return target .getValue () === null;
   },
   isDefaultValue ()
   {
      const target = this [_target];

      return target .getValue () === null;
   },
   set (value)
   {
      const
         target  = this [_target],
         current = target .getValue ();

      current ?.removeParent (target [_proxy]);

      // No need to test for X3DBaseNode, because there is a special version of SFNode in Script.

      if (value ?.getType () .includes (X3DConstants .X3DNode))
      {
         value .addParent (target [_proxy]);

         X3DField .prototype .set .call (target, value);
      }
      else
      {
         X3DField .prototype .set .call (target, null);
      }
   },
   getNodeTypeName ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getTypeName ();

      throw new Error ("SFNode.getNodeTypeName: node is null.");
   },
   getNodeName ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getName ();

      throw new Error ("SFNode.getNodeName: node is null.");
   },
   getNodeDisplayName ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getDisplayName ();

      throw new Error ("SFNode.getNodeDisplayName: node is null.");
   },
   getNodeType ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return Array .from (value .getType ());

      throw new Error ("SFNode.getNodeType: node is null.");
   },
   getFieldDefinition (name)
   {
      const fieldDefinition = this .getFieldDefinitions () .get (name);

      if (fieldDefinition)
         return fieldDefinition;

      throw new Error (`Unknown field '${name}' in node class ${this .getNodeTypeName ()}.`);
   },
   getFieldDefinitions ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getFieldDefinitions ();

      throw new Error ("SFNode.getFieldDefinitions: node is null.");
   },
   /**
   * @deprecated Returns the corresponding X3DField object associated with *name*. Use sfnode.{fieldName} syntax.
   */
   getField (name)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         return value .getField (name);

      throw new Error ("SFNode is disposed.")
   },
   addFieldCallback (... args)
   {
      const target = this [_target];

      switch (args .length)
      {
         case 2:
         {
            const [key, callback] = args;

            return X3DField .prototype .addFieldCallback .call (target, key, callback);
         }
         case 3:
         {
            const
               [key, name, callback] = args,
               value                 = target .getValue ();

            if (value)
               return value .getField (name) .addFieldCallback (key, callback);

            throw new Error ("SFNode.addFieldCallback: node is null.");
         }
      }
   },
   removeFieldCallback (... args)
   {
      const target = this [_target];

      switch (args .length)
      {
         case 1:
         {
            const key = [args];

            return X3DField .prototype .removeFieldCallback .call (target, key);
         }
         case 2:
         {
            const
               [key, name] = args,
               value       = target .getValue ();

            if (value)
               return value .getField (name) .removeFieldCallback (key);

            throw new Error ("SFNode.removeFieldCallback: node is null.");
         }
      }
   },
   getNodeUserData (key)
   {
      const value = this [_target] .getValue ();

      if (value)
         return value .getUserData (key);

      throw new Error ("SFNode.getNodeUserData: node is null.");
   },
   setNodeUserData (key, data)
   {
      const value = this [_target] .getValue ();

      if (value)
         return value .setUserData (key, data);

      throw new Error ("SFNode.setNodeUserData: node is null.");
   },
   removeNodeUserData (key)
   {
      const value = this [_target] .getValue ();

      if (value)
         return value .removeUserData (key);

      throw new Error ("SFNode.removeNodeUserData: node is null.");
   },
   valueOf ()
   {
      const
         target = this [_target],
         value  = target .getValue ();

      return value ? SFNodeCache .get (value) : null;
   },
   toStream (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toStream (generator);
      else
         generator .string += "NULL";
   },
   toVRMLStream (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toVRMLStream (generator);
      else
         generator .string += "NULL";
   },
   toXMLStream (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toXMLStream (generator);
      else
         generator .string += "<!-- NULL -->";
   },
   toJSONStream (generator)
   {
      this .toJSONStreamValue (generator);
   },
   toJSONStreamValue (generator)
   {
      const
         target = this [_target],
         value  = target .getValue ();

      if (value)
         value .toJSONStream (generator);
      else
         generator .string += "null";
   },
   dispose ()
   {
      const target = this [_target];

      target .set (null);
      target .processInterests ();

      X3DField .prototype .dispose .call (target);
   },
});

for (const key of Object .keys (SFNode .prototype))
   Object .defineProperty (SFNode .prototype, key, { enumerable: false });

Object .defineProperties (SFNode,
{
   typeName:
   {
      value: "SFNode",
      enumerable: true,
   },
});

export default SFNode;
