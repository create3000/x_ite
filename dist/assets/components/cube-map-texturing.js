(function () {

	var
		define  = X3D .define,
		require = X3D .require,
		module  = { };
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


define ('x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode',[
	"x_ite/Components/Texturing/X3DTextureNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DTextureNode, 
          X3DConstants)
{
"use strict";

	function X3DEnvironmentTextureNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DEnvironmentTextureNode);
	}

	X3DEnvironmentTextureNode .prototype = Object .assign (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DEnvironmentTextureNode,
		initialize: function ()
		{
			X3DTextureNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			this .target = gl .TEXTURE_CUBE_MAP;

			this .targets = [
				gl .TEXTURE_CUBE_MAP_POSITIVE_Z, // Front
				gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, // Back
				gl .TEXTURE_CUBE_MAP_NEGATIVE_X, // Left
				gl .TEXTURE_CUBE_MAP_POSITIVE_X, // Right
				gl .TEXTURE_CUBE_MAP_POSITIVE_Y, // Top
				gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, // Bottom
			];
		},
		set_live__: function ()
		{
			if (this .isLive () .getValue ())
			{
				this .getBrowser () .getBrowserOptions () .TextureQuality_ .addInterest ("set_textureQuality__", this);
	
				this .set_textureQuality__ ();
			}
			else
				this .getBrowser () .getBrowserOptions () .TextureQuality_ .removeInterest ("set_textureQuality__", this);
		},
		set_textureQuality__: function ()
		{
			var textureProperties = this .getBrowser () .getDefaultTextureProperties ();

			this .updateTextureProperties (this .target, false, textureProperties, 128, 128, false, false, false);
		},
		getTarget: function ()
		{
			return this .target;
		},
		getTargets: function ()
		{
			return this .targets;
		},
		clearTexture: (function ()
		{
			var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

			return function ()
			{
				var
					gl      = this .getBrowser () .getContext (),
					targets = this .getTargets ();

				gl .bindTexture (this .getTarget (), this .getTexture ());

				for (var i = 0, length = targets .length; i < length; ++ i)
					gl .texImage2D (targets [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
			};
		})(),
		setShaderUniformsToChannel: function (gl, shaderObject, i)
		{
			gl .activeTexture (gl .TEXTURE0 + shaderObject .getBrowser () .getCubeMapTextureUnits () [i]);
			gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
			gl .uniform1i (shaderObject .x3d_TextureType [i], 4);
		},
	});

	return X3DEnvironmentTextureNode;
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


define ('x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
	"x_ite/Bits/X3DCast",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode,
          X3DCast,
          X3DConstants)
{
"use strict";

	function ComposedCubeMapTexture (executionContext)
	{
		X3DEnvironmentTextureNode .call (this, executionContext);

		this .addType (X3DConstants .ComposedCubeMapTexture);

		this .textures   = [null, null, null, null, null, null];
		this .loadStates = 0;
	}

	ComposedCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
	{
		constructor: ComposedCubeMapTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "front",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "back",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "left",     new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "right",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "bottom",   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "top",      new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ComposedCubeMapTexture";
		},
		getComponentName: function ()
		{
			return "CubeMapTexturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DEnvironmentTextureNode .prototype .initialize .call (this);

			// Upload default data.

			this .clearTexture ();

			// Initialize.

			this .isLive () .addInterest ("set_live__", this);

			this .front_  .addInterest ("set_texture__", this, 0);
			this .back_   .addInterest ("set_texture__", this, 1);
			this .left_   .addInterest ("set_texture__", this, 2);
			this .right_  .addInterest ("set_texture__", this, 3);
			this .top_    .addInterest ("set_texture__", this, 5);
			this .bottom_ .addInterest ("set_texture__", this, 4);

			this .set_texture__ (this .front_,  0);
			this .set_texture__ (this .back_,   1);
			this .set_texture__ (this .left_,   2);
			this .set_texture__ (this .right_,  3);
			this .set_texture__ (this .top_,    4);
			this .set_texture__ (this .bottom_, 5);

			this .set_live__ ();
		},
		set_texture__: function (node, index)
		{
			var texture = this .textures [index];

			if (texture)
			{
				var callbackName = "set_loadState__" + texture .getId () + "_" + index;

				texture .removeInterest ("set_loadState__", this);
				texture .loadState_ .removeFieldCallback (callbackName);
			}

			var texture = this .textures [index] = X3DCast (X3DConstants .X3DTexture2DNode, node);

			if (texture)
			{
				var callbackName = "set_loadState__" + texture .getId () + "_" + index;

				texture .addInterest ("set_loadState__", this, texture, index);
				texture .loadState_ .addFieldCallback (callbackName, this .set_loadState__ .bind (this, null, texture, index));
			}

			this .set_loadState__ (null, texture, index);
		},
		set_loadState__: function (output, texture, index)
		{
			if (texture)
				this .setLoadStateBit (texture .checkLoadState (), index);
			else
				this .setLoadStateBit (X3DConstants .NOT_STARTED, index);

			this .setTextures ();
		},
		setLoadStateBit: function (loadState, bit)
		{
			if (loadState === X3DConstants .COMPLETE_STATE)
				this .loadStates |= 1 << bit;
			else
				this .loadStates &= ~(1 << bit);
		},
		isComplete: function ()
		{
			if (this .loadStates !== 0x3f) // 0b111111
				return false;

			var
				textures = this .textures,
				size     = textures [0] .getWidth ();

			for (var i = 0; i < 6; ++ i)
			{
				var texture = textures [i];

				if (texture .getWidth () !== size)
					return false;

				if (texture .getHeight () !== size)
					return false;
			}

			return true;
		},
		setTextures: function ()
		{
			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (this .getTarget (), this .getTexture ());
			gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

			if (this .isComplete ())
			{
				var textures = this .textures;

				for (var i = 0; i < 6; ++ i)
				{
					var
						gl      = this .getBrowser () .getContext (),
						texture = textures [i],
						width   = texture .getWidth (),
						height  = texture .getHeight (),
						data    = texture .getData ();
	
					gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, !texture .getFlipY ());
					gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);

					if (data instanceof Uint8Array)
					{
						gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
					}
					else
					{
						gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, data);
					}
				}

				this .set_textureQuality__ ();
			}
			else
			{
				this .clearTexture ();
			}

			this .set_transparent__ ();
		},
		set_transparent__: function ()
		{
			var
				textures    = this .textures,
				transparent = false;

			if (this .isComplete ())
			{
				for (var i = 0; i < 6; ++ i)
				{
					if (textures [i] .transparent_ .getValue ())
					{
						transparent = true;
						break;
					}
				}
			}

			this .setTransparent (transparent);
		},
	});

	return ComposedCubeMapTexture;
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


