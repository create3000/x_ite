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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DComposedGeometryNode from "../Rendering/X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Triangle3               from "../../../standard/Math/Geometry/Triangle3.js";

function IndexedFaceSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .IndexedFaceSet);

   this ._creaseAngle .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (IndexedFaceSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._set_colorIndex    .addFieldInterest (this ._colorIndex);
      this ._set_texCoordIndex .addFieldInterest (this ._texCoordIndex);
      this ._set_normalIndex   .addFieldInterest (this ._normalIndex);
      this ._set_coordIndex    .addFieldInterest (this ._coordIndex);
   },
   getTexCoordPerVertexIndex (index)
   {
      if (index < this ._texCoordIndex .length)
         return this ._texCoordIndex [index];

      return this ._coordIndex [index];
   },
   getColorPerVertexIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return this ._coordIndex [index];
   },
   getColorPerFaceIndex (index)
   {
      if (index < this ._colorIndex .length)
         return this ._colorIndex [index];

      return index;
   },
   getNormalPerVertexIndex (index)
   {
      if (index < this ._normalIndex .length)
         return this ._normalIndex [index];

      return this ._coordIndex [index];
   },
   getNormalPerFaceIndex (index)
   {
      if (index < this ._normalIndex .length)
         return this ._normalIndex [index];

      return index;
   },
   build ()
   {
      // Triangulate

      const polygons = this .triangulate ();

      // Build arrays

      if (polygons .length === 0)
         return;

      // Fill GeometryNode

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this ._coordIndex .getValue (),
         coordIndicesArray  = this .getCoordIndices (),
         attribNodes        = this .getAttrib (),
         numAttribNodes     = attribNodes .length,
         attribArrays       = this .getAttribs (),
         fogCoordNode       = this .getFogCoord (),
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         normalNode         = this .getNormal (),
         tangentNode        = this .getTangent (),
         coordNode          = this .getCoord (),
         fogDepthArray      = this .getFogDepths (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         normalArray        = this .getNormals (),
         tangentArray       = this .getTangent (),
         vertexArray        = this .getVertices ();

      texCoordNode ?.init (multiTexCoordArray);

      for (const { triangles, face } of polygons)
      {
         for (const i of triangles)
         {
            const index = coordIndex [i];

            coordIndicesArray .push (index);

            for (let a = 0; a < numAttribNodes; ++ a)
               attribNodes [a] .addValue (index, attribArrays [a]);

            fogCoordNode ?.addDepth (index, fogDepthArray);

            colorNode ?.addColor (colorPerVertex ? this .getColorPerVertexIndex (i) : this .getColorPerFaceIndex (face), colorArray);

            texCoordNode ?.addPoint (this .getTexCoordPerVertexIndex (i), multiTexCoordArray);

            normalNode  ?.addVector (normalPerVertex ? this .getNormalPerVertexIndex (i) : this .getNormalPerFaceIndex (face), normalArray);
            tangentNode ?.addVector (normalPerVertex ? this .getNormalPerVertexIndex (i) : this .getNormalPerFaceIndex (face), tangentArray);

            coordNode .addPoint (index, vertexArray);
         }
      }

      // Autogenerate normals if not specified.

      if (!this .getNormal ())
         this .generateNormals (polygons);

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
   triangulate ()
   {
      const
         convex      = this ._convex .getValue (),
         coordLength = this ._coordIndex .length,
         polygons    = [ ];

      if (!this .getCoord ())
         return polygons;

      // Add -1 (polygon end marker) to coordIndex if not present.
      if (coordLength && this ._coordIndex .at (-1) > -1)
         this ._coordIndex .push (-1);

      if (coordLength)
      {
         const
            coordIndex  = this ._coordIndex .getValue (),
            coordLength = this ._coordIndex .length;

         // Construct triangle array and determine the number of used points.

         for (let i = 0, face = 0, vertices = [ ]; i < coordLength; ++ i)
         {
            const index = coordIndex [i];

            if (index > -1)
            {
               // Add vertex index.
               vertices .push (i);
            }
            else
            {
               // Negative index.

               switch (vertices .length)
               {
                  case 0:
                  case 1:
                  case 2:
                  {
                     vertices .length = 0;
                     break;
                  }
                  case 3:
                  {
                     // Add polygon with one triangle.
                     polygons .push ({ vertices: vertices, triangles: vertices, face: face });
                     vertices = [ ];
                     break;
                  }
                  default:
                  {
                     // Triangulate polygon.

                     const
                        triangles = [ ],
                        polygon   = { vertices: vertices, triangles: triangles, face: face };

                     if (convex)
                        Triangle3 .triangulateConvexPolygon (vertices, triangles);
                     else
                        this .triangulatePolygon (vertices, triangles);

                     if (triangles .length < 3)
                     {
                        vertices .length = 0;
                     }
                     else
                     {
                        polygons .push (polygon);
                        vertices = [ ];
                     }

                     break;
                  }
               }

               ++ face;
            }
         }
      }

      return polygons;
   },
   triangulatePolygon: (() =>
   {
      const polygon = [ ];

      return function (vertices, triangles)
      {
         const
            coordIndex = this ._coordIndex .getValue (),
            coord      = this .getCoord (),
            length     = vertices .length;

         for (let i = polygon .length; i < length; ++ i)
            polygon .push (new Vector3 ());

         for (let i = 0; i < length; ++ i)
         {
            const
               index = vertices [i],
               point = polygon [i];

            point .index = index;

            coord .get1Point (coordIndex [index], point);
         }

         polygon .length = length;

         Triangle3 .triangulatePolygon (polygon, triangles);
      };
   })(),
   generateNormals (polygons)
   {
      const
         normals     = this .createNormals (polygons),
         normalArray = this .getNormals ();

      for (const { triangles } of polygons)
      {
         for (const i of triangles)
            normalArray .push (... normals [i]);
      }
   },
   createNormals (polygons)
   {
      const
         cw          = !this ._ccw .getValue (),
         coordIndex  = this ._coordIndex .getValue (),
         coord       = this .getCoord (),
         normalIndex = new Map (),
         normals     = [ ];

      for (const { vertices } of polygons)
      {
         const length = vertices .length;

         switch (length)
         {
            case 3:
            {
               var normal = coord .getNormal (coordIndex [vertices [0]],
                                              coordIndex [vertices [1]],
                                              coordIndex [vertices [2]]);
               break;
            }
            case 4:
            {
               var normal = coord .getQuadNormal (coordIndex [vertices [0]],
                                                  coordIndex [vertices [1]],
                                                  coordIndex [vertices [2]],
                                                  coordIndex [vertices [3]]);
               break;
            }
            default:
            {
               var normal = this .getPolygonNormal (vertices, coordIndex, coord);
               break;
            }
         }

         if (cw)
            normal .negate ();

         // Add a normal index for each point.

         for (const index of vertices)
         {
            const point = coordIndex [index];

            let pointNormals = normalIndex .get (point);

            if (!pointNormals)
               normalIndex .set (point, pointNormals = [ ]);

            pointNormals .push (index);

            // Add this normal for each vertex.

            normals [index] = normal;
         }
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, this ._creaseAngle .getValue ());
   },
   getPolygonNormal: (() =>
   {
      let
         current = new Vector3 (),
         next    = new Vector3 ();

      return function (vertices, coordIndex, coord)
      {
         // Determine polygon normal.
         // We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

         const normal = new Vector3 ();

         coord .get1Point (coordIndex [vertices [0]], next);

         for (let i = 0, length = vertices .length; i < length; ++ i)
         {
            const tmp = current;
            current = next;
            next    = tmp;

            coord .get1Point (coordIndex [vertices [(i + 1) % length]], next);

            normal .x += (current .y - next .y) * (current .z + next .z);
            normal .y += (current .z - next .z) * (current .x + next .x);
            normal .z += (current .x - next .x) * (current .y + next .y);
         }

         return normal .normalize ();
      };
   })(),
});

Object .defineProperties (IndexedFaceSet,
{
   ... X3DNode .getStaticProperties ("IndexedFaceSet", "Geometry3D", 2, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_colorIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_texCoordIndex", new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_normalIndex",   new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_coordIndex",    new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "convex",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",       new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorIndex",        new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordIndex",     new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalIndex",       new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "coordIndex",        new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",            new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",           new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",             new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default IndexedFaceSet;
