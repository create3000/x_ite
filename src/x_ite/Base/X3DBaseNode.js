import X3DChildObject       from "./X3DChildObject.js";
import Events               from "./Events.js";
import X3DFieldDefinition   from "./X3DFieldDefinition.js";
import FieldDefinitionArray from "./FieldDefinitionArray.js";
import FieldArray           from "./FieldArray.js";
import Fields               from "../Fields.js";
import X3DConstants         from "./X3DConstants.js";
import HTMLSupport          from "../Parser/HTMLSupport.js";

const
   _browser           = Symbol (),
   _executionContext  = Symbol (),
   _type              = Symbol (),
   _fieldDefinitions  = Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions"),
   _predefinedFields  = Symbol (),
   _userDefinedFields = Symbol (),
   _childObjects      = Symbol (),
   _initialized       = Symbol (),
   _live              = Symbol (),
   _set_live__        = Symbol .for ("X_ITE.X3DBaseNode.set_live__");

function X3DBaseNode (executionContext, browser = executionContext .getBrowser ())
{
   if (this [_executionContext])
      return;

   X3DChildObject .call (this);

   this [_browser]           = browser;
   this [_executionContext]  = executionContext;
   this [_type]              = [ X3DConstants .X3DBaseNode ];
   this [_fieldDefinitions]  = this .constructor .fieldDefinitions ?? this [_fieldDefinitions];
   this [_predefinedFields]  = new FieldArray ();
   this [_userDefinedFields] = new FieldArray ();
   this [_childObjects]      = [ ];
   this [_live]              = true;
   this [_initialized]       = false;

   if (this .canUserDefinedFields ())
      this [_fieldDefinitions] = new FieldDefinitionArray (this [_fieldDefinitions]);

   // Create fields.

   this .addChildObjects (X3DConstants .outputOnly, "name_changed",     new Fields .SFTime (),
                          X3DConstants .outputOnly, "typeName_changed", new Fields .SFTime (),
                          X3DConstants .outputOnly, "parents_changed",  new Fields .SFTime ())

   for (const fieldDefinition of this [_fieldDefinitions])
      this .addPredefinedField (fieldDefinition);
}

