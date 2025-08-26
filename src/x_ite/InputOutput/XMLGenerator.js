import X3DGenerator from "./X3DGenerator.js";

function XMLGenerator (options)
{
   X3DGenerator .call (this, options);
}

Object .assign (Object .setPrototypeOf (XMLGenerator .prototype, X3DGenerator .prototype),
{
   EncodeString: (() =>
   {
      const map = {
         "\\": "\\\\",
         "\r": "&#xD;",
         "\n": "&#xA;",
         "\t": "&#x9;",
         "\"": "\\\"",
         "'": "&apos;",
         "<": "&lt;",
         ">": "&gt;",
         "&": "&amp;",
      };

      const regex = /([\\\r\n\t"'<>&])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   EncodeSourceText: (() =>
   {
      const map = {
         "\\": "\\\\",
         "\"": "\\\"",
         "'": "&apos;",
         "<": "&lt;",
         ">": "&gt;",
         "&": "&amp;",
      };

      const regex = /([\\"'<>&])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   AppInfo (object)
   {
      const appInfo = object .getAppInfo ();

      if (!appInfo)
         return;

      this .string += this .Space ();
      this .string += "appinfo='";
      this .string += this .EncodeString (appInfo);
      this .string += "'";
   },
   Documentation (object)
   {
      const documentation = object .getDocumentation ();

      if (!documentation)
         return;

      this .string += this .Space ();
      this .string += "documentation='";
      this .string += this .EncodeString (documentation);
      this .string += "'";
   },
});

for (const key of Object .keys (XMLGenerator .prototype))
   Object .defineProperty (XMLGenerator .prototype, key, { enumerable: false });

export default XMLGenerator;