define ('x_ite/Rendering/DependentRenderer',[
	"x_ite/Basic/X3DBaseNode",
	"x_ite/Rendering/X3DRenderObject",
	"x_ite/Bits/TraverseType",
],
function (X3DBaseNode,
          X3DRenderObject,
          TraverseType)
{
"use strict";

	function DependentRenderer (executionContext)
	{
		X3DBaseNode     .call (this, executionContext);
		X3DRenderObject .call (this, executionContext);

		this .renderObject = null;
	}

	DependentRenderer .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
		X3DRenderObject .prototype,
	{
		constructor: DependentRenderer,
		initialize: function ()
		{
			X3DBaseNode     .prototype .initialize .call (this);
			X3DRenderObject .prototype .initialize .call (this);
		},
		isIndependent: function ()
		{
			return false;
		},
		setRenderer: function (value)
		{
			this .renderObject = value;
		},
		getBrowser: function ()
		{
			return this .renderObject .getBrowser ();
		},
		getLayer: function ()
		{
			return this .renderObject .getLayer ();
		},
		getBackground: function ()
		{
			return this .renderObject .getBackground ();
		},
		getFog: function ()
		{
			return this .renderObject .getFog ();
		},
		getNavigationInfo: function ()
		{
			return this .renderObject .getNavigationInfo ();
		},
		getViewpoint: function ()
		{
			return this .renderObject .getViewpoint ();
		},
		getLightContainer: function ()
		{
			return this .renderObject .getLights () [this .lightIndex ++];
		},
		render: function (type, callback, group)
		{
			switch (type)
			{
				case TraverseType .COLLISION:
				{
					X3DRenderObject .prototype .render .call (this, type, callback, group);
					break;
				}
				case TraverseType .DEPTH:
				{
					X3DRenderObject .prototype .render .call (this, type, callback, group);
					break;
				}
				case TraverseType .DISPLAY:
				{
					this .lightIndex = 0;

					X3DRenderObject .prototype .render .call (this, type, callback, group);

					var lights = this .renderObject .getLights ();

					for (var i = 0, length = lights .length; i < length; ++ i)
						lights [i] .getModelViewMatrix () .pop ();

					break;
				}
			}
		},
	});

	return DependentRenderer;
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


define ('x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
	"x_ite/Rendering/DependentRenderer",
	"x_ite/Rendering/TextureBuffer",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/TraverseType",
	"standard/Math/Geometry/Camera",
	"standard/Math/Geometry/ViewVolume",
	"standard/Math/Numbers/Rotation4",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Vector4",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Algorithm",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode, 
          DependentRenderer, 
          TextureBuffer, 
          X3DConstants,
          TraverseType,
          Camera,
          ViewVolume,
          Rotation4,
          Vector3,
          Vector4,
          Matrix4,
          Algorithm)
{
"use strict";



	// Rotations to negated normals of the texture cube.

	var rotations = [
		new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0, -1)), // front
		new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  0,  1)), // back
		new Rotation4 (Vector3 .zAxis, new Vector3 ( 1,  0,  0)), // left
		new Rotation4 (Vector3 .zAxis, new Vector3 (-1,  0,  0)), // right
		new Rotation4 (Vector3 .zAxis, new Vector3 ( 0, -1,  0)), // top
		new Rotation4 (Vector3 .zAxis, new Vector3 ( 0,  1,  0)), // bottom
	];

	// Negated scales of the texture cube.

	var scales = [
		new Vector3 (-1, -1,  1), // front
		new Vector3 (-1, -1,  1), // back
		new Vector3 (-1, -1,  1), // left
		new Vector3 (-1, -1,  1), // right
		new Vector3 ( 1,  1,  1), // top
		new Vector3 ( 1,  1,  1), // bottom
	];

	var invCameraSpaceMatrix = new Matrix4 ();

	function GeneratedCubeMapTexture (executionContext)
	{
		X3DEnvironmentTextureNode .call (this, executionContext);

		this .addType (X3DConstants .GeneratedCubeMapTexture);

		this .renderer         = new DependentRenderer (executionContext);
		this .projectionMatrix = new Matrix4 ();
		this .modelMatrix      = new Matrix4 ();
		this .viewVolume       = new ViewVolume ();
	}

	GeneratedCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
	{
		constructor: GeneratedCubeMapTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "update",            new Fields .SFString ("NONE")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "size",              new Fields .SFInt32 (128)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "GeneratedCubeMapTexture";
		},
		getComponentName: function ()
		{
			return "CubeMapTexturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DEnvironmentTextureNode .prototype .initialize .call (this);

			this .renderer .setup ();

			// Transfer 6 textures of size x size pixels.

			var size = Algorithm .nextPowerOfTwo (this .size_ .getValue ());

			if (size > 0)
			{
				size = Algorithm .nextPowerOfTwo (size);

				// Upload default data.

				var
					gl          = this .getBrowser () .getContext (),
					defaultData = new Uint8Array (size * size * 4);
	
				gl .bindTexture (this .getTarget (), this .getTexture ());
	
				for (var i = 0; i < 6; ++ i)
					gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

				// Properties

				this .viewport    = new Vector4 (0, 0, size, size);
				this .frameBuffer = new TextureBuffer (this .getBrowser (), size, size);

				// Apply texture properties.

				this .isLive () .addInterest ("set_live__", this);

				this .set_live__ ();
			}
		},
		traverse: function (type, renderObject)
		{
			if (type !== TraverseType .DISPLAY)
				return;
		
			if (this .update_ .getValue () === "NONE")
				return;

			if (! this .frameBuffer)
				return;
		
			//if (renderObject .getBrowser () !== this .getBrowser ())
			//	return; // Could be interesting for four-side-view

			if (! renderObject .isIndependent ())
				return;

			renderObject .getGeneratedCubeMapTextures () .push (this);

			this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ()) .multRight (renderObject .getCameraSpaceMatrix () .get ());
		},
		renderTexture: function (renderObject, group)
		{
			this .renderer .setRenderer (renderObject);

			var
				renderer           = this .renderer,
				browser            = renderObject .getBrowser (),
				layer              = renderObject .getLayer (),
				gl                 = browser .getContext (),
				background         = renderer .getBackground (),
				navigationInfo     = renderer .getNavigationInfo (),
				viewpoint          = renderer .getViewpoint (),
				headlightContainer = browser .getHeadlight (),
				headlight          = navigationInfo .headlight_ .getValue (),
				nearValue          = navigationInfo .getNearValue (),
				farValue           = navigationInfo .getFarValue (viewpoint),
				projectionMatrix   = Camera .perspective (Algorithm .radians (90.0), nearValue, farValue, 1, 1, this .projectionMatrix);

			this .setTransparent (background .getTransparent ());

			this .frameBuffer .bind ();

			renderer .getViewVolumes      () .push (this .viewVolume .set (projectionMatrix, this .viewport, this .viewport));
			renderer .getProjectionMatrix () .pushMatrix (projectionMatrix);

			gl .bindTexture (this .getTarget (), this .getTexture ());
			gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

			for (var i = 0; i < 6; ++ i)
			{
				gl .clear (gl .COLOR_BUFFER_BIT); // Always clear, X3DBackground could be transparent!

				// Setup inverse texture space matrix.

				renderer .getCameraSpaceMatrix () .pushMatrix (this .modelMatrix);
				renderer .getCameraSpaceMatrix () .rotate (rotations [i]);
				renderer .getCameraSpaceMatrix () .scale (scales [i]);

				try
				{
					renderer .getInverseCameraSpaceMatrix () .pushMatrix (invCameraSpaceMatrix .assign (renderer .getCameraSpaceMatrix () .get ()) .inverse ());
				}
				catch (error)
				{
					console .log (error);

					renderer .getInverseCameraSpaceMatrix () .pushMatrix (Matrix4 .Identity);
				}

				renderer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);

				// Setup headlight if enabled.

				if (headlight)
				{
					headlightContainer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);
					headlightContainer .getModelViewMatrix () .multLeft (viewpoint .getCameraSpaceMatrix ());
				}

				// Render layer's children.

				layer .traverse (TraverseType .DISPLAY, renderer);

				// Pop matrices.

				if (headlight)
					headlightContainer .getModelViewMatrix () .pop ();

				renderer .getModelViewMatrix          () .pop ();
				renderer .getCameraSpaceMatrix        () .pop ();
				renderer .getInverseCameraSpaceMatrix () .pop ();

				// Transfer image.

				var
					data   = this .frameBuffer .readPixels (),
					width  = this .frameBuffer .getWidth (),
					height = this .frameBuffer .getHeight ();

				gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
			}

			this .set_textureQuality__ ();

			renderer .getProjectionMatrix () .pop ();
			renderer .getViewVolumes      () .pop ();

			this .frameBuffer .unbind ();

			if (this .update_ .getValue () === "NEXT_FRAME_ONLY")
				this .update_ = "NONE";
		},
	});

	return GeneratedCubeMapTexture;
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


