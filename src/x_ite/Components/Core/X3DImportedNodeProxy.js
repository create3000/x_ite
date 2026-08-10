import X3DChildObject from "../../Base/X3DChildObject.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DNode        from "./X3DNode.js";
import $              from "../../../lib/helper.js";

const
   _importedName = Symbol (),
   _importedNode = Symbol (),
   _type         = Symbol (),
   _functions    = Symbol ();

const handler =
{
   get (target, key, receiver)
   {
      if (Reflect .has (target, key))
         return Reflect .get (target, key, receiver);

      const node = target .getSharedNode ();

      if (node)
      {
         const property = Reflect .get (node, key, receiver);

         if (typeof property === "function")
         {
            return target [_functions] .get (key) ?? (() =>
            {
               const func = property .bind (node);

               target [_functions] .set (key, func);

               return func;
            })();
         }

         return property;
      }
   },
   set (target, key, value, receiver)
   {
      if (Reflect .has (target, key))
      {
         return Reflect .set (target, key, value, receiver);
      }
      else
      {
         const node = target .getSharedNode ();

         if (node)
            return Reflect .set (node, key, value, receiver);

         return false;
      }
   },
   has (target, key)
   {
      return Reflect .has (target, key)
         ?? Reflect .has (target .getSharedNode () ?? { }, key);
   },
   ownKeys (target)
   {
      return Array .from (new Set (Reflect .ownKeys (target)
         .concat (Reflect .ownKeys (target .getSharedNode () ?? { }))));
   },
   getOwnPropertyDescriptor (target, key)
   {
      return Reflect .getOwnPropertyDescriptor (target, key)
         ?? Reflect .getOwnPropertyDescriptor (target .getSharedNode () ?? { }, key);
   },
};

function X3DImportedNodeProxy (executionContext, importedName, type)
{
   X3DNode .call (this, executionContext);

   const proxy = new Proxy (this, handler);

   this [_importedName] = importedName;
   this [_type]         = type;
   this [_functions]    = new Map ();

   this .setup ();

   return proxy;
}

Object .assign (Object .setPrototypeOf (X3DImportedNodeProxy .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this .getExecutionContext () .importedNodes .addInterest ("update", this);

      this .update ();
   },
   getExtendedEventHandling ()
   {
      return false;
   },
   setTypeHint (value)
   {
      this [_type] ??= value;
   },
   getSharedNode ()
   {
      return $.try (() => this [_importedNode] .getSharedNode ()) ?? null;
   },
   getImportedNode ()
   {
      return this [_importedNode];
   },
   getInnerNode ()
   {
      return this [_importedNode] .getSharedNode () .getInnerNode ();
   },
   getName ()
   {
      return this [_importedName];
   },
   setName (value)
   {
      this [_importedName] = value;

      this ._name_changed = Date .now () / 1000;
   },
   ... Object .fromEntries ([
      ["getComponentInfo",      "componentInfo"],
      ["getContainerField",     "containerField"],
      ["getSpecificationRange", "specificationRange"],
      ["getTypeName",           "typeName"],
   ]
   .map (([fn, property]) => [fn, function ()
   {
      return this .getSharedNode () ?.[fn] () ?? this .constructor [property];
   }])),
   ... Object .fromEntries ([
      "getType",
      "getFieldDefinitions",
      "getPredefinedField",
      "getPredefinedFields",
      "getUserDefinedField",
      "getUserDefinedFields",
      "getField",
      "getFields",
      "getChangedFields",
      "isDefaultValue",
      "hasRoutes",
   ]
   .map (fn => [fn, function (... args)
   {
      return this .getSharedNode () ?.[fn] (... args) ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
   update ()
   {
      const importedNode = this .getExecutionContext () .getImportedNodes () .get (this [_importedName])
         ?? null;

      this [_importedNode] ?.getInlineNode () ._loadState .removeInterest ("set_loadState__", this);

      this [_importedNode] = importedNode;

      this [_importedNode] ?.getInlineNode () ._loadState .addInterest ("set_loadState__", this);

      this .set_loadState__ ();
   },
   set_loadState__ ()
   {
      if (this [_importedNode] ?.getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE)
         this [_type] = this .getSharedNode () ?.constructor ?? this [_type];

      this ._typeName_changed = Date .now () / 1000;

      X3DChildObject .prototype .addEvent .call (this);
   },
   toVRMLStream (generator)
   {
      generator .CheckSpace ();
      generator .string += "USE";
      generator .Space ();
      generator .string += this [_importedName];
      generator .NeedsSpace ();
   },
   toXMLStream (generator)
   {
      generator .openTag (this .getTypeName ());

      if (generator .html && this .getTypeName () === "Script")
         generator .attribute ("type", "model/x3d+xml");

      generator .attribute ("USE", this [_importedName]);
      generator .containerField (this .getContainerField ());
      generator .closeTag (this .getTypeName ());
   },
   toJSONStream (generator)
   {
      generator .beginObject (this .getTypeName (), false, true);
      generator .stringProperty ("@USE", this [_importedName], false);
      generator .endObject ();
      generator .endObject ();
   },
});

Object .defineProperties (X3DImportedNodeProxy .prototype,
{
   constructor:
   {
      get ()
      {
         return this [_type] ?? X3DNode;
      },
   }
});

Object .defineProperties (X3DImportedNodeProxy, X3DNode .getStaticProperties ("X3DImportedNodeProxy", "Core", 2, "children", "4.1"));

export default X3DImportedNodeProxy;
