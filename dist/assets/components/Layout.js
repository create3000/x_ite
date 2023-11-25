/* X_ITE v9.1.6 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((module) => {

module.exports = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("lib/jquery");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components\")"
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/TextureProperties\")"
const TextureProperties_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Texturing/TextureProperties");
var TextureProperties_default = /*#__PURE__*/__webpack_require__.n(TextureProperties_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/ViewVolume\")"
const ViewVolume_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/ViewVolume");
var ViewVolume_default = /*#__PURE__*/__webpack_require__.n(ViewVolume_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Layout/X3DLayoutContext.js
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






const
   _screenTextureProperties = Symbol ();

function X3DLayoutContext () { }

Object .assign (X3DLayoutContext .prototype,
{
   getScreenTextureProperties ()
   {
      this [_screenTextureProperties] = new (TextureProperties_default()) (this .getPrivateScene ());

      this [_screenTextureProperties] ._boundaryModeS       = "CLAMP_TO_EDGE";
      this [_screenTextureProperties] ._boundaryModeT       = "CLAMP_TO_EDGE";
      this [_screenTextureProperties] ._boundaryModeR       = "CLAMP_TO_EDGE";
      this [_screenTextureProperties] ._minificationFilter  = "NEAREST_PIXEL";
      this [_screenTextureProperties] ._magnificationFilter = "NEAREST_PIXEL";
      this [_screenTextureProperties] ._generateMipMaps     = false;
      this [_screenTextureProperties] ._textureCompression  = "DEFAULT";

      this [_screenTextureProperties] .setup ();

      this .getScreenTextureProperties = function () { return this [_screenTextureProperties]; };

      Object .defineProperty (this, "getScreenTextureProperties", { enumerable: false });

      return this [_screenTextureProperties];
   },
   getScreenScaleMatrix: (() =>
   {
      const
         screenScale  = new (Vector3_default()) (0, 0, 0),
         screenPoint  = new (Vector3_default()) (0, 0, 0),
         screenMatrix = new (Matrix4_default()) ();

      return function (renderObject, matrix, contentScale, snap)
      {
         // throws domain error

         const
            modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
            projectionMatrix = renderObject .getProjectionMatrix () .get (),
            viewport         = renderObject .getViewVolume () .getViewport ();

         // Determine screenMatrix.
         // Same as in ScreenText.

         renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x * contentScale),
            y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y * contentScale),
            z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x * contentScale);

         screenMatrix .set (x .x, x .y, x .z, 0,
                            y .x, y .y, y .z, 0,
                            z .x, z .y, z .z, 0,
                            modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

         // Snap to whole pixel.

         if (snap)
         {
            ViewVolume_default().projectPoint ((Vector3_default()).Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            ViewVolume_default().unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .z = 0;
            screenMatrix .translate (screenPoint);
         }

         // Assign relative matrix.

         matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
      };
   })(),
});

const __default__ = X3DLayoutContext;
;

Namespace_default().add ("X3DLayoutContext", "x_ite/Browser/Layout/X3DLayoutContext", __default__);
/* harmony default export */ const Layout_X3DLayoutContext = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/X3DLayoutNode.js
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




function X3DLayoutNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DLayoutNode);
}

Object .setPrototypeOf (X3DLayoutNode .prototype, (X3DChildNode_default()).prototype);

Object .defineProperties (X3DLayoutNode,
{
   typeName:
   {
      value: "X3DLayoutNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 1 }),
      enumerable: true,
   },
});

const X3DLayoutNode_default_ = X3DLayoutNode;
;

