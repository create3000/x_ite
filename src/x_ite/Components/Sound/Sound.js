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
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Sound/X3DSoundNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSoundNode, 
          X3DCast,
          TraverseType,
          X3DConstants,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	function Sound (executionContext)
	{
		X3DSoundNode .call (this, executionContext);

		this .addType (X3DConstants .Sound);

		this .location_ .setUnit ("length");
		this .minBack_  .setUnit ("length");
		this .minFront_ .setUnit ("length");
		this .maxBack_  .setUnit ("length");
		this .maxFront_ .setUnit ("length");

		this .min = { radius: 0, distance: 0 };
		this .max = { radius: 0, distance: 0 };
	}

	Sound .prototype = $.extend (Object .create (X3DSoundNode .prototype),
	{
		constructor: Sound,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",  new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "spatialize", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "location",   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",  new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "minBack",    new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "minFront",   new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "maxBack",    new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "maxFront",   new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "priority",   new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "source",     new Fields .SFNode ()),
		]),
		modelMatrix: new Matrix4 (),
		translation: new Vector3 (0, 0, 0),
		rotation: new Rotation4 (),
		scale: new Vector3 (1, 1, 1),
		viewer: new Vector3 (0, 0, 0),
		zAxis: new Vector3 (0, 0, 1),
		getTypeName: function ()
		{
			return "Sound";
		},
		getComponentName: function ()
		{
			return "Sound";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DSoundNode .prototype .initialize .call (this);

			this .source_ .addInterest ("set_source__", this);

			this .set_source__ ();
		},
		set_source__: function ()
		{
		   if (this .sourceNode)
		      this .sourceNode .setVolume (0);

			this .sourceNode = X3DCast (X3DConstants .X3DSoundSourceNode, this .source_);
		},
		traverse: function (type, renderObject)
		{
			if (type !== TraverseType .DISPLAY)
				return;

			if (! this .sourceNode)
				return;

			if (! this .sourceNode .isActive_ .getValue () || this .sourceNode .isPaused_ .getValue ())
				return;

			try
			{
				var modelViewMatrix = renderObject .getModelViewMatrix () .get ();

				this .getEllipsoidParameter (modelViewMatrix, this .maxBack_ .getValue (), this .maxFront_ .getValue (), this .max);
				this .getEllipsoidParameter (modelViewMatrix, this .minBack_ .getValue (), this .minFront_ .getValue (), this .min);

				if (this .max .distance < this .max .radius)
				{
					if (this .min .distance < this .min .radius)
						this .sourceNode .setVolume (this .intensity_ .getValue ());

					else
					{
						var
							d1 = this .max .radius - this .max .distance,
							d2 = this .max .radius - this .min .radius;

						this .sourceNode .setVolume (this .intensity_ .getValue () * (d1 / d2));
					}
				}
				else
					this .sourceNode .setVolume (0);
			}
			catch (error)
			{
			   console .log (error);
				this .sourceNode .setVolume (0);
			}
		},
		getEllipsoidParameter: function (modelViewMatrix, back, front, value)
		{
			/*
			 * http://de.wikipedia.org/wiki/Ellipse
			 *
			 * The ellipsoid is transformed to a sphere for easier calculation and then the viewer position is
			 * transformed into this coordinate system. The radius and distance can then be obtained.
			 */

			var
				a = (back + front) / 2,
				e = a - back,
				b = Math .sqrt (a * a - e * e);
			
			this .translation .z = e;
			this .rotation .setFromToVec (this .zAxis, this .direction_ .getValue ());
			this .scale .z = a / b;

			var modelMatrix = this .modelMatrix;

			modelMatrix .assign (modelViewMatrix);
			modelMatrix .translate (this .location_ .getValue ());
			modelMatrix .rotate (this .rotation);

			modelMatrix .translate (this .translation);
			modelMatrix .scale (this .scale);

			modelMatrix .inverse ();

			this .viewer .set (modelMatrix [12],
			                   modelMatrix [13],
			                   modelMatrix [14]);

			value .radius   = b;
			value .distance = this .viewer .abs ();
		},
	});

	return Sound;
});


