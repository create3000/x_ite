/* X_ITE v11.3.2 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.3.2")];
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/

// UNUSED EXPORTS: default

;// external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/NURBS/Contour2D.js
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








function Contour2D (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Contour2D);

   this .childNodes = [ ];
}

Object .assign (Object .setPrototypeOf (Contour2D .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DNode_default().prototype .initialize .call (this);

      this ._addChildren    .addInterest ("set_addChildren__",    this);
      this ._removeChildren .addInterest ("set_removeChildren__", this);
      this ._children       .addInterest ("set_children__",       this);

      this .set_children__ ();
   },
   set_addChildren__ ()
   {
      this ._addChildren .setTainted (true);
      this ._addChildren .assign (filter (this ._addChildren, this ._children));

      for (const child of this ._addChildren)
         this ._children .push (child);

      this ._addChildren .length = 0;
      this ._addChildren .setTainted (false);
   },
   set_removeChildren__ ()
   {
      this ._removeChildren .setTainted (true);
      this ._children .assign (filter (this ._children, this ._removeChildren));

      this ._removeChildren .length = 0;
      this ._removeChildren .setTainted (false);
   },
   set_children__ ()
   {
      const childNodes = this .childNodes;

      for (const childNode of childNodes)
         childNode .removeInterest ("addNodeEvent", this);

      childNodes .length = 0;

      for (const node of this ._children)
      {
         const childNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).NurbsCurve2D, node)
            ?? external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).ContourPolyline2D, node);

         if (childNode)
            childNodes .push (childNode);
      }

      for (const childNode of childNodes)
         childNode .addInterest ("addNodeEvent", this);
   },
   addTrimmingContour (offset, scale, trimmingContours)
   {
      const trimmingContour = [ ];

      for (const childNode of this .childNodes)
         childNode .tessellate (2, trimmingContour);

      if (!trimmingContour .length)
         return;

      for (const point of trimmingContour)
         point .subtract (offset) .divVec (scale);

      trimmingContours .push (trimmingContour);
   }
});

function filter (array, remove)
{
   const set = new Set (remove);

   return array .filter (value => !set .has (value));
}

Object .defineProperties (Contour2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Contour2D", "NURBS", 4, "trimmingContour", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const __default__ = Contour2D;
;

/* harmony default export */ const NURBS_Contour2D = (external_X_ITE_X3D_Namespace_default().add ("Contour2D", __default__));
;// ./src/x_ite/Components/NURBS/X3DNurbsControlCurveNode.js
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




function X3DNurbsControlCurveNode (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsControlCurveNode);
}

Object .setPrototypeOf (X3DNurbsControlCurveNode .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype);

Object .defineProperties (X3DNurbsControlCurveNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DNurbsControlCurveNode", "NURBS", 1));

const X3DNurbsControlCurveNode_default_ = X3DNurbsControlCurveNode;
;

/* harmony default export */ const NURBS_X3DNurbsControlCurveNode = (external_X_ITE_X3D_Namespace_default().add ("X3DNurbsControlCurveNode", X3DNurbsControlCurveNode_default_));
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// ./src/x_ite/Components/NURBS/ContourPolyline2D.js
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









function ContourPolyline2D (executionContext)
{
   NURBS_X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ContourPolyline2D);

   this .array = [ ];
}

Object .assign (Object .setPrototypeOf (ContourPolyline2D .prototype, NURBS_X3DNurbsControlCurveNode .prototype),
{
   tessellate (type, array = this .array)
   {
      const
         controlPoints    = this ._controlPoint .getValue (),
         numControlPoints = this ._controlPoint .length * 2;

      switch (type)
      {
         case 0:
         {
            array .length = 0;

            for (let i = 0; i < numControlPoints; i += 2)
               array .push (controlPoints [i], controlPoints [i + 1]);

            break;
         }
         case 1:
         {
            array .length = 0;

            for (let i = 0; i < numControlPoints; i += 2)
               array .push (controlPoints [i], 0, controlPoints [i + 1]);

            break;
         }
         case 2: // Contour2D
         {
            for (let i = 0; i < numControlPoints; i += 2)
               array .push (new (external_X_ITE_X3D_Vector3_default()) (controlPoints [i], controlPoints [i + 1], 0));

            break;
         }
      }

      return array;
   },
});

Object .defineProperties (ContourPolyline2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ContourPolyline2D", "NURBS", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "controlPoint", new (external_X_ITE_X3D_Fields_default()).MFVec2d ()),
      ]),
      enumerable: true,
   },
});

const ContourPolyline2D_default_ = ContourPolyline2D;
;

/* harmony default export */ const NURBS_ContourPolyline2D = (external_X_ITE_X3D_Namespace_default().add ("ContourPolyline2D", ContourPolyline2D_default_));
;// external "__X_ITE_X3D__ .X3DGeometryNode"
const external_X_ITE_X3D_X3DGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DGeometryNode;
var external_X_ITE_X3D_X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGeometryNode_namespaceObject);
;// external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// external "__X_ITE_X3D__ .Vector4"
const external_X_ITE_X3D_Vector4_namespaceObject = __X_ITE_X3D__ .Vector4;
var external_X_ITE_X3D_Vector4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector4_namespaceObject);
;// ./src/x_ite/Browser/NURBS/NURBS.js
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





const NURBS =
{
   getTessellation (tessellation, dimension)
   {
      if (tessellation > 0)
         return tessellation;

      if (tessellation < 0)
         return -tessellation * dimension;

      return 2 * dimension;
   },
   getClosed2D (order, knot, weight, controlPoint)
   {
      const
         dimension   = controlPoint .length,
         haveWeights = weight .length === dimension;

      // Check if first and last weights are unitary.

      if (haveWeights)
      {
         if (weight [0] !== weight [dimension - 1])
            return false;
      }

      // Check if first and last point are coincident.

      if (!controlPoint [0] .equals (controlPoint [dimension - 1]))
         return false;

      return true;
   },
   getClosed: (() =>
   {
      const
         firstPoint = new (external_X_ITE_X3D_Vector3_default()) (),
         lastPoint  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (order, knot, weight, controlPointNode)
      {
         const
            dimension   = controlPointNode .getSize (),
            haveWeights = weight .length === dimension;

         // Check if first and last weights are unitary.

         if (haveWeights)
         {
            if (weight [0] !== weight [dimension - 1])
               return false;
         }

         // Check if first and last point are coincident.

         if (!controlPointNode .get1Point (0, firstPoint) .equals (controlPointNode .get1Point (dimension - 1, lastPoint)))
            return false;

         return true;
      };
   })(),
   getUClosed: (() =>
   {
      const
         firstPoint = new (external_X_ITE_X3D_Vector3_default()) (),
         lastPoint  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
      {
         const haveWeights = weight .length === controlPointNode .getSize ();

         for (let v = 0; v < vDimension; ++ v)
         {
            const
               first = v * uDimension,
               last  = v * uDimension + uDimension - 1;

            // Check if first and last weights are unitary.

            if (haveWeights)
            {
               if (weight [first] !== weight [last])
                  return false;
            }

            // Check if first and last point are coincident.

            if (!controlPointNode .get1Point (first, firstPoint) .equals (controlPointNode .get1Point (last, lastPoint)))
               return false;
         }

         return true;
      };
   })(),
   getVClosed: (() =>
   {
      const
         firstPoint = new (external_X_ITE_X3D_Vector3_default()) (),
         lastPoint  = new (external_X_ITE_X3D_Vector3_default()) ();

      return function (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
      {
         const haveWeights = weight .length === controlPointNode .getSize ();

         for (let u = 0; u < uDimension; ++ u)
         {
            const
               first = u,
               last  = (vDimension - 1) * uDimension + u;

            // Check if first and last weights are unitary.

            if (haveWeights)
            {
               if (weight [first] !== weight [last])
                  return false;
            }

            // Check if first and last point are coincident.

            if (!controlPointNode .get1Point (first, firstPoint) .equals (controlPointNode .get1Point (last, lastPoint)))
               return false;
         }

         return true;
      };
   })(),
   getKnots (result, closed, order, dimension, knot)
   {
      const
         length = dimension + order,
         knots  = result ?? [ ];

      for (let i = 0, l = knot .length; i < l; ++ i)
         knots [i] = knot [i];

      knots .length = knot .length;

      // check the knot-vectors. If they are not according to standard
      // default uniform knot vectors will be generated.

      let generateUniform = true;

      if (knots .length === length)
      {
         generateUniform = false;

         let consecutiveKnots = 0;

         for (let i = 1; i < length; ++ i)
         {
            if (knots [i] === knots [i - 1])
               ++ consecutiveKnots;
            else
               consecutiveKnots = 0;

            if (consecutiveKnots > order - 1)
               generateUniform = true;

            if (knots [i - 1] > knots [i])
               generateUniform = true;
         }
      }

      if (generateUniform)
      {
         if (closed)
         {
            // Generate periodic uniform knots.

            for (let i = 0; i < length; ++ i)
               knots [i] = i;
         }
         else
         {
            // Generate pinned uniform knots.

            let
               i = 0,
               k = 1;

            for (; i < order; ++ i)
               knots [i] = 0;

            for (const l = length - order; i < l; ++ i, ++ k)
               knots [i] = k;

            for (; i < length; ++ i)
               knots [i] = k;
         }

         knots .length = length;

         // Scale knots.

         const max = knots .at (-1);

         for (let i = 0; i < length; ++ i)
            knots [i] /= max;
      }

      if (closed)
      {
         // Make knots periodic.

         const l = order - 1;

         for (let i = 1; i < l; ++ i)
            knots .push (knots .at (-1) + (knots [i] - knots [i - 1]));
      }

      return knots;
   },
   getWeights (result, dimension, weight)
   {
      if (weight .length !== dimension)
         return undefined;

      const weights = result ?? [ ];

      for (let i = 0; i < dimension; ++ i)
      {
         weights [i] = weight [i];
      }

      weights .length = dimension;

      return weights;
   },
   getUVWeights (result, uDimension, vDimension, weight)
   {
      const dimension = uDimension * vDimension;

      if (weight .length !== dimension)
         return undefined;

      const weights = result ?? [ ];

      for (let u = 0, i = 0; u < uDimension; ++ u)
      {
         for (let v = 0; v < vDimension; ++ v, ++ i)
         {
            weights [i] = weight [i];
         }
      }

      weights .length = dimension;

      return weights;
   },
   getControlPoints2D (result, closed, order, weights, controlPoint)
   {
      const
         controlPoints     = result ?? [ ],
         controlPointArray = controlPoint .getValue (),
         dimension         = controlPoint .length,
         haveWeights       = !! weights,
         Vector            = haveWeights ? (external_X_ITE_X3D_Vector3_default()) : (external_X_ITE_X3D_Vector2_default());

      if (controlPoints .haveWeights !== haveWeights)
      {
         controlPoints .haveWeights = haveWeights;
         controlPoints .length      = 0;
      }

      for (let i = 0; i < dimension; ++ i)
      {
         const
            i2 = i * 2,
            cp = controlPoints [i] ??= new Vector (0, 0, 0);

         cp .set (controlPointArray [i2 + 0], controlPointArray [i2 + 1], haveWeights ? weights [i] : 0);
      }

      controlPoints .length = dimension;

      if (closed)
      {
         const length = order - 1;

         for (let i = 1; i < length; ++ i)
            controlPoints .push (controlPoints [i]);
      }

      return controlPoints;
   },
   getControlPoints (result, closed, order, weights, controlPointNode)
   {
      const
         controlPoints = result ?? [ ],
         dimension     = controlPointNode .getSize (),
         haveWeights   = !! weights,
         Vector        = haveWeights ? (external_X_ITE_X3D_Vector4_default()) : (external_X_ITE_X3D_Vector3_default());

      if (controlPoints .haveWeights !== haveWeights)
      {
         controlPoints .haveWeights = haveWeights;
         controlPoints .length      = 0;
      }

      for (let i = 0; i < dimension; ++ i)
      {
         const cp = controlPointNode .get1Point (i, controlPoints [i] ??= new Vector (0, 0, 0, 0));

         if (haveWeights)
            cp .w = weights [i];
      }

      controlPoints .length = dimension;

      if (closed)
      {
         const length = order - 1;

         for (let i = 1; i < length; ++ i)
            controlPoints .push (controlPoints [i]);
      }

      return controlPoints;
   },
   getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
   {
      const
         controlPoints = result ?? [ ],
         haveWeights   = !! weights,
         Vector        = haveWeights ? (external_X_ITE_X3D_Vector4_default()) : (external_X_ITE_X3D_Vector3_default());

      if (controlPoints .haveWeights !== haveWeights)
      {
         controlPoints .haveWeights = haveWeights;
         controlPoints .length      = 0;
      }

      for (let u = 0; u < uDimension; ++ u)
      {
         const cp = controlPoints [u] ??= [ ];

         for (let v = 0; v < vDimension; ++ v)
         {
            const index = v * uDimension + u;

            controlPointNode .get1Point (index, cp [v] ??= new Vector (0, 0, 0, 0));

            if (haveWeights)
               cp [v] .w = weights [index];
         }

         cp .length = vDimension;

         if (vClosed)
         {
            const length = vOrder - 1;

            for (let i = 1; i < length; ++ i)
               cp .push (cp [i]);
         }
      }

      controlPoints .length = uDimension;

      if (uClosed)
      {
         const length = uOrder - 1;

         for (let i = 1; i < length; ++ i)
            controlPoints .push (controlPoints [i]);
      }

      return controlPoints;
   },
   getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, controlPointNode)
   {
      const controlPoints = result ?? [ ];

      for (let u = 0; u < uDimension; ++ u)
      {
         const cp = controlPoints [u] ??= [ ];

         for (let v = 0; v < vDimension; ++ v)
         {
            const index = v * uDimension + u;

            controlPointNode .get1Point (index, cp [v] ??= new (external_X_ITE_X3D_Vector4_default()) ());
         }

         cp .length = vDimension;

         if (vClosed)
         {
            const length = vOrder - 1;

            for (let i = 1; i < length; ++ i)
               cp .push (cp [i]);
         }
      }

      controlPoints .length = uDimension;

      if (uClosed)
      {
         const length = uOrder - 1;

         for (let i = 1; i < length; ++ i)
            controlPoints .push (controlPoints [i]);
      }

      return controlPoints;
   },
};

