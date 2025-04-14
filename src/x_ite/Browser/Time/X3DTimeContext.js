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

import Vector3 from "../../../standard/Math/Numbers/Vector3.js";

const
   _currentTime      = Symbol (),
   _currentFrameRate = Symbol (),
   _currentPosition  = Symbol (),
   _currentSpeed     = Symbol ();

function X3DTimeContext ()
{
   this [_currentTime]      = Date .now () / 1000;
   this [_currentFrameRate] = 60;
   this [_currentPosition]  = new Vector3 ();
   this [_currentSpeed]     = 0;
}

Object .assign (X3DTimeContext .prototype,
{
   getCurrentTime ()
   {
      return this [_currentTime];
   },
   getCurrentFrameRate ()
   {
      return this [_currentFrameRate];
   },
   getCurrentSpeed ()
   {
      return this [_currentSpeed];
   },
   advanceTime: (() =>
   {
      const lastPosition = new Vector3 ();

      return function ()
      {
         const
            time          = Date .now () / 1000,
            interval      = time - this [_currentTime],
            viewpointNode = this .getActiveViewpoint ();

         this [_currentTime]      = time;
         this [_currentFrameRate] = interval ? 1 / interval : 60;

         if (viewpointNode)
         {
            const cameraSpaceMatrix = viewpointNode .getCameraSpaceMatrix ();

            lastPosition .assign (this [_currentPosition]);
            this [_currentPosition] .set (cameraSpaceMatrix [12], cameraSpaceMatrix [13], cameraSpaceMatrix [14]);

            this [_currentSpeed] = lastPosition .distance (this [_currentPosition]) * this [_currentFrameRate];
         }
         else
         {
            this [_currentSpeed] = 0;
         }
      };
   })(),
});

export default X3DTimeContext;
