/* X_ITE v11.5.9 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.5.9")];
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
;// external "__X_ITE_X3D__ .TextureProperties"
const external_X_ITE_X3D_TextureProperties_namespaceObject = __X_ITE_X3D__ .TextureProperties;
var external_X_ITE_X3D_TextureProperties_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextureProperties_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .ViewVolume"
const external_X_ITE_X3D_ViewVolume_namespaceObject = __X_ITE_X3D__ .ViewVolume;
var external_X_ITE_X3D_ViewVolume_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ViewVolume_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Browser/Layout/X3DLayoutContext.js
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






const _screenTextureProperties = Symbol ();

function X3DLayoutContext () { }

Object .assign (X3DLayoutContext .prototype,
{
   getScreenTextureProperties ()
   {
      return this [_screenTextureProperties] ??= (() =>
      {
         const screenTextureProperties = new (external_X_ITE_X3D_TextureProperties_default()) (this .getPrivateScene ());

         screenTextureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeT       = "CLAMP_TO_EDGE";
         screenTextureProperties ._boundaryModeR       = "CLAMP_TO_EDGE";
         screenTextureProperties ._minificationFilter  = "NEAREST_PIXEL";
         screenTextureProperties ._magnificationFilter = "NEAREST_PIXEL";
         screenTextureProperties ._generateMipMaps     = false;
         screenTextureProperties ._textureCompression  = "DEFAULT";

         screenTextureProperties .setup ();

         return screenTextureProperties;
      })();
   },
   getScreenScaleMatrix: (() =>
   {
      const
         screenScale  = new (external_X_ITE_X3D_Vector3_default()) (),
         screenPoint  = new (external_X_ITE_X3D_Vector3_default()) (),
         screenMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();

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
            external_X_ITE_X3D_ViewVolume_default().projectPoint ((external_X_ITE_X3D_Vector3_default()).Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            external_X_ITE_X3D_ViewVolume_default().unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

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

/* harmony default export */ const Layout_X3DLayoutContext = (external_X_ITE_X3D_Namespace_default().add ("X3DLayoutContext", __default__));
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
;// external "__X_ITE_X3D__ .X3DChildNode"
const external_X_ITE_X3D_X3DChildNode_namespaceObject = __X_ITE_X3D__ .X3DChildNode;
var external_X_ITE_X3D_X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DChildNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// ./src/x_ite/Components/Layout/X3DLayoutNode.js
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
   external_X_ITE_X3D_X3DChildNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DLayoutNode);
}

Object .setPrototypeOf (X3DLayoutNode .prototype, (external_X_ITE_X3D_X3DChildNode_default()).prototype);

Object .defineProperties (X3DLayoutNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DLayoutNode", "Layout", 1));

const X3DLayoutNode_default_ = X3DLayoutNode;
;

/* harmony default export */ const Layout_X3DLayoutNode = (external_X_ITE_X3D_Namespace_default().add ("X3DLayoutNode", X3DLayoutNode_default_));
;// external "__X_ITE_X3D__ .Vector2"
const external_X_ITE_X3D_Vector2_namespaceObject = __X_ITE_X3D__ .Vector2;
var external_X_ITE_X3D_Vector2_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector2_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// ./src/x_ite/Components/Layout/Layout.js
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

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).Layout);

   // Private properties

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
   this .rectangleCenter = new (external_X_ITE_X3D_Vector2_default()) ();
   this .rectangleSize   = new (external_X_ITE_X3D_Vector2_default()) ();
   this .matrix          = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (Layout .prototype, Layout_X3DLayoutNode .prototype),
{
   viewportPixel: new (external_X_ITE_X3D_Vector2_default()) (),
   pixelSize: new (external_X_ITE_X3D_Vector2_default()) (),
   translation: new (external_X_ITE_X3D_Vector3_default()) (),
   offset: new (external_X_ITE_X3D_Vector3_default()) (),
   scale: new (external_X_ITE_X3D_Vector3_default()) (1),
   currentTranslation: new (external_X_ITE_X3D_Vector3_default()) (),
   currentRotation: new (external_X_ITE_X3D_Rotation4_default()) (),
   currentScale: new (external_X_ITE_X3D_Vector3_default()) (),
   modelViewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
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
         navigationInfoNode  = renderObject .getNavigationInfo (),
         viewpointNode       = renderObject .getViewpoint (),
         nearValue           = viewpointNode .getNearDistance (navigationInfoNode),  // in meters
         viewport            = renderObject .getViewVolume () .getViewport (),       // in pixels
         viewportMeter       = viewpointNode .getViewportSize (viewport, nearValue), // in meters
         viewportPixel       = this .viewportPixel,                                  // in pixels
         pixelSize           = this .pixelSize,                                      // size of one pixel in meters
         parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter, // in meters
         rectangleSize       = this .rectangleSize,
         rectangleCenter     = this .rectangleCenter;

      viewportPixel .set (viewport [2], viewport [3]) .divide (contentScale); // in pixel
      pixelSize     .assign (viewportMeter) .divVec (viewportPixel);          // size of one pixel in meter

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

      const translation = this .translation .set (0);

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

            if (this .getSizeUnitX () === PIXEL && viewportPixel .y & 1)
               translation .y = -pixelSize .y / 2;

            break;
         case TOP:
            translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
            break;
      }

      // Calculate offset

      const offset = this .offset .set (0);

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
         scale              = this .scale .set (1),
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
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("Layout", "Layout", 1, "layout", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "align",       new (external_X_ITE_X3D_Fields_default()).MFString ("CENTER", "CENTER")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "offsetUnits", new (external_X_ITE_X3D_Fields_default()).MFString ("WORLD", "WORLD")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "offset",      new (external_X_ITE_X3D_Fields_default()).MFFloat (0, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "sizeUnits",   new (external_X_ITE_X3D_Fields_default()).MFString ("WORLD", "WORLD")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "size",        new (external_X_ITE_X3D_Fields_default()).MFFloat (1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "scaleMode",   new (external_X_ITE_X3D_Fields_default()).MFString ("NONE", "NONE")),
      ]),
      enumerable: true,
   },
});

