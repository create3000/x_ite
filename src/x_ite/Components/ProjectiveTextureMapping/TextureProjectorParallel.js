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
	"x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Geometry/Camera",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Matrix4",
	"standard/Utility/ObjectCache",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureProjectorNode,
          X3DConstants,
          Camera,
          Vector3,
          Rotation4,
          Matrix4,
          ObjectCache)
{
"use strict";

	var TextureProjectorParallelCache = ObjectCache (TextureProjectorParallelContainer);

	function TextureProjectorParallelContainer ()
	{
		this .projectionMatrix                = new Matrix4 ();
		this .modelViewMatrix                 = new Matrix4 ();
		this .modelMatrix                     = new Matrix4 ();
		this .invTextureSpaceMatrix           = new Matrix4 ();
		this .location                        = new Vector3 (0, 0, 0);
		this .locationArray                   = new Float32Array (3);
		this .invTextureSpaceProjectionMatrix = new Matrix4 ();
		this .direction                       = new Vector3 (0, 0, 0);
		this .rotation                        = new Rotation4 ();
		this .projectiveTextureMatrix         = new Matrix4 ();
		this .projectiveTextureMatrixArray    = new Float32Array (16);
	}

	TextureProjectorParallelContainer .prototype =
	{
		constructor: TextureProjectorParallelContainer,
		set: function (browser, textureProjectorNode, modelViewMatrix)
		{
			this .browser              = browser;
			this .textureProjectorNode = textureProjectorNode;

			this .modelViewMatrix .assign (modelViewMatrix);
		},
		getModelViewMatrix: function ()
		{
			return this .modelViewMatrix;
		},
		setGlobalVariables: function (renderObject)
		{
			try
			{
				var
					textureProjectorNode  = this .textureProjectorNode,
					cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
					modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
					invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

				this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
				textureProjectorNode .straightenHorizon (this .rotation);

				invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
				invTextureSpaceMatrix .rotate (this .rotation);
				invTextureSpaceMatrix .inverse ();

				var
					width        = textureProjectorNode .getTexture () .getWidth (),
					height       = textureProjectorNode .getTexture () .getHeight (),
					aspect       = width / height,
					minimumX     = textureProjectorNode .getMinimumX (),
					maximumX     = textureProjectorNode .getMaximumX (),
					minimumY     = textureProjectorNode .getMinimumY (),
					maximumY     = textureProjectorNode .getMaximumY (),
					sizeX        = textureProjectorNode .getSizeX (),
					sizeY        = textureProjectorNode .getSizeY (),
					nearDistance = textureProjectorNode .getNearDistance (),
					farDistance  = textureProjectorNode .getFarDistance ();

				if (aspect > sizeX / sizeY)
				{
					var
						center  = (minimumX + maximumX) / 2,
						size1_2 = (sizeY * aspect) / 2;

					Camera .ortho (center - size1_2, center + size1_2, minimumY, maximumY, nearDistance, farDistance, this .projectionMatrix);
				}
				else
				{
					var
						center  = (minimumY + maximumY) / 2,
						size1_2 = (sizeX / aspect) / 2;

					Camera .ortho (minimumX, maximumX, center - size1_2, center + size1_2, nearDistance, farDistance, this .projectionMatrix);
				}

				if (! textureProjectorNode .getGlobal ())
					invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

				this .invTextureSpaceProjectionMatrix .assign (invTextureSpaceMatrix) .multRight (this .projectionMatrix) .multRight (textureProjectorNode .getBiasMatrix ());

				this .projectiveTextureMatrix .assign (cameraSpaceMatrix) .multRight (this .invTextureSpaceProjectionMatrix);
				this .projectiveTextureMatrixArray .set (this .projectiveTextureMatrix);

				this .modelViewMatrix .multVecMatrix (this .location .assign (textureProjectorNode .location_ .getValue ()));
				this .locationArray .set (this .location);
			}
			catch (error)
			{
				console .log (error);
			}
		},
		setShaderUniforms: function (gl, shaderObject)
		{
			var i = shaderObject .numProjectiveTextures ++;

			if (shaderObject .hasTextureProjector (i, this))
				return;

			var
				textureProjectorNode = this .textureProjectorNode,
				texture              = textureProjectorNode .getTexture ();

			gl .activeTexture (gl .TEXTURE0 + this .browser .getProjectiveTextureUnits () [i]);
			gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
			gl .activeTexture (gl .TEXTURE0);

			gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
			gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
		},
		dispose: function ()
		{
			TextureProjectorParallelCache .push (this);
		},
	};

	function TextureProjectorParallel (executionContext)
	{
		X3DTextureProjectorNode .call (this, executionContext);

		this .addType (X3DConstants .TextureProjectorParallel);

		this .fieldOfView_ .setUnit ("length");
	}

	TextureProjectorParallel .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
	{
		constructor: TextureProjectorParallel,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "description",  new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "on",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "global",       new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "location",     new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "direction",    new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "upVector",     new Fields .SFVec3f (0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView" , new Fields .MFFloat (-1, -1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",  new Fields .SFFloat (10)),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "aspectRatio",  new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "texture",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "TextureProjectorParallel";
		},
		getComponentName: function ()
		{
			return "ProjectiveTextureMapping";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DTextureProjectorNode .prototype .initialize .call (this);

			this .fieldOfView_ .addInterest ("set_fieldOfView___", this);

			this .set_fieldOfView___ ();
		},
		getMinimumX: function ()
		{
			return this .minimumX;
		},
		getMinimumY: function ()
		{
			return this .minimumY;
		},
		getMaximumX: function ()
		{
			return this .maximumX;
		},
		getMaximumY: function ()
		{
			return this .maximumY;
		},
		getSizeX: function ()
		{
			return this .sizeX;
		},
		getSizeY: function ()
		{
			return this .sizeY;
		},
		getTextureProjectors: function ()
		{
			return TextureProjectorParallelCache;
		},
		set_fieldOfView___: function ()
		{
			var length = this .fieldOfView_ .length;

			this .minimumX = (length > 0 ? this .fieldOfView_ [0] : -1);
			this .minimumY = (length > 1 ? this .fieldOfView_ [1] : -1);
			this .maximumX = (length > 2 ? this .fieldOfView_ [2] :  1);
			this .maximumY = (length > 3 ? this .fieldOfView_ [3] :  1);

			this .sizeX = this .maximumX - this .minimumX;
			this .sizeY = this .maximumY - this .minimumY;
		},
	});

	return TextureProjectorParallel;
});
