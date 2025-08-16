import Vector3 from "../Numbers/Vector3.js";

const Camera =
{
   frustum (l, r, b, t, n, f, matrix)
   {
      const
         r_l = r - l,
         t_b = t - b,
         f_n = f - n,
         n_2 = 2 * n,

         A = (r + l) / r_l,
         B = (t + b) / t_b,
         C = -(f + n) / f_n,
         D = -(n_2 * f) / f_n,
         E = n_2 / r_l,
         F = n_2 / t_b;

      return matrix .set (E, 0, 0, 0,
                          0, F, 0, 0,
                          A, B, C, -1,
                          0, 0, D, 0);
   },
   perspective (fieldOfView, zNear, zFar, width, height, matrix)
   {
      const ratio = Math .tan (fieldOfView / 2) * zNear;

      if (width > height)
      {
         const aspect = width * ratio / height;
         return this .frustum (-aspect, aspect, -ratio, ratio, zNear, zFar, matrix);
      }
      else
      {
         const aspect = height * ratio / width;
         return this .frustum (-ratio, ratio, -aspect, aspect, zNear, zFar, matrix);
      }
   },
   perspective2 (fieldOfView, zNear, zFar, width, height, matrix)
   {
      const ratio = Math .tan (fieldOfView / 2) * zNear;

      return this .frustum (-ratio, ratio, -ratio, ratio, zNear, zFar, matrix);
   },
   ortho (l, r, b, t, n, f, matrix)
   {
      const
         r_l = r - l,
         t_b = t - b,
         f_n = f - n,

         A =  2 / r_l,
         B =  2 / t_b,
         C = -2 / f_n,
         D = -(r + l) / r_l,
         E = -(t + b) / t_b,
         F = -(f + n) / f_n;

      return matrix .set (A, 0, 0, 0,
                          0, B, 0, 0,
                          0, 0, C, 0,
                          D, E, F, 1);
   },
   orthoBox: (() =>
   {
      const
         min = new Vector3 (),
         max = new Vector3 ();

      return function (box, matrix)
      {
         box .getExtents (min, max);

         return this .ortho (min .x, max .x, min .y, max .y, -max .z, -min .z, matrix);
      };
   })(),
};

export default Camera;
