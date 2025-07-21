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
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      this .z = 1 / this .z;
      this .w = 1 / this .w;
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
   multVec ({ x, y, z, w })
   {
      this .x *= x;
      this .y *= y;
      this .z *= z;
      this .w *= w;
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
   divVec ({ x, y, z, w })
   {
      this .x /= x;
      this .y /= y;
      this .z /= z;
      this .w /= w;
      return this;
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
   dot ({ x, y, z, w })
   {
      return this .x * x +
             this .y * y +
             this .z * z +
             this .w * w;
   },
   squaredNorm ()
   {
      const { x, y, z, w } = this;

      return x * x +
             y * y +
             z * z +
             w * w;
   },
   norm ()
   {
      return Math .hypot (this .x, this .y, this .z, this .w);
   },
   distance ({ x, y, z, w })
   {
      return Math .hypot (this .x - x,
                          this .y - y,
                          this .z - z,
                          this .w - w);
   },
   lerp ({ x: dX, y: dY, z: dZ, w: dW }, t)
   {
      const { x, y, z, w } = this;

      this .x = x + t * (dX - x);
      this .y = y + t * (dY - y);
      this .z = z + t * (dZ - z);
      this .w = w + t * (dW - w);
      return this;
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
   min (vector)
   {
      let { x, y, z, w } = this;

      for (const { x: minX, y: minY, z: minZ, w: minW } of arguments)
      {
         x = Math .min (x, minX);
         y = Math .min (y, minY);
         z = Math .min (z, minZ);
         w = Math .min (w, minW);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
      return this;
   },
   max (vector)
   {
      let { x, y, z, w } = this;

      for (const { x: maxX, y: maxY, z: maxZ, w: maxW } of arguments)
      {
         x = Math .max (x, maxX);
         y = Math .max (y, maxY);
         z = Math .max (z, maxZ);
         w = Math .max (w, maxW);
      }

      this .x = x;
      this .y = y;
      this .z = z;
      this .w = w;
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
   Zero: Object .freeze (new Vector4 ()),
   One: Object .freeze (new Vector4 (1)),
   xAxis: Object .freeze (new Vector4 (1, 0, 0, 0)),
   yAxis: Object .freeze (new Vector4 (0, 1, 0, 0)),
   zAxis: Object .freeze (new Vector4 (0, 0, 1, 0)),
   wAxis: Object .freeze (new Vector4 (0, 0, 0, 1)),
});

export default Vector4;
