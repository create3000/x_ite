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

import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";

function X3DBoundedObject (executionContext)
{
   this .addType (X3DConstants .X3DBoundedObject);

   this .addChildObjects (X3DConstants .outputOnly, "hidden",           new Fields .SFBool (),
                          X3DConstants .outputOnly, "display",          new Fields .SFBool (true),
                          X3DConstants .outputOnly, "transformSensors", new Fields .SFTime ());

   // Units

   this ._bboxSize   .setUnit ("length");
   this ._bboxCenter .setUnit ("length");

   // Private properties

   this .childBBox            = new Box3 (); // Must be unique for each X3DBoundedObject.
   this .transformSensorNodes = new Set ();
}

Object .assign (X3DBoundedObject .prototype,
{
   childBBox: new Box3 (), // X3DExecutionContext needs this.
   initialize ()
   {
      this ._hidden  .addInterest ("set_visible_and_hidden__", this);
      this ._visible .addInterest ("set_visible_and_hidden__", this);

      this .set_visible_and_hidden__ ();
   },
   isVisible ()
   {
      return this ._display .getValue ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   isDefaultBBoxSize: (() =>
   {
      const defaultBBoxSize = new Vector3 (-1, -1, -1);

      return function ()
      {
         return this ._bboxSize .getValue () .equals (defaultBBoxSize);
      };
   })(),
   isBBoxVisible ()
   {
      return this ._bboxDisplay .getValue ();
   },
   getBBox (nodes, bbox, shadows)
   {
      // Must be unique for each X3DBoundedObject.
      const childBBox = this .childBBox;

      // Add bounding boxes.

      bbox .set ();

      for (const node of nodes)
      {
         if (node .getBBox)
            bbox .add (node .getBBox (childBBox, shadows));
      }

      return bbox;
   },
   displayBBox: (() =>
   {
      const
         bbox   = new Box3 (),
         eps    = new Vector3 (1e-5, 1e-5, 1e-5),
         matrix = new Matrix4 ();

      return function (type, renderObject)
      {
         const
            browser         = this .getBrowser (),
            m               = browser .getRenderingProperty ("ContentScale") === 1 ? Vector3 .Zero : eps,
            modelViewMatrix = renderObject .getModelViewMatrix ();

         this .getBBox (bbox);

         matrix .set (bbox .center, null, bbox .size .max (m));

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (matrix);

         browser .getBBoxNode () .traverse (type, renderObject);

         modelViewMatrix .pop ();
      };
   })(),
   addTransformSensor (transformSensorNode)
   {
      this .transformSensorNodes .add (transformSensorNode);

      this ._transformSensors = this .getBrowser () .getCurrentTime ();
   },
   removeTransformSensor (transformSensorNode)
   {
      this .transformSensorNodes .delete (transformSensorNode);

      this ._transformSensors = this .getBrowser () .getCurrentTime ();
   },
   getTransformSensors ()
   {
      return this .transformSensorNodes;
   },
   set_visible_and_hidden__ ()
   {
      const value = this ._visible .getValue () && !this ._hidden .getValue ();

      if (value === this ._display .getValue ())
         return;

      this ._display = value;
   },
   dispose () { },
});

Object .defineProperties (X3DBoundedObject, X3DNode .getStaticProperties ("X3DBoundedObject", "Grouping", 1));

export default X3DBoundedObject;
