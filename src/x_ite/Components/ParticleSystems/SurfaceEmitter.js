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
import X3DConstants           from "../../Base/X3DConstants.js";
import X3DCast                from "../../Base/X3DCast.js";
import Triangle3              from "../../../standard/Math/Geometry/Triangle3.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

function SurfaceEmitter (executionContext)
{
   X3DParticleEmitterNode .call (this, executionContext);

   this .addType (X3DConstants .SurfaceEmitter);

   this .verticesIndex = -1;
   this .normalsIndex  = -1;
   this .surfaceNode   = null;
   this .surfaceArray  = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (SurfaceEmitter .prototype, X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .surfaceTexture = this .createTexture ();

      // Initialize fields.

      this ._surface .addInterest ("set_surface__", this);

      this .addDefine ("#define X3D_SURFACE_EMITTER");
      this .addSampler ("surface");

      this .addUniform ("solid",         "uniform bool solid;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("normalsIndex",  "uniform int normalsIndex;");
      this .addUniform ("surface",       "uniform sampler2D surface;");

      this .addCallback (this .set_solid__);
      this .addCallback (this .set_verticesIndex__);
      this .addCallback (this .set_normalsIndex__);

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

      this .set_surface__ ();
   },
   getBBox: (function ()
   {
      const bboxSize = new Vector3 ();

      return function (bbox, { particleLifetime, lifetimeVariation })
      {
         if (!this .surfaceNode)
            return bbox .set ();

         const
            maxParticleLifetime = particleLifetime * (1 + lifetimeVariation),
            maxSpeed            = this ._speed .getValue () * (1 + this ._variation .getValue ()),
            s                   = maxParticleLifetime * maxSpeed * 2;

         return bbox .set (bboxSize .set (s, s, s), this .surfaceNode .getBBox () .center)
            .add (this .surfaceNode .getBBox ());
      };
   })(),
   set_surface__ ()
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
   set_solid__ ()
   {
      this .setUniform ("uniform1i", "solid", this .surfaceNode ?._solid .getValue () ?? true);
   },
   set_verticesIndex__ ()
   {
      this .setUniform ("uniform1i", "verticesIndex", this .verticesIndex);
   },
   set_normalsIndex__ ()
   {
      this .setUniform ("uniform1i", "normalsIndex", this .normalsIndex);
   },
   set_geometry__: (() =>
   {
      const
         vertex1  = new Vector3 (),
         vertex2  = new Vector3 (),
         vertex3  = new Vector3 ();

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

            this .verticesIndex = numVertices ? verticesIndex : -1;
            this .normalsIndex  = numVertices ? normalsIndex  : -1;

            if (surfaceArraySize)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, surfaceArraySize, surfaceArraySize, 0, gl .RGBA, gl .FLOAT, surfaceArray);
            }
         }
         else
         {
            this .verticesIndex = -1;
            this .normalsIndex  = -1;
         }

         this .set_verticesIndex__ ();
         this .set_normalsIndex__ ();

         this ._bbox_changed .addEvent ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .surfaceTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
   },
});

Object .defineProperties (SurfaceEmitter,
{
   typeName:
   {
      value: "SurfaceEmitter",
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceArea", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "surface",     new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default SurfaceEmitter;
