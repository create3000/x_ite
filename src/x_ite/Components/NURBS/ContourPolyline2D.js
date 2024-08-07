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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DNurbsControlCurveNode from "./X3DNurbsControlCurveNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Vector3                  from "../../../standard/Math/Numbers/Vector3.js";

function ContourPolyline2D (executionContext)
{
   X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType (X3DConstants .ContourPolyline2D);

   this .controlPoints = [ ];
}

Object .assign (Object .setPrototypeOf (ContourPolyline2D .prototype, X3DNurbsControlCurveNode .prototype),
{
   tessellate (type)
   {
      switch (type)
      {
         case 0:
         {
            const
               controlPointArray = this ._controlPoint .getValue (),
               controlPoints     = this .controlPoints,
               length            = this ._controlPoint .length;

            for (let i = 0; i < length; ++ i)
            {
               const i2 = i * 2;

               controlPoints [i2 + 0] = controlPointArray [i2 + 0];
               controlPoints [i2 + 1] = controlPointArray [i2 + 1];
            }

            controlPoints .length = length * 2;

            return controlPoints;
         }
         case 1:
         {
            const
               controlPointArray = this ._controlPoint .getValue (),
               controlPoints     = this .controlPoints,
               length            = this ._controlPoint .length;

            for (let i = 0; i < length; ++ i)
            {
               const
                  i2 = i * 2,
                  i3 = i * 3;

               controlPoints [i3 + 0] = controlPointArray [i2 + 0];
               controlPoints [i3 + 1] = 0;
               controlPoints [i3 + 2] = controlPointArray [i2 + 1];
            }

            controlPoints .length = length * 3;

            return controlPoints;
         }
         case 3:
         {
            const
               controlPointArray = this ._controlPoint .getValue (),
               controlPoints     = this .controlPoints,
               length            = this ._controlPoint .length;

            for (let i = 0; i < length; ++ i)
            {
               const i2 = i * 2;

               controlPoints [i] = new Vector3 (controlPointArray [i2 + 0], controlPointArray [i2 + 1], 0);
            }

            controlPoints .length = length;

            return controlPoints;
         }
      }
   },
});

Object .defineProperties (ContourPolyline2D, X3DNode .staticProperties ("ContourPolyline2D", "NURBS", 3, "children", "3.0", "Infinity"));

Object .defineProperties (ContourPolyline2D,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint", new Fields .MFVec2d ()),
      ]),
      enumerable: true,
   },
});

export default ContourPolyline2D;
