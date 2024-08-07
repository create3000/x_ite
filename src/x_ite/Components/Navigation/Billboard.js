/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Billboard (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .Billboard);

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Billboard .prototype, X3DGroupingNode .prototype),
{
   getBBox (bbox, shadows)
   {
      return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadows) .multRight (this .matrix);
   },
   getMatrix ()
   {
      return this .matrix;
   },
   rotate: (() =>
   {
      const
         inverseModelViewMatrix = new Matrix4 (),
         viewerYAxis            = new Vector3 (),
         y                      = new Vector3 (),
         N1                     = new Vector3 (),
         N2                     = new Vector3 (),
         rotation               = new Rotation4 ();

      return function (modelViewMatrix)
      {
         // throws domain error

         inverseModelViewMatrix .assign (modelViewMatrix) .inverse ();

         const billboardToViewer = inverseModelViewMatrix .origin .normalize (); // Normalized to get work with Geo

         if (this ._axisOfRotation .getValue () .equals (Vector3 .Zero))
         {
            inverseModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis)) .normalize (); // Normalized to get work with Geo

            const x = viewerYAxis .cross (billboardToViewer);
            y .assign (billboardToViewer) .cross (x);
            const z = billboardToViewer;

            // Compose rotation

            x .normalize ();
            y .normalize ();

            this .matrix .set (x .x, x .y, x .z, 0,
                               y .x, y .y, y .z, 0,
                               z .x, z .y, z .z, 0,
                               0,    0,    0,    1);
         }
         else
         {
            N1 .assign (this ._axisOfRotation .getValue ()) .cross (billboardToViewer); // Normal vector of plane as in specification
            N2 .assign (this ._axisOfRotation .getValue ()) .cross (Vector3 .zAxis);    // Normal vector of plane between axisOfRotation and zAxis

            this .matrix .setRotation (rotation .setFromToVec (N2, N1));                // Rotate zAxis in plane
         }

         return this .matrix;
      };
   })(),
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();

      switch (type)
      {
         case TraverseType .CAMERA:
         case TraverseType .PICKING:
         case TraverseType .SHADOW:
            // No clone support for shadows, generated cube map texture, and bbox
            modelViewMatrix .multLeft (this .matrix);
            break;
         default:
            modelViewMatrix .multLeft (this .rotate (modelViewMatrix .get ()));
            break;
      }

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (Billboard, X3DNode .getStaticProperties ("Billboard", "Navigation", 2, "children", "2.0"));

Object .defineProperties (Billboard,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axisOfRotation", new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Billboard;
