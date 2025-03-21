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

const
   _linetypeTextures                 = Symbol (),
   _hatchStyleTextures               = Symbol (),
   _defaultAppearance                = Symbol (),
   _defaultPointProperties           = Symbol (),
   _defaultLineProperties            = Symbol (),
   _defaultMaterial                  = Symbol (),
   _lineFillTextureProperties        = Symbol (),
   _lineTransformShaderNode          = Symbol (),
   _lineTransformInstancedShaderNode = Symbol (),
   _lineTransformFeedback            = Symbol ();

function X3DShapeContext ()
{
   this [_lineTransformInstancedShaderNode] = [ ];
   this [_hatchStyleTextures]               = [ ];
}

Object .assign (X3DShapeContext .prototype,
{
   getDefaultAppearance ()
   {
      return this [_defaultAppearance] ??= (() =>
      {
         const defaultAppearance = new Appearance (this .getPrivateScene ());

         defaultAppearance .setPrivate (true);
         defaultAppearance .setup ();

         return defaultAppearance;
      })();
   },
   getLineStippleScale ()
   {
      return 1 / (this .getRenderingProperty ("PixelsPerPoint") * 32); // 32px
   },
   getDefaultPointProperties ()
   {
      return this [_defaultPointProperties] ??= (() =>
      {
         const defaultPointProperties = new PointProperties (this .getPrivateScene ());

         defaultPointProperties .setPrivate (true);
         defaultPointProperties .setup ();

         return defaultPointProperties;
      })();
   },
   getDefaultLineProperties ()
   {
      return this [_defaultLineProperties] ??= (() =>
      {
         const defaultLineProperties = new LineProperties (this .getPrivateScene ());

         defaultLineProperties ._applied = false;
         defaultLineProperties .setPrivate (true);
         defaultLineProperties .setup ();

         return defaultLineProperties;
      })();
   },
   getDefaultMaterial ()
   {
      return this [_defaultMaterial] ??= (() =>
      {
         const defaultMaterial = new UnlitMaterial (this .getPrivateScene ());

         defaultMaterial .setPrivate (true);
         defaultMaterial .setup ();

         return defaultMaterial;
      })();
   },
   getLinetypeTexture ()
   {
      return this [_linetypeTextures] ??= (() =>
      {
         const linetypeTextures = new ImageTexture (this .getPrivateScene ());

         linetypeTextures ._url [0]           = URLs .getLinetypeURL ();
         linetypeTextures ._textureProperties = this .getLineFillTextureProperties ();
         linetypeTextures .setPrivate (true);
         linetypeTextures .setup ();

         return linetypeTextures;
      })();
   },
   getHatchStyleTexture (index)
   {
      return this [_hatchStyleTextures] [index] ??= (() =>
      {
         const hatchStyleTexture = new ImageTexture (this .getPrivateScene ());

         hatchStyleTexture ._url [0]           = URLs .getHatchingURL (index);
         hatchStyleTexture ._textureProperties = this .getLineFillTextureProperties ();
         hatchStyleTexture .setPrivate (true);
         hatchStyleTexture .setup ();

         return hatchStyleTexture;
      })();
   },
   getLineFillTextureProperties ()
   {
      return this [_lineFillTextureProperties] ??= (() =>
      {
         const lineFillTextureProperties = new TextureProperties (this .getPrivateScene ());

         lineFillTextureProperties ._minificationFilter  = "NEAREST_PIXEL";
         lineFillTextureProperties ._magnificationFilter = "NEAREST_PIXEL";
         lineFillTextureProperties ._textureCompression  = "DEFAULT";
         lineFillTextureProperties .setPrivate (true);
         lineFillTextureProperties .setup ();

         return lineFillTextureProperties;
      })();
   },
   getLineTransformShader ()
   {
      return this [_lineTransformShaderNode] ??= this .createLineTransformShader (0, false);
   },
   getLineTransformInstancedShader (pass)
   {
      return this [_lineTransformInstancedShaderNode] [pass] ??= this .createLineTransformShader (pass, true);
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
         [ ],
      ]
      [pass];

      const transformFeedbackVaryings = [
         [
            "coordIndex0", "lineStipple0", "fogDepth0", "color0", "vertex0",
            "coordIndex1", "lineStipple1", "fogDepth1", "color1", "vertex1",
            "coordIndex2", "lineStipple2", "fogDepth2", "color2", "vertex2",
         ],
         [
            "instanceMatrix0",
            "instanceMatrix1",
            "instanceMatrix2",
         ],
         [
            "instanceNormalMatrix0", "tangent0", "normal0",
            "instanceNormalMatrix1", "tangent1", "normal1",
            "instanceNormalMatrix2", "tangent2", "normal2",
         ],
      ]
      [pass];

      return this .createShader (`LineTransform${instanced ? "Instanced" : ""}`, "LineTransform", "LineTransform", options, uniformNames, transformFeedbackVaryings);
   },
   getLineTransformFeedback ()
   {
      return this [_lineTransformFeedback] ??= (() =>
      {
         const gl = this .getContext ();

         const lineTransformFeedback = gl .createTransformFeedback ();

         return lineTransformFeedback;
      })();
   },
});

export default X3DShapeContext;
