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
   "x_ite/Browser/Networking/urls",
],
function (Shading,
          ComposedShader,
          ShaderPart,
          urls)
{
"use strict";

   const
      _wireframe      = Symbol (),
      _primitiveModes = Symbol (),
      _defaultShader  = Symbol (),
      _shaders        = Symbol ();

   function X3DShadersContext ()
   {
      this [_wireframe]      = false;
      this [_primitiveModes] = new Map ();
      this [_shaders]        = new Map ();
   }

   X3DShadersContext .prototype =
   {
      initialize: function ()
      {
         this .getDefaultShader ();
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
      getWireframe: function ()
      {
         return this [_wireframe];
      },
      getPrimitiveMode: function (primitiveMode)
      {
         return this [_primitiveModes] .get (primitiveMode);
      },
      getDefaultShader: function ()
      {
         const vs = /* glsl */ `data:x-shader/x-vertex,
         precision highp float;

         uniform mat4 x3d_ProjectionMatrix;
         uniform mat4 x3d_ModelViewMatrix;

         attribute vec4 x3d_Vertex;

         void
         main ()
         {
            gl_Position = x3d_ProjectionMatrix * (x3d_ModelViewMatrix * x3d_Vertex);
         }
         `;

         const fs = /* glsl */ `data:x-shader/x-fragment,
         precision highp float;

         void
         main ()
         {
            gl_FragColor = vec4 (0.0);
         }
         `;

         this [_defaultShader] = this .createShader ("DefaultShader", vs, fs);

         this .setShader (_defaultShader, this [_defaultShader]);

         this .getDefaultShader = function () { return this [_defaultShader]; };

         Object .defineProperty (this, "getDefaultShader", { enumerable: false });

         return this [_defaultShader];
      },
      setShader: function (key, shaderNode)
      {
         this [_shaders] .set (key, shaderNode);
      },
      getShader: function (key)
      {
         return this [_shaders] .get (key);
      },
      getShaders: function ()
      {
         return this [_shaders] .values ();
      },
      setShading: function (type)
      {
         // Configure shaders.

         const gl = this .getContext ();

         switch (type)
         {
            case Shading .POINT:
            {
               this [_wireframe] = false;

               this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
               this [_primitiveModes] .set (gl .LINES,     gl .POINTS);
               this [_primitiveModes] .set (gl .TRIANGLES, gl .POINTS);
               break;
            }
            case Shading .WIREFRAME:
            {
               this [_wireframe] = true;

               this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
               this [_primitiveModes] .set (gl .LINES,     gl .LINES);
               this [_primitiveModes] .set (gl .TRIANGLES, gl .LINE_LOOP);
               break;
            }
            default:
            {
               // case Shading .FLAT:
               // case Shading .GOURAUD:
               // case Shading .PHONG:

               this [_wireframe] = false;

               this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
               this [_primitiveModes] .set (gl .LINES,     gl .LINES);
               this [_primitiveModes] .set (gl .TRIANGLES, gl .TRIANGLES);
               break;
            }
         }
      },
      createShader: function (name, vs, fs = vs, options = [ ])
      {
         if (this .getDebug ())
            console .info ("Initializing " + name);

         const
            gl      = this .getContext (),
            version = gl .getVersion ();

         const vertexShader = new ShaderPart (this .getPrivateScene ());
         vertexShader .setName (name + "Vertex");
         vertexShader ._url .push (vs .startsWith ("data:") ? vs : urls .getShaderUrl ("webgl" + version + "/" + vs + ".vs"));
         vertexShader .setOptions (options);
         vertexShader .setup ();

         const fragmentShader = new ShaderPart (this .getPrivateScene ());
         fragmentShader .setName (name + "Fragment");
         fragmentShader ._type  = "FRAGMENT";
         fragmentShader ._url .push (fs .startsWith ("data:") ? fs : urls .getShaderUrl ("webgl" + version + "/" + fs + ".fs"));
         fragmentShader .setOptions (options);
         fragmentShader .setup ();

         const shader = new ComposedShader (this .getPrivateScene ());
         shader .setName (name);
         shader ._language = "GLSL";
         shader ._parts .push (vertexShader);
         shader ._parts .push (fragmentShader);
         shader .setup ();

         return shader;
      },
   };

   return X3DShadersContext;
});
