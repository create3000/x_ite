(function () {

	var
		define  = X3D .define,
		require = X3D .require;

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


define ('x_ite/Bits/TraverseType',[],function ()
{
"use strict";

	var i = 0;

	var TraverseType =
	{
		POINTER:   i ++,
		CAMERA:    i ++,
		COLLISION: i ++,
		DEPTH:     i ++,
		DISPLAY:   i ++,
	};

	Object .preventExtensions (TraverseType);
	Object .freeze (TraverseType);
	Object .seal (TraverseType);

	return TraverseType;
});

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


define ('x_ite/Components/Grouping/X3DGroupingNode',[
	"x_ite/Fields",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DChildNode, 
          X3DBoundedObject, 
          TraverseType,
          X3DConstants,
          Matrix4)
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
	               
		this .hidden                = false;
		this .pointingDeviceSensors = [ ];
		this .maybeCameraObjects    = [ ];
		this .cameraObjects         = [ ];
		this .clipPlanes            = [ ];
		this .localFogs             = [ ];
		this .lights                = [ ];
		this .displayNodes          = [ ];
		this .childNodes            = [ ];
	}

	X3DGroupingNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DGroupingNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .addChildren_    .addInterest ("set_addChildren__",    this);
			this .removeChildren_ .addInterest ("set_removeChildren__", this);
			this .children_       .addInterest ("set_children__",       this);

			this .set_children__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
				return X3DBoundedObject .prototype .getBBox .call (this, this .children_ .getValue (), bbox);

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		getMatrix: function ()
		{
			return Matrix4 .Identity;
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
							switch (type [t])
							{
								case X3DConstants .X3DPointingDeviceSensorNode:
								{
									this .pointingDeviceSensors .push (innerNode);
									break;
								}
								case X3DConstants .ClipPlane:
								{
									this .clipPlanes .push (innerNode);
									break;
								}
								case X3DConstants .LocalFog:
								{
									this .localFogs .push (innerNode);
									break;
								}
								case X3DConstants .X3DLightNode:
								{
									this .lights .push (innerNode);
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
									innerNode .isCameraObject_ .addInterest ("set_cameraObjects__", this);

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
									var index = this .pointingDeviceSensors .indexOf (innerNode);

									if (index >= 0)
										this .pointingDeviceSensors .splice (index, 1);

									break;
								}
								case X3DConstants .ClipPlane:
								{
									var index = this .clipPlanes .indexOf (innerNode);

									if (index >= 0)
										this .clipPlanes .splice (index, 1);

									break;
								}
								case X3DConstants .LocalFog:
								{
									var index = this .localFogs .indexOf (innerNode);

									if (index >= 0)
										this .localFogs .splice (index, 1);

									break;
								}
								case X3DConstants .X3DLightNode:
								{
									var index = this .lights .indexOf (innerNode);

									if (index >= 0)
										this .lights .splice (index, 1);

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
									innerNode .isCameraObject_ .removeInterest ("set_cameraObjects__", this);

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
			this .set_display_nodes ();
		},
		clear: function ()
		{
			for (var i = 0, length = this .childNodes .length; i < length; ++ i)
				this .childNodes [i] .isCameraObject_ .removeInterest ("set_cameraObjects__", this);
			
			this .pointingDeviceSensors .length = 0;
			this .maybeCameraObjects    .length = 0;
			this .cameraObjects         .length = 0;
			this .clipPlanes            .length = 0;
			this .localFogs             .length = 0;
			this .lights                .length = 0;
			this .childNodes            .length = 0;
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
		set_display_nodes: function ()
		{
			var
				clipPlanes   = this .clipPlanes,
				localFogs    = this .localFogs,
				lights       = this .lights,
				displayNodes = this .displayNodes;

			displayNodes .length = 0;

			for (var i = 0, length = clipPlanes .length; i < length; ++ i)
				displayNodes .push (clipPlanes [i]);

			for (var i = 0, length = localFogs .length; i < length; ++ i)
				displayNodes .push (localFogs [i]);

			for (var i = 0, length = lights .length; i < length; ++ i)
				displayNodes .push (lights [i]);
		},
		traverse: function (type, renderObject)
		{
			switch (type)
			{
				case TraverseType .POINTER:
				{
					var
						pointingDeviceSensors = this .pointingDeviceSensors,
						clipPlanes            = this .clipPlanes,
						childNodes            = this .childNodes;

					if (pointingDeviceSensors .length)
					{
						var sensors = { };
						
						renderObject .getBrowser () .getSensors () .push (sensors);
					
						for (var i = 0, length = pointingDeviceSensors .length; i < length; ++ i)
							pointingDeviceSensors [i] .push (renderObject, sensors);
					}

					for (var i = 0, length = clipPlanes .length; i < length; ++ i)
						clipPlanes [i] .push (renderObject);

					for (var i = 0, length = childNodes .length; i < length; ++ i)
						childNodes [i] .traverse (type, renderObject);

					for (var i = clipPlanes .length - 1; i >= 0; -- i)
						clipPlanes [i] .pop (renderObject);

					if (pointingDeviceSensors .length)
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
				case TraverseType .COLLISION:
				case TraverseType .DEPTH:
				{					
					var
						clipPlanes = this .clipPlanes,
						childNodes = this .childNodes;

					for (var i = 0, length = clipPlanes .length; i < length; ++ i)
						clipPlanes [i] .push (renderObject);

					for (var i = 0, length = childNodes .length; i < length; ++ i)
						childNodes [i] .traverse (type, renderObject);

					for (var i = clipPlanes .length - 1; i >= 0; -- i)
						clipPlanes [i] .pop (renderObject);
					
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
		},
	});

	return X3DGroupingNode;
});



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


define ('x_ite/Components/CADGeometry/X3DProductStructureChildNode',[
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DChildNode, 
          X3DConstants)
{
"use strict";

	function X3DProductStructureChildNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DProductStructureChildNode);
	}

	X3DProductStructureChildNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DProductStructureChildNode,
	});

	return X3DProductStructureChildNode;
});



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


define ('x_ite/Components/CADGeometry/CADAssembly',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Components/CADGeometry/X3DProductStructureChildNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DProductStructureChildNode, 
          X3DConstants)
{
"use strict";

	function CADAssembly (executionContext)
	{
		X3DGroupingNode              .call (this, executionContext);
		X3DProductStructureChildNode .call (this, executionContext);

		this .addType (X3DConstants .CADAssembly);
	}

	CADAssembly .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
		//X3DProductStructureChildNode .prototype,
	{
		constructor: CADAssembly,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",           new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "CADAssembly";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return CADAssembly;
});



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


