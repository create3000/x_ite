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
	"x_ite/Components/Rendering/X3DGeometryNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Matrix4",
],
function (X3DGeometryNode,
          X3DConstants,
          Matrix4)
{
"use strict";

	function X3DLineGeometryNode (executionContext)
	{
		X3DGeometryNode .call (this, executionContext);

		//this .addType (X3DConstants .X3DLineGeometryNode);
	}

	X3DLineGeometryNode .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
	{
		constructor: X3DLineGeometryNode,
		getShader: function (browser)
		{
			return browser .getLineShader ();
		},
		intersectsLine: function (line, clipPlanes, modelViewMatrix, intersections)
		{
			return false;
		},
		intersectsBox: function (box, clipPlanes, modelViewMatrix)
		{
			return false;
		},
		transfer: function ()
		{
			if (this .getGeometryType () === 1)
			{
				const
					texCoords = this .getTexCoords (),
					vertices  = this .getVertices ();

				this .getMultiTexCoords () .push (texCoords);

				for (var i = 0, length = vertices .length; i < length; i += 8)
				{
					texCoords .push (vertices [i],
					                 vertices [i + 1],
					                 vertices [i + 2],
					                 vertices [i + 3],
					                 vertices [i],
					                 vertices [i + 1],
					                 vertices [i + 2],
					                 vertices [i + 3]);
				}

				texCoords .shrinkToFit ();
			}

			X3DGeometryNode .prototype .transfer .call (this);
		},
		display: function (gl, context)
		{
			try
			{
				const
					browser        = context .browser,
					appearanceNode = context .shapeNode .getAppearance (),
					shaderNode     = appearanceNode .shaderNode || this .getShader (browser);

				if (shaderNode .getValid ())
				{
					const
						blendModeNode = appearanceNode .blendModeNode,
						attribNodes   = this .attribNodes,
						attribBuffers = this .attribBuffers;

					if (blendModeNode)
						blendModeNode .enable (gl);

					// Setup shader.

					shaderNode .enable (gl);
					shaderNode .setLocalUniforms (gl, context);

					// Setup vertex attributes.

					for (var i = 0, length = attribNodes .length; i < length; ++ i)
						attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

					if (this .fogCoords)
						shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer);

					if (this .colorMaterial)
						shaderNode .enableColorAttribute (gl, this .colorBuffer);

					if (this .getMultiTexCoords () .length)
						shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, true);

					shaderNode .enableVertexAttribute (gl, this .vertexBuffer);

					// Wireframes are always solid so only one drawing call is needed.

					gl .drawArrays (shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode, 0, this .vertexCount);

					for (var i = 0, length = attribNodes .length; i < length; ++ i)
						attribNodes [i] .disable (gl, shaderNode);

					if (this .fogCoords)
						shaderNode .disableFogDepthAttribute (gl);

					if (this .colorMaterial)
						shaderNode .disableColorAttribute (gl);

					shaderNode .disableTexCoordAttribute (gl);
					shaderNode .disable (gl);

					if (blendModeNode)
						blendModeNode .disable (gl);
				}
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
		displayParticles: function (gl, context, particles, numParticles)
		{
			try
			{
				const
					browser        = context .browser,
					appearanceNode = context .shapeNode .getAppearance (),
					shaderNode     = appearanceNode .shaderNode || this .getShader (browser);

				if (shaderNode .getValid ())
				{
					const
						blendModeNode = appearanceNode .blendModeNode,
						attribNodes   = this .attribNodes,
						attribBuffers = this .attribBuffers;

					if (blendModeNode)
						blendModeNode .enable (gl);

					// Setup shader.

					shaderNode .enable (gl);
					shaderNode .setLocalUniforms (gl, context);

					// Setup vertex attributes.

					for (var i = 0, length = attribNodes .length; i < length; ++ i)
						attribNodes [i] .enable (gl, shaderNode, attribBuffers [i]);

					if (this .fogCoords)
						shaderNode .enableFogDepthAttribute (gl, this .fogDepthBuffer);

					if (this .colorMaterial)
						shaderNode .enableColorAttribute (gl, this .colorBuffer);

					if (this .getMultiTexCoords () .length)
						shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers);

					shaderNode .enableVertexAttribute   (gl, this .vertexBuffer);

					// Wireframes are always solid so only one drawing call is needed.

					const
						modelViewMatrix = context .modelViewMatrix,
						x               = modelViewMatrix [12],
						y               = modelViewMatrix [13],
						z               = modelViewMatrix [14],
						primitiveMode   = shaderNode .primitiveMode === gl .POINTS ? gl .POINTS : this .primitiveMode;

					for (var p = 0; p < numParticles; ++ p)
					{
						modelViewMatrix [12] = x;
						modelViewMatrix [13] = y;
						modelViewMatrix [14] = z;

						Matrix4 .prototype .translate .call (modelViewMatrix, particles [p] .position);

						gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix, false, modelViewMatrix);

						gl .drawArrays (primitiveMode, 0, this .vertexCount);
					}

					for (var i = 0, length = attribNodes .length; i < length; ++ i)
						attribNodes [i] .disable (gl, shaderNode);

					if (this .fogCoords)
						shaderNode .disableFogDepthAttribute (gl);

					if (this .colorMaterial)
						shaderNode .disableColorAttribute (gl);

					shaderNode .disableTexCoordAttribute (gl);
					shaderNode .disable (gl);

					if (blendModeNode)
						blendModeNode .disable (gl);
				}
			}
			catch (error)
			{
				// Catch error from setLocalUniforms.
				console .log (error);
			}
		},
	});

	return X3DLineGeometryNode;
});
