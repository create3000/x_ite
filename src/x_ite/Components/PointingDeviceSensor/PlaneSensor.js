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
	"x_ite/Components/PointingDeviceSensor/X3DDragSensorNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Line3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DDragSensorNode, 
          X3DConstants,
          Rotation4,
          Vector3,
          Vector4,
          Matrix4,
          Line3,
          Plane3,
          ViewVolume,
          Algorithm)
{
"use strict";

	var
		screenLine     = new Line3 (Vector3 .Zero, Vector3 .Zero),
		trackPoint1    = new Vector3 (0, 0, 0),
		trackPointLine = new Line3 (Vector3 .Zero, Vector3 .Zero);

	function PlaneSensor (executionContext)
	{
		X3DDragSensorNode .call (this, executionContext);

		this .addType (X3DConstants .PlaneSensor);

		this .offset_              .setUnit ("length");
		this .minPosition_         .setUnit ("length");
		this .maxPosition_         .setUnit ("length");
		this .translation_changed_ .setUnit ("length");
	}

	PlaneSensor .prototype = Object .assign (Object .create (X3DDragSensorNode .prototype),
	{
		constructor: PlaneSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",            new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",         new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "axisRotation",        new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "autoOffset",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "offset",              new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "minPosition",         new Fields .SFVec2f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "maxPosition",         new Fields .SFVec2f (-1, -1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "trackPoint_changed",  new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "translation_changed", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isOver",              new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",            new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "PlaneSensor";
		},
		getComponentName: function ()
		{
			return "PointingDeviceSensor";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DDragSensorNode .prototype .initialize .call (this);

			this .modelViewMatrix    = new Matrix4 ();
			this .invModelViewMatrix = new Matrix4 ();
			this .projectionMatrix   = new Matrix4 ();
			this .viewport           = new Vector4 ();

			this .planeSensor = true;
			this .plane       = null;
			this .line        = null;
			this .startOffset = new Vector3 (0, 0, 0);
			this .startPoint  = new Vector3 (0, 0, 0);
		},
		getLineTrackPoint: function (hit, line, trackPoint)
		{
			ViewVolume .projectLine (line, this .modelViewMatrix, this .projectionMatrix, this .viewport, screenLine);
			screenLine .getClosestPointToPoint (new Vector3 (hit .pointer .x, hit .pointer .y, 0), trackPoint1);
			ViewVolume .unProjectRay (trackPoint1 .x, trackPoint1 .y, this .modelViewMatrix, this .projectionMatrix, this .viewport, trackPointLine);

			return line .getClosestPointToLine (trackPointLine, trackPoint);
		},
		set_active__: function (active, hit, modelViewMatrix, projectionMatrix, viewport)
		{
			X3DDragSensorNode .prototype .set_active__ .call (this, active, hit, modelViewMatrix, projectionMatrix, viewport);

			try
			{
				if (this .isActive_ .getValue ())
				{
					this .modelViewMatrix    .assign (modelViewMatrix);
					this .projectionMatrix   .assign (projectionMatrix);
					this .viewport           .assign (viewport);
					this .invModelViewMatrix .assign (modelViewMatrix) .inverse ();

					var
						hitRay   = hit .hitRay .copy () .multLineMatrix (this .invModelViewMatrix),
						hitPoint = this .invModelViewMatrix .multVecMatrix (hit .intersection .point .copy ());

					var axisRotation = this .axisRotation_ .getValue ();

					if (this .minPosition_ .x === this .maxPosition_ .x)
					{
						this .planeSensor = false;

						var direction = axisRotation .multVecRot (new Vector3 (0, Math .abs (this .maxPosition_ .y - this .minPosition_ .y), 0));

						this .line = new Line3 (hitPoint, direction .normalize ());
					}
					else if (this .minPosition_ .y === this .maxPosition_ .y)
					{
						this .planeSensor = false;

						var direction = axisRotation .multVecRot (new Vector3 (Math .abs (this .maxPosition_ .x - this .minPosition_ .x), 0, 0));

						this .line = new Line3 (hitPoint, direction .normalize ());
					}
					else
					{
						this .planeSensor = true;
						this .plane       = new Plane3 (hitPoint, axisRotation .multVecRot (new Vector3 (0, 0, 1)));
					}

					if (this .planeSensor)
					{
						if (this .plane .intersectsLine (hitRay, this .startPoint))
						{
							this .trackStart (this .startPoint);
						}

//						new Plane3 (new Vector3 (0, 0, 0), this .plane .normal) .intersectsLine (hitRay, trackPoint);
					}
					else
					{
						if (this .getLineTrackPoint (hit, this .line, this .startPoint))
						{
							var trackPoint = new Vector3 (0, 0, 0);
	
							try
							{
								this .getLineTrackPoint (hit, new Line3 (this .line .direction, this .line .direction), trackPoint);
							}
							catch (error)
							{
								//console .log (error);
	
								trackPoint = this .startPoint;
							}

							this .trackStart (trackPoint);
						}
					}
				}
				else
				{
					if (this .autoOffset_ .getValue ())
						this .offset_ = this .translation_changed_;
				}
			}
			catch (error)
			{
				console .log (error);
			}
		},
		trackStart: function (trackPoint)
		{
			this .startOffset .assign (this .offset_ .getValue ());

			this .trackPoint_changed_  = trackPoint;
			this .translation_changed_ = this .offset_ .getValue ();
		},
		set_motion__: function (hit)
		{
			try
			{
				if (this .planeSensor)
				{
					var
						hitRay   = hit .hitRay .copy () .multLineMatrix (this .invModelViewMatrix),
						endPoint = new Vector3 (0, 0, 0);

					if (this .plane .intersectsLine (hitRay, endPoint))
					{
						this .track (endPoint, endPoint .copy ());
					}
					else
						throw new Error ("Plane and line are parallel.");
				}
				else
				{
					var
						endPoint   = new Vector3 (0, 0, 0),
						trackPoint = new Vector3 (0, 0, 0);

					if (this .getLineTrackPoint (hit, this .line, endPoint))
					{
						try
						{
							this .getLineTrackPoint (hit, new Line3 (Vector3 .Zero, this .line .direction), trackPoint);
						}
						catch (error)
						{
							trackPoint .assign (endPoint);
						}
					
						this .track (endPoint, trackPoint);
					}
					else
						throw new Error ("Lines are parallel.");
				}
			}
			catch (error)
			{
				//console .log (error);

				this .trackPoint_changed_  .addEvent ();
				this .translation_changed_ .addEvent ();
			}
		},
		track: function (endPoint, trackPoint)
		{
			var
				axisRotation = this .axisRotation_ .getValue (),
				translation  = Rotation4 .inverse (axisRotation) .multVecRot (endPoint .add (this .startOffset) .subtract (this .startPoint));

			// X component

			if (! (this .minPosition_ .x > this .maxPosition_ .x))
				translation .x = Algorithm .clamp (translation .x, this .minPosition_ .x, this .maxPosition_ .x);

			// Y component

			if (! (this .minPosition_ .y > this .maxPosition_ .y))
				translation .y = Algorithm .clamp (translation .y, this .minPosition_ .y, this .maxPosition_ .y);

			axisRotation .multVecRot (translation);

			if (! this .trackPoint_changed_ .getValue () .equals (trackPoint))
				this .trackPoint_changed_ = trackPoint;

			if (! this .translation_changed_ .getValue () .equals (translation))
				this .translation_changed_ = translation;
		},
	});

	return PlaneSensor;
});


