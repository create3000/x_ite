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
   "x_ite/Components/Rendering/X3DGeometryNode",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGeometryNode,
          X3DConstants,
          Vector3)
{
"use strict";

   function TriangleSet2D (executionContext)
   {
      X3DGeometryNode .call (this, executionContext);

      this .addType (X3DConstants .TriangleSet2D);

      this .setGeometryType (2);

      this .vertices_ .setUnit ("length");
   }

   TriangleSet2D .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
   {
      constructor: TriangleSet2D,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "vertices", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "TriangleSet2D";
      },
      getComponentName: function ()
      {
         return "Geometry2D";
      },
      getContainerField: function ()
      {
         return "geometry";
      },
      build: function ()
      {
         var
            vertices    = this .vertices_ .getValue (),
            normalArray = this .getNormals (),
            vertexArray = this .getVertices ();

         for (var i = 0, length = this .vertices_ .length * 2; i < length; i += 2)
         {
            normalArray .push (0, 0, 1);
            vertexArray .push (vertices [i], vertices [i + 1], 0, 1);
         }

         this .setSolid (this .solid_ .getValue ());
      },
      buildTexCoords: function ()
      {
         var texCoordArray = this .getTexCoords ();

         if (texCoordArray .length === 0)
         {
            var
               p             = this .getTexCoordParams (),
               min           = p .min,
               Ssize         = p .Ssize,
               vertexArray   = this .getVertices () .getValue ();

            for (var i = 0, length = vertexArray .length; i < length; i += 4)
            {
               texCoordArray .push ((vertexArray [i]     - min [0]) / Ssize,
                                    (vertexArray [i + 1] - min [1]) / Ssize,
                                    0,
                                    1);
            }

            texCoordArray .shrinkToFit ();
         }

         return texCoordArray;
      },
   });

   return TriangleSet2D;
});