define ('x_ite/Components/CADGeometry/CADFace',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/CADGeometry/X3DProductStructureChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DProductStructureChildNode, 
          X3DBoundedObject,
          X3DCast,
          X3DConstants)
{
"use strict";

	function CADFace (executionContext)
	{
		X3DProductStructureChildNode .call (this, executionContext);
		X3DBoundedObject             .call (this, executionContext);

		this .addType (X3DConstants .CADFace);

		this .shapeNode = null;
	}

	CADFace .prototype = Object .assign (Object .create (X3DProductStructureChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: CADFace,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",   new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shape",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CADFace";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DProductStructureChildNode .prototype .initialize .call (this);
			X3DBoundedObject             .prototype .initialize .call (this);

			this .shape_ .addInterest ("set_shape__", this);

			this .set_shape__ ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				var boundedObject = X3DCast (X3DConstants .X3DBoundedObject, this .shape_);
		
				if (boundedObject)
					return boundedObject .getBBox (bbox);
		
				return bbox .set ();
			}
		
			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		set_shape__: function ()
		{
			if (this .shapeNode)
				this .shapeNode .isCameraObject_ .removeFieldInterest (this .isCameraObject_);

			this .shapeNode = null;

			try
			{
				var
					node = this .shape_ .getValue () .getInnerNode (),
					type = node .getType ();
	
				for (var t = type .length - 1; t >= 0; -- t)
				{
					switch (type [t])
					{
						case X3DConstants .LOD:
						case X3DConstants .Transform:
						case X3DConstants .X3DShapeNode:
						{
							node .isCameraObject_ .addFieldInterest (this .isCameraObject_);
							this .setCameraObject (node .getCameraObject ());
							this .shapeNode = node;
							break;
						}
						default:
							continue;
					}
				}
			}
			catch (error)
			{ }

			if (this .shapeNode)
				delete this .traverse;
			else
				this .traverse = Function .prototype;
		},
		traverse: function (type, renderObject)
		{
			this .shapeNode .traverse (type, renderObject);
		},
	});

	return CADFace;
});



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


define ('x_ite/Components/CADGeometry/CADLayer',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DConstants)
{
"use strict";

	function CADLayer (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .CADLayer);
	}

	CADLayer .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: CADLayer,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",           new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .MFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "CADLayer";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DGroupingNode .prototype .initialize .call (this);

			this .visible_ .addInterest ("set_children__", this);
		},
		getVisible: function ()
		{
			return this .visible_;
		},
		remove: function ()
		{
			this .set_children__ ();
		},
	});

	return CADLayer;
});



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


define ('x_ite/Components/Grouping/X3DTransformMatrix3DNode',[
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (X3DGroupingNode,
          X3DConstants,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	function X3DTransformMatrix3DNode (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTransformMatrix3DNode);

		this .matrix = new Matrix4 ();
	}

	X3DTransformMatrix3DNode .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
	{
		constructor: X3DTransformMatrix3DNode,
		getBBox: function (bbox)
		{
			var bbox = X3DGroupingNode .prototype .getBBox .call (this, bbox);

			if (this .traverse === X3DTransformMatrix3DNode .prototype .traverse)
				return bbox .multRight (this .matrix);

			return bbox;
		},
		setMatrix: function (matrix)
		{
			if (matrix .equals (Matrix4 .Identity))
			{
				this .matrix .identity ();
				this .traverse = X3DGroupingNode .prototype .traverse;
			}
			else
			{
			   this .matrix .assign (matrix);
				delete this .traverse;
			}
		},
		getMatrix: function ()
		{
			return this .matrix;
		},
		setTransform: function (t, r, s, so, c)
		{

			if (t .equals (Vector3 .Zero) && r .equals (Rotation4 .Identity) && s .equals (Vector3 .One))
			{
				this .matrix .identity ();
				this .traverse = X3DGroupingNode .prototype .traverse;
			}
			else
			{
			   this .matrix .set (t, r, s, so, c);
				delete this .traverse ;
			}
		},
		traverse: function (type, renderObject)
		{
			var modelViewMatrix = renderObject .getModelViewMatrix ();

			modelViewMatrix .push ();
			modelViewMatrix .multLeft (this .matrix);
			
			X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

			modelViewMatrix .pop ();
		},
	});

	return X3DTransformMatrix3DNode;
});



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


define ('x_ite/Components/Grouping/X3DTransformNode',[
	"x_ite/Components/Grouping/X3DTransformMatrix3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DTransformMatrix3DNode, 
          X3DConstants)
{
"use strict";

	function X3DTransformNode (executionContext)
	{
		X3DTransformMatrix3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTransformNode);

		this .translation_ .setUnit ("length");
		this .center_      .setUnit ("length");
	}

	X3DTransformNode .prototype = Object .assign (Object .create (X3DTransformMatrix3DNode .prototype),
	{
		constructor: X3DTransformNode,
		initialize: function ()
		{
			X3DTransformMatrix3DNode .prototype .initialize .call (this);
			
			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			this .setHidden (this .scale_ .x === 0 ||
			                 this .scale_ .y === 0 ||
			                 this .scale_ .z === 0);

			this .setTransform (this .translation_      .getValue (),
			                    this .rotation_         .getValue (),
			                    this .scale_            .getValue (),
			                    this .scaleOrientation_ .getValue (),
			                    this .center_           .getValue ());
		},
	});

	return X3DTransformNode;
});



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


define ('x_ite/Components/CADGeometry/CADPart',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DTransformNode",
	"x_ite/Components/CADGeometry/X3DProductStructureChildNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformNode, 
          X3DProductStructureChildNode, 
          X3DConstants)
{
"use strict";

	function CADPart (executionContext)
	{
		X3DTransformNode             .call (this, executionContext);
		X3DProductStructureChildNode .call (this, executionContext);

		this .addType (X3DConstants .CADPart);
	}

	CADPart .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
		//X3DProductStructureChildNode .prototype,
	{
		constructor: CADPart,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "CADPart";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DTransformNode .prototype .initialize .call (this);
		},
	});

	return CADPart;
});



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


define ('x_ite/Browser/Core/Shading',[],function ()
{
"use strict";
	
	var i = 0;

	var Shading =
	{
		POINT:     i ++,
		WIREFRAME: i ++,
		FLAT:      i ++,
		GOURAUD:   i ++,
		PHONG:     i ++,
	};

	Object .preventExtensions (Shading);
	Object .freeze (Shading);
	Object .seal (Shading);

	return Shading;
});

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


