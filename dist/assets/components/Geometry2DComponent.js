/* X_ITE v10.5.1 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-10.5.1")];
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

;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Components"
const external_X_ITE_X3D_Components_namespaceObject = __X_ITE_X3D__ .Components;
var external_X_ITE_X3D_Components_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Components_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DBaseNode"
const external_X_ITE_X3D_X3DBaseNode_namespaceObject = __X_ITE_X3D__ .X3DBaseNode;
var external_X_ITE_X3D_X3DBaseNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DBaseNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Fields"
const external_X_ITE_X3D_Fields_namespaceObject = __X_ITE_X3D__ .Fields;
var external_X_ITE_X3D_Fields_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Fields_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/Arc2DOptions.js
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





function Arc2DOptions (executionContext)
{
   external_X_ITE_X3D_X3DBaseNode_default().call (this, executionContext);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "dimension", new (external_X_ITE_X3D_Fields_default()).SFInt32 (40))
}

Object .setPrototypeOf (Arc2DOptions .prototype, (external_X_ITE_X3D_X3DBaseNode_default()).prototype);

Object .defineProperties (Arc2DOptions,
{
   typeName:
   {
      value: "Arc2DOptions",
      enumerable: true,
   },
});

const __default__ = Arc2DOptions;
;

/* harmony default export */ const Geometry2D_Arc2DOptions = (external_X_ITE_X3D_Namespace_default().add ("Arc2DOptions", __default__));
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/ArcClose2DOptions.js
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





function ArcClose2DOptions (executionContext)
{
   external_X_ITE_X3D_X3DBaseNode_default().call (this, executionContext);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "dimension", new (external_X_ITE_X3D_Fields_default()).SFInt32 (40))
}

Object .setPrototypeOf (ArcClose2DOptions .prototype, (external_X_ITE_X3D_X3DBaseNode_default()).prototype);

Object .defineProperties (ArcClose2DOptions,
{
   typeName:
   {
      value: "ArcClose2DOptions",
      enumerable: true,
   },
});

const ArcClose2DOptions_default_ = ArcClose2DOptions;
;

