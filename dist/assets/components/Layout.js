/* X_ITE v8.2.0 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((module) => {

module.exports = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("lib/jquery");

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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/TextureProperties\")"
const TextureProperties_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Texturing/TextureProperties");
var TextureProperties_default = /*#__PURE__*/__webpack_require__.n(TextureProperties_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/ViewVolume\")"
const ViewVolume_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Geometry/ViewVolume");
var ViewVolume_default = /*#__PURE__*/__webpack_require__.n(ViewVolume_namespaceObject);
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

function X3DLayoutContext ()
{ }

X3DLayoutContext .prototype =
{
   getScreenTextureProperties: function ()
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
   getScreenScaleMatrix: (function ()
   {
      const
         screenScale  = new (Vector3_default()) (0, 0, 0),
         screenPoint  = new (Vector3_default()) (0, 0, 0),
         screenMatrix = new (Matrix4_default()) ();

      return function (renderObject, matrix)
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
            x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x),
            y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y),
            z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x);

         screenMatrix .set (x .x, x .y, x .z, 0,
                            y .x, y .y, y .z, 0,
                            z .x, z .y, z .z, 0,
                            modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

         // Snap to whole pixel.

         ViewVolume_default().projectPoint ((Vector3_default()).Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

         screenPoint .x = Math .round (screenPoint .x);
         screenPoint .y = Math .round (screenPoint .y);

         ViewVolume_default().unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

         screenPoint .z = 0;
         screenMatrix .translate (screenPoint);

         // Assign relative matrix.

         matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
      };
   })(),
};

/* harmony default export */ const Layout_X3DLayoutContext = (X3DLayoutContext);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Base/X3DConstants");
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

X3DLayoutNode .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
{
   constructor: X3DLayoutNode,
});

/* harmony default export */ const Layout_X3DLayoutNode = (X3DLayoutNode);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector2\")"
const Vector2_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Numbers/Vector2");
var Vector2_default = /*#__PURE__*/__webpack_require__.n(Vector2_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Numbers/Rotation4");
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












var
   i        = 0,
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
   Layout_X3DLayoutNode.call (this, executionContext);

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

Layout .prototype = Object .assign (Object .create (Layout_X3DLayoutNode.prototype),
{
   constructor: Layout,
   viewportPixel: new (Vector2_default()) (0, 0),
   pixelSize: new (Vector2_default()) (0, 0),
   translation: new (Vector3_default()) (0, 0, 0),
   offset: new (Vector3_default()) (0, 0, 0),
   scale: new (Vector3_default()) (1, 1, 1),
   currentTranslation: new (Vector3_default()) (0, 0, 0),
   currentRotation: new (Rotation4_default()) (0, 0, 1, 0),
   currentScale: new (Vector3_default()) (0, 0, 0),
   modelViewMatrix: new (Matrix4_default()) (),
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "align",       new (Fields_default()).MFString ("CENTER", "CENTER")),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "offsetUnits", new (Fields_default()).MFString ("WORLD", "WORLD")),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "offset",      new (Fields_default()).MFFloat (0, 0)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "sizeUnits",   new (Fields_default()).MFString ("WORLD", "WORLD")),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "size",        new (Fields_default()).MFFloat (1, 1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "scaleMode",   new (Fields_default()).MFString ("NONE", "NONE")),
   ]),
   getTypeName: function ()
   {
      return "Layout";
   },
   getComponentName: function ()
   {
      return "Layout";
   },
   getContainerField: function ()
   {
      return "layout";
   },
   initialize: function ()
   {
      Layout_X3DLayoutNode.prototype.initialize.call (this);

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
   set_align__: function ()
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
   set_offsetUnits__: function ()
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
   set_offset__: function ()
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
   set_sizeUnits__: function ()
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
   set_size__: function ()
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
   set_scaleMode__: function ()
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
   getRectangleCenter: function ()
   {
      return this .rectangleCenter;
   },
   getRectangleSize: function ()
   {
      return this .rectangleSize;
   },
   getAlignX: function ()
   {
      return this .alignX;
   },
   getAlignY: function ()
   {
      return this .alignY;
   },
   getOffsetUnitX: function ()
   {
      if (this .offsetUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitX ();

         return FRACTION;
      }

      return this .offsetUnitX;
   },
   getOffsetUnitY: function ()
   {
      if (this .offsetUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitY ();

         return FRACTION;
      }

      return this .offsetUnitY;
   },
   getOffsetX: function ()
   {
      return this .offsetX;
   },
   getOffsetY: function ()
   {
      return this .offsetY;
   },
   getSizeUnitX: function ()
   {
      if (this .sizeUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitX ();

         return FRACTION;
      }

      return this .sizeUnitX;
   },
   getSizeUnitY: function ()
   {
      if (this .sizeUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitY ();

         return FRACTION;
      }

      return this .sizeUnitY;
   },
   getSizeX: function ()
   {
      return this .sizeX;
   },
   getSizeY: function ()
   {
      return this .sizeY;
   },
   getScaleModeX: function ()
   {
      if (this .parent)
         return this .scaleModeX;

      if (this .scaleModeX === NONE)
         return FRACTION;

      return this .scaleModeX;
   },
   getScaleModeY: function ()
   {
      if (this .parent)
         return this .scaleModeY;

      if (this .scaleModeY === NONE)
         return FRACTION;

      return this .scaleModeY;
   },
   transform: function (type, renderObject)
   {
      var parent = this .parent = renderObject .getParentLayout ();

      // Calculate rectangleSize

      var
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

      viewportPixel .set (viewport [2], viewport [3]);                                 // in pixel
      pixelSize     .assign (viewportMeter) .divVec (viewportPixel);                   // size of one pixel in meter

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

      var translation = this .translation .set (0, 0, 0);

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

      var offset = this .offset .set (0, 0, 0);

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

      var
         scale              = this .scale .set (1, 1, 1),
         currentTranslation = this .currentTranslation,
         currentRotation    = this .currentRotation,
         currentScale       = this .currentScale;

      var modelViewMatrix = renderObject .getModelViewMatrix () .get ();
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

      rectangleCenter .assign (translation) .add (offset);

      matrix .set (currentTranslation, currentRotation);
      matrix .translate (translation .add (offset));
      matrix .scale (scale);

      return matrix;
   },
});

