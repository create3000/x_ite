import X3DObject            from "../Base/X3DObject.js";
import SFNodeCache          from "../Fields/SFNodeCache.js";
import X3DImportedNodeProxy from "../Components/Core/X3DImportedNodeProxy.js";

const
   _executionContext = Symbol (),
   _inlineNode       = Symbol (),
   _exportedName     = Symbol (),
   _importedName     = Symbol (),
   _proxyNodes       = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName)
{
   X3DObject .call (this);

   executionContext [_proxyNodes] ??= new Map ();

   this [_executionContext] = executionContext;
   this [_inlineNode]       = inlineNode;
   this [_exportedName]     = exportedName;
   this [_importedName]     = importedName;
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
   [Symbol .for ("X_ITE.X3DImportedNode.setImportName")] (importedName)
   {
      this .getProxyNode () .setName (importedName);

      this [_importedName] = importedName;
   },
   getProxyNode (type)
   {
      return this .getExecutionContext () [_proxyNodes] .get (this [_importedName])
         ?? this .createProxyNode (type);
   },
   createProxyNode (type)
   {
      const
         executionContext = this .getExecutionContext (),
         proxy            = new X3DImportedNodeProxy (executionContext, this [_importedName], type);

      executionContext [_proxyNodes] .set (this [_importedName], proxy);

      return proxy;
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toVRMLStream: Inline node does not exist.");

      generator .AddRouteNode (this);

      const importedName = generator .ImportedName (this);

      generator .string += generator .Indent ();
      generator .string += "IMPORT";
      generator .string += generator .Space ();
      generator .string += generator .Name (this .getInlineNode ());
      generator .string += ".";
      generator .string += this .getExportedName ();

      if (importedName !== this .getExportedName ())
      {
         generator .string += generator .Space ();
         generator .string += "AS";
         generator .string += generator .Space ();
         generator .string += importedName;
      }
   },
   toXMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");

      generator .AddRouteNode (this);

      const importedName = generator .ImportedName (this);

      generator .openTag ("IMPORT");
      generator .attribute ("inlineDEF",   generator .Name (this .getInlineNode ()));
      generator .attribute ("importedDEF", this .getExportedName ());

      if (importedName !== this .getExportedName ())
         generator .attribute ("AS", importedName);

      generator .closeTag ("IMPORT");
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toJSONStream: Inline node does not exist.");

      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();

      generator .AddRouteNode (this);
      generator .beginObject ("IMPORT", false, true);
      generator .stringProperty ("@inlineDEF",   generator .Name (this .getInlineNode ()), false);
      generator .stringProperty ("@importedDEF", this .getExportedName ());

      const importedName = generator .ImportedName (this);

      if (importedName !== this .getExportedName ())
         generator .stringProperty ("@AS", importedName);

      generator .endObject ();
      generator .endObject ();
   },
   dispose ()
   {
      for (const route of Array .from (this [_executionContext] .getRoutes ()))
      {
         if (route .getSourceNode () === this)
         {
            this [_executionContext] .deleteRoute (route);
            continue;
         }

         if (route .getDestinationNode () === this)
         {
            this [_executionContext] .deleteRoute (route);
            continue;
         }
      }

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
      get ()
      {
         return this [_exportedName];
      },
      enumerable: true,
   },
   exportedNode:
   {
      get ()
      {
         return this .getInlineNode () .getInternalScene () .getExportedNode (this [_exportedName]);
      },
      enumerable: true,
   },
   importedName:
   {
      get ()
      {
         return this [_importedName];
      },
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
