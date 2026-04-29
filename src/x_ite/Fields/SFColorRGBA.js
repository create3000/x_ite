import X3DField     from "../Base/X3DField.js";
import SFColor      from "./SFColor.js";
import X3DConstants from "../Base/X3DConstants.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";

function SFColorRGBA (r = 0, g = 0, b = 0, a = 0)
{
   X3DField .call (this, new Color4 (+r, +g, +b, +a));
}

Object .assign (Object .setPrototypeOf (SFColorRGBA .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return SFColorRGBA .fromValue (this .getValue () .copy ());
   },
   equals: SFColor .prototype .equals,
   isDefaultValue ()
   {
      return this .getValue () .equals (Color4 .TRANSPARENT);
   },
   set: SFColor .prototype .set,
   getHSVA ()
   {
      return this .getValue () .getHSVA ([ ]);
   },
   setHSVA (h, s, v, a)
   {
      this .getValue () .setHSVA (+h, +s, +v, +a);
      this .addEvent ();
   },
   linearToSRGB ()
   {
      return SFColorRGBA .fromValue (this .getValue () .linearToSRGB ());
   },
   sRGBToLinear ()
   {
      return SFColorRGBA .fromValue (this .getValue () .sRGBToLinear ());
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

         Color4 .lerp (s, d, +t, r);

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

X3DField .addStaticProperties (SFColorRGBA, "SFColorRGBA");

Object .defineProperties (SFColorRGBA,
{
   BLACK:
   {
      value: SFColorRGBA .fromValue (Color4 .BLACK),
      enumerable: true,
   },
   TRANSPARENT:
   {
      value: SFColorRGBA .fromValue (Color4 .TRANSPARENT),
      enumerable: true,
   },
   WHITE:
   {
      value: SFColorRGBA .fromValue (Color4 .WHITE),
      enumerable: true,
   },
   fromHSVA:
   {
      value (h, s, v, a)
      {
         const color = new this ();

         color .setHSVA (h, s, v, a);

         return color;
      },
   },
});

export default SFColorRGBA;