const NURBS_default_ = NURBS;
;

/* harmony default export */ const NURBS_NURBS = (external_X_ITE_X3D_Namespace_default().add ("NURBS", NURBS_default_));
;// ./src/x_ite/Components/NURBS/X3DParametricGeometryNode.js
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






function X3DParametricGeometryNode (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DParametricGeometryNode);
}

Object .assign (Object .setPrototypeOf (X3DParametricGeometryNode .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS_NURBS .getKnots (result, closed, order, dimension, knot);
   },
});

Object .defineProperties (X3DParametricGeometryNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DParametricGeometryNode", "NURBS", 1));

const X3DParametricGeometryNode_default_ = X3DParametricGeometryNode;
;

/* harmony default export */ const NURBS_X3DParametricGeometryNode = (external_X_ITE_X3D_Namespace_default().add ("X3DParametricGeometryNode", X3DParametricGeometryNode_default_));
;// external "__X_ITE_X3D__ .X3DLineGeometryNode"
const external_X_ITE_X3D_X3DLineGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DLineGeometryNode;
var external_X_ITE_X3D_X3DLineGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DLineGeometryNode_namespaceObject);
;// ./src/lib/nurbs/src/utils/is-ndarray.js

// Source: https://github.com/scijs/isndarray
// By Kyle Robinson Young, MIT Licensed.

const is_ndarray_default_ = function (arr)
{
   if (! arr)
      return false;

   if (! arr .dtype)
      return false;

   var re = new RegExp ("function View[0-9]+d(:?" + arr .dtype + ")+");

   return re .test (String (arr .constructor));
};
;

/* harmony default export */ const is_ndarray = (external_X_ITE_X3D_Namespace_default().add ("is-ndarray", is_ndarray_default_));
;// ./src/lib/nurbs/src/utils/is-ndarray-like.js

const is_ndarray_like_default_ = function (arr)
{
   if (!arr)
      return false;

   return (
      arr .data   !== undefined &&
      Array .isArray (arr .shape) &&
      arr .offset !== undefined &&
      arr .stride !== undefined
   );
};
;

/* harmony default export */ const is_ndarray_like = (external_X_ITE_X3D_Namespace_default().add ("is-ndarray-like", is_ndarray_like_default_));
;// ./src/lib/nurbs/src/utils/is-array-like.js

const is_array_like_default_ = function isArrayLike (data)
{
   return Array .isArray (data) || ArrayBuffer .isView (data) || data .length !== undefined;
};
;

/* harmony default export */ const is_array_like = (external_X_ITE_X3D_Namespace_default().add ("is-array-like", is_array_like_default_));
;// ./src/lib/nurbs/src/utils/infer-type.js





function inferType (x)
{
   if (! x)
      return undefined;

   if (is_ndarray (x) || is_ndarray_like (x))
   {
      if (x.dtype === "generic")
         return inferType .GENERIC_NDARRAY;

      return inferType .NDARRAY;
   }
   else
   {
      if (is_array_like (x))
      {
         for (var ptr = x; is_array_like (ptr [0]); ptr = ptr [0])
            ;

         if ("x" in ptr)
            return inferType .ARRAY_OF_OBJECTS;

         // if (isArrayLike(x[0])) {
         return inferType .ARRAY_OF_ARRAYS;
         // }
         // return inferType.PACKED;
      }

      throw new Error("Unhandled data type. Got type: " + (typeof x));
   }
}

inferType .ARRAY_OF_OBJECTS = "Obj";
inferType .ARRAY_OF_ARRAYS  = "Arr";
inferType .NDARRAY          = "Nd";
inferType .GENERIC_NDARRAY  = "GenNd";
inferType .PACKED           = "PackArr";

const infer_type_default_ = inferType;
;

/* harmony default export */ const infer_type = (external_X_ITE_X3D_Namespace_default().add ("infer-type", infer_type_default_));
;// ./src/lib/nurbs/src/utils/cache-key.js



function capitalize (str) {
   return str[0].toUpperCase() + str.slice(1);
}

const cache_key_default_ = function (nurbs, debug, checkBounds, pointType, weightType, knotType) {
   var d;
   var degreeParts = [];
   var hasAnyKnots = false;
   for (d = 0; d < nurbs.splineDimension; d++) {
      var hasKnots = is_array_like(nurbs.knots) && is_array_like(nurbs.knots[d]);
      if (hasKnots) hasAnyKnots = true;
      degreeParts.push(
         "Deg" +
         nurbs.degree[d] +
         (hasKnots ? "" : "Uniform") +
         capitalize(nurbs.boundary[d])
      );
   }
   var parts = [
      [
         hasAnyKnots ? "NU" : "",
         nurbs.weights ? "RBS" : "BS"
      ].join("") +
      nurbs.dimension + "D",
      degreeParts.join("_")
   ];

   if (pointType) {
      parts.push(pointType + "Pts");
   }
   if (weightType) {
      parts.push(weightType + "Wts");
   }
   if (knotType) {
      parts.push(knotType + "Kts");
   }

   if (debug) {
      parts.push("debug");
   }

   if (checkBounds) {
      parts.push("chk");
   }

   return parts.join("_");
};
;

/* harmony default export */ const cache_key = (external_X_ITE_X3D_Namespace_default().add ("cache-key", cache_key_default_));
;// ./src/lib/nurbs/src/utils/variable.js

var createVariable = function createVariable (name, nurbs) {
   return function (i, period) {
      if (i !== undefined && !Array.isArray(i)) i = [i];
      var dimAccessors = [];
      for (var j = 0; j < i.length; j++) {
         dimAccessors.push(createVariable.sum(i[j]));
      }
      if (period) {
         for (i = 0; i < dimAccessors.length; i++) {
            if (period[i] === undefined) continue;
            dimAccessors[i] = "(" + dimAccessors[i] + " + " + period[i] + ") % " + period[i];
         }
      }
      return name + dimAccessors.join("_");
   };
};

createVariable.sum = function (parts) {
   parts = Array.isArray(parts) ? parts : [parts];
   parts = parts.filter(part => part !== undefined && part !== 0);
   if (parts.length === 0) parts.push(0);
   return parts.join(" + ");
};

const variable_default_ = createVariable;
;

/* harmony default export */ const variable = (external_X_ITE_X3D_Namespace_default().add ("variable", variable_default_));
;// ./src/lib/nurbs/src/utils/create-accessors.js




var properties = [".x", ".y", ".z", ".w"];

function wrapAccessor (callback)
{
   return function (i, period)
   {
      if (i !== undefined && ! Array .isArray(i))
         i = [i];

      var dimAccessors = [ ];

      for (var j = 0; j < i .length; j ++)
         dimAccessors .push (variable .sum (i [j]));

      if (period)
      {
         for (i = 0; i < dimAccessors .length; i++)
         {
            if (period [i] === undefined)
               continue;

            dimAccessors [i] = "(" + dimAccessors [i] + " + " + period [i] + ") % " + period [i];
         }
      }
      return callback (dimAccessors);
   };
}

function createAccessor (name, data)
{
   if (! data)
      return undefined;

   switch (infer_type(data))
   {
      case infer_type .ARRAY_OF_OBJECTS:
      {
         return wrapAccessor (accessors =>
         {
            var e = accessors .pop ();

            return name + "[" + accessors .join ("][") + "]" + properties [e];
         });
      }
      case infer_type .ARRAY_OF_ARRAYS:
      {
         return wrapAccessor (accessors =>
         {
            return name + "[" + accessors .join ("][") + "]";
         });
      }
      case infer_type .GENERIC_NDARRAY:
      {
         return wrapAccessor (accessors =>
         {
            return name + ".get(" + accessors.join(",") + ")";
         });
      }
      case infer_type .NDARRAY:
      {
         return wrapAccessor (accessors =>
         {
            var code = [name + "Offset"];

            for (var i = 0; i < accessors.length; i++)
            {
               code.push(name + "Stride" + i + " * (" + accessors[i] + ")");
            }

            return name + "[" + code.join(" + ") + "]";
         });
      }
      case infer_type.PACKED:
      default:
         return undefined;
   }
}

const create_accessors_default_ = function (nurbs)
{
   var accessors = { };

   var accessor = createAccessor ("x", nurbs .points);

   if (accessor)
      accessors .point = accessor;

   var accessor = createAccessor ("w", nurbs .weights);

   if (accessor)
      accessors .weight = accessor;

   var accessor = createAccessor ("k", nurbs .knots);

   if (accessor)
      accessors .knot = accessor;

   return accessors;
};
;

/* harmony default export */ const create_accessors = (external_X_ITE_X3D_Namespace_default().add ("create-accessors", create_accessors_default_));
;// ./src/lib/nurbs/src/numerical-derivative.js

var args = [];
var tmp = [];

const numerical_derivative_default_ = function numericalDerivative (out, order, dimension) {
   if (order !== 1) {
      throw new Error("Numerical derivative not implemented for order n = " + order + ".");
   }

   var i;
   var h = arguments[this.splineDimension + 3] === undefined ? 1e-4 : arguments[this.splineDimension + 3];

   args.length = this.splineDimension;
   for (i = 0; i < this.splineDimension; i++) {
      args[i + 1] = arguments[i + 3];
   }

   var domain = this.domain;
   var k0 = domain[dimension][0];
   var k1 = domain[dimension][1];

   var tm, tp, T;
   var t0 = args[dimension + 1];
   var dt = (k1 - k0) * h;
   if (this.boundary[dimension] === "closed") {
      T = k1 - k0;
      tm = k0 + ((t0 - k0 - dt + T) % T);
      tp = k0 + ((t0 - k0 + dt + T) % T);
      dt *= 2;
   } else {
      tm = Math.min(k1, Math.max(k0, t0 - dt));
      tp = Math.min(k1, Math.max(k0, t0 + dt));
      dt = tp - tm;
   }

   args[dimension + 1] = tm;
   args[0] = tmp;
   this.evaluate.apply(null, args);

   args[dimension + 1] = tp;
   args[0] = out;
   this.evaluate.apply(null, args);

   for (i = 0; i < this.dimension; i++) {
      out[i] = (out[i] - tmp[i]) / dt;
   }

   return out;
};
;

/* harmony default export */ const numerical_derivative = (external_X_ITE_X3D_Namespace_default().add ("numerical-derivative", numerical_derivative_default_));
;// ./src/lib/nurbs/src/utils/ndloop.js

const ndloop_default_ = function ndloop (n, callback) {
   for (var m = 1, k = 0, i = []; k < n.length; k++) {
      m *= Array.isArray(n[k]) ? (n[k][1] - n[k][0]) : n[k];
      i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
   }
   for (var ptr = 0; ptr < m; ptr++) {
      callback(i.slice());
      for (k = n.length - 1; k >= 0; k--) {
         if (i[k] === (Array.isArray(n[k]) ? n[k][1] : n[k]) - 1) {
            i[k] = Array.isArray(n[k]) ? n[k][0] : 0;
         } else {
            i[k]++;
            break;
         }
      }
   }
};
;

/* harmony default export */ const ndloop = (external_X_ITE_X3D_Namespace_default().add ("ndloop", ndloop_default_));
;// ./src/lib/nurbs/src/utils/accessor-preamble.js



const accessor_preamble_default_ = function (nurbs, variableName, propertyName, data)
{
   var code = [ ];

   switch (infer_type (data))
   {
      case infer_type .NDARRAY:
      {
         code .push ("  var " + variableName + " = " + propertyName + ".data;");
         code .push ("  var " + variableName + "Offset = " + propertyName + ".offset;");

         for (var i = 0; i < data .dimension; i++) {
            code .push ("  var " + variableName + "Stride" + i + " = " + propertyName + ".stride[" + i + "];");
         }

         break;
      }
      case infer_type .ARRAY_OF_OBJECTS:
      case infer_type .ARRAY_OF_ARRAYS:
         code .push ("  var " + variableName + " = " + propertyName + ";");
   }

   return code .join ("\n");
};
;

/* harmony default export */ const accessor_preamble = (external_X_ITE_X3D_Namespace_default().add ("accessor-preamble", accessor_preamble_default_));
;// ./src/lib/nurbs/src/utils/size-getter.js



const size_getter_default_ = function (data, dataVariableName, dimension) {
   if (!data) {
      return "this.size[" + dimension + "]";
   } else if (is_ndarray_like(data)) {
      return dataVariableName + ".shape[" + dimension + "]";
   } else {
      var str = dataVariableName;
      for (var i = 0; i < dimension; i++) {
         str += "[0]";
      }
      return str + ".length";
   }
};
;

/* harmony default export */ const size_getter = (external_X_ITE_X3D_Namespace_default().add ("size-getter", size_getter_default_));
;// ./src/lib/nurbs/src/evaluator.js








var evaluatorCache = {};
var codeCache = {};

