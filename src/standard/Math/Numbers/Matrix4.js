import Vector3             from "./Vector3.js";
import Vector4             from "./Vector4.js";
import Quaternion          from "./Quaternion.js";
import Rotation4           from "./Rotation4.js";
import Matrix3             from "./Matrix3.js";
import eigen_decomposition from "../Algorithms/eigen_decomposition.js";

function Matrix4 (m00 = 1, m01 = 0,   m02 = 0,   m03 = 0,
                  m10 = 0, m11 = m00, m12 = 0,   m13 = 0,
                  m20 = 0, m21 = 0,   m22 = m11, m23 = 0,
                  m30 = 0, m31 = 0,   m32 = 0,   m33 = m22)
{
   this [ 0] = m00;
   this [ 1] = m01;
   this [ 2] = m02;
   this [ 3] = m03;
   this [ 4] = m10;
   this [ 5] = m11;
   this [ 6] = m12;
   this [ 7] = m13;
   this [ 8] = m20;
   this [ 9] = m21;
   this [10] = m22;
   this [11] = m23;
   this [12] = m30;
   this [13] = m31;
   this [14] = m32;
   this [15] = m33;
}

Object .assign (Matrix4 .prototype,
{
   *[Symbol .iterator] ()
   {
      for (let i = 0; i < 16; ++ i)
         yield this [i];
   },
   copy ()
   {
      const copy = Object .create (Matrix4 .prototype);

      for (let i = 0; i < 16; ++ i)
         copy [i] = this [i];

      return copy;
   },
   assign (matrix)
   {
      for (let i = 0; i < 16; ++ i)
         this [i] = matrix [i];

      return this;
   },
   equals (matrix)
   {
      for (let i = 0; i < 16; ++ i)
      {
         if (this [i] !== matrix [i])
            return false;
      }

      return true;
   },
   set1 (r, c, value)
   {
      this [r * this .order + c] = value;

      return this;
   },
   get1 (r, c)
   {
      return this [r * this .order + c];
   },
   set (m00 = 1, m01 = 0,   m02 = 0,   m03 = 0,
        m10 = 0, m11 = m00, m12 = 0,   m13 = 0,
        m20 = 0, m21 = 0,   m22 = m11, m23 = 0,
        m30 = 0, m31 = 0,   m32 = 0,   m33 = m22)
   {
      this [ 0] = m00;
      this [ 1] = m01;
      this [ 2] = m02;
      this [ 3] = m03;
      this [ 4] = m10;
      this [ 5] = m11;
      this [ 6] = m12;
      this [ 7] = m13;
      this [ 8] = m20;
      this [ 9] = m21;
      this [10] = m22;
      this [11] = m23;
      this [12] = m30;
      this [13] = m31;
      this [14] = m32;
      this [15] = m33;

      return this;
   },
   getTransform: (() =>
   {
      const c = new Vector3 ();

      return function (translation, rotation, scale, scaleOrientation, center)
      {
         if (center)
         {
            m .setTransform (c .assign (center) .negate ());
            m .multLeft (this);
            m .translate (center);
            m .getTransform (translation, rotation, scale, scaleOrientation);
         }
         else
         {
            this .factor (translation, rotation, scale, scaleOrientation);
         }

         return this;
      };
   })(),
   setTransform: (() =>
   {
      const
         invScaleOrientation = new Rotation4 (),
         invCenter           = new Vector3 ();

      return function (translation, rotation, scale, scaleOrientation, center)
      {
         this .set ();

         // P' = T * C * R * SR * S * -SR * -C * P
         if (translation ?.equals (Vector3 .ZERO) === false)
            this .translate (translation);

         const hasCenter = center ?.equals (Vector3 .ZERO) === false;

         if (hasCenter)
            this .translate (center);

         if (rotation ?.equals (Rotation4 .IDENTITY) === false)
            this .rotate (rotation);

         if (scale ?.equals (Vector3 .ONE) === false)
         {
            if (scaleOrientation ?.equals (Rotation4 .IDENTITY) === false)
            {
               this .rotate (scaleOrientation);
               this .scale (scale);
               this .rotate (invScaleOrientation .assign (scaleOrientation) .inverse ());
            }
            else
            {
               this .scale (scale);
            }
         }

         if (hasCenter)
            this .translate (invCenter .assign (center) .negate ());

         return this;
      };
   })(),
   setRotation (rotation)
   {
      return this .setQuaternion (rotation .getQuaternion (q));
   },
   setQuaternion (quaternion)
   {
      const
         { x, y, z, w } = quaternion,
         A = y * y,
         B = z * z,
         C = x * y,
         D = z * w,
         E = z * x,
         F = y * w,
         G = x * x,
         H = y * z,
         I = x * w;

      this [0]  = 1 - 2 * (A + B);
      this [1]  = 2 * (C + D);
      this [2]  = 2 * (E - F);
      this [3]  = 0;
      this [4]  = 2 * (C - D);
      this [5]  = 1 - 2 * (B + G);
      this [6]  = 2 * (H + I);
      this [7]  = 0;
      this [8]  = 2 * (E + F);
      this [9]  = 2 * (H - I);
      this [10] = 1 - 2 * (A + G);
      this [11] = 0;
      this [12] = 0;
      this [13] = 0;
      this [14] = 0;
      this [15] = 1;

      return this;
   },
   factor: (() =>
   {
      const
         s  = new Vector3 (),
         si = new Matrix3 (),
         so = new Matrix3 (),
         b  = new Matrix3 ();

      const eigen = { values: [ ], vectors: [[ ], [ ], [ ]] };

      return function (translation, rotation, scale, scaleOrientation)
      {
         // (1) Get translation.
         translation ?.set (this [12], this [13], this [14]);

         if (!(rotation || scale || scaleOrientation))
            return;

         // (2) Create 3x3 matrix.
         const a = this .submatrix;

         // (3) Compute det A. If negative, set sign = -1, else sign = 1
         const det      = a .determinant ();
         const det_sign = det < 0 ? -1 : 1;

         // (4) B = A * !A  (here !A means A transpose)
         b .assign (a) .transpose () .multLeft (a);
         const e = eigen_decomposition (b, eigen);

         // Find min / max eigenvalues and do ratio test to determine singularity.

         so .set (e .vectors [0] [0], e .vectors [1] [0], e .vectors [2] [0],
                  e .vectors [0] [1], e .vectors [1] [1], e .vectors [2] [1],
                  e .vectors [0] [2], e .vectors [1] [2], e .vectors [2] [2]);

         scaleOrientation ?.setMatrix (so);

         // Compute s = sqrt(eigen values), with sign. Set si = s-inverse

         s .set (det_sign * Math .sqrt (e .values [0]),
                 det_sign * Math .sqrt (e .values [1]),
                 det_sign * Math .sqrt (e .values [2]));

         scale ?.assign (s);

         if (rotation)
         {
            si [0] = 1 / s .x;
            si [4] = 1 / s .y;
            si [8] = 1 / s .z;

            // (5) Compute U = !R ~S R A.
            rotation .setMatrix (a .multLeft (so) .multLeft (si) .multLeft (so .transpose ()));
         }
      };
   })(),
   determinant3 ()
   {
      const { 0: m00, 1: m01, 2: m02,
              4: m04, 5: m05, 6: m06,
              8: m08, 9: m09, 10: m10 } = this;

      return m00 * (m05 * m10 - m06 * m09) -
             m01 * (m04 * m10 - m06 * m08) +
             m02 * (m04 * m09 - m05 * m08);
   },
   determinant ()
   {
      const
         { 0: m00, 1: m01, 2: m02, 3: m03, 4: m04, 5: m05, 6: m06, 7: m07,
           8: m08, 9: m09, 10: m10, 11: m11, 12: m12, 13: m13, 14: m14, 15: m15 } = this;

      const
         b0 = m00 * m05 - m01 * m04,
         b1 = m00 * m06 - m02 * m04,
         b2 = m01 * m06 - m02 * m05,
         b3 = m08 * m13 - m09 * m12,
         b4 = m08 * m14 - m10 * m12,
         b5 = m09 * m14 - m10 * m13,
         b6 = m00 * b5 - m01 * b4 + m02 * b3,
         b7 = m04 * b5 - m05 * b4 + m06 * b3,
         b8 = m08 * b2 - m09 * b1 + m10 * b0,
         b9 = m12 * b2 - m13 * b1 + m14 * b0;

      // Calculate the determinant.
      return m07 * b6 - m03 * b7 + m15 * b8 - m11 * b9;
   },
   transpose ()
   {
      let tmp;

      tmp = this [ 1]; this [ 1] = this [ 4]; this [ 4] = tmp;
      tmp = this [ 2]; this [ 2] = this [ 8]; this [ 8] = tmp;
      tmp = this [ 3]; this [ 3] = this [12]; this [12] = tmp;
      tmp = this [ 6]; this [ 6] = this [ 9]; this [ 9] = tmp;
      tmp = this [ 7]; this [ 7] = this [13]; this [13] = tmp;
      tmp = this [11]; this [11] = this [14]; this [14] = tmp;

      return this;
   },
   inverse ()
   {
      const
         { 0: m00, 1: m01, 2: m02, 3: m03, 4: m04, 5: m05, 6: m06, 7: m07,
           8: m08, 9: m09, 10: m10, 11: m11, 12: m12, 13: m13, 14: m14, 15: m15 } = this;

      const
         b00 = m00 * m05 - m01 * m04,
         b01 = m00 * m06 - m02 * m04,
         b02 = m00 * m07 - m03 * m04,
         b03 = m01 * m06 - m02 * m05,
         b04 = m01 * m07 - m03 * m05,
         b05 = m02 * m07 - m03 * m06,
         b06 = m08 * m13 - m09 * m12,
         b07 = m08 * m14 - m10 * m12,
         b08 = m08 * m15 - m11 * m12,
         b09 = m09 * m14 - m10 * m13,
         b10 = m09 * m15 - m11 * m13,
         b11 = m10 * m15 - m11 * m14;

      // Calculate the determinant.
      let d = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

      if (!d)
         return this .assign (Matrix4 .ZERO);

      d = 1 / d;

      this [ 0] = (m05 * b11 - m06 * b10 + m07 * b09) * d;
      this [ 1] = (m02 * b10 - m01 * b11 - m03 * b09) * d;
      this [ 2] = (m13 * b05 - m14 * b04 + m15 * b03) * d;
      this [ 3] = (m10 * b04 - m09 * b05 - m11 * b03) * d;
      this [ 4] = (m06 * b08 - m04 * b11 - m07 * b07) * d;
      this [ 5] = (m00 * b11 - m02 * b08 + m03 * b07) * d;
      this [ 6] = (m14 * b02 - m12 * b05 - m15 * b01) * d;
      this [ 7] = (m08 * b05 - m10 * b02 + m11 * b01) * d;
      this [ 8] = (m04 * b10 - m05 * b08 + m07 * b06) * d;
      this [ 9] = (m01 * b08 - m00 * b10 - m03 * b06) * d;
      this [10] = (m12 * b04 - m13 * b02 + m15 * b00) * d;
      this [11] = (m09 * b02 - m08 * b04 - m11 * b00) * d;
      this [12] = (m05 * b07 - m04 * b09 - m06 * b06) * d;
      this [13] = (m00 * b09 - m01 * b07 + m02 * b06) * d;
      this [14] = (m13 * b01 - m12 * b03 - m14 * b00) * d;
      this [15] = (m08 * b03 - m09 * b01 + m10 * b00) * d;

      return this;
   },
   multLeft (matrix)
   {
      // Complexity 48 +, 64 *.

      const {
         0:  a00, 1:  a01, 2:  a02, 3:  a03,
         4:  a04, 5:  a05, 6:  a06, 7:  a07,
         8:  a08, 9:  a09, 10: a10, 11: a11,
         12: a12, 13: a13, 14: a14, 15: a15
      } = this;

      var { 0: b0, 1: b1, 2: b2, 3: b3 } = matrix;

      this [ 0] = a00 * b0 + a04 * b1 + a08 * b2 + a12 * b3;
      this [ 1] = a01 * b0 + a05 * b1 + a09 * b2 + a13 * b3;
      this [ 2] = a02 * b0 + a06 * b1 + a10 * b2 + a14 * b3;
      this [ 3] = a03 * b0 + a07 * b1 + a11 * b2 + a15 * b3;

      var { 4: b0, 5: b1, 6: b2, 7: b3 } = matrix;

      this [ 4] = a00 * b0 + a04 * b1 + a08 * b2 + a12 * b3;
      this [ 5] = a01 * b0 + a05 * b1 + a09 * b2 + a13 * b3;
      this [ 6] = a02 * b0 + a06 * b1 + a10 * b2 + a14 * b3;
      this [ 7] = a03 * b0 + a07 * b1 + a11 * b2 + a15 * b3;

      var { 8: b0, 9: b1, 10: b2, 11: b3 } = matrix;

      this [ 8] = a00 * b0 + a04 * b1 + a08 * b2 + a12 * b3;
      this [ 9] = a01 * b0 + a05 * b1 + a09 * b2 + a13 * b3;
      this [10] = a02 * b0 + a06 * b1 + a10 * b2 + a14 * b3;
      this [11] = a03 * b0 + a07 * b1 + a11 * b2 + a15 * b3;

      var { 12: b0, 13: b1, 14: b2, 15: b3 } = matrix;

      this [12] = a00 * b0 + a04 * b1 + a08 * b2 + a12 * b3;
      this [13] = a01 * b0 + a05 * b1 + a09 * b2 + a13 * b3;
      this [14] = a02 * b0 + a06 * b1 + a10 * b2 + a14 * b3;
      this [15] = a03 * b0 + a07 * b1 + a11 * b2 + a15 * b3;

      return this;
   },
   multRight (matrix)
   {
      // Complexity 48 +, 64 *.

      const {
         0:  b00, 1:  b01, 2:  b02, 3:  b03,
         4:  b04, 5:  b05, 6:  b06, 7:  b07,
         8:  b08, 9:  b09, 10: b10, 11: b11,
         12: b12, 13: b13, 14: b14, 15: b15
      } = matrix;

      var { 0: a0, 1: a1, 2: a2, 3: a3 } = this;

      this [ 0] = a0 * b00 + a1 * b04 + a2 * b08 + a3 * b12;
      this [ 1] = a0 * b01 + a1 * b05 + a2 * b09 + a3 * b13;
      this [ 2] = a0 * b02 + a1 * b06 + a2 * b10 + a3 * b14;
      this [ 3] = a0 * b03 + a1 * b07 + a2 * b11 + a3 * b15;

      var { 4: a0, 5: a1, 6: a2, 7: a3 } = this;

      this [ 4] = a0 * b00 + a1 * b04 + a2 * b08 + a3 * b12;
      this [ 5] = a0 * b01 + a1 * b05 + a2 * b09 + a3 * b13;
      this [ 6] = a0 * b02 + a1 * b06 + a2 * b10 + a3 * b14;
      this [ 7] = a0 * b03 + a1 * b07 + a2 * b11 + a3 * b15;

      var { 8: a0, 9: a1, 10: a2, 11: a3 } = this;

      this [ 8] = a0 * b00 + a1 * b04 + a2 * b08 + a3 * b12;
      this [ 9] = a0 * b01 + a1 * b05 + a2 * b09 + a3 * b13;
      this [10] = a0 * b02 + a1 * b06 + a2 * b10 + a3 * b14;
      this [11] = a0 * b03 + a1 * b07 + a2 * b11 + a3 * b15;

      var { 12: a0, 13: a1, 14: a2, 15: a3 } = this;

      this [12] = a0 * b00 + a1 * b04 + a2 * b08 + a3 * b12;
      this [13] = a0 * b01 + a1 * b05 + a2 * b09 + a3 * b13;
      this [14] = a0 * b02 + a1 * b06 + a2 * b10 + a3 * b14;
      this [15] = a0 * b03 + a1 * b07 + a2 * b11 + a3 * b15;

      return this;
   },
   multVecMatrix (vector)
   {
      if (vector .length === 3)
      {
         const
            { x, y, z } = vector,
            w = 1 / (x * this [3] + y * this [7] + z * this [11] + this [15]);

         vector .x = (x * this [0] + y * this [4] + z * this [ 8] + this [12]) * w;
         vector .y = (x * this [1] + y * this [5] + z * this [ 9] + this [13]) * w;
         vector .z = (x * this [2] + y * this [6] + z * this [10] + this [14]) * w;

         return vector;
      }
      else
      {
         const { x, y, z, w } = vector;

         vector .x = x * this [0] + y * this [4] + z * this [ 8] + w * this [12];
         vector .y = x * this [1] + y * this [5] + z * this [ 9] + w * this [13];
         vector .z = x * this [2] + y * this [6] + z * this [10] + w * this [14];
         vector .w = x * this [3] + y * this [7] + z * this [11] + w * this [15];

         return vector;
      }
   },
   multMatrixVec (vector)
   {
      if (vector .length === 3)
      {
         const
            { x, y, z } = vector,
            w = 1 / (x * this [12] + y * this [13] + z * this [14] + this [15]);

         vector .x = (x * this [0] + y * this [1] + z * this [ 2] + this [ 3]) * w;
         vector .y = (x * this [4] + y * this [5] + z * this [ 6] + this [ 7]) * w;
         vector .z = (x * this [8] + y * this [9] + z * this [10] + this [11]) * w;

         return vector;
      }
      else
      {
         const { x, y, z, w } = vector;

         vector .x = x * this [ 0] + y * this [ 1] + z * this [ 2] + w * this [ 3];
         vector .y = x * this [ 4] + y * this [ 5] + z * this [ 6] + w * this [ 7];
         vector .z = x * this [ 8] + y * this [ 9] + z * this [10] + w * this [11];
         vector .w = x * this [12] + y * this [13] + z * this [14] + w * this [15];

         return vector;
      }
   },
   multDirMatrix (vector)
   {
      const { x, y, z } = vector;

      vector .x = x * this [0] + y * this [4] + z * this [ 8];
      vector .y = x * this [1] + y * this [5] + z * this [ 9];
      vector .z = x * this [2] + y * this [6] + z * this [10];

      return vector;
   },
   multMatrixDir (vector)
   {
      const { x, y, z } = vector;

      vector .x = x * this [0] + y * this [1] + z * this [ 2];
      vector .y = x * this [4] + y * this [5] + z * this [ 6];
      vector .z = x * this [8] + y * this [9] + z * this [10];

      return vector;
   },
   identity ()
   {
      this [ 0] = 1; this [ 1] = 0; this [ 2] = 0; this [ 3] = 0;
      this [ 4] = 0; this [ 5] = 1; this [ 6] = 0; this [ 7] = 0;
      this [ 8] = 0; this [ 9] = 0; this [10] = 1; this [11] = 0;
      this [12] = 0; this [13] = 0; this [14] = 0; this [15] = 1;

      return this;
   },
   translate (translation)
   {
      const { x, y, z } = translation;

      this [12] += this [ 0] * x + this [ 4] * y + this [ 8] * z;
      this [13] += this [ 1] * x + this [ 5] * y + this [ 9] * z;
      this [14] += this [ 2] * x + this [ 6] * y + this [10] * z;

      return this;
   },
   rotate (rotation)
   {
      return this .multLeft (m .setQuaternion (rotation .getQuaternion (q)));
   },
   scale (scale)
   {
      const { x, y, z } = scale;

      this [ 0] *= x;
      this [ 4] *= y;
      this [ 8] *= z;

      this [ 1] *= x;
      this [ 5] *= y;
      this [ 9] *= z;

      this [ 2] *= x;
      this [ 6] *= y;
      this [10] *= z;

      return this;
   },
   toString ()
   {
      return Array .prototype .join .call (this, " ");
   },
});

