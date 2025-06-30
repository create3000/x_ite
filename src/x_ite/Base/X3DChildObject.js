import X3DObject       from "./X3DObject.js";
import IterableWeakSet from "./IterableWeakSet.js";

const
   _modificationTime = Symbol (),
   _tainted          = Symbol (),
   _parents          = Symbol (),
   _private          = Symbol ();

const EMPTY = [ ];

function X3DChildObject ()
{
   X3DObject .call (this);
}

Object .assign (Object .setPrototypeOf (X3DChildObject .prototype, X3DObject .prototype),
{
   [_modificationTime]: -1,
   [_tainted]: false,
   [_parents]: null,
   [_private]: false,
   isInitializable ()
   {
      return true;
   },
   isInput ()
   {
      return false;
   },
   isOutput ()
   {
      return false;
   },
   setModificationTime (value)
   {
      this [_modificationTime] = value;
   },
   getModificationTime ()
   {
      return this [_modificationTime];
   },
   setTainted (value)
   {
      this [_tainted] = value;
   },
   isTainted ()
   {
      return this [_tainted];
   },
   addEvent ()
   {
      for (const parent of this [_parents] ?? EMPTY)
         parent .addEvent (this);
   },
   addEventObject (field, event)
   {
      for (const parent of this [_parents] ?? EMPTY)
         parent .addEventObject (this, event);
   },
   processEvent ()
   {
      this .setTainted (false);
      this .processInterests ();
   },
   isPrivate ()
   {
      return this [_private];
   },
   setPrivate (value)
   {
      this [_private] = value;
   },
   collectCloneCount ()
   {
      let cloneCount = 0;

      for (const parent of this [_parents] ?? EMPTY)
      {
         if (parent [_private])
            continue;

         cloneCount += parent .collectCloneCount ();
      }

      return cloneCount;
   },
   addParent (parent)
   {
      this .getParents () .add (parent);

      this .parentsChanged ();
   },
   removeParent (parent)
   {
      this [_parents] ?.delete (parent);

      this .parentsChanged ();
   },
   getParents ()
   {
      return this [_parents] ??= new IterableWeakSet ();
   },
   parentsChanged ()
   { },
   dispose ()
   {
      this [_parents] ?.clear ();

      X3DObject .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DChildObject .prototype))
   Object .defineProperty (X3DChildObject .prototype, key, { enumerable: false });

export default X3DChildObject;
