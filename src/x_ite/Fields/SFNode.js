import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "./SFNodeCache.js";

const
   _target = Symbol (),
   _proxy  = Symbol ();

const handler =
{
   get (target, key, receiver)
   {
      if (typeof key === "string")
      {
         const
            node  = target .getValue (),
            field = node ?.getField (key, false);

         if (field)
         {
            // Specification conform would be: accessType & X3DConstants .outputOnly.
            // But we allow read access to plain fields, too.
            if (field .getAccessType () === X3DConstants .inputOnly)
               return undefined;

            return field .valueOf ();
         }
      }

      return Reflect .get (target, key, receiver);
   },
   set (target, key, value, receiver)
   {
      if (typeof key === "string")
      {
         const
            node  = target .getValue (),
            field = node ?.getField (key, false);

         if (field)
         {
            const accessType = field .getAccessType ();

            if (accessType === X3DConstants .outputOnly)
               return false;

            field .setValue (value);
            return true;
         }
      }

      return Reflect .set (target, key, value, receiver);
   },
   has (target, key)
   {
      return Boolean (target .getValue () .getField (key, false))
         || Reflect .has (target, key);
   },
   ownKeys (target)
   {
      const
         node    = target .getValue (),
         ownKeys = [ ];

      if (node)
      {
         for (const { name } of node .getFieldDefinitions ())
            ownKeys .push (name);
      }

      return ownKeys .concat (Reflect .ownKeys (target));
   },
   getOwnPropertyDescriptor (target, key)
   {
      if (typeof key === "string")
      {
         const node = target .getValue ();

         if (node)
         {
            const fieldDefinition = node .getFieldDefinitions () .get (key);

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
      }

      return Reflect .getOwnPropertyDescriptor (target, key);
   },
};

function SFNode (node)
{
   // Node need to test for X3DBaseNode, because there is a special version of SFNode in Script.

   const proxy = new Proxy (this, handler);

   this [_target] = this;
   this [_proxy]  = proxy;

   if (node ?.getType () .includes (X3DConstants .X3DNode))
   {
      node .addParent (proxy);

      X3DField .call (this, node);
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
         node   = target .getValue ();

      if (node && instance)
      {
         const copy = node .copy (instance);

         if (!copy .isInitialized () && !instance .getExecutionContext () .getOuterNode () ?.getType () .includes (X3DConstants .X3DProtoDeclaration))
         {
            copy .setup ();
         }

         return new SFNode (copy);
      }

      return new SFNode (node);
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
   set (node)
   {
      const
         target  = this [_target],
         current = target .getValue ();

      current ?.removeParent (target [_proxy]);

      // No need to test for X3DBaseNode, because there is a special version of SFNode in Script.

      if (node ?.getType () .includes (X3DConstants .X3DNode))
      {
         node .addParent (target [_proxy]);

         X3DField .prototype .set .call (target, node);
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
         node   = target .getValue ();

      if (node)
         return node .getTypeName ();

      throw new Error ("SFNode.getNodeTypeName: node is null.");
   },
   getNodeName ()
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         return node .getName ();

      throw new Error ("SFNode.getNodeName: node is null.");
   },
   getNodeDisplayName ()
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         return node .getDisplayName ();

      throw new Error ("SFNode.getNodeDisplayName: node is null.");
   },
   getNodeType ()
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         return Array .from (node .getType ());

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
         node   = target .getValue ();

      if (node)
         return node .getFieldDefinitions ();

      throw new Error ("SFNode.getFieldDefinitions: node is null.");
   },
   /**
   * @deprecated Returns the corresponding X3DField object associated with *name*. Use sfnode.{fieldName} syntax.
   */
   getField: (() =>
   {
      let warn = true;

      return function (name)
      {
         if (warn)
         {
            warn = false;

            const target = { };

            Error .captureStackTrace (target, this .getField);

            console .warn ("The use of sfnode.getField(name) is deprecated. Future versions of X_ITE may remove this feature. Instead, use the sfnode.{fieldName} syntax or sfnode.addFieldCallback(key, fieldName, callback).", target .stack);
         }

         const
            target = this [_target],
            node   = target .getValue ();

         if (node)
            return node .getField (name);

         throw new Error ("SFNode is disposed.");
      };
   })(),
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
               node                  = target .getValue ();

            if (node)
               return node .getField (name) .addFieldCallback (key, callback);

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
            const [key] = args;

            return X3DField .prototype .removeFieldCallback .call (target, key);
         }
         case 2:
         {
            const
               [key, name] = args,
               node        = target .getValue ();

            if (node)
               return node .getField (name) .removeFieldCallback (key);

            throw new Error ("SFNode.removeFieldCallback: node is null.");
         }
      }
   },
   getNodeUserData (key)
   {
      const node = this [_target] .getValue ();

      if (node)
         return node .getUserData (key);

      throw new Error ("SFNode.getNodeUserData: node is null.");
   },
   setNodeUserData (key, data)
   {
      const node = this [_target] .getValue ();

      if (node)
         return node .setUserData (key, data);

      throw new Error ("SFNode.setNodeUserData: node is null.");
   },
   removeNodeUserData (key)
   {
      const node = this [_target] .getValue ();

      if (node)
         return node .removeUserData (key);

      throw new Error ("SFNode.removeNodeUserData: node is null.");
   },
   valueOf ()
   {
      const
         target = this [_target],
         node   = target .getValue ();

      return node ? SFNodeCache .get (node) : null;
   },
   toStream (generator)
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         node .toStream (generator);
      else
         generator .NULL ();
   },
   toVRMLStream (generator)
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         node .toVRMLStream (generator);
      else
         generator .NULL ();
   },
   toXMLStream (generator)
   {
      const
         target = this [_target],
         node   = target .getValue ();

      if (node)
         node .toXMLStream (generator);
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
         node   = target .getValue ();

      if (node)
         node .toJSONStream (generator);
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

X3DField .addStaticProperties (SFNode, "SFNode");

export default SFNode;
