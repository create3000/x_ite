(function () {

	var
		define  = X3D .define,
		require = X3D .require;

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Rendering/X3DGeometricPropertyNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DNode, 
          X3DConstants)
{
"use strict";

	function X3DGeometricPropertyNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DGeometricPropertyNode);
	}

	X3DGeometricPropertyNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DGeometricPropertyNode,
	});

	return X3DGeometricPropertyNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Browser/Core/Shading',[],function ()
{
"use strict";
	
	var i = 0;

	var Shading =
	{
		POINT:     i ++,
		WIREFRAME: i ++,
		FLAT:      i ++,
		GOURAUD:   i ++,
		PHONG:     i ++,
	};

	Object .preventExtensions (Shading);
	Object .freeze (Shading);
	Object .seal (Shading);

	return Shading;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('standard/Math/Geometry/Plane3',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (Vector3,
          Matrix4)
{
"use strict";

	var
		normal    = new Vector3 (0, 0, 0),
		point     = new Vector3 (0, 0, 0),
		invMatrix = new Matrix4 ();

	function Plane3 (point, normal)
	{
		this .normal             = normal .copy ();
		this .distanceFromOrigin = normal .dot (point);
	}

	Plane3 .prototype =
	{
		constructor: Plane3,
		copy: function ()
		{
			var copy = Object .create (Plane3 .prototype);
			copy .normal             = this .normal .copy ();
			copy .distanceFromOrigin = this .distanceFromOrigin;
			return copy;
		},
		assign: function (plane)
		{
			this .normal .assign (plane .normal);
			this .distanceFromOrigin = plane .distanceFromOrigin;
			return this;
		},
		set: function (point, normal)
		{
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);	   
			return this;
		},
		multRight: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = n * !~m = ~m * n
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multMatrixDir (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multVecMatrix (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		multLeft: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = !~m * n = n * ~m
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multDirMatrix (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multMatrixVec (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		getDistanceToPoint: function (point)
		{
			return Vector3 .dot (point, this .normal) - this .distanceFromOrigin;
		},
		intersectsLine: function (line, intersection)
		{
			var
				point     = line .point,
				direction = line .direction;
		
			// Check if the line is parallel to the plane.
			var theta = direction .dot (this .normal);

			// Plane and line are parallel.
			if (theta === 0)
				return false;

			// Plane and line are not parallel. The intersection point can be calculated now.
			var t = (this .distanceFromOrigin - this .normal .dot (point)) / theta;

			intersection .x = point .x + direction .x * t;
			intersection .y = point .y + direction .y * t;
			intersection .z = point .z + direction .z * t;

			return true;
		},
		toString: function ()
		{
			return this .normal .toString () + " " + this .distanceFromOrigin;
		},
	};

	return Plane3;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Rendering/X3DGeometryNode',[
	"x_ite/Fields",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Core/Shading",
	"standard/Math/Numbers/Color3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DNode,
          X3DConstants,
          Shading,
          Color3,
          Vector2,
          Vector3,
          Matrix3,
          Matrix4,
          Box3,
          Plane3,
          Triangle3,
          Algorithm)
{
"use strict";

	const ARRAY_TYPE = "Array"; // For color, texCoord, normal, and vertex array, can be MFFloat or Array;

	const
		point           = new Vector3 (0, 0, 0),
		clipPoint       = new Vector3 (0, 0, 0),
		modelViewMatrix = new Matrix4 (),
		invMatrix       = new Matrix4 ();

	// Box normals for bbox / line intersection.
	const boxNormals = [
		new Vector3 (0,  0,  1), // front
		new Vector3 (0,  0, -1), // back
		new Vector3 (0,  1,  0), // top
		new Vector3 (0, -1,  0), // bottom
		new Vector3 (1,  0,  0)  // right
		// left: We do not have to test for left.
	];

	function X3DGeometryNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DGeometryNode);
			
		this .addChildObjects ("transparent",  new Fields .SFBool (),
		                       "bbox_changed", new Fields .SFTime (),
		                       "rebuild",      new Fields .SFTime ());

		this .transparent_  .setAccessType (X3DConstants .outputOnly);
		this .bbox_changed_ .setAccessType (X3DConstants .outputOnly);
		this .rebuild_      .setAccessType (X3DConstants .outputOnly);

		// Members

		this .min                 = new Vector3 (0, 0, 0);
		this .max                 = new Vector3 (0, 0, 0);
		this .bbox                = new Box3 (this .min, this .max, true);
		this .solid               = true;
		this .geometryType        = 3;
		this .flatShading         = undefined;
		this .colorMaterial       = false;
		this .attribNodes         = [ ];
		this .attribs             = [ ];
		this .currentTexCoordNode = this .getBrowser () .getDefaultTextureCoordinate (); // For TextureCoordinateGenerator needed.
		this .texCoordParams      = { min: new Vector3 (0, 0, 0) };
		this .multiTexCoords      = [ ];
		this .texCoords           = X3DGeometryNode .createArray ();
		this .colors              = X3DGeometryNode .createArray ();
		this .normals             = X3DGeometryNode .createArray ();
		this .flatNormals         = X3DGeometryNode .createArray ();
		this .vertices            = X3DGeometryNode .createArray ();
		this .vertexCount         = 0;

		// This methods are configured in transfer.
		this .depth            = Function .prototype;
		this .display          = Function .prototype;
		this .displayParticles = Function .prototype;
	}

	// Function to select ether Array or MFFloat for color/normal/vertex arrays.
	X3DGeometryNode .createArray = function ()
	{
		if (ARRAY_TYPE == "MFFloat")
			return new Fields .MFFloat ();

		var array = [ ];

		array .typedArray = new Float32Array ();

		array .assign = function (value)
		{
			this .length = 0;

			Array .prototype .push .apply (this, value);
		};

		array .getValue = function ()
		{
			return this .typedArray;
		};

		array .shrinkToFit = function ()
		{
			if (this .length !== this .typedArray .length)
				this .typedArray = new Float32Array (this);
			else
				this .typedArray .set (this);
		};

		return array;
	}

	X3DGeometryNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DGeometryNode,
		intersection: new Vector3 (0, 0, 0),
		uvt: { u: 0, v: 0, t: 0 },
		v0: new Vector3 (0, 0, 0),
		v1: new Vector3 (0, 0, 0),
		v2: new Vector3 (0, 0, 0),
		normal: new Vector3 (0, 0, 0),
		setup: function ()
		{
			X3DNode .prototype .setup .call (this);

			this .addInterest ("requestRebuild", this);
			this .rebuild_ .addInterest ("rebuild", this);

			this .rebuild ();
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);

			var gl = this .getBrowser () .getContext ();

			this .primitiveMode   = gl .TRIANGLES;
			this .frontFace       = gl .CCW;
			this .attribBuffers   = [ ];
			this .texCoordBuffers = [ ];
			this .colorBuffer     = gl .createBuffer ();
			this .normalBuffer    = gl .createBuffer ();
			this .vertexBuffer    = gl .createBuffer ();
			this .planes          = [ ];

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] = new Plane3 (Vector3 .Zero, boxNormals [0]);
			}

			this .set_live__ ();
		},
		setGeometryType: function (value)
		{
			this .geometryType = value;
		},
		getGeometryType: function ()
		{
			return this .geometryType;
		},
		getBBox: function ()
		{
			// With screen matrix applied.
			return this .bbox;
		},
		setBBox: function (bbox)
		{
			if (! bbox .equals (this .bbox))
			{
			   bbox .getExtents (this .min, this .max);
	
				this .bbox .assign (bbox);
	
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? this .min : this .max, boxNormals [i]);
	
				this .bbox_changed_ .addEvent ();
			}
		},
		getMin: function ()
		{
			// With screen matrix applied.
			return this .min;
		},
		getMax: function ()
		{
			// With screen matrix applied.
			return this .max;
		},
		getMatrix: function ()
		{
			return Matrix4 .Identity;
		},
		setPrimitiveMode: function (value)
		{
			this .primitiveMode = value;
		},
		getPrimitiveMode: function ()
		{
			return this .primitiveMode;
		},
		setSolid: function (value)
		{
			this .solid = value;
		},
		setCCW: function (value)
		{
			this .frontFace = value ? this .getBrowser () .getContext () .CCW : this .getBrowser () .getContext () .CW;
		},
		getAttrib: function ()
		{
			return this .attribNodes;
		},
		getAttribs: function ()
		{
			return this .attribs;
		},
		setColors: function (value)
		{
			this .colors .assign (value);
		},
		getColors: function ()
		{
			return this .colors;
		},
		setMultiTexCoords: function (value)
		{
			var multiTexCoords = this .multiTexCoords;

			multiTexCoords .length = 0;

			Array .prototype .push .apply (multiTexCoords, value);
		},
		getMultiTexCoords: function ()
		{
			return this .multiTexCoords;
		},
		getTexCoords: function ()
		{
			return this .texCoords;
		},
		setCurrentTexCoord: function (value)
		{
			this .currentTexCoordNode = value || this .getBrowser () .getDefaultTextureCoordinate ();
		},
		setNormals: function (value)
		{
			this .normals .assign (value);
		},
		getNormals: function ()
		{
			return this .normals;
		},
		setVertices: function (value)
		{
			this .vertices .assign (value);
		},
		getVertices: function ()
		{
			return this .vertices;
		},
		buildTexCoords: function ()
		{
			var
				p         = this .getTexCoordParams (),
				min       = p .min,
				Sindex    = p .Sindex,
				Tindex    = p .Tindex,
				Ssize     = p .Ssize,
				S         = min [Sindex],
				T         = min [Tindex],
				texCoords = this .texCoords,
				vertices  = this .vertices .getValue ();

			for (var i = 0, length = vertices .length; i < length; i += 4)
			{
				texCoords .push ((vertices [i + Sindex] - S) / Ssize,
				                 (vertices [i + Tindex] - T) / Ssize,
				                 0,
				                 1);
			}

			this .multiTexCoords .push (texCoords);
		},
		getTexCoordParams: function ()
		{
			var
				p     = this .texCoordParams,
				bbox  = this .getBBox (),
				size  = bbox .size,
				Xsize = size .x,
				Ysize = size .y,
				Zsize = size .z;

			p .min .assign (bbox .center) .subtract (size .divide (2));

			if ((Xsize >= Ysize) && (Xsize >= Zsize))
			{
				// X size largest
				p .Ssize = Xsize; p .Sindex = 0;

				if (Ysize >= Zsize)
					p .Tindex = 1;
				else
					p .Tindex = 2;
			}
			else if ((Ysize >= Xsize) && (Ysize >= Zsize))
			{
				// Y size largest
				p .Ssize = Ysize; p .Sindex = 1;

				if (Xsize >= Zsize)
					p .Tindex = 0;
				else
					p .Tindex = 2;
			}
			else
			{
				// Z is the largest
				p .Ssize = Zsize; p .Sindex = 2;

				if (Xsize >= Ysize)
					p .Tindex = 0;
				else
					p .Tindex = 1;
			}

			return p;
		},
		refineNormals: function (normalIndex, normals, creaseAngle)
		{
			if (creaseAngle === 0)
				return normals;

			var
				cosCreaseAngle = Math .cos (Algorithm .clamp (creaseAngle, 0, Math .PI)),
				normals_       = [ ];

			for (var i in normalIndex) // Don't use forEach
			{
				var vertex = normalIndex [i];

				for (var p = 0, length = vertex .length; p < length; ++ p)
				{
					var
						P = vertex [p],
						m = normals [P],
						n = new Vector3 (0, 0, 0);

					for (var q = 0; q < length; ++ q)
					{
						var Q = normals [vertex [q]];
	
						if (Q .dot (m) >= cosCreaseAngle)
							n .add (Q);
					}

					normals_ [P] = n .normalize ();
				}
			}

			return normals_;
		},
		isClipped: function (point, clipPlanes)
		{
			return clipPlanes .some (function (clipPlane)
			{
				return clipPlane .isClipped (point);
			});
		},
		transformLine: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		transformMatrix: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix_, intersections)
		{
			try
			{
				var intersected = false;

				if (this .intersectsBBox (line))
				{
					this .transformLine   (line);                                       // Apply screen transformations from screen nodes.
					this .transformMatrix (modelViewMatrix .assign (modelViewMatrix_)); // Apply screen transformations from screen nodes.

					var
						texCoords  = this .multiTexCoords [0] .getValue (),
						normals    = this .normals .getValue (),
						vertices   = this .vertices .getValue (),
						uvt        = this .uvt,
						v0         = this .v0,
						v1         = this .v1,
						v2         = this .v2;

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;

						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (line .intersectsTriangle (v0, v1, v2, uvt))
						{
							// Get barycentric coordinates.

							var
								u = uvt .u,
								v = uvt .v,
								t = uvt .t;

							// Determine vectors for X3DPointingDeviceSensors.

							var point = new Vector3 (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
							                         t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
							                         t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

							if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
								continue;

							var texCoord = new Vector2 (t * texCoords [i4]     + u * texCoords [i4 + 4] + v * texCoords [i4 + 8],
							                            t * texCoords [i4 + 1] + u * texCoords [i4 + 5] + v * texCoords [i4 + 9]);

							var i3 = i * 3;

							var normal = new Vector3 (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
							                          t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
							                          t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);

							intersections .push ({ texCoord: texCoord, normal: normal, point: this .getMatrix () .multVecMatrix (point) });
							intersected = true;
						}
					}
				}

				return intersected;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		intersectsBBox: function (line)
		{
			var
				planes       = this .planes,
				min          = this .min,
				max          = this .max,
				minX         = min .x,
				maxX         = max .x,
				minY         = min .y,
				maxY         = max .y,
				minZ         = min .z,
				maxZ         = max .z,
				intersection = this .intersection;

		   // front
			if (planes [0] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// back
			if (planes [1] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// top
			if (planes [2] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// bottom
			if (planes [3] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// right
			if (planes [4] .intersectsLine (line, intersection))
			{
				if (intersection .y >= minY && intersection .y <= maxY &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			return false;
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			try
			{
				if (box .intersectsBox (this .bbox))
				{
					box .multRight (invMatrix .assign (this .getMatrix ()) .inverse ());

					this .transformMatrix (modelViewMatrix); // Apply screen transformations from screen nodes.

					var
						vertices = this .vertices .getValue (),
						v0       = this .v0,
						v1       = this .v1,
						v2       = this .v2;
		
					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;
		
						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (box .intersectsTriangle (v0, v1, v2))
						{
							if (clipPlanes .length)
							{
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v0)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v1)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v2)), clipPlanes))
									continue;
							}
		
						   return true;
						}
				   }
				}

			   return false;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
				this .getBrowser () .getBrowserOptions () .Shading_ .addInterest ("set_shading__", this);
			else
				this .getBrowser () .getBrowserOptions () .Shading_ .removeInterest ("set_shading__", this);
		},
		set_shading__: function (shading)
		{
			if (this .geometryType < 2)
				return;
			
			var flatShading = this .getBrowser () .getBrowserOptions () .getShading () === Shading .FLAT;

			if (flatShading === this .flatShading)
				return;

			this .flatShading = flatShading;

			// Generate flat normals if needed.

			var gl = this .getBrowser () .getContext ();

			if (flatShading)
			{
				if (! this .flatNormals .length)
				{
					var
						cw          = this .frontFace === gl .CW,
						flatNormals = this .flatNormals,
						vertices    = this .vertices .getValue (),
						v0          = this .v0,
						v1          = this .v1,
						v2          = this .v2,
						normal      = this .normal;

					for (var i = 0, length = vertices .length; i < length; i += 12)
					{
					   Triangle3 .normal (v0 .set (vertices [i],     vertices [i + 1], vertices [i + 2]),
					                      v1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]),
					                      v2 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]),
					                      normal);
					   
						if (cw)
							normal .negate ();

						flatNormals .push (normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z);
					}

					flatNormals .shrinkToFit ();
				}
			}

			// Transfer normals.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, flatShading ? this .flatNormals .getValue () : this .normals .getValue (), gl .STATIC_DRAW);
		},
		requestRebuild: function ()
		{
			this .rebuild_ .addEvent ();
		},
		rebuild: function ()
		{
			this .clear ();
			this .build ();

			// Shrink arrays before transfer to graphics card.

			for (var i = 0, length = this .attribs .length; i < length; ++ i)
				this .attribs [i] .shrinkToFit ();

			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
				this .multiTexCoords [i] .shrinkToFit ();
	
			this .colors   .shrinkToFit ();
			this .normals  .shrinkToFit ();
			this .vertices .shrinkToFit ();

			// Determine bbox.

			var
				min      = this .min,
				max      = this .max,
				vertices = this .vertices .getValue ();

			if (vertices .length)
			{
				if (min .x === Number .POSITIVE_INFINITY)
				{
					for (var i = 0, length = vertices .length; i < length; i += 4)
					{
						point .set (vertices [i], vertices [i + 1], vertices [i + 2]);
	
						min .min (point);
						max .max (point);
					}
				}

				this .bbox .setExtents (min, max);
			}
			else
			{
				this .bbox .setExtents (min .set (0, 0, 0), max .set (0, 0, 0));
			}

			this .bbox_changed_ .addEvent ();

			// Generate texCoord if needed.

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? min : max, boxNormals [i]);

				if (this .multiTexCoords .length === 0)
				{
					this .buildTexCoords ();
	
					this .texCoords .shrinkToFit ();
				}
			}

			// Upload normals or flat normals.

			this .set_shading__ (this .getBrowser () .getBrowserOptions () .Shading_);

			// Upload arrays.

			this .transfer ();
		},
		clear: function ()
		{
			// BBox

			this .min .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
			this .max .set (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

			// Create attrib arrays.

			var attribs = this .attribs;

			for (var a = 0, length = attribs .length; a < length; ++ a)
				attribs [a] .length = 0;

			for (var a = attribs .length, length = this .attribNodes .length; a < length; ++ a)
				attribs [a] = X3DGeometryNode .createArray ();

			attribs .length = length;

			// Buffer

			this .flatShading = undefined;

			this .colors         .length = 0;
			this .multiTexCoords .length = 0;
			this .texCoords      .length = 0;
			this .normals        .length = 0;
			this .flatNormals    .length = 0;
			this .vertices       .length = 0;
		},
		transfer: function ()
		{
			var
				gl    = this .getBrowser () .getContext (),
				count = this .vertices .length / 4;

			// Transfer attribs.

			for (var i = this .attribBuffers .length, length = this .attribs .length; i < length; ++ i)
				this .attribBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .attribBuffers .length = length;
			
			for (var i = 0, length = this .attribs .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .attribBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .attribs [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer multiTexCoords.

			for (var i = this .texCoordBuffers .length, length = this .multiTexCoords .length; i < length; ++ i)
				this .texCoordBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .texCoordBuffers .length = length;
			
			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .multiTexCoords [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer colors.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .colors .getValue (), gl .STATIC_DRAW);
			this .colorMaterial = Boolean (this .colors .length);

			// Transfer vertices.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertices .getValue (), gl .STATIC_DRAW);
			this .vertexCount = count;

			// Setup render functions.

			if (this .vertexCount)
			{
				// Use default render functions.
				delete this .depth;
				delete this .display;
				delete this .displayParticles;
			}
			else
			{
				// Use no render function.
				this .depth            = Function .prototype;
				this .display          = Function .prototype;
				this .displayParticles = Function .prototype;
			}
	  	},
		traverse: function (type, renderObject)
		{ },
		depth: function (gl, context, shaderNode)
		{
			// Setup vertex attributes.

			// Attribs in depth rendering are not supported.
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);

			gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
		},
		display: function (gl, context)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;

				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);
	
				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
						gl .drawArrays (shaderNode .primitiveMode, i, 3);
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						gl .enable (gl .CULL_FACE);
						gl .cullFace (gl .FRONT);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
	
						gl .cullFace (gl .BACK);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		displayParticlesDepth: function (gl, context, shaderNode, particles, numParticles)
		{
			var gl = context .renderer .getBrowser () .getContext ();

			// Attribs in depth rendering are not supported:
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			// Draw depending on wireframe, solid and transparent.

			var
				modelViewMatrix = context .modelViewMatrix,
				x               = modelViewMatrix [12],
				y               = modelViewMatrix [13],
				z               = modelViewMatrix [14];

			for (var p = 0; p < numParticles; ++ p)
			{
				var particle = particles [p];

				modelViewMatrix [12] = x;
				modelViewMatrix [13] = y;
				modelViewMatrix [14] = z;

				Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

				shaderNode .setParticle (gl, p, particle, modelViewMatrix, false);

				gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
			}
	
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;
	
				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				var
					materialNode    = context .materialNode,
					normalMatrix    = materialNode || shaderNode .getCustom (),
					modelViewMatrix = context .modelViewMatrix,
					x               = modelViewMatrix [12],
					y               = modelViewMatrix [13],
					z               = modelViewMatrix [14];
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.
	
					for (var p = 0; p < numParticles; ++ p)
					{
						var particle = particles [p];

						modelViewMatrix [12] = x;
						modelViewMatrix [13] = y;
						modelViewMatrix [14] = z;
		
						Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

						shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);
		
						for (var i = 0, length = this .vertexCount; i < length; i += 3)
							gl .drawArrays (shaderNode .primitiveMode, i, 3);
					}
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;
	
							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);
	
							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .enable (gl .CULL_FACE);
							gl .cullFace (gl .FRONT);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
		
							gl .cullFace (gl .BACK);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}	
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;

							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
	});

	return X3DGeometryNode;
});


