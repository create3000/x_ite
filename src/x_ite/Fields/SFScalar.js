import X3DField from "../Base/X3DField.js";

function SFBoolTemplate (TypeName)
{
   function SFBool (value)
   {
      X3DField .call (this, !! value);
   }

   return SFScalarPrototypeTemplate (SFBool, TypeName,
   {
      isDefaultValue ()
      {
         return this .getValue () === false;
      },
      set (value)
      {
         X3DField .prototype .set .call (this, !! value);
      },
      toStream (generator)
      {
         generator .string += this .getValue () ? "TRUE" : "FALSE";
      },
      toXMLStream (generator)
      {
         generator .string += this .getValue () ? "true" : "false";
      },
      toJSONStreamValue (generator)
      {
         generator .string += this .getValue () ? "true" : "false";
      },
   });
}

function SFNumberTemplate (TypeName, double, defaultValue)
{
   const _formatter = double ? "DoubleFormat" : "FloatFormat";

   function SFNumber (value)
   {
      X3DField .call (this, arguments .length ? +value : defaultValue);
   }

   return SFScalarPrototypeTemplate (SFNumber, TypeName,
   {
      isDefaultValue ()
      {
         return this .getValue () === defaultValue;
      },
      set (value)
      {
         X3DField .prototype .set .call (this, +value);
      },
      toStream (generator)
      {
         const category = this .getUnit ();

         generator .string += generator [_formatter] (generator .ToUnit (category, this .getValue ()));
      },
      toJSONStreamValue (generator)
      {
         const category = this .getUnit ();

         generator .string += generator .JSONNumber (generator [_formatter] (generator .ToUnit (category, this .getValue ())));
      },
   });
}

function SFInt32Template (TypeName)
{
   function SFInt32 (value)
   {
      X3DField .call (this, value|0);
   }

   return SFScalarPrototypeTemplate (SFInt32, TypeName,
   {
      isDefaultValue ()
      {
         return this .getValue () === 0;
      },
      set (value)
      {
         X3DField .prototype .set .call (this, value|0);
      },
   });
}

function SFStringTemplate (TypeName)
{
   function SFString (value)
   {
      X3DField .call (this, arguments .length ? String (value) : "");
   }

   SFScalarPrototypeTemplate (SFString, TypeName,
   {
      *[Symbol .iterator] ()
      {
         yield* this .getValue ();
      },
      isDefaultValue ()
      {
         return this .getValue () === "";
      },
      set (value)
      {
         X3DField .prototype .set .call (this, String (value));
      },
      toStream (generator)
      {
         generator .string += '"';
         generator .string += SFString .escape (this .getValue ());
         generator .string += '"';
      },
      toXMLStream (generator, sourceText = false)
      {
         generator .string += sourceText
            ? generator .XMLEncodeSourceText (this .getValue ())
            : generator .XMLEncode (this .getValue ());
      },
      toJSONStreamValue (generator)
      {
         generator .string += '"';
         generator .string += generator .JSONEncode (this .getValue ());
         generator .string += '"';
      },
   });

   Object .defineProperty (SFString .prototype, "length",
   {
      get ()
      {
         return this .getValue () .length;
      },
   });

   Object .assign (SFString,
   {
      unescape (string)
      {
         return string .replace (/\\([\\"])/g, "$1");
      },
      escape (string)
      {
         return string .replace (/([\\"])/g, "\\$1");
      },
   });

   return SFString;
}

function SFScalarPrototypeTemplate (Constructor, TypeName, properties = { })
{
   Object .defineProperties (Constructor,
   {
      typeName:
      {
         value: TypeName,
         enumerable: true,
      },
   });

   Object .assign (Object .setPrototypeOf (Constructor .prototype, X3DField .prototype),
   {
      copy ()
      {
         return new Constructor (this .getValue ());
      },
      valueOf: X3DField .prototype .getValue,
      toStream (generator)
      {
         generator .string += String (this .getValue ());
      },
      toVRMLStream (generator)
      {
         this .toStream (generator);
      },
      toXMLStream (generator)
      {
         this .toStream (generator);
      },
      toJSONStream (generator)
      {
         this .toJSONStreamValue (generator);
      },
      toJSONStreamValue (generator)
      {
         this .toStream (generator);
      },
   },
   properties);

   for (const key of Object .keys (Constructor .prototype))
      Object .defineProperty (Constructor .prototype, key, { enumerable: false });

   return Constructor;
}

const SFScalar = {
   SFBool:   SFBoolTemplate   ("SFBool"),
   SFDouble: SFNumberTemplate ("SFDouble", true,  0),
   SFFloat:  SFNumberTemplate ("SFFloat",  false, 0),
   SFInt32:  SFInt32Template  ("SFInt32"),
   SFString: SFStringTemplate ("SFString"),
   SFTime:   SFNumberTemplate ("SFTime",   true, -1),
};

export default SFScalar;
