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

   function X3DShadersContext ()
   {
      this .shaders = new Set ();
   }

   X3DShadersContext .prototype =
   {
      initialize: function ()
      {
         this .setShading (this .getBrowserOptions () .getShading ());
      },
      getShadingLanguageVersion: function ()
      {
         return this .getContext () .getParameter (this .getContext () .SHADING_LANGUAGE_VERSION);
      },
      getMaxVertexUniformVectors: function ()
      {
         return this .getContext () .getParameter (this .getContext () .MAX_VERTEX_UNIFORM_VECTORS);
      },
      getMaxFragmentUniformVectors: function ()
      {
         return this .getContext () .getParameter (this .getContext () .MAX_FRAGMENT_UNIFORM_VECTORS);
      },
      getMaxVertexAttribs: function ()
      {
         return this .getContext () .getParameter (this .getContext () .MAX_VERTEX_ATTRIBS);
      },
      addShader: function (shader)
      {
         this .shaders .add (shader);

         shader .setShading (this .getBrowserOptions () .getShading ());
      },
      removeShader: function (shader)
      {
         this .shaders .delete (shader);
      },
      getShaders: function ()
      {
         return this .shaders;
      },
      getDefaultShader: function ()
      {
         return this .defaultShader;
      },
      hasPointShader: function ()
      {
         return !! this .pointShader;
      },
      getPointShader: function ()
      {
         this .pointShader = this .createShader ("PointShader", "PointSet");

         this .getPointShader = function () { return this .pointShader; };

         Object .defineProperty (this, "getPointShader", { enumerable: false });

         return this .pointShader;
      },
      hasLineShader: function ()
      {
         return !! this .lineShader;
      },
      getLineShader: function ()
      {
         this .lineShader = this .createShader ("WireframeShader", "Wireframe");

         this .getLineShader = function () { return this .lineShader; };

         Object .defineProperty (this, "getLineShader", { enumerable: false });

         return this .lineShader;
      },
      hasUnlitShader: function ()
      {
         return !! this .unlitShader;
      },
      getUnlitShader: function ()
      {
         this .unlitShader = this .createShader ("UnlitShader", "Unlit");

         this .unlitShader .isValid_ .addInterest ("set_unlit_shader_valid__", this);

         this .getUnlitShader = function () { return this .unlitShader; };

         Object .defineProperty (this, "getUnlitShader", { enumerable: false });

         return this .unlitShader;
      },
      hasGouraudShader: function ()
      {
         return !! this .gouraudShader;
      },
      getGouraudShader: function ()
      {
         this .gouraudShader = this .createShader ("GouraudShader", "Gouraud", false);

         this .gouraudShader .isValid_ .addInterest ("set_gouraud_shader_valid__", this);

         this .getGouraudShader = function () { return this .gouraudShader; };

         Object .defineProperty (this, "getGouraudShader", { enumerable: false });

         return this .gouraudShader;
      },
      hasPhongShader: function ()
      {
         return !! this .phongShader;
      },
      getPhongShader: function ()
      {
         this .phongShader = this .createShader ("PhongShader", "Phong", false);

         this .phongShader .isValid_ .addInterest ("set_phong_shader_valid__", this);

         this .getPhongShader = function () { return this .phongShader; };

         Object .defineProperty (this, "getPhongShader", { enumerable: false });

         return this .phongShader;
      },
      hasShadowShader: function ()
      {
         return !! this .shadowShader;
      },
      getShadowShader: function ()
      {
         this .shadowShader = this .createShader ("ShadowShader", "Phong", true);

         this .shadowShader .isValid_ .addInterest ("set_shadow_shader_valid__", this);

         this .getShadowShader = function () { return this .shadowShader; };

         Object .defineProperty (this, "getShadowShader", { enumerable: false });

         return this .shadowShader;
      },
      hasDepthShader: function ()
      {
         return !! this .depthShader;
      },
      getDepthShader: function ()
      {
         this .depthShader = this .createShader ("DepthShader", "Depth");

         this .getDepthShader = function () { return this .depthShader; };

         Object .defineProperty (this, "getDepthShader", { enumerable: false });

         return this .depthShader;
      },
      setShading: function (type)
      {
         switch (type)
         {
            case Shading .PHONG:
            {
               this .defaultShader = this .getPhongShader ();
               break;
            }
            default:
            {
               this .defaultShader = this .getGouraudShader ();
               break;
            }
         }

         // Configure shaders.

         for (const shader of this .getShaders ())
            shader .setShading (type);
      },
      createShader: function (name, file, shadow = false)
      {
         if (this .getDebug ())
            console .log ("Initializing " + name);

         const version = this .getContext () .getVersion ();

         const vertexShader = new ShaderPart (this .getPrivateScene ());
         vertexShader .setName (name + "Vertex");
         vertexShader .url_ .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".vs"));
         vertexShader .setShadow (shadow);
         vertexShader .setup ();

         const fragmentShader = new ShaderPart (this .getPrivateScene ());
         fragmentShader .setName (name + "Fragment");
         fragmentShader .type_  = "FRAGMENT";
         fragmentShader .url_ .push (urls .getShaderUrl ("webgl" + version + "/" + file + ".fs"));
         fragmentShader .setShadow (shadow);
         fragmentShader .setup ();

         const shader = new ComposedShader (this .getPrivateScene ());
         shader .setName (name);
         shader .language_ = "GLSL";
         shader .parts_ .push (vertexShader);
         shader .parts_ .push (fragmentShader);
         shader .setCustom (false);
         shader .setShading (this .getBrowserOptions () .getShading ());
         shader .setup ();

         this .addShader (shader);

         return shader;
      },
      set_unlit_shader_valid__: function (valid)
      {
         this .unlitShader .isValid_ .removeInterest ("set_unlit_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this .unlitShader))
            return;

         console .error ("X_ITE: Unlit shading is not available, using fallback VRML shader.");

         // Recompile shader.
         this .unlitShader .parts_ [0] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.vs") ];
         this .unlitShader .parts_ [1] .url = [ urls .getShaderUrl ("webgl1/FallbackUnlit.fs") ];
      },
      set_gouraud_shader_valid__: function (valid)
      {
         this .gouraudShader .isValid_ .removeInterest ("set_gouraud_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this .gouraudShader))
            return;

         console .warn ("X_ITE: All else fails, using fallback VRML shader.");

         // Recompile shader.
         this .gouraudShader .parts_ [0] .url = [ urls .getShaderUrl ("webgl1/Fallback.vs") ];
         this .gouraudShader .parts_ [1] .url = [ urls .getShaderUrl ("webgl1/Fallback.fs") ];
      },
      set_phong_shader_valid__: function (valid)
      {
         this .phongShader .isValid_ .removeInterest ("set_phong_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this .phongShader))
            return;

         console .warn ("X_ITE: Phong shading is not available, using Gouraud shading.");

         this .phongShader = this .getGouraudShader ();

         this .setShading (this .getBrowserOptions () .getShading ());
      },
      set_shadow_shader_valid__: function (valid)
      {
         this .shadowShader .isValid_ .removeInterest ("set_shadow_shader_valid__", this);

         if (valid .getValue () && ShaderTest .verify (this, this .shadowShader))
            return;

         console .warn ("X_ITE: Shadow shading is not available, using Gouraud shading.");

         this .shadowShader = this .getGouraudShader ();
      },
   };

   return X3DShadersContext;
});
