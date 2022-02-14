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
   "x_ite/Basic/X3DFieldDefinition",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Components/Networking/X3DUrlObject",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Components/Grouping/Group",
   "x_ite/Bits/TraverseType",
   "x_ite/Bits/X3DConstants",
   "x_ite/InputOutput/FileLoader",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DUrlObject,
          X3DBoundedObject,
          Group,
          TraverseType,
          X3DConstants,
          FileLoader)
{
"use strict";

   function Inline (executionContext)
   {
      X3DChildNode     .call (this, executionContext);
      X3DUrlObject     .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .Inline);

      this .scene = this .getBrowser () .getDefaultScene ();
      this .group = new Group (executionContext);

      this .group .addParent (this);
   }

   Inline .prototype = Object .assign (Object .create (X3DChildNode .prototype),
      X3DUrlObject .prototype,
      X3DBoundedObject .prototype,
   {
      constructor: Inline,
      fieldDefinitions: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",             new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",           new Fields .SFVec3f ()),
      ]),
      getTypeName: function ()
      {
         return "Inline";
      },
      getComponentName: function ()
      {
         return "Networking";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DChildNode     .prototype .initialize .call (this);
         X3DUrlObject     .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);

         this .group .setPrivate (true);
         this .group .setup ();

         this .group .isCameraObject_   .addFieldInterest (this .isCameraObject_);
         this .group .isPickableObject_ .addFieldInterest (this .isPickableObject_);

         this .requestImmediateLoad ();
      },
      getBBox: function (bbox, shadow)
      {
         if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
            return this .group .getBBox (bbox, shadow);

         return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
      },
      set_live__: function ()
      {
         X3DUrlObject .prototype .set_live__ .call (this);

         if (this .getPrivate ())
            return

         this .scene .setLive (this .isLive () .getValue ());
      },
      unloadNow: function ()
      {
         this .setInternalScene (this .getBrowser () .getDefaultScene ());
      },
      loadNow: function ()
      {
         new FileLoader (this) .createX3DFromURL (this .urlBuffer_, null, this .setInternalSceneAsync .bind (this));
      },
      setInternalSceneAsync: function (scene)
      {
         if (scene)
         {
            this .setLoadState (X3DConstants .COMPLETE_STATE);
            this .setInternalScene (scene);
         }
         else
         {
            this .setLoadState (X3DConstants .FAILED_STATE);
            this .setInternalScene (this .getBrowser () .getDefaultScene ());
         }
      },
      setInternalScene: function (scene)
      {
         this .scene .setLive (false);
         this .scene .rootNodes .removeFieldInterest (this .group .children_);

         // Set new scene.

         this .scene = scene;
         this .scene .setExecutionContext (this .getExecutionContext ());
         this .scene .setPrivate (this .getExecutionContext () .getPrivate ());

         this .scene .rootNodes .addFieldInterest (this .group .children_);
         this .group .children_ = this .scene .rootNodes;

         this .set_live__ ();

         this .getBrowser () .addBrowserEvent ();
      },
      getInternalScene: function ()
      {
         ///  Returns the internal X3DScene of this inline, that is loaded from the url given.
         ///  If the load field was false an empty scene is returned.  This empty scene is the same for all Inline
         ///  nodes (due to performance reasons).

         return this .scene;
      },
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .PICKING:
            {
               const
                  browser          = renderObject .getBrowser (),
                  pickingHierarchy = browser .getPickingHierarchy ();

               pickingHierarchy .push (this);

               this .group .traverse (type, renderObject);

               pickingHierarchy .pop ();
               return;
            }
            default:
            {
               this .group .traverse (type, renderObject);
               return;
            }
         }
      },
   });

   return Inline;
});
