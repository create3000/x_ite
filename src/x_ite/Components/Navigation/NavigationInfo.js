/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DBindableNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DBindableNode,
          TraverseType,
          X3DConstants)
{
"use strict";

   const TransitionType =
   {
      TELEPORT: true,
      LINEAR:   true,
      ANIMATE:  true,
   };

   function NavigationInfo (executionContext)
   {
      X3DBindableNode .call (this, executionContext);

      this .addType (X3DConstants .NavigationInfo);

      this .addChildObjects ("transitionStart",  new Fields .SFBool (),
                             "availableViewers", new Fields .MFString (),
                             "viewer",           new Fields .SFString ("EXAMINE"));

      this .avatarSize_      .setUnit ("length");
      this .speed_           .setUnit ("speed");
      this .visibilityLimit_ .setUnit ("speed");
   }

   NavigationInfo .prototype = Object .assign (Object .create (X3DBindableNode .prototype),
   {
      constructor: NavigationInfo,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .MFString ("EXAMINE", "ANY")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "avatarSize",         new Fields .MFFloat (0.25, 1.6, 0.75)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "speed",              new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "headlight",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "visibilityLimit",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transitionType",     new Fields .MFString ("LINEAR")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "transitionTime",     new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "transitionComplete", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",            new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",           new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "NavigationInfo";
      },
      getComponentName: function ()
      {
         return "Navigation";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DBindableNode .prototype .initialize .call (this);

         this .type_               .addInterest ("set_type__",               this);
         this .headlight_          .addInterest ("set_headlight__",          this);
         this .transitionStart_    .addInterest ("set_transitionStart__",    this);
         this .transitionComplete_ .addInterest ("set_transitionComplete__", this);
         this .isBound_            .addInterest ("set_isBound__",            this);

         this .set_type__ ();
         this .set_headlight__ ();
      },
      getViewer: function ()
      {
         return this .viewer_ .getValue ();
      },
      getCollisionRadius: function ()
      {
         if (this .avatarSize_ .length > 0)
         {
            if (this .avatarSize_ [0] > 0)
               return this .avatarSize_ [0];
         }

         return 0.25;
      },
      getAvatarHeight: function ()
      {
         if (this .avatarSize_ .length > 1)
            return this .avatarSize_ [1];

         return 1.6;
      },
      getStepHeight: function ()
      {
         if (this .avatarSize_ .length > 2)
            return this .avatarSize_ [2];

         return 0.75;
      },
      getNearValue: function ()
      {
         const nearValue = this .getCollisionRadius ();

         if (nearValue === 0)
            return 1e-5;

         else
            return nearValue / 2;
      },
      getFarValue: function (viewpoint)
      {
         return this .visibilityLimit_ .getValue ()
                ? this .visibilityLimit_ .getValue ()
                : viewpoint .getMaxFarValue ();
      },
      getTransitionType: function ()
      {
         for (const value of this .transitionType_)
         {
            const transitionType = TransitionType [value];

            if (transitionType)
               return value;
         }

         return "LINEAR";
      },
      set_type__: function ()
      {
         // Determine active viewer.

         this .viewer_ = "EXAMINE";

         for (const string of this .type_)
         {
            switch (string)
            {
               case "EXAMINE":
               case "WALK":
               case "FLY":
               case "LOOKAT":
               case "PLANE":
               case "NONE":
                  this .viewer_ = string;
                  break;
               case "PLANE_create3000.de":
                  this .viewer_ = "PLANE";
                  break;
               default:
                  continue;
            }

            // Leave for loop.
            break;
         }

         // Determine available viewers.

         let
            examineViewer = false,
            walkViewer    = false,
            flyViewer     = false,
            planeViewer   = false,
            noneViewer    = false,
            lookAt        = false;

         if (! this .type_ .length)
         {
            examineViewer = true;
            walkViewer    = true;
            flyViewer     = true;
            planeViewer   = true;
            noneViewer    = true;
            lookAt        = true;
         }
         else
         {
            for (const string of this .type_)
            {
               switch (string)
               {
                  case "EXAMINE":
                     examineViewer = true;
                     continue;
                  case "WALK":
                     walkViewer = true;
                     continue;
                  case "FLY":
                     flyViewer = true;
                     continue;
                  case "LOOKAT":
                     lookAt = true;
                     continue;
                  case "PLANE":
                     planeViewer = true;
                     continue;
                  case "NONE":
                     noneViewer = true;
                     continue;
                  case "ANY":
                     examineViewer = true;
                     walkViewer    = true;
                     flyViewer     = true;
                     planeViewer   = true;
                     noneViewer    = true;
                     lookAt        = true;
                     break;
                  default:
                     // Some string defaults to EXAMINE.
                     examineViewer = true;
                     continue;
               }

               break;
            }
         }

         this .availableViewers_ .length = 0;

         if (examineViewer)
            this .availableViewers_ .push ("EXAMINE");

         if (walkViewer)
            this .availableViewers_ .push ("WALK");

         if (flyViewer)
            this .availableViewers_ .push ("FLY");

         if (planeViewer)
            this .availableViewers_ .push ("PLANE");

         if (lookAt)
            this .availableViewers_ .push ("LOOKAT");

         if (noneViewer)
            this .availableViewers_ .push ("NONE");
      },
      set_headlight__: function ()
      {
         if (this .headlight_ .getValue ())
            delete this .enable;
         else
            this .enable = Function .prototype;
      },
      set_transitionStart__: function ()
      {
         if (! this .transitionActive_ .getValue ())
            this .transitionActive_ = true;
      },
      set_transitionComplete__: function ()
      {
         if (this .transitionActive_ .getValue ())
            this .transitionActive_ = false;
      },
      set_isBound__: function ()
      {
         if (this .isBound_ .getValue ())
            return;

         if (this .transitionActive_ .getValue ())
            this .transitionActive_ = false;
      },
      enable: function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         if (this .headlight_ .getValue ())
            renderObject .getGlobalObjects () .push (renderObject .getBrowser () .getHeadlight ());
      },
      traverse: function (type, renderObject)
      {
         if (type !== TraverseType .CAMERA)
            return;

         renderObject .getLayer () .getNavigationInfos () .push (this);
      }
   });

   return NavigationInfo;
});
