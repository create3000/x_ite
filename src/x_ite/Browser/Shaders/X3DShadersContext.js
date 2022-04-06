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
   "x_ite/Browser/Core/Shading",
   "x_ite/Components/Shaders/ComposedShader",
   "x_ite/Components/Shaders/ShaderPart",
   "x_ite/Browser/Shaders/ShaderTest",
   "x_ite/Browser/Networking/urls",
],
function (Shading,
          ComposedShader,
          ShaderPart,
          ShaderTest,
          urls)
{
"use strict";

   const
      _shaders                = Symbol (),
      _defaultShader          = Symbol (),
      _standardShaders        = Symbol (),
      _pointShader            = Symbol (),
      _lineShader             = Symbol (),
      _unlitShader            = Symbol (),
      _unlitTexturesShader    = Symbol (),
      _gouraudShader          = Symbol (),
      _phongShader            = Symbol (),
      _materialTexturesShader = Symbol (),
      _shadowShader           = Symbol (),
      _depthShader            = Symbol ();

   function X3DShadersContext ()
   {
      this [_shaders]         = new Set ();
      this [_standardShaders] = [ ];
   }

   X3DShadersContext .prototype =
   {
      initialize: function ()
      {
         this .setShading (this .getBrowserOptions () .getShading ());
      },
      getShadingLanguageVersion: function ()
      {
         const gl = this .getContext ();

         return gl .getParameter (gl .SHADING_LANGUAGE_VERSION);
      },
      getMaxVertexUniformVectors: function ()
      {
         const gl = this .getContext ();

         return gl .getParameter (gl .MAX_VERTEX_UNIFORM_VECTORS);
      },
      getMaxFragmentUniformVectors: function ()
      {
         const gl = this .getContext ();

         return gl .getParameter (gl .MAX_FRAGMENT_UNIFORM_VECTORS);
      },
      getMaxVertexAttribs: function ()
      {
         const gl = this .getContext ();

         return gl .getParameter (gl .MAX_VERTEX_ATTRIBS);
      },
      addShader: function (shader)
      {
         this [_shaders] .add (shader);

         shader .setShading (this .getBrowserOptions () .getShading ());
      },
      removeShader: function (shader)
      {
         this [_shaders] .delete (shader);
      },
      getShaders: function ()
      {
         return this [_shaders];
      },
      getDefaultShader: function ()
      {
         return this [_defaultShader];
      },
      getStandardShaders: function ()
      {
         return this [_standardShaders];
      },
      getPointShader: function ()
      {
         this [_pointShader] = this .createShader ("PointShader", "PointSet");

         this [_standardShaders] .push (this [_pointShader]);

         this .getPointShader = function () { return this [_pointShader]; };

         Object .defineProperty (this, "getPointShader", { enumerable: false });

         return this [_pointShader];
      },
      getLineShader: function ()
      {
         this [_lineShader] = this .createShader ("WireframeShader", "Wireframe");

         this [_standardShaders] .push (this [_lineShader]);

         this .getLineShader = function () { return this [_lineShader]; };

         Object .defineProperty (this, "getLineShader", { enumerable: false });

         return this [_lineShader];
      },
      getUnlitShader: function ()
      {
         this [_unlitShader] = this .createShader ("UnlitShader", "Unlit");

         this [_unlitShader] ._isValid .addInterest ("set_unlit_shader_valid__", this);

         this [_standardShaders] .push (this [_unlitShader]);

         this .getUnlitShader = function () { return this [_unlitShader]; };

         Object .defineProperty (this, "getUnlitShader", { enumerable: false });

         return this [_unlitShader];
      },
      getUnlitTexturesShader: function ()
      {
         this [_unlitTexturesShader] = this .createShader ("UnlitTexturesShader", "Unlit", { MATERIAL_TEXTURES: true });

         this [_unlitTexturesShader] ._isValid .addInterest ("set_unlit_textures_shader_valid__", this);

         this [_standardShaders] .push (this [_unlitTexturesShader]);

         this .getUnlitTexturesShader = function () { return this [_unlitTexturesShader]; };

         Object .defineProperty (this, "getUnlitTexturesShader", { enumerable: false });

         return this [_unlitTexturesShader];
      },
      getGouraudShader: function ()
      {
         this [_gouraudShader] = this .createShader ("GouraudShader", "Gouraud");

         this [_gouraudShader] ._isValid .addInterest ("set_gouraud_shader_valid__", this);

         this [_standardShaders] .push (this [_gouraudShader]);

         this .getGouraudShader = function () { return this [_gouraudShader]; };

         Object .defineProperty (this, "getGouraudShader", { enumerable: false });

         return this [_gouraudShader];
      },
      getPhongShader: function ()
      {
         this [_phongShader] = this .createShader ("PhongShader", "Phong");

         this [_phongShader] ._isValid .addInterest ("set_phong_shader_valid__", this);

         this [_standardShaders] .push (this [_phongShader]);

         this .getPhongShader = function () { return this [_phongShader]; };

         Object .defineProperty (this, "getPhongShader", { enumerable: false });

         return this [_phongShader];
      },
      getMaterialTexturesShader: function ()
      {
         this [_materialTexturesShader] = this .createShader ("MaterialTexturesShader", "Phong", { MATERIAL_TEXTURES: true });

         this [_materialTexturesShader] ._isValid .addInterest ("set_material_textures_shader_valid__", this);

         this [_standardShaders] .push (this [_materialTexturesShader]);

         this .getMaterialTexturesShader = function () { return this [_materialTexturesShader]; };

         Object .defineProperty (this, "getMaterialTexturesShader", { enumerable: false });

         return this [_materialTexturesShader];
      },
      getShadowShader: function ()
      {
         this [_shadowShader] = this .createShader ("ShadowShader", "Phong", { SHADOWS: true });

         this [_shadowShader] ._isValid .addInterest ("set_shadow_shader_valid__", this);

         this [_standardShaders] .push (this [_shadowShader]);

         this .getShadowShader = function () { return this [_shadowShader]; };

         Object .defineProperty (this, "getShadowShader", { enumerable: false });

         return this [_shadowShader];
      },
      getDepthShader: function ()
      {
         this [_depthShader] = this .createShader ("DepthShader", "Depth");

         this .getDepthShader = function () { return this [_depthShader]; };

         Object .defineProperty (this, "getDepthShader", { enumerable: false });

         return this [_depthShader];
      },
      setShading: function (type)
      {
         switch (type)
         {
            case Shading .PHONG:
            {
               this [_defaultShader] = this .getPhongShader ();
               break;
            }
            default:
            {
               this [_defaultShader] = this .getGouraudShader ();
               break;
            }
         }

         // Configure shaders.

         for (const shader of this .getShaders ())
            shader .setShading (type);
      },
      createShader: function (name, file, options = { })
      {
         if (this .getDebug ())
            console .log ("Initializing " + name);

         const
            gl      = this .getContext (),
            version = gl .getVersion ();

         const vertexShader = new ShaderPart (this .getPrivateScene ());
         vertexShader .setName (name + "Vertex");
         vertexShader ._url .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".vs"));
         vertexShader .setOptions (options);
         vertexShader .setup ();

         const fragmentShader = new ShaderPart (this .getPrivateScene ());
         fragmentShader .setName (name + "Fragment");
         fragmentShader ._type  = "FRAGMENT";
         fragmentShader ._url .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".fs"));
         fragmentShader .setOptions (options);
         fragmentShader .setup ();

         const shader = new ComposedShader (this .getPrivateScene ());
         shader .setName (name);
         shader ._language = "GLSL";
         shader ._parts .push (vertexShader);
         shader ._parts .push (fragmentShader);
         shader .setShading (this .getBrowserOptions () .getShading ());
         shader .setup ();

         this .addShader (shader);

         return shader;
      },
      set_unlit_shader_valid__: function (valid)
      {
         this [_unlitShader] ._isValid .removeInterest ("set_unlit_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_unlitShader]))
            return;

         console .error ("X_ITE: Unlit shading is not available, using fallback VRML shader.");

         // Recompile shader.
         this [_unlitShader] ._parts [0] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.vs") ];
         this [_unlitShader] ._parts [1] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.fs") ];
      },
      set_unlit_textures_shader_valid__: function (valid)
      {
         this [_unlitTexturesShader] ._isValid .removeInterest ("set_unlit_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_unlitTexturesShader]))
            return;

         console .error ("X_ITE: Unlit shading is not available, using fallback VRML shader.");

         // Recompile shader.
         this [_unlitTexturesShader] ._parts [0] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.vs") ];
         this [_unlitTexturesShader] ._parts [1] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.fs") ];
      },
      set_gouraud_shader_valid__: function (valid)
      {
         this [_gouraudShader] ._isValid .removeInterest ("set_gouraud_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_gouraudShader]))
            return;

         console .warn ("X_ITE: All else fails, using fallback VRML shader.");

         // Recompile shader.
         this [_gouraudShader] ._parts [0] .url = [ urls .getShaderUrl ("webgl1/Fallback.vs") ];
         this [_gouraudShader] ._parts [1] .url = [ urls .getShaderUrl ("webgl1/Fallback.fs") ];
      },
      set_phong_shader_valid__: function (valid)
      {
         this [_phongShader] ._isValid .removeInterest ("set_phong_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_phongShader]))
            return;

         console .warn ("X_ITE: Phong shading is not available, using Gouraud shading.");

         this [_phongShader] = this .getGouraudShader ();

         this .setShading (this .getBrowserOptions () .getShading ());
      },
      set_material_textures_shader_valid__: function (valid)
      {
         this [_materialTexturesShader] ._isValid .removeInterest ("set_phong_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_materialTexturesShader]))
            return;

         console .warn ("X_ITE: Texture material shading is not available, using Gouraud shading.");

         this [_materialTexturesShader] = this .getGouraudShader ();

         this .setShading (this .getBrowserOptions () .getShading ());
      },
      set_shadow_shader_valid__: function (valid)
      {
         this [_shadowShader] ._isValid .removeInterest ("set_shadow_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_shadowShader]))
            return;

         console .warn ("X_ITE: Shadow shading is not available, using Gouraud shading.");

         this [_shadowShader] = this .getGouraudShader ();
      },
   };

   return X3DShadersContext;
});
