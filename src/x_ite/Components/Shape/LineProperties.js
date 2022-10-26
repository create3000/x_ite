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
   "x_ite/Components/Shape/X3DAppearanceChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DAppearanceChildNode,
          X3DConstants)
{
"use strict";

   function LineProperties (executionContext)
   {
      X3DAppearanceChildNode .call (this, executionContext);

      this .addType (X3DConstants .LineProperties);
   }

   LineProperties .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
   {
      constructor: LineProperties,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "applied",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linetype",             new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "linewidthScaleFactor", new Fields .SFFloat ()),
      ]),
      getTypeName: function ()
      {
         return "LineProperties";
      },
      getComponentName: function ()
      {
         return "Shape";
      },
      getContainerField: function ()
      {
         return "lineProperties";
      },
      initialize: function ()
      {
         X3DAppearanceChildNode .prototype .initialize .call (this);

         this ._applied              .addInterest ("set_applied__",              this);
         this ._linetype             .addInterest ("set_linetype__",             this);
         this ._linewidthScaleFactor .addInterest ("set_linewidthScaleFactor__", this);

         this .set_applied__ ();
         this .set_linetype__ ();
         this .set_linewidthScaleFactor__ ();

         if (this .mustTransformLines)
            browser .getLineTransformShader ();
      },
      getApplied: function ()
      {
         return this .applied;
      },
      getLinetype: function ()
      {
         return this .linetype;
      },
      getLinewidthScaleFactor: function ()
      {
         return this .linewidthScaleFactor;
      },
      getMustTransformLines: function ()
      {
         return this .mustTransformLines;
      },
      set_applied__: function ()
      {
         this .applied = this ._applied .getValue ();
      },
      set_linetype__: function ()
      {
         let linetype = this ._linetype .getValue ();

         if (linetype < 1 || linetype > 16)
            linetype = 1;

         this .linetype = linetype;
      },
      set_linewidthScaleFactor__: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         this .linewidthScaleFactor = Math .max (1, this ._linewidthScaleFactor .getValue ());
         this .mustTransformLines   = gl .MUST_TRANSFORM_LINES && this .linewidthScaleFactor > 1;
      },
      setShaderUniforms: function (gl, shaderObject)
      {
         if (this .applied)
         {
            const
               browser     = shaderObject .getBrowser (),
               texture     = browser .getLinetypeTexture (this .linetype),
               textureUnit = browser .getTexture2DUnit ();

            gl .lineWidth (this .linewidthScaleFactor);
            gl .uniform1i (shaderObject .x3d_LinePropertiesApplied,              true);
            gl .uniform1f (shaderObject .x3d_LinePropertiesLinewidthScaleFactor, this .linewidthScaleFactor);

            gl .activeTexture (gl .TEXTURE0 + textureUnit);
            gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
            gl .uniform1i (shaderObject .x3d_LinePropertiesLinetype, textureUnit);
         }
         else
         {
            gl .lineWidth (1);
            gl .uniform1i (shaderObject .x3d_LinePropertiesApplied,              false);
            gl .uniform1f (shaderObject .x3d_LinePropertiesLinewidthScaleFactor, 1);
         }
      },
   });

   return LineProperties;
});
