import X3DChildObject from "../../Base/X3DChildObject.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DNode        from "./X3DNode.js";

const
   _importedNode = Symbol (),
   _type         = Symbol ();

const handler =
{
   get (target, key)
   {
      if (key in target)
         return target [key];

      const property = target .valueOf () ?.[key];

      if (typeof property === "function")
         return property .bind (target .valueOf ());

      return property;
   },
   set (target, key, value)
   {
      if (key in target)
      {
         target [key] = value;
      }
      else
      {
         const node = target .valueOf ();

         if (node)
            node [key] = value;
      }

      return true;
   },
   has (target, key)
   {
      return key in (target .valueOf () ?? { });
   },
   ownKeys (target)
   {
      return Object .keys (target .valueOf () ?? { });
   },
   getOwnPropertyDescriptor (target, key)
   {
      return Object .getOwnPropertyDescriptor (target .valueOf () ?? { }, key);
   },
}

function X3DImportedNodeProxy (executionContext, importedNode, type = X3DNode)
{
   X3DNode .call (this, executionContext);

   const proxy = new Proxy (this, handler);

   this [_importedNode] = importedNode;
   this [_type]         = type;

   this .setup ();

   return proxy;
}

Object .assign (Object .setPrototypeOf (X3DImportedNodeProxy .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this [_importedNode] .getInlineNode () ._loadState .addInterest ("set_loadState__", this);

      this .set_loadState__ ();
   },
   getExtendedEventHandling ()
   {
      return false;
   },
   getExecutionContext ()
   {
      return X3DNode .prototype .getExecutionContext .call (this);
   },
   getImportedNode ()
   {
      return this [_importedNode];
   },
   getInnerNode ()
   {
      return this [_importedNode] .getExportedNode ();
   },
   getName ()
   {
      return this [_importedNode] .getImportedName ();
   },
   ... Object .fromEntries ([
      ["getComponentInfo",      "componentInfo"],
      ["getContainerField",     "containerField"],
      ["getSpecificationRange", "specificationRange"],
      ["getTypeName",           "typeName"],
   ]
   .map (([fn, property]) => [fn, function ()
   {
      return this .valueOf () ?.[fn] () ?? this [_type] [property];
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
      return this .valueOf () ?.[fn] (... args) ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
   set_loadState__ ()
   {
      if (this [_importedNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE)
         this [_type] = this .valueOf () ?.constructor ?? this [_type];

      this ._typeName_changed = Date .now () / 1000;

      X3DChildObject .prototype .addEvent .call (this);
   },
   valueOf ()
   {
      return $.try (() => this [_importedNode] .getExportedNode ()) ?? null;
   },
   toVRMLStream (generator)
   {
      const importedName = generator .ImportedName (this [_importedNode]);

      generator .string += "USE";
      generator .string += generator .Space ();
      generator .string += importedName;
   },
   toXMLStream (generator)
   {
      const importedName = generator .ImportedName (this [_importedNode]);

      generator .openTag (this .getTypeName ());

      if (generator .html && this .getTypeName () === "Script")
         generator .attribute ("type", "model/x3d+xml");

      generator .attribute ("USE", importedName);

      const containerField = generator .ContainerField ();

      if (containerField)
      {
         if (containerField .getName () !== this .getContainerField ())
            generator .attribute ("containerField", containerField .getName ());
      }

      generator .closeTag (this .getTypeName ());
   },
   toJSONStream (generator)
   {
      const importedName = generator .ImportedName (this [_importedNode]);

      generator .beginObject (this .getTypeName (), false, true);
      generator .stringProperty ("@USE", importedName, false);
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
         return this [_type] ?? X3DImportedNodeProxy;
      },
   }
});

Object .defineProperties (X3DImportedNodeProxy, X3DNode .getStaticProperties ("X3DImportedNodeProxy", "Core", 2, "children", "4.1"));

export default X3DImportedNodeProxy;
