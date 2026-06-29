import X3DField   from "../Base/X3DField.js";
import SFMatrix3  from "./SFMatrix3.js";
import Quaternion from "../../standard/Math/Numbers/Quaternion.js";

const { SFMatrix3f } = SFMatrix3;

function SFQuaternion (x = 0, y = 0, z = 0, w = 0)
{
   X3DField .call (this, new Quaternion (+x, +y, +z, +w));
}

Object .assign (Object .setPrototypeOf (SFQuaternion .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return SFQuaternion .fromValue (this .getValue () .copy ());
   },
   equals (quaternion)
   {
      return this .getValue () .equals (quaternion .getValue ());
   },
   isDefaultValue ()
   {
      return this .getValue () .equals (Quaternion .ZERO);
   },
   set (value)
   {
      this .getValue () .assign (value);
   },
   add (quaternion)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .add (quaternion .getValue ()));
   },
   conjugate ()
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .conjugate ());
   },
   divide (value)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .divide (+value));
   },
   dot (quaternion)
   {
      return this .getValue () .dot (quaternion);
   },
   getMatrix ()
   {
      return SFMatrix3f .fromValue (this .getValue () .getMatrix ());
   },
   inverse ()
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .inverse ());
   },
   length ()
   {
      return this .getValue () .norm ();
   },
   multiply (value)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .multiply (+value));
   },
   multLeft (quaternion)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .multLeft (quaternion .getValue ()));
   },
   multQuatVec (vector)
   {
      return vector .constructor .fromValue (this .getValue () .multQuatVec (vector .getValue () .copy ()));
   },
   multRight (quaternion)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .multRight (quaternion .getValue ()));
   },
   multVecQuat (vector)
   {
      return vector .constructor .fromValue (this .getValue () .multVecQuat (vector .getValue () .copy ()));
   },
   negate ()
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .negate ());
   },
   normalize ()
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .normalize ());
   },
   setMatrix (matrix)
   {
      this .getValue () .setMatrix (matrix .getValue ());
      this .addEvent ();
   },
   slerp (quaternion, t)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .slerp (quaternion .getValue (), +t));
   },
   subtract (quaternion)
   {
      return SFQuaternion .fromValue (this .getValue () .copy () .subtract (quaternion .getValue ()));
   },
   toStream (generator)
   {
      const { x, y, z, w } = this .getValue ();

      generator .string += generator .DoubleFormat (x);
      generator .Space ();
      generator .string += generator .DoubleFormat (y);
      generator .Space ();
      generator .string += generator .DoubleFormat (z);
      generator .Space ();
      generator .string += generator .DoubleFormat (w);
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
      const { x, y, z, w } = this .getValue ();

      generator .string += generator .Number (generator .DoubleFormat (x));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (y));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (z));
      generator .string += ',';
      generator .TidySpace ();
      generator .string += generator .Number (generator .DoubleFormat (w));
   },
});

for (const key of Object .keys (SFQuaternion .prototype))
   Object .defineProperty (SFQuaternion .prototype, key, { enumerable: false });

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

const w = {
   get ()
   {
      return this .getValue () .w;
   },
   set (value)
   {
      this .getValue () .w = +value;
      this .addEvent ();
   },
};

Object .defineProperties (SFQuaternion .prototype,
{
   0: x,
   1: y,
   2: z,
   3: w,
   x: Object .assign ({ enumerable: true }, x),
   y: Object .assign ({ enumerable: true }, y),
   z: Object .assign ({ enumerable: true }, z),
   w: Object .assign ({ enumerable: true }, w),
});

X3DField .addStaticProperties (SFQuaternion, "SFQuaternion");

Object .defineProperties (SFQuaternion,
{
   ZERO:
   {
      value: SFQuaternion .fromValue (Quaternion .ZERO),
      enumerable: true,
   },
   IDENTITY:
   {
      value: SFQuaternion .fromValue (Quaternion .IDENTITY),
      enumerable: true,
   },
   fromMatrix:
   {
      value (matrix)
      {
         const quaternion = new this ();

         quaternion .setMatrix (matrix);

         return quaternion;
      },
   },
});

export default SFQuaternion;
