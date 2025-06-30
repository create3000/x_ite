class Lock
{
   static #promises = new Map ();

   static acquire (key, callback)
   {
      if (!this .#promises .has (key))
         this .#promises .set (key, [ ]);

      const
         promises = this .#promises .get (key),
         current  = promises .slice ();

      const p = new Promise (async (resolve, reject) =>
      {
         try
         {
            await Promise .allSettled (current);

            resolve (await callback ());
         }
         catch (error)
         {
            reject (error);
         }
      })
      .finally (() =>
      {
         promises .splice (promises .indexOf (p), 1);

         if (!promises .length)
            this .#promises .delete (key);
      });

      promises .push (p);

      return p;
   }
};

export default Lock;
