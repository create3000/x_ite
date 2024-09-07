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

import X3DNode                   from "../Core/X3DNode.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import X3DCast                   from "../../Base/X3DCast.js";
import NURBS                     from "../../Browser/NURBS/NURBS.js";
import Algorithm                 from "../../../standard/Math/Algorithm.js";
import Vector3                   from "../../../standard/Math/Numbers/Vector3.js";
import Triangle3                 from "../../../standard/Math/Geometry/Triangle3.js";
import nurbs                     from "../../../lib/nurbs/nurbs.js";

function X3DNurbsSurfaceGeometryNode (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNurbsSurfaceGeometryNode);

   this .tessellationScale = 1;
   this .uKnots            = [ ];
   this .vKnots            = [ ];
   this .weights           = [ ];
   this .controlPoints     = [ ];
   this .mesh              = { };
   this .sampleOptions     = { resolution: [ ], closed: [ ] };
   this .textUKnots        = [ ];
   this .textVKnots        = [ ];
   this .textWeights       = [ ];
   this .texControlPoints  = [ ];
   this .texMesh           = { };
}

Object .assign (Object .setPrototypeOf (X3DNurbsSurfaceGeometryNode .prototype, X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._texCoord     .addInterest ("set_texCoord__",     this);
      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this .set_texCoord__ ();
      this .set_controlPoint__ ();
   },
   set_texCoord__ ()
   {
      this .texCoordNode      ?.removeInterest ("requestRebuild", this);
      this .nurbsTexCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode      = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoord);
      this .nurbsTexCoordNode = X3DCast (X3DConstants .NurbsTextureCoordinate,   this ._texCoord);

      this .texCoordNode      ?.addInterest ("requestRebuild", this);
      this .nurbsTexCoordNode ?.addInterest ("requestRebuild", this);
   },
   set_controlPoint__ ()
   {
      this .controlPointNode ?.removeInterest ("requestRebuild", this);

      this .controlPointNode = X3DCast (X3DConstants .X3DCoordinateNode, this ._controlPoint);

      this .controlPointNode ?.addInterest ("requestRebuild", this);
   },
   setTessellationScale (value)
   {
      this .tessellationScale = value;

      this .requestRebuild ();
   },
   getUTessellation ()
   {
      return Math .floor (NURBS .getTessellation (this ._uTessellation .getValue (), this ._uDimension .getValue ()) * this .tessellationScale);
   },
   getVTessellation (numWeights)
   {
      return Math .floor (NURBS .getTessellation (this ._vTessellation .getValue (), this ._vDimension .getValue ()) * this .tessellationScale);
   },
   getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
   {
      if (this ._uClosed .getValue ())
         return NURBS .getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode);

      return false;
   },
   getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
   {
      if (this ._vClosed .getValue ())
         return NURBS .getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode);

      return false;
   },
   getUVWeights (result, uDimension, vDimension, weight)
   {
      return NURBS .getUVWeights (result, uDimension, vDimension, weight);
   },
   getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode)
   {
      return NURBS .getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode);
   },
   getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
   {
      return NURBS .getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode);
   },
   getSurface ()
   {
      return this .surface;
   },
   trimSurface ()
   { },
   build ()
   {
      if (this ._uOrder .getValue () < 2)
         return;

      if (this ._vOrder .getValue () < 2)
         return;

      if (this ._uDimension .getValue () < this ._uOrder .getValue ())
         return;

      if (this ._vDimension .getValue () < this ._vOrder .getValue ())
         return;

      if (!this .controlPointNode)
         return;

      if (this .controlPointNode .getSize () < this ._uDimension .getValue () * this ._vDimension .getValue ())
         return;

      // Order and dimension are now positive numbers.

      // ControlPoints

      const
         uClosed       = this .getUClosed (this ._uOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), this ._uKnot, this ._weight, this .controlPointNode),
         vClosed       = this .getVClosed (this ._vOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), this ._vKnot, this ._weight, this .controlPointNode),
         weights       = this .getUVWeights (this .weights, this ._uDimension .getValue (), this ._vDimension .getValue (), this ._weight),
         controlPoints = this .getUVControlPoints (this .controlPoints, uClosed, vClosed, this ._uOrder .getValue (), this ._vOrder .getValue (), this ._uDimension .getValue (), this ._vDimension .getValue (), weights, this .controlPointNode);

      // Knots

      const
         uKnots = this .getKnots (this .uKnots, uClosed, this ._uOrder .getValue (), this ._uDimension .getValue (), this ._uKnot),
         vKnots = this .getKnots (this .vKnots, vClosed, this ._vOrder .getValue (), this ._vDimension .getValue (), this ._vKnot),
         uScale = uKnots .at (-1) - uKnots [0],
         vScale = vKnots .at (-1) - vKnots [0];

      // Initialize NURBS tessellator

      const
         uDegree = this ._uOrder .getValue () - 1,
         vDegree = this ._vOrder .getValue () - 1;

      this .surface = (this .surface ?? nurbs) ({
         boundary: ["open", "open"],
         degree: [uDegree, vDegree],
         knots: [uKnots, vKnots],
         points: controlPoints,
         debug: false,
      });

      const sampleOptions = this .sampleOptions;

      sampleOptions .resolution [0] = this .getUTessellation ();
      sampleOptions .resolution [1] = this .getVTessellation ();
      sampleOptions .closed [0]     = uClosed;
      sampleOptions .closed [1]     = vClosed;
      sampleOptions .haveWeights    = !! weights;

      const
         mesh        = nurbs .sample (this .mesh, this .surface, sampleOptions),
         faces       = mesh .faces,
         points      = mesh .points,
         vertexArray = this .getVertices ();

      for (const face of faces)
      {
         const index = face * 3;

         vertexArray .push (points [index], points [index + 1], points [index + 2], 1);
      }

      this .buildNurbsTexCoords (uClosed, vClosed, this ._uOrder .getValue (), this ._vOrder .getValue (), uKnots, vKnots, this ._uDimension .getValue (), this ._vDimension .getValue ());

      this .generateNormals (faces, points);
      this .trimSurface (uKnots, vKnots);
      this .setSolid (this ._solid .getValue ());
      this .setCCW (true);
   },
   buildNurbsTexCoords (uClosed, vClosed, uOrder, vOrder, uKnots, vKnots, uDimension, vDimension)
   {
      const texCoordArray = this .getTexCoords ();

      this .getMultiTexCoords () .push (texCoordArray);

      if (this .texCoordNode && this .texCoordNode .getSize () <= uDimension * vDimension)
      {
         const
            texUDegree       = uOrder - 1,
            texVDegree       = vOrder - 1,
            texUKnots        = uKnots,
            texVKnots        = vKnots,
            texControlPoints = this .getTexControlPoints (this .texControlPoints, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, this .texCoordNode);

         this .createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray);
      }
      else if (this .nurbsTexCoordNode ?.isValid ())
      {
         const
            node             = this .nurbsTexCoordNode,
            texUDegree       = node ._uOrder .getValue () - 1,
            texVDegree       = node ._vOrder .getValue () - 1,
            texUKnots        = this .getKnots (this .texUKnots, false, node ._uOrder .getValue (), node ._uDimension .getValue (), node ._uKnot),
            texVKnots        = this .getKnots (this .texVKnots, false, node ._vOrder .getValue (), node ._vDimension .getValue (), node ._vKnot),
            texWeights       = this .getUVWeights (this .texWeights, node ._uDimension .getValue (), node ._vDimension .getValue (), node ._weight),
            texControlPoints = node .getControlPoints (texWeights);

         this .createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray);
      }
      else
      {
         this .createDefaultNurbsTexCoords (texCoordArray);
      }
   },
   createDefaultNurbsTexCoords: (() =>
   {
      const
         defaultTexKnots         = [0, 0, 5, 5],
         defaultTexControlPoints = [[[0, 0, 0, 1], [0, 1, 0, 1]], [[1, 0, 0, 1], [1, 1, 0, 1]]];

      return function (texCoordArray)
      {
         // Create texture coordinates in the unit square.

         const
            texUDegree       = 1,
            texVDegree       = 1,
            texUKnots        = defaultTexKnots,
            texVKnots        = defaultTexKnots,
            texControlPoints = defaultTexControlPoints;

         return this .createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray);
      };
   })(),
   createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray)
   {
      this .texSurface = (this .texSurface ?? nurbs) ({
         boundary: ["open", "open"],
         degree: [texUDegree, texVDegree],
         knots: [texUKnots, texVKnots],
         points: texControlPoints,
      });

      const sampleOptions = this .sampleOptions;

      sampleOptions .closed [0]  = false;
      sampleOptions .closed [1]  = false;
      sampleOptions .haveWeights = false;

      const
         texMesh = nurbs .sample (this .texMesh, this .texSurface, sampleOptions),
         faces   = texMesh .faces,
         points  = texMesh .points;

      for (const face of faces)
      {
         const i = face * 4;

         texCoordArray .push (points [i], points [i + 1], points [i + 2], points [i + 3]);
      }

      return texCoordArray;
   },
   generateNormals (faces, points)
   {
      const
         normals     = this .createNormals (faces, points),
         normalArray = this .getNormals ();

      for (const { x, y, z } of normals)
         normalArray .push (x, y, z);
   },
   createNormals (faces, points)
   {
      // TODO: handle uClosed, vClosed.

      const
         normalIndex = new Map (),
         normals     = this .createFaceNormals (faces, points),
         numFaces    = faces .length;

      for (let i = 0; i < numFaces; ++ i)
      {
         const index = faces [i];

         let pointIndex = normalIndex .get (index);

         if (!pointIndex)
            normalIndex .set (index, pointIndex = [ ]);

         pointIndex .push (i);
      }

      return this .refineNormals (normalIndex, normals, Algorithm .radians (85));
   },
   createFaceNormals: (() =>
   {
      const
         v1 = new Vector3 (),
         v2 = new Vector3 (),
         v3 = new Vector3 ();

      return function (faces, points)
      {
         const
            normals  = this .faceNormals ?? [ ],
            numFaces = faces .length;

         for (let i = 0; i < numFaces; i += 3)
         {
            const
               index1 = faces [i]     * 3,
               index2 = faces [i + 1] * 3,
               index3 = faces [i + 2] * 3;

            v1 .set (points [index1], points [index1 + 1], points [index1 + 2]);
            v2 .set (points [index2], points [index2 + 1], points [index2 + 2]);
            v3 .set (points [index3], points [index3 + 1], points [index3 + 2]);

            const normal = Triangle3 .normal (v1, v2 ,v3, normals [i] ?? new Vector3 ());

            normals [i]     = normal;
            normals [i + 1] = normal;
            normals [i + 2] = normal;
         }

         normals .length = numFaces;

         return normals;
      };
   })(),
});

Object .defineProperties (X3DNurbsSurfaceGeometryNode, X3DNode .getStaticProperties ("X3DNurbsSurfaceGeometryNode", "NURBS", 1));

export default X3DNurbsSurfaceGeometryNode;
