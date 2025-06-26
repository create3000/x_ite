import X3DField from "../Base/X3DField.js";
import SFColor  from "./SFColor.js";
import Color4   from "../../standard/Math/Numbers/Color4.js";

function SFColorRGBA (r, g, b, a)
{
   switch (arguments .length)
   {
      case 0:
         X3DField .call (this, new Color4 ());
         break;

      case 1:
         X3DField .call (this, arguments [0]);
         break;

      case 4:
         X3DField .call (this, new Color4 (+r, +g, +b, +a));
         break

      default:
         throw new Error ("Invalid arguments.");
   }
}

Object .assign (Object .setPrototypeOf (SFColorRGBA .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return new SFColorRGBA (this .getValue () .copy ());
   },
   equals: SFColor .prototype .equals,
   isDefaultValue ()
   {
      return this .getValue () .equals (Color4 .Transparent);
   },
   set: SFColor .prototype .set,
   getHSVA ()
   {
      return this .getValue () .getHSVA ([ ]);
   },
   setHSVA (h, s, v, a)
   {
      this .getValue () .setHSVA (h, s, v, a);
      this .addEvent ();
   },
   linearToSRGB ()
   {
      return new SFColorRGBA (this .getValue () .linearToSRGB ());
   },
   sRGBToLinear ()
   {
      return new SFColorRGBA (this .getValue () .sRGBToLinear ());
   },
   lerp: (() =>
   {
      const
         s = [ ],
         d = [ ],
         r = [ ];

      return function (destination, t)
      {
         const result = new SFColorRGBA ();

         this .getValue () .getHSVA (s);
         destination .getValue () .getHSVA (d);

         Color4 .lerp (s, d, t, r);

         result .setHSVA (r [0], r [1], r [2], r [3]);

         return result;
      };
   })(),
   toStream: SFColor .prototype .toStream,
   toVRMLStream: SFColor .prototype .toVRMLStream,
   toXMLStream: SFColor .prototype .toXMLStream,
   toJSONStream: SFColor .prototype .toJSONStream,
   toJSONStreamValue: SFColor .prototype .toJSONStreamValue,
});

for (const key of Object .keys (SFColorRGBA .prototype))
   Object .defineProperty (SFColorRGBA .prototype, key, { enumerable: false });

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

const a = {
   get ()
   {
      return this .getValue () .a;
   },
   set (value)
   {
      this .getValue () .a = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFColorRGBA .prototype,
{
   0: r,
   1: g,
   2: b,
   3: a,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
   a: Object .assign ({ enumerable: true }, a),
});

Object .defineProperties (SFColorRGBA,
{
   typeName:
   {
      value: "SFColorRGBA",
      enumerable: true,
   },
});

export default SFColorRGBA;
