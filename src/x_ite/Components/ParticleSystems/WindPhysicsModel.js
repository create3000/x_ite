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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/ParticleSystems/X3DParticlePhysicsModelNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticlePhysicsModelNode, 
          X3DConstants,
          Vector3,
          Algorithm)
{
"use strict";

	var force = new Vector3 (0, 0, 0);

	function WindPhysicsModel (executionContext)
	{
		X3DParticlePhysicsModelNode .call (this, executionContext);

		this .addType (X3DConstants .WindPhysicsModel);

		this .speed_ .setUnit ("speed");
	}

	WindPhysicsModel .prototype = Object .assign (Object .create (X3DParticlePhysicsModelNode .prototype),
	{
		constructor: WindPhysicsModel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "direction",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "speed",      new Fields .SFFloat (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "gustiness",  new Fields .SFFloat (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "turbulence", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "WindPhysicsModel";
		},
		getComponentName: function ()
		{
			return "ParticleSystems";
		},
		getContainerField: function ()
		{
			return "physics";
		},
		getRandomSpeed: function (emitterNode)
		{
			var
				speed     = Math .max (0, this .speed_ .getValue ()),
				variation = speed * Math .max (0, this .gustiness_ .getValue ());
		
			return emitterNode .getRandomValue (Math .max (0, speed - variation), speed + variation);
		},
		addForce: function (i, emitterNode, forces, turbulences)
		{
			var surfaceArea = emitterNode .surfaceArea_ .getValue ()

			if (this .enabled_ .getValue ())
			{
				var
					randomSpeed = this .getRandomSpeed (emitterNode),
					pressure    = Math .pow (10, 2 * Math .log (randomSpeed)) * 0.64615;
		
				if (this .direction_ .getValue () .equals (Vector3 .Zero))
					emitterNode .getRandomNormal (force);
				else
					force .assign (this .direction_ .getValue ()) .normalize ();

				forces [i] .assign (force .multiply (surfaceArea * pressure));
				turbulences [i] = Math .PI * Algorithm .clamp (this .turbulence_ .getValue (), 0, 1);
			}
		},
	});

	return WindPhysicsModel;
});


