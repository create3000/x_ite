/* X_ITE v8.11.6 */(() => { // webpackBootstrap
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
var __webpack_exports__ = {};

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components\")"
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/TextureProjector/X3DTextureProjectorNode.js
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








function X3DTextureProjectorNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DTextureProjectorNode);

   this ._location    .setUnit ("length");
   this ._farDistance .setUnit ("length");
   this ._location    .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (X3DTextureProjectorNode .prototype, (X3DChildNode_default()).prototype),
{
   initialize ()
   {
      X3DChildNode_default().prototype .initialize .call (this);

      this ._on      .addInterest ("set_on__",      this);
      this ._texture .addInterest ("set_texture__", this);

      this .set_texture__ ();
   },
   getGlobal ()
   {
      return this ._global .getValue ();
   },
   getLocation ()
   {
      return this ._location .getValue ();
   },
   getDirection ()
   {
      return this ._direction .getValue ();
   },
   getNearDistance ()
   {
      const nearDistance = this ._nearDistance .getValue ();

      return nearDistance === -1 ? 0.125 : nearDistance;
   },
   getFarDistance ()
   {
      const farDistance = this ._farDistance .getValue ();

      return farDistance === -1 ? 100_000 : farDistance;
   },
   getTexture ()
   {
      return this .textureNode;
   },
   getBiasMatrix: (() =>
   {
      // Transforms normalized coords from range (-1, 1) to (0, 1).
      const biasMatrix = new (Matrix4_default()) (0.5, 0.0, 0.0, 0.0,
                                      0.0, 0.5, 0.0, 0.0,
                                      0.0, 0.0, 0.5, 0.0,
                                      0.5, 0.5, 0.5, 1.0);

      return function ()
      {
         return biasMatrix;
      };
   })(),
   straightenHorizon: (() =>
   {
      const
         localXAxis = new (Vector3_default()) (0, 0, 0),
         localZAxis = new (Vector3_default()) (0, 0, 0),
         upVector   = new (Vector3_default()) (0, 0, 0),
         rotation   = new (Rotation4_default()) ();

      return function (orientation)
      {
         orientation .multVecRot (localXAxis .assign ((Vector3_default()).xAxis) .negate ());
         orientation .multVecRot (localZAxis .assign ((Vector3_default()).zAxis));
         upVector .assign (this ._upVector .getValue ()) .normalize ();

         const vector = localZAxis .cross (upVector);

         // If viewer looks along the up vector.
         if (Math .abs (localZAxis .dot (upVector)) >= 1)
            return orientation;

         if (Math .abs (vector .dot (localXAxis)) >= 1)
            return orientation;

         rotation .setFromToVec (localXAxis, vector);

         return orientation .multRight (rotation);
      };
   })(),
   set_on__ ()
   {
      if (this ._on .getValue () && this .textureNode)
      {
         delete this .push;
         delete this .pop;
      }
      else
      {
         this .push = Function .prototype;
         this .pop  = Function .prototype;
      }
   },
   set_texture__ ()
   {
      if (this .textureNode)
         this .textureNode .removeInterest ("set_aspectRatio__", this);

      this .textureNode = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, this ._texture);

      if (this .textureNode)
         this .textureNode .addInterest ("set_aspectRatio__", this);

      this .set_aspectRatio__ ();
      this .set_on__ ();
   },
   set_aspectRatio__ ()
   {
      if (this .textureNode)
         this ._aspectRatio = this .textureNode .getWidth () / this .textureNode .getHeight ();
      else
         this ._aspectRatio = 0;
   },
   push (renderObject)
   {
      const textureProjectorContainer = this .getTextureProjectors () .pop ();

      textureProjectorContainer .set (this,
                                      renderObject .getModelViewMatrix () .get ());

      if (this ._global .getValue ())
      {
         renderObject .getGlobalObjects ()     .push (textureProjectorContainer);
         renderObject .getTextureProjectors () .push (textureProjectorContainer);
      }
      else
      {
         renderObject .getLocalObjects ()      .push (textureProjectorContainer);
         renderObject .getTextureProjectors () .push (textureProjectorContainer);

         ++ renderObject .getLocalObjectsCount () [2];
      }
   },
   pop (renderObject)
   {
      if (this ._global .getValue ())
         return;

      renderObject .getLocalObjects () .pop ();

      -- renderObject .getLocalObjectsCount () [2];
   },
});

