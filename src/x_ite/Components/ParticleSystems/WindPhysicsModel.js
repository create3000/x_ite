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

import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DParticlePhysicsModelNode from "./X3DParticlePhysicsModelNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import Vector3                     from "../../../standard/Math/Numbers/Vector3.js";
import Algorithm                   from "../../../standard/Math/Algorithm.js";

function WindPhysicsModel (executionContext)
{
   X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType (X3DConstants .WindPhysicsModel);

   // Units

   this ._speed .setUnit ("speed");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this ._direction = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (WindPhysicsModel .prototype, X3DParticlePhysicsModelNode .prototype),
{
   getRandomSpeed (emitterNode)
   {
      const
         speed     = Math .max (this ._speed .getValue (), 0),
         variation = speed * Math .max (this ._gustiness .getValue (), 0);

      return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
   },
   addForce: (() =>
   {
      const force = new Vector3 ();

      return function (i, emitterNode, timeByMass, forces)
      {
         if (this ._enabled .getValue ())
         {
            const
               surfaceArea = emitterNode .getSurfaceArea (),
               speed       = this .getRandomSpeed (emitterNode),
               pressure    = 10 ** (2 * Math .log (speed)) * 0.64615;

            if (this ._direction .getValue () .equals (Vector3 .Zero))
               emitterNode .getRandomNormal (force);
            else
               force .assign (this ._direction .getValue ()) .normalize ();

            forces .set (force .multiply (surfaceArea * pressure * timeByMass), i * 4);
            forces [i * 4 + 3] = Math .PI * Algorithm .clamp (this ._turbulence .getValue (), 0, 1);

            return true;
         }
         else
         {
            return false;
         }
      }
   })(),
});

Object .defineProperties (WindPhysicsModel,
{
   ... X3DNode .getStaticProperties ("WindPhysicsModel", "ParticleSystems", 1, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",  new Fields .SFVec3f (1, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",      new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gustiness",  new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "turbulence", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default WindPhysicsModel;
