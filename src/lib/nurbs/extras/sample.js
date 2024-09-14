const
   tmp1        = [ ],
   pointIndex  = new Map (),
   borderIndex = new Map ();

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

         // Combine border points if equal.

         uBorder (0,  nuBound, nvBound, dimension, points, pointIndex, borderIndex);
         uBorder (nu, nuBound, nvBound, dimension, points, pointIndex, borderIndex);

         vBorder (0,  nuBound, nvBound, dimension, points, pointIndex, borderIndex);
         vBorder (nv, nuBound, nvBound, dimension, points, pointIndex, borderIndex);

         // Generate faces.

         let f = 0;

         for (let v0 = 0; v0 < nv; ++ v0)
         {
            const v1 = vClosed ? (v0 + 1) % nv : v0 + 1;

            for (let u0 = 0; u0 < nu; ++ u0)
            {
               const u1 = uClosed ? (u0 + 1) % nu : u0 + 1;

               // Triangle 1
               //     2
               //    /|
               //   / |
               //  /__|
               // 0   1

               const
                  a0 = u0 + nuBound * v0, // 1
                  a1 = u1 + nuBound * v0, // 2
                  a2 = u1 + nuBound * v1; // 3

               faces [f ++] = borderIndex .get (a0) ?? a0; // 1
               faces [f ++] = borderIndex .get (a1) ?? a1; // 2
               faces [f ++] = borderIndex .get (a2) ?? a2; // 3

               // Triangle 2
               // 2   1
               // |--/
               // | /
               // |/
               // 0

               const
                  b0 = u0 + nuBound * v0, // 1
                  b1 = u1 + nuBound * v1, // 3
                  b2 = u0 + nuBound * v1; // 4

               faces [f ++] = borderIndex .get (b0) ?? b0; // 1
               faces [f ++] = borderIndex .get (b1) ?? b1; // 3
               faces [f ++] = borderIndex .get (b2) ?? b2; // 4
            }
         }

         faces .length = f;

         pointIndex  .clear ();
         borderIndex .clear ();

         break;
      }
      default:
         throw new Error ("Can only sample contours and surfaces.");
   }

   return mesh;
}

function uBorder (u0, nuBound, nvBound, dimension, points, pointIndex, borderIndex)
{
   for (let v0 = 0; v0 < nvBound; ++ v0)
   {
      const i = u0 + nuBound * v0;

      uvBorder (i, dimension, points, pointIndex, borderIndex);
   }
}

function vBorder (v0, nuBound, nvBound, dimension, points, pointIndex, borderIndex)
{
   for (let u0 = 0; u0 < nuBound; ++ u0)
   {
      const i = u0 + nuBound * v0;

      uvBorder (i, dimension, points, pointIndex, borderIndex);
   }
}

function uvBorder (i, dimension, points, pointIndex, borderIndex)
{
   let s = "";

   for (let d = 0; d < dimension; ++ d)
   {
      s += points [i * dimension + d];
      s += ";";
   }

   if (pointIndex .has (s))
      borderIndex .set (i, pointIndex .get (s))
   else
      pointIndex .set (s, i);
}

export default sample;
