(function () {

	var
		define  = X3D .define,
		require = X3D .require,
		module  = { };
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


define ('x_ite/Components/ParticleSystems/X3DParticleEmitterNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Algorithm",
	"standard/Math/Algorithms/QuickSort",
],
function (X3DNode, 
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

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .rotations           = [ ];
		this .intersections       = [ ];
		this .intersectionNormals = [ ];
		this .sorter              = new QuickSort (this .intersections, PlaneCompare);
	}

	X3DParticleEmitterNode .prototype = Object .assign (Object .create (X3DNode .prototype),
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

			return rotation .multVecRot (this .getRandomNormalWithAngle (angle, normal));
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
						++ particle .life;
						this .getRandomPosition (particle .position);
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


define ('x_ite/Components/ParticleSystems/PointEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode, 
          X3DConstants,
          Vector3)
{
"use strict";

	function PointEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .PointEmitter);

		this .position_    .setUnit ("length");
		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .direction = new Vector3 (0, 0, 0);
	}

	PointEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: PointEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "position",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "PointEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .position_  .addInterest ("set_position__", this);
			this .direction_ .addInterest ("set_direction__", this);

			this .set_position__ ();
			this .set_direction__ ();
		},
		set_position__: function ()
		{
			this .position = this .position_ .getValue ()
		},
		set_direction__: function ()
		{
			this .direction .assign (this .direction_ .getValue ()) .normalize ();

			if (this .direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		getRandomPosition: function (position)
		{
			return position .assign (this .position);
		},
		getRandomVelocity: function (velocity)
		{
			var
				direction = this .direction,
				speed     = this .getRandomSpeed ();

			velocity .x = direction .x * speed;
			velocity .y = direction .y * speed;
			velocity .z = direction .z * speed;

			return velocity;
 		},
	});

	return PointEmitter;
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


define ('x_ite/Browser/ParticleSystems/X3DParticleSystemsContext',[
	"x_ite/Components/ParticleSystems/PointEmitter",
],
function (PointEmitter)
{
"use strict";
	
	function X3DParticleSystemsContext () { }

	X3DParticleSystemsContext .prototype =
	{
		getDefaultEmitter: function ()
		{
			if (this .defaultEmitter !== undefined)
				return this .defaultEmitter;

			this .defaultEmitter = new PointEmitter (this .getPrivateScene ());
			this .defaultEmitter .setup ();

			return this .defaultEmitter;
		},
	};

	return X3DParticleSystemsContext;
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


define ('x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DNode, 
          X3DConstants)
{
"use strict";

	function X3DParticlePhysicsModelNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DParticlePhysicsModelNode);
	}

	X3DParticlePhysicsModelNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DParticlePhysicsModelNode,
		addForce: function ()
		{ },
	});

	return X3DParticlePhysicsModelNode;
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


define ('x_ite/Components/ParticleSystems/BoundedPhysicsModel',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticlePhysicsModelNode, 
          X3DConstants,
          X3DCast)
{
"use strict";

	function BoundedPhysicsModel (executionContext)
	{
		X3DParticlePhysicsModelNode .call (this, executionContext);

		this .addType (X3DConstants .BoundedPhysicsModel);
	}

	BoundedPhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
	{
		constructor: BoundedPhysicsModel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "geometry", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "BoundedPhysicsModel";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "physics";
		},
		initialize: function ()
		{
			X3DParticlePhysicsModelNode .prototype .initialize .call (this);

			this .geometry_ .addInterest ("set_geometry__", this);

			this .set_geometry__ ();
		},
		set_geometry__: function ()
		{
			if (this .geometryNode)
				this .geometryNode .rebuild_ .removeInterest ("addNodeEvent", this);

			this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this .geometry_);

			if (this .geometryNode)
				this .geometryNode .rebuild_ .addInterest ("addNodeEvent", this);
		},
		addGeometry: function (boundedNormals, boundedVertices)
		{
			if (this .geometryNode)
			{
				var
					normals  = this .geometryNode .getNormals ()  .getValue (),
					vertices = this .geometryNode .getVertices () .getValue ();
	
				for (var i = 0, length = normals .length; i < length; ++ i)
					boundedNormals .push (normals [i]);
	
				for (var i = 0, length = vertices .length; i < length; ++ i)
					boundedVertices .push (vertices [i]);
			}
		},
	});

	return BoundedPhysicsModel;
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


define ('x_ite/Components/ParticleSystems/ConeEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode, 
          X3DConstants,
          Vector3,
          Rotation4)
{
"use strict";

	function ConeEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .ConeEmitter);

		this .position_    .setUnit ("length");
		this .angle_       .setUnit ("angle");
		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .rotation = new Rotation4 (0, 0, 1, 0);
	}

	ConeEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: ConeEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "position",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "angle",       new Fields .SFFloat (0.7854)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "ConeEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .position_  .addInterest ("set_position__", this);
			this .direction_ .addInterest ("set_direction__", this);
			this .angle_     .addInterest ("set_angle__", this);

			this .set_position__ ();
			this .set_direction__ ();
			this .set_angle__ ();
		},
		set_position__: function ()
		{
			this .position = this .position_ .getValue ()
		},
		set_direction__: function ()
		{
			var direction = this .direction_ .getValue ();

			this .rotation .setFromToVec (Vector3 .zAxis, direction);

			if (direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_angle__: function ()
		{
			this .angle = this .angle_ .getValue ()
		},
		getRandomPosition: function (position)
		{
			return position .assign (this .position);
		},
		getRandomVelocity: function (velocity)
		{
			return this .rotation .multVecRot (this .getRandomNormalWithAngle (this .angle, velocity) .multiply (this .getRandomSpeed ()));
 		},
	});

	return ConeEmitter;
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


define ('x_ite/Components/ParticleSystems/ExplosionEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode, 
          X3DConstants)
{
"use strict";

	function ExplosionEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .ExplosionEmitter);

		this .position_    .setUnit ("length");
		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .getRandomVelocity = this .getSphericalRandomVelocity;
	}

	ExplosionEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: ExplosionEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "position",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "ExplosionEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .position_ .addInterest ("set_position__", this);

			this .set_position__ ();
		},
		set_position__: function ()
		{
			this .position = this .position_ .getValue ()
		},
		isExplosive: function ()
		{
			return true;
		},
		getRandomPosition: function (position)
		{
			return position .assign (this .position);
		},
	});

	return ExplosionEmitter;
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


define ('x_ite/Components/ParticleSystems/ForcePhysicsModel',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticlePhysicsModelNode, 
          X3DConstants)
{
"use strict";

	function ForcePhysicsModel (executionContext)
	{
		X3DParticlePhysicsModelNode .call (this, executionContext);

		this .addType (X3DConstants .ForcePhysicsModel);

		this .force_ .setUnit ("force");
	}

	ForcePhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
	{
		constructor: ForcePhysicsModel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "force",    new Fields .SFVec3f (0, -9.8, 0)),
		]),
		getTypeName: function ()
		{
			return "ForcePhysicsModel";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "physics";
		},
		addForce: function (i, emitterNode, forces, turbulences)
		{
			if (this .enabled_ .getValue ())
			{
				forces      [i] .assign (this .force_ .getValue ());
				turbulences [i] = 0;
			}
		},
	});

	return ForcePhysicsModel;
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