const evaluator_default_ = function (cacheKey, nurbs, accessors, debug, checkBounds, isBasis, derivative) {
   var splineDimension = nurbs.splineDimension;
   var i, j, n, m, d, kvar;

   var points = nurbs.points;
   var degree = nurbs.degree;
   var weights = nurbs.weights;
   var hasWeights = weights !== undefined;
   var knots = nurbs.knots;
   var spaceDimension = nurbs.dimension;
   var boundary = nurbs.boundary;

   if (derivative !== undefined && derivative !== null) {
      if (!Array.isArray(derivative)) {
         derivative = [derivative];
      }
      var totalDerivativeOrder = 0;
      for (i = 0; i < splineDimension; i++) {
         if (derivative[i] === undefined) derivative[i] = 0;
         totalDerivativeOrder += derivative[i];
      }
      if (hasWeights && totalDerivativeOrder > 1) {
         throw new Error("Analytical derivative not implemented for rational b-splines with order n = " + totalDerivativeOrder + ".");
      }
   }

   if (isBasis) cacheKey = "Basis" + cacheKey;
   if (derivative) cacheKey = "Der" + derivative.join("_") + "_" + cacheKey;
   var cachedEvaluator = evaluatorCache[cacheKey];
   if (debug) {
      var logger = typeof debug === "function" ? debug : console.log;
   }

   if (cachedEvaluator) {
      if (debug) {
         logger(codeCache[cacheKey]);
      }

      return cachedEvaluator.bind(nurbs);
   }

   var code = [];
   var functionName = "evaluate" + cacheKey;

   var pointAccessor = accessors.point;
   if (isBasis) {
      pointAccessor = function (src, period) {
         var terms = [];
         for (var i = 0; i < src.length; i++) {
            var accessor = src[i];
            var terms2 = [];
            for (var j = 0; j < accessor.length; j++) {
               if (accessor[j] !== 0) terms2.push(accessor[j]);
            }
            accessor = terms2.join(" + ");
            if (period[i]) {
               accessor = "(" + accessor + " + " + period[i] + ") % " + period[i];
            }
            terms.push(accessor + " === " + indexVar(i));
         }
         return "((" + terms.join(" && ") + ") ? 1 : 0)";
      };
   }
   var weightAccessor = accessors.weight;
   var knotAccessor = accessors.knot;

   var knotVar = variable("k");
   var pointVar = variable("x");
   var weightVar = variable("w");
   var indexVar = variable("i");
   var tVar = variable("t");
   var domainVar = debug ? "domain" : "d";
   var sizeVar = variable(debug ? "size" : "s");
   var knotIndex = variable(debug ? "knotIndex" : "j");

   var allDimensionUniform = true;
   for (d = 0; d < splineDimension; d++) {
      if (is_array_like(knots) && is_array_like(knots[d])) {
         allDimensionUniform = false;
      }
   }

   // Just to indent properly and save lots of typing
   function line (str) {
      code.push("  " + (str || ""));
   }
   function debugLine (str) {
      if (debug) line(str);
   }
   // function clog (str) {
      // if (debug) code.push("console.log(\"" + str + " =\", " + str + ");");
   // }

   if (isBasis) {
      var indexArgs = [];
   }
   var parameterArgs = [];
   for (i = 0; i < splineDimension; i++) {
      if (isBasis) {
         indexArgs.push(indexVar([i]));
      }
      parameterArgs.push(tVar([i]));
   }

   code.push("function " + functionName + " (" +
      (isBasis ? "" : "out, ") +
      parameterArgs.join(", ") +
      (isBasis ? ", " + indexArgs.join(", ") : "") +
      ") {");

   line("var h, m, a, b;");

   if (checkBounds) {
      line("var " + domainVar + " = this.domain;");
      line("for (var i = 0; i < this.splineDimension; i++) {");
      line("  a = arguments[i + 1];");
      line("  if (a < " + domainVar + "[i][0] || a > " + domainVar + "[i][1] || a === undefined || isNaN(a)) {");
      line("    throw new Error(\"Invalid Spline parameter in dimension \"+i+\". Valid domain is [\"+" + domainVar + "[i][0]+\", \"+" + domainVar + "[i][1]+\"]. but got t\"+i+\" = \"+arguments[i + 1]+\".\");");
      line("  }");
      line("}");
   }

   for (d = 0; d < splineDimension; d++) {
      line("var " + sizeVar(d) + " = " + size_getter(points, "this.points", d) + ";");
   }
   code.push(accessor_preamble(nurbs, "x", "this.points", points));

   if (hasWeights) {
      code.push(accessor_preamble(nurbs, "w", "this.weights", weights));
   }

   if (!allDimensionUniform) {
      code.push(accessor_preamble(nurbs, "k", "this.knots", knots));
   }

   function ternary (cond, a, b) {
      return "(" + cond + ") ? (" + a + ") : (" + b + ")";
   }

   var hasKnots = [];
   for (d = 0; d < splineDimension; d++) {
      switch (infer_type(knots)) {
         case infer_type.NDARRAY:
            hasKnots[d] = true;
            break;
         case infer_type.ARRAY_OF_ARRAYS:
            hasKnots[d] = is_array_like(knots[d]);
            break;
      }
   }

   for (d = 0; d < splineDimension; d++) {
      if (hasKnots[d]) {
         //
         // LOCATE KNOTS
         //
         debugLine("\n  // Bisect to locate the knot interval in dimension " + d + "\n");
         line("var " + knotIndex(d) + " = 0;");
         line("h = " + sizeVar(d) + ";");
         line("while(h > " + knotIndex(d) + " + 1) {");
         line("  m = 0.5 * (h + " + knotIndex(d) + ") | 0;");
         line("  if (" + knotAccessor([d, "m"]) + " > " + tVar(d) + ") h = m;");
         line("  else " + knotIndex(d) + " = m;");
         line("}");

         debugLine("\n  // Fetch knots for dimension " + d + "\n");

         for (i = -degree[d] + 1; i <= degree[d]; i++) {
            if (boundary[d] === "closed") {
               if (i < 0) {
                  // line("var " + knotVar([d, i + degree[d] - 1]) + " = " + knotAccessor([d, [knotIndex(d), i]]) + ";");
                  // EDIT THIS SECTION
                  line("var " + knotVar([d, i + degree[d] - 1]) + " = " + ternary(
                     knotIndex(d) + " < " + (-i),
                     knotAccessor([d, 0]) + " + " + knotAccessor([d, [sizeVar(d), knotIndex(d), i]]) + " - " + knotAccessor([d, [sizeVar(d)]]),
                     knotAccessor([d, [knotIndex(d), i]])
                  ) + ";");
               } else if (i > 0) {
                  line("var " + knotVar([d, i + degree[d] - 1]) + " = " + ternary(
                     knotIndex(d) + " + " + i + " > " + sizeVar(d),
                     // knotAccessor([d, sizeVar(d)]) + " + " + knotAccessor([d, i]) + " - " + knotAccessor([d, 0]),
                     knotAccessor([d, sizeVar(d)]) + " + " + knotAccessor([d, i + " + " + knotIndex(d) + " - " + sizeVar(d)]) + " - " + knotAccessor([d, 0]),
                     knotAccessor([d, [knotIndex(d), i]])
                  ) + ";");
               } else {
                  line("var " + knotVar([d, i + degree[d] - 1]) + " = " + knotAccessor([d, [knotIndex(d), i]]) + ";");
               }
            } else {
               line("var " + knotVar([d, i + degree[d] - 1]) + " = " + knotAccessor([d, [knotIndex(d), i]]) + ";");
            }
         }
      } else {
         //
         // UNIFORM B-SPLINE
         //
         debugLine("\n  // Directly compute knot interval for dimension " + d + "\n");

         if (boundary[d] === "closed") {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0) % " + sizeVar(d) + ";");
         } else {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0);");
            line("if (" + knotIndex(d) + " < " + degree[d] + ") " + knotIndex(d) + " = " + degree[d] + ";");
            line("if (" + knotIndex(d) + " > " + sizeVar(d) + " - 1) " + knotIndex(d) + " = " + sizeVar(d) + " - 1;");
         }

         debugLine("\n  // Compute and clamp knots for dimension " + d + "\n");
         for (i = -degree[d] + 1; i <= degree[d]; i++) {
            kvar = knotVar([d, i + degree[d] - 1]);
            line("var " + kvar + " = " + knotIndex(d) + " + " + (i) + ";");
         }

         if (boundary[d] === "clamped") {
            for (i = -degree[d] + 1; i <= degree[d]; i++) {
               kvar = knotVar([d, i + degree[d] - 1]);
               if (i < 0) {
                  line("if (" + kvar + " < " + degree[d] + ") " + kvar + " = " + degree[d] + ";");
               }
               if (i > 0) {
                  line("if (" + kvar + " > " + sizeVar(d) + ") " + kvar + " = " + sizeVar(d) + ";");
               }
            }
         }

         if (boundary[d] === "closed") {
            debugLine("\n  // Wrap the B-Spline parameter for closed boundary");
            line(tVar(d) + " %= " + sizeVar(d) + ";");
         }
      }
   }

   for (d = 0, n = []; d < splineDimension; d++) {
      n[d] = degree[d] + 1;
   }

   if (hasWeights) {
      debugLine("\n  // Fetch weights\n");
      ndloop(n, function (dst) {
         var readIdx = [];
         var period = [];
         for (var d = 0; d < splineDimension; d++) {
            readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
            if (boundary[d] === "closed" && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
         }
         line("var " + weightVar(dst) + " = " + weightAccessor(readIdx, period) + ";");
      });
   }

   if (debug) {
      if (hasWeights) {
         line("\n  // Fetch points and project into homogeneous (weighted) coordinates\n");
      } else {
         line("\n  // Fetch points\n");
      }
   }

   ndloop(n, function (dst) {
      var readIdx = [];
      var period = [];
      for (var d = 0; d < splineDimension; d++) {
         readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
         if (boundary[d] === "closed" && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
      }
      if (isBasis) {
         if (hasWeights) {
            line("var " + pointVar(dst) + " = " + pointAccessor(readIdx, period) + " * " + weightVar(dst) + ";");
         } else {
            line("var " + pointVar(dst) + " = " + pointAccessor(readIdx, period) + ";");
         }
      } else {
         for (d = 0; d < spaceDimension; d++) {
            var dstWithDim = dst.concat(d);
            readIdx[splineDimension] = d;
            if (hasWeights) {
               line("var " + pointVar(dstWithDim) + " = " + pointAccessor(readIdx, period) + " * " + weightVar(dst) + ";");
            } else {
               line("var " + pointVar(dstWithDim) + " = " + pointAccessor(readIdx, period) + ";");
            }
         }
      }
   });
   debugLine("\n");

   debugLine("// Perform De Boor\"s algorithm");
   for (d = n.length - 1; d >= 0; d--) {
      n[d] = [degree[d], degree[d] + 1];
      for (i = 0; i < degree[d]; i++) {
         debugLine("\n  // Degree " + degree[d] + " evaluation in dimension " + d + ", step " + (i + 1) + "\n");
         for (j = degree[d]; j > i; j--) {
            var isDerivative = derivative && (degree[d] - i - derivative[d] <= 0);

            if (isDerivative) {
               line("m = 1 / (" + knotVar([d, j - i + degree[d] - 1]) + " - " + knotVar([d, j - 1]) + ");");
               if (hasWeights) {
                  line("a = (" + tVar(d) + " - " + knotVar([d, j - 1]) + ") * m;");
                  line("b = 1 - a;");
               }
            } else {
               line("a = (" + tVar(d) + " - " + knotVar([d, j - 1]) + ") / (" + knotVar([d, j - i + degree[d] - 1]) + " - " + knotVar([d, j - 1]) + ");");
               line("b = 1 - a;");
            }

            if (hasWeights) {
               ndloop(n, function (ii) {
                  var ij = ii.slice();
                  var ij1 = ii.slice();
                  ij[d] = j;
                  ij1[d] = j - 1;
                  if (isDerivative && hasWeights) line("h = " + weightVar(ij) + ";");
                  line(weightVar(ij) + " = b * " + weightVar(ij1) + " + a * " + weightVar(ij) + ";");
               });
            }
            ndloop(n, function (ii) {
               var weightFactor, pt1, pt2;
               var ij = ii.slice();
               var ij1 = ii.slice();
               // Replace the dimension being interpolated with the interpolation indices
               ij[d] = j;
               ij1[d] = j - 1;
               // Create a version to which we can append the dimension when we loop over spatial dimension
               if (isDerivative) {
                  var derivCoeff = i + 1;
                  if (isBasis) {
                     weightFactor = hasWeights ? "h * " + weightVar(ij1) + " / " + weightVar(ij) + " * " : "";
                     pt1 = pointVar(ij) + (hasWeights ? " / h" : "");
                     pt2 = pointVar(ij1) + (hasWeights ? " / " + weightVar(ij1) : "");
                     line(pointVar(ij) + " = " + derivCoeff + " * " + weightFactor + "(" + pt1 + " - " + pt2 + ") * m;");
                  } else {
                     var ijWithDimension = ij.slice();
                     var ij1WithDimension = ij1.slice();
                     for (m = 0; m < spaceDimension; m++) {
                        ijWithDimension[splineDimension] = ij1WithDimension[splineDimension] = m;
                        weightFactor = hasWeights ? "h * " + weightVar(ij1) + " / " + weightVar(ij) + " * " : "";
                        pt1 = pointVar(ijWithDimension) + (hasWeights ? " / h" : "");
                        pt2 = pointVar(ij1WithDimension) + (hasWeights ? " / " + weightVar(ij1) : "");
                        line(pointVar(ijWithDimension) + " = " + derivCoeff + " * " + weightFactor + "(" + pt1 + " - " + pt2 + ") * m;");
                     }
                  }
               } else {
                  if (isBasis) {
                     line(pointVar(ij) + " = b * " + pointVar(ij1) + " + a * " + pointVar(ij) + ";");
                  } else {
                     for (m = 0; m < spaceDimension; m++) {
                        ij[splineDimension] = ij1[splineDimension] = m;
                        line(pointVar(ij) + " = b * " + pointVar(ij1) + " + a * " + pointVar(ij) + ";");
                     }
                  }
               }
            });
            debugLine("\n");
         }
      }
   }

   if (debug) {
      if (hasWeights) {
         line("\n  // Project back from homogeneous coordinates and return final output\n");
      } else {
         line("\n  // Return final output\n");
      }
   }
   if (isBasis) {
      if (hasWeights) {
         line("return " + pointVar(degree) + " / " + weightVar(degree) + ";");
      } else {
         line("return " + pointVar(degree) + ";");
      }
   } else {
      for (d = 0; d < spaceDimension; d++) {
         if (hasWeights) {
            line("out[" + d + "] = " + pointVar(degree.concat([d])) + " / " + weightVar(degree) + ";");
         } else {
            line("out[" + d + "] = " + pointVar(degree.concat([d])) + ";");
         }
      }
   }
   if (!isBasis) {
      line("return out;");
   }
   code.push("}");

   if (debug) {
      var codeStr = code.join("\n");
      logger(codeStr);

      codeCache[cacheKey] = codeStr;
   }

   var evaluator = new Function([code.join("\n"), "; return ", functionName].join(""))();
   evaluatorCache[cacheKey] = evaluator;
   return evaluator.bind(nurbs);
};
;

/* harmony default export */ const evaluator = (external_X_ITE_X3D_Namespace_default().add ("evaluator", evaluator_default_));
;// ./src/lib/nurbs/src/transform.js





var transformerCache = {};

const transform_default_ = function createTransform (cacheKey, nurbs, accessors, debug) {
   var i, j, iterator, iterators, terms, n, rvalue, lvalue;
   var cachedTransformer = transformerCache[cacheKey];
   if (cachedTransformer) {
      return cachedTransformer.bind(nurbs);
   }

   var code = [];
   var functionName = "transform" + cacheKey;

   code.push("function " + functionName + "(m) {");
   code.push("var i, w;");
   code.push(accessor_preamble(nurbs, "x", "this.points", nurbs.points));

   var sizeVar = variable(debug ? "size" : "s");
   for (i = 0; i < nurbs.splineDimension; i++) {
      code.push("var " + sizeVar(i) + " = " + size_getter(nurbs.points, "this.points", i) + ";");
   }

   iterators = [];
   for (i = 0; i < nurbs.splineDimension; i++) {
      iterator = "i" + i;
      iterators.push(iterator);
      code.push("for (" + iterator + " = " + sizeVar(i) + "- 1; " + iterator + " >= 0; " + iterator + "--) {");
   }

   for (i = 0; i < nurbs.dimension; i++) {
      code.push("x" + i + " = " + accessors.point(iterators.concat([i])));
   }

   terms = [];
   for (i = 0; i < nurbs.dimension; i++) {
      terms.push("m[" + ((nurbs.dimension + 1) * (i + 1) - 1) + "] * x" + i);
   }
   terms.push("m[" + ((nurbs.dimension + 1) * (nurbs.dimension + 1) - 1) + "]");
   code.push("var w = (" + terms.join(" + ") + ") || 1.0;");

   for (i = 0; i < nurbs.dimension; i++) {
      terms = [];
      n = nurbs.dimension;
      for (j = 0; j < n; j++) {
         terms.push("m[" + (j * (n + 1) + i) + "] * x" + j);
      }
      terms.push("m[" + (j * (n + 1) + i) + "]");
      lvalue = accessors.point(iterators.concat([i]));
      rvalue = "(" + terms.join(" + ") + ") / w";
      code.push(lvalue + " = " + rvalue + ";");
   }

   for (i = nurbs.splineDimension - 1; i >= 0; i--) {
      code.push("}");
   }

   code.push("return this;");
   code.push("}");

   var transform = new Function([code.join("\n"), "; return ", functionName].join(""))();

   if (debug) console.log(code.join("\n"));

   transformerCache[cacheKey] = transform;
   return transform.bind(nurbs);
};
;

/* harmony default export */ const transform = (external_X_ITE_X3D_Namespace_default().add ("transform", transform_default_));
;// ./src/lib/nurbs/src/support.js








var supportCache = {};

const support_default_ = function (cacheKey, nurbs, accessors, debug, checkBounds) {
   var cachedSupport = supportCache[cacheKey];
   if (cachedSupport) {
      return cachedSupport.bind(nurbs);
   }

   var degree = nurbs.degree;
   var knots = nurbs.knots;
   var splineDimension = nurbs.splineDimension;
   var boundary = nurbs.boundary;

   var i, n, d;
   var code = [];
   var functionName = "support" + cacheKey;

   var knotAccessor = accessors.knot;

   var tVar = variable("t");
   var domainVar = debug ? "domain" : "d";
   var sizeVar = variable(debug ? "size" : "s");
   var knotIndex = variable(debug ? "knotIndex" : "i");

   var allDimensionUniform = true;
   for (d = 0; d < splineDimension; d++) {
      if (is_array_like(knots) && is_array_like(knots[d])) {
         allDimensionUniform = false;
      }
   }

   // Just to indent properly and save lots of typing
   function line (str) {
      code.push("  " + (str || ""));
   }

   var parameterArgs = [];
   for (i = 0; i < splineDimension; i++) {
      parameterArgs.push(tVar([i]));
   }

   code.push("function " + functionName + " (out, " + parameterArgs.join(", ") + ") {");

   var c = 0;
   function pushSupport (args, period) {
      if (period === undefined) {
         line("out[" + (c++) + "] = " + args.join(" + ") + ";");
      } else {
         line("out[" + (c++) + "] = (" + args.join(" + ") + " + " + period + ") % " + period + ";");
      }
   }

   line("var h, m;");
   line("var c = 0;");

   if (checkBounds) {
      line("var " + domainVar + " = this.domain;");
      line("for (var i = 0; i < this.splineDimension; i++) {");
      line("  a = arguments[i + 1];");
      line("  if (a < " + domainVar + "[i][0] || a > " + domainVar + "[i][1] || a === undefined || isNaN(a)) {");
      line("    throw new Error(\"Invalid Spline parameter in dimension \"+i+\". Valid domain is [\"+" + domainVar + "[i][0]+\", \"+" + domainVar + "[i][1]+\"]. but got t\"+i+\" = \"+arguments[i + 1]+\".\");");
      line("  }");
      line("}");
   }

   for (d = 0; d < splineDimension; d++) {
      line("var " + sizeVar(d) + " = " + size_getter(nurbs.points, "this.points", d) + ";");
   }

   if (!allDimensionUniform) {
      code.push(accessor_preamble(nurbs, "k", "this.knots", knots));
   }

   var hasKnots = [];
   for (d = 0; d < splineDimension; d++) {
      switch (infer_type(knots)) {
         case infer_type.NDARRAY:
            hasKnots[d] = true;
            break;
         case infer_type.ARRAY_OF_ARRAYS:
            hasKnots[d] = is_array_like(knots[d]);
            break;
      }
   }

   for (d = 0; d < splineDimension; d++) {
      if (hasKnots[d]) {
         line("var " + knotIndex(d) + " = 0;");
         line("h = " + sizeVar(d) + ";");
         line("while(h > " + knotIndex(d) + " + 1) {");
         line("  m = 0.5 * (h + " + knotIndex(d) + ") | 0;");
         line("  if (" + knotAccessor([d, "m"]) + " > " + tVar(d) + ") h = m;");
         line("  else " + knotIndex(d) + " = m;");
         line("}");
      } else {
         if (boundary[d] === "closed") {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0) % " + sizeVar(d) + ";");
         } else {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0);");
            line("if (" + knotIndex(d) + " < " + degree[d] + ") " + knotIndex(d) + " = " + degree[d] + ";");
            line("if (" + knotIndex(d) + " > " + sizeVar(d) + " - 1) " + knotIndex(d) + " = " + sizeVar(d) + " - 1;");
         }
      }
   }

   for (d = 0, n = []; d < splineDimension; d++) {
      n[d] = degree[d] + 1;
   }

   ndloop(n, function (dst) {
      var readIdx = [];
      var period = [];
      for (var d = 0; d < splineDimension; d++) {
         readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
         if (boundary[d] === "closed" && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
      }
      for (d = 0; d < splineDimension; d++) {
         pushSupport(readIdx[d], period[d]);
      }
   });

   line("out.length = " + c + ";");

   line("return out;");
   code.push("}");

   if (debug) console.log(code.join("\n"));

   var evaluator = new Function([code.join("\n"), "; return ", functionName].join(""))();
   supportCache[cacheKey] = evaluator;
   return evaluator.bind(nurbs);
};
;

