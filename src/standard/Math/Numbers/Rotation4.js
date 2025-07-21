import Quaternion from "./Quaternion.js";
import Vector3    from "./Vector3.js";
import Vector4    from "./Vector4.js";
import Matrix3    from "./Matrix3.js";
import Algorithm  from "../Algorithm.js";

const
   _x          = Symbol (),
   _y          = Symbol (),
   _z          = Symbol (),
   _angle      = Symbol (),
   _quaternion = Symbol ();

function Rotation4 (x, y, z, angle)
{
   this [_x]     = 0;
   this [_y]     = 0;
   this [_z]     = 1;
   this [_angle] = 0;

   switch (arguments .length)
   {
      case 0:
      {
         this [_quaternion] = new Quaternion ();
         return;
      }
      case 1:
      {
         this [_quaternion] = arguments [0];
         this .update ();
         return;
      }
      case 2:
      {
         const
            arg0 = arguments [0],
            arg1 = arguments [1];

         this [_quaternion] = new Quaternion ();

         if (arg1 instanceof Vector3)
            return this .setFromToVec (arg0, arg1);

         this .set (arg0 .x,
                    arg0 .y,
                    arg0 .z,
                    arg1);

         return;
      }
      case 4:
      {
         this [_quaternion] = new Quaternion ();
         this .set (x, y, z, angle);
         return;
      }
   }
}

Object .assign (Rotation4 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this [_x];
      yield this [_y];
      yield this [_z];
      yield this [_angle];
   },
   update ()
   {
      const rotation = this .get ();

      this [_x]     = rotation .x;
      this [_y]     = rotation .y;
      this [_z]     = rotation .z;
      this [_angle] = rotation .w;

      return this;
   },
   copy ()
   {
      const copy = Object .create (Rotation4 .prototype);

      copy [_x]     = this [_x];
      copy [_y]     = this [_y];
      copy [_z]     = this [_z];
      copy [_angle] = this [_angle];

      copy [_quaternion]  = this [_quaternion] .copy ();

      return copy;
   },
   assign (rotation)
   {
      this [_x]     = rotation [_x];
      this [_y]     = rotation [_y];
      this [_z]     = rotation [_z];
      this [_angle] = rotation [_angle];

      this [_quaternion] .assign (rotation [_quaternion]);

      return this;
   },
   set (x = 0, y = 0, z = 1, angle = 0)
   {
      this [_x]     = x;
      this [_y]     = y;
      this [_z]     = z;
      this [_angle] = angle;

      const scale = Math .hypot (x, y, z);

      if (scale === 0)
      {
         this [_quaternion] .set (0, 0, 0, 1);
         return this;
      }

      // Calculate quaternion

      const
         halfTheta = Algorithm .interval (angle / 2, 0, Math .PI),
         ascale    = Math .sin (halfTheta) / scale;

      this [_quaternion] .set (x * ascale,
                               y * ascale,
                               z * ascale,
                               Math .cos (halfTheta));
      return this;
   },
   get: (() =>
   {
      const result = new Vector4 ();

      return function ()
      {
         const quaternion = this [_quaternion];

         if (Math .abs (quaternion .w) > 1)
         {
            return Vector4 .zAxis;
         }
         else
         {
            const
               angle = Math .acos (quaternion .w) * 2,
               scale = Math .sin (angle / 2);

            if (scale === 0)
            {
               return Vector4 .zAxis;
            }
            else
            {
               const axis = quaternion .imag .divide (scale);

               return result .set (axis .x,
                                   axis .y,
                                   axis .z,
                                   angle);
            }
         }
      };
   })(),
   setAxisAngle (axis, angle)
   {
      return this .set (axis .x, axis .y, axis .z, angle);
   },
   setFromToVec: (() =>
   {
      const
         from = new Vector3 (),
         to   = new Vector3 (),
         cv   = new Vector3 (),
         t    = new Vector3 ();

      return function (fromVec, toVec)
      {
         // https://bitbucket.org/Coin3D/coin/src/abc9f50968c9/src/base/SbRotation.cpp

         from .assign (fromVec) .normalize ();
         to   .assign (toVec)   .normalize ();

         const
            cos_angle = Algorithm .clamp (from .dot (to), -1, 1),
            crossvec  = cv .assign (from) .cross (to) .normalize (),
            crosslen  = crossvec .norm ();

         if (crosslen === 0)
         {
            // Parallel vectors
            // Check if they are pointing in the same direction.
            if (cos_angle > 0)
               this [_quaternion] .set (0, 0, 0, 1); // standard rotation

            // Ok, so they are parallel and pointing in the opposite direction
            // of each other.
            else
            {
               // Try crossing with x axis.
               t .assign (from) .cross (Vector3 .xAxis);

               // If not ok, cross with y axis.
               if (t .squaredNorm () === 0)
                  t .assign (from) .cross (Vector3 .yAxis);

               t .normalize ();

               this [_quaternion] .set (t .x, t .y, t .z, 0);
            }
         }
         else
         {
            // Vectors are not parallel
            // The abs () wrapping is to avoid problems when `dot' "overflows" a tiny wee bit,
            // which can lead to sqrt () returning NaN.
            crossvec .multiply (Math .sqrt (Math .abs (1 - cos_angle) / 2));

            this [_quaternion] .set (crossvec .x,
                                     crossvec .y,
                                     crossvec .z,
                                     Math .sqrt (Math .abs (1 + cos_angle) / 2));
         }

         this .update ();

         return this;
      };
   })(),
   setAxis (vector)
   {
      this .set (vector .x, vector .y, vector .z, this [_angle]);
   },
   getAxis (axis = new Vector3 ())
   {
      return axis .set (this [_x], this [_y], this [_z]);
   },
   setQuaternion (quaternion)
   {
      this [_quaternion] .assign (quaternion) .normalize ();
      this .update ();
      return this;
   },
   getQuaternion (quaternion = new Quaternion ())
   {
      return quaternion .assign (this [_quaternion]);
   },
   setMatrix (matrix)
   {
      this [_quaternion] .setMatrix (matrix) .normalize ();
      this .update ();
      return this;
   },
   getMatrix (matrix = new Matrix3 ())
   {
      return this [_quaternion] .getMatrix (matrix);
   },
   setEuler (x, y, z, order = "XYZ")
   {
      // Quaternion is then already normalized.
		this [_quaternion] .setEuler (x, y, z, order);
      this .update ();
		return this;
	},
   getEuler (euler = [ ], order = "XYZ")
   {
      return this [_quaternion] .getEuler (euler, order);
   },
   equals (rotation)
   {
      return this [_quaternion] .equals (rotation [_quaternion]);
   },
   inverse ()
   {
      this [_quaternion] .inverse ();
      this .update ();
      return this;
   },
   multLeft (rotation)
   {
      this [_quaternion] .multLeft (rotation [_quaternion]) .normalize ();
      this .update ();
      return this;
   },
   multRight (rotation)
   {
      this [_quaternion] .multRight (rotation [_quaternion]) .normalize ();
      this .update ();
      return this;
   },
   multVecRot (vector)
   {
      return this [_quaternion] .multVecQuat (vector);
   },
   multRotVec (vector)
   {
      return this [_quaternion] .multQuatVec (vector);
   },
   normalize ()
   {
      this [_quaternion] .normalize ();
      this .update ();
      return this;
   },
   pow (exponent)
   {
      this [_quaternion] .pow (exponent);
      this .update ();
      return this;
   },
   slerp (dest, t)
   {
      this [_quaternion] .slerp (dest [_quaternion], t);
      this .update ();
      return this;
   },
   squad (a, b, dest, t)
   {
      this [_quaternion] .squad (a [_quaternion], b [_quaternion], dest [_quaternion], t);
      this .update ();
      return this;
   },
   /**
    * Straightens the rotation so that the x-axis of this rotation is parallel to the plane spawned by upVector.
    */
   straighten: (() =>
   {
      const
         localXAxis = new Vector3 (),
         localZAxis = new Vector3 (),
         upNormal   = new Vector3 (),
         rotation   = new Rotation4 ();

      return function (upVector = Vector3 .yAxis)
      {
         upNormal .assign (upVector) .normalize ();

         this .multVecRot (localXAxis .assign (Vector3 .xAxis) .negate ());
         this .multVecRot (localZAxis .assign (Vector3 .zAxis));

         // If viewer looks along up vector.
         if (Math .abs (localZAxis .dot (upNormal)) >= 1)
            return this;

         const newXAxis = localZAxis .cross (upNormal) .normalize ();

         if (newXAxis .dot (localXAxis) <= -1)
         {
            rotation .setAxisAngle (Vector3 .zAxis, Math .PI);

            return this .multLeft (rotation);
         }
         else
         {
            rotation .setFromToVec (localXAxis, newXAxis);

            return this .multRight (rotation);
         }
      };
   })(),
   toString ()
   {
      return this [_x] + " " +
             this [_y] + " " +
             this [_z] + " " +
             this [_angle];
   }
});

