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
   getTypeName ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getTypeName ())
         ?? "X3DImportedNode";
   },
   getName ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getName ())
         ?? "";
   },
   getFieldDefinitions ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getFieldDefinitions ())
         ?? X3DNode .prototype .getFieldDefinitions .call (this);
   },
   getPredefinedField (name)
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getPredefinedField (name))
         ?? X3DNode .prototype .getPredefinedField .call (this, name);
   },
   getPredefinedFields ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getPredefinedFields ())
         ?? X3DNode .prototype .getPredefinedFields .call (this);
   },
   getUserDefinedField (name)
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getUserDefinedField (name))
         ?? X3DNode .prototype .getUserDefinedField .call (this, name);
   },
   getUserDefinedFields ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getUserDefinedFields ())
         ?? X3DNode .prototype .getUserDefinedFields .call (this);
   },
   getFields ()
   {
      return $.try (() => this [_importedNode] .getExportedNode () .getFields ())
         ?? X3DNode .prototype .getFields .call (this);
   },
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
