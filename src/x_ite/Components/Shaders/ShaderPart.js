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
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Browser/Shaders/Shader",
   "x_ite/Browser/Shaders/ShaderCompiler",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Components/Networking/X3DUrlObject",
   "x_ite/InputOutput/FileLoader",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          Shader,
          ShaderCompiler,
          X3DNode,
          X3DUrlObject,
          FileLoader,
          X3DConstants)
{
"use strict";

   function ShaderPart (executionContext)
   {
      X3DNode      .call (this, executionContext);
      X3DUrlObject .call (this, executionContext);

      this .addType (X3DConstants .ShaderPart);

      this .options = [ ];
   }

   ShaderPart .prototype = Object .assign (Object .create (X3DNode .prototype),
      X3DUrlObject .prototype,
   {
      constructor: ShaderPart,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "type",                 new Fields .SFString ("VERTEX")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      ]),
      getTypeName: function ()
      {
         return "ShaderPart";
      },
      getComponentName: function ()
      {
         return "Shaders";
      },
      getContainerField: function ()
      {
         return "parts";
      },
      initialize: function ()
      {
         X3DNode      .prototype .initialize .call (this);
         X3DUrlObject .prototype .initialize .call (this);

         this ._type .addInterest ("set_type__", this);

         this .requestImmediateLoad ();
      },
      set_type__: function ()
      {
         this .setLoadState (X3DConstants .NOT_STARTED_STATE);

         this .requestImmediateLoad ();
      },
      getShader: function ()
      {
         return this .shader;
      },
      getShaderType: (function ()
      {
         const shaderTypes = new Map ([
            ["VERTEX",          "VERTEX_SHADER"],
            ["TESS_CONTROL",    "TESS_CONTROL_SHADER"],
            ["TESS_EVALUATION", "TESS_EVALUATION_SHADER"],
            ["GEOMETRY",        "GEOMETRY_SHADER"],
            ["FRAGMENT",        "FRAGMENT_SHADER"],
            ["COMPUTE",         "COMPUTE_SHADER"],
         ]);

         return function ()
         {
            return shaderTypes .get (this ._type .getValue ()) || "VERTEX_SHADER";
         };
      })(),
      getSourceText: function ()
      {
         return this ._url;
      },
      setOptions: function (value)
      {
         this .options = value;
      },
      getOptions: function ()
      {
         return this .options;
      },
      unloadNow: function ()
      {
         this .valid = false;
      },
      loadNow: function ()
      {
         new FileLoader (this) .loadDocument (this ._url,
         function (data, url)
         {
            if (data === null)
            {
               // No URL could be loaded.
               this .setLoadState (X3DConstants .FAILED_STATE);
            }
            else
            {
               const
                  browser        = this .getBrowser (),
                  gl             = browser .getContext (),
                  type           = this .getShaderType (),
                  options        = ["X3D_" + type] .concat (this .options),
                  shaderCompiler = new ShaderCompiler (gl),
                  source         = Shader .getShaderSource (gl, browser, shaderCompiler .process (data), options),
                  shader         = gl .createShader (gl [type]);

               gl .deleteShader (this .shader);

               this .shader = shader;

               gl .shaderSource (shader, source);
               gl .compileShader (shader);

               if (! gl .getShaderParameter (shader, gl .COMPILE_STATUS))
               {
                  const
                     log      = gl .getShaderInfoLog (shader),
                     match    = log .match (/(\d+):(\d+)/),
                     fileName = shaderCompiler .getSourceFileName (match [1]) || url || this .getExecutionContext () .getWorldUrl ();

                  throw new Error ("Error in " + this .getTypeName () + " '" + this .getName () + "' in URL '" + fileName + "', line " + match [2]);
               }

               this .setLoadState (X3DConstants .COMPLETE_STATE);
            }
         }
         .bind (this));
      },
      dispose: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         gl .deleteShader (this .shader);

         X3DNode .prototype .dispose .call (this);
      },
   });

   return ShaderPart;
});
