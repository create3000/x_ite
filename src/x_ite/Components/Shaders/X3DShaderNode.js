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
   "x_ite/Browser/Core/Shading",
   "x_ite/Components/Shape/X3DAppearanceChildNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Rendering/TraverseType",
],
function (Fields,
          Shading,
          X3DAppearanceChildNode,
          X3DConstants,
          TraverseType)
{
"use strict";

   function X3DShaderNode (executionContext)
   {
      X3DAppearanceChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DShaderNode);

      this .addChildObjects ("activationTime", new Fields .SFTime ());

      this .valid    = false;
      this .selected = 0;
   }

   X3DShaderNode .prototype = Object .assign (Object .create (X3DAppearanceChildNode .prototype),
   {
      constructor: X3DShaderNode,
      initialize: function ()
      {
         X3DAppearanceChildNode .prototype .initialize .call (this);

         this .activate_ .addInterest ("set_activate__", this);
      },
      set_activate__: function ()
      {
         this .activationTime_ = this .getBrowser () .getCurrentTime ();
      },
      custom: true,
      setCustom: function (value)
      {
         this .custom = value;
      },
      getCustom: function ()
      {
         return this .custom;
      },
      setValid: function (value)
      {
         this .isValid_ = this .valid = value;
      },
      getValid: function ()
      {
         return this .valid;
      },
      setShading: function (shading)
      {
         var gl = this .getBrowser () .getContext ();

         switch (shading)
         {
            case Shading .POINT:
            {
               this .primitiveMode = gl .POINTS;
               this .wireframe     = true;
               break;
            }
            case Shading .WIREFRAME:
            {
               this .primitiveMode = gl .LINE_LOOP;
               this .wireframe     = true;
               break;
            }
            default:
            {
               // case Shading .FLAT:
               // case Shading .GOURAUD:
               // case Shading .PHONG:

               this .primitiveMode = gl .TRIANGLES;
               this .wireframe     = false;
               break;
            }
         }
      },
      select: function ()
      {
         ++ this .selected;

         if (! this .isSelected_ .getValue ())
            this .isSelected_ = true;
      },
      deselect: function ()
      {
         -- this .selected;

         if (this .selected === 0)
         {
            if (this .isSelected_ .getValue ())
               this .isSelected_ = false;
         }
      },
      traverse: function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         renderObject .getShaders () .add (this);
      },
   });

   return X3DShaderNode;
});