/* harmony default export */ const Geometry2D_ArcClose2DOptions = (external_X_ITE_X3D_Namespace_default().add ("ArcClose2DOptions", ArcClose2DOptions_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DGeometryNode"
const external_X_ITE_X3D_X3DGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DGeometryNode;
var external_X_ITE_X3D_X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGeometryNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Complex"
const external_X_ITE_X3D_Complex_namespaceObject = __X_ITE_X3D__ .Complex;
var external_X_ITE_X3D_Complex_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Complex_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/Circle2DOptions.js
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







function Circle2DOptions (executionContext)
{
   external_X_ITE_X3D_X3DBaseNode_default().call (this, executionContext);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "dimension", new (external_X_ITE_X3D_Fields_default()).SFInt32 (40))

   this .vertices = external_X_ITE_X3D_X3DGeometryNode_default().createArray ();
}

Object .assign (Object .setPrototypeOf (Circle2DOptions .prototype, (external_X_ITE_X3D_X3DBaseNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DBaseNode_default().prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getVertices ()
   {
      if (!this .vertices .length)
         this .build ();

      return this .vertices;
   },
   build ()
   {
      const
         dimension = this ._dimension .getValue (),
         angle     = Math .PI * 2 / dimension,
         vertices  = this .vertices;

      for (let n = 0; n < dimension; ++ n)
      {
         const
            point1 = external_X_ITE_X3D_Complex_default().Polar (1, angle * n),
            point2 = external_X_ITE_X3D_Complex_default().Polar (1, angle * (n + 1));

         vertices .push (point1 .real, point1 .imag, 0, 1);
         vertices .push (point2 .real, point2 .imag, 0, 1);
      }

      vertices .shrinkToFit ();
   },
   eventsProcessed ()
   {
      this .vertices .length = 0;
   },
});

Object .defineProperties (Circle2DOptions,
{
   typeName:
   {
      value: "Circle2DOptions",
      enumerable: true,
   },
});

const Circle2DOptions_default_ = Circle2DOptions;
;

/* harmony default export */ const Geometry2D_Circle2DOptions = (external_X_ITE_X3D_Namespace_default().add ("Circle2DOptions", Circle2DOptions_default_));
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/Disk2DOptions.js
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







function Disk2DOptions (executionContext)
{
   external_X_ITE_X3D_X3DBaseNode_default().call (this, executionContext);

   this .addChildObjects ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "dimension", new (external_X_ITE_X3D_Fields_default()).SFInt32 (40))

   this .circleVertices = external_X_ITE_X3D_X3DGeometryNode_default().createArray ();
   this .diskTexCoords  = external_X_ITE_X3D_X3DGeometryNode_default().createArray ();
   this .diskNormals    = external_X_ITE_X3D_X3DGeometryNode_default().createArray ();
   this .diskVertices   = external_X_ITE_X3D_X3DGeometryNode_default().createArray ();
}

Object .assign (Object .setPrototypeOf (Disk2DOptions .prototype, (external_X_ITE_X3D_X3DBaseNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DBaseNode_default().prototype .initialize .call (this);

      this .addInterest ("eventsProcessed", this);
   },
   getCircleVertices ()
   {
      if (!this .circleVertices .length)
         this .build ();

      return this .circleVertices;
   },
   getDiskTexCoords ()
   {
      if (!this .diskTexCoords .length)
         this .build ();

      return this .diskTexCoords;
   },
   getDiskNormals ()
   {
      if (!this .diskNormals .length)
         this .build ();

      return this .diskNormals;
   },
   getDiskVertices ()
   {
      if (!this .diskVertices .length)
         this .build ();

      return this .diskVertices;
   },
   build: (() =>
   {
      const
         half      = new (external_X_ITE_X3D_Complex_default()) (0.5, 0.5),
         texCoord1 = new (external_X_ITE_X3D_Complex_default()) (),
         texCoord2 = new (external_X_ITE_X3D_Complex_default()) (),
         point1    = new (external_X_ITE_X3D_Complex_default()) (),
         point2    = new (external_X_ITE_X3D_Complex_default()) ();

      return function ()
      {
         const
            dimension      = this ._dimension .getValue (),
            angle          = Math .PI * 2 / dimension,
            circleVertices = this .circleVertices,
            diskTexCoords  = this .diskTexCoords,
            diskNormals    = this .diskNormals,
            diskVertices   = this .diskVertices;

         for (let n = 0; n < dimension; ++ n)
         {
            const
               theta1 = angle * n,
               theta2 = angle * (n + 1);

            texCoord1 .setPolar (0.5, theta1) .add (half);
            texCoord2 .setPolar (0.5, theta2) .add (half);
            point1    .setPolar (1, theta1);
            point2    .setPolar (1, theta2);

            // Circle

            circleVertices .push (point1 .real, point1 .imag, 0, 1);
            circleVertices .push (point2 .real, point2 .imag, 0, 1);

            // Disk

            diskTexCoords .push (0.5, 0.5, 0, 1,
                                 texCoord1 .real, texCoord1 .imag, 0, 1,
                                 texCoord2 .real, texCoord2 .imag, 0, 1);

            diskNormals .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

            diskVertices .push (0, 0, 0, 1,
                                point1 .real, point1 .imag, 0, 1,
                                point2 .real, point2 .imag, 0, 1);
         }

         circleVertices .shrinkToFit ();
         diskTexCoords  .shrinkToFit ();
         diskNormals    .shrinkToFit ();
         diskVertices   .shrinkToFit ();
      };
   })(),
   eventsProcessed ()
   {
      this .circleVertices .length = 0;
      this .diskTexCoords  .length = 0;
      this .diskNormals    .length = 0;
      this .diskVertices   .length = 0;
   },
});

Object .defineProperties (Disk2DOptions,
{
   typeName:
   {
      value: "Disk2DOptions",
      enumerable: true,
   },
});

const Disk2DOptions_default_ = Disk2DOptions;
;

/* harmony default export */ const Geometry2D_Disk2DOptions = (external_X_ITE_X3D_Namespace_default().add ("Disk2DOptions", Disk2DOptions_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .IndexedFaceSet"
const external_X_ITE_X3D_IndexedFaceSet_namespaceObject = __X_ITE_X3D__ .IndexedFaceSet;
var external_X_ITE_X3D_IndexedFaceSet_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_IndexedFaceSet_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Coordinate"
const external_X_ITE_X3D_Coordinate_namespaceObject = __X_ITE_X3D__ .Coordinate;
var external_X_ITE_X3D_Coordinate_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Coordinate_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .TextureCoordinate"
const external_X_ITE_X3D_TextureCoordinate_namespaceObject = __X_ITE_X3D__ .TextureCoordinate;
var external_X_ITE_X3D_TextureCoordinate_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextureCoordinate_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/Rectangle2DOptions.js
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






function Rectangle2DOptions (executionContext)
{
   external_X_ITE_X3D_X3DBaseNode_default().call (this, executionContext);
}

Object .assign (Object .setPrototypeOf (Rectangle2DOptions .prototype, (external_X_ITE_X3D_X3DBaseNode_default()).prototype),
{
   getGeometry ()
   {
      if (this .geometry)
         return this .geometry;

      this .geometry            = new (external_X_ITE_X3D_IndexedFaceSet_default()) (this .getExecutionContext ());
      this .geometry ._texCoord = new (external_X_ITE_X3D_TextureCoordinate_default()) (this .getExecutionContext ());
      this .geometry ._coord    = new (external_X_ITE_X3D_Coordinate_default()) (this .getExecutionContext ());

      const
         geometry = this .geometry,
         texCoord = this .geometry ._texCoord .getValue (),
         coord    = this .geometry ._coord .getValue ();

      texCoord ._point = [1, 1, 0, 1, 0, 0, 1, 0];
      coord    ._point = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0];

      geometry ._coordIndex = [0, 1, 2, 3, -1];

      texCoord .setup ();
      coord    .setup ();
      geometry .setup ();

      return this .geometry;
   },
});

Object .defineProperties (Rectangle2DOptions,
{
   typeName:
   {
      value: "Rectangle2DOptions",
      enumerable: true,
   },
});

const Rectangle2DOptions_default_ = Rectangle2DOptions;
;

/* harmony default export */ const Geometry2D_Rectangle2DOptions = (external_X_ITE_X3D_Namespace_default().add ("Rectangle2DOptions", Rectangle2DOptions_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .PrimitiveQuality"
const external_X_ITE_X3D_PrimitiveQuality_namespaceObject = __X_ITE_X3D__ .PrimitiveQuality;
var external_X_ITE_X3D_PrimitiveQuality_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_PrimitiveQuality_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Geometry2D/X3DGeometry2DContext.js
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








function X3DGeometry2DContext () { }

Object .assign (X3DGeometry2DContext .prototype,
{
   initialize ()
   {
      this .setPrimitiveQuality2D (this .getBrowserOptions () .getPrimitiveQuality ());
   },
   getArc2DOptions ()
   {
      return getOptionNode .call (this, "getArc2DOptions", Geometry2D_Arc2DOptions);
   },
   getArcClose2DOptions ()
   {
      return getOptionNode .call (this, "getArcClose2DOptions", Geometry2D_ArcClose2DOptions);
   },
   getCircle2DOptions ()
   {
      return getOptionNode .call (this, "getCircle2DOptions", Geometry2D_Circle2DOptions);
   },
   getDisk2DOptions ()
   {
      return getOptionNode .call (this, "getDisk2DOptions", Geometry2D_Disk2DOptions);
   },
   getRectangle2DOptions ()
   {
      return getOptionNode .call (this, "getRectangle2DOptions", Geometry2D_Rectangle2DOptions);
   },
   setPrimitiveQuality2D (primitiveQuality)
   {
      const
         arc      = this .getArc2DOptions (),
         arcClose = this .getArcClose2DOptions (),
         circle   = this .getCircle2DOptions (),
         disk     = this .getDisk2DOptions ();

      switch (primitiveQuality)
      {
         case (external_X_ITE_X3D_PrimitiveQuality_default()).LOW:
         {
            arc      ._dimension = 20;
            arcClose ._dimension = 20;
            circle   ._dimension = 20;
            disk     ._dimension = 20;
            break;
         }
         case (external_X_ITE_X3D_PrimitiveQuality_default()).MEDIUM:
         {
            arc      ._dimension = 40;
            arcClose ._dimension = 40;
            circle   ._dimension = 40;
            disk     ._dimension = 40;
            break;
         }
         case (external_X_ITE_X3D_PrimitiveQuality_default()).HIGH:
         {
            arc      ._dimension = 80;
            arcClose ._dimension = 80;
            circle   ._dimension = 80;
            disk     ._dimension = 80;
            break;
         }
      }
   },
});

function getOptionNode (key, OptionNode)
{
   const optionNode = new OptionNode (this .getPrivateScene ());

   optionNode .setup ();

   this [key] = function () { return optionNode; };

   Object .defineProperty (this, key, { enumerable: false });

   return optionNode;
}

const X3DGeometry2DContext_default_ = X3DGeometry2DContext;
;

/* harmony default export */ const Geometry2D_X3DGeometry2DContext = (external_X_ITE_X3D_Namespace_default().add ("X3DGeometry2DContext", X3DGeometry2DContext_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DFieldDefinition"
const external_X_ITE_X3D_X3DFieldDefinition_namespaceObject = __X_ITE_X3D__ .X3DFieldDefinition;
var external_X_ITE_X3D_X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .FieldDefinitionArray"
const external_X_ITE_X3D_FieldDefinitionArray_namespaceObject = __X_ITE_X3D__ .FieldDefinitionArray;
var external_X_ITE_X3D_FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DNode"
const external_X_ITE_X3D_X3DNode_namespaceObject = __X_ITE_X3D__ .X3DNode;
var external_X_ITE_X3D_X3DNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DLineGeometryNode"
const external_X_ITE_X3D_X3DLineGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DLineGeometryNode;
var external_X_ITE_X3D_X3DLineGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DLineGeometryNode_namespaceObject);
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Arc2D.js
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










function Arc2D (executionContext)
{
   external_X_ITE_X3D_X3DLineGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Arc2D);

   this ._startAngle .setUnit ("angle");
   this ._endAngle   .setUnit ("angle");
   this ._radius     .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Arc2D .prototype, (external_X_ITE_X3D_X3DLineGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      external_X_ITE_X3D_X3DLineGeometryNode_default().prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getArc2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getArc2DOptions () .removeInterest ("requestRebuild", this);
   },
   getSweepAngle ()
   {
      const
         start = external_X_ITE_X3D_Algorithm_default().interval (this ._startAngle .getValue (), 0, Math .PI * 2),
         end   = external_X_ITE_X3D_Algorithm_default().interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

      if (start === end)
         return Math .PI * 2;

      const sweepAngle = Math .abs (end - start);

      if (start > end)
         return (Math .PI * 2) - sweepAngle;

      if (! isNaN (sweepAngle))
         return sweepAngle;

      // We must test for NAN, as NAN to int is undefined.
      return 0;
   },
   build ()
   {
      const
         options     = this .getBrowser () .getArc2DOptions (),
         dimension   = options ._dimension .getValue (),
         startAngle  = this ._startAngle .getValue  (),
         radius      = Math .abs (this ._radius .getValue ()),
         sweepAngle  = this .getSweepAngle (),
         steps       = Math .max (3, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
         vertexArray = this .getVertices ();

      for (let n = 0; n < steps; ++ n)
      {
         const
            t1     = n / steps,
            theta1 = startAngle + (sweepAngle * t1),
            point1 = external_X_ITE_X3D_Complex_default().Polar (radius, theta1),
            t2     = (n + 1) / steps,
            theta2 = startAngle + (sweepAngle * t2),
            point2 = external_X_ITE_X3D_Complex_default().Polar (radius, theta2);

         vertexArray .push (point1 .real, point1 .imag, 0, 1);
         vertexArray .push (point2 .real, point2 .imag, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Arc2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Arc2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",   new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "startAngle", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "endAngle",   new (external_X_ITE_X3D_Fields_default()).SFFloat (1.570796)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "radius",     new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
      ]),
      enumerable: true,
   },
});

const Arc2D_default_ = Arc2D;
;

/* harmony default export */ const Geometry2D_Arc2D = (external_X_ITE_X3D_Namespace_default().add ("Arc2D", Arc2D_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/ArcClose2D.js
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










function ArcClose2D (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ArcClose2D);

   this .setGeometryType (2);

   this ._startAngle .setUnit ("angle");
   this ._endAngle   .setUnit ("angle");
   this ._radius     .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ArcClose2D .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getArcClose2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getArcClose2DOptions () .removeInterest ("requestRebuild", this);
   },
   getSweepAngle ()
   {
      const
         start = external_X_ITE_X3D_Algorithm_default().interval (this ._startAngle .getValue (), 0, Math .PI * 2),
         end   = external_X_ITE_X3D_Algorithm_default().interval (this ._endAngle   .getValue (), 0, Math .PI * 2);

      if (start === end)
         return Math .PI * 2;

      const sweepAngle = Math .abs (end - start);

      if (start > end)
         return (Math .PI * 2) - sweepAngle;

      if (! isNaN (sweepAngle))
         return sweepAngle;

      // We must test for NAN, as NAN to int is undefined.
      return 0;
   },
   build: (() =>
   {
      const half = new (external_X_ITE_X3D_Complex_default()) (0.5, 0.5);

      return function ()
      {
         const
            options       = this .getBrowser () .getArcClose2DOptions (),
            chord         = this ._closureType .getValue () === "CHORD",
            dimension     = options ._dimension .getValue (),
            startAngle    = this ._startAngle .getValue  (),
            radius        = Math .abs (this ._radius .getValue ()),
            sweepAngle    = this .getSweepAngle (),
            steps         = Math .max (4, Math .floor (sweepAngle * dimension / (Math .PI * 2))),
            texCoordArray = this .getTexCoords (),
            normalArray   = this .getNormals (),
            vertexArray   = this .getVertices (),
            texCoords     = [ ],
            points        = [ ];

         this .getMultiTexCoords () .push (texCoordArray);

         const steps_1 = steps - 1;

         for (let n = 0; n < steps; ++ n)
         {
            const
               t     = n / steps_1,
               theta = startAngle + (sweepAngle * t);

            texCoords .push (external_X_ITE_X3D_Complex_default().Polar (0.5, theta) .add (half));
            points    .push (external_X_ITE_X3D_Complex_default().Polar (radius, theta));
         }

         if (chord)
         {
            const
               t0 = texCoords [0],
               p0 = points [0];

            for (let i = 1; i < steps_1; ++ i)
            {
               const
                  t1 = texCoords [i],
                  t2 = texCoords [i + 1],
                  p1 = points [i],
                  p2 = points [i + 1];

               texCoordArray .push (t0 .real, t0 .imag, 0, 1,
                                    t1 .real, t1 .imag, 0, 1,
                                    t2 .real, t2 .imag, 0, 1);

               normalArray .push (0, 0, 1,
                                  0, 0, 1,
                                  0, 0, 1);

               vertexArray .push (p0 .real, p0 .imag, 0, 1,
                                  p1 .real, p1 .imag, 0, 1,
                                  p2 .real, p2 .imag, 0, 1);
            }
         }
         else
         {
            for (let i = 0; i < steps_1; ++ i)
            {
               const
                  t1 = texCoords [i],
                  t2 = texCoords [i + 1],
                  p1 = points [i],
                  p2 = points [i + 1];

               texCoordArray .push (0.5, 0.5, 0, 1,
                                    t1 .real, t1 .imag, 0, 1,
                                    t2 .real, t2 .imag, 0, 1);

               normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1);

               vertexArray .push (0, 0, 0, 1,
                                  p1 .real, p1 .imag, 0, 1,
                                  p2 .real, p2 .imag, 0, 1);
            }
         }

         this .getMin () .set (-radius, -radius, 0);
         this .getMax () .set ( radius,  radius, 0);

         this .setSolid (this ._solid .getValue ());
      };
   })(),
});

Object .defineProperties (ArcClose2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ArcClose2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "closureType", new (external_X_ITE_X3D_Fields_default()).SFString ("PIE")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "startAngle",  new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "endAngle",    new (external_X_ITE_X3D_Fields_default()).SFFloat (1.570796)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "radius",      new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const ArcClose2D_default_ = ArcClose2D;
;

/* harmony default export */ const Geometry2D_ArcClose2D = (external_X_ITE_X3D_Namespace_default().add ("ArcClose2D", ArcClose2D_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Circle2D.js
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








function Circle2D (executionContext)
{
   external_X_ITE_X3D_X3DLineGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Circle2D);

   this ._radius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Circle2D .prototype, (external_X_ITE_X3D_X3DLineGeometryNode_default()).prototype),
{
   set_live__ ()
   {
      external_X_ITE_X3D_X3DLineGeometryNode_default().prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getCircle2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getCircle2DOptions () .removeInterest ("requestRebuild", this);
   },
   build ()
   {
      const
         options     = this .getBrowser () .getCircle2DOptions (),
         vertexArray = this .getVertices (),
         radius      = this ._radius .getValue ();

      if (radius === 1)
      {
         vertexArray .assign (options .getVertices ());
      }
      else
      {
         const defaultVertices = options .getVertices () .getValue ();

         for (let i = 0, length = defaultVertices .length; i < length; i += 4)
            vertexArray .push (defaultVertices [i] * radius, defaultVertices [i + 1] * radius, 0, 1);
      }

      this .getMin () .set (-radius, -radius, 0);
      this .getMax () .set ( radius,  radius, 0);
   },
});

Object .defineProperties (Circle2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Circle2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "radius",   new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
      ]),
      enumerable: true,
   },
});

