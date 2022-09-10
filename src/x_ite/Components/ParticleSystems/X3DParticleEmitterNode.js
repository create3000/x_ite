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
   "standard/Math/Geometry/Line3",
   "standard/Math/Geometry/Plane3",
   "standard/Math/Algorithm",
   "gpu",
],
function (X3DNode,
          X3DConstants,
          Vector3,
          Line3,
          Plane3,
          Algorithm,
          gpu)
{
"use strict";

   function X3DParticleEmitterNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DParticleEmitterNode);

      this ._speed       .setUnit ("speed");
      this ._mass        .setUnit ("mass");
      this ._surfaceArea .setUnit ("area");

      this .uniforms  = [ ];
      this .functions = [ ];
      this .kernels   = [{ textures: [ ] }, { textures: [ ] }];

      this .addUniform ("uniform float speed;");
      this .addUniform ("uniform float variation;");
      this .addUniform ("uniform float mass;");

      this .constants    = { };
      this .functionsO    = [ ];
      this .kernel       = [ ];
      this .i            = 0;
      this .maxParticles = 0;
   }

   X3DParticleEmitterNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DParticleEmitterNode,
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         // Create kernels.

         for (let i = 0; i < 4; ++ i)
         {
            this .kernels [0] .textures [i] = this .createTexture ();
            this .kernels [1] .textures [i] = this .createTexture ();
         }

         this .kernels [0] .frameBuffer  = this .createFrameBuffer (this .kernels [0] .textures);
         this .kernels [1] .frameBuffer  = this .createFrameBuffer (this .kernels [1] .textures);
         this .kernels [0] .program      = this .createProgram (this .kernels [1] .textures);
         this .kernels [1] .program      = this .createProgram (this .kernels [0] .textures);
         this .kernels [0] .vertexBuffer = this .createVertexBuffer ();
         this .kernels [1] .vertexBuffer = this .createVertexBuffer ();

         // Initialize fields.

         this ._speed     .addInterest ("set_speed__",     this);
         this ._variation .addInterest ("set_variation__", this);
         this ._mass      .addInterest ("set_mass__",      this);

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

         this .setUniform ("uniform1f", "speed", this ._speed .getValue ());
      },
      set_variation__: function ()
      {
         this .setConstant ("variation", this ._variation .getValue ());

         this .setUniform ("uniform1f", "variation", this ._variation .getValue ());
      },
      set_mass__: function ()
      {
         this .mass = this ._mass .getValue ();

         this .setConstant ("mass", this ._mass .getValue ());

         this .setUniform ("uniform1f", "mass", this ._mass .getValue ());
      },
      getRandomValue: function (min, max)
      {
         return Math .random () * (max - min) + min;
      },
      getRandomNormal: function (normal)
      {
         const
            theta = this .getRandomValue (-1, 1) * Math .PI,
            cphi  = this .getRandomValue (-1, 1),
            phi   = Math .acos (cphi),
            r     = Math .sin (phi);

         return normal .set (Math .sin (theta) * r,
                             Math .cos (theta) * r,
                             cphi);
      },
      animate: (function ()
      {
         const removedKernels = [ ];

         return function (particleSystem, deltaTime)
         {
            const particles = particleSystem .particles;

            // boundedVolume = particleSystem .boundedVolume;

            if (this .maxParticles !== particleSystem .maxParticles)
            {
               if (this .kernel .length)
                  removedKernels .push (this .kernel [0], this .kernel [1]);

               this .maxParticles = particleSystem .maxParticles;
               this .kernel [0]   = this .createKernel ();
               this .kernel [1]   = this .createKernel ();
            }

            this .i = (this .i + 1) % 2;

            particleSystem .particles = this .kernel [this .i]
               (particles .times,
               particles .velocities,
               particles .result,
               particleSystem .numParticles,
               particleSystem .particleLifetime,
               particleSystem .lifetimeVariation,
               particleSystem .createParticles,
               particleSystem .geometryContext .colorMaterial,
               particleSystem .colorKeys,
               particleSystem .numColorKeys,
               particleSystem .colorRamp,
               particleSystem .numForces,
               particleSystem .forces,
               particleSystem .turbulences,
               this .mass,
               !! particleSystem .boundedVertices .length,
               deltaTime);

            if (removedKernels .length)
            {
               removedKernels [0] .destroy ();
               removedKernels [1] .destroy ();

               removedKernels .length = 0;
            }

            const
               gl                 = this .getBrowser () .getContext (),
               kernel             = this .kernels [this .i],
               program            = kernel .program,
               currentFrameBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING);

            gl .bindFramebuffer (gl .FRAMEBUFFER, kernel .frameBuffer);
            gl .useProgram (program);

            gl .uniform1i (gl .getUniformLocation (program, "randomSeed"), Math .random () * particleSystem .maxParticles);
            gl .uniform1i (gl .getUniformLocation (program, "createParticles"), Number (particleSystem .createParticles));
            gl .uniform1i (gl .getUniformLocation (program, "numParticles"), particleSystem .numParticles);
            gl .uniform1f (gl .getUniformLocation (program, "particleLifetime"), particleSystem .particleLifetime);
            gl .uniform1f (gl .getUniformLocation (program, "lifetimeVariation"), particleSystem .lifetimeVariation);
            gl .uniform1f (gl .getUniformLocation (program, "deltaTime"), deltaTime);

            gl .enableVertexAttribArray (kernel .program .x3d_Vertex);
            gl .bindBuffer (gl .ARRAY_BUFFER, kernel .vertexBuffer);
            gl .vertexAttribPointer (this .x3d_Vertex, 4, gl .FLOAT, false, 0, 0);

            gl .clearColor (1, 2, 3, 4);
            gl .clear (gl .COLOR_BUFFER_BIT);

            gl .viewport (0, 0, 10, 10);
            gl .disable (gl .DEPTH_TEST);
            gl .disable (gl .BLEND);
            gl .frontFace (gl .CCW);
            gl .enable (gl .CULL_FACE);
            gl .cullFace (gl .BACK);

            gl .drawArrays (gl .TRIANGLES, 0, 6);

            gl .readBuffer (gl .COLOR_ATTACHMENT0);
            gl .readPixels (0, 0, 10, 10, gl .RGBA, gl .FLOAT, kernel .textures [0] .data);
            console .log (kernel .textures [0] .data);

            gl .bindFramebuffer (gl .FRAMEBUFFER, currentFrameBuffer);

            /*
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
            */
         };
      })(),
      bounce: (function ()
      {
         const
            normal = new Vector3 (0, 0, 0),
            line   = new Line3 (Vector3 .Zero, Vector3 .zAxis),
            plane  = new Plane3 (Vector3 .Zero, Vector3 .zAxis);

         return function (boundedVolume, fromPosition, toPosition, velocity)
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
         };
      })(),
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

               return [life, lifetime, elapsedTime, 0];
            },
            colors: function updateColors (time, numParticles, colorMaterial, colorKeys, numColorKeys, colorRamp)
            {
               if (this .thread .x < numParticles && colorMaterial)
               {
                  // Determine index0, index1 and weight.

                  const
                     lifetime    = time [1],
                     elapsedTime = time [2],
                     fraction    = elapsedTime / lifetime;

                  let
                     index0 = 0,
                     index1 = 0,
                     weight = 0;

                  if (numColorKeys == 1 || fraction <= colorKeys [0])
                  {
                     index0 = 0;
                     index1 = 0;
                     weight = 0;
                  }
                  else if (fraction >= colorKeys [numColorKeys - 1])
                  {
                     index0 = numColorKeys - 2;
                     index1 = numColorKeys - 1;
                     weight = 1;
                  }
                  else
                  {
                     // BEGIN: upperBound

                     const
                        count = numColorKeys,
                        value = fraction;

                     let
                        first = 0,
                        step  = 0;

                     while (count > 0)
                     {
                        let index = first;

                        step = count >> 1;

                        index += step;

                        if (value < colorKeys [index])
                        {
                           count = step;
                        }
                        else
                        {
                           first  = ++ index;
                           count -= step + 1;
                        }
                     }

                     const index = first;

                     // END upperBound.

                     if (index < numColorKeys)
                     {
                        index1 = index;
                        index0 = index - 1;

                        const
                           key0 = colorKeys [index0],
                           key1 = colorKeys [index1];

                        weight = clamp ((fraction - key0) / (key1 - key0), 0, 1);
                     }
                     else
                     {
                        index0 = 0;
                        index1 = 0;
                        weight = 0;
                     }
                  }

                  // Interpolate and return color.

                  const
                     color0 = colorRamp [index0],
                     color1 = colorRamp [index1];

                  return [mix (color0 [0], color1 [0], weight),
                          mix (color0 [1], color1 [1], weight),
                          mix (color0 [2], color1 [2], weight),
                          mix (color0 [3], color1 [3], weight)];
               }
               else
               {
                  // No color needed.
                  return [0, 0, 0, 0];
               }
            },
            velocities: function updateVelocities (time, velocities, numParticles, createParticles, numForces, forces, turbulences, mass, boundedPhysics, deltaTime)
            {
               if (this .thread .x < numParticles)
               {
                  const elapsedTime = time [2];

                  if (elapsedTime == 0)
                  {
                     return createParticles ? getRandomVelocity () : [0, 0, 0, 0];
                  }
                  else
                  {
                     let velocity = velocities [this .thread .x];

                     for (let i = 0; i < numForces; ++ i)
                     {
                        const
                           force      = [forces [i * 3 + 0], forces [i * 3 + 1], forces [i * 3 + 2]],
                           turbulence = turbulences [i],
                           normal     = getRandomNormalWithDirectionAndAngle (force, turbulence),
                           speed      = length3 (force) * deltaTime / mass;

                        velocity [0] += normal [0] * speed;
                        velocity [1] += normal [1] * speed;
                        velocity [2] += normal [2] * speed;
                     }

                     return boundedPhysics ? bounce (velocity) : velocity;
                  }
               }
               else
               {
                  return velocities [this .thread .x];
               }
            },
         },
         function (times, velocities, positions, numParticles, particleLifetime, lifetimeVariation, createParticles, colorMaterial, colorKeys, numColorKeys, colorRamp, numForces, forces, turbulences, mass, boundedPhysics, deltaTime)
         {
            // WORKAROUND: include Math.random()

            const
               time     = updateTimes (times, numParticles, particleLifetime, lifetimeVariation, createParticles, deltaTime),
               color    = updateColors (time, numParticles, colorMaterial, colorKeys, numColorKeys, colorRamp),
               velocity = updateVelocities (time, velocities, numParticles, createParticles, numForces, forces, turbulences, mass, boundedPhysics, deltaTime);

            // updatePositions

            if (this .thread .x < numParticles)
            {
               const elapsedTime = time [2];

               if (elapsedTime == 0)
               {
                  return createParticles ? getRandomPosition () : [Infinity, Infinity, Infinity, 0];
               }
               else
               {
                  // Animate particle.

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

            /* WORKAROUND: include */ prototypes ();
         })
         .setConstants (this .constants)
         .setFunctions (this .functionsO)
         .setTactic ("precision")
         .addNativeFunction ("prototypes", `
            vec4 Quaternion (vec3, vec3);
            vec3 multVecQuat (vec3, vec4);
            float getRandomValue (float , float);
            vec3 getRandomNormalWithAngle (float);
            void prototypes () { }
         `)
         .addNativeFunction ("dot3", "float dot3 (vec3 a, vec3 b) { return dot (a, b); }")
         .addNativeFunction ("length3", "float length3 (vec3 v) { return length (v); }")
         .addNativeFunction ("normalize3", "vec3 normalize3 (vec3 v) { return normalize (v); }")
         .addNativeFunction ("cross3", "vec3 cross3 (vec3 a, vec3 b) { return cross (a, b); }")
         .addFunction (function Quaternion (fromVector, toVector)
         {
            const from = normalize3 (fromVector);
            const to   = normalize3 (toVector);

            const cos_angle = dot3 (from, to);
            let   crossvec  = cross3 (from, to);
            const crosslen  = length3 (crossvec);

            if (crosslen == 0)
            {
               if (cos_angle > 0)
               {
                  return [0, 0, 0, 1];
               }
               else
               {
                  let t = cross3 (from, [1, 0, 0]);

                  if (dot (t, t) == 0)
                     t = cross3 (from, [0, 1, 0]);

                  t = normalize3 (t);

                  return [t [0], t [1], t [2], 0];
               }
            }
            else
            {
               const s = Math .sqrt (Math .abs (1 - cos_angle) * 0.5);

               crossvec = normalize3 (crossvec);

               return [crossvec [0] * s,
                       crossvec [1] * s,
                       crossvec [2] * s,
                       Math .sqrt (Math .abs (1 + cos_angle) * 0.5)];
            }
         })
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
         })
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
         .addFunction (function getRandomSurfaceNormal ()
         {
            const
               theta = getRandomValue (-1, 1) * Math .PI,
               cphi  = Math .pow (Math .random (), 1/3),
               phi   = Math .acos (cphi),
               r     = Math .sin (phi);

            return [Math .sin (theta) * r,
                    Math .cos (theta) * r,
                    cphi];
         })
         .addFunction (function getRandomSphericalVelocity ()
         {
            const
               normal = getRandomNormal (),
               speed  = getRandomSpeed ();

            return [normal [0] * speed,
                    normal [1] * speed,
                    normal [2] * speed,
                    0];
         })
         .addFunction (function bounce (velocity)
         {
            return velocity;
         })
         .setPipeline (true)
         .setOutput ([this .maxParticles]);
      },
      setConstant: function (name, value)
      {
         this .constants [name] = value;
         this .maxParticles     = 0;     // Trigger kernel rebuild.
      },
      addFunctionO: function (func)
      {
         this .functionsO .push (func);
      },
      createVertexBuffer: (function ()
      {
         const vertices = [
             1,  1, 0, 1,
            -1,  1, 0, 1,
            -1, -1, 0, 1,
             1,  1, 0, 1,
            -1, -1, 0, 1,
             1, -1, 0, 1,
         ];

         return function ()
         {
            const
               gl              = this .getBrowser () .getContext (),
               vertexBuffer    = gl .createBuffer ();

            gl .bindBuffer (gl .ARRAY_BUFFER, vertexBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (vertices), gl .STATIC_DRAW);

            return vertexBuffer;
         };
      })(),
      createProgram: function (textures)
      {
         const gl = this .getBrowser () .getContext ();

         const vertexShaderSource = `#version 300 es

         precision highp float;
         precision highp int;

         in vec4 x3d_Vertex;
         out vec4 vertex;

         void
         main ()
         {
            vertex      = x3d_Vertex;
            gl_Position = x3d_Vertex;
         }
         `;

         const fragmentShaderSource = `#version 300 es

         precision highp float;
         precision highp int;
         precision highp sampler2D;

         in vec4 vertex;

         layout(location = 0) out vec4 output0;
         layout(location = 1) out vec4 output1;
         layout(location = 2) out vec4 output2;
         layout(location = 3) out vec4 output3;

         const ivec2 size = ivec2 (10, 10);
         uniform int randomSeed;
         uniform bool createParticles;
         uniform int numParticles;
         uniform float particleLifetime;
         uniform float lifetimeVariation;
         uniform float deltaTime;

         uniform sampler2D inputSampler0;
         uniform sampler2D inputSampler1;
         uniform sampler2D inputSampler2;
         uniform sampler2D inputSampler3;

         ${this .uniforms .join ("\n")}

         #define M_PI 3.14159265359

         int
         getId (const in vec2 texCoord)
         {
            int x  = int (texCoord .x * float (size .x));
            int y  = int (texCoord .y * float (size .y));
            int id = y * size .x + x;

            return id;
         }

         /* Random number generation */

         const int RAND_MAX = int (0x7fffffff);
         const int RAND_MIN = int (0x80000000);

         int seed = 1;

         int
         srand ()
         {
            return seed;
         }

         void
         srand (in int value)
         {
            seed = value;
         }

         // Return a uniform distributed random integral number in the interval [RAND_MIN, RAND_MAX].
         int
         rand ()
         {
            return seed = seed * 1103515245 + 12345;
         }

         // Return a uniform distributed random floating point number in the interval [-1, 1].
         float
         random1 ()
         {
            return float (rand ()) / float (RAND_MAX);
         }

         float
         getRandomValue (const in float min, const in float max)
         {
            return min + fract (random1 ()) * (max - min);
         }

         float
         getRandomLifetime (const in float particleLifetime, const in float lifetimeVariation)
         {
            float v   = particleLifetime * lifetimeVariation;
            float min = max (0.0, particleLifetime - v);
            float max = particleLifetime + v;

            return getRandomValue (min, max);
         }

         float
         getRandomSpeed ()
         {
            float v    = speed * variation;
            float min_ = max (0.0, speed - v);
            float max_ = speed + v;

            return getRandomValue (min_, max_);
         }

         vec3
         getRandomNormal ()
         {
            float theta = getRandomValue (-1.0, 1.0) * M_PI;
            float cphi  = getRandomValue (-1.0, 1.0);
            float phi   = acos (cphi);
            float r     = sin (phi);

            return vec3 (sin (theta) * r, cos (theta) * r, cphi);
         }

         vec3
         getRandomSphericalVelocity ()
         {
            vec3  normal = getRandomNormal ();
            float speed  = getRandomSpeed ();

            return normal * speed;
         }

         ${this .functions .join ("\n")}

         void
         animate (const in vec2 texCoord, const in int id)
         {
            vec4 input0 = texture (inputSampler0, texCoord);
            vec4 input1 = texture (inputSampler1, texCoord);
            vec4 input2 = texture (inputSampler2, texCoord);
            vec4 input3 = texture (inputSampler3, texCoord);

            if (id < numParticles)
            {
               float life        = input0 [0];
               float lifetime    = input0 [1];
               float elapsedTime = input0 [2] + deltaTime;

               if (elapsedTime > lifetime)
               {
                  // Create new particle or hide particle.

                  life       += createParticles ? 1.0 : 0.0;
                  lifetime    = getRandomLifetime (particleLifetime, lifetimeVariation);
                  elapsedTime = 0.0;

                  output0 = vec4 (life, lifetime, elapsedTime, 0.0);
                  output1 = vec4 (1.0);
                  output2 = vec4 (2.0);
                  output3 = vec4 (3.0);
               }
               else
               {
                  output0 = vec4 (life, lifetime, elapsedTime, 0.0);
                  output1 = vec4 (1.0);
                  output2 = vec4 (2.0);
                  output3 = vec4 (3.0);
               }
            }
            else
            {
               output0 = input0;
               output1 = input1;
               output2 = input2;
               output3 = input3;
            }
         }

         void
         main ()
         {
            vec2 texCoord = (vertex .xy + 1.0) * 0.5;
            int  id       = getId (texCoord);

            srand ((id + 1) * randomSeed);

            animate (texCoord, id);
         }
         `;

         // Vertex shader

         const vertexShader = gl .createShader (gl .VERTEX_SHADER);

         gl .shaderSource (vertexShader, vertexShaderSource);
         gl .compileShader (vertexShader);

         // Fragment shader

         const fragmentShader = gl .createShader (gl .FRAGMENT_SHADER);

         gl .shaderSource (fragmentShader, fragmentShaderSource);
         gl .compileShader (fragmentShader);

         // Program

         const program = gl .createProgram ();

         gl .attachShader (program, vertexShader);
         gl .attachShader (program, fragmentShader);
         gl .linkProgram (program);

         if (!gl .getProgramParameter (program, gl .LINK_STATUS))
            console .warn ("Couldn't initialize particle shader: " + gl .getProgramInfoLog (program));

         program .x3d_Vertex = gl. getAttribLocation (program, "x3d_Vertex");

         return program;
      },
      createFrameBuffer: function (textures)
      {
         const gl = this .getBrowser () .getContext ();

         // console .log (gl .getParameter (gl .MAX_COLOR_ATTACHMENTS));

         // Create frame buffer.

         const
            currentFrameBuffer = gl .getParameter (gl .FRAMEBUFFER_BINDING),
            frameBuffer        = gl .createFramebuffer ();

         gl .bindFramebuffer (gl .FRAMEBUFFER, frameBuffer);

         // Assign textures.

         for (let i = 0; i < 4; ++ i)
            gl .framebufferTexture2D (gl .FRAMEBUFFER, gl.COLOR_ATTACHMENT0 + i, gl.TEXTURE_2D, textures [i], 0);

         gl .drawBuffers ([gl .COLOR_ATTACHMENT0, gl .COLOR_ATTACHMENT1, gl .COLOR_ATTACHMENT2, gl .COLOR_ATTACHMENT3]);

         if (gl .checkFramebufferStatus (gl .FRAMEBUFFER) !== gl .FRAMEBUFFER_COMPLETE)
            console .log ("Particle frame buffer is not complete.");

         // Reset frame buffer.

         gl .bindFramebuffer (gl .FRAMEBUFFER, currentFrameBuffer);

         return frameBuffer;
      },
      createTexture: function ()
      {
         const
            gl      = this .getBrowser () .getContext (),
            texture = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, texture);

         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 10, 10, 0, gl .RGBA, gl .FLOAT, null);

         // Create data.

         texture .data = new Float32Array (10 * 10 * 4);

         return texture;
      },
      addUniform: function (uniform)
      {
         this .uniforms .push (uniform);
      },
      setUniform: function (func, name, value1, value2, value3)
      {
         const gl = this .getBrowser () .getContext ();

         for (const kernel of this .kernels)
         {
            gl .useProgram (kernel .program);
            gl [func] (gl .getUniformLocation (kernel .program, name), value1, value2, value3);
         }
      },
      addFunction: function (func)
      {
         this .functions .push (func);
      },
   });

   return X3DParticleEmitterNode;
});
