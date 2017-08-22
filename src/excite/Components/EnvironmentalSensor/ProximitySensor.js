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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Fields",
	"excite/Basic/X3DFieldDefinition",
	"excite/Basic/FieldDefinitionArray",
	"excite/Components/EnvironmentalSensor/X3DEnvironmentalSensorNode",
	"excite/Bits/TraverseType",
	"excite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentalSensorNode, 
          TraverseType,
          X3DConstants,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	var infinity = new Vector3 (-1, -1, -1);
	
	function ProximitySensor (executionContext)
	{
		X3DEnvironmentalSensorNode .call (this, executionContext);

		this .addType (X3DConstants .ProximitySensor);

		this .setCameraObject (true);

		this .viewpoint              = null;
		this .modelViewMatrix        = new Matrix4 ();
		this .invModelViewMatrix     = new Matrix4 ();
		this .centerOfRotationMatrix = new Matrix4 ();
		this .position               = new Vector3 (0, 0, 0);
		this .orientation            = new Rotation4 (0, 0, 1, 0);
		this .centerOfRotation       = new Vector3 (0, 0, 0);
		this .viewer                 = new Vector3 (0, 0, 0);
		this .inside                 = false;
	}

	ProximitySensor .prototype = $.extend (Object .create (X3DEnvironmentalSensorNode .prototype),
	{
		constructor: ProximitySensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "size",                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "center",                   new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",                new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",                 new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",                 new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "position_changed",         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "orientation_changed",      new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "centerOfRotation_changed", new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "ProximitySensor";
		},
		getComponentName: function ()
		{
			return "EnvironmentalSensor";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DEnvironmentalSensorNode .prototype .initialize .call (this);
			
			this .enabled_ .addInterest ("set_enabled__", this);
			this .size_    .addInterest ("set_extents__", this);
			this .center_  .addInterest ("set_extents__", this);

			this .traversed_ .addFieldInterest (this .isCameraObject_);
	
			this .min = new Vector3 (0, 0, 0);
			this .max = new Vector3 (0, 0, 0);
			
			this .set_enabled__ ();
			this .set_extents__ ();
		},
		set_enabled__: function ()
		{
			this .setCameraObject (this .enabled_ .getValue ());
			
			if (this .enabled_ .getValue ())
				this .traverse = traverse;
			else
				delete this .traverse;
		},
		set_extents__: function ()
		{
			var
				s  = this .size_ .getValue (),
				c  = this .center_ .getValue (),
				sx = s .x / 2,
				sy = s .y / 2,
				sz = s .z / 2,
				cx = c .x,
				cy = c .y,
				cz = c .z;

			this .min .set (cx - sx, cy - sy, cz - sz);
			this .max .set (cx + sx, cy + sy, cz + sz);
		},
		update: function ()
		{
			try
			{
				if (this .inside && this .getTraversed ())
				{
				   var
				      modelViewMatrix        = this .modelViewMatrix,
				      centerOfRotationMatrix = this .centerOfRotationMatrix;

					centerOfRotationMatrix .assign (this .viewpoint .getTransformationMatrix ());
					centerOfRotationMatrix .translate (this .viewpoint .getUserCenterOfRotation ());
					centerOfRotationMatrix .multRight (this .invModelViewMatrix .assign (modelViewMatrix) .inverse ());

					modelViewMatrix .multRight (this .viewpoint .getInverseCameraSpaceMatrix ());
					modelViewMatrix .get (null, this .orientation);
					modelViewMatrix .inverse ();

					this .position .set (modelViewMatrix [12],
					                     modelViewMatrix [13],
					                     modelViewMatrix [14]);

					this .orientation .inverse ();

					this .centerOfRotation .set (centerOfRotationMatrix [12],
					                             centerOfRotationMatrix [13],
					                             centerOfRotationMatrix [14]);

					if (this .isActive_ .getValue ())
					{
						if (! this .position_changed_ .getValue () .equals (this .position))
							this .position_changed_ = this .position;

						if (! this .orientation_changed_ .getValue () .equals (this .orientation))
							this .orientation_changed_ = this .orientation;

						if (! this .centerOfRotation_changed_ .getValue () .equals (this .centerOfRotation))
							this .centerOfRotation_changed_ = this .centerOfRotation;
					}
					else
					{
						this .isActive_  = true;
						this .enterTime_ = this .getBrowser () .getCurrentTime ();

						this .position_changed_         = this .position;
						this .orientation_changed_      = this .orientation;
						this .centerOfRotation_changed_ = this .centerOfRotation;
					}

					this .inside = false;
				}
				else
				{
					if (this .isActive_ .getValue ())
					{
						this .isActive_ = false;
						this .exitTime_ = this .getBrowser () .getCurrentTime ();
					}
				}
			}
			catch (error)
			{
				//console .log (error .message);
			}

			this .setTraversed (false);
		},
		traverse: function ()
		{ },
		intersectsPoint: function (point)
		{
			var
				min = this .min,
				max = this .max;

			return min .x <= point .x &&
			       max .x >= point .x &&
			       min .y <= point .y &&
			       max .y >= point .y &&
			       min .z <= point .z &&
			       max .z >= point .z;
		},
	});
		
	function traverse (type, renderObject)
	{
		try
		{
			switch (type)
			{
				case TraverseType .CAMERA:
				{
					this .viewpoint = renderObject .getViewpoint ();
					this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());
					return;
				}
				case TraverseType .DISPLAY:
				{
				   this .setTraversed (true);

					if (this .inside)
						return;

					if (this .size_ .getValue () .equals (infinity))
						this .inside = true;

					else
					{
					   var invModelViewMatrix = this .invModelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()) .inverse ();

						this .viewer .set (invModelViewMatrix [12],
				                         invModelViewMatrix [13],
				                         invModelViewMatrix [14]);

						this .inside = this .intersectsPoint (this .viewer);
					}

					return;
				}
			}
		}
		catch (error)
		{
			//console .log (error);
		}
	}

	return ProximitySensor;
});


