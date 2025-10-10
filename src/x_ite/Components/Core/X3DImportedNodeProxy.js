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
   ... Object .fromEntries ([
      ["getComponentInfo",      "componentInfo"],
      ["getContainerField",     "containerField"],
      ["getSpecificationRange", "specificationRange"],
      ["getTypeName",           "typeName"],
   ]
   .map (([fn, property]) => [fn, function ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () [fn] ())
         ?? this [_type] [property];
   }])),
   ... Object .fromEntries ([
      "getType",
      "getName",
      "getDisplayName",
      "getFieldDefinitions",
      "getPredefinedField",
      "getPredefinedFields",
      "getUserDefinedField",
      "getUserDefinedFields",
      "getFields",
      "getChangedFields",
      "isDefaultValue",
      "hasRoutes",
   ]
   .map (fn => [fn, function (... args)
   {
      return $.try (() => this [_importedNode] .getExportedNode () [fn] (... args))
         ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
   set_loadState__ (loadState)
   {
      if (loadState .getValue () === X3DConstants .COMPLETE_STATE)
         this [_type] = this [_importedNode] .getExportedNode () .constructor;

      X3DChildObject .prototype .addEvent .call (this);
   },
   toVRMLStream (generator)
   {
      generator .string += "USE";
      generator .string += generator .Space ();
      generator .string += this [_importedNode] .getImportedName ();
   },
   toXMLStream (generator)
   {
      generator .openTag (this .getTypeName ());

      if (generator .html && this .getTypeName () === "Script")
         generator .attribute ("type", "model/x3d+xml");

      generator .attribute ("USE", this [_importedNode] .getImportedName ());

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
      generator .beginObject (this .getTypeName (), false, true);
      generator .stringProperty ("@USE", this [_importedNode] .getImportedName (), false);
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
