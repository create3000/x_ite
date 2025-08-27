import X3DGenerator from "./X3DGenerator.js";

function XMLGenerator (options = { })
{
   X3DGenerator .call (this, options);

   const { html = false, closingTags = false } = options;

   this .html            = html;
   this .closingTags     = html || closingTags;
   this .containerFields = [ ];
}

Object .assign (Object .setPrototypeOf (XMLGenerator .prototype, X3DGenerator .prototype),
{
   PushContainerField (field)
   {
      this .containerFields .push (field);
   },
   PopContainerField ()
   {
      this .containerFields .pop ();
   },
   ContainerField ()
   {
      return this .containerFields .at (-1);
   },
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
   openingTag (name)
   {
      this .string += this .Indent ();
      this .string += "<";
      this .string += name;
      this .string += ">";
   },
   closingTag (name)
   {
      this .string += this .Indent ();
      this .string += "</";
      this .string += name;
      this .string += ">";
   },
   openTag (name)
   {
      this .string += this .Indent ();
      this .string += "<";
      this .string += name;
   },
   endTag ()
   {
      this .string += ">";
      this .string += this .TidyBreak ();
   },
   closeTag (name)
   {
      if (this .closingTags)
      {
         this .string += "></";
         this .string += name;
         this .string += ">";
      }
      else
      {
         this .string += "/>";
      }
   },
   attribute (name, value)
   {
      value = String (value);

      if (!value)
         return;

      this .string += this .Space ();
      this .string += name;
      this .string += "='";
      this .string += this .EncodeString (value);
      this .string += "'";
   },
});

for (const key of Object .keys (XMLGenerator .prototype))
   Object .defineProperty (XMLGenerator .prototype, key, { enumerable: false });

export default XMLGenerator;