Namespace_default().add ("X3DLayoutNode", "x_ite/Components/Layout/X3DLayoutNode", X3DLayoutNode_default_);
/* harmony default export */ const Layout_X3DLayoutNode = (X3DLayoutNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector2\")"
const Vector2_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector2");
var Vector2_default = /*#__PURE__*/__webpack_require__.n(Vector2_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/Layout.js
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












let i = 0;

const
   LEFT     = i++,
   CENTER   = i++,
   RIGHT    = i++,
   BOTTOM   = i++,
   TOP      = i++,
   WORLD    = i++,
   FRACTION = i++,
   PIXEL    = i++,
   NONE     = i++,
   STRETCH  = i++;

function Layout (executionContext)
{
   Layout_X3DLayoutNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).Layout);

   this .alignX          = CENTER;
   this .alignY          = CENTER;
   this .offsetUnitX     = WORLD;
   this .offsetUnitY     = WORLD;
   this .offsetX         = 0;
   this .offsetY         = 0;
   this .sizeUnitX       = WORLD;
   this .sizeUnitY       = WORLD;
   this .sizeX           = 1;
   this .sizeY           = 1;
   this .scaleModeX      = NONE;
   this .scaleModeY      = NONE;
   this .parent          = null;
   this .rectangleCenter = new (Vector2_default()) (0, 0);
   this .rectangleSize   = new (Vector2_default()) (0, 0);
   this .matrix          = new (Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (Layout .prototype, Layout_X3DLayoutNode .prototype),
{
   viewportPixel: new (Vector2_default()) (0, 0),
   pixelSize: new (Vector2_default()) (0, 0),
   translation: new (Vector3_default()) (0, 0, 0),
   offset: new (Vector3_default()) (0, 0, 0),
   scale: new (Vector3_default()) (1, 1, 1),
   currentTranslation: new (Vector3_default()) (0, 0, 0),
   currentRotation: new (Rotation4_default()) (),
   currentScale: new (Vector3_default()) (0, 0, 0),
   modelViewMatrix: new (Matrix4_default()) (),
   initialize ()
   {
      Layout_X3DLayoutNode .prototype .initialize .call (this);

      this ._align       .addInterest ("set_align__", this);
      this ._offsetUnits .addInterest ("set_offsetUnits__", this);
      this ._offset      .addInterest ("set_offset__", this);
      this ._sizeUnits   .addInterest ("set_sizeUnits__", this);
      this ._size        .addInterest ("set_size__", this);
      this ._scaleMode   .addInterest ("set_scaleMode__", this);

      this .set_align__ ();
      this .set_offsetUnits__ ();
      this .set_offset__ ();
      this .set_sizeUnits__ ();
      this .set_size__ ();
      this .set_scaleMode__ ();
   },
   set_align__ ()
   {
      // X

      if (this ._align .length > 0)
      {
         if (this ._align [0] === "LEFT")
            this .alignX = LEFT;

         else if (this ._align [0] === "RIGHT")
            this .alignX = RIGHT;

         else
            this .alignX = CENTER;
      }
      else
         this .alignX = CENTER;

      // Y

      if (this ._align .length > 1)
      {
         if (this ._align [1] === "BOTTOM")
            this .alignY = BOTTOM;

         else if (this ._align [1] === "TOP")
            this .alignY = TOP;

         else
            this .alignY = CENTER;
      }
      else
         this .alignY = CENTER;
   },
   set_offsetUnits__ ()
   {
      if (this ._offsetUnits .length > 0)
      {
         // X

         if (this ._offsetUnits [0] === "FRACTION")
            this .offsetUnitX = FRACTION;

         else if (this ._offsetUnits [0] === "PIXEL")
            this .offsetUnitX = PIXEL;

         else
            this .offsetUnitX = WORLD;

         // Y

         if (this ._offsetUnits .length > 1)
         {
            if (this ._offsetUnits [1] === "FRACTION")
               this .offsetUnitY = FRACTION;

            else if (this ._offsetUnits [1] === "PIXEL")
               this .offsetUnitY = PIXEL;

            else
               this .offsetUnitY = WORLD;
         }
         else
            this .offsetUnitY = this .offsetUnitX;
      }
      else
      {
         this .offsetUnitX = WORLD;
         this .offsetUnitY = WORLD;
      }
   },
   set_offset__ ()
   {
      if (this ._offset .length > 0)
      {
         // X

         this .offsetX = this ._offset [0];

         // Y

         if (this ._offset .length > 1)
            this .offsetY = this ._offset [1];

         else
            this .offsetY = offsetX;
      }
      else
      {
         this .offsetX = 0;
         this .offsetY = 0;
      }
   },
   set_sizeUnits__ ()
   {
      if (this ._sizeUnits .length > 0)
      {
         // X

         if (this ._sizeUnits [0] === "FRACTION")
            this .sizeUnitX = FRACTION;

         else if (this ._sizeUnits [0] === "PIXEL")
            this .sizeUnitX = PIXEL;

         else
            this .sizeUnitX = WORLD;

         // Y

         if (this ._sizeUnits .length > 1)
         {
            if (this ._sizeUnits [1] === "FRACTION")
               this .sizeUnitY = FRACTION;

            else if (this ._sizeUnits [1] === "PIXEL")
               this .sizeUnitY = PIXEL;

            else
               this .sizeUnitY = WORLD;
         }
         else
            this .sizeUnitY = this .sizeUnitX;
      }
      else
      {
         this .sizeUnitX = WORLD;
         this .sizeUnitY = WORLD;
      }
   },
   set_size__ ()
   {
      if (this ._size .length > 0)
      {
         // X

         this .sizeX = this ._size [0];

         // Y

         if (this ._size .length > 1)
            this .sizeY = this ._size [1];

         else
            this .sizeY = this .sizeX;
      }
      else
      {
         this .sizeX = 0;
         this .sizeY = 0;
      }
   },
   set_scaleMode__ ()
   {
      if (this ._scaleMode .length > 0)
      {
         // X

         if (this ._scaleMode [0] === "FRACTION")
            this .scaleModeX = FRACTION;

         else if (this ._scaleMode [0] === "PIXEL")
            this .scaleModeX = PIXEL;

         else if (this ._scaleMode [0] === "STRETCH")
            this .scaleModeX = STRETCH;

         else
            this .scaleModeX = NONE;

         // Y

         if (this ._scaleMode .length > 1)
         {
            if (this ._scaleMode [1] === "FRACTION")
               this .scaleModeY = FRACTION;

            else if (this ._scaleMode [1] === "PIXEL")
               this .scaleModeY = PIXEL;

            else if (this ._scaleMode [1] === "STRETCH")
               this .scaleModeY = STRETCH;

            else
               this .scaleModeY = NONE;
         }
         else
            this .scaleModeY = this .scaleModeX;
      }
      else
      {
         this .scaleModeX = NONE;
         this .scaleModeY = NONE;
      }
   },
   getRectangleCenter ()
   {
      return this .rectangleCenter;
   },
   getRectangleSize ()
   {
      return this .rectangleSize;
   },
   getAlignX ()
   {
      return this .alignX;
   },
   getAlignY ()
   {
      return this .alignY;
   },
   getOffsetUnitX ()
   {
      if (this .offsetUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitX ();

         return FRACTION;
      }

      return this .offsetUnitX;
   },
   getOffsetUnitY ()
   {
      if (this .offsetUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitY ();

         return FRACTION;
      }

      return this .offsetUnitY;
   },
   getOffsetX ()
   {
      return this .offsetX;
   },
   getOffsetY ()
   {
      return this .offsetY;
   },
   getSizeUnitX ()
   {
      if (this .sizeUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitX ();

         return FRACTION;
      }

      return this .sizeUnitX;
   },
   getSizeUnitY ()
   {
      if (this .sizeUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitY ();

         return FRACTION;
      }

      return this .sizeUnitY;
   },
   getSizeX ()
   {
      return this .sizeX;
   },
   getSizeY ()
   {
      return this .sizeY;
   },
   getScaleModeX ()
   {
      if (this .parent)
         return this .scaleModeX;

      if (this .scaleModeX === NONE)
         return FRACTION;

      return this .scaleModeX;
   },
   getScaleModeY ()
   {
      if (this .parent)
         return this .scaleModeY;

      if (this .scaleModeY === NONE)
         return FRACTION;

      return this .scaleModeY;
   },
   transform (type, renderObject)
   {
      const parent = this .parent = renderObject .getParentLayout ();

      // Calculate rectangleSize

      const
         browser             = this .getBrowser (),
         contentScale        = browser .getRenderingProperty ("ContentScale"),
         matrix              = this .matrix,
         viewpoint           = renderObject .getViewpoint (),
         nearValue           = renderObject .getNavigationInfo () .getNearValue (),       // in meters
         viewport            = renderObject .getViewVolume () .getScissor (),             // in pixels
         viewportMeter       = viewpoint .getViewportSize (viewport, nearValue),          // in meters
         viewportPixel       = this .viewportPixel,                                       // in pixels
         pixelSize           = this .pixelSize,                                           // size of one pixel in meters
         parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter,      // in meters
         rectangleSize       = this .rectangleSize,
         rectangleCenter     = this .rectangleCenter;

      viewportPixel .set (viewport [2], viewport [3]) .divide (contentScale);             // in pixel
      pixelSize     .assign (viewportMeter) .divVec (viewportPixel);                      // size of one pixel in meter

      switch (this .getSizeUnitX ())
      {
         case FRACTION:
            rectangleSize .x = this .sizeX * parentRectangleSize .x;
            break;
         case PIXEL:
            rectangleSize .x = this .sizeX * pixelSize .x;
            break;
         default:
            break;
      }

      switch (this .getSizeUnitY ())
      {
         case FRACTION:
            rectangleSize .y = this .sizeY * parentRectangleSize .y;
            break;
         case PIXEL:
            rectangleSize .y = this .sizeY * pixelSize .y;
            break;
         default:
            break;
      }

      // Calculate translation

      const translation = this .translation .set (0, 0, 0);

      switch (this .getAlignX ())
      {
         case LEFT:
            translation .x = -(parentRectangleSize .x - rectangleSize .x) / 2;
            break;
         case CENTER:

            if (this .getSizeUnitX () === PIXEL && viewportPixel .x & 1)
               translation .x = -pixelSize .x / 2;

            break;
         case RIGHT:
            translation .x = (parentRectangleSize .x - rectangleSize .x) / 2;
            break;
      }

      switch (this .getAlignY ())
      {
         case BOTTOM:
            translation .y = -(parentRectangleSize .y - rectangleSize .y) / 2;
            break;
         case CENTER:

            if (this .getSizeUnitX === PIXEL && viewportPixel .y & 1)
               translation .y = -pixelSize .y / 2;

            break;
         case TOP:
            translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
            break;
      }

      // Calculate offset

      const offset = this .offset .set (0, 0, 0);

      switch (this .getOffsetUnitX ())
      {
         case FRACTION:
            offset .x = this .offsetX * parentRectangleSize .x;
            break;
         case PIXEL:
            offset .x = this .offsetX * viewportMeter .x / viewportPixel .x;
            break;
      }

      switch (this .getOffsetUnitY ())
      {
         case FRACTION:
            offset .y = this .offsetY * parentRectangleSize .y;
            break;
         case PIXEL:
            offset .y = this .offsetY * viewportMeter .y / viewportPixel .y;
            break;
      }

      // Calculate scale

      const
         scale              = this .scale .set (1, 1, 1),
         currentTranslation = this .currentTranslation,
         currentRotation    = this .currentRotation,
         currentScale       = this .currentScale;

      const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

      modelViewMatrix .get (currentTranslation, currentRotation, currentScale);

      switch (this .getScaleModeX ())
      {
         case NONE:
            scale .x = currentScale .x;
            break;
         case FRACTION:
            scale .x = rectangleSize .x;
            break;
         case STRETCH:
            break;
         case PIXEL:
            scale .x = viewportMeter .x / viewportPixel .x;
            break;
      }

      switch (this .getScaleModeY ())
      {
         case NONE:
            scale .y = currentScale .y;
            break;
         case FRACTION:
            scale .y = rectangleSize .y;
            break;
         case STRETCH:
            break;
         case PIXEL:
            scale .y = viewportMeter .y / viewportPixel .y;
            break;
      }

      // Calculate scale for scaleMode STRETCH

      if (this .getScaleModeX () === STRETCH)
      {
         if (this .getScaleModeY () === STRETCH)
         {
            if (rectangleSize .x > rectangleSize .y)
            {
               scale .x = rectangleSize .x;
               scale .y = scale .x;
            }
            else
            {
               scale .y = rectangleSize .y;
               scale .x = scale .y;
            }
         }
         else
            scale .x = scale .y;
      }
      else if (this .getScaleModeY () === STRETCH)
         scale .y = scale .x;

      // Transform

      rectangleCenter .assign (translation .add (offset));

      matrix .set (currentTranslation, currentRotation);
      matrix .translate (translation);
      matrix .scale (scale);

      return matrix;
   },
});

Object .defineProperties (Layout,
{
   typeName:
   {
      value: "Layout",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "layout",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "align",       new (Fields_default()).MFString ("CENTER", "CENTER")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "offsetUnits", new (Fields_default()).MFString ("WORLD", "WORLD")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "offset",      new (Fields_default()).MFFloat (0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "sizeUnits",   new (Fields_default()).MFString ("WORLD", "WORLD")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "size",        new (Fields_default()).MFFloat (1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "scaleMode",   new (Fields_default()).MFString ("NONE", "NONE")),
      ]),
      enumerable: true,
   },
});

