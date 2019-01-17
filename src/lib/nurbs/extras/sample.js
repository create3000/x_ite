
define (function ()
{
'use strict';

	function normalize(out, a) {
	    var x = a[0],
	        y = a[1],
	        z = a[2]
	    var len = x*x + y*y + z*z
	    if (len > 0) {
	        //TODO: evaluate use of glm_invsqrt here?
	        len = 1 / Math.sqrt(len)
	        out[0] = a[0] * len
	        out[1] = a[1] * len
	        out[2] = a[2] * len
	    }
	    return out
	}

	function cross(out, a, b) {
	    var ax = a[0], ay = a[1], az = a[2],
	        bx = b[0], by = b[1], bz = b[2]
	
	    out[0] = ay * bz - az * by
	    out[1] = az * bx - ax * bz
	    out[2] = ax * by - ay * bx
	    return out
	}

	return function (mesh, nurbs, opts) {
	  var resolution, i, j, u, v, ptr;
	  opts = opts || {};
	  mesh = mesh || {};
	  var positions = mesh.positions = mesh.positions || [];
	  var normals = mesh.normals = mesh.normals || [];
	  var cells = mesh.cells = mesh.cells || [];
	
	  if (Array.isArray(opts.resolution)) {
	    resolution = opts.resolution;
	  } else {
	    var res = opts.resolution === undefined ? 31 : opts.resolution;
	    resolution = new Array(nurbs.splineDimension).fill(res);
	  }

	  switch (nurbs.splineDimension) {
	    case 1:
	
	      break;
	    case 2:
	      var nu = resolution[0];
	      var nv = resolution[1];
	
	      var nuBound = nu + (nurbs.boundary[0] === 'closed' ? 0 : 1);
	      var nvBound = nv + (nurbs.boundary[1] === 'closed' ? 0 : 1);
	
	      var nbVertices = nuBound * nvBound * 3;
	      // var nbFaces = nu * nv * 4;
	
	      var uDer = nurbs.evaluator([1, 0]);
	      var vDer = nurbs.evaluator([0, 1]);
	
	      var domain = nurbs.domain;
	      var uDomain = domain[0];
	      var vDomain = domain[1];
	      var tmp1 = [];
	      var tmp2 = [];
	
	      for (i = 0; i < nuBound; i++) {
	        u = uDomain[0] + (uDomain[1] - uDomain[0]) * i / nu;
	        for (j = 0; j < nvBound; j++) {
	          v = vDomain[0] + (vDomain[1] - vDomain[0]) * j / nv;
	
	          ptr = 3 * (i + nuBound * j);
	
	          nurbs.evaluate(tmp1, u, v);
	
	          positions[ptr] = tmp1[0];
	          positions[ptr + 1] = tmp1[1];
	          positions[ptr + 2] = tmp1[2];
	
	          normalize(tmp1, cross(tmp1,
	            uDer(tmp1, u, v),
	            vDer(tmp2, u, v)
	          ));
	
	          normals[ptr] = tmp1[0];
	          normals[ptr + 1] = tmp1[1];
	          normals[ptr + 2] = tmp1[2];
	        }
	      }
	      normals.length = nbVertices;
	      positions.length = nbVertices;
	
	      var c = 0;
	      for (i = 0; i < nu; i++) {
	        var i0 = i;
	        var i1 = i + 1;
	        if (nurbs.boundary[0] === 'closed') i1 = i1 % nu;
	        for (j = 0; j < nv; j++) {
	          var j0 = j;
	          var j1 = j + 1;
	          if (nurbs.boundary[1] === 'closed') j1 = j1 % nv;
	
	          cells[c++] = i0 + nuBound * j0;
	          cells[c++] = i1 + nuBound * j0;
	          cells[c++] = i1 + nuBound * j1;
	
	          cells[c++] = i0 + nuBound * j0;
	          cells[c++] = i1 + nuBound * j1;
	          cells[c++] = i0 + nuBound * j1;
	        }
	      }
	
	      cells.length = c;
	
	      break;
	    default:
	      throw new Error('Can only sample curves and surfaces');
	  }
	
	  return mesh;
	};
});