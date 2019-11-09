(function () {

	var
		define  = X3D .define,
		require = X3D .require,
		module  = { };
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


define ('x_ite/Browser/Layout/X3DLayoutContext',[
	"jquery",
	"x_ite/Components/Texturing/TextureProperties",
],
function ($,
          TextureProperties)
{
"use strict";

	function X3DLayoutContext () { }

	X3DLayoutContext .prototype =
	{
		getScreenTextureProperties: function ()
		{
			if (this .screenTextureProperties !== undefined)
			   return this .screenTextureProperties;

			this .screenTextureProperties = new TextureProperties (this .getPrivateScene ());

			this .screenTextureProperties .boundaryModeS_       = "CLAMP";
			this .screenTextureProperties .boundaryModeT_       = "CLAMP";
			this .screenTextureProperties .boundaryModeR_       = "CLAMP";
			this .screenTextureProperties .minificationFilter_  = "NEAREST";
			this .screenTextureProperties .magnificationFilter_ = "NEAREST";
			this .screenTextureProperties .generateMipMaps_     = false;

			this .screenTextureProperties .setup ();

		   return this .screenTextureProperties;
		},
		getPointSize: function ()
		{
			if (this .pointSize === undefined)
			{
				var div = $("<div></div>");
				this .pointSize = div .appendTo ($("body")) .css ("height", "1in") .css ("display", "none") .height () / 72;
				div .remove ();
			}

		   return this .pointSize;
		},
	};

	return X3DLayoutContext;
});

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


define ('x_ite/Components/Layout/X3DLayoutNode',[
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DChildNode,
          X3DConstants)
{
"use strict";

	function X3DLayoutNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DLayoutNode);
	}

	X3DLayoutNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DLayoutNode,
	});

	return X3DLayoutNode;
});



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


define ('x_ite/Components/Layout/Layout',[
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
			var parent = this .parent = renderObject .getParentLayout ();

			// Calculate rectangleSize

			var
				matrix              = this .matrix,
				viewpoint           = renderObject .getViewpoint (),
				nearValue           = renderObject .getNavigationInfo () .getNearValue (),       // in meters
				viewport            = renderObject .getViewVolume () .getScissor (),             // in pixels
				viewportMeter       = viewpoint .getViewportSize (viewport, nearValue),          // in meters
				viewportPixel       = this .viewportPixel,                                       // in pixels
				pixelSize           = this .pixelSize,                                           // size of one pixel in meters
				parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter,      // in meters
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

			return matrix;
		},
	});

	return Layout;
});



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


define ('x_ite/Components/Layout/LayoutGroup',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DCast,
          TraverseType,
          X3DConstants,
          Matrix4)
{
"use strict";

	function LayoutGroup (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .LayoutGroup);

		this .viewportNode    = null;
		this .layoutNode      = null;
		this .modelViewMatrix = new Matrix4 ();
		this .screenMatrix    = new Matrix4 ();
	}

	LayoutGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: LayoutGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "layout",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "viewport",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LayoutGroup";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);

			this .viewport_ .addInterest ("set_viewport__", this);
			this .layout_   .addInterest ("set_layout__", this);
		
			this .set_viewport__ ();
			this .set_layout__ ();
		},
		set_viewport__: function ()
		{
			this .viewportNode = X3DCast (X3DConstants .X3DViewportNode, this .viewport_);
		},
		set_layout__: function ()
		{
			this .layoutNode = X3DCast (X3DConstants .X3DLayoutNode, this .layout_);
		},
		getBBox: function (bbox)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox) .multRight (this .getMatrix ());
		},
		getMatrix: function ()
		{
			try
			{
				if (this .layoutNode)
					this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
				else
					this .matrix .identity ();
			}
			catch (error)
			{ }
		
			return this .matrix;
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .COLLISION:
				{
					return;
				}
				default:
				{
					if (this .viewportNode)
						this .viewportNode .push ();

					if (this .layoutNode)
					{
						var modelViewMatrix = renderObject .getModelViewMatrix ();

						this .modelViewMatrix .assign (modelViewMatrix .get ());
						this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

						modelViewMatrix .pushMatrix (this .screenMatrix);
						renderObject .getLayouts () .push (this .layoutNode);

						X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

						renderObject .getLayouts () .pop ();
						modelViewMatrix .pop ();
					}
					else
					{
						X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
					}

					if (this .viewportNode)
						this .viewportNode .pop ();
		
					return;
				}
			}
		},
	});

	return LayoutGroup;
});



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


