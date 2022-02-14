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
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/Core/X3DNode",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Numbers/Vector4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          Vector4)
{
"use strict";

   function NurbsTextureCoordinate (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .NurbsTextureCoordinate);

      this .controlPoints = [ ];
   }

   NurbsTextureCoordinate .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: NurbsTextureCoordinate,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2f ()),
      ]),
      getTypeName: function ()
      {
         return "NurbsTextureCoordinate";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "texCoord";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);
      },
      getControlPoints: function (texWeights)
      {
         var
            controlPointArray = this .controlPoint_ .getValue (),
            controlPoints     = this .controlPoints;

         for (var u = 0, uDimension = this .uDimension_ .getValue (); u < uDimension; ++ u)
         {
            var cp = controlPoints [u];

            if (! cp)
               cp = controlPoints [u] = [ ];

            for (var v = 0, vDimension = this .vDimension_ .getValue (); v < vDimension; ++ v)
            {
               var
                  index = v * uDimension + u,
                  p     = cp [v] || new Vector4 (),
                  i     = index * 2;

               cp [v] = p .set (controlPointArray [i], controlPointArray [i + 1], 0, texWeights ? texWeights [index] : 1);
            }
         }

         return controlPoints;
      },
      isValid: function ()
      {
         if (this .uOrder_ .getValue () < 2)
            return false;

         if (this .vOrder_ .getValue () < 2)
            return false;

         if (this .uDimension_ .getValue () < this .uOrder_ .getValue ())
            return false;

         if (this .vDimension_ .getValue () < this .vOrder_ .getValue ())
            return false;

         if (this .controlPoint_ .length !== this .uDimension_ .getValue () * this .vDimension_ .getValue ())
            return false;

         return true;
      }
   });

   return NurbsTextureCoordinate;
});
