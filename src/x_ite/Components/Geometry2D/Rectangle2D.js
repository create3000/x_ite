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
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";

function Rectangle2D (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Rectangle2D);

   this .setGeometryType (2);

   // Units

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Rectangle2D .prototype, X3DGeometryNode .prototype),
{
   build: (() =>
   {
      const defaultSize = new Vector2 (2);

      return function ()
      {
         const
            options     = this .getBrowser () .getRectangle2DOptions (),
            geometry    = options .getGeometry (),
            size        = this ._size .getValue (),
            vertexArray = this .getVertices ();

         this .getMultiTexCoords () .push (... geometry .getMultiTexCoords ());
         this .getTangents () .assign (geometry .getTangents ());
         this .getNormals ()  .assign (geometry .getNormals ());

         if (size .equals (defaultSize))
         {
            vertexArray .assign (geometry .getVertices ());

            this .getMin () .assign (geometry .getMin ());
            this .getMax () .assign (geometry .getMax ());
         }
         else
         {
            const
               x               = Math .abs (size .x / 2),
               y               = Math .abs (size .y / 2),
               defaultVertices = geometry .getVertices () .getValue ();

            for (let i = 0; i < defaultVertices .length; i += 4)
            {
               vertexArray .push (x * defaultVertices [i],
                                  y * defaultVertices [i + 1],
                                  0,
                                  1);
            }

            this .getMin () .set (-x, -y, 0);
            this .getMax () .set ( x,  y, 0);
         }

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (Rectangle2D,
{
   ... X3DNode .getStaticProperties ("Rectangle2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "size",     new Fields .SFVec2f (2, 2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default Rectangle2D;
