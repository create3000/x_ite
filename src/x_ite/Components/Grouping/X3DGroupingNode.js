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
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (X3DChildNode,
          X3DBoundedObject,
          TraverseType,
          X3DConstants,
          X3DCast)
{
"use strict";

	function getId (value) { return value ? value .getValue () .getId () : -1; }

	function remove (array, first, last, range, rfirst, rlast)
	{
		const set = { };

		for (var i = rfirst; i < rlast; ++ i)
			set [getId (range [i])] = true;

		function compare (value) { return set [getId (value)]; }

		return array .remove (first, last, compare);
	}

	function X3DGroupingNode (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .X3DGroupingNode);

		this .hidden                    = false;
		this .allowedTypes              = new Set ();
		this .clipPlaneNodes            = [ ];
		this .localFogNodes             = [ ];
		this .lightNodes                = [ ];
		this .textureProjectorNodes     = [ ];
		this .pointingDeviceSensorNodes = [ ];
		this .maybeCameraObjects        = [ ];
		this .cameraObjects             = [ ];
		this .maybePickableSensorNodes  = [ ];
		this .pickableSensorNodes       = [ ];
		this .pickableObjects           = [ ];
		this .childNodes                = [ ];
		this .displayNodes              = [ ];
		this .visibleNodes              = [ ];
		this .boundedObjects            = [ ];
	}

	X3DGroupingNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DGroupingNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .transformSensors_changed_ .addInterest ("set_transformSensors__", this);

			this .addChildren_    .addInterest ("set_addChildren__",    this);
			this .removeChildren_ .addInterest ("set_removeChildren__", this);
			this .children_       .addInterest ("set_children__",       this);

			this .set_children__ ();
		},
		getBBox: function (bbox, shadow)
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
				return X3DBoundedObject .prototype .getBBox .call (this, this .visibleNodes, bbox, shadow);

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		setHidden: function (value)
		{
			if (value !== this .hidden)
			{
				this .hidden = value;

				this .set_children__ ();
			}
		},
		setAllowedTypes: function (type)
		{
			const allowedTypes = this .allowedTypes;

			allowedTypes .clear ();

			for (var i = 0, length = arguments .length; i < length; ++ i)
				allowedTypes .add (arguments [i]);
		},
		set_addChildren__: function ()
		{
			if (this .addChildren_ .length === 0)
				return;

			this .addChildren_ .setTainted (true);
			this .addChildren_ .erase (remove (this .addChildren_, 0, this .addChildren_ .length,
			                                   this .children_,    0, this .children_    .length),
			                           this .addChildren_ .length);

			if (! this .children_ .getTainted ())
			{
				this .children_ .removeInterest ("set_children__", this);
				this .children_ .addInterest ("connectChildren", this);
			}

			const first = this .children_ .length;

			this .children_ .insert (this .children_ .length, this .addChildren_, 0, this .addChildren_ .length);
			this .add (first, this .addChildren_);

			this .addChildren_ .set ([ ]);
			this .addChildren_ .setTainted (false);
		},
		set_removeChildren__: function ()
		{
			if (this .removeChildren_ .length === 0)
				return;

			if (this .children_ .length > 0)
			{
				if (! this .children_ .getTainted ())
				{
					this .children_ .removeInterest ("set_children__", this);
					this .children_ .addInterest ("connectChildren", this);
				}

				this .children_ .erase (remove (this .children_,       0, this .children_ .length,
														  this .removeChildren_, 0, this .removeChildren_ .length),
												this .children_ .length);

				this .remove (this .removeChildren_);
			}

			this .removeChildren_ .set ([ ]);
		},
		set_children__: function ()
		{
			this .clear ();
			this .add (0, this .children_);
		},
		connectChildren: function ()
		{
			this .children_ .removeInterest ("connectChildren", this);
			this .children_ .addInterest ("set_children__", this);
		},
		clear: function ()
		{
			const
				maybePickableSensorNodes = this .maybePickableSensorNodes,
				childNodes               = this .childNodes;

			for (var i = 0, length = maybePickableSensorNodes .length; i < length; ++ i)
				maybePickableSensorNodes [i] .isPickableObject_ .removeInterest ("set_pickableObjects__", this);

			for (var i = 0, length = childNodes .length; i < length; ++ i)
			{
				const childNode = childNodes [i];

				childNode .isCameraObject_   .removeInterest ("set_cameraObjects__",   this);
				childNode .isPickableObject_ .removeInterest ("set_pickableObjects__", this);

				if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
				{
					childNode .visible_     .removeInterest ("set_visibles__",      this);
					childNode .bboxDisplay_ .removeInterest ("set_bboxDisplays__",  this);
				}
			}

			this .clipPlaneNodes            .length = 0;
			this .localFogNodes             .length = 0;
			this .lightNodes                .length = 0;
			this .textureProjectorNodes     .length = 0;
			this .pointingDeviceSensorNodes .length = 0;
			this .maybeCameraObjects        .length = 0;
			this .maybePickableSensorNodes  .length = 0;
			this .childNodes                .length = 0;
		},
		add: function (first, children)
		{
			if (this .hidden)
				return;

			for (var i = 0, v = first, length = children .length; i < length; ++ i, ++ v)
			{
				const child = children [i];

				if (child)
				{
					try
					{
						const
							innerNode = child .getValue () .getInnerNode (),
							type      = innerNode .getType ();

						for (var t = type .length - 1; t >= 0; -- t)
						{
//							if (this .allowedTypes .size)
//							{
//								if (! innerNode .isType (this .allowedTypes))
//									continue;
//							}

							switch (type [t])
							{
								case X3DConstants .X3DPointingDeviceSensorNode:
								{
									this .pointingDeviceSensorNodes .push (innerNode);
									break;
								}
								case X3DConstants .ClipPlane:
								{
									this .clipPlaneNodes .push (innerNode);
									break;
								}
								case X3DConstants .LocalFog:
								{
									this .localFogNodes .push (innerNode);
									break;
								}
								case X3DConstants .X3DTextureProjectorNode:
								{
									this .textureProjectorNodes .push (innerNode);
									break;
								}
								case X3DConstants .X3DLightNode:
								{
									this .lightNodes .push (innerNode);
									break;
								}
								case X3DConstants .X3DBindableNode:
								{
									this .maybeCameraObjects .push (innerNode);
									break;
								}
								case X3DConstants .TransformSensor:
								case X3DConstants .X3DPickSensorNode:
								{
									innerNode .isPickableObject_ .addInterest ("set_pickableObjects__", this);

									this .maybePickableSensorNodes .push (innerNode);
									break;
								}
								case X3DConstants .X3DBackgroundNode:
								case X3DConstants .X3DChildNode:
								{
									innerNode .isCameraObject_   .addInterest ("set_cameraObjects__",   this);
									innerNode .isPickableObject_ .addInterest ("set_pickableObjects__", this);

									if (X3DCast (X3DConstants .X3DBoundedObject, innerNode))
									{
										innerNode .visible_     .addInterest ("set_visibles__",     this);
										innerNode .bboxDisplay_ .addInterest ("set_bboxDisplays__", this);
									}

									this .maybeCameraObjects .push (innerNode);
									this .childNodes .push (innerNode);
									break;
								}
								case X3DConstants .BooleanFilter:
								case X3DConstants .BooleanToggle:
								case X3DConstants .NurbsOrientationInterpolator:
								case X3DConstants .NurbsPositionInterpolator:
								case X3DConstants .NurbsSurfaceInterpolator:
								case X3DConstants .TimeSensor:
								case X3DConstants .X3DFollowerNode:
								case X3DConstants .X3DInfoNode:
								case X3DConstants .X3DInterpolatorNode:
								case X3DConstants .X3DKeyDeviceSensorNode:
								case X3DConstants .X3DLayoutNode:
								case X3DConstants .X3DScriptNode:
								case X3DConstants .X3DSequencerNode:
								case X3DConstants .X3DTriggerNode:
									break;
								default:
									continue;
							}

							break;
						}
					}
					catch (error)
					{ }
				}
			}

			this .set_pickableObjects__ ()
			this .set_displayNodes__ ()
			this .set_visibles__ ()
			this .set_bboxDisplays__ ();
		},
		remove: function (children)
		{
			for (var i = 0, length = children .length; i < length; ++ i)
			{
				const child = children [i];

				if (child)
				{
					try
					{
						const
							innerNode = child .getValue () .getInnerNode (),
							type      = innerNode .getType ();

						for (var t = type .length - 1; t >= 0; -- t)
						{
							switch (type [t])
							{
								case X3DConstants .X3DPointingDeviceSensorNode:
								{
									const index = this .pointingDeviceSensorNodes .indexOf (innerNode);

									if (index >= 0)
										this .pointingDeviceSensorNodes .splice (index, 1);

									break;
								}
								case X3DConstants .ClipPlane:
								{
									const index = this .clipPlaneNodes .indexOf (innerNode);

									if (index >= 0)
										this .clipPlaneNodes .splice (index, 1);

									break;
								}
								case X3DConstants .LocalFog:
								{
									const index = this .localFogNodes .indexOf (innerNode);

									if (index >= 0)
										this .localFogNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DTextureProjectorNode:
								{
									const index = this .textureProjectorNodes .indexOf (innerNode);

									if (index >= 0)
										this .textureProjectorNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DLightNode:
								{
									const index = this .lightNodes .indexOf (innerNode);

									if (index >= 0)
										this .lightNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DBindableNode:
								{
									const index = this .maybeCameraObjects .indexOf (innerNode);

									if (index >= 0)
										this .maybeCameraObjects .splice (index, 1);

									break;
								}
								case X3DConstants .TransformSensor:
								case X3DConstants .X3DPickSensorNode:
								{
									innerNode .isPickableObject_ .removeInterest ("set_pickableObjects__", this);

									const index = this .maybePickableSensorNodes .indexOf (innerNode);

									if (index >= 0)
										this .maybePickableSensorNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DBackgroundNode:
								case X3DConstants .X3DChildNode:
								{
									innerNode .isCameraObject_   .removeInterest ("set_cameraObjects__",   this);
									innerNode .isPickableObject_ .removeInterest ("set_pickableObjects__", this);

									if (X3DCast (X3DConstants .X3DBoundedObject, innerNode))
									{
										innerNode .visible_     .removeInterest ("set_visibles__",     this);
										innerNode .bboxDisplay_ .removeInterest ("set_bboxDisplays__", this);
									}

									var index = this .maybeCameraObjects .indexOf (innerNode);

									if (index >= 0)
										this .maybeCameraObjects .splice (index, 1);

									var index = this .childNodes .indexOf (innerNode);

									if (index >= 0)
										this .childNodes .splice (index, 1);

									break;
								}
								case X3DConstants .BooleanFilter:
								case X3DConstants .BooleanToggle:
								case X3DConstants .NurbsOrientationInterpolator:
								case X3DConstants .NurbsPositionInterpolator:
								case X3DConstants .NurbsSurfaceInterpolator:
								case X3DConstants .TimeSensor:
								case X3DConstants .X3DFollowerNode:
								case X3DConstants .X3DInfoNode:
								case X3DConstants .X3DInterpolatorNode:
								case X3DConstants .X3DKeyDeviceSensorNode:
								case X3DConstants .X3DLayoutNode:
								case X3DConstants .X3DScriptNode:
								case X3DConstants .X3DSequencerNode:
								case X3DConstants .X3DTriggerNode:
									break;
								default:
									continue;
							}

							break;
						}
					}
					catch (error)
					{ }
				}
			}

			this .set_pickableObjects__ ();
			this .set_displayNodes__ ();
			this .set_visibles__ ();
			this .set_bboxDisplays__ ();
		},
		set_cameraObjects__: function ()
		{
			const
				maybeCameraObjects = this .maybeCameraObjects,
				cameraObjects      = this .cameraObjects;

			cameraObjects .length = 0;

			for (var i = 0, length = maybeCameraObjects .length; i < length; ++ i)
			{
				const childNode = maybeCameraObjects [i];

				if (childNode .getCameraObject ())
				{
					if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
					{
						if (childNode .visible_ .getValue ())
						{
							cameraObjects .push (childNode);
						}
					}
					else
					{
						cameraObjects .push (childNode);
					}
				}
			}

			this .setCameraObject (Boolean (cameraObjects .length));
		},
		set_pickableObjects__: function ()
		{
			const
				maybePickableSensorNodes = this .maybePickableSensorNodes,
				pickableSensorNodes      = this .pickableSensorNodes,
				pickableObjects          = this .pickableObjects,
				childNodes               = this .childNodes;

			pickableSensorNodes .length = 0;
			pickableObjects     .length = 0;

			for (var i = 0, length = maybePickableSensorNodes .length; i < length; ++ i)
			{
				const sensorNode = maybePickableSensorNodes [i];

				if (sensorNode .getPickableObject ())
					pickableSensorNodes .push (sensorNode);
			}

			for (var i = 0, length = childNodes .length; i < length; ++ i)
			{
				const childNode = childNodes [i];

				if (childNode .getPickableObject ())
					pickableObjects .push (childNode);
			}

			this .set_transformSensors__ ()
		},
		set_transformSensors__: function ()
		{
			this .setPickableObject (Boolean (this .getTransformSensors () .size || this .pickableSensorNodes .length || this .pickableObjects .length));
		},
		set_displayNodes__: function ()
		{
			const
				clipPlaneNodes        = this .clipPlaneNodes,
				localFogNodes         = this .localFogNodes,
				lightNodes            = this .lightNodes,
				textureProjectorNodes = this .textureProjectorNodes,
				displayNodes          = this .displayNodes;

			displayNodes .length = 0;

			for (var i = 0, length = clipPlaneNodes .length; i < length; ++ i)
				displayNodes .push (clipPlaneNodes [i]);

			for (var i = 0, length = localFogNodes .length; i < length; ++ i)
				displayNodes .push (localFogNodes [i]);

			for (var i = 0, length = lightNodes .length; i < length; ++ i)
				displayNodes .push (lightNodes [i]);

			for (var i = 0, length = textureProjectorNodes .length; i < length; ++ i)
				displayNodes .push (textureProjectorNodes [i]);
		},
		set_visibles__: function ()
		{
			const
				childNodes   = this .childNodes,
				visibleNodes = this .visibleNodes;

			visibleNodes .length = 0;

			for (var i = 0, length = childNodes .length; i < length; ++ i)
			{
				const childNode = childNodes [i];

				if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
				{
					if (childNode .visible_ .getValue ())
					{
						visibleNodes .push (childNode);
					}
				}
				else
				{
					visibleNodes .push (childNode);
				}
			}

			this .set_cameraObjects__ ();
		},
		set_bboxDisplays__: function ()
		{
			const
				childNodes     = this .childNodes,
				boundedObjects = this .boundedObjects;

			boundedObjects .length = 0;

			for (var i = 0, length = childNodes .length; i < length; ++ i)
			{
				var childNode = childNodes [i];

				if (X3DCast (X3DConstants .X3DBoundedObject, childNode))
				{
					if (childNode .bboxDisplay_ .getValue ())
					{
						boundedObjects .push (childNode);
					}
				}
			}
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .POINTER:
				{
					const
						pointingDeviceSensorNodes = this .pointingDeviceSensorNodes,
						clipPlaneNodes            = this .clipPlaneNodes,
						childNodes                = this .childNodes;

					if (pointingDeviceSensorNodes .length)
					{
						const sensors = { };

						renderObject .getBrowser () .getSensors () .push (sensors);

						for (var i = 0, length = pointingDeviceSensorNodes .length; i < length; ++ i)
							pointingDeviceSensorNodes [i] .push (renderObject, sensors);
					}

					for (var i = 0, length = clipPlaneNodes .length; i < length; ++ i)
						clipPlaneNodes [i] .push (renderObject);

					for (var i = 0, length = childNodes .length; i < length; ++ i)
						childNodes [i] .traverse (type, renderObject);

					for (var i = clipPlaneNodes .length - 1; i >= 0; -- i)
						clipPlaneNodes [i] .pop (renderObject);

					if (pointingDeviceSensorNodes .length)
						renderObject .getBrowser () .getSensors () .pop ();

					return;
				}
				case TraverseType .CAMERA:
				{
					const cameraObjects = this .cameraObjects;

					for (var i = 0, length = cameraObjects .length; i < length; ++ i)
						cameraObjects [i] .traverse (type, renderObject);

					return;
				}
				case TraverseType .PICKING:
				{
					if (this .getTransformSensors () .size)
					{
						const modelMatrix = renderObject .getModelViewMatrix () .get ();

						this .getTransformSensors () .forEach (function (transformSensorNode)
						{
							transformSensorNode .collect (modelMatrix);
						});
					}

					const pickableSensorNodes = this .pickableSensorNodes;

					for (var i = 0, length = pickableSensorNodes .length; i < length; ++ i)
						pickableSensorNodes [i] .traverse (type, renderObject);

					const
						browser          = renderObject .getBrowser (),
						pickingHierarchy = browser .getPickingHierarchy (),
						pickableStack    = browser .getPickable ();

					pickingHierarchy .push (this);

					if (pickableStack [pickableStack .length - 1])
					{
						const childNodes = this .childNodes;

						for (var i = 0, length = childNodes .length; i < length; ++ i)
							childNodes [i] .traverse (type, renderObject);
					}
					else
					{
						const pickableObjects = this .pickableObjects;

						for (var i = 0, length = pickableObjects .length; i < length; ++ i)
							pickableObjects [i] .traverse (type, renderObject);
					}

					pickingHierarchy .pop ();
					return;
				}
				case TraverseType .COLLISION:
				{
					const
						clipPlaneNodes = this .clipPlaneNodes,
						childNodes     = this .childNodes;

					for (var i = 0, length = clipPlaneNodes .length; i < length; ++ i)
						clipPlaneNodes [i] .push (renderObject);

					for (var i = 0, length = childNodes .length; i < length; ++ i)
						childNodes [i] .traverse (type, renderObject);

					for (var i = clipPlaneNodes .length - 1; i >= 0; -- i)
						clipPlaneNodes [i] .pop (renderObject);

					return;
				}
				case TraverseType .SHADOW:
				{
					// Nodes that are not visible do not cast shadows.

					const
						clipPlaneNodes = this .clipPlaneNodes,
						visibleNodes   = this .visibleNodes;

					for (var i = 0, length = clipPlaneNodes .length; i < length; ++ i)
						clipPlaneNodes [i] .push (renderObject);

					for (var i = 0, length = visibleNodes .length; i < length; ++ i)
						visibleNodes [i] .traverse (type, renderObject);

					for (var i = clipPlaneNodes .length - 1; i >= 0; -- i)
						clipPlaneNodes [i] .pop (renderObject);

					return;
				}
				case TraverseType .DISPLAY:
				{
					const
						displayNodes   = this .displayNodes,
						visibleNodes   = this .visibleNodes,
						boundedObjects = this .boundedObjects;

					for (var i = 0, length = displayNodes .length; i < length; ++ i)
						displayNodes [i] .push (renderObject, this);

					for (var i = 0, length = visibleNodes .length; i < length; ++ i)
						visibleNodes [i] .traverse (type, renderObject);

					for (var i = 0, length = boundedObjects .length; i < length; ++ i)
						boundedObjects [i] .displayBBox (type, renderObject);

					for (var i = displayNodes .length - 1; i >= 0; -- i)
						displayNodes [i] .pop (renderObject);

					return;
				}
			}
		},
	});

	X3DGroupingNode .prototype .getSubBBox = X3DGroupingNode .prototype .getBBox;

	return X3DGroupingNode;
});
