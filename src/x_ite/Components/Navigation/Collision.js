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
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Collision (executionContext)
{
   X3DGroupingNode .call (this, executionContext);
   X3DSensorNode   .call (this, executionContext);

   this .addType (X3DConstants .Collision);

   // Legacy

   if (executionContext .getSpecificationVersion () == 2.0)
      this .addAlias ("collide", this ._enabled); // VRML2
}

Object .assign (Object .setPrototypeOf (Collision .prototype, X3DGroupingNode .prototype),
   X3DSensorNode .prototype,
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);
      // X3DSensorNode .prototype .initialize .call (this); // We can only call the base of a *Objects.

      this .getLive () .addInterest ("set_live__", this);
      this ._enabled  .addInterest ("set_live__", this);
      this ._proxy    .addInterest ("set_proxy__", this);

      this .set_live__ ();
      this .set_proxy__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._enabled .getValue ())
         this .getBrowser () .addCollision (this);

      else
         this .getBrowser () .removeCollision (this);
   },
   set_active (value)
   {
      if (this ._isActive .getValue () !== value)
      {
         this ._isActive = value;

         if (value)
            this ._collideTime = this .getBrowser () .getCurrentTime ();
      }
   },
   set_proxy__ ()
   {
      this .proxyNode = X3DCast (X3DConstants .X3DChildNode, this ._proxy);
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .COLLISION:
         {
            if (this ._enabled .getValue ())
            {
               const collisions = renderObject .getCollisions ();

               collisions .push (this);

               if (this .proxyNode)
                  this .proxyNode .traverse (type, renderObject);

               else
                  X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

               collisions .pop ();
            }

            return;
         }
         default:
         {
            X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
            return;
         }
      }
   },
   dispose ()
   {
      // X3DSensorNode .prototype .dispose .call (this); // We can only call the base of a *Objects.
      X3DGroupingNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (Collision,
{
   typeName:
   {
      value: "Collision",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Navigation", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "2.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "collideTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "proxy",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Collision;
