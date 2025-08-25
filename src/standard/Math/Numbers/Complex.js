function Complex (real = 0, imag = 0)
{
   this .real = real;
   this .imag = imag;
}

Object .assign (Complex .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .real;
      yield this .imag;
   },
   copy ()
   {
      const copy = Object .create (Complex .prototype);
      copy .real = this .real;
      copy .imag = this .imag;
      return copy;
   },
   assign (complex)
   {
      this .real = complex .real;
      this .imag = complex .imag;
      return this;
   },
   equals (complex)
   {
      return this .real === complex .real &&
             this .imag === complex .imag;
   },
   set (real = 0, imag = 0)
   {
      this .real = real;
      this .imag = imag;
      return this;
   },
   setPolar (magnitude, angle)
   {
      this .real = magnitude * Math .cos (angle);
      this .imag = magnitude * Math .sin (angle);
      return this;
   },
   conjugate ()
   {
      this .imag = -this .imag;
      return this;
   },
   negate ()
   {
      this .real = -this .real;
      this .imag = -this .imag;
      return this;
   },
   inverse ()
   {
      const d = this .real * this .real + this .imag * this .imag;

      this .real /=  d;
      this .imag /= -d;
      return this;
   },
   add (value)
   {
      this .real += value .real;
      this .imag += value .imag;
      return this;
   },
   subtract (value)
   {
      this .real -= value .real;
      this .imag -= value .imag;
      return this;
   },
   multiply (value)
   {
      this .real *= value;
      this .imag *= value;
      return this;
   },
   multComp (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value;

      this .real = ar * br - ai * bi;
      this .imag = ar * bi + ai * br;
      return this;
   },
   divide (value)
   {
      this .real /= value;
      this .imag /= value;
      return this;
   },
   divComp (value)
   {
      const
         { real: ar, imag: ai } = this,
         { real: br, imag: bi } = value,
         d = br * br + bi * bi;

      this .real = (ar * br + ai * bi) / d;
      this .imag = (ai * br - ar * bi) / d;
      return this;
   },
   toString ()
   {
      let string = "";

      string += this .real;

      if (this .imag < 0)
      {
         string += this .imag;
         string += "i";
      }
      else if (this .imag > 0)
      {
         string += "+";
         string += this .imag;
         string += "i";
      }

      return string;
   },
});

for (const key of Object .keys (Complex .prototype))
   Object .defineProperty (Complex .prototype, key, { enumerable: false });

Object .defineProperties (Complex .prototype,
{
   length: { value: 2 },
   0:
   {
      get ()
      {
         return this .real;
      },
      set (value)
      {
         this .real = value;
      },
   },
   1:
   {
      get ()
      {
         return this .imag;
      },
      set (value)
      {
         this .imag = value;
      },
   },
   magnitude:
   {
      get ()
      {
         if (this .real)
         {
            if (this .imag)
               return Math .hypot (this .real, this .imag);

            return Math .abs (this .real);
         }

         return Math .abs (this .imag);
      },
      set (magnitude)
      {
         this .setPolar (magnitude, this .angle);
      },
   },
   angle:
   {
      get ()
      {
         return Math .atan2 (this .imag, this .real);
      },
      set (angle)
      {
         this .setPolar (this .magnitude, angle);
      },
   },
});

Object .assign (Complex,
{
   Polar (magnitude, angle)
   {
      return Object .create (Complex .prototype) .setPolar (magnitude, angle);
   },
});

export default Complex;
