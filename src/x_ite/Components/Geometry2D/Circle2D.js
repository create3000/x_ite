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
import X3DLineGeometryNode  from "../Rendering/X3DLineGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Circle2D (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Circle2D);

   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Circle2D .prototype, X3DLineGeometryNode .prototype),
{
   set_live__ ()
   {
      X3DLineGeometryNode .prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getCircle2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getCircle2DOptions () .removeInterest ("requestRebuild", this);
   },
   build ()
   {
      const
         options     = this .getBrowser () .getCircle2DOptions (),
         vertexArray = this .getVertices (),
         radius      = this ._radius .getValue ();

      if (radius === 1)
      {
         this .setVertices (options .getVertices ());
      }
      else
      {
         const defaultVertices = options .getVertices () .getValue ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
            vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Circle2D,
{
   ... X3DNode .getStaticProperties ("Circle2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
      ]),
      enumerable: true,
   },
});

export default Circle2D;
