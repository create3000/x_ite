import X3DObject from "../Base/X3DObject.js";

function UnitInfo (category, name, conversionFactor)
{
   Object .defineProperties (this,
   {
      category: { value: category, enumerable: true },
      name: { value: name, enumerable: true },
      conversionFactor: { value: conversionFactor, enumerable: true },
   });
}

Object .assign (Object .setPrototypeOf (UnitInfo .prototype, X3DObject .prototype),
{
   toVRMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "UNIT";
      generator .string += generator .Space ();
      generator .string += this .category;
      generator .string += generator .Space ();
      generator .string += this .name;
      generator .string += generator .Space ();
      generator .string += this .conversionFactor;
   },
   toXMLStream (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<unit";
      generator .string += generator .Space ();
      generator .string += "category='";
      generator .string += this .category;
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .name);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "conversionFactor='";
      generator .string += this .conversionFactor;
      generator .string += "'";
      generator .string += generator .closingTags ? "></unit>" : "/>";
   },
   toJSONStream (generator, _throw)
   {
      if (this .conversionFactor === 1)
         throw new Error ("conversionFactor is 1");

      generator .string += generator .Indent ();

      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@category";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += this .category;
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
      generator .string += generator .JSONEncode (this .name);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@conversionFactor";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += this .conversionFactor;
      generator .string += generator .TidyBreak ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Object .keys (UnitInfo .prototype))
   Object .defineProperty (UnitInfo .prototype, key, { enumerable: false });

Object .defineProperty (UnitInfo .prototype, "conversion_factor",
{
   get () { return this .conversionFactor; },
});

Object .defineProperties (UnitInfo,
{
   typeName:
   {
      value: "UnitInfo",
      enumerable: true,
   },
});

export default UnitInfo;
