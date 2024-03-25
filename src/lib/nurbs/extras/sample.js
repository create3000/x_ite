var tmp1 = [ ];

export default function (mesh, surface, opts)
{
   mesh = mesh || { };
   opts = opts || { };

   var
      points      = mesh .points = mesh .points || [ ],
      faces       = mesh .faces  = mesh .faces  || [ ],
      haveWeights = opts .haveWeights;

   var dimension = surface .dimension - haveWeights;

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
         var
            nu         = resolution [0],
            uClosed    = surface .boundary [0] === "closed",
            nuBound    = nu + ! uClosed,
            nbVertices = nuBound * dimension,
            domain     = opts .domain || surface .domain,
            uDomain    = domain [0],
            uDistance  = uDomain [1] - uDomain [0];

         for (var i = 0; i < nuBound; ++ i)
         {
            var
               u   = uDomain [0] + uDistance * i / nu,
               ptr = i * dimension;

            surface .evaluate (tmp1, u);

            if (haveWeights)
            {
               var w = tmp1 [dimension];

               for (var d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d] / w;
            }
            else
            {
               for (var d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d];
            }
         }

         points .length = nbVertices;
         break;
      }
      case 2:
      {
         var
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

         for (var i = 0; i < nuBound; ++ i)
         {
            var u = uDomain [0] + uDistance * i / nu;

            for (var j = 0; j < nvBound; ++ j)
            {
               var
                  v   = vDomain [0] + vDistance * j / nv,
                  ptr = (i + nuBound * j) * dimension;

               surface .evaluate (tmp1, u, v);

               if (haveWeights)
               {
                  var w = tmp1 [dimension];

                  for (var d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d] / w;
               }
               else
               {
                  for (var d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d];
               }
            }
         }

         points .length = nbVertices;

         // Generate faces.

         var
            uClosed = opts .closed [0],
            vClosed = opts .closed [1];

         var c = 0;

         for (var i = 0; i < nu; ++ i)
         {
           var
               i0 = i,
               i1 = i + 1;

            if (uClosed)
               i1 = i1 % nu;

            for (var j = 0; j < nv; ++ j)
            {
               var j0 = j;
               var j1 = j + 1;

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

         /*
         // Trimming Contours

         if (opts .trimmingContours)
         {
            var holes = [ ];

            var trimmingContours = opts .trimmingContours;

            for (var t = 0, iLength = trimmingContours .length; t < iLength; ++ t)
            {
               var
                  trimmingContour = trimmingContours [t],
                  hole            = [ ];

               for (var p = 0, pLength = trimmingContour .length; p < pLength; ++ p)
               {
                  var point = trimmingContour [p];

                  surface .evaluate (tmp1, point .x, point .y);

                  for (var d = 0; d < dimension; ++ d)
                     points .push (tmp1 [d]);

                  var vertex = new Vector3 (tmp1 [0], tmp1 [1], tmp1 [2]);

                  vertex .index = c ++;

                  hole .push (vertex);
               }

               holes .push (hole);
            }

            var
               contours  = [ ],
               triangles = [ ],
               trimmed   = [ ];

            for (var v = 0, fLength = faces .length; v < fLength; v += 3)
            {
               contours  .length = 0;
               triangles .length = 0;

               var
                  index1 = faces [v]     * 3,
                  index2 = faces [v + 1] * 3,
                  index3 = faces [v + 2] * 3;

               var
                  vertex1 = new Vector3 (points [index1], points [index1 + 1], points [index1 + 2]),
                  vertex2 = new Vector3 (points [index2], points [index2 + 1], points [index2 + 2]),
                  vertex3 = new Vector3 (points [index3], points [index3 + 1], points [index3 + 2]);

               vertex1 .index = v;
               vertex2 .index = v + 1;
               vertex3 .index = v + 2;

               contours .push ([ vertex1, vertex2, vertex3 ], ... holes);

               Triangle3 .triangulatePolygon (contours, triangles);

               for (var t = 0, tLength = triangles .length; t < tLength; ++ t)
                  trimmed .push (triangles [t] .index);
            }

            mesh .faces = trimmed;
         }
         */

         break;
      }
      default:
         throw new Error("Can only sample contours and surfaces");
   }

   return mesh;
};
