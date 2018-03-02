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
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DSensorNode,
          X3DCast,
          TraverseType,
          X3DConstants)
{
"use strict";

	function Collision (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);
		X3DSensorNode   .call (this, executionContext);

		this .addType (X3DConstants .Collision);

		this .addAlias ("collide", this .enabled_); // VRML2
	}

	Collision .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
		X3DSensorNode .prototype,
	{
		constructor: Collision,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "collideTime",    new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "proxy",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "Collision";
		},
		getComponentName: function ()
		{
			return "Navigation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);
			//X3DSensorNode   .prototype .initialize .call (this); // We can only call the base of a *Objects.
	
			this .isLive () .addInterest ("set_live__", this);
			this .enabled_  .addInterest ("set_live__", this);
			this .proxy_    .addInterest ("set_proxy__", this);

			this .set_live__ ();
			this .set_proxy__ ();
		},
		set_live__: function ()
		{
		   if (this .isLive () .getValue () && this .enabled_ .getValue ())
		      this .getBrowser () .addCollision (this);
		   
		   else
		      this .getBrowser () .removeCollision (this);
		},
		set_active: function (value)
		{
			if (this .isActive_ .getValue () !== value)
			{
				this .isActive_ = value;

				if (value)
					this .collideTime_ = this .getBrowser () .getCurrentTime ();
			}
		},
		set_proxy__: function ()
		{
		   this .proxyNode = X3DCast (X3DConstants .X3DChildNode, this .proxy_);
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .COLLISION:
				{
					if (this .enabled_ .getValue ())
					{
					   var collisions = renderObject .getCollisions ();

						collisions .push (this);

						if (this .proxyNode)
							this .proxyNode .traverse (type, renderObject);

						else
							X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

						collisions .pop ();
					}

					break;
				}
				default:
					X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
					break;
			}
		},
	});

	return Collision;
});


