/* X_ITE v11.5.11 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.5.11")];
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
;// external "__X_ITE_X3D__ .X3DLightNode"
const external_X_ITE_X3D_X3DLightNode_namespaceObject = __X_ITE_X3D__ .X3DLightNode;
var external_X_ITE_X3D_X3DLightNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DLightNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// external "__X_ITE_X3D__ .X3DCast"
const external_X_ITE_X3D_X3DCast_namespaceObject = __X_ITE_X3D__ .X3DCast;
var external_X_ITE_X3D_X3DCast_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DCast_namespaceObject);
;// external "__X_ITE_X3D__ .Vector3"
const external_X_ITE_X3D_Vector3_namespaceObject = __X_ITE_X3D__ .Vector3;
var external_X_ITE_X3D_Vector3_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Vector3_namespaceObject);
;// external "__X_ITE_X3D__ .Rotation4"
const external_X_ITE_X3D_Rotation4_namespaceObject = __X_ITE_X3D__ .Rotation4;
var external_X_ITE_X3D_Rotation4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Rotation4_namespaceObject);
;// external "__X_ITE_X3D__ .Matrix4"
const external_X_ITE_X3D_Matrix4_namespaceObject = __X_ITE_X3D__ .Matrix4;
var external_X_ITE_X3D_Matrix4_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Matrix4_namespaceObject);
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Components/TextureProjection/X3DTextureProjectorNode.js
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
   external_X_ITE_X3D_X3DLightNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DTextureProjectorNode);

   // Units

   this ._location    .setUnit ("length");
   this ._farDistance .setUnit ("length");
   this ._location    .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (X3DTextureProjectorNode .prototype, (external_X_ITE_X3D_X3DLightNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DLightNode_default().prototype .initialize .call (this);

      this ._nearDistance .addInterest ("set_nearDistance__", this);
      this ._farDistance  .addInterest ("set_farDistance__",  this);
      this ._texture      .addInterest ("set_texture__",      this);

      this .set_nearDistance__ ();
      this .set_farDistance__ ();
      this .set_texture__ ();
   },
   getLightKey ()
   {
      return 3;
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
      return this .nearDistance;
   },
   getNearParameter ()
   {
      return this .nearParameter;
   },
   getFarDistance ()
   {
      return this .farDistance;
   },
   getFarParameter ()
   {
      return this .farParameter;
   },
   getTexture ()
   {
      return this .textureNode;
   },
   getBiasMatrix: (() =>
   {
      // Transforms normalized coords from range (-1, 1) to (0, 1).
      const biasMatrix = new (external_X_ITE_X3D_Matrix4_default()) (0.5, 0.0, 0.0, 0.0,
                                      0.0, 0.5, 0.0, 0.0,
                                      0.0, 0.0, 0.5, 0.0,
                                      0.5, 0.5, 0.5, 1.0);

      return function ()
      {
         return biasMatrix;
      };
   })(),
   straightenHorizon (orientation)
   {
      return orientation .straighten (this ._upVector .getValue ());
   },
   set_nearDistance__ ()
   {
      const nearDistance = this ._nearDistance .getValue ();

      this .nearDistance  = nearDistance < 0 ? 0.125 : nearDistance;
      this .nearParameter = nearDistance < 0 ? 0 : -1;
   },
   set_farDistance__ ()
   {
      const farDistance = this ._farDistance .getValue ();

      this .farDistance  = farDistance < 0 ? 100_000 : farDistance;
      this .farParameter = farDistance < 0 ? 1 : 2;
   },
   set_texture__ ()
   {
      this .textureNode ?.removeInterest ("set_aspectRatio__", this);

      this .textureNode = external_X_ITE_X3D_X3DCast_default() ((external_X_ITE_X3D_X3DConstants_default()).X3DTexture2DNode, this ._texture);

      this .textureNode ?.addInterest ("set_aspectRatio__", this);

      this .setEnabled (!!this .textureNode);

      this .set_aspectRatio__ ();
      this .set_on__ ();
   },
   set_aspectRatio__ ()
   {
      if (this .textureNode)
         this ._aspectRatio = this .textureNode .getWidth () / this .textureNode .getHeight ();
      else
         this ._aspectRatio = 1;
   },
});

Object .defineProperties (X3DTextureProjectorNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DTextureProjectorNode", "TextureProjection", 4));

const __default__ = X3DTextureProjectorNode;
;

/* harmony default export */ const TextureProjection_X3DTextureProjectorNode = (external_X_ITE_X3D_Namespace_default().add ("X3DTextureProjectorNode", __default__));
;// external "__X_ITE_X3D__ .Camera"
const external_X_ITE_X3D_Camera_namespaceObject = __X_ITE_X3D__ .Camera;
var external_X_ITE_X3D_Camera_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Camera_namespaceObject);
;// external "__X_ITE_X3D__ .MatrixStack"
const external_X_ITE_X3D_MatrixStack_namespaceObject = __X_ITE_X3D__ .MatrixStack;
var external_X_ITE_X3D_MatrixStack_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_MatrixStack_namespaceObject);
;// external "__X_ITE_X3D__ .ObjectCache"
const external_X_ITE_X3D_ObjectCache_namespaceObject = __X_ITE_X3D__ .ObjectCache;
var external_X_ITE_X3D_ObjectCache_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_ObjectCache_namespaceObject);
;// ./src/x_ite/Components/TextureProjection/TextureProjector.js
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














