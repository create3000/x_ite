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
   "x_ite/Browser/Shaders/ShaderSource",
   "text!assets/shaders/Types.glsl",
   "x_ite/Browser/Texturing/MultiTextureModeType",
   "x_ite/Browser/Texturing/MultiTextureSourceType",
   "x_ite/Browser/Texturing/MultiTextureFunctionType",
   "x_ite/Browser/Texturing/TextureCoordinateGeneratorModeType",
],
function (ShaderSource,
          Types,
          MultiTextureModeType,
          MultiTextureSourceType,
          MultiTextureFunctionType,
          TextureCoordinateGeneratorModeType)
{
"use strict";

   const Shader =
   {
      getShaderSource: function (browser, name, source, options)
      {
         const gl = browser .getContext ();

         source = ShaderSource .get (gl, source);

         const
            COMMENTS = "\\s+|/\\*[^]*?\\*/|//.*?\\n",
            VERSION  = "#version\\s+.*?\\n",
            ANY      = "[^]*";

         const
            GLSL  = new RegExp ("^((?:" + COMMENTS + ")?(?:" + VERSION + ")?)(" + ANY + ")$"),
            match = source .match (GLSL);

         if (! match)
            return source;

         let constants = "";

         constants += "#define X_ITE\n";

         if (browser .getRenderingProperty ("LogarithmicDepthBuffer"))
            constants += "#define X3D_LOGARITHMIC_DEPTH_BUFFER\n";

         if (gl .getVersion () >= 2 || gl .getExtension ("WEBGL_depth_texture"))
            constants += "#define X3D_DEPTH_TEXTURE\n";

         if (browser .getMultiTexturing ())
            constants += "#define X3D_MULTI_TEXTURING\n";

         if (browser .getProjectiveTextureMapping ())
            constants += "#define X3D_PROJECTIVE_TEXTURE_MAPPING\n";

         for (const option of options)
            constants += "#define " + option + "\n";

         let definitions = "";

         definitions += "#define x3d_None 0\n";

         definitions += "#define x3d_Points      0\n";
         definitions += "#define x3d_Lines       1\n";
         definitions += "#define x3d_Geometry2D  2\n";
         definitions += "#define x3d_Geometry3D  3\n";

         definitions += "#define x3d_MaxClipPlanes  " + browser .getMaxClipPlanes () + "\n";

         definitions += "#define x3d_LinearFog        1\n";
         definitions += "#define x3d_ExponentialFog   2\n";
         definitions += "#define x3d_Exponential2Fog  3\n";

         definitions += "#define x3d_MaxLights         " + browser .getMaxLights () + "\n";
         definitions += "#define x3d_DirectionalLight  1\n";
         definitions += "#define x3d_PointLight        2\n";
         definitions += "#define x3d_SpotLight         3\n";

         definitions += "#define x3d_MaxTextures      " + browser .getMaxTextures () + "\n";
         definitions += "#define x3d_TextureType2D    2\n";
         definitions += "#define x3d_TextureType3D    3\n";
         definitions += "#define x3d_TextureTypeCube  4\n";

         definitions += "#define x3d_Replace                   " + MultiTextureModeType .REPLACE                   + "\n";
         definitions += "#define x3d_Modulate                  " + MultiTextureModeType .MODULATE                  + "\n";
         definitions += "#define x3d_Modulate2X                " + MultiTextureModeType .MODULATE2X                + "\n";
         definitions += "#define x3d_Modulate4X                " + MultiTextureModeType .MODULATE4X                + "\n";
         definitions += "#define x3d_Add                       " + MultiTextureModeType .ADD                       + "\n";
         definitions += "#define x3d_AddSigned                 " + MultiTextureModeType .ADDSIGNED                 + "\n";
         definitions += "#define x3d_AddSigned2X               " + MultiTextureModeType .ADDSIGNED2X               + "\n";
         definitions += "#define x3d_AddSmooth                 " + MultiTextureModeType .ADDSMOOTH                 + "\n";
         definitions += "#define x3d_Subtract                  " + MultiTextureModeType .SUBTRACT                  + "\n";
         definitions += "#define x3d_BlendDiffuseAlpha         " + MultiTextureModeType .BLENDDIFFUSEALPHA         + "\n";
         definitions += "#define x3d_BlendTextureAlpha         " + MultiTextureModeType .BLENDTEXTUREALPHA         + "\n";
         definitions += "#define x3d_BlendFactorAlpha          " + MultiTextureModeType .BLENDFACTORALPHA          + "\n";
         definitions += "#define x3d_BlendCurrentAlpha         " + MultiTextureModeType .BLENDCURRENTALPHA         + "\n";
         definitions += "#define x3d_ModulateAlphaAddColor     " + MultiTextureModeType .MODULATEALPHA_ADDCOLOR    + "\n";
         definitions += "#define x3d_ModulateInvAlphaAddColor  " + MultiTextureModeType .MODULATEINVALPHA_ADDCOLOR + "\n";
         definitions += "#define x3d_ModulateInvColorAddAlpha  " + MultiTextureModeType .MODULATEINVCOLOR_ADDALPHA + "\n";
         definitions += "#define x3d_DotProduct3               " + MultiTextureModeType .DOTPRODUCT3               + "\n";
         definitions += "#define x3d_SelectArg1                " + MultiTextureModeType .SELECTARG1                + "\n";
         definitions += "#define x3d_SelectArg2                " + MultiTextureModeType .SELECTARG2                + "\n";
         definitions += "#define x3d_Off                       " + MultiTextureModeType .OFF                       + "\n";

         definitions += "#define x3d_Diffuse  " + MultiTextureSourceType .DIFFUSE  + "\n";
         definitions += "#define x3d_Specular " + MultiTextureSourceType .SPECULAR + "\n";
         definitions += "#define x3d_Factor   " + MultiTextureSourceType .FACTOR   + "\n";

         definitions += "#define x3d_Complement     " + MultiTextureFunctionType .COMPLEMENT     + "\n";
         definitions += "#define x3d_AlphaReplicate " + MultiTextureFunctionType .ALPHAREPLICATE + "\n";

         definitions += "#define x3d_Sphere                      " + TextureCoordinateGeneratorModeType .SPHERE                      + "\n";
         definitions += "#define x3d_CameraSpaceNormal           " + TextureCoordinateGeneratorModeType .CAMERASPACENORMAL           + "\n";
         definitions += "#define x3d_CameraSpacePosition         " + TextureCoordinateGeneratorModeType .CAMERASPACEPOSITION         + "\n";
         definitions += "#define x3d_CameraSpaceReflectionVector " + TextureCoordinateGeneratorModeType .CAMERASPACEREFLECTIONVECTOR + "\n";
         definitions += "#define x3d_SphereLocal                 " + TextureCoordinateGeneratorModeType .SPHERE_LOCAL                + "\n";
         definitions += "#define x3d_Coord                       " + TextureCoordinateGeneratorModeType .COORD                       + "\n";
         definitions += "#define x3d_CoordEye                    " + TextureCoordinateGeneratorModeType .COORD_EYE                   + "\n";
         definitions += "#define x3d_Noise                       " + TextureCoordinateGeneratorModeType .NOISE                       + "\n";
         definitions += "#define x3d_NoiseEye                    " + TextureCoordinateGeneratorModeType .NOISE_EYE                   + "\n";
         definitions += "#define x3d_SphereReflect               " + TextureCoordinateGeneratorModeType .SPHERE_REFLECT              + "\n";
         definitions += "#define x3d_SphereReflectLocal          " + TextureCoordinateGeneratorModeType .SPHERE_REFLECT_LOCAL        + "\n";

         // Legacy
         definitions += "#define x3d_GeometryPoints  0\n";
         definitions += "#define x3d_GeometryLines   1\n";
         definitions += "#define x3d_NoneClipPlane   vec4 (88.0, 51.0, 68.0, 33.0)\n"; // ASCII »X3D!«
         definitions += "#define x3d_NoneFog         0\n";
         definitions += "#define x3d_NoneLight       0\n";
         definitions += "#define x3d_NoneTexture     0\n";

         depreciatedWarning (source, "x3d_GeometryPoints", "x3d_Points");
         depreciatedWarning (source, "x3d_GeometryLines",  "x3d_Lines");
         depreciatedWarning (source, "x3d_NoneClipPlane",  "x3d_NumClipPlanes");
         depreciatedWarning (source, "x3d_NoneFog",        "x3d_None");
         depreciatedWarning (source, "x3d_NoneLight",      "x3d_NumLights");
         depreciatedWarning (source, "x3d_NoneTexture",    "x3d_NumTextures");

         // Adjust precision of struct types;

         const
            matchFloat       = source .match (/\s*precision\s+(lowp|mediump|highp)\s+float\s*;/),
            matchInt         = source .match (/\s*precision\s+(lowp|mediump|highp)\s+int\s*;/),
            precisionFloat   = matchFloat ? matchFloat [1] : "mediump",
            precisionInt     = matchInt   ? matchInt   [1] : "mediump";

         const types = Types
            .replace (/mediump\s+(float|vec2|vec3|mat3|mat4)/g, precisionFloat + " $1")
            .replace (/mediump\s+(int)/g,                       precisionInt   + " $1");

         const lines = (match [1] .match (/\n/g) || [ ]) .length + 1;

         return match [1] + constants + definitions + types + "#line " + lines + "\n" + match [2];
      },
   };

   function depreciatedWarning (source, depreciated, current)
   {
      if (source .indexOf (depreciated) === -1)
         return;

      console .warn ("Use of '" + depreciated + "' is depreciated, use '" + current + "' instead. See https://create3000.github.io/x_ite/Custom-Shaders.html.");
   }

   return Shader;
});
