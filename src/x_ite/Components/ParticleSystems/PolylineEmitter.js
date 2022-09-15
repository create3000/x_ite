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

      this .polylineNode  = new IndexedLineSet (executionContext);
      this .polylineArray = new Float32Array ();

      this .addUniform ("position",       "uniform vec3 position;");
      this .addUniform ("direction",      "uniform vec3 direction;");
      this .addUniform ("numLengthSoFar", "uniform int numLengthSoFar;");
      this .addUniform ("polylines",      "uniform sampler2D polylines;");

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         if (direction == vec3 (0.0))
            return getRandomSphericalVelocity ();

         else
            return direction * getRandomSpeed ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         if (numLengthSoFar > 0)
         {
            // Determine index0, index1 and weight.

            float lastLengthSoFar = texelFetch (polylines, numLengthSoFar - 1, 0) .x;
            float fraction        = random () * lastLengthSoFar;

            int   index0 = 0;
            int   index1 = 0;
            float weight = 0.0;

            interpolate (polylines, numLengthSoFar, fraction, index0, index1, weight);

            // Interpolate and return position.

            index0 *= 2;
            index1  = index0 + 1;

            vec4 vertex0 = texelFetch (polylines, numLengthSoFar + index0, 0);
            vec4 vertex1 = texelFetch (polylines, numLengthSoFar + index1, 0);

            return mix (vertex0, vertex1, weight);
         }
         else
         {
            return vec4 (0.0);
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

         this ._direction .addInterest ("set_direction__", this);

         this ._coordIndex .addFieldInterest (this .polylineNode ._coordIndex);
         this ._coord      .addFieldInterest (this .polylineNode ._coord);

         this .polylineTexture = this .createTexture ();

         this .polylineNode ._coordIndex = this ._coordIndex;
         this .polylineNode ._coord      = this ._coord;

         this .polylineNode ._rebuild .addInterest ("set_polyline", this);
         this .polylineNode .setPrivate (true);
         this .polylineNode .setup ();

         this .setUniform ("uniform1i", "polylines", browser .getDefaultTexture2DUnit ());

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
               gl          = this .getBrowser () .getContext (),
               vertices    = this .polylineNode .getVertices () .getValue (),
               numVertices = vertices .length / 4;

            if (numVertices)
            {
               const
                  numLengthSoFar    = numVertices / 2 + 1,
                  polylineArraySize = Math .ceil (Math .sqrt (numLengthSoFar + numVertices));

               let
                  polylineArray = this .polylineArray,
                  lengthSoFar   = 0;

               if (polylineArray .length < polylineArraySize * polylineArraySize * 4)
                  polylineArray = this .polylineArray = new Float32Array (polylineArraySize * polylineArraySize * 4);

               for (let i = 0, length = vertices .length; i < length; i += 8)
               {
                  vertex1 .set (vertices [i],     vertices [i + 1], vertices [i + 2]);
                  vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

                  polylineArray [i / 2 + 4] = lengthSoFar += vertex2 .subtract (vertex1) .abs ();
               }

               polylineArray .set (vertices, numLengthSoFar * 4);

               this .setUniform ("uniform1i", "numLengthSoFar", numLengthSoFar);

               gl .bindTexture (gl .TEXTURE_2D, this .polylineTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, polylineArraySize, polylineArraySize, 0, gl .RGBA, gl .FLOAT, polylineArray);
            }
            else
            {
               this .setUniform ("uniform1i", "numLengthSoFar", 0);
            }
         };
      })(),
      activateTextures: function (browser, gl, program)
      {
         const textureUnit = browser .getTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, this .polylineTexture);
         gl .uniform1i (program .polylines, textureUnit);
      },
   });

   return PolylineEmitter;
});
