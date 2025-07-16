import Vector3   from "./Vector3.js";
import Matrix3   from "./Matrix3.js";
import Algorithm from "../Algorithm.js";

function Quaternion (x = 0, y = 0, z = 0, w = 1)
{
   this .x = x;
   this .y = y;
   this .z = z;
   this .w = w;
}

Object .assign (Quaternion .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .x;
      yield this .y;
      yield this .z;
      yield this .w;
   },
   copy ()
   {
      const copy = Object .create (Quaternion .prototype);
      copy .x = this .x;
      copy .y = this .y;
      copy .z = this .z;
      copy .w = this .w;
      return copy;
   },
   assign ({ x, y, z, w })
   {
      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
      return this;
   },
   set (x = 0, y = 0, z = 0, w = 1)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
      return this;
   },
   setMatrix (matrix)
   {
      // First, find largest diagonal in matrix:
      if (matrix [0] > matrix [4])
      {
         var i = matrix [0] > matrix [8] ? 0 : 2;
      }
      else
      {
         var i = matrix [4] > matrix [8] ? 1 : 2;
      }

      const scaleRow = matrix [0] + matrix [4] + matrix [8];

      if (scaleRow > matrix [i * 3 + i])
      {
         // Compute w first:
         this [3] = Math .sqrt (scaleRow + 1) / 2;

         // And compute other values:
         const d = 4 * this [3];
         this [0] = (matrix [5] - matrix [7]) / d;
         this [1] = (matrix [6] - matrix [2]) / d;
         this [2] = (matrix [1] - matrix [3]) / d;
      }
      else
      {
         // Compute x, y, or z first:
         const j = (i + 1) % 3;
         const k = (i + 2) % 3;

         // Compute first value:
         this [i] = Math .sqrt (matrix [i * 3 + i] - matrix [j * 3 + j] - matrix [k * 3 + k] + 1) / 2;

         // And the others:
         const d = 4 * this [i];
         this [j] = (matrix [i * 3 + j] + matrix [j * 3 + i]) / d;
         this [k] = (matrix [i * 3 + k] + matrix [k * 3 + i]) / d;
         this [3] = (matrix [j * 3 + k] - matrix [k * 3 + j]) / d;
      }

      return this;
   },
   getMatrix (matrix = new Matrix3 ())
   {
      const { x, y, z, w } = this;

      const
         a = x * x,
         b = x * y,
         c = y * y,
         d = y * z,
         e = z * x,
         f = z * z,
         g = w * x,
         h = w * y,
         i = w * z;

      matrix [0] = 1 - 2 * (c + f);
      matrix [1] =     2 * (b + i);
      matrix [2] =     2 * (e - h);

      matrix [3] =     2 * (b - i);
      matrix [4] = 1 - 2 * (f + a);
      matrix [5] =     2 * (d + g);

      matrix [6] =     2 * (e + h);
      matrix [7] =     2 * (d - g);
      matrix [8] = 1 - 2 * (c + a);

      return matrix;
   },
   setEuler (x, y, z, order = "XYZ")
   {
		// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

      const
		   c1 = Math .cos (x / 2),
		   c2 = Math .cos (y / 2),
		   c3 = Math .cos (z / 2),
		   s1 = Math .sin (x / 2),
		   s2 = Math .sin (y / 2),
		   s3 = Math .sin (z / 2);

		switch (order)
      {
			case "XYZ":
				this .x = s1 * c2 * c3 + c1 * s2 * s3;
				this .y = c1 * s2 * c3 - s1 * c2 * s3;
				this .z = c1 * c2 * s3 + s1 * s2 * c3;
				this .w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

         case "ZYX":
            this .x = s1 * c2 * c3 - c1 * s2 * s3;
            this .y = c1 * s2 * c3 + s1 * c2 * s3;
            this .z = c1 * c2 * s3 - s1 * s2 * c3;
            this .w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

			case "YXZ":
				this .x = s1 * c2 * c3 + c1 * s2 * s3;
				this .y = c1 * s2 * c3 - s1 * c2 * s3;
				this .z = c1 * c2 * s3 - s1 * s2 * c3;
				this .w = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case "ZXY":
				this .x = s1 * c2 * c3 - c1 * s2 * s3;
				this .y = c1 * s2 * c3 + s1 * c2 * s3;
				this .z = c1 * c2 * s3 + s1 * s2 * c3;
				this .w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case "YZX":
				this .x = s1 * c2 * c3 + c1 * s2 * s3;
				this .y = c1 * s2 * c3 + s1 * c2 * s3;
				this .z = c1 * c2 * s3 - s1 * s2 * c3;
				this .w = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case "XZY":
				this .x = s1 * c2 * c3 - c1 * s2 * s3;
				this .y = c1 * s2 * c3 - s1 * c2 * s3;
				this .z = c1 * c2 * s3 + s1 * s2 * c3;
				this .w = c1 * c2 * c3 + s1 * s2 * s3;
				break;
		}

		return this;
	},
   getEuler (euler = [ ], order = "XYZ")
   {
      const { 0: m0, 1: m1, 2: m2, 3: m3, 4: m4, 5: m5, 6: m6, 7: m7, 8: m8 } = this .getMatrix (m);

		switch (order)
      {
			case "XYZ":
         {
				euler [1] = Math .asin (Algorithm .clamp (m6, -1, 1));

				if (Math .abs (m6) < 0.9999999)
            {
					euler [0] = Math .atan2 (-m7, m8);
					euler [2] = Math .atan2 (-m3, m0);
				}
            else
            {
					euler [0] = Math .atan2 (m5, m4);
					euler [2] = 0;
				}

				break;
         }
			case "ZYX":
         {
				euler [1] = Math .asin (- Algorithm .clamp (m2, -1, 1));

				if (Math .abs (m2) < 0.9999999)
            {
					euler [0] = Math .atan2 (m5, m8);
					euler [2] = Math .atan2 (m1, m0);
				}
            else
            {
					euler [0] = 0;
					euler [2] = Math .atan2 (-m3, m4);
				}

				break;
         }
			case "YXZ":
         {
				euler [0] = Math .asin (- Algorithm .clamp (m7, -1, 1));

				if (Math .abs (m7) < 0.9999999)
            {
					euler [1] = Math .atan2 (m6, m8);
					euler [2] = Math .atan2 (m1, m4);

				}
            else
            {
					euler [1] = Math .atan2 (-m2, m0);
					euler [2] = 0;
				}

				break;
         }
			case "ZXY":
         {
				euler [0] = Math .asin (Algorithm .clamp (m5, -1, 1));

				if (Math .abs (m5) < 0.9999999)
            {
					euler [1] = Math .atan2 (-m2, m8);
					euler [2] = Math .atan2 (-m3, m4);
				}
            else
            {
					euler [1] = 0;
					euler [2] = Math .atan2 (m1, m0);
				}

				break;
         }
			case "YZX":
         {
				euler [2] = Math .asin (Algorithm .clamp (m1, -1, 1));

				if (Math .abs (m1) < 0.9999999)
            {
					euler [0] = Math .atan2 (-m7, m4);
					euler [1] = Math .atan2 (-m2, m0);
				}
            else
            {
					euler [0] = 0;
					euler [1] = Math .atan2 (m6, m8);
				}

				break;
         }
			case "XZY":
         {
				euler [2] = Math .asin (- Algorithm .clamp (m3, -1, 1));

				if (Math .abs (m3) < 0.9999999)
            {
					euler [0] = Math .atan2 (m5, m4);
					euler [1] = Math .atan2 (m6, m0);

				}
            else
            {
					euler [0] = Math .atan2 (-m7, m8);
					euler [1] = 0;
				}

				break;
         }
		}

		return euler;
   },
   isReal ()
   {
      return !(this .x || this .y || this .z);
   },
   isImag ()
   {
      return !this .w;
   },
   equals ({ x, y, z, w })
   {
      return this .x === x &&
             this .y === y &&
             this .z === z &&
             this .w === w;
   },
   negate ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      this .w = -this .w;
      return this;
   },
   inverse ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      return this;
   },
   add ({ x, y, z, w })
   {
      this .x += x;
      this .y += y;
      this .z += z;
      this .w += w;
      return this;
   },
   subtract ({ x, y, z, w })
   {
      this .x -= x;
      this .y -= y;
      this .z -= z;
      this .w -= w;
      return this;
   },
   multiply (value)
   {
      this .x *= value;
      this .y *= value;
      this .z *= value;
      this .w *= value;
      return this;
   },
   multLeft (quat)
   {
      const
         { x: ax, y: ay, z: az, w: aw } = this,
         { x: bx, y: by, z: bz, w: bw } = quat;

      this .x = aw * bx + ax * bw + ay * bz - az * by;
      this .y = aw * by + ay * bw + az * bx - ax * bz;
      this .z = aw * bz + az * bw + ax * by - ay * bx;
      this .w = aw * bw - ax * bx - ay * by - az * bz;

      return this;
   },
   multRight (quat)
   {
      const
         { x: ax, y: ay, z: az, w: aw } = this,
         { x: bx, y: by, z: bz, w: bw } = quat;

      this .x = bw * ax + bx * aw + by * az - bz * ay;
      this .y = bw * ay + by * aw + bz * ax - bx * az;
      this .z = bw * az + bz * aw + bx * ay - by * ax;
      this .w = bw * aw - bx * ax - by * ay - bz * az;

      return this;
   },
   divide (value)
   {
      this .x /= value;
      this .y /= value;
      this .z /= value;
      this .w /= value;
      return this;
   },
   multVecQuat (vector)
   {
      // https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles#Vector_rotation

      const
         { x: qx, y: qy, z: qz, w: qw } = this,
         { x: vx, y: vy, z: vz } = vector,
         tx = 2 * (qy * vz - qz * vy),
         ty = 2 * (qz * vx - qx * vz),
         tz = 2 * (qx * vy - qy * vx);

      vector .x += qw * tx + qy * tz - qz * ty;
      vector .y += qw * ty + qz * tx - qx * tz;
      vector .z += qw * tz + qx * ty - qy * tx;

      return vector;
   },
   multQuatVec (vector)
   {
      // https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles#Vector_rotation

      const
         { x: qx, y: qy, z: qz, w: qw } = this,
         { x: vx, y: vy, z: vz } = vector,
         tx = 2 * (qz * vy - qy * vz),
         ty = 2 * (qx * vz - qz * vx),
         tz = 2 * (qy * vx - qx * vy);

      vector .x += qw * tx - qy * tz + qz * ty;
      vector .y += qw * ty - qz * tx + qx * tz;
      vector .z += qw * tz - qx * ty + qy * tx;

      return vector;
   },
   normalize ()
   {
      const length = Math .hypot (this .x, this .y, this .z, this .w);

      if (length)
      {
         this .x /= length;
         this .y /= length;
         this .z /= length;
         this .w /= length;
      }

      return this;
   },
   dot (quat)
   {
      return this .x * quat .x +
             this .y * quat .y +
             this .z * quat .z +
             this .w * quat .w;
   },
   norm ()
   {
      const { x, y, z, w } = this;

      return x * x +
             y * y +
             z * z +
             w * w;
   },
   magnitude ()
   {
      return Math .hypot (this .x, this .y, this .z, this .w);
   },
   pow (exponent)
   {
      if (exponent instanceof Quaternion)
         return this .assign (e .assign (exponent) .multRight (this .log ()) .exp ());

      if (this .isReal ())
         return this .set (0, 0, 0, this .w ** exponent);

      const
         l     = this .magnitude (),
         theta = Math .acos (this .w / l),
         li    = this .imag .magnitude (),
         ltoe  = l ** exponent,
         et    = exponent * theta,
         scale = ltoe / li * Math .sin (et);

      this .x *= scale;
      this .y *= scale;
      this .z *= scale;
      this .w  = ltoe * Math .cos (et);
      return this;
   },
   log ()
   {
      if (this .isReal ())
      {
         if (this .w > 0)
            return this .set (0, 0, 0, Math .log (this .w));

         else
            return this .set (Math .PI, 0, 0, Math .log (-this .w));
      }

      const
         l = this .magnitude (),
         v = this .imag .normalize () .multiply (Math .acos (this .w / l)),
         w = Math .log (l);

      this .x = v .x;
      this .y = v .y;
      this .z = v .z;
      this .w = w;
      return this;
   },
   exp ()
   {
      if (this .isReal ())
         return this .set (0, 0, 0, Math .exp (this .w));

      const
         i  = this .imag,
         li = i .magnitude (),
         ew = Math .exp (this .w),
         w  = ew * Math .cos (li),
         v  = i .multiply (ew * Math .sin (li) / li);

      this .x = v .x;
      this .y = v .y;
      this .z = v .z;
      this .w = w;
      return this;
   },
   slerp (destination, t)
   {
      return Algorithm .slerp (this, t1 .assign (destination), t);
   },
   squad (a, b, destination, t)
   {
      // Ken Shoemake defines Squad as:
      // We must use shortest path slerp to prevent flipping. See also spline below.
      // a = spline (si-1, si, si+1) and b = spline (di-1, di, di+1), where si = source and di = destination

      return Algorithm .slerp (Algorithm .slerp (this, t1 .assign (destination), t),
                               Algorithm .slerp (t2 .assign (a), t3 .assign (b), t),
                               2 * t * (1 - t));
   },
   toString ()
   {
      return this .x + " " +
             this .y + " " +
             this .z + " " +
             this .w;
   },
});

