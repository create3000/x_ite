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
	"x_ite/Components/Shape/Shape",
	"x_ite/Components/Rendering/IndexedLineSet",
	"x_ite/Components/Rendering/Color",
	"x_ite/Components/Rendering/Coordinate",
],
function (Fields,
          Shape,
          IndexedLineSet,
			 Color,
			 Coordinate)
{
"use strict";

	function X3DGroupingContext () { }

	X3DGroupingContext .prototype =
	{
		initialize: function () { },
		getBBoxNode: function ()
		{
			const bboxNode       = new Shape (this .getPrivateScene ());
			const bboxGeometry   = new IndexedLineSet (this .getPrivateScene ());
			const bboxColor      = new Color (this .getPrivateScene ());
			const bboxCoordinate = new Coordinate (this .getPrivateScene ());

			bboxNode .geometry_       = bboxGeometry;
			bboxGeometry .coordIndex_ = new Fields .MFFloat (0, 1, 2, 3, 0, -1, 4, 5, 6, 7, 4, -1, 0, 4, -1, 1, 5, -1, 2, 6, -1, 3, 7, -1);
			bboxGeometry .color_      = bboxColor;
			bboxGeometry .coord_      = bboxCoordinate;
			bboxColor .color_         = new Fields .MFColor (new Fields .SFColor (1, 1, 1));
			bboxCoordinate .point_    = new Fields .MFVec3f (new Fields .SFVec3f (0.5, 0.5, 0.5), new Fields .SFVec3f (-0.5, 0.5, 0.5), new Fields .SFVec3f (-0.5, -0.5, 0.5), new Fields .SFVec3f (0.5, -0.5, 0.5), new Fields .SFVec3f (0.5, 0.5, -0.5), new Fields .SFVec3f (-0.5, 0.5, -0.5), new Fields .SFVec3f (-0.5, -0.5, -0.5), new Fields .SFVec3f (0.5, -0.5, -0.5));

			bboxCoordinate .setup ();
			bboxColor      .setup ();
			bboxGeometry   .setup ();
			bboxNode       .setup ();

			this .bboxNode = bboxNode;

			this .getBBoxNode = function () { return this .bboxNode; };

			return bboxNode;
		}
	};

	return X3DGroupingContext;
});
