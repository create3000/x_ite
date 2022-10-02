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
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "x_ite/Components/Navigation/OrthoViewpoint",
   "standard/Math/Numbers/Matrix3",
   "standard/Math/Numbers/Matrix4",
],
function (X3DCast,
          X3DConstants,
          OrthoViewpoint,
          Matrix3,
          Matrix4)
{
"use strict";

   const _uniformLocation = Symbol .for ("X3DField.uniformLocation");

   function X3DProgrammableShaderObject (executionContext)
   {
      this .addType (X3DConstants .X3DProgrammableShaderObject);

      this .x3d_ClipPlane                           = [ ];
      this .x3d_LightType                           = [ ];
      this .x3d_LightOn                             = [ ];
      this .x3d_LightColor                          = [ ];
      this .x3d_LightIntensity                      = [ ];
      this .x3d_LightAmbientIntensity               = [ ];
      this .x3d_LightAttenuation                    = [ ];
      this .x3d_LightLocation                       = [ ];
      this .x3d_LightDirection                      = [ ];
      this .x3d_LightBeamWidth                      = [ ];
      this .x3d_LightCutOffAngle                    = [ ];
      this .x3d_LightRadius                         = [ ];
      this .x3d_LightMatrix                         = [ ];
      this .x3d_ShadowIntensity                     = [ ];
      this .x3d_ShadowColor                         = [ ];
      this .x3d_ShadowBias                          = [ ];
      this .x3d_ShadowMatrix                        = [ ];
      this .x3d_ShadowMapSize                       = [ ];
      this .x3d_ShadowMap                           = [ ];
      this .x3d_Textures                            = [ ];
      this .x3d_MultiTextureMode                    = [ ];
      this .x3d_MultiTextureAlphaMode               = [ ];
      this .x3d_MultiTextureSource                  = [ ];
      this .x3d_MultiTextureFunction                = [ ];
      this .x3d_TextureCoordinateGeneratorMode      = [ ];
      this .x3d_TextureCoordinateGeneratorParameter = [ ];
      this .x3d_ProjectiveTexture                   = [ ];
      this .x3d_ProjectiveTextureMatrix             = [ ];
      this .x3d_ProjectiveTextureLocation           = [ ];
      this .x3d_TexCoord                            = [ ];
      this .x3d_TextureMatrix                       = [ ];

      this .numClipPlanes               = 0;
      this .fogNode                     = null;
      this .numLights                   = 0;
      this .numGlobalLights             = 0;
      this .lightNodes                  = [ ];
      this .numProjectiveTextures       = 0;
      this .numGlobalProjectiveTextures = 0;
      this .projectiveTextureNodes      = [ ];
      this .textures                    = new Set ();
      this .attributes                  = new Set ();
      this .divisors                    = new Set ();
   }

   X3DProgrammableShaderObject .prototype =
   {
      constructor: X3DProgrammableShaderObject,
      initialize: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         this .x3d_MaxClipPlanes = browser .getMaxClipPlanes ();
         this .x3d_MaxLights     = browser .getMaxLights ();
         this .x3d_MaxTextures   = browser .getMaxTextures ();

         this .particleMatrixBuffer = gl .createBuffer ();

         gl .bindBuffer (gl .ARRAY_BUFFER, this .particleMatrixBuffer);
         gl .bufferData (gl .ARRAY_BUFFER, new Float32Array (Matrix4 .Identity), gl .STATIC_READ);
      },
      canUserDefinedFields: function ()
      {
         return true;
      },
      bindAttributeLocations: function (gl, program)
      {
         gl .bindAttribLocation (program, 0, "x3d_Vertex");
      },
      getDefaultUniforms: function ()
      {
         // Get uniforms and attributes.

         const
            browser = this .getBrowser (),
            gl      = browser .getContext (),
            program = this .getProgram ();

         /*
          * Uniforms.
          */

         this .x3d_LogarithmicFarFactor1_2 = gl .getUniformLocation (program, "x3d_LogarithmicFarFactor1_2");

         this .x3d_GeometryType  = gl .getUniformLocation (program, "x3d_GeometryType");
         this .x3d_NumClipPlanes = gl .getUniformLocation (program, "x3d_NumClipPlanes");

         this .x3d_ClipPlanes = gl .getUniformLocation (program, "x3d_ClipPlane");

         for (let i = 0; i < this .x3d_MaxClipPlanes; ++ i)
            this .x3d_ClipPlane [i] = gl .getUniformLocation (program, "x3d_ClipPlane[" + i + "]");

         this .x3d_FogType            = this .getUniformLocation (gl, program, "x3d_Fog.type",            "x3d_FogType");
         this .x3d_FogColor           = this .getUniformLocation (gl, program, "x3d_Fog.color",           "x3d_FogColor");
         this .x3d_FogVisibilityRange = this .getUniformLocation (gl, program, "x3d_Fog.visibilityRange", "x3d_FogVisibilityRange");
         this .x3d_FogMatrix          = this .getUniformLocation (gl, program, "x3d_Fog.matrix",          "x3d_FogMatrix");
         this .x3d_FogCoord           = this .getUniformLocation (gl, program, "x3d_Fog.fogCoord",        "x3d_FogCoord");

         this .x3d_AlphaCutoff = gl .getUniformLocation (program, "x3d_AlphaCutoff");

         this .x3d_PointPropertiesPointSizeScaleFactor = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeScaleFactor");
         this .x3d_PointPropertiesPointSizeMinValue    = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeMinValue");
         this .x3d_PointPropertiesPointSizeMaxValue    = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeMaxValue");
         this .x3d_PointPropertiesPointSizeAttenuation = gl .getUniformLocation (program, "x3d_PointProperties.pointSizeAttenuation");

         this .x3d_LinePropertiesApplied              = gl .getUniformLocation (program, "x3d_LineProperties.applied");
         this .x3d_LinePropertiesLinewidthScaleFactor = this .getUniformLocation (gl, program, "x3d_LineProperties.linewidthScaleFactor", "x3d_LinewidthScaleFactor");
         this .x3d_LinePropertiesLinetype             = gl .getUniformLocation (program, "x3d_LineProperties.linetype");

         this .x3d_FillPropertiesFilled     = gl .getUniformLocation (program, "x3d_FillProperties.filled");
         this .x3d_FillPropertiesHatched    = gl .getUniformLocation (program, "x3d_FillProperties.hatched");
         this .x3d_FillPropertiesHatchColor = gl .getUniformLocation (program, "x3d_FillProperties.hatchColor");
         this .x3d_FillPropertiesHatchStyle = gl .getUniformLocation (program, "x3d_FillProperties.hatchStyle");

         this .x3d_ColorMaterial = gl .getUniformLocation (program, "x3d_ColorMaterial");
         this .x3d_NumLights     = gl .getUniformLocation (program, "x3d_NumLights");

         for (let i = 0; i < this .x3d_MaxLights; ++ i)
         {
            this .x3d_LightType [i]             = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].type",             "x3d_LightType[" + i + "]");
            this .x3d_LightColor [i]            = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].color",            "x3d_LightColor[" + i + "]");
            this .x3d_LightAmbientIntensity [i] = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].ambientIntensity", "x3d_LightAmbientIntensity[" + i + "]");
            this .x3d_LightIntensity [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].intensity",        "x3d_LightIntensity[" + i + "]");
            this .x3d_LightAttenuation [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].attenuation",      "x3d_LightAttenuation[" + i + "]");
            this .x3d_LightLocation [i]         = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].location",         "x3d_LightLocation[" + i + "]");
            this .x3d_LightDirection [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].direction",        "x3d_LightDirection[" + i + "]");
            this .x3d_LightBeamWidth [i]        = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].beamWidth",        "x3d_LightBeamWidth[" + i + "]");
            this .x3d_LightCutOffAngle [i]      = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].cutOffAngle",      "x3d_LightCutOffAngle[" + i + "]");
            this .x3d_LightRadius [i]           = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].radius",           "x3d_LightRadius[" + i + "]");
            this .x3d_LightMatrix [i]           = this .getUniformLocation (gl, program, "x3d_LightSource[" + i + "].matrix",           "x3d_LightMatrix[" + i + "]");

            this .x3d_ShadowIntensity [i] = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowIntensity");
            this .x3d_ShadowColor [i]     = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowColor");
            this .x3d_ShadowBias [i]      = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowBias");
            this .x3d_ShadowMatrix [i]    = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMatrix");
            this .x3d_ShadowMapSize [i]   = gl .getUniformLocation (program, "x3d_LightSource[" + i + "].shadowMapSize");
            this .x3d_ShadowMap [i]       = gl .getUniformLocation (program, "x3d_ShadowMap[" + i + "]");
         }

         this .x3d_AmbientIntensity  = this .getUniformLocation (gl, program, "x3d_Material.ambientIntensity", "x3d_FrontMaterial.ambientIntensity");
         this .x3d_DiffuseColor      = this .getUniformLocation (gl, program, "x3d_Material.diffuseColor",     "x3d_FrontMaterial.diffuseColor");
         this .x3d_SpecularColor     = this .getUniformLocation (gl, program, "x3d_Material.specularColor",    "x3d_FrontMaterial.specularColor");
         this .x3d_EmissiveColor     = this .getUniformLocation (gl, program, "x3d_Material.emissiveColor",    "x3d_FrontMaterial.emissiveColor");
         this .x3d_Shininess         = this .getUniformLocation (gl, program, "x3d_Material.shininess",        "x3d_FrontMaterial.shininess");
         this .x3d_BaseColor         = gl .getUniformLocation (program, "x3d_Material.baseColor");
         this .x3d_Metallic          = gl .getUniformLocation (program, "x3d_Material.metallic");
         this .x3d_Roughness         = gl .getUniformLocation (program, "x3d_Material.roughness");
         this .x3d_OcclusionStrength = gl .getUniformLocation (program, "x3d_Material.occlusionStrength");
         this .x3d_NormalScale       = gl .getUniformLocation (program, "x3d_Material.normalScale");
         this .x3d_Transparency      = this .getUniformLocation (gl, program, "x3d_Material.transparency",     "x3d_FrontMaterial.transparency");

         const materialTextures = [
            "x3d_AmbientTexture",
            "x3d_DiffuseTexture",
            "x3d_SpecularTexture",
            "x3d_EmissiveTexture",
            "x3d_ShininessTexture",
            "x3d_BaseTexture",
            "x3d_MetallicRoughnessTexture",
            "x3d_OcclusionTexture",
            "x3d_NormalTexture",
         ];

         for (const materialTexture of materialTextures)
         {
            this [materialTexture] = {
               textureTransformMapping:  gl .getUniformLocation (program, materialTexture + ".textureTransformMapping"),
               textureCoordinateMapping: gl .getUniformLocation (program, materialTexture + ".textureCoordinateMapping"),
               texture2D:                gl .getUniformLocation (program, materialTexture + ".texture2D"),
               texture3D:                gl .getUniformLocation (program, materialTexture + ".texture3D"),
               textureCube:              gl .getUniformLocation (program, materialTexture + ".textureCube"),
            };
         }

         this .x3d_NumTextures           = gl .getUniformLocation (program, "x3d_NumTextures");
         this .x3d_NumProjectiveTextures = gl .getUniformLocation (program, "x3d_NumProjectiveTextures");
         this .x3d_MultiTextureColor     = gl .getUniformLocation (program, "x3d_MultiTextureColor");

         this .x3d_TexCoord .length = 0;

         for (let i = 0; i < this .x3d_MaxTextures; ++ i)
         {
            this .x3d_Textures [i] = {
               textureType: gl .getUniformLocation (program, "x3d_TextureType[" + i + "]"),
               texture2D: gl .getUniformLocation (program, "x3d_Texture2D[" + i + "]"),
               texture3D: gl .getUniformLocation (program, "x3d_Texture3D[" + i + "]"),
               textureCube: this .getUniformLocation (gl, program, "x3d_TextureCube[" + i + "]", "x3d_CubeMapTexture[" + i + "]"),
            }

            this .x3d_MultiTextureMode [i]      = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].mode");
            this .x3d_MultiTextureAlphaMode [i] = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].alphaMode");
            this .x3d_MultiTextureSource [i]    = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].source");
            this .x3d_MultiTextureFunction [i]  = gl .getUniformLocation (program, "x3d_MultiTexture[" + i + "].function");

            this .x3d_TextureCoordinateGeneratorMode [i]      = gl .getUniformLocation (program, "x3d_TextureCoordinateGenerator[" + i + "].mode");
            this .x3d_TextureCoordinateGeneratorParameter [i] = gl .getUniformLocation (program, "x3d_TextureCoordinateGenerator[" + i + "].parameter");

            this .x3d_ProjectiveTexture [i]         = gl .getUniformLocation (program, "x3d_ProjectiveTexture[" + i + "]");
            this .x3d_ProjectiveTextureMatrix [i]   = gl .getUniformLocation (program, "x3d_ProjectiveTextureMatrix[" + i + "]");
            this .x3d_ProjectiveTextureLocation [i] = gl .getUniformLocation (program, "x3d_ProjectiveTextureLocation[" + i + "]");

            this .x3d_TextureMatrix [i] = gl .getUniformLocation (program, "x3d_TextureMatrix[" + i + "]");

            // Attribute

            const x3d_TexCoord = gl .getAttribLocation (program, "x3d_TexCoord");

            if (x3d_TexCoord !== -1)
               this .x3d_TexCoord .push ([i, x3d_TexCoord]);
         }

         this .x3d_Viewport          = gl .getUniformLocation (program, "x3d_Viewport");
         this .x3d_ProjectionMatrix  = gl .getUniformLocation (program, "x3d_ProjectionMatrix");
         this .x3d_ModelViewMatrix   = gl .getUniformLocation (program, "x3d_ModelViewMatrix");
         this .x3d_NormalMatrix      = gl .getUniformLocation (program, "x3d_NormalMatrix");
         this .x3d_CameraSpaceMatrix = gl .getUniformLocation (program, "x3d_CameraSpaceMatrix");

         /*
          * Attributes.
          */

         const attributes = [
            "FogDepth",
            "Color",
            "Normal",
            "Vertex",
            "Particle",
            "ParticleMatrix",
         ];

         for (const name of attributes)
         {
            const attribute = gl .getAttribLocation (program, "x3d_" + name);

            this ["x3d_" + name] = attribute;

            if (attribute < 0)
            {
               this ["enable" + name + "Attribute"]  = Function .prototype;
               this [name [0] .toLowerCase () + name .slice (1) + "AttributeDivisor"] = Function .prototype;
            }
            else
            {
               delete this ["enable" + name + "Attribute"];
               delete this [name [0] .toLowerCase () + name .slice (1) + "AttributeDivisor"];
            }
         }

         /*
          * Fill uniforms with defaults.
          */

         // Fill special uniforms with default values, textures for units are created in X3DTexturingContext.

         gl .uniform1i  (this .x3d_LinePropertiesLinetype,   browser .getDefaultTexture2DUnit ());
         gl .uniform1i  (this .x3d_FillPropertiesHatchStyle, browser .getDefaultTexture2DUnit ());

         for (const materialTexture of materialTextures)
         {
            gl .uniform1i (this [materialTexture] .texture2D,   browser .getDefaultTexture2DUnit ());
            gl .uniform1i (this [materialTexture] .texture3D,   browser .getDefaultTexture3DUnit ());
            gl .uniform1i (this [materialTexture] .textureCube, browser .getDefaultTextureCubeUnit ());
         }

         gl .uniform1i (this .x3d_NumTextures, 0);

         for (const uniforms of this .x3d_Textures)
         {
            gl .uniform1i (uniforms .texture2D, browser .getDefaultTexture2DUnit ());

            if (gl .getVersion () >= 2)
               gl .uniform1i (uniforms .texture3D, browser .getDefaultTexture3DUnit ());

            gl .uniform1i (uniforms .textureCube, browser .getDefaultTextureCubeUnit ());
         }

         for (const uniform of this .x3d_ShadowMap)
            gl .uniform1i (uniform, browser .getDefaultTexture2DUnit ());

         if (browser .getProjectiveTextureMapping ())
         {
            for (const uniform of this .x3d_ProjectiveTexture)
               gl .uniform1i (uniform, browser .getDefaultTexture2DUnit ());
         }

         /*
          * Check x3d_Vertex.
          */

         if (this .x3d_Vertex < 0)
         {
            if (gl .getVersion () >= 2)
              console .warn ("Missing »in vec4 x3d_Vertex;«.");
            else
               console .warn ("Missing »attribute vec4 x3d_Vertex;«.");
         }
      },
      getUniformLocation: function (gl, program, name, depreciated)
      {
         // Legacy function to get uniform location.

         let location = gl .getUniformLocation (program, name);

         if (location)
            return location;

         // Look for depreciated location.

         if (depreciated)
         {
            location = gl .getUniformLocation (program, depreciated);

            if (location)
            {
               console .warn (this .getTypeName (), this .getName (), "Using uniform location name »" + depreciated + "« is depreciated, use »" + name + "«. See https://create3000.github.io/x_ite/Custom-Shaders.html.");
            }

            return location;
         }

         return 0;
      },
      getAttribLocation: function (gl, program, name, depreciated)
      {
         // Legacy function to get uniform location.

         let location = gl .getAttribLocation (program, name);

         if (location >= 0)
            return location;

         // Look for depreciated location.

         if (depreciated)
         {
            location = gl .getAttribLocation (program, depreciated);

            if (location >= 0)
            {
               console .warn (this .getTypeName (), this .getName (), "Using attribute location name »" + depreciated + "« is depreciated, use »" + name + "«. See https://create3000.github.io/x_ite/Custom-Shaders.html.");
            }

            return location;
         }

         return -1;
      },
      addShaderFields: function ()
      {
         const
            gl      = this .getBrowser () .getContext (),
            program = this .getProgram ();

         this .textures .clear ();

         for (const field of this .getUserDefinedFields ())
         {
            const location = gl .getUniformLocation (program, field .getName ());

            if (location)
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFImage:
                  {
                     location .array = new Int32Array (3 + field .array .length);
                     break;
                  }
                  case X3DConstants .SFMatrix3d:
                  case X3DConstants .SFMatrix3f:
                  case X3DConstants .SFRotation:
                  {
                     location .array = new Float32Array (9);
                     break;
                  }
                  case X3DConstants .SFMatrix4d:
                  case X3DConstants .SFMatrix4f:
                  {
                     location .array = new Float32Array (16);
                     break;
                  }
                  case X3DConstants .SFNode:
                  {
                     break;
                  }
                  case X3DConstants .MFBool:
                  case X3DConstants .MFInt32:
                  {
                     location .array = new Int32Array (this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFFloat:
                  case X3DConstants .MFDouble:
                  case X3DConstants .MFTime:
                  {
                     location .array = new Float32Array (this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFImage:
                  {
                     location .array = new Int32Array (this .getImagesLength (field));
                     break;
                  }
                  case X3DConstants .MFMatrix3d:
                  case X3DConstants .MFMatrix3f:
                  case X3DConstants .MFRotation:
                  {
                     location .array = new Float32Array (9 * this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFMatrix4d:
                  case X3DConstants .MFMatrix4f:
                  {
                     location .array = new Float32Array (16 * this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFNode:
                  {
                     const locations = location .locations = [ ];

                     for (let i = 0;; ++ i)
                     {
                        const l = gl .getUniformLocation (program, field .getName () + "[" + i + "]");

                        if (! l)
                           break;

                        locations .push (l);
                     }

                     break;
                  }
                  case X3DConstants .MFVec2d:
                  case X3DConstants .MFVec2f:
                  {
                     location .array = new Float32Array (2 * this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFVec3d:
                  case X3DConstants .MFVec3f:
                  case X3DConstants .MFColor:
                  {
                     location .array = new Float32Array (3 * this .getLocationLength (gl, program, field));
                     break;
                  }
                  case X3DConstants .MFVec4d:
                  case X3DConstants .MFVec4f:
                  case X3DConstants .MFColorRGBA:
                  {
                     location .array = new Float32Array (4 * this .getLocationLength (gl, program, field));
                     break;
                  }
               }

               if (location .array)
                  field [_uniformLocation] = location .array .length ? location : null;
               else
                  field [_uniformLocation] = location;

               field .addInterest ("set_field__", this);

               this .set_field__ (field);
            }
         }
      },
      removeShaderFields: function ()
      {
         for (const field of this .getUserDefinedFields ())
            field .removeInterest ("set_field__", this);
      },
      set_field__: (function ()
      {
         const matrix3 = new Matrix3 ();

         return function (field)
         {
            const
               gl       = this .getBrowser () .getContext (),
               location = field [_uniformLocation];

            if (location)
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFBool:
                  case X3DConstants .SFInt32:
                  {
                     gl .uniform1i (location, field .getValue ());
                     return;
                  }
                  case X3DConstants .SFColor:
                  {
                     const value = field .getValue ();
                     gl .uniform3f (location, value .r, value .g, value .b);
                     return;
                  }
                  case X3DConstants .SFColorRGBA:
                  {
                     const value = field .getValue ();
                     gl .uniform4f (location, value .r, value .g, value .b, value .a);
                     return;
                  }
                  case X3DConstants .SFDouble:
                  case X3DConstants .SFFloat:
                  case X3DConstants .SFTime:
                  {
                     gl .uniform1f (location, field .getValue ());
                     return;
                  }
                  case X3DConstants .SFImage:
                  {
                     let array = location .array;

                     const
                        pixels = field .array,
                        length = 3 + pixels .length;

                     if (length !== array .length)
                        array = location .array = new Int32Array (length);

                     array [0] = field .width;
                     array [1] = field .height;
                     array [2] = field .comp;

                     for (let a = 3, p = 0, pl = pixels .length; p < pl; ++ p, ++ a)
                        array [a] = pixels [p];

                     gl .uniform1iv (location, array);
                     return;
                  }
                  case X3DConstants .SFMatrix3d:
                  case X3DConstants .SFMatrix3f:
                  {
                     location .array .set (field .getValue ());

                     gl .uniformMatrix3fv (location, false, location .array);
                     return;
                  }
                  case X3DConstants .SFMatrix4d:
                  case X3DConstants .SFMatrix4f:
                  {
                     location .array .set (field .getValue ());

                     gl .uniformMatrix4fv (location, false, location .array);
                     return;
                  }
                  case X3DConstants .SFNode:
                  {
                     const texture = X3DCast (X3DConstants .X3DTextureNode, field);

                     if (texture)
                     {
                        location .name    = field .getName ();
                        location .texture = texture;

                        this .textures .add (location);
                     }
                     else
                     {
                        this .textures .delete (location);
                     }

                     return;
                  }
                  case X3DConstants .SFRotation:
                  {
                     field .getValue () .getMatrix (location .array);

                     gl .uniformMatrix3fv (location, false, location .array);
                     return;
                  }
                  case X3DConstants .SFString:
                  {
                     return;
                  }
                  case X3DConstants .SFVec2d:
                  case X3DConstants .SFVec2f:
                  {
                     const value = field .getValue ();
                     gl .uniform2f (location, value .x, value .y);
                     return;
                  }
                  case X3DConstants .SFVec3d:
                  case X3DConstants .SFVec3f:
                  {
                     const value = field .getValue ();
                     gl .uniform3f (location, value .x, value .y, value .z);
                     return;
                  }
                  case X3DConstants .SFVec4d:
                  case X3DConstants .SFVec4f:
                  {
                     const value = field .getValue ();
                     gl .uniform4f (location, value .x, value .y, value .z, value .w);
                     return;
                  }
                  case X3DConstants .MFBool:
                  case X3DConstants .MFInt32:
                  {
                     const array = location .array;

                     for (var i = 0, length = field .length; i < length; ++ i)
                        array [i] = field [i];

                     for (let length = array .length; i < length; ++ i)
                        array [i] = 0;

                     gl .uniform1iv (location, array);
                     return;
                  }
                  case X3DConstants .MFColor:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const color = field [i];

                        array [k++] = color .r;
                        array [k++] = color .g;
                        array [k++] = color .b;
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniform3fv (location, array);
                     return;
                  }
                  case X3DConstants .MFColorRGBA:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const color = field [i];

                        array [k++] = color .r;
                        array [k++] = color .g;
                        array [k++] = color .b;
                        array [k++] = color .a;
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniform4fv (location, array);
                     return;
                  }
                  case X3DConstants .MFDouble:
                  case X3DConstants .MFFloat:
                  case X3DConstants .MFTime:
                  {
                     const array = location .array;

                     for (var i = 0, length = field .length; i < length; ++ i)
                        array [i] = field [i];

                     for (let length = array .length; i < length; ++ i)
                        array [i] = 0;

                     gl .uniform1fv (location, array);
                     return;
                  }
                  case X3DConstants .MFImage:
                  {
                     const array = location .array;

                     for (let i = 0, a = 0, length = field .length; i < length; ++ i)
                     {
                        const
                           value  = field [i],
                           pixels = value .array;

                        array [a ++] = value .width;
                        array [a ++] = value .height;
                        array [a ++] = value .comp;

                        for (let p = 0, pl = pixels .length; p < pl; ++ p)
                           array [a ++] = pixels [p];
                     }

                     gl .uniform1iv (location, array);
                     return;
                  }
                  case X3DConstants .MFMatrix3d:
                  case X3DConstants .MFMatrix3f:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const matrix = field [i];

                        for (let m = 0; m < 9; ++ m)
                           array [k++] = matrix [m];
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniformMatrix3fv (location, false, array);
                     return;
                  }
                  case X3DConstants .MFMatrix4d:
                  case X3DConstants .MFMatrix4f:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const matrix = field [i];

                        for (let m = 0; m < 16; ++ m)
                           array [k++] = matrix [m];
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniformMatrix4fv (location, false, array);
                     return;
                  }
                  case X3DConstants .MFNode:
                  {
                     const locations = location .locations;

                     for (let i = 0, length = field .length; i < length; ++ i)
                     {
                        const texture = X3DCast (X3DConstants .X3DTextureNode, field [i]);

                        if (texture)
                        {
                           locations [i] .name    = field .getName ();
                           locations [i] .texture = texture;

                           this .textures .add (locations [i]);
                        }
                        else
                        {
                           this .textures .delete (locations [i]);
                        }
                     }

                     return;
                  }
                  case X3DConstants .MFRotation:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const matrix = field [i] .getValue () .getMatrix (matrix3);

                        array [k++] = matrix [0];
                        array [k++] = matrix [1];
                        array [k++] = matrix [2];
                        array [k++] = matrix [3];
                        array [k++] = matrix [4];
                        array [k++] = matrix [5];
                        array [k++] = matrix [6];
                        array [k++] = matrix [7];
                        array [k++] = matrix [8];
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniformMatrix3fv (location, false, array);
                     return;
                  }
                  case X3DConstants .MFString:
                  {
                     return;
                  }
                  case X3DConstants .MFVec2d:
                  case X3DConstants .MFVec2f:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const vector = field [i];

                        array [k++] = vector .x;
                        array [k++] = vector .y;
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniform2fv (location, array);
                     return;
                  }
                  case X3DConstants .MFVec3d:
                  case X3DConstants .MFVec3f:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const vector = field [i];

                        array [k++] = vector .x;
                        array [k++] = vector .y;
                        array [k++] = vector .z;
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniform3fv (location, array);
                     return;
                  }
                  case X3DConstants .MFVec4d:
                  case X3DConstants .MFVec4f:
                  {
                     const array = location .array;

                     for (var i = 0, k = 0, length = field .length; i < length; ++ i)
                     {
                        const vector = field [i];

                        array [k++] = vector .x;
                        array [k++] = vector .y;
                        array [k++] = vector .z;
                        array [k++] = vector .w;
                     }

                     for (let length = array .length; k < length; ++ k)
                        array [k] = 0;

                     gl .uniform4fv (location, array);
                     return;
                  }
               }
            }
         };
      })(),
      getImagesLength: function (field)
      {
         const images = field .getValue ();

         let length = 3 * images .length;

         for (const image of images)
            length += image .array .length;

         return length;
      },
      getLocationLength: function (gl, program, field)
      {
         const name = field .getName ();

         for (let i = 0; ; ++ i)
         {
            const location = gl .getUniformLocation (program, name + "[" + i + "]");

            if (! location)
               return i;
         }
      },
      hasFog: function (fogNode)
      {
         if (this .fogNode === fogNode)
            return true;

         this .fogNode = fogNode;

         return false;
      },
      hasLight: function (i, lightNode)
      {
         if (this .lightNodes [i] === lightNode)
            return true;

         this .lightNodes [i] = lightNode;

         return false;
      },
      hasTextureProjector: function (i, textureProjectorNode)
      {
         if (this .projectiveTextureNodes [i] === textureProjectorNode)
            return true;

         this .projectiveTextureNodes [i] = textureProjectorNode;

         return false;
      },
      setLocalObjects: function (gl, localObjects)
      {
         // Clip planes and local lights

         this .numClipPlanes                  = 0;
         this .numLights                      = 0;
         this .numProjectiveTextures          = 0;
         this .lightNodes .length             = 0;
         this .projectiveTextureNodes .length = 0;

         for (const localObject of localObjects)
            localObject .setShaderUniforms (gl, this);

         gl .uniform1i (this .x3d_NumClipPlanes,         Math .min (this .numClipPlanes,         this .x3d_MaxClipPlanes));
         gl .uniform1i (this .x3d_NumLights,             Math .min (this .numLights,             this .x3d_MaxLights));
         gl .uniform1i (this .x3d_NumProjectiveTextures, Math .min (this .numProjectiveTextures, this .x3d_MaxTextures));
      },
      setGlobalUniforms: function (gl, renderObject, cameraSpaceMatrixArray, projectionMatrixArray, viewportArray)
      {
         const globalObjects = renderObject .getGlobalObjects ();

         // Set viewport

         gl .uniform4iv (this .x3d_Viewport, viewportArray);

         // Set projection matrix

         gl .uniformMatrix4fv (this .x3d_ProjectionMatrix,  false, projectionMatrixArray);
         gl .uniformMatrix4fv (this .x3d_CameraSpaceMatrix, false, cameraSpaceMatrixArray);

         // Fog

         this .fogNode = null;

         // Set global lights and global texture projectors

         this .numLights                      = 0;
         this .numProjectiveTextures          = 0;
         this .lightNodes .length             = 0;
         this .projectiveTextureNodes .length = 0;

         for (const globalObject of globalObjects)
            globalObject .setShaderUniforms (gl, this, renderObject);

         this .numGlobalLights             = this .numLights;
         this .numGlobalProjectiveTextures = this .numProjectiveTextures;

         // Logarithmic depth buffer support.

         const
            viewpoint      = renderObject .getViewpoint (),
            navigationInfo = renderObject .getNavigationInfo ();

         if (viewpoint instanceof OrthoViewpoint)
            gl .uniform1f (this .x3d_LogarithmicFarFactor1_2, -1);
         else
            gl .uniform1f (this .x3d_LogarithmicFarFactor1_2, 1 / Math .log2 (navigationInfo .getFarValue (viewpoint) + 1));
      },
      setLocalUniforms: function (gl, context, front = true)
      {
         const
            renderObject    = context .renderer,
            shapeNode       = context .shapeNode,
            geometryNode    = context .geometryContext || shapeNode .getGeometry (),
            geometryType    = geometryNode .geometryType,
            appearanceNode  = shapeNode .getAppearance (),
            materialNode    = front ? appearanceNode .materialNode : appearanceNode .backMaterialNode,
            textureNode     = context .textureNode || appearanceNode .textureNode,
            modelViewMatrix = context .modelViewMatrix;

         // Model view matrix

         gl .uniformMatrix4fv (this .x3d_ModelViewMatrix, false, modelViewMatrix);

         // Geometry type

         gl .uniform1i (this .x3d_GeometryType, geometryType);

         // Clip planes and local lights

         this .numClipPlanes         = 0;
         this .numLights             = this .numGlobalLights;
         this .numProjectiveTextures = this .numGlobalProjectiveTextures;

         for (const localObject of context .localObjects)
            localObject .setShaderUniforms (gl, this, renderObject);

         gl .uniform1i (this .x3d_NumClipPlanes,         Math .min (this .numClipPlanes,         this .x3d_MaxClipPlanes));
         gl .uniform1i (this .x3d_NumLights,             Math .min (this .numLights,             this .x3d_MaxLights));
         gl .uniform1i (this .x3d_NumProjectiveTextures, Math .min (this .numProjectiveTextures, this .x3d_MaxTextures));

         // Fog, there is always one

         context .fogNode .setShaderUniforms (gl, this);
         gl .uniform1i (this .x3d_FogCoord, geometryNode .fogCoords);

         // Alpha

         gl .uniform1f (this .x3d_AlphaCutoff, appearanceNode .alphaCutoff);

         // Style

         appearanceNode .stylePropertiesNode [geometryType] .setShaderUniforms (gl, this);

         // Material

         gl .uniform1i (this .x3d_ColorMaterial, geometryNode .colorMaterial);
         materialNode .setShaderUniforms (gl, this, renderObject, appearanceNode .textureTransformMapping, geometryNode .textureCoordinateMapping, front);

         // Normal matrix

         gl .uniformMatrix3fv (this .x3d_NormalMatrix, false, this .getNormalMatrix (modelViewMatrix));

         // Texture

         if (textureNode)
            textureNode .setShaderUniforms (gl, this, renderObject);
         else
            gl .uniform1i (this .x3d_NumTextures, 0);

         appearanceNode .textureTransformNode .setShaderUniforms (gl, this);
         geometryNode .textureCoordinateNode .setShaderUniforms (gl, this);
      },
      getNormalMatrix: (function ()
      {
         const normalMatrix = new Float32Array (9);

         return function (modelViewMatrix)
         {
            try
            {
               normalMatrix [0] = modelViewMatrix [0], normalMatrix [3] = modelViewMatrix [1], normalMatrix [6] = modelViewMatrix [ 2],
               normalMatrix [1] = modelViewMatrix [4], normalMatrix [4] = modelViewMatrix [5], normalMatrix [7] = modelViewMatrix [ 6],
               normalMatrix [2] = modelViewMatrix [8], normalMatrix [5] = modelViewMatrix [9], normalMatrix [8] = modelViewMatrix [10];

               Matrix3 .prototype .inverse .call (normalMatrix);

               return normalMatrix;
            }
            catch (error)
            {
               normalMatrix .set (Matrix3 .Identity);

               return normalMatrix;
            }
         };
      })(),
      enable: function (gl)
      {
         const browser = this .getBrowser ();

         this .enableParticleMatrixAttribute (gl, this .particleMatrixBuffer, 0, 0, 1);

         for (const location of this .textures)
         {
            const
               texture     = location .texture,
               textureUnit = browser .getTextureUnit (texture .getTextureType ());

            if (textureUnit === undefined)
            {
               console .warn ("Not enough combined texture units for uniform variable '" + location .name + "' available.");
               return;
            }

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (texture .getTarget (), texture .getTexture ());
            gl .uniform1i (location, textureUnit);
         }
      },
      disable: function (gl)
      {
         for (const location of this .attributes)
            gl .disableVertexAttribArray (location);

         for (const location of this .divisors)
            gl .vertexAttribDivisor (location, 0);

         this .attributes .clear ();
         this .divisors   .clear ();
      },
      enableFloatAttrib: function (gl, name, buffer, components, stride, offset)
      {
         const location = gl .getAttribLocation (this .getProgram (), name);

         if (location === -1)
            return;

         this .attributes .add (location);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (location, components, gl .FLOAT, false, stride, offset);
         gl .enableVertexAttribArray (location);
      },
      enableMatrix3Attrib: function (gl, name, buffer, stride, offset)
      {
         const location0 = gl .getAttribLocation (this .getProgram (), name);

         if (location === -1)
            return;

         stride = stride || 36;

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

         for (let i = 0; i < 3; ++ i)
         {
            const location = location0 + i;

            this .attributes .add (location);

            gl .vertexAttribPointer (location, 3, gl .FLOAT, false, stride, offset + 12 * i);
            gl .enableVertexAttribArray (location);
         }
      },
      enableMatrix4Attrib: function (gl, name, buffer, stride, offset)
      {
         const location0 = gl .getAttribLocation (this .getProgram (), name);

         if (location === -1)
            return;

         stride = stride || 64;

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

         for (let i = 0; i < 4; ++ i)
         {
            const location = location0 + i;

            this .attributes .add (location);

            gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset + 16 * i);
            gl .enableVertexAttribArray (location);
         }
      },
      enableFogDepthAttribute: function (gl, buffer, stride, offset)
      {
         this .attributes .add (this .x3d_FogDepth);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (this .x3d_FogDepth, 1, gl .FLOAT, false, stride, offset);
         gl .enableVertexAttribArray (this .x3d_FogDepth);
      },
      enableColorAttribute: function (gl, buffer, stride, offset)
      {
         this .attributes .add (this .x3d_Color);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (this .x3d_Color, 4, gl .FLOAT, false, stride, offset);
         gl .enableVertexAttribArray (this .x3d_Color);
      },
      colorAttributeDivisor: function (gl, divisor)
      {
         this .divisors .add (this .x3d_Color);

         gl .vertexAttribDivisor (this .x3d_Color, divisor);
      },
      enableTexCoordAttribute: function (gl, buffers, stride, offset)
      {
         for (const [i, x3d_TexCoord] of this .x3d_TexCoord)
         {
            this .attributes .add (x3d_TexCoord);

            gl .bindBuffer (gl .ARRAY_BUFFER, buffers [i]);
            gl .vertexAttribPointer (x3d_TexCoord, 4, gl .FLOAT, false, stride, offset);
            gl .enableVertexAttribArray (x3d_TexCoord);
         }
      },
      texCoordAttributeDivisor: function (gl, divisor)
      {
         for (const [i, x3d_TexCoord] of this .x3d_TexCoord)
         {
            this .divisors .add (x3d_TexCoord);

            gl .vertexAttribDivisor (x3d_TexCoord, divisor);
         }
      },
      enableNormalAttribute: function (gl, buffer, stride, offset)
      {
         this .attributes .add (this .x3d_Normal);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (this .x3d_Normal, 3, gl .FLOAT, false, stride, offset);
         gl .enableVertexAttribArray (this .x3d_Normal);
      },
      normalAttributeDivisor: function (gl, divisor)
      {
         this .divisors .add (this .x3d_Normal);

         gl .vertexAttribDivisor (this .x3d_Normal, divisor);
      },
      enableVertexAttribute: function (gl, buffer, stride, offset)
      {
         this .attributes .add (this .x3d_Vertex);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (this .x3d_Vertex, 4, gl .FLOAT, false, stride, offset);
         gl .enableVertexAttribArray (this .x3d_Vertex);
      },
      vertexAttributeDivisor: function (gl, divisor)
      {
         this .divisors .add (this .x3d_Vertex);

         gl .vertexAttribDivisor (this .x3d_Vertex, divisor);
      },
      enableParticleAttribute: function (gl, buffer, stride, offset, divisor)
      {
         this .attributes .add (this .x3d_Particle);
         this .divisors   .add (this .x3d_Particle);

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .vertexAttribPointer (this .x3d_Particle, 4, gl .FLOAT, false, stride, offset);
         gl .vertexAttribDivisor (this .x3d_Particle, divisor);
         gl .enableVertexAttribArray (this .x3d_Particle);
      },
      enableParticleMatrixAttribute: function (gl, buffer, stride, offset, divisor)
      {
         const location0 = this .x3d_ParticleMatrix;

         stride = stride || 64;

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);

         for (let i = 0; i < 4; ++ i)
         {
            const location = location0 + i;

            this .attributes .add (location);
            this .divisors   .add (location);

            gl .vertexAttribPointer (location, 4, gl .FLOAT, false, stride, offset + 16 * i);
            gl .vertexAttribDivisor (location, divisor);
            gl .enableVertexAttribArray (location);
         }
      },
      getProgramInfo: function ()
      {
         function cmp (lhs, rhs) { return lhs < rhs ? -1 : lhs > rhs ? 1 : 0; }

         const
            gl      = this .getBrowser () .getContext (),
            program = this .getProgram ();

         const
            result = {
               attributes: [ ],
               uniforms: [ ],
               attributeCount: 0,
               uniformCount: 0,
            },
            activeUniforms   = gl .getProgramParameter (program, gl .ACTIVE_UNIFORMS),
            activeAttributes = gl .getProgramParameter (program, gl .ACTIVE_ATTRIBUTES);

         // Taken from the WebGl spec:
         // http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
         const enums = {
            0x8B50: 'vec2',
            0x8B51: 'vec3',
            0x8B52: 'vec4',
            0x8B53: 'ivec2',
            0x8B54: 'ivec3',
            0x8B55: 'ivec4',
            0x8B56: 'bool',
            0x8B57: 'bvec2',
            0x8B58: 'bvec3',
            0x8B59: 'bvec4',
            0x8B5A: 'mat2',
            0x8B5B: 'mat3',
            0x8B5C: 'mat4',
            0x8B5E: 'sampler2D',
            0x8B60: 'samplerCube',
            0x1400: 'byte',
            0x1401: 'ubyte',
            0x1402: 'short',
            0x1403: 'ushort',
            0x1404: 'int',
            0x1405: 'uint',
            0x1406: 'float',
         };

         // Loop through active uniforms
         for (let i = 0; i < activeUniforms; ++ i)
         {
            const uniform = gl .getActiveUniform (program, i);
            uniform .typeName = enums [uniform.type];
            result .uniforms .push (Object .assign ({ }, uniform));
            result .uniformCount += uniform .size;
         }

         // Loop through active attributes
         for (let i = 0; i < activeAttributes; ++ i)
         {
            const attribute = gl .getActiveAttrib (program, i);
            attribute .typeName = enums [attribute .type];
            result .attributes .push (Object .assign ({ }, attribute));
            result .attributeCount += attribute .size;
         }

         result .uniforms   .sort (function (a, b) { return cmp (a .name, b .name); });
         result .attributes .sort (function (a, b) { return cmp (a .name, b .name); });

         return result;
      },
      printProgramInfo: function ()
      {
         const programInfo = this .getProgramInfo ();

         console .log (this .getName ());
         console .table (programInfo .attributes);
         console .log (this .getName (), "attributeCount", programInfo .attributeCount);
         console .log (this .getName ());
         console .table (programInfo .uniforms);
         console .log (this .getName (), "uniformCount", programInfo .uniformCount);
      },
   };

   return X3DProgrammableShaderObject;
});
