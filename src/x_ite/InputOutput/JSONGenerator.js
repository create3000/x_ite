import X3DGenerator from "./X3DGenerator.js";

function JSONGenerator (options)
{
   X3DGenerator .call (this, options);
}

Object .assign (Object .setPrototypeOf (JSONGenerator .prototype, X3DGenerator .prototype),
{
   EncodeString: (() =>
   {
      const map = {
         "\\": "\\\\",
         "\r": "\\r",
         "\n": "\\n",
         "\t": "\\t",
         "\"": "\\\"",
      };

      const regex = /([\\\t\n\r"])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   Number (value)
   {
      switch (value)
      {
         case "NaN":
         case "Infinity":
         case "-Infinity":
            return '"' + value + '"';
         default:
            return value;
      }
   },
   RemoveComma ()
   {
      // this .string = this .string .replace (/,(\s*)$/s, "$1");

      this .string = this .string .trimEnd ();

      if (this .string .endsWith (','))
         this .string = this .string .slice (0, -1);

      this .string += this .TidyBreak ();
   },
   AppInfo (object)
   {
      const appInfo = object .getAppInfo ();

      if (!appInfo)
         return;

      this .string += ',';
      this .string += this .Indent ();
      this .string += '"';
      this .string += "@appinfo";
      this .string += '"';
      this .string += ':';
      this .string += '"';
      this .string += this .EncodeString (appInfo);
      this .string += '"';
   },
   Documentation (object)
   {
      const documentation = object .getDocumentation ();

      if (!documentation)
         return;

      this .string += ',';
      this .string += this .Indent ();
      this .string += '"';
      this .string += "@documentation";
      this .string += '"';
      this .string += ':';
      this .string += '"';
      this .string += this .EncodeString (documentation);
      this .string += '"';
   },
});

for (const key of Object .keys (JSONGenerator .prototype))
   Object .defineProperty (JSONGenerator .prototype, key, { enumerable: false });

export default JSONGenerator;
