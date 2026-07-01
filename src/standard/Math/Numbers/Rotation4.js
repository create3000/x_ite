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
   _tainted    = Symbol (),
   _quaternion = Symbol ();

function Rotation4 (x = 0, y = 0, z = 1, angle = 0)
{
   this [_quaternion] = new Quaternion ();

   this .set (x, y, z, angle);
}

Object .assign (Rotation4 .prototype,
{
   *[Symbol .iterator] ()
   {
      if (this [_tainted])
         this .normalize ();

      yield this [_x];
      yield this [_y];
      yield this [_z];
      yield this [_angle];
   },
   assign (rotation)
   {
      if (rotation [_tainted])
      {
         this [_tainted] = true;
      }
      else
      {
         this [_x]       = rotation [_x];
         this [_y]       = rotation [_y];
         this [_z]       = rotation [_z];
         this [_angle]   = rotation [_angle];
         this [_tainted] = false;
      }

      this [_quaternion] .assign (rotation [_quaternion]);

      return this;
   },
   copy ()
   {
      const copy = Object .create (Rotation4 .prototype);

      if (this [_tainted])
      {
         copy [_tainted] = true;
      }
      else
      {
         copy [_x]       = this [_x];
         copy [_y]       = this [_y];
         copy [_z]       = this [_z];
         copy [_angle]   = this [_angle];
         copy [_tainted] = false;
      }

      copy [_quaternion] = this [_quaternion] .copy ();

      return copy;
   },
   equals (rotation)
   {
      return this [_quaternion] .equals (rotation [_quaternion]);
   },
   get: (() =>
   {
      const result = new Vector4 ();

      return function ()
      {
         const quaternion = this [_quaternion];

         if (Math .abs (quaternion .w) >= 1)
         {
            return Vector4 .Z_AXIS;
         }
         else
         {
            const
               angle = Math .acos (quaternion .w) * 2,
               scale = Math .sin (angle / 2);

            if (scale === 0)
            {
               return Vector4 .Z_AXIS;
            }
            else
            {
               return result .set (quaternion .x / scale,
                                   quaternion .y / scale,
                                   quaternion .z / scale,
                                   angle);
            }
         }
      };
   })(),
   getAxis (axis = new Vector3 ())
   {
      if (this [_tainted])
         this .normalize ();

      return axis .set (this [_x], this [_y], this [_z]);
   },
   getEuler (euler = [ ], order = "XYZ")
   {
      return this [_quaternion] .getEuler (euler, order);
   },
   getMatrix (matrix = new Matrix3 ())
   {
      return this [_quaternion] .getMatrix (matrix);
   },
   getQuaternion (quaternion = new Quaternion ())
   {
      return quaternion .assign (this [_quaternion]);
   },
   inverse ()
   {
      this [_quaternion] .conjugate ();

      this [_tainted] = true;

      return this;
   },
   multLeft (rotation)
   {
      this [_quaternion] .multLeft (rotation [_quaternion]) .normalize ();

      this [_tainted] = true;

      return this;
   },
   multRight (rotation)
   {
      this [_quaternion] .multRight (rotation [_quaternion]) .normalize ();

      this [_tainted] = true;

      return this;
   },
   multRotVec (vector)
   {
      return this [_quaternion] .multQuatVec (vector);
   },
   multVecRot (vector)
   {
      return this [_quaternion] .multVecQuat (vector);
   },
   normalize ()
   {
      const rotation = this .get ();

      this [_x]       = rotation .x;
      this [_y]       = rotation .y;
      this [_z]       = rotation .z;
      this [_angle]   = rotation .w;
      this [_tainted] = false;

      return this;
   },
   set (x = 0, y = 0, z = 1, angle = 0)
   {
      this [_x]       = x;
      this [_y]       = y;
      this [_z]       = z;
      this [_angle]   = angle;
      this [_tainted] = false;

      const scale = Math .hypot (x, y, z);

      if (scale === 0)
      {
         this [_quaternion] .set (0, 0, 0, 1);
         return this;
      }

      // Determine quaternion.

      const
         halfTheta = Algorithm .interval (angle / 2, 0, Math .PI),
         aScale    = Math .sin (halfTheta) / scale;

      this [_quaternion] .set (x * aScale,
                               y * aScale,
                               z * aScale,
                               Math .cos (halfTheta));
      return this;
   },
   setAxis (vector)
   {
      if (this [_tainted])
         this .normalize ();

      this .set (vector .x, vector .y, vector .z, this [_angle]);
   },
   setAxisAngle (axis, angle)
   {
      return this .set (axis .x, axis .y, axis .z, angle);
   },
   setEuler (x, y, z, order = "XYZ")
   {
      // Quaternion is then already normalized.
      this [_quaternion] .setEuler (x, y, z, order);

      this [_tainted] = true;

      return this;
   },
   setMatrix (matrix)
   {
      this [_quaternion] .setMatrix (matrix) .normalize ();

      this [_tainted] = true;

      return this;
   },
   setQuaternion (quaternion)
   {
      this [_quaternion] .assign (quaternion) .normalize ();

      this [_tainted] = true;

      return this;
   },
   setVectors: (() =>
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
            {
               this [_quaternion] .set (0, 0, 0, 1); // standard rotation
            }
            // Ok, so they are parallel and pointing in the opposite direction
            // of each other.
            else
            {
               // Try crossing with x axis.
               t .assign (from) .cross (Vector3 .X_AXIS);

               // If not ok, cross with y axis.
               if (t .squaredNorm () === 0)
                  t .assign (from) .cross (Vector3 .Y_AXIS);

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

         this [_tainted] = true;

         return this;
      };
   })(),
   slerp (dest, t)
   {
      this [_quaternion] .slerp (dest [_quaternion], t);

      this [_tainted] = true;

      return this;
   },
   squad (a, b, dest, t)
   {
      this [_quaternion] .squad (a [_quaternion], b [_quaternion], dest [_quaternion], t);

      this [_tainted] = true;

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
         upNormal   = new Vector3 ();

      return function (upVector = Vector3 .Y_AXIS)
      {
         upNormal .assign (upVector) .normalize ();

         this .multVecRot (localXAxis .assign (Vector3 .X_AXIS) .negate ());
         this .multVecRot (localZAxis .assign (Vector3 .Z_AXIS));

         // If viewer looks along up vector.
         if (Math .abs (localZAxis .dot (upNormal)) >= 1)
            return this;

         const newXAxis = localZAxis .cross (upNormal) .normalize ();

         if (newXAxis .dot (localXAxis) <= -1)
         {
            rotation .setAxisAngle (Vector3 .Z_AXIS, Math .PI);

            return this .multLeft (rotation);
         }
         else
         {
            rotation .setVectors (localXAxis, newXAxis);

            return this .multRight (rotation);
         }
      };
   })(),
   toString ()
   {
      if (this [_tainted])
         this .normalize ();

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
      if (this [_tainted])
         this .normalize ();

      return this [_x];
   },
   set (x)
   {
      if (this [_tainted])
         this .normalize ();

      this .set (x, this [_y], this [_z], this [_angle]);
   },
};

