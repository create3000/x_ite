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
import X3DRenderObject from "../../Rendering/X3DRenderObject.js";
import BindableStack   from "../../Execution/BindableStack.js";
import BindableList    from "../../Execution/BindableList.js";
import NavigationInfo  from "../Navigation/NavigationInfo.js";
import Fog             from "../EnvironmentalEffects/Fog.js";
import Background      from "../EnvironmentalEffects/Background.js";
import X3DCast         from "../../Base/X3DCast.js";
import TraverseType    from "../../Rendering/TraverseType.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Camera          from "../../../standard/Math/Geometry/Camera.js";
import Box3            from "../../../standard/Math/Geometry/Box3.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function X3DLayerNode (executionContext, defaultViewpoint, groupNode)
{
   X3DNode         .call (this, executionContext);
   X3DRenderObject .call (this, executionContext);

   this .addType (X3DConstants .X3DLayerNode);

   if (executionContext .getSpecificationVersion () < 4.0)
      this .addAlias ("isPickable", this ._pickable);

   this .pickableGroupNode = executionContext .createNode ("PickableGroup", false);
   this .groupNode         = groupNode;
   this .currentViewport   = null;

   this .defaultNavigationInfo = new NavigationInfo (executionContext);
   this .defaultViewpoint      = defaultViewpoint;
   this .defaultBackground     = new Background (executionContext);
   this .defaultFog            = new Fog (executionContext);

   this .navigationInfoStack = new BindableStack (executionContext, this .defaultNavigationInfo);
   this .viewpointStack      = new BindableStack (executionContext, this .defaultViewpoint);
   this .backgroundStack     = new BindableStack (executionContext, this .defaultBackground);
   this .fogStack            = new BindableStack (executionContext, this .defaultFog);

   this .navigationInfos = new BindableList (executionContext, this .defaultNavigationInfo);
   this .viewpoints      = new BindableList (executionContext, this .defaultViewpoint);
   this .backgrounds     = new BindableList (executionContext, this .defaultBackground);
   this .fogs            = new BindableList (executionContext, this .defaultFog);

   this .defaultBackground .setHidden (true);
   this .defaultFog        .setHidden (true);
}