define ('standard/Math/Utility/BVH',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Algorithms/QuickSort",
],
function (Vector3,
          Plane3,
          QuickSort)
{
"use strict";

	var
		v0  = new Vector3 (0, 0, 0),
		v1  = new Vector3 (0, 0, 0),
		v2  = new Vector3 (0, 0, 0),
		uvt = { u: 0, v: 0, t: 0 };

	// Box normals for bbox / line intersection.
	var boxNormals = [
		new Vector3 (0,  0,  1), // front
		new Vector3 (0,  0, -1), // back
		new Vector3 (0,  1,  0), // top
		new Vector3 (0, -1,  0), // bottom
		new Vector3 (1,  0,  0)  // right
		// left: We do not have to test for left.
	];

	function SortComparator (vertices, axis)
	{
		function compare (a, b)
		{
			var
				vertices = compare .vertices;
				axis     = compare .axis;

			return Math .min (vertices [a + axis], vertices [a + 4 + axis], vertices [a + 8 + axis]) <
			       Math .min (vertices [b + axis], vertices [b + 4 + axis], vertices [b + 8 + axis]);
		}

		compare .vertices = vertices;
		compare .axis     = axis;

		return compare;
	}

	function Triangle (tree, triangle)
	{
		this .vertices = tree .vertices;
		this .normals  = tree .normals;
		this .i4       = triangle * 12;
		this .i3       = triangle * 9;
	}

	Triangle .prototype =
	{
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			var
				vertices = this .vertices,
				normals  = this .normals,
				i4       = this .i4,
				i3       = this .i3;

			v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
			v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
			v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

			if (line .intersectsTriangle (v0, v1, v2, uvt))
			{
				// Get barycentric coordinates.

				var
					u = uvt .u,
					v = uvt .v,
					t = 1 - u - v;

				// Determine vectors for X3DPointingDeviceSensors.

				var i = intersections .size ++;

				if (i >= intersections .length)
					intersections .push (new Vector3 (0, 0, 0));

				intersections [i] .set (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
				                        t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
				                        t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

				if (intersectionNormals)
				{
					if (i >= intersectionNormals .length)
						intersectionNormals .push (new Vector3 (0, 0, 0));

					intersectionNormals [i] .set (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
					                              t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
					                              t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);
				}
			}
		},
	};

	function Node (tree, triangles, first, size)
	{
		this .min          = new Vector3 (0, 0, 0);
		this .max          = new Vector3 (0, 0, 0);
		this .planes       = [ ];
		this .intersection = new Vector3 (0, 0, 0);

		var
			vertices = tree .vertices,
			min      = this .min,
			max      = this .max,
			last     = first + size,
			t        = triangles [first] * 12;

		// Calculate bbox

		min .set (vertices [t], vertices [t + 1], vertices [t + 2]);
		max .assign (min);

		for (var i = first; i < last; ++ i)
		{
			t = triangles [i] * 12;

			v0 .set (vertices [t],     vertices [t + 1], vertices [t + 2]);
			v1 .set (vertices [t + 4], vertices [t + 5], vertices [t + 6]);
			v2 .set (vertices [t + 8], vertices [t + 9], vertices [t + 10]);

			min .min (v0, v1, v2);
			max .max (v0, v1, v2);
		}

		for (var i = 0; i < 5; ++ i)
			this .planes [i] = new Plane3 (i % 2 ? min : max, boxNormals [i]);

		// Sort and split array

		if (size > 2)
		{
			// Sort array

			tree .sorter .compare .axis = this .getLongestAxis (min, max);
			tree .sorter .sort (first, last);

			// Split array

			var leftSize = size >>> 1;
		}
		else
			var leftSize = 1;

		// Split array

		var rightSize = size - leftSize;

		// Construct left and right node

		if (leftSize > 1)
			this .left = new Node (tree, triangles, first, leftSize);
		else
			this .left = new Triangle (tree, triangles [first]);

		if (rightSize > 1)
			this .right = new Node (tree, triangles, first + leftSize, rightSize);
		else
			this .right = new Triangle (tree, triangles [first + leftSize]);
	}

	Node .prototype =
	{
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			if (this .intersectsBBox (line))
			{
				this .left  .intersectsLine (line, intersections, intersectionNormals);
				this .right .intersectsLine (line, intersections, intersectionNormals);
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
		getLongestAxis: function (min, max)
		{
			var
				x = max .x - min .x,
				y = max .y - min .y,
				z = max .z - min .z;
	
			if (x < y)
			{
				if (y < z)
					return 2;

				return 1;
			}
			else
			{
				if (x < z)
					return 2;

				return 0;
			}
		},
	};

	function BVH (vertices, normals)
	{
		this .vertices = vertices;
		this .normals  = normals;

		var numTriangles = vertices .length / 12;
	
		switch (numTriangles)
		{
			case 0:
			{
				this .root = null;
				break;
			}
			case 1:
			{
				this .root = new Triangle (this, 0);
				break;
			}
			default:
			{
				var triangles = [ ];

				for (var i = 0; i < numTriangles; ++ i)
					triangles .push (i);

				this .sorter = new QuickSort (triangles, SortComparator (vertices, 0));

				this .root = new Node (this, triangles, 0, numTriangles);
				break;
			}
		}
	}

	BVH .prototype =
	{
		constructor: BVH,
		
		intersectsLine: function (line, intersections, intersectionNormals)
		{
			intersections .size = 0;

			if (this .root)
			{
				this .root .intersectsLine (line, intersections, intersectionNormals);
				return intersections .size;
			}

			return 0;
		},
	};

	return BVH;
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


define ('x_ite/Components/ParticleSystems/ParticleSystem',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Shape/X3DShapeNode",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Color4",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Algorithms/QuickSort",
	"standard/Math/Algorithm",
	"standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          TraverseType,
          X3DConstants,
          X3DCast,
          Color4,
          Vector3,
          Vector4,
          Matrix4,
          Matrix3,
          QuickSort,
          Algorithm,
          BVH)
{
"use strict";

	var
		i        = 0,
		POINT    = i ++,
		LINE     = i ++,
		TRIANGLE = i ++,
		QUAD     = i ++,
		GEOMETRY = i ++,
		SPRITE   = i ++;

	var GeometryTypes = {
		POINT:    POINT,
		LINE:     LINE,
		TRIANGLE: TRIANGLE,
		QUAD:     QUAD,
		GEOMETRY: GEOMETRY,
		SPRITE:   SPRITE,
	};

	var
		invModelViewMatrix = new Matrix4 (),
		billboardToScreen  = new Vector3 (0, 0, 0),
		viewerYAxis        = new Vector3 (0, 0, 0),
		vector             = new Vector3 (0, 0, 0),
		normal             = new Vector3 (0, 0, 0),
		s1                 = new Vector3 (0, 0, 0),
		s2                 = new Vector3 (0, 0, 0),
		s3                 = new Vector3 (0, 0, 0),
		s4                 = new Vector3 (0, 0, 0),
		x                  = new Vector3 (0, 0, 0),
		y                  = new Vector3 (0, 0, 0);

	function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

	function ParticleSystem (executionContext)
	{
		X3DShapeNode .call (this, executionContext);

		this .addType (X3DConstants .ParticleSystem);

		this .particleSize_ .setUnit ("length");

		this .createParticles          = true;
		this .particles                = [ ];
		this .velocities               = [ ];
		this .speeds                   = [ ];
		this .turbulences              = [ ];
		this .geometryType             = POINT;
		this .maxParticles             = 0;
		this .numParticles             = 0;
		this .particleLifetime         = 0;
		this .lifetimeVariation        = 0;
		this .emitterNode              = null;
		this .forcePhysicsModelNodes   = [ ];
		this .boundedPhysicsModelNodes = [ ];
		this .boundedNormals           = [ ];
		this .boundedVertices          = [ ];
		this .boundedVolume            = null;
		this .creationTime             = 0;
		this .pauseTime                = 0;
		this .deltaTime                = 0;
		this .numForces                = 0;
		this .colorKeys                = [ ];
		this .colorRamppNode           = null;
		this .colorRamp                = [ ];
		this .colorMaterial            = false;
		this .texCoordKeys             = [ ];
		this .texCoordRampNode         = null;
		this .texCoordRamp             = [ ];
		this .texCoordAnim             = false;
		this .vertexCount              = 0;
		this .shaderNode               = null;
		this .rotation                 = new Matrix3 ();
		this .particleSorter           = new QuickSort (this .particles, compareDistance);
		this .sortParticles            = false;
	}

	ParticleSystem .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
	{
		constructor: ParticleSystem,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "createParticles",   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geometryType",      new Fields .SFString ("QUAD")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "maxParticles",      new Fields .SFInt32 (200)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "particleLifetime",  new Fields .SFFloat (5)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "lifetimeVariation", new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "particleSize",      new Fields .SFVec2f (0.02, 0.02)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "emitter",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "physics",           new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorKey",          new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorRamp",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordKey",       new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordRamp",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ParticleSystem";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DShapeNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .isLive () .addInterest ("set_live__", this);

			this .getBrowser () .getBrowserOptions () .Shading_ .addInterest ("set_shader__", this);
			//this .getBrowser () .getDefaultShader () .addInterest ("set_shader__", this);

			this .enabled_           .addInterest ("set_enabled__",           this);
			this .createParticles_   .addInterest ("set_createParticles__",   this);
			this .geometryType_      .addInterest ("set_geometryType__",      this);
			this .maxParticles_      .addInterest ("set_enabled__",           this);
			this .particleLifetime_  .addInterest ("set_particleLifetime__",  this);
			this .lifetimeVariation_ .addInterest ("set_lifetimeVariation__", this);
			this .emitter_           .addInterest ("set_emitter__",           this);
			this .physics_           .addInterest ("set_physics__",           this);
			this .colorKey_          .addInterest ("set_color__",             this);
			this .colorRamp_         .addInterest ("set_colorRamp__",         this);
			this .texCoordKey_       .addInterest ("set_texCoord__",          this);
			this .texCoordRamp_      .addInterest ("set_texCoordRamp__",      this);

			this .idBuffer           = gl .createBuffer ();
			this .positionBuffer     = gl .createBuffer ();
			this .elapsedTimeBuffer  = gl .createBuffer ();
			this .lifeBuffer         = gl .createBuffer ();
			this .colorBuffer        = gl .createBuffer ();
			this .texCoordBuffers    = [ gl .createBuffer () ];
			this .normalBuffer       = gl .createBuffer ();
			this .vertexBuffer       = gl .createBuffer ();

			for (var i = 1, channels = this .getBrowser () .getMaxTextures (); i < channels; ++ i)
				this .texCoordBuffers .push (this .texCoordBuffers [0]);

			this .idArray          = new Float32Array ();
			this .positionArray    = new Float32Array ();
			this .elapsedTimeArray = new Float32Array ();
			this .lifeArray        = new Float32Array ();
			this .colorArray       = new Float32Array ();
			this .texCoordArray    = new Float32Array ();
			this .normalArray      = new Float32Array ();
			this .vertexArray      = new Float32Array ();

			this .primitiveMode = gl .TRIANGLES;

			// Call order is higly important at startup.
			this .set_emitter__ ();
			this .set_enabled__ ();
			this .set_createParticles__ ();
			this .set_particleLifetime__ ();
			this .set_lifetimeVariation__ ();
			this .set_physics__ ();
			this .set_colorRamp__ ();
			this .set_texCoordRamp__ ();
		},
		set_bbox__: function ()
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
				this .bbox .set ();
			else
				this .bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());

			this .bboxSize   .assign (this .bbox .size);
			this .bboxCenter .assign (this .bbox .center);
		},
		set_transparent__: function ()
		{
			switch (this .geometryType)
			{
				case POINT:
				{
					this .setTransparent (true);
					break;
				}
				default:
				{
					this .setTransparent ((this .getAppearance () && this .getAppearance () .getTransparent ()) ||
					                      (this .colorRampNode && this .colorRampNode .getTransparent ()) ||
					                      (this .geometryType === GEOMETRY && this .geometryNode && this .geometryNode .getTransparent ()));
					break;
				}
			}
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				if (this .isActive_ .getValue () && this .maxParticles_ .getValue ())
				{
					this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

					if (this .pauseTime)
					{
						this .creationTime += performance .now () / 1000 - this .pauseTime;
						this .pauseTime     = 0;
					}
				}
			}
			else
			{
				if (this .isActive_ .getValue () && this .maxParticles_ .getValue ())
				{
					this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

					if (this .pauseTime === 0)
						this .pauseTime = performance .now () / 1000;
				}
			}
		},
		set_enabled__: function ()
		{
			if (this .enabled_ .getValue () && this .maxParticles_ .getValue ())
			{
				if (! this .isActive_ .getValue ())
				{
					if (this .isLive () .getValue ())
					{
						this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

						this .pauseTime = 0;
					}
					else
						this .pauseTime = performance .now () / 1000;

					this .isActive_ = true;
				}
			}
			else
			{
				if (this .isActive_ .getValue ())
				{
					if (this .isLive () .getValue ())
					{
						this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);
					}

					this .isActive_ = false;

					this .numParticles = 0;
				}
			}

			this .set_maxParticles__ ();
		},
		set_createParticles__: function ()
		{
			this .createParticles = this .createParticles_ .getValue ();
		},
		set_geometryType__: function ()
		{
			var
				gl           = this .getBrowser () .getContext (),
				maxParticles = this .maxParticles;

			// geometryType

			this .geometryType = GeometryTypes [this .geometryType_ .getValue ()];

			if (! this .geometryType)
				this .geometryType = POINT;

			// Create buffers

			switch (this .geometryType)
			{
				case POINT:
				{
					this .idArray          = new Float32Array (maxParticles);
					this .positionArray    = new Float32Array (3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (maxParticles);
					this .lifeArray        = new Float32Array (maxParticles);
					this .colorArray       = new Float32Array (4 * maxParticles);
					this .texCoordArray    = new Float32Array ();
					this .normalArray      = new Float32Array ();
					this .vertexArray      = new Float32Array (4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = i;

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					this .primitiveMode = gl .POINTS;
					this .texCoordCount = 0;
					this .vertexCount   = 1;
					break;
				}
				case LINE:
				{
					this .idArray          = new Float32Array (2 * maxParticles);
					this .positionArray    = new Float32Array (2 * 3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (2 * maxParticles);
					this .lifeArray        = new Float32Array (2 * maxParticles);
					this .colorArray       = new Float32Array (2 * 4 * maxParticles);
					this .texCoordArray    = new Float32Array ();
					this .normalArray      = new Float32Array ();
					this .vertexArray      = new Float32Array (2 * 4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = Math .floor (i / 2);

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					this .primitiveMode = gl .LINES;
					this .texCoordCount = 2;
					this .vertexCount   = 2;
					break;
				}
				case TRIANGLE:
				case QUAD:
				case SPRITE:
				{
					this .idArray          = new Float32Array (6 * maxParticles);
					this .positionArray    = new Float32Array (6 * 3 * maxParticles);
					this .elapsedTimeArray = new Float32Array (6 * maxParticles);
					this .lifeArray        = new Float32Array (6 * maxParticles);
					this .colorArray       = new Float32Array (6 * 4 * maxParticles);
					this .texCoordArray    = new Float32Array (6 * 4 * maxParticles);
					this .normalArray      = new Float32Array (6 * 3 * maxParticles);
					this .vertexArray      = new Float32Array (6 * 4 * maxParticles);

					for (var i = 0, a = this .idArray, l = a .length; i < l; ++ i)
						a [i] = Math .floor (i / 6);

					this .colorArray  .fill (1);
					this .vertexArray .fill (1);

					var
						texCoordArray = this .texCoordArray,
						normalArray   = this .normalArray;

					for (var i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
					{
						normalArray [i]     = 0;
						normalArray [i + 1] = 0;
						normalArray [i + 2] = 1;
					}

					gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
					gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

					for (var i = 0; i < maxParticles; ++ i)
					{
						var i24 = i * 24;

						// p4 ------ p3
						// |       / |
						// |     /   |
						// |   /     |
						// | /       |
						// p1 ------ p2

						// p1
						texCoordArray [i24]     = texCoordArray [i24 + 12] = 0;
						texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = 0;
						texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = 0;
						texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = 1;

						// p2
						texCoordArray [i24 + 4] = 1;
						texCoordArray [i24 + 5] = 0;
						texCoordArray [i24 + 6] = 0;
						texCoordArray [i24 + 7] = 1;

						// p3
						texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = 1;
						texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = 1;
						texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = 0;
						texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = 1;

						// p4
						texCoordArray [i24 + 20] = 0;
						texCoordArray [i24 + 21] = 1;
						texCoordArray [i24 + 22] = 0;
						texCoordArray [i24 + 23] = 1;
					}

					gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
					gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);

					this .primitiveMode = gl .TRIANGLES;
					this .texCoordCount = 4;
					this .vertexCount   = 6;
					break;
				}
				case GEOMETRY:
				{
					this .texCoordCount = 0;
					this .vertexCount   = 0;
					break;
				}
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .idBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .idArray, gl .STATIC_DRAW);

			this .set_shader__ ();
			this .set_transparent__ ();
		},
		set_shader__: function ()
		{
			switch (this .geometryType)
			{
				case POINT:
				{
					this .shaderGeometryType = 0;
					this .shaderNode         = this .getBrowser () .getPointShader ();
					break;
				}
				case LINE:
				{
					this .shaderGeometryType = 1;
					this .shaderNode         = this .getBrowser () .getLineShader ();
					break;
				}
				case TRIANGLE:
				case QUAD:
				case SPRITE:
				{
					this .shaderGeometryType = 3;
					this .shaderNode         = this .getBrowser () .getDefaultShader ();
					break;
				}
				case GEOMETRY:
				{
					this .shaderGeometryType = 3; // determine from geometry node.
					this .shaderNode         = this .getBrowser () .getDefaultShader ();
					break;
				}
			}
		},
		set_maxParticles__: function ()
		{
			var
				particles    = this .particles,
				maxParticles = Math .max (0, this .maxParticles_ .getValue ());

			for (var i = this .numParticles, length = Math .min (particles .length, maxParticles); i < length; ++ i)
			{
				particles [i] .life     = 1;
				particles [i] .lifetime = -1;
			}

			for (var i = particles .length, length = maxParticles; i < length; ++ i)
			{
				particles [i] = {
					life: 1,
					lifetime: -1,
					elapsedTime: 0,
					position: new Vector3 (0, 0, 0),
					velocity: new Vector3 (0, 0, 0),
					color:    new Vector4 (1, 1, 1, 1),
					distance: 0,
				};
			}

			this .maxParticles = maxParticles;
			this .numParticles = Math .min (this .numParticles, maxParticles);

			if (! this .emitterNode .isExplosive ())
				this .creationTime = performance .now () / 1000;

			this .set_geometryType__ ();
		},
		set_particleLifetime__: function ()
		{
			this .particleLifetime = this .particleLifetime_ .getValue ();
		},
		set_lifetimeVariation__: function ()
		{
			this .lifetimeVariation = this .lifetimeVariation_ .getValue ();
		},
		set_emitter__: function ()
		{
			this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this .emitter_);

			if (! this .emitterNode)
				this .emitterNode = this .getBrowser () .getDefaultEmitter ();

			this .createParticles = this .createParticles_ .getValue ();
		},
		set_physics__: function ()
		{
			var
				physics                  = this .physics_ .getValue (),
				forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
				boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

			for (var i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
				boundedPhysicsModelNodes [i] .removeInterest ("set_boundedPhysics__", this);

			forcePhysicsModelNodes   .length = 0;
			boundedPhysicsModelNodes .length = 0;

			for (var i = 0, length = physics .length; i < length; ++ i)
			{
				try
				{
					var
						innerNode = physics [i] .getValue () .getInnerNode (),
						type      = innerNode .getType ();

					for (var t = type .length - 1; t >= 0; -- t)
					{
						switch (type [t])
						{
							case X3DConstants .ForcePhysicsModel:
							case X3DConstants .WindPhysicsModel:
							{
								forcePhysicsModelNodes .push (innerNode);
								break;
							}
							case X3DConstants .BoundedPhysicsModel:
							{
								innerNode .addInterest ("set_boundedPhysics__", this);
								boundedPhysicsModelNodes .push (innerNode);
								break;
							}
							default:
								continue;
						}

						break;
					}
				}
				catch (error)
				{ }
			}

			this .set_boundedPhysics__ ();
		},
		set_boundedPhysics__: function ()
		{
			var
				boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
				boundedNormals           = this .boundedNormals,
				boundedVertices          = this .boundedVertices;

			boundedNormals  .length = 0;
			boundedVertices .length = 0;

			for (var i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
			{
				boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
			}

			this .boundedVolume = new BVH (boundedVertices, boundedNormals);
		},
		set_colorRamp__: function ()
		{
			if (this .colorRampNode)
				this .colorRampNode .removeInterest ("set_color__", this);

			this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this .colorRamp_);

			if (this .colorRampNode)
				this .colorRampNode .addInterest ("set_color__", this);

			this .set_color__ ();
			this .set_transparent__ ();
		},
		set_color__: function ()
		{
			var
				colorKey  = this .colorKey_,
				colorKeys = this .colorKeys,
				colorRamp = this .colorRamp;

			for (var i = 0, length = colorKey .length; i < length; ++ i)
				colorKeys [i] = colorKey [i];

			colorKeys .length = length;

			if (this .colorRampNode)
				this .colorRampNode .getVectors (this .colorRamp);

			for (var i = colorRamp .length, length = colorKey .length; i < length; ++ i)
				colorRamp [i] = new Vector4 (1, 1, 1, 1);

			colorRamp .length = length;

			this .colorMaterial = !! (colorKeys .length && this .colorRampNode);
		},
		set_texCoordRamp__: function ()
		{
			if (this .texCoordRampNode)
				this .texCoordRampNode .removeInterest ("set_texCoord__", this);

			this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoordRamp_);

			if (this .texCoordRampNode)
				this .texCoordRampNode .addInterest ("set_texCoord__", this);

			this .set_texCoord__ ();
		},
		set_texCoord__: function ()
		{
			var
				texCoordKey  = this .texCoordKey_,
				texCoordKeys = this .texCoordKeys,
				texCoordRamp = this .texCoordRamp;

			for (var i = 0, length = texCoordKey .length; i < length; ++ i)
				texCoordKeys [i] = texCoordKey [i];

			texCoordKeys .length = length;

			if (this .texCoordRampNode)
				this .texCoordRampNode .getTexCoord (texCoordRamp);

			for (var i = texCoordRamp .length, length = texCoordKey .length * this .texCoordCount; i < length; ++ i)
				texCoordRamp [i] = new Vector4 (0, 0, 0, 0);

			texCoordRamp .length = length;

			this .texCoordAnim = !! (texCoordKeys .length && this .texCoordRampNode);
		},
		intersectsBox: function (box, clipPlanes)
		{
			// TODO: implement me.
		},
		animateParticles: function ()
		{
			var emitterNode = this .emitterNode;

			// Determine delta time

			var
				DELAY = 15, // Delay in frames when dt full applys.
				dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

			// var deltaTime is only for the emitter, this.deltaTime is for the forces.
			var deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

			// Determine numParticles

			if (emitterNode .isExplosive ())
			{
				var
					now              = performance .now () / 1000,
					particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

				if (this .numParticles === 0 || now - this .creationTime > particleLifetime)
				{
					this .creationTime    = now;
					this .numParticles    = this .maxParticles;
					this .createParticles = this .createParticles_ .getValue ();

					deltaTime = Number .POSITIVE_INFINITY;
				}
				else
					this .createParticles = false;
			}
			else
			{
				if (this .numParticles < this .maxParticles)
				{
					var
						now          = performance .now () / 1000,
						newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

					if (newParticles)
						this .creationTime = now;

					this .numParticles = Math .floor (Math .min (this .maxParticles, this .numParticles + newParticles));
				}
			}

			// Apply forces.

			if (emitterNode .getMass ())
			{
				var
					forcePhysicsModelNodes = this .forcePhysicsModelNodes,
					velocities             = this .velocities,
					speeds                 = this .speeds,
					turbulences            = this .turbulences,
					deltaMass              = this .deltaTime / emitterNode .getMass ();

				// Collect forces in velocities and collect turbulences.

				for (var i = velocities .length, length = forcePhysicsModelNodes .length; i < length; ++ i)
					velocities [i] = new Vector3 (0, 0, 0);

				for (var i = 0, length = forcePhysicsModelNodes .length; i < length; ++ i)
					forcePhysicsModelNodes [i] .addForce (i, emitterNode, velocities, turbulences);

				// Determine velocities from forces and determine speed.

				for (var i = 0, length = velocities .length; i < length; ++ i)
				{
					velocities [i] .multiply (deltaMass);
					speeds [i] = velocities [i] .abs ();
				}

				this .numForces = length;
			}
			else
			{
				this .numForces = 0;
			}

			// Determine particle position, velocity and colors

			emitterNode .animate (this, deltaTime);

			this .updateGeometry (null);

			this .getBrowser () .addBrowserEvent ();
		},
		updateGeometry: function (modelViewMatrix)
		{
			switch (this .geometryType)
			{
				case POINT:
					if (! modelViewMatrix)
						this .updatePoint ();
					break;
				case LINE:
					if (! modelViewMatrix)
						this .updateLine ();
					break;
				case TRIANGLE:
				case QUAD:
				case SPRITE:
					this .updateQuad (modelViewMatrix);
					break;
				case GEOMETRY:
					break;
			}
		},
		updatePoint: function ()
		{
			var
				gl               = this .getBrowser () .getContext (),
				particles        = this .particles,
				numParticles     = this .numParticles,
				positionArray    = this .positionArray,
				elapsedTimeArray = this .elapsedTimeArray,
				lifeArray        = this .lifeArray,
				colorArray       = this .colorArray,
				vertexArray      = this .vertexArray;

			// Colors

			if (this .colorMaterial)
			{
				for (var i = 0; i < numParticles; ++ i)
				{
					var
						color = particles [i] .color,
						i4    = i * 4;

					colorArray [i4]     = color .x;
					colorArray [i4 + 1] = color .y;
					colorArray [i4 + 2] = color .z;
					colorArray [i4 + 3] = color .w;
				}

				gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
				gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
			}

			// Vertices

			for (var i = 0; i < numParticles; ++ i)
			{
				var
					position    = particles [i] .position,
					elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
					i3          = i * 3,
					i4          = i * 4;

				positionArray [i3]     = position .x;
				positionArray [i3 + 1] = position .y;
				positionArray [i3 + 2] = position .z;

				elapsedTimeArray [i] = elapsedTime;
				lifeArray [i]        = particles [i] .life;

				vertexArray [i4]     = position .x;
				vertexArray [i4 + 1] = position .y;
				vertexArray [i4 + 2] = position .z;
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
		},
		updateLine: function ()
		{
			var
				gl               = this .getBrowser () .getContext (),
				particles        = this .particles,
				numParticles     = this .numParticles,
				positionArray    = this .positionArray,
				elapsedTimeArray = this .elapsedTimeArray,
				lifeArray        = this .lifeArray,
				colorArray       = this .colorArray,
				vertexArray      = this .vertexArray,
				sy1_2            = this .particleSize_ .y / 2;

			// Colors

			if (this .colorMaterial)
			{
				for (var i = 0; i < numParticles; ++ i)
				{
					var
						color = particles [i] .color,
						i8    = i * 8;

					colorArray [i8]     = color .x;
					colorArray [i8 + 1] = color .y;
					colorArray [i8 + 2] = color .z;
					colorArray [i8 + 3] = color .w;

					colorArray [i8 + 4] = color .x;
					colorArray [i8 + 5] = color .y;
					colorArray [i8 + 6] = color .z;
					colorArray [i8 + 7] = color .w;
				}

				gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
				gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
			}

			// Vertices

			for (var i = 0; i < numParticles; ++ i)
			{
				var
					particle    = particles [i],
					position    = particle .position,
					elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
					life        = particles [i] .life,
					x           = position .x,
					y           = position .y,
					z           = position .z,
					i2          = i * 2,
					i6          = i * 6,
					i8          = i * 8;

				positionArray [i6]     = x;
				positionArray [i6 + 1] = y;
				positionArray [i6 + 2] = z;
				positionArray [i6 + 3] = x;
				positionArray [i6 + 4] = y;
				positionArray [i6 + 5] = z;

				elapsedTimeArray [i2]     = elapsedTime;
				elapsedTimeArray [i2 + 1] = elapsedTime;

				lifeArray [i2]     = life;
				lifeArray [i2 + 1] = life;

				// Length of line / 2.
				normal .assign (particle .velocity) .normalize () .multiply (sy1_2);

				vertexArray [i8]     = x - normal .x;
				vertexArray [i8 + 1] = y - normal .y;
				vertexArray [i8 + 2] = z - normal .z;

				vertexArray [i8 + 4] = x + normal .x;
				vertexArray [i8 + 5] = y + normal .y;
				vertexArray [i8 + 6] = z + normal .z;
			}

			gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
		},
		updateQuad: function (modelViewMatrix)
		{
			try
			{
				var
					gl               = this .getBrowser () .getContext (),
					particles        = this .particles,
					maxParticles     = this .maxParticles,
				   numParticles     = this .numParticles,
					positionArray    = this .positionArray,
					elapsedTimeArray = this .elapsedTimeArray,
					lifeArray        = this .lifeArray,
					colorArray       = this .colorArray,
					texCoordArray    = this .texCoordArray,
					normalArray      = this .normalArray,
					vertexArray      = this .vertexArray,
					sx1_2            = this .particleSize_ .x / 2,
					sy1_2            = this .particleSize_ .y / 2;

				// Sort particles

//				if (this .sortParticles) // always false
//				{
//					for (var i = 0; i < numParticles; ++ i)
//					{
//						var particle = particles [i];
//						particle .distance = modelViewMatrix .getDepth (particle .position);
//					}
//
//					// Expensisive function!!!
//					this .particleSorter .sort (0, numParticles);
//				}

				// Colors

				if (! modelViewMatrix) // if called from animateParticles
				{
					if (this .colorMaterial)
					{
						for (var i = 0; i < maxParticles; ++ i)
						{
							var
								color = particles [i] .color,
								i24   = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							// p1, p2, p3; p1, p3, p4
							colorArray [i24]     = colorArray [i24 + 4] = colorArray [i24 + 8]  = colorArray [i24 + 12] = colorArray [i24 + 16] = colorArray [i24 + 20] = color .x;
							colorArray [i24 + 1] = colorArray [i24 + 5] = colorArray [i24 + 9]  = colorArray [i24 + 13] = colorArray [i24 + 17] = colorArray [i24 + 21] = color .y;
							colorArray [i24 + 2] = colorArray [i24 + 6] = colorArray [i24 + 10] = colorArray [i24 + 14] = colorArray [i24 + 18] = colorArray [i24 + 22] = color .z;
							colorArray [i24 + 3] = colorArray [i24 + 7] = colorArray [i24 + 11] = colorArray [i24 + 15] = colorArray [i24 + 19] = colorArray [i24 + 23] = color .w;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .colorArray, gl .STATIC_DRAW);
					}

					if (this .texCoordAnim && this .texCoordArray .length)
					{
						var
							texCoordKeys = this .texCoordKeys,
							texCoordRamp = this .texCoordRamp;

						var
							length = texCoordKeys .length,
							index0 = 0;

						for (var i = 0; i < maxParticles; ++ i)
						{
							// Determine index0.

							var
								particle = particles [i],
								fraction = particle .elapsedTime / particle .lifetime;

							if (length == 1 || fraction <= texCoordKeys [0])
							{
								index0 = 0;
							}
							else if (fraction >= texCoordKeys [length - 1])
							{
								index0 = length - 2;
							}
							else
							{
								var index = Algorithm .upperBound (texCoordKeys, 0, length, fraction, Algorithm .less);

								if (index < length)
									index0 = index - 1;
								else
									index0 = 0;
							}

							// Set texCoord.

							index0 *= this .texCoordCount;

							var
								texCoord1 = texCoordRamp [index0],
								texCoord2 = texCoordRamp [index0 + 1],
								texCoord3 = texCoordRamp [index0 + 2],
								texCoord4 = texCoordRamp [index0 + 3],
								i24 = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							// p1
							texCoordArray [i24]     = texCoordArray [i24 + 12] = texCoord1 .x;
							texCoordArray [i24 + 1] = texCoordArray [i24 + 13] = texCoord1 .y;
							texCoordArray [i24 + 2] = texCoordArray [i24 + 14] = texCoord1 .z;
							texCoordArray [i24 + 3] = texCoordArray [i24 + 15] = texCoord1 .w;

							// p2
							texCoordArray [i24 + 4] = texCoord2 .x;
							texCoordArray [i24 + 5] = texCoord2 .y;
							texCoordArray [i24 + 6] = texCoord2 .z;
							texCoordArray [i24 + 7] = texCoord2 .w;

							// p3
							texCoordArray [i24 + 8]  = texCoordArray [i24 + 16] = texCoord3 .x;
							texCoordArray [i24 + 9]  = texCoordArray [i24 + 17] = texCoord3 .y;
							texCoordArray [i24 + 10] = texCoordArray [i24 + 18] = texCoord3 .z;
							texCoordArray [i24 + 11] = texCoordArray [i24 + 19] = texCoord3 .w;

							// p4
							texCoordArray [i24 + 20] = texCoord4 .x;
							texCoordArray [i24 + 21] = texCoord4 .y;
							texCoordArray [i24 + 22] = texCoord4 .z;
							texCoordArray [i24 + 23] = texCoord4 .w;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [0]);
						gl .bufferData (gl .ARRAY_BUFFER, this .texCoordArray, gl .STATIC_DRAW);
					}
				}

				// Vertices

				if (this .geometryType === SPRITE)
				{
					if (modelViewMatrix) // if called from depth or draw
					{
						// Normals

						var rotation = this .getScreenAlignedRotation (modelViewMatrix);

						normal
							.set (rotation [0], rotation [1], rotation [2])
							.cross (vector .set (rotation [3], rotation [4], rotation [5]))
							.normalize ();

						var
							nx = normal .x,
							ny = normal .y,
							nz = normal .z;

						for (var i = 0, length = 6 * 3 * maxParticles; i < length; i += 3)
						{
							normalArray [i]     = nx;
							normalArray [i + 1] = ny;
							normalArray [i + 2] = nz;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .normalArray, gl .STATIC_DRAW);

						// Vertices

						s1 .set (-sx1_2, -sy1_2, 0);
						s2 .set ( sx1_2, -sy1_2, 0);
						s3 .set ( sx1_2,  sy1_2, 0);
						s4 .set (-sx1_2,  sy1_2, 0);

						rotation .multVecMatrix (s1);
						rotation .multVecMatrix (s2);
						rotation .multVecMatrix (s3);
						rotation .multVecMatrix (s4);

						for (var i = 0; i < numParticles; ++ i)
						{
							var
								position    = particles [i] .position,
								elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
								x           = position .x,
								y           = position .y,
								z           = position .z,
								i6          = i * 6,
								i18         = i * 18,
								i24         = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2


							positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
							positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
							positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

							elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
							lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

							// p1
							vertexArray [i24]     = vertexArray [i24 + 12] = x + s1 .x;
							vertexArray [i24 + 1] = vertexArray [i24 + 13] = y + s1 .y;
							vertexArray [i24 + 2] = vertexArray [i24 + 14] = z + s1 .z;

							// p2
							vertexArray [i24 + 4] = x + s2 .x;
							vertexArray [i24 + 5] = y + s2 .y;
							vertexArray [i24 + 6] = z + s2 .z;

							// p3
							vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + s3 .x;
							vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + s3 .y;
							vertexArray [i24 + 10] = vertexArray [i24 + 18] = z + s3 .z;

							// p4
							vertexArray [i24 + 20] = x + s4 .x;
							vertexArray [i24 + 21] = y + s4 .y;
							vertexArray [i24 + 22] = z + s4 .z;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
					}
				}
				else
				{
					if (! modelViewMatrix) // if called from animateParticles
					{
						for (var i = 0; i < numParticles; ++ i)
						{
							var
								position    = particles [i] .position,
								elapsedTime = particles [i] .elapsedTime / particles [i] .lifetime,
								x           = position .x,
								y           = position .y,
								z           = position .z,
								i6          = i * 6,
								i18         = i * 18,
								i24         = i * 24;

							// p4 ------ p3
							// |       / |
							// |     /   |
							// |   /     |
							// | /       |
							// p1 ------ p2

							positionArray [i18]     = positionArray [i18 + 3] = positionArray [i18 + 6] = positionArray [i18 +  9] = positionArray [i18 + 12] = positionArray [i18 + 15] = x;
							positionArray [i18 + 1] = positionArray [i18 + 4] = positionArray [i18 + 7] = positionArray [i18 + 10] = positionArray [i18 + 13] = positionArray [i18 + 16] = y;
							positionArray [i18 + 2] = positionArray [i18 + 5] = positionArray [i18 + 8] = positionArray [i18 + 11] = positionArray [i18 + 14] = positionArray [i18 + 17] = z;

							elapsedTimeArray [i6] = elapsedTimeArray [i6 + 1] = elapsedTimeArray [i6 + 2] = elapsedTimeArray [i6 + 3] = elapsedTimeArray [i6 + 4] = elapsedTimeArray [i6 + 5] = elapsedTime;
							lifeArray [i6]        = lifeArray [i6 + 1]        = lifeArray [i6 + 2]        = lifeArray [i6 + 3]        = lifeArray [i6 + 4]        = lifeArray [i6 + 5]        = particles [i] .life;

							// p1
							vertexArray [i24]     = vertexArray [i24 + 12] = x - sx1_2;
							vertexArray [i24 + 1] = vertexArray [i24 + 13] = y - sy1_2;
							vertexArray [i24 + 2] = vertexArray [i24 + 14] = z;

							// p2
							vertexArray [i24 + 4] = x + sx1_2;
							vertexArray [i24 + 5] = y - sy1_2;
							vertexArray [i24 + 6] = z;

							// p3
							vertexArray [i24 + 8]  = vertexArray [i24 + 16] = x + sx1_2;
							vertexArray [i24 + 9]  = vertexArray [i24 + 17] = y + sy1_2;
							vertexArray [i24 + 10] = vertexArray [i24 + 18] = z;

							// p4
							vertexArray [i24 + 20] = x - sx1_2;
							vertexArray [i24 + 21] = y + sy1_2;
							vertexArray [i24 + 22] = z;
						}

						gl .bindBuffer (gl .ARRAY_BUFFER, this .positionBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .positionArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .elapsedTimeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .elapsedTimeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .lifeBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .lifeArray, gl .STATIC_DRAW);
						gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
						gl .bufferData (gl .ARRAY_BUFFER, this .vertexArray, gl .STATIC_DRAW);
					}
				}
			}
			catch (error)
			{
				console .log (error);
			}
		},
		traverse: function (type, renderObject)
		{
			if (! this .isActive_ .getValue ())
				return;

			switch (type)
			{
				case TraverseType .POINTER:
				{
					break;
				}
				case TraverseType .PICKING:
				{
					break;
				}
				case TraverseType .COLLISION:
				{
					// TODO: to be implemented.
					break;
				}
				case TraverseType .DEPTH:
				{
					renderObject .addDepthShape (this);
					break;
				}
				case TraverseType .DISPLAY:
				{
					if (renderObject .addDisplayShape (this))
						this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

					break;
				}
			}

			if (this .geometryType === GEOMETRY)
			{
				if (this .getGeometry ())
					this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
			}
		},
		depth: function (gl, context, shaderNode)
		{
			// Update geometry if SPRITE.

			this .updateGeometry (context .modelViewMatrix);

			// Display geometry.

			if (this .geometryType === GEOMETRY)
			{
				var geometryNode = this .getGeometry ();

				if (geometryNode)
					geometryNode .displayParticlesDepth (gl, context, shaderNode, this .particles, this .numParticles);
			}
			else
			{
				if (this .numParticles <= 0)
					return;

				if (shaderNode .getValid ())
				{
					// Setup vertex attributes.

					shaderNode .enableFloatAttrib (gl, "x3d_ParticleId",          this .idBuffer,          1);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticlePosition",    this .positionBuffer,    3);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticleElapsedTime", this .elapsedTimeBuffer, 1);
					shaderNode .enableFloatAttrib (gl, "x3d_ParticleLife",        this .lifeBuffer,        1);
					shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

					gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);

					shaderNode .disableFloatAttrib (gl, "x3d_ParticleId");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticlePosition");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticleElapsedTime");
					shaderNode .disableFloatAttrib (gl, "x3d_ParticleLife");
				}
			}
		},
		display: function (gl, context)
		{
			try
			{
				if (this .numParticles <= 0)
					return;

				// Traverse appearance before everything.

				this .getAppearance () .enable (gl, context, this .shaderGeometryType);

				// Update geometry if SPRITE.

				this .updateGeometry (context .modelViewMatrix);

				// Display geometry.

				if (this .geometryType === GEOMETRY)
				{
					var geometryNode = this .getGeometry ();

					if (geometryNode)
						geometryNode .displayParticles (gl, context, this .particles, this .numParticles);
				}
				else
				{
					var
						browser    = context .browser,
						shaderNode = context .shaderNode;

					if (! shaderNode .getCustom ())
						shaderNode = this .shaderNode;

					// Setup shader.

					if (shaderNode .getValid ())
					{
						context .geometryType          = this .shaderGeometryType;
						context .colorMaterial         = this .colorMaterial;
						context .textureCoordinateNode = browser .getDefaultTextureCoordinate ();

						shaderNode .enable (gl);
						shaderNode .setLocalUniforms (gl, context);

						// Setup vertex attributes.

						shaderNode .enableFloatAttrib (gl, "x3d_ParticleId",          this .idBuffer,          1);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticlePosition",    this .positionBuffer,    3);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticleElapsedTime", this .elapsedTimeBuffer, 1);
						shaderNode .enableFloatAttrib (gl, "x3d_ParticleLife",        this .lifeBuffer,        1);

						if (this .colorMaterial)
							shaderNode .enableColorAttribute (gl, this .colorBuffer);

						if (this .texCoordArray .length)
							shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);

						if (this .normalArray .length)
							shaderNode .enableNormalAttribute (gl, this .normalBuffer);

						shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

						var testWireframe = false;

						switch (this .geometryType)
						{
							case POINT:
							case LINE:
								break;
							case TRIANGLE:
							case QUAD:
							case SPRITE:
								testWireframe = true;
								break;
							case GEOMETRY:
								break;
						}

						if (shaderNode .wireframe && testWireframe)
						{
							// Wireframes are always solid so only one drawing call is needed.

							for (var i = 0, length = this .numParticles * this .vertexCount; i < length; i += 3)
								gl .drawArrays (shaderNode .primitiveMode, i, 3);
						}
						else
						{
							var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

							gl .frontFace (positiveScale ? gl .CCW : gl .CW);
							gl .enable (gl .CULL_FACE);
							gl .cullFace (gl .BACK);

							gl .drawArrays (this .primitiveMode, 0, this .numParticles * this .vertexCount);
						}

						shaderNode .disableFloatAttrib (gl, "x3d_ParticleId");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticlePosition");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticleElapsedTime");
						shaderNode .disableFloatAttrib (gl, "x3d_ParticleLife");

						shaderNode .disableColorAttribute    (gl);
						shaderNode .disableTexCoordAttribute (gl);
						shaderNode .disableNormalAttribute   (gl);
						shaderNode .disable                  (gl);
					}
				}

				this .getAppearance () .disable (gl, context);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		getScreenAlignedRotation: function (modelViewMatrix)
		{
			invModelViewMatrix .assign (modelViewMatrix) .inverse ();

			invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .zAxis));
			invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis));

			x .assign (viewerYAxis) .cross (billboardToScreen);
			y .assign (billboardToScreen) .cross (x);
			var z = billboardToScreen;

			// Compose rotation

			x .normalize ();
			y .normalize ();
			z .normalize ();

			return this .rotation .set (x .x, x .y, x .z,
			                            y .x, y .y, y .z,
			                            z .x, z .y, z .z);
		},
	});

	return ParticleSystem;
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


