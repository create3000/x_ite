import X3DObject               from "../Base/X3DObject.js";
import SFNodeCache             from "../Fields/SFNodeCache.js";
import X3DImportedNodeInstance from "../Components/Core/X3DImportedNodeInstance.js";

const
   _executionContext = Symbol (),
   _inlineNode       = Symbol (),
   _exportedName     = Symbol (),
   _importedName     = Symbol (),
   _instance         = Symbol (),
   _description      = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName, description)
{
   X3DObject .call (this);

   // Private properties

   this [_executionContext] = executionContext;
   this [_inlineNode]       = inlineNode;
   this [_exportedName]     = exportedName;
   this [_importedName]     = importedName;
   this [_description]      = description;

   this .refreshInstance ();
}

Object .assign (Object .setPrototypeOf (X3DImportedNode .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getInlineNode ()
   {
      return this [_inlineNode];
   },
   getExportedName ()
   {
      return this [_exportedName];
   },
   getExportedNode ()
   {
      const exportedNode = this .getInlineNode () .getInternalScene () .getExportedNodes () .get (this [_exportedName]);

      if (exportedNode)
         return exportedNode .getLocalNode ();

      throw new Error (`Exported node '${this [_exportedName]}' not found.`);
   },
   getImportedName ()
   {
      return this [_importedName];
   },
   setImportName (importedName)
   {
      this [_instance] .setName (importedName);

      this [_importedName] = importedName;
   },
   getInstance ()
   {
      return this [_instance];
   },
   refreshInstance ()
   {
      if (this [_instance] && !this [_executionContext] .getImportedNodes () .has (this [_importedName]))
         return;

      this [_instance] = new X3DImportedNodeInstance (this .getExecutionContext (), this);

      this [_instance] .setup ();
   },
   getDescription ()
   {
      return this [_description];
   },
   setDescription (value)
   {
      this [_description] = String (value);
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toVRMLStream: Inline node does not exist.");

      generator .AddRouteNode (this .getInstance ());

      const importedName = generator .ImportedName (this .getInstance ());

      generator .Indent ();
      generator .string += "IMPORT";
      generator .Space ();
      generator .string += generator .Name (this .getInlineNode ());
      generator .string += ".";
      generator .string += this .getExportedName ();

      if (importedName !== this .getExportedName ())
      {
         generator .Space ();
         generator .string += "AS";
         generator .Space ();
         generator .string += importedName;
      }

      if (this [_description])
      {
         generator .Space ();
         generator .string += "DESCRIPTION";
         generator .Space ();
         generator .string += '"';
         generator .string += this [_description];
         generator .string += '"';
      }
   },
   toXMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");

      generator .AddRouteNode (this .getInstance ());

      const importedName = generator .ImportedName (this .getInstance ());

      generator .openTag ("IMPORT");
      generator .attribute ("inlineDEF",   generator .Name (this .getInlineNode ()));
      generator .attribute ("importedDEF", this .getExportedName ());

      if (importedName !== this .getExportedName ())
         generator .attribute ("AS", importedName);

      if (this [_description])
         generator .attribute ("DESCRIPTION", this [_description]);

      generator .closeTag ("IMPORT");
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toJSONStream: Inline node does not exist.");

      generator .TidyBreak ();
      generator .Indent ();

      generator .AddRouteNode (this .getInstance ());
      generator .beginObject ("IMPORT", false, true);
      generator .stringProperty ("@inlineDEF",   generator .Name (this .getInlineNode ()), false);
      generator .stringProperty ("@importedDEF", this .getExportedName ());

      const importedName = generator .ImportedName (this .getInstance ());

      if (importedName !== this .getExportedName ())
         generator .stringProperty ("@AS", importedName);

      if (this [_description])
         generator .stringProperty ("@DESCRIPTION", this [_description]);

      generator .endObject ();
      generator .endObject ();
   },
   dispose ()
   {
      this [_executionContext] .removeImportedNode (this [_importedName]);

      this .instance .dispose ();

      X3DObject .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DImportedNode .prototype))
   Object .defineProperty (X3DImportedNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DImportedNode .prototype,
{
   inlineNode:
   {
      get ()
      {
         return SFNodeCache .get (this [_inlineNode]);
      },
      enumerable: true,
   },
   exportedName:
   {
      get: X3DImportedNode .prototype .getExportedName,
      enumerable: true,
   },
   exportedNode:
   {
      get ()
      {
         return SFNodeCache .get (this .getExportedNode ());
      },
      enumerable: true,
   },
   importedName:
   {
      get: X3DImportedNode .prototype .getImportedName,
      enumerable: true,
   },
   instance:
   {
      get ()
      {
         return SFNodeCache .get (this .getInstance ());
      },
      enumerable: true,
   },
   description:
   {
      get: X3DImportedNode .prototype .getDescription,
      set: X3DImportedNode .prototype .setDescription,
      enumerable: true,
   },
});

Object .defineProperties (X3DImportedNode,
{
   typeName:
   {
      value: "X3DImportedNode",
      enumerable: true,
   },
});

export default X3DImportedNode;
