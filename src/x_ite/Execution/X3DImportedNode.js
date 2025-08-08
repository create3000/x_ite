import X3DObject   from "../Base/X3DObject.js";
import SFNodeCache from "../Fields/SFNodeCache.js";

const
   _executionContext = Symbol (),
   _inlineNode       = Symbol (),
   _exportedName     = Symbol (),
   _importedName     = Symbol (),
   _routes           = Symbol (),
   _real             = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName)
{
   X3DObject .call (this);

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
      return this .getInlineNode () .getInternalScene () .getExportedNode (this [_exportedName]) .getValue ();
   },
   getImportedName ()
   {
      return this [_importedName];
   },
   [Symbol .for ("X_ITE.X3DImportedNode.setImportName")] (importName)
   {
      this [_importedName] = importName;
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

      generator .string += generator .Indent ();
      generator .string += "<IMPORT";
      generator .string += generator .Space ();
      generator .string += "inlineDEF='";
      generator .string += generator .XMLEncode (generator .Name (this .getInlineNode ()));
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "importedDEF='";
      generator .string += generator .XMLEncode (this .getExportedName ());
      generator .string += "'";

      if (importedName !== this .getExportedName ())
      {
         generator .string += generator .Space ();
         generator .string += "AS='";
         generator .string += generator .XMLEncode (importedName);
         generator .string += "'";
      }

      generator .string += generator .closingTags ? "></IMPORT>" : "/>";
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toJSONStream: Inline node does not exist.");

      generator .AddRouteNode (this);

      const importedName = generator .ImportedName (this);

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "IMPORT";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@inlineDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (generator .Name (this .getInlineNode ()));
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@importedDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getExportedName ());
      generator .string += '"';

      if (importedName !== this .getExportedName ())
      {
         generator .string += ',';
         generator .string += generator .TidyBreak ();
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "@AS";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '"';
         generator .string += generator .JSONEncode (importedName);
         generator .string += '"';
         generator .string += generator .TidyBreak ();
      }
      else
      {
         generator .string += generator .TidyBreak ();
      }

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
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