/* harmony default export */ const support = (external_X_ITE_X3D_Namespace_default().add ("support", support_default_));
;// ./src/lib/nurbs/extras/sample.js
const
   tmp1       = [ ],
   pointIndex = new Map (),
   seamIndex  = new Map ();

function sample (mesh, surface, opts)
{
   const
      points      = mesh .points ??= [ ],
      faces       = mesh .faces  ??= [ ],
      haveWeights = opts .haveWeights,
      dimension   = surface .dimension - haveWeights,
      resolution  = opts .resolution;

   switch (surface .splineDimension)
   {
      case 1:
      {
         const
            nu         = resolution [0],
            nuBound    = nu + 1,
            nbVertices = nuBound * dimension,
            domain     = surface .domain,
            uDomain    = domain [0],
            uDistance  = uDomain [1] - uDomain [0],
            uClosed    = opts .closed;

         for (let iu = 0; iu < nuBound; ++ iu)
         {
            const
               u   = uDomain [0] + uDistance * (uClosed ? iu % nu : iu) / nu,
               ptr = iu * dimension;

            surface .evaluate (tmp1, u);

            if (haveWeights)
            {
               const w = tmp1 [dimension];

               for (let d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d] / w;
            }
            else
            {
               for (let d = 0; d < dimension; ++ d)
                  points [ptr + d] = tmp1 [d];
            }
         }

         points .length = nbVertices;
         break;
      }
      case 2:
      {
         const
            nu         = resolution [0],
            nv         = resolution [1],
            nuBound    = nu + 1,
            nvBound    = nv + 1,
            nbVertices = nuBound * nvBound * dimension,
            domain     = surface .domain,
            uDomain    = domain [0],
            vDomain    = domain [1],
            uDistance  = uDomain [1] - uDomain [0],
            vDistance  = vDomain [1] - vDomain [0],
            uClosed    = opts .closed [0],
            vClosed    = opts .closed [1];

         // Generate points.

         for (let iv = 0; iv < nvBound; ++ iv)
         {
            const v = vDomain [0] + vDistance * iv / nv;

            for (let iu = 0; iu < nuBound; ++ iu)
            {
               const
                  u   = uDomain [0] + uDistance * iu / nu,
                  ptr = (iu + nuBound * iv) * dimension;

               surface .evaluate (tmp1, u, v);

               if (haveWeights)
               {
                  const w = tmp1 [dimension];

                  for (let d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d] / w;
               }
               else
               {
                  for (let d = 0; d < dimension; ++ d)
                     points [ptr + d] = tmp1 [d];
               }
            }
         }

         points .length = nbVertices;

         // Combine seam points if equal.

         uSeam (0, nuBound, nvBound, dimension, points, pointIndex, seamIndex);
         vSeam (0, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         if (!uClosed)
            uSeam (nu, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         if (!vClosed)
            vSeam (nv, nuBound, nvBound, dimension, points, pointIndex, seamIndex);

         // Generate faces.

         let f = 0;

         for (let v0 = 0; v0 < nv; ++ v0)
         {
            const v1 = vClosed ? (v0 + 1) % nv : v0 + 1;

            for (let u0 = 0; u0 < nu; ++ u0)
            {
               const u1 = uClosed ? (u0 + 1) % nu : u0 + 1;

               let
                  p0 = u0 + nuBound * v0, // 0
                  p1 = u1 + nuBound * v0, // 1
                  p2 = u1 + nuBound * v1, // 2
                  p3 = u0 + nuBound * v1; // 3

               p0 = seamIndex .get (p0) ?? p0;
               p1 = seamIndex .get (p1) ?? p1;
               p2 = seamIndex .get (p2) ?? p2;
               p3 = seamIndex .get (p3) ?? p3;

               // Triangle 1
               //     2
               //    /|
               //   / |
               //  /__|
               // 0   1

               faces [f ++] = p0;
               faces [f ++] = p1;
               faces [f ++] = p2;

               // Triangle 2
               // 3   2
               // |--/
               // | /
               // |/
               // 0

               faces [f ++] = p0;
               faces [f ++] = p2;
               faces [f ++] = p3;
            }
         }

         faces .length = f;

         pointIndex .clear ();
         seamIndex  .clear ();

         break;
      }
      default:
         throw new Error ("Can only sample contours and surfaces.");
   }

   return mesh;
}

function uSeam (u0, nuBound, nvBound, dimension, points, pointIndex, seamIndex)
{
   for (let v0 = 0; v0 < nvBound; ++ v0)
   {
      const i = u0 + nuBound * v0;

      uvSeam (i, dimension, points, pointIndex, seamIndex);
   }
}

function vSeam (v0, nuBound, nvBound, dimension, points, pointIndex, seamIndex)
{
   for (let u0 = 0; u0 < nuBound; ++ u0)
   {
      const i = u0 + nuBound * v0;

      uvSeam (i, dimension, points, pointIndex, seamIndex);
   }
}

function uvSeam (i, dimension, points, pointIndex, seamIndex)
{
   let key = "";

   for (let d = 0; d < dimension; ++ d)
   {
      key += points [i * dimension + d];
      key += ";";
   }

   if (pointIndex .has (key))
      seamIndex .set (i, pointIndex .get (key))
   else
      pointIndex .set (key, i);
}

const sample_default_ = sample;
;

/* harmony default export */ const extras_sample = (external_X_ITE_X3D_Namespace_default().add ("sample", sample_default_));
;// ./src/lib/nurbs/nurbs.js












var BOUNDARY_TYPES = {
   open: "open",
   closed: "closed",
   clamped: "clamped"
};

function isBlank (x) {
   return x === undefined || x === null;
}

function parseNURBS (points, degree, knots, weights, boundary, opts) {
   var i, dflt;

   if (points && !is_array_like(points) && !is_ndarray(points)) {
      opts = points;
      this.debug = points.debug;
      this.checkBounds = !!points.checkBounds;
      this.weights = points.weights;
      this.knots = points.knots;
      this.degree = points.degree;
      this.boundary = points.boundary;
      this.points = points.points;
      Object.defineProperty(this, "size", {value: opts.size, writable: true, configurable: true});
   } else {
      opts = opts || {};
      this.weights = weights;
      this.knots = knots;
      this.degree = degree;
      this.points = points;
      this.boundary = boundary;
      this.debug = opts.debug;
      this.checkBounds = !!opts.checkBounds;
      Object.defineProperty(this, "size", {value: opts.size, writable: true, configurable: true});
   }

   var pointType  = infer_type(this.points);
   var weightType = infer_type(this.weights);
   var knotType   = infer_type(this.knots);

   if (this.points) {
      //
      // Sanitize the points
      //
      switch (pointType) {
         case infer_type.GENERIC_NDARRAY:
         case infer_type.NDARRAY:
            Object.defineProperties(this, {
               splineDimension: {
                  value: this.points.shape.length - 1,
                  writable: false,
                  configurable: true
               },
               dimension: {
                  value: this.points.shape[this.points.shape.length - 1],
                  writable: false,
                  configurable: true
               },
               size: {
                  get: function () {
                     return this.points.shape.slice(0, this.points.shape.length - 1);
                  },
                  set: function () {
                     throw new Error("Cannot assign to read only property 'size'");
                  },
                  configurable: true
               }
            });
            break;

         case infer_type.ARRAY_OF_OBJECTS:
         case infer_type.ARRAY_OF_ARRAYS:
            // Follow the zeroth entries until we hit something that"s not an array
            var splineDimension = 0;
            var size = this.size || [];
            size.length = 0;
            for (var ptr = this.points; is_array_like(ptr[0]); ptr = ptr[0]) {
               splineDimension++;
               size.push(ptr.length);
            }
            if (splineDimension === 0) {
               throw new Error("Expected an array of points");
            }

            Object.defineProperties(this, {
               splineDimension: {
                  value: splineDimension,
                  writable: false,
                  configurable: true
               },
               dimension: {
                  value: ptr.length,
                  writable: false,
                  configurable: true
               },
               size: {
                  get: function () {
                     var size = [];
                     size.length = 0;
                     for (var i = 0, ptr = this.points; i < this.splineDimension; i++, ptr = ptr[0]) {
                        size[i] = ptr.length;
                     }
                     return size;
                  },
                  set: function () {
                     throw new Error("Cannot assign to read only property \"size\"");
                  },
                  configurable: true
               }
            });

            break;
         case infer_type.PACKED:
         default:
            throw new Error("Expected either a packed array, array of arrays, or ndarray of points");
      }
   } else {
      if (this.size === undefined || this.size === null) {
         throw new Error("Either points or a control hull size must be provided.");
      }
      if (!is_array_like(this.size)) {
         Object.defineProperty(this, "size", {
            value: [this.size],
            writable: true,
            configurable: true
         });
      }
      if (this.size.length === 0) {
         throw new Error("`size` must be a number or an array of length at least one.");
      }

      Object.defineProperties(this, {
         splineDimension: {
            value: this.size.length,
            writable: false,
            configurable: true
         },
         dimension: {
            value: 0,
            writable: false,
            configurable: true
         }
      });
   }

   //
   // Sanitize the degree into an array
   //
   if (is_array_like(this.degree)) {
      for (i = 0; i < this.splineDimension; i++) {
         if (isBlank(this.degree[i])) {
            throw new Error("Missing degree in dimension " + (i + 1));
         }
      }
   } else {
      var hasBaseDegree = !isBlank(this.degree);
      var baseDegree = isBlank(this.degree) ? 2 : this.degree;
      this.degree = [];
      for (i = 0; i < this.splineDimension; i++) {
         if (this.size[i] <= baseDegree) {
            if (hasBaseDegree) {
               throw new Error("Expected at least " + (baseDegree + 1) + " points for degree " + baseDegree + " spline in dimension " + (i + 1) + " but got only " + this.size[i]);
            } else {
               this.degree[i] = this.size[i] - 1;
            }
         } else {
            this.degree[i] = baseDegree;
         }
      }
   }

   //
   // Sanitize boundaries
   //
   dflt = (typeof this.boundary !== "string") ? "open" : this.boundary;
   if (!BOUNDARY_TYPES[dflt]) {
      throw new Error("Boundary type must be one of " + Object.keys(BOUNDARY_TYPES) + ". Got " + dflt);
   }
   this.boundary = is_array_like(this.boundary) ? this.boundary : [];
   this.boundary.length = this.splineDimension;
   for (i = 0; i < this.splineDimension; i++) {
      this.boundary[i] = isBlank(this.boundary[i]) ? dflt : this.boundary[i];

      if (!BOUNDARY_TYPES[dflt]) {
         throw new Error("Boundary type must be one of " + Object.keys(BOUNDARY_TYPES) + ". Got " + dflt + " for dimension " + (i + 1));
      }
   }

   //
   // Sanitize knots
   //
   switch (knotType) {
      case infer_type.ARRAY_OF_ARRAYS:
         // Wrap flat arrays in an array so that curves are more natural
         if (is_array_like(this.knots) && this.knots.length > 0 && !is_array_like(this.knots[0])) {
            this.knots = [this.knots];
         }

         for (i = 0; i < this.splineDimension; i++) {
            if (this.size[i] <= this.degree[i]) {
               throw new Error("Expected at least " + (this.degree[i] + 1) + " points in dimension " + (i + 1) + " but got " + this.size[i] + ".");
            }

            if (is_array_like(this.knots[i])) {
               if (this.boundary[i] !== "closed" && this.knots[i].length !== this.degree[i] + this.size[i] + 1) {
                  throw new Error("Expected " + (this.degree[i] + this.size[i] + 1) + " knots in dimension " + (i + 1) + " but got " + this.knots[i].length + ".");
               } else if (this.boundary[i] === "closed" && this.knots[i].length !== this.size[i] + 1) {
                  // Fudge factor allowance for just ignoring extra knots. This makes some allowance
                  // for passing regular clamped/open spline knots to a closed spline by ignoring extra
                  // knots instead of simply truncating.
                  var canBeFudged = this.knots[i].length === this.size[i] + this.degree[i] + 1;
                  if (!canBeFudged) {
                     throw new Error("Expected " + (this.size[i] + 1) + " knots for closed spline in dimension " + (i + 1) + " but got " + this.knots[i].length + ".");
                  }
               }
            }
         }
         break;
      case infer_type.NDARRAY:
         break;
   }

   //
   // Create evaluator
   //
   var newCacheKey = cache_key(this, this.debug, this.checkBounds, pointType, weightType, knotType);

   if (newCacheKey !== this.__cacheKey) {
      this.__cacheKey = newCacheKey;

      var accessors = create_accessors(this);

      this.evaluate = evaluator(this.__cacheKey, this, accessors, this.debug, this.checkBounds, false);
      this.transform = transform(this.__cacheKey, this, accessors, this.debug);
      this.support = support(this.__cacheKey, this, accessors, this.debug, this.checkBounds);

      this.evaluator = function (derivativeOrder, isBasis) {
         return evaluator(this.__cacheKey, this, accessors, this.debug, this.checkBounds, isBasis, derivativeOrder);
      };
   }

   this.numericalDerivative = numerical_derivative.bind(this);

   return this;
}

function domainGetter () {
   var sizeArray;
   var ret = [];

   // If the reference to size is hard-coded, then the size cannot change, or
   // if you change points manually (like by appending a point) without re-running
   // the constructor, then it"ll be incorrect. This aims for middle-ground
   // by querying the size directly, based on the point data type
   //
   // A pointer to the point array-of-arrays:
   var ptr = this.points;

   if (!ptr) {
      // If there are no points, then just use this.size
      sizeArray = this.size;
   } else if (is_ndarray_like(ptr)) {
      // If it"s an ndarray, use the ndarray"s shape property
      sizeArray = ptr.shape;
   }

   for (var d = 0; d < this.splineDimension; d++) {
      var size = sizeArray ? sizeArray[d] : ptr.length;
      var p = this.degree[d];
      var isClosed = this.boundary[d] === "closed";

      if (this.knots && this.knots[d]) {
         var k = this.knots[d];
         ret[d] = [k[isClosed ? 0 : p], k[size]];
      } else {
         ret[d] = [isClosed ? 0 : p, size];
      }

      // Otherwise if it"s an array of arrays, we get the size of the next
      // dimension by recursing into the points
      if (ptr) ptr = ptr[0];
   }
   return ret;
}

// Evaluate Non-Uniform Rational B-Splines (NURBS)
// @param points {Array} - data array
// @param degree {Array} - spline curve degree
// @param knots {Array} - knot vector
// @param weights {Array} - weight vector
// @param opts {object} - additional options
function nurbs (points, degree, knots, weights, boundary, opts)
{
   var ctor = function (points, degree, knots, weights, boundary, opts)
   {
      parseFcn (points, degree, knots, weights, boundary, opts);
      return ctor;
   };

   var parseFcn = parseNURBS .bind (ctor);

   Object .defineProperty (ctor, "domain",
   {
      get: domainGetter
   });

   parseFcn (points, degree, knots, weights, boundary, opts);

   return ctor;
}

nurbs .sample = extras_sample;

const nurbs_default_ = nurbs;
;

/* harmony default export */ const nurbs_nurbs = (external_X_ITE_X3D_Namespace_default().add ("nurbs", nurbs_default_));
;// ./src/x_ite/Components/NURBS/NurbsCurve.js
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












function NurbsCurve (executionContext)
{
   NURBS_X3DParametricGeometryNode .call (this, executionContext);
   external_X_ITE_X3D_X3DLineGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsCurve);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
}

Object .assign (Object .setPrototypeOf (NurbsCurve .prototype, NURBS_X3DParametricGeometryNode .prototype),
   (external_X_ITE_X3D_X3DLineGeometryNode_default()).prototype,
{
   initialize ()
   {
      NURBS_X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this .set_controlPoint__ ();
   },
   set_controlPoint__ ()
   {
      this .controlPointNode ?.removeInterest ("requestRebuild", this);

      this .controlPointNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DCoordinateNode, this ._controlPoint);

      this .controlPointNode ?.addInterest ("requestRebuild", this);
   },
   getTessellation (dimension)
   {
      return NURBS_NURBS .getTessellation (this ._tessellation .getValue (), dimension);
   },
   getClosed (order, knot, weight, controlPointNode)
   {
      if (!this ._closed .getValue ())
         return false;

      return NURBS_NURBS .getClosed (order, knot, weight, controlPointNode);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS_NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPointNode)
   {
      return NURBS_NURBS .getControlPoints (result, closed, order, weights, controlPointNode);
   },
   getSurface ()
   {
      return this .surface;
   },
   tessellate ()
   {
      if (this ._order .getValue () < 2)
         return [ ];

      if (!this .controlPointNode)
         return [ ];

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return [ ];

      const
         vertexArray = this .getVertices (),
         numVertices = vertexArray .length,
         array       = [ ];

      if (numVertices)
      {
         for (let i = 0; i < numVertices; i += 8)
            array .push (vertexArray [i], vertexArray [i + 1], vertexArray [i + 2]);

         array .push (vertexArray [numVertices - 4], vertexArray [numVertices - 3], vertexArray [numVertices - 2]);
      }

      return array;
   },
   build ()
   {
      if (this ._order .getValue () < 2)
         return;

      if (!this .controlPointNode)
         return;

      if (this .controlPointNode .getSize () < this ._order .getValue ())
         return;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this .controlPointNode),
         weights       = this .getWeights (this .weights, this .controlPointNode .getSize (), this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this .controlPointNode);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this .controlPointNode .getSize (), this ._knot),
         scale = knots .at (-1) - knots [0];

      // Initialize NURBS tessellator

      const degree = this ._order .getValue () - 1;

      this .surface = (this .surface ?? nurbs_nurbs) ({
         boundary: ["open"],
         degree: [degree],
         knots: [knots],
         points: controlPoints,
         debug: false,
      });

      this .sampleOptions .resolution [0] = this .getTessellation (this .controlPointNode .getSize ());
      this .sampleOptions .closed         = closed;
      this .sampleOptions .haveWeights    = !! weights;

      const
         mesh        = nurbs_nurbs .sample (this .mesh, this .surface, this .sampleOptions),
         points      = mesh .points,
         numPoints   = points .length - 3,
         vertexArray = this .getVertices ();

      for (let i = 0; i < numPoints; i += 3)
      {
         vertexArray .push (points [i + 0], points [i + 1], points [i + 2], 1,
                            points [i + 3], points [i + 4], points [i + 5], 1);
      }
   },
   dispose ()
   {
      NURBS_X3DParametricGeometryNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (NurbsCurve,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsCurve", "NURBS", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tessellation", new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "closed",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "order",        new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "knot",         new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",       new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsCurve_default_ = NurbsCurve;
;

/* harmony default export */ const NURBS_NurbsCurve = (external_X_ITE_X3D_Namespace_default().add ("NurbsCurve", NurbsCurve_default_));
;// ./src/x_ite/Components/NURBS/NurbsCurve2D.js
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











function NurbsCurve2D (executionContext)
{
   NURBS_X3DNurbsControlCurveNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsCurve2D);

   this .knots         = [ ];
   this .weights       = [ ];
   this .controlPoints = [ ];
   this .mesh          = { };
   this .sampleOptions = { resolution: [ ] };
   this .array         = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsCurve2D .prototype, NURBS_X3DNurbsControlCurveNode .prototype),
{
   getTessellation (dimension)
   {
      return NURBS_NURBS .getTessellation (this ._tessellation .getValue (), dimension);
   },
   getClosed (order, knot, weight, controlPoint)
   {
      if (!this ._closed .getValue ())
         return false;

      return NURBS_NURBS .getClosed2D (order, knot, weight, controlPoint);
   },
   getKnots (result, closed, order, dimension, knot)
   {
      return NURBS_NURBS .getKnots (result, closed, order, dimension, knot);
   },
   getWeights (result, dimension, weight)
   {
      return NURBS_NURBS .getWeights (result, dimension, weight);
   },
   getControlPoints (result, closed, order, weights, controlPoint)
   {
      return NURBS_NURBS .getControlPoints2D (result, closed, order, weights, controlPoint);
   },
   tessellate (type, array = this .array)
   {
      if (this ._order .getValue () < 2)
         return array;

      if (this ._controlPoint .length < this ._order .getValue ())
         return array;

      // Order and dimension are now positive numbers.

      const
         closed        = this .getClosed (this ._order .getValue (), this ._knot, this ._weight, this ._controlPoint),
         weights       = this .getWeights (this .weights, this ._controlPoint .length, this ._weight),
         controlPoints = this .getControlPoints (this .controlPoints, closed, this ._order .getValue (), weights, this ._controlPoint);

      // Knots

      const
         knots = this .getKnots (this .knots, closed, this ._order .getValue (), this ._controlPoint .length, this ._knot),
         scale = knots .at (-1) - knots [0];

      // Initialize NURBS tessellator

      const degree = this ._order .getValue () - 1;

      this .surface = (this .surface ?? nurbs_nurbs) ({
         boundary: ["open"],
         degree: [degree],
         knots: [knots],
         points: controlPoints,
         debug: false,
      });

      this .sampleOptions .resolution [0] = this .getTessellation (this ._controlPoint .length);
      this .sampleOptions .closed         = closed;
      this .sampleOptions .haveWeights    = !! weights;

      const
         mesh      = nurbs_nurbs .sample (this .mesh, this .surface, this .sampleOptions),
         points    = mesh .points,
         numPoints = points .length;

      switch (type)
      {
         case 0:
         {
            array .length = 0;

            for (const p of points)
               array .push (p);

            break;
         }
         case 1:
         {
            array .length = 0;

            for (let i = 0; i < numPoints; i += 2)
               array .push (points [i], 0, points [i + 1]);

            break;
         }
         case 2: // Contour2D
         {
            for (let i = 0; i < numPoints; i += 2)
               array .push (new (external_X_ITE_X3D_Vector3_default()) (points [i], points [i + 1], 0));

            break;
         }
      }

      return array;
   },
});

