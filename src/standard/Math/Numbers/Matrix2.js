import Vector2 from "./Vector2.js";

function Matrix2 (... args)
{
   if (args .length)
   {
      for (let i = 0; i < 4; ++ i)
         this [i] = args [i];
   }
   else
   {
      this .identity ();
   }
}

Object .assign (Matrix2 .prototype,
{
   *[Symbol .iterator] ()
   {
      for (let i = 0; i < 4; ++ i)
         yield this [i];
   },
   copy ()
   {
      const copy = Object .create (Matrix2 .prototype);

      for (let i = 0; i < 4; ++ i)
         copy [i] = this [i];

      return copy;
   },
   assign (matrix)
   {
      for (let i = 0; i < 4; ++ i)
         this [i] = matrix [i];

      return this;
   },
   equals (matrix)
   {
      return this [0] === matrix [0] &&
             this [1] === matrix [1] &&
             this [2] === matrix [2] &&
             this [3] === matrix [3];
   },
   set1 (r, c, value)
   {
      this [r * this .order + c] = value;
   },
   get1 (r, c)
   {
      return this [r * this .order + c];
   },
   set ()
   {
      switch (arguments .length)
      {
         case 0:
         {
            this .identity ();
            break;
         }
         case 4:
         {
            for (let i = 0; i < 4; ++ i)
               this [i] = arguments [i];

            break;
         }
      }

      return this;
   },
   determinant1 ()
   {
      return this [0];
   },
   determinant ()
   {
      const { 0: m0, 1: m1, 2: m2, 3: m3 } = this;

      return m0 * m3 - m1 * m2;
   },
   transpose ()
   {
      const tmp = this [1];

      this [1] = this [2];
      this [2] = tmp;

      return this;
   },
   inverse ()
   {
      const
         { 0: A, 1: B, 2: C, 3: D } = this,
         d = A * D - B * C;

      // if (d === 0) ... determinant is zero.

      this [0] =  D / d;
      this [1] = -B / d;
      this [2] = -C / d;
      this [3] =  A / d;

      return this;
   },
   multLeft (matrix)
   {
      const
         { 0: a0, 1: a1, 2: a2, 3: a3 } = this,
         { 0: b0, 1: b1, 2: b2, 3: b3 } = matrix;

      this [0] = a0 * b0 + a2 * b1;
      this [1] = a1 * b0 + a3 * b1;
      this [2] = a0 * b2 + a2 * b3;
      this [3] = a1 * b2 + a3 * b3;

      return this;
   },
   multRight (matrix)
   {
      const
         { 0: a0, 1: a1, 2: a2, 3: a3 } = this,
         { 0: b0, 1: b1, 2: b2, 3: b3 } = matrix;

      this [0] = b0 * a0 + b2 * a1;
      this [1] = b1 * a0 + b3 * a1;
      this [2] = b0 * a2 + b2 * a3;
      this [3] = b1 * a2 + b3 * a3;

      return this;
   },
   multVecMatrix (vector)
   {
      if (typeof vector === "number")
      {
         const
            x = vector,
            w = x * this [1] + this [3];

         return (x * this [0] + this [2]) / w;
      }
      else
      {
         const { x, y } = vector;

         vector .x = x * this [0] + y * this [2];
         vector .y = x * this [1] + y * this [3];

         return vector;
      }
   },
   multMatrixVec (vector)
   {
      if (typeof vector === "number")
      {
         const
            x = vector,
            w = x * this [2] + this [3];

         return (x * this [0] + this [1]) / w;
      }
      else
      {
         const { x, y } = vector;

         vector .x = x * this [0] + y * this [1];
         vector .y = x * this [2] + y * this [3];

         return vector;
      }
   },
   identity ()
   {
      this [0] = 1;
      this [1] = 0;
      this [2] = 0;
      this [3] = 1;
   },
   toString ()
   {
      return Array .prototype .join .call (this, " ");
   },
});

for (const key of Object .keys (Matrix2 .prototype))
   Object .defineProperty (Matrix2 .prototype, key, { enumerable: false });

Object .defineProperties (Matrix2 .prototype,
{
   order: { value: 2 },
   length: { value: 4 },
   x:
   {
      get: (() =>
      {
         const vector = new Vector2 ();

         return function () { return vector .set (this [0], this [1]); };
      })(),
   },
   y:
   {
      get: (() =>
      {
         const vector = new Vector2 ();

         return function () { return vector .set (this [2], this [3]); };
      })(),
   },
   xAxis:
   {
      get () { return this [0]; },
   },
   origin:
   {
      get () { return this [2]; },
   },
   submatrix:
   {
      get () { return this [0]; },
   },
});

Object .assign (Matrix2,
{
   Identity: Object .freeze (new Matrix2 ()),
});

export default Matrix2;
