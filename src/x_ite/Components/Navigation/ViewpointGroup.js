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
import X3DChildNode         from "../Core/X3DChildNode.js";
import ProximitySensor      from "../EnvironmentalSensor/ProximitySensor.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function ViewpointGroup (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .ViewpointGroup);

   this ._size   .setUnit ("length");
   this ._center .setUnit ("length");

   this .proximitySensor  = new ProximitySensor (executionContext);
   this .cameraObjects    = [ ];
   this .viewpointGroups  = [ ];
}

ViewpointGroup .prototype = Object .assign (Object .create (X3DChildNode .prototype),
{
   constructor: ViewpointGroup,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "displayed",         new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "size",              new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "center",            new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "children",          new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ViewpointGroup";
   },
   getComponentName: function ()
   {
      return "Navigation";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["3.2", "Infinity"];
   },
   initialize: function ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this .proximitySensor .setup ();

      this ._size   .addFieldInterest (this .proximitySensor ._size);
      this ._center .addFieldInterest (this .proximitySensor ._center);

      this .proximitySensor ._size   = this ._size;
      this .proximitySensor ._center = this ._center;

      this ._displayed .addInterest ("set_displayed__", this);
      this ._size      .addInterest ("set_displayed__", this);
      this ._children  .addInterest ("set_children__", this);

      this .set_displayed__ ();
      this .set_children__ ();
   },
   isActive: function ()
   {
      return this .proximitySensor ._isActive .getValue ();
   },
   set_displayed__: function ()
   {
      var
         proxy     = ! this ._size .getValue () .equals (Vector3 .Zero),
         displayed = this ._displayed .getValue ();

      this .proximitySensor ._enabled = displayed && proxy;

      if (displayed && proxy)
      {
         this .proximitySensor ._isCameraObject   .addFieldInterest (this ._isCameraObject);
         this .proximitySensor ._isPickableObject .addFieldInterest (this ._isPickableObject);

         this .setCameraObject   (this .proximitySensor .isCameraObject ());
         this .setPickableObject (this .proximitySensor .isPickableObject ());

         this .traverse = traverseWithProximitySensor;
      }
      else
      {
         this .proximitySensor ._isCameraObject    .removeFieldInterest (this ._isCameraObject);
         this .proximitySensor ._isPickableObject .removeFieldInterest (this ._isPickableObject);

         this .setCameraObject   (displayed);
         this .setPickableObject (false);

         if (displayed)
            this .traverse = traverse;
         else
            delete this .traverse;
      }
   },
   set_children__: function ()
   {
      this .cameraObjects   .length = 0;
      this .viewpointGroups .length = 0;

      var children = this ._children;

      for (var i = 0, length = children .length; i < length; ++ i)
      {
         try
         {
            var
               innerNode = children [i] .getValue () .getInnerNode (),
               type      = innerNode .getType ();

            for (var t = type .length - 1; t >= 0; -- t)
            {
               switch (type [t])
               {
                  case X3DConstants .X3DViewpointNode:
                  {
                     this .cameraObjects .push (innerNode);
                     break;
                  }
                  case X3DConstants .ViewpointGroup:
                  {
                     this .cameraObjects   .push (innerNode);
                     this .viewpointGroups .push (innerNode);
                     break;
                  }
               }
            }
         }
         catch (error)
         { }
      }
   },
   traverse: function () { },
});

function traverseWithProximitySensor (type, renderObject)
{
   switch (type)
   {
      case TraverseType .CAMERA:
      {
         this .proximitySensor .traverse (type, renderObject);

         if (this .proximitySensor ._isActive .getValue ())
         {
            for (var i = 0, length = this .cameraObjects .length; i < length; ++ i)
               this .cameraObjects [i] .traverse (type, renderObject);
         }

         return;
      }
      case TraverseType .DISPLAY:
      {
         this .proximitySensor .traverse (type, renderObject);

         if (this .proximitySensor ._isActive .getValue ())
         {
            for (var i = 0, length = this .viewpointGroups .length; i < length; ++ i)
               this .viewpointGroups [i] .traverse (type, renderObject);
         }

         return;
      }
   }
}

function traverse (type, renderObject)
{
   switch (type)
   {
      case TraverseType .CAMERA:
      {
         for (var i = 0, length = this .cameraObjects .length; i < length; ++ i)
            this .cameraObjects [i] .traverse (type, renderObject);

         return;
      }
      case TraverseType .DISPLAY:
      {
         for (var i = 0, length = this .viewpointGroups .length; i < length; ++ i)
            this .viewpointGroups [i] .traverse (type, renderObject);

         return;
      }
   }
}

Object .defineProperties (ViewpointGroup,
{
   typeName:
   {
      value: "ViewpointGroup",
   },
   componentName:
   {
      value: "Navigation",
   },
   containerField:
   {
      value: "children",
   },
   specificationRange:
   {
      value: Object .freeze (["3.2", "Infinity"]),
   },
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
   },
});

export default ViewpointGroup;