const Circle2D_default_ = Circle2D;
;

/* harmony default export */ const Geometry2D_Circle2D = (external_X_ITE_X3D_Namespace_default().add ("Circle2D", Circle2D_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .X3DPointGeometryNode"
const external_X_ITE_X3D_X3DPointGeometryNode_namespaceObject = __X_ITE_X3D__ .X3DPointGeometryNode;
var external_X_ITE_X3D_X3DPointGeometryNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DPointGeometryNode_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Disk2D.js
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










function Disk2D (executionContext)
{
   external_X_ITE_X3D_X3DLineGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Disk2D);

   this ._innerRadius .setUnit ("length");
   this ._outerRadius .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Disk2D .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .initialize .call (this);
   },
   set_live__ ()
   {
      external_X_ITE_X3D_X3DGeometryNode_default().prototype .set_live__ .call (this);

      const alwaysUpdate = this .isLive () && this .getBrowser () .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
         this .getBrowser () .getDisk2DOptions () .addInterest ("requestRebuild", this);
      else
         this .getBrowser () .getDisk2DOptions () .removeInterest ("requestRebuild", this);
   },
   build ()
   {
      const
         browser     = this .getBrowser (),
         gl          = browser .getContext (),
         options     = browser .getDisk2DOptions (),
         innerRadius = Math .min (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ())),
         outerRadius = Math .max (Math .abs (this ._innerRadius .getValue ()), Math .abs (this ._outerRadius .getValue ())),
         vertexArray = this .getVertices ();

      if (innerRadius === outerRadius)
      {
         // Point

         if (outerRadius === 0)
         {
            vertexArray .push (0, 0, 0, 1);

            this .getMin () .set (0, 0, 0);
            this .getMax () .set (0, 0, 0);

            this .setGeometryType (0);
            this .setPrimitiveMode (gl .POINTS);
            this .setTransparent (true);
            this .setSolid (false);
            this .setBase ((external_X_ITE_X3D_X3DPointGeometryNode_default()));
            return;
         }

         // Circle

         if (outerRadius === 1)
         {
            vertexArray .assign (options .getCircleVertices ());
         }
         else
         {
            const defaultVertices = options .getCircleVertices () .getValue ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
               vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
         }

         this .getMin () .set (-outerRadius, -outerRadius, 0);
         this .getMax () .set ( outerRadius,  outerRadius, 0);

         this .setGeometryType (1);
         this .setPrimitiveMode (gl .LINES);
         this .setTransparent (false);
         this .setSolid (false);
         this .setBase ((external_X_ITE_X3D_X3DLineGeometryNode_default()));
         return;
      }

      if (innerRadius === 0)
      {
         // Disk

         this .getMultiTexCoords () .push (options .getDiskTexCoords ());
         this .getNormals () .assign (options .getDiskNormals ());

         if (outerRadius === 1)
         {
            vertexArray .assign (options .getDiskVertices ());
         }
         else
         {
            const defaultVertices = options .getDiskVertices () .getValue ();

            for (let i = 0, length = defaultVertices .length; i < length; i += 4)
               vertexArray .push (defaultVertices [i] * outerRadius, defaultVertices [i + 1] * outerRadius, 0, 1);
         }

         this .getMin () .set (-outerRadius, -outerRadius, 0);
         this .getMax () .set ( outerRadius,  outerRadius, 0);

         this .setGeometryType (2);
         this .setPrimitiveMode (gl .TRIANGLES);
         this .setTransparent (false);
         this .setSolid (this ._solid .getValue ());
         this .setBase ((external_X_ITE_X3D_X3DGeometryNode_default()));
         return;
      }

      // Disk with hole

      const
         scale            = innerRadius / outerRadius,
         offset           = (1 - scale) / 2,
         defaultTexCoords = options .getDiskTexCoords () .getValue (),
         defaultVertices  = options .getDiskVertices () .getValue (),
         texCoordArray    = this .getTexCoords (),
         normalArray      = this .getNormals ();

      this .getMultiTexCoords () .push (texCoordArray);

      for (let i = 0, length = defaultVertices .length; i < length; i += 12)
      {
         texCoordArray .push (defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                              defaultTexCoords [i + 4], defaultTexCoords [i + 5], 0, 1,
                              defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,

                              defaultTexCoords [i + 4] * scale + offset, defaultTexCoords [i + 5] * scale + offset, 0, 1,
                              defaultTexCoords [i + 8], defaultTexCoords [i + 9], 0, 1,
                              defaultTexCoords [i + 8] * scale + offset, defaultTexCoords [i + 9] * scale + offset, 0, 1);

         normalArray .push (0, 0, 1,  0, 0, 1,  0, 0, 1,
                            0, 0, 1,  0, 0, 1,  0, 0, 1);

         vertexArray .push (defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                            defaultVertices [i + 4] * outerRadius, defaultVertices [i + 5] * outerRadius, 0, 1,
                            defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,

                            defaultVertices [i + 4] * innerRadius, defaultVertices [i + 5] * innerRadius, 0, 1,
                            defaultVertices [i + 8] * outerRadius, defaultVertices [i + 9] * outerRadius, 0, 1,
                            defaultVertices [i + 8] * innerRadius, defaultVertices [i + 9] * innerRadius, 0, 1);
      }

      this .getMin () .set (-outerRadius, -outerRadius, 0);
      this .getMax () .set ( outerRadius,  outerRadius, 0);

      this .setGeometryType (2);
      this .setPrimitiveMode (gl .TRIANGLES);
      this .setTransparent (false);
      this .setSolid (this ._solid .getValue ());
      this .setBase ((external_X_ITE_X3D_X3DGeometryNode_default()));
   },
   setBase (base)
   {
      this .intersectsLine         = base .prototype .intersectsLine;
      this .intersectsBox          = base .prototype .intersectsBox;
      this .generateTexCoords      = base .prototype .generateTexCoords;
      this .displaySimple          = base .prototype .displaySimple;
      this .display                = base .prototype .display;
      this .displaySimpleInstanced = base .prototype .displaySimpleInstanced;
      this .displayInstanced       = base .prototype .displayInstanced;
   },
   updateRenderFunctions ()
   { },
});

