function VertexArray (gl)
{
   this .gl           = gl;
   this .vertexArrays = new Map ();
}

Object .assign (VertexArray .prototype,
{
   update (value = true)
   {
      if (value)
         this .dispose ();

      return this;
   },
   enable (program)
   {
      const { gl, vertexArrays } = this;

      const vertexArray = vertexArrays .get (program);

      if (vertexArray)
      {
         gl .bindVertexArray (vertexArray);

         return false;
      }
      else
      {
         // Memory leak prevention when shaders are reloaded. There should normally be no more than maybe 10 VAOs, except when shaders are often reloaded.
         if (vertexArrays .size > 100)
            this .dispose ();

         const vertexArray = gl .createVertexArray ();

         vertexArrays .set (program, vertexArray)

         gl .bindVertexArray (vertexArray);

         // console .log ("rebuild vao");

         return true; // Rebuild
      }
   },
   dispose ()
   {
      const { gl, vertexArrays } = this;

      for (const vertexArray of vertexArrays .values ())
         gl .deleteVertexArray (vertexArray);

      vertexArrays .clear ();
   },
});

export default VertexArray;