Object .defineProperties (NurbsCurve2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsCurve2D", "NURBS", 3, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tessellation", new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "closed",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "order",        new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "knot",         new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",       new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint", new (external_X_ITE_X3D_Fields_default()).MFVec2d ()),
      ]),
      enumerable: true,
   },
});

const NurbsCurve2D_default_ = NurbsCurve2D;
;

/* harmony default export */ const NURBS_NurbsCurve2D = (external_X_ITE_X3D_Namespace_default().add ("NurbsCurve2D", NurbsCurve2D_default_));
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// ./src/x_ite/Components/NURBS/NurbsOrientationInterpolator.js
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













function NurbsOrientationInterpolator (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsOrientationInterpolator);

   this .geometry = new NURBS_NurbsCurve (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsOrientationInterpolator .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._order        .addFieldInterest (this .geometry ._order);
      this ._knot         .addFieldInterest (this .geometry ._knot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._tessellation = 1;
      this .geometry ._order        = this ._order;
      this .geometry ._knot         = this ._knot;
      this .geometry ._weight       = this ._weight;
      this .geometry ._controlPoint = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      if (surface)
      {
         delete this .set_fraction__;

         this .derivative = surface .evaluator (1);
      }
      else
      {
         this .set_fraction__ = Function .prototype;
      }
   },
   set_fraction__: (() =>
   {
      const
         direction = new (external_X_ITE_X3D_Vector3_default()) (),
         rotation  = new (external_X_ITE_X3D_Rotation4_default()) ();

      return function ()
      {
         const
            fraction = external_X_ITE_X3D_Algorithm_default().clamp (this ._set_fraction .getValue (), 0, 1),
            surface  = this .geometry .getSurface (),
            uDomain  = surface .domain [0],
            u        = external_X_ITE_X3D_Algorithm_default().project (fraction, 0, 1, ... uDomain);

         this .derivative (direction, u);

         this ._value_changed = rotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).zAxis, direction);
      };
   })(),
});

