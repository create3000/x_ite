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

import Shading        from "../Core/Shading.js";
import ShaderRegistry from "./ShaderRegistry.js";
import ComposedShader from "../../Components/Shaders/ComposedShader.js";
import ShaderPart     from "../../Components/Shaders/ShaderPart.js";
import DEVELOPMENT    from "../../DEVELOPMENT.js";

const
   _primitiveModes = Symbol (),
   _shaderNodes    = Symbol (),
   _wireframe      = Symbol ();

function X3DShadersContext ()
{
   this [_primitiveModes] = new Map ();
   this [_shaderNodes]    = new Map ();
}

Object .assign (X3DShadersContext .prototype,
{
   initialize ()
   {
      this .setShading (this .getBrowserOptions () .getShading ());
   },
   getShadingLanguageVersion ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .SHADING_LANGUAGE_VERSION);
   },
   getMaxVertexUniformVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VERTEX_UNIFORM_VECTORS);
   },
   getMaxFragmentUniformVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_FRAGMENT_UNIFORM_VECTORS);
   },
   getMaxVertexAttribs ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VERTEX_ATTRIBS);
   },
   getMaxVaryingVectors ()
   {
      const gl = this .getContext ();

      return gl .getParameter (gl .MAX_VARYING_VECTORS);
   },
   getPrimitiveMode (primitiveMode)
   {
      return this [_primitiveModes] .get (primitiveMode);
   },
   getShaders ()
   {
      return this [_shaderNodes];
   },
   setShading (type)
   {
      const gl = this .getContext ();

      switch (type)
      {
         case Shading .POINT:
         {
            this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
            this [_primitiveModes] .set (gl .LINES,     gl .POINTS);
            this [_primitiveModes] .set (gl .TRIANGLES, gl .POINTS);
            break;
         }
         case Shading .WIREFRAME:
         {
            this [_wireframe] = true;

            const ext = gl .getExtension ("WEBGL_polygon_mode");

            ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .LINE_WEBGL);

            this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
            this [_primitiveModes] .set (gl .LINES,     gl .LINES);
            this [_primitiveModes] .set (gl .TRIANGLES, gl .TRIANGLES);
            break;
         }
         default:
         {
            // case Shading .FLAT:
            // case Shading .GOURAUD:
            // case Shading .PHONG:

            if (this [_wireframe])
            {
               this [_wireframe] = false;

               const ext = gl .getExtension ("WEBGL_polygon_mode");

               ext ?.polygonModeWEBGL (gl .FRONT_AND_BACK, ext .FILL_WEBGL);
            }

            this [_primitiveModes] .set (gl .POINTS,    gl .POINTS);
            this [_primitiveModes] .set (gl .LINES,     gl .LINES);
            this [_primitiveModes] .set (gl .TRIANGLES, gl .TRIANGLES);
            break;
         }
      }
   },
   createShader (name, vs, fs = vs, options = [ ], uniformNames = [ ], transformFeedbackVaryings = [ ])
   {
      if (DEVELOPMENT)
         console .info (`Initializing ${name}Shader.`);

      const
         gl      = this .getContext (),
         version = gl .getVersion ();

      const vertexShader = new ShaderPart (this .getPrivateScene ());
      vertexShader ._url .push (encodeURI (vs .startsWith ("data:") ? vs : "data:x-shader/x-vertex," + ShaderRegistry .vertex [version] [vs]));
      vertexShader .setPrivate (true);
      vertexShader .setName (`${name}VertexShader`);
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new ShaderPart (this .getPrivateScene ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI (fs .startsWith ("data:") ? fs : "data:x-shader/x-fragment," + ShaderRegistry .fragment [version] [fs]));
      fragmentShader .setPrivate (true);
      fragmentShader .setName (`${name}FragmentShader`);
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new ComposedShader (this .getPrivateScene ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName (`${name}Shader`);
      shaderNode .setUniformNames (uniformNames);
      shaderNode .setTransformFeedbackVaryings (transformFeedbackVaryings);
      shaderNode .setup ();

      return shaderNode;
   },
});

export default X3DShadersContext;
