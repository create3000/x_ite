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
	"x_ite/Components/Sound/X3DSoundNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Sphere3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSoundNode,
          X3DCast,
          TraverseType,
          X3DConstants,
          Vector3,
          Rotation4,
          Matrix4,
          Line3,
          Plane3,
          Sphere3,
          Algorithm)
{
"use strict";

	function Sound (executionContext)
	{
		X3DSoundNode .call (this, executionContext);

		this .addType (X3DConstants .Sound);

		this .addChildObjects ("traversed", new Fields .SFBool (true));

		this .location_ .setUnit ("length");
		this .minBack_  .setUnit ("length");
		this .minFront_ .setUnit ("length");
		this .maxBack_  .setUnit ("length");
		this .maxFront_ .setUnit ("length");

		this .currentTraversed = true;
	}

	Sound .prototype = Object .assign (Object .create (X3DSoundNode .prototype),
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

			this .isLive ()  .addInterest ("set_live__", this);
			this .traversed_ .addInterest ("set_live__", this);

			this .source_ .addInterest ("set_source__", this);

			this .set_live__ ();
			this .set_source__ ();
		},
		setTraversed: function (value)
		{
		   if (value)
			{
				if (this .traversed_ .getValue () === false)
					this .traversed_ = true;
			}
			else
			{
				if (this .currentTraversed !== this .traversed_ .getValue ())
					this .traversed_ = this .currentTraversed;
			}

		   this .currentTraversed = value;
		},
		getTraversed: function ()
		{
		   return this .currentTraversed;
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue () && this .traversed_ .getValue ())
			{
				this .getBrowser () .sensorEvents () .addInterest ("update", this);
			}
			else
			{
				this .getBrowser () .sensorEvents () .removeInterest ("update", this);
			}
		},
		set_source__: function ()
		{
		   if (this .sourceNode)
		      this .sourceNode .setVolume (0);

			this .sourceNode = X3DCast (X3DConstants .X3DSoundSourceNode, this .source_);
		},
		update: function ()
		{
			if (! this .getTraversed ())
			{
				if (this .sourceNode)
					this .sourceNode .setVolume (0);
			}

			this .setTraversed (false);
		},
		traverse: (function ()
		{
			var
				min = { distance: 0, intersection: new Vector3 (0, 0, 0) },
				max = { distance: 0, intersection: new Vector3 (0, 0, 0) };

			return function (type, renderObject)
			{
				try
				{
					if (type !== TraverseType .DISPLAY)
						return;

					if (! this .sourceNode)
						return;

					if (! this .sourceNode .isActive_ .getValue () || this .sourceNode .isPaused_ .getValue ())
						return;

					this .setTraversed (true);

					var modelViewMatrix = renderObject .getModelViewMatrix () .get ();

					this .getEllipsoidParameter (modelViewMatrix,
					                             Math .max (this .maxBack_  .getValue (), 0),
					                             Math .max (this .maxFront_ .getValue (), 0),
					                             max);

					if (max .distance < 1) // Sphere radius is 1
					{
						this .getEllipsoidParameter (modelViewMatrix,
						                             Math .max (this .minBack_  .getValue (), 0),
						                             Math .max (this .minFront_ .getValue (), 0),
						                             min);

						if (min .distance < 1) // Sphere radius is 1
						{
							this .sourceNode .setVolume (this .intensity_ .getValue ());
						}
						else
						{
							var
								d1        = max .intersection .abs (), // Viewer is here at (0, 0, 0)
								d2        = max .intersection .distance (min .intersection),
								d         = Math .min (d1 / d2, 1),
								intensity = Algorithm .clamp (this .intensity_ .getValue (), 0, 1),
								volume    = intensity * d;

							//console .log (d);

							this .sourceNode .setVolume (volume);
						}
					}
					else
					{
						this .sourceNode .setVolume (0);
					}
				}
				catch (error)
				{
					//console .log (error);

					if (this .sourceNode)
						this .sourceNode .setVolume (0);
				}
			};
		})(),
		getEllipsoidParameter: (function ()
		{
			var
				location        = new Vector3 (0, 0, 0),
				sphereMatrix    = new Matrix4 (),
				invSphereMatrix = new Matrix4 (),
				rotation        = new Rotation4 (),
				scale           = new Vector3 (1, 1, 1),
				sphere          = new Sphere3 (1, Vector3 .Zero),
				normal          = new Vector3 (0, 0, 0),
				line            = new Line3 (Vector3 .Zero, Vector3 .zAxis),
				locationPlane   = new Plane3 (Vector3 .Zero, Vector3 .zAxis),
				intersection1   = new Vector3 (0, 0, 0),
				intersection2   = new Vector3 (0, 0, 0);

			return function (modelViewMatrix, back, front, value)
			{
				/*
				 * http://de.wikipedia.org/wiki/Ellipse
				 *
				 * The ellipsoid is transformed to a sphere for easier calculation and then the viewer position is
				 * transformed into this coordinate system. The radius and distance can then be obtained.
				 *
				 * throws Error
				 */

				var
					a = (back + front) / 2,
					e = a - back,
					b = Math .sqrt (a * a - e * e);

				location .set (0, 0, e);
				scale    .set (b, b, a);

				rotation .setFromToVec (Vector3 .zAxis, this .direction_ .getValue ());
				sphereMatrix .assign (modelViewMatrix);
				sphereMatrix .translate (this .location_ .getValue ());
				sphereMatrix .rotate (rotation);
				sphereMatrix .translate (location);
				sphereMatrix .scale (scale);

				invSphereMatrix .assign (sphereMatrix);
				invSphereMatrix .inverse ();

				var viewer = invSphereMatrix .origin;
				location .negate () .divVec (scale);

				normal .assign (viewer) .subtract (location);
				line .set (viewer, normal);
				sphere .intersectsLine (line, intersection1, intersection2);
				locationPlane .set (location, normal);

				if (locationPlane .getDistanceToPoint (intersection1) > 0)
					value .intersection .assign (sphereMatrix .multVecMatrix (intersection1));
				else
					value .intersection .assign (sphereMatrix .multVecMatrix (intersection2));

				value .distance = viewer .abs ();
			};
		})(),
	});

	return Sound;
});
