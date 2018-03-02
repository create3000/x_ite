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
	"x_ite/Components/Layout/X3DLayoutNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLayoutNode, 
          X3DCast,
          X3DConstants,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	var
		i        = 0,
		LEFT     = i++,
		CENTER   = i++,
		RIGHT    = i++,
		BOTTOM   = i++,
		TOP      = i++,
		WORLD    = i++,
		FRACTION = i++,
		PIXEL    = i++,
		NONE     = i++,
		STRETCH  = i++;

	function Layout (executionContext)
	{
		X3DLayoutNode .call (this, executionContext);

		this .addType (X3DConstants .Layout);

		this .alignX          = CENTER;
		this .alignY          = CENTER;
		this .offsetUnitX     = WORLD;
		this .offsetUnitY     = WORLD;
		this .offsetX         = 0;
		this .offsetY         = 0;
		this .sizeUnitX       = WORLD;
		this .sizeUnitY       = WORLD;
		this .sizeX           = 1;
		this .sizeY           = 1;
		this .scaleModeX      = NONE;
		this .scaleModeY      = NONE;
		this .parent          = null;
		this .rectangleCenter = new Vector2 (0, 0);
		this .rectangleSize   = new Vector2 (0, 0);
		this .matrix          = new Matrix4 ();
	}

	Layout .prototype = Object .assign (Object .create (X3DLayoutNode .prototype),
	{
		constructor: Layout,
		viewportPixel: new Vector2 (0, 0),
		pixelSize: new Vector2 (0, 0),
		translation: new Vector3 (0, 0, 0),
		offset: new Vector3 (0, 0, 0),
		scale: new Vector3 (1, 1, 1),
		currentTranslation: new Vector3 (0, 0, 0),
		currentRotation: new Rotation4 (0, 0, 1, 0),
		currentScale: new Vector3 (0, 0, 0),
		modelViewMatrix: new Matrix4 (),
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "align",       new Fields .MFString ("CENTER", "CENTER")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "offsetUnits", new Fields .MFString ("WORLD", "WORLD")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "offset",      new Fields .MFFloat (0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "sizeUnits",   new Fields .MFString ("WORLD", "WORLD")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .MFFloat (1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "scaleMode",   new Fields .MFString ("NONE", "NONE")),
		]),
		getTypeName: function ()
		{
			return "Layout";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "layout";
		},
		initialize: function ()
		{
			X3DLayoutNode .prototype .initialize .call (this);

			this .align_       .addInterest ("set_align__", this);
			this .offsetUnits_ .addInterest ("set_offsetUnits__", this);
			this .offset_      .addInterest ("set_offset__", this);
			this .sizeUnits_   .addInterest ("set_sizeUnits__", this);
			this .size_        .addInterest ("set_size__", this);
			this .scaleMode_   .addInterest ("set_scaleMode__", this);

			this .set_align__ ();
			this .set_offsetUnits__ ();
			this .set_offset__ ();
			this .set_sizeUnits__ ();
			this .set_size__ ();
			this .set_scaleMode__ ();
		},
		set_align__: function ()
		{
			// X

			if (this .align_ .length > 0)
			{
				if (this .align_ [0] === "LEFT")
					this .alignX = LEFT;

				else if (this .align_ [0] === "RIGHT")
					this .alignX = RIGHT;

				else
					this .alignX = CENTER;
			}
			else
				this .alignX = CENTER;

			// Y

			if (this .align_ .length > 1)
			{
				if (this .align_ [1] === "BOTTOM")
					this .alignY = BOTTOM;

				else if (this .align_ [1] === "TOP")
					this .alignY = TOP;

				else
					this .alignY = CENTER;
			}
			else
				this .alignY = CENTER;
		},
		set_offsetUnits__: function ()
		{
			if (this .offsetUnits_ .length > 0)
			{
				// X
		
				if (this .offsetUnits_ [0] === "FRACTION")
					this .offsetUnitX = FRACTION;
		
				else if (this .offsetUnits_ [0] === "PIXEL")
					this .offsetUnitX = PIXEL;
		
				else
					this .offsetUnitX = WORLD;
		
				// Y
		
				if (this .offsetUnits_ .length > 1)
				{
					if (this .offsetUnits_ [1] === "FRACTION")
						this .offsetUnitY = FRACTION;
		
					else if (this .offsetUnits_ [1] === "PIXEL")
						this .offsetUnitY = PIXEL;
		
					else
						this .offsetUnitY = WORLD;
				}
				else
					this .offsetUnitY = this .offsetUnitX;
			}
			else
			{
				this .offsetUnitX = WORLD;
				this .offsetUnitY = WORLD;
			}
		},
		set_offset__: function ()
		{
			if (this .offset_ .length > 0)
			{
				// X

				this .offsetX = this .offset_ [0];

				// Y
		
				if (this .offset_ .length > 1)
					this .offsetY = this .offset_ [1];

				else
					this .offsetY = offsetX;
			}
			else
			{
				this .offsetX = 0;
				this .offsetY = 0;
			}
		},
		set_sizeUnits__: function ()
		{
			if (this .sizeUnits_ .length > 0)
			{
				// X
		
				if (this .sizeUnits_ [0] === "FRACTION")
					this .sizeUnitX = FRACTION;
		
				else if (this .sizeUnits_ [0] === "PIXEL")
					this .sizeUnitX = PIXEL;
		
				else
					this .sizeUnitX = WORLD;
		
				// Y
		
				if (this .sizeUnits_ .length > 1)
				{
					if (this .sizeUnits_ [1] === "FRACTION")
						this .sizeUnitY = FRACTION;
		
					else if (this .sizeUnits_ [1] === "PIXEL")
						this .sizeUnitY = PIXEL;
		
					else
						this .sizeUnitY = WORLD;
				}
				else
					this .sizeUnitY = this .sizeUnitX;
			}
			else
			{
				this .sizeUnitX = WORLD;
				this .sizeUnitY = WORLD;
			}
		},
		set_size__: function ()
		{
			if (this .size_ .length > 0)
			{
				// X
		
				this .sizeX = this .size_ [0];
		
				// Y
		
				if (this .size_ .length > 1)
					this .sizeY = this .size_ [1];
		
				else
					this .sizeY = this .sizeX;
			}
			else
			{
				this .sizeX = 0;
				this .sizeY = 0;
			}
		},
		set_scaleMode__: function ()
		{
			if (this .scaleMode_ .length > 0)
			{
				// X
		
				if (this .scaleMode_ [0] === "FRACTION")
					this .scaleModeX = FRACTION;
		
				else if (this .scaleMode_ [0] === "PIXEL")
					this .scaleModeX = PIXEL;
		
				else if (this .scaleMode_ [0] === "STRETCH")
					this .scaleModeX = STRETCH;
		
				else
					this .scaleModeX = NONE;
		
				// Y
		
				if (this .scaleMode_ .length > 1)
				{
					if (this .scaleMode_ [1] === "FRACTION")
						this .scaleModeY = FRACTION;
		
					else if (this .scaleMode_ [1] === "PIXEL")
						this .scaleModeY = PIXEL;
		
					else if (this .scaleMode_ [1] === "STRETCH")
						this .scaleModeY = STRETCH;
		
					else
						this .scaleModeY = NONE;
				}
				else
					this .scaleModeY = this .scaleModeX;
			}
			else
			{
				this .scaleModeX = NONE;
				this .scaleModeY = NONE;
			}
		},
		getRectangleCenter: function ()
		{
			return this .rectangleCenter;
		},
		getRectangleSize: function ()
		{
			return this .rectangleSize;
		},
		getAlignX: function ()
		{
			return this .alignX;
		},
		getAlignY: function ()
		{
			return this .alignY;
		},
		getOffsetUnitX: function ()
		{
			if (this .offsetUnitX === WORLD)
			{
				if (this .parent)
					return this .parent .getOffsetUnitX ();
		
				return FRACTION;
			}

			return this .offsetUnitX;
		},
		getOffsetUnitY: function ()
		{
			if (this .offsetUnitY === WORLD)
			{
				if (this .parent)
					return this .parent .getOffsetUnitY ();
	
				return FRACTION;
			}
		
			return this .offsetUnitY;
		},
		getOffsetX: function ()
		{
			return this .offsetX;
		},
		getOffsetY: function ()
		{
			return this .offsetY;
		},
		getSizeUnitX: function ()
		{
			if (this .sizeUnitX === WORLD)
			{
				if (this .parent)
					return this .parent .getSizeUnitX ();
		
				return FRACTION;
			}
		
			return this .sizeUnitX;
		},
		getSizeUnitY: function ()
		{
			if (this .sizeUnitY === WORLD)
			{
				if (this .parent)
					return this .parent .getSizeUnitY ();
		
				return FRACTION;
			}
		
			return this .sizeUnitY;
		},
		getSizeX: function ()
		{
			return this .sizeX;
		},
		getSizeY: function ()
		{
			return this .sizeY;
		},
		getScaleModeX: function ()
		{
			if (this .parent)
				return this .scaleModeX;
		
			if (this .scaleModeX === NONE)
				return FRACTION;
		
			return this .scaleModeX;
		},
		getScaleModeY: function ()
		{
			if (this .parent)
				return this .scaleModeY;

			if (this .scaleModeY === NONE)
				return FRACTION;
		
			return this .scaleModeY;
		},
		transform: function (type, renderObject)
		{
			var
				matrix    = this .matrix,
				viewpoint = X3DCast (X3DConstants .OrthoViewpoint, renderObject .getViewpoint ());

			// OrthoViewpoint

			if (viewpoint)
			{
				var parent = this .parent = renderObject .getParentLayout ();

				// Calculate rectangleSize

				var
					viewport            = renderObject .getViewVolume () .getScissor (),             // in pixel
					viewportMeter       = viewpoint .getViewportSize (viewport),                     // in meter
					viewportPixel       = this .viewportPixel,                                       // in pixel
					pixelSize           = this .pixelSize,                                           // size of one pixel in meter
					parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter,      // in meter
					rectangleSize       = this .rectangleSize,
					rectangleCenter     = this .rectangleCenter;

				viewportPixel .set (viewport [2], viewport [3]);                                 // in pixel
				pixelSize     .assign (viewportMeter) .divVec (viewportPixel);                   // size of one pixel in meter

				switch (this .getSizeUnitX ())
				{
					case FRACTION:
						rectangleSize .x = this .sizeX * parentRectangleSize .x;
						break;
					case PIXEL:
						rectangleSize .x = this .sizeX * pixelSize .x;
						break;
					default:
						break;
				}
		
				switch (this .getSizeUnitY ())
				{
					case FRACTION:
						rectangleSize .y = this .sizeY * parentRectangleSize .y;
						break;
					case PIXEL:
						rectangleSize .y = this .sizeY * pixelSize .y;
						break;
					default:
						break;
				}
		
				// Calculate translation
		
				var translation = this .translation .set (0, 0, 0);
		
				switch (this .getAlignX ())
				{
					case LEFT:
						translation .x = -(parentRectangleSize .x - rectangleSize .x) / 2;
						break;
					case CENTER:
		
						if (this .getSizeUnitX () === PIXEL && viewportPixel .x & 1)
							translation .x = -pixelSize .x / 2;
		
						break;
					case RIGHT:
						translation .x = (parentRectangleSize .x - rectangleSize .x) / 2;
						break;
				}
		
				switch (this .getAlignY ())
				{
					case BOTTOM:
						translation .y = -(parentRectangleSize .y - rectangleSize .y) / 2;
						break;
					case CENTER:
		
						if (this .getSizeUnitX === PIXEL && viewportPixel .y & 1)
							translation .y = -pixelSize .y / 2;
		
						break;
					case TOP:
						translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
						break;
				}
		
				// Calculate offset
		
				var offset = this .offset .set (0, 0, 0);

				switch (this .getOffsetUnitX ())
				{
					case FRACTION:
						offset .x = this .offsetX * parentRectangleSize .x;
						break;
					case PIXEL:
						offset .x = this .offsetX * viewportMeter .x / viewportPixel .x;
						break;
				}
		
				switch (this .getOffsetUnitY ())
				{
					case FRACTION:
						offset .y = this .offsetY * parentRectangleSize .y;
						break;
					case PIXEL:
						offset .y = this .offsetY * viewportMeter .y / viewportPixel .y;
						break;
				}
		
				// Calculate scale
		
				var
					scale              = this .scale .set (1, 1, 1),
					currentTranslation = this .currentTranslation,
					currentRotation    = this .currentRotation,
					currentScale       = this .currentScale;

				var modelViewMatrix = renderObject .getModelViewMatrix () .get ();
				modelViewMatrix .get (currentTranslation, currentRotation, currentScale);
		
				switch (this .getScaleModeX ())
				{
					case NONE:
						scale .x = currentScale .x;
						break;
					case FRACTION:
						scale .x = rectangleSize .x;
						break;
					case STRETCH:
						break;
					case PIXEL:
						scale .x = viewportMeter .x / viewportPixel .x;
						break;
				}
		
				switch (this .getScaleModeY ())
				{
					case NONE:
						scale .y = currentScale .y;
						break;
					case FRACTION:
						scale .y = rectangleSize .y;
						break;
					case STRETCH:
						break;
					case PIXEL:
						scale .y = viewportMeter .y / viewportPixel .y;
						break;
				}
		
				// Calculate scale for scaleMode STRETCH
		
				if (this .getScaleModeX () === STRETCH)
				{
					if (this .getScaleModeY () === STRETCH)
					{
						if (rectangleSize .x > rectangleSize .y)
						{
							scale .x = rectangleSize .x;
							scale .y = scale .x;
						}
						else
						{
							scale .y = rectangleSize .y;
							scale .x = scale .y;
						}
					}
					else
						scale .x = scale .y;
				}
				else if (this .getScaleModeY () === STRETCH)
					scale .y = scale .x;
		
				// Transform

				rectangleCenter .assign (translation) .add (offset);

				matrix .set (currentTranslation, currentRotation);
				matrix .translate (translation .add (offset));
				matrix .scale (scale);
			}
			else
				matrix .identity ();

			return matrix;
		},
	});

	return Layout;
});


