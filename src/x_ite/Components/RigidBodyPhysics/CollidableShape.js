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
	"x_ite/Components/RigidBodyPhysics/X3DNBodyCollidableNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNBodyCollidableNode, 
          X3DCast,
          X3DConstants)
{
"use strict";

	function CollidableShape (executionContext)
	{
		X3DNBodyCollidableNode .call (this, executionContext);

		this .addType (X3DConstants .CollidableShape);
	}

	CollidableShape .prototype = Object .assign (Object .create (X3DNBodyCollidableNode .prototype),
	{
		constructor: CollidableShape,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "shape",       new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CollidableShape";
		},
		getComponentName: function ()
		{
			return "RigidBodyPhysics";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DNBodyCollidableNode .prototype .initialize .call (this);

			this .enabled_ .addInterest ("set_collidableGeometry__", this);
			this .shape_   .addInterest ("set_shape__",              this);

			this .set_shape__ ();
		},
		set_shape__: function ()
		{
			if (this .shapeNode)
			{
				this .shapeNode .isCameraObject_ .removeFieldInterest (this .isCameraObject_);
				this .shapeNode .geometry_ .removeInterest ("set_geometry__", this);
			}

			this .shapeNode = X3DCast (X3DConstants .Shape, this .shape_);

			if (this .shapeNode)
			{
				this .shapeNode .isCameraObject_ .addFieldInterest (this .isCameraObject_);
				this .shapeNode .geometry_ .addInterest ("set_geometry__", this);

				delete this .traverse;
			}
			else
			{
				this .traverse = Function .prototype;
			}
		},
		set_geometry__: function ()
		{
		},
		set_collidableGeometry__: function ()
		{
		},
		traverse: function (type, renderObject)
		{
			var modelViewMatrix = renderObject .getModelViewMatrix ();

			modelViewMatrix .push ();
			modelViewMatrix .multLeft (this .getMatrix ());
	
			this .shapeNode .traverse (type, renderObject);
		
			modelViewMatrix .pop ();
		},
	});

	return CollidableShape;
});


