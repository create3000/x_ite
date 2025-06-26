import Algorithm from "../Math/Algorithm.js";

const _value = Symbol ();

function BitSet (value = 0)
{
   this [_value] = value >>> 0;
}

Object .assign (BitSet .prototype,
{
   *[Symbol .iterator] ()
   {
      let
         value = this [_value],
         index = 0;

      while (value)
      {
         if (value & 1)
            yield index;

         value >>>= 1;
         ++ index;
      }
   },
   get (index)
   {
      const mask = 1 << index;

      return !! (this [_value] & mask);
   },
   set (index, value)
   {
      if (value)
         this .add (index);
      else
         this .remove (index);
   },
   add (index, mask = 1)
   {
      this [_value] |= mask << index;
      this [_value] >>>= 0;
   },
   remove (index, mask = 1)
   {
      this [_value] &= ~(mask << index);
      this [_value] >>>= 0;
   },
   clear ()
   {
      this [_value] = 0;
   },
   *entries ()
   {
      for (const i of this)
         yield [i, i];
   },
   valueOf ()
   {
      return this [_value];
   },
   toString (radix)
   {
      return this [_value] .toString (radix);
   },
});

BitSet .prototype .keys   = BitSet .prototype [Symbol .iterator];
BitSet .prototype .values = BitSet .prototype [Symbol .iterator];

Object .defineProperty (BitSet .prototype, "size",
{
   get ()
   {
      return Algorithm .bitCount (this [_value]);
   },
});

export default BitSet;
