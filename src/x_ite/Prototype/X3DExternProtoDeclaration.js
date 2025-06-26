import Fields                  from "../Fields.js";
import X3DFieldDefinition      from "../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../Base/FieldDefinitionArray.js";
import X3DUrlObject            from "../Components/Networking/X3DUrlObject.js";
import X3DProtoDeclarationNode from "./X3DProtoDeclarationNode.js";
import X3DConstants            from "../Base/X3DConstants.js";

const
   _proto = Symbol (),
   _scene = Symbol (),
   _cache = Symbol ();

function X3DExternProtoDeclaration (executionContext, url)
{
   X3DProtoDeclarationNode .call (this, executionContext);
   X3DUrlObject            .call (this, executionContext);

   this .addType (X3DConstants .X3DExternProtoDeclaration)

   this .addChildObjects (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true),
                          X3DConstants .inputOutput, "url",                  url .copy (), // Must be of type MFString.
                          X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0),
                          X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600));

   this .getBrowser () [_cache] ??= new Map ();
}

Object .assign (Object .setPrototypeOf (X3DExternProtoDeclaration .prototype, X3DProtoDeclarationNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DProtoDeclarationNode .prototype .initialize .call (this);
      X3DUrlObject            .prototype .initialize .call (this);
   },
   canUserDefinedFields ()
   {
      return true;
   },
   setProtoDeclaration (proto)
   {
      this [_proto] = proto;

      if (proto)
      {
         this .getFieldDefinitions ()  .assign (proto .getFieldDefinitions ());
         this .getUserDefinedFields () .assign (proto .getUserDefinedFields ());
      }

      this .updateInstances ();
   },
   getProtoDeclaration ()
   {
      return this [_proto];
   },
   async loadData ()
   {
      const browser = this .getBrowser ();

      if (!this ._url .length)
      {
         this .setError (new Error ("No URL given."));
         return;
      }

      const { default: FileLoader } = await import ("../InputOutput/FileLoader.js");

      for (const url of this ._url)
      {
         try
         {
            const
               fileURL  = new URL (url, this .getExecutionContext () .getBaseURL ()),
               cacheURL = new URL (fileURL),
               cache    = browser .getBrowserOption ("Cache");

            cacheURL .hash = "";

            const cachePromise = cache
               ? browser [_cache] .get (cacheURL .href)
               : null;

            const promise = cachePromise ?? new Promise (resolve =>
            {
               new FileLoader (this) .createX3DFromURL ([cacheURL], null, resolve);
            });

            if (!cachePromise && !cacheURL .search)
               browser [_cache] .set (cacheURL .href, promise);

            const scene = await promise;

            if (!scene)
               continue;

            this .setInternalScene (scene, fileURL, cache);
            return;
         }
         catch (error)
         {
            console .warn (error .message);
         }
      }

      this .setError (new Error ("File could not be loaded."));
   },
   getInternalScene ()
   {
      ///  Returns the internal X3DScene of this extern proto, that is loaded from the url given.

      return this [_scene];
   },
   setInternalScene (scene, fileURL, cache)
   {
      const browser = this .getBrowser ();

      if (this [_scene] !== browser .getDefaultScene () && !this [_cache])
         this [_scene] ?.dispose ();

      this [_scene] = scene;
      this [_cache] = cache;

      const
         protoName = decodeURIComponent (fileURL .hash .substring (1)),
         proto     = protoName ? this [_scene] .protos .get (protoName) : this [_scene] .protos [0];

      if (!proto)
         throw new Error ("PROTO not found");

      this [_scene] .setExecutionContext (this [_cache] ? browser .getDefaultScene () : this .getExecutionContext ());
      this [_scene] .setLive (true);

      this .setLoadState (X3DConstants .COMPLETE_STATE);
      this .setProtoDeclaration (proto);
   },
   setError (error)
   {
      console .error (`Error loading extern prototype '${this .getName ()}':`, error);

      this [_scene] = this .getBrowser () .getDefaultScene ();

      this .setLoadState (X3DConstants .FAILED_STATE);
      this .setProtoDeclaration (null);
   },
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "EXTERNPROTO";
      generator .string += generator .Space ();
      generator .string += this .getName ();
      generator .string += generator .TidySpace ();
      generator .string += "[";

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length === 0)
      {
         generator .string += generator .TidySpace ();
      }
      else
      {
         let
            fieldTypeLength   = 0,
            accessTypeLength  = 0;

         for (const field of userDefinedFields)
         {
            fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
            accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
         }

         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         const last = userDefinedFields .at (-1);

         for (const field of userDefinedFields)
         {
            this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

            if (field === last)
               generator .string += generator .TidyBreak ();
            else
               generator .string += generator .Break ();
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
      }

      generator .string += "]";
      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();

      this ._url .toVRMLStream (generator);
   },
   toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength)
   {
      generator .string += generator .Indent ();
      generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
      generator .string += generator .Space ();
      generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
      generator .string += generator .Space ();
      generator .string += field .getName ();
   },
   toXMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<ExternProtoDeclare";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .getName ());
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "url='";

      this ._url .toXMLStream (generator);

      generator .string += "'";

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .string += ">";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += "<field";
            generator .string += generator .Space ();
            generator .string += "accessType='";
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "type='";
            generator .string += field .getTypeName ();
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "name='";
            generator .string += generator .XMLEncode (field .getName ());
            generator .string += "'";
            generator .string += generator .closingTags ? "></field>" : "/>";
            generator .string += generator .TidyBreak ();
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</ExternProtoDeclare>";
      }
      else
      {
         generator .string += generator .closingTags ? "></ExternProtoDeclare>" : "/>";
      }
   },
   toJSONStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ExternProtoDeclare";
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
      generator .string += "@name";
      generator .string += '"';
      generator .string += ':';
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getName ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Fields

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "field";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += '{';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@accessType";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@type";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += field .getTypeName ();
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@name";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .JSONEncode (field .getName ());
            generator .string += '"';
            generator .string += generator .TidyBreak ();

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';

            if (field !== userDefinedFields .at (-1))
               generator .string += ',';

            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';
         generator .string += ',';
         generator .string += generator .TidyBreak ();
      }


      // URL

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@url";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();

      this ._url .toJSONStream (generator);

      generator .string += generator .TidyBreak ();


      // End

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Object .keys (X3DExternProtoDeclaration .prototype))
   Object .defineProperty (X3DExternProtoDeclaration .prototype, key, { enumerable: false });

Object .defineProperties (X3DExternProtoDeclaration .prototype,
{
   name:
   {
      get: X3DExternProtoDeclaration .prototype .getName,
      enumerable: true,
   },
   fields:
   {
      get: X3DExternProtoDeclaration .prototype .getFieldDefinitions,
      enumerable: true,
   },
   isExternProto:
   {
      value: true,
      enumerable: true,
   },
   urls:
   {
      get () { return this ._url; },
      enumerable: true,
   },
   loadState:
   {
      get: X3DExternProtoDeclaration .prototype .checkLoadState,
      enumerable: true,
   },
});

Object .defineProperties (X3DExternProtoDeclaration,
{
   typeName:
   {
      value: "X3DExternProtoDeclaration",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

X3DConstants .addConstant (X3DExternProtoDeclaration .typeName);

export default X3DExternProtoDeclaration;
