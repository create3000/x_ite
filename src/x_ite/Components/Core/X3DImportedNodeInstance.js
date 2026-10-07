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

      this [_importedNode] .getInlineNode () ._loadState .addInterest ("update", this);

      this .update ();
   },
   update ()
   {
      if (this [_importedNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE)
          $.try (() => this [_importedNode] .getExportedNode ()) ?.addInterest ("addNodeEvent", this);

      this ._typeName_changed ?.setValue (Date .now () / 1000);

      X3DChildObject .prototype .addEvent .call (this);
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
      "getTypeName",
      "getType",
      "getComponentInfo",
      "getContainerField",
      "getSpecificationRange",
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
      return $.try (() => this [_importedNode] .getExportedNode ()) ?.[fn] (... args)
         ?? X3DNode .prototype [fn] .call (this, ... args);
   }])),
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
   dispose ()
   {
      const executionContext = this .getExecutionContext ();

      for (const route of Array .from (executionContext .getRoutes ()))
      {
         if (route .getSourceNode () === this)
         {
            executionContext .deleteRoute (route);
            continue;
         }

         if (route .getDestinationNode () === this)
         {
            executionContext .deleteRoute (route);
            continue;
         }
      }

      this .getImportedNode () .refreshInstance ();

      X3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DImportedNodeInstance, X3DNode .getStaticProperties ("X3DImportedNodeInstance", "Core", 2, "children", "4.1"));

export default X3DImportedNodeInstance;