Object .defineProperties (Disk2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Disk2D", "Geometry2D", 2, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "innerRadius", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "outerRadius", new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const Disk2D_default_ = Disk2D;
;

/* harmony default export */ const Geometry2D_Disk2D = (external_X_ITE_X3D_Namespace_default().add ("Disk2D", Disk2D_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Polyline2D.js
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








function Polyline2D (executionContext)
{
   external_X_ITE_X3D_X3DLineGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Polyline2D);

   this ._lineSegments .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Polyline2D .prototype, (external_X_ITE_X3D_X3DLineGeometryNode_default()).prototype),
{
   build ()
   {
      const
         lineSegments = this ._lineSegments .getValue (),
         vertexArray  = this .getVertices ();

      for (let i = 0, length = (this ._lineSegments .length - 1) * 2; i < length; i += 2)
      {
         vertexArray .push (lineSegments [i + 0], lineSegments [i + 1], 0, 1);
         vertexArray .push (lineSegments [i + 2], lineSegments [i + 3], 0, 1);
      }
   },
});

Object .defineProperties (Polyline2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Polyline2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",     new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "lineSegments", new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
      ]),
      enumerable: true,
   },
});

const Polyline2D_default_ = Polyline2D;
;

/* harmony default export */ const Geometry2D_Polyline2D = (external_X_ITE_X3D_Namespace_default().add ("Polyline2D", Polyline2D_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Polypoint2D.js
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








function Polypoint2D (executionContext)
{
   external_X_ITE_X3D_X3DPointGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Polypoint2D);

   this ._point .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Polypoint2D .prototype, (external_X_ITE_X3D_X3DPointGeometryNode_default()).prototype),
{
   build ()
   {
      const
         point       = this ._point .getValue (),
         vertexArray = this .getVertices ();

      for (let i = 0, length = this ._point .length * 2; i < length; i += 2)
      {
         vertexArray .push (point [i], point [i + 1], 0, 1);
      }
   },
});

