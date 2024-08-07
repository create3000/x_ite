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
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";

function NurbsTextureCoordinate (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsTextureCoordinate);

   this .controlPoints = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsTextureCoordinate .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);
   },
   getControlPoints (texWeights)
   {
      const
         controlPointArray = this ._controlPoint .getValue (),
         controlPoints     = this .controlPoints;

      for (let u = 0, uDimension = this ._uDimension .getValue (); u < uDimension; ++ u)
      {
         let cp = controlPoints [u];

         if (! cp)
            cp = controlPoints [u] = [ ];

         for (let v = 0, vDimension = this ._vDimension .getValue (); v < vDimension; ++ v)
         {
            const
               index = v * uDimension + u,
               p     = cp [v] || new Vector4 (),
               i     = index * 2;

            cp [v] = p .set (controlPointArray [i], controlPointArray [i + 1], 0, texWeights ? texWeights [index] : 1);
         }
      }

      return controlPoints;
   },
   isValid ()
   {
      if (this ._uOrder .getValue () < 2)
         return false;

      if (this ._vOrder .getValue () < 2)
         return false;

      if (this ._uDimension .getValue () < this ._uOrder .getValue ())
         return false;

      if (this ._vDimension .getValue () < this ._vOrder .getValue ())
         return false;

      if (this ._controlPoint .length !== this ._uDimension .getValue () * this ._vDimension .getValue ())
         return false;

      return true;
   }
});

Object .defineProperties (NurbsTextureCoordinate, X3DNode .staticProperties ("NurbsTextureCoordinate", "NURBS", 1, "texCoord", "3.0"));

Object .defineProperties (NurbsTextureCoordinate,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default NurbsTextureCoordinate;
