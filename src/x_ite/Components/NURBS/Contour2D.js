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
   "x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function Contour2D (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .Contour2D);

      this .childNodes = [ ];
   }

   Contour2D .prototype = Object .assign (Object .create (X3DNode .prototype),
   {
      constructor: Contour2D,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "Contour2D";
      },
      getComponentName: function ()
      {
         return "NURBS";
      },
      getContainerField: function ()
      {
         return "trimmingContour";
      },
      initialize: function ()
      {
         X3DNode .prototype .initialize .call (this);

         this .children_ .addInterest ("set_children__", this);

         this .set_children__ ();
      },
      set_children__: function ()
      {
         var childNodes = this .childNodes;

         childNodes .length = 0;

         for (var i = 0, length = this .children_ .length; i < length; ++ i)
         {
            var childNode = X3DCast (X3DConstants .NurbsCurve2D, this .children_ [i]);

            if (childNode)
            {
               childNodes .push (childNode);
               continue;
            }

            var childNode = X3DCast (X3DConstants .ContourPolyline2D, this .children_ [i]);

            if (childNode)
            {
               childNodes .push (childNode);
               continue;
            }
         }
      },
      addTrimmingContour: function (trimmingContours)
      {
         var childNodes = this .childNodes;

         for (var i = 0, length = childNodes .length; i < length; ++ i)
            trimmingContours .push (childNodes [i] .tessellate (2));
      }
   });

   return Contour2D;
});
