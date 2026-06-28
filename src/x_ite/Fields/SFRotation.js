import X3DField   from "../Base/X3DField.js";
import SFVec3     from "./SFVec3.js";
import SFMatrix3  from "./SFMatrix3.js";
import Rotation4  from "../../standard/Math/Numbers/Rotation4.js";
import Quaternion from "../../standard/Math/Numbers/Quaternion.js";

const
   { SFVec3d, SFVec3f } = SFVec3,
   { SFMatrix3f }       = SFMatrix3;

function SFRotation (x = 0, y = 0, z = 1, angle = 0)
{
   if ((x instanceof SFVec3f) || (x instanceof SFVec3d))
   {
      if ((y instanceof SFVec3f) || (y instanceof SFVec3d))
      {
         // new SFRotation (fromVector: SFVec3d | SFVec3f, toVector: SFVec3d | SFVec3f)
         X3DField .call (this, Rotation4 .fromVectors (x .getValue (), y .getValue ()));
      }
      else
      {
         // new SFRotation (axis: SFVec3d | SFVec3f, angle: number)
         X3DField .call (this, new Rotation4 (... x, +y));
      }
   }
   else
   {
      X3DField .call (this, new Rotation4 (+x, +y, +z, +angle));
   }
}

Object .assign (Object .setPrototypeOf (SFRotation .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return SFRotation .fromValue (this .getValue () .copy ());
   },
   equals (rotation)
   {
      return this .getValue () .equals (rotation .getValue ());
   },
   isDefaultValue ()
   {
      return this .getValue () .equals (Rotation4 .IDENTITY);
   },
   set (value)
   {
      this .getValue () .assign (value);
   },
   getAxis ()
   {
      return SFVec3f .fromValue (this .getValue () .getAxis ());
   },
   getMatrix ()
   {
      return SFMatrix3f .fromValue (this .getValue () .getMatrix ());
   },
   getQuaternion: (() =>
   {
      const q = new Quaternion ();

      return function ()
      {
         return [... this .getValue () .getQuaternion (q)];
      };
   })(),
   inverse ()
   {
      return SFRotation .fromValue (this .getValue () .copy () .inverse ());
   },
   multiply (rotation)
   {
      return SFRotation .fromValue (this .getValue () .copy () .multRight (rotation .getValue ()));
   },
   multVec (vector)
   {
      return vector .constructor .fromValue (this .getValue () .multVecRot (vector .getValue () .copy ()));
   },
   setAxis (vector)
   {
      this .getValue () .setAxis (vector .getValue ());
      this .addEvent ();
   },
   setMatrix (matrix)
   {
      this .getValue () .setMatrix (matrix .getValue ());
      this .addEvent ();
   },
   setQuaternion: (() =>
   {
      const q = new Quaternion ();

      return function (x, y, z, w)
      {
         this .getValue () .setQuaternion (q .set (+x, +y, +z, +w));
         this .addEvent ();
      };
   })(),
   slerp (rotation, t)
   {
      return SFRotation .fromValue (this .getValue () .copy () .slerp (rotation .getValue (), t));
   },
   straighten (upVector)
   {
      return SFRotation .fromValue (this .getValue () .copy () .straighten (upVector ?.getValue ()));
   },
   toStream (generator)
   {
      const { x, y, z, angle } = this .getValue ();

      generator .string += generator .DoubleFormat (x);
      generator .Space ();
      generator .string += generator .DoubleFormat (y);
      generator .Space ();
      generator .string += generator .DoubleFormat (z);
      generator .Space ();
      generator .string += generator .DoubleFormat (generator .ToUnit ("angle", angle));
   },
   toVRMLStream (generator)
   {
      this .toStream (generator);
   },
   toXMLStream (generator)
   {
      this .toStream (generator);
   },
   toJSONStream (generator)
   {
      generator .string += '[';
      generator .TidySpace ();

      this .toJSONStreamValue (generator);

      generator .TidySpace ();
      generator .string += ']';
   },
   toJSONStreamValue (generator)
   {
      const { x, y, z, angle } = this .getValue ();

      generator .string += generator .Number (generator .DoubleFormat (x));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (y));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (z));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (generator .ToUnit ("angle", angle)));
   },
});

for (const key of Object .keys (SFRotation .prototype))
   Object .defineProperty (SFRotation .prototype, key, { enumerable: false });

const x = {
   get ()
   {
      return this .getValue () .x;
   },
   set (value)
   {
      this .getValue () .x = +value;
      this .addEvent ();
   },
};

const y = {
   get ()
   {
      return this .getValue () .y;
   },
   set (value)
   {
      this .getValue () .y = +value;
      this .addEvent ();
   },
};

const z = {
   get ()
   {
      return this .getValue () .z;
   },
   set (value)
   {
      this .getValue () .z = +value;
      this .addEvent ();
   },
};

const angle = {
   get ()
   {
      return this .getValue () .angle;
   },
   set (value)
   {
      this .getValue () .angle = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFRotation .prototype,
{
   0: x,
   1: y,
   2: z,
   3: angle,
   x: Object .assign ({ enumerable: true }, x),
   y: Object .assign ({ enumerable: true }, y),
   z: Object .assign ({ enumerable: true }, z),
   angle: Object .assign ({ enumerable: true }, angle),
});

X3DField .addStaticProperties (SFRotation, "SFRotation");

Object .defineProperties (SFRotation,
{
   IDENTITY:
   {
      value: SFRotation .fromValue (Rotation4 .IDENTITY),
      enumerable: true,
   },
   fromMatrix:
   {
      value (matrix)
      {
         const rotation = new this ();

         rotation .setMatrix (matrix);

         return rotation;
      },
   },
   fromQuaternion:
   {
      value (x, y, z, w)
      {
         const rotation = new this ();

         rotation .setQuaternion (+x, +y, +z, +w);

         return rotation;
      },
   },
});

export default SFRotation;