define ('x_ite/Components/ParticleSystems/PolylineEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Components/Rendering/IndexedLineSet",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedLineSet,
          X3DConstants,
          Vector3,
          Algorithm)
{
"use strict";

	function PolylineEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .PolylineEmitter);

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .direction        = new Vector3 (0, 0, 0);
		this .polylineNode     = new IndexedLineSet (executionContext);
		this .polylines        = [ ];
		this .lengthSoFarArray = [ 0 ];
	}

	PolylineEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: PolylineEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",  new Fields .MFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "PolylineEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .direction_ .addInterest ("set_direction__", this);

			this .coordIndex_ .addFieldInterest (this .polylineNode .coordIndex_);
			this .coord_      .addFieldInterest (this .polylineNode .coord_);
		
			this .polylineNode .coordIndex_ = this .coordIndex_;
			this .polylineNode .coord_      = this .coord_;

			this .polylineNode .rebuild_ .addInterest ("set_polyline", this);
			this .polylineNode .setPrivate (true);
			this .polylineNode .setup ();

			this .set_direction__ ();
			this .set_polyline ();
		},
		set_direction__: function ()
		{
			this .direction .assign (this .direction_ .getValue ()) .normalize ();

			if (this .direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_polyline: (function ()
		{
			var
				vertex1 = new Vector3 (0, 0, 0),
				vertex2 = new Vector3 (0, 0, 0);

			return function ()
			{
				var vertices = this .vertices = this .polylineNode .getVertices () .getValue ();
	
				if (vertices .length)
				{
					delete this .getRandomPosition;
	
					var
						lengthSoFar      = 0,
						lengthSoFarArray = this .lengthSoFarArray;
			
					lengthSoFarArray .length = 1;
	
					for (var i = 0, length = vertices .length; i < length; i += 8)
					{
						vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
						vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
	
						lengthSoFar += vertex2 .subtract (vertex1) .abs ();
						lengthSoFarArray .push (lengthSoFar);
					}
				}
				else
				{
					this .getRandomPosition = getPosition;
				}
			};
		})(),
		getRandomPosition: function (position)
		{
			// Determine index0 and weight.

			var
				lengthSoFarArray = this .lengthSoFarArray,
				length           = lengthSoFarArray .length,
				fraction         = Math .random () * lengthSoFarArray [length - 1],
				index0           = 0,
				index1           = 0,
				weight           = 0;

			if (length == 1 || fraction <= lengthSoFarArray [0])
			{
				index0 = 0;
				weight = 0;
			}
			else if (fraction >= lengthSoFarArray [length - 1])
			{
				index0 = length - 2;
				weight = 1;
			}
			else
			{
				var index = Algorithm .upperBound (lengthSoFarArray, 0, length, fraction, Algorithm .less);

				if (index < length)
				{
					index1 = index;
					index0 = index - 1;
			
					var
						key0 = lengthSoFarArray [index0],
						key1 = lengthSoFarArray [index1];
			
					weight = Algorithm .clamp ((fraction - key0) / (key1 - key0), 0, 1);
				}
				else
				{
					index0 = 0;
					weight = 0;
				}
			}

			// Interpolate and set position.

			index0 *= 8;
			index1  = index0 + 4;

			var
				vertices = this .vertices,
				x1       = vertices [index0],
				y1       = vertices [index0 + 1],
				z1       = vertices [index0 + 2],
				x2       = vertices [index1],
				y2       = vertices [index1 + 1],
				z2       = vertices [index1 + 2];

			position .x = x1 + weight * (x2 - x1);
			position .y = y1 + weight * (y2 - y1);
			position .z = z1 + weight * (z2 - z1);

			return position;
		},
		getRandomVelocity: function (velocity)
		{
			var
				direction = this .direction,
				speed     = this .getRandomSpeed ();

			velocity .x = direction .x * speed;
			velocity .y = direction .y * speed;
			velocity .z = direction .z * speed;

			return velocity;
 		},
	});

	function getPosition (position)
	{
		return position .set (0, 0, 0);
	}

	return PolylineEmitter;
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


