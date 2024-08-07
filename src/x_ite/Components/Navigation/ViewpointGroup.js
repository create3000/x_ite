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
import X3DChildNode         from "../Core/X3DChildNode.js";
import ProximitySensor      from "../EnvironmentalSensor/ProximitySensor.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function ViewpointGroup (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .ViewpointGroup);

   this ._size   .setUnit ("length");
   this ._center .setUnit ("length");

   this .setCameraObject (true);

   this .proximitySensor  = new ProximitySensor (executionContext);
   this .cameraObjects    = [ ];
   this .viewpointGroups  = [ ];
}

Object .assign (Object .setPrototypeOf (ViewpointGroup .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this .proximitySensor .setup ();

      this ._size   .addFieldInterest (this .proximitySensor ._size);
      this ._center .addFieldInterest (this .proximitySensor ._center);

      this .proximitySensor ._size   = this ._size;
      this .proximitySensor ._center = this ._center;

      this ._size      .addInterest ("set_size__",     this);
      this ._children  .addInterest ("set_children__", this);

      this .set_size__ ();
      this .set_children__ ();
   },
   set_size__ ()
   {
      this .proximitySensor ._enabled = !this ._size .getValue () .equals (Vector3 .Zero);
   },
   set_children__ ()
   {
      this .cameraObjects   .length = 0;
      this .viewpointGroups .length = 0;

      for (const child of this ._children)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!childNode)
            continue;

         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DViewpointNode:
               {
                  this .cameraObjects .push (childNode);
                  break;
               }
               case X3DConstants .ViewpointGroup:
               {
                  this .cameraObjects   .push (childNode);
                  this .viewpointGroups .push (childNode);
                  break;
               }
            }
         }
      }
   },
   traverse (type, renderObject)
   {
      const proximitySensor = this .proximitySensor;

      switch (type)
      {
         case TraverseType .CAMERA:
         {
            proximitySensor .traverse (type, renderObject);

            if (proximitySensor ._isActive .getValue () || !proximitySensor ._enabled .getValue ())
            {
               renderObject .getViewpointGroups () .push (this);

               for (const cameraObject of this .cameraObjects)
                  cameraObject .traverse (type, renderObject);

               renderObject .getViewpointGroups () .pop ();
            }

            return;
         }
         case TraverseType .DISPLAY:
         {
            proximitySensor .traverse (type, renderObject);

            if (proximitySensor ._isActive .getValue () || !proximitySensor ._enabled .getValue ())
            {
               for (const viewpointGroup of this .viewpointGroups)
                  viewpointGroup .traverse (type, renderObject);
            }

            return;
         }
      }
   },
});

Object .defineProperties (ViewpointGroup,
{
   ... X3DNode .getStaticProperties ("ViewpointGroup", "Navigation", 3, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displayed",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",              new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default ViewpointGroup;
