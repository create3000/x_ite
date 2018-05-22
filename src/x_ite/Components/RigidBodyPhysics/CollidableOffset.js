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
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNBodyCollidableNode, 
          X3DConstants,
          X3DCast)
{
"use strict";

	function CollidableOffset (executionContext)
	{
		X3DNBodyCollidableNode .call (this, executionContext);

		this .addType (X3DConstants .CollidableOffset);

		this .collidableNode = null;
	}

	CollidableOffset .prototype = Object .assign (Object .create (X3DNBodyCollidableNode .prototype),
	{
		constructor: CollidableOffset,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "collidable",  new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CollidableOffset";
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

			this .enabled_    .addInterest ("set_collidableGeometry__", this);
			this .collidable_ .addInterest ("set_collidable__",         this);

			this .set_collidable__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .collidable_);
		
				if (boundedObject)
					return boundedObject .getBBox (bbox);
		
				return bbox .set ();
			}
		
			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		set_collidable__: function ()
		{
			if (this .collidableNode)
			{
				this .collidableNode .removeInterest ("addNodeEvent", this);
				this .collidableNode .isCameraObject_ .removeFieldInterest (this .isCameraObject_);
			}
		
			this .collidableNode = X3DCast (X3DConstants .X3DNBodyCollidableNode, this .collidable_);

			if (this .collidableNode)
			{
				this .collidableNode .addInterest ("addNodeEvent", this);
				this .collidableNode .isCameraObject_ .addFieldInterest (this .isCameraObject_);

				this .setCameraObject (this .collidableNode .getCameraObject ());

				delete this .traverse;
			}
			else
			{
				this .setCameraObject (false);

				this .traverse = Function .prototype;
			}
		
			this .set_collidableGeometry__ ();
		},
		set_collidableGeometry__: function ()
		{
			if (this .getCompoundShape () .getNumChildShapes ())
				this .getCompoundShape () .removeChildShapeByIndex (0);
		
			if (this .collidableNode && this .enabled_ .getValue ())
				this .getCompoundShape () .addChildShape (this .getLocalTransform (), this .collidableNode .getCompoundShape ());
		},
		traverse: function (type, renderObject)
		{
			var modelViewMatrix = renderObject .getModelViewMatrix ();

			modelViewMatrix .push ();
			modelViewMatrix .multLeft (this .getMatrix ());
	
			this .collidableNode .traverse (type, renderObject);
		
			modelViewMatrix .pop ();
		},
	});

	return CollidableOffset;
});