define ('x_ite/Components/ParticleSystems/SurfaceEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode, 
          X3DConstants,
          X3DCast,
          Triangle3,
          Vector3,
          Algorithm)
{
"use strict";

	function SurfaceEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .SurfaceEmitter);

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .surfaceNode    = null;
		this .areaSoFarArray = [ 0 ];
		this .direction      = new Vector3 (0, 0, 0);
	}

	SurfaceEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: SurfaceEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surface",     new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "SurfaceEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .surface_ .addInterest ("set_surface__", this);

			this .set_surface__ ();
		},
		set_surface__: function ()
		{
			if (this .surfaceNode)
				this .surfaceNode .rebuild_ .removeInterest ("set_geometry__", this);

			this .surfaceNode = X3DCast (X3DConstants .X3DGeometryNode, this .surface_);

			if (this .surfaceNode)
				this .surfaceNode .rebuild_ .addInterest ("set_geometry__", this);

			this .set_geometry__ ();
		},
		set_geometry__: (function ()
		{
			var
				vertex1  = new Vector3 (0, 0, 0),
				vertex2  = new Vector3 (0, 0, 0),
				vertex3  = new Vector3 (0, 0, 0);

			return function ()
			{
				if (this .surfaceNode)
				{		
					delete this .getRandomPosition;
					delete this .getRandomVelocity;
	
					var
						areaSoFar      = 0,
						areaSoFarArray = this .areaSoFarArray,
						vertices       = this .surfaceNode .getVertices () .getValue ();
			
					this .normals  = this .surfaceNode .getNormals () .getValue ();
					this .vertices = vertices;
	
					areaSoFarArray .length = 1;
	
					for (var i = 0, length = vertices .length; i < length; i += 12)
					{
						vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
						vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
						vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);
	
						areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
						areaSoFarArray .push (areaSoFar);
					}
				}
				else
				{
					this .getRandomPosition = getPosition;
					this .getRandomVelocity = this .getSphericalRandomVelocity;
				}
			};
		})(),
		getRandomPosition: function (position)
		{
			// Determine index0.

			var
				areaSoFarArray = this .areaSoFarArray,
				length         = areaSoFarArray .length,
				fraction       = Math .random () * areaSoFarArray [length - 1],
				index0         = 0;

			if (length == 1 || fraction <= areaSoFarArray [0])
			{
				index0 = 0;
			}
			else if (fraction >= areaSoFarArray [length - 1])
			{
				index0 = length - 2;
			}
			else
			{
				var index = Algorithm .upperBound (areaSoFarArray, 0, length, fraction, Algorithm .less);

				if (index < length)
				{
					index0 = index - 1;
				}
				else
				{
					index0 = 0;
				}
			}

			// Random barycentric coordinates.

			var
				u = Math .random (),
				v = Math .random ();
		
			if (u + v > 1)
			{
				u = 1 - u;
				v = 1 - v;
			}

			var t = 1 - u - v;

			// Interpolate and set position.

			var
				i        = index0 * 12,
				vertices = this .vertices;

			position .x = u * vertices [i]     + v * vertices [i + 4] + t * vertices [i + 8];
			position .y = u * vertices [i + 1] + v * vertices [i + 5] + t * vertices [i + 9];
			position .z = u * vertices [i + 2] + v * vertices [i + 6] + t * vertices [i + 10];

			var
				i         = index0 * 9,
				normals   = this .normals,
				direction = this .direction;

			direction .x = u * normals [i]     + v * normals [i + 3] + t * normals [i + 6];
			direction .y = u * normals [i + 1] + v * normals [i + 4] + t * normals [i + 7];
			direction .z = u * normals [i + 2] + v * normals [i + 5] + t * normals [i + 8];

			return position;
		},
		getRandomVelocity: function (velocity)
		{
			var
				speed     = this .getRandomSpeed (),
				direction = this .direction;

			velocity .x = direction .x * speed;
			velocity .y = direction .y * speed;
			velocity .z = direction .z * speed;

			return velocity;
 		},
	});

	function getPosition (position)
	{
		return position .set (0, 0, 0);
	}

	return SurfaceEmitter;
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


