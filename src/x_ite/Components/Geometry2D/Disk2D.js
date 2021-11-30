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
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Components/Rendering/X3DLineGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DLineGeometryNode,
          X3DConstants,
          Vector3)
{
"use strict";

	function Disk2D (executionContext)
	{
		X3DLineGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .Disk2D);

		this .innerRadius_ .setUnit ("length");
		this .outerRadius_ .setUnit ("length");
	}

	Disk2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
		//X3DLineGeometryNode .prototype, // Considered X3DLineGeometryNode.
	{
		constructor: Disk2D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "innerRadius", new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "outerRadius", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",       new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "Disk2D";
		},
		getComponentName: function ()
		{
			return "Geometry2D";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		initialize: function ()
		{
			X3DGeometryNode .prototype .initialize .call (this);

			this .setPrimitiveMode (this .getBrowser () .getContext () .LINE_LOOP);
		},
		getShader: function (browser, shadow)
		{
			if (this .getGeometryType () < 2)
			{
				// For circle support.
				return browser .getLineShader ();
			}
			else
			{
				return shadow ? browser .getShadowShader () : browser .getDefaultShader ();
			}
		},
		set_live__: function ()
		{
			X3DGeometryNode .prototype .set_live__ .call (this);

			if (this .isLive () .getValue ())
				this .getBrowser () .getDisk2DOptions () .addInterest ("requestRebuild", this);
			else
				this .getBrowser () .getDisk2DOptions () .removeInterest ("requestRebuild", this);
		},
		build: function ()
		{
			var
				options     = this .getBrowser () .getDisk2DOptions (),
				innerRadius = Math .min (Math .abs (this .innerRadius_ .getValue ()), Math .abs (this .outerRadius_ .getValue ())),
				outerRadius = Math .max (Math .abs (this .innerRadius_ .getValue ()), Math .abs (this .outerRadius_ .getValue ()));

			if (innerRadius === outerRadius)
			{
				var vertexArray = this .getVertices ();

				// Point

				if (outerRadius === 0)
				{
					// vertexArray .push (0, 0, 0, 1);
					// this .setGeometryType (GeometryType .GEOMETRY_POINTS);
					return;
				}

				// Circle

				if (outerRadius === 1)
				{
					this .setVertices (options .getCircleVertices ());
				}
				else
				{
					var defaultVertices = options .getCircleVertices () .getValue ();

					for (var i = 0, length = defaultVertices .length; i < length; i += 4)
						vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
				}

				this .getMin () .set (-outerRadius, -outerRadius, 0);
				this .getMax () .set ( outerRadius,  outerRadius, 0);

				this .setGeometryType (1);
				return;
			}

			if (innerRadius === 0)
			{
				// Disk

				this .getMultiTexCoords () .push (options .getDiskTexCoords ());
				this .setNormals (options .getDiskNormals ());

				if (outerRadius === 1)
				{
					this .setVertices (options .getDiskVertices ());
				}
				else
				{
					var
						defaultVertices = options .getDiskVertices () .getValue (),
						vertexArray     = this .getVertices ();

					for (var i = 0, length = defaultVertices .length; i < length; i += 4)
						vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
				}

				this .getMin () .set (-outerRadius, -outerRadius, 0);
				this .getMax () .set ( outerRadius,  outerRadius, 0);

				this .setGeometryType (2);
				this .setSolid (this .solid_ .getValue ());

				return;
			}

			// Disk with hole

			var
				scale            = innerRadius / outerRadius,
				offset           = (1 - scale) / 2,
				defaultTexCoords = options .getDiskTexCoords () .getValue (),
				defaultVertices  = options .getDiskVertices () .getValue (),
				texCoordArray    = this .getTexCoords (),
				normalArray      = this .getNormals (),
				vertexArray      = this .getVertices ();

			this .getMultiTexCoords () .push (texCoordArray);

			for (var i = 0, length = defaultVertices .length; i < length; i += 12)
			{
				texCoordArray .push (defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
				                     defaultTexCoords [i + 4], defaultTexCoords [i + 5], 0, 1,
				                     defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,

				                     defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
				                     defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,
				                     defaultTexCoords [i + 8] * scale + offset, defaultTexCoords [i + 9] * scale + offset, 0, 1);

				normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1,
                               0, 0, 1,  0, 0, 1,  0, 0, 1);

				vertexArray .push (defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
				                   defaultVertices [i + 4] * outerRadius, defaultVertices [i + 5] * outerRadius, 0, 1,
				                   defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,

				                   defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
				                   defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,
				                   defaultVertices [i + 8] * innerRadius, defaultVertices [i + 9] * innerRadius, 0, 1);
			}

			this .getMin () .set (-outerRadius, -outerRadius, 0);
			this .getMax () .set ( outerRadius,  outerRadius, 0);

			this .setGeometryType (2);
			this .setSolid (this .solid_ .getValue ());
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix, intersections)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .intersectsLine .call (this, line, clipPlanes, modelViewMatrix, intersections);
			}
			else
			{
				return X3DGeometryNode .prototype .intersectsLine .call (this, line, clipPlanes, modelViewMatrix, intersections);
			}
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .intersectsBox .call (this, box, clipPlanes, modelViewMatrix);
			}
			else
			{
				return X3DGeometryNode .prototype .intersectsBox .call (this, box, clipPlanes, modelViewMatrix);
			}
		},
		display: function (gl, context)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .display .call (this, gl, context);
			}
			else
			{
				return X3DGeometryNode .prototype .display .call (this, gl, context);
			}
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			if (this .getGeometryType () < 2)
			{
				return X3DLineGeometryNode .prototype .displayParticles .call (this, gl, context, particles, numParticles);
			}
			else
			{
				return X3DGeometryNode .prototype .displayParticles .call (this, gl, context, particles, numParticles);
			}
		}
	});

	return Disk2D;
});
