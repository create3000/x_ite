function QuickSort (array, compare)
{
   this .array = array;

   if (compare)
      this .compare = compare;
}

Object .assign (QuickSort .prototype,
{
   compare (lhs, rhs)
   {
      return lhs < rhs;
   },
   sort (first, last)
   {
      if (last - first > 1)
         this .quicksort (first, last - 1);
   },
   quicksort (lo, hi)
   {
      let
         i = lo,
         j = hi;

      const { array, compare } = this;

      // Vergleichs­element x
      const x = array [(lo + hi) >>> 1];

      for (;;)
      {
         while (compare (array [i], x)) ++ i;
         while (compare (x, array [j])) -- j;

         if (i < j)
         {
            // Exchange

            const t = array [i];
            array [i] = array [j];
            array [j] = t;

            i ++; j --;
         }
         else
         {
            if (i === j) ++ i, -- j;
            break;
         }
      }

      // Rekursion
      if (lo < j) this .quicksort (lo, j);
      if (i < hi) this .quicksort (i, hi);
   },
});

export default QuickSort;
