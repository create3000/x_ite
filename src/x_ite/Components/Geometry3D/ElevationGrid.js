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
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Triangle3            from "../../../standard/Math/Geometry/Triangle3.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";

function ElevationGrid (executionContext)
{
   X3DGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .ElevationGrid);

   // Units

   this ._set_height  .setUnit ("length");
   this ._xSpacing    .setUnit ("length");
   this ._zSpacing    .setUnit ("length");
   this ._creaseAngle .setUnit ("angle");
   this ._height      .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ElevationGrid .prototype, X3DGeometryNode .prototype),
{
   initialize ()
   {
      X3DGeometryNode .prototype .initialize .call (this);

      this ._set_height .addFieldInterest (this ._height);
      this ._attrib     .addInterest ("set_attrib__",   this);
      this ._fogCoord   .addInterest ("set_fogCoord__", this);
      this ._color      .addInterest ("set_color__",    this);
      this ._texCoord   .addInterest ("set_texCoord__", this);
      this ._normal     .addInterest ("set_normal__",   this);

      this .set_attrib__ ();
      this .set_fogCoord__ ();
      this .set_color__ ();
      this .set_texCoord__ ();
      this .set_normal__ ();
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
   getHeight (index)
   {
      if (index < this ._height .length)
         return this ._height [index];

      return 0;
   },
   createTexCoords ()
   {
      const
         texCoords  = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
            texCoords .push (new Vector2 (x / xSize, z / zSize));
      }

      return texCoords;
   },
   createNormals (points, coordIndex, creaseAngle)
   {
      const
         cw          = ! this ._ccw .getValue (),
         normalIndex = new Map (),
         normals     = [ ];

      for (let p = 0, length = points .length; p < length; ++ p)
         normalIndex .set (p, [ ]);

      for (let c = 0, length = coordIndex .length; c < length; c += 3)
      {
         const
            c0 = coordIndex [c],
            c1 = coordIndex [c + 1],
            c2 = coordIndex [c + 2];

         normalIndex .get (c0) .push (normals .length);
         normalIndex .get (c1) .push (normals .length + 1);
         normalIndex .get (c2) .push (normals .length + 2);

         const normal = Triangle3 .normal (points [c0], points [c1], points [c2], new Vector3 ());

         if (cw)
            normal .negate ();

         normals .push (normal);
         normals .push (normal);
         normals .push (normal);
      }

      if (!this ._normalPerVertex .getValue ())
         return normals;

      return this .refineNormals (normalIndex, normals, creaseAngle ?? this ._creaseAngle .getValue ());
   },
   createCoordIndex ()
   {
      // p1 - p4
      //  | \ |
      // p2 - p3

      const
         coordIndex = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSize      = xDimension - 1,
         zSize      = zDimension - 1;

      for (let z = 0; z < zSize; ++ z)
      {
         for (let x = 0; x < xSize; ++ x)
         {
            const
               i1 =       z * xDimension + x,
               i2 = (z + 1) * xDimension + x,
               i3 = (z + 1) * xDimension + (x + 1),
               i4 =       z * xDimension + (x + 1);

            coordIndex .push (i1); // p1
            coordIndex .push (i2); // p2
            coordIndex .push (i3); // p3

            coordIndex .push (i1); // p1
            coordIndex .push (i3); // p3
            coordIndex .push (i4); // p4
         }
      }

      return coordIndex;
   },
   createPoints ()
   {
      const
         points     = [ ],
         xDimension = this ._xDimension .getValue (),
         zDimension = this ._zDimension .getValue (),
         xSpacing   = this ._xSpacing .getValue (),
         zSpacing   = this ._zSpacing .getValue ();

      for (let z = 0; z < zDimension; ++ z)
      {
         for (let x = 0; x < xDimension; ++ x)
         {
            points .push (new Vector3 (xSpacing * x,
                                       this .getHeight (x + z * xDimension),
                                       zSpacing * z));
         }
      }

      return points;
   },
   build ()
   {
      if (this ._xDimension .getValue () < 2 || this ._zDimension .getValue () < 2)
         return;

      const
         colorPerVertex     = this ._colorPerVertex .getValue (),
         normalPerVertex    = this ._normalPerVertex .getValue (),
         coordIndex         = this .createCoordIndex (),
         coordIndicesArray  = this .getCoordIndices (),
         attribNodes        = this .getAttrib (),
         numAttribNodes     = attribNodes .length,
         attribArrays       = this .getAttribs (),
         fogCoordNode       = this .fogCoordNode,
         colorNode          = this .getColor (),
         texCoordNode       = this .getTexCoord (),
         normalNode         = this .getNormal (),
         tangentNode        = this .getTangent (),
         points             = this .createPoints (),
         fogDepthArray      = this .getFogDepths (),
         colorArray         = this .getColors (),
         multiTexCoordArray = this .getMultiTexCoords (),
         normalArray        = this .getNormals (),
         tangentArray       = this .getTangent (),
         vertexArray        = this .getVertices ();

      let face = 0;

      if (texCoordNode)
      {
         texCoordNode .init (multiTexCoordArray);
      }
      else
      {
         var
            texCoords     = this .createTexCoords (),
            texCoordArray = this .getTexCoords ();

         multiTexCoordArray .push (texCoordArray);
      }

      // Build geometry

      for (let c = 0, numCoordIndices = coordIndex .length; c < numCoordIndices; ++ face)
      {
         for (let p = 0; p < 6; ++ p, ++ c)
         {
            const
               index      = coordIndex [c],
               { x, y, z} = points [index];

            coordIndicesArray .push (index);

            for (let a = 0; a < numAttribNodes; ++ a)
               attribNodes [a] .addValue (index, attribArrays [a]);

            fogCoordNode ?.addDepth (index, fogDepthArray);

            colorNode ?.addColor (colorPerVertex ? index : face, colorArray);

            if (texCoordNode)
            {
               texCoordNode .addPoint (index, multiTexCoordArray);
            }
            else
            {
               const { x, y } = texCoords [index];

               texCoordArray .push (x, y, 0, 1);
            }

            normalNode  ?.addVector (normalPerVertex ? index : face, normalArray);
            tangentNode ?.addVector (normalPerVertex ? index : face, tangentArray);

            vertexArray .push (x, y, z, 1);
         }
      }

      // Add auto-generated normals if needed.

      if (!normalNode)
      {
         const normals = this .createNormals (points, coordIndex);

         for (const { x, y, z } of normals)
            normalArray .push (x, y, z);
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (ElevationGrid,
{
   ... X3DNode .getStaticProperties ("ElevationGrid", "Geometry3D", 3, "geometry", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_height",      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zDimension",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "xSpacing",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "zSpacing",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "creaseAngle",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tangent",         new Fields .SFNode ()), // experimental
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "height",          new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ElevationGrid;
