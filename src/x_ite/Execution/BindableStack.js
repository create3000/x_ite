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

import X3DBaseNode from "../Base/X3DBaseNode.js";

function BindableStack (executionContext, defaultNode)
{
   X3DBaseNode .call (this, executionContext);

   this .array          = [ defaultNode ];
   this .transitionNode = defaultNode .create (executionContext);
}

BindableStack .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
{
   constructor: BindableStack,
   getTypeName: function ()
   {
      return "BindableStack";
   },
   get: function ()
   {
      return this .array;
   },
   top: function ()
   {
      return this .transitionNode ._transitionActive .getValue () ? this .transitionNode : this .array .at (-1);
   },
   pushOnTop: function (node)
   {
      if (node !== this .array [0])
      {
         this .array .at (-1) ._isBound = false;
         this .array .push (node);
      }

      // Don't do set_bind.
      node ._isBound  = true;
      node ._bindTime = this .getBrowser () .getCurrentTime ();

      this .addNodeEvent ();
   },
   update: function (layerNode, removedNodes, changedNodes)
   {
      if (removedNodes .length === 0 && changedNodes .length === 0)
         return;

      // Save top node for later use.

      const
         fromNode  = this .top (),
         boundNode = this .array .at (-1);

      // Remove invisible nodes and unbind them if needed.

      for (const removedNode of removedNodes)
      {
         const index = this .array .indexOf (removedNode);

         if (index > 0)
            this .array .splice (index, 1);
      }

      // Unbind nodes with set_bind false and pop top node.

      if (boundNode !== this .array [0])
      {
         if (changedNodes .some (node => ! node ._set_bind .getValue () && node === boundNode))
         {
            this .array .pop ();
         }
      }

      // Push nodes with set_bind true to top of stack.

      for (const bindNode of changedNodes)
      {
         if (bindNode ._set_bind .getValue ())
         {
            const index = this .array .indexOf (bindNode);

            if (index > -1)
            {
               this .array .splice (index, 1);
            }

            this .array .push (bindNode);
         }
      }

      // Bind top node if not bound.

      const top = this .array .at (-1);

      if (top !== boundNode)
      {
         // First unbind last bound node.

         boundNode ._set_bind = false;
         boundNode ._isBound  = false;

         // Now bind new top node.

         top ._set_bind = true;
         top ._isBound  = true;
         top ._bindTime = this .getBrowser () .getCurrentTime ();
      }

      // Do transition, use transition node for multiple layers support.

      this .transitionNode = top .create (this .getExecutionContext ());

      this .transitionNode .setup ();
      this .transitionNode .transitionStart (layerNode, fromNode, top);

      if (this .transitionNode ._transitionActive .getValue ())
      {
         top ._position         .addFieldInterest (this .transitionNode ._position);
         top ._orientation      .addFieldInterest (this .transitionNode ._orientation);
         top ._centerOfRotation .addFieldInterest (this .transitionNode ._centerOfRotation);
         top ._fieldOfView      .addFieldInterest (this .transitionNode ._fieldOfView);
         top ._nearDistance     .addFieldInterest (this .transitionNode ._nearDistance);
         top ._farDistance      .addFieldInterest (this .transitionNode ._farDistance);

         this .transitionNode ._transitionActive .addInterest ("set_transitionActive__", this, top);
      }

      this .addNodeEvent ();
   },
   set_transitionActive__: function (top, transitionActive)
   {
      if (transitionActive .getValue ())
         return;

      top ._position         .removeFieldInterest (this .transitionNode ._position);
      top ._orientation      .removeFieldInterest (this .transitionNode ._orientation);
      top ._centerOfRotation .removeFieldInterest (this .transitionNode ._centerOfRotation);
      top ._fieldOfView      .removeFieldInterest (this .transitionNode ._fieldOfView);
      top ._nearDistance     .removeFieldInterest (this .transitionNode ._nearDistance);
      top ._farDistance      .removeFieldInterest (this .transitionNode ._farDistance);

      this .transitionNode ._transitionActive .removeInterest ("set_transitionActive__", this);

      this .addNodeEvent ();
   },
});

for (const key of Reflect .ownKeys (BindableStack .prototype))
   Object .defineProperty (BindableStack .prototype, key, { enumerable: false });

export default BindableStack;