for (const key of Object .keys (Quaternion .prototype))
   Object .defineProperty (Quaternion .prototype, key, { enumerable: false });

Object .defineProperties (Quaternion .prototype,
{
   length: { value: 4 },
   0:
   {
      get () { return this .x; },
      set (value) { this .x = value; },
   },
   1:
   {
      get () { return this .y; },
      set (value) { this .y = value; },
   },
   2:
   {
      get () { return this .z; },
      set (value) { this .z = value; },
   },
   3:
   {
      get () { return this .w; },
      set (value) { this .w = value; },
   },
   real:
   {
      get () { return this .w; },
   },
   imag:
   {
      get: (() =>
      {
         const result = new Vector3 ();

         return function ()
         {
            return result .set (this .x,
                                this .y,
                                this .z);
         };
      })(),
   },
});

Object .assign (Quaternion,
{
   Identity: Object .freeze (new Quaternion ()),
   spline: (() =>
   {
      const
         q0   = new Quaternion (),
         q1   = new Quaternion (),
         q2   = new Quaternion (),
         q1_i = new Quaternion ();

      return function (Q0, Q1, Q2)
      {
         q0 .assign (Q0);
         q1 .assign (Q1);
         q2 .assign (Q2);

         // If the dot product is smaller than 0 we must negate the quaternion to prevent flipping. If we negate all
         // the terms we get a different quaternion but it represents the same rotation.

         if (q0 .dot (q1) < 0)
            q0 .negate ();

         if (q2 .dot (q1) < 0)
            q2 .negate ();

         q1_i .assign (q1) .inverse ();

         // The result must be normalized as it will be used in slerp and we can only slerp normalized vectors.

         return q1 .multRight (
            t1 .assign (q1_i) .multRight (q0) .log () .add (t2 .assign (q1_i) .multRight (q2) .log ()) .divide (-4) .exp ()
         )
         .normalize () .copy ();
      };
   })(),
});

const
   t1 = new Quaternion (),
   t2 = new Quaternion (),
   t3 = new Quaternion (),
   m  = new Matrix3 ();

export default Quaternion;