const TextureProjectorCache = external_X_ITE_X3D_ObjectCache_default() (TextureProjectorContainer);

function TextureProjectorContainer ()
{
   this .projectionMatrix                = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .modelViewMatrix                 = new (external_X_ITE_X3D_MatrixStack_default()) ((external_X_ITE_X3D_Matrix4_default()));
   this .modelMatrix                     = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .invTextureSpaceMatrix           = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .invTextureSpaceProjectionMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .location                        = new (external_X_ITE_X3D_Vector3_default()) ();
   this .locationArray                   = new Float32Array (3);
   this .direction                       = new (external_X_ITE_X3D_Vector3_default()) ();
   this .rotation                        = new (external_X_ITE_X3D_Rotation4_default()) ();
   this .matrix                          = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .matrixArray                     = new Float32Array (16);
   this .textureMatrix                   = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (TextureProjectorContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
      this .textureMatrix .assign (lightNode .getTexture () .getMatrix ());
   },
   renderShadowMap (renderObject)
   {
      const
         lightNode             = this .lightNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrixArray (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (this .global ? modelMatrix : (external_X_ITE_X3D_Matrix4_default()).Identity);

      this .rotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).zAxis, this .direction .assign (lightNode .getDirection ()) .negate ());
      lightNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (lightNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = lightNode .getTexture () .getWidth (),
         height       = lightNode .getTexture () .getHeight (),
         nearDistance = lightNode .getNearDistance (),
         farDistance  = lightNode .getFarDistance (),
         fieldOfView  = lightNode .getFieldOfView ();

      external_X_ITE_X3D_Camera_default().perspective (fieldOfView, nearDistance, farDistance, width, height, this .projectionMatrix);

      if (!this .global)
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix
         .assign (invTextureSpaceMatrix)
         .multRight (this .projectionMatrix)
         .multRight (lightNode .getBiasMatrix ())
         .multRight (this .textureMatrix);

      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (lightNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setGlobalVariables (renderObject)
   {
      this .matrix
         .assign (renderObject .getView () ?.inverse ?? (external_X_ITE_X3D_Matrix4_default()).Identity)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invTextureSpaceProjectionMatrix);

      this .matrixArray .set (this .matrix);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const i = shaderObject .numTextureProjectors ++;

      const
         lightNode   = this .lightNode,
         texture     = lightNode .getTexture (),
         textureUnit = this .global
            ? (this .textureUnit = this .textureUnit ?? this .browser .popTexture2DUnit ())
            : this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_TextureProjectorTexture [i], textureUnit);

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         nearParameter = lightNode .getNearParameter (),
         farParameter  = lightNode .getFarParameter ();

      gl .uniform3f        (shaderObject .x3d_TextureProjectorColor [i],         ... lightNode .getColor ());
      gl .uniform1f        (shaderObject .x3d_TextureProjectorIntensity [i],     lightNode .getIntensity ());
      gl .uniform3fv       (shaderObject .x3d_TextureProjectorLocation [i],      this .locationArray);
      gl .uniform3f        (shaderObject .x3d_TextureProjectorParams [i],        nearParameter, farParameter, texture .isLinear ());
      gl .uniformMatrix4fv (shaderObject .x3d_TextureProjectorMatrix [i], false, this .matrixArray);
   },
   dispose ()
   {
      this .browser .pushTexture2DUnit (this .textureUnit);

      this .modelViewMatrix .clear ();

      this .textureUnit = undefined;

      TextureProjectorCache .push (this);
   },
});

function TextureProjector (executionContext)
{
   TextureProjection_X3DTextureProjectorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).TextureProjector);

   // Units

   this ._fieldOfView .setUnit ("angle");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 4.0)
      this ._upVector = new (external_X_ITE_X3D_Vector3_default()) (0, 0, 1);
}

