/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Appearance        from "../../Components/Shape/Appearance.js";
import PointProperties   from "../../Components/Shape/PointProperties.js";
import LineProperties    from "../../Components/Shape/LineProperties.js";
import UnlitMaterial     from "../../Components/Shape/UnlitMaterial.js";
import ImageTexture      from "../../Components/Texturing/ImageTexture.js";
import TextureProperties from "../../Components/Texturing/TextureProperties.js";
import URLs              from "../Networking/URLs.js";
import Matrix3           from "../../../standard/Math/Numbers/Matrix3.js";
import Matrix4           from "../../../standard/Math/Numbers/Matrix4.js";

const
   _linetypeTextures                  = Symbol (),
   _hatchStyleTextures                = Symbol (),
   _defaultAppearance                 = Symbol (),
   _defaultPointProperties            = Symbol (),
   _defaultLineProperties             = Symbol (),
   _defaultMaterial                   = Symbol (),
   _lineFillTextureProperties         = Symbol (),
   _lineTransformShaderNode           = Symbol (),
   _lineTransformInstancedShaderNode0 = Symbol (),
   _lineTransformInstancedShaderNode1 = Symbol (),
   _lineTransformFeedback             = Symbol (),
   _defaultInstanceMatrices           = Symbol ();

function X3DShapeContext ()
{
   this [_hatchStyleTextures] = [ ];
}

