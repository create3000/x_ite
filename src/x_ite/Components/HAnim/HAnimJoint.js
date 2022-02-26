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
   "x_ite/Components/Grouping/X3DTransformNode",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTransformNode,
          TraverseType,
          X3DConstants,
          X3DCast,
          Matrix4)
{
"use strict";

   function HAnimJoint (executionContext)
   {
      X3DTransformNode .call (this, executionContext);

      this .addType (X3DConstants .HAnimJoint);

      this .setAllowedTypes (X3DConstants .HAnimJoint,
                             X3DConstants .HAnimSegment,
                             X3DConstants .HAnimSite);

      this .displacerNodes = [ ];
      this .modelMatrix    = new Matrix4 ();
   }

   HAnimJoint .prototype = Object .assign (Object .create (X3DTransformNode .prototype),
   {
      constructor: HAnimJoint,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "llimit",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ulimit",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "limitOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stiffness",        new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordIndex",   new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordWeight",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "HAnimJoint";
      },
      getComponentName: function ()
      {
         return "HAnim";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTransformNode .prototype .initialize .call (this);

         this .displacers_ .addInterest ("set_displacers__", this);

         this .set_displacers__ ();
      },
      setCameraObject: function (value)
      {
         X3DTransformNode .prototype .setCameraObject .call (this, value || !! this .skinCoordIndex_ .length);
      },
      getModelMatrix: function ()
      {
         return this .modelMatrix;
      },
      getDisplacers: function ()
      {
         return this .displacerNodes;
      },
      set_displacers__: function ()
      {
         const displacerNodes = this .displacerNodes;

         displacerNodes .length = 0;

         for (var i = 0, length = this .displacers_ .length; i < length; ++ i)
         {
            const displacerNode = X3DCast (X3DConstants .HAnimDisplacer, this .displacers_ [i]);

            if (displacerNode)
               displacerNodes .push (displacerNode);
         }
      },
      getTraverse: (function ()
      {
         const base = X3DTransformNode .prototype .getTraverse ();

         function traverse (type, renderObject)
         {
            if (type === TraverseType .CAMERA)
               this .modelMatrix .assign (this .getMatrix ()) .multRight (renderObject .getModelViewMatrix () .get ());

            base .call (this, type, renderObject);
         }

         return function ()
         {
            if (this .skinCoordIndex_ .length)
               return traverse;

            return base;
         };
      })(),
      getGroupTraverse: (function ()
      {
         const base = X3DTransformNode .prototype .getGroupTraverse ();

         function traverse (type, renderObject)
         {
            if (type === TraverseType .CAMERA)
               this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ());

            base .call (this, type, renderObject);
         }

         return function ()
         {
            if (this .skinCoordIndex_ .length)
               return traverse;

            return base;
         };
      })(),
   });

   return HAnimJoint;
});