const Layout_default_ = Layout;
;

/* harmony default export */ const Layout_Layout = (external_X_ITE_X3D_Namespace_default().add ("Layout", Layout_default_));
;// external "__X_ITE_X3D__ .X3DGroupingNode"
const external_X_ITE_X3D_X3DGroupingNode_namespaceObject = __X_ITE_X3D__ .X3DGroupingNode;
var external_X_ITE_X3D_X3DGroupingNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DGroupingNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// ./src/x_ite/Components/Layout/LayoutGroup.js
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
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).LayoutGroup);

   this .setCollisionObject (false);

   // Private properties

   this .matrix          = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .modelViewMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .screenMatrix    = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (Object .setPrototypeOf (LayoutGroup .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGroupingNode_default().prototype .initialize .call (this);

      this ._viewport .addInterest ("set_viewport__",       this);
      this ._layout   .addInterest ("set_layout__",         this);
      this ._bboxSize .addInterest ("set_visibleObjects__", this);

      this .set_viewport__ ();
      this .set_layout__ ();
   },
   set_viewport__ ()
   {
      this .viewportNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DViewportNode, this ._viewport);
   },
   set_layout__ ()
   {
      this .layoutNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DLayoutNode, this ._layout);
   },
   set_collisionObjects__ ()
   { },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size || this .bboxObjects .size || this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
   getBBox (bbox, shadows)
   {
      return external_X_ITE_X3D_X3DGroupingNode_default().prototype .getBBox .call (this, bbox, shadows) .multRight (this .getMatrix ());
   },
   getMatrix ()
   {
      if (this .layoutNode)
         return this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);

      return this .matrix .identity ();
   },
   traverse (type, renderObject)
   {
      this .viewportNode ?.push ();

      if (this .layoutNode)
      {
         const modelViewMatrix = renderObject .getModelViewMatrix ();

         this .modelViewMatrix .assign (modelViewMatrix .get ());
         this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

         modelViewMatrix .push (this .screenMatrix);
         renderObject .getLayouts () .push (this .layoutNode);

         external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

         renderObject .getLayouts () .pop ();
         modelViewMatrix .pop ();
      }
      else
      {
         external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);
      }

      this .viewportNode ?.pop ();
   },
});

Object .defineProperties (LayoutGroup,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("LayoutGroup", "Layout", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "layout",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "viewport",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const LayoutGroup_default_ = LayoutGroup;
;

/* harmony default export */ const Layout_LayoutGroup = (external_X_ITE_X3D_Namespace_default().add ("LayoutGroup", LayoutGroup_default_));
;// external "__X_ITE_X3D__ .X3DLayerNode"
const external_X_ITE_X3D_X3DLayerNode_namespaceObject = __X_ITE_X3D__ .X3DLayerNode;
var external_X_ITE_X3D_X3DLayerNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DLayerNode_namespaceObject);
;// external "__X_ITE_X3D__ .OrthoViewpoint"
const external_X_ITE_X3D_OrthoViewpoint_namespaceObject = __X_ITE_X3D__ .OrthoViewpoint;
var external_X_ITE_X3D_OrthoViewpoint_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_OrthoViewpoint_namespaceObject);
;// ./src/x_ite/Components/Layout/LayoutLayer.js
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
   external_X_ITE_X3D_X3DLayerNode_default().call (this,
                       executionContext,
                       new (external_X_ITE_X3D_OrthoViewpoint_default()) (executionContext),
                       new Layout_LayoutGroup (executionContext));

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).LayoutLayer);
}

