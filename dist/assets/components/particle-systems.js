(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
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


 define ('x_ite/Browser/ParticleSystems/GeometryTypes',[],function ()
{
"use strict";

   let i = 0;

   const GeometryTypes = {
      POINT:    i ++,
      LINE:     i ++,
      TRIANGLE: i ++,
      QUAD:     i ++,
      SPRITE:   i ++,
      GEOMETRY: i ++,
   };

   return GeometryTypes;
});


define('text!x_ite/Browser/ParticleSystems/Line3.glsl',[],function () { return 'struct Line3 {\n   vec3 point;\n   vec3 direction;\n};\n\n// Line3\n// line3 (const in vec3 point1, const in vec3 point2)\n// {\n//    return Line3 (point1, normalize (point2 - point1));\n// }\n\n/* Line intersect triangle */\n\nbool\nintersects (const in Line3 line, const in vec3 a, const in vec3 b, const in vec3 c, out vec3 r)\n{\n   // find vectors for two edges sharing vert0\n   vec3 edge1 = b - a;\n   vec3 edge2 = c - a;\n\n   // begin calculating determinant - also used to calculate U parameter\n   vec3 pvec = cross (line .direction, edge2);\n\n   // if determinant is near zero, ray lies in plane of triangle\n   float det = dot (edge1, pvec);\n\n   // Non culling intersection\n\n   if (det == 0.0)\n      return false;\n\n   float inv_det = 1.0 / det;\n\n   // calculate distance from vert0 to ray point\n   vec3 tvec = line .point - a;\n\n   // calculate U parameter and test bounds\n   float u = dot (tvec, pvec) * inv_det;\n\n   if (u < 0.0 || u > 1.0)\n      return false;\n\n   // prepare to test V parameter\n   vec3 qvec = cross (tvec, edge1);\n\n   // calculate V parameter and test bounds\n   float v = dot (line .direction, qvec) * inv_det;\n\n   if (v < 0.0 || u + v > 1.0)\n      return false;\n\n   r = vec3 (u, v, 1.0 - u - v);\n\n   return true;\n}\n';});


define('text!x_ite/Browser/ParticleSystems/Plane3.glsl',[],function () { return 'struct Plane3\n{\n   vec3  normal;\n   float distanceFromOrigin;\n};\n\nPlane3\nplane3 (const in vec3 point, const in vec3 normal)\n{\n   return Plane3 (normal, dot (normal, point));\n}\n\nfloat\nplane_distance (const in Plane3 plane, const in vec3 point)\n{\n   return dot (point, plane .normal) - plane .distanceFromOrigin;\n}\n\n/* Plane intersect line */\nbool\nintersects (const in Plane3 plane, const in Line3 line, out vec3 point)\n{\n   // Check if the line is parallel to the plane.\n   float theta = dot (line .direction, plane .normal);\n\n   // Plane and line are parallel.\n   if (theta == 0.0)\n      return false;\n\n   // Plane and line are not parallel. The intersection point can be calculated now.\n   float t = (plane .distanceFromOrigin - dot (plane .normal, line .point)) / theta;\n\n   point = line .point + line .direction * t;\n\n   return true;\n}\n\n/* Find find the first point that is farther to the plane than value. */\n// int\n// upper_bound (const in vec4 points [ARRAY_SIZE], in int count, const in float value, const in Plane3 plane)\n// {\n//    int first = 0;\n//    int step  = 0;\n\n//    while (count > 0)\n//    {\n//       int index = first;\n\n//       step = count >> 1;\n\n//       index += step;\n\n//       if (value < plane_distance (plane, points [index] .xyz))\n//       {\n//          count = step;\n//       }\n//       else\n//       {\n//          first  = ++ index;\n//          count -= step + 1;\n//       }\n//    }\n\n//    return first;\n// }\n\n/* CombSort: sort points in distance to a plane. */\nvoid\nsort (inout vec4 points [ARRAY_SIZE], const in int count, const in Plane3 plane)\n{\n   const float shrink = 1.0 / 1.3;\n\n   int  gap       = count;\n   bool exchanged = true;\n\n   while (exchanged)\n   {\n      gap = int (float (gap) * shrink);\n\n      if (gap <= 1)\n      {\n         exchanged = false;\n         gap       = 1;\n      }\n\n      for (int i = 0, l = count - gap; i < l; ++ i)\n      {\n         int j = gap + i;\n\n         if (plane_distance (plane, points [i] .xyz) > plane_distance (plane, points [j] .xyz))\n         {\n            vec4 tmp1 = points [i];\n            points [i] = points [j];\n            points [j] = tmp1;\n\n            exchanged = true;\n         }\n      }\n   }\n}\n\n\n// /* CombSort: sort points and normals in distance to a plane. */\n// void\n// sort (inout vec4 points [ARRAY_SIZE], inout vec3 normals [ARRAY_SIZE], const in int count, const in Plane3 plane)\n// {\n//    const float shrink = 1.0 / 1.3;\n\n//    int  gap       = count;\n//    bool exchanged = true;\n\n//    while (exchanged)\n//    {\n//       gap = int (float (gap) * shrink);\n\n//       if (gap <= 1)\n//       {\n//          exchanged = false;\n//          gap       = 1;\n//       }\n\n//       for (int i = 0, l = count - gap; i < l; ++ i)\n//       {\n//          int j = gap + i;\n\n//          if (plane_distance (plane, points [i] .xyz) > plane_distance (plane, points [j] .xyz))\n//          {\n//             vec4 tmp1 = points [i];\n//             points [i] = points [j];\n//             points [j] = tmp1;\n\n//             vec3 tmp2   = normals [i];\n//             normals [i] = normals [j];\n//             normals [j] = tmp2;\n\n//             exchanged = true;\n//          }\n//       }\n//    }\n// }\n\nint\nmin_index (const in vec4 points [ARRAY_SIZE], const in int count, const in float value, const in Plane3 plane)\n{\n   int   index = -1;\n   float dist  = 1000000.0;\n\n   for (int i = 0; i < count; ++ i)\n   {\n      float d = plane_distance (plane, points [i] .xyz);\n\n      if (d >= value && d < dist)\n      {\n         dist  = d;\n         index = i;\n      }\n   }\n\n   return index;\n}\n';});


define('text!x_ite/Browser/ParticleSystems/Box3.glsl',[],function () { return 'bool\nintersects (const in vec3 min, const in vec3 max, const in Line3 line)\n{\n   vec3 intersection;\n\n   // front\n\n   if (intersects (plane3 (max, vec3 (0.0, 0.0, 1.0)), line, intersection))\n   {\n      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))\n         return true;\n   }\n\n   // back\n\n   if (intersects (plane3 (min, vec3 (0.0, 0.0, -1.0)), line, intersection))\n   {\n      if (all (greaterThanEqual (vec4 (intersection .xy, max .xy), vec4 (min .xy, intersection .xy))))\n         return true;\n   }\n\n   // top\n\n   if (intersects (plane3 (max, vec3 (0.0, 1.0, 0.0)), line, intersection))\n   {\n      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))\n         return true;\n   }\n\n   // bottom\n\n   if (intersects (plane3 (min, vec3 (0.0, -1.0, 0.0)), line, intersection))\n   {\n      if (all (greaterThanEqual (vec4 (intersection .xz, max .xz), vec4 (min .xz, intersection .xz))))\n         return true;\n   }\n\n   // right\n\n   if (intersects (plane3 (max, vec3 (1.0, 0.0, 0.0)), line, intersection))\n   {\n      if (all (greaterThanEqual (vec4 (intersection .yz, max .yz), vec4 (min .yz, intersection .yz))))\n         return true;\n   }\n\n   return false;\n}\n';});


define('text!x_ite/Browser/ParticleSystems/BVH.glsl',[],function () { return '#define BVH_NODE        0\n#define BVH_TRIANGLE    1\n#define BVH_STACK_SIZE  32\n\nint bvhNodeIndex = 0;\n\nvoid\nsetBVHIndex (const in int index)\n{\n   bvhNodeIndex = index;\n}\n\nint\ngetBVHRoot (const in sampler2D volume, const in int hierarchyIndex, const in int rootIndex)\n{\n   return int (texelFetch (volume, rootIndex, 0) .x) + hierarchyIndex;\n}\n\nint\ngetBVHType (const in sampler2D volume)\n{\n   return int (texelFetch (volume, bvhNodeIndex, 0) .x);\n}\n\nvec3\ngetBVHMin (const in sampler2D volume)\n{\n   return texelFetch (volume, bvhNodeIndex + 1, 0) .xyz;\n}\n\nvec3\ngetBVHMax (const in sampler2D volume)\n{\n   return texelFetch (volume, bvhNodeIndex + 2, 0) .xyz;\n}\n\nint\ngetBVHLeft (const in sampler2D volume, const in int hierarchyIndex)\n{\n   return int (texelFetch (volume, bvhNodeIndex, 0) .y) + hierarchyIndex;\n}\n\nint\ngetBVHRight (const in sampler2D volume, const in int hierarchyIndex)\n{\n   return int (texelFetch (volume, bvhNodeIndex, 0) .z) + hierarchyIndex;\n}\n\nint\ngetBVHTriangle (const in sampler2D volume)\n{\n   return int (texelFetch (volume, bvhNodeIndex, 0) .y);\n}\n\n/* Ray triangle intersection test */\n\nint\ngetIntersections (const in sampler2D volume, const in int verticesIndex, const in int hierarchyIndex, const in int rootIndex, const in Line3 line, out vec4 points [ARRAY_SIZE])\n{\n   int current    = getBVHRoot (volume, hierarchyIndex, rootIndex);\n   int count      = 0;\n   int stackIndex = -1;\n   int stack [BVH_STACK_SIZE];\n\n   while (stackIndex >= 0 || current >= 0)\n   {\n      if (current >= 0)\n      {\n         setBVHIndex (current);\n\n         if (getBVHType (volume) == BVH_NODE)\n         {\n            // Node\n\n            if (intersects (getBVHMin (volume), getBVHMax (volume), line))\n            {\n               stack [++ stackIndex] = current;\n\n               current = getBVHLeft (volume, hierarchyIndex);\n            }\n            else\n            {\n               current = -1;\n            }\n         }\n         else\n         {\n            // Triangle\n\n            int  t = getBVHTriangle (volume);\n            int  v = verticesIndex + t;\n            vec3 r = vec3 (0.0);\n\n            vec3 a = texelFetch (volume, v,     0) .xyz;\n            vec3 b = texelFetch (volume, v + 1, 0) .xyz;\n            vec3 c = texelFetch (volume, v + 2, 0) .xyz;\n\n            if (intersects (line, a, b, c, r))\n               points [count ++] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);\n\n            current = -1;\n         }\n      }\n      else\n      {\n         setBVHIndex (stack [stackIndex --]);\n\n         current = getBVHRight (volume, hierarchyIndex);\n      }\n   }\n\n   return count;\n}\n\nint\ngetIntersections (const in sampler2D volume, const in int verticesIndex, const in int normalsIndex, const in int hierarchyIndex, const in int rootIndex, const in Line3 line, out vec4 points [ARRAY_SIZE], out vec3 normals [ARRAY_SIZE])\n{\n   int current    = getBVHRoot (volume, hierarchyIndex, rootIndex);\n   int count      = 0;\n   int stackIndex = -1;\n   int stack [BVH_STACK_SIZE];\n\n   while (stackIndex >= 0 || current >= 0)\n   {\n      if (current >= 0)\n      {\n         setBVHIndex (current);\n\n         if (getBVHType (volume) == BVH_NODE)\n         {\n            // Node\n\n            if (intersects (getBVHMin (volume), getBVHMax (volume), line))\n            {\n               stack [++ stackIndex] = current;\n\n               current = getBVHLeft (volume, hierarchyIndex);\n            }\n            else\n            {\n               current = -1;\n            }\n         }\n         else\n         {\n            // Triangle\n\n            int  t = getBVHTriangle (volume);\n            int  v = verticesIndex + t;\n            vec3 r = vec3 (0.0);\n\n            vec3 a = texelFetch (volume, v,     0) .xyz;\n            vec3 b = texelFetch (volume, v + 1, 0) .xyz;\n            vec3 c = texelFetch (volume, v + 2, 0) .xyz;\n\n            if (intersects (line, a, b, c, r))\n            {\n               points [count] = vec4 (r .z * a + r .x * b + r .y * c, 1.0);\n\n               int n = normalsIndex + t;\n\n               vec3 n0 = texelFetch (volume, n,     0) .xyz;\n               vec3 n1 = texelFetch (volume, n + 1, 0) .xyz;\n               vec3 n2 = texelFetch (volume, n + 2, 0) .xyz;\n\n               normals [count] = save_normalize (r .z * n0 + r .x * n1 + r .y * n2);\n\n               ++ count;\n            }\n\n            current = -1;\n         }\n      }\n      else\n      {\n         setBVHIndex (stack [stackIndex --]);\n\n         current = getBVHRight (volume, hierarchyIndex);\n      }\n   }\n\n   return count;\n}\n';});

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
   "x_ite/Browser/ParticleSystems/GeometryTypes",
   "x_ite/Base/X3DConstants",
   "text!x_ite/Browser/ParticleSystems/Line3.glsl",
   "text!x_ite/Browser/ParticleSystems/Plane3.glsl",
   "text!x_ite/Browser/ParticleSystems/Box3.glsl",
   "text!x_ite/Browser/ParticleSystems/BVH.glsl",
],
function (X3DNode,
          GeometryTypes,
          X3DConstants,
          Line3Source,
          Plane3Source,
          Box3Source,
          BVHSource)
{
"use strict";

   function X3DParticleEmitterNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DParticleEmitterNode);

      this ._speed       .setUnit ("speed");
      this ._mass        .setUnit ("mass");
      this ._surfaceArea .setUnit ("area");

      this .samplers  = [ ];
      this .uniforms  = { };
      this .functions = [ ];
      this .program   = null;

      this .addSampler ("forces");
      this .addSampler ("boundedVolume");
      this .addSampler ("colorRamp");
      this .addSampler ("texCoordRamp");

      this .addUniform ("speed",     "uniform float speed;");
      this .addUniform ("variation", "uniform float variation;");

      this .addFunction (Line3Source);
      this .addFunction (Plane3Source);
      this .addFunction (Box3Source);
      this .addFunction (BVHSource);
   }

   X3DParticleEmitterNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: X3DParticleEmitterNode,
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         const gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         // Create program.

         this .program           = this .createProgram ();
         this .transformFeedback = gl .createTransformFeedback ();

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
            browser         = this .getBrowser (),
            gl              = browser .getContext (),
            inputParticles  = particleSystem .inputParticles,
            particleStride  = particleSystem .particleStride,
            particleOffsets = particleSystem .particleOffsets,
            program         = this .program;

         // Start

         gl .useProgram (program);

         // Uniforms

         gl .uniform1i (program .randomSeed,        Math .random () * 0xffffffff);
         gl .uniform1i (program .geometryType,      particleSystem .geometryType);
         gl .uniform1i (program .createParticles,   particleSystem .createParticles && this .on);
         gl .uniform1f (program .particleLifetime,  particleSystem .particleLifetime);
         gl .uniform1f (program .lifetimeVariation, particleSystem .lifetimeVariation);
         gl .uniform1f (program .deltaTime,         deltaTime);
         gl .uniform2f (program .particleSize,      particleSystem ._particleSize .x, particleSystem ._particleSize .y);

         // Forces

         gl .uniform1i (program .numForces, particleSystem .numForces);

         if (particleSystem .numForces)
         {
            gl .activeTexture (gl .TEXTURE0 + program .forcesTextureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .forcesTexture);
         }

         // Bounded Physics

         if (particleSystem .boundedHierarchyRoot < 0)
         {
            gl .uniform1i (program .boundedHierarchyRoot, -1);
         }
         else
         {
            gl .uniform1i (program .boundedVerticesIndex,  particleSystem .boundedVerticesIndex);
            gl .uniform1i (program .boundedNormalsIndex,   particleSystem .boundedNormalsIndex);
            gl .uniform1i (program .boundedHierarchyIndex, particleSystem .boundedHierarchyIndex);
            gl .uniform1i (program .boundedHierarchyRoot,  particleSystem .boundedHierarchyRoot);

            gl .activeTexture (gl .TEXTURE0 + program .boundedVolumeTextureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .boundedTexture);
         }

         // Colors

         gl .uniform1i (program .numColors, particleSystem .numColors);

         if (particleSystem .numColors)
         {
            gl .activeTexture (gl .TEXTURE0 + program .colorRampTextureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .colorRampTexture);
         }

         // TexCoords

         gl .uniform1i (program .numTexCoords, particleSystem .numTexCoords);

         if (particleSystem .numTexCoords)
         {
            gl .uniform1i (program .texCoordCount, particleSystem .texCoordCount);

            gl .activeTexture (gl .TEXTURE0 + program .texCoordRampTextureUnit);
            gl .bindTexture (gl .TEXTURE_2D, particleSystem .texCoordRampTexture);
         }

         // Other textures

         this .activateTextures (gl, program);

         // Input attributes

         if (inputParticles .emitterArrayObject .enable (gl, program))
         {
            for (const [i, attribute] of program .inputs)
            {
               gl .bindBuffer (gl .ARRAY_BUFFER, inputParticles);
               gl .enableVertexAttribArray (attribute);
               gl .vertexAttribPointer (attribute, 4, gl .FLOAT, false, particleStride, particleOffsets [i]);
            }

            gl .bindBuffer (gl .ARRAY_BUFFER, null);
         }

         // Transform particles.

         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, this .transformFeedback);
         gl .bindBufferBase (gl .TRANSFORM_FEEDBACK_BUFFER, 0, particleSystem .outputParticles);
         gl .enable (gl .RASTERIZER_DISCARD);
         gl .beginTransformFeedback (gl .POINTS);
         gl .drawArrays (gl .POINTS, 0, particleSystem .numParticles);
         gl .endTransformFeedback ();
         gl .disable (gl .RASTERIZER_DISCARD);
         gl .bindTransformFeedback (gl .TRANSFORM_FEEDBACK, null);

         // DEBUG

         // const data = new Float32Array (particleSystem .numParticles * (particleStride / 4));
         // gl .bindBuffer (gl .ARRAY_BUFFER, particleSystem .outputParticles);
         // gl .getBufferSubData (gl .ARRAY_BUFFER, 0, data);
         // console .log (data .slice (0, particleStride / 4));
      },
      addSampler: function (name)
      {
         this .samplers .push (name);
      },
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
         precision highp sampler2D;

         uniform int   randomSeed;
         uniform int   geometryType;
         uniform bool  createParticles;
         uniform float particleLifetime;
         uniform float lifetimeVariation;
         uniform float deltaTime;
         uniform vec2  particleSize;

         uniform int       numForces;
         uniform sampler2D forces;

         uniform int       boundedVerticesIndex;
         uniform int       boundedNormalsIndex;
         uniform int       boundedHierarchyIndex;
         uniform int       boundedHierarchyRoot;
         uniform sampler2D boundedVolume;

         uniform int       numColors;
         uniform sampler2D colorRamp;

         uniform int       texCoordCount;
         uniform int       numTexCoords;
         uniform sampler2D texCoordRamp;

         ${Object .values (this .uniforms) .join ("\n")}

         in vec4 input0;
         in vec4 input2;
         in vec4 input6;

         out vec4 output0;
         out vec4 output1;
         out vec4 output2;

         out vec4 output3;
         out vec4 output4;
         out vec4 output5;
         out vec4 output6;

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
         bounce (const in vec4 fromPosition, inout vec4 toPosition, inout vec3 velocity)
         {
            if (boundedHierarchyRoot < 0)
               return;

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

            Plane3 plane2 = plane3 (points [index] .xyz, normals [index]);

            if (sign (plane_distance (plane2, fromPosition .xyz)) == sign (plane_distance (plane2, toPosition .xyz)))
               return;

            velocity   = reflect (velocity, normals [index]);
            toPosition = vec4 (points [index] .xyz + reflect (points [index] .xyz - fromPosition .xyz, normals [index]), 1.0);
         }

         int
         getTexCoordIndex0 (const in float lifetime, const in float elapsedTime)
         {
            if (numTexCoords == 0)
            {
               return -1;
            }
            else
            {
               float fraction = elapsedTime / lifetime;
               int   index0   = 0;

               interpolate (texCoordRamp, numTexCoords, fraction, index0);

               return numTexCoords + index0 * texCoordCount;
            }
         }

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

               if (createParticles)
               {
                  output1 = getColor (lifetime, elapsedTime);
                  output2 = vec4 (getRandomVelocity (), 0.0);
                  output6 = getRandomPosition ();
               }
               else
               {
                  output1 = vec4 (0.0);
                  output2 = vec4 (0.0);
                  output6 = vec4 (NaN);
               }
            }
            else
            {
               // Animate particle.

               vec3 velocity = input2 .xyz;
               vec4 position = input6;

               for (int i = 0; i < numForces; ++ i)
               {
                  vec4  force      = texelFetch (forces, i, 0);
                  float turbulence = force .w;
                  vec3  normal     = getRandomNormalWithDirectionAndAngle (force .xyz, turbulence);
                  float speed      = length (force .xyz);

                  velocity += normal * speed;
               }

               position .xyz += velocity * deltaTime;

               bounce (input6, position, velocity);

               output0 = vec4 (life, lifetime, elapsedTime, getTexCoordIndex0 (lifetime, elapsedTime));
               output1 = getColor (lifetime, elapsedTime);
               output2 = vec4 (velocity, 0.0);
               output6 = position;
            }

            switch (geometryType)
            {
               case POINT:
               case SPRITE:
               case GEOMETRY:
               {
                  output3 = vec4 (1.0, 0.0, 0.0, 0.0);
                  output4 = vec4 (0.0, 1.0, 0.0, 0.0);
                  output5 = vec4 (0.0, 0.0, 1.0, 0.0);
                  break;
               }
               case LINE:
               {
                  mat3 r = Matrix3 (Quaternion (vec3 (0.0, 0.0, 1.0), output2 .xyz));
                  mat3 s = mat3 (1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, particleSize .y);
                  mat3 m = r * s;

                  output3 = vec4 (m [0], 0.0);
                  output4 = vec4 (m [1], 0.0);
                  output5 = vec4 (m [2], 0.0);
                  break;
               }
               default: // QUAD, TRIANGLE
               {
                  output3 = vec4 (particleSize .x, 0.0, 0.0, 0.0);
                  output4 = vec4 (0.0, particleSize .y, 0.0, 0.0);
                  output5 = vec4 (0.0, 0.0, 1.0, 0.0);
                  break;
               }
            }
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

         // Fragment shader

         const fragmentShader = gl .createShader (gl .FRAGMENT_SHADER);

         gl .shaderSource (fragmentShader, fragmentShaderSource);
         gl .compileShader (fragmentShader);

         // Program

         const program = gl .createProgram ();

         gl .attachShader (program, vertexShader);
         gl .attachShader (program, fragmentShader);
         gl .transformFeedbackVaryings (program, Array .from ({length: 7}, (_, i) => "output" + i), gl .INTERLEAVED_ATTRIBS);
         gl .linkProgram (program);

         if (!gl .getProgramParameter (program, gl .LINK_STATUS))
            console .error ("Couldn't initialize particle shader: " + gl .getProgramInfoLog (program));

         program .inputs = [
            [0, gl .getAttribLocation (program, "input0")],
            [2, gl .getAttribLocation (program, "input2")],
            [6, gl .getAttribLocation (program, "input6")],
         ];

         program .randomSeed        = gl .getUniformLocation (program, "randomSeed");
         program .geometryType      = gl .getUniformLocation (program, "geometryType");
         program .createParticles   = gl .getUniformLocation (program, "createParticles");
         program .particleLifetime  = gl .getUniformLocation (program, "particleLifetime");
         program .lifetimeVariation = gl .getUniformLocation (program, "lifetimeVariation");
         program .deltaTime         = gl .getUniformLocation (program, "deltaTime");
         program .particleSize      = gl .getUniformLocation (program, "particleSize");

         program .numForces = gl .getUniformLocation (program, "numForces");
         program .forces    = gl .getUniformLocation (program, "forces");

         program .boundedVerticesIndex  = gl .getUniformLocation (program, "boundedVerticesIndex");
         program .boundedNormalsIndex   = gl .getUniformLocation (program, "boundedNormalsIndex");
         program .boundedHierarchyIndex = gl .getUniformLocation (program, "boundedHierarchyIndex");
         program .boundedHierarchyRoot  = gl .getUniformLocation (program, "boundedHierarchyRoot");
         program .boundedVolume         = gl .getUniformLocation (program, "boundedVolume");

         program .numColors = gl .getUniformLocation (program, "numColors");
         program .colorRamp = gl .getUniformLocation (program, "colorRamp");

         program .texCoordCount = gl .getUniformLocation (program, "texCoordCount");
         program .numTexCoords  = gl .getUniformLocation (program, "numTexCoords");
         program .texCoordRamp  = gl .getUniformLocation (program, "texCoordRamp");

         for (const name of Object .keys (this .uniforms))
            program [name] = gl .getUniformLocation (program, name);

         program .NaN = gl .getUniformLocation (program, "NaN");

         gl .useProgram (program);

         for (const name of this .samplers)
         {
            const location = gl .getUniformLocation (program, name);

            gl .uniform1i (location, program [name + "TextureUnit"] = browser .getTexture2DUnit ());
         }

         gl .uniform1f (program .NaN, NaN);

         browser .resetTextureUnits ();

         return program;
      },
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

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

         return texture;
      },
      getTexture2DUnit: function (browser, object, property)
      {
         const textureUnit = object [property];

         if (textureUnit === undefined)
            return object [property] = browser .getTexture2DUnit ();

         return textureUnit;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Base/X3DConstants",
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

      this ._position .setUnit ("length");

      this .addUniform ("position",  "uniform vec3 position;");
      this .addUniform ("direction", "uniform vec3 direction;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
            return getRandomSphericalVelocity ();

         else
            return direction * getRandomSpeed ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   }

   PointEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: PointEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
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

         if (this .getBrowser () .getContext () .getVersion () < 2)
            return;

         this ._position  .addInterest ("set_position__",  this);
         this ._direction .addInterest ("set_direction__", this);

         this .set_position__ ();
         this .set_direction__ ();
      },
      set_position__: function ()
      {
         const position = this ._position .getValue ();

         this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
      },
      set_direction__: (function ()
      {
         const direction = new Vector3 (0, 0, 0);

         return function ()
         {
            direction .assign (this ._direction .getValue ()) .normalize ();

            this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
         };
      })(),
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

   const _defaultEmitter = Symbol ();

   function X3DParticleSystemsContext () { }

   X3DParticleSystemsContext .prototype =
   {
      getDefaultEmitter: function ()
      {
         this [_defaultEmitter] = new PointEmitter (this .getPrivateScene ());
         this [_defaultEmitter] .setup ();

         this .getDefaultEmitter = function () { return this [_defaultEmitter]; };

         Object .defineProperty (this, "getDefaultEmitter", { enumerable: false });
v
         return this [_defaultEmitter];
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
   "x_ite/Base/X3DConstants",
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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

         this ._geometry .addInterest ("set_geometry__", this);

         this .set_geometry__ ();
      },
      set_geometry__: function ()
      {
         if (this .geometryNode)
            this .geometryNode ._rebuild .removeInterest ("addNodeEvent", this);

         this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._geometry);

         if (this .geometryNode)
            this .geometryNode ._rebuild .addInterest ("addNodeEvent", this);
      },
      addGeometry: function (boundedNormals, boundedVertices)
      {
         if (this .geometryNode && this ._enabled .getValue ())
         {
            const
               normals  = this .geometryNode .getNormals ()  .getValue (),
               vertices = this .geometryNode .getVertices () .getValue ();

            for (const value of normals)
               boundedNormals .push (value);

            for (const value of vertices)
               boundedVertices .push (value);
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          X3DConstants)
{
"use strict";

   function ConeEmitter (executionContext)
   {
      X3DParticleEmitterNode .call (this, executionContext);

      this .addType (X3DConstants .ConeEmitter);

      this ._position .setUnit ("length");
      this ._angle    .setUnit ("angle");

      this .addUniform ("position",  "uniform vec3  position;");
      this .addUniform ("direction", "uniform vec3  direction;");
      this .addUniform ("angle",     "uniform float angle;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
         {
            return getRandomSphericalVelocity ();
         }
         else
         {
            vec3  normal = getRandomNormalWithDirectionAndAngle (direction, angle);
            float speed  = getRandomSpeed ();

            return normal * speed;
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   }

   ConeEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: ConeEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "angle",       new Fields .SFFloat (0.7854)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
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

         if (this .getBrowser () .getContext () .getVersion () < 2)
            return;

         this ._position  .addInterest ("set_position__", this);
         this ._direction .addInterest ("set_direction__", this);
         this ._angle     .addInterest ("set_angle__", this);

         this .set_position__ ();
         this .set_direction__ ();
         this .set_angle__ ();
      },
      set_position__: function ()
      {
         const position = this ._position .getValue ();

         this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
      },
      set_direction__: function ()
      {
         const direction = this ._direction .getValue ();

         this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
      },
      set_angle__: function ()
      {
         this .setUniform ("uniform1f", "angle", this ._angle .getValue ());
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Base/X3DConstants",
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

      this ._position .setUnit ("length");

      this .addUniform ("position", "uniform vec3 position;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         return getRandomSphericalVelocity ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
   }

   ExplosionEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: ExplosionEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
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

         if (this .getBrowser () .getContext () .getVersion () < 2)
            return;

         this ._position .addInterest ("set_position__", this);

         this .set_position__ ();
      },
      isExplosive: function ()
      {
         return true;
      },
      set_position__: function ()
      {
         const position = this ._position .getValue ();

         this .setUniform ("uniform3f", "position", position .x, position .y, position .z);
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticlePhysicsModelNode,
          X3DConstants,
          Vector3)
{
"use strict";

   function ForcePhysicsModel (executionContext)
   {
      X3DParticlePhysicsModelNode .call (this, executionContext);

      this .addType (X3DConstants .ForcePhysicsModel);

      this ._force .setUnit ("force");
   }

   ForcePhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
   {
      constructor: ForcePhysicsModel,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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
      addForce: (function ()
      {
         const force = new Vector3 (0, 0, 0);

         return function (i, emitterNode, timeByMass, forces)
         {
            if (this ._enabled .getValue ())
            {
               forces .set (force .assign (this ._force .getValue ()) .multiply (timeByMass), i * 4);
               forces [i * 4 + 3] = 0;

               return true;
            }
            else
            {
               return false;
            }
        };
      })(),
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

   const
      v0  = new Vector3 (0, 0, 0),
      v1  = new Vector3 (0, 0, 0),
      v2  = new Vector3 (0, 0, 0),
      uvt = { u: 0, v: 0, t: 0 };

   // Box normals for bbox / line intersection.
   const boxNormals = [
      new Vector3 (0,  0,  1), // front
      new Vector3 (0,  0, -1), // back
      new Vector3 (0,  1,  0), // top
      new Vector3 (0, -1,  0), // bottom
      new Vector3 (1,  0,  0)  // right
      // left: We do not have to test for left.
   ];

   const
      NODE     = 0,
      TRIANGLE = 1;

   function SortComparator (vertices, axis)
   {
      return function compare (a, b)
      {
          return Math .min (vertices [a + axis], vertices [a + 4 + axis], vertices [a + 8 + axis]) <
                 Math .min (vertices [b + axis], vertices [b + 4 + axis], vertices [b + 8 + axis]);
      }
   }

   function Triangle (tree, triangle)
   {
      this .vertices = tree .vertices;
      this .normals  = tree .normals;
      this .triangle = triangle;
      this .i4       = triangle * 12;
      this .i3       = triangle * 9;
   }

   Triangle .prototype =
   {
      intersectsLine: function (line, intersections, intersectionNormals)
      {
         const
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

            const
               u = uvt .u,
               v = uvt .v,
               t = 1 - u - v;

            // Determine vectors for X3DPointingDeviceSensors.

            const i = intersections .size ++;

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
      toArray: function (array)
      {
         const index = array .length / 4;

         array .push (TRIANGLE, this .triangle * 3, 0, 0);

         return index;
      },
   };

   function Node (tree, triangles, first, size)
   {
      this .min          = new Vector3 (0, 0, 0);
      this .max          = new Vector3 (0, 0, 0);
      this .planes       = [ ];
      this .intersection = new Vector3 (0, 0, 0);

      const
         vertices = tree .vertices,
         min      = this .min,
         max      = this .max,
         last     = first + size;

      let t = triangles [first] * 12;

      // Calculate bbox

      min .set (vertices [t], vertices [t + 1], vertices [t + 2]);
      max .assign (min);

      for (let i = first; i < last; ++ i)
      {
         t = triangles [i] * 12;

         v0 .set (vertices [t],     vertices [t + 1], vertices [t + 2]);
         v1 .set (vertices [t + 4], vertices [t + 5], vertices [t + 6]);
         v2 .set (vertices [t + 8], vertices [t + 9], vertices [t + 10]);

         min .min (v0, v1, v2);
         max .max (v0, v1, v2);
      }

      for (let i = 0; i < 5; ++ i)
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

      const rightSize = size - leftSize;

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
         const
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
         const
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
      toArray: function (array)
      {
         const
            left  = this .left .toArray (array),
            right = this .right .toArray (array),
            min   = this .min,
            max   = this .max,
            index = array .length / 4;

         array .push (NODE, left, right, 0,
                      min .x, min .y, min .z, 0,
                      max .x, max .y, max .z, 0);

         return index;
      },
   };

   function BVH (vertices, normals)
   {
      const numTriangles = vertices .length / 12;

      this .vertices = vertices;
      this .normals  = normals;

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
            const triangles = [ ];

            for (let i = 0; i < numTriangles; ++ i)
               triangles .push (i);

            this .sorter = new QuickSort (triangles, SortComparator (vertices, 0));
            this .root   = new Node (this, triangles, 0, numTriangles);
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
      toArray: function (array)
      {
         if (this .root)
         {
            const root = this .root .toArray (array);

            array .push (root, 0, 0, 0);
         }

         return array;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Shape/X3DShapeNode",
   "x_ite/Browser/ParticleSystems/GeometryTypes",
   "x_ite/Rendering/VertexArray",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/Shape/AlphaMode",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Numbers/Matrix3",
   "standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          GeometryTypes,
          VertexArray,
          TraverseType,
          X3DConstants,
          X3DCast,
          AlphaMode,
          Vector3,
          Matrix4,
          Matrix3,
          BVH)
{
"use strict";

   const PointGeometry = new Float32Array ([0, 0, 0, 1]);

   const LineGeometry = new Float32Array ([
      // TexCoords
      0, 0, 0, 1,
      1, 0, 0, 1,
      // Vertices
      0, 0, -0.5, 1,
      0, 0,  0.5, 1,
   ]);

   // p4 ------ p3
   // |       / |
   // |     /   |
   // |   /     |
   // | /       |
   // p1 ------ p2

   const QuadGeometry = new Float32Array ([
      // TexCoords
      0, 0, 0, 1,
      1, 0, 0, 1,
      1, 1, 0, 1,
      0, 0, 0, 1,
      1, 1, 0, 1,
      0, 1, 0, 1,
      // Normal
      0, 0, 1,
      // Vertices
      -0.5, -0.5, 0, 1,
       0.5, -0.5, 0, 1,
       0.5,  0.5, 0, 1,
      -0.5, -0.5, 0, 1,
       0.5,  0.5, 0, 1,
      -0.5,  0.5, 0, 1,
   ]);

   function ParticleSystem (executionContext)
   {
      X3DShapeNode .call (this, executionContext);

      this .addType (X3DConstants .ParticleSystem);

      this ._particleSize .setUnit ("length");

      this .maxParticles             = 0;
      this .numParticles             = 0;
      this .forcePhysicsModelNodes   = [ ];
      this .forces                   = new Float32Array (4);
      this .boundedPhysicsModelNodes = [ ];
      this .boundedNormals           = [ ];
      this .boundedVertices          = [ ];
      this .colorRamp                = new Float32Array ();
      this .texCoordRamp             = new Float32Array ();
      this .geometryContext          = { };
      this .creationTime             = 0;
      this .pauseTime                = 0;
      this .deltaTime                = 0;
      this .particleStride           = Float32Array .BYTES_PER_ELEMENT * 7 * 4; // 7 x vec4
      this .particleOffsets          = Array .from ({length: 7}, (_, i) => Float32Array .BYTES_PER_ELEMENT * 4 * i); // i x vec4
      this .particleOffset           = this .particleOffsets [0];
      this .colorOffset              = this .particleOffsets [1];
      this .matrixOffset             = this .particleOffsets [3];
      this .texCoordOffset           = 0;
   }

   ParticleSystem .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
   {
      constructor: ParticleSystem,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
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

         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         if (browser .getContext () .getVersion () < 2)
            return;

         this .isLive () .addInterest ("set_live__", this);

         browser .getBrowserOptions () ._Shading .addInterest ("set_shader__", this);

         this ._enabled           .addInterest ("set_enabled__",           this);
         this ._createParticles   .addInterest ("set_createParticles__",   this);
         this ._geometryType      .addInterest ("set_geometryType__",      this);
         this ._geometryType      .addInterest ("set_texCoord__",          this);
         this ._maxParticles      .addInterest ("set_enabled__",           this);
         this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
         this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
         this ._emitter           .addInterest ("set_emitter__",           this);
         this ._physics           .addInterest ("set_physics__",           this);
         this ._colorKey          .addInterest ("set_color__",             this);
         this ._colorRamp         .addInterest ("set_colorRamp__",         this);
         this ._texCoordKey       .addInterest ("set_texCoord__",          this);
         this ._texCoordRamp      .addInterest ("set_texCoordRamp__",      this);

         // Create particles stuff.

         this .inputParticles  = this .createBuffer ();
         this .outputParticles = this .createBuffer ();

         this .inputParticles . emitterArrayObject = new VertexArray ();
         this .inputParticles . vertexArrayObject  = new VertexArray ();
         this .inputParticles  .shadowArrayObject  = new VertexArray ();
         this .outputParticles .emitterArrayObject = new VertexArray ();
         this .outputParticles .vertexArrayObject  = new VertexArray ();
         this .outputParticles .shadowArrayObject  = new VertexArray ();

         // Create forces stuff.

         this .forcesTexture       = this .createTexture ();
         this .boundedTexture      = this .createTexture ();
         this .colorRampTexture    = this .createTexture ();
         this .texCoordRampTexture = this .createTexture ();

         // Create GL stuff.

         this .geometryBuffer  = this .createBuffer ();
         this .texCoordBuffers = new Array (browser .getMaxTextures ()) .fill (this .geometryBuffer);

         // Geometry context

         this .geometryContext .fogCoords                = false;
         this .geometryContext .textureCoordinateNode    = browser .getDefaultTextureCoordinate ();
         this .geometryContext .textureCoordinateMapping = new Map ();

         // Init fields.
         // Call order is very important at startup.

         this .set_emitter__ ();
         this .set_enabled__ ();
         this .set_geometryType__ ();
         this .set_createParticles__ ();
         this .set_particleLifetime__ ();
         this .set_lifetimeVariation__ ();
         this .set_physics__ ();
         this .set_colorRamp__ ();
         this .set_texCoordRamp__ ();
      },
      set_bbox__: function ()
      {
         if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
            this .bbox .set ();
         else
            this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

         this .bboxSize   .assign (this .bbox .size);
         this .bboxCenter .assign (this .bbox .center);
      },
      set_transparent__: function ()
      {
         if (this .getAppearance () .getAlphaMode () === AlphaMode .AUTO)
         {
            switch (this .geometryType)
            {
               case GeometryTypes .POINT:
               {
                  this .setTransparent (true);
                  break;
               }
               default:
               {
                  this .setTransparent (this .getAppearance () .getTransparent () ||
                                        (this .colorRampNode && this .colorRampNode .getTransparent ()) ||
                                        (this .geometryType === GeometryTypes .GEOMETRY && this .geometryNode && this .geometryNode .getTransparent ()));
                  break;
               }
            }
         }
         else
         {
            this .setTransparent (this .getAppearance () .getTransparent ());
         }
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
         {
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
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
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
            {
               this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

               if (this .pauseTime === 0)
                  this .pauseTime = performance .now () / 1000;
            }
         }
      },
      set_enabled__: function ()
      {
         if (this ._enabled .getValue () && this ._maxParticles .getValue ())
         {
            if (!this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

                  this .pauseTime = 0;
               }
               else
                  this .pauseTime = performance .now () / 1000;

               this ._isActive = true;

               delete this .traverse;
            }
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);
               }

               this ._isActive = false;

               this .numParticles = 0;
               this .traverse     = Function .prototype;
            }
         }

         this .set_maxParticles__ ();
      },
      set_createParticles__: function ()
      {
         this .createParticles = this ._createParticles .getValue ();
      },
      set_geometryType__: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         // Set geometryType.

         this .geometryType = GeometryTypes .hasOwnProperty (this ._geometryType .getValue ())
            ? GeometryTypes [this ._geometryType .getValue ()]
            : GeometryTypes .QUAD;

         // Create buffers.

         switch (this .geometryType)
         {
            case GeometryTypes .POINT:
            {
               this .geometryContext .geometryType = 0;

               this .texCoordCount = 0;
               this .vertexCount   = 1;
               this .hasNormals    = false;
               this .primitiveMode = gl .POINTS;

               this .verticesOffset = 0;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, PointGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .LINE:
            {
               this .geometryContext .geometryType = 1;

               this .texCoordCount = 2;
               this .vertexCount   = 2;
               this .hasNormals    = false;
               this .primitiveMode = gl .LINES;

               this .texCoordsOffset = 0;
               this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 8;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, LineGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .TRIANGLE:
            case GeometryTypes .QUAD:
            case GeometryTypes .SPRITE:
            {
               this .geometryContext .geometryType = 2;

               this .texCoordCount = 4;
               this .vertexCount   = 6;
               this .hasNormals    = true;
               this .primitiveMode = gl .TRIANGLES;

               this .texCoordsOffset = 0;
               this .normalOffset    = Float32Array .BYTES_PER_ELEMENT * 24;
               this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 27;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .GEOMETRY:
            {
               this .texCoordCount = 0;
               this .vertexCount   = 0;

               break;
            }
         }

         this .updateVertexArrays ();

         this .set_shader__ ();
         this .set_transparent__ ();
      },
      set_shader__: function ()
      {
         switch (this .geometryType)
         {
            case GeometryTypes .POINT:
            {
               this .shaderNode = this .getBrowser () .getPointShader ();
               break;
            }
            case GeometryTypes .LINE:
            {
               this .shaderNode = this .getBrowser () .getLineShader ();
               break;
            }
            default:
            {
               this .shaderNode = null;
               break;
            }
         }
      },
      set_maxParticles__: function ()
      {
         const
            lastNumParticles = this .numParticles,
            maxParticles     = Math .max (0, this ._maxParticles .getValue ());

         this .maxParticles = maxParticles;
         this .numParticles = Math .min (lastNumParticles, maxParticles);

         if (!this .emitterNode .isExplosive ())
            this .creationTime = performance .now () / 1000;

         this .resizeBuffers (lastNumParticles);
         this .updateVertexArrays ();
      },
      set_particleLifetime__: function ()
      {
         this .particleLifetime = this ._particleLifetime .getValue ();
      },
      set_lifetimeVariation__: function ()
      {
         this .lifetimeVariation = this ._lifetimeVariation .getValue ();
      },
      set_emitter__: function ()
      {
         this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this ._emitter);

         if (!this .emitterNode)
            this .emitterNode = this .getBrowser () .getDefaultEmitter ();

         this .createParticles = this ._createParticles .getValue ();
      },
      set_physics__: function ()
      {
         const
            physics                  = this ._physics .getValue (),
            forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
            boundedPhysicsModelNodes [i] .removeInterest ("set_boundedPhysics__", this);

         forcePhysicsModelNodes   .length = 0;
         boundedPhysicsModelNodes .length = 0;

         for (let i = 0, length = physics .length; i < length; ++ i)
         {
            try
            {
               const
                  innerNode = physics [i] .getValue () .getInnerNode (),
                  type      = innerNode .getType ();

               for (let t = type .length - 1; t >= 0; -- t)
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
         const
            gl                       = this .getBrowser () .getContext (),
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
            boundedNormals           = this .boundedNormals,
            boundedVertices          = this .boundedVertices;

         boundedNormals  .length = 0;
         boundedVertices .length = 0;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
         {
            boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
         }

         // Texture

         const
            boundedHierarchy       = new BVH (boundedVertices, boundedNormals) .toArray ([ ]),
            numBoundedVertices     = boundedVertices .length / 4,
            numBoundedNormals      = boundedNormals .length / 3,
            boundedHierarchyLength = boundedHierarchy .length / 4,
            boundedArraySize       = Math .ceil (Math .sqrt (numBoundedVertices + numBoundedNormals + boundedHierarchyLength)),
            boundedArray           = new Float32Array (boundedArraySize * boundedArraySize * 4);

         this .boundedVerticesIndex  = 0;
         this .boundedNormalsIndex   = numBoundedVertices;
         this .boundedHierarchyIndex = this .boundedNormalsIndex + numBoundedNormals;
         this .boundedHierarchyRoot  = this .boundedHierarchyIndex + boundedHierarchyLength - 1;

         boundedArray .set (boundedVertices);

         for (let s = this .boundedNormalsIndex * 4, n = 0, l = boundedNormals .length; n < l; s += 4, n += 3)
         {
            boundedArray [s + 0] = boundedNormals [n + 0];
            boundedArray [s + 1] = boundedNormals [n + 1];
            boundedArray [s + 2] = boundedNormals [n + 2];
         }

         boundedArray .set (boundedHierarchy, this .boundedHierarchyIndex * 4);

         if (boundedArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .boundedTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedArraySize, boundedArraySize, 0, gl .RGBA, gl .FLOAT, boundedArray);
         }
       },
      set_colorRamp__: function ()
      {
         if (this .colorRampNode)
            this .colorRampNode .removeInterest ("set_color__", this);

         this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this ._colorRamp);

         if (this .colorRampNode)
            this .colorRampNode .addInterest ("set_color__", this);

         this .set_color__ ();
         this .set_transparent__ ();
      },
      set_color__: function ()
      {
         const
            gl           = this .getBrowser () .getContext (),
            colorKey     = this ._colorKey,
            numColors    = colorKey .length,
            textureSize  = Math .ceil (Math .sqrt (numColors * 2));

         let colorRamp = this .colorRamp;

         if (textureSize * textureSize * 4 > colorRamp .length)
            colorRamp = this .colorRamp = new Float32Array (textureSize * textureSize * 4);

         for (let i = 0; i < numColors; ++ i)
            colorRamp [i * 4] = colorKey [i];

         if (this .colorRampNode)
            colorRamp .set (this .colorRampNode .addColors ([ ], numColors) .slice (0, numColors * 4), numColors * 4);
         else
            colorRamp .fill (1, numColors * 4);

         if (textureSize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .colorRampTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, colorRamp);
        }

         this .numColors                      = numColors;
         this .geometryContext .colorMaterial = !! (numColors && this .colorRampNode);

         this .updateVertexArrays ();
      },
      set_texCoordRamp__: function ()
      {
         if (this .texCoordRampNode)
            this .texCoordRampNode .removeInterest ("set_texCoord__", this);

         this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoordRamp);

         if (this .texCoordRampNode)
            this .texCoordRampNode .addInterest ("set_texCoord__", this);

         this .set_texCoord__ ();
      },
      set_texCoord__: function ()
      {
         const
            gl           = this .getBrowser () .getContext (),
            texCoordKey  = this ._texCoordKey,
            numTexCoords = texCoordKey .length,
            textureSize  = Math .ceil (Math .sqrt (numTexCoords + numTexCoords * this .texCoordCount));

         let texCoordRamp = this .texCoordRamp;

         if (textureSize * textureSize * 4 > texCoordRamp .length)
            texCoordRamp = this .texCoordRamp = new Float32Array (textureSize * textureSize * 4);
         else
            texCoordRamp .fill (0);

         for (let i = 0; i < numTexCoords; ++ i)
            texCoordRamp [i * 4] = texCoordKey [i];

         if (this .texCoordRampNode)
            texCoordRamp .set (this .texCoordRampNode .getTexCoord ([ ]) .slice (0, numTexCoords * this .texCoordCount * 4), numTexCoords * 4);

         if (textureSize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, texCoordRamp);
         }

         this .numTexCoords = this .texCoordRampNode ? numTexCoords : 0;

         this .updateVertexArrays ();
      },
      updateVertexArrays: function ()
      {
         this .inputParticles  .vertexArrayObject  .update ();
         this .inputParticles  .shadowArrayObject  .update ();
         this .inputParticles  .emitterArrayObject .update ();
         this .outputParticles .vertexArrayObject  .update ();
         this .outputParticles .shadowArrayObject  .update ();
         this .outputParticles .emitterArrayObject .update ();
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

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

         return texture;
      },
      createBuffer: function ()
      {
         const
            gl     = this .getBrowser () .getContext (),
            buffer = gl .createBuffer ();

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (), gl .DYNAMIC_DRAW);

         return buffer;
      },
      resizeBuffers: function (lastNumParticles)
      {
         const
            gl              = this .getBrowser () .getContext (),
            maxParticles    = this .maxParticles,
            particleStride  = this .particleStride,
            outputParticles = Object .assign (gl .createBuffer (), this .outputParticles),
            data            = new Uint8Array (maxParticles * particleStride);

         // Resize input buffer.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .inputParticles);
         gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

         // Resize output buffer.

         gl .bindBuffer (gl .COPY_READ_BUFFER, this .outputParticles);
         gl .bindBuffer (gl .ARRAY_BUFFER, outputParticles);
         gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
         gl .copyBufferSubData (gl .COPY_READ_BUFFER, gl .ARRAY_BUFFER, 0, 0, Math .min (maxParticles * particleStride, lastNumParticles * particleStride));
         gl .deleteBuffer (this .outputParticles);

         this .outputParticles = outputParticles;
      },
      animateParticles: function ()
      {
         const
            browser     = this .getBrowser (),
            gl          = browser .getContext (),
            emitterNode = this .emitterNode;

         // Determine delta time

         const
            DELAY = 15, // Delay in frames when dt fully applies.
            dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

         // let deltaTime is only for the emitter, this.deltaTime is for the forces.
         let deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

         // Determine numParticles

         if (emitterNode .isExplosive ())
         {
            const
               now              = performance .now () / 1000,
               particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

            if (this .numParticles === 0 || now - this .creationTime > particleLifetime)
            {
               this .creationTime    = now;
               this .numParticles    = this .maxParticles;
               this .createParticles = this ._createParticles .getValue ();

               deltaTime = Number .POSITIVE_INFINITY;
            }
            else
               this .createParticles = false;
         }
         else
         {
            if (this .numParticles < this .maxParticles)
            {
               const
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
            const forcePhysicsModelNodes = this .forcePhysicsModelNodes;

            let
               numForces  = forcePhysicsModelNodes .length,
               forces     = this .forces,
               timeByMass = deltaTime / emitterNode .getMass ();

            // Collect forces in velocities and collect turbulences.

            if (numForces * 4 > forces .length)
               forces = this .forces = new Float32Array (numForces * 4);

            let disabledForces = 0;

            for (let i = 0; i < numForces; ++ i)
            {
               disabledForces += !forcePhysicsModelNodes [i] .addForce (i - disabledForces, emitterNode, timeByMass, forces);
            }

            this .numForces = numForces -= disabledForces;

            if (numForces)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .forcesTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, numForces, 1, 0, gl .RGBA, gl .FLOAT, forces);
            }
         }
         else
         {
            this .numForces = 0;
         }

         // Swap buffers.

         const inputParticles  = this .outputParticles;
         this .outputParticles = this .inputParticles;
         this .inputParticles  = inputParticles;

         // Determine particle position, velocity and colors.

         emitterNode .animate (this, deltaTime);

         browser .addBrowserEvent ();
      },
      updateSprite: (function ()
      {
         const data = new Float32Array (QuadGeometry);

         const quad = [
            new Vector3 (-0.5, -0.5, 0),
            new Vector3 ( 0.5, -0.5, 0),
            new Vector3 ( 0.5,  0.5, 0),
            new Vector3 (-0.5, -0.5, 0),
            new Vector3 ( 0.5,  0.5, 0),
            new Vector3 (-0.5,  0.5, 0),
         ];

         const
            vertex = new Vector3 (0, 0, 0),
            size   = new Vector3 (0, 0, 0);

         return function (gl, rotation)
         {
            // Normal

            for (let i = 0; i < 3; ++ i)
               data [24 + i] = rotation [6 + i];

            // Vertices

            size .set (this ._particleSize .x, this ._particleSize .y, 1);

            for (let i = 0; i < 6; ++ i)
            {
               const index = 27 + i * 4;

               rotation .multVecMatrix (vertex .assign (quad [i]) .multVec (size))

               data [index + 0] = vertex .x;
               data [index + 1] = vertex .y;
               data [index + 2] = vertex .z;
            }

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
         };
      })(),
      intersectsBox: function (box, clipPlanes)
      { },
      traverse: function (type, renderObject)
      {
         if (this .numParticles === 0)
            return;

         switch (type)
         {
            case TraverseType .POINTER:
            case TraverseType .PICKING:
            case TraverseType .COLLISION:
            {
               break;
            }
            case TraverseType .SHADOW:
            {
               if (this ._castShadow .getValue ())
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

         if (this .geometryType === GeometryTypes .GEOMETRY)
         {
            if (this .getGeometry ())
               this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
         }
      },
      depth: function (gl, context, shaderNode)
      {
         // Display geometry.

         switch (this .geometryType)
         {
            case GeometryTypes .GEOMETRY:
            {
               const geometryNode = this .getGeometry ();

               if (geometryNode)
                  geometryNode .displayParticlesDepth (gl, context, shaderNode, this);

               break;
            }
            case GeometryTypes .SPRITE:
            {
               this .updateSprite (gl, this .getScreenAlignedRotation (context .modelViewMatrix));
               // [fall trough]
            }
            default:
            {
               const outputParticles = this .outputParticles;

               if (outputParticles .shadowArrayObject .enable (gl, shaderNode))
               {
                  const particleStride = this .particleStride;

                  shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
                  shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);
                  shaderNode .enableVertexAttribute         (gl, this .geometryBuffer, 0, this .verticesOffset);
               }

               gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);

               break;
            }
         }
      },
      display: function (gl, context)
      {
         // Display geometry.

         switch (this .geometryType)
         {
            case GeometryTypes .GEOMETRY:
            {
               const geometryNode = this .getGeometry ();

               if (geometryNode)
                  geometryNode .displayParticles (gl, context, this);

               break;
            }
            case GeometryTypes .SPRITE:
            {
               this .updateSprite (gl, this .getScreenAlignedRotation (context .modelViewMatrix));
               // [fall trough]
            }
            case GeometryTypes .QUAD:
            case GeometryTypes .TRIANGLE:
            {
               const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

               gl .frontFace (positiveScale ? gl .CCW : gl .CW);
               gl .enable (gl .CULL_FACE);
               gl .cullFace (gl .BACK);

               // [fall trough]
            }
            default:
            {
               const
                  appearanceNode = this .getAppearance (),
                  shaderNode     = appearanceNode .shaderNode || this .shaderNode || appearanceNode .materialNode .getShader (context .browser, context .shadow),
                  primitiveMode  = shaderNode .getPrimitiveMode (this .primitiveMode);

               // Setup shader.

               if (shaderNode .isValid ())
               {
                  context .geometryContext = this .geometryContext;

                  const blendModeNode = appearanceNode .blendModeNode;

                  if (blendModeNode)
                     blendModeNode .enable (gl);

                  shaderNode .enable (gl);
                  shaderNode .setLocalUniforms (gl, context);

                  if (this .numTexCoords)
                  {
                     const textureUnit = context .browser .getTexture2DUnit ();

                     gl .activeTexture (gl .TEXTURE0 + textureUnit);
                     gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
                     gl .uniform1i (shaderNode .x3d_TexCoordRamp, textureUnit);
                  }

                  // Setup vertex attributes.

                  const outputParticles = this .outputParticles;

                  if (outputParticles .vertexArrayObject .enable (gl, shaderNode))
                  {
                     const particleStride = this .particleStride;

                     shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
                     shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);

                     if (this .geometryContext .colorMaterial)
                     {
                        shaderNode .enableColorAttribute (gl, outputParticles, particleStride, this .colorOffset);
                        shaderNode .colorAttributeDivisor (gl, 1);
                     }

                     if (this .texCoordCount)
                        shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, this .texCoordOffset);

                     if (this .hasNormals)
                     {
                        shaderNode .enableNormalAttribute (gl, this .geometryBuffer, 0, this .normalOffset);
                        shaderNode .normalAttributeDivisor (gl, this .maxParticles);
                     }

                     shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, this .verticesOffset);
                  }

                  gl .drawArraysInstanced (primitiveMode, 0, this .vertexCount, this .numParticles);

                  if (blendModeNode)
                     blendModeNode .disable (gl);

                  delete context .geometryContext;
               }

               break;
            }
         }
      },
      getScreenAlignedRotation: (function ()
      {
         const
            invModelViewMatrix = new Matrix4 (),
            billboardToScreen  = new Vector3 (0, 0, 0),
            viewerYAxis        = new Vector3 (0, 0, 0),
            y                  = new Vector3 (0, 0, 0),
            rotation           = new Matrix3 (9);

         return function (modelViewMatrix)
         {
            invModelViewMatrix .assign (modelViewMatrix) .inverse ();
            invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .zAxis));
            invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis));

            const x = viewerYAxis .cross (billboardToScreen);
            y .assign (billboardToScreen) .cross (x);
            const z = billboardToScreen;

            // Compose rotation matrix.

            x .normalize ();
            y .normalize ();
            z .normalize ();

            rotation .set (x .x, x .y, x .z,
                           y .x, y .y, y .z,
                           z .x, z .y, z .z);

            return rotation;
         };
      })(),
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Components/Rendering/IndexedLineSet",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedLineSet,
          X3DConstants,
          Vector3)
{
"use strict";

   function PolylineEmitter (executionContext)
   {
      X3DParticleEmitterNode .call (this, executionContext);

      this .addType (X3DConstants .PolylineEmitter);

      this .polylinesNode  = new IndexedLineSet (executionContext);
      this .polylinesArray = new Float32Array ();

      this .addSampler ("polylines");

      this .addUniform ("direction",     "uniform vec3 direction;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("polylines",     "uniform sampler2D polylines;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
            return getRandomSphericalVelocity ();

         else
            return direction * getRandomSpeed ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         if (verticesIndex < 0)
         {
            return vec4 (NaN);
         }
         else
         {
            // Determine index0, index1 and weight.

            float lastLengthSoFar = texelFetch (polylines, verticesIndex - 1, 0) .x;
            float fraction        = random () * lastLengthSoFar;

            int   index0 = 0;
            int   index1 = 0;
            float weight = 0.0;

            interpolate (polylines, verticesIndex, fraction, index0, index1, weight);

            // Interpolate and return position.

            index0 *= 2;
            index1  = index0 + 1;

            vec4 vertex0 = texelFetch (polylines, verticesIndex + index0, 0);
            vec4 vertex1 = texelFetch (polylines, verticesIndex + index1, 0);

            return mix (vertex0, vertex1, weight);
         }
      }`);
   }

   PolylineEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: PolylineEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coordIndex",  new Fields .MFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coord",       new Fields .SFNode ()),
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

         const browser = this .getBrowser ();

         if (browser .getContext () .getVersion () < 2)
            return;

         // Create GL stuff.

         this .polylinesTexture = this .createTexture ();

         // Initialize fields.

         this ._direction .addInterest ("set_direction__", this);

         this ._coordIndex .addFieldInterest (this .polylinesNode ._coordIndex);
         this ._coord      .addFieldInterest (this .polylinesNode ._coord);

         this .polylinesNode ._coordIndex = this ._coordIndex;
         this .polylinesNode ._coord      = this ._coord;

         this .polylinesNode ._rebuild .addInterest ("set_polyline", this);
         this .polylinesNode .setPrivate (true);
         this .polylinesNode .setup ();

         this .set_direction__ ();
         this .set_polyline ();
      },
      set_direction__: (function ()
      {
         const direction = new Vector3 (0, 0, 0);

         return function ()
         {
            direction .assign (this ._direction .getValue ()) .normalize ();

            this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
         };
      })(),
      set_polyline: (function ()
      {
         const
            vertex1 = new Vector3 (0, 0, 0),
            vertex2 = new Vector3 (0, 0, 0);

         return function ()
         {
            const
               gl                = this .getBrowser () .getContext (),
               vertices          = this .polylinesNode .getVertices () .getValue (),
               numVertices       = vertices .length / 4,
               numLengthSoFar    = numVertices / 2 + 1,
               polylineArraySize = Math .ceil (Math .sqrt (numLengthSoFar + numVertices));

            const verticesIndex = numLengthSoFar;

            let polylinesArray = this .polylinesArray;

            if (polylinesArray .length < polylineArraySize * polylineArraySize * 4)
               polylinesArray = this .polylinesArray = new Float32Array (polylineArraySize * polylineArraySize * 4);

            let lengthSoFar = 0;

            for (let i = 0, length = vertices .length; i < length; i += 8)
            {
               vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
               vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

               polylinesArray [i / 2 + 4] = lengthSoFar += vertex2 .subtract (vertex1) .magnitude ();
            }

            polylinesArray .set (vertices, verticesIndex * 4);

            this .setUniform ("uniform1i", "verticesIndex", numVertices ? verticesIndex : -1);

            if (polylineArraySize)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, polylineArraySize, polylineArraySize, 0, gl .RGBA, gl .FLOAT, polylinesArray);
            }
         };
      })(),
      activateTextures: function (gl, program)
      {
         gl .activeTexture (gl .TEXTURE0 + program .polylinesTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
      },
   });

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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          X3DConstants,
          X3DCast,
          Triangle3,
          Vector3)
{
"use strict";

   function SurfaceEmitter (executionContext)
   {
      X3DParticleEmitterNode .call (this, executionContext);

      this .addType (X3DConstants .SurfaceEmitter);

      this .surfaceNode  = null;
      this .surfaceArray = new Float32Array ();

      this .addSampler ("surface");

      this .addUniform ("solid",         "uniform bool solid;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",  "uniform int normalsIndex;");
      this .addUniform ("surface",       "uniform sampler2D surface;");

      this .addFunction (/* glsl */ `vec4 position; vec3 getRandomVelocity ()
      {
         if (verticesIndex < 0)
         {
            return vec3 (0.0);
         }
         else
         {
            vec3 normal;

            getRandomPointOnSurface (surface, verticesIndex, normalsIndex, position, normal);

            if (solid == false && random () > 0.5)
               normal = -normal;

            return normal * getRandomSpeed ();
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return verticesIndex < 0 ? vec4 (NaN) : position;
      }`);
   }

   SurfaceEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: SurfaceEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surface",     new Fields .SFNode ()),
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

         const browser = this .getBrowser ();

         if (browser .getContext () .getVersion () < 2)
            return;

         // Create GL stuff.

         this .surfaceTexture = this .createTexture ();

         // Initialize fields.

         this ._surface .addInterest ("set_surface__", this);

         this .set_surface__ ();
      },
      set_surface__: function ()
      {
         if (this .surfaceNode)
         {
            this .surfaceNode ._solid   .removeInterest ("set_solid__",    this);
            this .surfaceNode ._rebuild .removeInterest ("set_geometry__", this);
         }

         this .surfaceNode = X3DCast (X3DConstants .X3DGeometryNode, this ._surface);

         if (this .surfaceNode)
         {
            this .surfaceNode ._solid   .addInterest ("set_solid__",    this);
            this .surfaceNode ._rebuild .addInterest ("set_geometry__", this);
         }

         this .set_solid__ ();
         this .set_geometry__ ();
      },
      set_solid__: function ()
      {
         if (this .surfaceNode)
            this .setUniform ("uniform1i", "solid", this .surfaceNode ._solid .getValue ());
      },
      set_geometry__: (function ()
      {
         const
            vertex1  = new Vector3 (0, 0, 0),
            vertex2  = new Vector3 (0, 0, 0),
            vertex3  = new Vector3 (0, 0, 0);

         return function ()
         {
            const gl = this .getBrowser () .getContext ();

            if (this .surfaceNode)
            {
               const
                  vertices         = this .surfaceNode .getVertices () .getValue (),
                  normals          = this .surfaceNode .getNormals () .getValue (),
                  numVertices      = vertices .length / 4,
                  numAreaSoFar     = numVertices / 3 + 1,
                  surfaceArraySize = Math .ceil (Math .sqrt (numAreaSoFar + numVertices + numVertices));

               const
                  verticesIndex = numAreaSoFar,
                  normalsIndex  = verticesIndex + numVertices;

               let surfaceArray = this .surfaceArray;

               if (surfaceArray .length < surfaceArraySize * surfaceArraySize * 4)
                  surfaceArray = this .surfaceArray = new Float32Array (surfaceArraySize * surfaceArraySize * 4);

               let areaSoFar = 0;

               for (let i = 0, length = vertices .length; i < length; i += 12)
               {
                  vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
                  vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
                  vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

                  surfaceArray [i / 3 + 4] = areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
               }

               surfaceArray .set (vertices, verticesIndex * 4);

               for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
               {
                  surfaceArray [s + 0] = normals [n + 0];
                  surfaceArray [s + 1] = normals [n + 1];
                  surfaceArray [s + 2] = normals [n + 2];
               }

               this .setUniform ("uniform1i", "verticesIndex", numVertices ? verticesIndex : -1);
               this .setUniform ("uniform1i", "normalsIndex",  numVertices ? normalsIndex  : -1);

               if (surfaceArraySize)
               {
                  gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
                  gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, surfaceArraySize, surfaceArraySize, 0, gl .RGBA, gl .FLOAT, surfaceArray);
               }
            }
            else
            {
               this .setUniform ("uniform1i", "verticesIndex", -1);
               this .setUniform ("uniform1i", "normalsIndex",  -1);
            }
         };
      })(),
      activateTextures: function (gl, program)
      {
         gl .activeTexture (gl .TEXTURE0 + program .surfaceTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
      },
   });

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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Components/Geometry3D/IndexedFaceSet",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Geometry/Triangle3",
   "standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedFaceSet,
          X3DConstants,
          Vector3,
          Triangle3,
          BVH)
{
"use strict";

   function VolumeEmitter (executionContext)
   {
      X3DParticleEmitterNode .call (this, executionContext);

      this .addType (X3DConstants .VolumeEmitter);

      this .volumeNode  = new IndexedFaceSet (executionContext);
      this .volumeArray = new Float32Array ();

      this .addSampler ("volume");

      this .addUniform ("direction",      "uniform vec3 direction;");
      this .addUniform ("verticesIndex",  "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",   "uniform int normalsIndex;");
      this .addUniform ("hierarchyIndex", "uniform int hierarchyIndex;");
      this .addUniform ("hierarchyRoot",  "uniform int hierarchyRoot;");
      this .addUniform ("volume",         "uniform sampler2D volume;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (hierarchyRoot < 0)
         {
            return vec3 (0.0);
         }
         else
         {
            if (direction == vec3 (0.0))
               return getRandomSphericalVelocity ();

            else
               return direction * getRandomSpeed ();
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         if (hierarchyRoot < 0)
         {
            return vec4 (NaN);
         }
         else
         {
            vec4 point;
            vec3 normal;

            getRandomPointOnSurface (volume, verticesIndex, normalsIndex, point, normal);

            Line3 line = Line3 (point .xyz, getRandomSurfaceNormal (normal));

            vec4 points [ARRAY_SIZE];

            int numIntersections = getIntersections (volume, verticesIndex, hierarchyIndex, hierarchyRoot, line, points);

            numIntersections -= numIntersections % 2; // We need an even count of intersections.

            switch (numIntersections)
            {
               case 0:
                  return vec4 (0.0);
               case 2:
                  break;
               default:
                  sort (points, numIntersections, plane3 (line .point, line .direction));
                  break;
            }

            int index = int (fract (random ()) * float (numIntersections / 2)) * 2; // Select random intersection.

            return mix (points [index], points [index + 1], random ());
         }
      }`);
   }

   VolumeEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: VolumeEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "internal",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coordIndex",  new Fields .MFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "coord",       new Fields .SFNode ()),
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

         const browser = this .getBrowser ();

         if (browser .getContext () .getVersion () < 2)
            return;

         // Create GL stuff.

         this .volumeTexture = this .createTexture ();

         // Initialize fields.

         this ._direction .addInterest ("set_direction__", this);

         this ._coordIndex .addFieldInterest (this .volumeNode ._coordIndex);
         this ._coord      .addFieldInterest (this .volumeNode ._coord);

         this .volumeNode ._creaseAngle = Math .PI;
         this .volumeNode ._convex      = false;
         this .volumeNode ._coordIndex  = this ._coordIndex;
         this .volumeNode ._coord       = this ._coord;

         this .volumeNode ._rebuild .addInterest ("set_geometry__", this);
         this .volumeNode .setPrivate (true);
         this .volumeNode .setup ();

         this .set_direction__ ();
         this .set_geometry__ ();
      },
      set_direction__: (function ()
      {
         const direction = new Vector3 (0, 0, 0);

         return function ()
         {
            direction .assign (this ._direction .getValue ()) .normalize ();

            this .setUniform ("uniform3f", "direction", direction .x, direction .y, direction .z);
         };
      })(),
      set_geometry__: (function ()
      {
         const
            vertex1 = new Vector3 (0, 0, 0),
            vertex2 = new Vector3 (0, 0, 0),
            vertex3 = new Vector3 (0, 0, 0);

         return function ()
         {
            const
               gl              = this .getBrowser () .getContext (),
               vertices        = this .volumeNode .getVertices () .getValue (),
               normals         = this .volumeNode .getNormals () .getValue (),
               hierarchy       = new BVH (vertices, normals) .toArray ([ ]),
               numVertices     = vertices .length / 4,
               numNormals      = normals .length / 3,
               numAreaSoFar    = numVertices / 3 + 1,
               hierarchyLength = hierarchy .length / 4,
               volumeArraySize = Math .ceil (Math .sqrt (numAreaSoFar + numVertices + numVertices + hierarchyLength));

            const
               verticesIndex  = numAreaSoFar,
               normalsIndex   = verticesIndex + numVertices,
               hierarchyIndex = normalsIndex + numNormals;

            let volumeArray = this .volumeArray;

            if (volumeArray .length < volumeArraySize * volumeArraySize * 4)
               volumeArray = this .volumeArray = new Float32Array (volumeArraySize * volumeArraySize * 4);

            let areaSoFar = 0;

            for (let i = 0, length = vertices .length; i < length; i += 12)
            {
               vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
               vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
               vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

               volumeArray [i / 3 + 4] = areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
            }

            volumeArray .set (vertices, verticesIndex * 4);

            for (let s = normalsIndex * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
            {
               volumeArray [s + 0] = normals [n + 0];
               volumeArray [s + 1] = normals [n + 1];
               volumeArray [s + 2] = normals [n + 2];
            }

            volumeArray .set (hierarchy, hierarchyIndex * 4);

            this .setUniform ("uniform1i", "verticesIndex",  verticesIndex);
            this .setUniform ("uniform1i", "normalsIndex",   normalsIndex);
            this .setUniform ("uniform1i", "hierarchyIndex", hierarchyIndex);
            this .setUniform ("uniform1i", "hierarchyRoot",  hierarchyIndex + hierarchyLength - 1);

            if (volumeArraySize)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, volumeArraySize, volumeArraySize, 0, gl .RGBA, gl .FLOAT, volumeArray);
            }
         };
      })(),
      activateTextures: function (gl, program)
      {
         gl .activeTexture (gl .TEXTURE0 + program .volumeTextureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
   "x_ite/Base/X3DConstants",
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

      this ._speed .setUnit ("speed");
   }

   WindPhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
   {
      constructor: WindPhysicsModel,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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
         const
            speed     = Math .max (0, this ._speed .getValue ()),
            variation = speed * Math .max (0, this ._gustiness .getValue ());

         return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
      },
      addForce: (function ()
      {
         const force = new Vector3 (0, 0, 0);

         return function (i, emitterNode, timeByMass, forces)
         {
            if (this ._enabled .getValue ())
            {
               const
                  surfaceArea = emitterNode ._surfaceArea .getValue (),
                  speed       = this .getRandomSpeed (emitterNode),
                  pressure    = Math .pow (10, 2 * Math .log (speed)) * 0.64615;

               if (this ._direction .getValue () .equals (Vector3 .Zero))
                  emitterNode .getRandomNormal (force);
               else
                  force .assign (this ._direction .getValue ()) .normalize ();

               forces .set (force .multiply (surfaceArea * pressure * timeByMass), i * 4);
               forces [i * 4 + 3] = Math .PI * Algorithm .clamp (this ._turbulence .getValue (), 0, 1);

               return true;
            }
            else
            {
               return false;
            }
         }
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


define (require .getComponentUrl ("particle-systems"), [
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
      context: X3DParticleSystemsContext,
   });
});


})();
