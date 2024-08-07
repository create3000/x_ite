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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DParticleEmitterNode from "./X3DParticleEmitterNode.js";
import IndexedFaceSet         from "../Geometry3D/IndexedFaceSet.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";
import Triangle3              from "../../../standard/Math/Geometry/Triangle3.js";
import BVH                    from "../../../standard/Math/Utility/BVH.js";

function VolumeEmitter (executionContext)
{
   X3DParticleEmitterNode .call (this, executionContext);

   this .addType (X3DConstants .VolumeEmitter);

   this .verticesIndex  = -1;
   this .normalsIndex   = -1;
   this .hierarchyIndex = -1;
   this .hierarchyRoot  = -1;
   this .volumeNode     = new IndexedFaceSet (executionContext);
   this .volumeArray    = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (VolumeEmitter .prototype, X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .volumeTexture = this .createTexture ();

      // Initialize fields.

      this ._set_coordIndex .addFieldInterest (this ._coordIndex);
      this ._direction .addInterest ("set_direction__", this);

      this ._coordIndex .addFieldInterest (this .volumeNode ._coordIndex);
      this ._coord      .addFieldInterest (this .volumeNode ._coord);

      this .volumeNode ._creaseAngle = Math .PI;
      this .volumeNode ._convex      = false;
      this .volumeNode ._coordIndex  = this ._coordIndex;
      this .volumeNode ._coord       = this ._coord;

      this .volumeNode .setPrivate (true);
      this .volumeNode .setup ();
      this .volumeNode ._rebuild .addInterest ("set_geometry__", this);

      this .addDefine ("#define X3D_VOLUME_EMITTER");
      this .addSampler ("volume");

      this .addUniform ("direction",      "uniform vec3 direction;");
      this .addUniform ("verticesIndex",  "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",   "uniform int normalsIndex;");
      this .addUniform ("hierarchyIndex", "uniform int hierarchyIndex;");
      this .addUniform ("hierarchyRoot",  "uniform int hierarchyRoot;");
      this .addUniform ("volume",         "uniform sampler2D volume;");

      this .addCallback (this .set_direction__);
      this .addCallback (this .set_verticesIndex__);
      this .addCallback (this .set_normalsIndex__);
      this .addCallback (this .set_hierarchyIndex__);
      this .addCallback (this .set_hierarchyRoot__);

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

      this .set_geometry__ ();
   },
   getBBox: (function ()
   {
      const bboxSize = new Vector3 ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this .volumeNode .getBBox () .center)
            .add (this .volumeNode .getBBox ());
      };
   })(),
   set_direction__: (() =>
   {
      const direction = new Vector3 ();

      return function ()
      {
         const { x, y, z } = direction .assign (this ._direction .getValue ()) .normalize ();

         this .setUniform ("uniform3f", "direction", x, y, z);
      };
   })(),
   set_verticesIndex__ ()
   {
      this .setUniform ("uniform1i", "verticesIndex", this .verticesIndex);
   },
   set_normalsIndex__ ()
   {
      this .setUniform ("uniform1i", "normalsIndex", this .normalsIndex);
   },
   set_hierarchyIndex__ ()
   {
      this .setUniform ("uniform1i", "hierarchyIndex", this .hierarchyIndex);
   },
   set_hierarchyRoot__ ()
   {
      this .setUniform ("uniform1i", "hierarchyRoot", this .hierarchyRoot);
   },
   set_geometry__: (() =>
   {
      const
         vertex1 = new Vector3 (),
         vertex2 = new Vector3 (),
         vertex3 = new Vector3 ();

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

         this .verticesIndex  = verticesIndex;
         this .normalsIndex   = normalsIndex;
         this .hierarchyIndex = hierarchyIndex;
         this .hierarchyRoot  = hierarchyIndex + hierarchyLength - 1;

         if (volumeArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, volumeArraySize, volumeArraySize, 0, gl .RGBA, gl .FLOAT, volumeArray);
         }

         this .set_verticesIndex__ ();
         this .set_normalsIndex__ ();
         this .set_hierarchyIndex__ ();
         this .set_hierarchyRoot__ ();

         this ._bbox_changed .addEvent ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .volumeTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .volumeTexture);
   },
});

Object .defineProperties (VolumeEmitter,
{
   typeName:
   {
      value: "VolumeEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_coordIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "internal",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",      new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",          new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",      new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceArea",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "coordIndex",     new Fields .MFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default VolumeEmitter;