Object .defineProperties (NurbsOrientationInterpolator,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsOrientationInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "set_fraction",  new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "order",         new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "knot",          new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weight",        new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "controlPoint",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "value_changed", new (external_X_ITE_X3D_Fields_default()).SFRotation ()),
      ]),
      enumerable: true,
   },
});

const NurbsOrientationInterpolator_default_ = NurbsOrientationInterpolator;
;

/* harmony default export */ const NURBS_NurbsOrientationInterpolator = (external_X_ITE_X3D_Namespace_default().add ("NurbsOrientationInterpolator", NurbsOrientationInterpolator_default_));
;// external "__X_ITE_X3D__ .Triangle3"
const external_X_ITE_X3D_Triangle3_namespaceObject = __X_ITE_X3D__ .Triangle3;
var external_X_ITE_X3D_Triangle3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Triangle3_namespaceObject);
;// ./src/x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode.js
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











function X3DNurbsSurfaceGeometryNode (executionContext)
{
   NURBS_X3DParametricGeometryNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsSurfaceGeometryNode);

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

Object .assign (Object .setPrototypeOf (X3DNurbsSurfaceGeometryNode .prototype, NURBS_X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      NURBS_X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._texCoord     .addInterest ("set_texCoord__",     this);
      this ._controlPoint .addInterest ("set_controlPoint__", this);

      this .set_texCoord__ ();
      this .set_controlPoint__ ();
   },
   set_texCoord__ ()
   {
      this .texCoordNode      ?.removeInterest ("requestRebuild", this);
      this .nurbsTexCoordNode ?.removeInterest ("requestRebuild", this);

      this .texCoordNode      = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTextureCoordinateNode, this ._texCoord);
      this .nurbsTexCoordNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).NurbsTextureCoordinate,   this ._texCoord);

      this .texCoordNode      ?.addInterest ("requestRebuild", this);
      this .nurbsTexCoordNode ?.addInterest ("requestRebuild", this);
   },
   set_controlPoint__ ()
   {
      this .controlPointNode ?.removeInterest ("requestRebuild", this);

      this .controlPointNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DCoordinateNode, this ._controlPoint);

      this .controlPointNode ?.addInterest ("requestRebuild", this);
   },
   setTessellationScale (value)
   {
      this .tessellationScale = value;

      this .requestRebuild ();
   },
   getUTessellation ()
   {
      return Math .floor (NURBS_NURBS .getTessellation (this ._uTessellation .getValue (), this ._uDimension .getValue ()) * this .tessellationScale);
   },
   getVTessellation (numWeights)
   {
      return Math .floor (NURBS_NURBS .getTessellation (this ._vTessellation .getValue (), this ._vDimension .getValue ()) * this .tessellationScale);
   },
   getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode)
   {
      if (this ._uClosed .getValue ())
         return NURBS_NURBS .getUClosed (uOrder, uDimension, vDimension, uKnot, weight, controlPointNode);

      return false;
   },
   getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode)
   {
      if (this ._vClosed .getValue ())
         return NURBS_NURBS .getVClosed (vOrder, uDimension, vDimension, vKnot, weight, controlPointNode);

      return false;
   },
   getUVWeights (result, uDimension, vDimension, weight)
   {
      return NURBS_NURBS .getUVWeights (result, uDimension, vDimension, weight);
   },
   getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode)
   {
      return NURBS_NURBS .getTexControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode);
   },
   getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode)
   {
      return NURBS_NURBS .getUVControlPoints (result, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, weights, controlPointNode);
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

      this .surface = (this .surface ?? nurbs_nurbs) ({
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
         mesh        = nurbs_nurbs .sample (this .mesh, this .surface, sampleOptions),
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
      const multiTexCoordArray = this .getMultiTexCoords ();

      if (this .texCoordNode)
      {
         this .texCoordNode .init (multiTexCoordArray);

         const
            textureCoordinates = this .texCoordNode .getTextureCoordinates ?.(),
            numMultiTexCoords  = multiTexCoordArray .length;

         for (let i = 0; i < numMultiTexCoords; ++ i)
         {
            const
               texCoordArray    = multiTexCoordArray [i],
               texCoordNode     = textureCoordinates ?.[i] ?? this .texCoordNode,
               texUDegree       = uOrder - 1,
               texVDegree       = vOrder - 1,
               texUKnots        = uKnots,
               texVKnots        = vKnots,
               texControlPoints = this .getTexControlPoints (this .texControlPoints, uClosed, vClosed, uOrder, vOrder, uDimension, vDimension, texCoordNode);

            this .createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray);
         }
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
            texControlPoints = node .getControlPoints (texWeights),
            texCoordArray    = this .getTexCoords ();

         multiTexCoordArray .push (texCoordArray);
         this .createNurbsTexCoords (texUDegree, texVDegree, texUKnots, texVKnots, texControlPoints, texCoordArray);
      }
      else
      {
         const texCoordArray = this .getTexCoords ();

         multiTexCoordArray .push (texCoordArray);
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
      this .texSurface = (this .texSurface ?? nurbs_nurbs) ({
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
         texMesh = nurbs_nurbs .sample (this .texMesh, this .texSurface, sampleOptions),
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

      return this .refineNormals (normalIndex, normals, external_X_ITE_X3D_Algorithm_default().radians (85));
   },
   createFaceNormals: (() =>
   {
      const
         v1 = new (external_X_ITE_X3D_Vector3_default()) (),
         v2 = new (external_X_ITE_X3D_Vector3_default()) (),
         v3 = new (external_X_ITE_X3D_Vector3_default()) ();

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

            const normal = external_X_ITE_X3D_Triangle3_default().normal (v1, v2 ,v3, normals [i] ?? new (external_X_ITE_X3D_Vector3_default()) ());

            normals [i]     = normal;
            normals [i + 1] = normal;
            normals [i + 2] = normal;
         }

         normals .length = numFaces;

         return normals;
      };
   })(),
});

Object .defineProperties (X3DNurbsSurfaceGeometryNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DNurbsSurfaceGeometryNode", "NURBS", 1));

const X3DNurbsSurfaceGeometryNode_default_ = X3DNurbsSurfaceGeometryNode;
;

/* harmony default export */ const NURBS_X3DNurbsSurfaceGeometryNode = (external_X_ITE_X3D_Namespace_default().add ("X3DNurbsSurfaceGeometryNode", X3DNurbsSurfaceGeometryNode_default_));
;// ./src/x_ite/Components/NURBS/NurbsPatchSurface.js
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








function NurbsPatchSurface (executionContext)
{
   NURBS_X3DNurbsSurfaceGeometryNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsPatchSurface);
}

Object .setPrototypeOf (NurbsPatchSurface .prototype, NURBS_X3DNurbsSurfaceGeometryNode .prototype);

Object .defineProperties (NurbsPatchSurface,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsPatchSurface", "NURBS", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "uTessellation", new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "vTessellation", new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uClosed",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vClosed",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uOrder",        new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vOrder",        new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uDimension",    new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vDimension",    new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uKnot",         new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vKnot",         new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",        new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsPatchSurface_default_ = NurbsPatchSurface;
;

/* harmony default export */ const NURBS_NurbsPatchSurface = (external_X_ITE_X3D_Namespace_default().add ("NurbsPatchSurface", NurbsPatchSurface_default_));
;// ./src/x_ite/Components/NURBS/NurbsPositionInterpolator.js
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












function NurbsPositionInterpolator (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsPositionInterpolator);

   this .geometry = new NURBS_NurbsCurve (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsPositionInterpolator .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._order        .addFieldInterest (this .geometry ._order);
      this ._knot         .addFieldInterest (this .geometry ._knot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._tessellation = 1;
      this .geometry ._order        = this ._order;
      this .geometry ._knot         = this ._knot;
      this .geometry ._weight       = this ._weight;
      this .geometry ._controlPoint = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      if (surface)
         delete this .set_fraction__;
      else
         this .set_fraction__ = Function .prototype;
   },
   set_fraction__: (() =>
   {
      const value = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const
            fraction = external_X_ITE_X3D_Algorithm_default().clamp (this ._set_fraction .getValue (), 0, 1),
            surface  = this .geometry .getSurface (),
            uDomain  = surface .domain [0],
            u        = external_X_ITE_X3D_Algorithm_default().project (fraction, 0, 1, ... uDomain);

         surface .evaluate (value, u);

         this ._value_changed = value;
      };
   })(),
});

Object .defineProperties (NurbsPositionInterpolator,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsPositionInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",      new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "set_fraction",  new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "order",         new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "knot",          new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "weight",        new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "controlPoint",  new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "value_changed", new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
      ]),
      enumerable: true,
   },
});

const NurbsPositionInterpolator_default_ = NurbsPositionInterpolator;
;

/* harmony default export */ const NURBS_NurbsPositionInterpolator = (external_X_ITE_X3D_Namespace_default().add ("NurbsPositionInterpolator", NurbsPositionInterpolator_default_));
;// external "__X_ITE_X3D__ .X3DBoundedObject"
const external_X_ITE_X3D_X3DBoundedObject_namespaceObject = __X_ITE_X3D__ .X3DBoundedObject;
var external_X_ITE_X3D_X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBoundedObject_namespaceObject);
;// ./src/x_ite/Components/NURBS/NurbsSet.js
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










function NurbsSet (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);
   external_X_ITE_X3D_X3DBoundedObject_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsSet);

   this .geometryNodes = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsSet .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
   (external_X_ITE_X3D_X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .initialize .call (this);

      this ._tessellationScale .addInterest ("set_tessellationScale__", this);
      this ._addGeometry       .addInterest ("set_addGeometry__",       this);
      this ._removeGeometry    .addInterest ("set_removeGeometry__",    this);
      this ._geometry          .addInterest ("set_geometry__",          this);

      this .set_geometry__ ();
   },
   getBBox (bbox, shadows)
   {
      // Add bounding boxes

      for (const geometryNode of this .geometryNodes)
         bbox .add (geometryNode .getBBox ());

      return bbox;
   },
   set_tessellationScale__ ()
   {
      const tessellationScale = Math .max (0, this ._tessellationScale .getValue ());

      for (const geometryNode of this .geometryNodes)
         geometryNode .setTessellationScale (tessellationScale);
   },
   set_addGeometry__ ()
   {
      this ._addGeometry .setTainted (true);
      this ._addGeometry .assign (NurbsSet_filter (this ._addGeometry, this ._geometry));

      for (const geometry of this ._addGeometry)
         this ._geometry .push (geometry);

      this ._addGeometry .length = 0;
      this ._addGeometry .setTainted (false);
   },
   set_removeGeometry__ ()
   {
      this ._removeGeometry .setTainted (true);
      this ._geometry .assign (NurbsSet_filter (this ._geometry, this ._removeGeometry));

      this ._removeGeometry .length = 0;
      this ._removeGeometry .setTainted (false);
   },
   set_geometry__ ()
   {
      for (const geometryNode of this .geometryNodes)
         geometryNode .setTessellationScale (1);

      this .geometryNodes .length = 0;

      for (const node of this ._geometry)
      {
         const geometryNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsSurfaceGeometryNode, node);

         if (geometryNode)
            this .geometryNodes .push (geometryNode);
      }

      this .set_tessellationScale__ ();
   },
   dispose ()
   {
      external_X_ITE_X3D_X3DBoundedObject_default().prototype .dispose .call (this);
      external_X_ITE_X3D_X3DChildNode_default().prototype .dispose .call (this);
   },
});

function NurbsSet_filter (array, remove)
{
   const set = new Set (remove);

   return array .filter (value => !set .has (value));
}