Object .assign (Object .setPrototypeOf (LayoutLayer .prototype, (external_X_ITE_X3D_X3DLayerNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DLayerNode_default().prototype .initialize .call (this);

      const groupNode = this .getGroups () ._children [0] .getValue ();

      this ._layout         .addFieldInterest (groupNode ._layout);
      this ._addChildren    .addFieldInterest (groupNode ._addChildren);
      this ._removeChildren .addFieldInterest (groupNode ._removeChildren);
      this ._children       .addFieldInterest (groupNode ._children);

      groupNode ._layout   = this ._layout;
      groupNode ._children = this ._children;

      groupNode .setPrivate (true);
      groupNode .setup ();

      this .getGroups () .setup ();
   },
});

Object .defineProperties (LayoutLayer,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("LayoutLayer", "Layout", 1, "layers", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "pickable",       new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "objectType",     new (external_X_ITE_X3D_Fields_default()).MFString ("ALL")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "pointerEvents",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)), // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "layout",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "viewport",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,   "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const LayoutLayer_default_ = LayoutLayer;
;

/* harmony default export */ const Layout_LayoutLayer = (external_X_ITE_X3D_Namespace_default().add ("LayoutLayer", LayoutLayer_default_));
;// external "__X_ITE_X3D__ .X3DFontStyleNode"
const external_X_ITE_X3D_X3DFontStyleNode_namespaceObject = __X_ITE_X3D__ .X3DFontStyleNode;
var external_X_ITE_X3D_X3DFontStyleNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DFontStyleNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DTextGeometry"
const external_X_ITE_X3D_X3DTextGeometry_namespaceObject = __X_ITE_X3D__ .X3DTextGeometry;
var external_X_ITE_X3D_X3DTextGeometry_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DTextGeometry_namespaceObject);
;// external "__X_ITE_X3D__ .TextAlignment"
const external_X_ITE_X3D_TextAlignment_namespaceObject = __X_ITE_X3D__ .TextAlignment;
var external_X_ITE_X3D_TextAlignment_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TextAlignment_namespaceObject);
;// external "__X_ITE_X3D__ .PixelTexture"
const external_X_ITE_X3D_PixelTexture_namespaceObject = __X_ITE_X3D__ .PixelTexture;
var external_X_ITE_X3D_PixelTexture_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_PixelTexture_namespaceObject);
;// external "__X_ITE_X3D__ .Box3"
const external_X_ITE_X3D_Box3_namespaceObject = __X_ITE_X3D__ .Box3;
var external_X_ITE_X3D_Box3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Box3_namespaceObject);
;// external "__X_ITE_X3D__ .Algorithm"
const external_X_ITE_X3D_Algorithm_namespaceObject = __X_ITE_X3D__ .Algorithm;
var external_X_ITE_X3D_Algorithm_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Algorithm_namespaceObject);
;// ./src/x_ite/Browser/Layout/ScreenText.js
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
   external_X_ITE_X3D_X3DTextGeometry_default().call (this, text, fontStyle);

   text .setTransparent (true);

   this .textureNode     = new (external_X_ITE_X3D_PixelTexture_default()) (text .getExecutionContext ());
   this .context         = document .createElement ("canvas") .getContext ("2d", { willReadFrequently: true });
   this .modelViewMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .matrix          = new (external_X_ITE_X3D_Matrix4_default()) ();

   this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
   this .textureNode .setup ();
}

