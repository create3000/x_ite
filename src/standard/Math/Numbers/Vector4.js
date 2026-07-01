import Algorithm from "../Algorithm.js";

function Vector4 (x = 0, y = x, z = y, w = z)
{
   this .x = x;
   this .y = y;
   this .z = z;
   this .w = w;
}

Object .assign (Vector4 .prototype,
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
      const copy = Object .create (Vector4 .prototype);
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
   set (x = 0, y = x, z = y, w = z)
   {
      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
      return this;
   },
   equals ({ x, y, z, w })
   {
      return this .x === x &&
             this .y === y &&
             this .z === z &&
             this .w === w;
   },
   abs ()
   {
      const { x, y, z, w } = this;

      this .x = Math .abs (x);
      this .y = Math .abs (y);
      this .z = Math .abs (z);
      this .w = Math .abs (w);
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
   clamp  ({ x: minX, y: minY, z: minZ, w: minW }, { x: maxX, y: maxY, z: maxZ, w: maxW })
   {
      this .x = Algorithm .clamp (this .x, minX, maxX);
      this .y = Algorithm .clamp (this .y, minY, maxY);
      this .z = Algorithm .clamp (this .z, minZ, maxZ);
      this .w = Algorithm .clamp (this .w, minW, maxW);
      return this;
   },
   distance ({ x, y, z, w })
   {
      return Math .hypot (this .x - x,
                          this .y - y,
                          this .z - z,
                          this .w - w);
   },
   divide (value)
   {
      this .x /= value;
      this .y /= value;
      this .z /= value;
      this .w /= value;
      return this;
   },
   divVec ({ x, y, z, w })
   {
      this .x /= x;
      this .y /= y;
      this .z /= z;
      this .w /= w;
      return this;
   },
   dot ({ x, y, z, w })
   {
      return this .x * x +
             this .y * y +
             this .z * z +
             this .w * w;
   },
   inverse ()
   {
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      this .z = 1 / this .z;
      this .w = 1 / this .w;
      return this;
   },
   lerp (vector, t)
   {
      this .x += t * (vector .x - this .x);
      this .y += t * (vector .y - this .y);
      this .z += t * (vector .z - this .z);
      this .w += t * (vector .w - this .w);
      return this;
   },
   max (vector)
   {
      this .x = Math .max (this .x, vector .x);
      this .y = Math .max (this .y, vector .y);
      this .z = Math .max (this .z, vector .z);
      this .w = Math .max (this .w, vector .w);
      return this;
   },
   min (vector)
   {
      this .x = Math .min (this .x, vector .x);
      this .y = Math .min (this .y, vector .y);
      this .z = Math .min (this .z, vector .z);
      this .w = Math .min (this .w, vector .w);
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
   multVec ({ x, y, z, w })
   {
      this .x *= x;
      this .y *= y;
      this .z *= z;
      this .w *= w;
      return this;
   },
   negate ()
   {
      this .x = -this .x;
      this .y = -this .y;
      this .z = -this .z;
      this .w = -this .w;
      return this;
   },
   norm ()
   {
      return Math .hypot (this .x, this .y, this .z, this .w);
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
   reflect (normal)
   {
      const d = 2 * normal .dot (this);

      this .x -= normal .x * d;
      this .y -= normal .y * d;
      this .z -= normal .z * d;
      this .w -= normal .w * d;

      return this;
   },
   squaredNorm ()
   {
      const { x, y, z, w } = this;

      return x * x +
             y * y +
             z * z +
             w * w;
   },
   subtract ({ x, y, z, w })
   {
      this .x -= x;
      this .y -= y;
      this .z -= z;
      this .w -= w;
      return this;
   },
   toString ()
   {
      return this .x + " " +
             this .y + " " +
             this .z + " " +
             this .w;
   },
});

for (const key of Object .keys (Vector4 .prototype))
   Object .defineProperty (Vector4 .prototype, key, { enumerable: false });

Object .defineProperties (Vector4 .prototype,
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
});

Object .assign (Vector4,
{
   ZERO: Object .freeze (new Vector4 ()),
   // Positive values
   ONE: Object .freeze (new Vector4 (1)),
   X_AXIS: Object .freeze (new Vector4 (1, 0, 0, 0)),
   Y_AXIS: Object .freeze (new Vector4 (0, 1, 0, 0)),
   Z_AXIS: Object .freeze (new Vector4 (0, 0, 1, 0)),
   W_AXIS: Object .freeze (new Vector4 (0, 0, 0, 1)),
   // Negative values
   NEGATIVE_ONE: Object .freeze (new Vector4 (-1)),
   NEGATIVE_X_AXIS: Object .freeze (new Vector4 (-1, 0, 0, 0)),
   NEGATIVE_Y_AXIS: Object .freeze (new Vector4 (0, -1, 0, 0)),
   NEGATIVE_Z_AXIS: Object .freeze (new Vector4 (0, 0, -1, 0)),
   NEGATIVE_W_AXIS: Object .freeze (new Vector4 (0, 0, 0, -1)),
});

export default Vector4;
