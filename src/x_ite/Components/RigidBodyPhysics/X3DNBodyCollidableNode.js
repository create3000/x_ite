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
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"lib/ammojs/Ammo",
],
function (Fields,
          X3DChildNode, 
          X3DBoundedObject, 
          X3DConstants,
          Vector3,
          Matrix4,
          Ammo)
{
"use strict";

	function X3DNBodyCollidableNode (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .X3DNBodyCollidableNode);

		this .addChildObjects ("body", new Fields .SFNode ());

		// Units
	
		this .translation_ .setUnit ("length");

		// Members

		this .compoundShape  = new Ammo .btCompoundShape ()
		this .offset         = new Vector3 (0, 0, 0);
		this .matrix         = new Matrix4 ();
	}

	X3DNBodyCollidableNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DNBodyCollidableNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		getLocalTransform: (function ()
		{
			var
				m = new Matrix4 (),
				o = new Ammo .btVector3 (0, 0, 0),
				l = new Ammo .btTransform ();

			return function ()
			{
				m .assign (this .getMatrix ());
				m .translate (this .offset);

				//this .localTransform .setFromOpenGLMatrix (m);

				o .setValue (m [12], m [13], m [14]);

				l .getBasis () .setValue (m [0], m [4], m [8],
				                          m [1], m [5], m [9],
				                          m [2], m [6], m [10]);

				l .setOrigin (o);
	
				return l;
			};
		})(),
		setBody: function (value)
		{
			this .body_ = value;
		},
		getBody: function ()
		{
			return this .body_ .getValue ();
		},
		getCompoundShape: function ()
		{
			return this .compoundShape;
		},
		setOffset: function (x, y, z)
		{
			this .offset .set (x, y, z);
		},
		getOffset: function ()
		{
			return this .offset;
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		eventsProcessed: function ()
		{
			this .matrix .set (this .translation_ .getValue (),
			                   this .rotation_    .getValue ());

			if (this .compoundShape .getNumChildShapes ())
				this .compoundShape .updateChildTransform (0, this .getLocalTransform (), true);
		},	
	});

	return X3DNBodyCollidableNode;
});