Object .assign (Object .setPrototypeOf (ScreenText .prototype, (external_X_ITE_X3D_X3DTextGeometry_default()).prototype),
{
   modelViewMatrix: new (external_X_ITE_X3D_Matrix4_default()) (),
   getMatrix ()
   {
      return this .matrix;
   },
   update: (() =>
   {
      const
         min = new (external_X_ITE_X3D_Vector3_default()) (),
         max = new (external_X_ITE_X3D_Vector3_default()) (1, 1, 0);

      return function ()
      {
         external_X_ITE_X3D_X3DTextGeometry_default().prototype .update .call (this);

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
            case (external_X_ITE_X3D_TextAlignment_default()).BEGIN:
            case (external_X_ITE_X3D_TextAlignment_default()).FIRST:
               min .x = Math .floor (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case (external_X_ITE_X3D_TextAlignment_default()).MIDDLE:
               min .x = Math .round (min .x);
               max .x = min .x + text ._textBounds .x;
               break;
            case (external_X_ITE_X3D_TextAlignment_default()).END:
               max .x = Math .ceil (max .x);
               min .x = max .x - text ._textBounds .x;
               break;
         }

         switch (fontStyle .getMinorAlignment ())
         {
            case (external_X_ITE_X3D_TextAlignment_default()).BEGIN:
            case (external_X_ITE_X3D_TextAlignment_default()).FIRST:
               max .y = Math .ceil (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case (external_X_ITE_X3D_TextAlignment_default()).MIDDLE:
               max .y = Math .round (max .y);
               min .y = max .y - text ._textBounds .y;
               break;
            case (external_X_ITE_X3D_TextAlignment_default()).END:
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
         min = new (external_X_ITE_X3D_Vector3_default()) (),
         max = new (external_X_ITE_X3D_Vector3_default()) (1, 1, 0);

      return function ()
      {
         const
            fontStyle = this .getFontStyle (),
            font      = fontStyle .getFont ();

         if (!font)
            return;

         const
            text           = this .getText (),
            glyphs         = this .getGlyphs (),
            minorAlignment = this .getMinorAlignment (),
            translations   = this .getTranslations (),
            charSpacings   = this .getCharSpacings (),
            scales         = this .getScales (),
            size           = fontStyle .getScale (), // in pixel
            sizeUnitsPerEm = size / font .unitsPerEm,
            texCoordArray  = text .getTexCoords (),
            normalArray    = text .getNormals (),
            vertexArray    = text .getVertices (),
            canvas         = this .context .canvas,
            cx             = this .context;

         // Set texCoord.

         text .getMultiTexCoords () .push (texCoordArray);

         // Triangle one and two.

         this .getBBox () .getExtents (min, max);

         normalArray .push (0, 0, 1,
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

         canvas .width  = external_X_ITE_X3D_Algorithm_default().nextPowerOfTwo (width),
         canvas .height = external_X_ITE_X3D_Algorithm_default().nextPowerOfTwo (height);

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
                  translation = translations [l],
                  charSpacing = charSpacings [l],
                  scale       = scales [l];

               let advanceWidth = 0;

               for (let g = 0, gl = line .length; g < gl; ++ g)
               {
                  const
                     glyph = line [g],
                     x     = minorAlignment .x + translation .x + advanceWidth * scale + g * charSpacing - min .x,
                     y     = minorAlignment .y + translation .y - max .y;

                  cx .save ();
                  cx .translate (x, -y);
                  cx .scale (scale, 1);

                  this .drawGlyph (cx, font, glyph, size);

                  cx .restore ();

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
               const
                  line        = glyphs [l],
                  numChars    = line .length,
                  firstG      = topToBottom ? 0 : numChars - 1,
                  lastG       = topToBottom ? numChars : -1,
                  stepG       = topToBottom ? 1 : -1,
                  charSpacing = charSpacings [l],
                  scale       = scales [l];

               for (let g = firstG; g !== lastG; g += stepG, ++ t)
               {
                  const translation = translations [t];

                  const
                     x = minorAlignment .x + translation .x - min .x,
                     y = minorAlignment .y + translation .y * scale - g * charSpacing - max .y;

                  cx .save ();
                  cx .translate (x, -y);
                  cx .scale (1, scale);

                  this .drawGlyph (cx, font, line [g], size);

                  cx .restore ();
               }
            }
         }

         cx .restore ();

         // Transfer texture data.

         const imageData = cx .getImageData (0, 0, canvas .width, canvas .height);

         // If the canvas is to large imageData is null.

         if (imageData)
            this .textureNode .setTextureData (canvas .width, canvas .height, true, true, new Uint8Array (imageData .data .buffer));
         else
            this .textureNode .clear ();
      };
   })(),
   drawGlyph (cx, font, glyph, size)
   {
      //console .log (glyph .name, x, y);

      // Get curves for the current glyph.

      const
         path     = glyph .getPath (0, 0, size),
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
      const bbox = new (external_X_ITE_X3D_Box3_default()) ();

      return function (type, renderObject)
      {
         this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix, 1, true);

         this .modelViewMatrix
            .assign (renderObject .getModelViewMatrix () .get ())
            .multLeft (this .matrix);

         // Update Text bbox.

         bbox .assign (this .getBBox ()) .multRight (this .matrix);

         this .getText () .setBBox (bbox);
      };
   })(),
   displaySimple (gl, renderContext, shaderNode)
   {
      renderContext .modelViewMatrix .set (this .modelViewMatrix);

      gl .uniformMatrix4fv (shaderNode .x3d_ModelViewMatrix, false, renderContext .modelViewMatrix);
   },
   display (gl, renderContext)
   {
      renderContext .modelViewMatrix .set (this .modelViewMatrix);

      renderContext .textureNode = this .textureNode;
   },
   transformLine: (() =>
   {
      const invMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();

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

/* harmony default export */ const Layout_ScreenText = (external_X_ITE_X3D_Namespace_default().add ("ScreenText", ScreenText_default_));
;// ./src/x_ite/Components/Layout/ScreenFontStyle.js
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
   external_X_ITE_X3D_X3DFontStyleNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ScreenFontStyle);
}

Object .assign (Object .setPrototypeOf (ScreenFontStyle .prototype, (external_X_ITE_X3D_X3DFontStyleNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DFontStyleNode_default().prototype .initialize .call (this);

      this .getBrowser () .getRenderingProperties () ._ContentScale .addInterest ("addNodeEvent", this);
   },
   createTextGeometry (text)
   {
      return new Layout_ScreenText (text, this);
   },
   getScale ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getRenderingProperty ("PixelsPerPoint");
   },
   getContentScale ()
   {
      return this .getBrowser () .getRenderingProperty ("ContentScale");
   },
});

Object .defineProperties (ScreenFontStyle,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ScreenFontStyle", "Layout", 2, "fontStyle", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",    new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "language",    new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "family",      new (external_X_ITE_X3D_Fields_default()).MFString ("SERIF")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "style",       new (external_X_ITE_X3D_Fields_default()).SFString ("PLAIN")),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "pointSize",   new (external_X_ITE_X3D_Fields_default()).SFFloat (12)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "spacing",     new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "horizontal",  new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "leftToRight", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "topToBottom", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "justify",     new (external_X_ITE_X3D_Fields_default()).MFString ("BEGIN")),
      ]),
      enumerable: true,
   },
});

