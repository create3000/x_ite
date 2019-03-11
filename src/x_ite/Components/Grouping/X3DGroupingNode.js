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
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Box3",
],
function (Fields,
          X3DChildNode, 
          X3DBoundedObject, 
          TraverseType,
          X3DConstants,
          Box3)
{
"use strict";

	function getId (value) { return value ? value .getValue () .getId () : -1; }

	function remove (array, first, last, range, rfirst, rlast)
	{
		var set = { };

		for (var i = rfirst; i < rlast; ++ i)
			set [getId (range [i])] = true;

		function compare (value) { return set [getId (value)]; }

		return array .remove (first, last, compare);
	}

	var visible = new Fields .MFBool ();

	function X3DGroupingNode (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .X3DGroupingNode);
	               
		this .hidden                    = false;
		this .allowedTypes              = new Set ();
		this .pointingDeviceSensorNodes = [ ];
		this .maybeCameraObjects        = [ ];
		this .cameraObjects             = [ ];
		this .pickableObjects           = [ ];
		this .clipPlaneNodes            = [ ];
		this .localFogNodes             = [ ];
		this .lightNodes                = [ ];
		this .displayNodes              = [ ];
		this .childNodes                = [ ];
	}

	X3DGroupingNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DGroupingNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .transformSensors_changed_ .addInterest ("set_pickableObjects__", this);

			this .addChildren_    .addInterest ("set_addChildren__",    this);
			this .removeChildren_ .addInterest ("set_removeChildren__", this);
			this .children_       .addInterest ("set_children__",       this);

			this .set_children__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
				return X3DBoundedObject .prototype .getBBox .call (this, this .childNodes, bbox);

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		getSubBBox: function (bbox)
		{
			return X3DGroupingNode .prototype .getBBox .call (this, bbox);
		},
		setHidden: function (value)
		{
			if (value !== this .hidden)
			{
				this .hidden = value;

				this .set_children__ ();
			}
		},
		getVisible: function ()
		{
			return visible;
		},
		setAllowedTypes: function (type)
		{
			var allowedTypes = this .allowedTypes;

			allowedTypes .clear ();

			for (var i = 0, length = arguments .length; i < length; ++ i)
				allowedTypes .add (arguments [i]);
		},
		getChild: function (index)
		{
			// Used in LOD and Switch.
			
			try
			{
				if (index >= 0 && index < this .children_ .length)
				{
					var child = this .children_ [index];

					if (child)
						return child .getValue () .getInnerNode ();
				}
			}
			catch (error)
			{ }

			return null;
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

			var first = this .children_ .length;

			this .children_ .insert (this .children_ .length, this .addChildren_, 0, this .addChildren_ .length);
			this .add (first, this .addChildren_);

			this .addChildren_ .set ([ ]);
			this .addChildren_ .setTainted (false);
		},
		set_removeChildren__: function ()
		{
			if (this .removeChildren_ .length === 0)
				return;

			if (this .children_ .length === 0)
				return;

			if (! this .children_ .getTainted ())
			{
				this .children_ .removeInterest ("set_children__", this);
				this .children_ .addInterest ("connectChildren", this);
			}

			this .children_ .erase (remove (this .children_,       0, this .children_ .length,
			                                this .removeChildren_, 0, this .removeChildren_ .length),
			                        this .children_ .length);

			this .remove (this .removeChildren_);

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
		add: function (first, children)
		{
			if (this .hidden)
				return;

			var
				visible    = this .getVisible (),
				numVisible = visible .length;

			for (var i = 0, v = first, length = children .length; i < length; ++ i, ++ v)
			{
				var child = children [i];

				if (child && (v >= numVisible || visible [v]))
				{
					try
					{
						var
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
								case X3DConstants .X3DBackgroundNode:
								case X3DConstants .X3DChildNode:
								{
									innerNode .isCameraObject_   .addInterest ("set_cameraObjects__",   this);
									innerNode .isPickableObject_ .addInterest ("set_pickableObjects__", this);

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

			this .set_cameraObjects__ ();
			this .set_pickableObjects__ ();
			this .set_display_nodes ();
		},
		remove: function (children)
		{
			for (var i = 0, length = children .length; i < length; ++ i)
			{
				var child = children [i];

				if (child)
				{
					try
					{
						var
							innerNode = child .getValue () .getInnerNode (),
							type      = innerNode .getType ();

						for (var t = type .length - 1; t >= 0; -- t)
						{
							switch (type [t])
							{
								case X3DConstants .X3DPointingDeviceSensorNode:
								{
									var index = this .pointingDeviceSensorNodes .indexOf (innerNode);

									if (index >= 0)
										this .pointingDeviceSensorNodes .splice (index, 1);

									break;
								}
								case X3DConstants .ClipPlane:
								{
									var index = this .clipPlaneNodes .indexOf (innerNode);

									if (index >= 0)
										this .clipPlaneNodes .splice (index, 1);

									break;
								}
								case X3DConstants .LocalFog:
								{
									var index = this .localFogNodes .indexOf (innerNode);

									if (index >= 0)
										this .localFogNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DLightNode:
								{
									var index = this .lightNodes .indexOf (innerNode);

									if (index >= 0)
										this .lightNodes .splice (index, 1);

									break;
								}
								case X3DConstants .X3DBindableNode:
								{
									var index = this .maybeCameraObjects .indexOf (innerNode);

									if (index >= 0)
										this .maybeCameraObjects .splice (index, 1);

									break;				
								}
								case X3DConstants .X3DBackgroundNode:
								case X3DConstants .X3DChildNode:
								{
									innerNode .isCameraObject_   .removeInterest ("set_cameraObjects__",   this);
									innerNode .isPickableObject_ .removeInterest ("set_pickableObjects__", this);

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

			this .set_cameraObjects__ ();
			this .set_pickableObjects__ ();
			this .set_display_nodes ();
		},
		clear: function ()
		{
			for (var i = 0, length = this .childNodes .length; i < length; ++ i)
			{
				this .childNodes [i] .isCameraObject_   .removeInterest ("set_cameraObjects__",   this);
				this .childNodes [i] .isPickableObject_ .removeInterest ("set_pickableObjects__", this);
			}

			this .pointingDeviceSensorNodes .length = 0;
			this .maybeCameraObjects        .length = 0;
			this .clipPlaneNodes            .length = 0;
			this .localFogNodes             .length = 0;
			this .lightNodes                .length = 0;
			this .childNodes                .length = 0;
		},
		set_cameraObjects__: function ()
		{
			this .cameraObjects .length = 0;

			for (var i = 0, length = this .maybeCameraObjects .length; i < length; ++ i)
			{
				var childNode = this .maybeCameraObjects [i];

				if (childNode .getCameraObject ())
					this .cameraObjects .push (childNode);
			}

			this .setCameraObject (this .cameraObjects .length);
		},
		set_pickableObjects__: function ()
		{
			this .pickableObjects .length = 0;

			for (var i = 0, length = this .childNodes .length; i < length; ++ i)
			{
				var childNode = this .childNodes [i];

				if (childNode .getPickableObject ())
					this .pickableObjects .push (childNode);
			}

			this .setPickableObject (this .pickableObjects .length || this .getTransformSensors () .size);
		},
		set_display_nodes: function ()
		{
			var
				clipPlaneNodes = this .clipPlaneNodes,
				localFogNodes  = this .localFogNodes,
				lightNodes     = this .lightNodes,
				displayNodes   = this .displayNodes;

			displayNodes .length = 0;

			for (var i = 0, length = clipPlaneNodes .length; i < length; ++ i)
				displayNodes .push (clipPlaneNodes [i]);

			for (var i = 0, length = localFogNodes .length; i < length; ++ i)
				displayNodes .push (localFogNodes [i]);

			for (var i = 0, length = lightNodes .length; i < length; ++ i)
				displayNodes .push (lightNodes [i]);
		},
		traverse: (function ()
		{
			var bbox = new Box3 ();

			return function (type, renderObject)
			{
				switch (type)
				{
					case TraverseType .POINTER:
					{
						var
							pointingDeviceSensorNodes = this .pointingDeviceSensorNodes,
							clipPlaneNodes            = this .clipPlaneNodes,
							childNodes                = this .childNodes;
	
						if (pointingDeviceSensorNodes .length)
						{
							var sensors = { };
							
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
						var cameraObjects = this .cameraObjects;
	
						for (var i = 0, length = cameraObjects .length; i < length; ++ i)
							cameraObjects [i] .traverse (type, renderObject);
	
						return;
					}
					case TraverseType .PICKING:
					{
						if (this .getTransformSensors () .size)
						{
							this .getSubBBox (bbox) .multRight (renderObject .getModelViewMatrix () .get ());
	
							this .getTransformSensors () .forEach (function (transformSensorNode)
							{
								transformSensorNode .collect (bbox);
							});
						}

						if (false)
						{
							var childNodes = this .childNodes;
	
							for (var i = 0, length = childNodes .length; i < length; ++ i)
								childNodes [i] .traverse (type, renderObject);
						}
						else
						{
							var pickableObjects = this .pickableObjects;
		
							for (var i = 0, length = pickableObjects .length; i < length; ++ i)
								pickableObjects [i] .traverse (type, renderObject);
						}
	
						return;
					}
					case TraverseType .COLLISION:
					case TraverseType .DEPTH:
					{					
						var
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
					case TraverseType .DISPLAY:
					{
						var
							displayNodes = this .displayNodes,
							childNodes   = this .childNodes;
	
						for (var i = 0, length = displayNodes .length; i < length; ++ i)
							displayNodes [i] .push (renderObject, this);
	
						for (var i = 0, length = childNodes .length; i < length; ++ i)
							childNodes [i] .traverse (type, renderObject);
	
						for (var i = displayNodes .length - 1; i >= 0; -- i)
							displayNodes [i] .pop (renderObject);
	
						return;
					}
				}
			};
		})(),
	});

	return X3DGroupingNode;
});


