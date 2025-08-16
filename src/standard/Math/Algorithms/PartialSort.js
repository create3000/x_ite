const shrinkFactor = 1 - Math .exp (-Math .PHI); // 0.801711847137793

function PartialSort (array, compare)
{
   this .array = array;

   if (compare)
      this .compare = compare;
}

Object .assign (PartialSort .prototype,
{
   compare (lhs, rhs)
   {
      return lhs < rhs;
   },
   sort (first, last)
   {
      if (last - first > 1)
         this .partialsort (first, last);
   },
   partialsort (lo, hi)
   {
      const { array, compare } = this;

      let gap = this .last, i, last;

      if (gap > 1)
         gap = Math .floor (gap * shrinkFactor);

      for (i = 0, last = this .last - gap; i < last; ++ i)
      {
         const j = i + gap;

         if (compare (array [j], array [i]))
         {
            const t = array [i];
            array [i] = array [j];
            array [j] = t;
         }
      }
   },
});

export default PartialSort;
