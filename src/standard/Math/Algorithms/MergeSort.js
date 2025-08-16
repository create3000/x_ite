function MergeSort (array, compare)
{
   this .array     = array;
   this .auxiliary = [ ];

   if (compare)
      this .compare = compare;
}

Object .assign (MergeSort .prototype,
{
   compare (lhs, rhs)
   {
      return lhs < rhs;
   },
   sort (first, last)
   {
      this .mergeSort (first, last - 1);
   },
   mergeSort (lo, hi)
   {
      if (lo < hi)
      {
         const m = (lo + hi) >>> 1;
         this .mergeSort (lo, m);   // Recursion
         this .mergeSort (m + 1, hi); // Recursion
         this .merge (lo, m, hi);
      }
   },
   merge (lo, m, hi)
   {
      const { array, auxiliary, compare } = this;

      let i, j, k;

      i = 0, j = lo;
      // Copy first half of array a to auxiliary array b.
      while (j <= m)
         auxiliary [i++] = array [j++];

      i = 0; k = lo;
      // Copy back next-greatest element at each time.
      while (k < j && j <= hi)
      {
         if (compare (array [j], auxiliary [i]))
            array [k++] = array [j++];
         else
            array [k++] = auxiliary [i++];
      }

      // Copy back remaining elements of first half (if any).
      while (k < j)
         array [k++] = auxiliary [i++];
   }
});

export default MergeSort;
