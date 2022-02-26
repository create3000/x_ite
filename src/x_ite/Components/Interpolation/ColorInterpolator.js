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
   "x_ite/Components/Interpolation/X3DInterpolatorNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Color3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode,
          X3DConstants,
          Color3)
{
"use strict";

   function ColorInterpolator (executionContext)
   {
      X3DInterpolatorNode .call (this, executionContext);

      this .addType (X3DConstants .ColorInterpolator);

      this .hsv = [ ];
   }

   ColorInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
   {
      constructor: ColorInterpolator,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFColor ()),
      ]),
      getTypeName: function ()
      {
         return "ColorInterpolator";
      },
      getComponentName: function ()
      {
         return "Interpolation";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DInterpolatorNode .prototype .initialize .call (this);

         this .keyValue_ .addInterest ("set_keyValue__", this);
      },
      set_keyValue__: function ()
      {
         var keyValue = this .keyValue_;

         if (keyValue .length < this .key_ .length)
            this .keyValue_ .resize (this .key_ .length, keyValue .length ? keyValue [this .keyValue_ .length - 1] : new Fields .SFColor ());

         this .hsv .length = 0;

         for (var i = 0, length = keyValue .length; i < length; ++ i)
            this .hsv .push (keyValue [i] .getHSV ([ ]));
      },
      interpolate: (function ()
      {
         var value = [ ];

         return function (index0, index1, weight)
         {
            Color3 .lerp (this .hsv [index0], this .hsv [index1], weight, value);

            this .value_changed_ .setHSV (value [0], value [1], value [2]);
         };
      })(),
   });

   return ColorInterpolator;
});
