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
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
],
function (X3DChildNode,
          X3DConstants,
          X3DCast,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

	function X3DTextureProjectorNode (executionContext)
	{
		X3DChildNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTextureProjectorNode);
	}

	X3DTextureProjectorNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
	{
		constructor: X3DTextureProjectorNode,
		initialize: function ()
		{
			X3DChildNode .prototype .initialize .call (this);

			this .texture_ .addInterest ("set_texture__", this);

			this .set_texture__ ();
		},
		getGlobal: function ()
		{
			return this .global_ .getValue ();
		},
		getLocation: function ()
		{
			return this .location_ .getValue ();
		},
		getDirection: function ()
		{
			return this .direction_ .getValue ();
		},
		getNearDistance: function ()
		{
			return this .nearDistance_ .getValue ();
		},
		getFarDistance: function ()
		{
			return this .farDistance_ .getValue ();
		},
		getTexture: function ()
		{
			return this .textureNode;
		},
		getBiasMatrix: (function ()
		{
			// Transforms normalized coords from range (-1, 1) to (0, 1).
			var biasMatrix = new Matrix4 (0.5, 0.0, 0.0, 0.0,
			                              0.0, 0.5, 0.0, 0.0,
			                              0.0, 0.0, 0.5, 0.0,
			                              0.5, 0.5, 0.5, 1.0);

			return function ()
			{
				return biasMatrix;
			};
		})(),
		set_texture__: function ()
		{
			if (this .textureNode)
				this .textureNode .removeInterest ("set_aspectRatio__", this);

			this .textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this .texture_);

			if (this .textureNode)
				this .textureNode .addInterest ("set_aspectRatio__", this);

			this .set_aspectRatio__ ();
		},
		set_aspectRatio__: function ()
		{
			if (this .textureNode)
				this .aspectRatio_ = this .textureNode .getWidth () / this .textureNode .getHeight ();
			else
				this .aspectRatio_ = 0;
		},
		straightenHorizon: (function ()
		{
			var
				localXAxis = new Vector3 (0, 0, 0),
				localZAxis = new Vector3 (0, 0, 0),
				rotation   = new Rotation4 (0, 0, 1, 0);

			return function (orientation)
			{
				orientation .multVecRot (localXAxis .assign (Vector3 .xAxis) .negate ());
				orientation .multVecRot (localZAxis .assign (Vector3 .zAxis));

				var vector = localZAxis .cross (this .upVector_ .getValue ());

				// If viewer looks along the up vector.
				if (vector .equals (Vector3 .Zero))
					return orientation;

				rotation .setFromToVec (localXAxis, vector);

				return orientation .multRight (rotation);
			};
		})(),
		push: function (renderObject)
		{
			if (this .on_ .getValue () && this .textureNode)
			{
				if (renderObject .isIndependent ())
				{
					var textureProjectorContainer = this .getTextureProjectors () .pop ();

					textureProjectorContainer .set (renderObject .getBrowser (),
					                                this,
					                                renderObject .getModelViewMatrix () .get ());

					if (this .global_ .getValue ())
					{
						renderObject .getGlobalTextureProjectors () .push (textureProjectorContainer);
						renderObject .getTextureProjectors ()       .push (textureProjectorContainer);
					}
					else
					{
						renderObject .getShaderObjects ()     .push (textureProjectorContainer);
						renderObject .getTextureProjectors () .push (textureProjectorContainer);
					}
				}
				else
				{
					var textureProjectorContainer = renderObject .getTextureProjectorContainer ();

					if (this .global_ .getValue ())
					{
						textureProjectorContainer .getModelViewMatrix () .pushMatrix (renderObject .getModelViewMatrix () .get ());

						renderObject .getGlobalTextureProjectors () .push (textureProjectorContainer);
						renderObject .getTextureProjectors ()       .push (textureProjectorContainer);
					}
					else
					{
						textureProjectorContainer .getModelViewMatrix () .pushMatrix (renderObject .getModelViewMatrix () .get ());

						renderObject .getShaderObjects ()     .push (textureProjectorContainer);
						renderObject .getTextureProjectors () .push (textureProjectorContainer);
					}
				}
			}
		},
		pop: function (renderObject)
		{
			if (this .on_ .getValue () && this .textureNode)
			{
				if (this .global_ .getValue ())
				   return;

				if (renderObject .isIndependent ())
					renderObject .getBrowser () .getShaderObjects () .push (renderObject .getShaderObjects () .pop ());
				else
					renderObject .getShaderObjects () .pop ();
			}
		},
	});

	return X3DTextureProjectorNode;
});
