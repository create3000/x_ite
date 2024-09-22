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
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";

function Cone (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Cone);

   this ._height       .setUnit ("length");
   this ._bottomRadius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Cone .prototype, X3DGeometryNode .prototype),
{
   set_live__ ()
   {
      X3DGeometryNode .prototype .set_live__ .call (this);

      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         browser .getConeOptions () .addInterest ("requestRebuild", this);
      else
         browser .getConeOptions () .removeInterest ("requestRebuild", this);
   },
   build ()
   {
      const
         options       = this .getBrowser () .getConeOptions (),
         height        = Math .abs (this ._height .getValue ()),
         height1_2     = height / 2,
         bottomRadius  = Math .abs (this ._bottomRadius .getValue ()),
         texCoordArray = this .getTexCoords (),
         normalArray   = this .getNormals (),
         vertexArray   = this .getVertices ();

      this .getMultiTexCoords () .push (texCoordArray);

      if (this ._side .getValue ())
      {
         const
            geometry        = options .getSideGeometry (),
            defaultNormals  = geometry .getNormals (),
            defaultVertices = geometry .getVertices (),
            v1              = new Vector3 (),
            rz              = new Rotation4 (1, 0, 0, -Math .atan (bottomRadius / height)),
            rx              = new Rotation4 ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (let i = 0, length = defaultNormals .length; i < length; i += 3)
         {
            v1 .set (defaultNormals [i], 0, defaultNormals [i + 2]),
            rx .setFromToVec (Vector3 .zAxis, v1) .multLeft (rz) .multVecRot (v1 .set (0, 0, 1));

            normalArray .push (... v1);
         }

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      if (this ._bottom .getValue ())
      {
         const
            geometry        = options .getBottomGeometry (),
            defaultVertices = geometry .getVertices ();

         for (const t of geometry .getMultiTexCoords () [0])
            texCoordArray .push (t);

         for (const n of geometry .getNormals ())
            normalArray .push (n);

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (bottomRadius * defaultVertices [i],
                               height1_2    * defaultVertices [i + 1],
                               bottomRadius * defaultVertices [i + 2],
                               1);
         }
      }

      this .setSolid (this ._solid .getValue ());
      this .setExtents ();
   },
   setExtents ()
   {
      const
         bottomRadius = this ._bottomRadius .getValue (),
         y1           = this ._height .getValue () / 2,
         y2           = -y1;

      if (!this ._side .getValue () && !this ._bottom .getValue ())
      {
         this .getMin () .set (0, 0, 0);
         this .getMax () .set (0, 0, 0);
      }
      else if (!this ._side .getValue ())
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y2,  bottomRadius);
      }
      else
      {
         this .getMin () .set (-bottomRadius, y2, -bottomRadius);
         this .getMax () .set ( bottomRadius, y1, bottomRadius);
      }
   },
});

Object .defineProperties (Cone,
{
   ... X3DNode .getStaticProperties ("Cone", "Geometry3D", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "side",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bottom",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "height",       new Fields .SFFloat (2)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bottomRadius", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",        new Fields .SFBool (true)),
      ]),
      enumerable: true,
   },
});

export default Cone;
