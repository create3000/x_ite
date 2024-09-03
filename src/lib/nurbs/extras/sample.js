const tmp1 = [ ];

export default function (mesh, surface, opts)
{
   mesh = mesh || { };
   opts = opts || { };

   const
      points      = mesh .points = mesh .points || [ ],
      faces       = mesh .faces  = mesh .faces  || [ ],
      haveWeights = opts .haveWeights,
      dimension   = surface .dimension - haveWeights;

   if (Array .isArray (opts .resolution))
   {
      var resolution = opts .resolution;
   }
   else
   {
      var
         res        = opts .resolution === undefined ? 31 : opts .resolution,
         resolution = new Array (surface .splineDimension) .fill (res);
   }

   switch (surface .splineDimension)
   {
      case 1:
      {
         const
            nu         = resolution [0],
            uClosed    = surface .boundary [0] === "closed",
            nuBound    = nu + ! uClosed,
            nbVertices = nuBound * dimension,
            domain     = opts .domain || surface .domain,
            uDomain    = domain [0],
            uDistance  = uDomain [1] - uDomain [0];

         for (let i = 0; i < nuBound; ++ i)
         {
            const
               u   = uDomain [0] + uDistance * i / nu,
               ptr = i * dimension;

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
            uClosed    = surface .boundary [0] === "closed",
            vClosed    = surface .boundary [1] === "closed",
            nuBound    = nu + ! uClosed,
            nvBound    = nv + ! vClosed,
            nbVertices = nuBound * nvBound * dimension,
            domain     = opts .domain || surface .domain,
            uDomain    = domain [0],
            vDomain    = domain [1],
            uDistance  = uDomain [1] - uDomain [0],
            vDistance  = vDomain [1] - vDomain [0];

         // Generate points.

         for (let i = 0; i < nuBound; ++ i)
         {
            const u = uDomain [0] + uDistance * i / nu;

            for (let j = 0; j < nvBound; ++ j)
            {
               const
                  v   = vDomain [0] + vDistance * j / nv,
                  ptr = (i + nuBound * j) * dimension;

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

         let c = 0;

         for (let i = 0; i < nu; ++ i)
         {
            const i0 = i;
            let i1 = i + 1;

            if (uClosed)
               i1 = i1 % nu;

            for (let j = 0; j < nv; ++ j)
            {
               const j0 = j;
               let j1 = j + 1;

               if (vClosed)
                  j1 = j1 % nv;

               // Triangle 1

               faces [c ++] = i0 + nuBound * j0; // 1
               faces [c ++] = i1 + nuBound * j0; // 2
               faces [c ++] = i1 + nuBound * j1; // 3

               // Triangle 2

               faces [c ++] = i0 + nuBound * j0; // 1
               faces [c ++] = i1 + nuBound * j1; // 3
               faces [c ++] = i0 + nuBound * j1; // 4
            }
         }

         faces .length = c;

         break;
      }
      default:
         throw new Error("Can only sample contours and surfaces");
   }

   return mesh;
};
