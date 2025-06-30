import Algorithm from "../Algorithm.js";

const { interval, degrees } = Algorithm;

const
   _r = Symbol .for ("X_ITE.Color3.r"),
   _g = Symbol .for ("X_ITE.Color3.g"),
   _b = Symbol .for ("X_ITE.Color3.b");

// glTF sometimes allows color values greater than 1.
// See: https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Khronos/KHR_materials_specular/README.md
// See: https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/master/Models/SpecularTest/glTF/SpecularTest.gltf

function Color3 (r = 0, g = r, b = g)
{
   this [_r] = r;
   this [_g] = g;
   this [_b] = b;
}

Object .assign (Color3 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this [_r];
      yield this [_g];
      yield this [_b];
   },
   copy ()
   {
      const copy = Object .create (Color3 .prototype);
      copy [_r] = this [_r];
      copy [_g] = this [_g];
      copy [_b] = this [_b];
      return copy;
   },
   assign (color)
   {
      this [_r] = color [_r];
      this [_g] = color [_g];
      this [_b] = color [_b];
      return this;
   },
   set (r = 0, g = r, b = g)
   {
      this [_r] = r;
      this [_g] = g;
      this [_b] = b;
      return this;
   },
   equals (color)
   {
      return this [_r] === color [_r] &&
             this [_g] === color [_g] &&
             this [_b] === color [_b];
   },
   getHSV (result)
   {
      let h, s, v;

      const
         r = this [_r],
         g = this [_g],
         b = this [_b];

      const
         min = Math .min (r, g, b),
         max = Math .max (r, g, b);

      v = max; // value

      const delta = max - min;

      if (max !== 0 && delta !== 0)
      {
         s = delta / max; // s

         if (r === max)
            h =     (g - b) / delta;  // between yellow & magenta
         else if (g === max)
            h = 2 + (b - r) / delta;  // between cyan & yellow
         else
            h = 4 + (r - g) / delta;  // between magenta & cyan

         h *= Math .PI / 3;  // radiants

         if (h < 0)
            h += Math .PI * 2;
      }
      else
      {
         s = h = 0; // s = 0, h is undefined
      }

      result [0] = h;
      result [1] = s;
      result [2] = v;

      return result;
   },
   setHSV (h, s, v)
   {
      s = Math .max (s, 0),
      v = Math .max (v, 0);

      // H is given on [0, 2 * Pi]. S and V are given on [0, 1].
      // RGB are each returned on [0, 1].

      if (s === 0)
      {
         // achromatic (grey)
         this [_r] = this [_g] = this [_b] = v;
      }
      else
      {
         const w = degrees (interval (h, 0, Math .PI * 2)) / 60;     // sector 0 to 5

         const i = Math .floor (w);
         const f = w - i;                      // factorial part of h
         const p = v * ( 1 - s );
         const q = v * ( 1 - s * f );
         const t = v * ( 1 - s * ( 1 - f ) );

         switch (i % 6)
         {
            case 0:  this [_r] = v; this [_g] = t; this [_b] = p; break;
            case 1:  this [_r] = q; this [_g] = v; this [_b] = p; break;
            case 2:  this [_r] = p; this [_g] = v; this [_b] = t; break;
            case 3:  this [_r] = p; this [_g] = q; this [_b] = v; break;
            case 4:  this [_r] = t; this [_g] = p; this [_b] = v; break;
            default: this [_r] = v; this [_g] = p; this [_b] = q; break;
         }
      }

      return this;
   },
   linearToSRGB (color = new Color3 ())
   {
      color [_r] = Math .pow (this [_r], 1 / 2.2);
      color [_g] = Math .pow (this [_g], 1 / 2.2);
      color [_b] = Math .pow (this [_b], 1 / 2.2);

      return color;
   },
   sRGBToLinear (color = new Color3 ())
   {
      color [_r] = Math .pow (this [_r], 2.2);
      color [_g] = Math .pow (this [_g], 2.2);
      color [_b] = Math .pow (this [_b], 2.2);

      return color;
   },
   toString ()
   {
      return this [_r] + " " +
             this [_g] + " " +
             this [_b];
   },
});

for (const key of Object .keys (Color3 .prototype))
   Object .defineProperty (Color3 .prototype, key, { enumerable: false });

const r = {
   get () { return this [_r]; },
   set (value) { this [_r] = value; },
};

const g = {
   get () { return this [_g]; },
   set (value) { this [_g] = value; },
};

const b = {
   get () { return this [_b]; },
   set (value) { this [_b] = value; },
};

Object .defineProperties (Color3 .prototype,
{
   length: { value: 3 },
   0: r,
   1: g,
   2: b,
   r: Object .assign ({ enumerable: true }, r),
   g: Object .assign ({ enumerable: true }, g),
   b: Object .assign ({ enumerable: true }, b),
});

Object .assign (Color3,
{
   Black: Object .freeze (new Color3 ()),
   White: Object .freeze (new Color3 (1)),
   HSV (h, s, v)
   {
      const color = Object .create (this .prototype);
      color .setHSV (h, s, v);
      return color;
   },
   lerp (a, b, t, r)
   {
      // Linearly interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.
      // Source and destination color must be in HSV space. The resulting HSV color is stored in @a r.

      let
         [ha, sa, va] = a,
         [hb, sb, vb] = b;

      if (sa === 0)
         ha = hb;

      if (sb === 0)
         hb = ha;

      const range = Math .abs (hb - ha);

      if (range <= Math .PI)
      {
         r [0] = ha + t * (hb - ha);
         r [1] = sa + t * (sb - sa);
         r [2] = va + t * (vb - va);
         return r;
      }

      const
         PI2  = Math .PI * 2,
         step = (PI2 - range) * t;

      let h = ha < hb ? ha - step : ha + step;

      if (h < 0)
         h += PI2;

      else if (h > PI2)
         h -= PI2;

      r [0] = h;
      r [1] = sa + t * (sb - sa);
      r [2] = va + t * (vb - va);
      return r;
   },
});

export default Color3;
