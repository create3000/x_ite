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

import X3DGeometryNode from "./X3DGeometryNode.js";
import X3DCast         from "../../Base/X3DCast.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";

function X3DComposedGeometryNode (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .X3DComposedGeometryNode);

   this .fogCoordNode = null;
   this .colorNode    = null;
   this .texCoordNode = null;
   this .normalNode   = null;
   this .tangentNode  = null;
   this .coordNode    = null;
}

Object .assign (Object .setPrototypeOf (X3DComposedGeometryNode .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._attrib   .addInterest ("set_attrib__",   this);
      this ._fogCoord .addInterest ("set_fogCoord__", this);
      this ._color    .addInterest ("set_color__",    this);
      this ._texCoord .addInterest ("set_texCoord__", this);
      this ._normal   .addInterest ("set_normal__",   this);
      this ._tangent  .addInterest ("set_tangent__",  this);
      this ._coord    .addInterest ("set_coord__",    this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_normal__ ();
      this .set_tangent__ ();
      this .set_coord__ ();
   },
   getFogCoord ()
   {
      return this .fogCoordNode;
   },
   getColor ()
   {
      return this .colorNode;
   },
   getTexCoord ()
   {
      return this .texCoordNode;
   },
   getNormal ()
   {
      return this .normalNode;
   },
   getTangent ()
   {
      return this .tangentNode;
   },
   getCoord ()
   {
      return this .coordNode;
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
   set_texCoord__ ()
   {
      this .texCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);

      this .texCoordNode ?.addInterest ("requestRebuild", this);

      this .setTextureCoordinate (this .texCoordNode);
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
   getPolygonIndex (index)
   {
      return index;
   },
   getTriangleIndex (index)
   {
      return index;
   },
   build (verticesPerPolygon, polygonsSize, verticesPerFace, trianglesSize)
   {
      if (!this .coordNode || this .coordNode .isEmpty ())
         return;

      // Set size to a multiple of verticesPerPolygon.

      polygonsSize  -= polygonsSize  % verticesPerPolygon;
      trianglesSize -= trianglesSize % verticesPerFace;

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
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
         tangentArray       = this .getTangents (),
         vertexArray        = this .getVertices ();

      texCoordNode ?.init (multiTexCoordArray);

      // Fill GeometryNode

      for (let i = 0; i < trianglesSize; ++ i)
      {
         const
            face  = Math .floor (i / verticesPerFace),
            index = this .getPolygonIndex (this .getTriangleIndex (i));

         coordIndicesArray .push (index);

         for (let a = 0; a < numAttribNodes; ++ a)
            attribNodes [a] .addValue (index, attribArrays [a]);

         fogCoordNode ?.addDepth (index, fogDepthArray);

         colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

         texCoordNode ?.addPoint (index, multiTexCoordArray);

         normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);
         tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);

         coordNode .addPoint (index, vertexArray);
      }

      // Autogenerate normal if not specified.

      if (!this .getNormal ())
         this .generateNormals (verticesPerPolygon, polygonsSize, trianglesSize);

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
   generateNormals (verticesPerPolygon, polygonsSize, trianglesSize)
   {
      const
         normals     = this .createNormals (verticesPerPolygon, polygonsSize),
         normalArray = this .getNormals ();

      for (let i = 0; i < trianglesSize; ++ i)
      {
         const { x, y, z } = normals [this .getTriangleIndex (i)];

         normalArray .push (x, y, z);
      }
   },
   createNormals (verticesPerPolygon, polygonsSize)
   {
      const normals = this .createFaceNormals (verticesPerPolygon, polygonsSize);

      if (!this ._normalPerVertex .getValue ())
         return normals;

      const normalIndex = new Map ();

      for (let i = 0; i < polygonsSize; ++ i)
      {
         const index = this .getPolygonIndex (i);

         let pointIndex = normalIndex .get (index);

         if (!pointIndex)
            normalIndex .set (index, pointIndex = [ ]);

         pointIndex .push (i);
      }

      return this .refineNormals (normalIndex, normals, Math .PI);
   },
   createFaceNormals (verticesPerPolygon, polygonsSize)
   {
      const
         cw      = !this ._ccw .getValue (),
         coord   = this .coordNode,
         normals = [ ];

      for (let i = 0; i < polygonsSize; i += verticesPerPolygon)
      {
         const normal = this .getPolygonNormal (i, verticesPerPolygon, coord);

         if (cw)
            normal .negate ();

         for (let n = 0; n < verticesPerPolygon; ++ n)
            normals .push (normal);
      }

      return normals;
   },
   getPolygonNormal: (() =>
   {
      let
         current = new Vector3 (),
         next    = new Vector3 ();

      return function (index, verticesPerPolygon, coord)
      {
         // Determine polygon normal.
         // We use Newell's method https://www.opengl.org/wiki/Calculating_a_Surface_Normal here:

         const normal = new Vector3 ();

         coord .get1Point (this .getPolygonIndex (index), next);

         for (let i = 0; i < verticesPerPolygon; ++ i)
         {
            const tmp = current;
            current = next;
            next    = tmp;

            coord .get1Point (this .getPolygonIndex (index + (i + 1) % verticesPerPolygon), next);

            normal .x += (current .y - next .y) * (current .z + next .z);
            normal .y += (current .z - next .z) * (current .x + next .x);
            normal .z += (current .x - next .x) * (current .y + next .y);
         }

         return normal .normalize ();
      };
   })(),
});

Object .defineProperties (X3DComposedGeometryNode,
{
   typeName:
   {
      value: "X3DComposedGeometryNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Rendering", level: 1 }),
      enumerable: true,
   },
});

export default X3DComposedGeometryNode;
