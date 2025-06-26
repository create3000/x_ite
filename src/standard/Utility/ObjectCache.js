function ObjectCache (Type)
{
   return Object .assign ([ ],
   {
      top: 0,
      pop ()
      {
         if (this .top !== 0)
            return this [-- this .top];

         return new Type ();
      },
      push (object)
      {
         this [this .top ++] = object;
      },
      clear ()
      {
         this .length = 0;
         this .top    = 0;
      },
   });
}

export default ObjectCache;
