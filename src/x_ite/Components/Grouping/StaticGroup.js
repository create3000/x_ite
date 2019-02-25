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
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Components/Grouping/Group",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/ViewVolume",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          X3DBoundedObject, 
          Group,
          X3DConstants,
          TraverseType,
          Box3,
          ViewVolume)
{
"use strict";

	// No support for X3DBindableNode nodes, local lights. X3DLocalFog, local ClipPlane nodes, LOD, Billboard, Switch node.

	function StaticGroup (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .StaticGroup);

		this .group             = new Group (this .getExecutionContext ());
		this .collisionShapes   = null;
		this .depthShapes       = null;
		this .opaqueShapes      = null;
		this .transparentShapes = null;
		this .bbox              = new Box3 ();
	}

	StaticGroup .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: StaticGroup,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",   new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "children",   new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "StaticGroup";
		},
		getComponentName: function ()
		{
			return "Grouping";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			this .bboxSize_   .addFieldInterest (this .group .bboxSize_);
			this .bboxCenter_ .addFieldInterest (this .group .bboxCenter_);
			this .children_   .addFieldInterest (this .group .children_);

			this .group .bboxSize_   = this .bboxSize_;
			this .group .bboxCenter_ = this .bboxCenter_;
			this .group .children_   = this .children_;
			this .group .setPrivate (true);
			this .group .setup ();

			// Connect after Group setup.
			this .group .isCameraObject_   .addFieldInterest (this .isCameraObject_);
			this .group .isPickableObject_ .addFieldInterest (this .isPickableObject_);
			this .group .children_         .addInterest ("set_children__", this);

			this .setCameraObject   (this .group .getCameraObject ());
			this .setPickableObject (this .group .getPickableObject ());

			this .set_children__ ();
		},
		getBBox: function (bbox)
		{
			return bbox .assign (this .bbox);
		},
		set_children__: function ()
		{
			this .group .getBBox (this .bbox);

			this .collisionShapes   = null;
			this .depthShapes       = null;
			this .opaqueShapes      = null;
			this .transparentShapes = null;
		},
		traverse: (function ()
		{
			var viewVolume = new ViewVolume ();

			viewVolume .intersectsSphere = function () { return true; };

			return function (type, renderObject)
			{
				switch (type)
				{
					case TraverseType .CAMERA:
					{
						break;
					}
					case TraverseType .POINTER:
					case TraverseType .COLLISION:
					{
						if (! this .collisionShapes)
						{
							//console .log ("Rebuilding StaticGroup collisionShapes");

							var
								viewVolumes         = renderObject .getViewVolumes (),
								viewport            = renderObject .getViewport (),
								projectionMatrix    = renderObject .getProjectionMatrix (),
								modelViewMatrix     = renderObject .getModelViewMatrix (),
								firstCollisionShape = renderObject .getNumCollisionShapes ();
				
							viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));
	
							modelViewMatrix .push ();
							modelViewMatrix .identity ();
	
							this .group .traverse (type, renderObject);
	
							modelViewMatrix .pop ();
							viewVolumes     .pop ();

							var lastCollisionShape = renderObject .getNumCollisionShapes ();

							this .collisionShapes = renderObject .getCollisionShapes () .splice (firstCollisionShape, lastCollisionShape - firstCollisionShape);

							renderObject .setNumCollisionShapes (firstCollisionShape);
						}

						var
							collisionShapes = this .collisionShapes,
							modelViewMatrix = renderObject .getModelViewMatrix ();

						for (var i = 0, length = collisionShapes .length; i < length; ++ i)
						{
							var collisionShape = collisionShapes [i];

							modelViewMatrix .push ();
							modelViewMatrix .multLeft (collisionShape .modelViewMatrix);
							collisionShape .shapeNode .traverse (type, renderObject);
							modelViewMatrix .pop ();
						}

						break;
					}
					case TraverseType .DEPTH:
					{
						if (! this .depthShapes)
						{
							//console .log ("Rebuilding StaticGroup depthShapes");

							var
								viewVolumes      = renderObject .getViewVolumes (),
								viewport         = renderObject .getViewport (),
								projectionMatrix = renderObject .getProjectionMatrix (),
								modelViewMatrix  = renderObject .getModelViewMatrix (),
								firstDepthShape  = renderObject .getNumDepthShapes ();
				
							viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));
	
							modelViewMatrix .push ();
							modelViewMatrix .identity ();
	
							this .group .traverse (type, renderObject);
	
							modelViewMatrix .pop ();
							viewVolumes     .pop ();

							var lastDepthShape = renderObject .getNumDepthShapes ();

							this .depthShapes = renderObject .getDepthShapes () .splice (firstDepthShape, lastDepthShape - firstDepthShape);

							renderObject .setNumDepthShapes (firstDepthShape);
						}

						var
							depthShapes     = this .depthShapes,
							modelViewMatrix = renderObject .getModelViewMatrix ();

						for (var i = 0, length = depthShapes .length; i < length; ++ i)
						{
							var depthShape = depthShapes [i];

							modelViewMatrix .push ();
							modelViewMatrix .multLeft (depthShape .modelViewMatrix);
							depthShape .shapeNode .traverse (type, renderObject);
							modelViewMatrix .pop ();
						}

						break;
					}
					case TraverseType .DISPLAY:
					{
						if (! this .opaqueShapes)
						{
							//console .log ("Rebuilding StaticGroup opaqueShapes and transparentShapes");

							var
								viewVolumes           = renderObject .getViewVolumes (),
								viewport              = renderObject .getViewport (),
								projectionMatrix      = renderObject .getProjectionMatrix (),
								modelViewMatrix       = renderObject .getModelViewMatrix (),
								firstOpaqueShape      = renderObject .getNumOpaqueShapes (),
								firstTransparentShape = renderObject .getNumTransparentShapes ();
				
							viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));
	
							modelViewMatrix .push ();
							modelViewMatrix .identity ();
	
							this .group .traverse (type, renderObject);
	
							modelViewMatrix .pop ();
							viewVolumes     .pop ();

							var
								lastOpaqueShape      = renderObject .getNumOpaqueShapes (),
								lastTransparentShape = renderObject .getNumTransparentShapes ();

							this .opaqueShapes      = renderObject .getOpaqueShapes () .splice (firstOpaqueShape, lastOpaqueShape - firstOpaqueShape);
							this .transparentShapes = renderObject .getTransparentShapes () .splice (firstTransparentShape, lastTransparentShape - firstTransparentShape);

							renderObject .setNumOpaqueShapes (firstOpaqueShape);
							renderObject .setNumTransparentShapes (firstTransparentShape);
						}

						var
							opaqueShapes      = this .opaqueShapes,
							transparentShapes = this .transparentShapes,
							modelViewMatrix   = renderObject .getModelViewMatrix ();

						for (var i = 0, length = opaqueShapes .length; i < length; ++ i)
						{
							var opaqueShape = opaqueShapes [i];

							modelViewMatrix .push ();
							modelViewMatrix .multLeft (opaqueShape .modelViewMatrix);
							opaqueShape .shapeNode .traverse (type, renderObject);
							modelViewMatrix .pop ();
						}

						for (var i = 0, length = transparentShapes .length; i < length; ++ i)
						{
							var transparentShape = transparentShapes [i];

							modelViewMatrix .push ();
							modelViewMatrix .multLeft (transparentShape .modelViewMatrix);
							transparentShape .shapeNode .traverse (type, renderObject);
							modelViewMatrix .pop ();
						}

						break;
					}
				}
			};
		})(),
	});

	return StaticGroup;
});
