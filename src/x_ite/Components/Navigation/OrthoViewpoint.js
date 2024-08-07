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
import X3DViewpointNode     from "./X3DViewpointNode.js";
import ScalarInterpolator   from "../Interpolation/ScalarInterpolator.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function OrthoViewpoint (executionContext)
{
   X3DViewpointNode .call (this, executionContext);

   this .addType (X3DConstants .OrthoViewpoint);

   this .addChildObjects (X3DConstants .inputOutput, "fieldOfViewOffset", new Fields .MFFloat (0, 0, 0, 0));

   this ._position         .setUnit ("length");
   this ._centerOfRotation .setUnit ("length");
   this ._fieldOfView      .setUnit ("length");

   this .projectionMatrix               = new Matrix4 ();
   this .fieldOfViewOffsetInterpolator0 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator1 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator2 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
   this .fieldOfViewOffsetInterpolator3 = new ScalarInterpolator (this .getBrowser () .getPrivateScene ());
}

Object .assign (Object .setPrototypeOf (OrthoViewpoint .prototype, X3DViewpointNode .prototype),
{
   initialize ()
   {
      X3DViewpointNode .prototype .initialize .call (this);

      this .fieldOfViewOffsetInterpolator0 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator1 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator2 ._key = new Fields .MFFloat (0, 1);
      this .fieldOfViewOffsetInterpolator3 ._key = new Fields .MFFloat (0, 1);

      this .fieldOfViewOffsetInterpolator0 .setup ();
      this .fieldOfViewOffsetInterpolator1 .setup ();
      this .fieldOfViewOffsetInterpolator2 .setup ();
      this .fieldOfViewOffsetInterpolator3 .setup ();

      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator0 ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator1 ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator2 ._set_fraction);
      this .easeInEaseOut ._modifiedFraction_changed .addFieldInterest (this .fieldOfViewOffsetInterpolator3 ._set_fraction);

      this .fieldOfViewOffsetInterpolator0 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator1 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator2 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
      this .fieldOfViewOffsetInterpolator3 ._value_changed .addInterest ("set_fieldOfViewOffset__", this);
   },
   set_fieldOfViewOffset__ ()
   {
      this ._fieldOfViewOffset [0] = this .fieldOfViewOffsetInterpolator0 ._value_changed .getValue ();
      this ._fieldOfViewOffset [1] = this .fieldOfViewOffsetInterpolator1 ._value_changed .getValue ();
      this ._fieldOfViewOffset [2] = this .fieldOfViewOffsetInterpolator2 ._value_changed .getValue ();
      this ._fieldOfViewOffset [3] = this .fieldOfViewOffsetInterpolator3 ._value_changed .getValue ();
   },
   resetUserOffsets ()
   {
      X3DViewpointNode .prototype .resetUserOffsets .call (this);

      this ._fieldOfViewOffset [0] = 0;
      this ._fieldOfViewOffset [1] = 0;
      this ._fieldOfViewOffset [2] = 0;
      this ._fieldOfViewOffset [3] = 0;
   },
   getRelativeTransformation (fromViewpointNode)
   {
      const relative = X3DViewpointNode .prototype .getRelativeTransformation .call (this, fromViewpointNode);

      if (fromViewpointNode .constructor === this .constructor)
      {
         relative .userMinimumX = fromViewpointNode .getUserMinimumX ();
         relative .userMinimumY = fromViewpointNode .getUserMinimumY ();
         relative .userMaximumX = fromViewpointNode .getUserMaximumX ();
         relative .userMaximumY = fromViewpointNode .getUserMaximumY ();
      }

      return relative;
   },
   setInterpolators (fromViewpointNode, relative)
   {
      if (fromViewpointNode .constructor === this .constructor)
      {
         const
            offset0 = relative .userMinimumX - this .getMinimumX (),
            offset1 = relative .userMinimumY - this .getMinimumY (),
            offset2 = relative .userMaximumX - this .getMaximumX (),
            offset3 = relative .userMaximumY - this .getMaximumY ();

         this .fieldOfViewOffsetInterpolator0 ._keyValue = new Fields .MFFloat (offset0, this ._fieldOfViewOffset [0]);
         this .fieldOfViewOffsetInterpolator1 ._keyValue = new Fields .MFFloat (offset1, this ._fieldOfViewOffset [1]);
         this .fieldOfViewOffsetInterpolator2 ._keyValue = new Fields .MFFloat (offset2, this ._fieldOfViewOffset [2]);
         this .fieldOfViewOffsetInterpolator3 ._keyValue = new Fields .MFFloat (offset3, this ._fieldOfViewOffset [3]);
         this .fieldOfViewScaleInterpolator   ._keyValue = new Fields .MFFloat (1, this ._fieldOfViewScale .getValue ());

         this ._fieldOfViewOffset [0] = relative .offset0;
         this ._fieldOfViewOffset [1] = relative .offset1;
         this ._fieldOfViewOffset [2] = relative .offset2;
         this ._fieldOfViewOffset [3] = relative .offset3;
         this ._fieldOfViewScale      = 1;
      }
      else
      {
         this .fieldOfViewOffsetInterpolator0 ._keyValue = new Fields .MFFloat (this ._fieldOfViewOffset [0], this ._fieldOfViewOffset [0]);
         this .fieldOfViewOffsetInterpolator1 ._keyValue = new Fields .MFFloat (this ._fieldOfViewOffset [1], this ._fieldOfViewOffset [1]);
         this .fieldOfViewOffsetInterpolator2 ._keyValue = new Fields .MFFloat (this ._fieldOfViewOffset [2], this ._fieldOfViewOffset [2]);
         this .fieldOfViewOffsetInterpolator3 ._keyValue = new Fields .MFFloat (this ._fieldOfViewOffset [3], this ._fieldOfViewOffset [3]);
         this .fieldOfViewScaleInterpolator   ._keyValue = new Fields .MFFloat (1, this ._fieldOfViewOffset .getValue ());

         this ._fieldOfViewOffset = this ._fieldOfViewOffset .getValue ();
         this ._fieldOfViewScale  = 1;
      }
   },
   getLogarithmicDepthBuffer ()
   {
      return false;
   },
   getFieldOfView ()
   {
      return [
         this .getMinimumX (),
         this .getMinimumY (),
         this .getMaximumX (),
         this .getMaximumY (),
      ];
   },
   setFieldOfView (value)
   {
      this ._fieldOfView = value;
   },
   getUserFieldOfView ()
   {
      return [
         this .getUserMinimumX (),
         this .getUserMinimumY (),
         this .getUserMaximumX (),
         this .getUserMaximumY (),
      ];
   },
   getMinimumX ()
   {
      return this ._fieldOfView .length > 0 ? this ._fieldOfView [0] : -1;
   },
   getUserMinimumX ()
   {
      return (this .getMinimumX () + this ._fieldOfViewOffset [0]) * this ._fieldOfViewScale .getValue ();
   },
   getMinimumY ()
   {
      return this ._fieldOfView .length > 1 ? this ._fieldOfView [1] : -1;
   },
   getUserMinimumY ()
   {
      return (this .getMinimumY () + this ._fieldOfViewOffset [1]) * this ._fieldOfViewScale .getValue ();
   },
   getMaximumX ()
   {
      return this ._fieldOfView .length > 2 ? this ._fieldOfView [2] : 1;
   },
   getUserMaximumX ()
   {
      return (this .getMaximumX () + this ._fieldOfViewOffset [2]) * this ._fieldOfViewScale .getValue ();
   },
   getMaximumY ()
   {
      return this ._fieldOfView .length > 3 ? this ._fieldOfView [3] : 1;
   },
   getUserMaximumY ()
   {
      return (this .getMaximumY () + this ._fieldOfViewOffset [3]) * this ._fieldOfViewScale .getValue ();
   },
   getSizeX ()
   {
      return this .getMaximumX () - this .getMinimumX ();
   },
   getUserSizeX ()
   {
      return this .getUserMaximumX () - this .getUserMinimumX ();
   },
   getSizeY ()
   {
      return this .getMaximumY () - this .getMinimumY ();
   },
   getUserSizeY ()
   {
      return this .getUserMaximumY () - this .getUserMinimumY ();
   },
   getMaxFarValue ()
   {
      return 1e4;
   },
   getScreenScale (point, viewport, screenScale)
   {
      const
         width  = viewport [2],
         height = viewport [3],
         sizeX  = this .getUserSizeX (),
         sizeY  = this .getUserSizeY (),
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
   getViewportSize: (() =>
   {
      const viewportSize = new Vector2 ();

      return function (viewport, nearValue)
      {
         const
            width  = viewport [2],
            height = viewport [3],
            sizeX  = this .getUserSizeX (),
            sizeY  = this .getUserSizeY (),
            aspect = width / height;

         if (aspect > sizeX / sizeY)
            return viewportSize .set (sizeY * aspect, sizeY);

         return viewportSize .set (sizeX, sizeX / aspect);
      };
   })(),
   getLookAtDistance (bbox)
   {
      return bbox .size .magnitude () / 2 + 10;
   },
   getProjectionMatrixWithLimits (nearValue, farValue, viewport)
   {
      const
         width  = viewport [2],
         height = viewport [3],
         aspect = width / height,
         sizeX  = this .getUserSizeX (),
         sizeY  = this .getUserSizeY ();

      if (aspect > sizeX / sizeY)
      {
         const
            center  = (this .getUserMinimumX () + this .getUserMaximumX ()) / 2,
            size1_2 = (sizeY * aspect) / 2;

         return Camera .ortho (center - size1_2, center + size1_2, this .getUserMinimumY (), this .getUserMaximumY (), nearValue, farValue, this .projectionMatrix);
      }
      else
      {
         const
            center  = (this .getUserMinimumY () + this .getUserMaximumY ()) / 2,
            size1_2 = (sizeX / aspect) / 2;

         return Camera .ortho (this .getUserMinimumX (), this .getUserMaximumX (), center - size1_2, center + size1_2, nearValue, farValue, this .projectionMatrix);
      }
   },
   viewAll (bbox)
   {
      X3DViewpointNode .prototype .viewAll .call (this, bbox);

      const
         size   = bbox .size,
         scaleX = size .x / this .getSizeX (),
         scaleY = size .y / this .getSizeY (),
         scale  = Math .max (scaleX, scaleY) * 1.1;

      this ._fieldOfViewOffset [0] = this .getMinimumX () * scale - this .getMinimumX ();
      this ._fieldOfViewOffset [1] = this .getMinimumY () * scale - this .getMinimumY ();
      this ._fieldOfViewOffset [2] = this .getMaximumX () * scale - this .getMaximumX ();
      this ._fieldOfViewOffset [3] = this .getMaximumY () * scale - this .getMaximumY ();
   },
});

Object .defineProperties (OrthoViewpoint,
{
   ... X3DNode .getStaticProperties ("OrthoViewpoint", "Navigation", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .MFFloat (-1, -1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",       new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewAll",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "navigationInfo",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default OrthoViewpoint;
