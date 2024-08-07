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

import X3DNode         from "../Core/X3DNode.js";
import X3DGroupingNode from "./X3DGroupingNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4       from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTransformMatrix3DNode (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTransformMatrix3DNode);

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (X3DTransformMatrix3DNode .prototype, X3DGroupingNode .prototype),
{
   getBBox (bbox, shadows)
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         return this .getSubBBox (bbox, shadows) .multRight (this .matrix);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getMatrix ()
   {
      return this .matrix;
   },
   setMatrix (matrix)
   {
      if (matrix .equals (Matrix4 .Identity))
      {
         this .matrix .identity ();

         this .getBBox  = this .getSubBBox;
         this .traverse = this .groupTraverse;
      }
      else
      {
         this .matrix .assign (matrix);

         delete this .getBBox;
         delete this .traverse;
      }
   },
   setTransform (t, r, s, so, c)
   {
      if (t .equals (Vector3 .Zero) && r .equals (Rotation4 .Identity) && s .equals (Vector3 .One))
      {
         this .matrix .identity ();

         this .getBBox  = this .getSubBBox;
         this .traverse = this .groupTraverse;
      }
      else
      {
         this .matrix .set (t, r, s, so, c);

         delete this .getBBox;
         delete this .traverse;
      }
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse: X3DGroupingNode .prototype .traverse,
});

Object .defineProperties (X3DTransformMatrix3DNode, X3DNode .staticProperties ("X3DTransformMatrix3DNode", "Grouping", 1));

export default X3DTransformMatrix3DNode;
