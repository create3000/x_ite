
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

	return function (mesh, nurbs, opts)
	{
		mesh = mesh || { };
		opts = opts || { };

		var
			points  = mesh .points  = mesh .points  || [ ],
			normals = mesh .normals = mesh .normals || [ ],
			faces   = mesh .faces   = mesh .faces   || [ ];

		var dimension = nurbs .dimension;

		if (Array .isArray (opts .resolution))
		{
			var resolution = opts .resolution;
		}
		else
		{
			var
				res        = opts .resolution === undefined ? 31 : opts .resolution,
				resolution = new Array (nurbs .splineDimension) .fill (res);
		}

		var generateNormals = dimension === 3 && (opts .generateNormals !== undefined ? opts .generateNormals : true);

		switch (nurbs .splineDimension)
		{
			case 1:
			{
				var
					nu         = resolution [0],
					uClosed    = nurbs .boundary [0] === 'closed',
					nuBound    = nu + ! uClosed,
					nbVertices = nuBound * dimension,
					uDer       = nurbs .evaluator ([1, 0]),
					domain     = opts .domain || nurbs .domain,
					uDomain    = domain [0];

				for (var i = 0; i < nuBound; ++ i)
				{
					var
						u   = uDomain [0] + (uDomain [1] - uDomain [0]) * i / nu,
						ptr = i * dimension;

					nurbs .evaluate (tmp1, u);

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
					uClosed    = nurbs .boundary [0] === 'closed',
					vClosed    = nurbs .boundary [1] === 'closed',
					nuBound    = nu + ! uClosed,
					nvBound    = nv + ! vClosed,
					nbNormals  = nuBound * nvBound * 3,
					nbVertices = nuBound * nvBound * dimension,
					uDer       = nurbs .evaluator ([1, 0]),
					vDer       = nurbs .evaluator ([0, 1]),
					domain     = opts .domain || nurbs .domain,
					uDomain    = domain [0],
					vDomain    = domain [1];

				for (var i = 0; i < nuBound; ++ i)
				{
					var u = uDomain [0] + (uDomain [1] - uDomain [0]) * i / nu;
	
					for (var j = 0; j < nvBound; ++ j)
					{
						var
							v   = vDomain [0] + (vDomain [1] - vDomain [0]) * j / nv,
							ptr = (i + nuBound * j) * dimension;

						nurbs .evaluate (tmp1, u, v);
	
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
	
				normals .length = nbNormals;
				points  .length = nbVertices;
				
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
						
						faces [c ++] = i0 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j1;
						
						faces [c ++] = i0 + nuBound * j0;
						faces [c ++] = i1 + nuBound * j1;
						faces [c ++] = i0 + nuBound * j1;
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