for (const key of Object .keys (Rotation4 .prototype))
   Object .defineProperty (Rotation4 .prototype, key, { enumerable: false });

const x = {
   get ()
   {
      return this [_x];
   },
   set (x)
   {
      this [_x] = x;
      this .set (x, this [_y], this [_z], this [_angle]);
   },
   enumerable: true,
};

const y = {
   get ()
   {
      return this [_y];
   },
   set (y)
   {
      this [_y] = y;
      this .set (this [_x], y, this [_z], this [_angle]);
   },
   enumerable: true,
};

const z = {
   get ()
   {
      return this [_z];
   },
   set (z)
   {
      this [_z] = z;
      this .set (this [_x], this [_y], z, this [_angle]);
   },
   enumerable: true,
};

const angle = {
   get ()
   {
      return this [_angle];
   },
   set (angle)
   {
      this [_angle] = angle;
      this .set (this [_x], this [_y], this [_z], angle);
   },
   enumerable: true,
};

Object .defineProperties (Rotation4 .prototype,
{
   length: { value: 4 },
   x: x,
   y: y,
   z: z,
   angle: angle,
});

x     .enumerable = false;
y     .enumerable = false;
z     .enumerable = false;
angle .enumerable = false;

Object .defineProperties (Rotation4 .prototype,
{
   0: x,
   1: y,
   2: z,
   3: angle,
});

Object .assign (Rotation4,
{
   Identity: Object .freeze (new Rotation4 ()),
   fromQuaternion (quaternion)
   {
      return new Rotation4 () .setQuaternion (quaternion);
   },
   fromMatrix (matrix)
   {
      return new Rotation4 () .setMatrix (matrix);
   },
   fromEuler (x, y, z, order = "XYZ")
   {
      return new Rotation4 () .setEuler (x, y, z, order);
   },
   spline (r0, r1, r2)
   {
      const copy = Object .create (this .prototype);
      copy [_quaternion] = Quaternion .spline (r0 [_quaternion], r1 [_quaternion], r2 [_quaternion]);
      copy .update ();
      return copy;
   },
});

export default Rotation4;