Object .defineProperties (Polypoint2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Polypoint2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "point",    new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
      ]),
      enumerable: true,
   },
});

const Polypoint2D_default_ = Polypoint2D;
;

/* harmony default export */ const Geometry2D_Polypoint2D = (external_X_ITE_X3D_Namespace_default().add ("Polypoint2D", Polypoint2D_default_));
;// CONCATENATED MODULE: external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/Rectangle2D.js
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









function Rectangle2D (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Rectangle2D);

   this .setGeometryType (2);

   this ._size .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (Rectangle2D .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   build: (() =>
   {
      const defaultSize = new (external_X_ITE_X3D_Vector2_default()) (2, 2);

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
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Rectangle2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "size",     new (external_X_ITE_X3D_Fields_default()).SFVec2f (2, 2)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const Rectangle2D_default_ = Rectangle2D;
;

/* harmony default export */ const Geometry2D_Rectangle2D = (external_X_ITE_X3D_Namespace_default().add ("Rectangle2D", Rectangle2D_default_));
;// CONCATENATED MODULE: ./src/x_ite/Components/Geometry2D/TriangleSet2D.js
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








function TriangleSet2D (executionContext)
{
   external_X_ITE_X3D_X3DGeometryNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).TriangleSet2D);

   this .setGeometryType (2);

   this ._vertices .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (TriangleSet2D .prototype, (external_X_ITE_X3D_X3DGeometryNode_default()).prototype),
{
   build ()
   {
      const
         vertices    = this ._vertices .getValue (),
         normalArray = this .getNormals (),
         vertexArray = this .getVertices ();

      for (let i = 0, length = this ._vertices .length * 2; i < length; i += 2)
      {
         normalArray .push (0, 0, 1);
         vertexArray .push (vertices [i], vertices [i + 1], 0, 1);
      }

      this .setSolid (this ._solid .getValue ());
   },
   generateTexCoords ()
   {
      const texCoordArray = this .getTexCoords ();

      if (texCoordArray .length === 0)
      {
         const
            p             = this .getTexCoordParams (),
            min           = p .min,
            Ssize         = p .Ssize,
            vertexArray   = this .getVertices () .getValue ();

         for (let i = 0, length = vertexArray .length; i < length; i += 4)
         {
            texCoordArray .push ((vertexArray [i]     - min [0]) / Ssize,
                                 (vertexArray [i + 1] - min [1]) / Ssize,
                                 0,
                                 1);
         }

         texCoordArray .shrinkToFit ();
      }

      this .getMultiTexCoords () .push (texCoordArray);
   },
});

Object .defineProperties (TriangleSet2D,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("TriangleSet2D", "Geometry2D", 1, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata", new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "vertices", new (external_X_ITE_X3D_Fields_default()).MFVec2f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "solid",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const TriangleSet2D_default_ = TriangleSet2D;
;

/* harmony default export */ const Geometry2D_TriangleSet2D = (external_X_ITE_X3D_Namespace_default().add ("TriangleSet2D", TriangleSet2D_default_));
;// CONCATENATED MODULE: ./src/assets/components/Geometry2DComponent.js
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
   name: "Geometry2D",
   concreteNodes:
   [
      Geometry2D_Arc2D,
      Geometry2D_ArcClose2D,
      Geometry2D_Circle2D,
      Geometry2D_Disk2D,
      Geometry2D_Polyline2D,
      Geometry2D_Polypoint2D,
      Geometry2D_Rectangle2D,
      Geometry2D_TriangleSet2D,
   ],
   abstractNodes:
   [
   ],
   browserContext: Geometry2D_X3DGeometry2DContext,
});

const Geometry2DComponent_default_ = undefined;
;

/* harmony default export */ const Geometry2DComponent = (external_X_ITE_X3D_Namespace_default().add ("Geometry2DComponent", Geometry2DComponent_default_));
/******/ })()
;