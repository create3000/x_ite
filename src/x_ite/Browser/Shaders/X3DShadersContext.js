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
      _shaders                        = Symbol (),
      _defaultShader                  = Symbol (),
      _standardShaders                = Symbol (),
      _pointShader                    = Symbol (),
      _lineShader                     = Symbol (),
      _unlitShader                    = Symbol (),
      _unlitTexturesShader            = Symbol (),
      _gouraudShader                  = Symbol (),
      _phongShader                    = Symbol (),
      _materialTexturesShader         = Symbol (),
      _physicalMaterialShader         = Symbol (),
      _physicalMaterialTexturesShader = Symbol (),
      _shadowShader                   = Symbol (),
      _depthShader                    = Symbol ();

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
         return this .getStandardShader ("getPointShader", _pointShader, "PointShader", "Point", [ ], "set_point_shader_valid__");
      },
      getLineShader: function ()
      {
         return this .getStandardShader ("getLineShader", _lineShader, "LineShader", "Line", [ ], "set_line_shader_valid__");
      },
      getUnlitShader: function ()
      {
         return this .getStandardShader ("getUnlitShader", _unlitShader, "UnlitShader", "Unlit", [ ], "set_unlit_shader_valid__");
      },
      getGouraudShader: function ()
      {
         return this .getStandardShader ("getGouraudShader", _gouraudShader, "GouraudShader", "Gouraud", [ ], "set_gouraud_shader_valid__");
      },
      getPhongShader: function ()
      {
         return this .getStandardShader ("getPhongShader", _phongShader, "PhongShader", "Phong", [ ], "set_phong_shader_valid__");
      },
      getShadowShader: function ()
      {
         return this .getStandardShader ("getShadowShader", _shadowShader, "ShadowShader", "Phong",["X3D_SHADOWS", "X3D_PCF_FILTERING"], "set_shadow_shader_valid__");
      },
      getPhysicalMaterialShader: function ()
      {
         return this .getStandardShader ("getPhysicalMaterialShader", _physicalMaterialShader, "PhysicalMaterialShader", "PBR", [ ], "set_physical_material_shader_valid__");
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
      getStandardShader: function (func, property, name, shader, options, valid)
      {
         this [property] = this .createShader (name, shader, options);

         this [property] ._isValid .addInterest (valid, this);

         this [func] = function () { return this [property]; };

         Object .defineProperty (this, func, { enumerable: false });

         return this [property];
      },
      createShader: function (name, file, options = [ ])
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

         this [_standardShaders] .push (shader);

         this .addShader (shader);

         return shader;
      },
      set_point_shader_valid__: function ()
      { },
      set_line_shader_valid__: function ()
      { },
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
      set_physical_material_shader_valid__: function (valid)
      {
         this [_physicalMaterialShader] ._isValid .removeInterest ("set_physical_material_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this [_physicalMaterialShader]))
            return;

         console .warn ("X_ITE: Physical material shading is not available, using Gouraud shading.");

         this [_physicalMaterialShader] = this .getGouraudShader ();

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
