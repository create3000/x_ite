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
import X3DConstants           from "../../Base/X3DConstants.js";

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

Object .defineProperties (ConeEmitter,
{
   typeName:
   {
      value: "ConeEmitter",
      enumerable: true,
   },
   componentName:
   {
      value: "ParticleSystems",
      enumerable: true,
   },
   containerField:
   {
      value: "emitter",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["3.2", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
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
      enumerable: true,
   },
});

export default ConeEmitter;
