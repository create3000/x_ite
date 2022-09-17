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
],
function (X3DNode,
          X3DConstants)
{
"use strict";

   function X3DParticleEmitterNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DParticleEmitterNode);

      this ._speed       .setUnit ("speed");
      this ._mass        .setUnit ("mass");
      this ._surfaceArea .setUnit ("area");

      this .uniforms  = { };
      this .functions = [ ];
      this .program   = null;

      this .addUniform ("speed",     "uniform float speed;");
      this .addUniform ("variation", "uniform float variation;");
   }

   X3DParticleEmitterNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DParticleEmitterNode,
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         if (this .getBrowser () .getContext () .getVersion () < 2)
            return;

         // Create program.

         this .program = this .createProgram ();

         // Initialize fields.

         this ._on        .addInterest ("set_on__",        this);
         this ._speed     .addInterest ("set_speed__",     this);
         this ._variation .addInterest ("set_variation__", this);
         this ._mass      .addInterest ("set_mass__",      this);

         this .set_on__ ();
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
      set_on__: function ()
      {
         this .on = this ._on .getValue ();
      },
      set_speed__: function ()
      {
         this .setUniform ("uniform1f", "speed", this ._speed .getValue ());
      },
      set_variation__: function ()
      {
         this .setUniform ("uniform1f", "variation", this ._variation .getValue ());
      },
      set_mass__: function ()
      {
         this .mass = this ._mass .getValue ();
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
      animate: function (particleSystem, deltaTime)
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext (),
            input   = particleSystem .particles [particleSystem .i],
            output  = particleSystem .particles [particleSystem .i = +! particleSystem .i],
            size    = particleSystem .size,
            program = this .program;

         // Start

         gl .bindFramebuffer (gl .FRAMEBUFFER, output .frameBuffer);
         gl .viewport (0, 0, size, size);
         gl .scissor (0, 0, size, size);
         gl .useProgram (program);

         // Uniforms

         gl .uniform1i (program .randomSeed,        Math .random () * 0xffffffff);
         gl .uniform1i (program .createParticles,   particleSystem .createParticles && this .on);
         gl .uniform1i (program .numParticles,      particleSystem .numParticles);
         gl .uniform1f (program .particleLifetime,  particleSystem .particleLifetime);
         gl .uniform1f (program .lifetimeVariation, particleSystem .lifetimeVariation);
         gl .uniform1f (program .deltaTime,         deltaTime);

         // Forces

         gl .uniform1i (program .numForces, particleSystem .numForces);

         if (particleSystem .numForces)
         {
            const textureUnit = browser .getTexture2DUnit ();

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .forcesTexture);
            gl .uniform1i (program .forces, textureUnit);
         }

         // Colors

         gl .uniform1i (program .numColors, particleSystem .numColors);

         if (particleSystem .numColors)
         {
            const textureUnit = browser .getTexture2DUnit ();

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .colorRampTexture);
            gl .uniform1i (program .colorRamp, textureUnit);
         }

         // Input textures

         for (let i = 0; i < 4; ++ i)
         {
            const textureUnit = browser .getTexture2DUnit ();

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, input .textures [i]);
            gl .uniform1i (program .inputSampler [i], textureUnit);
         }

         // Other textures

         this .activateTextures (browser, gl, program);

         // Render

         gl .enableVertexAttribArray (program .inputVertex);
         gl .bindBuffer (gl .ARRAY_BUFFER, program .vertexBuffer);
         gl .vertexAttribPointer (program .inputVertex, 4, gl .FLOAT, false, 0, 0);

         gl .disable (gl .DEPTH_TEST);
         gl .disable (gl .BLEND);
         gl .frontFace (gl .CCW);
         gl .enable (gl .CULL_FACE);
         gl .cullFace (gl .BACK);

         gl .drawArrays (gl .TRIANGLES, 0, 6);

         // const data = particleSystem .data [3];
         // gl .readBuffer (gl .COLOR_ATTACHMENT3);
         // gl .readPixels (0, 0, size, size, gl .RGBA, gl .FLOAT, data);
         // console .log (data);

         // Restore/Finish

         gl .bindFramebuffer (gl .FRAMEBUFFER, null);

         browser .resetTextureUnits ();

         return output;
      },
      bounce: (function ()
      {
         // const
         //    normal = new Vector3 (0, 0, 0),
         //    line   = new Line3 (Vector3 .Zero, Vector3 .zAxis),
         //    plane  = new Plane3 (Vector3 .Zero, Vector3 .zAxis);

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
      addUniform: function (name, uniform)
      {
         this .uniforms [name] = uniform;
      },
      setUniform: function (func, name, value1, value2, value3)
      {
         const
            gl      = this .getBrowser () .getContext (),
            program = this .program;

         gl .useProgram (program);
         gl [func] (program [name], value1, value2, value3);
      },
      addFunction: function (func)
      {
         this .functions .push (func);
      },
      createProgram: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         const vertexShaderSource = /* glsl */ `#version 300 es

         precision highp float;
         precision highp int;

         in vec4 inputVertex;

         void
         main ()
         {
            gl_Position = inputVertex;
         }
         `;

         const fragmentShaderSource = /* glsl */ `#version 300 es

         precision highp float;
         precision highp int;
         precision highp sampler2D;

         uniform int   randomSeed;
         uniform bool  createParticles;
         uniform int   numParticles;
         uniform float particleLifetime;
         uniform float lifetimeVariation;
         uniform float deltaTime;

         uniform int       numForces;
         uniform sampler2D forces;

         uniform int       numColors;
         uniform sampler2D colorRamp;

         uniform sampler2D inputSampler0;
         uniform sampler2D inputSampler1;
         uniform sampler2D inputSampler2;
         uniform sampler2D inputSampler3;

         ${Object .values (this .uniforms) .join ("\n")}

         layout(location = 0) out vec4 output0;
         layout(location = 1) out vec4 output1;
         layout(location = 2) out vec4 output2;
         layout(location = 3) out vec4 output3;

         // Constants

         const int   MAX_FORCES = 1024;
         const float M_PI       = 3.14159265359;

         #define ARRAY_SIZE  32

         // Texture

         vec4
         texelFetch (const in sampler2D sampler, const in int index, const in int lod)
         {
            int   x = textureSize (sampler, lod) .x;
            ivec2 p = ivec2 (index % x, index / x);
            vec4  t = texelFetch (sampler, p, lod);

            return t;
         }

         // Math

         // Save normalize, that will not divide by zero.
         vec3
         normalize (const in vec3 vector)
         {
            float l = length (vector);

            if (l == 0.0)
               return vec3 (0.0);

            return vector / l;
         }

         // Quaternion

         vec4
         Quaternion (const in vec3 fromVector, const in vec3 toVector)
         {
            vec3 from = normalize (fromVector);
            vec3 to   = normalize (toVector);

            float cos_angle = dot (from, to);
            vec3  cross_vec = cross (from, to);
            float cross_len = length (cross_vec);

            if (cross_len == 0.0)
            {
               if (cos_angle > 0.0)
               {
                  return vec4 (0.0, 0.0, 0.0, 1.0);
               }
               else
               {
                  vec3 t = cross (from, vec3 (1.0, 0.0, 0.0));

                  if (dot (t, t) == 0.0)
                     t = cross (from, vec3 (0.0, 1.0, 0.0));

                  t = normalize (t);

                  return vec4 (t, 0.0);
               }
            }
            else
            {
               float s = sqrt (abs (1.0 - cos_angle) * 0.5);

               cross_vec = normalize (cross_vec);

               return vec4 (cross_vec * s, sqrt (abs (1.0 + cos_angle) * 0.5));
            }
         }

         vec3
         multVecQuat (const in vec3 v, const in vec4 q)
         {
            float a = q .w * q .w - q .x * q .x - q .y * q .y - q .z * q .z;
            float b = 2.0 * (v .x * q .x + v .y * q .y + v .z * q .z);
            float c = 2.0 * q .w;
            vec3  r = a * v .xyz + b * q .xyz + c * (q .yzx * v .zxy - q .zxy * v .yzx);

            return r;
         }

         /* Random number generation */

         uint seed = 1u;

         void
         srand (const in int value)
         {
            seed = uint (value);
         }

         // Return a uniform distributed random floating point number in the interval [0, 1].
         float
         random ()
         {
            seed = seed * 1103515245u + 12345u;

            return float (seed) / 4294967295.0;
         }

         float
         getRandomValue (const in float min, const in float max)
         {
            return min + random () * (max - min);
         }

         float
         getRandomLifetime ()
         {
            float v    = particleLifetime * lifetimeVariation;
            float min_ = max (0.0, particleLifetime - v);
            float max_ = particleLifetime + v;

            return getRandomValue (min_, max_);
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
            float theta = getRandomValue (-M_PI, M_PI);
            float cphi  = getRandomValue (-1.0, 1.0);
            float r     = sqrt (1.0 - cphi * cphi); // sin (acos (cphi));

            return vec3 (sin (theta) * r, cos (theta) * r, cphi);
         }

         vec3
         getRandomNormalWithAngle (const in float angle)
         {
            float theta = getRandomValue (-M_PI, M_PI);
            float cphi  = getRandomValue (cos (angle), 1.0);
            float r     = sqrt (1.0 - cphi * cphi); // sin (acos (cphi));

            return vec3 (sin (theta) * r, cos (theta) * r, cphi);
         }

         vec3
         getRandomNormalWithDirectionAndAngle (const in vec3 direction, const in float angle)
         {
            vec4 rotation = Quaternion (vec3 (0.0, 0.0, 1.0), direction);
            vec3 normal   = getRandomNormalWithAngle (angle);

            return multVecQuat (normal, rotation);
         }

         vec3
         getRandomSurfaceNormal (const in vec3 direction)
         {
            float theta    = getRandomValue (-M_PI, M_PI);
            float cphi     = pow (random (), 1.0 / 3.0);
            float r        = sqrt (1.0 - cphi * cphi); // sin (acos (cphi));
            vec3  normal   = vec3 (sin (theta) * r, cos (theta) * r, cphi);
            vec4  rotation = Quaternion (vec3 (0.0, 0.0, 1.0), direction);

            return multVecQuat (normal, rotation);
         }

         vec3
         getRandomSphericalVelocity ()
         {
            vec3  normal = getRandomNormal ();
            float speed  = getRandomSpeed ();

            return normal * speed;
         }

         // Algorithms

         int
         upperBound (const in sampler2D sampler, in int count, const in float value)
         {
            int first = 0;
            int step  = 0;

            while (count > 0)
            {
               int index = first;

               step = count >> 1;

               index += step;

               if (value < texelFetch (sampler, index, 0) .x)
               {
                  count = step;
               }
               else
               {
                  first  = ++ index;
                  count -= step + 1;
               }
            }

            return first;
         }

         void
         interpolate (const in sampler2D sampler, const in int count, const in float fraction, out int index0, out int index1, out float weight)
         {
            // Determine index0, index1 and weight.

            if (count == 1 || fraction <= texelFetch (sampler, 0, 0) .x)
            {
               index0 = 0;
               index1 = 0;
               weight = 0.0;
            }
            else if (fraction >= texelFetch (sampler, count - 1, 0) .x)
            {
               index0 = count - 2;
               index1 = count - 1;
               weight = 1.0;
            }
            else
            {
               int index = upperBound (sampler, count, fraction);

               if (index < count)
               {
                  index1 = index;
                  index0 = index - 1;

                  float key0 = texelFetch (sampler, index0, 0) .x;
                  float key1 = texelFetch (sampler, index1, 0) .x;

                  weight = clamp ((fraction - key0) / (key1 - key0), 0.0, 1.0);
               }
               else
               {
                  index0 = 0;
                  index1 = 0;
                  weight = 0.0;
               }
            }
         }

         vec3
         getRandomBarycentricCoord ()
         {
            // Random barycentric coordinates.

            float u = random ();
            float v = random ();

            if (u + v > 1.0)
            {
               u = 1.0 - u;
               v = 1.0 - v;
            }

            float t = 1.0 - u - v;

            return vec3 (t, u, v);
         }

         void
         getRandomPointOnSurface (const in sampler2D surface, const in int numAreaSoFar, const in int numVertices, out vec4 position, out vec3 normal)
         {
            // Determine index0, index1 and weight.

            float lastAreaSoFar = texelFetch (surface, numAreaSoFar - 1, 0) .x;
            float fraction      = random () * lastAreaSoFar;

            int   index0;
            int   index1;
            int   index2;
            float weight;

            interpolate (surface, numAreaSoFar, fraction, index0, index1, weight);

            // Interpolate and return position.

            index0 *= 3;
            index1  = index0 + 1;
            index2  = index0 + 2;

            vec4 vertex0 = texelFetch (surface, numAreaSoFar + index0, 0);
            vec4 vertex1 = texelFetch (surface, numAreaSoFar + index1, 0);
            vec4 vertex2 = texelFetch (surface, numAreaSoFar + index2, 0);

            vec3 normal0 = texelFetch (surface, numAreaSoFar + numVertices + index0, 0) .xyz;
            vec3 normal1 = texelFetch (surface, numAreaSoFar + numVertices + index1, 0) .xyz;
            vec3 normal2 = texelFetch (surface, numAreaSoFar + numVertices + index2, 0) .xyz;

            // Random barycentric coordinates.

            vec3 b = getRandomBarycentricCoord ();

            // Calculate position and direction.

            position = b .x * vertex0 + b .y * vertex1 + b .z * vertex2;
            normal   = normalize (b .x * normal0 + b .y * normal1 + b .z * normal2);
         }

         // Functions

         ${this .functions .join ("\n")}

         // Current values

         vec4
         getColor (const in float lifetime, const in float elapsedTime)
         {
            if (numColors > 0)
            {
               // Determine index0, index1 and weight.

               float fraction = elapsedTime / lifetime;

               int   index0;
               int   index1;
               float weight;

               interpolate (colorRamp, numColors, fraction, index0, index1, weight);

               // Interpolate and return color.

               vec4 color0 = texelFetch (colorRamp, numColors + index0, 0);
               vec4 color1 = texelFetch (colorRamp, numColors + index1, 0);

               return mix (color0, color1, weight);
            }
            else
            {
               return vec4 (1.0);
            }
         }

         void
         animate (const in ivec2 fragCoord, const in int id)
         {
            if (id < numParticles)
            {
               srand ((id + randomSeed) * randomSeed);

               vec4 input0 = texelFetch (inputSampler0, fragCoord, 0);
               vec4 input1 = texelFetch (inputSampler1, fragCoord, 0);
               vec4 input2 = texelFetch (inputSampler2, fragCoord, 0);
               vec4 input3 = texelFetch (inputSampler3, fragCoord, 0);

               uint  life        = uint (input0 [1]);
               float lifetime    = input0 [2];
               float elapsedTime = input0 [3] + deltaTime;

               if (elapsedTime > lifetime)
               {
                  // Create new particle or hide particle.

                  life       += createParticles ? 1u : 0u;
                  lifetime    = getRandomLifetime ();
                  elapsedTime = 0.0;

                  output0 = vec4 (id, life, lifetime, elapsedTime);
                  output1 = getColor (lifetime, elapsedTime);

                  if (createParticles)
                  {
                     output2 = vec4 (getRandomVelocity (), 0.0);
                     output3 = getRandomPosition ();
                  }
                  else
                  {
                     output2 = vec4 (0.0);
                     output3 = vec4 (0.0);
                  }
               }
               else
               {
                  // Animate particle.

                  vec3 velocity = input2 .xyz;
                  vec4 position = input3;

                  for (int i = 0; i < MAX_FORCES; ++ i)
                  {
                     if (i >= numForces)
                        break;

                     vec4  force      = texelFetch (forces, i, 0);
                     float turbulence = force .w;
                     vec3  normal     = getRandomNormalWithDirectionAndAngle (force .xyz, turbulence);
                     float speed      = length (force .xyz);

                     velocity += normal * speed;
                  }

                  position .xyz += velocity * deltaTime;

                  output0 = vec4 (id, life, lifetime, elapsedTime);
                  output1 = getColor (lifetime, elapsedTime);
                  output2 = vec4 (velocity, 0.0);
                  output3 = position;
               }
            }
            else
            {
               output0 = vec4 (0.0);
               output1 = vec4 (0.0);
               output2 = vec4 (0.0);
               output3 = vec4 (0.0);
            }
         }

         void
         main ()
         {
            ivec2 fragCoord = ivec2 (gl_FragCoord .xy);
            int   id        = fragCoord .y * textureSize (inputSampler0, 0) .x + fragCoord .x;

            animate (fragCoord, id);
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
            console .error ("Couldn't initialize particle shader: " + gl .getProgramInfoLog (program));

         program .inputVertex = gl .getAttribLocation (program, "inputVertex");

         gl .useProgram (program);

         program .inputSampler = [
            gl .getUniformLocation (program, "inputSampler0"),
            gl .getUniformLocation (program, "inputSampler1"),
            gl .getUniformLocation (program, "inputSampler2"),
            gl .getUniformLocation (program, "inputSampler3"),
         ];

         program .randomSeed        = gl .getUniformLocation (program, "randomSeed");
         program .createParticles   = gl .getUniformLocation (program, "createParticles");
         program .numParticles      = gl .getUniformLocation (program, "numParticles");
         program .particleLifetime  = gl .getUniformLocation (program, "particleLifetime");
         program .lifetimeVariation = gl .getUniformLocation (program, "lifetimeVariation");
         program .deltaTime         = gl .getUniformLocation (program, "deltaTime");

         program .numForces = gl .getUniformLocation (program, "numForces");
         program .forces    = gl .getUniformLocation (program, "forces");

         program .numColors = gl .getUniformLocation (program, "numColors");
         program .colorRamp = gl .getUniformLocation (program, "colorRamp");

         for (const uniform of Object .keys (this .uniforms))
            program [uniform] = gl .getUniformLocation (program, uniform);

         gl .uniform1i (program .forces,    browser .getDefaultTexture2DUnit ());
         gl .uniform1i (program .colorRamp, browser .getDefaultTexture2DUnit ());

         program .vertexBuffer = this .createVertexBuffer ();

         return program;
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
      activateTextures: function ()
      { },
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

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 0, 0, 0, gl .RGBA, gl .FLOAT, null);

         return texture;
      },
   });

   return X3DParticleEmitterNode;
});