define ('standard/Math/Geometry/Plane3',[
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
],
function (Vector3,
          Matrix4)
{
"use strict";

	var
		normal    = new Vector3 (0, 0, 0),
		point     = new Vector3 (0, 0, 0),
		invMatrix = new Matrix4 ();

	function Plane3 (point, normal)
	{
		this .normal             = normal .copy ();
		this .distanceFromOrigin = normal .dot (point);
	}

	Plane3 .prototype =
	{
		constructor: Plane3,
		copy: function ()
		{
			var copy = Object .create (Plane3 .prototype);
			copy .normal             = this .normal .copy ();
			copy .distanceFromOrigin = this .distanceFromOrigin;
			return copy;
		},
		assign: function (plane)
		{
			this .normal .assign (plane .normal);
			this .distanceFromOrigin = plane .distanceFromOrigin;
			return this;
		},
		set: function (point, normal)
		{
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);	   
			return this;
		},
		multRight: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = n * !~m = ~m * n
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multMatrixDir (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multVecMatrix (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		multLeft: function (matrix)
		//throw
		{
			// Taken from Inventor:
		
			// Find the point on the plane along the normal from the origin
			point .assign (this .normal) .multiply (this .distanceFromOrigin);
		
			// Transform the plane normal by the matrix
			// to get the new normal. Use the inverse transpose
			// of the matrix so that normals are not scaled incorrectly.
			// n' = !~m * n = n * ~m
			invMatrix .assign (matrix) .inverse ();
			invMatrix .multDirMatrix (normal .assign (this .normal)) .normalize ();
		
			// Transform the point by the matrix
			matrix .multMatrixVec (point);
		
			// The new distance is the projected distance of the vector to the
			// transformed point onto the (unit) transformed normal. This is
			// just a dot product.
			this .normal .assign (normal);
			this .distanceFromOrigin = normal .dot (point);

			return this;
		},
		getDistanceToPoint: function (point)
		{
			return Vector3 .dot (point, this .normal) - this .distanceFromOrigin;
		},
		intersectsLine: function (line, intersection)
		{
			var
				point     = line .point,
				direction = line .direction;
		
			// Check if the line is parallel to the plane.
			var theta = direction .dot (this .normal);

			// Plane and line are parallel.
			if (theta === 0)
				return false;

			// Plane and line are not parallel. The intersection point can be calculated now.
			var t = (this .distanceFromOrigin - this .normal .dot (point)) / theta;

			intersection .x = point .x + direction .x * t;
			intersection .y = point .y + direction .y * t;
			intersection .z = point .z + direction .z * t;

			return true;
		},
		toString: function ()
		{
			return this .normal .toString () + " " + this .distanceFromOrigin;
		},
	};

	return Plane3;
});

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


define ('x_ite/Components/Rendering/X3DGeometryNode',[
	"x_ite/Fields",
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Core/Shading",
	"standard/Math/Numbers/Color3",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/Plane3",
	"standard/Math/Geometry/Triangle3",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DNode,
          X3DConstants,
          Shading,
          Color3,
          Vector2,
          Vector3,
          Matrix3,
          Matrix4,
          Box3,
          Plane3,
          Triangle3,
          Algorithm)
{
"use strict";

	const ARRAY_TYPE = "Array"; // For color, texCoord, normal, and vertex array, can be MFFloat or Array;

	const
		point           = new Vector3 (0, 0, 0),
		clipPoint       = new Vector3 (0, 0, 0),
		modelViewMatrix = new Matrix4 (),
		invMatrix       = new Matrix4 ();

	// Box normals for bbox / line intersection.
	const boxNormals = [
		new Vector3 (0,  0,  1), // front
		new Vector3 (0,  0, -1), // back
		new Vector3 (0,  1,  0), // top
		new Vector3 (0, -1,  0), // bottom
		new Vector3 (1,  0,  0)  // right
		// left: We do not have to test for left.
	];

	function X3DGeometryNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DGeometryNode);
			
		this .addChildObjects ("transparent",  new Fields .SFBool (),
		                       "bbox_changed", new Fields .SFTime (),
		                       "rebuild",      new Fields .SFTime ());

		this .transparent_  .setAccessType (X3DConstants .outputOnly);
		this .bbox_changed_ .setAccessType (X3DConstants .outputOnly);
		this .rebuild_      .setAccessType (X3DConstants .outputOnly);

		// Members

		this .min                 = new Vector3 (0, 0, 0);
		this .max                 = new Vector3 (0, 0, 0);
		this .bbox                = new Box3 (this .min, this .max, true);
		this .solid               = true;
		this .geometryType        = 3;
		this .flatShading         = undefined;
		this .colorMaterial       = false;
		this .attribNodes         = [ ];
		this .attribs             = [ ];
		this .currentTexCoordNode = this .getBrowser () .getDefaultTextureCoordinate (); // For TextureCoordinateGenerator needed.
		this .texCoordParams      = { min: new Vector3 (0, 0, 0) };
		this .multiTexCoords      = [ ];
		this .texCoords           = X3DGeometryNode .createArray ();
		this .colors              = X3DGeometryNode .createArray ();
		this .normals             = X3DGeometryNode .createArray ();
		this .flatNormals         = X3DGeometryNode .createArray ();
		this .vertices            = X3DGeometryNode .createArray ();
		this .vertexCount         = 0;

		// This methods are configured in transfer.
		this .depth            = Function .prototype;
		this .display          = Function .prototype;
		this .displayParticles = Function .prototype;
	}

	// Function to select ether Array or MFFloat for color/normal/vertex arrays.
	X3DGeometryNode .createArray = function ()
	{
		if (ARRAY_TYPE == "MFFloat")
			return new Fields .MFFloat ();

		var array = [ ];

		array .typedArray = new Float32Array ();

		array .assign = function (value)
		{
			this .length = 0;

			Array .prototype .push .apply (this, value);
		};

		array .getValue = function ()
		{
			return this .typedArray;
		};

		array .shrinkToFit = function ()
		{
			if (this .length !== this .typedArray .length)
				this .typedArray = new Float32Array (this);
			else
				this .typedArray .set (this);
		};

		return array;
	}

	X3DGeometryNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DGeometryNode,
		intersection: new Vector3 (0, 0, 0),
		uvt: { u: 0, v: 0, t: 0 },
		v0: new Vector3 (0, 0, 0),
		v1: new Vector3 (0, 0, 0),
		v2: new Vector3 (0, 0, 0),
		normal: new Vector3 (0, 0, 0),
		setup: function ()
		{
			X3DNode .prototype .setup .call (this);

			this .addInterest ("requestRebuild", this);
			this .rebuild_ .addInterest ("rebuild", this);

			this .rebuild ();
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .isLive () .addInterest ("set_live__", this);

			var gl = this .getBrowser () .getContext ();

			this .primitiveMode   = gl .TRIANGLES;
			this .frontFace       = gl .CCW;
			this .attribBuffers   = [ ];
			this .texCoordBuffers = [ ];
			this .colorBuffer     = gl .createBuffer ();
			this .normalBuffer    = gl .createBuffer ();
			this .vertexBuffer    = gl .createBuffer ();
			this .planes          = [ ];

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] = new Plane3 (Vector3 .Zero, boxNormals [0]);
			}

			this .set_live__ ();
		},
		setGeometryType: function (value)
		{
			this .geometryType = value;
		},
		getGeometryType: function ()
		{
			return this .geometryType;
		},
		getBBox: function ()
		{
			// With screen matrix applied.
			return this .bbox;
		},
		setBBox: function (bbox)
		{
			if (! bbox .equals (this .bbox))
			{
			   bbox .getExtents (this .min, this .max);
	
				this .bbox .assign (bbox);
	
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? this .min : this .max, boxNormals [i]);
	
				this .bbox_changed_ .addEvent ();
			}
		},
		getMin: function ()
		{
			// With screen matrix applied.
			return this .min;
		},
		getMax: function ()
		{
			// With screen matrix applied.
			return this .max;
		},
		getMatrix: function ()
		{
			return Matrix4 .Identity;
		},
		setPrimitiveMode: function (value)
		{
			this .primitiveMode = value;
		},
		getPrimitiveMode: function ()
		{
			return this .primitiveMode;
		},
		setSolid: function (value)
		{
			this .solid = value;
		},
		setCCW: function (value)
		{
			this .frontFace = value ? this .getBrowser () .getContext () .CCW : this .getBrowser () .getContext () .CW;
		},
		getAttrib: function ()
		{
			return this .attribNodes;
		},
		getAttribs: function ()
		{
			return this .attribs;
		},
		setColors: function (value)
		{
			this .colors .assign (value);
		},
		getColors: function ()
		{
			return this .colors;
		},
		setMultiTexCoords: function (value)
		{
			var multiTexCoords = this .multiTexCoords;

			multiTexCoords .length = 0;

			Array .prototype .push .apply (multiTexCoords, value);
		},
		getMultiTexCoords: function ()
		{
			return this .multiTexCoords;
		},
		getTexCoords: function ()
		{
			return this .texCoords;
		},
		setCurrentTexCoord: function (value)
		{
			this .currentTexCoordNode = value || this .getBrowser () .getDefaultTextureCoordinate ();
		},
		setNormals: function (value)
		{
			this .normals .assign (value);
		},
		getNormals: function ()
		{
			return this .normals;
		},
		setVertices: function (value)
		{
			this .vertices .assign (value);
		},
		getVertices: function ()
		{
			return this .vertices;
		},
		buildTexCoords: function ()
		{
			var
				p         = this .getTexCoordParams (),
				min       = p .min,
				Sindex    = p .Sindex,
				Tindex    = p .Tindex,
				Ssize     = p .Ssize,
				S         = min [Sindex],
				T         = min [Tindex],
				texCoords = this .texCoords,
				vertices  = this .vertices .getValue ();

			for (var i = 0, length = vertices .length; i < length; i += 4)
			{
				texCoords .push ((vertices [i + Sindex] - S) / Ssize,
				                 (vertices [i + Tindex] - T) / Ssize,
				                 0,
				                 1);
			}

			this .multiTexCoords .push (texCoords);
		},
		getTexCoordParams: function ()
		{
			var
				p     = this .texCoordParams,
				bbox  = this .getBBox (),
				size  = bbox .size,
				Xsize = size .x,
				Ysize = size .y,
				Zsize = size .z;

			p .min .assign (bbox .center) .subtract (size .divide (2));

			if ((Xsize >= Ysize) && (Xsize >= Zsize))
			{
				// X size largest
				p .Ssize = Xsize; p .Sindex = 0;

				if (Ysize >= Zsize)
					p .Tindex = 1;
				else
					p .Tindex = 2;
			}
			else if ((Ysize >= Xsize) && (Ysize >= Zsize))
			{
				// Y size largest
				p .Ssize = Ysize; p .Sindex = 1;

				if (Xsize >= Zsize)
					p .Tindex = 0;
				else
					p .Tindex = 2;
			}
			else
			{
				// Z is the largest
				p .Ssize = Zsize; p .Sindex = 2;

				if (Xsize >= Ysize)
					p .Tindex = 0;
				else
					p .Tindex = 1;
			}

			return p;
		},
		refineNormals: function (normalIndex, normals, creaseAngle)
		{
			if (creaseAngle === 0)
				return normals;

			var
				cosCreaseAngle = Math .cos (Algorithm .clamp (creaseAngle, 0, Math .PI)),
				normals_       = [ ];

			for (var i in normalIndex) // Don't use forEach
			{
				var vertex = normalIndex [i];

				for (var p = 0, length = vertex .length; p < length; ++ p)
				{
					var
						P = vertex [p],
						m = normals [P],
						n = new Vector3 (0, 0, 0);

					for (var q = 0; q < length; ++ q)
					{
						var Q = normals [vertex [q]];
	
						if (Q .dot (m) >= cosCreaseAngle)
							n .add (Q);
					}

					normals_ [P] = n .normalize ();
				}
			}

			return normals_;
		},
		isClipped: function (point, clipPlanes)
		{
			return clipPlanes .some (function (clipPlane)
			{
				return clipPlane .isClipped (point);
			});
		},
		transformLine: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		transformMatrix: function (line)
		{
			// Apply sceen nodes transformation in place here.
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix_, intersections)
		{
			try
			{
				var intersected = false;

				if (this .intersectsBBox (line))
				{
					this .transformLine   (line);                                       // Apply screen transformations from screen nodes.
					this .transformMatrix (modelViewMatrix .assign (modelViewMatrix_)); // Apply screen transformations from screen nodes.

					var
						texCoords  = this .multiTexCoords [0] .getValue (),
						normals    = this .normals .getValue (),
						vertices   = this .vertices .getValue (),
						uvt        = this .uvt,
						v0         = this .v0,
						v1         = this .v1,
						v2         = this .v2;

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;

						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (line .intersectsTriangle (v0, v1, v2, uvt))
						{
							// Get barycentric coordinates.

							var
								u = uvt .u,
								v = uvt .v,
								t = uvt .t;

							// Determine vectors for X3DPointingDeviceSensors.

							var point = new Vector3 (t * vertices [i4]     + u * vertices [i4 + 4] + v * vertices [i4 +  8],
							                         t * vertices [i4 + 1] + u * vertices [i4 + 5] + v * vertices [i4 +  9],
							                         t * vertices [i4 + 2] + u * vertices [i4 + 6] + v * vertices [i4 + 10]);

							if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (point)), clipPlanes))
								continue;

							var texCoord = new Vector2 (t * texCoords [i4]     + u * texCoords [i4 + 4] + v * texCoords [i4 + 8],
							                            t * texCoords [i4 + 1] + u * texCoords [i4 + 5] + v * texCoords [i4 + 9]);

							var i3 = i * 3;

							var normal = new Vector3 (t * normals [i3]     + u * normals [i3 + 3] + v * normals [i3 + 6],
							                          t * normals [i3 + 1] + u * normals [i3 + 4] + v * normals [i3 + 7],
							                          t * normals [i3 + 2] + u * normals [i3 + 5] + v * normals [i3 + 8]);

							intersections .push ({ texCoord: texCoord, normal: normal, point: this .getMatrix () .multVecMatrix (point) });
							intersected = true;
						}
					}
				}

				return intersected;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		intersectsBBox: function (line)
		{
			var
				planes       = this .planes,
				min          = this .min,
				max          = this .max,
				minX         = min .x,
				maxX         = max .x,
				minY         = min .y,
				maxY         = max .y,
				minZ         = min .z,
				maxZ         = max .z,
				intersection = this .intersection;

		   // front
			if (planes [0] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// back
			if (planes [1] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .y >= minY && intersection .y <= maxY)
					return true;
			}

			// top
			if (planes [2] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// bottom
			if (planes [3] .intersectsLine (line, intersection))
			{
				if (intersection .x >= minX && intersection .x <= maxX &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			// right
			if (planes [4] .intersectsLine (line, intersection))
			{
				if (intersection .y >= minY && intersection .y <= maxY &&
				    intersection .z >= minZ && intersection .z <= maxZ)
					return true;
			}

			return false;
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			try
			{
				if (box .intersectsBox (this .bbox))
				{
					box .multRight (invMatrix .assign (this .getMatrix ()) .inverse ());

					this .transformMatrix (modelViewMatrix); // Apply screen transformations from screen nodes.

					var
						vertices = this .vertices .getValue (),
						v0       = this .v0,
						v1       = this .v1,
						v2       = this .v2;
		
					for (var i = 0, length = this .vertexCount; i < length; i += 3)
					{
						var i4 = i * 4;
		
						v0 .x = vertices [i4];     v0 .y = vertices [i4 + 1]; v0 .z = vertices [i4 +  2];
						v1 .x = vertices [i4 + 4]; v1 .y = vertices [i4 + 5]; v1 .z = vertices [i4 +  6];
						v2 .x = vertices [i4 + 8]; v2 .y = vertices [i4 + 9]; v2 .z = vertices [i4 + 10];

						if (box .intersectsTriangle (v0, v1, v2))
						{
							if (clipPlanes .length)
							{
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v0)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v1)), clipPlanes))
									continue;
				
								if (this .isClipped (modelViewMatrix .multVecMatrix (clipPoint .assign (v2)), clipPlanes))
									continue;
							}
		
						   return true;
						}
				   }
				}

			   return false;
			}
			catch (error)
			{
				console .log (error);
				return false;
			}
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
				this .getBrowser () .getBrowserOptions () .Shading_ .addInterest ("set_shading__", this);
			else
				this .getBrowser () .getBrowserOptions () .Shading_ .removeInterest ("set_shading__", this);
		},
		set_shading__: function (shading)
		{
			if (this .geometryType < 2)
				return;
			
			var flatShading = this .getBrowser () .getBrowserOptions () .getShading () === Shading .FLAT;

			if (flatShading === this .flatShading)
				return;

			this .flatShading = flatShading;

			// Generate flat normals if needed.

			var gl = this .getBrowser () .getContext ();

			if (flatShading)
			{
				if (! this .flatNormals .length)
				{
					var
						cw          = this .frontFace === gl .CW,
						flatNormals = this .flatNormals,
						vertices    = this .vertices .getValue (),
						v0          = this .v0,
						v1          = this .v1,
						v2          = this .v2,
						normal      = this .normal;

					for (var i = 0, length = vertices .length; i < length; i += 12)
					{
					   Triangle3 .normal (v0 .set (vertices [i],     vertices [i + 1], vertices [i + 2]),
					                      v1 .set (vertices [i + 4], vertices [i + 5], vertices [i + 6]),
					                      v2 .set (vertices [i + 8], vertices [i + 9], vertices [i + 10]),
					                      normal);
					   
						if (cw)
							normal .negate ();

						flatNormals .push (normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z,
						                   normal .x, normal .y, normal .z);
					}

					flatNormals .shrinkToFit ();
				}
			}

			// Transfer normals.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .normalBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, flatShading ? this .flatNormals .getValue () : this .normals .getValue (), gl .STATIC_DRAW);
		},
		requestRebuild: function ()
		{
			this .rebuild_ .addEvent ();
		},
		rebuild: function ()
		{
			this .clear ();
			this .build ();

			// Shrink arrays before transfer to graphics card.

			for (var i = 0, length = this .attribs .length; i < length; ++ i)
				this .attribs [i] .shrinkToFit ();

			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
				this .multiTexCoords [i] .shrinkToFit ();
	
			this .colors   .shrinkToFit ();
			this .normals  .shrinkToFit ();
			this .vertices .shrinkToFit ();

			// Determine bbox.

			var
				min      = this .min,
				max      = this .max,
				vertices = this .vertices .getValue ();

			if (vertices .length)
			{
				if (min .x === Number .POSITIVE_INFINITY)
				{
					for (var i = 0, length = vertices .length; i < length; i += 4)
					{
						point .set (vertices [i], vertices [i + 1], vertices [i + 2]);
	
						min .min (point);
						max .max (point);
					}
				}

				this .bbox .setExtents (min, max);
			}
			else
			{
				this .bbox .setExtents (min .set (0, 0, 0), max .set (0, 0, 0));
			}

			this .bbox_changed_ .addEvent ();

			// Generate texCoord if needed.

			if (this .geometryType > 1)
			{
				for (var i = 0; i < 5; ++ i)
					this .planes [i] .set (i % 2 ? min : max, boxNormals [i]);

				if (this .multiTexCoords .length === 0)
				{
					this .buildTexCoords ();
	
					this .texCoords .shrinkToFit ();
				}
			}

			// Upload normals or flat normals.

			this .set_shading__ (this .getBrowser () .getBrowserOptions () .Shading_);

			// Upload arrays.

			this .transfer ();
		},
		clear: function ()
		{
			// BBox

			this .min .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY);
			this .max .set (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY);

			// Create attrib arrays.

			var attribs = this .attribs;

			for (var a = 0, length = attribs .length; a < length; ++ a)
				attribs [a] .length = 0;

			for (var a = attribs .length, length = this .attribNodes .length; a < length; ++ a)
				attribs [a] = X3DGeometryNode .createArray ();

			attribs .length = length;

			// Buffer

			this .flatShading = undefined;

			this .colors         .length = 0;
			this .multiTexCoords .length = 0;
			this .texCoords      .length = 0;
			this .normals        .length = 0;
			this .flatNormals    .length = 0;
			this .vertices       .length = 0;
		},
		transfer: function ()
		{
			var
				gl    = this .getBrowser () .getContext (),
				count = this .vertices .length / 4;

			// Transfer attribs.

			for (var i = this .attribBuffers .length, length = this .attribs .length; i < length; ++ i)
				this .attribBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .attribBuffers .length = length;
			
			for (var i = 0, length = this .attribs .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .attribBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .attribs [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer multiTexCoords.

			for (var i = this .texCoordBuffers .length, length = this .multiTexCoords .length; i < length; ++ i)
				this .texCoordBuffers .push (gl .createBuffer ());

			// Only grow.
			//this .texCoordBuffers .length = length;
			
			for (var i = 0, length = this .multiTexCoords .length; i < length; ++ i)
			{
				gl .bindBuffer (gl .ARRAY_BUFFER, this .texCoordBuffers [i]);
				gl .bufferData (gl .ARRAY_BUFFER, this .multiTexCoords [i] .getValue (), gl .STATIC_DRAW);
			}

			// Transfer colors.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .colorBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .colors .getValue (), gl .STATIC_DRAW);
			this .colorMaterial = Boolean (this .colors .length);

			// Transfer vertices.

			gl .bindBuffer (gl .ARRAY_BUFFER, this .vertexBuffer);
			gl .bufferData (gl .ARRAY_BUFFER, this .vertices .getValue (), gl .STATIC_DRAW);
			this .vertexCount = count;

			// Setup render functions.

			if (this .vertexCount)
			{
				// Use default render functions.
				delete this .depth;
				delete this .display;
				delete this .displayParticles;
			}
			else
			{
				// Use no render function.
				this .depth            = Function .prototype;
				this .display          = Function .prototype;
				this .displayParticles = Function .prototype;
			}
	  	},
		traverse: function (type, renderObject)
		{ },
		depth: function (gl, context, shaderNode)
		{
			// Setup vertex attributes.

			// Attribs in depth rendering are not supported.
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);

			gl .drawArrays (this .primitiveMode, 0, this .vertexCount);
		},
		display: function (gl, context)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;

				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);
	
				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.

					for (var i = 0, length = this .vertexCount; i < length; i += 3)
						gl .drawArrays (shaderNode .primitiveMode, i, 3);
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						gl .enable (gl .CULL_FACE);
						gl .cullFace (gl .FRONT);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
	
						gl .cullFace (gl .BACK);
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);		
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		displayParticlesDepth: function (gl, context, shaderNode, particles, numParticles)
		{
			var gl = context .renderer .getBrowser () .getContext ();

			// Attribs in depth rendering are not supported:
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

			shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

			// Draw depending on wireframe, solid and transparent.

			var
				modelViewMatrix = context .modelViewMatrix,
				x               = modelViewMatrix [12],
				y               = modelViewMatrix [13],
				z               = modelViewMatrix [14];

			for (var p = 0; p < numParticles; ++ p)
			{
				var particle = particles [p];

				modelViewMatrix [12] = x;
				modelViewMatrix [13] = y;
				modelViewMatrix [14] = z;

				Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

				shaderNode .setParticle (gl, p, particle, modelViewMatrix, false);

				gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
			}
	
			//for (var i = 0, length = attribNodes .length; i < length; ++ i)
			//	attribNodes [i] .disable (gl, shaderNode);
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			try
			{
				var
					shaderNode    = context .shaderNode,
					attribNodes   = this .attribNodes,
					attribBuffers = this .attribBuffers;
	
				// Setup shader.
	
				context .geometryType  = this .geometryType;
				context .colorMaterial = this .colorMaterial;

				shaderNode .enable (gl);
				shaderNode .setLocalUniforms (gl, context);
	
				// Setup vertex attributes.
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

				if (this .colorMaterial)
					shaderNode .enableColorAttribute (gl, this .colorBuffer);
	
				shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);
				shaderNode .enableNormalAttribute   (gl, this .normalBuffer);
				shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);
	
				// Draw depending on wireframe, solid and transparent.
	
				var
					materialNode    = context .materialNode,
					normalMatrix    = materialNode || shaderNode .getCustom (),
					modelViewMatrix = context .modelViewMatrix,
					x               = modelViewMatrix [12],
					y               = modelViewMatrix [13],
					z               = modelViewMatrix [14];
	
				if (shaderNode .wireframe)
				{
					// Wireframes are always solid so only one drawing call is needed.
	
					for (var p = 0; p < numParticles; ++ p)
					{
						var particle = particles [p];

						modelViewMatrix [12] = x;
						modelViewMatrix [13] = y;
						modelViewMatrix [14] = z;
		
						Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

						shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);
		
						for (var i = 0, length = this .vertexCount; i < length; i += 3)
							gl .drawArrays (shaderNode .primitiveMode, i, 3);
					}
				}
				else
				{
					var positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;
	
					gl .frontFace (positiveScale ? this .frontFace : (this .frontFace === gl .CCW ? gl .CW : gl .CCW));
	
					if (context .transparent && ! this .solid)
					{
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;
	
							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);
	
							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .enable (gl .CULL_FACE);
							gl .cullFace (gl .FRONT);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
		
							gl .cullFace (gl .BACK);
							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}	
					}
					else
					{
						if (this .solid)
							gl .enable (gl .CULL_FACE);
						else
							gl .disable (gl .CULL_FACE);
	
						for (var p = 0; p < numParticles; ++ p)
						{
							var particle = particles [p];

							modelViewMatrix [12] = x;
							modelViewMatrix [13] = y;
							modelViewMatrix [14] = z;

							Matrix4 .prototype .translate .call (modelViewMatrix, particle .position);

							shaderNode .setParticle (gl, p, particle, modelViewMatrix, normalMatrix);

							gl .drawArrays (shaderNode .primitiveMode, 0, this .vertexCount);
						}
					}
				}
	
				for (var i = 0, length = attribNodes .length; i < length; ++ i)
					attribNodes [i] .disable (gl, shaderNode);
	
				shaderNode .disableColorAttribute    (gl);
				shaderNode .disableTexCoordAttribute (gl);
				shaderNode .disableNormalAttribute   (gl);
				shaderNode .disable                  (gl);
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
	});

	return X3DGeometryNode;
});


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


