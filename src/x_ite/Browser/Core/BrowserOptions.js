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
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Core/PrimitiveQuality",
	"x_ite/Browser/Core/TextureQuality",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBaseNode,
          X3DConstants,
          PrimitiveQuality,
          TextureQuality)
{
"use strict";
	
	function BrowserOptions (executionContext)
	{
		X3DBaseNode .call (this, executionContext);

		this .addAlias ("AntiAliased", this .Antialiased_);

		this .setAttributeSplashScreen ();

		this .primitiveQuality = PrimitiveQuality .MEDIUM;
		this .textureQuality   = TextureQuality   .MEDIUM;
	}

	BrowserOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
	{
		constructor: BrowserOptions,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "SplashScreen",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "Dashboard",              new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "Rubberband",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "EnableInlineViewpoints", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "Antialiased",            new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "TextureQuality",         new Fields .SFString ("MEDIUM")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "PrimitiveQuality",       new Fields .SFString ("MEDIUM")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "QualityWhenMoving",      new Fields .SFString ("MEDIUM")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "Shading",                new Fields .SFString ("GOURAUD")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "MotionBlur",             new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "Gravity",                new Fields .SFFloat (9.80665)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "StraightenHorizon",      new Fields .SFBool (true)),
		]),
		getTypeName: function ()
		{
			return "BrowserOptions";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "browserOptions";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);
			
			this .SplashScreen_              .addInterest ("set_splashScreen__", this);
			this .Rubberband_                .addInterest ("set_rubberband__", this);
			this .PrimitiveQuality_          .addInterest ("set_primitiveQuality__", this);
			this .TextureQuality_            .addInterest ("set_textureQuality__", this);
			this .Shading_                   .addInterest ("set_shading__", this);
			this .getBrowser () .shutdown () .addInterest ("configure", this);

			this .configure ();
		},
		configure: function ()
		{
			var fieldDefinitions = this .getFieldDefinitions ();

			for (var i = 0; i < fieldDefinitions .length; ++ i)
			{
				var
					fieldDefinition = fieldDefinitions [i],
					field           = this .getField (fieldDefinition .name);

				if (this .getBrowser () .getDataStorage () ["BrowserOptions." + fieldDefinition .name] !== undefined)
					continue;

				if (! field .equals (fieldDefinition .value))
					field .setValue (fieldDefinition .value);
			}

			var
				rubberband       = this .getBrowser () .getDataStorage () ["BrowserOptions.Rubberband"],
				primitiveQuality = this .getBrowser () .getDataStorage () ["BrowserOptions.PrimitiveQuality"],
				textureQuality   = this .getBrowser () .getDataStorage () ["BrowserOptions.TextureQuality"];

			this .setAttributeSplashScreen ();

			if (rubberband       !== undefined && rubberband       !== this .Rubberband_       .getValue ()) this .Rubberband_       = rubberband;
			if (primitiveQuality !== undefined && primitiveQuality !== this .PrimitiveQuality_ .getValue ()) this .PrimitiveQuality_ = primitiveQuality;
			if (textureQuality   !== undefined && textureQuality   !== this .TextureQuality_   .getValue ()) this .TextureQuality_   = textureQuality;
		},
		setAttributeSplashScreen: function ()
		{
			this .SplashScreen_ .set (this .getSplashScreen ());
		},
		getSplashScreen: function ()
		{
			return this .getBrowser () .getElement () .attr ("splashScreen") !== "false";
		},
		getNotifications: function ()
		{
			return this .getBrowser () .getElement () .attr ("notifications") !== "false";
		},
		getTimings: function ()
		{
			return this .getBrowser () .getElement () .attr ("timings") !== "false";
		},
		getContextMenu: function ()
		{
			return this .getBrowser () .getElement () .attr ("contextMenu") !== "false";
		},
		getCache: function ()
		{
			return this .getBrowser () .getElement () .attr ("cache") !== "false";
		},
		getPrimitiveQuality: function ()
		{
			return this .primitiveQuality;
		},
		getTextureQuality: function ()
		{
			return this .textureQuality;
		},
		getShading: function ()
		{
			return this .Shading_ .getValue ();
		},
		set_splashScreen__: function (splashScreen)
		{
			this .getBrowser () .getElement () .attr ("splashScreen", splashScreen .getValue () ? "true" : "false");
		},
		set_rubberband__: function (rubberband)
		{
			this .getBrowser () .getDataStorage () ["BrowserOptions.Rubberband"] = rubberband .getValue ();
		},
		set_primitiveQuality__: function (primitiveQuality)
		{
			this .getBrowser () .getDataStorage () ["BrowserOptions.PrimitiveQuality"] = primitiveQuality .getValue ();

			var
				arc      = this .getBrowser () .getArc2DOptions (),
				arcClose = this .getBrowser () .getArcClose2DOptions (),
				circle   = this .getBrowser () .getCircle2DOptions (),
				disk     = this .getBrowser () .getDisk2DOptions (),
				cone     = this .getBrowser () .getConeOptions (),
				cylinder = this .getBrowser () .getCylinderOptions (),
				sphere   = this .getBrowser () .getSphereOptions ();

			switch (primitiveQuality .getValue ())
			{
				case "LOW":
				{
					this .primitiveQuality = PrimitiveQuality .LOW;
				
					arc .dimension_      = 20;
					arcClose .dimension_ = 20;
					circle .dimension_   = 20;
					disk .dimension_     = 20;

					cone     .xDimension_ = 16;
					cylinder .xDimension_ = 16;

					sphere .xDimension_ = 20;
					sphere .yDimension_ = 9;
					break;
				}
				case "HIGH":
				{
					this .primitiveQuality = PrimitiveQuality .HIGH;

					arc .dimension_      = 80;
					arcClose .dimension_ = 80;
					circle .dimension_   = 80;
					disk .dimension_     = 80;

					cone     .xDimension_ = 32;
					cylinder .xDimension_ = 32;

					sphere .xDimension_ = 64;
					sphere .yDimension_ = 31;
					break;
				}
				default:
				{
					this .primitiveQuality = PrimitiveQuality .MEDIUM;

					arc .dimension_      = 40;
					arcClose .dimension_ = 40;
					circle .dimension_   = 40;
					disk .dimension_     = 40;

					cone     .xDimension_ = 20;
					cylinder .xDimension_ = 20;

					sphere .xDimension_ = 32;
					sphere .yDimension_ = 15;
					break;
				}
			}
		},
		set_textureQuality__: function (textureQuality)
		{
			this .getBrowser () .getDataStorage () ["BrowserOptions.TextureQuality"] = textureQuality .getValue ();

			var textureProperties = this .getBrowser () .getDefaultTextureProperties ();

			switch (textureQuality .getValue ())
			{
				case "LOW":
				{
					this .textureQuality = TextureQuality .LOW;

					textureProperties .magnificationFilter_ = "AVG_PIXEL";
					textureProperties .minificationFilter_  = "AVG_PIXEL";
					textureProperties .textureCompression_  = "FASTEST";
					textureProperties .generateMipMaps_     = true;

					//glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
					//glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
					break;
				}
				case "HIGH":
				{
					this .textureQuality = TextureQuality .HIGH;

					textureProperties .magnificationFilter_ = "NICEST";
					textureProperties .minificationFilter_  = "NICEST";
					textureProperties .textureCompression_  = "NICEST";
					textureProperties .generateMipMaps_     = true;
			
					//glHint (GL_GENERATE_MIPMAP_HINT,        GL_NICEST);
					//glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);
					break;
				}
				default:
				{
					this .textureQuality = TextureQuality .MEDIUM;

					textureProperties .magnificationFilter_ = "NICEST";
					textureProperties .minificationFilter_  = "AVG_PIXEL_AVG_MIPMAP";
					textureProperties .textureCompression_  = "NICEST";
					textureProperties .generateMipMaps_     = true;

					//glHint (GL_GENERATE_MIPMAP_HINT,        GL_FASTEST);
					//glHint (GL_PERSPECTIVE_CORRECTION_HINT, GL_FASTEST);
					break;
				}
			}
		},
		set_shading__: function (shading)
		{
			this .getBrowser () .setShading (shading .getValue ());
		},
	});

	return BrowserOptions;
});
