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
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

function ExplosionEmitter (executionContext)
{
   X3DParticleEmitterNode .call (this, executionContext);

   this .addType (X3DConstants .ExplosionEmitter);

   // Units

   this ._position .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ExplosionEmitter .prototype, X3DParticleEmitterNode .prototype),
{
   initialize ()
   {
      X3DParticleEmitterNode .prototype .initialize .call (this);

      if (this .getBrowser () .getContext () .getVersion () < 2)
         return;

      this ._position .addInterest ("set_position__", this);

      this .addDefine ("#define X3D_EXPLOSION_EMITTER");
      this .addUniform ("position", "uniform vec3 position;");
      this .addCallback (this .set_position__);

      this .addFunction (/* glsl */ `vec3 getRandomVelocity ()
      {
         return getRandomSphericalVelocity ();
      }`);

      this .addFunction (/* glsl */ `vec4 getRandomPosition ()
      {
         return vec4 (position, 1.0);
      }`);
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

         return bbox .set (bboxSize .set (s, s, s), this ._position .getValue ());
      };
   })(),
   isExplosive ()
   {
      return true;
   },
   set_position__ ()
   {
      const { x, y, z } = this ._position .getValue ();

      this .setUniform ("uniform3f", "position", x, y, z);

      this ._bbox_changed .addEvent ();
   },
});

Object .defineProperties (ExplosionEmitter,
{
   ... X3DNode .getStaticProperties ("ExplosionEmitter", "ParticleSystems", 1, "emitter", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "variation",   new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mass",        new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceArea", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ExplosionEmitter;