define ('x_ite/Components/ParticleSystems/VolumeEmitter',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Components/Geometry3D/IndexedFaceSet",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Algorithm",
	"standard/Math/Utility/BVH",
	"standard/Math/Algorithms/QuickSort",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedFaceSet,
          X3DConstants,
          Vector3,
          Rotation4,
          Line3,
          Plane3,
          Triangle3,
          Algorithm,
          BVH,
          QuickSort)
{
"use strict";

	function VolumeEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .VolumeEmitter);

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .direction      = new Vector3 (0, 0, 0);
		this .volumeNode     = new IndexedFaceSet (executionContext);
		this .areaSoFarArray = [ 0 ];
	}

	VolumeEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: VolumeEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "internal",    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",  new Fields .MFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "VolumeEmitter";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "emitter";
		},
		initialize: function ()
		{
			X3DParticleEmitterNode .prototype .initialize .call (this);

			this .direction_ .addInterest ("set_direction__", this);

			this .coordIndex_ .addFieldInterest (this .volumeNode .coordIndex_);
			this .coord_      .addFieldInterest (this .volumeNode .coord_);
	
			this .volumeNode .creaseAngle_ = Math .PI;
			this .volumeNode .convex_      = false;
			this .volumeNode .coordIndex_  = this .coordIndex_;
			this .volumeNode .coord_       = this .coord_;

			this .volumeNode .rebuild_ .addInterest ("set_geometry__", this);
			this .volumeNode .setPrivate (true);
			this .volumeNode .setup ();

			this .set_direction__ ();
			this .set_geometry__ ();
		},
		set_direction__: function ()
		{
			this .direction .assign (this .direction_ .getValue ()) .normalize ();

			if (this .direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_geometry__: (function ()
		{
			var
				vertex1 = new Vector3 (0, 0, 0),
				vertex2 = new Vector3 (0, 0, 0),
				vertex3 = new Vector3 (0, 0, 0);

			return function ()
			{
				var
					areaSoFar      = 0,
					areaSoFarArray = this .areaSoFarArray,
					normals        = this .volumeNode .getNormals () .getValue (),
					vertices       = this .volumeNode .getVertices () .getValue ();
	
				this .normals  = normals;
				this .vertices = vertices;
	
				areaSoFarArray .length = 1;
	
				for (var i = 0, length = vertices .length; i < length; i += 12)
				{
					vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
					vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
					vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);
	
					areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
					areaSoFarArray .push (areaSoFar);
				}
	
				this .bvh = new BVH (vertices, normals);
			};
		})(),
		getRandomPosition: (function ()
		{
			var
				point         = new Vector3 (0, 0, 0),
				normal        = new Vector3 (0, 0, 0),
				rotation      = new Rotation4 (0, 0, 1, 0),
				line          = new Line3 (Vector3 .Zero, Vector3 .zAxis),
				plane         = new Plane3 (Vector3 .Zero, Vector3 .zAxis),
				intersections = [ ],
				sorter        = new QuickSort (intersections, PlaneCompare);

			function PlaneCompare (a, b)
			{
				return plane .getDistanceToPoint (a) < plane .getDistanceToPoint (b);
			}

			return function (position)
			{
				// Get random point on surface
	
				// Determine index0.
	
				var
					areaSoFarArray = this .areaSoFarArray,
					length         = areaSoFarArray .length,
					fraction       = Math .random () * areaSoFarArray [length - 1],
					index0         = 0;
	
				if (length == 1 || fraction <= areaSoFarArray [0])
				{
					index0 = 0;
				}
				else if (fraction >= areaSoFarArray [length - 1])
				{
					index0 = length - 2;
				}
				else
				{
					var index = Algorithm .upperBound (areaSoFarArray, 0, length, fraction, Algorithm .less);
	
					if (index < length)
					{
						index0 = index - 1;
					}
					else
					{
						index0 = 0;
					}
				}
	
				// Random barycentric coordinates.
	
				var
					u = Math .random (),
					v = Math .random ();
			
				if (u + v > 1)
				{
					u = 1 - u;
					v = 1 - v;
				}
	
				var t = 1 - u - v;
	
				// Interpolate and determine random point on surface and normal.
	
				var
					i        = index0 * 12,
					vertices = this .vertices;
	
				point .x = u * vertices [i]     + v * vertices [i + 4] + t * vertices [i + 8];
				point .y = u * vertices [i + 1] + v * vertices [i + 5] + t * vertices [i + 9];
				point .z = u * vertices [i + 2] + v * vertices [i + 6] + t * vertices [i + 10];
	
				var
					i       = index0 * 9,
					normals = this .normals;
	
				normal .x = u * normals [i]     + v * normals [i + 3] + t * normals [i + 6];
				normal .y = u * normals [i + 1] + v * normals [i + 4] + t * normals [i + 7];
				normal .z = u * normals [i + 2] + v * normals [i + 5] + t * normals [i + 8];
	
				rotation .setFromToVec (Vector3 .zAxis, normal);
				rotation .multVecRot (this .getRandomSurfaceNormal (normal));
	
				// Setup random line throu volume for intersection text
				// and a plane corresponding to the line for intersection sorting.
	
				line  .set (point, normal);
				plane .set (point, normal);
		
				// Find random point in volume.
	
				var numIntersections = this .bvh .intersectsLine (line, intersections);
	
				numIntersections -= numIntersections % 2; // We need an even count of intersections.
	
				if (numIntersections)
				{
					// Sort intersections along line with a little help from the plane.
	
					sorter .sort (0, numIntersections);
	
					// Select random intersection pair.
	
					var
						index  = Math .round (this .getRandomValue (0, numIntersections / 2 - 1)) * 2,
						point0 = intersections [index],
						point1 = intersections [index + 1],
						t      = Math .random ();
		
					// lerp
					position .x = point0 .x + (point1 .x - point0 .x) * t;
					position .y = point0 .y + (point1 .y - point0 .y) * t;
					position .z = point0 .z + (point1 .z - point0 .z) * t;
		
					return position;
				}
	
				// Discard point.
	
				return position .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
			};
		})(),
		getRandomVelocity: function (velocity)
		{
			var
				direction = this .direction,
				speed     = this .getRandomSpeed ();

			velocity .x = direction .x * speed;
			velocity .y = direction .y * speed;
			velocity .z = direction .z * speed;

			return velocity;
 		},
	});

	return VolumeEmitter;
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


