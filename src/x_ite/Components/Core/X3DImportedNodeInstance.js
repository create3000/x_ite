import X3DChildObject from "../../Base/X3DChildObject.js";
import X3DConstants   from "../../Base/X3DConstants.js";
import X3DNode        from "./X3DNode.js";
import $              from "../../../lib/helper.js";

const _importedNode = Symbol ();

function X3DImportedNodeInstance (executionContext, importedNode)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DImportedNodeInstance);

   // Private properties

   this [_importedNode] = importedNode;
}

Object .assign (Object .setPrototypeOf (X3DImportedNodeInstance .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this .update ();
   },
   getExtendedEventHandling ()
   {
      return false;
   },
   getInnerNode ()
   {
      return this [_importedNode] .getExportedNode () .getInnerNode ();
   },
   getImportedNode ()
   {
      return this [_importedNode];
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
      return $.try (() => this .getInnerNode ()) ?.[fn] () ?? this .constructor [property];
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
      return $.try (() => this .getInnerNode ()) ?.[fn] (... args)
         ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
   update ()
   {
      this [_importedNode] .getInlineNode () ._loadState .removeInterest ("set_loadState__", this);

      this [_importedNode] = this .getExecutionContext () .getImportedNodes () .get (this [_importedNode] .getImportedName ())
         ?? null;

      this [_importedNode] .getInlineNode () ._loadState .addInterest ("set_loadState__", this);

      this .set_loadState__ ();
   },
   set_loadState__ ()
   {
      if (this [_importedNode] ?.getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE)
          $.try (() => this .getInnerNode ()) ?.addInterest ("addNodeEvent", this);

      this ._typeName_changed ?.setValue (Date .now () / 1000);

      X3DChildObject .prototype .addEvent .call (this);
   },
   toVRMLStream (generator)
   {
      generator .CheckSpace ();
      generator .string += "USE";
      generator .Space ();
      generator .string += this [_importedNode] .getImportedName ();
      generator .NeedsSpace ();
   },
   toXMLStream (generator)
   {
      generator .openTag (this .getTypeName ());

      if (generator .html && this .getTypeName () === "Script")
         generator .attribute ("type", "model/x3d+xml");

      generator .attribute ("USE", this [_importedNode] .getImportedName ());
      generator .containerField (this .getContainerField ());
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

Object .defineProperties (X3DImportedNodeInstance, X3DNode .getStaticProperties ("X3DImportedNodeInstance", "Core", 2, "children", "4.1"));

export default X3DImportedNodeInstance;
