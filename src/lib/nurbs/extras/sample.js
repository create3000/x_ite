const
   tmp1       = [ ],
   pointIndex = new Map (),
   seamIndex  = new Map ();

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

         // Combine seam points if equal.

         uSeam (0, nuBound, nvBound, dimension, points, pointIndex, seamIndex);
         vSeam (0, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         if (!uClosed)
            uSeam (nu, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         if (!vClosed)
            vSeam (nv, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         // Generate faces.

         let f = 0;

         for (let v0 = 0; v0 < nv; ++ v0)
         {
            const v1 = vClosed ? (v0 + 1) % nv : v0 + 1;

            for (let u0 = 0; u0 < nu; ++ u0)
            {
               const u1 = uClosed ? (u0 + 1) % nu : u0 + 1;

               let
                  p0 = u0 + nuBound * v0, // 0
                  p1 = u1 + nuBound * v0, // 1
                  p2 = u1 + nuBound * v1, // 2
                  p3 = u0 + nuBound * v1; // 3

               p0 = seamIndex .get (p0) ?? p0;
               p1 = seamIndex .get (p1) ?? p1;
               p2 = seamIndex .get (p2) ?? p2;
               p3 = seamIndex .get (p3) ?? p3;

               // Triangle 1
               //     2
               //    /|
               //   / |
               //  /__|
               // 0   1

               faces [f ++] = p0;
               faces [f ++] = p1;
               faces [f ++] = p2;

               // Triangle 2
               // 3   2
               // |--/
               // | /
               // |/
               // 0

               faces [f ++] = p0;
               faces [f ++] = p2;
               faces [f ++] = p3;
            }
         }

         faces .length = f;

         pointIndex .clear ();
         seamIndex  .clear ();

         break;
      }
      default:
         throw new Error ("Can only sample contours and surfaces.");
   }

   return mesh;
}

function uSeam (u0, nuBound, nvBound, dimension, points, pointIndex, seamIndex)
{
   for (let v0 = 0; v0 < nvBound; ++ v0)
   {
      const i = u0 + nuBound * v0;

      uvSeam (i, dimension, points, pointIndex, seamIndex);
   }
}

function vSeam (v0, nuBound, nvBound, dimension, points, pointIndex, seamIndex)
{
   for (let u0 = 0; u0 < nuBound; ++ u0)
   {
      const i = u0 + nuBound * v0;

      uvSeam (i, dimension, points, pointIndex, seamIndex);
   }
}

function uvSeam (i, dimension, points, pointIndex, seamIndex)
{
   let key = "";

   for (let d = 0; d < dimension; ++ d)
   {
      key += points [i * dimension + d];
      key += ";";
   }

   if (pointIndex .has (key))
      seamIndex .set (i, pointIndex .get (key))
   else
      pointIndex .set (key, i);
}

export default sample;