define ('x_ite/Components/ParticleSystems/WindPhysicsModel',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticlePhysicsModelNode, 
          X3DConstants,
          Vector3,
          Algorithm)
{
"use strict";

	function WindPhysicsModel (executionContext)
	{
		X3DParticlePhysicsModelNode .call (this, executionContext);

		this .addType (X3DConstants .WindPhysicsModel);

		this .speed_ .setUnit ("speed");
	}

	WindPhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
	{
		constructor: WindPhysicsModel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "direction",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "speed",      new Fields .SFFloat (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "gustiness",  new Fields .SFFloat (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "turbulence", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "WindPhysicsModel";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "physics";
		},
		getRandomSpeed: function (emitterNode)
		{
			var
				speed     = Math .max (0, this .speed_ .getValue ()),
				variation = speed * Math .max (0, this .gustiness_ .getValue ());
		
			return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
		},
		addForce: (function ()
		{
			var force = new Vector3 (0, 0, 0);

			return function (i, emitterNode, forces, turbulences)
			{
				var surfaceArea = emitterNode .surfaceArea_ .getValue ()
	
				if (this .enabled_ .getValue ())
				{
					var
						randomSpeed = this .getRandomSpeed (emitterNode),
						pressure    = Math .pow (10, 2 * Math .log (randomSpeed)) * 0.64615;
			
					if (this .direction_ .getValue () .equals (Vector3 .Zero))
						emitterNode .getRandomNormal (force);
					else
						force .assign (this .direction_ .getValue ()) .normalize ();
	
					forces [i] .assign (force .multiply (surfaceArea * pressure));
					turbulences [i] = Math .PI * Algorithm .clamp (this .turbulence_ .getValue (), 0, 1);
				}
			};
		})(),
	});

	return WindPhysicsModel;
});



