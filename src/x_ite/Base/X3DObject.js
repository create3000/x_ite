import VRMLGenerator from "../InputOutput/VRMLGenerator.js";
import XMLGenerator  from "../InputOutput/XMLGenerator.js";
import JSONGenerator from "../InputOutput/JSONGenerator.js";
import Features      from "../Features.js";

const
   _name          = Symbol (),
   _interests     = Symbol (),
   _registry      = Symbol (),
   _userData      = Symbol (),
   _vrmlGenerator = Symbol (),
   _xmlGenerator  = Symbol (),
   _jsonGenerator = Symbol ();

function X3DObject () { }

Object .assign (X3DObject .prototype,
{
   [_name]: "",
   [_interests]: null,
   [_registry]: null,
   [_userData]: null,
   getId ()
   {
      return X3DObject .getId (this);
   },
   getTypeName ()
   {
      return this .constructor .typeName;
   },
   setName (value)
   {
      this [_name] = value;
   },
   getName ()
   {
      return this [_name];
   },
   getDisplayName ()
   {
      return this [_name];
   },
   hasInterest (callbackName, object)
   {
      return this [_interests] ?.has (X3DObject .getInterestId (object [callbackName], object)) ?? false;
   },
   addInterest (callbackName, object, ... args)
   {
      const
         weakRef    = new WeakRef (object),
         callback   = object [callbackName],
         interestId = X3DObject .getInterestId (callback, object);

      this [_registry] ??= new FinalizationRegistry (objectId =>
      {
         for (const interestId of this [_interests] .keys ())
         {
            if (interestId .endsWith (objectId))
               this [_interests] .delete (interestId);
         }
      });

      this [_interests] = new Map (this [_interests]);

      this [_registry] .register (object, interestId .replace (/^[^:]+/, ""), object);
      this [_interests] .set (interestId, { callback, weakRef, args });
   },
   removeInterest (callbackName, object)
   {
      this [_interests] ?.delete (X3DObject .getInterestId (object [callbackName], object));
   },
   getInterests ()
   {
      return this [_interests] ??= new Map ();
   },
   processInterests: (() =>
   {
      const EMPTY = [ ];

      return function ()
      {
         for (const { callback, weakRef, args } of this [_interests] ?.values () ?? EMPTY)
         {
            const object = weakRef .deref ();

            if (object)
               callback .call (object, ... args, this);
         }
      };
   })(),
   getUserData (key)
   {
      return this [_userData] ?.get (key);
   },
   setUserData (key, value)
   {
      this [_userData] ??= new Map ();

      this [_userData] .set (key, value);
   },
   removeUserData (key)
   {
      this [_userData] ?.delete (key);
   },
   toString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? X3DObject [_vrmlGenerator] ??= new VRMLGenerator ()
         : new VRMLGenerator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toVRMLString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? X3DObject [_vrmlGenerator] ??= new VRMLGenerator ()
         : new VRMLGenerator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toVRMLStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toXMLString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? X3DObject [_xmlGenerator] ??= new XMLGenerator ()
         : new XMLGenerator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toXMLStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toJSONString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? X3DObject [_jsonGenerator] ??= new JSONGenerator ()
         : new JSONGenerator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toJSONStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toStream (generator)
   {
      generator .string = Object .prototype .toString .call (this);
   },
   dispose ()
   {
      this [_interests] ?.clear ();
      this [_userData]  ?.clear ();
   },
});

for (const key of Object .keys (X3DObject .prototype))
   Object .defineProperty (X3DObject .prototype, key, { enumerable: false });

Object .defineProperties (X3DObject .prototype,
{
   [Symbol .toStringTag]:
   {
      get () { return this .getTypeName (); },
   },
   // using and Symbol.dispose are currently not yet supported by Safari.
   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using
   // [Symbol .dispose]:
   // {
   //    get () { return this .dispose (); },
   // },
});

Object .assign (X3DObject,
{
   [_vrmlGenerator]: null,
   [_xmlGenerator]: null,
   [_jsonGenerator]: null,
   getId: Features .FINALIZATION_REGISTRY ? (() =>
   {
      const
         map      = new WeakMap (),
         cache    = [ ],
         registry = new FinalizationRegistry (id => cache .push (id));

      let counter = 0;

      return function (object)
      {
         const id = map .get (object);

         if (id !== undefined)
         {
            return id;
         }
         else
         {
            const id = cache .pop () ?? ++ counter;

            map .set (object, id);
            registry .register (object, id);

            return id;
         }
      };
   })() : (() =>
   {
      const map = new WeakMap ();

      let counter = 0;

      return function (object)
      {
         const id = map .get (object);

         if (id !== undefined)
            return id;

         map .set (object, ++ counter);

         return counter;
      };
   })(),
   getInterestId (callback, object)
   {
      return `${this .getId (callback)}:${this .getId (object)}`;
   },
});

export default X3DObject;
