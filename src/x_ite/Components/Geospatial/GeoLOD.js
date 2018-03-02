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
	"x_ite/Components/Geospatial/X3DGeospatialObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"x_ite/Components/Grouping/Group",
	"x_ite/Components/Networking/Inline",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode, 
          X3DBoundedObject, 
          X3DGeospatialObject, 
          X3DConstants,
          TraverseType,
          Group,
          Inline,
          Vector3,
          Matrix4,
          Box3)
{
"use strict";

	var center = new Vector3 (0, 0, 0);

	function GeoLOD (executionContext)
	{
		X3DChildNode        .call (this, executionContext);
		X3DBoundedObject    .call (this, executionContext);
		X3DGeospatialObject .call (this, executionContext);

		this .addType (X3DConstants .GeoLOD);

		this .range_ .setUnit ("length");

		this .rootGroup        = new Group (this .getBrowser () .getPrivateScene ());
		this .rootInline       = new Inline (executionContext);
		this .child1Inline     = new Inline (executionContext);
		this .child2Inline     = new Inline (executionContext);
		this .child3Inline     = new Inline (executionContext);
		this .child4Inline     = new Inline (executionContext);
		this .childrenLoaded   = false;
		this .childBBox        = new Box3 ();
		this .keepCurrentLevel = false;
		this .modelViewMatrix  = new Matrix4 ();
	}

	GeoLOD .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
		X3DGeospatialObject .prototype,
	{
		constructor: GeoLOD,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoOrigin",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "geoSystem",     new Fields .MFString ("GD", "WE")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rootUrl",       new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child1Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child2Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child3Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "child4Url",     new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "center",        new Fields .SFVec3d ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "range",         new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "level_changed", new Fields .SFInt32 (-1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rootNode",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "children",      new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeoLOD";
		},
		getComponentName: function ()
		{
			return "Geospatial";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DChildNode        .prototype .initialize .call (this);
			X3DBoundedObject    .prototype .initialize .call (this);
			X3DGeospatialObject .prototype .initialize .call (this);

			this .rootNode_ .addFieldInterest (this .rootGroup .children_);
		
			this .rootGroup .children_ = this .rootNode_;
			this .rootGroup .setPrivate (true);
			this .rootGroup .setup ();
		
			this .rootInline   .loadState_ .addInterest ("set_rootLoadState__", this);
			this .child1Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child2Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child3Inline .loadState_ .addInterest ("set_childLoadState__", this);
			this .child4Inline .loadState_ .addInterest ("set_childLoadState__", this);
		
			this .rootUrl_   .addFieldInterest (this .rootInline   .url_);
			this .child1Url_ .addFieldInterest (this .child1Inline .url_);
			this .child2Url_ .addFieldInterest (this .child2Inline .url_);
			this .child3Url_ .addFieldInterest (this .child3Inline .url_);
			this .child4Url_ .addFieldInterest (this .child4Inline .url_);
		
			this .rootInline   .load_ = true;
			this .child1Inline .load_ = false;
			this .child2Inline .load_ = false;
			this .child3Inline .load_ = false;
			this .child4Inline .load_ = false;
		
			this .rootInline   .url_ = this .rootUrl_;
			this .child1Inline .url_ = this .child1Url_;
			this .child2Inline .url_ = this .child2Url_;
			this .child3Inline .url_ = this .child3Url_;
			this .child4Inline .url_ = this .child4Url_;
		
			this .rootInline   .setup ();
			this .child1Inline .setup ();
			this .child2Inline .setup ();
			this .child3Inline .setup ();
			this .child4Inline .setup ();
		},
		getBBox: function (bbox) 
		{
			if (this .bboxSize_ .getValue () .equals (this .defaultBBoxSize))
			{
				var level = this .level_changed_ .getValue ();

				switch (this .childrenLoaded ? level : 0)
				{
					case 0:
					{
						if (this .rootNode_ .length)
							return this .rootGroup .getBBox (bbox);

						return this .rootInline .getBBox (bbox);
					}
					case 1:
					{
						bbox .set ();
						
						bbox .add (this .child1Inline .getBBox (this .childBBox));
						bbox .add (this .child2Inline .getBBox (this .childBBox));
						bbox .add (this .child3Inline .getBBox (this .childBBox));
						bbox .add (this .child4Inline .getBBox (this .childBBox));
		
						return bbox;
					}
				}

				return bbox .set ();
			}

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		set_rootLoadState__: function ()
		{
			if (this .level_changed_ .getValue () !== 0)
				return;
		
			if (this .rootNode_ .length)
				return;
		
			if (this .rootInline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				this .children_      = this .rootInline .getInternalScene () .getRootNodes ();
				this .childrenLoaded = false;
			}
		},
		set_childLoadState__: function ()
		{
			if (this .level_changed_ .getValue () !== 1)
				return;
	
			var loaded = 0;

			if (this .child1Inline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				var rootNodes = this .child1Inline .getInternalScene () .getRootNodes ();

				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					this .children_ .push (rootNodes [i]);

				++ loaded;
			}
			else if (this .child1Inline .url_ .length === 0)
				++ loaded;
	
			if (this .child2Inline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				var rootNodes = this .child2Inline .getInternalScene () .getRootNodes ();

				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					this .children_ .push (rootNodes [i]);

				++ loaded;
			}
			else if (this .child2Inline .url_ .length === 0)
				++ loaded;
	
			if (this .child3Inline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				var rootNodes = this .child3Inline .getInternalScene () .getRootNodes ();

				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					this .children_ .push (rootNodes [i]);

				++ loaded;
			}
			else if (this .child3Inline .url_ .length === 0)
				++ loaded;
	
			if (this .child4Inline .checkLoadState () === X3DConstants .COMPLETE_STATE)
			{
				var rootNodes = this .child4Inline .getInternalScene () .getRootNodes ();

				for (var i = 0, length = rootNodes .length; i < length; ++ i)
					this .children_ .push (rootNodes [i]);

				++ loaded;
			}
			else if (this .child4Inline .url_ .length === 0)
				++ loaded;

			if (loaded === 4)
				this .childrenLoaded = true;
		},
		getLevel: function (modelViewMatrix)
		{
			var distance = this .getDistance (modelViewMatrix);
		
			if (distance < this .range_ .getValue ())
				return 1;
		
			return 0;
		},
		getDistance: function (modelViewMatrix)
		{
			modelViewMatrix .translate (this .getCoord (this .center_ .getValue (), center));

			return modelViewMatrix .origin .abs ();
		},
		traverse: function (type, renderObject)
		{
			if (type == TraverseType .DISPLAY)
			{
				var level = this .getLevel (this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ()));
			
				if (level !== this .level_changed_ .getValue ())
				{
					this .level_changed_ = level;
			
					switch (level)
					{
						case 0:
						{
							if (this .rootNode_ .length)
							{
								this .children_      = this .rootNode_;
								this .childrenLoaded = false;
							}
							else
							{
								if (this .rootInline .checkLoadState () == X3DConstants .COMPLETE_STATE)
								{
									this .children_      = this .rootInline .getInternalScene () .getRootNodes ();
									this .childrenLoaded = false;
								}
							}
			
							this .child1Inline .load_ = false;
							this .child2Inline .load_ = false;
							this .child3Inline .load_ = false;
							this .child4Inline .load_ = false;
							break;
						}
						case 1:
						{
							this .child1Inline .load_ = true;
							this .child2Inline .load_ = true;
							this .child3Inline .load_ = true;
							this .child4Inline .load_ = true;
							break;
						}
					}
				}
			}

			switch (this .childrenLoaded ? this .level_changed_ .getValue () : 0)
			{
				case 0:
				{
					if (this .rootNode_ .length)
						this .rootGroup .traverse (type, renderObject);
					else
						this .rootInline .traverse (type, renderObject);
		
					break;
				}
				case 1:
				{
					this .child1Inline .traverse (type, renderObject);
					this .child2Inline .traverse (type, renderObject);
					this .child3Inline .traverse (type, renderObject);
					this .child4Inline .traverse (type, renderObject);
					break;
				}
			}
		},
	});

	return GeoLOD;
});


