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
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
   "x_ite/Components/Geometry3D/IndexedFaceSet",
   "x_ite/Base/X3DConstants",
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

      this .volumeNode  = new IndexedFaceSet (executionContext);
      this .volumeArray = new Float32Array ();
      this .bvhArray    = [ ];

      this .addUniform ("direction",    "uniform vec3 direction;");
      this .addUniform ("numAreaSoFar", "uniform int numAreaSoFar;");
      this .addUniform ("numVertices",  "uniform int numVertices;");
      this .addUniform ("volume",       "uniform sampler2D volume;");
      this .addUniform ("bvh",          "uniform sampler2D bvh;");

      this .addFunction (/* glsl */ `vec4 position = vec4 (0.0); vec3 getRandomVelocity ()
      {
         if (numVertices > 0)
         {
            vec3  normal = vec3 (0.0);
            float speed  = getRandomSpeed ();

            getRandomPointOnSurface (volume, numAreaSoFar, numVertices, position, normal);

            if (direction == vec3 (0.0))
               return getRandomSphericalVelocity ();
            else
               return direction * speed;
         }
         else
         {
            return vec3 (0.0);
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return numVertices > 0 ? position : vec4 (0.0);
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
         this .bvhTexture    = this .createTexture ();

         this .setUniform ("uniform1i", "volume", browser .getDefaultTexture2DUnit ());
         this .setUniform ("uniform1i", "bhv",    browser .getDefaultTexture2DUnit ());

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
               numVertices     = vertices .length / 4,
               numAreaSoFar    = numVertices / 3 + 1,
               volumeArraySize = Math .ceil (Math .sqrt (numAreaSoFar + numVertices + numVertices));

            let
               volumeArray = this .volumeArray,
               areaSoFar   = 0;

            if (volumeArray .length < volumeArraySize * volumeArraySize * 4)
               volumeArray = this .volumeArray = new Float32Array (volumeArraySize * volumeArraySize * 4);

            for (let i = 0, length = vertices .length; i < length; i += 12)
            {
               vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
               vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
               vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

               volumeArray [i / 3 + 4] = areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
            }

            volumeArray .set (vertices, numAreaSoFar * 4);

            for (let s = (numAreaSoFar + numVertices) * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
            {
               volumeArray [s + 0] = normals [n + 0];
               volumeArray [s + 1] = normals [n + 1];
               volumeArray [s + 2] = normals [n + 2];
            }

            this .setUniform ("uniform1i", "numAreaSoFar", numAreaSoFar);
            this .setUniform ("uniform1i", "numVertices",  numVertices);

            gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, volumeArraySize, volumeArraySize, 0, gl .RGBA, gl .FLOAT, volumeArray);

            const bvh = new BVH (vertices, normals);
         };
      })(),
      activateTextures: function (browser, gl, program)
      {
         {
            const textureUnit = browser .getTexture2DUnit ();

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
            gl .uniform1i (program .volume, textureUnit);
         }

         {
            const textureUnit = browser .getTexture2DUnit ();

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, this .bvhTexture);
            gl .uniform1i (program .bvh, textureUnit);
         }
      },
      // getRandomPosition: (function ()
      // {
      //    const
      //       point         = new Vector3 (0, 0, 0),
      //       normal        = new Vector3 (0, 0, 0),
      //       rotation      = new Rotation4 (0, 0, 1, 0),
      //       line          = new Line3 (Vector3 .Zero, Vector3 .zAxis),
      //       plane         = new Plane3 (Vector3 .Zero, Vector3 .zAxis),
      //       intersections = [ ],
      //       sorter        = new QuickSort (intersections, PlaneCompare);

      //    function PlaneCompare (a, b)
      //    {
      //       return plane .getDistanceToPoint (a) < plane .getDistanceToPoint (b);
      //    }

      //    return function (position)
      //    {
      //       // Get random point on surface

      //       // Determine index0.

      //       const
      //          areaSoFarArray = this .areaSoFarArray,
      //          length         = areaSoFarArray .length,
      //          fraction       = Math .random () * areaSoFarArray .at (-1);

      //       let index0 = 0;

      //       if (length == 1 || fraction <= areaSoFarArray [0])
      //       {
      //          index0 = 0;
      //       }
      //       else if (fraction >= areaSoFarArray .at (-1))
      //       {
      //          index0 = length - 2;
      //       }
      //       else
      //       {
      //          const index = Algorithm .upperBound (areaSoFarArray, 0, length, fraction, Algorithm .less);

      //          if (index < length)
      //          {
      //             index0 = index - 1;
      //          }
      //          else
      //          {
      //             index0 = 0;
      //          }
      //       }

      //       // Random barycentric coordinates.

      //       let
      //          u = Math .random (),
      //          v = Math .random ();

      //       if (u + v > 1)
      //       {
      //          u = 1 - u;
      //          v = 1 - v;
      //       }

      //       const t = 1 - u - v;

      //       // Interpolate and determine random point on surface and normal.

      //       const
      //          i12      = index0 * 12,
      //          vertices = this .vertices;

      //       point .x = u * vertices [i12]     + v * vertices [i12 + 4] + t * vertices [i12 + 8];
      //       point .y = u * vertices [i12 + 1] + v * vertices [i12 + 5] + t * vertices [i12 + 9];
      //       point .z = u * vertices [i12 + 2] + v * vertices [i12 + 6] + t * vertices [i12 + 10];

      //       const
      //          i9      = index0 * 9,
      //          normals = this .normals;

      //       normal .x = u * normals [i9]     + v * normals [i9 + 3] + t * normals [i9 + 6];
      //       normal .y = u * normals [i9 + 1] + v * normals [i9 + 4] + t * normals [i9 + 7];
      //       normal .z = u * normals [i9 + 2] + v * normals [i9 + 5] + t * normals [i9 + 8];

      //       rotation .setFromToVec (Vector3 .zAxis, normal);
      //       rotation .multVecRot (this .getRandomSurfaceNormal (normal));

      //       // Setup random line throu volume for intersection text
      //       // and a plane corresponding to the line for intersection sorting.

      //       line  .set (point, normal);
      //       plane .set (point, normal);

      //       // Find random point in volume.

      //       let numIntersections = this .bvh .intersectsLine (line, intersections);

      //       numIntersections -= numIntersections % 2; // We need an even count of intersections.

      //       if (numIntersections)
      //       {
      //          // Sort intersections along line with a little help from the plane.

      //          sorter .sort (0, numIntersections);

      //          // Select random intersection pair.

      //          const
      //             index  = Math .round (this .getRandomValue (0, numIntersections / 2 - 1)) * 2,
      //             point0 = intersections [index],
      //             point1 = intersections [index + 1],
      //             t      = Math .random ();

      //          // lerp
      //          position .x = point0 .x + (point1 .x - point0 .x) * t;
      //          position .y = point0 .y + (point1 .y - point0 .y) * t;
      //          position .z = point0 .z + (point1 .z - point0 .z) * t;

      //          return position;
      //       }

      //       // Discard point.

      //       return position .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
      //    };
      // })(),
   });

   return VolumeEmitter;
});
