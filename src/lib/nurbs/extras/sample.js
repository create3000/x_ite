const tmp1 = [ ] ;

function sample (mesh, surface, opts)
{
   const
      points      = mesh .points ??= [ ],
      faces       = mesh .faces  ??= [ ],
      haveWeights = opts .haveWeights,
      dimension   = surface .dimension - haveWeights,
      resolution  = opts .resolution;

   switch (surface .splineDimension)
   {
      case 1:
      {
         const
            nu         = resolution [0],
            nuBound    = nu + 1,
            nbVertices = nuBound * dimension,
            domain     = surface .domain,
            uDomain    = domain [0],
            uDistance  = uDomain [1] - uDomain [0],
            uClosed    = opts .closed;

         for (let iu = 0; iu < nuBound; ++ iu)
         {
            const
               u   = uDomain [0] + uDistance * (uClosed ? iu % nu : iu) / nu,
               ptr = iu * dimension;

            surface .evaluate (tmp1, u);

            if (haveWeights)
            {
               const w = tmp1 [dimension];

               for (let d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d] / w;
            }
            else
            {
               for (let d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d];
            }
         }

         points .length = nbVertices;
         break;
      }
      case 2:
      {
         const
            nu         = resolution [0],
            nv         = resolution [1],
            nuBound    = nu + 1,
            nvBound    = nv + 1,
            nbVertices = nuBound * nvBound * dimension,
            domain     = surface .domain,
            uDomain    = domain [0],
            vDomain    = domain [1],
            uDistance  = uDomain [1] - uDomain [0],
            vDistance  = vDomain [1] - vDomain [0],
            uClosed    = opts .closed [0],
            vClosed    = opts .closed [1];

         // Generate points.

         for (let iv = 0; iv < nvBound; ++ iv)
         {
            const v = vDomain [0] + vDistance * iv / nv;

            for (let iu = 0; iu < nuBound; ++ iu)
            {
               const
                  u   = uDomain [0] + uDistance * iu / nu,
                  ptr = (iu + nuBound * iv) * dimension;

               surface .evaluate (tmp1, u, v);

               if (haveWeights)
               {
                  const w = tmp1 [dimension];

                  for (let d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d] / w;
               }
               else
               {
                  for (let d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d];
               }
            }
         }

         points .length = nbVertices;

         // Generate faces.

         let f = 0;

         for (let iv = 0; iv < nv; ++ iv)
         {
            const
               v0 = iv,
               v1 = vClosed ? (iv + 1) % nv : iv + 1;

            for (let iu = 0; iu < nu; ++ iu)
            {
               const
                  u0 = iu,
                  u1 = uClosed ? (iu + 1) % nu : iu + 1;

               // Triangle 1

               faces [f ++] = u0 + nuBound * v0; // 1
               faces [f ++] = u1 + nuBound * v0; // 2
               faces [f ++] = u1 + nuBound * v1; // 3

               // Triangle 2

               faces [f ++] = u0 + nuBound * v0; // 1
               faces [f ++] = u1 + nuBound * v1; // 3
               faces [f ++] = u0 + nuBound * v1; // 4
            }
         }

         faces .length = f;

         break;
      }
      default:
         throw new Error ("Can only sample contours and surfaces.");
   }

   return mesh;
}

export default sample;
