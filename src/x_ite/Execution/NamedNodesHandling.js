export const getUniqueName = function (map, name = "")
{
   name = String (name);

   if (name && !map .has (name))
      return name;

   name = name .replace (/_\d+$/, "");

   if (name && !map .has (name))
      return name;

   let
      newName = "",
      lo      = 1,
      hi      = 1;

   do
   {
      lo   = hi;
      hi <<= 1;

      newName = `${name}_${lo}`;
   }
   while (map .has (newName));

   lo >>>= 1;
   hi >>>= 1;

   if (lo && hi)
   {
      while (lo < hi)
      {
         const m = (lo + hi) >>> 1;

         if (map .has (`${name}_${m}`))
            lo = m + 1;
         else
            hi = m;
      }

      newName = `${name}_${lo}`;
   }

   return newName;
};
