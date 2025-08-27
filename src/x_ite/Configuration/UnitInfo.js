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
      generator .openTag ("unit");
      generator .attribute ("category",         this .category);
      generator .attribute ("name",             this .name);
      generator .attribute ("conversionFactor", this .conversionFactor);
      generator .closeTag ("unit");
   },
   toJSONStream (generator, _throw)
   {
      if (this .conversionFactor === 1)
         throw new Error ("conversionFactor is 1");

      generator .beginObject ("", false);
      generator .stringProperty ("@category",         this .category, false);
      generator .stringProperty ("@name",             this .name);
      generator .numberProperty ("@conversionFactor", this .conversionFactor);
      generator .endObject ();
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