/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing/X3DTextureCoordinateNode',[
	"x_ite/Fields",
	"x_ite/Components/Rendering/X3DGeometricPropertyNode",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DGeometricPropertyNode, 
          X3DGeometryNode, 
          X3DConstants)
{
"use strict";

	function X3DTextureCoordinateNode (executionContext)
	{
		X3DGeometricPropertyNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureCoordinateNode);

		this .texCoordArray = X3DGeometryNode .createArray ();
	}

	X3DTextureCoordinateNode .prototype = Object .assign (Object .create (X3DGeometricPropertyNode .prototype),
	{
		constructor: X3DTextureCoordinateNode,
		init: function (multiArray)
		{
			this .texCoordArray .length = 0;

			multiArray .push (this .texCoordArray);
		},
		addTexCoord: function (index, multiArray)
		{
			this .addTexCoordToChannel (index, multiArray [0]);
		},
	});

	return X3DTextureCoordinateNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing3D/TextureCoordinate3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants)
{
"use strict";

	function TextureCoordinate3D (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinate3D);
	}

	TextureCoordinate3D .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				return vector .set (point [index], point [index + 1], point [index + 2], 1);
			}
			else
			{
				return vector .set (0, 0, 0, 1);
			}
		},
		addTexCoordToChannel: function (index, array)
		{
			if (index >= 0 && index < this .length)
			{
				var point = this .point;

				index *= 3;

				array .push (point [index], point [index + 1], point [index + 2], 1);
			}
			else
				array .push (0, 0, 0, 1);
		},
		getTexCoord: function (array)
		{
			var point = this .point_;

			for (var i = 0, length = point .length; i < length; ++ i)
			{
				var p = point [i];

				array [i] = new Vector4 (p .x, p .y, p .z, 1);
			}

			array .length = length;

			return array;
		},
	});

	return TextureCoordinate3D;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing3D/TextureCoordinate4D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants)
{
"use strict";

	function TextureCoordinate4D (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinate4D);
	}

	TextureCoordinate4D .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate4D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec4f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate4D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 4;

				return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
			}
			else
			{
				return vector .set (0, 0, 0, 1);
			}
		},
		addTexCoordToChannel: function (index, array)
		{
			if (index >= 0 && index < this .length)
			{
				var point = this .point;

				index *= 4;

				array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
			}
			else
				array .push (0, 0, 0, 1);
		},
		getTexCoord: function (array)
		{
			var point = this .point_;

			for (var i = 0, length = point .length; i < length; ++ i)
			{
				var p = point [i];

				array [i] = new Vector4 (p .x, p .y, p .z, p .w);
			}

			array .length = length;

			return array;
		},
	});

	return TextureCoordinate4D;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Shape/X3DAppearanceChildNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DNode, 
          X3DConstants)
{
"use strict";

	function X3DAppearanceChildNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DAppearanceChildNode);
	}

	X3DAppearanceChildNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DAppearanceChildNode,
	});

	return X3DAppearanceChildNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing/X3DTextureTransformNode',[
	"x_ite/Components/Shape/X3DAppearanceChildNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (X3DAppearanceChildNode, 
          X3DConstants,
          Matrix4)
{
"use strict";

	function X3DTextureTransformNode (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureTransformNode);

		this .matrix      = new Matrix4 ();
		this .matrixArray = new Float32Array (this .matrix);
	}

	X3DTextureTransformNode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: X3DTextureTransformNode,
		setMatrix: function (value)
		{
			this .matrixArray .set (value);
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			gl .uniformMatrix4fv (shaderObject .x3d_TextureMatrix, false, this .matrixArray);
		},
	});

	return X3DTextureTransformNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing3D/TextureTransform3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureTransformNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode, 
          X3DConstants,
          Vector3,
          Rotation4)
{
"use strict";

	var vector = new Vector3 (0, 0, 0);

	function TextureTransform3D (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext);

		this .addType (X3DConstants .TextureTransform3D);
	}

	TextureTransform3D .prototype = Object .assign (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransform3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "TextureTransform3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
		initialize: function ()
		{
			X3DTextureTransformNode .prototype .initialize .call (this);
			
			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			var
				translation = this .translation_ .getValue (),
				rotation    = this .rotation_ .getValue (),
				scale       = this .scale_ .getValue (),
				center      = this .center_ .getValue (),
				matrix4     = this .getMatrix ();

			matrix4 .identity ();

			if (! center .equals (Vector3 .Zero))
				matrix4 .translate (vector .assign (center) .negate ());

			if (! scale .equals (Vector3 .One))
				matrix4 .scale (scale);

			if (! rotation .equals (Rotation4 .Identity))
				matrix4 .rotate (rotation);

			if (! center .equals (Vector3 .Zero))
				matrix4 .translate (center);

			if (! translation .equals (Vector3 .Zero))
				matrix4 .translate (translation);

			this .setMatrix (matrix4);
		},
	});

	return TextureTransform3D;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing3D/TextureTransformMatrix3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureTransformNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode, 
          X3DConstants)
{
"use strict";

	function TextureTransformMatrix3D (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext);

		this .addType (X3DConstants .TextureTransformMatrix3D);
	}

	TextureTransformMatrix3D .prototype = Object .assign (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransformMatrix3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "matrix",   new Fields .SFMatrix4f (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)),
		]),
		getTypeName: function ()
		{
			return "TextureTransformMatrix3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
		eventsProcessed: function ()
		{
			var matrix4 = this .getMatrix ();

			matrix4 .assign (this .matrix_ .getValue ());

			this .setMatrix (matrix4);
		},
	});

	return TextureTransformMatrix3D;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing/X3DTextureNode',[
	"x_ite/Fields",
	"x_ite/Components/Shape/X3DAppearanceChildNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DAppearanceChildNode, 
          X3DConstants)
{
"use strict";

	// Anisotropic Filtering in WebGL is handled by an extension, use one of getExtension depending on browser:

	var ANISOTROPIC_EXT = [
		"EXT_texture_filter_anisotropic",
		"MOZ_EXT_texture_filter_anisotropic",
		"WEBKIT_EXT_texture_filter_anisotropic",
	];
	
	function X3DTextureNode (executionContext)
	{
		X3DAppearanceChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureNode);

		this .addChildObjects ("transparent", new Fields .SFBool ());

		this .transparent_ .setAccessType (X3DConstants .outputOnly);
	}

	X3DTextureNode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
	{
		constructor: X3DTextureNode,
		initialize: function ()
		{
			X3DAppearanceChildNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .texture = gl .createTexture ();
		},
		getTexture: function ()
		{
			return this .texture;
		},
		updateTextureProperties: function (target, haveTextureProperties, textureProperties, width, height, repeatS, repeatT, repeatR)
		{
			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (target, this .getTexture ());

			if (Math .max (width, height) < this .getBrowser () .getMinTextureSize () && ! haveTextureProperties)
			{
				// Dont generate mipmaps.
				gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl .NEAREST);
				gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
			}
			else
			{
				if (textureProperties .generateMipMaps_ .getValue ())
					gl .generateMipmap (target);

				gl .texParameteri (target, gl .TEXTURE_MIN_FILTER, gl [textureProperties .getMinificationFilter ()]);
				gl .texParameteri (target, gl .TEXTURE_MAG_FILTER, gl [textureProperties .getMagnificationFilter ()]);
			}

			if (haveTextureProperties)
			{
				gl .texParameteri (target, gl .TEXTURE_WRAP_S, gl [textureProperties .getBoundaryModeS ()]);
				gl .texParameteri (target, gl .TEXTURE_WRAP_T, gl [textureProperties .getBoundaryModeT ()]);
				//gl .texParameteri (target, gl .TEXTURE_WRAP_R, gl [textureProperties .getBoundaryModeR ()]);
			}
			else
			{
				gl .texParameteri (target, gl .TEXTURE_WRAP_S, repeatS ? gl .REPEAT : gl .CLAMP_TO_EDGE);
				gl .texParameteri (target, gl .TEXTURE_WRAP_T, repeatT ? gl .REPEAT : gl .CLAMP_TO_EDGE);
				//gl .texParameteri (target, gl .TEXTURE_WRAP_R, repeatR ? gl .REPEAT : gl .CLAMP);
			}

			//gl .texParameterfv (target, gl .TEXTURE_BORDER_COLOR, textureProperties .borderColor_ .getValue ());
			//gl .texParameterf  (target, gl .TEXTURE_PRIORITY,     textureProperties .texturePriority_ .getValue ());

			for (var i = 0; i < ANISOTROPIC_EXT .length; ++ i)
			{
				var ext = gl .getExtension (ANISOTROPIC_EXT [i]);
				
				if (ext)
				{
					gl .texParameterf (target, ext .TEXTURE_MAX_ANISOTROPY_EXT, textureProperties .anisotropicDegree_ .getValue ());
					break;
				}
			}
		},
	});

	return X3DTextureNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Texturing3D/X3DTexture3DNode',[
	"x_ite/Components/Texturing/X3DTextureNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DTextureNode, 
          X3DConstants)
{
"use strict";

	function X3DTexture3DNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTexture3DNode);
	}

	X3DTexture3DNode .prototype = Object .assign (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DTexture3DNode,
	});

	return X3DTexture3DNode;
});



