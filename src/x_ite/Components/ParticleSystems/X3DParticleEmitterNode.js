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


define ([
   "x_ite/Components/Core/X3DNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Geometry/Line3",
   "standard/Math/Geometry/Plane3",
   "standard/Math/Algorithm",
   "gpu",
],
function (X3DNode,
          X3DConstants,
          Vector3,
          Rotation4,
          Line3,
          Plane3,
          Algorithm,
          gpu)
{
"use strict";

   const
      normal       = new Vector3 (0, 0, 0),
      fromPosition = new Vector3 (0, 0, 0),
      line         = new Line3 (Vector3 .Zero, Vector3 .zAxis),
      plane        = new Plane3 (Vector3 .Zero, Vector3 .zAxis);

   function X3DParticleEmitterNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DParticleEmitterNode);

      this ._speed       .setUnit ("speed");
      this ._mass        .setUnit ("mass");
      this ._surfaceArea .setUnit ("area");

      this .constants = { array: [0, 0, 0] };
      this .kernel    = [ ];
      this .i         = 0;
      this .output    = [0];
   }

   X3DParticleEmitterNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DParticleEmitterNode,
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         this ._speed     .addInterest ("set_speed__",     this);
         this ._variation .addInterest ("set_variation__", this);
         this ._mass      .addInterest ("set_mass__",      this);

         this .kernel [0] = this .createKernel ();
         this .kernel [1] = this .createKernel ();

         this .set_speed__ ();
         this .set_variation__ ();
         this .set_mass__ ();
      },
      isExplosive: function ()
      {
         return false;
      },
      getMass: function ()
      {
         return this .mass;
      },
      set_speed__: function ()
      {
         this .setConstant ("speed", this ._speed .getValue ());
      },
      set_variation__: function ()
      {
         this .setConstant ("variation", this ._variation .getValue ());
      },
      set_mass__: function ()
      {
         this .mass = this ._mass .getValue ();

         this .setConstant ("mass", this ._mass .getValue ());
      },
      getRandomValue: function (min, max)
      {
         return Math .random () * (max - min) + min;
      },
      getRandomNormalWithAngle: function (angle, normal)
      {
         const
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
         const
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
         const
            particles         = particleSystem .particles,
            maxParticles      = particleSystem .maxParticles,
            numParticles      = Math .max (1, particleSystem .numParticles),
            particleLifetime  = particleSystem .particleLifetime,
            lifetimeVariation = particleSystem .lifetimeVariation,
            createParticles   = particleSystem .createParticles,
            forces            = particleSystem .forces,            // resulting velocities from forces
            turbulences       = particleSystem .turbulences,       // turbulences
            numForces         = particleSystem .numForces,         // number of forces
            boundedPhysics    = !! particleSystem .boundedVertices .length,
            boundedVolume     = particleSystem .boundedVolume;

         this .i          = (this .i + 1) % 2;
         this .output [0] = maxParticles;

         const result = this .kernel [this .i]
            .setOutput (this .output) (particles .times,
                                       particles .velocities,
                                       particles .positions,
                                       numParticles,
                                       particleLifetime,
                                       lifetimeVariation,
                                       createParticles,
                                       numForces,
                                       forces,
                                       turbulences,
                                       boundedPhysics,
                                       deltaTime);

         particles .times      = result .times;
         particles .velocities = result .velocities;
         particles .positions  = result .positions;
         return;

         for (let i = rotations .length; i < numForces; ++ i)
            rotations [i] = new Rotation4 (0, 0, 1, 0);

         for (let i = 0; i < numForces; ++ i)
            rotations [i] .setFromToVec (Vector3 .zAxis, velocities [i]);

         for (let i = 0; i < numParticles; ++ i)
         {
            const
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

               const
                  position = particle .position,
                  velocity = particle .velocity;

               for (let f = 0; f < numForces; ++ f)
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

         if (particleSystem .geometryContext .colorMaterial)
            this .getColors (particles, particleSystem .colorKeys, particleSystem .colorRamp, numParticles);
      },
      bounce: function (boundedVolume, fromPosition, toPosition, velocity)
      {
         normal .assign (velocity) .normalize ();

         line .set (fromPosition, normal);

         const
            intersections       = this .intersections,
            intersectionNormals = this .intersectionNormals,
            numIntersections    = boundedVolume .intersectsLine (line, intersections, intersectionNormals);

         if (numIntersections)
         {
            for (let i = 0; i < numIntersections; ++ i)
               intersections [i] .index = i;

            plane .set (fromPosition, normal);

            this .sorter .sort (0, numIntersections);

            const index = Algorithm .upperBound (intersections, 0, numIntersections, 0, PlaneCompareValue);

            if (index < numIntersections)
            {
               const
                  intersection       = intersections [index],
                  intersectionNormal = intersectionNormals [intersection .index];

               plane .set (intersection, intersectionNormal);

               if (plane .getDistanceToPoint (fromPosition) * plane .getDistanceToPoint (toPosition) < 0)
               {
                  const dot2 = 2 * intersectionNormal .dot (velocity);

                  velocity .x -= intersectionNormal .x * dot2;
                  velocity .y -= intersectionNormal .y * dot2;
                  velocity .z -= intersectionNormal .z * dot2;

                  normal .assign (velocity) .normalize ();

                  const distance = intersection .distance (fromPosition);

                  toPosition .x = intersection .x + normal .x * distance;
                  toPosition .y = intersection .y + normal .y * distance;
                  toPosition .z = intersection .z + normal .z * distance;
               }
            }
         }
      },
      getColors: function (particles, colorKeys, colorRamp, numParticles)
      {
         const length = colorKeys .length;

         let
            index0 = 0,
            index1 = 0,
            weight = 0;

         for (let i = 0; i < numParticles; ++ i)
         {
            // Determine index0, index1 and weight.

            const
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
               const index = Algorithm .upperBound (colorKeys, 0, length, fraction, Algorithm .less);

               if (index < length)
               {
                  index1 = index;
                  index0 = index - 1;

                  const
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

            const
               color0 = colorRamp [index0],
               color1 = colorRamp [index1];

            // Algorithm .lerp (color0, color1, weight);
            color .x = color0 .x + weight * (color1 .x - color0 .x);
            color .y = color0 .y + weight * (color1 .y - color0 .y);
            color .z = color0 .z + weight * (color1 .z - color0 .z);
            color .w = color0 .w + weight * (color1 .w - color0 .w);
         }
      },
      createKernel: function ()
      {
         return gpu .createKernelMap ({
            times: function updateTimes (times, numParticles, particleLifetime, lifetimeVariation, createParticles, deltaTime)
            {
               let
                  time        = times [this .thread .x],
                  life        = time [0],
                  lifetime    = time [1],
                  elapsedTime = time [2];

               if (this .thread .x < numParticles)
               {
                  elapsedTime += deltaTime;

                  if (elapsedTime > lifetime)
                  {
                     // Create new particle or hide particle.

                     life       += createParticles ? 1 : 0;
                     lifetime    = getRandomLifetime (particleLifetime, lifetimeVariation);
                     elapsedTime = 0;
                  }
               }

               return [life, lifetime, elapsedTime];
            },
            velocities: function updateVelocities (time, velocities, numParticles, createParticles, boundedPhysics)
            {
               if (this .thread .x < numParticles)
               {
                  const elapsedTime = time [2];

                  if (elapsedTime == 0)
                  {
                     return createParticles ? getRandomVelocity (getRandomSpeed ()) : [0, 0, 0];
                  }
                  else
                  {
                     const velocity = velocities [this .thread .x];

                     return boundedPhysics ? bounce (velocity) : velocity;
                  }
               }
               else
               {
                  return velocities [this .thread .x];
               }
            },
            positions: function updatePositions (time, velocity, positions, numParticles, createParticles, numForces, forces, turbulences, deltaTime)
            {
               if (this .thread .x < numParticles)
               {
                  const elapsedTime = time [2];

                  if (elapsedTime == 0)
                  {
                     return createParticles ? getRandomPosition () : [Infinity, Infinity, Infinity];
                  }
                  else
                  {
                     // Animate particle.

                     for (let i = 0; i < numForces; ++ i)
                     {
                        const
                           force      = [forces [i * 3 + 0], forces [i * 3 + 1], forces [i * 3 + 2]],
                           turbulence = turbulences [i],
                           speed      = lengthV (force),
                           normal     = getRandomNormalWithDirectionAndAngle (force, turbulence);

                        velocity [0] += normal [0] * speed;
                        velocity [1] += normal [1] * speed;
                        velocity [2] += normal [2] * speed;
                     }

                     const position = positions [this .thread .x];

                     position [0] += velocity [0] * deltaTime;
                     position [1] += velocity [1] * deltaTime;
                     position [2] += velocity [2] * deltaTime;

                     return position;
                  }
               }
               else
               {
                  return positions [this .thread .x];
               }
            },
         },
         function (times, velocities, positions, numParticles, particleLifetime, lifetimeVariation, createParticles, numForces, forces, turbulences, boundedPhysics, deltaTime)
         {
            // WORKAROUND: include Math.random()

            const
               time     = updateTimes (times, numParticles, particleLifetime, lifetimeVariation, createParticles, deltaTime),
               velocity = updateVelocities (time, velocities, numParticles, createParticles, boundedPhysics),
               position = updatePositions (time, velocity, positions, numParticles, createParticles, numForces, forces, turbulences, deltaTime);

            return position;
         })
         .setTactic ("precision")
         .addFunction (function lengthV (v)
         {
            return Math .sqrt (v [0] * v [0] + v [1] * v [1] + v [2] * v [2]);
         }, { argumentTypes: { v: 'Array(3)' }, returnType: 'Number' })
         .addFunction (function normalizeV (v)
         {
            const l = lengthV (v);

            return [v [0] / l, v [1] / l, v [2] / l];
         }, { argumentTypes: { v: 'Array(3)' }, returnType: 'Array(3)' })
         .addFunction (function dotV (x, y)
         {
            return x [0] * y [0] + x [1] * y [1] + x [2]  * y [2];
         }, { argumentTypes: { x: 'Array(3)', y: 'Array(3)' }, returnType: 'Number' })
         .addFunction (function crossV (x, y)
         {
            return [x [1] * y [2] - y [1] * x[2],
                    x [2] * y [0] - y [2] * x[0],
                    x [0] * y [1] - y [0] * x[1]];
         }, { argumentTypes: { x: 'Array(3)', y: 'Array(3)' }, returnType: 'Array(3)' })
         .addFunction (function Quaternion (fromVector, toVector)
         {
            const from = normalizeV (fromVector);
            const to   = normalizeV (toVector);

            const cos_angle = dotV (from, to);
            let   crossvec  = crossV (from, to);
            const crosslen  = lengthV (crossvec);

            if (crosslen == 0)
            {
               if (cos_angle > 0)
               {
                  return [0, 0, 0, 1];
               }
               else
               {
                  let t = crossV (from, [1, 0, 0]);

                  if (dot (t, t) == 0)
                     t = crossV (from, [0, 1, 0]);

                  t = normalizeV (t);

                  return [t [0], t [1], t [2], 0];
               }
            }
            else
            {
               const s = Math .sqrt (Math .abs (1 - cos_angle) * 0.5);

               crossvec = normalizeV (crossvec);

               return [crossvec [0] * s,
                       crossvec [1] * s,
                       crossvec [2] * s,
                       Math .sqrt (Math .abs (1 + cos_angle) * 0.5)];
            }
         }, { argumentTypes: { fromVector: 'Array(3)', toVector: 'Array(3)' }, returnType: 'Array(4)' })
         .addFunction (function multVecQuat (vector, quat)
         {
            const
               qx = quat [0], qy = quat [1], qz = quat [2], qw = quat [3],
               vx = vector [0], vy = vector [1], vz = vector [2],
               a  = qw * qw - qx * qx - qy * qy - qz * qz,
               b  = 2 * (vx * qx + vy * qy + vz * qz),
               c  = 2 * qw;

            const
               rx = a * vx + b * qx + c * (qy * vz - qz * vy),
               ry = a * vy + b * qy + c * (qz * vx - qx * vz),
               rz = a * vz + b * qz + c * (qx * vy - qy * vx);

            return [rx, ry, rz];
         }, { argumentTypes: { vector: 'Array(3)', quat: 'Array(4)' }, returnType: 'Array(3)' })
         .addFunction (function getRandomValue (min, max)
         {
            return Math .random () * (max - min) + min;
         })
         .addFunction (function getRandomLifetime (particleLifetime, lifetimeVariation)
         {
            const
               v   = particleLifetime * lifetimeVariation,
               min = Math .max (0, particleLifetime - v),
               max = particleLifetime + v;

            return getRandomValue (min, max);
         })
         .addFunction (function getRandomSpeed ()
         {
            const
               speed = this .constants .speed,
               v     = speed * this .constants .variation,
               min   = Math .max (0, speed - v),
               max   = speed + v;

            return getRandomValue (min, max);
         })
         .addFunction (function getRandomNormal ()
         {
            const
               theta = this .getRandomValue (-1, 1) * Math .PI,
               cphi  = this .getRandomValue (-1, 1),
               phi   = Math .acos (cphi),
               r     = Math .sin (phi);

            return [Math .sin (theta) * r,
                    Math .cos (theta) * r,
                    cphi];
         })
        .addFunction (function getRandomNormalWithAngle (angle)
         {
            const
               theta = this .getRandomValue (-1, 1) * Math .PI,
               cphi  = this .getRandomValue (Math .cos (angle), 1),
               phi   = Math .acos (cphi),
               r     = Math .sin (phi);

            return [Math .sin (theta) * r,
                    Math .cos (theta) * r,
                    cphi];
         })
         .addFunction (function getRandomNormalWithDirectionAndAngle (direction, angle)
         {
            const
               rotation = Quaternion ([0, 0, 1], direction),
               normal   = getRandomNormalWithAngle (angle);

            return multVecQuat (normal, rotation);
         })
         .addFunction (function getRandomSphericalVelocity (speed)
         {
            const normal = getRandomNormal ();

            return [normal [0] * speed,
                    normal [1] * speed,
                    normal [2] * speed];
         })
         .addFunction (function bounce (velocity)
         {
            return velocity;
         })
         .setPipeline (true)
         .setDynamicOutput (true);
      },
      setConstant: function (name, value)
      {
         const constants = this .constants;

         constants [name] = value;

         this .kernel [0] .setConstants (constants);
         this .kernel [1] .setConstants (constants);
      },
      addFunction: function (func)
      {
         this .kernel [0] .addFunction (func);
         this .kernel [1] .addFunction (func);
      },
   });

   return X3DParticleEmitterNode;
});