Object .defineProperties (NurbsSet,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsSet", "NURBS", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "tessellationScale", new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",          new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",        new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addGeometry",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeGeometry",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "geometry",          new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsSet_default_ = NurbsSet;
;

/* harmony default export */ const NURBS_NurbsSet = (external_X_ITE_X3D_Namespace_default().add ("NurbsSet", NurbsSet_default_));
;// ./src/x_ite/Components/NURBS/NurbsSurfaceInterpolator.js
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












function NurbsSurfaceInterpolator (executionContext)
{
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsSurfaceInterpolator);

   this .geometry = new NURBS_NurbsPatchSurface (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSurfaceInterpolator .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DChildNode_default().prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._uOrder       .addFieldInterest (this .geometry ._uOrder);
      this ._vOrder       .addFieldInterest (this .geometry ._vOrder);
      this ._uDimension   .addFieldInterest (this .geometry ._uDimension);
      this ._vDimension   .addFieldInterest (this .geometry ._vDimension);
      this ._uKnot        .addFieldInterest (this .geometry ._uKnot);
      this ._vKnot        .addFieldInterest (this .geometry ._vKnot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._uTessellation = 1;
      this .geometry ._vTessellation = 1;
      this .geometry ._uOrder        = this ._uOrder;
      this .geometry ._vOrder        = this ._vOrder;
      this .geometry ._uDimension    = this ._uDimension;
      this .geometry ._vDimension    = this ._vDimension;
      this .geometry ._uKnot         = this ._uKnot;
      this .geometry ._vKnot         = this ._vKnot;
      this .geometry ._weight        = this ._weight;
      this .geometry ._controlPoint  = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      if (surface)
      {
         delete this .set_fraction__;

         this .uDerivative = surface .evaluator ([1, 0]);
         this .vDerivative = surface .evaluator ([0, 1]);
      }
      else
      {
         this .set_fraction__ = Function .prototype;
      }
   },
   set_fraction__: (() =>
   {
      const
         uVector  = new (external_X_ITE_X3D_Vector3_default()) (),
         vVector  = new (external_X_ITE_X3D_Vector3_default()) (),
         position = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         const
            fraction  = this ._set_fraction .getValue (),
            uFraction = external_X_ITE_X3D_Algorithm_default().clamp (fraction .x, 0, 1),
            vFraction = external_X_ITE_X3D_Algorithm_default().clamp (fraction .y, 0, 1),
            surface   = this .geometry .getSurface (),
            uDomain   = surface .domain [0],
            vDomain   = surface .domain [1],
            u         = external_X_ITE_X3D_Algorithm_default().project (uFraction, 0, 1, ... uDomain),
            v         = external_X_ITE_X3D_Algorithm_default().project (vFraction, 0, 1, ... vDomain);

         this .uDerivative (uVector, u, v);
         this .vDerivative (vVector, u, v);
         surface .evaluate (position, u, v);

         this ._normal_changed   = uVector .cross (vVector);
         this ._position_changed = position;
      };
   })(),
});

Object .defineProperties (NurbsSurfaceInterpolator,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsSurfaceInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "set_fraction",     new (external_X_ITE_X3D_Fields_default()).SFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uOrder",           new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vOrder",           new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uDimension",       new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vDimension",       new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uKnot",            new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vKnot",            new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",           new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "normal_changed",   new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "position_changed", new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
      ]),
      enumerable: true,
   },
});

const NurbsSurfaceInterpolator_default_ = NurbsSurfaceInterpolator;
;

/* harmony default export */ const NURBS_NurbsSurfaceInterpolator = (external_X_ITE_X3D_Namespace_default().add ("NurbsSurfaceInterpolator", NurbsSurfaceInterpolator_default_));
;// external "__X_ITE_X3D__ .Extrusion"
const external_X_ITE_X3D_Extrusion_namespaceObject = __X_ITE_X3D__ .Extrusion;
var external_X_ITE_X3D_Extrusion_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Extrusion_namespaceObject);
;// ./src/x_ite/Components/NURBS/NurbsSweptSurface.js
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










function NurbsSweptSurface (executionContext)
{
   NURBS_X3DParametricGeometryNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsSweptSurface);

   this .extrusion = new (external_X_ITE_X3D_Extrusion_default()) (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSweptSurface .prototype, NURBS_X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      NURBS_X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._crossSectionCurve .addInterest ("set_crossSectionCurve__", this);
      this ._trajectoryCurve   .addInterest ("set_trajectoryCurve__",   this);

      const extrusion = this .extrusion;

      extrusion ._beginCap     = false;
      extrusion ._endCap       = false;
      extrusion ._solid        = true;
      extrusion ._ccw          = true;
      extrusion ._convex       = true;
      extrusion ._creaseAngle  = Math .PI;

      extrusion .setup ();

      extrusion ._crossSection .setTainted (true);
      extrusion ._spine        .setTainted (true);

      this .set_crossSectionCurve__ ();
      this .set_trajectoryCurve__ ();
   },
   getTrajectoryCurve ()
   {
      return this .trajectoryCurveNode;
   },
   set_crossSectionCurve__ ()
   {
      this .crossSectionCurveNode ?.removeInterest ("requestRebuild", this);

      this .crossSectionCurveNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsControlCurveNode, this ._crossSectionCurve);

      this .crossSectionCurveNode ?.addInterest ("requestRebuild", this);
   },
   set_trajectoryCurve__ ()
   {
      this .trajectoryCurveNode ?._rebuild .removeInterest ("requestRebuild", this);

      this .trajectoryCurveNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).NurbsCurve, this ._trajectoryCurve);

      this .trajectoryCurveNode ?._rebuild .addInterest ("requestRebuild", this);
   },
   build ()
   {
      if (!this .crossSectionCurveNode)
         return;

      if (!this .trajectoryCurveNode)
         return;

      const extrusion = this .extrusion;

      extrusion ._crossSection = this .crossSectionCurveNode .tessellate (0);
      extrusion ._spine        = this .trajectoryCurveNode   .tessellate (0);

      extrusion .rebuild ();

      this .getColors ()    .assign (extrusion .getColors ());
      this .getTexCoords () .assign (extrusion .getTexCoords ());
      this .getTangents ()  .assign (extrusion .getTangents ());
      this .getNormals ()   .assign (extrusion .getNormals ());
      this .getVertices ()  .assign (extrusion .getVertices ());

      this .getMultiTexCoords () .push (this .getTexCoords ());

      if (!this ._ccw .getValue ())
      {
         const
            normalsArray = this .getNormals (),
            numNormals   = normalsArray .length;

         for (let i = 0; i < numNormals; ++ i)
            normalsArray [i] *= -1;
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (NurbsSweptSurface,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsSweptSurface", "NURBS", 3, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",               new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "crossSectionCurve", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "trajectoryCurve",   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsSweptSurface_default_ = NurbsSweptSurface;
;

/* harmony default export */ const NURBS_NurbsSweptSurface = (external_X_ITE_X3D_Namespace_default().add ("NurbsSweptSurface", NurbsSweptSurface_default_));
;// ./src/x_ite/Components/NURBS/NurbsSwungSurface.js
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










function NurbsSwungSurface (executionContext)
{
   NURBS_X3DParametricGeometryNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsSwungSurface);

   this .extrusion = new (external_X_ITE_X3D_Extrusion_default()) (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSwungSurface .prototype, NURBS_X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      NURBS_X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._profileCurve    .addInterest ("set_profileCurve__",    this);
      this ._trajectoryCurve .addInterest ("set_trajectoryCurve__", this);

      const extrusion = this .extrusion;

      extrusion ._beginCap     = false;
      extrusion ._endCap       = false;
      extrusion ._solid        = true;
      extrusion ._ccw          = true;
      extrusion ._convex       = true;
      extrusion ._creaseAngle  = Math .PI;

      extrusion .setup ();

      extrusion ._crossSection .setTainted (true);
      extrusion ._spine        .setTainted (true);

      this .set_profileCurve__ ();
      this .set_trajectoryCurve__ ();
   },
   getTrajectoryCurve ()
   {
      return this .trajectoryCurveNode;
   },
   set_profileCurve__ ()
   {
      this .profileCurveNode ?.removeInterest ("requestRebuild", this);

      this .profileCurveNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsControlCurveNode, this ._profileCurve);

      this .profileCurveNode ?.addInterest ("requestRebuild", this);
   },
   set_trajectoryCurve__ ()
   {
      this .trajectoryCurveNode ?.removeInterest ("requestRebuild", this);

      this .trajectoryCurveNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DNurbsControlCurveNode, this ._trajectoryCurve);

      this .trajectoryCurveNode ?.addInterest ("requestRebuild", this);
   },
   build ()
   {
      if (!this .profileCurveNode)
         return;

      if (!this .trajectoryCurveNode)
         return;

      const extrusion = this .extrusion;

      extrusion ._crossSection = this .profileCurveNode    .tessellate (0);
      extrusion ._spine        = this .trajectoryCurveNode .tessellate (1);

      extrusion .rebuild ();

      this .getColors ()    .assign (extrusion .getColors ());
      this .getTexCoords () .assign (extrusion .getTexCoords ());
      this .getTangents ()  .assign (extrusion .getTangents ());
      this .getNormals ()   .assign (extrusion .getNormals ());
      this .getVertices ()  .assign (extrusion .getVertices ());

      this .getMultiTexCoords () .push (this .getTexCoords ());

      if (!this ._ccw .getValue ())
      {
         const
            normalsArray = this .getNormals (),
            numNormals   = normalsArray .length;

         for (let i = 0; i < numNormals; ++ i)
            normalsArray [i] *= -1;
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (NurbsSwungSurface,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsSwungSurface", "NURBS", 3, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "ccw",             new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "profileCurve",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "trajectoryCurve", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsSwungSurface_default_ = NurbsSwungSurface;
;

/* harmony default export */ const NURBS_NurbsSwungSurface = (external_X_ITE_X3D_Namespace_default().add ("NurbsSwungSurface", NurbsSwungSurface_default_));
;// ./src/x_ite/Components/NURBS/NurbsTextureCoordinate.js
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








function NurbsTextureCoordinate (executionContext)
{
   external_X_ITE_X3D_X3DNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsTextureCoordinate);

   this .array = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsTextureCoordinate .prototype, (external_X_ITE_X3D_X3DNode_default()).prototype),
{
   getControlPoints (texWeights)
   {
      const
         uDimension    = this ._uDimension .getValue (),
         vDimension    = this ._vDimension .getValue (),
         controlPoints = this ._controlPoint .getValue (),
         array         = this .array;

      for (let u = 0; u < uDimension; ++ u)
      {
         const cp = array [u] ??= [ ];

         for (let v = 0; v < vDimension; ++ v)
         {
            const
               index = v * uDimension + u,
               p     = cp [v] ?? new (external_X_ITE_X3D_Vector4_default()) (),
               i     = index * 2;

            cp [v] = p .set (controlPoints [i], controlPoints [i + 1], 0, texWeights ? texWeights [index] : 1);
         }

         cp .length = vDimension;
      }

      array .length = uDimension;

      return array;
   },
   isValid ()
   {
      if (this ._uOrder .getValue () < 2)
         return false;

      if (this ._vOrder .getValue () < 2)
         return false;

      if (this ._uDimension .getValue () < this ._uOrder .getValue ())
         return false;

      if (this ._vDimension .getValue () < this ._vOrder .getValue ())
         return false;

      if (this ._controlPoint .length < this ._uDimension .getValue () * this ._vDimension .getValue ())
         return false;

      return true;
   }
});

Object .defineProperties (NurbsTextureCoordinate,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsTextureCoordinate", "NURBS", 1, "texCoord", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uOrder",       new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vOrder",       new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uDimension",   new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vDimension",   new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uKnot",        new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vKnot",        new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",       new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint", new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
      ]),
      enumerable: true,
   },
});

const NurbsTextureCoordinate_default_ = NurbsTextureCoordinate;
;

/* harmony default export */ const NURBS_NurbsTextureCoordinate = (external_X_ITE_X3D_Namespace_default().add ("NurbsTextureCoordinate", NurbsTextureCoordinate_default_));
;// ./src/standard/Math/Geometry/Triangle2.js
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



const Triangle2 =
{
   /**
    *
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triangle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   area ({ x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy })
   {
      return Math .abs (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) / 2;
   },
   /**
    *
    * @param {Vector2} p point to test
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triagle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   isPointInTriangle ({ x: px, y: py }, { x: ax, y: ay }, { x: bx, y: by }, { x: cx, y: cy })
   {
      // https://en.wikipedia.org/wiki/Barycentric_coordinate_system

      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);

      if (det === 0)
         return false;

      const u = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / det;

      if (u < 0 || u > 1)
         return false;

      const v = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / det;

      if (v < 0 || v > 1)
         return false;

      const t = 1 - u - v;

      if (t < 0 || t > 1)
         return false;

      return true;
   },
   /**
    *
    * @param {Vector2} p point to convert
    * @param {Vector2} a first point of triangle
    * @param {Vector2} b second point of triangle
    * @param {Vector2} c third point of triangle
    * @returns
    */
   toBarycentric: (function ()
   {
      const
         v0 = new (external_X_ITE_X3D_Vector2_default()) (),
         v1 = new (external_X_ITE_X3D_Vector2_default()) (),
         v2 = new (external_X_ITE_X3D_Vector2_default()) ();

      return function (point, a, b, c, result)
      {
         v0 .assign (b) .subtract (a);
         v1 .assign (c) .subtract (a);
         v2 .assign (point) .subtract (a);

         const
            d00   = v0 .dot (v0),
            d01   = v0 .dot (v1),
            d11   = v1 .dot (v1),
            d20   = v2 .dot (v0),
            d21   = v2 .dot (v1),
            denom = d00 * d11 - d01 * d01;

         result .v = (d11 * d20 - d01 * d21) / denom;
         result .t = (d00 * d21 - d01 * d20) / denom;
         result .u = 1 - result .v - result .t;

         return result;
      };
   })(),
};

const Triangle2_default_ = Triangle2;
;