const Layout_default_ = Layout;
;

Namespace_default().add ("Layout", "x_ite/Components/Layout/Layout", Layout_default_);
/* harmony default export */ const Layout_Layout = (Layout_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DGroupingNode\")"
const X3DGroupingNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/X3DGroupingNode");
var X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(X3DGroupingNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/TraverseType");
var TraverseType_default = /*#__PURE__*/__webpack_require__.n(TraverseType_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/LayoutGroup.js
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











function LayoutGroup (executionContext)
{
   X3DGroupingNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).LayoutGroup);

   this .viewportNode    = null;
   this .layoutNode      = null;
   this .matrix          = new (Matrix4_default()) ();
   this .modelViewMatrix = new (Matrix4_default()) ();
   this .screenMatrix    = new (Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (LayoutGroup .prototype, (X3DGroupingNode_default()).prototype),
{
   initialize ()
   {
      X3DGroupingNode_default().prototype .initialize .call (this);

      this ._viewport .addInterest ("set_viewport__", this);
      this ._layout   .addInterest ("set_layout__", this);

      this .set_viewport__ ();
      this .set_layout__ ();
   },
   set_viewport__ ()
   {
      this .viewportNode = X3DCast_default() ((X3DConstants_default()).X3DViewportNode, this ._viewport);
   },
   set_layout__ ()
   {
      this .layoutNode = X3DCast_default() ((X3DConstants_default()).X3DLayoutNode, this ._layout);
   },
   getBBox (bbox, shadows)
   {
      return X3DGroupingNode_default().prototype .getBBox .call (this, bbox, shadows) .multRight (this .getMatrix ());
   },
   getMatrix ()
   {
      if (this .layoutNode)
         return this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);

      return this .matrix .identity ();
   },
   getLayout ()
   {
      return this .layoutNode;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case (TraverseType_default()).COLLISION:
         {
            return;
         }
         default:
         {
            if (this .viewportNode)
               this .viewportNode .push ();

            if (this .layoutNode)
            {
               const modelViewMatrix = renderObject .getModelViewMatrix ();

               this .modelViewMatrix .assign (modelViewMatrix .get ());
               this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

               modelViewMatrix .pushMatrix (this .screenMatrix);
               renderObject .getLayouts () .push (this .layoutNode);

               X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

               renderObject .getLayouts () .pop ();
               modelViewMatrix .pop ();
            }
            else
            {
               X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);
            }

            if (this .viewportNode)
               this .viewportNode .pop ();

            return;
         }
      }
   },
});

