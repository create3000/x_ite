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

import X3DBaseNode    from "../../Base/X3DBaseNode.js";
import OrthoViewpoint from "../../Components/Navigation/OrthoViewpoint.js";
import Vector2        from "../../../standard/Math/Numbers/Vector2.js";
import Vector3        from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4        from "../../../standard/Math/Numbers/Matrix4.js";
import Box3           from "../../../standard/Math/Geometry/Box3.js";
import ViewVolume     from "../../../standard/Math/Geometry/ViewVolume.js";

function X3DViewer (executionContext, navigationInfo)
{
   X3DBaseNode .call (this, executionContext);

   this .navigationInfo = navigationInfo;
}

Object .assign (Object .setPrototypeOf (X3DViewer .prototype, X3DBaseNode .prototype),
{
   getActiveLayer ()
   {
      return this .getBrowser () .getActiveLayer ();
   },
   getViewport ()
   {
      return this .getBrowser () .getActiveLayer () .getViewport () .getRectangle ();
   },
   getNavigationInfo ()
   {
      return this .navigationInfo;
   },
   getActiveViewpoint ()
   {
      return this .getBrowser () .getActiveLayer () .getViewpoint ();
   },
   getStraightenHorizon ()
   {
      const browser = this .getBrowser ();

      return browser .getBrowserOption ("StraightenHorizon") || !! browser .getPose ();
   },
   getButton (button)
   {
      // If Alt key is pressed and button 0, then emulate button 1 (middle).
      if (button === 0)
      {
         if (this .getBrowser () .getAltKey ())
         {
            return 1;
         }
      }

      return button;
   },
   isPointerInRectangle: (() =>
   {
      const pointer = new Vector2 ();

      return function (x, y)
      {
         const
            browser   = this .getBrowser (),
            rectangle = this .getViewport ();

         return browser .isPointerInRectangle (rectangle, pointer .set (x, y));
      };
   })(),
   getPointOnCenterPlane: (() =>
   {
      const
         axis     = new Vector3 (0, 0, -1),
         distance = new Vector3 (),
         far      = new Vector3 ();

      return function (x, y, result)
      {
         const
            navigationInfo   = this .getNavigationInfo (),
            viewpoint        = this .getActiveViewpoint (),
            viewport         = this .getViewport (),
            nearValue        = navigationInfo .getNearValue (viewpoint),
            farValue         = navigationInfo .getFarValue (viewpoint),
            projectionMatrix = viewpoint .getProjectionMatrixWithLimits (nearValue, farValue, viewport);

         // Far plane point
         ViewVolume .unProjectPoint (x, y, 0.9, Matrix4 .Identity, projectionMatrix, viewport, far);

         if (viewpoint instanceof OrthoViewpoint)
            return result .set (far .x, far .y, -this .getDistanceToCenter (distance) .magnitude ());

         const direction = far .normalize ();

         return result .assign (direction) .multiply (this .getDistanceToCenter (distance) .magnitude () / direction .dot (axis));
      };
   })(),
   getDistanceToCenter (distance, positionOffset)
   {
      const viewpoint = this .getActiveViewpoint ();

      return (distance
         .assign (viewpoint .getPosition ())
         .add (positionOffset || viewpoint ._positionOffset .getValue ())
         .subtract (viewpoint .getUserCenterOfRotation ()));
   },
   trackballProjectToSphere (x, y, vector)
   {
      const viewport = this .getViewport ();

      x = (x - viewport [0]) / viewport [2] - 0.5;
      y = (y - viewport [1]) / viewport [3] - 0.5;

      return vector .set (x, y, tbProjectToSphere (0.5, x, y));
   },
   lookAtPoint (x, y, straightenHorizon)
   {
      if (!this .touch (x, y))
         return;

      const
         viewpoint = this .getActiveViewpoint (),
         hit       = this .getBrowser () .getHit ();

      viewpoint .lookAtPoint (this .getActiveLayer (), hit .point, 1, 2 - 1.618034, straightenHorizon);
   },
   lookAtBBox (x, y, straightenHorizon)
   {
      if (!this .touch (x, y))
         return;

      const
         viewpoint = this .getActiveViewpoint (),
         hit       = this .getBrowser () .getHit ();

      const bbox = hit .shapeNode .getBBox (new Box3 ())
         .multRight (hit .modelViewMatrix)
         .multRight (viewpoint .getCameraSpaceMatrix ());

      viewpoint .lookAtBBox (this .getActiveLayer (), bbox, 1, 2 - 1.618034, straightenHorizon);
   },
   touch (x, y)
   {
      return this .getBrowser () .touch (x, y);
   },
});

function tbProjectToSphere (r, x, y)
{
   const d = Math .hypot (x, y);

   if (d < r * Math .SQRT1_2) // Inside sphere
   {
      return Math .sqrt (r * r - d * d);
   }

   // On hyperbola

   const t = r / Math .SQRT2;

   return t * t / d;
}

export default X3DViewer;
