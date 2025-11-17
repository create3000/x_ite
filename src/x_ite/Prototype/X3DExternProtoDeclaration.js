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
   getAppInfo ()
   {
      return this [_proto] ?.getAppInfo ()
         || X3DProtoDeclarationNode .prototype .getAppInfo .call (this);
   },
   setAppInfo (value)
   {
      if (this [_proto])
         this [_proto] .setAppInfo (value);
      else
         X3DProtoDeclarationNode .prototype .setAppInfo .call (this, value);
   },
   getDocumentation ()
   {
      return this [_proto] ?.getDocumentation ()
         || X3DProtoDeclarationNode .prototype .getDocumentation .call (this);
   },
   setDocumentation (value)
   {
      if (this [_proto])
         this [_proto] .setDocumentation (value);
      else
         X3DProtoDeclarationNode .prototype .setDocumentation .call (this, value);
   },
   getProtoDeclaration ()
   {
      return this [_proto];
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
      generator .Indent ();
      generator .string += "EXTERNPROTO";
      generator .Space ();
      generator .string += this .getName ();
      generator .TidySpace ();
      generator .string += "[";

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length === 0)
      {
         generator .TidySpace ();
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

         generator .TidyBreak ();

         generator .IncIndent ();

         const last = userDefinedFields .at (-1);

         for (const field of userDefinedFields)
         {
            this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

            if (field === last)
               generator .TidyBreak ();
            else
               generator .Break ();
         }

         generator .DecIndent ();

         generator .Indent ();
      }

      generator .string += "]";
      generator .TidyBreak ();
      generator .Indent ();

      this ._url .toVRMLStream (generator);
   },
   toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength)
   {
      generator .Indent ();
      generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, generator .TidySpace ());
      generator .Space ();
      generator .string += field .getTypeName () .padEnd (fieldTypeLength, generator .TidySpace ());
      generator .Space ();
      generator .string += field .getName ();
   },
   toXMLStream (generator)
   {
      generator .openTag ("ExternProtoDeclare");
      generator .attribute ("name", this .getName ());

      generator .Space ();
      generator .string += "url='";

      this ._url .toXMLStream (generator);

      generator .string += "'";

      if (this .getAppInfo ())
         generator .attribute ("appinfo", this .getAppInfo ());

      if (this .getDocumentation ())
         generator .attribute ("documentation", this .getDocumentation ());

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .endTag ();
         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .openTag ("field");
            generator .attribute ("accessType", generator .AccessType (field .getAccessType ()));
            generator .attribute ("type",       field .getTypeName ());
            generator .attribute ("name",       field .getName ());

            if (field .getAppInfo ())
               generator .attribute ("appinfo", field .getAppInfo ());

            if (field .getDocumentation ())
               generator .attribute ("documentation", field .getDocumentation ());

            generator .closeTag ("field");
            generator .TidyBreak ();
         }

         generator .DecIndent ();
         generator .closingTag ("ExternProtoDeclare");
      }
      else
      {
         generator .closeTag ("ExternProtoDeclare");
      }
   },
   toJSONStream (generator)
   {
      generator .TidyBreak ();
      generator .Indent ();

      generator .beginObject ("ExternProtoDeclare", false, true);
      generator .stringProperty ("@name", this .getName (), false);

      if (this .getAppInfo ())
         generator .stringProperty ("@appinfo", this .getAppInfo ());

      if (this .getDocumentation ())
         generator .stringProperty ("@documentation", this .getDocumentation ());

      // Fields

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .beginArray ("field");

         for (const field of userDefinedFields)
         {
            generator .beginObject ("", field !== userDefinedFields [0]);
            generator .stringProperty ("@accessType", generator .AccessType (field .getAccessType ()), false);
            generator .stringProperty ("@type",       field .getTypeName ());
            generator .stringProperty ("@name",       field .getName ());

            if (field .getAppInfo ())
               generator .stringProperty ("@appinfo", field .getAppInfo ());

            if (field .getDocumentation ())
               generator .stringProperty ("@documentation", field .getDocumentation ());

            generator .endObject ();
         }

         generator .endArray ();
      }

      // URL

      generator .string += ',';
      generator .TidyBreak ();
      generator .Indent ();
      generator .string += '"';
      generator .string += "@url";
      generator .string += '"';
      generator .string += ':';
      generator .TidySpace ();

      this ._url .toJSONStream (generator);

      // End

      generator .endObject ();
      generator .endObject ();
   },
});

for (const key of Object .keys (X3DExternProtoDeclaration .prototype))
   Object .defineProperty (X3DExternProtoDeclaration .prototype, key, { enumerable: false });

Object .defineProperties (X3DExternProtoDeclaration .prototype,
{
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