const ScreenFontStyle_default_ = ScreenFontStyle;
;

/* harmony default export */ const Layout_ScreenFontStyle = (external_X_ITE_X3D_Namespace_default().add ("ScreenFontStyle", ScreenFontStyle_default_));
;// external "__X_ITE_X3D__ .TraverseType"
const external_X_ITE_X3D_TraverseType_namespaceObject = __X_ITE_X3D__ .TraverseType;
var external_X_ITE_X3D_TraverseType_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_TraverseType_namespaceObject);
;// external "__X_ITE_X3D__ .X3DProtoDeclaration"
const external_X_ITE_X3D_X3DProtoDeclaration_namespaceObject = __X_ITE_X3D__ .X3DProtoDeclaration;
var external_X_ITE_X3D_X3DProtoDeclaration_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DProtoDeclaration_namespaceObject);
;// ./src/x_ite/Components/Layout/ScreenGroup.js
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
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ScreenGroup);

   // Private properties

   if (executionContext .getOuterNode () instanceof (external_X_ITE_X3D_X3DProtoDeclaration_default()))
      this .matrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   else
      this .matrix = new (external_X_ITE_X3D_Matrix4_default()) (0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
}

Object .assign (Object .setPrototypeOf (ScreenGroup .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DGroupingNode_default().prototype .initialize .call (this);

      this ._bboxSize .addInterest ("set_visibleObjects__", this);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size || this .bboxObjects .size || this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
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
         case (external_X_ITE_X3D_TraverseType_default()).CAMERA:
         case (external_X_ITE_X3D_TraverseType_default()).PICKING:
         case (external_X_ITE_X3D_TraverseType_default()).SHADOW: // ???
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

      external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (ScreenGroup,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("ScreenGroup", "Layout", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",       new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "visible",        new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "bboxDisplay",    new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxSize",       new (external_X_ITE_X3D_Fields_default()).SFVec3f (-1, -1, -1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "bboxCenter",     new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "addChildren",    new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOnly,      "removeChildren", new (external_X_ITE_X3D_Fields_default()).MFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "children",       new (external_X_ITE_X3D_Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const ScreenGroup_default_ = ScreenGroup;
;

/* harmony default export */ const Layout_ScreenGroup = (external_X_ITE_X3D_Namespace_default().add ("ScreenGroup", ScreenGroup_default_));
;// ./src/assets/components/LayoutComponent.js
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

const LayoutComponent_default_ = undefined;
;

/* harmony default export */ const LayoutComponent = (external_X_ITE_X3D_Namespace_default().add ("LayoutComponent", LayoutComponent_default_));
/******/ })()
;