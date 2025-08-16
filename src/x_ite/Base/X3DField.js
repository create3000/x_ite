import X3DChildObject  from "./X3DChildObject.js";
import X3DConstants    from "./X3DConstants.js";
import Events          from "./Events.js";
import IterableWeakSet from "./IterableWeakSet.js";

const
   _value               = Symbol (),
   _accessType          = Symbol (),
   _unit                = Symbol (),
   _references          = Symbol (),
   _referencesCallbacks = Symbol (),
   _fieldInterests      = Symbol (),
   _fieldCallbacks      = Symbol (),
   _inputRoutes         = Symbol (),
   _outputRoutes        = Symbol (),
   _routeCallbacks      = Symbol (),
   _uniformLocation     = Symbol .for ("X_ITE.X3DField.uniformLocation");

const EMPTY = [ ];

function X3DField (value)
{
   X3DChildObject .call (this);

   this [_value] = value;
}

Object .assign (Object .setPrototypeOf (X3DField .prototype, X3DChildObject .prototype),
{
   [_value]: undefined,
   [_accessType]: X3DConstants .initializeOnly,
   [_unit]: undefined,
   [_references]: null,
   [_referencesCallbacks]: null,
   [_fieldInterests]: null,
   [_fieldCallbacks]: null,
   [_inputRoutes]: null,
   [_outputRoutes]: null,
   [_routeCallbacks]: null,
   [_uniformLocation]: null,
   create ()
   {
      return new (this .constructor) ();
   },
   equals (field)
   {
      return this [_value] === field .valueOf ();
   },
   assign (field)
   {
      // Assigns field to this field.
      this .set (field .getValue ());
      this .addEvent ();
   },
   set (value)
   {
      // Sets internal value without generating event.
      this [_value] = value;
   },
   setValue (value)
   {
      // Sets internal value and generates event.
      this .set (value instanceof this .constructor ? value .getValue () : value);
      this .addEvent ();
   },
   getValue ()
   {
      return this [_value];
   },
   getType ()
   {
      return X3DConstants [this .constructor .typeName];
   },
   setAccessType (value)
   {
      this [_accessType] = value;
   },
   getAccessType ()
   {
      return this [_accessType];
   },
   isInitializable ()
   {
      return !! (this [_accessType] & X3DConstants .initializeOnly);
   },
   isInput ()
   {
      return !! (this [_accessType] & X3DConstants .inputOnly);
   },
   isOutput ()
   {
      return !! (this [_accessType] & X3DConstants .outputOnly);
   },
   isReadable ()
   {
      return this [_accessType] !== X3DConstants .inputOnly;
   },
   isWritable ()
   {
      return this [_accessType] !== X3DConstants .outputOnly;
   },
   setUnit (value)
   {
      this [_unit] = value;
   },
   getUnit ()
   {
      return this [_unit];
   },
   isReference (accessType)
   {
      return accessType === this [_accessType] || accessType === X3DConstants .inputOutput;
   },
   addReference (reference)
   {
      const references = this .getReferences ();

      if (references .has (reference))
         return;

      references .add (reference);

      // Create IS relationship

      switch (this .getAccessType () & reference .getAccessType ())
      {
         case X3DConstants .initializeOnly:
            reference .addFieldInterest (this);
            this .processEvent (Events .from (reference));
            break;
         case X3DConstants .inputOnly:
            reference .addFieldInterest (this);
            break;
         case X3DConstants .outputOnly:
            this .addFieldInterest (reference);
            break;
         case X3DConstants .inputOutput:
            reference .addFieldInterest (this);
            this .addFieldInterest (reference);
            this .processEvent (Events .from (reference));
            break;
      }

      this .processReferencesCallbacks ();
   },
   removeReference (reference)
   {
      this [_references] ?.delete (reference);

      // Create IS relationship

      switch (this .getAccessType () & reference .getAccessType ())
      {
         case X3DConstants .initializeOnly:
            reference .removeFieldInterest (this);
            break;
         case X3DConstants .inputOnly:
            reference .removeFieldInterest (this);
            break;
         case X3DConstants .outputOnly:
            this .removeFieldInterest (reference);
            break;
         case X3DConstants .inputOutput:
            reference .removeFieldInterest (this);
            this .removeFieldInterest (reference);
            break;
      }

      this .processReferencesCallbacks ();
   },
   getReferences ()
   {
      return this [_references] ??= new IterableWeakSet ();
   },
   addReferencesCallback (key, object)
   {
      this [_referencesCallbacks] = new Map (this [_referencesCallbacks]);

      this [_referencesCallbacks] .set (key, object);
   },
   removeReferencesCallback (key)
   {
      this [_referencesCallbacks] ?.delete (key);
   },
   getReferencesCallbacks ()
   {
      return this [_referencesCallbacks] ??= new Map ();
   },
   processReferencesCallbacks ()
   {
      for (const callback of this [_referencesCallbacks] ?.values () ?? EMPTY)
         callback ();
   },
   addFieldInterest (field)
   {
      // There must be no copy, because the event is not executed immediately.

      this .getFieldInterests () .add (field);
   },
   removeFieldInterest (field)
   {
      this [_fieldInterests] ?.delete (field);
   },
   getFieldInterests ()
   {
      return this [_fieldInterests] ??= new IterableWeakSet ();
   },
   addFieldCallback (key, object)
   {
      this [_fieldCallbacks] = new Map (this [_fieldCallbacks]);

      this [_fieldCallbacks] .set (key, object);
   },
   removeFieldCallback (key)
   {
      this [_fieldCallbacks] ?.delete (key);
   },
   getFieldCallbacks ()
   {
      return this [_fieldCallbacks] ??= new Map ();
   },
   addInputRoute (route)
   {
      this .getInputRoutes () .add (route);
      this .processRouteCallbacks ();
   },
   removeInputRoute (route)
   {
      this [_inputRoutes] ?.delete (route);

      this .processRouteCallbacks ();
   },
   getInputRoutes ()
   {
      return this [_inputRoutes] ??= new IterableWeakSet ();
   },
   addOutputRoute (route)
   {
      this .getOutputRoutes () .add (route);
      this .processRouteCallbacks ();
   },
   removeOutputRoute (route)
   {
      this [_outputRoutes] ?.delete (route);

      this .processRouteCallbacks ();
   },
   getOutputRoutes ()
   {
      return this [_outputRoutes] ??= new IterableWeakSet ();
   },
   addRouteCallback (key, object)
   {
      // Processed if routes are changed.

      this [_routeCallbacks] = new Map (this [_routeCallbacks]);

      this [_routeCallbacks] .set (key, object);
   },
   removeRouteCallback (key)
   {
      this [_routeCallbacks] ?.delete (key);
   },
   getRouteCallbacks ()
   {
      return this [_routeCallbacks] ??= new Map ();
   },
   processRouteCallbacks ()
   {
      for (const callback of this [_routeCallbacks] ?.values () ?? EMPTY)
         callback ();
   },
   processEvent (event = Events .create (this))
   {
      event .add (this);

      this .setTainted (false);

      const field = event .field;

      if (field !== this)
         this .set (field .getValue (), field .length);

      // Process interests.

      this .processInterests ();

      // Process routes.

      let first = true;

      for (const field of this [_fieldInterests] ?? EMPTY)
      {
         if (event .has (field))
            continue;

         if (first)
         {
            first = false;
            field .addEventObject (this, event);
         }
         else
         {
            field .addEventObject (this, Events .copy (event));
         }
      }

      if (first)
         Events .push (event);

      // Process field callbacks.

      for (const callback of this [_fieldCallbacks] ?.values () ?? EMPTY)
         callback (this .valueOf ());
   },
   fromString (string, scene)
   {
      this .fromVRMLString (string, scene);
   },
   fromVRMLString (string, scene)
   {
      // Function will be overridden in VRMLParser.
   },
   fromXMLString (string, scene)
   {
      // Function will be overridden in XMLParser.
   },
   dispose ()
   {
      for (const reference of this [_references] ?? EMPTY)
         reference .removeFieldInterest (this);

      for (const route of new Set (this [_inputRoutes]))
         route .dispose ();

      for (const route of new Set (this [_outputRoutes]))
         route .dispose ();

      this [_references]          ?.clear ();
      this [_referencesCallbacks] ?.clear ();
      this [_fieldInterests]      ?.clear ();
      this [_fieldCallbacks]      ?.clear ();
      this [_inputRoutes]         ?.clear ();
      this [_outputRoutes]        ?.clear ();
      this [_routeCallbacks]      ?.clear ();

      X3DChildObject .prototype .dispose .call (this);
   }
});

for (const key of Object .keys (X3DField .prototype))
   Object .defineProperty (X3DField .prototype, key, { enumerable: false });

export default X3DField;
