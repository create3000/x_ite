/* X_ITE v15.1.4 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D")];
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
            viewport         = renderObject .getViewVolumes () .at (-1) .getViewport ();

         // Determine screenMatrix.
         // Same as in ScreenText.

         renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

         const
            x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x * contentScale),
            y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y * contentScale),
            z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x * contentScale);

         screenMatrix .set (... x, 0,
                            ... y, 0,
                            ... z, 0,
                            modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

         // Snap to whole pixel.

         if (snap)
         {
            external_X_ITE_X3D_ViewVolume_default().projectPoint ((external_X_ITE_X3D_Vector3_default()).ZERO, screenMatrix, projectionMatrix, viewport, screenPoint);

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
;// external "__X_ITE_X3D__ .Vector4"
const external_X_ITE_X3D_Vector4_namespaceObject = __X_ITE_X3D__ .Vector4;
var external_X_ITE_X3D_Vector4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector4_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .ObjectCache"
const external_X_ITE_X3D_ObjectCache_namespaceObject = __X_ITE_X3D__ .ObjectCache;
var external_X_ITE_X3D_ObjectCache_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ObjectCache_namespaceObject);
;// ./src/x_ite/Components/Layout/Layout.js













const Rectangles = external_X_ITE_X3D_ObjectCache_default() ((external_X_ITE_X3D_Vector4_default()));

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
}

Object .assign (Object .setPrototypeOf (Layout .prototype, Layout_X3DLayoutNode .prototype),
{
   initialize ()
   {
      Layout_X3DLayoutNode .prototype .initialize .call (this);

      this ._align       .addInterest ("set_align__",       this);
      this ._offsetUnits .addInterest ("set_offsetUnits__", this);
      this ._offset      .addInterest ("set_offset__",      this);
      this ._sizeUnits   .addInterest ("set_sizeUnits__",   this);
      this ._size        .addInterest ("set_size__",        this);
      this ._scaleMode   .addInterest ("set_scaleMode__",   this);

      this .set_align__ ();
      this .set_offsetUnits__ ();
      this .set_offset__ ();
      this .set_sizeUnits__ ();
      this .set_size__ ();
      this .set_scaleMode__ ();
   },
   set_align__ ()
   {
      // If the align field has only one value, that value shall be "CENTER".

      // X

      if (this ._align [0] === "LEFT")
         this .alignX = LEFT;

      else if (this ._align [0] === "RIGHT")
         this .alignX = RIGHT;

      else
         this .alignX = CENTER;

      // Y

      if (this ._align [1] === "BOTTOM")
         this .alignY = BOTTOM;

      else if (this ._align [1] === "TOP")
         this .alignY = TOP;

      else
         this .alignY = CENTER;
   },
   set_offsetUnits__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .offsetUnitY = this .offsetUnitX;
      }
   },
   set_offset__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

      // X and Y

      this .offsetX = this ._offset [0] ?? 0;
      this .offsetY = this ._offset [1] ?? this .offsetX;
   },
   set_sizeUnits__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .sizeUnitY = this .sizeUnitX;
      }
   },
   set_size__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

      // X and Y

      this .sizeX = this ._size [0] ?? 0;
      this .sizeY = this ._size [1] ?? this .sizeX;
   },
   set_scaleMode__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .scaleModeY = this .scaleModeX;
      }
   },
   getAlignX ()
   {
      return this .alignX;
   },
   getAlignY ()
   {
      return this .alignY;
   },
   getOffsetUnitX (parents, index)
   {
      if (this .offsetUnitX === WORLD)
         return parents [index] ?.getOffsetUnitX (parents, index - 1) ?? FRACTION;

      return this .offsetUnitX;
   },
   getOffsetUnitY (parents, index)
   {
      if (this .offsetUnitY === WORLD)
         return parents [index] ?.getOffsetUnitY (parents, index - 1) ?? FRACTION;

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
   getSizeUnitX (parents, index)
   {
      if (this .sizeUnitX === WORLD)
         return parents [index] ?.getSizeUnitX (parents, index - 1) ?? FRACTION;

      return this .sizeUnitX;
   },
   getSizeUnitY (parents, index)
   {
      if (this .sizeUnitY === WORLD)
         return parents [index] ?.getSizeUnitY (parents, index - 1) ?? FRACTION;

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
   getScaleModeX (parent)
   {
      if (parent)
         return this .scaleModeX;

      if (this .scaleModeX === NONE)
         return FRACTION;

      return this .scaleModeX;
   },
   getScaleModeY (parent)
   {
      if (parent)
         return this .scaleModeY;

      if (this .scaleModeY === NONE)
         return FRACTION;

      return this .scaleModeY;
   },
   push: (() =>
   {
      const
         rootRectangle      = new (external_X_ITE_X3D_Vector4_default()) (), // x, y, width, height
         viewportPixel      = new (external_X_ITE_X3D_Vector2_default()) (), // in pixels
         pixelSize          = new (external_X_ITE_X3D_Vector2_default()) (), // size of one pixel in meters
         translation        = new (external_X_ITE_X3D_Vector3_default()) (),
         offset             = new (external_X_ITE_X3D_Vector3_default()) (),
         scale              = new (external_X_ITE_X3D_Vector3_default()) (),
         currentTranslation = new (external_X_ITE_X3D_Vector3_default()) (),
         currentRotation    = new (external_X_ITE_X3D_Rotation4_default()) (),
         currentScale       = new (external_X_ITE_X3D_Vector3_default()) (),
         matrix             = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function (type, renderObject)
      {
         // Get parent layouts.

         const
            parents = renderObject .getLayouts (),
            index   = parents .length - 1;

         // Determine rectangleSize, rectangleCenter and layout matrix.

         const
            browser            = this .getBrowser (),
            contentScale       = browser .getRenderingProperty ("ContentScale"),
            navigationInfoNode = renderObject .getNavigationInfo (),
            viewpointNode      = renderObject .getViewpoint (),
            nearValue          = viewpointNode .getNearDistance (navigationInfoNode),      // in meters
            viewport           = renderObject .getViewVolumes () .at (-1) .getViewport (), // in pixels
            viewportMeter      = viewpointNode .getViewportSize (viewport, nearValue),     // in meters
            rectangle          = Rectangles .pop (),
            parentRectangle    = renderObject .getLayoutRectangles () .at (-1)
               ?? rootRectangle .set (0, 0, ... viewportMeter), // in meters
            modelViewMatrix    = renderObject .getModelViewMatrix ();

         viewportPixel .set (viewport [2], viewport [3]) .divide (contentScale); // in pixel
         pixelSize     .assign (viewportMeter) .divVec (viewportPixel);          // size of one pixel in meter

         // Determine rectangle size.

         const
            sizeUnitX = this .getSizeUnitX (parents, index),
            sizeUnitY = this .getSizeUnitY (parents, index);

         switch (sizeUnitX)
         {
            case FRACTION:
               rectangle .z = this .sizeX * parentRectangle .z;
               break;
            case PIXEL:
               rectangle .z = this .sizeX * pixelSize .x;
               break;
            default:
               break;
         }

         switch (sizeUnitY)
         {
            case FRACTION:
               rectangle .w = this .sizeY * parentRectangle .w;
               break;
            case PIXEL:
               rectangle .w = this .sizeY * pixelSize .y;
               break;
            default:
               break;
         }

         // Determine translation.

         translation .set (0);

         switch (this .getAlignX ())
         {
            case LEFT:
               translation .x = -(parentRectangle .z - rectangle .z) / 2;
               break;
            case CENTER:

               if (sizeUnitX === PIXEL && viewportPixel .x & 1)
                  translation .x = -pixelSize .x / 2;

               break;
            case RIGHT:
               translation .x = (parentRectangle .z - rectangle .z) / 2;
               break;
         }

         switch (this .getAlignY ())
         {
            case BOTTOM:
               translation .y = -(parentRectangle .w - rectangle .w) / 2;
               break;
            case CENTER:

               if (sizeUnitX === PIXEL && viewportPixel .y & 1)
                  translation .y = -pixelSize .y / 2;

               break;
            case TOP:
               translation .y = (parentRectangle .w - rectangle .w) / 2;
               break;
         }

         // Determine offset.

         offset .set (0);

         switch (this .getOffsetUnitX (parents, index))
         {
            case FRACTION:
               offset .x = this .offsetX * parentRectangle .z;
               break;
            case PIXEL:
               offset .x = this .offsetX * viewportMeter .x / viewportPixel .x;
               break;
         }

         switch (this .getOffsetUnitY (parents, index))
         {
            case FRACTION:
               offset .y = this .offsetY * parentRectangle .w;
               break;
            case PIXEL:
               offset .y = this .offsetY * viewportMeter .y / viewportPixel .y;
               break;
         }

         // Determine scale.

         const
            scaleModeX = this .getScaleModeX (parents [index]),
            scaleModeY = this .getScaleModeY (parents [index]);

         scale .set (1);
         modelViewMatrix .get () .getTransform (currentTranslation, currentRotation, currentScale);

         switch (scaleModeX)
         {
            case NONE:
               scale .x = currentScale .x;
               break;
            case FRACTION:
               scale .x = rectangle .z;
               break;
            case STRETCH:
               break;
            case PIXEL:
               scale .x = viewportMeter .x / viewportPixel .x;
               break;
         }

         switch (scaleModeY)
         {
            case NONE:
               scale .y = currentScale .y;
               break;
            case FRACTION:
               scale .y = rectangle .w;
               break;
            case STRETCH:
               break;
            case PIXEL:
               scale .y = viewportMeter .y / viewportPixel .y;
               break;
         }

         // Determine scale for scaleMode STRETCH.

         if (scaleModeX === STRETCH)
         {
            if (scaleModeY === STRETCH)
            {
               if (rectangle .z > rectangle .w)
               {
                  scale .x = rectangle .z;
                  scale .y = scale .x;
               }
               else
               {
                  scale .y = rectangle .w;
                  scale .x = scale .y;
               }
            }
            else
            {
               scale .x = scale .y;
            }
         }
         else if (scaleModeY === STRETCH)
         {
            scale .y = scale .x;
         }

         // Determine matrix and rectangle.

         translation .add (offset);

         rectangle .x = translation .x;
         rectangle .y = translation .y;

         matrix
            .setTransform (currentTranslation, currentRotation)
            .translate (translation)
            .scale (scale);

         // Push all on stacks.

         modelViewMatrix .push (matrix);
         renderObject .getLayouts () .push (this);
         renderObject .getLayoutRectangles () .push (rectangle);
      };
   })(),
   pop (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      Rectangles .push (renderObject .getLayoutRectangles () .pop ());
      renderObject .getLayouts () .pop ();
      modelViewMatrix .pop ();
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

      this ._viewport .addInterest ("set_viewport__", this);
      this ._layout   .addInterest ("set_layout__",   this);

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
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .getSubBBox (bbox, shadows) .multRight (this .getMatrix ());

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getMatrix ()
   {
      if (this .layoutNode)
         return this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);

      return this .matrix .set ();
   },
   traverse (type, renderObject)
   {
      this .viewportNode ?.push (renderObject);

      if (this .layoutNode)
      {
         const modelViewMatrix = renderObject .getModelViewMatrix ();

         this .modelViewMatrix .assign (modelViewMatrix .get ());
         this .layoutNode .push (type, renderObject);
         this .screenMatrix .assign (modelViewMatrix .get ());

         external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);

         this .layoutNode .pop (type, renderObject);
      }
      else
      {
         external_X_ITE_X3D_X3DGroupingNode_default().prototype .traverse .call (this, type, renderObject);
      }

      this .viewportNode ?.pop (renderObject);
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
      const groupNode = this .getGroup ();

      this ._layout .addFieldInterest (groupNode ._layout);

      groupNode ._layout = this ._layout;

      // Call super at end!
      external_X_ITE_X3D_X3DLayerNode_default().prototype .initialize .call (this);
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
;// ./src/x_ite/Browser/Layout/ScreenText.js







function ScreenText (text, fontStyle)
{
   external_X_ITE_X3D_X3DTextGeometry_default().call (this, text, fontStyle);

   text .setTransparent (true);

   // Private properties

   this .textureNode = new (external_X_ITE_X3D_PixelTexture_default()) (text .getExecutionContext ());
   this .context     = document .createElement ("canvas") .getContext ("2d", { willReadFrequently: true });
   this .matrix      = new (external_X_ITE_X3D_Matrix4_default()) ();

   this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
   this .textureNode .setup ();
}

Object .assign (Object .setPrototypeOf (ScreenText .prototype, (external_X_ITE_X3D_X3DTextGeometry_default()).prototype),
{
   getMatrix ()
   {
      return this .matrix;
   },
   getTextureNode ()
   {
      return this .textureNode;
   },
   configure: (() =>
   {
      const
         min = new (external_X_ITE_X3D_Vector3_default()) (),
         max = new (external_X_ITE_X3D_Vector3_default()) ();

      return function ()
      {
         external_X_ITE_X3D_X3DTextGeometry_default().prototype .configure .call (this);

         const
            fontStyle    = this .getFontStyle (),
            text         = this .getText (),
            contentScale = fontStyle .getContentScale (),
            offset       = 1; // For antialiasing border on bottom and right side

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

         this .getBBox () .setExtents (min, max);

         this .matrix .assign ((external_X_ITE_X3D_Matrix4_default()).ZERO);

         // Scale origin, text and line bounds by contentScale.

         text ._origin .x = min .x / contentScale;
         text ._origin .y = max .y / contentScale;

         text ._textBounds .x /= contentScale;
         text ._textBounds .y /= contentScale;

         for (const lineBound of text ._lineBounds)
         {
            lineBound .x /= contentScale;
            lineBound .y /= contentScale;
         }
      };
   })(),
   build: (() =>
   {
      const
         min = new (external_X_ITE_X3D_Vector3_default()) (),
         max = new (external_X_ITE_X3D_Vector3_default()) ();

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
            contentScale   = fontStyle .getContentScale (),
            canvas         = this .context .canvas,
            cx             = this .context;

         // Set texCoord.

         text .getMultiTexCoords () .push (texCoordArray);

         // Triangle one and two.

         this .getBBox () .getExtents (min, max);

         texCoordArray .push (0, 0, 0, 1,
                              1, 0, 0, 1,
                              1, 1, 0, 1,
                              0, 0, 0, 1,
                              1, 1, 0, 1,
                              0, 1, 0, 1);

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

         const [width, height] = text ._textBounds;

         // Scale canvas.

         canvas .width  = width  * contentScale;
         canvas .height = height * contentScale;

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
            const numLines = glyphs .length;

            for (let l = 0; l < numLines; ++ l)
            {
               const
                  line        = glyphs [l],
                  translation = translations [l],
                  charSpacing = charSpacings [l],
                  scale       = scales [l],
                  numGlyphs   = line .length;

               let advanceWidth = 0;

               for (let g = 0; g < numGlyphs; ++ g)
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
                     glyphNumber = topToBottom ? g : numChars - g - 1,
                     x = minorAlignment .x + translation .x - min .x,
                     y = minorAlignment .y + translation .y * scale - glyphNumber * charSpacing - max .y;

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

      for (const command of commands)
      {
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
   traverseBefore: (() =>
   {
      const
         bbox   = new (external_X_ITE_X3D_Box3_default()) (),
         matrix = new (external_X_ITE_X3D_Matrix4_default()) ();

      return function (type, renderObject, shapeNode)
      {
         this .getBrowser () .getScreenScaleMatrix (renderObject, matrix, 1, true);

         const modelViewMatrix = renderObject .getModelViewMatrix ();

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (matrix);

         if (matrix .equals (this .matrix))
            return;

         this .matrix .assign (matrix);

         // Update Text bbox.

         bbox .assign (this .getBBox ()) .multRight (this .matrix);

         this .getText () .setBBox (bbox);

         // Immediately update X3DShapeNode bbox.

         shapeNode .set_bbox__ ();
      };
   })(),
   traverseAfter (type, renderObject)
   {
      renderObject .getModelViewMatrix () .pop ();
   },
});

const ScreenText_default_ = ScreenText;
;

/* harmony default export */ const Layout_ScreenText = (external_X_ITE_X3D_Namespace_default().add ("ScreenText", ScreenText_default_));
;// ./src/x_ite/Components/Layout/ScreenFontStyle.js








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

      // Trigger requestRebuild of text geometry when ContentScale changes.
      this .getBrowser () .getRenderingProperties () ._ContentScale .addInterest ("addNodeEvent", this);
   },
   createTextGeometry (text)
   {
      return new Layout_ScreenText (text, this);
   },
   getScale ()
   {
      return this ._pointSize .getValue () * this .getBrowser () .getRenderingProperty ("PixelsPerPoint") * this .getContentScale ();
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










function ScreenGroup (executionContext)
{
   external_X_ITE_X3D_X3DGroupingNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).ScreenGroup);

   // Private properties

   if (executionContext .getOuterNode () instanceof (external_X_ITE_X3D_X3DProtoDeclaration_default()))
      this .matrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   else
      this .matrix = new (external_X_ITE_X3D_Matrix4_default()) (0);
}

Object .assign (Object .setPrototypeOf (ScreenGroup .prototype, (external_X_ITE_X3D_X3DGroupingNode_default()).prototype),
{
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .getSubBBox (bbox, shadows) .multRight (this .matrix);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
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
         case (external_X_ITE_X3D_TraverseType_default()).DEPTH:
         case (external_X_ITE_X3D_TraverseType_default()).SHADOW:
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