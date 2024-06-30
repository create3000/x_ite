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

import X3DConstants     from "../../Base/X3DConstants.js";
import Fields           from "../../Fields.js";
import ExamineViewer    from "./ExamineViewer.js";
import WalkViewer       from "./WalkViewer.js";
import FlyViewer        from "./FlyViewer.js";
import PlaneViewer      from "./PlaneViewer.js";
import NoneViewer       from "./NoneViewer.js";
import LookAtViewer     from "./LookAtViewer.js";
import DirectionalLight from "../../Components/Lighting/DirectionalLight.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";

const
   _activeCollisions   = Symbol (),
   _viewerNode         = Symbol (),
   _headlightContainer = Symbol ();

function X3DNavigationContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "activeLayer",          new Fields .SFNode (),
                          X3DConstants .outputOnly, "activeNavigationInfo", new Fields .SFNode (),
                          X3DConstants .outputOnly, "activeViewpoint",      new Fields .SFNode (),
                          X3DConstants .outputOnly, "availableViewers",     new Fields .MFString (),
                          X3DConstants .outputOnly, "viewer",               new Fields .SFString ("EXAMINE"));

   this [_activeCollisions] = new Set ();
   this [_viewerNode]       = new NoneViewer (this .getPrivateScene ());
}

Object .assign (X3DNavigationContext .prototype,
{
   initialize ()
   {
      this ._viewer .addInterest ("set_viewer__", this);

      this .initialized () .addInterest ("set_world__",    this);
      this .shutdown ()    .addInterest ("remove_world__", this);

      this [_headlightContainer] = this .createHeadlight ();
      this [_viewerNode] .setup ();
   },
   createHeadlight ()
   {
      const headlight = new DirectionalLight (this .getPrivateScene ());

      headlight .setup ();

      const headlightContainer = headlight .getLights () .pop ();

      headlightContainer .set (headlight, null, Matrix4 .Identity);
      headlightContainer .dispose = Function .prototype;

      return headlightContainer;
   },
   getHeadlight ()
   {
      return this [_headlightContainer];
   },
   getActiveLayer ()
   {
      return this ._activeLayer .getValue ();
   },
   getActiveNavigationInfo ()
   {
      return this ._activeNavigationInfo .getValue ();
   },
   getActiveViewpoint ()
   {
      return this ._activeViewpoint .getValue ();
   },
   getCurrentViewer ()
   {
      return this ._viewer .getValue ();
   },
   getViewer ()
   {
      return this [_viewerNode];
   },
   addCollision (object)
   {
      this [_activeCollisions] .add (object);
   },
   removeCollision (object)
   {
      this [_activeCollisions] .delete (object);
   },
   getCollisionCount ()
   {
      return this [_activeCollisions] .size;
   },
   remove_world__ ()
   {
      this .getWorld () ._activeLayer .removeInterest ("set_activeLayer__", this);
   },
   set_world__ ()
   {
      this .getWorld () ._activeLayer .addInterest ("set_activeLayer__", this);

      this .set_activeLayer__ ();
   },
   set_activeLayer__ ()
   {
      if (this ._activeLayer .getValue ())
      {
         this ._activeLayer .getValue () .getNavigationInfoStack () .removeInterest ("set_activeNavigationInfo__", this);
         this ._activeLayer .getValue () .getViewpointStack ()      .removeInterest ("set_activeViewpoint__",      this);
      }

      this ._activeLayer = this .getWorld () .getActiveLayer ();

      if (this ._activeLayer .getValue ())
      {
         this ._activeLayer .getValue () .getNavigationInfoStack () .addInterest ("set_activeNavigationInfo__", this);
         this ._activeLayer .getValue () .getViewpointStack ()      .addInterest ("set_activeViewpoint__",      this);
      }

      this .set_activeNavigationInfo__ ();
      this .set_activeViewpoint__ ();
   },
   set_activeNavigationInfo__ ()
   {
      const activeNavigationInfo = this ._activeNavigationInfo .getValue ();

      activeNavigationInfo ?._viewer .removeFieldInterest (this ._viewer);

      if (this ._activeLayer .getValue ())
      {
         this ._activeNavigationInfo = this ._activeLayer .getValue () .getNavigationInfo ();

         if (this ._activeNavigationInfo .getValue () === activeNavigationInfo)
            return;

         this ._activeNavigationInfo .getValue () ._viewer .addFieldInterest (this ._viewer);

         this ._viewer = this ._activeNavigationInfo .getValue () ._viewer;
      }
      else
      {
         this ._activeNavigationInfo = null;
         this ._viewer               = "NONE";
      }
   },
   set_activeViewpoint__ ()
   {
      this ._activeViewpoint = this ._activeLayer .getValue () ?.getViewpoint () ?? null;
   },
   set_viewer__ (viewer)
   {
      const navigationInfo = this ._activeNavigationInfo .getValue ();

      if (navigationInfo)
         this ._availableViewers = navigationInfo ._availableViewers;
      else
         this ._availableViewers .length = 0;

      // Create viewer node.

      this [_viewerNode] ?.dispose ();

      switch (viewer .getValue ())
      {
         case "EXAMINE":
            this [_viewerNode] = new ExamineViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "WALK":
            this [_viewerNode] = new WalkViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "FLY":
            this [_viewerNode] = new FlyViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "PLANE":
         case "PLANE_create3000.github.io":
         case "PLANE_create3000.de":
            this [_viewerNode] = new PlaneViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "NONE":
            this [_viewerNode] = new NoneViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "LOOKAT":
            this [_viewerNode] = new LookAtViewer (this .getPrivateScene (), navigationInfo);
            break;
         default:
            this [_viewerNode] = new ExamineViewer (this .getPrivateScene (), navigationInfo);
            break;
      }

      this [_viewerNode] .setup ();
   },
   dispose ()
   {
      this [_viewerNode] ?.dispose ();
   },
});

export default X3DNavigationContext;