define ('x_ite/Components/Rendering/X3DComposedGeometryNode',[
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
],
function (X3DGeometryNode,
          X3DCast,
          X3DConstants,
          Vector3)
{
"use strict";

	var
		current = new Vector3 (0, 0, 0),
		next    = new Vector3 (0, 0, 0);

	function X3DComposedGeometryNode (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .X3DComposedGeometryNode);

		this .colorNode    = null;
		this .texCoordNode = null;
		this .normalNode   = null;
		this .coordNode    = null;
	}

	X3DComposedGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: X3DComposedGeometryNode,
		initialize: function ()
		{
			X3DGeometryNode .prototype .initialize .call (this);

			this .attrib_   .addInterest ("set_attrib__", this);
			this .color_    .addInterest ("set_color__", this);
			this .texCoord_ .addInterest ("set_texCoord__", this);
			this .normal_   .addInterest ("set_normal__", this);
			this .coord_    .addInterest ("set_coord__", this);

			this .set_attrib__ ();
			this .set_color__ ();
			this .set_texCoord__ ();
			this .set_normal__ ();
			this .set_coord__ ();
		},
		getColor: function ()
		{
			return this .colorNode;
		},
		getTexCoord: function ()
		{
			return this .texCoordNode;
		},
		getNormal: function ()
		{
			return this .normalNode;
		},
		getCoord: function ()
		{
			return this .coordNode;
		},
		set_attrib__: function ()
		{
			var attribNodes = this .getAttrib ();

			for (var i = 0, length = attribNodes .length; i < length; ++ i)
				attribNodes [i] .removeInterest ("requestRebuild", this);

			attribNodes .length = 0;

			for (var i = 0, length = this .attrib_ .length; i < length; ++ i)
			{
				var attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, this .attrib_ [i]);

				if (attribNode)
					attribNodes .push (attribNode);
			}

			for (var i = 0; i < this .attribNodes .length; ++ i)
				attribNodes [i] .addInterest ("requestRebuild", this);
		},
		set_color__: function ()
		{
			if (this .colorNode)
			{
				this .colorNode .removeInterest ("requestRebuild",    this);
				this .colorNode .removeInterest ("set_transparent__", this);
			}

			this .colorNode = X3DCast (X3DConstants .X3DColorNode, this .color_);

			if (this .colorNode)
			{
				this .colorNode .addInterest ("requestRebuild",    this);
				this .colorNode .addInterest ("set_transparent__", this);

				this .set_transparent__ ();
			}
			else
				this .transparent_ = false;
		},
		set_transparent__: function ()
		{
			this .transparent_ = this .colorNode .isTransparent ();
		},
		set_texCoord__: function ()
		{
			if (this .texCoordNode)
				this .texCoordNode .removeInterest ("requestRebuild", this);

			this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this .texCoord_);

			if (this .texCoordNode)
				this .texCoordNode .addInterest ("requestRebuild", this);

			this .setCurrentTexCoord (this .texCoordNode);
		},
		set_normal__: function ()
		{
			if (this .normalNode)
				this .normalNode .removeInterest ("requestRebuild", this);

			this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this .normal_);

			if (this .normalNode)
				this .normalNode .addInterest ("requestRebuild", this);
		},
		set_coord__: function ()
		{
			if (this .coordNode)
				this .coordNode .removeInterest ("requestRebuild", this);

			this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this .coord_);

			if (this .coordNode)
				this .coordNode .addInterest ("requestRebuild", this);
		},
		getPolygonIndex: function (index)
		{
			return index;
		},
		getTriangleIndex: function (index)
		{
			return index;
		},
		build: function (verticesPerPolygon, polygonsSize, verticesPerFace, trianglesSize)
		{
			if (! this .coordNode || this .coordNode .isEmpty ())
				return;

			// Set size to a multiple of verticesPerPolygon.

			polygonsSize  -= polygonsSize % verticesPerPolygon;
			trianglesSize -= trianglesSize % verticesPerFace;

			var
				colorPerVertex     = this .colorPerVertex_ .getValue (),
				normalPerVertex    = this .normalPerVertex_ .getValue (),
				attribNodes        = this .getAttrib (),
				numAttrib          = attribNodes .length,
				attribs            = this .getAttribs (),
				colorNode          = this .getColor (),
				texCoordNode       = this .getTexCoord (),
				normalNode         = this .getNormal (),
				coordNode          = this .getCoord (),
				colorArray         = this .getColors (),
				multiTexCoordArray = this .getMultiTexCoords (),
				normalArray        = this .getNormals (),
				vertexArray        = this .getVertices (),
				face               = 0;

			if (texCoordNode)
				texCoordNode .init (multiTexCoordArray);
		
			// Fill GeometryNode
		
			for (var i = 0; i < trianglesSize; ++ i)
			{
				face = Math .floor (i / verticesPerFace);

				var index = this .getPolygonIndex (this .getTriangleIndex (i));

				for (var a = 0; a < numAttrib; ++ a)
					attribNodes [a] .addValue (index, attribs [a]);

				if (colorNode)
				{
					if (colorPerVertex)
						colorNode .addColor (index, colorArray);
					else
						colorNode .addColor (face, colorArray);
				}

				if (texCoordNode)
					texCoordNode .addTexCoord (index, multiTexCoordArray);
	
				if (normalNode)
				{
					if (normalPerVertex)
						normalNode .addVector (index, normalArray);

					else
						normalNode .addVector (face, normalArray);
				}

				coordNode .addPoint (index, vertexArray);
			}
		
			// Autogenerate normal if not specified.

			if (! this .getNormal ())
				this .buildNormals (verticesPerPolygon, polygonsSize, trianglesSize);

			this .setSolid (this .solid_ .getValue ());
			this .setCCW (this .ccw_ .getValue ());
		},
		buildNormals: function (verticesPerPolygon, polygonsSize, trianglesSize)
		{
			var
				normals     = this .createNormals (verticesPerPolygon, polygonsSize),
				normalArray = this .getNormals ();

			for (var i = 0; i < trianglesSize; ++ i)
			{
				var normal = normals [this .getTriangleIndex (i)];

				normalArray .push (normal .x, normal .y, normal .z);
			}
		},
		createNormals: function (verticesPerPolygon, polygonsSize)
		{
			var normals = this .createFaceNormals (verticesPerPolygon, polygonsSize);
		
			if (this .normalPerVertex_ .getValue ())
			{
				var normalIndex = [ ];
		
				for (var i = 0; i < polygonsSize; ++ i)
				{
					var index = this .getPolygonIndex (i);

					if (! normalIndex [index])
						normalIndex [index] = [ ];

					normalIndex [index] .push (i);
				}

				return this .refineNormals (normalIndex, normals, Math .PI);
			}
		
			return normals;
		},
		createFaceNormals: function (verticesPerPolygon, polygonsSize)
		{
			var
				cw      = ! this .ccw_ .getValue (),
				coord   = this .coordNode,
				normals = [ ];

			for (var i = 0; i < polygonsSize; i += verticesPerPolygon)
			{
				var normal = this .getPolygonNormal (i, verticesPerPolygon, coord);

				if (cw)
					normal .negate ();

				for (var n = 0; n < verticesPerPolygon; ++ n)
					normals .push (normal);
			}

			return normals;
		},
		getPolygonNormal: function (index, verticesPerPolygon, coord)
		{

			// Determine polygon normal.
			// We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

			var normal = new Vector3 (0, 0, 0);

			coord .get1Point (this .getPolygonIndex (index), next);

			for (var i = 0; i < verticesPerPolygon; ++ i)
			{
				var tmp = current;
				current = next;
				next    = tmp;

				coord .get1Point (this .getPolygonIndex (index + (i + 1) % verticesPerPolygon), next);

				normal .x += (current .y - next .y) * (current .z + next .z);
				normal .y += (current .z - next .z) * (current .x + next .x);
				normal .z += (current .x - next .x) * (current .y + next .y);
			}

			return normal .normalize ();
		},
	});

	return X3DComposedGeometryNode;
});



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


