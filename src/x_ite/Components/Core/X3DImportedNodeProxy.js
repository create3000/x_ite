import X3DChildObject from "../../Base/X3DChildObject.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DNode        from "./X3DNode.js";

const
   _importedNode = Symbol (),
   _type         = Symbol ();

function X3DImportedNodeProxy (executionContext, importedNode, type = X3DNode)
{
   X3DNode .call (this, executionContext);

   this [_importedNode] = importedNode;
   this [_type]         = type;

   this .setup ();
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
         this [_type] = this .valueOf () .constructor;

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
