import X3DObject from "../Base/X3DObject.js";
import URLs      from "../Browser/Networking/URLs.js";

function ProfileInfo (name, title, providerURL, components)
{
   Object .defineProperties (this,
   {
      name: { value: name, enumerable: true },
      title: { value: title, enumerable: true },
      providerURL: { value: providerURL || URLs .getProviderURL (), enumerable: true },
      components: { value: components, enumerable: true },
   });
}

Object .assign (Object .setPrototypeOf (ProfileInfo .prototype, X3DObject .prototype),
{
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "PROFILE";
      generator .string += generator .Space ();
      generator .string += this .name;
   },
   toXMLStream (generator)
   {
      generator .string += this .name;
   },
   toJSONStream (generator)
   {
      generator .string += this .name;
   },
});

for (const key of Object .keys (ProfileInfo .prototype))
   Object .defineProperty (ProfileInfo .prototype, key, { enumerable: false });

Object .defineProperties (ProfileInfo,
{
   typeName:
   {
      value: "ProfileInfo",
      enumerable: true,
   },
});

Object .defineProperties (ProfileInfo .prototype,
{
   providerUrl: // legacy
   {
      get: function () { return this .providerURL; },
   },
});

export default ProfileInfo;
