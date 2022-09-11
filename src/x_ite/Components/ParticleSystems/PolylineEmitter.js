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

      this .polylineNode     = new IndexedLineSet (executionContext);
      this .lengthSoFarArray = [ 0 ];

      this .addUniform ("position",  "uniform vec3 position;");
      this .addUniform ("direction", "uniform vec3 direction;");
   }

   PolylineEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
   {
      constructor: PolylineEmitter,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coordIndex",  new Fields .MFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",       new Fields .SFNode ()),
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

         this ._direction .addInterest ("set_direction__", this);

         this ._coordIndex .addFieldInterest (this .polylineNode ._coordIndex);
         this ._coord      .addFieldInterest (this .polylineNode ._coord);

         this .polylineNode ._coordIndex = this ._coordIndex;
         this .polylineNode ._coord      = this ._coord;

         this .polylineNode ._rebuild .addInterest ("set_polyline", this);
         this .polylineNode .setPrivate (true);
         this .polylineNode .setup ();

         this .addFunctionO (function getRandomVelocity ()
         {
            if (this .constants .direction0 == 0 &&
                this .constants .direction1 == 0 &&
                this .constants .direction2 == 0)
            {
               return getRandomSphericalVelocity ();
            }
            else
            {
               const speed = getRandomSpeed ();

               return [this .constants .direction0 * speed,
                       this .constants .direction1 * speed,
                       this .constants .direction2 * speed,
                       0];
            }
         });

         this .addFunctionO (function getRandomPosition ()
         {
            // Determine index0 and weight.

            const numLengthSoFar = this .constants .numLengthSoFar;

            if (numLengthSoFar > 0)
            {
               const
                  lastLengthSoFar = this .constants .lengthSoFarArray [numLengthSoFar - 1],
                  fraction        = Math .random () * lastLengthSoFar;

               let
                  index0 = 0,
                  index1 = 0,
                  weight = 0;

               if (numLengthSoFar == 1 || fraction <= this .constants .lengthSoFarArray [0])
               {
                  index0 = 0;
                  weight = 0;
               }
               else if (fraction >= lastLengthSoFar)
               {
                  index0 = numLengthSoFar - 2;
                  weight = 1;
               }
               else
               {
                  // BEGIN: upperBound

                  const
                     count = numLengthSoFar,
                     value = fraction;

                  let
                     first = 0,
                     step  = 0;

                  while (count > 0)
                  {
                     let index = first;

                     step = count >> 1;

                     index += step;

                     if (value < this .constants .lengthSoFarArray [index])
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

                  if (index < numLengthSoFar)
                  {
                     index1 = index;
                     index0 = index - 1;

                     const
                        key0 = this .constants .lengthSoFarArray [index0],
                        key1 = this .constants .lengthSoFarArray [index1];

                     weight = clamp ((fraction - key0) / (key1 - key0), 0, 1);
                  }
                  else
                  {
                     index0 = 0;
                     weight = 0;
                  }
               }

               // Interpolate and set position.

               index0 *= 8;
               index1  = index0 + 4;

               const
                  x1 = this .constants .vertices [index0],
                  y1 = this .constants .vertices [index0 + 1],
                  z1 = this .constants .vertices [index0 + 2],
                  x2 = this .constants .vertices [index1],
                  y2 = this .constants .vertices [index1 + 1],
                  z2 = this .constants .vertices [index1 + 2];

               return [mix (x1, x2, weight),
                       mix (y1, y2, weight),
                       mix (z1, z2, weight),
                       1];
            }
            else
            {
               return [0, 0, 0, 1]
            }
         });

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
            const vertices = this .polylineNode .getVertices () .getValue ();

            if (vertices .length)
            {
               let   lengthSoFar      = 0;
               const lengthSoFarArray = this .lengthSoFarArray;

               lengthSoFarArray .length = 1;

               for (let i = 0, length = vertices .length; i < length; i += 8)
               {
                  vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
                  vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

                  lengthSoFar += vertex2 .subtract (vertex1) .abs ();
                  lengthSoFarArray .push (lengthSoFar);
               }

               this .setConstant ("vertices",         vertices);
               this .setConstant ("lengthSoFarArray", lengthSoFarArray);
               this .setConstant ("numLengthSoFar",   lengthSoFarArray .length);
            }
            else
            {
               this .setConstant ("vertices",         [0]);
               this .setConstant ("lengthSoFarArray", [0]);
               this .setConstant ("numLengthSoFar",   0);
            }
         };
      })(),
   });

   return PolylineEmitter;
});
