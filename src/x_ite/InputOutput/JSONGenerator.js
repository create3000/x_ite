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
      this .string = this .string .replace (/,(\s*)$/s, "");
   },
   stringProperty (key, value, comma = true)
   {
      if (!value)
         return;

      if (comma)
         this .string += ',';

      this .string += this .TidyBreak ();
      this .string += this .Indent ();
      this .string += '"';
      this .string += key;
      this .string += '"';
      this .string += ':';
      this .string += this .TidySpace ();
      this .string += '"';
      this .string += this .EncodeString (value);
      this .string += '"';
   },
   numberProperty (key, value, comma = true)
   {
      if (comma)
         this .string += ',';

      this .string += this .TidyBreak ();
      this .string += this .Indent ();
      this .string += '"';
      this .string += key;
      this .string += '"';
      this .string += ':';
      this .string += this .TidySpace ();
      this .string += value;
   },
   beginObject (name, comma = true, main = false)
   {
      if (comma)
         this .string += ',';

      if (name)
      {
         if (main)
         {
            this .string += '{';
            this .string += this .TidySpace ();
            this .string += '"';
            this .string += name;
            this .string += '"';
            this .string += ':';
            this .string += this .TidyBreak ();
            this .string += this .IncIndent ();
            this .string += this .Indent ();
            this .string += '{';
            this .string += this .IncIndent ();
         }
         else
         {
            this .string += this .TidyBreak ();
            this .string += this .Indent ();
            this .string += '"';
            this .string += name;
            this .string += '"';
            this .string += ':';
            this .string += this .TidySpace ();
            this .string += '{';
            this .string += this .IncIndent ();
         }
      }
      else
      {
         this .string += this .TidyBreak ();
         this .string += this .Indent ();
         this .string += '{';
         this .string += this .IncIndent ();
      }
   },
   endObject ()
   {
      this .string += this .TidyBreak ();
      this .string += this .DecIndent ();
      this .string += this .Indent ();
      this .string += '}';
   },
   beginArray (name, comma = true)
   {
      this .beginValue (name, comma);

      this .string += '[';
      this .string += this .IncIndent ();
   },
   endArray ()
   {
      this .string += this .DecIndent ();
      this .string += this .Indent ();
      this .string += ']';
   },
   beginValue (name, comma = true)
   {
      if (comma)
         this .string += ',';

      this .string += this .TidyBreak ();
      this .string += this .Indent ();
      this .string += '"';
      this .string += name;
      this .string += '"';
      this .string += ':';
      this .string += this .TidySpace ();
   },
});

for (const key of Object .keys (JSONGenerator .prototype))
   Object .defineProperty (JSONGenerator .prototype, key, { enumerable: false });

export default JSONGenerator;
