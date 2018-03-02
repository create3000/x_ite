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
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Box3",
],
function (X3DChildNode, 
          X3DBoundedObject,
          X3DCast,
          X3DConstants,
          Box3)
{
"use strict";

	function X3DShapeNode (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .X3DShapeNode);

		this .bbox = new Box3 ();
	}

	X3DShapeNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DShapeNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .bboxSize_   .addInterest ("set_bbox__", this);
			this .bboxCenter_ .addInterest ("set_bbox__", this);
			this .appearance_ .addInterest ("set_apparance__", this);
			this .geometry_   .addInterest ("set_geometry__", this);

			this .set_apparance__ ();
			this .set_geometry__ ();
		},
		getBBox: function (bbox)
		{
			return bbox .assign (this .bbox);
		},
		getBBoxSize: function ()
		{
			return this .bboxSize;
		},
		getBBoxCenter: function ()
		{
			return this .bboxCenter;
		},
		getAppearance: function ()
		{
			return this .apparanceNode;
		},
		getGeometry: function ()
		{
			return this .geometryNode;
		},
		setTransparent: function (value)
		{
			this .transparent = value;
		},
		isTransparent: function ()
		{
			return this .transparent;
		},
		set_bbox__: function ()
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				if (this .getGeometry ())
					this .bbox .assign (this .getGeometry () .getBBox ());

				else
					this .bbox .set ();
			}
			else
				this .bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
			
			this .bboxSize   = this .bbox .size;
			this .bboxCenter = this .bbox .center;
		},
		set_apparance__: function ()
		{
			if (this .apparanceNode)
				this .apparanceNode .removeInterest ("set_transparent__", this);

			this .apparanceNode = X3DCast (X3DConstants .X3DAppearanceNode, this .appearance_);

			if (this .apparanceNode)
				this .apparanceNode .addInterest ("set_transparent__", this);

			else
				this .apparanceNode = this .getBrowser () .getDefaultAppearance ();

			this .set_transparent__ ();
		},
		set_geometry__: function ()
		{
			if (this .geometryNode)
			{
				this .geometryNode .transparent_  .addInterest ("set_transparent__", this);
				this .geometryNode .bbox_changed_ .addInterest ("set_bbox__",        this);
			}

			this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this .geometry_);

			if (this .geometryNode)
			{
				this .geometryNode .transparent_  .addInterest ("set_transparent__", this);
				this .geometryNode .bbox_changed_ .addInterest ("set_bbox__",        this);
			}

			this .set_transparent__ ();
			this .set_bbox__ ();
		},
		set_transparent__: function ()
		{
			this .transparent = (this .apparanceNode && this .apparanceNode .transparent_ .getValue ()) ||
			                    (this .geometryNode && this .geometryNode .transparent_ .getValue ());
		},
	});

	return X3DShapeNode;
});