X3DLayerNode .prototype = Object .assign (Object .create (X3DNode .prototype),
   X3DRenderObject .prototype,
{
   constructor: X3DLayerNode,
   layer0: false,
   initialize: function ()
   {
      X3DNode         .prototype .initialize .call (this);
      X3DRenderObject .prototype .initialize .call (this);

      // if (this .pickableGroupNode)
      // {
      //    this ._pickable   .addFieldInterest (this .pickableGroupNode ._pickable);
      //    this ._objectType .addFieldInterest (this .pickableGroupNode ._objectType);

      //    this .pickableGroupNode ._pickable   = this ._pickable;
      //    this .pickableGroupNode ._objectType = this ._objectType;

      //    this .pickableGroupNode .setup ();
      // }
      // else
      // {
      //    this .pickableGroupNode = this .groupNode;
      // }

      this .defaultNavigationInfo .setup ();
      this .defaultViewpoint      .setup ();
      this .defaultBackground     .setup ();
      this .defaultFog            .setup ();

      this .navigationInfoStack .setup ();
      this .viewpointStack      .setup ();
      this .backgroundStack     .setup ();
      this .fogStack            .setup ();

      this .navigationInfos .setup ();
      this .viewpoints      .setup ();
      this .backgrounds     .setup ();
      this .fogs            .setup ();

      this ._viewport .addInterest ("set_viewport__", this);

      this .set_viewport__ ();
   },
   isLayer0: function (value)
   {
      this .layer0 = value;
      this .defaultBackground .setHidden (! value);
   },
   getLayer: function ()
   {
      return this;
   },
   getBBox: function (bbox, shadows)
   {
      return this .groupNode .getBBox (bbox, shadows);
   },
   getGroup: function ()
   {
      return this .groupNode;
   },
   getViewport: function ()
   {
      return this .currentViewport;
   },
   getBackground: function ()
   {
      return this .backgroundStack .top ();
   },
   getFog: function ()
   {
      return this .fogStack .top ();
   },
   getNavigationInfo: function ()
   {
      return this .navigationInfoStack .top ();
   },
   getViewpoint: function ()
   {
      return this .viewpointStack .top ();
   },
   getBackgrounds: function ()
   {
      return this .backgrounds;
   },
   getFogs: function ()
   {
      return this .fogs;
   },
   getNavigationInfos: function ()
   {
      return this .navigationInfos;
   },
   getViewpoints: function ()
   {
      return this .viewpoints;
   },
   getUserViewpoints: function ()
   {
      const userViewpoints = [ ];

      for (const viewpointNode of this .viewpoints .get ())
      {
         if (viewpointNode ._description .length)
            userViewpoints .push (viewpointNode);
      }

      return userViewpoints;
   },
   getBackgroundStack: function ()
   {
      return this .backgroundStack;
   },
   getFogStack: function ()
   {
      return this .fogStack;
   },
   getNavigationInfoStack: function ()
   {
      return this .navigationInfoStack;
   },
   getViewpointStack: function ()
   {
      return this .viewpointStack;
   },
   getCollisionTime: function ()
   {
      return this .collisionTime;
   },
   lookAt: function (factor = 1, straighten = false)
   {
      const
         viewpointNode = this .getViewpoint (),
         bbox          = this .getBBox (new Box3 ()) .multRight (Matrix4 .inverse (viewpointNode .getModelMatrix ()));

         viewpointNode .lookAt (this, bbox .center, viewpointNode .getLookAtDistance (bbox), factor, straighten);
   },
   set_viewport__: function ()
   {
      this .currentViewport = X3DCast (X3DConstants .X3DViewportNode, this ._viewport);

      if (! this .currentViewport)
         this .currentViewport = this .getBrowser () .getDefaultViewport ();
   },
   bindBindables: function (viewpointName)
   {
      this .traverse (TraverseType .CAMERA, this);

      // Bind first viewpoint in viewpoint list.

      const
         navigationInfoNode = this .navigationInfos .getBound (),
         backgroundNode     = this .backgrounds     .getBound (),
         fogNode            = this .fogs            .getBound (),
         viewpointNode      = this .viewpoints      .getBound (viewpointName);

      this .navigationInfoStack .pushOnTop (navigationInfoNode);
      this .viewpointStack      .pushOnTop (viewpointNode);
      this .backgroundStack     .pushOnTop (backgroundNode);
      this .fogStack            .pushOnTop (fogNode);

      viewpointNode .resetUserOffsets ();

      if (viewpointNode ._viewAll .getValue ())
         viewpointNode .viewAll (this .getBBox (new Box3 ()));
   },
   traverse: function (type, renderObject)
   {
      renderObject = renderObject || this;

      const viewpointNode = this .getViewpoint ();

      this .getProjectionMatrix ()  .pushMatrix (viewpointNode .getProjectionMatrix (this));
      this .getCameraSpaceMatrix () .pushMatrix (viewpointNode .getCameraSpaceMatrix ());
      this .getViewMatrix ()        .pushMatrix (viewpointNode .getViewMatrix ());

      switch (type)
      {
         case TraverseType .POINTER:
            this .pointer (type, renderObject);
            break;
         case TraverseType .CAMERA:
            this .camera (type, renderObject);
            break;
         case TraverseType .PICKING:
            this .picking (type, renderObject);
            break;
         case TraverseType .COLLISION:
            this .collision (type, renderObject);
            break;
         case TraverseType .SHADOW:
         case TraverseType .DISPLAY:
            this .display (type, renderObject);
            break;
      }

      this .getViewMatrix ()        .pop ();
      this .getCameraSpaceMatrix () .pop ();
      this .getProjectionMatrix ()  .pop ();
   },
   pointer: function (type, renderObject)
   {
      const
         browser  = this .getBrowser (),
         viewport = this .currentViewport .getRectangle ();

      if (browser .getPointingLayer ())
      {
         if (browser .getPointingLayer () !== this)
            return;
      }
      else
      {
         if (!browser .isPointerInRectangle (viewport))
            return;
      }

      this .setHitRay (this .getProjectionMatrix () .get (), viewport, browser .getPointer ());
      this .getNavigationInfo () .enable (type, renderObject);
      this .getModelViewMatrix () .pushMatrix (this .getViewMatrix () .get ());

      this .currentViewport .push (this);
      renderObject .render (type, this .groupNode .traverse, this .groupNode);
      this .currentViewport .pop (this);

      this .getModelViewMatrix () .pop ()
   },
   camera: function (type, renderObject)
   {
      if (this ._visible .getValue ())
      {
         this .getModelViewMatrix () .pushMatrix (Matrix4 .Identity);

         this .currentViewport .push (this);
         this .groupNode .traverse (type, renderObject);
         this .currentViewport .pop (this);

         this .getModelViewMatrix () .pop ();

         this .navigationInfos .update (this, this .navigationInfoStack);
         this .viewpoints      .update (this, this .viewpointStack);
         this .backgrounds     .update (this, this .backgroundStack);
         this .fogs            .update (this, this .fogStack);

         this .getViewpoint () .update ();
      }
   },
   picking: function (type, renderObject)
   {
      if (this ._pickable .getValue ())
      {
         this .getModelViewMatrix () .pushMatrix (Matrix4 .Identity);

         this .currentViewport .push (this);
         this .groupNode .traverse (type, renderObject);
         this .currentViewport .pop (this);

         this .getModelViewMatrix () .pop ();
      }
   },
   collision: (function ()
   {
      const projectionMatrix = new Matrix4 ();

      return function (type, renderObject)
      {
         const navigationInfo = this .getNavigationInfo ();

         if (navigationInfo ._transitionActive .getValue ())
            return;

         const
            collisionRadius = navigationInfo .getCollisionRadius (),
            avatarHeight    = navigationInfo .getAvatarHeight (),
            size            = Math .max (collisionRadius * 2, avatarHeight * 2);

         Camera .ortho (-size, size, -size, size, -size, size, projectionMatrix);

         this .getProjectionMatrix () .pushMatrix (projectionMatrix);
         this .getModelViewMatrix  () .pushMatrix (this .getViewMatrix () .get ());

         // Render
         this .currentViewport .push (this);
         renderObject .render (type, this .groupNode .traverse, this .groupNode);
         this .currentViewport .pop (this);

         this .getModelViewMatrix  () .pop ()
         this .getProjectionMatrix () .pop ()
      };
   })(),
   display: function (type, renderObject)
   {
      if (this ._visible .getValue ())
      {
         this .getNavigationInfo () .enable (type, renderObject);
         this .getModelViewMatrix () .pushMatrix (this .getViewMatrix () .get ());

         this .currentViewport .push (this);
         renderObject .render (type, this .groupNode .traverse, this .groupNode);
         this .currentViewport .pop (this);

         this .getModelViewMatrix () .pop ()
      }
   },
});

export default X3DLayerNode;
