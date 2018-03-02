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
	"x_ite/Components/ParticleSystems/X3DParticleEmitterNode",
	"x_ite/Components/Rendering/IndexedLineSet",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DParticleEmitterNode,
          IndexedLineSet,
          X3DConstants,
          Vector3,
          Algorithm)
{
"use strict";

	var
		vertex1 = new Vector3 (0, 0, 0),
		vertex2 = new Vector3 (0, 0, 0);

	function PolylineEmitter (executionContext)
	{
		X3DParticleEmitterNode .call (this, executionContext);

		this .addType (X3DConstants .PolylineEmitter);

		this .speed_       .setUnit ("speed");
		this .mass_        .setUnit ("mass");
		this .surfaceArea_ .setUnit ("area");

		this .direction        = new Vector3 (0, 0, 0);
		this .polylineNode     = new IndexedLineSet (executionContext);
		this .polylines        = [ ];
		this .lengthSoFarArray = [ 0 ];
	}

	PolylineEmitter .prototype = Object .assign (Object .create (X3DParticleEmitterNode .prototype),
	{
		constructor: PolylineEmitter,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
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

			this .direction_ .addInterest ("set_direction__", this);

			this .coordIndex_ .addFieldInterest (this .polylineNode .coordIndex_);
			this .coord_      .addFieldInterest (this .polylineNode .coord_);
		
			this .polylineNode .coordIndex_ = this .coordIndex_;
			this .polylineNode .coord_      = this .coord_;

			this .polylineNode .addInterest ("set_polyline", this);
			this .polylineNode .setPrivate (true);
			this .polylineNode .setup ();

			this .set_direction__ ();
			this .set_polyline ();
		},
		set_direction__: function ()
		{
			this .direction .assign (this .direction_ .getValue ()) .normalize ();

			if (this .direction .equals (Vector3 .Zero))
				this .getRandomVelocity = this .getSphericalRandomVelocity;
			else
				delete this .getRandomVelocity;
		},
		set_polyline: function ()
		{
			var vertices = this .vertices = this .polylineNode .getVertices () .getValue ();

			if (vertices .length)
			{
				delete this .getRandomPosition;

				var
					lengthSoFar      = 0,
					lengthSoFarArray = this .lengthSoFarArray;
		
				lengthSoFarArray .length = 1;

				for (var i = 0, length = vertices .length; i < length; i += 8)
				{
					vertex1 .set (vertices [i + 0], vertices [i + 1], vertices [i + 2]);
					vertex2 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]);

					lengthSoFar += vertex2 .subtract (vertex1) .abs ();
					lengthSoFarArray .push (lengthSoFar);
				}
			}
			else
			{
				this .getRandomPosition = getPosition;
			}
		},
		getRandomPosition: function (position)
		{
			// Determine index0 and weight.

			var
				lengthSoFarArray = this .lengthSoFarArray,
				length           = lengthSoFarArray .length,
				fraction         = Math .random () * lengthSoFarArray [length - 1],
				index0           = 0,
				index1           = 0,
				weight           = 0;

			if (length == 1 || fraction <= lengthSoFarArray [0])
			{
				index0 = 0;
				weight = 0;
			}
			else if (fraction >= lengthSoFarArray [length - 1])
			{
				index0 = length - 2;
				weight = 1;
			}
			else
			{
				var index = Algorithm .upperBound (lengthSoFarArray, 0, length, fraction, Algorithm .less);

				if (index < length)
				{
					index1 = index;
					index0 = index - 1;
			
					var
						key0 = lengthSoFarArray [index0],
						key1 = lengthSoFarArray [index1];
			
					weight = Algorithm .clamp ((fraction - key0) / (key1 - key0), 0, 1);
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

			var vertices = this .vertices;

			vertex1 .set (vertices [index0 + 0], vertices [index0 + 1], vertices [index0 + 2]);
			vertex2 .set (vertices [index1 + 0], vertices [index1 + 1], vertices [index1 + 2]);
	
			position .x = vertex1 .x + weight * (vertex2 .x - vertex1 .x);
			position .y = vertex1 .y + weight * (vertex2 .y - vertex1 .y);
			position .z = vertex1 .z + weight * (vertex2 .z - vertex1 .z);

			return position;
		},
		getRandomVelocity: function (velocity)
		{
			var
				direction = this .direction,
				speed     = this .getRandomSpeed ();

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

	return PolylineEmitter;
});