Object .defineProperties (LayoutGroup,
{
   typeName:
   {
      value: "LayoutGroup",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "layout",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "viewport",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",    new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",       new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",     new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",    new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren", new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",       new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const LayoutGroup_default_ = LayoutGroup;
;

Namespace_default().add ("LayoutGroup", "x_ite/Components/Layout/LayoutGroup", LayoutGroup_default_);
/* harmony default export */ const Layout_LayoutGroup = (LayoutGroup_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Layering/X3DLayerNode\")"
const X3DLayerNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Layering/X3DLayerNode");
var X3DLayerNode_default = /*#__PURE__*/__webpack_require__.n(X3DLayerNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Navigation/OrthoViewpoint\")"
const OrthoViewpoint_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Navigation/OrthoViewpoint");
var OrthoViewpoint_default = /*#__PURE__*/__webpack_require__.n(OrthoViewpoint_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/LayoutLayer.js
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









function LayoutLayer (executionContext)
{
   X3DLayerNode_default().call (this,
                       executionContext,
                       new (OrthoViewpoint_default()) (executionContext),
                       new Layout_LayoutGroup (executionContext));

   this .addType ((X3DConstants_default()).LayoutLayer);
}

Object .assign (Object .setPrototypeOf (LayoutLayer .prototype, (X3DLayerNode_default()).prototype),
{
   initialize ()
   {
      X3DLayerNode_default().prototype .initialize .call (this);

      this ._layout         .addFieldInterest (this .getGroup () ._layout);
      this ._addChildren    .addFieldInterest (this .getGroup () ._addChildren);
      this ._removeChildren .addFieldInterest (this .getGroup () ._removeChildren);
      this ._children       .addFieldInterest (this .getGroup () ._children);

      this .getGroup () ._layout   = this ._layout;
      this .getGroup () ._children = this ._children;

      this .getGroup () .setPrivate (true);
      this .getGroup () .setup ();
   },
});

Object .defineProperties (LayoutLayer,
{
   typeName:
   {
      value: "LayoutLayer",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "layers",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "pickable",       new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "objectType",     new (Fields_default()).MFString ("ALL")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "visible",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "layout",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "viewport",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "addChildren",    new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "removeChildren", new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "children",       new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const LayoutLayer_default_ = LayoutLayer;
;

Namespace_default().add ("LayoutLayer", "x_ite/Components/Layout/LayoutLayer", LayoutLayer_default_);
/* harmony default export */ const Layout_LayoutLayer = (LayoutLayer_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Text/X3DFontStyleNode\")"
const X3DFontStyleNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Text/X3DFontStyleNode");
var X3DFontStyleNode_default = /*#__PURE__*/__webpack_require__.n(X3DFontStyleNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Text/X3DTextGeometry\")"
const X3DTextGeometry_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Browser/Text/X3DTextGeometry");
var X3DTextGeometry_default = /*#__PURE__*/__webpack_require__.n(X3DTextGeometry_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Text/TextAlignment\")"
const TextAlignment_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Browser/Text/TextAlignment");
var TextAlignment_default = /*#__PURE__*/__webpack_require__.n(TextAlignment_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/PixelTexture\")"
const PixelTexture_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Texturing/PixelTexture");
var PixelTexture_default = /*#__PURE__*/__webpack_require__.n(PixelTexture_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Rendering/X3DGeometryNode\")"
const X3DGeometryNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Rendering/X3DGeometryNode");
var X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(X3DGeometryNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Box3\")"
const Box3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/Box3");
var Box3_default = /*#__PURE__*/__webpack_require__.n(Box3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Algorithm");
var Algorithm_default = /*#__PURE__*/__webpack_require__.n(Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Layout/ScreenText.js
/* provided dependency */ var $ = __webpack_require__(355);
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










function ScreenText (text, fontStyle)
{
   X3DTextGeometry_default().call (this, text, fontStyle);

   text .setTransparent (true);

   this .texCoordArray = X3DGeometryNode_default().createArray ();
   this .textureNode   = new (PixelTexture_default()) (text .getExecutionContext ());
   this .canvas        = $("<canvas></canvas>");
   this .context       = this .canvas [0] .getContext ("2d", { willReadFrequently: true });
   this .matrix        = new (Matrix4_default()) ();

   this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
   this .textureNode .setup ();
}

Object .assign (Object .setPrototypeOf (ScreenText .prototype, (X3DTextGeometry_default()).prototype),
{
   modelViewMatrix: new (Matrix4_default()) (),
   isTransparent ()
   {
      return true;
   },
   getMatrix ()
   {
      return this .matrix;
   },
   update: (() =>
   {
      const
         min = new (Vector3_default()) (0, 0, 0),
         max = new (Vector3_default()) (1, 1, 0);

      return function ()
      {
         X3DTextGeometry_default().prototype .update .call (this);

         const
            fontStyle = this .getFontStyle (),
            text      = this .getText (),
            offset    = 1; // For antialiasing border on bottom and right side

         text ._textBounds .x = Math .ceil (text ._textBounds .x) + offset;
         text ._textBounds .y = Math .ceil (text ._textBounds .y) + offset;

         this .getBBox () .getExtents (min, max);

         min .x -= offset;
         min .y -= offset;

         switch (fontStyle .getMajorAlignment ())
         {
            case (TextAlignment_default()).BEGIN:
            case (TextAlignment_default()).FIRST:
               min .x = Math .floor (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case (TextAlignment_default()).MIDDLE:
               min .x = Math .round (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case (TextAlignment_default()).END:
               max .x = Math .ceil (max .x);
               min .x = max .x - text ._textBounds .x;
               break;
         }

         switch (fontStyle .getMinorAlignment ())
         {
            case (TextAlignment_default()).BEGIN:
            case (TextAlignment_default()).FIRST:
               max .y = Math .ceil (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case (TextAlignment_default()).MIDDLE:
               max .y = Math .round (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case (TextAlignment_default()).END:
               min .y = Math .floor (min .y);
               max .y = min .y + text ._textBounds .y;
               break;
         }

         text ._origin .x = min .x;
         text ._origin .y = max .y;

         this .getBBox () .setExtents (min, max);
      };
   })(),
   build: (() =>
   {
      const
         min = new (Vector3_default()) (0, 0, 0),
         max = new (Vector3_default()) (1, 1, 0);

      return function ()
      {
         const
            fontStyle = this .getFontStyle (),
            font      = fontStyle .getFont ();

         if (! font)
            return;

         const
            text           = this .getText (),
            glyphs         = this .getGlyphs (),
            minorAlignment = this .getMinorAlignment (),
            translations   = this .getTranslations (),
            charSpacings   = this .getCharSpacings (),
            size           = fontStyle .getScale (), // in pixel
            sizeUnitsPerEm = size / font .unitsPerEm,
            texCoordArray  = this .texCoordArray,
            normalArray    = text .getNormals (),
            vertexArray    = text .getVertices (),
            canvas         = this .canvas [0],
            cx             = this .context;

         // Set texCoord.

         texCoordArray .length = 0;

         text .getMultiTexCoords () .push (texCoordArray);

         // Triangle one and two.

         this .getBBox () .getExtents (min, max);

         normalArray  .push (0, 0, 1,
                             0, 0, 1,
                             0, 0, 1,
                             0, 0, 1,
                             0, 0, 1,
                             0, 0, 1);

         vertexArray .push (min .x, min .y, 0, 1,
                            max .x, min .y, 0, 1,
                            max .x, max .y, 0, 1,
                            min .x, min .y, 0, 1,
                            max .x, max .y, 0, 1,
                            min .x, max .y, 0, 1);

         // Generate texture.

         const
            width  = text ._textBounds .x,
            height = text ._textBounds .y;

         // Scale canvas.

         canvas .width  = Algorithm_default().nextPowerOfTwo (width),
         canvas .height = Algorithm_default().nextPowerOfTwo (height);

         const
            w = width  / canvas .width,
            h = height / canvas .height,
            y = 1 - h;

         texCoordArray .push (0, y, 0, 1,
                              w, y, 0, 1,
                              w, 1, 0, 1,
                              0, y, 0, 1,
                              w, 1, 0, 1,
                              0, 1, 0, 1);

         // Setup canvas.

         cx .fillStyle = "rgba(255,255,255,0)";
         cx .fillRect (0, 0, canvas .width, canvas .height);
         cx .fillStyle = "rgba(255,255,255,1)";

         cx .save ();
         cx .translate (0, canvas .height);
         cx .scale (1, -1);

         // Draw glyphs.

         if (fontStyle ._horizontal .getValue ())
         {
            for (let l = 0, length = glyphs .length; l < length; ++ l)
            {
               const
                  line        = glyphs [l],
                  charSpacing = charSpacings [l],
                  translation = translations [l];

               let advanceWidth = 0;

               for (let g = 0, gl = line .length; g < gl; ++ g)
               {
                  const
                     glyph = line [g],
                     x     = minorAlignment .x + translation .x + advanceWidth + g * charSpacing - min .x,
                     y     = minorAlignment .y + translation .y - max .y;

                  this .drawGlyph (cx, font, glyph, x, y, size);

                  // Calculate advanceWidth.

                  let kerning = 0;

                  if (g + 1 < line .length)
                     kerning = font .getKerningValue (glyph, line [g + 1]);

                  advanceWidth += (glyph .advanceWidth + kerning) * sizeUnitsPerEm;
               }
            }
         }
         else
         {
            const
               leftToRight = fontStyle ._leftToRight .getValue (),
               topToBottom = fontStyle ._topToBottom .getValue (),
               first       = leftToRight ? 0 : text ._string .length - 1,
               last        = leftToRight ? text ._string .length  : -1,
               step        = leftToRight ? 1 : -1;

            for (let l = first, t = 0; l !== last; l += step)
            {
               const line = glyphs [l];

               const
                  numChars = line .length,
                  firstG   = topToBottom ? 0 : numChars - 1,
                  lastG    = topToBottom ? numChars : -1,
                  stepG    = topToBottom ? 1 : -1;

               for (let g = firstG; g !== lastG; g += stepG, ++ t)
               {
                  const translation = translations [t];

                  const
                     x = minorAlignment .x + translation .x - min .x,
                     y = minorAlignment .y + translation .y - max .y;

                  this .drawGlyph (cx, font, line [g], x, y, size);
               }
            }
         }

         cx .restore ();

         // Transfer texture data.

         const imageData = cx .getImageData (0, 0, canvas .width, canvas .height);

         // If the canvas is to large imageData is null.

         if (imageData)
            this .textureNode .setTextureFromData (canvas .width, canvas .height, true, true, new Uint8Array (imageData .data .buffer));
         else
            this .textureNode .clear ();
      };
   })(),
   drawGlyph (cx, font, glyph, x, y, size)
   {
      //console .log (glyph .name, x, y);

      // Get curves for the current glyph.

      const
         path     = glyph .getPath (x, -y, size),
         commands = path .commands;

      cx .beginPath ();

      for (let i = 0, cl = commands .length; i < cl; ++ i)
      {
         const command = commands [i];

         switch (command .type)
         {
            case "M": // Start
            {
               cx .moveTo (command .x, command .y);
               continue;
            }
            case "Z": // End
            {
               cx .closePath ();
               continue;
            }
            case "L": // Linear
            {
               cx .lineTo (command .x, command .y);
               continue;
            }
            case "Q": // Cubic
            {
               cx .quadraticCurveTo (command .x1, command .y1, command .x, command .y);
               continue;
            }
            case "C": // Bezier
            {
               cx .bezierCurveTo (command .x1, command .y1, command .x2, command .y2, command .x, command .y);
               continue;
            }
         }
      }

      if (path .fill)
         cx .fill ();

      if (path .stroke)
      {
         cx .lineWidth = path .strokeWidth;
         cx .stroke ();
      }
   },
   getGlyphExtents (font, glyph, primitiveQuality, min, max)
   {
      const unitsPerEm = font .unitsPerEm;

      min .set ((glyph .xMin || 0) / unitsPerEm, (glyph .yMin || 0) / unitsPerEm, 0);
      max .set ((glyph .xMax || 0) / unitsPerEm, (glyph .yMax || 0) / unitsPerEm, 0);
   },
   traverse: (() =>
   {
      const bbox = new (Box3_default()) ();

      return function (type, renderObject)
      {
         this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix, 1, true);

         // Update Text bbox.

         bbox .assign (this .getBBox ()) .multRight (this .matrix);

         this .getText () .setBBox (bbox);
      };
   })(),
   display (gl, renderContext)
   {
      Matrix4_default().prototype .multLeft .call (renderContext .modelViewMatrix, this .matrix);

      renderContext .textureNode = this .textureNode;
   },
   transformLine: (() =>
   {
      const invMatrix = new (Matrix4_default()) ();

      return function (line)
      {
         // Apply screen nodes transformation in place here.
         return line .multLineMatrix (invMatrix .assign (this .matrix) .inverse ());
      };
   })(),
   transformMatrix (matrix)
   {
      // Apply screen nodes transformation in place here.
      return matrix .multLeft (this .matrix);
   },
});

const ScreenText_default_ = ScreenText;
;

Namespace_default().add ("ScreenText", "x_ite/Browser/Layout/ScreenText", ScreenText_default_);
/* harmony default export */ const Layout_ScreenText = (ScreenText_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/ScreenFontStyle.js
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








function ScreenFontStyle (executionContext)
{
   X3DFontStyleNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ScreenFontStyle);
}

Object .assign (Object .setPrototypeOf (ScreenFontStyle .prototype, (X3DFontStyleNode_default()).prototype),
{
   initialize ()
   {
      X3DFontStyleNode_default().prototype .initialize .call (this);

      this .getBrowser () .getRenderingProperties () ._ContentScale .addInterest ("addNodeEvent", this);
   },
   getTextGeometry (text)
   {
      return new Layout_ScreenText (text, this);
   },
   getScale ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getPixelsPerPoint ();
   },
});

Object .defineProperties (ScreenFontStyle,
{
   typeName:
   {
      value: "ScreenFontStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "fontStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "language",    new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "family",      new (Fields_default()).MFString ("SERIF")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "style",       new (Fields_default()).SFString ("PLAIN")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "pointSize",   new (Fields_default()).SFFloat (12)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "spacing",     new (Fields_default()).SFFloat (1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "horizontal",  new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "leftToRight", new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "topToBottom", new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "justify",     new (Fields_default()).MFString ("BEGIN")),
      ]),
      enumerable: true,
   },
});

const ScreenFontStyle_default_ = ScreenFontStyle;
;

Namespace_default().add ("ScreenFontStyle", "x_ite/Components/Layout/ScreenFontStyle", ScreenFontStyle_default_);
/* harmony default export */ const Layout_ScreenFontStyle = (ScreenFontStyle_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Prototype/X3DProtoDeclaration\")"
const X3DProtoDeclaration_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Prototype/X3DProtoDeclaration");
var X3DProtoDeclaration_default = /*#__PURE__*/__webpack_require__.n(X3DProtoDeclaration_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Layout/ScreenGroup.js
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










function ScreenGroup (executionContext)
{
   X3DGroupingNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ScreenGroup);

   if (executionContext .getOuterNode () instanceof (X3DProtoDeclaration_default()))
      this .matrix = new (Matrix4_default()) ();
   else
      this .matrix = new (Matrix4_default()) (0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
}

Object .assign (Object .setPrototypeOf (ScreenGroup .prototype, (X3DGroupingNode_default()).prototype),
{
   getBBox (bbox, shadows)
   {
      return this .getSubBBox (bbox, shadows) .multRight (this .matrix);
   },
   getMatrix ()
   {
      return this .matrix;
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case (TraverseType_default()).CAMERA:
         case (TraverseType_default()).PICKING:
         case (TraverseType_default()).SHADOW: // ???
            // No clone support for shadows, generated cube map texture and bbox
            break;
         default:
         {
            const browser = this .getBrowser ();

            browser .getScreenScaleMatrix (renderObject, this .matrix, browser .getRenderingProperty ("ContentScale"), false);
            break;
         }
      }

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (ScreenGroup,
{
   typeName:
   {
      value: "ScreenGroup",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Layout", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.2", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",    new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",       new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",     new (Fields_default()).SFVec3f ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",    new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren", new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",       new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const ScreenGroup_default_ = ScreenGroup;
;

Namespace_default().add ("ScreenGroup", "x_ite/Components/Layout/ScreenGroup", ScreenGroup_default_);
/* harmony default export */ const Layout_ScreenGroup = (ScreenGroup_default_);
;// CONCATENATED MODULE: ./src/assets/components/Layout.js
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










Components_default().add ({
   name: "Layout",
   concreteNodes:
   [
      Layout_Layout,
      Layout_LayoutGroup,
      Layout_LayoutLayer,
      Layout_ScreenFontStyle,
      Layout_ScreenGroup,
   ],
   abstractNodes:
   [
      Layout_X3DLayoutNode,
   ],
   browserContext: Layout_X3DLayoutContext,
});

const components_Layout_default_ = undefined;
;

Namespace_default().add ("Layout", "assets/components/Layout", components_Layout_default_);
/* harmony default export */ const components_Layout = ((/* unused pure expression or super */ null && (components_Layout_default_)));
})();

/******/ })()
;