define ('x_ite/Components/Layout/LayoutLayer',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Layering/X3DLayerNode",
	"x_ite/Components/Layout/LayoutGroup",
	"x_ite/Components/Navigation/OrthoViewpoint",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLayerNode,
          LayoutGroup,
          OrthoViewpoint,
          X3DConstants)
{
"use strict";

	function LayoutLayer (executionContext)
	{
		X3DLayerNode .call (this,
		                    executionContext,
		                    new OrthoViewpoint (executionContext),
		                    new LayoutGroup (executionContext));

		this .addType (X3DConstants .LayoutLayer);
	}

	LayoutLayer .prototype = Object .assign (Object .create (X3DLayerNode .prototype),
	{
		constructor: LayoutLayer,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "isPickable",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "layout",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "viewport",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LayoutLayer";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "layers";
		},
		initialize: function ()
		{
			X3DLayerNode .prototype .initialize .call (this);

			this .layout_         .addFieldInterest (this .getGroup () .layout_);
			this .addChildren_    .addFieldInterest (this .getGroup () .addChildren_);
			this .removeChildren_ .addFieldInterest (this .getGroup () .removeChildren_);
			this .children_       .addFieldInterest (this .getGroup () .children_);

			this .getGroup () .layout_   = this .layout_;
			this .getGroup () .children_ = this .children_;

			this .getGroup () .setPrivate (true);
			this .getGroup () .setup ();
		},
	});

	return LayoutLayer;
});

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


