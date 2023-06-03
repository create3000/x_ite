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

function Sphere (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .Sphere);

   this ._radius .setUnit ("length");
}

Sphere .prototype = Object .assign (Object .create (X3DGeometryNode .prototype),
{
   constructor: Sphere,
   getSpecificationRange: function ()
   {
      return ["2.0", "Infinity"];
   },
   set_live__: function ()
   {
      X3DGeometryNode .prototype .set_live__ .call (this);

      if (this .getLive () .getValue ())
         this .getBrowser () .getSphereOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getSphereOptions () .removeInterest ("requestRebuild", this);
   },
   build: function ()
   {
      const
         options  = this .getBrowser () .getSphereOptions (),
         geometry = options .getGeometry (),
         radius   = Math .abs (this ._radius .getValue ());

      this .setMultiTexCoords (geometry .getMultiTexCoords ());
      this .setNormals        (geometry .getNormals ());

      if (radius === 1)
      {
         this .setVertices (geometry .getVertices ());

         this .getMin () .assign (geometry .getMin ());
         this .getMax () .assign (geometry .getMax ());
      }
      else
      {
         const
            defaultVertices = geometry .getVertices () .getValue (),
            vertexArray     = this .getVertices ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
         {
            vertexArray .push (radius * defaultVertices [i],
                               radius * defaultVertices [i + 1],
                               radius * defaultVertices [i + 2],
                               1);
         }

         this .getMin () .set (-radius, -radius, -radius);
         this .getMax () .set ( radius,  radius,  radius);
      }

      this .setSolid (this ._solid .getValue ());
   },
});

Object .defineProperties (Sphere,
{
   typeName:
   {
      value: "Sphere",
   },
   componentName:
   {
      value: "Geometry3D",
   },
   containerField:
   {
      value: "geometry",
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "radius",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",    new Fields .SFBool (true)),
      ]),
   },
});

export default Sphere;