/*******************************************************************************
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


define ([
	"x_ite/Components",
	"x_ite/Browser/ParticleSystems/X3DParticleSystemsContext",
	"x_ite/Components/ParticleSystems/BoundedPhysicsModel",
	"x_ite/Components/ParticleSystems/ConeEmitter",
	"x_ite/Components/ParticleSystems/ExplosionEmitter",
	"x_ite/Components/ParticleSystems/ForcePhysicsModel",
	"x_ite/Components/ParticleSystems/ParticleSystem",
	"x_ite/Components/ParticleSystems/PointEmitter",
	"x_ite/Components/ParticleSystems/PolylineEmitter",
	"x_ite/Components/ParticleSystems/SurfaceEmitter",
	"x_ite/Components/ParticleSystems/VolumeEmitter",
	"x_ite/Components/ParticleSystems/WindPhysicsModel",
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
],
function (Components,
          X3DParticleSystemsContext,
          BoundedPhysicsModel,
          ConeEmitter,
          ExplosionEmitter,
          ForcePhysicsModel,
          ParticleSystem,
          PointEmitter,
          PolylineEmitter,
          SurfaceEmitter,
          VolumeEmitter,
          WindPhysicsModel,
          X3DParticleEmitterNode,
          X3DParticlePhysicsModelNode)
{
"use strict";

	Components .addComponent ({
		name: "ParticleSystems",
		types:
		{
			BoundedPhysicsModel: BoundedPhysicsModel,
			ConeEmitter:         ConeEmitter,
			ExplosionEmitter:    ExplosionEmitter,
			ForcePhysicsModel:   ForcePhysicsModel,
			ParticleSystem:      ParticleSystem,
			PointEmitter:        PointEmitter,
			PolylineEmitter:     PolylineEmitter,
			SurfaceEmitter:      SurfaceEmitter,
			VolumeEmitter:       VolumeEmitter,
			WindPhysicsModel:    WindPhysicsModel,
		},
		abstractTypes:
		{
			X3DParticleEmitterNode:      X3DParticleEmitterNode,
			X3DParticlePhysicsModelNode: X3DParticlePhysicsModelNode,
		},
		browser: X3DParticleSystemsContext,
	});
});



}());
