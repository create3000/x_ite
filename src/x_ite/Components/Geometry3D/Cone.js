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
import X3DGeometryNode      from "../Rendering/X3DGeometryNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Complex              from "../../../standard/Math/Numbers/Complex.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function Cone (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Cone);

   this ._height       .setUnit ("length");
   this ._bottomRadius .setUnit ("length");
}

Cone .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
{
   constructor: Cone,
   set_live__: function ()
   {
      X3DGeometryNode .prototype .set_live__ .call (this);

      if (this .getLive () .getValue ())
         this .getBrowser () .getConeOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getConeOptions () .removeInterest ("requestRebuild", this);
   },
   build: function ()
   {
      const
         options       = this .getBrowser () .getConeOptions (),
         xDimension    = options ._xDimension .getValue (),
         height        = this ._height .getValue (),
         bottomRadius  = this ._bottomRadius .getValue (),
         texCoordArray = this .getTexCoords (),
         normalArray   = this .getNormals (),
         vertexArray   = this .getVertices ();

      this .getMultiTexCoords () .push (texCoordArray);

      const
         y1 = height / 2,
         y2 = -y1,
         nz = Complex .Polar (1, -Math .PI / 2 + Math .atan (bottomRadius / height));

      if (this ._side .getValue ())
      {
         for (let i = 0; i < xDimension; ++ i)
         {
            const
               u1     = (i + 0.5) / xDimension,
               theta1 = 2 * Math .PI * u1,
               n1     = Complex .Polar (nz .imag, theta1);

            const
               u2     = i / xDimension,
               theta2 = 2 * Math .PI * u2,
               p2     = Complex .Polar (-bottomRadius, theta2),
               n2     = Complex .Polar (nz .imag, theta2);

            const
               u3     = (i + 1) / xDimension,
               theta3 = 2 * Math .PI * u3,
               p3     = Complex .Polar (-bottomRadius, theta3),
               n3     = Complex .Polar (nz .imag, theta3);

            /*    p1
             *   /  \
             *  /    \
             * p2 -- p3
             */

            // p1
            texCoordArray .push (u1, 1, 0, 1);
            normalArray   .push (n1 .imag, nz .real, n1 .real);
            vertexArray   .push (0, y1, 0, 1);

            // p2
            texCoordArray .push (u2, 0, 0, 1);
            normalArray   .push (n2 .imag, nz .real, n2 .real);
            vertexArray   .push (p2 .imag, y2, p2 .real, 1);

            // p3
            texCoordArray .push (u3, 0, 0, 1);
            normalArray   .push (n3 .imag , nz .real, n3 .real);
            vertexArray   .push (p3 .imag, y2, p3 .real, 1);
         }
      }

      if (this ._bottom .getValue ())
      {
         const
            texCoord = [ ],
            points   = [ ];

         for (let i = xDimension - 1; i > -1; -- i)
         {
            const
               u     = i / xDimension,
               theta = 2 * Math .PI * u,
               t     = Complex .Polar (-1, theta),
               p     = t .copy () .multiply (bottomRadius);

            texCoord .push (new Vector2 ((t .imag + 1) / 2, (t .real + 1) / 2));
            points   .push (new Vector3 (p .imag, y2, p .real));
         }

         const
            t0 = texCoord [0],
            p0 = points [0];

         for (let i = 1, length = points .length - 1; i < length; ++ i)
         {
            const
               t1 = texCoord [i],
               t2 = texCoord [i + 1],
               p1 = points [i],
               p2 = points [i + 1];

            texCoordArray .push (t0 .x, t0 .y, 0, 1);
            normalArray   .push (0, -1, 0);
            vertexArray   .push (p0 .x, p0 .y, p0 .z, 1);

            texCoordArray .push (t1 .x, t1 .y, 0, 1);
            normalArray   .push (0, -1, 0);
            vertexArray   .push (p1 .x, p1 .y, p1 .z, 1);

            texCoordArray .push (t2 .x, t2 .y, 0, 1);
            normalArray   .push (0, -1, 0);
            vertexArray   .push (p2 .x, p2 .y, p2 .z, 1);
         }
      }

      this .setSolid (this ._solid .getValue ());
      this .setExtents ();
   },
   setExtents: function ()
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
      else if (! this ._side .getValue ())
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
   typeName:
   {
      value: "Cone",
      enumerable: true,
   },
   componentName:
   {
      value: "Geometry3D",
      enumerable: true,
   },
   containerField:
   {
      value: "geometry",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
      enumerable: true,
   },
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
