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

import X3DNode                     from "../Core/X3DNode.js";
import X3DPointingDeviceSensorNode from "./X3DPointingDeviceSensorNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import Vector2                     from "../../../standard/Math/Numbers/Vector2.js";
import Matrix4                     from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTouchSensorNode (executionContext)
{
   X3DPointingDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTouchSensorNode);
}

Object .assign (Object .setPrototypeOf (X3DTouchSensorNode .prototype, X3DPointingDeviceSensorNode .prototype),
{
   set_active__ (active, hit)
   {
      X3DPointingDeviceSensorNode .prototype .set_active__ .call (this, active, hit);

      if (this ._enabled .getValue () && this ._isOver .getValue () && ! active)
         this ._touchTime = this .getBrowser () .getCurrentTime ();
   },
   set_over__: (() =>
   {
      const
         invModelViewMatrix = new Matrix4 (),
         texCoord           = new Vector2 ();

      return function (over, hit, modelViewMatrix, projectionMatrix, viewport)
      {
         X3DPointingDeviceSensorNode .prototype .set_over__ .call (this, over, hit, modelViewMatrix, projectionMatrix, viewport);

         if (this ._isOver .getValue ())
         {
            texCoord .set (hit .texCoord .x, hit .texCoord .y) .divide (hit .texCoord .w);
            invModelViewMatrix .assign (modelViewMatrix) .inverse ();

            this ._hitTexCoord_changed = texCoord;
            this ._hitNormal_changed   = modelViewMatrix .multMatrixDir (hit .normal .copy ()) .normalize ();
            this ._hitPoint_changed    = invModelViewMatrix .multVecMatrix (hit .point .copy ());
         }
      };
   })(),
});

Object .defineProperties (X3DTouchSensorNode, X3DNode .getStaticProperties ("X3DTouchSensorNode", "PointingDeviceSensor", 1));

export default X3DTouchSensorNode;