for (const key of Object .keys (Matrix4 .prototype))
   Object .defineProperty (Matrix4 .prototype, key, { enumerable: false });

Object .defineProperties (Matrix4 .prototype,
{
   order: { value: 4 },
   length: { value: 16 },
   x:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [0], this [1], this [2], this [3]); };
      })(),
   },
   y:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [4], this [5], this [6], this [7]); };
      })(),
   },
   z:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [8], this [9], this [10], this [11]); };
      })(),
   },
   w:
   {
      get: (() =>
      {
         const vector = new Vector4 ();

         return function () { return vector .set (this [12], this [13], this [14], this [15]); };
      })(),
   },
   xAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [0], this [1], this [2]); };
      })(),
   },
   yAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [4], this [5], this [6]); };
      })(),
   },
   zAxis:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [8], this [9], this [10]); };
      })(),
   },
   origin:
   {
      get: (() =>
      {
         const vector = new Vector3 ();

         return function () { return vector .set (this [12], this [13], this [14]); };
      })(),
   },
   submatrix:
   {
      get: (() =>
      {
         const matrix = new Matrix3 ();

         return function ()
         {
            matrix [0] = this [0]; matrix [1] = this [1]; matrix [2] = this [ 2];
            matrix [3] = this [4]; matrix [4] = this [5]; matrix [5] = this [ 6];
            matrix [6] = this [8]; matrix [7] = this [9]; matrix [8] = this [10];
            return matrix;
         };
      })(),
   },
});

Object .assign (Matrix4,
{
   ZERO: Object .freeze (new Matrix4 (0)),
   IDENTITY: Object .freeze (new Matrix4 ()),
   fromRotation (rotation)
   {
      return Object .create (this .prototype) .setQuaternion (rotation .getQuaternion (q));
   },
   fromQuaternion (quaternion)
   {
      return Object .create (this .prototype) .setQuaternion (quaternion);
   },
   fromMatrix3 (matrix)
   {
      return new Matrix4 (matrix [0], matrix [1], 0, 0,
                          matrix [3], matrix [4], 0, 0,
                          0, 0, 1, 0,
                          matrix [6], matrix [7], 0, 1);
   },
   fromSubMatrix (matrix)
   {
      return new Matrix4 (matrix [0], matrix [1], matrix [2], 0,
                          matrix [3], matrix [4], matrix [5], 0,
                          matrix [6], matrix [7], matrix [8], 0,
                          0, 0, 0, 1);
   },
});

const
   q = new Quaternion (),
   m = new Matrix4 ();

export default Matrix4;
