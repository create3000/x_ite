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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Components/ParticleSystems/X3DParticleEmitterNode",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode, 
          X3DConstants,
          Vector3,
          Rotation4)
{
"use strict";

	function ConeEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .ConeEmitter);

		this .rotation = new Rotation4 (0, 0, 1, 0);
	}

	ConeEmitter .prototype = $.extend (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: ConeEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "position",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "angle",       new Fields .SFFloat (0.7854)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",       new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "variation",   new Fields .SFFloat (0.25)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "mass",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "surfaceArea", new Fields .SFFloat ()),
		]),
		getTypeName: function ()
		{
			return "ConeEmitter";
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

			this .position_  .addInterest ("set_position__", this);
			this .direction_ .addInterest ("set_direction__", this);
			this .angle_     .addInterest ("set_angle__", this);

			this .set_position__ ();
			this .set_direction__ ();
			this .set_angle__ ();
		},
		set_position__: function ()
		{
			this .position = this .position_ .getValue ()
		},
		set_direction__: function ()
		{
			var direction = this .direction_ .getValue ();

			this .rotation .setFromToVec (Vector3 .zAxis, direction);

			if (direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_angle__: function ()
		{
			this .angle = this .angle_ .getValue ()
		},
		getRandomPosition: function (position)
		{
			return position .assign (this .position);
		},
		getRandomVelocity: function (velocity)
		{
			return this .rotation .multVecRot (this .getRandomNormalWithAngle (this .angle, velocity) .multiply (this .getRandomSpeed ()));
 		},
	});

	return ConeEmitter;
});