Object .assign (Object .setPrototypeOf (TextureProjector .prototype, TextureProjection_X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      TextureProjection_X3DTextureProjectorNode .prototype .initialize .call (this);
   },
   getFieldOfView ()
   {
      const fov = this ._fieldOfView .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   getLights ()
   {
      return TextureProjectorCache;
   },
});

Object .defineProperties (TextureProjector,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("TextureProjector", "TextureProjection", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "global",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "on",               new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",            new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "intensity",        new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "ambientIntensity", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),

         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "location",         new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "direction",        new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 0, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "upVector",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fieldOfView",      new (external_X_ITE_X3D_Fields_default()).SFFloat (0.785398)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "nearDistance",     new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "farDistance",      new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "aspectRatio",      new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texture",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),

         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadows",          new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowColor",      new (external_X_ITE_X3D_Fields_default()).SFColor ()),      // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowIntensity",  new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowBias",       new (external_X_ITE_X3D_Fields_default()).SFFloat (0.005)), // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "shadowMapSize",    new (external_X_ITE_X3D_Fields_default()).SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

const TextureProjector_default_ = TextureProjector;
;

/* harmony default export */ const TextureProjection_TextureProjector = (external_X_ITE_X3D_Namespace_default().add ("TextureProjector", TextureProjector_default_));
;// ./src/x_ite/Components/TextureProjection/TextureProjectorParallel.js
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














const TextureProjectorParallelCache = external_X_ITE_X3D_ObjectCache_default() (TextureProjectorParallelContainer);

function TextureProjectorParallelContainer ()
{
   this .projectionMatrix                = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .modelViewMatrix                 = new (external_X_ITE_X3D_MatrixStack_default()) ((external_X_ITE_X3D_Matrix4_default()));
   this .modelMatrix                     = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .invTextureSpaceMatrix           = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .location                        = new (external_X_ITE_X3D_Vector3_default()) ();
   this .locationArray                   = new Float32Array (3);
   this .invTextureSpaceProjectionMatrix = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .direction                       = new (external_X_ITE_X3D_Vector3_default()) ();
   this .rotation                        = new (external_X_ITE_X3D_Rotation4_default()) ();
   this .matrix                          = new (external_X_ITE_X3D_Matrix4_default()) ();
   this .matrixArray                     = new Float32Array (16);
   this .textureMatrix                   = new (external_X_ITE_X3D_Matrix4_default()) ();
}

Object .assign (TextureProjectorParallelContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
      this .textureMatrix .assign (lightNode .getTexture () .getMatrix ());
   },
   renderShadowMap (renderObject)
   {
      const
         lightNode             = this .lightNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrixArray (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (this .global ? modelMatrix : (external_X_ITE_X3D_Matrix4_default()).Identity);

      this .rotation .setFromToVec ((external_X_ITE_X3D_Vector3_default()).zAxis, this .direction .assign (lightNode .getDirection ()) .negate ());
      lightNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (lightNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = lightNode .getTexture () .getWidth (),
         height       = lightNode .getTexture () .getHeight (),
         aspect       = width / height,
         minimumX     = lightNode .getMinimumX (),
         maximumX     = lightNode .getMaximumX (),
         minimumY     = lightNode .getMinimumY (),
         maximumY     = lightNode .getMaximumY (),
         sizeX        = lightNode .getSizeX (),
         sizeY        = lightNode .getSizeY (),
         nearDistance = lightNode .getNearDistance (),
         farDistance  = lightNode .getFarDistance ();

      if (aspect > sizeX / sizeY)
      {
         const
            center  = (minimumX + maximumX) / 2,
            size1_2 = (sizeY * aspect) / 2;

         external_X_ITE_X3D_Camera_default().ortho (center - size1_2, center + size1_2, minimumY, maximumY, nearDistance, farDistance, this .projectionMatrix);
      }
      else
      {
         const
            center  = (minimumY + maximumY) / 2,
            size1_2 = (sizeX / aspect) / 2;

         external_X_ITE_X3D_Camera_default().ortho (minimumX, maximumX, center - size1_2, center + size1_2, nearDistance, farDistance, this .projectionMatrix);
      }

      if (!this .global)
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix
         .assign (invTextureSpaceMatrix)
         .multRight (this .projectionMatrix)
         .multRight (lightNode .getBiasMatrix ())
         .multRight (this .textureMatrix);

      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (lightNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setGlobalVariables (renderObject)
   {
      this .matrix
         .assign (renderObject .getView () ?.inverse ?? (external_X_ITE_X3D_Matrix4_default()).Identity)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invTextureSpaceProjectionMatrix);

      this .matrixArray .set (this .matrix);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const i = shaderObject .numTextureProjectors ++;

      const
         lightNode   = this .lightNode,
         texture     = lightNode .getTexture (),
         textureUnit = this .global
            ? (this .textureUnit = this .textureUnit ?? this .browser .popTexture2DUnit ())
            : this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_TextureProjectorTexture [i], textureUnit);

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         nearParameter = lightNode .getNearParameter (),
         farParameter  = lightNode .getFarParameter ();

      gl .uniform3f        (shaderObject .x3d_TextureProjectorColor [i],         ... lightNode .getColor ());
      gl .uniform1f        (shaderObject .x3d_TextureProjectorIntensity [i],     lightNode .getIntensity ());
      gl .uniform3fv       (shaderObject .x3d_TextureProjectorLocation [i],      this .locationArray);
      gl .uniform3f        (shaderObject .x3d_TextureProjectorParams [i],        nearParameter, farParameter, texture .isLinear ());
      gl .uniformMatrix4fv (shaderObject .x3d_TextureProjectorMatrix [i], false, this .matrixArray);
   },
   dispose ()
   {
      this .browser .pushTexture2DUnit (this .textureUnit);

      this .modelViewMatrix .clear ();

      this .textureUnit = undefined;

      TextureProjectorParallelCache .push (this);
   },
});

