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

import X3DNode          from "../Core/X3DNode.js";
import X3DChildNode     from "../Core/X3DChildNode.js";
import X3DBoundedObject from "../Grouping/X3DBoundedObject.js";
import X3DCast          from "../../Base/X3DCast.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import AlphaMode        from "../../Browser/Shape/AlphaMode.js";
import Box3             from "../../../standard/Math/Geometry/Box3.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";

function X3DShapeNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DShapeNode);

   // Private properties

   this .bbox       = new Box3 ();
   this .bboxSize   = new Vector3 ();
   this .bboxCenter = new Vector3 ();
}

Object .assign (Object .setPrototypeOf (X3DShapeNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._pointerEvents .addInterest ("set_pointingObject__", this);
      this ._castShadow    .addInterest ("set_shadowObject__",   this);
      this ._bboxSize      .addInterest ("set_bbox__",           this);
      this ._bboxCenter    .addInterest ("set_bbox__",           this);
      this ._appearance    .addInterest ("set_appearance__",     this);
      this ._geometry      .addInterest ("set_geometry__",       this);

      this .set_appearance__ ();
      this .set_geometry__ ();
   },
   getNumInstances ()
   {
      return 1;
   },
   getBBox (bbox, shadows)
   {
      if (shadows)
      {
         if (this ._castShadow .getValue ())
            return bbox .assign (this .bbox);
         else
            return bbox .set ();
      }
      else
      {
         return bbox .assign (this .bbox);
      }
   },
   getBBoxSize ()
   {
      return this .bboxSize;
   },
   getBBoxCenter ()
   {
      return this .bboxCenter;
   },
   isTransparent ()
   {
      return this .transparent;
   },
   setTransparent (value)
   {
      this .transparent = !!value;
   },
   isTransmission ()
   {
      return this .transmission;
   },
   setTransmission (value)
   {
      this .transmission = !!value;
   },
   getAlphaMode ()
   {
      return this .alphaMode;
   },
   setAlphaMode (value)
   {
      this .alphaMode = value;
   },
   getAppearance ()
   {
      return this .appearanceNode;
   },
   getGeometry ()
   {
      return this .geometryNode;
   },
   getGeometryContext ()
   {
      return this .getGeometry ();
   },
   set_appearance__ ()
   {
      if (this .appearanceNode)
      {
         this .appearanceNode ._alphaMode    .removeInterest ("set_transparent__",  this);
         this .appearanceNode ._transparent  .removeInterest ("set_transparent__",  this);
         this .appearanceNode ._transmission .removeInterest ("set_transmission__", this);
      }

      this .appearanceNode = X3DCast (X3DConstants .X3DAppearanceNode, this ._appearance)
         ?? this .getBrowser () .getDefaultAppearance ();

      this .appearanceNode ._alphaMode    .addInterest ("set_transparent__",  this);
      this .appearanceNode ._transparent  .addInterest ("set_transparent__",  this);
      this .appearanceNode ._transmission .addInterest ("set_transmission__", this);

      this .set_transparent__ ();
      this .set_transmission__ ();
   },
   set_geometry__ ()
   {
      if (this .geometryNode)
      {
         this .geometryNode ._transparent  .addInterest ("set_transparent__", this);
         this .geometryNode ._bbox_changed .addInterest ("set_bbox__",        this);
      }

      this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._geometry);

      if (this .geometryNode)
      {
         this .geometryNode ._transparent  .addInterest ("set_transparent__", this);
         this .geometryNode ._bbox_changed .addInterest ("set_bbox__",        this);
      }

      this .set_pointingObject__ ();
      this .set_shadowObject__ ();
      this .set_visibleObject__ ();
      this .set_transparent__ ();
      this .set_bbox__ ();
   },
   set_pointingObject__ ()
   {
      this .setPointingObject (this .geometryNode && this ._pointerEvents .getValue ());
   },
   set_shadowObject__ ()
   {
      this .setShadowObject (this .geometryNode && this ._castShadow .getValue ());
   },
   set_visibleObject__ ()
   {
      this .setVisibleObject (this .geometryNode);
   },
   set_transparent__ ()
   {
      // This function is overloaded in ParticleSystem!

      const alphaMode = this .appearanceNode .getAlphaMode ();

      if (alphaMode === AlphaMode .AUTO)
      {
         this .transparent = !!(this .appearanceNode .isTransparent () || this .geometryNode ?.isTransparent ());
         this .alphaMode   = this .transparent ? AlphaMode .BLEND : AlphaMode .OPAQUE;
      }
      else
      {
         this .transparent = alphaMode === AlphaMode .BLEND;
         this .alphaMode   = alphaMode;
      }
   },
   set_transmission__ ()
   {
      this .transmission = this .appearanceNode .isTransmission ();
   },
   set_bbox__ ()
   {
      if (this .isDefaultBBoxSize ())
      {
         if (this .getGeometry ())
            this .bbox .assign (this .getGeometry () .getBBox ());
         else
            this .bbox .set ();
      }
      else
      {
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DShapeNode, X3DNode .getStaticProperties ("X3DShapeNode", "Shape", 1));

export default X3DShapeNode;
