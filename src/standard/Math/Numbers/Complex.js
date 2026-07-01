import Vector2 from "./Vector2.js";

const {
   assign,
   equals,
   add,
   divide,
   multiply,
   negate,
   set,
   subtract,
} = Vector2 .prototype;

function Complex (real = 0, imag = 0)
{
   this .x = real;
   this .y = imag;
}

Object .assign (Complex .prototype,
{
   [Symbol .iterator]: Vector2 .prototype [Symbol .iterator],
   add,
   assign,
   conjugate ()
   {
      this .y = -this .y;
      return this;
   },
   copy ()
   {
      const copy = Object .create (Complex .prototype);
      copy .x = this .x;
      copy .y = this .y;
      return copy;
   },
   divide,
   divComp (value)
   {
      const
         { x: ar, y: ai } = this,
         { x: br, y: bi } = value,
         d = br * br + bi * bi;

      this .x = (ar * br + ai * bi) / d;
      this .y = (ai * br - ar * bi) / d;
      return this;
   },
   equals,
   inverse ()
   {
      const
         { x, y } = this,
         d = x * x + y * y;

      this .x /=  d;
      this .y /= -d;
      return this;
   },
   set,
   setPolar (magnitude, angle)
   {
      this .x = magnitude * Math .cos (angle);
      this .y = magnitude * Math .sin (angle);
      return this;
   },
   negate,
   multiply,
   multComp (value)
   {
      const
         { x: ar, y: ai } = this,
         { x: br, y: bi } = value;

      this .x = ar * br - ai * bi;
      this .y = ar * bi + ai * br;
      return this;
   },
   subtract,
   toString ()
   {
      const { x, y } = this;

      let string = "";

      if (x || !y)
         string += x;

      if (x && y > 0)
         string += "+";

      if (y)
      {
         string += y;
         string += "i";
      }

      return string;
   },
});

for (const key of Object .keys (Complex .prototype))
   Object .defineProperty (Complex .prototype, key, { enumerable: false });

const real = {
   get () { return this .x; },
   set (value) { this .x = value; },
};

const imag = {
   get () { return this .y; },
   set (value) { this .y = value; },
};

Object .defineProperties (Complex .prototype,
{
   length: { value: 2 },
   0: real,
   1: imag,
   real,
   imag,
   magnitude:
   {
      get ()
      {
         const { x, y } = this;

         if (x)
         {
            if (y)
               return Math .hypot (x, y);

            return Math .abs (x);
         }

         return Math .abs (y);
      },
      set (magnitude)
      {
         this .setPolar (magnitude, this .angle);
      },
   },
   angle:
   {
      get () { return Math .atan2 (this .y, this .x); },
      set (angle) { this .setPolar (this .magnitude, angle); },
   },
});

Object .assign (Complex,
{
   fromPolar (magnitude, angle)
   {
      return Object .create (Complex .prototype) .setPolar (magnitude, angle);
   },
});

export default Complex;
