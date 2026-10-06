import X3DObject               from "../Base/X3DObject.js";
import SFNodeCache             from "../Fields/SFNodeCache.js";
import X3DImportedNodeInstance from "../Components/Core/X3DImportedNodeInstance.js";

const
   _executionContext = Symbol (),
   _inlineNode       = Symbol (),
   _exportedName     = Symbol (),
   _importedName     = Symbol (),
   _description      = Symbol (),
   _instances    = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName, description)
{
   X3DObject .call (this);

   // Private properties

   this [_executionContext] = executionContext;
   this [_inlineNode]       = inlineNode;
   this [_exportedName]     = exportedName;
   this [_importedName]     = importedName;
   this [_description]      = description;
   this [_instances]        = executionContext [_instances] ??= new Map ();
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
      const
         instance  = this .getInstance (),
         instances = this [_instances];

      instances .delete (this [_importedName]);
      instances .set (importedName, instance);

      this [_importedName] = importedName;

      instance .setName (importedName);
   },
   getInstance ()
   {
      return this [_instances] .get (this [_importedName]) ?? (() =>
      {
         const instance = new X3DImportedNodeInstance (this .getExecutionContext (), this [_importedName]);

         instance .setup ();

         this [_instances] .set (this [_importedName], instance);

         return instance;
      })();
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

      generator .AddRouteNode (this);

      const importedName = generator .ImportedName (this);

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

      generator .AddRouteNode (this);

      const importedName = generator .ImportedName (this);

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

      generator .AddRouteNode (this);
      generator .beginObject ("IMPORT", false, true);
      generator .stringProperty ("@inlineDEF",   generator .Name (this .getInlineNode ()), false);
      generator .stringProperty ("@importedDEF", this .getExportedName ());

      const importedName = generator .ImportedName (this);

      if (importedName !== this .getExportedName ())
         generator .stringProperty ("@AS", importedName);

      if (this [_description])
         generator .stringProperty ("@DESCRIPTION", this [_description]);

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