define ('x_ite/Browser/Layout/ScreenText',[
	"jquery",
	"x_ite/Fields",
	"x_ite/Browser/Text/X3DTextGeometry",
	"x_ite/Browser/Text/TextAlignment",
	"x_ite/Components/Texturing/PixelTexture",
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/TraverseType",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Algorithm",
],
function ($,
          Fields,
          X3DTextGeometry,
          TextAlignment,
          PixelTexture,
          X3DGeometryNode,
          TraverseType,
          Vector2,
          Vector3,
          Vector4,
          Rotation4,
          Matrix4,
          Box3,
          ViewVolume,
          Algorithm)
{
"use strict";

	function ScreenText (text, fontStyle)
	{
		X3DTextGeometry .call (this, text, fontStyle);

		text .transparent_ = true;

		this .texCoordArray = X3DGeometryNode .createArray ();
		this .texture       = new PixelTexture (text .getExecutionContext ());
		this .canvas        = $("<canvas></canvas>");
		this .context       = this .canvas [0] .getContext ("2d");
		this .matrix        = new Matrix4 ();

		this .texture .textureProperties_ = fontStyle .getBrowser () .getScreenTextureProperties ();
		this .texture .setup ();
	}

	ScreenText .prototype = Object .assign (Object .create (X3DTextGeometry .prototype),
	{
		constructor: ScreenText,
		modelViewMatrix: new Matrix4 (),
		getTransparent: function ()
		{
			return true;
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		update: (function ()
		{
			var
				min = new Vector3 (0, 0, 0),
				max = new Vector3 (1, 1, 0);

			return function ()
			{
				X3DTextGeometry .prototype .update .call (this);
		
				var
					fontStyle = this .getFontStyle (),
					text      = this .getText (),
					offset    = 1; // For antialiasing border on bottom and right side
	
				text .textBounds_ .x = Math .ceil (text .textBounds_ .x) + offset;
				text .textBounds_ .y = Math .ceil (text .textBounds_ .y) + offset;
	
				this .getBBox () .getExtents (min, max);
	
				min .x -= offset;
				min .y -= offset;
	
				switch (fontStyle .getMajorAlignment ())
				{
					case TextAlignment .BEGIN:
					case TextAlignment .FIRST:
						min .x = Math .floor (min .x);
						max .x = min .x + text .textBounds_ .x;
						break;
					case TextAlignment .MIDDLE:
						min .x = Math .round (min .x);
						max .x = min .x + text .textBounds_ .x;
						break;
					case TextAlignment .END:
						max .x = Math .ceil (max .x);
						min .x = max .x - text .textBounds_ .x;
						break;
				}
	
				switch (fontStyle .getMinorAlignment ())
				{
					case TextAlignment .BEGIN:
					case TextAlignment .FIRST:
						max .y = Math .ceil (max .y);
						min .y = max .y - text .textBounds_ .y;
						break;
					case TextAlignment .MIDDLE:
						max .y = Math .round (max .y);
						min .y = max .y - text .textBounds_ .y;
						break;
					case TextAlignment .END:
						min .y = Math .floor (min .y);
						max .y = min .y + text .textBounds_ .y;
						break;
				}
	
				text .origin_ .x = min .x;
				text .origin_ .y = max .y;
	
				this .getBBox () .setExtents (min, max);
			};
		})(),
		build: (function ()
		{
			var
				min = new Vector3 (0, 0, 0),
				max = new Vector3 (1, 1, 0);

			return function ()
			{
				var
					fontStyle = this .getFontStyle (),
					font      = fontStyle .getFont ();
	
				if (! font)
					return;
	
				var
					text           = this .getText (),
					glyphs         = this .getGlyphs (),
					minorAlignment = this .getMinorAlignment (),
					translations   = this .getTranslations (),
					charSpacings   = this .getCharSpacings (),
					size           = fontStyle .getScale (), // in pixel
					sizeUnitsPerEm = size / font .unitsPerEm,
					texCoordArray  = this .texCoordArray,
					normalArray    = text .getNormals (),
					vertexArray    = text .getVertices (),
					canvas         = this .canvas [0],
					cx             = this .context;
	
				// Set texCoord.
	
				texCoordArray .length = 0;
	
				text .getMultiTexCoords () .push (texCoordArray);
	
				// Triangle one and two.
	
				this .getBBox () .getExtents (min, max);
	
				normalArray  .push (0, 0, 1,
				                    0, 0, 1,
				                    0, 0, 1,
				                    0, 0, 1,
				                    0, 0, 1,
				                    0, 0, 1);
	
				vertexArray .push (min .x, min .y, 0, 1,
				                   max .x, min .y, 0, 1,
				                   max .x, max .y, 0, 1,
				                   min .x, min .y, 0, 1,
				                   max .x, max .y, 0, 1,
				                   min .x, max .y, 0, 1);
	
				// Generate texture.
	
				var
				   width  = text .textBounds_ .x,
				   height = text .textBounds_ .y;
	
				// Scale canvas.
		
				if (! Algorithm .isPowerOfTwo (width) || ! Algorithm .isPowerOfTwo (height))
				{
					canvas .width  = Algorithm .nextPowerOfTwo (width),
					canvas .height = Algorithm .nextPowerOfTwo (height);
				}
				else
				{
					canvas .width  = width;
					canvas .height = height;
				}
	
				var
				   w = width  / canvas .width,
				   h = height / canvas .height,
				   y = 1 - h;
	
				texCoordArray .push (0, y, 0, 1,
				                     w, y, 0, 1,
				                     w, 1, 0, 1,
				                     0, y, 0, 1,
				                     w, 1, 0, 1,
				                     0, 1, 0, 1);
	
				// Setup canvas.
	
				cx .fillStyle = "rgba(255,255,255,0)";
				cx .fillRect (0, 0, canvas .width, canvas .height);
				cx .fillStyle = "rgba(255,255,255,1)";
	
				// Draw glyphs.
	
				if (fontStyle .horizontal_ .getValue ())
				{
					for (var l = 0, length = glyphs .length; l < length; ++ l)
					{
						var
							line         = glyphs [l],
							charSpacing  = charSpacings [l],
							translation  = translations [l],
							advanceWidth = 0;
	
						for (var g = 0, gl = line .length; g < gl; ++ g)
						{
							var
								glyph = line [g],
								x     = minorAlignment .x + translation .x + advanceWidth + g * charSpacing - min .x,
								y     = minorAlignment .y + translation .y - max .y;
	
							this .drawGlyph (cx, font, glyph, x, y, size);
	
							// Calculate advanceWidth.
			
							var kerning = 0;
			
							if (g + 1 < line .length)
								kerning = font .getKerningValue (glyph, line [g + 1]);
			
							advanceWidth += (glyph .advanceWidth + kerning) * sizeUnitsPerEm;
						}
					}
				}
				else
				{
					var
						leftToRight = fontStyle .leftToRight_ .getValue (),
						topToBottom = fontStyle .topToBottom_ .getValue (),
						first       = leftToRight ? 0 : text .string_ .length - 1,
						last        = leftToRight ? text .string_ .length  : -1,
						step        = leftToRight ? 1 : -1;
	
					for (var l = first, t = 0; l !== last; l += step)
					{
						var line = glyphs [l];
	
						var
						   numChars = line .length,
							firstG   = topToBottom ? 0 : numChars - 1,
							lastG    = topToBottom ? numChars : -1,
							stepG    = topToBottom ? 1 : -1;
	
						for (var g = firstG; g !== lastG; g += stepG, ++ t)
						{
							var translation = translations [t];
	
								var
									x = minorAlignment .x + translation .x - min .x,
									y = minorAlignment .y + translation .y - max .y;
	
							this .drawGlyph (cx, font, line [g], x, y, size);
						}
					}
				}
	
				// Transfer texture data.
	
				var imageData = cx .getImageData (0, 0, canvas .width, canvas .height);
	
				// If the cavas is to large imageData is null.
				if (imageData)
					this .texture .setTexture (canvas .width, canvas .height, true, new Uint8Array (imageData .data), true);
				else
				   this .texture .clear ();
			};
		})(),
		drawGlyph: function (cx, font, glyph, x, y, size)
		{
		   //console .log (glyph .name, x, y);

			// Get curves for the current glyph.

			var
				path     = glyph .getPath (x, -y, size),
				commands = path .commands;

			cx .beginPath ();

			for (var i = 0, cl = commands .length; i < cl; ++ i)
			{
				var command = commands [i];

				switch (command .type)
				{
					case "M": // Start
					{
						cx .moveTo (command .x, command .y);
						continue;
					}
					case "Z": // End
					{
					   cx .closePath ();
						continue;
					}
					case "L": // Linear
					{
						cx .lineTo (command .x, command .y);
						continue;
					}
					case "C": // Bezier
					{
						cx .bezierCurveTo (command .x1, command .y1, command .x2, command .y2, command .x, command .y);
						continue;
					}
					case "Q": // Cubic
					{
					   cx .quadraticCurveTo (command .x1, command .y1, command .x, command .y);
						continue;
					}
				}
			}

			if (path .fill)
				cx .fill ();

			if (path .stroke)
			{
				cx .lineWidth = path .strokeWidth;
				cx .stroke ();
			}
		},
		getGlyphExtents: function (font, glyph, primitiveQuality, min, max)
		{
			var unitsPerEm = font .unitsPerEm;

			min .set ((glyph .xMin || 0) / unitsPerEm, (glyph .yMin || 0) / unitsPerEm, 0);
			max .set ((glyph .xMax || 0) / unitsPerEm, (glyph .yMax || 0) / unitsPerEm, 0);
		},
		transform: (function ()
		{
			var
				x            = new Vector4 (0, 0, 0, 0),
				y            = new Vector4 (0, 0, 0, 0),
				z            = new Vector4 (0, 0, 0, 0),
				screenPoint  = new Vector3 (0, 0, 0),
				screenMatrix = new Matrix4 (),
				bbox         = new Box3 ();

			return function (renderObject)
			{
				// throws an exception

				var
					text             = this .getText (),
					modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
					projectionMatrix = renderObject .getProjectionMatrix () .get (),
					viewport         = renderObject .getViewVolume () .getViewport ();

				// Determine screenMatrix.
				// Same as in ScreenGroup.

				var screenScale = renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport); // in meter/pixel

				x .set (modelViewMatrix [ 0], modelViewMatrix [ 1], modelViewMatrix [ 2], modelViewMatrix [ 3]);
				y .set (modelViewMatrix [ 4], modelViewMatrix [ 5], modelViewMatrix [ 6], modelViewMatrix [ 7]);
				z .set (modelViewMatrix [ 8], modelViewMatrix [ 9], modelViewMatrix [10], modelViewMatrix [11]);

				x .normalize () .multiply (screenScale .x);
				y .normalize () .multiply (screenScale .y);
				z .normalize () .multiply (screenScale .z);

				screenMatrix .set (x .x, x .y, x .z, x .w,
				                   y .x, y .y, y .z, y .w,
				                   z .x, z .y, z .z, z .w,
				                   modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], modelViewMatrix [15]);

				// Snap to whole pixel.

				ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

				screenPoint .x = Math .round (screenPoint .x);
				screenPoint .y = Math .round (screenPoint .y);

				ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

				screenPoint .z = 0;
				screenMatrix .translate (screenPoint);

				// Assign modelViewMatrix and calculate relative matrix.

				this .matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
					
				// Update Text bbox.

				bbox .assign (this .getBBox ()) .multRight (this .matrix);

				text .setBBox (bbox);
			};
		})(),
		traverse: function (type, renderObject)
		{
			this .transform (renderObject);
		},
		display: function (gl, context)
		{
			Matrix4 .prototype .multLeft .call (context .modelViewMatrix, this .matrix);

		   context .textureNode          = this .texture;
		   context .textureTransformNode = this .getBrowser () .getDefaultTextureTransform ();
		},
		transformLine: function (line)
		{
			// Apply sceen nodes transformation in place here.
			return line .multLineMatrix (Matrix4 .inverse (this .matrix));
		},
		transformMatrix: function (matrix)
		{
			// Apply sceen nodes transformation in place here.
			return matrix .multLeft (this .matrix);
		},
	});

	return ScreenText;
});

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


