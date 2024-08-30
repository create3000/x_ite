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
import X3DBindableNode      from "../Core/X3DBindableNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";

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

   this .addChildObjects (X3DConstants .outputOnly, "transitionStart",  new Fields .SFBool (),
                          X3DConstants .outputOnly, "transitionActive", new Fields .SFBool (),
                          X3DConstants .outputOnly, "availableViewers", new Fields .MFString (),
                          X3DConstants .outputOnly, "viewer",           new Fields .SFString ("EXAMINE"));

   this ._avatarSize      .setUnit ("length");
   this ._speed           .setUnit ("speed");
   this ._visibilityLimit .setUnit ("speed");
}

Object .assign (Object .setPrototypeOf (NavigationInfo .prototype, X3DBindableNode .prototype),
{
   initialize ()
   {
      X3DBindableNode .prototype .initialize .call (this);

      this ._type               .addInterest ("set_type__",               this);
      this ._headlight          .addInterest ("set_headlight__",          this);
      this ._transitionStart    .addInterest ("set_transitionStart__",    this);
      this ._transitionComplete .addInterest ("set_transitionComplete__", this);
      this ._isBound            .addInterest ("set_isBound__",            this);

      this .set_type__ ();
      this .set_headlight__ ();
   },
   getViewer ()
   {
      return this ._viewer .getValue ();
   },
   getCollisionRadius ()
   {
      if (this ._avatarSize .length > 0)
      {
         if (this ._avatarSize [0] > 0)
            return this ._avatarSize [0];
      }

      return 0.25;
   },
   getAvatarHeight ()
   {
      if (this ._avatarSize .length > 1)
         return this ._avatarSize [1];

      return 1.6;
   },
   getStepHeight ()
   {
      if (this ._avatarSize .length > 2)
         return this ._avatarSize [2];

      return 0.75;
   },
   getNearValue ()
   {
      const nearValue = this .getCollisionRadius ();

      return this .nearDistance ?? (nearValue === 0 ? 1e-5 : nearValue / 2);
   },
   getFarValue (viewpoint)
   {
      return this .farDistance ?? (this ._visibilityLimit .getValue ()
         ? this ._visibilityLimit .getValue ()
         : viewpoint .getMaxFarValue ());
   },
   getTransitionType ()
   {
      for (const value of this ._transitionType)
      {
         const transitionType = TransitionType [value];

         if (transitionType)
            return value;
      }

      return "LINEAR";
   },
   set_type__ ()
   {
      // Determine active viewer.

      this ._viewer = "EXAMINE";

      for (const string of this ._type)
      {
         switch (string)
         {
            case "EXAMINE":
            case "WALK":
            case "FLY":
            case "LOOKAT":
            case "PLANE":
            case "NONE":
               this ._viewer = string;
               break;
            case "PLANE_create3000.github.io":
            case "PLANE_create3000.de":
               this ._viewer = "PLANE";
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

      if (! this ._type .length)
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
         for (const string of this ._type)
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

      this ._availableViewers .length = 0;

      if (examineViewer)
         this ._availableViewers .push ("EXAMINE");

      if (walkViewer)
         this ._availableViewers .push ("WALK");

      if (flyViewer)
         this ._availableViewers .push ("FLY");

      if (planeViewer)
         this ._availableViewers .push ("PLANE");

      if (lookAt)
         this ._availableViewers .push ("LOOKAT");

      if (noneViewer)
         this ._availableViewers .push ("NONE");
   },
   set_headlight__ ()
   {
      if (this ._headlight .getValue ())
         delete this .enable;
      else
         this .enable = Function .prototype;
   },
   set_transitionStart__ ()
   {
      if (! this ._transitionActive .getValue ())
         this ._transitionActive = true;
   },
   set_transitionComplete__ ()
   {
      if (this ._transitionActive .getValue ())
         this ._transitionActive = false;
   },
   set_isBound__ ()
   {
      if (this ._isBound .getValue ())
         return;

      if (this ._transitionActive .getValue ())
         this ._transitionActive = false;
   },
   transitionStart (layerNode)
   {
      // If this is the default NavigationInfo node, then calculate near and far clip plane,
      // as the viewpoint would do when viewAll is called.

      if (layerNode .getNavigationInfoStack () .get () [0] !== this)
         return;

      const
         viewpointNode  = layerNode .getViewpoint (),
         invModelMatrix = viewpointNode .getModelMatrix () .copy () .inverse (),
         bbox           = layerNode .getBBox (new Box3 ()) .multRight (invModelMatrix),
         distance       = viewpointNode .getLookAtDistance (bbox);

      if (bbox .size .equals (Vector3 .Zero))
      {
         this .nearDistance = undefined;
         this .farDistance  = undefined;
      }
      else
      {
         this .nearDistance = distance * (0.125 / 10);
         this .farDistance  = this .nearDistance * viewpointNode .getMaxFarValue () / 0.125;
      }
   },
   enable (type, renderObject)
   {
      if (type !== TraverseType .DISPLAY)
         return;

      if (!this ._headlight .getValue ())
         return;

      const headlight = this .getBrowser () .getHeadlight ();

      renderObject .getGlobalLights () .push (headlight);
      renderObject .getGlobalLightsKeys () .push (headlight .lightNode .getLightKey ());
   },
   traverse (type, renderObject)
   {
      if (type !== TraverseType .CAMERA)
         return;

      renderObject .getLayer () .getNavigationInfos () .push (this);
   }
});

Object .defineProperties (NavigationInfo,
{
   ... X3DNode .getStaticProperties ("NavigationInfo", "Navigation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
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
      enumerable: true,
   },
});

export default NavigationInfo;
