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

      this .surfaceNode    = null;
      this .areaSoFarArray = [ 0 ];
      this .direction      = new Vector3 (0, 0, 0);
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

         this ._surface .addInterest ("set_surface__", this);

         this .set_surface__ ();
      },
      set_surface__: function ()
      {
         if (this .surfaceNode)
            this .surfaceNode ._rebuild .removeInterest ("set_geometry__", this);

         this .surfaceNode = X3DCast (X3DConstants .X3DGeometryNode, this ._surface);

         if (this .surfaceNode)
            this .surfaceNode ._rebuild .addInterest ("set_geometry__", this);

         this .set_geometry__ ();
      },
      set_geometry__: (function ()
      {
         const
            vertex1  = new Vector3 (0, 0, 0),
            vertex2  = new Vector3 (0, 0, 0),
            vertex3  = new Vector3 (0, 0, 0);

         return function ()
         {
            if (this .surfaceNode)
            {
               delete this .getRandomPosition;
               delete this .getRandomVelocity;

               let areaSoFar = 0;

               const
                  areaSoFarArray = this .areaSoFarArray,
                  vertices       = this .surfaceNode .getVertices () .getValue ();

               this .normals  = this .surfaceNode .getNormals () .getValue ();
               this .vertices = vertices;

               areaSoFarArray .length = 1;

               for (let i = 0, length = vertices .length; i < length; i += 12)
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

         const
            areaSoFarArray = this .areaSoFarArray,
            length         = areaSoFarArray .length,
            fraction       = Math .random () * areaSoFarArray .at (-1);

         let index0 = 0;

         if (length == 1 || fraction <= areaSoFarArray [0])
         {
            index0 = 0;
         }
         else if (fraction >= areaSoFarArray .at (-1))
         {
            index0 = length - 2;
         }
         else
         {
            const index = Algorithm .upperBound (areaSoFarArray, 0, length, fraction, Algorithm .less);

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

         let
            u = Math .random (),
            v = Math .random ();

         if (u + v > 1)
         {
            u = 1 - u;
            v = 1 - v;
         }

         const t = 1 - u - v;

         // Interpolate and set position.

         const
            i12       = index0 * 12,
            vertices = this .vertices;

         position .x = u * vertices [i12]     + v * vertices [i12+ 4] + t * vertices [i12 + 8];
         position .y = u * vertices [i12 + 1] + v * vertices [i12+ 5] + t * vertices [i12 + 9];
         position .z = u * vertices [i12 + 2] + v * vertices [i12+ 6] + t * vertices [i12 + 10];

         const
            i9        = index0 * 9,
            normals   = this .normals,
            direction = this .direction;

         direction .x = u * normals [i9]     + v * normals [i9 + 3] + t * normals [i9 + 6];
         direction .y = u * normals [i9 + 1] + v * normals [i9 + 4] + t * normals [i9 + 7];
         direction .z = u * normals [i9 + 2] + v * normals [i9 + 5] + t * normals [i9 + 8];

         return position;
      },
      getRandomVelocity: function (velocity)
      {
         const
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
