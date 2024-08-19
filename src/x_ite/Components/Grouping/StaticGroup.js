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
import X3DBoundedObject     from "./X3DBoundedObject.js";
import Group                from "./Group.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";

// No support for X3DBindableNode nodes, local lights. X3DLocalFog, local ClipPlane nodes, LOD, Billboard, Switch node.

const
   _pointingShapes  = Symbol (),
   _collisionShapes = Symbol (),
   _shadowShapes    = Symbol (),
   _displayShapes   = Symbol ();

function StaticGroup (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .StaticGroup);

   this .groupNode  = new Group (this .getExecutionContext ());
   this .bbox       = new Box3 ();
   this .shadowBBox = new Box3 ();
}

Object .assign (Object .setPrototypeOf (StaticGroup .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
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

      this .setCameraObject   (this .groupNode .isCameraObject ());
      this .setPickableObject (this .groupNode .isPickableObject ());

      this .set_children__ ();
   },
   getBBox (bbox, shadows)
   {
      return bbox .assign (shadows ? this .shadowBBox : this .bbox);
   },
   set_children__ ()
   {
      this .groupNode .getBBox (this .bbox);
      this .groupNode .getBBox (this .shadowBBox, true);

      this [_pointingShapes]  = null;
      this [_collisionShapes] = null;
      this [_shadowShapes]    = null;
      this [_displayShapes]   = null;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         {
            return;
         }
         case TraverseType .POINTER:
         {
            this .traverseObjects (_pointingShapes, type, renderObject);
            return;
         }
         case TraverseType .COLLISION:
         {
            this .traverseObjects (_collisionShapes, type, renderObject);
            return;
         }
         case TraverseType .SHADOW:
         {
            this .traverseObjects (_shadowShapes, type, renderObject);
            return;
         }
         case TraverseType .DISPLAY:
         {
            this .traverseObjects (_displayShapes, type, renderObject);
            return;
         }
      }
   },
   traverseObjects: (() =>
   {
      const StaticsIndex = new Map ([
         [_pointingShapes,  ["Pointing"]],
         [_collisionShapes, ["Collision"]],
         [_shadowShapes,    ["Shadow"]],
         [_displayShapes,   ["Opaque", "Transparent", "TransmissionOpaque", "TransmissionTransparent"]],
      ]);

      const viewVolume = new ViewVolume ();

      viewVolume .intersectsSphere = function () { return true; };

      return function (staticShapes, type, renderObject)
      {
         if (!this [staticShapes])
         {
            const
               Statics          = StaticsIndex .get (staticShapes),
               viewVolumes      = renderObject .getViewVolumes (),
               viewport         = renderObject .getViewport (),
               projectionMatrix = renderObject .getProjectionMatrix (),
               modelViewMatrix  = renderObject .getModelViewMatrix (),
               firstShapes      = Statics .map (Static => renderObject [`getNum${Static}Shapes`] ());

            //Statics .forEach (Static => console .log (`Rebuilding StaticGroup ${Static}.`));

            viewVolumes .push (viewVolume .set (projectionMatrix, viewport, viewport));

            modelViewMatrix .push ();
            modelViewMatrix .identity ();

            this .groupNode .traverse (type, renderObject);

            modelViewMatrix .pop ();
            viewVolumes     .pop ();

            this [staticShapes] = [ ];

            for (const [i, Static] of Statics .entries ())
            {
               const
                  firstShape = firstShapes [i],
                  lastShape  = renderObject [`getNum${Static}Shapes`] (),
                  shapes     = renderObject [`get${Static}Shapes`] () .splice (firstShape, lastShape - firstShape);

               renderObject [`setNum${Static}Shapes`] (firstShape);

               if (Static .includes ("Transmission"))
                  continue;

               for (const shape of shapes)
                  this [staticShapes] .push (shape);
            }
         }

         const modelViewMatrix = renderObject .getModelViewMatrix ();

         for (const { modelViewMatrix: modelMatrix, shapeNode } of this [staticShapes])
         {
            modelViewMatrix .push ();
            modelViewMatrix .multLeft (modelMatrix);
            shapeNode .traverse (type, renderObject);
            modelViewMatrix .pop ();
         }
      };
   })(),
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (StaticGroup,
{
   ... X3DNode .getStaticProperties ("StaticGroup", "Grouping", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "children",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default StaticGroup;