/* harmony default export */ const Layout_Layout = (Layout);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DGroupingNode\")"
const X3DGroupingNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Grouping/X3DGroupingNode");
var X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(X3DGroupingNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Rendering/TraverseType");
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
   this .modelViewMatrix = new (Matrix4_default()) ();
   this .screenMatrix    = new (Matrix4_default()) ();
}

LayoutGroup .prototype = Object .assign (Object .create ((X3DGroupingNode_default()).prototype),
{
   constructor: LayoutGroup,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
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
   getTypeName: function ()
   {
      return "LayoutGroup";
   },
   getComponentName: function ()
   {
      return "Layout";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      X3DGroupingNode_default().prototype.initialize.call (this);

      this ._viewport .addInterest ("set_viewport__", this);
      this ._layout   .addInterest ("set_layout__", this);

      this .set_viewport__ ();
      this .set_layout__ ();
   },
   set_viewport__: function ()
   {
      this .viewportNode = X3DCast_default() ((X3DConstants_default()).X3DViewportNode, this ._viewport);
   },
   set_layout__: function ()
   {
      this .layoutNode = X3DCast_default() ((X3DConstants_default()).X3DLayoutNode, this ._layout);
   },
   getBBox: function (bbox, shadows)
   {
      return X3DGroupingNode_default().prototype.getBBox.call (this, bbox, shadows) .multRight (this .getMatrix ());
   },
   getMatrix: function ()
   {
      if (this .layoutNode)
         this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
      else
         this .matrix .identity ();

      return this .matrix;
   },
   traverse: function (type, renderObject)
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
               var modelViewMatrix = renderObject .getModelViewMatrix ();

               this .modelViewMatrix .assign (modelViewMatrix .get ());
               this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

               modelViewMatrix .pushMatrix (this .screenMatrix);
               renderObject .getLayouts () .push (this .layoutNode);

               X3DGroupingNode_default().prototype.traverse.call (this, type, renderObject);

               renderObject .getLayouts () .pop ();
               modelViewMatrix .pop ();
            }
            else
            {
               X3DGroupingNode_default().prototype.traverse.call (this, type, renderObject);
            }

            if (this .viewportNode)
               this .viewportNode .pop ();

            return;
         }
      }
   },
});

