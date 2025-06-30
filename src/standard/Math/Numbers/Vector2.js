import Algorithm from "../Algorithm.js";

function Vector2 (x = 0, y = x)
{
   this .x = x;
   this .y = y;
}

Object .assign (Vector2 .prototype,
{
   *[Symbol .iterator] ()
   {
      yield this .x;
      yield this .y;
   },
   copy ()
   {
      const copy = Object .create (Vector2 .prototype);
      copy .x = this .x;
      copy .y = this .y;
      return copy;
   },
   assign ({ x, y })
   {
      this .x = x;
      this .y = y;
      return this;
   },
   set (x = 0, y = x)
   {
      this .x = x;
      this .y = y;
      return this;
   },
   equals ({ x, y })
   {
      return this .x === x &&
             this .y === y;
   },
   negate ()
   {
      this .x = -this .x;
      this .y = -this .y;
      return this;
   },
   inverse ()
   {
      this .x = 1 / this .x;
      this .y = 1 / this .y;
      return this;
   },
   add ({ x, y })
   {
      this .x += x;
      this .y += y;
      return this;
   },
   subtract ({ x, y })
   {
      this .x -= x;
      this .y -= y;
      return this;
   },
   multiply (value)
   {
      this .x *= value;
      this .y *= value;
      return this;
   },
   multVec ({ x, y })
   {
      this .x *= x;
      this .y *= y;
      return this;
   },
   divide (value)
   {
      this .x /= value;
      this .y /= value;
      return this;
   },
   divVec ({ x, y })
   {
      this .x /= x;
      this .y /= y;
      return this;
   },
   normalize ()
   {
      const length = Math .hypot (this .x, this .y);

      if (length)
      {
         this .x /= length;
         this .y /= length;
      }

      return this;
   },
   dot ({ x, y })
   {
      return this .x * x +
             this .y * y;
   },
   norm ()
   {
      const { x, y } = this;

      return x * x +
             y * y;
   },
   magnitude ()
   {
      return Math .hypot (this .x, this .y);
   },
   distance ({ x, y })
   {
      return Math .hypot (this .x - x,
                          this .y - y);
   },
   lerp ({ x: dX, y: dY }, t)
   {
      const { x, y } = this;

      this .x = x + t * (dX - x);
      this .y = y + t * (dY - y);
      return this;
   },
   abs ()
   {
      const { x, y } = this;

      this .x = Math .abs (x);
      this .y = Math .abs (y);
      return this;
   },
   min (vector)
   {
      let { x, y } = this;

      for (const { x: minX, y: minY } of arguments)
      {
         x = Math .min (x, minX);
         y = Math .min (y, minY);
      }

      this .x = x;
      this .y = y;
      return this;
   },
   max (vector)
   {
      let { x, y } = this;

      for (const { x: maxX, y: maxY } of arguments)
      {
         x = Math .max (x, maxX);
         y = Math .max (y, maxY);
      }

      this .x = x;
      this .y = y;
      return this;
   },
   clamp ({ x: minX, y: minY }, { x: maxX, y: maxY })
   {
      this .x = Algorithm .clamp (this .x, minX, maxX);
      this .y = Algorithm .clamp (this .y, minY, maxY);
      return this;
   },
   toString ()
   {
      return this .x + " " +
             this .y;
   }
});

for (const key of Object .keys (Vector2 .prototype))
   Object .defineProperty (Vector2 .prototype, key, { enumerable: false });

Object .defineProperties (Vector2 .prototype,
{
   length: { value: 2 },
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
});

Object .assign (Vector2,
{
   Zero: Object .freeze (new Vector2 ()),
   One: Object .freeze (new Vector2 (1)),
   xAxis: Object .freeze (new Vector2 (1, 0)),
   yAxis: Object .freeze (new Vector2 (0, 1)),
});

export default Vector2;
