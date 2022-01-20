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
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture3DNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function ComposedTexture3D (executionContext)
	{
		X3DTexture3DNode .call (this, executionContext);

		this .addType (X3DConstants .ComposedTexture3D);

		this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));

		this .textureNodes = [ ];
	}

	ComposedTexture3D .prototype = Object .assign (Object .create (X3DTexture3DNode .prototype),
	{
		constructor: ComposedTexture3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",           new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "ComposedTexture3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture3DNode .prototype .initialize .call (this);

			this .texture_ .addInterest ("set_texture__", this);

			this .set_texture__ ();
		},
		checkLoadState: function ()
		{
			return this .loadState_ .getValue ();
		},
		set_texture__: function ()
		{
			var textureNodes = this .textureNodes;

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				textureNodes [i] .removeInterest ("update", this);

			textureNodes .length = 0;

			for (var i = 0, length = this .texture_ .length; i < length; ++ i)
			{
				var textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this .texture_ [i]);

				if (textureNode)
					textureNodes .push (textureNode);
			}

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				textureNodes [i] .addInterest ("update", this);

			this .update ();
		},
		update: function ()
		{
			var
				textureNodes = this .textureNodes,
				complete     = 0;

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				complete += textureNodes [i] .checkLoadState () === X3DConstants .COMPLETE_STATE;

			if (textureNodes .length === 0 || complete !== textureNodes .length)
			{
				this .clearTexture ();

				this .loadState_ = X3DConstants .FAILED_STATE;
			}
			else
			{
				var
					gl           = this .getBrowser () .getContext (),
					textureNode0 = textureNodes [0],
					width        = textureNode0 .getWidth (),
					height       = textureNode0 .getHeight (),
					depth        = textureNodes .length,
					transparent  = 0,
					size         = width * height * 4,
					data         = new Uint8Array (size * depth);

				for (var i = 0, d = 0; i < depth; ++ i)
				{
					var
						textureNode = this .textureNodes [i],
						tData       = textureNode .getData ();

					transparent += textureNode .getTransparent ();

					for (var t = 0; t < size; ++ t, ++ d)
					{
						data [d] = tData [t];
					}
				}

				this .setTexture (width, height, depth, !! transparent, gl .RGBA, data);
				this .loadState_ = X3DConstants .COMPLETE_STATE;
			}
		},
	});

	return ComposedTexture3D;
});