Object .assign (Object .setPrototypeOf (X3DBaseNode .prototype, X3DChildObject .prototype),
{
   [_fieldDefinitions]: new FieldDefinitionArray ([ ]),
   setName (value)
   {
      X3DChildObject .prototype .setName .call (this, value)

      this ._name_changed = this [_browser] .getCurrentTime ();
   },
   getBrowser ()
   {
      return this [_browser];
   },
   getScene ()
   {
      return this [_executionContext] ?.getLocalScene () ?? null;
   },
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   setExecutionContext (executionContext)
   {
      if (!this [_type] .includes (X3DConstants .X3DScene))
         throw new Error (`${this .getTypeName ()}.setExecutionContext is not supported.`);

      // Disconnect interests.

      this .getOuterNode ?.()  ?.getLive () .removeInterest (_set_live__, this);
      this [_executionContext] ?.getLive () .removeInterest (_set_live__, this);
      this [_browser]           .getLive () .removeInterest (_set_live__, this);

      // Currently only useful for Scene.
      this [_executionContext] = executionContext;

      // Connect interests.

      if (this .getOuterNode ?.())
         this .getOuterNode () .getLive () .addInterest (_set_live__, this);

      else if (this [_executionContext])
         this [_executionContext] .getLive () .addInterest (_set_live__, this);

      else
         this [_browser] .getLive () .addInterest (_set_live__, this);

      this [_set_live__] ();
   },
   addType (value)
   {
      this [_type] .push (value);
   },
   getType ()
   {
      return this [_type];
   },
   setup ()
   {
      Object .freeze (this [_type]);

      this [_fieldDefinitions]  .addParent (this);
      this [_predefinedFields]  .addParent (this);
      this [_userDefinedFields] .addParent (this);

      for (const field of this [_childObjects])
         field .setTainted (false);

      for (const field of this [_predefinedFields])
         field .setTainted (false);

      for (const field of this [_userDefinedFields])
         field .setTainted (false);

      this .initialize ();

      this [_initialized] = true;
   },
   initialize ()
   { },
   isInitialized ()
   {
      return this [_initialized];
   },
   getInnerNode ()
   {
      return this;
   },
   isLive ()
   {
      ///  Returns the own live state of this node.

      return this [_live];
   },
   setLive (value)
   {
      ///  Sets the own live state of this node.  Setting the live state to false
      ///  temporarily disables this node completely.

      this [_live] = !!value .valueOf ();

      this [_set_live__] ();
   },
   getLive: (() =>
   {
      function getLive ()
      {
         return this ._live;
      }

      return function ()
      {
         ///  Returns the live event of this node.

         // Change function.

         Object .defineProperty (this, "getLive", { value: getLive });

         // Add isLive event.

         this .addChildObjects (X3DConstants .outputOnly, "live", new Fields .SFBool (this .checkLiveState ()));

         // Event processing is done manually and immediately, so:
         this ._live .removeParent (this);

         // Connect to execution context.

         if (this .getOuterNode ?.())
            this .getOuterNode () .getLive () .addInterest (_set_live__, this);

         else if (this [_executionContext] && this !== this [_browser])
            this [_executionContext] .getLive () .addInterest (_set_live__, this);

         else if (!this [_executionContext] && this !== this [_browser])
            this [_browser] .getLive () .addInterest (_set_live__, this);

         // Return field.

         return this ._live;
      };
   })(),
   checkLiveState ()
   {
      ///  Determines the live state of this node.

      if (this .getOuterNode ?.())
         return this [_live] && this .getOuterNode () .getLive () .getValue ();

      else if (this [_executionContext] && this !== this [_browser])
         return this [_live] && this [_executionContext] .getLive () .getValue ();

      else if (!this [_executionContext] && this !== this [_browser])
         return this [_live] && this [_browser] .isLive ();

      return this [_live];
   },
   [_set_live__] ()
   {
      const live = this ._live;

      if (!live)
         return;

      if (this .checkLiveState ())
      {
         if (live .getValue ())
            return;

         live .set (true);
         live .processEvent ();
      }
      else
      {
         if (live .getValue ())
         {
            live .set (false);
            live .processEvent ();
         }
      }
   },
   addChildObjects (/* accessType, name, field, ... */)
   {
      for (let i = 0, length = arguments .length; i < length; i += 3)
         this .addChildObject (arguments [i], arguments [i + 1], arguments [i + 2]);
   },
   addChildObject (accessType, name, field)
   {
      this [_childObjects] .push (field);

      field .setPrivate (true);
      field .setTainted (true);
      field .addParent (this);
      field .setName (name);
      field .setAccessType (accessType);

      Object .defineProperty (this, `_${name}`,
      {
         get () { return field; },
         set (value) { field .setValue (value); },
      });
   },
   getFieldDefinitions ()
   {
      return this [_fieldDefinitions];
   },
   getField (name)
   {
      const field = getFieldFromArray (this [_userDefinedFields], name)
         ?? getFieldFromArray (this [_predefinedFields], name);

      if (field)
         return field;

      throw new Error (`Unknown field '${name}' in node class ${this .getTypeName ()}.`);
   },
   getFields ()
   {
      return [... this [_predefinedFields], ... this [_userDefinedFields]];
   },
   addPredefinedField ({ accessType, name, value })
   {
      const field = value .copy ();

      field .setTainted (!this [_initialized]);
      field .addParent (this);
      field .setName (name);
      field .setAccessType (accessType);

      this [_predefinedFields] .add (name, field);

      Object .defineProperty (this, `_${name}`,
      {
         get () { return field; },
         set (value) { field .setValue (value); },
         configurable: true,
      });
   },
   addAlias (alias, field)
   {
      this [_predefinedFields] .alias (alias, field);

      if (field .isInitializable ())
         HTMLSupport .addFieldName (alias);
   },
   removePredefinedField (name)
   {
      const field = this [_predefinedFields] .get (name);

      if (!field)
         return;

      field .removeParent (this);

      this [_predefinedFields] .remove (name);

      delete this [`_${field .getName ()}`];
   },
   getPredefinedField (name)
   {
      const field = getFieldFromArray (this [_predefinedFields], name);

      if (field)
         return field;

      throw new Error (`Unknown predefined field '${name}' in node class ${this .getTypeName ()}.`);
   },
   getPredefinedFields ()
   {
      return this [_predefinedFields];
   },
   canUserDefinedFields ()
   {
      return false;
   },
   addUserDefinedField (accessType, name, field)
   {
      if (!this .canUserDefinedFields ())
         throw new Error ("Couldn't add user-defined field, node does not support this.");

      if (this [_userDefinedFields] .has (name))
         this .removeUserDefinedField (name);

      field .setTainted (!this [_initialized]);
      field .addParent (this);
      field .setName (name);
      field .setAccessType (accessType);

      this [_fieldDefinitions] .remove (name);

      this [_fieldDefinitions]  .add (name, new X3DFieldDefinition (accessType, name, field));
      this [_userDefinedFields] .add (name, field);
   },
   removeUserDefinedField (name)
   {
      const field = this [_userDefinedFields] .get (name);

      if (!field)
         return;

      field .removeParent (this);

      this [_fieldDefinitions]  .remove (name);
      this [_userDefinedFields] .remove (name);
   },
   getUserDefinedField (name)
   {
      const field = getFieldFromArray (this [_userDefinedFields], name);

      if (field)
         return field;

      throw new Error (`Unknown user-defined field '${name}' in node class ${this .getTypeName ()}.`);
   },
   getUserDefinedFields ()
   {
      return this [_userDefinedFields];
   },
   /**
    *
    * @param {boolean} extended  also return user-defined fields and fields with routes
    * @returns Array<X3DField>
    */
   getChangedFields (extended = false)
   {
      const changedFields = [ ];

      if (extended)
      {
         for (const field of this [_userDefinedFields])
            changedFields .push (field);
      }

      for (const field of this [_predefinedFields])
      {
         if (extended)
         {
            if (field .getInputRoutes () .size || field .getOutputRoutes () .size)
            {
               changedFields .push (field);
               continue;
            }
         }

         if (field .getReferences () .size === 0)
         {
            if (!field .isInitializable ())
               continue;

            if (this .isDefaultValue (field))
               continue;
         }

         changedFields .push (field);
      }

      return changedFields;
   },
   isDefaultValue (field)
   {
      const
         name = field .getName (),
         f    = this [_userDefinedFields] .get (name) ?? this [_predefinedFields] .get (name);

      const fieldDefinition = f === field
         ? this [_fieldDefinitions] .get (name)
         : this .constructor .fieldDefinitions ?.get (name);

      return fieldDefinition ?.value .equals (field) ?? field .getModificationTime () < 0;
   },
   getExtendedEventHandling ()
   {
      // Whether initializeOnly field are treated like inputOnly and inputOutput fields.
      return true;
   },
   addEvent (field)
   {
      if (field .isTainted ())
      {
         field .setModificationTime (Date .now () / 1000);
         return;
      }

      // if (this .getTypeName () === "HAnimMotion")
      // {
      //    console .log (field .getName ());
      //    console .trace ();
      // }

      field .setTainted (true);

      this .addEventObject (field, Events .create (field));
   },
   addEventObject (field, event)
   {
      const browser = this [_browser];

      field .setModificationTime (Date .now () / 1000);

      // Register for processEvent

      browser .addTaintedField (field, event);
      browser .addBrowserEvent ();

      // Register for eventsProcessed

      if (this .isTainted ())
         return;

      if (field .isInput () || (this .getExtendedEventHandling () && field .isInitializable ()))
      {
         this .addNodeEvent ();
      }
   },
   addNodeEvent ()
   {
      this .setModificationTime (Date .now () / 1000);

      if (this .isTainted ())
         return;

      // if (this .getTypeName () === "HAnimMotion")
      // {
      //    console .trace ();
      // }

      const browser = this [_browser];

      this .setTainted (true);
      browser .addTaintedNode (this);
      browser .addBrowserEvent ();
   },
   parentsChanged ()
   {
      const time = this [_browser] .getCurrentTime ();

      if (this [_executionContext])
         this [_executionContext] ._sceneGraph_changed = time;

      this ._parents_changed = time;
   },
   dispose ()
   {
      this .getOuterNode ?.()  ?.getLive () .removeInterest (_set_live__, this);
      this [_executionContext] ?.getLive () .removeInterest (_set_live__, this);
      this [_browser]          ?.getLive () .removeInterest (_set_live__, this);

      this .setLive (false);

      for (const field of this [_childObjects])
         field .dispose ();

      for (const field of this [_predefinedFields])
         field .dispose ();

      for (const field of this [_userDefinedFields])
         field .dispose ();

      X3DChildObject .prototype .dispose .call (this);
   },
});

const getFieldFromArray = (() =>
{
   const
      set_field     = /^set_(.*?)$/,
      field_changed = /^(.*?)_changed$/;

   return function (array, name)
   {
      const field = array .get (name);

      if (field)
         return field;

      const match = name .match (set_field);

      if (match)
      {
         const field = array .get (match [1]);

         if (field ?.getAccessType () === X3DConstants .inputOutput)
            return field;
      }
      else
      {
         const match = name .match (field_changed);

         if (match)
         {
            const field = array .get (match [1]);

            if (field ?.getAccessType () === X3DConstants .inputOutput)
               return field;
         }
      }
   };
})();

for (const key of Object .keys (X3DBaseNode .prototype))
   Object .defineProperty (X3DBaseNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DBaseNode .prototype,
{
   name_changed:
   {
      get () { return this ._name_changed; },
      enumerable: false,
   },
   typeName_changed:
   {
      get () { return this ._typeName_changed; },
      enumerable: false,
   },
   parents_changed:
   {
      get () { return this ._parents_changed; },
      enumerable: false,
   },
});

export default X3DBaseNode;
