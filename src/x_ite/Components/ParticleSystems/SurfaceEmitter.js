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

      this .addUniform ("numAreaSoFar", "uniform int numAreaSoFar;");
      this .addUniform ("numVertices",  "uniform int numVertices;");
      this .addUniform ("surface",      "uniform sampler2D surface;");
      this .addUniform ("solid",        "uniform bool solid;");

      this .addFunction (/* glsl */ `vec4 position = vec4 (0.0); vec3 getRandomVelocity ()
      {
         if (numAreaSoFar > 0)
         {
            vec3  normal = vec3 (0.0);
            float speed  = getRandomSpeed ();

            getRandomPointOnSurface (surface, numAreaSoFar, numVertices, position, normal);

            if (solid == false && random () > 0.5)
               normal = -normal;

            return normal * speed;
         }
         else
         {
            return vec3 (0.0);
         }
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return numAreaSoFar > 0 ? position : vec4 (0.0);
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

         this .setUniform ("uniform1i", "surface", browser .getDefaultTexture2DUnit ());

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

               let
                  surfaceArray = this .surfaceArray,
                  areaSoFar    = 0;

               if (surfaceArray .length < surfaceArraySize * surfaceArraySize * 4)
                  surfaceArray = this .surfaceArray = new Float32Array (surfaceArraySize * surfaceArraySize * 4);

               for (let i = 0, length = vertices .length; i < length; i += 12)
               {
                  vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
                  vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);
                  vertex3 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]);

                  surfaceArray [i / 3 + 4] = areaSoFar += Triangle3 .area (vertex1, vertex2, vertex3);
               }

               surfaceArray .set (vertices, numAreaSoFar * 4);

               for (let s = (numAreaSoFar + numVertices) * 4, n = 0, l = normals .length; n < l; s += 4, n += 3)
               {
                  surfaceArray [s + 0] = normals [n + 0];
                  surfaceArray [s + 1] = normals [n + 1];
                  surfaceArray [s + 2] = normals [n + 2];
               }

               this .setUniform ("uniform1i", "numAreaSoFar", numAreaSoFar);
               this .setUniform ("uniform1i", "numVertices",  numVertices);

               gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, surfaceArraySize, surfaceArraySize, 0, gl .RGBA, gl .FLOAT, surfaceArray);
            }
            else
            {
               this .setUniform ("uniform1i", "numAreaSoFar", 0);
            }
         };
      })(),
      activateTextures: function (browser, gl, program)
      {
         const textureUnit = browser .getTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .surfaceTexture);
         gl .uniform1i (program .surface, textureUnit);
      },
   });

   return SurfaceEmitter;
});