/* harmony default export */ const Geometry_Triangle2 = (external_X_ITE_X3D_Namespace_default().add ("Triangle2", Triangle2_default_));
;// external "__X_ITE_X3D__ .libtess"
const external_X_ITE_X3D_libtess_namespaceObject = __X_ITE_X3D__ .libtess;
var external_X_ITE_X3D_libtess_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_libtess_namespaceObject);
;// ./src/x_ite/Components/NURBS/NurbsTrimmedSurface.js
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













function NurbsTrimmedSurface (executionContext)
{
   NURBS_X3DNurbsSurfaceGeometryNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).NurbsTrimmedSurface);

   this .trimmingContourNodes = [ ];
   this .trimmingContours     = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsTrimmedSurface .prototype, NURBS_X3DNurbsSurfaceGeometryNode .prototype),
{
   initialize ()
   {
      NURBS_X3DNurbsSurfaceGeometryNode .prototype .initialize .call (this);

      this ._addTrimmingContour    .addInterest ("set_addTrimmingContour__",    this);
      this ._removeTrimmingContour .addInterest ("set_removeTrimmingContour__", this);
      this ._trimmingContour       .addInterest ("set_trimmingContour__",       this);

      this .set_trimmingContour__ ();
   },
   set_addTrimmingContour__ ()
   {
      this ._addTrimmingContour .setTainted (true);
      this ._addTrimmingContour .assign (NurbsTrimmedSurface_filter (this ._addTrimmingContour, this ._trimmingContour), this ._addTrimmingContour .length);

      for (const trimmingContour of this ._addTrimmingContour)
         this ._trimmingContour .push (trimmingContour);

      this ._addTrimmingContour .length = 0;
      this ._addTrimmingContour .setTainted (false);
   },
   set_removeTrimmingContour__ ()
   {
      this ._removeTrimmingContour .setTainted (true);
      this ._trimmingContour .assign (NurbsTrimmedSurface_filter (this ._trimmingContour, this ._removeTrimmingContour));

      this ._removeTrimmingContour .length = 0;
      this ._removeTrimmingContour .setTainted (false);
   },
   set_trimmingContour__ ()
   {
      const trimmingContourNodes = this .trimmingContourNodes;

      for (const trimmingContourNode of trimmingContourNodes)
         trimmingContourNode .removeInterest ("requestRebuild", this);

      trimmingContourNodes .length = 0;

      for (const node of this ._trimmingContour)
      {
         const trimmingContourNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).Contour2D, node);

         if (trimmingContourNode)
            trimmingContourNodes .push (trimmingContourNode);
      }

      for (const trimmingContourNode of trimmingContourNodes)
         trimmingContourNode .addInterest ("requestRebuild", this);
   },
   getTrimmingContours (offset, scale, trimmingContours)
   {
      for (const trimmingContourNode of this .trimmingContourNodes)
         trimmingContourNode .addTrimmingContour (offset, scale, trimmingContours);

      return trimmingContours;
   },
   trimSurface: (() =>
   {
      const unitSquare = [
         new (external_X_ITE_X3D_Vector3_default()) (0, 0, 0),
         new (external_X_ITE_X3D_Vector3_default()) (1, 0, 0),
         new (external_X_ITE_X3D_Vector3_default()) (1, 1, 0),
         new (external_X_ITE_X3D_Vector3_default()) (0, 1, 0),
      ];

      return function (uKnots, vKnots)
      {
         // console .time (this .getTypeName ());

         const
            uMin   = uKnots .at (0),
            vMin   = vKnots .at (0),
            uMax   = uKnots .at (-1),
            vMax   = vKnots .at (-1),
            uScale = uMax - uMin,
            vScale = vMax - vMin,
            offset = new (external_X_ITE_X3D_Vector3_default()) (uMin, vMin, 0),
            scale  = new (external_X_ITE_X3D_Vector3_default()) (uScale, vScale, 1)

         // Triangulate holes on unit square.

         const
            defaultTriangles     = this .createDefaultNurbsTriangles ([ ]),
            numDefaultTriangles  = defaultTriangles .length,
            trimmingContours     = this .getTrimmingContours (offset, scale, [unitSquare]),
            trimmingTriangles    = this .triangulatePolygon (trimmingContours, [ ], false),
            numTrimmingTriangles = trimmingTriangles .length,
            contours             = [ ];

         // Do nothing if there are no trimming contours.
         if (trimmingContours .length === 1)
            return;

         for (let i = 0; i < numDefaultTriangles; ++ i)
            defaultTriangles [i] .index = i;

         for (let i = 0; i < numDefaultTriangles; i += 3)
            contours .push (defaultTriangles .slice (i, i + 3));

         for (let i = 0; i < numTrimmingTriangles; i += 3)
            contours .push (trimmingTriangles .slice (i, i + 3));

         const
            multiTexCoordArray    = this .getMultiTexCoords (),
            normalArray           = this .getNormals (),
            vertexArray           = this .getVertices (),
            trimmedTriangles      = this .triangulatePolygon (contours, [ ], true),
            numTrimmedTriangles   = trimmedTriangles .length,
            numTexCoordChannels   = multiTexCoordArray .length,
            trimmedMultiTexCoords = multiTexCoordArray .map (() => [ ]),
            trimmedNormals        = [ ],
            trimmedVertices       = [ ],
            uvt                   = { };

         // console .log (trimmedTriangles .toString ());

         // Filter triangles with very small area.

         const MIN_AREA = 1e-6;

         let f = 0;

         for (let t = 0; t < numTrimmedTriangles; t += 3)
         {
            const { [t]: a, [t + 1]: b, [t + 2]: c } = trimmedTriangles;

            if (Geometry_Triangle2 .area (a, b, c) < MIN_AREA)
               continue;

            trimmedTriangles [f ++] = a,
            trimmedTriangles [f ++] = b,
            trimmedTriangles [f ++] = c;
         }

         trimmedTriangles .length = f;

         // Find points in defaultTriangles and interpolate new points.

         const MIN_BARYCENTRIC_DISTANCE = 1e-5;

         FIND_POINTS: for (let t = 0; t < f; ++ t)
         {
            const p = trimmedTriangles [t];

            if (p .hasOwnProperty ("index"))
            {
               const
                  d  = p .index,
                  d3 = d * 3,
                  d4 = d * 4;

               // Copy point on surface.

               for (let tc = 0; tc < numTexCoordChannels; ++ tc)
               {
                  const
                     texCoordArray    = multiTexCoordArray [tc],
                     trimmedTexCoords = trimmedMultiTexCoords [tc];

                  const { [d4]: t1, [d4 + 1]: t2, [d4 + 2]: t3, [d4 + 3]: t4 } = texCoordArray;

                  trimmedTexCoords .push (t1, t2, t3, t4);
               }

               const
                  { [d3]: n1, [d3 + 1]: n2, [d3 + 2]: n3 } = normalArray,
                  { [d4]: v1, [d4 + 1]: v2, [d4 + 2]: v3 } = vertexArray;

               trimmedNormals  .push (n1, n2, n3);
               trimmedVertices .push (v1, v2, v3, 1);

               continue FIND_POINTS;
            }

            for (let d = 0; d < numDefaultTriangles; d += 3)
            {
               // At least one triangle should match.

               const { [d]: a, [d + 1]: b, [d + 2]: c } = defaultTriangles;

               const { u, v, t } = Geometry_Triangle2 .toBarycentric (p, a, b, c, uvt);

               // Check if p lies in triangle.

               if (Math .abs (u - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
                  continue;

               if (Math .abs (v - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
                  continue;

               if (Math .abs (t - 0.5) > 0.5 + MIN_BARYCENTRIC_DISTANCE)
                  continue;

               // Interpolate point on surface.

               const
                  d3 = d * 3,
                  d4 = d * 4;

               for (let tc = 0; tc < numTexCoordChannels; ++ tc)
               {
                  const
                     texCoordArray    = multiTexCoordArray [tc],
                     trimmedTexCoords = trimmedMultiTexCoords [tc];

                  trimmedTexCoords .push (
                     u * texCoordArray [d4 + 0] + v * texCoordArray [d4 + 4] + t * texCoordArray [d4 + 8],
                     u * texCoordArray [d4 + 1] + v * texCoordArray [d4 + 5] + t * texCoordArray [d4 + 9],
                     u * texCoordArray [d4 + 2] + v * texCoordArray [d4 + 6] + t * texCoordArray [d4 + 10],
                     u * texCoordArray [d4 + 3] + v * texCoordArray [d4 + 7] + t * texCoordArray [d4 + 11],
                  );
               }

               trimmedNormals .push (
                  u * normalArray [d3 + 0] + v * normalArray [d3 + 3] + t * normalArray [d3 + 6],
                  u * normalArray [d3 + 1] + v * normalArray [d3 + 4] + t * normalArray [d3 + 7],
                  u * normalArray [d3 + 2] + v * normalArray [d3 + 5] + t * normalArray [d3 + 8],
               );

               trimmedVertices .push (
                  u * vertexArray [d4 + 0] + v * vertexArray [d4 + 4] + t * vertexArray [d4 + 8],
                  u * vertexArray [d4 + 1] + v * vertexArray [d4 + 5] + t * vertexArray [d4 + 9],
                  u * vertexArray [d4 + 2] + v * vertexArray [d4 + 6] + t * vertexArray [d4 + 10],
                  1,
               );

               continue FIND_POINTS;
            }

            // Point not found, discard triangle.

            const n = t % 3;

            for (const trimmedTexCoords of trimmedMultiTexCoords)
               trimmedTexCoords .length -= n * 4;

            trimmedNormals  .length -= n * 3;
            trimmedVertices .length -= n * 4;

            t += 2 - n;
         }

         for (let tc = 0; tc < numTexCoordChannels; ++ tc)
            multiTexCoordArray [tc] .assign (trimmedMultiTexCoords [tc]);

         normalArray .assign (trimmedNormals);
         vertexArray .assign (trimmedVertices);

         // console .timeEnd (this .getTypeName ());
      };
   })(),
   createDefaultNurbsTriangles (triangles)
   {
      // Create triangles in the unit square.

      const
         texCoordArray = this .createDefaultNurbsTexCoords ([ ]),
         numTexCoords  = texCoordArray .length;

      for (let i = 0; i < numTexCoords; i += 4)
         triangles .push (new (external_X_ITE_X3D_Vector3_default()) (texCoordArray [i], texCoordArray [i + 1], 0));

      return triangles;
   },
   triangulatePolygon: (() =>
   {
      // Function called for each vertex of tessellator output.

      function vertexCallback (point, triangles)
      {
         triangles .push (point);
      }

      function combineCallback (coords, data, weight)
      {
         return new (external_X_ITE_X3D_Vector3_default()) (... coords);
      }

      function combineCallbackIndex (coords, [a, b, c, d], weight)
      {
         if (!c && a .x === b .x && a .y === b .y)
            return a;

         return new (external_X_ITE_X3D_Vector3_default()) (... coords);
      }

      const tessy = new (external_X_ITE_X3D_libtess_default()).GluTesselator ();

      tessy .gluTessCallback ((external_X_ITE_X3D_libtess_default()).gluEnum .GLU_TESS_VERTEX_DATA,  vertexCallback);
      tessy .gluTessCallback ((external_X_ITE_X3D_libtess_default()).gluEnum .GLU_TESS_COMBINE,      combineCallback);
      tessy .gluTessProperty ((external_X_ITE_X3D_libtess_default()).gluEnum .GLU_TESS_WINDING_RULE, (external_X_ITE_X3D_libtess_default()).windingRule .GLU_TESS_WINDING_ODD);
      tessy .gluTessNormal (0, 0, 1);

      return function (contours, triangles, index)
      {
         tessy .gluTessCallback ((external_X_ITE_X3D_libtess_default()).gluEnum .GLU_TESS_COMBINE, index ? combineCallbackIndex : combineCallback);

         tessy .gluTessBeginPolygon (triangles);

         for (const points of contours)
         {
            tessy .gluTessBeginContour ();

            for (const point of points)
               tessy .gluTessVertex (point, point);

            tessy .gluTessEndContour ();
         }

         tessy .gluTessEndPolygon ();

         return triangles;
      };
   })(),
});

function NurbsTrimmedSurface_filter (array, remove)
{
   const set = new Set (remove);

   return array .filter (value => !set .has (value));
}

Object .defineProperties (NurbsTrimmedSurface,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("NurbsTrimmedSurface", "NURBS", 4, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",              new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "uTessellation",         new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "vTessellation",         new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",                 new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uClosed",               new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vClosed",               new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uOrder",                new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vOrder",                new (external_X_ITE_X3D_Fields_default()).SFInt32 (3)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uDimension",            new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vDimension",            new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "uKnot",                 new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "vKnot",                 new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "weight",                new (external_X_ITE_X3D_Fields_default()).MFDouble ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texCoord",              new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "controlPoint",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addTrimmingContour",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeTrimmingContour", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "trimmingContour",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const NurbsTrimmedSurface_default_ = NurbsTrimmedSurface;
;

/* harmony default export */ const NURBS_NurbsTrimmedSurface = (external_X_ITE_X3D_Namespace_default().add ("NurbsTrimmedSurface", NurbsTrimmedSurface_default_));
;// ./src/assets/components/NURBSComponent.js
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



















external_X_ITE_X3D_Components_default().add ({
   name: "NURBS",
   concreteNodes:
   [
      NURBS_Contour2D,
      NURBS_ContourPolyline2D,
      NURBS_NurbsCurve,
      NURBS_NurbsCurve2D,
      NURBS_NurbsOrientationInterpolator,
      NURBS_NurbsPatchSurface,
      NURBS_NurbsPositionInterpolator,
      NURBS_NurbsSet,
      NURBS_NurbsSurfaceInterpolator,
      NURBS_NurbsSweptSurface,
      NURBS_NurbsSwungSurface,
      NURBS_NurbsTextureCoordinate,
      NURBS_NurbsTrimmedSurface,
   ],
   abstractNodes:
   [
      NURBS_X3DNurbsControlCurveNode,
      NURBS_X3DNurbsSurfaceGeometryNode,
      NURBS_X3DParametricGeometryNode,
   ],
});

const NURBSComponent_default_ = undefined;
;

/* harmony default export */ const NURBSComponent = (external_X_ITE_X3D_Namespace_default().add ("NURBSComponent", NURBSComponent_default_));
/******/ })()
;