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
   "x_ite/Components/Navigation/X3DViewpointNode",
   "x_ite/Components/Interpolation/ScalarInterpolator",
   "x_ite/Bits/X3DConstants",
   "standard/Math/Geometry/Camera",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DViewpointNode,
          ScalarInterpolator,
          X3DConstants,
          Camera,
          Vector2,
          Vector3,
          Matrix4)
{
"use strict";

   function Viewpoint (executionContext)
   {
      X3DViewpointNode .call (this, executionContext);

      this .addType (X3DConstants .Viewpoint);

      this .position_         .setUnit ("length");
      this .centerOfRotation_ .setUnit ("length");
      this .fieldOfView_      .setUnit ("angle");

      this .projectionMatrix        = new Matrix4 ();
      this .fieldOfViewInterpolator = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   }

   Viewpoint .prototype = Object .assign (Object .create (X3DViewpointNode .prototype),
   {
      constructor: Viewpoint,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .SFFloat (0.7854)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "Viewpoint";
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
         X3DViewpointNode .prototype .initialize .call (this);

         this .fieldOfViewInterpolator .key_ = new Fields .MFFloat (0, 1);
         this .fieldOfViewInterpolator .setup ();

         this .getEaseInEaseOut () .modifiedFraction_changed_ .addFieldInterest (this .fieldOfViewInterpolator .set_fraction_);
         this .fieldOfViewInterpolator .value_changed_ .addFieldInterest (this .fieldOfViewScale_);
      },
      setInterpolators: function (fromViewpointNode, toViewpointNode)
      {
         if (fromViewpointNode .getType () .indexOf (X3DConstants .Viewpoint) >= 0)
         {
            const scale = fromViewpointNode .getFieldOfView () / toViewpointNode .getFieldOfView ();

            this .fieldOfViewInterpolator .keyValue_ = new Fields .MFFloat (scale, toViewpointNode .fieldOfViewScale_ .getValue ());

            this .fieldOfViewScale_ = scale;
         }
         else
         {
            this .fieldOfViewInterpolator .keyValue_ = new Fields .MFFloat (toViewpointNode .fieldOfViewScale_ .getValue (), toViewpointNode .fieldOfViewScale_ .getValue ());

            this .fieldOfViewScale_ = toViewpointNode .fieldOfViewScale_ .getValue ();
         }
      },
      getFieldOfView: function ()
      {
         var fov = this .fieldOfView_ .getValue () * this .fieldOfViewScale_ .getValue ();

         return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
      },
      getScreenScale: (function ()
      {
         var screenScale = new Vector3 (0, 0, 0);

         return function (point, viewport)
         {
            // Returns the screen scale in meter/pixel for on pixel.

            var
               width  = viewport [2],
               height = viewport [3],
               size   = Math .abs (point .z) * Math .tan (this .getFieldOfView () / 2) * 2;

            if (width > height)
               size /= height;
            else
               size /= width;

            return screenScale .set (size, size, size);
         };
      })(),
      getViewportSize: (function ()
      {
         var viewportSize = new Vector2 (0, 0);

         return function (viewport, nearValue)
         {
            // Returns viewport size in meters.

            var
               width  = viewport [2],
               height = viewport [3],
               size   = nearValue * Math .tan (this .getFieldOfView () / 2) * 2,
               aspect = width / height;

            if (aspect > 1)
               return viewportSize .set (size * aspect, size);

            return viewportSize .set (size, size / aspect);
         };
      })(),
      getLookAtDistance: function (bbox)
      {
         return (bbox .size .abs () / 2) / Math .tan (this .getFieldOfView () / 2);
      },
      getProjectionMatrixWithLimits: function (nearValue, farValue, viewport)
      {
         return Camera .perspective (this .getFieldOfView (), nearValue, farValue, viewport [2], viewport [3], this .projectionMatrix);
      },
   });

   return Viewpoint;
});
