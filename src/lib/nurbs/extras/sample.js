
define (function ()
{
'use strict';

	function normalize (out, a)
	{
		var
			x = a [0],
			y = a [1],
			z = a [2];

		var l = Math .sqrt (x * x + y * y + z * z);

		if (l > 0)
		{
			out [0] = a [0] / l;
			out [1] = a [1] / l;
			out [2] = a [2] / l;
		}

		return out
	}

	function cross (out, a, b)
	{
	    var
			ax = a [0], ay = a [1], az = a [2],
			bx = b [0], by = b [1], bz = b [2];

		out [0] = ay * bz - az * by
		out [1] = az * bx - ax * bz
		out [2] = ax * by - ay * bx

		return out
	}

	var
		tmp1 = [ ],
		tmp2 = [ ];

	return function (mesh, surface, opts)
	{
		mesh = mesh || { };
		opts = opts || { };

		var
			points  = mesh .points  = mesh .points  || [ ],
			normals = mesh .normals = mesh .normals || [ ],
			faces   = mesh .faces   = mesh .faces   || [ ];

		var dimension = surface .dimension;

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

		var generateNormals = dimension === 3 && (opts .generateNormals !== undefined ? opts .generateNormals : true);

		switch (surface .splineDimension)
		{
			case 1:
			{
				var
					nu         = resolution [0],
					uClosed    = surface .boundary [0] === 'closed',
					nuBound    = nu + ! uClosed,
					nbVertices = nuBound * dimension,
					uDer       = surface .evaluator ([1, 0]),
					domain     = opts .domain || surface .domain,
					uDomain    = domain [0],
					uDistance  = uDomain [1] - uDomain [0];

				for (var i = 0; i < nuBound; ++ i)
				{
					var
						u   = uDomain [0] + uDistance * i / nu,
						ptr = i * dimension;

					surface .evaluate (tmp1, u);

					for (var d = 0; d < dimension; ++ d)
						points [ptr + d] = tmp1 [d];
				}

				points .length = nbVertices;
				break;
			}
			case 2:
			{
				var
					nu         = resolution [0],
					nv         = resolution [1],
					uClosed    = surface .boundary [0] === 'closed',
					vClosed    = surface .boundary [1] === 'closed',
					nuBound    = nu + ! uClosed,
					nvBound    = nv + ! vClosed,
					nbNormals  = nuBound * nvBound * 3 * generateNormals,
					nbVertices = nuBound * nvBound * dimension,
					uDer       = surface .evaluator ([1, 0]),
					vDer       = surface .evaluator ([0, 1]),
					domain     = opts .domain || surface .domain,
					uDomain    = domain [0],
					vDomain    = domain [1],
					uDistance  = uDomain [1] - uDomain [0],
					vDistance  = vDomain [1] - vDomain [0];

				// Generate points and normals.

				for (var i = 0; i < nuBound; ++ i)
				{
					var u = uDomain [0] + uDistance * i / nu;

					for (var j = 0; j < nvBound; ++ j)
					{
						var
							v   = vDomain [0] + vDistance * j / nv,
							ptr = (i + nuBound * j) * dimension;

						surface .evaluate (tmp1, u, v);

						for (var d = 0; d < dimension; ++ d)
							points [ptr + d] = tmp1 [d];

						if (generateNormals)
						{
							normalize (tmp1, cross (tmp1,
								uDer (tmp1, u, v),
								vDer (tmp2, u, v)
							));

							normals [ptr]     = tmp1 [0];
							normals [ptr + 1] = tmp1 [1];
							normals [ptr + 2] = tmp1 [2];
						}
					}
				}

				points  .length = nbVertices;
				normals .length = nbNormals;

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
				break;
			}
			default:
				throw new Error('Can only sample curves and surfaces');
		}

		return mesh;
	};
});
