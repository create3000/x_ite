
export default function ndloop (n, callback)
{
   let m = 1, i = [ ];

   for (let k = 0; k < n .length; ++ k)
   {
      m    *= Array .isArray (n [k]) ? (n [k] [1] - n [k] [0]) : n [k];
      i [k] = Array .isArray (n [k]) ? n [k] [0] : 0;
   }

   for (let ptr = 0; ptr < m; ++ ptr)
   {
      callback (i .slice ());

      for (let k = n .length - 1; k >= 0; -- k)
      {
         if (i [k] === (Array .isArray (n [k]) ? n [k] [1] : n [k]) - 1)
         {
            i [k] = Array .isArray (n [k]) ? n [k] [0] : 0;
         }
         else
         {
            ++ i [k];
            break;
         }
      }
   }
};