/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


require ([
	"x_ite/Configuration/SupportedNodes",
//	"x_ite/Components/Texturing3D/ComposedTexture3D",
//	"x_ite/Components/Texturing3D/ImageTexture3D",
//	"x_ite/Components/Texturing3D/PixelTexture3D",
	"x_ite/Components/Texturing3D/TextureCoordinate3D",
	"x_ite/Components/Texturing3D/TextureCoordinate4D",
	"x_ite/Components/Texturing3D/TextureTransform3D",
	"x_ite/Components/Texturing3D/TextureTransformMatrix3D",
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
],
function (SupportedNodes,
//          ComposedTexture3D,
//          ImageTexture3D,
//          PixelTexture3D,
          TextureCoordinate3D,
          TextureCoordinate4D,
          TextureTransform3D,
          TextureTransformMatrix3D
//          X3DTexture3DNode
          )
{
"use strict";

	var Types =
	{
//		ComposedTexture3D:        ComposedTexture3D,
//		ImageTexture3D:           ImageTexture3D,
//		PixelTexture3D:           PixelTexture3D,
		TextureCoordinate3D:      TextureCoordinate3D,
		TextureCoordinate4D:      TextureCoordinate4D,
		TextureTransform3D:       TextureTransform3D,
		TextureTransformMatrix3D: TextureTransformMatrix3D,
	};

	var AbstractTypes =
	{
//		X3DTexture3DNode: X3DTexture3DNode,
	};

	for (var typeName in Types)
		SupportedNodes .addType (typeName, Types [typeName]); 

	for (var typeName in AbstractTypes)
		SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]); 

	return Types;
});


define("components/texturing-3d", function(){});


}());