/* harmony default export */ const Layout_LayoutGroup = (LayoutGroup);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Layering/X3DLayerNode\")"
const X3DLayerNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Layering/X3DLayerNode");
var X3DLayerNode_default = /*#__PURE__*/__webpack_require__.n(X3DLayerNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Navigation/OrthoViewpoint\")"
const OrthoViewpoint_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Navigation/OrthoViewpoint");
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

LayoutLayer .prototype = Object .assign (Object .create ((X3DLayerNode_default()).prototype),
{
   constructor: LayoutLayer,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",       new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "isPickable",     new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "layout",         new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "viewport",       new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "addChildren",    new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,   "removeChildren", new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "children",       new (Fields_default()).MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "LayoutLayer";
   },
   getComponentName: function ()
   {
      return "Layout";
   },
   getContainerField: function ()
   {
      return "layers";
   },
   initialize: function ()
   {
      X3DLayerNode_default().prototype.initialize.call (this);

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

/* harmony default export */ const Layout_LayoutLayer = (LayoutLayer);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DNode\")"
const X3DNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Core/X3DNode");
var X3DNode_default = /*#__PURE__*/__webpack_require__.n(X3DNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Networking/X3DUrlObject\")"
const X3DUrlObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Networking/X3DUrlObject");
var X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(X3DUrlObject_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Text/TextAlignment.js
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

let TextAlignment_i = 0;

const TextAlignment =
{
   BEGIN:  ++ TextAlignment_i,
   FIRST:  ++ TextAlignment_i,
   MIDDLE: ++ TextAlignment_i,
   END:    ++ TextAlignment_i,
};

/* harmony default export */ const Text_TextAlignment = (TextAlignment);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/InputOutput/FileLoader\")"
const FileLoader_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/InputOutput/FileLoader");
var FileLoader_default = /*#__PURE__*/__webpack_require__.n(FileLoader_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Networking/URLs\")"
const URLs_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Browser/Networking/URLs");
var URLs_default = /*#__PURE__*/__webpack_require__.n(URLs_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Text/X3DFontStyleNode.js
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









/*
 * Font paths for default SERIF, SANS and TYPWRITER families.
 */

const Fonts =
{
   SERIF: {
      PLAIN:      URLs_default().getFontsUrl ("DroidSerif-Regular.ttf"),
      ITALIC:     URLs_default().getFontsUrl ("DroidSerif-Italic.ttf"),
      BOLD:       URLs_default().getFontsUrl ("DroidSerif-Bold.ttf"),
      BOLDITALIC: URLs_default().getFontsUrl ("DroidSerif-BoldItalic.ttf"),
   },
   SANS: {
      PLAIN:      URLs_default().getFontsUrl ("Ubuntu-R.ttf"),
      ITALIC:     URLs_default().getFontsUrl ("Ubuntu-RI.ttf"),
      BOLD:       URLs_default().getFontsUrl ("Ubuntu-B.ttf"),
      BOLDITALIC: URLs_default().getFontsUrl ("Ubuntu-BI.ttf"),
   },
   TYPEWRITER: {
      PLAIN:      URLs_default().getFontsUrl ("UbuntuMono-R.ttf"),
      ITALIC:     URLs_default().getFontsUrl ("UbuntuMono-RI.ttf"),
      BOLD:       URLs_default().getFontsUrl ("UbuntuMono-B.ttf"),
      BOLDITALIC: URLs_default().getFontsUrl ("UbuntuMono-BI.ttf"),
   },
};

function X3DFontStyleNode (executionContext)
{
   X3DNode_default().call (this, executionContext);
   X3DUrlObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DFontStyleNode);

   this .addChildObjects ("load",                 new (Fields_default()).SFBool (true),
                          "autoRefresh",          new (Fields_default()).SFTime (),
                          "autoRefreshTimeLimit", new (Fields_default()).SFTime (3600));

   this .addAlias ("url", this ._family);

   this .familyStack = [ ];
   this .alignments  = [ ];
   this .loader      = new (FileLoader_default()) (this);
}

X3DFontStyleNode .prototype = Object .assign (Object .create ((X3DNode_default()).prototype),
   (X3DUrlObject_default()).prototype,
{
   constructor: X3DFontStyleNode,
   initialize: function ()
   {
      X3DNode_default().prototype.initialize.call (this);
      X3DUrlObject_default().prototype.initialize.call (this);

      this ._style   .addInterest ("set_style__",   this);
      this ._justify .addInterest ("set_justify__", this);

      this .font        = null;
      this .familyIndex = 0;

      this .set_justify__ ();
      this .set_style__ ();

      this .requestImmediateLoad ();
   },
   set_style__: function ()
   {
      if (!this ._load .getValue ())
         return;

      this .setLoadState ((X3DConstants_default()).NOT_STARTED_STATE);

      this .requestImmediateLoad ();
   },
   set_justify__: function ()
   {
      const majorNormal = this ._horizontal .getValue () ? this ._leftToRight .getValue () : this ._topToBottom .getValue ();

      this .alignments [0] = this ._justify .length > 0
                             ? this .getAlignment (0, majorNormal)
                             : majorNormal ? Text_TextAlignment.BEGIN : Text_TextAlignment.END;

      const minorNormal = this ._horizontal .getValue () ? this ._topToBottom .getValue () : this ._leftToRight .getValue ();

      this .alignments [1] = this ._justify .length > 1
                             ? this .getAlignment (1, minorNormal)
                             : minorNormal ? Text_TextAlignment.FIRST : Text_TextAlignment.END;
   },
   getMajorAlignment: function ()
   {
      return this .alignments [0];
   },
   getMinorAlignment: function ()
   {
      return this .alignments [1];
   },
   getAlignment: function (index, normal)
   {
      if (normal)
      {
         // Return for west-european normal alignment.

         switch (this ._justify [index])
         {
            case "FIRST":  return Text_TextAlignment.FIRST;
            case "BEGIN":  return Text_TextAlignment.BEGIN;
            case "MIDDLE": return Text_TextAlignment.MIDDLE;
            case "END":    return Text_TextAlignment.END;
         }
      }
      else
      {
         // Return appropriate alignment if topToBottom or leftToRight are FALSE.

         switch (this ._justify [index])
         {
            case "FIRST":  return Text_TextAlignment.END;
            case "BEGIN":  return Text_TextAlignment.END;
            case "MIDDLE": return Text_TextAlignment.MIDDLE;
            case "END":    return Text_TextAlignment.BEGIN;
         }
      }

      return index ? Text_TextAlignment.FIRST : Text_TextAlignment.BEGIN;
   },
   getDefaultFont: function (familyName)
   {
      const family = Fonts [familyName];

      if (family)
         return family [this ._style .getValue ()] || family .PLAIN;

      return;
   },
   loadNow: function ()
   {
      // Add default font to family array.

      const family = this ._url .copy ();

      family .push ("SERIF");

      // Build family stack.

      this .familyStack .length = 0;

      for (const familyName of family)
         this .familyStack .push (this .getDefaultFont (familyName) || familyName);

      this .loadNext ();
   },
   loadNext: function ()
   {
      try
      {
         if (this .familyStack .length === 0)
         {
            this .setLoadState ((X3DConstants_default()).FAILED_STATE);
            this .font = null;
            return;
         }

         this .family = this .familyStack .shift ();
         this .URL    = new URL (this .family, this .loader .getReferer ());

         if (this .URL .protocol !== "data:")
         {
            if (!this .getBrowser () .getBrowserOptions () .getCache () || !this .getCache ())
               this .URL .searchParams .set ("_", Date .now ());
         }

         this .getBrowser () .getFont (this .URL)
            .done (this .setFont .bind (this))
            .fail (this .setError .bind (this));
      }
      catch (error)
      {
         this .setError (error .message);
      }
   },
   setError: function (error)
   {
      if (this .URL .protocol !== "data:")
         console .warn ("Error loading font '" + decodeURI (this .URL .href) + "':", error);

      this .loadNext ();
   },
   setFont: function (font)
   {
      this .font = font;

      this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
      this .addNodeEvent ();
   },
   getFont: function ()
   {
      return this .font;
   },
   dispose: function ()
   {
      X3DUrlObject_default().prototype.dispose.call (this);
      X3DNode_default().prototype.dispose.call (this);
   },
});

/* harmony default export */ const Text_X3DFontStyleNode = (X3DFontStyleNode);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix3\")"
const Matrix3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Numbers/Matrix3");
var Matrix3_default = /*#__PURE__*/__webpack_require__.n(Matrix3_namespaceObject);
;// CONCATENATED MODULE: ./src/standard/Math/Geometry/Box2.js
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




function Box2 (size, center)
{
   switch (arguments .length)
   {
      case 0:
      {
         this .matrix = new (Matrix3_default()) (0, 0, 0,
                                     0, 0, 0,
                                     0, 0, 0);
         return;
      }
      case 2:
      {
         this .matrix = new (Matrix3_default()) (size .x / 2, 0, 0,
                                     0, size .y / 2, 0,
                                     center .x, center .y, 1);
         return;
      }
      case 3:
      {
         const
            min = arguments [0],
            max = arguments [1],
            sx  = (max .x - min .x) / 2,
            sy  = (max .y - min .y) / 2,
            cx  = (max .x + min .x) / 2,
            cy  = (max .y + min .y) / 2;

         this .matrix = new (Matrix3_default()) (sx, 0,  0,
                                     0,  sy, 0,
                                     cx, cy, 1);
         return;
      }
   }
}

Box2 .prototype =
{
   constructor: Box2,
   copy: function ()
   {
      const copy = Object .create (Box2 .prototype);
      copy .matrix = this .matrix .copy ();
      return copy;
   },
   assign: function (box)
   {
      this .matrix .assign (box .matrix);
      return this;
   },
   equals: function (box)
   {
      return this .matrix .equals (box .matrix);
   },
   set: function (size, center)
   {
      const m = this .matrix;

      switch (arguments .length)
      {
         case 0:
         {
            m [0] = 0.5; m [1] = 0;   m [2] = 0;
            m [3] = 0;   m [4] = 0.5; m [5] = 0;
            m [6] = 0;   m [7] = 0;   m [8] = 0;
            return this;
         }
         case 2:
         {
            // size, center
            m [0] = size .x / 2; m [1] = 0;           m [2] = 0;
            m [3] = 0;           m [4] = size .y / 2; m [5] = 0;
            m [6] = center .x;   m [7] = center .y;   m [8] = 1;
            return this;
         }
         case 3:
         {
            const
               min = arguments [0],
               max = arguments [1],
               sx  = (max .x - min .x) / 2,
               sy  = (max .y - min .y) / 2,
               cx  = (max .x + min .x) / 2,
               cy  = (max .y + min .y) / 2;

            this .matrix .set (sx, 0,  0,
                               0,  sy, 0,
                               cx, cy, 1);
            return this;
         }
      }
   },
   setExtents: function (min, max)
   {
      const
         m  = this .matrix,
         sx = (max .x - min .x) / 2,
         sy = (max .y - min .y) / 2,
         cx = (max .x + min .x) / 2,
         cy = (max .y + min .y) / 2;

      m [0] = sx; m [1] = 0;  m [2] = 0;
      m [3] = 0;  m [4] = sy; m [5] = 0;
      m [6] = cx; m [7] = cy; m [8] = 1;
      return this;
   },
   isEmpty: function ()
   {
      return this .matrix [8] === 0;
   },
   add: (function ()
   {
      const
         lhs_min = new (Vector2_default()) (0, 0),
         lhs_max = new (Vector2_default()) (0, 0),
         rhs_min = new (Vector2_default()) (0, 0),
         rhs_max = new (Vector2_default()) (0, 0);

      return function (box)
      {
         if (this .isEmpty ())
            return this .assign (box);

         if (box .isEmpty ())
            return this;

         this .getExtents (lhs_min, lhs_max);
         box  .getExtents (rhs_min, rhs_max);

         return this .set (lhs_min .min (rhs_min), lhs_max .max (rhs_max), true);
      };
   })(),
   multLeft: function (matrix)
   {
      this .matrix .multLeft (matrix);
      return this;
   },
   multRight: function (matrix)
   {
      this .matrix .multRight (matrix);
      return this;
   },
   getExtents: function (min, max)
   {
      this .getAbsoluteExtents (min, max);

      min .add (this .center);
      max .add (this .center);
   },
   getAbsoluteExtents: (function ()
   {
      const p1 = new (Vector2_default()) (0, 0);

      return function (min, max)
      {
         const
            m = this .matrix,
            x = m .xAxis,
            y = m .yAxis;

         p1 .assign (x) .add (y);

         const p2 = y .subtract (x);

         min .assign (p1) .min (p2);
         max .assign (p1) .max (p2);

         p1 .negate ();
         p2 .negate ();

         min .min (p1, p2);
         max .max (p1, p2);
      };
   })(),
   containsPoint: (function ()
   {
      const
         min = new (Vector2_default()) (0, 0),
         max = new (Vector2_default()) (0, 0);

      return function (point)
      {
         this .getExtents (min, max);

         return min .x <= point .x &&
                max .x >= point .x &&
                min .y <= point .y &&
                max .y >= point .y;
      };
   })(),
   toString: function ()
   {
      return this .size + ", " + this .center;
   },
};

Object .defineProperty (Box2 .prototype, "size",
{
   get: (function ()
   {
      const
         min = new (Vector2_default()) (0, 0),
         max = new (Vector2_default()) (0, 0);

      return function ()
      {
         this .getAbsoluteExtents (min, max);

         return max .subtract (min);
      };
   })(),
   enumerable: true,
   configurable: false
});

Object .defineProperty (Box2 .prototype, "center",
{
   get: function ()
   {
      return this .matrix .origin;
   },
   enumerable: true,
   configurable: false
});

/* harmony default export */ const Geometry_Box2 = (Box2);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Box3\")"
const Box3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Geometry/Box3");
var Box3_default = /*#__PURE__*/__webpack_require__.n(Box3_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Text/X3DTextGeometry.js
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







var
   bbox        = new Geometry_Box2 (),
   lineBBox    = new Geometry_Box2 (),
   min         = new (Vector2_default()) (0, 0),
   max         = new (Vector2_default()) (0, 0),
   glyphMin    = new (Vector2_default()) (0, 0),
   glyphMax    = new (Vector2_default()) (0, 0),
   min3        = new (Vector3_default()) (0, 0, 0),
   max3        = new (Vector3_default()) (0, 0, 0),
   size        = new (Vector2_default()) (0, 0),
   center      = new (Vector2_default()) (0, 0),
   size1_2     = new (Vector2_default()) (0, 0),
   translation = new (Vector2_default()) (0, 0),
   lineBound   = new (Vector2_default()) (0, 0),
   origin      = new (Vector3_default()) (0, 0, 0),
   vector      = new (Vector2_default()) (0, 0),
   box2        = new Geometry_Box2 (),
   zero2       = new (Vector2_default()) (0, 0),
   zero3       = new (Vector3_default()) (0, 0, 0);

function X3DTextGeometry (text, fontStyle)
{
   this .browser        = text .getBrowser ();
   this .text           = text;
   this .fontStyle      = fontStyle;
   this .glyphs         = [ ];
   this .minorAlignment = new (Vector2_default()) (0, 0);
   this .translations   = [ ];
   this .charSpacings   = [ ];
   this .bearing        = new (Vector2_default()) (0, 0);
   this .yPad           = [ ];
   this .bbox           = new (Box3_default()) ();
}

X3DTextGeometry .prototype =
{
   constructor: X3DTextGeometry,
   getBrowser: function ()
   {
      return this .browser;
   },
   getText: function ()
   {
      return this .text;
   },
   getFontStyle: function ()
   {
      return this .fontStyle;
   },
   getGlyphs: function ()
   {
      return this .glyphs;
   },
   getMinorAlignment: function ()
   {
      return this .minorAlignment;
   },
   getTranslations: function ()
   {
      return this .translations;
   },
   getCharSpacings: function ()
   {
      return this .charSpacings;
   },
   getBearing: function ()
   {
      return this .bearing;
   },
   getBBox: function ()
   {
      return this .bbox;
   },
   update: function ()
   {
      var
         text      = this .text,
         fontStyle = this .fontStyle,
         numLines  = text ._string .length;

      text ._lineBounds .length = numLines;
      this .glyphs      .length = 0;

      if (numLines === 0 || ! fontStyle .getFont ())
      {
         text ._origin     .setValue (zero3);
         text ._textBounds .setValue (zero2);

         this .bbox .set ();
         return;
      }

      if (fontStyle ._horizontal .getValue ())
      {
         this .resizeArray (this .translations, numLines);
         this .resizeArray (this .charSpacings, numLines);

         this .horizontal (text, fontStyle);
      }
      else
      {
         var
            string   = text ._string,
            numChars = 0;

         for (var i = 0, length = string .length; i < length; ++ i)
            numChars += string [i] .length;

         this .resizeArray (this .translations, numChars);
         this .resizeArray (this .charSpacings, numChars);

         this .vertical (text, fontStyle);
      }
   },
   resizeArray: function (array, size)
   {
      // Resize array in grow only fashion.

      for (var i = array .length; i < size; ++ i)
         array .push (new (Vector2_default()) (0, 0));

      array .length = size;
   },
   horizontal: function (text, fontStyle)
   {
      var
         font        = fontStyle .getFont (),
         string      = text ._string,
         numLines    = string .length,
         maxExtent   = Math .max (0, text ._maxExtent .getValue ()),
         topToBottom = fontStyle ._topToBottom .getValue (),
         scale       = fontStyle .getScale (),
         spacing     = fontStyle ._spacing .getValue ();

      bbox .set ();

      // Calculate bboxes.

      var
         first = topToBottom ? 0 : numLines - 1,
         last  = topToBottom ? numLines : -1,
         step  = topToBottom ? 1 : -1;

      for (var l = first, ll = 0; l !== last; l += step, ++ ll)
      {
         var line = string [l];

         // Get line extents.

         var glyphs = this .getHorizontalLineExtents (fontStyle, line, min, max, ll);

         size .assign (max) .subtract (min);

         // Calculate charSpacing and lineBounds.

         var
            charSpacing = 0,
            length      = text .getLength (l);

         lineBound .set (size .x * scale, ll == 0 ? max .y - font .descender / font .unitsPerEm * scale : spacing);

         if (maxExtent)
         {
            if (length)
               length = Math .min (maxExtent, length);

            else
               length = Math .min (maxExtent, size .x * scale);
         }

         if (length)
         {
            charSpacing  = (length - lineBound .x) / (glyphs .length - 1);
            lineBound .x = length;
            size .x      = length / scale;
         }

         this .charSpacings [ll] = charSpacing;
         text ._lineBounds [l]   = lineBound;

         // Calculate line translation.

         switch (fontStyle .getMajorAlignment ())
         {
            case Text_TextAlignment.BEGIN:
            case Text_TextAlignment.FIRST:
               this .translations [ll] .set (0, -ll * spacing);
               break;
            case Text_TextAlignment.MIDDLE:
               this .translations [ll] .set (-min .x - size .x / 2, -ll * spacing);
               break;
            case Text_TextAlignment.END:
               this .translations [ll] .set (-min .x - size .x, -ll * spacing);
               break;
         }

         this .translations [ll] .multiply (scale);

         // Calculate center.

         center .assign (min) .add (size1_2 .assign (size) .divide (2));

         // Add bbox.

         bbox .add (box2 .set (size .multiply (scale), center .multiply (scale) .add (this .translations [ll])));
      }

      //console .log ("size", bbox .size, "center", bbox .center);

      // Get text extents.

      bbox .getExtents (min, max);

      size .assign (max) .subtract (min);

      // Calculate text position

      text ._textBounds = size;
      this .bearing .set (0, -max .y);

      switch (fontStyle .getMinorAlignment ())
      {
         case Text_TextAlignment.BEGIN:
            this .minorAlignment .assign (this .bearing);
            break;
         case Text_TextAlignment.FIRST:
            this .minorAlignment .set (0, 0);
            break;
         case Text_TextAlignment.MIDDLE:
            this .minorAlignment .set (0, size .y / 2 - max .y);
            break;
         case Text_TextAlignment.END:
            this .minorAlignment .set (0, (numLines - 1) * spacing * scale);
            break;
      }

      // Translate bbox by minorAlignment.

      min .add (this .minorAlignment);
      max .add (this .minorAlignment);

      // The value of the origin field represents the upper left corner of the textBounds.

      text ._origin .setValue (origin .set (min .x, max .y, 0));

      this .bbox .setExtents (min3 .set (min .x, min .y, 0),
                              max3 .set (max .x, max .y, 0));
   },
   vertical: function (text, fontStyle)
   {
      var
         font             = fontStyle .getFont (),
         string           = text ._string,
         numLines         = string .length,
         maxExtent        = Math .max (0, text ._maxExtent .getValue ()),
         leftToRight      = fontStyle ._leftToRight .getValue (),
         topToBottom      = fontStyle ._topToBottom .getValue (),
         scale            = fontStyle .getScale (),
         spacing          = fontStyle ._spacing .getValue (),
         yPad             = this .yPad,
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality ();

      bbox .set ();

      // Calculate bboxes.

      var
         firstL = leftToRight ? 0 : numLines - 1,
         lastL  = leftToRight ? numLines : -1,
         stepL  = leftToRight ? 1 : -1,
         t      = 0; // Translation index

      for (var l = firstL; l !== lastL; l += stepL)
      {
         var glyphs = this .stringToGlyphs (font, string [l], true, l);

         var
            t0       = t,
            numChars = glyphs .length;

         // Calculate line bbox

         lineBBox .set ();

         var
            firstG = topToBottom ? 0 : numChars - 1,
            lastG  = topToBottom ? numChars : -1,
            stepG  = topToBottom ? 1 : -1;

         for (var g = firstG; g !== lastG; g += stepG, ++ t)
         {
            var glyph = glyphs [g];

            // Get glyph extents.

            this .getGlyphExtents (font, glyph, primitiveQuality, min, max);

            size .assign (max) .subtract (min);

            // Calculate glyph translation

            var glyphNumber = topToBottom ? g : numChars - g - 1;

            this .translations [t] .set ((spacing - size .x - min .x) / 2, -glyphNumber);

            // Calculate center.

            center .assign (min) .add (size1_2 .assign (size) .divide (2)) .add (this .translations [t]);

            // Add bbox.

            lineBBox .add (box2 .set (size, center));
         }

         // Get line extents.

         lineBBox .getExtents (min, max);

         size .assign (max) .subtract (min);

         // Calculate charSpacing and lineBounds.

         var
            lineNumber  = leftToRight ? l : numLines - l - 1,
            padding     = (spacing - size .x) / 2,
            charSpacing = 0,
            length      = text .getLength (l);

         lineBound .set (l === 0 ? spacing - padding: spacing, numChars ? size .y : 0) .multiply (scale);

         if (maxExtent)
         {
            if (length)
               length = Math .min (maxExtent, length);

            else
               length = Math .min (maxExtent, size .y * scale);
         }

         if (length)
         {
            charSpacing  = (length - lineBound .y) / (glyphs .length - 1) / scale;
            lineBound .y = length;
            size .y      = length / scale;
            min .y       = max .y  - size .y;
         }

         text ._lineBounds [l] = lineBound;

         // Calculate line translation.

         switch (fontStyle .getMajorAlignment ())
         {
            case Text_TextAlignment.BEGIN:
            case Text_TextAlignment.FIRST:
               translation .set (lineNumber * spacing, -1);
               break;
            case Text_TextAlignment.MIDDLE:
               translation .set (lineNumber * spacing, (size .y / 2 - max .y));
               break;
            case Text_TextAlignment.END:
            {
               // This is needed to make maxExtend and charSpacing work.
               if (numChars)
                  this .getGlyphExtents (font, glyphs [topToBottom ? numChars - 1 : 0], primitiveQuality, glyphMin .assign ((Vector2_default()).Zero), vector);

               translation .set (lineNumber * spacing, (size .y - max .y + glyphMin .y));
               break;
            }
         }

         // Calculate glyph translation

         var space = 0;

         for (var tt = t0; tt < t; ++ tt)
         {
            this .translations [tt] .add (translation);

            this .translations [tt] .y -= space;

            this .translations [tt] .multiply (scale);

            space += charSpacing;
         }

         // Calculate ypad to extend line bounds.

         switch (fontStyle .getMajorAlignment ())
         {
            case Text_TextAlignment.BEGIN:
            case Text_TextAlignment.FIRST:
               yPad [l] = max .y + translation .y;
               break;
            case Text_TextAlignment.MIDDLE:
               yPad [l] = 0;
               break;
            case Text_TextAlignment.END:
               yPad [l] = min .y + translation .y;
               break;
         }

         // Calculate center.

         center .assign (min) .add (size1_2 .assign (size) .divide (2));

         // Add bbox.

         bbox .add (box2 .set (size .multiply (scale), center .add (translation) .multiply (scale)));
      }

      // Get text extents.

      bbox .getExtents (min, max);

      size .assign (max) .subtract (min);

      // Extend lineBounds.

      switch (fontStyle .getMajorAlignment ())
      {
         case Text_TextAlignment.BEGIN:
         case Text_TextAlignment.FIRST:
         {
            var lineBounds = text ._lineBounds;

            for (var i = 0, length = lineBounds .length; i < length; ++ i)
               lineBounds [i] .y += max .y - yPad [i] * scale;

            break;
         }
         case Text_TextAlignment.MIDDLE:
            break;
         case Text_TextAlignment.END:
         {
            var lineBounds = text ._lineBounds;

            for (var i = 0, length = lineBounds .length; i < length; ++ i)
               lineBounds [i] .y += yPad [i] * scale - min .y;

            break;
         }
      }

      // Calculate text position

      text ._textBounds = size;

      switch (fontStyle .getMajorAlignment ())
      {
         case Text_TextAlignment.BEGIN:
         case Text_TextAlignment.FIRST:
            this .bearing .set (-min .x, max .y);
            break;
         case Text_TextAlignment.MIDDLE:
            this .bearing .set (-min .x, 0);
            break;
         case Text_TextAlignment.END:
            this .bearing .set (-min .x, min .y);
            break;
      }

      switch (fontStyle .getMinorAlignment ())
      {
         case Text_TextAlignment.BEGIN:
         case Text_TextAlignment.FIRST:
            this .minorAlignment .set (-min .x, 0);
            break;
         case Text_TextAlignment.MIDDLE:
            this .minorAlignment .set (-min .x - size .x / 2, 0);
            break;
         case Text_TextAlignment.END:
            this .minorAlignment .set (-min .x - size .x, 0);
            break;
      }

      // Translate bbox by minorAlignment.

      min .add (this .minorAlignment);
      max .add (this .minorAlignment);

      // The value of the origin field represents the upper left corner of the textBounds.

      text ._origin .setValue (origin .set (min .x, max .y, 0));

      this .bbox .set (min3 .set (min .x, min .y, 0),
                       max3 .set (max .x, max .y, 0),
                       true);
   },
   stringToGlyphs: function (font, line, normal, lineNumber)
   {
      var glypes = this .glyphs [lineNumber];

      if (! glypes)
         glypes = this .glyphs [lineNumber] = [ ];

      glypes .length = line .length;

      var
         first = normal ? 0 : line .length - 1,
         last  = normal ? line .length : -1,
         step  = normal ? 1 : -1;

      for (var c = first, g = 0; c !== last; c += step, ++ g)
         glypes [g] = font .charToGlyph (line [c]);

      return glypes;
   },
   getHorizontalLineExtents: function (fontStyle, line, min, max, lineNumber)
   {
      var
         font             = fontStyle .getFont (),
         normal           = fontStyle ._horizontal .getValue () ? fontStyle ._leftToRight .getValue () : fontStyle ._topToBottom .getValue (),
         glyphs           = this .stringToGlyphs (font, line, normal, lineNumber),
         primitiveQuality = this .getBrowser () .getBrowserOptions () .getPrimitiveQuality (),
         xMin             = 0,
         xMax             = 0,
         yMin             = Number .POSITIVE_INFINITY,
         yMax             = Number .NEGATIVE_INFINITY;

      for (var g = 0, length = glyphs .length; g < length; ++ g)
      {
         var
            glyph   = glyphs [g],
            kerning = g + 1 < length ? font .getKerningValue (glyph, glyphs [g + 1]) : 0;

         this .getGlyphExtents (font, glyph, primitiveQuality, glyphMin, glyphMax);

         xMax += glyph .advanceWidth + kerning;
         yMin  = Math .min (yMin, glyphMin .y);
         yMax  = Math .max (yMax, glyphMax .y);
      }

      if (glyphs .length)
      {
         this .getGlyphExtents (font, glyphs [0], primitiveQuality, glyphMin, glyphMax);

         xMin  = glyphMin .x;
      }
      else
      {
         yMin = 0;
         yMax = 0;
      }

      min .set (xMin, yMin);
      max .set (xMax / font .unitsPerEm, yMax);

      switch (fontStyle .getMajorAlignment ())
      {
         case Text_TextAlignment.BEGIN:
         case Text_TextAlignment.FIRST:
            min .x = 0;
            break;
      }

      return glyphs;
   },
   traverse: function (type, renderObject)
   { },
};

/* harmony default export */ const Text_X3DTextGeometry = (X3DTextGeometry);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/PixelTexture\")"
const PixelTexture_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Texturing/PixelTexture");
var PixelTexture_default = /*#__PURE__*/__webpack_require__.n(PixelTexture_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Rendering/X3DGeometryNode\")"
const X3DGeometryNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("x_ite/Components/Rendering/X3DGeometryNode");
var X3DGeometryNode_default = /*#__PURE__*/__webpack_require__.n(X3DGeometryNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.2.0")] .require ("standard/Math/Algorithm");
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
   Text_X3DTextGeometry.call (this, text, fontStyle);

   text .setTransparent (true);

   this .texCoordArray = X3DGeometryNode_default().createArray ();
   this .textureNode   = new (PixelTexture_default()) (text .getExecutionContext ());
   this .canvas        = $("<canvas></canvas>");
   this .context       = this .canvas [0] .getContext ("2d", { willReadFrequently: true });
   this .matrix        = new (Matrix4_default()) ();

   this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
   this .textureNode .setup ();
}

ScreenText .prototype = Object .assign (Object .create (Text_X3DTextGeometry.prototype),
{
   constructor: ScreenText,
   modelViewMatrix: new (Matrix4_default()) (),
   getTransparent: function ()
   {
      return true;
   },
   getMatrix: function ()
   {
      return this .matrix;
   },
   update: (function ()
   {
      const
         min = new (Vector3_default()) (0, 0, 0),
         max = new (Vector3_default()) (1, 1, 0);

      return function ()
      {
         Text_X3DTextGeometry.prototype.update.call (this);

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
            case Text_TextAlignment.BEGIN:
            case Text_TextAlignment.FIRST:
               min .x = Math .floor (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case Text_TextAlignment.MIDDLE:
               min .x = Math .round (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case Text_TextAlignment.END:
               max .x = Math .ceil (max .x);
               min .x = max .x - text ._textBounds .x;
               break;
         }

         switch (fontStyle .getMinorAlignment ())
         {
            case Text_TextAlignment.BEGIN:
            case Text_TextAlignment.FIRST:
               max .y = Math .ceil (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case Text_TextAlignment.MIDDLE:
               max .y = Math .round (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case Text_TextAlignment.END:
               min .y = Math .floor (min .y);
               max .y = min .y + text ._textBounds .y;
               break;
         }

         text ._origin .x = min .x;
         text ._origin .y = max .y;

         this .getBBox () .setExtents (min, max);
      };
   })(),
   build: (function ()
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
            this .textureNode .setTexture (canvas .width, canvas .height, true, new Uint8Array (imageData .data .buffer), false);
         else
            this .textureNode .clear ();
      };
   })(),
   drawGlyph: function (cx, font, glyph, x, y, size)
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
   getGlyphExtents: function (font, glyph, primitiveQuality, min, max)
   {
      const unitsPerEm = font .unitsPerEm;

      min .set ((glyph .xMin || 0) / unitsPerEm, (glyph .yMin || 0) / unitsPerEm, 0);
      max .set ((glyph .xMax || 0) / unitsPerEm, (glyph .yMax || 0) / unitsPerEm, 0);
   },
   traverse: (function ()
   {
      const bbox = new (Box3_default()) ();

      return function (type, renderObject)
      {
         this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix);

         // Update Text bbox.

         bbox .assign (this .getBBox ()) .multRight (this .matrix);

         this .getText () .setBBox (bbox);
      };
   })(),
   display: function (gl, renderContext)
   {
      Matrix4_default().prototype.multLeft.call (renderContext .modelViewMatrix, this .matrix);

      renderContext .textureNode = this .textureNode;
   },
   transformLine: function (line)
   {
      // Apply screen nodes transformation in place here.
      return line .multLineMatrix (Matrix4_default().inverse (this .matrix));
   },
   transformMatrix: function (matrix)
   {
      // Apply screen nodes transformation in place here.
      return matrix .multLeft (this .matrix);
   },
});

/* harmony default export */ const Layout_ScreenText = (ScreenText);

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
   Text_X3DFontStyleNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).ScreenFontStyle);
}

ScreenFontStyle .prototype = Object .assign (Object .create (Text_X3DFontStyleNode.prototype),
{
   constructor: ScreenFontStyle,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
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
   getTypeName: function ()
   {
      return "ScreenFontStyle";
   },
   getComponentName: function ()
   {
      return "Layout";
   },
   getContainerField: function ()
   {
      return "fontStyle";
   },
   getTextGeometry: function (text)
   {
      return new Layout_ScreenText (text, this);
   },
   getScale: function ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getPixelPerPoint ();
   },
});

/* harmony default export */ const Layout_ScreenFontStyle = (ScreenFontStyle);

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

   this .matrix = new (Matrix4_default()) ();
}

ScreenGroup .prototype = Object .assign (Object .create ((X3DGroupingNode_default()).prototype),
{
   constructor: ScreenGroup,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",        new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",    new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",       new (Fields_default()).SFVec3f (-1, -1, -1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",     new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "addChildren",    new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOnly,      "removeChildren", new (Fields_default()).MFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "children",       new (Fields_default()).MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ScreenGroup";
   },
   getComponentName: function ()
   {
      return "Layout";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getBBox: function (bbox, shadows)
   {
      return this .getSubBBox (bbox, shadows) .multRight (this .matrix);
   },
   getMatrix: function ()
   {
      return this .matrix;
   },
   traverse: function (type, renderObject)
   {
      switch (type)
      {
         case (TraverseType_default()).CAMERA:
         case (TraverseType_default()).PICKING:
         case (TraverseType_default()).SHADOW: // ???
            // No clone support for shadows, generated cube map texture and bbox
            break;
         default:
            this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix);
            break;
      }

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode_default().prototype.traverse.call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

/* harmony default export */ const Layout_ScreenGroup = (ScreenGroup);

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










Components_default().addComponent ({
   name: "Layout",
   types:
   {
      Layout:          Layout_Layout,
      LayoutGroup:     Layout_LayoutGroup,
      LayoutLayer:     Layout_LayoutLayer,
      ScreenFontStyle: Layout_ScreenFontStyle,
      ScreenGroup:     Layout_ScreenGroup,
   },
   abstractTypes:
   {
      X3DLayoutNode: Layout_X3DLayoutNode,
   },
   browserContext: Layout_X3DLayoutContext,
});

/* harmony default export */ const components_Layout = ((/* unused pure expression or super */ null && (undefined)));

})();

/******/ })()
;