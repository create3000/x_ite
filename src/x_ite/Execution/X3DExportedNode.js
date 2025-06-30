import X3DObject   from "../Base/X3DObject.js";
import SFNodeCache from "../Fields/SFNodeCache.js";

const
   _executionContext = Symbol (),
   _exportedName     = Symbol (),
   _localNode        = Symbol ();

function X3DExportedNode (executionContext, exportedName, localNode)
{
   X3DObject .call (this);

   this [_executionContext] = executionContext;
   this [_exportedName]     = exportedName;
   this [_localNode]        = localNode;
}

Object .assign (Object .setPrototypeOf (X3DExportedNode .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getExportedName ()
   {
      return this [_exportedName];
   },
   getLocalNode ()
   {
      return this [_localNode];
   },
   toVRMLStream (generator)
   {
      const localName = generator .Name (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += "EXPORT";
      generator .string += generator .Space ();
      generator .string += localName;

      if (this [_exportedName] !== localName)
      {
         generator .string += generator .Space ();
         generator .string += "AS";
         generator .string += generator .Space ();
         generator .string += this [_exportedName];
      }
   },
   toXMLStream (generator)
   {
      const localName = generator .Name (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += "<EXPORT";
      generator .string += generator .Space ();
      generator .string += "localDEF='";
      generator .string += generator .XMLEncode (localName);
      generator .string += "'";

      if (this [_exportedName] !== localName)
      {
         generator .string += generator .Space ();
         generator .string += "AS='";
         generator .string += generator .XMLEncode (this [_exportedName]);
         generator .string += "'";
      }

      generator .string += generator .closingTags ? "></EXPORT>" : "/>";
   },
   toJSONStream (generator)
   {
      const localName = generator .Name (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "EXPORT";
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
      generator .string += "@localDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (localName);
      generator .string += '"';

      if (this [_exportedName] !== localName)
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
         generator .string += generator .JSONEncode (this [_exportedName]);
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
});

for (const key of Object .keys (X3DExportedNode .prototype))
   Object .defineProperty (X3DExportedNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DExportedNode .prototype,
{
   exportedName:
   {
      get ()
      {
         return this [_exportedName];
      },
      enumerable: true,
   },
   localNode:
   {
      get ()
      {
         return SFNodeCache .get (this [_localNode]);
      },
      enumerable: true,
   },
});

Object .defineProperties (X3DExportedNode,
{
   typeName:
   {
      value: "X3DExportedNode",
      enumerable: true,
   },
});

export default X3DExportedNode;
