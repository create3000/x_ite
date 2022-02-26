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
   "x_ite/Components/Shape/X3DMaterialNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Algorithm",
],
function (X3DMaterialNode,
          X3DConstants,
          Algorithm)
{
"use strict";

   function X3DOneSidedMaterialNode (executionContext)
   {
      X3DMaterialNode .call (this, executionContext);

      this .addType (X3DConstants .X3DOneSidedMaterialNode);

      this .emissiveColor = new Float32Array (3);
   }

   X3DOneSidedMaterialNode .prototype = Object .assign (Object .create (X3DMaterialNode .prototype),
   {
      constructor: X3DOneSidedMaterialNode,
      initialize: function ()
      {
         X3DMaterialNode .prototype .initialize .call (this);

         this .emissiveColor_ .addInterest ("set_emissiveColor__", this);
         this .transparency_  .addInterest ("set_transparency__",  this);

         this .set_emissiveColor__ ();
         this .set_transparency__ ();
      },
      set_emissiveColor__: function ()
      {
         //We cannot use this in Windows Edge:
         //this .emissiveColor .set (this .emissiveColor_ .getValue ());

         const
            emissiveColor  = this .emissiveColor,
            emissiveColor_ = this .emissiveColor_ .getValue ();

         emissiveColor [0] = emissiveColor_ .r;
         emissiveColor [1] = emissiveColor_ .g;
         emissiveColor [2] = emissiveColor_ .b;
      },
      set_shininess__: function ()
      {
         this .shininess = Algorithm .clamp (this .shininess_ .getValue (), 0, 1);
      },
      set_transparency__: function ()
      {
         const transparency = Algorithm .clamp (this .transparency_ .getValue (), 0, 1);

         this .transparency = transparency;

         this .setTransparent (Boolean (transparency));
      },
   });

   return X3DOneSidedMaterialNode;
});
