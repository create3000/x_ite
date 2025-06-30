import X3DObject from "../Base/X3DObject.js";
import URLs      from "../Browser/Networking/URLs.js";

function ComponentInfo (name, level, title, providerURL, external = false, dependencies = [ ])
{
   Object .defineProperties (this,
   {
      name: { value: name, enumerable: true },
      level: { value: level, enumerable: true },
      title: { value: title, enumerable: true },
      providerURL: { value: providerURL || URLs .getProviderURL (external && name), enumerable: true },
      external: { value: external },
      dependencies: { value: dependencies },
   });
}

Object .assign (Object .setPrototypeOf (ComponentInfo .prototype, X3DObject .prototype),
{
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "COMPONENT";
      generator .string += generator .Space ();
      generator .string += this .name;
      generator .string += generator .TidySpace ();
      generator .string += ":";
      generator .string += generator .TidySpace ();
      generator .string += this .level;
   },
   toXMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<component";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += this .name;
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "level='";
      generator .string += this .level;
      generator .string += "'";
      generator .string += generator .closingTags ? "></component>" : "/>";
   },
   toJSONStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@name";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += this .name;
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@level";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += this .level;
      generator .string += generator .TidyBreak ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Object .keys (ComponentInfo .prototype))
   Object .defineProperty (ComponentInfo .prototype, key, { enumerable: false });

Object .defineProperties (ComponentInfo,
{
   typeName:
   {
      value: "ComponentInfo",
      enumerable: true,
   },
});

Object .defineProperties (ComponentInfo .prototype,
{
   providerUrl: // legacy
   {
      get: function () { return this .providerURL; },
   },
});

export default ComponentInfo;
