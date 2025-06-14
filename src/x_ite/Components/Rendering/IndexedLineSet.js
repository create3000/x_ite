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
import X3DLineGeometryNode  from "./X3DLineGeometryNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function IndexedLineSet (executionContext)
{
   X3DLineGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedLineSet);
}

Object .assign (Object .setPrototypeOf (IndexedLineSet .prototype, X3DLineGeometryNode .prototype),
{
   initialize ()
   {
      X3DLineGeometryNode .prototype .initialize .call (this);

      this ._set_colorIndex .addFieldInterest (this ._colorIndex);
      this ._set_coordIndex .addFieldInterest (this ._coordIndex);

      this ._attrib   .addInterest ("set_attrib__",   this);
      this ._fogCoord .addInterest ("set_fogCoord__", this);
      this ._color    .addInterest ("set_color__",    this);
      this ._normal   .addInterest ("set_normal__",   this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_normal__ ();
      this .set_tangent__ ();
      this .set_coord__ ();
   },
   set_attrib__ ()
   {
      const attribNodes = this .getAttrib ();

      for (const attribNode of attribNodes)
      {
         attribNode .removeInterest ("requestRebuild", this);
         attribNode ._attribute_changed .removeInterest ("updateVertexArrays", this);
      }

      attribNodes .length = 0;

      for (const node of this ._attrib)
      {
         const attribNode = X3DCast (X3DConstants .X3DVertexAttributeNode, node);

         if (attribNode)
            attribNodes .push (attribNode);
      }

      for (const attribNode of attribNodes)
      {
         attribNode .addInterest ("requestRebuild", this);
         attribNode ._attribute_changed .addInterest ("updateVertexArrays", this);
      }

      this .updateVertexArrays ();
   },
   set_fogCoord__ ()
   {
      this .fogCoordNode ?.removeInterest ("requestRebuild", this);

      this .fogCoordNode = X3DCast (X3DConstants .FogCoordinate, this ._fogCoord);

      this .fogCoordNode ?.addInterest ("requestRebuild", this);
   },
   set_color__ ()
   {
      this .colorNode ?.removeInterest ("requestRebuild", this);

      this .colorNode = X3DCast (X3DConstants .X3DColorNode, this ._color);

      this .colorNode ?.addInterest ("requestRebuild", this);

      this .setTransparent (this .colorNode ?.isTransparent ());
   },
   set_normal__ ()
   {
      this .normalNode ?.removeInterest ("requestRebuild", this);

      this .normalNode = X3DCast (X3DConstants .X3DNormalNode, this ._normal);

      this .normalNode ?.addInterest ("requestRebuild", this);
   },
   set_tangent__ ()
   {
      this .tangentNode ?.removeInterest ("requestRebuild", this);

      this .tangentNode = X3DCast (X3DConstants .Tangent, this ._tangent);

      this .tangentNode ?.addInterest ("requestRebuild", this);
   },
   set_coord__ ()
   {
      this .coordNode ?.removeInterest ("requestRebuild", this);

      this .coordNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._coord);

      this .coordNode ?.addInterest ("requestRebuild", this);
   },
   getColorPerVertexIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return this ._coordIndex [index];
   },
   getColorIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return index;
   },
   getPolylineIndices ()
   {
      const
         coordIndex = this ._coordIndex,
         polylines  = [ ];

      let polyline = [ ];

      if (coordIndex .length)
      {
         for (let i = 0, length = coordIndex .length; i < length; ++ i)
         {
            const index = coordIndex [i];

            if (index >= 0)
               // Add vertex.
               polyline .push (i);

            else
            {
               // Negativ index.
               // Add polylines.
               polylines .push (polyline);

               polyline = [ ];
            }
         }

         if (coordIndex [coordIndex .length - 1] >= 0)
         {
            polylines .push (polyline);
         }
      }

      return polylines;
   },
   build ()
   {
      if (!this .coordNode ?.getSize ())
         return;

      const
         coordIndex        = this ._coordIndex,
         polylines         = this .getPolylineIndices (),
         colorPerVertex    = this ._colorPerVertex .getValue (),
         coordIndicesArray = this .getCoordIndices (),
         attribNodes       = this .getAttrib (),
         numAttribNodes    = attribNodes .length,
         attribArrays      = this .getAttribs (),
         fogCoordNode      = this .fogCoordNode,
         colorNode         = this .colorNode,
         coordNode         = this .coordNode,
         normalNode        = this .normalNode,
         tangentNode       = this .tangentNode,
         fogDepthArray     = this .getFogDepths (),
         colorArray        = this .getColors (),
         normalArray       = this .getNormals (),
         tangentArray      = this .getTangents (),
         vertexArray       = this .getVertices ();

      // Fill GeometryNode

      let face = 0;

      for (const polyline of polylines)
      {
         // Create two vertices for each line.

         if (polyline .length > 1)
         {
            for (let line = 0, l_end = polyline .length - 1; line < l_end; ++ line)
            {
               for (let l = line, i_end = line + 2; l < i_end; ++ l)
               {
                  const
                     i     = polyline [l],
                     index = coordIndex [i];

                  coordIndicesArray .push (index);

                  for (let a = 0; a < numAttribNodes; ++ a)
                     attribNodes [a] .addValue (index, attribArrays [a]);

                  fogCoordNode ?.addDepth (index, fogDepthArray);

                  colorNode ?.addColor (colorPerVertex ? this .getColorPerVertexIndex (i) : this .getColorIndex (face), colorArray);

                  normalNode  ?.addVector (index, normalArray);
                  tangentNode ?.addVector (index, tangentArray);

                  coordNode .addPoint (index, vertexArray);
               }
            }
         }

         ++ face;
      }
   },
});

Object .defineProperties (IndexedLineSet,
{
   ... X3DNode .getStaticProperties ("IndexedLineSet", "Rendering", 1, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_colorIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_coordIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "coordIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",         new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",        new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",          new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IndexedLineSet;