Object .defineProperties (X3DTextureProjectorNode,
{
   typeName:
   {
      value: "X3DTextureProjectorNode",
      enumerable: true,
   },
   componentName:
   {
      value: "TextureProjector",
      enumerable: true,
   },
});

const __default__ = X3DTextureProjectorNode;
;

Namespace_default().set ("x_ite/Components/TextureProjector/X3DTextureProjectorNode", __default__);
/* harmony default export */ const TextureProjector_X3DTextureProjectorNode = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Camera\")"
const Camera_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("standard/Math/Geometry/Camera");
var Camera_default = /*#__PURE__*/__webpack_require__.n(Camera_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Utility/ObjectCache\")"
const ObjectCache_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.11.6")] .require ("standard/Utility/ObjectCache");
var ObjectCache_default = /*#__PURE__*/__webpack_require__.n(ObjectCache_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/TextureProjector/TextureProjector.js
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












const TextureProjectorCache = ObjectCache_default() (TextureProjectorContainer);

function TextureProjectorContainer ()
{
   this .projectionMatrix                = new (Matrix4_default()) ();
   this .modelViewMatrix                 = new (Matrix4_default()) ();
   this .modelMatrix                     = new (Matrix4_default()) ();
   this .invTextureSpaceMatrix           = new (Matrix4_default()) ();
   this .invTextureSpaceProjectionMatrix = new (Matrix4_default()) ();
   this .location                        = new (Vector3_default()) (0, 0, 0);
   this .locationArray                   = new Float32Array (3);
   this .direction                       = new (Vector3_default()) (0, 0, 0);
   this .rotation                        = new (Rotation4_default()) ();
   this .projectiveTextureMatrix         = new (Matrix4_default()) ();
   this .projectiveTextureMatrixArray    = new Float32Array (16);
}

Object .assign (TextureProjectorContainer .prototype,
{
   set (textureProjectorNode, modelViewMatrix)
   {
      this .browser              = textureProjectorNode .getBrowser ();
      this .textureProjectorNode = textureProjectorNode;

      this .modelViewMatrix .assign (modelViewMatrix);
   },
   setGlobalVariables (renderObject)
   {
      const
         textureProjectorNode  = this .textureProjectorNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : (Matrix4_default()).Identity);

      this .rotation .setFromToVec ((Vector3_default()).zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
      textureProjectorNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = textureProjectorNode .getTexture () .getWidth (),
         height       = textureProjectorNode .getTexture () .getHeight (),
         nearDistance = textureProjectorNode .getNearDistance (),
         farDistance  = textureProjectorNode .getFarDistance (),
         fieldOfView  = textureProjectorNode .getFieldOfView ();

      Camera_default().perspective (fieldOfView, nearDistance, farDistance, width, height, this .projectionMatrix);

      if (! textureProjectorNode .getGlobal ())
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix .assign (invTextureSpaceMatrix) .multRight (this .projectionMatrix) .multRight (textureProjectorNode .getBiasMatrix ());

      this .projectiveTextureMatrix .assign (cameraSpaceMatrix) .multRight (this .invTextureSpaceProjectionMatrix);
      this .projectiveTextureMatrixArray .set (this .projectiveTextureMatrix);

      this .modelViewMatrix .multVecMatrix (this .location .assign (textureProjectorNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const i = shaderObject .numProjectiveTextures ++;

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         texture     = this .textureProjectorNode .getTexture (),
         textureUnit = this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_ProjectiveTexture [i], textureUnit);

      gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
      gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
   },
   dispose ()
   {
      TextureProjectorCache .push (this);
   },
});

function TextureProjector (executionContext)
{
   TextureProjector_X3DTextureProjectorNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureProjector);

   this ._fieldOfView .setUnit ("angle");
}

Object .assign (Object .setPrototypeOf (TextureProjector .prototype, TextureProjector_X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      TextureProjector_X3DTextureProjectorNode .prototype .initialize .call (this);
   },
   getFieldOfView ()
   {
      const fov = this ._fieldOfView .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   getTextureProjectors ()
   {
      return TextureProjectorCache;
   },
});

Object .defineProperties (TextureProjector,
{
   typeName:
   {
      value: "TextureProjector",
      enumerable: true,
   },
   componentName:
   {
      value: "TextureProjector",
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["4.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",     new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",  new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "on",           new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "global",       new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "location",     new (Fields_default()).SFVec3f (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "direction",    new (Fields_default()).SFVec3f (0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "upVector",     new (Fields_default()).SFVec3f (0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "fieldOfView",  new (Fields_default()).SFFloat (0.785398)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "nearDistance", new (Fields_default()).SFFloat (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "farDistance",  new (Fields_default()).SFFloat (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "aspectRatio",  new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "texture",      new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const TextureProjector_default_ = TextureProjector;
;

Namespace_default().set ("x_ite/Components/TextureProjector/TextureProjector", TextureProjector_default_);
/* harmony default export */ const TextureProjector_TextureProjector = (TextureProjector_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/TextureProjector/TextureProjectorParallel.js
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












const TextureProjectorParallelCache = ObjectCache_default() (TextureProjectorParallelContainer);

function TextureProjectorParallelContainer ()
{
   this .projectionMatrix                = new (Matrix4_default()) ();
   this .modelViewMatrix                 = new (Matrix4_default()) ();
   this .modelMatrix                     = new (Matrix4_default()) ();
   this .invTextureSpaceMatrix           = new (Matrix4_default()) ();
   this .location                        = new (Vector3_default()) (0, 0, 0);
   this .locationArray                   = new Float32Array (3);
   this .invTextureSpaceProjectionMatrix = new (Matrix4_default()) ();
   this .direction                       = new (Vector3_default()) (0, 0, 0);
   this .rotation                        = new (Rotation4_default()) ();
   this .projectiveTextureMatrix         = new (Matrix4_default()) ();
   this .projectiveTextureMatrixArray    = new Float32Array (16);
}

Object .assign (TextureProjectorParallelContainer .prototype,
{
   set (textureProjectorNode, modelViewMatrix)
   {
      this .browser              = textureProjectorNode .getBrowser ();
      this .textureProjectorNode = textureProjectorNode;

      this .modelViewMatrix .assign (modelViewMatrix);
   },
   setGlobalVariables (renderObject)
   {
      const
         textureProjectorNode  = this .textureProjectorNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : (Matrix4_default()).Identity);

      this .rotation .setFromToVec ((Vector3_default()).zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
      textureProjectorNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = textureProjectorNode .getTexture () .getWidth (),
         height       = textureProjectorNode .getTexture () .getHeight (),
         aspect       = width / height,
         minimumX     = textureProjectorNode .getMinimumX (),
         maximumX     = textureProjectorNode .getMaximumX (),
         minimumY     = textureProjectorNode .getMinimumY (),
         maximumY     = textureProjectorNode .getMaximumY (),
         sizeX        = textureProjectorNode .getSizeX (),
         sizeY        = textureProjectorNode .getSizeY (),
         nearDistance = textureProjectorNode .getNearDistance (),
         farDistance  = textureProjectorNode .getFarDistance ();

      if (aspect > sizeX / sizeY)
      {
         const
            center  = (minimumX + maximumX) / 2,
            size1_2 = (sizeY * aspect) / 2;

         Camera_default().ortho (center - size1_2, center + size1_2, minimumY, maximumY, nearDistance, farDistance, this .projectionMatrix);
      }
      else
      {
         const
            center  = (minimumY + maximumY) / 2,
            size1_2 = (sizeX / aspect) / 2;

         Camera_default().ortho (minimumX, maximumX, center - size1_2, center + size1_2, nearDistance, farDistance, this .projectionMatrix);
      }

      if (! textureProjectorNode .getGlobal ())
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix .assign (invTextureSpaceMatrix) .multRight (this .projectionMatrix) .multRight (textureProjectorNode .getBiasMatrix ());

      this .projectiveTextureMatrix .assign (cameraSpaceMatrix) .multRight (this .invTextureSpaceProjectionMatrix);
      this .projectiveTextureMatrixArray .set (this .projectiveTextureMatrix);

      this .modelViewMatrix .multVecMatrix (this .location .assign (textureProjectorNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const i = shaderObject .numProjectiveTextures ++;

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         texture     = this .textureProjectorNode .getTexture (),
         textureUnit = this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_ProjectiveTexture [i], textureUnit);

      gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
      gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
   },
   dispose ()
   {
      TextureProjectorParallelCache .push (this);
   },
});

function TextureProjectorParallel (executionContext)
{
   TextureProjector_X3DTextureProjectorNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureProjectorParallel);

   this ._fieldOfView .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (TextureProjectorParallel .prototype, TextureProjector_X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      TextureProjector_X3DTextureProjectorNode .prototype .initialize .call (this);

      this ._fieldOfView .addInterest ("set_fieldOfView___", this);

      this .set_fieldOfView___ ();
   },
   set_fieldOfView___ ()
   {
      const length = this ._fieldOfView .length;

      this .minimumX = (length > 0 ? this ._fieldOfView [0] : -1);
      this .minimumY = (length > 1 ? this ._fieldOfView [1] : -1);
      this .maximumX = (length > 2 ? this ._fieldOfView [2] :  1);
      this .maximumY = (length > 3 ? this ._fieldOfView [3] :  1);

      this .sizeX = this .maximumX - this .minimumX;
      this .sizeY = this .maximumY - this .minimumY;
   },
   getMinimumX ()
   {
      return this .minimumX;
   },
   getMinimumY ()
   {
      return this .minimumY;
   },
   getMaximumX ()
   {
      return this .maximumX;
   },
   getMaximumY ()
   {
      return this .maximumY;
   },
   getSizeX ()
   {
      return this .sizeX;
   },
   getSizeY ()
   {
      return this .sizeY;
   },
   getTextureProjectors ()
   {
      return TextureProjectorParallelCache;
   },
});

Object .defineProperties (TextureProjectorParallel,
{
   typeName:
   {
      value: "TextureProjectorParallel",
      enumerable: true,
   },
   componentName:
   {
      value: "TextureProjector",
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["4.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",     new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "description",  new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "on",           new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "global",       new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "location",     new (Fields_default()).SFVec3f (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "direction",    new (Fields_default()).SFVec3f (0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "upVector",     new (Fields_default()).SFVec3f (0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "fieldOfView",  new (Fields_default()).MFFloat (-1, -1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "nearDistance", new (Fields_default()).SFFloat (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "farDistance",  new (Fields_default()).SFFloat (-1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).outputOnly,  "aspectRatio",  new (Fields_default()).SFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "texture",      new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const TextureProjectorParallel_default_ = TextureProjectorParallel;
;

Namespace_default().set ("x_ite/Components/TextureProjector/TextureProjectorParallel", TextureProjectorParallel_default_);
/* harmony default export */ const TextureProjector_TextureProjectorParallel = (TextureProjectorParallel_default_);
;// CONCATENATED MODULE: ./src/assets/components/TextureProjector.js
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
   name: "TextureProjector",
   concreteNodes:
   [
      TextureProjector_TextureProjector,
      TextureProjector_TextureProjectorParallel,
   ],
   abstractNodes:
   [
      TextureProjector_X3DTextureProjectorNode,
   ],
});

const components_TextureProjector_default_ = undefined;
;

Namespace_default().set ("assets/components/TextureProjector", components_TextureProjector_default_);
/* harmony default export */ const components_TextureProjector = ((/* unused pure expression or super */ null && (components_TextureProjector_default_)));
/******/ })()
;