define ('x_ite/Components/CADGeometry/IndexedQuadSet',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DComposedGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposedGeometryNode, 
          X3DConstants)
{
"use strict";

	// Define two triangles.
	var indexMap = [0, 1, 2,   0, 2, 3];

	function IndexedQuadSet (executionContext)
	{
		X3DComposedGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .IndexedQuadSet);
	}

	IndexedQuadSet .prototype = Object .assign (Object .create (X3DComposedGeometryNode .prototype),
	{
		constructor: IndexedQuadSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "index",           new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",           new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "IndexedQuadSet";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		getTriangleIndex: function (i)
		{
			var mod = i % 6;

			return (i - mod) / 6 * 4 + indexMap [mod];
		},
		getPolygonIndex: function (i)
		{
			return this .index_ [i];
		},
		build: function ()
		{
			var length = this .index_ .length;

			length -= length % 4;

			X3DComposedGeometryNode .prototype .build .call (this, 4, length, 6, length / 4 * 6);
		},
	});

	return IndexedQuadSet;
});



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


define ('x_ite/Components/CADGeometry/QuadSet',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Rendering/X3DComposedGeometryNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposedGeometryNode, 
          X3DConstants)
{
"use strict";

	// Define two triangles.
	var indexMap = [0, 1, 2,   0, 2, 3];

	function QuadSet (executionContext)
	{
		X3DComposedGeometryNode .call (this, executionContext);

		this .addType (X3DConstants .QuadSet);
	}

	QuadSet .prototype = Object .assign (Object .create (X3DComposedGeometryNode .prototype),
	{
		constructor: QuadSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",           new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "QuadSet";
		},
		getComponentName: function ()
		{
			return "CADGeometry";
		},
		getContainerField: function ()
		{
			return "geometry";
		},
		getTriangleIndex: function (i)
		{
			var mod = i % 6;

			return (i - mod) / 6 * 4 + indexMap [mod];
		},
		build: function ()
		{
			if (! this .getCoord ())
				return;

			var length = this .getCoord () .getSize ();
	
			length -= length % 4;

			X3DComposedGeometryNode .prototype .build .call (this, 4, length, 6, length / 4 * 6);
		},
		createNormals: function (verticesPerPolygon, polygonsSize)
		{
			return this .createFaceNormals (verticesPerPolygon, polygonsSize);
		},
	});

	return QuadSet;
});



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


require ([
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Components/CADGeometry/CADAssembly",
	"x_ite/Components/CADGeometry/CADFace",
	"x_ite/Components/CADGeometry/CADLayer",
	"x_ite/Components/CADGeometry/CADPart",
	"x_ite/Components/CADGeometry/IndexedQuadSet",
	"x_ite/Components/CADGeometry/QuadSet",
	"x_ite/Components/CADGeometry/X3DProductStructureChildNode",
],
function (SupportedNodes,
          CADAssembly,
          CADFace,
          CADLayer,
          CADPart,
          IndexedQuadSet,
          QuadSet,
          X3DProductStructureChildNode)
{
"use strict";

	var Types =
	{
		CADAssembly:    CADAssembly,
		CADFace:        CADFace,
		CADLayer:       CADLayer,
		CADPart:        CADPart,
		IndexedQuadSet: IndexedQuadSet,
		QuadSet:        QuadSet,
	};

	var AbstractTypes =
	{
		X3DProductStructureChildNode: X3DProductStructureChildNode,
	};

	for (var typeName in Types)
		SupportedNodes .addType (typeName, Types [typeName]); 

	for (var typeName in AbstractTypes)
		SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]); 

	return Types;
});


define("components/cad-geometry", function(){});


}());
