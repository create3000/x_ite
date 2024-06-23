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

import X3DBaseNode     from "../Base/X3DBaseNode.js";
import X3DRenderObject from "./X3DRenderObject.js";
import TraverseType    from "./TraverseType.js";

function DependentRenderer (executionContext, renderObject, node)
{
   X3DBaseNode     .call (this, executionContext);
   X3DRenderObject .call (this, executionContext);

   this .node         = node;
   this .renderObject = renderObject;
}

Object .assign (Object .setPrototypeOf (DependentRenderer .prototype, X3DBaseNode .prototype),
   X3DRenderObject .prototype,
{
   initialize ()
   {
      X3DBaseNode     .prototype .initialize .call (this);
      X3DRenderObject .prototype .initialize .call (this);
   },
   isIndependent ()
   {
      return false;
   },
   getNode ()
   {
      return this .node;
   },
   getLayer ()
   {
      return this .renderObject .getLayer ();
   },
   getBackground ()
   {
      return this .renderObject .getBackground ();
   },
   getFog ()
   {
      return this .renderObject .getFog ();
   },
   getNavigationInfo ()
   {
      return this .renderObject .getNavigationInfo ();
   },
   getViewpoint ()
   {
      return this .renderObject .getViewpoint ();
   },
   getViewpointStack ()
   {
      return this .renderObject .getViewpointStack ();
   },
   getLightContainer ()
   {
      return this .renderObject .getLights () [this .lightIndex ++];
   },
   render (type, callback, group)
   {
      switch (type)
      {
         case TraverseType .COLLISION:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);
            break;
         }
         case TraverseType .SHADOW:
         {
            X3DRenderObject .prototype .render .call (this, type, callback, group);
            break;
         }
         case TraverseType .DISPLAY:
         {
            this .lightIndex = 0;

            X3DRenderObject .prototype .render .call (this, type, callback, group);

            for (const light of this .renderObject .getLights ())
               light .modelViewMatrix .pop ();

            break;
         }
      }
   },
});

for (const key of Object .keys (DependentRenderer .prototype))
   Object .defineProperty (DependentRenderer .prototype, key, { enumerable: false });

export default DependentRenderer;
