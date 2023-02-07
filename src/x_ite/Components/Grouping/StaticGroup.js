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
import X3DBoundedObject     from "./X3DBoundedObject.js";
import Group                from "./Group.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";

// No support for X3DBindableNode nodes, local lights. X3DLocalFog, local ClipPlane nodes, LOD, Billboard, Switch node.

function StaticGroup (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .StaticGroup);

   this .groupNode  = new Group (this .getExecutionContext ());
   this .bbox       = new Box3 ();
   this .shadowBBox = new Box3 ();
}

StaticGroup .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   constructor: StaticGroup,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "children",    new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "StaticGroup";
   },
   getComponentName: function ()
   {
      return "Grouping";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._bboxSize   .addFieldInterest (this .groupNode ._bboxSize);
      this ._bboxCenter .addFieldInterest (this .groupNode ._bboxCenter);
      this ._children   .addFieldInterest (this .groupNode ._children);

      this .groupNode ._bboxSize   = this ._bboxSize;
      this .groupNode ._bboxCenter = this ._bboxCenter;
      this .groupNode ._children   = this ._children;
      this .groupNode .setPrivate (true);
      this .groupNode .setup ();

      // Connect after Group setup.
      this .groupNode ._isCameraObject   .addFieldInterest (this ._isCameraObject);
      this .groupNode ._isPickableObject .addFieldInterest (this ._isPickableObject);
      this .groupNode ._children         .addInterest ("set_children__", this);

      this .setCameraObject   (this .groupNode .getCameraObject ());
      this .setPickableObject (this .groupNode .getPickableObject ());

      this .set_children__ ();
   },
   getBBox: function (bbox, shadows)
   {
      return bbox .assign (shadows ? this .shadowBBox : this .bbox);
   },
   set_children__: function ()
   {
      this .groupNode .getBBox (this .bbox);
      this .groupNode .getBBox (this .shadowBBox, true);

      this .pointingShapes    = null;
      this .collisionShapes   = null;
      this .shadowShapes      = null;
      this .opaqueShapes      = null;
      this .transparentShapes = null;
   },
   traverse: (function ()
   {
      const viewVolume = new ViewVolume ();

      viewVolume .intersectsSphere = function () { return true; };

      return function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .CAMERA:
            {
               return;
            }
            case TraverseType .POINTER:
            {

               if (! this .pointingShapes)
               {
                  //console .log ("Rebuilding StaticGroup pointingShapes");

                  const
                     viewVolumes        = renderObject .getViewVolumes (),
                     viewport           = renderObject .getViewport (),
                     projectionMatrix   = renderObject .getProjectionMatrix (),
                     modelViewMatrix    = renderObject .getModelViewMatrix (),
                     firstPointingShape = renderObject .getNumPointingShapes ();

                  viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

                  modelViewMatrix .push ();
                  modelViewMatrix .identity ();

                  this .groupNode .traverse (type, renderObject);

                  modelViewMatrix .pop ();
                  viewVolumes     .pop ();

                  const lastPointingShape = renderObject .getNumPointingShapes ();

                  this .pointingShapes = renderObject .getPointingShapes () .splice (firstPointingShape, lastPointingShape - firstPointingShape);

                  renderObject .setNumPointingShapes (firstPointingShape);
               }

               const modelViewMatrix = renderObject .getModelViewMatrix ();

               for (const pointingShape of this .pointingShapes)
               {
                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (pointingShape .modelViewMatrix);
                  pointingShape .shapeNode .traverse (type, renderObject);
                  modelViewMatrix .pop ();
               }

               return;
            }
            case TraverseType .COLLISION:
            {
               if (! this .collisionShapes)
               {
                  //console .log ("Rebuilding StaticGroup collisionShapes");

                  const
                     viewVolumes         = renderObject .getViewVolumes (),
                     viewport            = renderObject .getViewport (),
                     projectionMatrix    = renderObject .getProjectionMatrix (),
                     modelViewMatrix     = renderObject .getModelViewMatrix (),
                     firstCollisionShape = renderObject .getNumCollisionShapes ();

                  viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

                  modelViewMatrix .push ();
                  modelViewMatrix .identity ();

                  this .groupNode .traverse (type, renderObject);

                  modelViewMatrix .pop ();
                  viewVolumes     .pop ();

                  const lastCollisionShape = renderObject .getNumCollisionShapes ();

                  this .collisionShapes = renderObject .getCollisionShapes () .splice (firstCollisionShape, lastCollisionShape - firstCollisionShape);

                  renderObject .setNumCollisionShapes (firstCollisionShape);
               }

               const modelViewMatrix = renderObject .getModelViewMatrix ();

               for (const collisionShape of this .collisionShapes)
               {
                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (collisionShape .modelViewMatrix);
                  collisionShape .shapeNode .traverse (type, renderObject);
                  modelViewMatrix .pop ();
               }

               return;
            }
            case TraverseType .SHADOW:
            {
               if (! this .shadowShapes)
               {
                  //console .log ("Rebuilding StaticGroup shadowShapes");

                  const
                     viewVolumes      = renderObject .getViewVolumes (),
                     viewport         = renderObject .getViewport (),
                     projectionMatrix = renderObject .getProjectionMatrix (),
                     modelViewMatrix  = renderObject .getModelViewMatrix (),
                     firstShadowShape = renderObject .getNumShadowShapes ();

                  viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

                  modelViewMatrix .push ();
                  modelViewMatrix .identity ();

                  this .groupNode .traverse (type, renderObject);

                  modelViewMatrix .pop ();
                  viewVolumes     .pop ();

                  const lastShadowShape = renderObject .getNumShadowShapes ();

                  this .shadowShapes = renderObject .getShadowShapes () .splice (firstShadowShape, lastShadowShape - firstShadowShape);

                  renderObject .setNumShadowShapes (firstShadowShape);
               }

               const modelViewMatrix = renderObject .getModelViewMatrix ();

               for (const shadowShape of this .shadowShapes)
               {
                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (shadowShape .modelViewMatrix);
                  shadowShape .shapeNode .traverse (type, renderObject);
                  modelViewMatrix .pop ();
               }

               return;
            }
            case TraverseType .DISPLAY:
            {
               if (! this .opaqueShapes)
               {
                  //console .log ("Rebuilding StaticGroup opaqueShapes and transparentShapes");

                  const
                     viewVolumes           = renderObject .getViewVolumes (),
                     viewport              = renderObject .getViewport (),
                     projectionMatrix      = renderObject .getProjectionMatrix (),
                     modelViewMatrix       = renderObject .getModelViewMatrix (),
                     firstOpaqueShape      = renderObject .getNumOpaqueShapes (),
                     firstTransparentShape = renderObject .getNumTransparentShapes ();

                  viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

                  modelViewMatrix .push ();
                  modelViewMatrix .identity ();

                  this .groupNode .traverse (type, renderObject);

                  modelViewMatrix .pop ();
                  viewVolumes     .pop ();

                  const
                     lastOpaqueShape      = renderObject .getNumOpaqueShapes (),
                     lastTransparentShape = renderObject .getNumTransparentShapes ();

                  this .opaqueShapes      = renderObject .getOpaqueShapes () .splice (firstOpaqueShape, lastOpaqueShape - firstOpaqueShape);
                  this .transparentShapes = renderObject .getTransparentShapes () .splice (firstTransparentShape, lastTransparentShape - firstTransparentShape);

                  renderObject .setNumOpaqueShapes (firstOpaqueShape);
                  renderObject .setNumTransparentShapes (firstTransparentShape);
               }

               const modelViewMatrix = renderObject .getModelViewMatrix ();

               for (const opaqueShape of this .opaqueShapes)
               {
                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (opaqueShape .modelViewMatrix);
                  opaqueShape .shapeNode .traverse (type, renderObject);
                  modelViewMatrix .pop ();
               }

               for (const transparentShape of this .transparentShapes)
               {
                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (transparentShape .modelViewMatrix);
                  transparentShape .shapeNode .traverse (type, renderObject);
                  modelViewMatrix .pop ();
               }

               return;
            }
         }
      };
   })(),
   dispose: function ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

export default StaticGroup;
