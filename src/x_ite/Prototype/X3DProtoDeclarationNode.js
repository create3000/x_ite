import Fields               from "../Fields.js";
import X3DBaseNode          from "../Base/X3DBaseNode.js";
import X3DPrototypeInstance from "../Components/Core/X3DPrototypeInstance.js";
import SFNodeCache          from "../Fields/SFNodeCache.js";
import X3DConstants         from "../Base/X3DConstants.js";

const _appinfo = Symbol ();

function X3DProtoDeclarationNode (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addType (X3DConstants .X3DProtoDeclarationNode);

   this .addChildObjects (X3DConstants .outputOnly, "updateInstances", new Fields .SFTime ());

   // Private properties

   this [_appinfo] = "";
}

Object .assign (Object .setPrototypeOf (X3DProtoDeclarationNode .prototype, X3DBaseNode .prototype),
{
   canUserDefinedFields ()
   {
      return true;
   },
   getAppinfo ()
   {
      return this [_appinfo];
   },
   setAppinfo (value)
   {
      this [_appinfo] = String (value);
   },
   createInstance (executionContext, setup = true /* non-public argument */)
   {
      if (setup === false)
      {
         return new X3DPrototypeInstance (executionContext, this);
      }
      else
      {
         const instance = new X3DPrototypeInstance (executionContext, this);

         instance .setup ();

         return SFNodeCache .get (instance);
      }
   },
   newInstance ()
   {
      return this .createInstance (this .getExecutionContext ());
   },
   requestUpdateInstances ()
   {
      this ._updateInstances = Date .now () / 1000;
   },
   updateInstances ()
   {
      this ._updateInstances .processEvent ();
   },
});

for (const key of Object .keys (X3DProtoDeclarationNode .prototype))
   Object .defineProperty (X3DProtoDeclarationNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DProtoDeclarationNode .prototype,
{
   name:
   {
      get: X3DProtoDeclarationNode .prototype .getName,
      enumerable: true,
   },
   fields:
   {
      get: X3DProtoDeclarationNode .prototype .getFieldDefinitions,
      enumerable: true,
   },
});

Object .defineProperties (X3DProtoDeclarationNode,
{
   typeName:
   {
      value: "X3DProtoDeclarationNode",
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DProtoDeclarationNode .typeName);

export default X3DProtoDeclarationNode;