define ('x_ite/Components/CubeMapTexturing/ImageCubeMapTexture',[
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
	"x_ite/Components/Networking/X3DUrlObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Networking/urls",
	"standard/Networking/URI",
	"standard/Math/Numbers/Vector2",
	"standard/Math/Algorithm",
	"x_ite/DEBUG",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DEnvironmentTextureNode, 
          X3DUrlObject, 
          X3DConstants,
          urls,
          URI,
          Vector2,
          Algorithm,
          DEBUG)
{
"use strict";

   var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

	var offsets = [
		new Vector2 (1, 1), // Front
		new Vector2 (3, 1), // Back
		new Vector2 (0, 1), // Left
		new Vector2 (2, 1), // Right
		new Vector2 (1, 0), // Bottom, must be exchanged with top
		new Vector2 (1, 2), // Top, must be exchanged with bottom
	];

	function ImageCubeMapTexture (executionContext)
	{
		X3DEnvironmentTextureNode .call (this, executionContext);
		X3DUrlObject .call (this, executionContext);

		this .addType (X3DConstants .ImageCubeMapTexture);

		this .urlStack = new Fields .MFString ();
	}

	ImageCubeMapTexture .prototype = Object .assign (Object .create (X3DEnvironmentTextureNode .prototype),
		X3DUrlObject .prototype,
	{
		constructor: ImageCubeMapTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "url",               new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ImageCubeMapTexture";
		},
		getComponentName: function ()
		{
			return "CubeMapTexturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DEnvironmentTextureNode .prototype .initialize .call (this);
			X3DUrlObject              .prototype .initialize .call (this);

			// Upload default data.

			var gl = this .getBrowser () .getContext ();

			gl .bindTexture (this .getTarget (), this .getTexture ());

			for (var i = 0; i < 6; ++ i)
				gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

			// Initialize.

			this .url_ .addInterest ("set_url__", this);

			this .canvas = $("<canvas></canvas>");

			this .image = $("<img></img>");
			this .image .on ("load", this .setImage .bind (this));
			this .image .on ("error", this .setError .bind (this));
			this .image .bind ("abort", this .setError .bind (this));

			this .image [0] .crossOrigin = "Anonymous";

			this .requestAsyncLoad ();
		},
		set_url__: function ()
		{
			this .setLoadState (X3DConstants .NOT_STARTED_STATE);

			this .requestAsyncLoad ();
		},
		requestAsyncLoad: function ()
		{
			if (this .checkLoadState () === X3DConstants .COMPLETE_STATE || this .checkLoadState () === X3DConstants .IN_PROGRESS_STATE)
				return;

			this .setLoadState (X3DConstants .IN_PROGRESS_STATE);

			this .urlStack .setValue (this .url_);
			this .loadNext ();
		},
		loadNext: function ()
		{
			if (this .urlStack .length === 0)
			{
				this .clearTexture ();
				this .setLoadState (X3DConstants .FAILED_STATE);
				return;
			}

			// Get URL.

			this .URL = new URI (this .urlStack .shift ());
			this .URL = this .getExecutionContext () .getURL () .transform (this .URL);
			// In Firefox we don't need getRelativePath if file scheme, do we in Chrome???

			this .image .attr ("src", this .URL);
		},
		setError: function ()
		{
			var URL = this .URL .toString ();

			if (DEBUG)
			{
				if (! (this .URL .isLocal () || this .URL .host === "localhost"))
				{
					if (! URL .match (urls .getFallbackExpression ()))
						this .urlStack .unshift (urls .getFallbackUrl (URL));
				}
			}

			if (this .URL .scheme !== "data")
				console .warn ("Error loading image:", this .URL .toString ());

			this .loadNext ();
		},
		setImage: function ()
		{
			if (DEBUG)
			{
				 if (this .URL .scheme !== "data")
			   	console .info ("Done loading image cube map texture:", this .URL .toString ());
			}

			try
			{
				var
				   image     = this .image [0],
					width     = image .width,
					height    = image .height,
					width1_4  = Math .floor (width / 4),
					height1_3 = Math .floor (height / 3);

				var
					canvas = this .canvas [0],
					cx     = canvas .getContext ("2d");

				// Scale image.

				if (! Algorithm .isPowerOfTwo (width1_4) || ! Algorithm .isPowerOfTwo (height1_3) || width1_4 * 4 !== width || height1_3 * 3 !== height)
				{
					width1_4  = Algorithm .nextPowerOfTwo (width1_4);
					height1_3 = Algorithm .nextPowerOfTwo (height1_3);
					width     = width1_4  * 4;
					height    = height1_3 * 3;

					canvas .width  = width;
					canvas .height = height;

					cx .drawImage (image, 0, 0, image .width, image .height, 0, 0, width, height);
				}
				else
				{
					canvas .width  = width;
					canvas .height = height;

					cx .drawImage (image, 0, 0);
				}

				// Extract images.

				var
					gl     = this .getBrowser () .getContext (),
					opaque = true;

				gl .bindTexture (this .getTarget (), this .getTexture ());
				gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

				for (var i = 0; i < 6; ++ i)
				{
					var data = cx .getImageData (offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3) .data;
	
					// Determine image alpha.
	
					if (opaque)
					{
						for (var a = 3; a < data .length; a += 4)
						{
							if (data [a] !== 255)
							{
								opaque = false;
								break;
							}
						}
					}

					// Transfer image.
	
					gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width1_4, height1_3, false, gl .RGBA, gl .UNSIGNED_BYTE, new Uint8Array (data));
				}

				this .set_textureQuality__ ();

				// Update transparent field.

				this .setTransparent (! opaque);

				// Update load state.

				this .setLoadState (X3DConstants .COMPLETE_STATE);
			}
			catch (error)
			{
				// Catch security error from cross origin requests.
				console .log (error .message);
				this .setError ();
			}
		},
	});

	return ImageCubeMapTexture;
});



/*******************************************************************************
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
	"x_ite/Components",
	"x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture",
	"x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture",
	"x_ite/Components/CubeMapTexturing/ImageCubeMapTexture",
	"x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode",
],
function (Components,
          ComposedCubeMapTexture,
          GeneratedCubeMapTexture,
          ImageCubeMapTexture,
          X3DEnvironmentTextureNode)
{
"use strict";

	Components .addComponent ({
		name: "CubeMapTexturing",
		types:
		{
			ComposedCubeMapTexture:  ComposedCubeMapTexture,
			GeneratedCubeMapTexture: GeneratedCubeMapTexture,
			ImageCubeMapTexture:     ImageCubeMapTexture,
		},
		abstractTypes:
		{
			X3DEnvironmentTextureNode: X3DEnvironmentTextureNode,
		},
	});
});



}());
