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
   "x_ite/Base/X3DBaseNode",
   "x_ite/Components/Geometry3D/IndexedFaceSet",
   "x_ite/Components/Rendering/Coordinate",
   "x_ite/Components/Texturing/TextureCoordinate",
   "standard/Math/Numbers/Complex",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DBaseNode,
          IndexedFaceSet,
          Coordinate,
          TextureCoordinate,
          Complex,
          Vector2,
          Vector3)
{
"use strict";

   function QuadSphereOptions (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addChildObjects ("xDimension", new Fields .SFInt32 (32),
                             "yDimension", new Fields .SFInt32 (15))
   }

   QuadSphereOptions .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: QuadSphereOptions,
      getTypeName: function ()
      {
         return "QuadSphereOptions";
      },
      getComponentName: function ()
      {
         return "X_ITE";
      },
      getContainerField: function ()
      {
         return "quadSphereOptions";
      },
      initialize: function ()
      {
         X3DBaseNode .prototype .initialize .call (this);

         this .addInterest ("eventsProcessed", this);
      },
      getGeometry: function ()
      {
         if (! this .geometry)
            this .eventsProcessed ();

         return this .geometry;
      },
      createTexCoordIndex: function ()
      {
         var
            xDimension    = this .xDimension_ .getValue () + 1,
            yDimension    = this .yDimension_ .getValue (),
            texCoordIndex = this .geometry .texCoordIndex_;

         // North pole

         for (var u = 0, uLength = xDimension - 1; u < uLength; ++ u)
         {
            texCoordIndex .push (u);
            texCoordIndex .push (u + xDimension - 1);
            texCoordIndex .push (u + xDimension);
            texCoordIndex .push (-1);
         }

         // Sphere segments

         for (var p = xDimension - 1, v = 0, vLength = yDimension - 3; v < vLength; ++ v, ++ p)
         {
            for (var u = 0, uLength = xDimension - 1; u < uLength; ++ u, ++ p)
            {
               texCoordIndex .push (p);
               texCoordIndex .push (p + xDimension);
               texCoordIndex .push (p + xDimension + 1);
               texCoordIndex .push (p + 1);
               texCoordIndex .push (-1);
            }
         }

         // South pole

         var p = (yDimension - 2) * xDimension - 1;

         for (var u = 0, uLength = xDimension - 1; u < uLength; ++ u, ++ p)
         {
            texCoordIndex .push (p + xDimension);
            texCoordIndex .push (p + 1);
            texCoordIndex .push (p);
            texCoordIndex .push (-1);
         }
      },
      createTexCoord: function ()
      {
         var
            xDimension = this .xDimension_ .getValue () + 1,
            yDimension = this .yDimension_ .getValue (),
            point      = this .geometry .texCoord_ .getValue () .point_;

            var poleOffset = -0.5 / (xDimension - 1);

            // North pole

            for (var u = 1; u < xDimension; ++ u)
            {
               var x = u / (xDimension - 1) + poleOffset;

               point .push (new Vector2 (x, 1));
            }

            // Sphere segments

            for (var v = 1, vLength = yDimension - 1; v < vLength; ++ v)
            {
               var y = 1 - v / (yDimension - 1);

               for (var u = 0; u < xDimension; ++ u)
               {
                  var x = u / (xDimension - 1);

                  point .push (new Vector2 (x, y));
               }
            }

            // South pole

            for (var u = 1; u < xDimension; ++ u)
            {
               var x = u / (xDimension - 1) + poleOffset;

               point .push (new Vector2 (x, 0));
            }
      },
      createCoordIndex: function ()
      {
         var
            xDimension = this .xDimension_ .getValue () + 1,
            yDimension = this .yDimension_ .getValue (),
            coordIndex = this .geometry .coordIndex_;

         // North pole

         for (var u = 1, uLength = xDimension - 1; u < uLength; ++ u)
         {
            coordIndex .push (0);
            coordIndex .push (u);
            coordIndex .push (u + 1);
            coordIndex .push (-1);
         }

         coordIndex .push (0);
         coordIndex .push (u);
         coordIndex .push (1);
         coordIndex .push (-1);

         // Sphere segments

         var p = 1;

         for (var v = 0, vLength = yDimension - 3; v < vLength; ++ v, ++ p)
         {
            for (var u = 0, uLength = xDimension - 2; u < uLength; ++ u, ++ p)
            {
               coordIndex .push (p);
               coordIndex .push (p + xDimension - 1);
               coordIndex .push (p + xDimension);
               coordIndex .push (p + 1);
               coordIndex .push (-1);
            }

            coordIndex .push (p);
            coordIndex .push (p + xDimension - 1);
            coordIndex .push (p + 1);
            coordIndex .push (p - xDimension + 2);
            coordIndex .push (-1);
         }

         // South pole

         var last = p + xDimension - 1;

         for (var u = 0, uLength = xDimension - 2; u < uLength; ++ u, ++ p)
         {
            coordIndex .push (last);
            coordIndex .push (p + 1);
            coordIndex .push (p);
            coordIndex .push (-1);
         }

         coordIndex .push (last);
         coordIndex .push (last - xDimension + 1);
         coordIndex .push (p);
         coordIndex .push (-1);
      },
      createPoints: function ()
      {
         var
            xDimension = this .xDimension_ .getValue () + 1,
            yDimension = this .yDimension_ .getValue (),
            point      = this .geometry .coord_ .getValue () .point_;

         // North pole
         point .push (new Vector3 (0, 1, 0));

         // Sphere segments
         for (var v = 1, vLength = yDimension - 1; v < vLength; ++ v)
         {
            var zPlane = Complex .Polar (1, -Math .PI * v / vLength);

            for (var u = 0, uLength = xDimension - 1; u < uLength; ++ u)
            {
               var yPlane = Complex .Polar (zPlane .imag, 2 * Math .PI * u / uLength);

               point .push (new Vector3 (yPlane .imag, zPlane .real, yPlane .real));
            }
         }

         // South pole
         point .push (new Vector3 (0, -1, 0));
      },
      eventsProcessed: function ()
      {
         this .geometry            = new IndexedFaceSet (this .getExecutionContext ());
         this .geometry .texCoord_ = new TextureCoordinate (this .getExecutionContext ());
         this .geometry .coord_    = new Coordinate (this .getExecutionContext ());

         this .createTexCoordIndex ();
         this .createTexCoord ();
         this .createCoordIndex ();
         this .createPoints ();

         var
            geometry = this .geometry,
            texCoord = this .geometry .texCoord_ .getValue (),
            coord    = this .geometry .coord_ .getValue ();

         geometry .creaseAngle_ = Math .PI;

         texCoord .setup ();
         coord    .setup ();
         geometry .setup ();
      },
   });

   return QuadSphereOptions;
});
