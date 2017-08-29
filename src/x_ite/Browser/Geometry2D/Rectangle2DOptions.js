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
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Components/Geometry3D/IndexedFaceSet",
	"x_ite/Components/Rendering/Coordinate",
	"x_ite/Components/Texturing/TextureCoordinate",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
],
function ($,
          X3DBaseNode,
          IndexedFaceSet,
          Coordinate,
          TextureCoordinate,
          Vector2,
          Vector3)
{
"use strict";
	
	function Rectangle2DOptions (executionContext)
	{
		X3DBaseNode .call (this, executionContext);
	}

	Rectangle2DOptions .prototype = $.extend (Object .create (X3DBaseNode .prototype),
	{
		constructor: Rectangle2DOptions,
		getTypeName: function ()
		{
			return "Rectangle2DOptions";
		},
		getComponentName: function ()
		{
			return "X_ITE";
		},
		getContainerField: function ()
		{
			return "rectangle2DOptions";
		},
		initialize: function ()
		{
			X3DBaseNode .prototype .initialize .call (this);
		},
		getGeometry: function ()
		{
			if (this .geometry)
				return this .geometry;

			this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
			this .geometry .texCoord_ = new TextureCoordinate (this .getExecutionContext ());
			this .geometry .coord_    = new Coordinate (this .getExecutionContext ());

			var
				geometry = this .geometry,
				texCoord = this .geometry .texCoord_ .getValue (),
				coord    = this .geometry .coord_ .getValue ();

			geometry .texCoordIndex_ = [
				0, 1, 2, 3, -1, // top
			];

			geometry .coordIndex_ = [
				0, 1, 2, 3, -1, // top
			];

			texCoord .point_ = [
				new Vector2 (1, 1), new Vector2 (0, 1), new Vector2 (0, 0), new Vector2 (1, 0), 
			];

			coord .point_ = [
				new Vector3 (1, 1, 0), new Vector3 (-1, 1, 0), new Vector3 (-1, -1, 0), new Vector3 (1, -1, 0), 
			];

			texCoord .setup ();
			coord    .setup ();
			geometry .setup ();

			return this .geometry;
		},
	});

	return Rectangle2DOptions;
});
