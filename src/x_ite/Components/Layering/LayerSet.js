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
	"x_ite/Components/Core/X3DNode",
	"x_ite/Components/Layering/Layer",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/TraverseType",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          Layer,
          X3DCast,
          TraverseType,
          X3DConstants)
{
"use strict";

	function LayerSet (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .LayerSet);

		this .layerNodes      = [ new Layer (executionContext) ];
		this .layerNode0      = this .layerNodes [0];
		this .activeLayerNode = null;
	}

	LayerSet .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: LayerSet,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "activeLayer", new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "order",       new Fields .MFInt32 (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "layers",      new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LayerSet";
		},
		getComponentName: function ()
		{
			return "Layering";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DNode .prototype .initialize .call (this);

			this .layerNode0 .setPrivate (true);
			this .layerNode0 .setup ();
			this .layerNode0 .isLayer0 (true);

			this .activeLayer_ .addInterest ("set_activeLayer", this);
			this .order_       .addInterest ("set_layers", this);
			this .layers_      .addInterest ("set_layers", this);

			this .set_layers ();
		},
		getActiveLayer: function ()
		{
			return this .activeLayerNode;
		},
		setLayer0: function (value)
		{
			this .layerNode0 = value;

			this .set_layers ();
		},
		getLayer0: function ()
		{
			return this .layerNode0;
		},
		getLayers: function ()
		{
			return this .layerNodes;
		},
		set_activeLayer: function ()
		{
			if (this .activeLayer_ .getValue () === 0)
			{
				if (this .activeLayerNode !== this .layerNode0)
					this .activeLayerNode = this .layerNode0;
			}
			else
			{
				var index = this .activeLayer_ - 1;

				if (index >= 0 && index < this .layers_ .length)
				{
					if (this .activeLayerNode !== this .layers_ [index] .getValue ())
						this .activeLayerNode = X3DCast (X3DConstants .X3DLayerNode, this .layers_ [index]);
				}
				else
				{
					if (this .activeLayerNode !== null)
						this .activeLayerNode = null;
				}
			}
		},
		set_layers: function ()
		{
			var layers = this .layers_ .getValue ();

			this .layerNodes .length = 0;

			for (var i = 0; i < this .order_ .length; ++ i)
			{
				var index = this .order_ [i];

				if (index === 0)
					this .layerNodes .push (this .layerNode0);
					
				else
				{
					-- index;

					if (index >= 0 && index < layers .length)
					{
						var layerNode = X3DCast (X3DConstants .X3DLayerNode, layers [index]);

						if (layerNode)
							this .layerNodes .push (layerNode);
					}
				}
			}

			this .set_activeLayer ();
		},
		bind: function (viewpointName)
		{
			var layers = this .layers_ .getValue ();

			this .layerNode0 .bind (viewpointName);

			for (var i = 0, length = layers .length; i < length; ++ i)
			{
				var layerNode = X3DCast (X3DConstants .X3DLayerNode, layers [i]);

				if (layerNode)
					layerNode .bind (viewpointName);
			}
		},
		traverse: function (type, renderObject)
		{
			var layerNodes = this .layerNodes;

			if (type === TraverseType .POINTER)
			{
				for (var i = 0, length = layerNodes .length; i < length; ++ i)
				{
					this .getBrowser () .setLayerNumber (i);
					layerNodes [i] .traverse (type, renderObject);
				}
			}
			else
			{
				for (var i = 0, length = layerNodes .length; i < length; ++ i)
				{
					layerNodes [i] .traverse (type, renderObject);
				}
			}
		},
	});

	return LayerSet;
});


