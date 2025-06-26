function shuffle (array)
{
   let i = array .length;

   while (i > 1)
   {
      const
         a = -- i,
         b = Math .floor (Math .random () * a),
         t = array [a];

      array [a] = array [b];
      array [b] = t;
   }

   return array;
}

export default shuffle;
