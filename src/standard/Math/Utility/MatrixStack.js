class MatrixStack extends Array
{
   #top = 0;

   constructor (Type)
   {
      super ();

      this .push (new Type ());
   }

   set (matrix)
   {
      this [this .#top] .assign (matrix);
   }

   get ()
   {
      return this [this .#top];
   }

   push (matrix = this [this .#top])
   {
      const top = ++ this .#top;

      if (top < this .length)
         this [top] .assign (matrix);
      else
         this [top] = matrix .copy ();
   }

   pop ()
   {
      -- this .#top;
   }

   clear ()
   {
      this .#top = 0;
   }

   size ()
   {
      return this .#top + 1;
   }

   identity ()
   {
      this [this .#top] .identity ();
   }

   inverse ()
   {
      this [this .#top] .inverse ();
   }

   multRight (matrix)
   {
      this [this .#top] .multRight (matrix);
   }

   multLeft (matrix)
   {
      this [this .#top] .multLeft (matrix);
   }

   translate (vector)
   {
      this [this .#top] .translate (vector);
   }

   rotate (rotation)
   {
      this [this .#top] .rotate (rotation);
   }

   scale (vector)
   {
      this [this .#top] .scale (vector);
   }
}

export default MatrixStack;
