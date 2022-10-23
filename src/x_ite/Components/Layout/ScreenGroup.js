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
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Rendering/TraverseType",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/ViewVolume",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DConstants,
          TraverseType,
          Vector3,
          Matrix4,
          ViewVolume)
{
"use strict";

   function ScreenGroup (executionContext)
   {
      X3DGroupingNode .call (this, executionContext);

      this .addType (X3DConstants .ScreenGroup);

      this .matrix = new Matrix4 ();
   }

   ScreenGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
   {
      constructor: ScreenGroup,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "ScreenGroup";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "children";
      },
      getBBox: function (bbox, shadow)
      {
         return this .getSubBBox (bbox, shadow) .multRight (this .matrix);
      },
      getMatrix: function ()
      {
         return this .matrix;
      },
      scale: (function ()
      {
         const
            screenScale  = new Vector3 (0, 0, 0),
            screenPoint  = new Vector3 (0, 0, 0),
            screenMatrix = new Matrix4 ();

         return function (renderObject)
         {
            // throws domain error

            const
               modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
               projectionMatrix = renderObject .getProjectionMatrix () .get (),
               viewport         = renderObject .getViewVolume () .getViewport ();

            // Determine screenMatrix.
            // Same as in ScreenText.

            renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

            const
               x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x),
               y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y),
               z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x);

            screenMatrix .set (x .x, x .y, x .z, 0,
                               y .x, y .y, y .z, 0,
                               z .x, z .y, z .z, 0,
                               modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

            // Snap to whole pixel.

            ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .z = 0;
            screenMatrix .translate (screenPoint);

            // Assign relative matrix.

            this .matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
         };
      })(),
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .CAMERA:
            case TraverseType .PICKING:
            case TraverseType .SHADOW: // ???
               // No clone support for shadow, generated cube map texture and bbox
               break;
            default:
               this .scale (renderObject);
               break;
         }

         const modelViewMatrix = renderObject .getModelViewMatrix ();

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (this .matrix);

         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

         modelViewMatrix .pop ();
      },
   });

   return ScreenGroup;
});
