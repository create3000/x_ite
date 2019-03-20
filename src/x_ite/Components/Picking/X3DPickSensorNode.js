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
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Picking/IntersectionType",
	"x_ite/Browser/Picking/SortOrder",
	"standard/Math/Algorithms/QuickSort",
	"standard/Math/Numbers/Matrix4",
	"standard/Utility/ObjectCache",
],
function (Fields,
          X3DSensorNode, 
          X3DConstants,
          IntersectionType,
          SortOrder,
          QuickSort,
          Matrix4,
          ObjectCache)
{
"use strict";

	var ModelMatrixCache = ObjectCache (Matrix4);

	function X3DPickSensorNode (executionContext)
	{
		X3DSensorNode .call (this, executionContext);

		this .addType (X3DConstants .X3DPickSensorNode);

		this .objectType       = new Set ();
		this .intersectionType = IntersectionType .BOUNDS;
		this .sortOrder        = SortOrder .CLOSEST;
		this .pickTargetNodes  = new Set ();
		this .modelMatrices    = [ ];
		this .targets          = [ ];
		this .targets .size    = 0;
	}

	X3DPickSensorNode .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
	{
		constructor: X3DPickSensorNode,
		initialize: function ()
		{
			this .isLive () .addInterest ("set_live__", this);

			this .enabled_          .addInterest ("set_live__",             this);
			this .objectType_       .addInterest ("set_objectType__",       this);
			this .intersectionType_ .addInterest ("set_intersectionType__", this);
			this .sortOrder_        .addInterest ("set_sortOrder__",        this);
			this .pickTarget_       .addInterest ("set_pickTarget__",       this);

			this .set_objectType__ ();
			this .set_intersectionType__ ();
			this .set_sortOrder__ ();
			this .set_pickTarget__ ();
		},
		getObjectType: function ()
		{
			return this .objectType;
		},
		getIntersectionType: function ()
		{
			return this .intersectionType;
		},
		getModelMatrices: function ()
		{
			return this .modelMatrices;
		},
		getTargets: function ()
		{
			return this .targets;
		},
		getPickedGeometries: (function ()
		{
			function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

			var
				pickedGeometries   = new Fields .MFNode (),
				intersection       = [ ],
            intersectionSorter = new QuickSort (intersection, compareDistance);

			return function ()
			{
				var
					targets    = this .targets,
					numTargets = targets .size;

				intersection     .length = 0;
				pickedGeometries .length = 0;

				for (var i = 0; i < numTargets; ++ i)
				{
					var target = targets [i];

					if (target .intersected)
						intersection .push (target);
				}


				if (intersection .length === 0)
					return pickedGeometries;

				switch (this .sortOrder)
				{
					case SortOrder .ANY:
					{
						pickedGeometries .push (this .getPickedGeometry (intersection [0]));
						break;
					}
					case SortOrder .CLOSEST:
					{
						intersectionSorter .sort (0, intersection .length);

						pickedGeometries .push (this .getPickedGeometry (intersection [0]));
						break;
					}
					case SortOrder .ALL:
					{
						for (var i = 0, length = intersection .length; i < length; ++ i)
							pickedGeometries .push (this .getPickedGeometry (intersection [i]));

						break;
					}
					case SortOrder .ALL_SORTED:
					{
						intersectionSorter .sort (0, intersection .length);

						for (var i = 0, length = intersection .length; i < length; ++ i)
							pickedGeometries .push (this .getPickedGeometry (intersection [i]));

						break;
					}
				}

				return pickedGeometries;
			};
		})(),
		getPickedGeometry: function (target)
		{
			var
				executionContext = this .getExecutionContext (),
				geometryNode     = target .geometryNode;

			if (geometryNode .getExecutionContext () === executionContext)
				return geometryNode;

			var instance = geometryNode .getExecutionContext ();

			if (instance .getType () .indexOf (X3DConstants .X3DPrototypeInstance) !== -1 && instance .getExecutionContext () === executionContext)
				return instance;

			var pickingHierarchy = target .pickingHierarchy;

			for (var i = pickingHierarchy .length - 1; i >= 0; -- i)
			{
				var node = pickingHierarchy [i];

				if (node .getExecutionContext () === executionContext)
					return node;
	
				var instance = node .getExecutionContext ();
	
				if (instance .getType () .indexOf (X3DConstants .X3DPrototypeInstance) !== -1 && instance .getExecutionContext () === executionContext)
					return instance;
			}

			return null;
		},
		set_live__: function ()
		{
			if (this .getLive () && this .enabled_ .getValue () && ! this .objectType .has ("NONE"))
			{
				this .getBrowser () .addPickSensor (this);
				this .setPickableObject (true);
			}
			else
			{
				this .getBrowser () .removePickSensor (this);
				this .setPickableObject (false);
			}
		},
		set_objectType__: function ()
		{
			this .objectType .clear ();

			for (var i = 0, length = this .objectType_ .length; i < length; ++ i)
			{
				this .objectType .add (this .objectType_ [i]);
			}

			this .set_live__ ();
		},
		set_intersectionType__: (function ()
		{
			var intersectionTypes = new Map ([
				["BOUNDS",   IntersectionType .BOUNDS],
				["GEOMETRY", IntersectionType .GEOMETRY],
			]);

			return function ()
			{
				this .intersectionType = intersectionTypes .get (this .intersectionType_ .getValue ());

				if (this .intersectionType === undefined)
					this .intersectionType = IntersectionType .BOUNDS;
			};
		})(),
		set_sortOrder__: (function ()
		{
			var sortOrders = new Map ([
				["ANY",        SortOrder .ANY],
				["CLOSEST",    SortOrder .CLOSEST],
				["ALL",        SortOrder .ALL],
				["ALL_SORTED", SortOrder .ALL_SORTED],
			]);

			return function ()
			{
				this .sortOrder = sortOrders .get (this .sortOrder_ .getValue ());

				if (this .sortOrder === undefined)
					this .sortOrder = SortOrder .CLOSEST;
			};
		})(),
		set_pickTarget__: function ()
		{
			this .pickTargetNodes .clear ();

			for (var i = 0, length = this .pickTarget_ .length; i < length; ++ i)
			{
				try
				{
					var
						node = this .pickTarget_ [i] .getValue () .getInnerNode (),
						type = node .getType ();
		
					for (var t = type .length - 1; t >= 0; -- t)
					{
						switch (type [t])
						{
							case X3DConstants .Inline:
							case X3DConstants .Shape:
							case X3DConstants .X3DGroupingNode:
							{
								this .pickTargetNodes .add (node);
								break;
							}
							default:
								continue;
						}
					}
				}
				catch (error)
				{ }
			}
		},
		traverse: function (type, renderObject)
		{
			// X3DPickSensorNode nodes are sorted out and only traversed during PICKING,

			if (this .getPickableObject ())
				this .modelMatrices .push (ModelMatrixCache .pop () .assign (renderObject .getModelViewMatrix () .get ()));
		},
		collect: function (geometryNode, modelMatrix, pickingHierarchy)
		{
			var pickTargetNodes = this .pickTargetNodes;

			var haveTarget = pickingHierarchy .some (function (node)
			{
				return pickTargetNodes .has (node);
			});

			if (haveTarget)
			{
				var targets = this .targets;

				if (targets .size < targets .length)
				{
					var target = targets [targets .size];
				}
				else
				{
					var target = { geometryNode: null, modelMatrix: new Matrix4 (), pickingHierarchy: [ ] };

					targets .push (target);
				}

				++ targets .size;

				target .intersected  = false;
				target .geometryNode = geometryNode;
				target .modelMatrix .assign (modelMatrix);

				var destPickingHierarchy = target .pickingHierarchy;

				for (var i = 0, length = pickingHierarchy .length; i < length; ++ i)
					destPickingHierarchy [i] = pickingHierarchy [i];

				destPickingHierarchy .length = length;
			}
		},
		process: function ()
		{
			var modelMatrices = this .modelMatrices;

			for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
				ModelMatrixCache .push (modelMatrices [m]);

			this .modelMatrices .length = 0;
			this .targets .size         = 0;
		},
	});

	return X3DPickSensorNode;
});


