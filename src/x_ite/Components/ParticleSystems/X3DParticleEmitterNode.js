/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields        from "../../Fields.js";
import X3DNode       from "../Core/X3DNode.js";
import GeometryTypes from "../../Browser/ParticleSystems/GeometryTypes.js";
import X3DConstants  from "../../Base/X3DConstants.js";
import Line3Source   from "../../Browser/ParticleSystems/Line3.glsl.js";
import Plane3Source  from "../../Browser/ParticleSystems/Plane3.glsl.js";
import Box3Source    from "../../Browser/ParticleSystems/Box3.glsl.js";
import BVHSource     from "../../Browser/ParticleSystems/BVH.glsl.js";

function X3DParticleEmitterNode (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DParticleEmitterNode);

   this .addChildObjects (X3DConstants .outputOnly, "bbox_changed", new Fields .SFTime ());

   // Units

   this ._speed       .setUnit ("speed");
   this ._mass        .setUnit ("mass");
   this ._surfaceArea .setUnit ("area");

   // Private properties
   
   this .defines   = [ ];
   this .samplers  = [ ];
   this .uniforms  = new Map ();
   this .callbacks = [ ];
   this .functions = [ ];
   this .programs  = new Map ();
}

Object .assign (Object .setPrototypeOf (X3DParticleEmitterNode .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      // Create program.

      this .transformFeedback = gl .createTransformFeedback ();

      // Initialize fields.

      this ._on          .addInterest ("set_on__",          this);
      this ._speed       .addInterest ("set_speed__",       this);
      this ._variation   .addInterest ("set_variation__",   this);
      this ._mass        .addInterest ("set_mass__",        this);
      this ._surfaceArea .addInterest ("set_surfaceArea__", this);

      this .addSampler ("forces");
      this .addSampler ("boundedVolume");
      this .addSampler ("colorRamp");
      this .addSampler ("texCoordRamp");

      this .addUniform ("speed",     "uniform float speed;");
      this .addUniform ("variation", "uniform float variation;");

      this .addCallback (this .set_speed__);
      this .addCallback (this .set_variation__);

      this .addFunction (Line3Source);
      this .addFunction (Plane3Source);
      this .addFunction (Box3Source);
      this .addFunction (BVHSource);

      this .set_on__ ();
      this .set_mass__ ();
      this .set_surfaceArea__ ();
   },
   isExplosive ()
   {
      return false;
   },
   getMass ()
   {
      return this .mass;
   },
   getSurfaceArea ()
   {
      return this .surfaceArea;
   },
   set_on__ ()
   {
      this .on = this ._on .getValue ();
   },
   set_speed__ ()
   {
      this .setUniform ("uniform1f", "speed", Math .max (this ._speed .getValue (), 0));
   },
   set_variation__ ()
   {
      this .setUniform ("uniform1f", "variation", Math .max (this ._variation .getValue (), 0));
   },
   set_mass__ ()
   {
      this .mass = Math .max (this ._mass .getValue (), 0);
   },
   set_surfaceArea__ ()
   {
      this .surfaceArea = Math .max (this ._surfaceArea .getValue (), 0);
   },
   getRandomValue (min, max)
   {
      return Math .random () * (max - min) + min;
   },
   getRandomNormal (normal)
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
   animate (particleSystem, deltaTime)
   {
      const
         browser        = this .getBrowser (),
         gl             = browser .getContext (),
         program        = this .getProgram (particleSystem),
         inputParticles = particleSystem .inputParticles;

      // Start

      gl .useProgram (program);

      // Uniforms

      gl .uniform1i (program .randomSeed,        Math .random () * 0xffffffff);
      gl .uniform1f (program .particleLifetime,  particleSystem .particleLifetime);
      gl .uniform1f (program .lifetimeVariation, particleSystem .lifetimeVariation);
      gl .uniform1f (program .deltaTime,         deltaTime);
      gl .uniform2f (program .particleSize,      particleSystem ._particleSize .x, particleSystem ._particleSize .y);

      // Forces

      if (particleSystem .numForces)
      {
         gl .activeTexture (gl .TEXTURE0 + program .forcesTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .forcesTexture);
      }

      // Bounded Physics

      if (particleSystem .boundedHierarchyRoot > -1)
      {
         gl .uniform1i (program .boundedVerticesIndex,  particleSystem .boundedVerticesIndex);
         gl .uniform1i (program .boundedNormalsIndex,   particleSystem .boundedNormalsIndex);
         gl .uniform1i (program .boundedHierarchyIndex, particleSystem .boundedHierarchyIndex);
         gl .uniform1i (program .boundedHierarchyRoot,  particleSystem .boundedHierarchyRoot);

         gl .activeTexture (gl .TEXTURE0 + program .boundedVolumeTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .boundedTexture);
      }

      // Colors

      if (particleSystem .numColors)
      {
         gl .activeTexture (gl .TEXTURE0 + program .colorRampTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .colorRampTexture);
      }

      // TexCoords

      if (particleSystem .numTexCoords)
      {
         gl .uniform1i (program .texCoordCount, particleSystem .texCoordCount);

         gl .activeTexture (gl .TEXTURE0 + program .texCoordRampTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, particleSystem .texCoordRampTexture);
      }

      // Other textures

      this .activateTextures (gl, program);

      // Input attributes

      if (inputParticles .vertexArrayObject .enable (program))
      {
         const { particlesStride, particleOffsets } = particleSystem;

         for (const [i, attribute] of program .inputs)
         {
            gl .bindBuffer (gl .ARRAY_BUFFER, inputParticles);
            gl .enableVertexAttribArray (attribute);
            gl .vertexAttribPointer (attribute, 4, gl .FLOAT, false, particlesStride, particleOffsets [i]);
         }
      }

      // Transform particles.

      gl .bindFramebuffer (gl .FRAMEBUFFER, browser .getDefaultFrameBuffer ()); // Prevent texture feedback loop error, see NYC in Firefox.
      gl .bindBuffer (gl .ARRAY_BUFFER, null);
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, this .transformFeedback);
      gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, particleSystem .outputParticles);
      gl .enable (gl .RASTERIZER_DISCARD);
      gl .beginTransformFeedback (gl .POINTS);
      gl .drawArrays (gl .POINTS, 0, particleSystem .numParticles);
      gl .endTransformFeedback ();
      gl .disable (gl .RASTERIZER_DISCARD);
      gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

      // DEBUG

      // const data = new Float32Array (particleSystem .numParticles * (particleSystem .particlesStride / 4));
      // gl .bindBuffer (gl .ARRAY_BUFFER, particleSystem .outputParticles);
      // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
      // console .log (data .slice (0, particleSystem .particlesStride / 4));
   },
   addDefine (define)
   {
      this .defines .push (define);
   },
   addSampler (name)
   {
      this .samplers .push (name);
   },
   addUniform (name, uniform)
   {
      this .uniforms .set (name, uniform);
   },
   setUniform (func, name, value1, value2, value3)
   {
      const gl = this .getBrowser () .getContext ();

      for (const program of this .programs .values ())
      {
         gl .useProgram (program);
         gl [func] (program [name], value1, value2, value3);
      }
   },
   addCallback (callback)
   {
      this .callbacks .push (callback);
   },
   addFunction (func)
   {
      this .functions .push (func);
   },
   getProgram (particleSystem)
   {
      const { geometryType, createParticles, numColors, numTexCoords, numForces, boundedHierarchyRoot } = particleSystem;

      let key = "";

      key += geometryType;
      key += createParticles && this .on ? 1 : 0;
      key += ".";
      key += numColors
      key += ".";
      key += numTexCoords;
      key += ".";
      key += numForces
      key += ".";
      key += boundedHierarchyRoot;

      return this .programs .get (key) ??
         this .createProgram (key, particleSystem);
   },
   createProgram (key, particleSystem)
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext (),
         defines = this .defines .slice ();

      defines .push (`#define X3D_GEOMETRY_TYPE ${particleSystem .geometryType}`)
      defines .push (`${particleSystem .createParticles && this .on ? "#define X3D_CREATE_PARTICLES" : ""}`);
      defines .push (`#define X3D_NUM_COLORS ${particleSystem .numColors}`);
      defines .push (`#define X3D_NUM_TEX_COORDS ${particleSystem .numTexCoords}`);
      defines .push (`#define X3D_NUM_FORCES ${particleSystem .numForces}`);
      defines .push (`${particleSystem .boundedHierarchyRoot > -1 ? "#define X3D_BOUNDED_VOLUME" : ""}`);

      const vertexShaderSource = /* glsl */ `#version 300 es

      precision highp float;
      precision highp int;
      precision highp sampler2D;

      ${defines .join ("\n")}

      uniform int   randomSeed;
      uniform float particleLifetime;
      uniform float lifetimeVariation;
      uniform float deltaTime;
      uniform vec2  particleSize;

      #if X3D_NUM_FORCES > 0
         uniform sampler2D forces;
      #endif

      #if defined (X3D_BOUNDED_VOLUME)
         uniform int       boundedVerticesIndex;
         uniform int       boundedNormalsIndex;
         uniform int       boundedHierarchyIndex;
         uniform int       boundedHierarchyRoot;
         uniform sampler2D boundedVolume;
      #endif

      #if X3D_NUM_COLORS > 0
         uniform sampler2D colorRamp;
      #endif

      #if X3D_NUM_TEX_COORDS > 0
         uniform int       texCoordCount;
         uniform sampler2D texCoordRamp;
      #endif

      ${Array .from (this .uniforms .values ()) .join ("\n")}

      in vec4 input0; // (life, lifetime, elapsedTime, texCoordIndex0)
      in vec4 input2; // (velocity, 0.0)
      in vec4 input6; // position

      out vec4 output0; // (life, lifetime, elapsedTime, texCoordIndex0)
      out vec4 output1; // (color)
      out vec4 output2; // (velocity, 0.0)

      out vec4 output3; // scale rotation matrix
      out vec4 output4; // scale rotation matrix
      out vec4 output5; // scale rotation matrix
      out vec4 output6; // position

      // Constants

      ${Object .entries (GeometryTypes) .map (([k, v]) => `#define ${k} ${v}`) .join ("\n")}

      const int   ARRAY_SIZE = 32;
      const float M_PI       = 3.14159265359;

      uniform float NaN;

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
      // Try Waterfall test.
      vec3
      save_normalize (const in vec3 vector)
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
         vec3 from = save_normalize (fromVector);
         vec3 to   = save_normalize (toVector);

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

               t = save_normalize (t);

               return vec4 (t, 0.0);
            }
         }
         else
         {
            float s = sqrt (abs (1.0 - cos_angle) * 0.5);

            cross_vec = save_normalize (cross_vec);

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

      mat3
      Matrix3 (const in vec4 quaternion)
      {
         float x = quaternion .x;
         float y = quaternion .y;
         float z = quaternion .z;
         float w = quaternion .w;
         float A = y * y;
         float B = z * z;
         float C = x * y;
         float D = z * w;
         float E = z * x;
         float F = y * w;
         float G = x * x;
         float H = y * z;
         float I = x * w;

         return mat3 (1.0 - 2.0 * (A + B),
                      2.0 * (C + D),
                      2.0 * (E - F),
                      2.0 * (C - D),
                      1.0 - 2.0 * (B + G),
                      2.0 * (H + I),
                      2.0 * (E + F),
                      2.0 * (H - I),
                      1.0 - 2.0 * (A + G));
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

      #if X3D_NUM_COLORS > 0 || defined (X3D_POLYLINE_EMITTER) || defined (X3D_SURFACE_EMITTER) || defined (X3D_VOLUME_EMITTER)
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
      #endif

      #if X3D_NUM_TEX_COORDS > 0
      void
      interpolate (const in sampler2D sampler, const in int count, const in float fraction, out int index0)
      {
         // Determine index0.

         if (count == 1 || fraction <= texelFetch (sampler, 0, 0) .x)
         {
            index0 = 0;
         }
         else if (fraction >= texelFetch (sampler, count - 1, 0) .x)
         {
            index0 = count - 2;
         }
         else
         {
            int index = upperBound (sampler, count, fraction);

            if (index < count)
               index0 = index - 1;
            else
               index0 = 0;
         }
      }
      #endif

      #if defined (X3D_SURFACE_EMITTER) || defined (X3D_VOLUME_EMITTER)
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
      getRandomPointOnSurface (const in sampler2D surface, const in int verticesIndex, const in int normalsIndex, out vec4 position, out vec3 normal)
      {
         // Determine index0, index1 and weight.

         float lastAreaSoFar = texelFetch (surface, verticesIndex - 1, 0) .x;
         float fraction      = random () * lastAreaSoFar;

         int   index0;
         int   index1;
         int   index2;
         float weight;

         interpolate (surface, verticesIndex, fraction, index0, index1, weight);

         // Interpolate and return position.

         index0 *= 3;
         index1  = index0 + 1;
         index2  = index0 + 2;

         vec4 vertex0 = texelFetch (surface, verticesIndex + index0, 0);
         vec4 vertex1 = texelFetch (surface, verticesIndex + index1, 0);
         vec4 vertex2 = texelFetch (surface, verticesIndex + index2, 0);

         vec3 normal0 = texelFetch (surface, normalsIndex + index0, 0) .xyz;
         vec3 normal1 = texelFetch (surface, normalsIndex + index1, 0) .xyz;
         vec3 normal2 = texelFetch (surface, normalsIndex + index2, 0) .xyz;

         // Random barycentric coordinates.

         vec3 r = getRandomBarycentricCoord ();

         // Calculate position and direction.

         position = r .z * vertex0 + r .x * vertex1 + r .y * vertex2;
         normal   = save_normalize (r .z * normal0 + r .x * normal1 + r .y * normal2);
      }
      #endif

      // Functions

      ${this .functions .join ("\n")}

      // Current values

      #if X3D_NUM_COLORS > 0
      vec4
      getColor (const in float lifetime, const in float elapsedTime)
      {
         // Determine index0, index1 and weight.

         float fraction = elapsedTime / lifetime;

         int   index0;
         int   index1;
         float weight;

         interpolate (colorRamp, X3D_NUM_COLORS, fraction, index0, index1, weight);

         // Interpolate and return color.

         vec4 color0 = texelFetch (colorRamp, X3D_NUM_COLORS + index0, 0);
         vec4 color1 = texelFetch (colorRamp, X3D_NUM_COLORS + index1, 0);

         return mix (color0, color1, weight);
      }
      #else
         #define getColor(lifetime, elapsedTime) (vec4 (1.0))
      #endif

      #if defined (X3D_BOUNDED_VOLUME)
      void
      bounce (const in float deltaTime, const in vec4 fromPosition, inout vec4 toPosition, inout vec3 velocity)
      {
         Line3 line = Line3 (fromPosition .xyz, save_normalize (velocity));

         vec4 points  [ARRAY_SIZE];
         vec3 normals [ARRAY_SIZE];

         int numIntersections = getIntersections (boundedVolume, boundedVerticesIndex, boundedNormalsIndex, boundedHierarchyIndex, boundedHierarchyRoot, line, points, normals);

         if (numIntersections == 0)
            return;

         Plane3 plane1 = plane3 (line .point, line .direction);

         int index = min_index (points, numIntersections, 0.0, plane1);

         if (index == -1)
            return;

         vec3 point  = points [index] .xyz;
         vec3 normal = save_normalize (normals [index]);

         Plane3 plane2 = plane3 (point, normal);

         if (sign (plane_distance (plane2, fromPosition .xyz)) == sign (plane_distance (plane2, toPosition .xyz)))
            return;

         float damping = length (normals [index]);

         velocity   = reflect (velocity, normal);
         toPosition = vec4 (point + save_normalize (velocity) * 0.0001, 1.0);
         velocity  *= damping;
      }
      #endif

      #if X3D_NUM_TEX_COORDS > 0
      int
      getTexCoordIndex0 (const in float lifetime, const in float elapsedTime)
      {
         float fraction = elapsedTime / lifetime;
         int   index0   = 0;

         interpolate (texCoordRamp, X3D_NUM_TEX_COORDS, fraction, index0);

         return X3D_NUM_TEX_COORDS + index0 * texCoordCount;
      }
      #else
         #define getTexCoordIndex0(lifetime, elapsedTime) (-1)
      #endif

      void
      main ()
      {
         int   life        = int (input0 [0]);
         float lifetime    = input0 [1];
         float elapsedTime = input0 [2] + deltaTime;

         srand ((gl_VertexID + randomSeed) * randomSeed);

         if (elapsedTime > lifetime)
         {
            // Create new particle or hide particle.

            lifetime    = getRandomLifetime ();
            elapsedTime = 0.0;

            output0 = vec4 (max (life + 1, 1), lifetime, elapsedTime, getTexCoordIndex0 (lifetime, elapsedTime));

            #if defined (X3D_CREATE_PARTICLES)
               output1 = getColor (lifetime, elapsedTime);
               output2 = vec4 (getRandomVelocity (), 0.0);
               output6 = getRandomPosition ();
            #else
               output1 = vec4 (0.0);
               output2 = vec4 (0.0);
               output6 = vec4 (NaN);
            #endif
         }
         else
         {
            // Animate particle.

            vec3 velocity = input2 .xyz;
            vec4 position = input6;

            #if X3D_NUM_FORCES > 0
               for (int i = 0; i < X3D_NUM_FORCES; ++ i)
               {
                  vec4  force      = texelFetch (forces, i, 0);
                  float turbulence = force .w;
                  vec3  normal     = getRandomNormalWithDirectionAndAngle (force .xyz, turbulence);
                  float speed      = length (force .xyz);

                  velocity += normal * speed;
               }
            #endif

            position .xyz += velocity * deltaTime;

            #if defined (X3D_BOUNDED_VOLUME)
               bounce (deltaTime, input6, position, velocity);
            #endif

            output0 = vec4 (life, lifetime, elapsedTime, getTexCoordIndex0 (lifetime, elapsedTime));
            output1 = getColor (lifetime, elapsedTime);
            output2 = vec4 (velocity, 0.0);
            output6 = position;
         }

         #if X3D_GEOMETRY_TYPE == POINT || X3D_GEOMETRY_TYPE == SPRITE || X3D_GEOMETRY_TYPE == GEOMETRY
            output3 = vec4 (1.0, 0.0, 0.0, 0.0);
            output4 = vec4 (0.0, 1.0, 0.0, 0.0);
            output5 = vec4 (0.0, 0.0, 1.0, 0.0);
         #elif X3D_GEOMETRY_TYPE == LINE
            mat3 m = Matrix3 (Quaternion (vec3 (0.0, 0.0, 1.0), output2 .xyz));

            output3 = vec4 (m [0], 0.0);
            output4 = vec4 (m [1], 0.0);
            output5 = vec4 (m [2], 0.0);
         #else
            output3 = vec4 (particleSize .x, 0.0, 0.0, 0.0);
            output4 = vec4 (0.0, particleSize .y, 0.0, 0.0);
            output5 = vec4 (0.0, 0.0, 1.0, 0.0);
         #endif
      }
      `;

      const fragmentShaderSource = /* glsl */ `#version 300 es

      precision highp float;

      void
      main () { }
      `;

      // Vertex shader

      const vertexShader = gl .createShader (gl .VERTEX_SHADER);

      gl .shaderSource (vertexShader, vertexShaderSource);
      gl .compileShader (vertexShader);

      if (!gl .getShaderParameter (vertexShader, gl .COMPILE_STATUS))
         console .error (gl .getShaderInfoLog (vertexShader));

      // Fragment shader

      const fragmentShader = gl .createShader (gl .FRAGMENT_SHADER);

      gl .shaderSource (fragmentShader, fragmentShaderSource);
      gl .compileShader (fragmentShader);

      if (!gl .getShaderParameter (fragmentShader, gl .COMPILE_STATUS))
         console .error (gl .getShaderInfoLog (fragmentShader));

      // Program

      const program = gl .createProgram ();

      gl .attachShader (program, vertexShader);
      gl .attachShader (program, fragmentShader);
      gl .transformFeedbackVaryings (program, Array .from ({length: 7}, (_, i) => "output" + i), gl .INTERLEAVED_ATTRIBS);
      gl .linkProgram (program);

      if (!gl .getProgramParameter (program, gl .LINK_STATUS))
      {
         console .error (`Couldn't initialize particle shader: ${gl .getProgramInfoLog (program)}`);
         // console .error (vertexShaderSource);
      }

      this .programs .set (key, program);

      gl .useProgram (program);

      // Attributes

      program .inputs = [
         [0, gl .getAttribLocation (program, "input0")],
         [2, gl .getAttribLocation (program, "input2")],
         [6, gl .getAttribLocation (program, "input6")],
      ];

      // Uniforms

      program .randomSeed        = gl .getUniformLocation (program, "randomSeed");
      program .particleLifetime  = gl .getUniformLocation (program, "particleLifetime");
      program .lifetimeVariation = gl .getUniformLocation (program, "lifetimeVariation");
      program .deltaTime         = gl .getUniformLocation (program, "deltaTime");
      program .particleSize      = gl .getUniformLocation (program, "particleSize");

      program .forces = gl .getUniformLocation (program, "forces");

      program .boundedVerticesIndex  = gl .getUniformLocation (program, "boundedVerticesIndex");
      program .boundedNormalsIndex   = gl .getUniformLocation (program, "boundedNormalsIndex");
      program .boundedHierarchyIndex = gl .getUniformLocation (program, "boundedHierarchyIndex");
      program .boundedHierarchyRoot  = gl .getUniformLocation (program, "boundedHierarchyRoot");
      program .boundedVolume         = gl .getUniformLocation (program, "boundedVolume");

      program .colorRamp = gl .getUniformLocation (program, "colorRamp");

      program .texCoordCount = gl .getUniformLocation (program, "texCoordCount");
      program .texCoordRamp  = gl .getUniformLocation (program, "texCoordRamp");

      for (const name of this .uniforms .keys ())
         program [name] = gl .getUniformLocation (program, name);

      gl .uniform1f (gl .getUniformLocation (program, "NaN"), NaN);

      // Samplers

      for (const name of this .samplers)
      {
         const location = gl .getUniformLocation (program, name);

         gl .uniform1i (location, program [name + "TextureUnit"] = browser .getTexture2DUnit ());
      }

      browser .resetTextureUnits ();

      // Field uniforms

      for (const callback of this .callbacks)
         callback .call (this);

      // Return

      return program;
   },
   activateTextures ()
   { },
   createTexture ()
   {
      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);

      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

      return texture;
   },
   getTexture2DUnit (browser, object, property)
   {
      const textureUnit = object [property];

      if (textureUnit === undefined)
         return object [property] = browser .getTexture2DUnit ();

      return textureUnit;
   },
});

Object .defineProperties (X3DParticleEmitterNode, X3DNode .getStaticProperties ("X3DParticleEmitterNode", "ParticleSystems", 1));

export default X3DParticleEmitterNode;