function TextureProjectorParallel (executionContext)
{
   TextureProjection_X3DTextureProjectorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).TextureProjectorParallel);

   // Units

   this ._fieldOfView .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 4.0)
      this ._upVector = new (external_X_ITE_X3D_Vector3_default()) (0, 0, 1);
}

Object .assign (Object .setPrototypeOf (TextureProjectorParallel .prototype, TextureProjection_X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      TextureProjection_X3DTextureProjectorNode .prototype .initialize .call (this);

      this ._fieldOfView .addInterest ("set_fieldOfView___", this);

      this .set_fieldOfView___ ();
   },
   set_fieldOfView___ ()
   {
      this .minimumX = this ._fieldOfView [0];
      this .minimumY = this ._fieldOfView [1];
      this .maximumX = this ._fieldOfView [2];
      this .maximumY = this ._fieldOfView [3];

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
   getLights ()
   {
      return TextureProjectorParallelCache;
   },
});

Object .defineProperties (TextureProjectorParallel,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("TextureProjectorParallel", "TextureProjection", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "global",           new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "on",               new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "color",            new (external_X_ITE_X3D_Fields_default()).SFColor (1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "intensity",        new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "ambientIntensity", new (external_X_ITE_X3D_Fields_default()).SFFloat ()),

         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "location",         new (external_X_ITE_X3D_Fields_default()).SFVec3f ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "direction",        new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 0, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "upVector",         new (external_X_ITE_X3D_Fields_default()).SFVec3f (0, 1, 0)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "fieldOfView",      new (external_X_ITE_X3D_Fields_default()).MFFloat (-1, -1, 1, 1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "nearDistance",     new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "farDistance",      new (external_X_ITE_X3D_Fields_default()).SFFloat (-1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,     "aspectRatio",      new (external_X_ITE_X3D_Fields_default()).SFFloat ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "texture",          new (external_X_ITE_X3D_Fields_default()).SFNode ()),

         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadows",          new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowColor",      new (external_X_ITE_X3D_Fields_default()).SFColor ()),      // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowIntensity",  new (external_X_ITE_X3D_Fields_default()).SFFloat (1)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput,    "shadowBias",       new (external_X_ITE_X3D_Fields_default()).SFFloat (0.005)), // skip test
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).initializeOnly, "shadowMapSize",    new (external_X_ITE_X3D_Fields_default()).SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

const TextureProjectorParallel_default_ = TextureProjectorParallel;
;

/* harmony default export */ const TextureProjection_TextureProjectorParallel = (external_X_ITE_X3D_Namespace_default().add ("TextureProjectorParallel", TextureProjectorParallel_default_));
;// ./src/assets/components/TextureProjectionComponent.js
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
   name: "TextureProjection",
   concreteNodes:
   [
      TextureProjection_TextureProjector,
      TextureProjection_TextureProjectorParallel,
   ],
   abstractNodes:
   [
      TextureProjection_X3DTextureProjectorNode,
   ],
});

const TextureProjectionComponent_default_ = undefined;
;

/* harmony default export */ const TextureProjectionComponent = (external_X_ITE_X3D_Namespace_default().add ("TextureProjectionComponent", TextureProjectionComponent_default_));
/******/ })()
;