define ('x_ite/Components/Layout/ScreenFontStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Text/X3DFontStyleNode",
	"x_ite/Browser/Layout/ScreenText",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DFontStyleNode,
          ScreenText,
          X3DConstants)
{
"use strict";

	function ScreenFontStyle (executionContext)
	{
		X3DFontStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ScreenFontStyle);
	}

	ScreenFontStyle .prototype = Object .assign (Object .create (X3DFontStyleNode .prototype),
	{
		constructor: ScreenFontStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "language",    new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "family",      new Fields .MFString ("SERIF")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "style",       new Fields .SFString ("PLAIN")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "pointSize",   new Fields .SFFloat (12)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "spacing",     new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "horizontal",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "leftToRight", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "topToBottom", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "justify",     new Fields .MFString ("BEGIN")),
		]),
		getTypeName: function ()
		{
			return "ScreenFontStyle";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "fontStyle";
		},
		getTextGeometry: function (text)
		{
			return new ScreenText (text, this);
		},
		getScale: function ()
		{
			return this .pointSize_ .getValue () * this .getBrowser () .getPointSize ();
		},
	});

	return ScreenFontStyle;
});

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


define ('x_ite/Components/Layout/ScreenGroup',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/ViewVolume",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DConstants,
          TraverseType,
          Vector3,
          Vector4,
          Rotation4,
          Matrix4,
          ViewVolume)
{
"use strict";

	function ScreenGroup (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .ScreenGroup);

		this .screenMatrix = new Matrix4 ();
	}

	ScreenGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: ScreenGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "ScreenGroup";
		},
		getComponentName: function ()
		{
			return "Layout";
		},
		getContainerField: function ()
		{
			return "children";
		},
		getBBox: function (bbox)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox) .multRight (this .getMatrix ());
		},
		getMatrix: function ()
		{
			try
			{
				this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
			}
			catch (error)
			{ }

			return this .matrix;
		},
		scale: (function ()
		{
			var
				x            = new Vector4 (0, 0, 0, 0),
				y            = new Vector4 (0, 0, 0, 0),
				z            = new Vector4 (0, 0, 0, 0),
				screenPoint  = new Vector3 (0, 0, 0);

			return function (renderObject)
			{
				// throws domain error
	
				var
					modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
					projectionMatrix = renderObject .getProjectionMatrix () .get (),
					viewport         = renderObject .getViewVolume () .getViewport (),
					screenMatrix     = this .screenMatrix;
			
				// Determine screenMatrix.
				// Same as in ScreenText.

				var screenScale = renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport); // in meter/pixel

				x .set (modelViewMatrix [ 0], modelViewMatrix [ 1], modelViewMatrix [ 2], modelViewMatrix [ 3]);
				y .set (modelViewMatrix [ 4], modelViewMatrix [ 5], modelViewMatrix [ 6], modelViewMatrix [ 7]);
				z .set (modelViewMatrix [ 8], modelViewMatrix [ 9], modelViewMatrix [10], modelViewMatrix [11]);

				x .normalize () .multiply (screenScale .x);
				y .normalize () .multiply (screenScale .y);
				z .normalize () .multiply (screenScale .z);

				screenMatrix .set (x .x, x .y, x .z, x .w,
				                   y .x, y .y, y .z, y .w,
				                   z .x, z .y, z .z, z .w,
				                   modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], modelViewMatrix [15]);
	
				// Snap to whole pixel.

				ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

				screenPoint .x = Math .round (screenPoint .x);
				screenPoint .y = Math .round (screenPoint .y);

				ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

				screenPoint .z = 0;
				screenMatrix .translate (screenPoint);
	
				// Return modelViewMatrix
	
				return screenMatrix;
			};
		})(),
		traverse: function (type, renderObject)
		{
			try
			{
				var modelViewMatrix = renderObject .getModelViewMatrix ();

				switch (type)
				{
					case TraverseType .CAMERA:
					case TraverseType .PICKING:
					case TraverseType .DEPTH: // ???
						// No clone support for shadow, generated cube map texture and bbox
						modelViewMatrix .pushMatrix (this .screenMatrix);
						break;
					default:
						modelViewMatrix .pushMatrix (this .scale (renderObject));
						break;
				}

				X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
	
				modelViewMatrix .pop ();
			}
			catch (error)
			{ }
		},
	});

	return ScreenGroup;
});



/*******************************************************************************
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
	"x_ite/Components",
	"x_ite/Browser/Layout/X3DLayoutContext",
	"x_ite/Components/Layout/Layout",
	"x_ite/Components/Layout/LayoutGroup",
	"x_ite/Components/Layout/LayoutLayer",
	"x_ite/Components/Layout/ScreenFontStyle",
	"x_ite/Components/Layout/ScreenGroup",
	"x_ite/Components/Layout/X3DLayoutNode",
],
function (Components,
          X3DLayoutContext,
          Layout,
          LayoutGroup,
          LayoutLayer,
          ScreenFontStyle,
          ScreenGroup,
          X3DLayoutNode)
{
"use strict";

	Components .addComponent ({
		name: "Layout",
		types:
		{
			Layout:          Layout,
			LayoutGroup:     LayoutGroup,
			LayoutLayer:     LayoutLayer,
			ScreenFontStyle: ScreenFontStyle,
			ScreenGroup:     ScreenGroup,
		},
		abstractTypes:
		{
			X3DLayoutNode: X3DLayoutNode,
		},
		browser: X3DLayoutContext,
	});
});



}());