const y = {
   get ()
   {
      if (this [_tainted])
         this .normalize ();

      return this [_y];
   },
   set (y)
   {
      if (this [_tainted])
         this .normalize ();

      this .set (this [_x], y, this [_z], this [_angle]);
   },
};

const z = {
   get ()
   {
      if (this [_tainted])
         this .normalize ();

      return this [_z];
   },
   set (z)
   {
      if (this [_tainted])
         this .normalize ();

      this .set (this [_x], this [_y], z, this [_angle]);
   },
};

const angle = {
   get ()
   {
      if (this [_tainted])
         this .normalize ();

      return this [_angle];
   },
   set (angle)
   {
      if (this [_tainted])
         this .normalize ();

      this .set (this [_x], this [_y], this [_z], angle);
   },
};

Object .defineProperties (Rotation4 .prototype,
{
   length: { value: 4 },
   0: x,
   1: y,
   2: z,
   3: angle,
   x: Object .assign ({ enumerable: true }, x),
   y: Object .assign ({ enumerable: true }, y),
   z: Object .assign ({ enumerable: true }, z),
   angle: Object .assign ({ enumerable: true }, angle),
});

Object .assign (Rotation4,
{
   IDENTITY: Object .freeze (new Rotation4 ()),
   fromEuler (x, y, z, order = "XYZ")
   {
      return new Rotation4 () .setEuler (x, y, z, order);
   },
   fromMatrix (matrix)
   {
      return new Rotation4 () .setMatrix (matrix);
   },
   fromQuaternion (quaternion)
   {
      return new Rotation4 () .setQuaternion (quaternion);
   },
   fromVectors (fromVec, toVec)
   {
      return new Rotation4 () .setVectors (fromVec, toVec);
   },
   spline (r0, r1, r2)
   {
      const copy = Object .create (this .prototype);
      copy [_quaternion] = Quaternion .spline (r0 [_quaternion], r1 [_quaternion], r2 [_quaternion]);
      copy .normalize ();
      return copy;
   },
});

const rotation = new Rotation4 ();

export default Rotation4;
