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
import X3DParticleEmitterNode from "./X3DParticleEmitterNode.js";
import IndexedLineSet         from "../Rendering/IndexedLineSet.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

function PolylineEmitter (executionContext)
{
   X3DParticleEmitterNode .call (this, executionContext);

   this .addType (X3DConstants .PolylineEmitter);

   this .verticesIndex  = -1;
   this .polylinesNode  = new IndexedLineSet (executionContext);
   this .polylinesArray = new Float32Array ();
}

Object .assign (Object .setPrototypeOf (PolylineEmitter .prototype, X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      X3DParticleEmitterNode .prototype .initialize .call (this);

      const browser = this .getBrowser ();

      if (browser .getContext () .getVersion () < 2)
         return;

      // Create GL stuff.

      this .polylinesTexture = this .createTexture ();

      // Initialize fields.

      this ._direction .addInterest ("set_direction__", this);

      this ._set_coordIndex .addFieldInterest (this ._coordIndex);
      this ._coordIndex     .addFieldInterest (this .polylinesNode ._coordIndex);
      this ._coord          .addFieldInterest (this .polylinesNode ._coord);

      this .polylinesNode ._coordIndex = this ._coordIndex;
      this .polylinesNode ._coord      = this ._coord;

      this .polylinesNode .setPrivate (true);
      this .polylinesNode .setup ();
      this .polylinesNode ._rebuild .addInterest ("set_polylines__", this);

      this .addDefine ("#define X3D_POLYLINE_EMITTER");
      this .addSampler ("polylines");

      this .addUniform ("direction",     "uniform vec3 direction;");
      this .addUniform ("verticesIndex", "uniform int verticesIndex;");
      this .addUniform ("polylines",     "uniform sampler2D polylines;");

      this .addCallback (this .set_direction__);
      this .addCallback (this .set_verticesIndex__);

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

      this .set_polylines__ ();
   },
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
   set_polylines__: (() =>
   {
      const
         vertex1 = new Vector3 (),
         vertex2 = new Vector3 ();

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

         this .verticesIndex = numVertices ? verticesIndex : -1;

         if (polylineArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, polylineArraySize, polylineArraySize, 0, gl .RGBA, gl .FLOAT, polylinesArray);
         }

         this .set_verticesIndex__ ();
      };
   })(),
   activateTextures (gl, program)
   {
      gl .activeTexture (gl .TEXTURE0 + program .polylinesTextureUnit);
      gl .bindTexture (gl .TEXTURE_2D, this .polylinesTexture);
   },
});

Object .defineProperties (PolylineEmitter,
{
   typeName:
   {
      value: "PolylineEmitter",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "ParticleSystems", level: 1 }),
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

export default PolylineEmitter;
