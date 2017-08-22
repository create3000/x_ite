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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Components/Core/X3DNode",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Algorithm",
	"standard/Math/Algorithms/QuickSort",
],
function ($,
          X3DNode, 
          X3DConstants,
          Vector3,
          Rotation4,
          Line3,
          Plane3,
          Algorithm,
          QuickSort)
{
"use strict";

	var
		normal       = new Vector3 (0, 0, 0),
		fromPosition = new Vector3 (0, 0, 0),
		line         = new Line3 (Vector3 .Zero, Vector3 .zAxis),
		plane        = new Plane3 (Vector3 .Zero, Vector3 .zAxis);

	function PlaneCompare (a, b)
	{
		return plane .getDistanceToPoint (a) < plane .getDistanceToPoint (b);
	}

	function PlaneCompareValue (a, b)
	{
		return a < plane .getDistanceToPoint (b);
	}

	function X3DParticleEmitterNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DParticleEmitterNode);

		this .rotations           = [ ];
		this .intersections       = [ ];
		this .intersectionNormals = [ ];
		this .sorter              = new QuickSort (this .intersections, PlaneCompare);
	}

	X3DParticleEmitterNode .prototype = $.extend (Object .create (X3DNode .prototype),
	{
		constructor: X3DParticleEmitterNode,
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .speed_     .addInterest ("set_speed__", this);
			this .variation_ .addInterest ("set_variation__", this);
			this .mass_      .addInterest ("set_mass__", this);

			this .set_speed__ ();
			this .set_variation__ ();
			this .set_mass__ ();
		},
		set_speed__: function ()
		{
			this .speed = this .speed_ .getValue ();
		},
		set_variation__: function ()
		{
			this .variation = this .variation_ .getValue ();
		},
		set_mass__: function ()
		{
			this .mass = this .mass_ .getValue ();
		},
		isExplosive: function ()
		{
			return false;
		},
		getMass: function ()
		{
			return this .mass;
		},
		getRandomLifetime: function (particleLifetime, lifetimeVariation)
		{
			var
				v   = particleLifetime * lifetimeVariation,
				min = Math .max (0, particleLifetime - v),
				max = particleLifetime + v;
		
			return Math .random () * (max - min) + min;
		},
		getRandomSpeed: function ()
		{
			var
				speed = this .speed,
				v     = speed * this .variation,
				min   = Math .max (0, speed - v),
				max   = speed + v;
		
			return Math .random () * (max - min) + min;
		},
		getSphericalRandomVelocity: function (velocity)
		{
			return this .getRandomNormal (velocity) .multiply (this .getRandomSpeed ());
		},
		getRandomValue: function (min, max)
		{
			return Math .random () * (max - min) + min;
		},
		getRandomNormal: function (normal)
		{
			var
				theta = this .getRandomValue (-1, 1) * Math .PI,
				cphi  = this .getRandomValue (-1, 1),
				phi   = Math .acos (cphi),
				r     = Math .sin (phi);
		
			return normal .set (Math .sin (theta) * r,
			                    Math .cos (theta) * r,
			                    cphi);
		},
		getRandomNormalWithAngle: function (angle, normal)
		{
			var
				theta = (Math .random () * 2 - 1) * Math .PI,
				cphi  = this .getRandomValue (Math .cos (angle), 1),
				phi   = Math .acos (cphi),
				r     = Math .sin (phi);
		
			return normal .set (Math .sin (theta) * r,
			                    Math .cos (theta) * r,
			                    cphi);
		},
		getRandomNormalWithDirectionAndAngle: function (direction, angle, normal)
		{
			rotation .setFromToVec (Vector3 .zAxis, direction);

			return rotation .multVecRot (this .getRandomNormalAngle (angle, normal));
		},
		getRandomSurfaceNormal: function (normal)
		{
			var
				theta = this .getRandomValue (-1, 1) * Math .PI,
				cphi  = Math .pow (Math .random (), 1/3),
				phi   = Math .acos (cphi),
				r     = Math .sin (phi);
		
			return normal .set (Math .sin (theta) * r,
			                    Math .cos (theta) * r,
			                    cphi);
		},
		animate: function (particleSystem, deltaTime)
		{
			var
				particles         = particleSystem .particles,
				numParticles      = particleSystem .numParticles,
				createParticles   = particleSystem .createParticles,
				particleLifetime  = particleSystem .particleLifetime,
				lifetimeVariation = particleSystem .lifetimeVariation,
				speeds            = particleSystem .speeds,            // speed of velocities
				velocities        = particleSystem .velocities,        // resulting velocities from forces
				turbulences       = particleSystem .turbulences,       // turbulences
				rotations         = this .rotations,                   // rotation to direction of force
				numForces         = particleSystem .numForces,         // number of forces
				boundedPhysics    = particleSystem .boundedVertices .length,
				boundedVolume     = particleSystem .boundedVolume;

			for (var i = rotations .length; i < numForces; ++ i)
				rotations [i] = new Rotation4 (0, 0, 1, 0);

			for (var i = 0; i < numForces; ++ i)
				rotations [i] .setFromToVec (Vector3 .zAxis, velocities [i]);

			for (var i = 0; i < numParticles; ++ i)
			{
				var
					particle    = particles [i],
					elapsedTime = particle .elapsedTime + deltaTime;
		
				if (elapsedTime > particle .lifetime)
				{
					// Create new particle or hide particle.

					particle .lifetime    = this .getRandomLifetime (particleLifetime, lifetimeVariation);
					particle .elapsedTime = 0;

					if (createParticles)
					{
						this .getRandomPosition (particle .position)
						this .getRandomVelocity (particle .velocity);
					}
					else
						particle .position .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
				}
				else
				{
					// Animate particle.

					var
						position = particle .position,
						velocity = particle .velocity;

					for (var f = 0; f < numForces; ++ f)
					{
						velocity .add (rotations [f] .multVecRot (this .getRandomNormalWithAngle (turbulences [f], normal)) .multiply (speeds [f]));
					}

					if (boundedPhysics)
					{
						fromPosition .x = position .x;
						fromPosition .y = position .y;
						fromPosition .z = position .z;

						position .x += velocity .x * deltaTime;
						position .y += velocity .y * deltaTime;
						position .z += velocity .z * deltaTime;
			
						this .bounce (boundedVolume, fromPosition, position, velocity);
					}
					else
					{
						position .x += velocity .x * deltaTime;
						position .y += velocity .y * deltaTime;
						position .z += velocity .z * deltaTime;
					}
				
					particle .elapsedTime = elapsedTime;
				}
			}

			// Animate color if needed.

			if (particleSystem .colorMaterial)
				this .getColors (particles, particleSystem .colorKeys, particleSystem .colorRamp, numParticles);
		},
		bounce: function (boundedVolume, fromPosition, toPosition, velocity)
		{
			normal .assign (velocity) .normalize ();

			line .set (fromPosition, normal);
		
			var
				intersections       = this .intersections,
				intersectionNormals = this .intersectionNormals,
				numIntersections    = boundedVolume .intersectsLine (line, intersections, intersectionNormals);

			if (numIntersections)
			{
				for (var i = 0; i < numIntersections; ++ i)
					intersections [i] .index = i;

				plane .set (fromPosition, normal);
		
				this .sorter .sort (0, numIntersections);

				var index = Algorithm .upperBound (intersections, 0, numIntersections, 0, PlaneCompareValue);
				
				if (index < numIntersections)
				{
					var
						intersection       = intersections [index],
						intersectionNormal = intersectionNormals [intersection .index];

					plane .set (intersection, intersectionNormal);
		
					if (plane .getDistanceToPoint (fromPosition) * plane .getDistanceToPoint (toPosition) < 0)
					{
						var dot2 = 2 * intersectionNormal .dot (velocity);

						velocity .x -= intersectionNormal .x * dot2;
						velocity .y -= intersectionNormal .y * dot2;
						velocity .z -= intersectionNormal .z * dot2;

						normal .assign (velocity) .normalize ();

						var distance = intersection .distance (fromPosition);

						toPosition .x = intersection .x + normal .x * distance;
						toPosition .y = intersection .y + normal .y * distance;
						toPosition .z = intersection .z + normal .z * distance;
					}
				}
			}
		},
		getColors: function (particles, colorKeys, colorRamp, numParticles)
		{
			var
				length = colorKeys .length,
				index0 = 0,
				index1 = 0,
				weight = 0;
		
			for (var i = 0; i < numParticles; ++ i)
			{
				// Determine index0, index1 and weight.

				var
					particle = particles [i],
					fraction = particle .elapsedTime / particle .lifetime,
					color    = particle .color;

				if (length == 1 || fraction <= colorKeys [0])
				{
					index0 = 0;
					index1 = 0;
					weight = 0;
				}
				else if (fraction >= colorKeys [length - 1])
				{
					index0 = length - 2;
					index1 = length - 1;
					weight = 1;
				}
				else
				{
					var index = Algorithm .upperBound (colorKeys, 0, length, fraction, Algorithm .less);
	
					if (index < length)
					{
						index1 = index;
						index0 = index - 1;
				
						var
							key0 = colorKeys [index0],
							key1 = colorKeys [index1];
				
						weight = Algorithm .clamp ((fraction - key0) / (key1 - key0), 0, 1);
					}
					else
					{
						index0 = 0;
						index1 = 0;
						weight = 0;
					}
				}
	
				// Interpolate and set color.

				var
					color0 = colorRamp [index0],
					color1 = colorRamp [index1];
	
				// Algorithm .lerp (color0, color1, weight);
				color .x = color0 .x + weight * (color1 .x - color0 .x);
				color .y = color0 .y + weight * (color1 .y - color0 .y);
				color .z = color0 .z + weight * (color1 .z - color0 .z);
				color .w = color0 .w + weight * (color1 .w - color0 .w);
			}
		},
	});

	return X3DParticleEmitterNode;
});


