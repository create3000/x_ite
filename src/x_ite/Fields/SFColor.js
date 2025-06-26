import Color3   from "../../standard/Math/Numbers/Color3.js";
import X3DField from "../Base/X3DField.js";

function SFColor (r, g, b)
{
   switch (arguments .length)
   {
      case 0:
         X3DField .call (this, new Color3 ());
         break;

      case 1:
         X3DField .call (this, arguments [0]);
         break;

      case 3:
         X3DField .call (this, new Color3 (+r, +g, +b));
         break;

      default:
         throw new Error ("Invalid arguments.");
   }
}

Object .assign (Object .setPrototypeOf (SFColor .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return new SFColor (this .getValue () .copy ());
   },
   equals (color)
   {
      return this .getValue () .equals (color .getValue ());
   },
   isDefaultValue ()
   {
      return this .getValue () .equals (Color3 .Black);
   },
   set (value)
   {
      this .getValue () .assign (value);
   },
   getHSV ()
   {
      return this .getValue () .getHSV ([ ]);
   },
   setHSV (h, s, v)
   {
      this .getValue () .setHSV (h, s, v);
      this .addEvent ();
   },
   linearToSRGB ()
   {
      return new SFColor (this .getValue () .linearToSRGB ());
   },
   sRGBToLinear ()
   {
      return new SFColor (this .getValue () .sRGBToLinear ());
   },
   lerp: (() =>
   {
      const
         s = [ ],
         d = [ ],
         r = [ ];

      return function (destination, t)
      {
         const result = new SFColor ();

         this .getValue () .getHSV (s);
         destination .getValue () .getHSV (d);

         Color3 .lerp (s, d, t, r);

         result .setHSV (r [0], r [1], r [2]);

         return result;
      };
   })(),
   toStream (generator)
   {
      const
         value = this .getValue (),
         last  = value .length - 1;

      for (let i = 0; i < last; ++ i)
      {
         generator .string += generator .FloatFormat (value [i]);
         generator .string += generator .Space ();
      }

      generator .string += generator .FloatFormat (value [last]);
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
      generator .string += '[';
      generator .string += generator .TidySpace ();

      this .toJSONStreamValue (generator);

      generator .string += generator .TidySpace ();
      generator .string += ']';
   },
   toJSONStreamValue (generator)
   {
      const
         value = this .getValue (),
         last  = value .length - 1;

      for (let i = 0; i < last; ++ i)
      {
         generator .string += generator .JSONNumber (generator .FloatFormat (value [i]));
         generator .string += ',';
         generator .string += generator .TidySpace ();
      }

      generator .string += generator .JSONNumber (generator .FloatFormat (value [last]));
   },
});

for (const key of Object .keys (SFColor .prototype))
   Object .defineProperty (SFColor .prototype, key, { enumerable: false });

const r = {
   get ()
   {
      return this .getValue () .r;
   },
   set (value)
   {
      this .getValue () .r = +value;
      this .addEvent ();
   },
};

const g = {
   get ()
   {
      return this .getValue () .g;
   },
   set (value)
   {
      this .getValue () .g = +value;
      this .addEvent ();
   },
};

const b = {
   get ()
   {
      return this .getValue () .b;
   },
   set (value)
   {
      this .getValue () .b = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFColor .prototype,
{
   0: r,
   1: g,
   2: b,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
});

Object .defineProperties (SFColor,
{
   typeName:
   {
      value: "SFColor",
      enumerable: true,
   },
});

export default SFColor;
