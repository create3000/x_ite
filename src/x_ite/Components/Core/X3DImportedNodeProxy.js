import X3DChildObject from "../../Base/X3DChildObject.js";
import X3DNode        from "./X3DNode.js";

const _importedNode = Symbol ();

function X3DImportedNodeProxy (executionContext, importedNode)
{
   X3DNode .call (this, executionContext);

   this [_importedNode] = importedNode;

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
   getInnerNode ()
   {
      return this [_importedNode] .getExportedNode ();
   },
   ... Object .fromEntries ([
      "getTypeName",
      "getName",
      "getFieldDefinitions",
      "getPredefinedField",
      "getPredefinedFields",
      "getUserDefinedField",
      "getUserDefinedFields",
      "getFields",
   ]
   .map (fn => [fn, function (... args)
   {
      return $.try (() => this [_importedNode] .getExportedNode () [fn] (... args))
         ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
   set_loadState__ ()
   {
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

   },
   toJSONStream (generator)
   {

   },
});

Object .defineProperties (X3DImportedNodeProxy, X3DNode .getStaticProperties ("X3DImportedNodeProxy", "Core", 2, "children", "4.1"));

export default X3DImportedNodeProxy;