Object .assign (X3DShapeContext .prototype,
{
   getDefaultAppearance ()
   {
      this [_defaultAppearance] = new Appearance (this .getPrivateScene ());
      this [_defaultAppearance] .setPrivate (true);
      this [_defaultAppearance] .setup ();

      this .getDefaultAppearance = function () { return this [_defaultAppearance]; };

      Object .defineProperty (this, "getDefaultAppearance", { enumerable: false });

      return this [_defaultAppearance];
   },
   getLineStippleScale ()
   {
      return 1 / (this .getPixelsPerPoint () * 32); // 32px
   },
   getDefaultPointProperties ()
   {
      this [_defaultPointProperties] = new PointProperties (this .getPrivateScene ());
      this [_defaultPointProperties] .setPrivate (true);
      this [_defaultPointProperties] .setup ();

      this .getDefaultPointProperties = function () { return this [_defaultPointProperties]; };

      Object .defineProperty (this, "getDefaultPointProperties", { enumerable: false });

      return this [_defaultPointProperties];
   },
   getDefaultLineProperties ()
   {
      this [_defaultLineProperties] = new LineProperties (this .getPrivateScene ());
      this [_defaultLineProperties] ._applied = false;
      this [_defaultLineProperties] .setPrivate (true);
      this [_defaultLineProperties] .setup ();

      this .getDefaultLineProperties = function () { return this [_defaultLineProperties]; };

      Object .defineProperty (this, "getDefaultLineProperties", { enumerable: false });

      return this [_defaultLineProperties];
   },
   getDefaultMaterial ()
   {
      this [_defaultMaterial] = new UnlitMaterial (this .getPrivateScene ());
      this [_defaultMaterial] .setPrivate (true);
      this [_defaultMaterial] .setup ();

      this .getDefaultMaterial = function () { return this [_defaultMaterial]; };

      Object .defineProperty (this, "getDefaultMaterial", { enumerable: false });

      return this [_defaultMaterial];
   },
   getLinetypeTexture ()
   {
      this [_linetypeTextures] = new ImageTexture (this .getPrivateScene ());
      this [_linetypeTextures] ._url [0]           = URLs .getLinetypeURL ();
      this [_linetypeTextures] ._textureProperties = this .getLineFillTextureProperties ();
      this [_linetypeTextures] .setPrivate (true);
      this [_linetypeTextures] .setup ();

      this .getLinetypeTexture = function () { return this [_linetypeTextures]; };

      Object .defineProperty (this, "getLinetypeTexture", { enumerable: false });

      return this [_linetypeTextures];
   },
   getHatchStyleTexture (index)
   {
      let hatchStyleTexture = this [_hatchStyleTextures] [index];

      if (hatchStyleTexture)
         return hatchStyleTexture;

      hatchStyleTexture = this [_hatchStyleTextures] [index] = new ImageTexture (this .getPrivateScene ());

      hatchStyleTexture ._url [0]           = URLs .getHatchingURL (index);
      hatchStyleTexture ._textureProperties = this .getLineFillTextureProperties ();
      hatchStyleTexture .setPrivate (true);
      hatchStyleTexture .setup ();

      return hatchStyleTexture;
   },
   getLineFillTextureProperties ()
   {
      this [_lineFillTextureProperties] = new TextureProperties (this .getPrivateScene ());
      this [_lineFillTextureProperties] ._minificationFilter  = "NEAREST_PIXEL";
      this [_lineFillTextureProperties] ._magnificationFilter = "NEAREST_PIXEL";
      this [_lineFillTextureProperties] ._textureCompression  = "DEFAULT";
      this [_lineFillTextureProperties] .setPrivate (true);
      this [_lineFillTextureProperties] .setup ();

      this .getLineFillTextureProperties = function () { return this [_lineFillTextureProperties]; };

      Object .defineProperty (this, "getLineFillTextureProperties", { enumerable: false });

      return this [_lineFillTextureProperties];
   },
   getLineTransformShader ()
   {
      this [_lineTransformShaderNode] = this .createLineTransformShader (0, false);

      this .getLineTransformShader = function () { return this [_lineTransformShaderNode]; };

      Object .defineProperty (this, "getLineTransformShader", { enumerable: false });

      return this [_lineTransformShaderNode];
   },
   getLineTransformInstancedShader0 ()
   {
      this [_lineTransformInstancedShaderNode0] = this .createLineTransformShader (0, true);

      this .getLineTransformInstancedShader0 = function () { return this [_lineTransformInstancedShaderNode0]; };

      Object .defineProperty (this, "getLineTransformInstancedShader0", { enumerable: false });

      return this [_lineTransformInstancedShaderNode0];
   },
   getLineTransformInstancedShader1 ()
   {
      this [_lineTransformInstancedShaderNode1] = this .createLineTransformShader (1, true);

      this .getLineTransformInstancedShader1 = function () { return this [_lineTransformInstancedShaderNode1]; };

      Object .defineProperty (this, "getLineTransformInstancedShader1", { enumerable: false });

      return this [_lineTransformInstancedShaderNode1];
   },
   createLineTransformShader (pass, instanced)
   {
      const options = [`X3D_PASS_${pass}`];

      if (instanced)
         options .push ("X3D_INSTANCING");

      const uniformNames = [
         [
            "viewport",
            "modelViewProjectionMatrix",
            "invModelViewProjectionMatrix",
            "linewidthScaleFactor1_2",
         ],
         [ ],
      ]
      [pass];

      const transformFeedbackVaryings = [
         [
            "coordIndex0", "lineStipple0", "fogDepth0", "color0", "normal0", "vertex0",
            "coordIndex1", "lineStipple1", "fogDepth1", "color1", "normal1", "vertex1",
            "coordIndex2", "lineStipple2", "fogDepth2", "color2", "normal2", "vertex2",
         ],
         [
            "instanceMatrix0", "instanceNormalMatrix0",
            "instanceMatrix1", "instanceNormalMatrix1",
            "instanceMatrix2", "instanceNormalMatrix2",
         ],
      ]
      [pass];

      return this .createShader (`LineTransform${instanced ? "Instanced" : ""}`, "LineTransform", "LineTransform", options, uniformNames, transformFeedbackVaryings);
   },
   getLineTransformFeedback ()
   {
      const gl = this .getContext ();

      this [_lineTransformFeedback] = gl .createTransformFeedback ();

      this .getLineTransformFeedback = function () { return this [_lineTransformFeedback]; };

      Object .defineProperty (this, "getLineTransformFeedback", { enumerable: false });

      return this [_lineTransformFeedback];
   },
   getDefaultInstanceMatrices ()
   {
      const
         gl   = this .getContext (),
         data = new Float32Array ([... Matrix4 .Identity, ... Matrix3 .Identity]);

      this [_defaultInstanceMatrices] = gl .createBuffer ();

      gl .bindBuffer (gl .ARRAY_BUFFER, this [_defaultInstanceMatrices]);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .STATIC_DRAW);

      this .getDefaultInstanceMatrices = function () { return this [_defaultInstanceMatrices]; };

      Object .defineProperty (this, "getDefaultInstanceMatrices", { enumerable: false });

      return this [_defaultInstanceMatrices];
   },
});

export default X3DShapeContext;
