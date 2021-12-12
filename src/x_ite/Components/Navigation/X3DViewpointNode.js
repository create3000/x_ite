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
	"x_ite/Components/Core/X3DBindableNode",
	"x_ite/Components/Time/TimeSensor",
	"x_ite/Components/Interpolation/EaseInEaseOut",
	"x_ite/Components/Interpolation/PositionInterpolator",
	"x_ite/Components/Interpolation/OrientationInterpolator",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DBindableNode,
          TimeSensor,
          EaseInEaseOut,
          PositionInterpolator,
          OrientationInterpolator,
          TraverseType,
          X3DConstants,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	function X3DViewpointNode (executionContext)
	{
		X3DBindableNode .call (this, executionContext);

		this .addType (X3DConstants .X3DViewpointNode);

		this .addChildObjects ("positionOffset",         new Fields .SFVec3f (),
		                       "orientationOffset",      new Fields .SFRotation (),
		                       "scaleOffset",            new Fields .SFVec3f (1, 1, 1),
		                       "scaleOrientationOffset", new Fields .SFRotation (),
		                       "centerOfRotationOffset", new Fields .SFVec3f (),
		                       "fieldOfViewScale",       new Fields .SFFloat (1));

	   this .userPosition         = new Vector3 (0, 1, 0);
	   this .userOrientation      = new Rotation4 (0, 0, 1, 0);
	   this .userCenterOfRotation = new Vector3 (0, 0, 0);
		this .modelMatrix          = new Matrix4 ();
		this .cameraSpaceMatrix    = new Matrix4 (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0,  10, 1);
		this .viewMatrix           = new Matrix4 (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -10, 1);

		var browser = this .getBrowser ();

		this .timeSensor                   = new TimeSensor              (browser .getPrivateScene ());
		this .easeInEaseOut                = new EaseInEaseOut           (browser .getPrivateScene ());
		this .positionInterpolator         = new PositionInterpolator    (browser .getPrivateScene ());
		this .orientationInterpolator      = new OrientationInterpolator (browser .getPrivateScene ());
		this .scaleInterpolator            = new PositionInterpolator    (browser .getPrivateScene ());
		this .scaleOrientationInterpolator = new OrientationInterpolator (browser .getPrivateScene ());
	}

	X3DViewpointNode .prototype = Object .assign (Object .create (X3DBindableNode .prototype),
	{
		constructor: X3DViewpointNode,
		initialize: function ()
		{
			X3DBindableNode .prototype .initialize .call (this);

			this .timeSensor .stopTime_ = 1;
			this .timeSensor .setup ();

			this .easeInEaseOut .key_           = new Fields .MFFloat (0, 1);
			this .easeInEaseOut .easeInEaseOut_ = new Fields .MFVec2f (new Fields .SFVec2f (0, 0), new Fields .SFVec2f (0, 0));
			this .easeInEaseOut .setup ();

			this .positionInterpolator         .key_ = new Fields .MFFloat (0, 1);
			this .orientationInterpolator      .key_ = new Fields .MFFloat (0, 1);
			this .scaleInterpolator            .key_ = new Fields .MFFloat (0, 1);
			this .scaleOrientationInterpolator .key_ = new Fields .MFFloat (0, 1);

			this .positionInterpolator         .setup ();
			this .orientationInterpolator      .setup ();
			this .scaleInterpolator            .setup ();
			this .scaleOrientationInterpolator .setup ();

			this .timeSensor .isActive_         .addFieldInterest (this .transitionActive_);
			this .timeSensor .fraction_changed_ .addFieldInterest (this .easeInEaseOut .set_fraction_);

			this .easeInEaseOut .modifiedFraction_changed_ .addFieldInterest (this .positionInterpolator         .set_fraction_);
			this .easeInEaseOut .modifiedFraction_changed_ .addFieldInterest (this .orientationInterpolator      .set_fraction_);
			this .easeInEaseOut .modifiedFraction_changed_ .addFieldInterest (this .scaleInterpolator            .set_fraction_);
			this .easeInEaseOut .modifiedFraction_changed_ .addFieldInterest (this .scaleOrientationInterpolator .set_fraction_);

			this .positionInterpolator         .value_changed_ .addFieldInterest (this .positionOffset_);
			this .orientationInterpolator      .value_changed_ .addFieldInterest (this .orientationOffset_);
			this .scaleInterpolator            .value_changed_ .addFieldInterest (this .scaleOffset_);
			this .scaleOrientationInterpolator .value_changed_ .addFieldInterest (this .scaleOrientationOffset_);

			this .isBound_ .addInterest ("set_bound__", this);
		},
		getEaseInEaseOut: function ()
		{
			return this .easeInEaseOut;
		},
		setInterpolators: function () { },
		getPosition: function ()
		{
			return this .position_ .getValue ();
		},
		getUserPosition: function ()
		{
			return this .userPosition .assign (this .getPosition ()) .add (this .positionOffset_ .getValue ());
		},
		getOrientation: function ()
		{
			return this .orientation_ .getValue ();
		},
		getUserOrientation: function ()
		{
			return this .userOrientation .assign (this .getOrientation ()) .multRight (this .orientationOffset_ .getValue ());
		},
		getCenterOfRotation: function ()
		{
			return this .centerOfRotation_ .getValue ();
		},
		getUserCenterOfRotation: function ()
		{
			return this .userCenterOfRotation .assign (this .getCenterOfRotation ()) .add (this .centerOfRotationOffset_ .getValue ());
		},
		getProjectionMatrix: function (renderObject)
		{
			var navigationInfo = renderObject .getNavigationInfo ();

			return this .getProjectionMatrixWithLimits (navigationInfo .getNearValue (),
                                                     navigationInfo .getFarValue (this),
                                                     renderObject .getLayer () .getViewport () .getRectangle (renderObject .getBrowser ()));
		},
		getCameraSpaceMatrix: function ()
		{
			return this .cameraSpaceMatrix;
		},
		getViewMatrix: function ()
		{
			return this .viewMatrix;
		},
		getModelMatrix: function ()
		{
			return this .modelMatrix;
		},
		getMaxFarValue: function ()
		{
			return this .getBrowser () .getRenderingProperty ("LogarithmicDepthBuffer") ? 1e10 : 1e5;
		},
		getUpVector: function ()
		{
		   // Local y-axis,
		   // see http://www.web3d.org/documents/specifications/19775-1/V3.3/index.html#NavigationInfo.
		   return Vector3 .yAxis;
		},
		getSpeedFactor: function ()
		{
			return 1;
		},
		setAnimate: function (value)
		{
			// VRML behaviour support.
			this .animate = value;
		},
		getAnimate: function ()
		{
			// VRML behaviour support.
			return this .animate;
		},
		transitionStart: (function ()
		{
			var
				relativePosition         = new Vector3 (0, 0, 0),
				relativeOrientation      = new Rotation4 (0, 0, 1, 0),
				relativeScale            = new Vector3 (0, 0, 0),
				relativeScaleOrientation = new Rotation4 (0, 0, 1, 0);

			return function (layerNode, fromViewpointNode, toViewpointNode)
			{
				try
				{
					this .to = toViewpointNode;

					if (toViewpointNode .jump_ .getValue ())
					{
						if (! toViewpointNode .retainUserOffsets_ .getValue ())
							toViewpointNode .resetUserOffsets ();

						// Copy from toViewpointNode all fields.

						if (this !== toViewpointNode)
						{
							toViewpointNode .getFields () .forEach (function (field)
							{
								this .getFields () .get (field .getName ()) .assign (field);
							}
							.bind (this));
						}

						// Respect NavigationInfo.

						var
							navigationInfoNode = layerNode .getNavigationInfo (),
							transitionType     = navigationInfoNode .getTransitionType (),
							transitionTime     = navigationInfoNode .transitionTime_ .getValue ();

						// VRML behaviour

						if (this .getExecutionContext () .getSpecificationVersion () == "2.0")
						{
							if (this .getAnimate ())
								transitionType = "LINEAR";
							else
								transitionType = "TELEPORT";
						}

						this .setAnimate (false); // VRML

						// End VRML behaviour

						if (transitionTime <= 0)
							transitionType = "TELEPORT";

						switch (transitionType)
						{
							case "TELEPORT":
							{
								navigationInfoNode .transitionComplete_ = true;
								return;
							}
							case "ANIMATE":
							{
								this .easeInEaseOut .easeInEaseOut_ = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));
								break;
							}
							default:
							{
								// LINEAR
								this .easeInEaseOut .easeInEaseOut_ = new Fields .MFVec2f (new Fields .SFVec2f (0, 0), new Fields .SFVec2f (0, 0));
								break;
							}
						}

						this .timeSensor .cycleInterval_ = transitionTime;
						this .timeSensor .stopTime_      = this .getBrowser () .getCurrentTime ();
						this .timeSensor .startTime_     = this .getBrowser () .getCurrentTime ();

						this .timeSensor .isActive_ .addInterest ("set_active__", this, navigationInfoNode);

						toViewpointNode .getRelativeTransformation (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

						this .positionInterpolator         .keyValue_ = new Fields .MFVec3f    (relativePosition,         toViewpointNode .positionOffset_);
						this .orientationInterpolator      .keyValue_ = new Fields .MFRotation (relativeOrientation,      toViewpointNode .orientationOffset_);
						this .scaleInterpolator            .keyValue_ = new Fields .MFVec3f    (relativeScale,            toViewpointNode .scaleOffset_);
						this .scaleOrientationInterpolator .keyValue_ = new Fields .MFRotation (relativeScaleOrientation, toViewpointNode .scaleOrientationOffset_);

						this .positionOffset_         = relativePosition;
						this .orientationOffset_      = relativeOrientation;
						this .scaleOffset_            = relativeScale;
						this .scaleOrientationOffset_ = relativeScaleOrientation;

						this .setInterpolators (fromViewpointNode, toViewpointNode);

						this .transitionActive_ = true;
					}
					else
					{
						toViewpointNode .getRelativeTransformation (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

						toViewpointNode .positionOffset_         = relativePosition;
						toViewpointNode .orientationOffset_      = relativeOrientation;
						toViewpointNode .scaleOffset_            = relativeScale;
						toViewpointNode .scaleOrientationOffset_ = relativeScaleOrientation;

						toViewpointNode .setInterpolators (fromViewpointNode, toViewpointNode);
					}
				}
				catch (error)
				{
					console .log (error);
				}
			};
		})(),
		transitionStop: function ()
		{
			this .timeSensor .stopTime_ = this .getBrowser () .getCurrentTime ();
			this .timeSensor .isActive_ .removeInterest ("set_active__", this);
		},
		resetUserOffsets: function ()
		{
			this .positionOffset_         = Vector3   .Zero;
			this .orientationOffset_      = Rotation4 .Identity;
			this .scaleOffset_            = Vector3   .One;
			this .scaleOrientationOffset_ = Rotation4 .Identity;
			this .centerOfRotationOffset_ = Vector3   .Zero;
			this .fieldOfViewScale_       = 1;
		},
		getRelativeTransformation: function (fromViewpointNode, relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation)
		// throw
		{
			var differenceMatrix = this .modelMatrix .copy () .multRight (fromViewpointNode .getViewMatrix ()) .inverse ();

			differenceMatrix .get (relativePosition, relativeOrientation, relativeScale, relativeScaleOrientation);

			relativePosition .subtract (this .getPosition ());
			relativeOrientation .assign (this .getOrientation () .copy () .inverse () .multRight (relativeOrientation));
		},
		lookAtPoint: function (layerNode, point, factor, straighten)
		{
			try
			{
				this .getCameraSpaceMatrix () .multVecMatrix (point);

				Matrix4 .inverse (this .getModelMatrix ()) .multVecMatrix (point);

				var minDistance = layerNode .getNavigationInfo () .getNearValue () * 2;

				this .lookAt (layerNode, point, minDistance, factor, straighten);
			}
			catch (error)
			{
				console .error (error);
			}
		},
		lookAtBBox: function (layerNode, bbox, factor, straighten)
		{
			try
			{
				bbox = bbox .copy () .multRight (Matrix4 .inverse (this .getModelMatrix ()));

				var minDistance = layerNode .getNavigationInfo () .getNearValue () * 2;

				this .lookAt (layerNode, bbox .center, minDistance, factor, straighten);
			}
			catch (error)
			{
				console .log (error);
			}
		},
		lookAt: function (layerNode, point, distance, factor, straighten)
		{
			var
				offset = point .copy () .add (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, distance))) .subtract (this .getPosition ());

			layerNode .getNavigationInfo () .transitionStart_ = true;

			this .timeSensor .cycleInterval_ = 0.2;
			this .timeSensor .stopTime_      = this .getBrowser () .getCurrentTime ();
			this .timeSensor .startTime_     = this .getBrowser () .getCurrentTime ();

			this .timeSensor .isActive_ .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

			this .easeInEaseOut .easeInEaseOut_ = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

			var
				translation = Vector3 .lerp (this .positionOffset_ .getValue (), offset, factor),
				direction   = Vector3 .add (this .getPosition (), translation) .subtract (point),
				rotation    = Rotation4 .multRight (this .orientationOffset_ .getValue (), new Rotation4 (this .getUserOrientation () .multVecRot (new Vector3 (0, 0, 1)), direction));

			if (straighten)
				rotation = Rotation4 .inverse (this .getOrientation ()) .multRight (this .straightenHorizon (Rotation4 .multRight (this .getOrientation (), rotation)));

			this .positionInterpolator         .keyValue_ = new Fields .MFVec3f (this .positionOffset_, translation);
			this .orientationInterpolator      .keyValue_ = new Fields .MFRotation (this .orientationOffset_, rotation);
			this .scaleInterpolator            .keyValue_ = new Fields .MFVec3f (this .scaleOffset_, this .scaleOffset_);
			this .scaleOrientationInterpolator .keyValue_ = new Fields .MFRotation (this .scaleOrientationOffset_, this .scaleOrientationOffset_);

			this .setInterpolators (this, this);

			this .centerOfRotationOffset_ = Vector3 .subtract (point, this .getCenterOfRotation ());
			this .set_bind_               = true;
		},
		straighten: function (layerNode, horizon)
		{
			layerNode .getNavigationInfo () .transitionStart_ = true;

			this .timeSensor .cycleInterval_ = 0.4;
			this .timeSensor .stopTime_      = this .getBrowser () .getCurrentTime ();
			this .timeSensor .startTime_     = this .getBrowser () .getCurrentTime ();

			this .timeSensor .isActive_ .addInterest ("set_active__", this, layerNode .getNavigationInfo ());

			this .easeInEaseOut .easeInEaseOut_ = new Fields .MFVec2f (new Fields .SFVec2f (0, 1), new Fields .SFVec2f (1, 0));

			var rotation = Rotation4 .multRight (Rotation4 .inverse (this .getOrientation ()), this .straightenHorizon (this .getUserOrientation ()));

			this .positionInterpolator         .keyValue_ = new Fields .MFVec3f (this .positionOffset_, this .positionOffset_);
			this .orientationInterpolator      .keyValue_ = new Fields .MFRotation (this .orientationOffset_, rotation);
			this .scaleInterpolator            .keyValue_ = new Fields .MFVec3f (this .scaleOffset_, this .scaleOffset_);
			this .scaleOrientationInterpolator .keyValue_ = new Fields .MFRotation (this .scaleOrientationOffset_, this .scaleOrientationOffset_);

			this .setInterpolators (this, this);

			this .set_bind_ = true;
		},
		straightenHorizon: (function ()
		{
			var
				localXAxis  = new Vector3 (0, 0, 0),
				localZAxis  = new Vector3 (0, 0, 0),
				rotation    = new Rotation4 (0, 0, 1, 0);

			return function (orientation)
			{
				orientation .multVecRot (localXAxis .assign (Vector3 .xAxis) .negate ());
				orientation .multVecRot (localZAxis .assign (Vector3 .zAxis));

				var upVector = this .getUpVector ();
				var vector   = localZAxis .cross (upVector);

				// If viewer looks along the up vector.
				if (Math .abs (localZAxis .dot (upVector)) >= 1)
					return orientation;

				if (Math .abs (vector .dot (localXAxis)) >= 1)
					return orientation;

				rotation .setFromToVec (localXAxis, vector);

				return orientation .multRight (rotation);
			};
		})(),
		set_active__: function (active, navigationInfoNode)
		{
			if (this .isBound_ .getValue () && ! active .getValue () && this .timeSensor .fraction_changed_ .getValue () === 1)
			{
				navigationInfoNode .transitionComplete_ = true;
			}
		},
		set_bound__: function ()
		{
			if (this .isBound_ .getValue ())
				this .getBrowser () .getNotification () .string_ = this .description_;
			else
				this .timeSensor .stopTime_ = this .getBrowser () .getCurrentTime ();
		},
		traverse: function (type, renderObject)
		{
			if (type !== TraverseType .CAMERA)
				return;

			renderObject .getLayer () .getViewpoints () .push (this);

			this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());
		},
		update: function ()
		{
			try
			{
				this .cameraSpaceMatrix .set (this .getUserPosition (),
														this .getUserOrientation (),
														this .scaleOffset_ .getValue (),
														this .scaleOrientationOffset_ .getValue ());

				this .cameraSpaceMatrix .multRight ((this .to || this) .modelMatrix);

				this .viewMatrix .assign (this .cameraSpaceMatrix) .inverse ();
			}
			catch (error)
			{
				console .log (error);
			}
		}
	});

	return X3DViewpointNode;
});
