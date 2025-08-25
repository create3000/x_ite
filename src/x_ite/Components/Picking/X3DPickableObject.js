import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";

function X3DPickableObject (executionContext)
{
   this .addType (X3DConstants .X3DPickableObject);

   // Private properties

   this .objectType = new Set ();
}

Object .assign (X3DPickableObject .prototype,
{
   initialize ()
   {
      this ._objectType .addInterest ("set_objectType__", this);

      this .set_objectType__ ();
   },
   getObjectType ()
   {
      return this .objectType;
   },
   set_objectType__ ()
   {
      this .objectType .clear ();

      for (const objectType of this ._objectType)
         this .objectType .add (objectType);
   },
   dispose ()
   { },
});

Object .defineProperties (X3DPickableObject, X3DNode .getStaticProperties ("X3DPickableObject", "Picking", 1));

export default X3DPickableObject;
