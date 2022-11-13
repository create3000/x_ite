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


import Fields from "../../Fields.js";
import X3DFieldDefinition from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DViewpointNode from "./X3DViewpointNode.js";
import ScalarInterpolator from "../Interpolation/ScalarInterpolator.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Camera from "../../../standard/Math/Geometry/Camera.js";
import Vector2 from "../../../standard/Math/Numbers/Vector2.js";
import Vector3 from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4 from "../../../standard/Math/Numbers/Matrix4.js";

function OrthoViewpoint (executionContext)
{
   X3DViewpointNode .call (this, executionContext);

   this .addType (X3DConstants .OrthoViewpoint);

   this .addChildObjects ("fieldOfViewOffset", new Fields .MFFloat (0, 0, 0, 0));

   this ._position         .setUnit ("length");
   this ._centerOfRotation .setUnit ("length");
   this ._fieldOfView      .setUnit ("length");

   this .projectionMatrix               = new Matrix4 ();
   this .fieldOfViewOffsetInterpolator0 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator1 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator2 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator3 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewScaleInterpolator   = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
}

OrthoViewpoint .prototype = Object .assign (Object .create (X3DViewpointNode .prototype),
{
   constructor: OrthoViewpoint,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .MFFloat (-1, -1, 1, 1)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
   ]),
   getTypeName: function ()
   {
      return "OrthoViewpoint";
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

      this ._fieldOfView       .addInterest ("set_fieldOfView__", this);
      this ._fieldOfViewOffset .addInterest ("set_fieldOfView__", this);
      this ._fieldOfViewScale  .addInterest ("set_fieldOfView__", this);

      this .fieldOfViewOffsetInterpolator0 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator1 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator2 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator3 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewScaleInterpolator   ._key = new Fields .MFFloat (0, 1);

      this .fieldOfViewOffsetInterpolator0 .setup ();
      this .fieldOfViewOffsetInterpolator1 .setup ();
      this .fieldOfViewOffsetInterpolator2 .setup ();
      this .fieldOfViewOffsetInterpolator3 .setup ();
      this .fieldOfViewScaleInterpolator   .setup ();

      this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator0 ._set_fraction);
      this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator1 ._set_fraction);
      this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator2 ._set_fraction);
      this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator3 ._set_fraction);
      this .getEaseInEaseOut () ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewScaleInterpolator   ._set_fraction);

      this .fieldOfViewOffsetInterpolator0 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator1 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator2 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator3 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);

      this .fieldOfViewScaleInterpolator ._value_changed .addFieldInterest (this ._fieldOfViewScale);

      this .set_fieldOfView__ ();
   },
   set_fieldOfView__: function ()
   {
      const
         length           = this ._fieldOfView .length,
         fieldOfViewScale = this ._fieldOfViewScale .getValue ();

      this .minimumX = ((length > 0 ? this ._fieldOfView [0] : -1) + this ._fieldOfViewOffset [0]) * fieldOfViewScale;
      this .minimumY = ((length > 1 ? this ._fieldOfView [1] : -1) + this ._fieldOfViewOffset [1]) * fieldOfViewScale;
      this .maximumX = ((length > 2 ? this ._fieldOfView [2] :  1) + this ._fieldOfViewOffset [2]) * fieldOfViewScale;
      this .maximumY = ((length > 3 ? this ._fieldOfView [3] :  1) + this ._fieldOfViewOffset [3]) * fieldOfViewScale;

      this .sizeX = this .maximumX - this .minimumX;
      this .sizeY = this .maximumY - this .minimumY;
   },
   set_fieldOfViewOffset__: function ()
   {
      this ._fieldOfViewOffset [0] = this .fieldOfViewOffsetInterpolator0 ._value_changed .getValue ();
      this ._fieldOfViewOffset [1] = this .fieldOfViewOffsetInterpolator1 ._value_changed .getValue ();
      this ._fieldOfViewOffset [2] = this .fieldOfViewOffsetInterpolator2 ._value_changed .getValue ();
      this ._fieldOfViewOffset [3] = this .fieldOfViewOffsetInterpolator3 ._value_changed .getValue ();
   },
   setInterpolators: function (fromViewpointNode, toViewpointNode)
   {
      if (fromViewpointNode .getType () .includes (X3DConstants .OrthoViewpoint))
      {
         const
            toLength   = toViewpointNode   ._fieldOfView .length,
            fromLength = fromViewpointNode ._fieldOfView .length;

         const
            offset0 = (fromLength > 0 ? fromViewpointNode ._fieldOfView [0] : -1) - (toLength > 0 ? toViewpointNode ._fieldOfView [0] : -1),
            offset1 = (fromLength > 1 ? fromViewpointNode ._fieldOfView [1] : -1) - (toLength > 1 ? toViewpointNode ._fieldOfView [1] : -1),
            offset2 = (fromLength > 2 ? fromViewpointNode ._fieldOfView [2] :  1) - (toLength > 2 ? toViewpointNode ._fieldOfView [2] :  1),
            offset3 = (fromLength > 3 ? fromViewpointNode ._fieldOfView [3] :  1) - (toLength > 3 ? toViewpointNode ._fieldOfView [3] :  1);

         this .fieldOfViewOffsetInterpolator0 ._keyValue = new Fields .MFFloat (offset0, toViewpointNode ._fieldOfViewOffset [0]);
         this .fieldOfViewOffsetInterpolator1 ._keyValue = new Fields .MFFloat (offset1, toViewpointNode ._fieldOfViewOffset [1]);
         this .fieldOfViewOffsetInterpolator2 ._keyValue = new Fields .MFFloat (offset2, toViewpointNode ._fieldOfViewOffset [2]);
         this .fieldOfViewOffsetInterpolator3 ._keyValue = new Fields .MFFloat (offset3, toViewpointNode ._fieldOfViewOffset [3]);

         this .fieldOfViewScaleInterpolator ._keyValue = new Fields .MFFloat (fromViewpointNode ._fieldOfViewScale .getValue (), toViewpointNode ._fieldOfViewScale .getValue ());

         this ._fieldOfViewOffset [0] = offset0;
         this ._fieldOfViewOffset [1] = offset1;
         this ._fieldOfViewOffset [2] = offset2;
         this ._fieldOfViewOffset [3] = offset3;

         this ._fieldOfViewScale = fromViewpointNode ._fieldOfViewScale .getValue ();
      }
      else
      {
         this .fieldOfViewOffsetInterpolator0 ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewOffset [0], toViewpointNode ._fieldOfViewOffset [0]);
         this .fieldOfViewOffsetInterpolator1 ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewOffset [1], toViewpointNode ._fieldOfViewOffset [1]);
         this .fieldOfViewOffsetInterpolator2 ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewOffset [2], toViewpointNode ._fieldOfViewOffset [2]);
         this .fieldOfViewOffsetInterpolator3 ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewOffset [3], toViewpointNode ._fieldOfViewOffset [3]);

         this .fieldOfViewScaleInterpolator ._keyValue = new Fields .MFFloat (toViewpointNode ._fieldOfViewScale .getValue (), toViewpointNode ._fieldOfViewScale .getValue ());

         this ._fieldOfViewOffset = toViewpointNode ._fieldOfViewOffset .getValue ();
         this ._fieldOfViewScale  = toViewpointNode ._fieldOfViewScale  .getValue ();
      }
   },
   getLogarithmicDepthBuffer: function ()
   {
      return false;
   },
   getMinimumX: function ()
   {
      return this .minimumX;
   },
   getMinimumY: function ()
   {
      return this .minimumY;
   },
   getMaximumX: function ()
   {
      return this .maximumX;
   },
   getMaximumY: function ()
   {
      return this .maximumY;
   },
   getSizeX: function ()
   {
      return this .sizeX;
   },
   getSizeY: function ()
   {
      return this .sizeY;
   },
   getMaxFarValue: function ()
   {
      return 1e5;
   },
   getScreenScale: function (point, viewport, screenScale)
   {
      const
         width  = viewport [2],
         height = viewport [3],
         sizeX  = this .sizeX,
         sizeY  = this .sizeY,
         aspect = width / height;

      if (aspect > sizeX / sizeY)
      {
         const s = sizeY / height;

         return screenScale .set (s, s, s);
      }
      else
      {
         const s = sizeX / width;

         return screenScale .set (s, s, s);
      }
   },
   getViewportSize: (function ()
   {
      const viewportSize = new Vector2 (0, 0);

      return function (viewport, nearValue)
      {
         const
            width  = viewport [2],
            height = viewport [3],
            sizeX  = this .sizeX,
            sizeY  = this .sizeY,
            aspect = width / height;

         if (aspect > sizeX / sizeY)
            return viewportSize .set (sizeY * aspect, sizeY);

         return viewportSize .set (sizeX, sizeX / aspect);
      };
   })(),
   getLookAtDistance: function (bbox)
   {
      return bbox .size .magnitude () / 2 + 10;
   },
   getProjectionMatrixWithLimits: function (nearValue, farValue, viewport)
   {
      const
         width  = viewport [2],
         height = viewport [3],
         aspect = width / height,
         sizeX  = this .sizeX,
         sizeY  = this .sizeY;

      if (aspect > sizeX / sizeY)
      {
         const
            center  = (this .minimumX + this .maximumX) / 2,
            size1_2 = (sizeY * aspect) / 2;

         return Camera .ortho (center - size1_2, center + size1_2, this .minimumY, this .maximumY, nearValue, farValue, this .projectionMatrix);
      }
      else
      {
         const
            center  = (this .minimumY + this .maximumY) / 2,
            size1_2 = (sizeX / aspect) / 2;

         return Camera .ortho (this .minimumX, this .maximumX, center - size1_2, center + size1_2, nearValue, farValue, this .projectionMatrix);
      }
   },
});

export default OrthoViewpoint;
