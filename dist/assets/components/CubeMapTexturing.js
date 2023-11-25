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
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/CubeMapTexturing/Panorama1.fs.js
const __default__ = /* glsl */ `precision highp float;precision highp int;precision highp sampler2D;const float M_PI=3.1415926535897932384626433832795;varying vec2 texCoord;uniform sampler2D x3d_PanoramaTexture;uniform int x3d_CurrentFace;vec3 uvToXYZ(const in int face,const in vec2 uv){vec3 xyz;if(face==0)xyz=vec3(1.0,uv.y,uv.x);else if(face==1)xyz=vec3(-1.0,uv.y,-uv.x);else if(face==2)xyz=vec3(uv.x,uv.y,-1.0);else if(face==3)xyz=vec3(-uv.x,uv.y,1.0);else if(face==4)xyz=vec3(uv.y,-1.0,uv.x);else xyz=vec3(-uv.y,1.0,uv.x);return xyz;}vec2 dirToUV(const in vec3 dir){return vec2(0.5+0.5*atan(dir.z,dir.x)/M_PI,1.0-acos(dir.y)/M_PI);}vec3 panoramaToCubeMap(const in int face,const in vec2 texCoord){vec3 scan=uvToXYZ(face,texCoord);vec3 direction=normalize(scan);vec2 src=dirToUV(direction);return texture2D(x3d_PanoramaTexture,src).rgb;}void main(){gl_FragColor=vec4(panoramaToCubeMap(x3d_CurrentFace,texCoord),1.0);}`
;

Namespace_default().add ("Panorama1.fs", "x_ite/Browser/CubeMapTexturing/Panorama1.fs", __default__);
/* harmony default export */ const Panorama1_fs = (__default__);
;// CONCATENATED MODULE: ./src/x_ite/Browser/CubeMapTexturing/Panorama2.fs.js
const Panorama2_fs_default_ = /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler2D;const float M_PI=3.1415926535897932384626433832795;in vec2 texCoord;out vec4 x3d_FragColor;uniform sampler2D x3d_PanoramaTexture;uniform int x3d_CurrentFace;vec3 uvToXYZ(const in int face,const in vec2 uv){switch(face){case 0:return vec3(1.0,uv.y,uv.x);case 1:return vec3(-1.0,uv.y,-uv.x);case 2:return vec3(uv.x,uv.y,-1.0);case 3:return vec3(-uv.x,uv.y,1.0);case 4:return vec3(uv.y,-1.0,uv.x);default:return vec3(-uv.y,1.0,uv.x);}}vec2 dirToUV(const in vec3 dir){return vec2(0.5+0.5*atan(dir.z,dir.x)/M_PI,1.0-acos(dir.y)/M_PI);}vec3 panoramaToCubeMap(const in int face,const in vec2 texCoord){vec3 scan=uvToXYZ(face,texCoord);vec3 direction=normalize(scan);vec2 src=dirToUV(direction);return texture(x3d_PanoramaTexture,src).rgb;}void main(){x3d_FragColor=vec4(panoramaToCubeMap(x3d_CurrentFace,texCoord),1.0);}`
;

Namespace_default().add ("Panorama2.fs", "x_ite/Browser/CubeMapTexturing/Panorama2.fs", Panorama2_fs_default_);
/* harmony default export */ const Panorama2_fs = (Panorama2_fs_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/CubeMapTexturing/X3DCubeMapTexturingContext.js
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
   _panoramaShader = Symbol ();

function X3DCubeMapTexturingContext () { }

Object .assign (X3DCubeMapTexturingContext .prototype,
{
   getPanoramaShader ()
   {
      if (this [_panoramaShader])
         return this [_panoramaShader];

      return this [_panoramaShader] = this .createShader ("Panorama", "FullScreen", "data:x-shader/x-fragment," + ["", Panorama1_fs, Panorama2_fs][this .getContext () .getVersion ()], [ ], ["x3d_PanoramaTexture", "x3d_CurrentFace"]);
   },
});

const X3DCubeMapTexturingContext_default_ = X3DCubeMapTexturingContext;
;

Namespace_default().add ("X3DCubeMapTexturingContext", "x_ite/Browser/CubeMapTexturing/X3DCubeMapTexturingContext", X3DCubeMapTexturingContext_default_);
/* harmony default export */ const CubeMapTexturing_X3DCubeMapTexturingContext = (X3DCubeMapTexturingContext_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/X3DSingleTextureNode\")"
const X3DSingleTextureNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Texturing/X3DSingleTextureNode");
var X3DSingleTextureNode_default = /*#__PURE__*/__webpack_require__.n(X3DSingleTextureNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode.js
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




function X3DEnvironmentTextureNode (executionContext)
{
   X3DSingleTextureNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DEnvironmentTextureNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_CUBE_MAP;

   this .targets = [
      gl .TEXTURE_CUBE_MAP_POSITIVE_Z, // Front
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, // Back
      gl .TEXTURE_CUBE_MAP_NEGATIVE_X, // Left
      gl .TEXTURE_CUBE_MAP_POSITIVE_X, // Right
      gl .TEXTURE_CUBE_MAP_POSITIVE_Y, // Top
      gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, // Bottom
   ];

   this .size = 1;
}

Object .assign (Object .setPrototypeOf (X3DEnvironmentTextureNode .prototype, (X3DSingleTextureNode_default()).prototype),
{
   getTarget ()
   {
      return this .target;
   },
   getTextureType ()
   {
      return 4;
   },
   getTargets ()
   {
      return this .targets;
   },
   getSize ()
   {
      return this .size;
   },
   setSize (value)
   {
      this .size = value;
   },
   clearTexture: (() =>
   {
      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         this .setSize (1);
         this .setTransparent (false);
         this .updateTextureParameters ();
      };
   })(),
   updateTextureParameters ()
   {
      X3DSingleTextureNode_default().prototype .updateTextureParameters .call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .size,
                                                                      this .size,
                                                                      false,
                                                                      false,
                                                                      false);
   },
   setShaderUniforms (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureCubeUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
      gl .uniform1i (channel .textureCube, textureUnit);
   },
});

Object .defineProperties (X3DEnvironmentTextureNode,
{
   typeName:
   {
      value: "X3DEnvironmentTextureNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "CubeMapTexturing", level: 1 }),
      enumerable: true,
   },
});

const X3DEnvironmentTextureNode_default_ = X3DEnvironmentTextureNode;
;

Namespace_default().add ("X3DEnvironmentTextureNode", "x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode", X3DEnvironmentTextureNode_default_);
/* harmony default export */ const CubeMapTexturing_X3DEnvironmentTextureNode = (X3DEnvironmentTextureNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Utility/BitSet\")"
const BitSet_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Utility/BitSet");
var BitSet_default = /*#__PURE__*/__webpack_require__.n(BitSet_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture.js
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









function ComposedCubeMapTexture (executionContext)
{
   CubeMapTexturing_X3DEnvironmentTextureNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).ComposedCubeMapTexture);

   this .addChildObjects ((X3DConstants_default()).inputOutput, "update", new (Fields_default()).SFTime ());

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
   {
      this .addAlias ("front",  this ._frontTexture);
      this .addAlias ("back",   this ._backTexture);
      this .addAlias ("left",   this ._leftTexture);
      this .addAlias ("right",  this ._rightTexture);
      this .addAlias ("top",    this ._topTexture);
      this .addAlias ("bottom", this ._bottomTexture);
   }

   // Private properties

   this .textureNodes = [null, null, null, null, null, null];
   this .textureBits  = new (BitSet_default()) ();
}

Object .assign (Object .setPrototypeOf (ComposedCubeMapTexture .prototype, CubeMapTexturing_X3DEnvironmentTextureNode .prototype),
{
   initialize ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      this .frameBuffer = gl .createFramebuffer ();

      // Upload default data.

      this .clearTexture ();

      // Initialize.

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 5);
      this ._bottomTexture .addInterest ("set_texture__", this, 4);
      this ._update        .addInterest ("update",        this);

      this .set_texture__ (0, this ._frontTexture);
      this .set_texture__ (1, this ._backTexture);
      this .set_texture__ (2, this ._leftTexture);
      this .set_texture__ (3, this ._rightTexture);
      this .set_texture__ (4, this ._topTexture);
      this .set_texture__ (5, this ._bottomTexture);
   },
   set_texture__ (index, node)
   {
      let textureNode = this .textureNodes [index];

      textureNode ?.removeInterest (`set_loadState${index}__`, this);

      textureNode = this .textureNodes [index] = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, node);

      textureNode ?.addInterest (`set_loadState${index}__`, this, index, textureNode);

      this .set_loadState__ (index, textureNode);
   },
   set_loadState__ (index, textureNode)
   {
      this .setTextureBit (index, textureNode ?.checkLoadState ());

      this ._update .addEvent ();
   },
   setTextureBit (bit, loadState)
   {
      this .textureBits .set (bit, loadState === (X3DConstants_default()).COMPLETE_STATE);
   },
   isComplete ()
   {
      if (+this .textureBits !== 0b111111)
         return false;

      const
         textureNodes = this .textureNodes,
         size         = textureNodes [0] .getWidth ();

      for (const textureNode of textureNodes)
      {
         if (textureNode .getWidth () !== size)
            return false;

         if (textureNode .getHeight () !== size)
            return false;
      }

      return true;
   },
   update ()
   {
      if (this .isComplete ())
      {
         const
            gl           = this .getBrowser () .getContext (),
            textureNodes = this .textureNodes,
            size         = textureNodes [0] .getWidth ();

         // Prepare faces. This is necessary for Chrome and Firefox.

         if (size !== this .getSize ())
         {
            const defaultData = new Uint8Array (size * size * 4);

            gl .bindTexture (this .getTarget (), this .getTexture ());

            for (let i = 0; i < 6; ++ i)
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

            this .setSize (size);
            this .updateTextureParameters ();
         }

         // Fill with texture data.

         gl .bindFramebuffer (gl .FRAMEBUFFER, this .frameBuffer);

         for (let i = 0; i < 6; ++ i)
         {
            const textureNode = textureNodes [i];

            // Copy color texture.

            gl .bindTexture (gl .TEXTURE_2D, textureNode .getTexture ());
            gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, textureNode .getTexture (), 0);
            gl .bindTexture (this .getTarget (), this .getTexture ());

            if (textureNode .getTextureType () === 1)
            {
               gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, 0, 0, size, size);
            }
            else
            {
               // Copy and flip Y.
               for (let y = 0; y < size; ++ y)
                  gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, size - y - 1, 0, y, size, 1);
            }
         }

         this .setTransparent (textureNodes .some (textureNode => textureNode .isTransparent ()));
         this .setLinear (textureNodes .some (textureNode => textureNode .isLinear ()));
         this .updateTextureParameters ();
      }
      else
      {
         this .clearTexture ();
      }
   },
});

Object .defineProperties (ComposedCubeMapTexture,
{
   typeName:
   {
      value: "ComposedCubeMapTexture",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "CubeMapTexturing", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "texture",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.1", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "frontTexture",      new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "backTexture",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "leftTexture",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rightTexture",      new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "topTexture",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bottomTexture",     new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

for (let index = 0; index < 6; ++ index)
{
   ComposedCubeMapTexture .prototype [`set_loadState${index}__`] = function (index, textureNode)
   {
      this .set_loadState__ (index, textureNode);
   };
}

const ComposedCubeMapTexture_default_ = ComposedCubeMapTexture;
;

Namespace_default().add ("ComposedCubeMapTexture", "x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture", ComposedCubeMapTexture_default_);
/* harmony default export */ const CubeMapTexturing_ComposedCubeMapTexture = (ComposedCubeMapTexture_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DBaseNode\")"
const X3DBaseNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DBaseNode");
var X3DBaseNode_default = /*#__PURE__*/__webpack_require__.n(X3DBaseNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/X3DRenderObject\")"
const X3DRenderObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/X3DRenderObject");
var X3DRenderObject_default = /*#__PURE__*/__webpack_require__.n(X3DRenderObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/TraverseType");
var TraverseType_default = /*#__PURE__*/__webpack_require__.n(TraverseType_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Rendering/DependentRenderer.js
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





function DependentRenderer (executionContext)
{
   X3DBaseNode_default().call (this, executionContext);
   X3DRenderObject_default().call (this, executionContext);

   this .renderObject = null;
}

Object .assign (Object .setPrototypeOf (DependentRenderer .prototype, (X3DBaseNode_default()).prototype),
   (X3DRenderObject_default()).prototype,
{
   initialize ()
   {
      X3DBaseNode_default().prototype .initialize .call (this);
      X3DRenderObject_default().prototype .initialize .call (this);
   },
   isIndependent ()
   {
      return false;
   },
   setRenderer (value)
   {
      this .renderObject = value;
   },
   getLayer ()
   {
      return this .renderObject .getLayer ();
   },
   getBackground ()
   {
      return this .renderObject .getBackground ();
   },
   getFog ()
   {
      return this .renderObject .getFog ();
   },
   getNavigationInfo ()
   {
      return this .renderObject .getNavigationInfo ();
   },
   getViewpoint ()
   {
      return this .renderObject .getViewpoint ();
   },
   getLightContainer ()
   {
      return this .renderObject .getLights () [this .lightIndex ++];
   },
   render (type, callback, group)
   {
      switch (type)
      {
         case (TraverseType_default()).COLLISION:
         {
            X3DRenderObject_default().prototype .render .call (this, type, callback, group);
            break;
         }
         case (TraverseType_default()).SHADOW:
         {
            X3DRenderObject_default().prototype .render .call (this, type, callback, group);
            break;
         }
         case (TraverseType_default()).DISPLAY:
         {
            this .lightIndex = 0;

            X3DRenderObject_default().prototype .render .call (this, type, callback, group);

            for (const light of this .renderObject .getLights ())
               light .modelViewMatrix .pop ();

            break;
         }
      }
   },
});

for (const key of Object .keys (DependentRenderer .prototype))
   Object .defineProperty (DependentRenderer .prototype, key, { enumerable: false });

const DependentRenderer_default_ = DependentRenderer;
;

Namespace_default().add ("DependentRenderer", "x_ite/Rendering/DependentRenderer", DependentRenderer_default_);
/* harmony default export */ const Rendering_DependentRenderer = (DependentRenderer_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TextureBuffer\")"
const TextureBuffer_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Rendering/TextureBuffer");
var TextureBuffer_default = /*#__PURE__*/__webpack_require__.n(TextureBuffer_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Camera\")"
const Camera_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/Camera");
var Camera_default = /*#__PURE__*/__webpack_require__.n(Camera_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/ViewVolume\")"
const ViewVolume_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Geometry/ViewVolume");
var ViewVolume_default = /*#__PURE__*/__webpack_require__.n(ViewVolume_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector4\")"
const Vector4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector4");
var Vector4_default = /*#__PURE__*/__webpack_require__.n(Vector4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Algorithm");
var Algorithm_default = /*#__PURE__*/__webpack_require__.n(Algorithm_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture.js
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

















function GeneratedCubeMapTexture (executionContext)
{
   CubeMapTexturing_X3DEnvironmentTextureNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).GeneratedCubeMapTexture);

   this .dependentRenderer = new Rendering_DependentRenderer (executionContext);
   this .projectionMatrix  = new (Matrix4_default()) ();
   this .modelMatrix       = new (Matrix4_default()) ();
   this .viewVolume        = new (ViewVolume_default()) ();
}

Object .assign (Object .setPrototypeOf (GeneratedCubeMapTexture .prototype, CubeMapTexturing_X3DEnvironmentTextureNode .prototype),
{
   initialize ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode .prototype .initialize .call (this);

      this ._size .addInterest ("set_size__", this);

      this .dependentRenderer .setup ();

      this .set_size__ ();
   },
   set_size__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Transfer 6 textures of size x size pixels.

      const size = gl .getVersion () >= 2
         ? this ._size .getValue ()
         : Algorithm_default().nextPowerOfTwo (this ._size .getValue ());

      if (size > 0)
      {
         // Upload default data.

         const defaultData = new Uint8Array (size * size * 4);

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

         this .updateTextureParameters ();

         // Properties

         this .viewport    = new (Vector4_default()) (0, 0, size, size);
         this .frameBuffer = new (TextureBuffer_default()) (this .getBrowser (), size, size);

         this .setSize (size);
      }
      else
      {
         this .frameBuffer = null;

         this .setSize (0);
      }
   },
   traverse (type, renderObject)
   {
      // TraverseType .DISPLAY

      if (this ._update .getValue () === "NONE")
         return;

      if (! renderObject .isIndependent ())
         return;

      if (! this .frameBuffer)
         return;

      renderObject .getGeneratedCubeMapTextures () .push (this);

      this .modelMatrix .assign (renderObject .getModelViewMatrix () .get ()) .multRight (renderObject .getCameraSpaceMatrix () .get ());
   },
   renderTexture: (() =>
   {
      // Rotations to negated normals of the texture cube.

      const rotations = [
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) ( 0,  0, -1)), // front
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) ( 0,  0,  1)), // back
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) ( 1,  0,  0)), // left
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) (-1,  0,  0)), // right
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) ( 0, -1,  0)), // top
         new (Rotation4_default()) ((Vector3_default()).zAxis, new (Vector3_default()) ( 0,  1,  0)), // bottom
      ];

      // Negated scales of the texture cube.

      const scales = [
         new (Vector3_default()) (-1, -1,  1), // front
         new (Vector3_default()) (-1, -1,  1), // back
         new (Vector3_default()) (-1, -1,  1), // left
         new (Vector3_default()) (-1, -1,  1), // right
         new (Vector3_default()) ( 1,  1,  1), // top
         new (Vector3_default()) ( 1,  1,  1), // bottom
      ];

      const invCameraSpaceMatrix = new (Matrix4_default()) ();

      return function (renderObject)
      {
         this .dependentRenderer .setRenderer (renderObject);

         const
            dependentRenderer  = this .dependentRenderer,
            browser            = this .getBrowser (),
            layer              = renderObject .getLayer (),
            gl                 = browser .getContext (),
            background         = dependentRenderer .getBackground (),
            navigationInfo     = dependentRenderer .getNavigationInfo (),
            viewpoint          = dependentRenderer .getViewpoint (),
            headlightContainer = browser .getHeadlight (),
            headlight          = navigationInfo ._headlight .getValue (),
            nearValue          = navigationInfo .getNearValue (),
            farValue           = navigationInfo .getFarValue (viewpoint),
            projectionMatrix   = Camera_default().perspective (Algorithm_default().radians (90.0), nearValue, farValue, 1, 1, this .projectionMatrix),
            width              = this .frameBuffer .getWidth (),
            height             = this .frameBuffer .getHeight ();

         this .setTransparent (background .isTransparent ());

         this .frameBuffer .bind ();

         dependentRenderer .getViewVolumes () .push (this .viewVolume .set (projectionMatrix, this .viewport, this .viewport));
         dependentRenderer .getProjectionMatrix () .pushMatrix (projectionMatrix);

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            gl .clear (gl .COLOR_BUFFER_BIT); // Always clear, X3DBackground could be transparent!

            // Setup inverse texture space matrix.

            dependentRenderer .getCameraSpaceMatrix () .pushMatrix (this .modelMatrix);
            dependentRenderer .getCameraSpaceMatrix () .rotate (rotations [i]);
            dependentRenderer .getCameraSpaceMatrix () .scale (scales [i]);

            dependentRenderer .getViewMatrix () .pushMatrix (invCameraSpaceMatrix .assign (dependentRenderer .getCameraSpaceMatrix () .get ()) .inverse ());
            dependentRenderer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);

            // Setup headlight if enabled.

            if (headlight)
            {
               headlightContainer .modelViewMatrix .pushMatrix (invCameraSpaceMatrix);
               headlightContainer .modelViewMatrix .multLeft (viewpoint .getCameraSpaceMatrix ());
            }

            // Render layer's children.

            layer .traverse ((TraverseType_default()).DISPLAY, dependentRenderer);

            // Pop matrices.

            if (headlight)
               headlightContainer .modelViewMatrix .pop ();

            dependentRenderer .getModelViewMatrix ()   .pop ();
            dependentRenderer .getCameraSpaceMatrix () .pop ();
            dependentRenderer .getViewMatrix ()        .pop ();

            // Transfer image.

            gl .bindTexture (this .getTarget (), this .getTexture ());
            gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, 0, 0, width, height);
         }

         this .updateTextureParameters ();

         dependentRenderer .getProjectionMatrix () .pop ();
         dependentRenderer .getViewVolumes      () .pop ();

         if (this ._update .getValue () === "NEXT_FRAME_ONLY")
            this ._update = "NONE";
      };
   })(),
   setShaderUniforms: (() =>
   {
      const zeros = new Float32Array (16); // Trick: zero model view matrix to hide object.

      return function (gl, shaderObject, renderObject, channel)
      {
         CubeMapTexturing_X3DEnvironmentTextureNode .prototype .setShaderUniforms .call (this, gl, shaderObject, renderObject, channel);

         if (renderObject === this .dependentRenderer)
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
      };
   })(),
});

Object .defineProperties (GeneratedCubeMapTexture,
{
   typeName:
   {
      value: "GeneratedCubeMapTexture",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "CubeMapTexturing", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "texture",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "update",            new (Fields_default()).SFString ("NONE")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "size",              new (Fields_default()).SFInt32 (128)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const GeneratedCubeMapTexture_default_ = GeneratedCubeMapTexture;
;

Namespace_default().add ("GeneratedCubeMapTexture", "x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture", GeneratedCubeMapTexture_default_);
/* harmony default export */ const CubeMapTexturing_GeneratedCubeMapTexture = (GeneratedCubeMapTexture_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Networking/X3DUrlObject\")"
const X3DUrlObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Networking/X3DUrlObject");
var X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(X3DUrlObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector2\")"
const Vector2_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector2");
var Vector2_default = /*#__PURE__*/__webpack_require__.n(Vector2_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/DEVELOPMENT\")"
const DEVELOPMENT_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/DEVELOPMENT");
var DEVELOPMENT_default = /*#__PURE__*/__webpack_require__.n(DEVELOPMENT_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/CubeMapTexturing/ImageCubeMapTexture.js
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










const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

function ImageCubeMapTexture (executionContext)
{
   CubeMapTexturing_X3DEnvironmentTextureNode .call (this, executionContext);
   X3DUrlObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ImageCubeMapTexture);

   this .image    = $("<img></img>");
   this .urlStack = new (Fields_default()).MFString ();
}

Object .assign (Object .setPrototypeOf (ImageCubeMapTexture .prototype, CubeMapTexturing_X3DEnvironmentTextureNode .prototype),
   (X3DUrlObject_default()).prototype,
{
   initialize ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode .prototype .initialize .call (this);
      X3DUrlObject_default().prototype .initialize .call (this);

      // Upload default data.

      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (this .getTarget (), this .getTexture ());

      for (let i = 0; i < 6; ++ i)
         gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Initialize.

      this .image .on ("load",        this .setImage .bind (this));
      this .image .on ("abort error", this .setError .bind (this));
      this .image .prop ("crossOrigin", "Anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext ()
   {
      if (this .urlStack .length === 0)
      {
         this .clearTexture ();
         this .setLoadState ((X3DConstants_default()).FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getBaseURL ());

      if (this .URL .pathname .match (/\.ktx2?(?:\.gz)?$/) || this .URL .href .match (/^data:image\/ktx2[;,]/))
      {
         this .setLinear (true);

         this .getBrowser () .getKTXDecoder ()
            .then (decoder => decoder .loadKTXFromURL (this .URL, this .getCache ()))
            .then (texture => this .setKTXTexture (texture))
            .catch (error => this .setError ({ type: error .message }));
      }
      else
      {
         this .setLinear (false);

         if (this .URL .protocol !== "data:")
         {
            if (!this .getCache ())
               this .URL .searchParams .set ("_", Date .now ());
         }

         this .image .attr ("src", this .URL .href);
      }
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL .href)}'`, event .type);

      this .loadNext ();
   },
   setKTXTexture (texture)
   {
      if (texture .target !== this .getTarget ())
         return this .setError ({ type: "Invalid KTX texture target, must be 'TEXTURE_CUBE_MAP'." });

      if ((DEVELOPMENT_default()))
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image cube map texture '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         this .setTexture (texture);
         this .setTransparent (false);
         this .setSize (texture .baseWidth);
         this .updateTextureParameters ();

         this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   setImage ()
   {
      if ((DEVELOPMENT_default()))
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image cube map texture '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         // Create texture.

         const
            gl      = this .getBrowser () .getContext (),
            texture = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, texture);
         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, this .image [0]);

         this .imageToCubeMap (texture, this .image .prop ("width"), this .image .prop ("height"), false);

         // Update load state.

         this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   imageToCubeMap (texture, width, height)
   {
      const aspectRatio = width / height;

      if (Math .abs (aspectRatio - 4/3) < 0.01)
         this .skyBoxToCubeMap (texture, width, height);

      if (Math .abs (aspectRatio - 2/1) < 0.01)
         this .panoramaToCubeMap (texture, width, height);

      this .updateTextureParameters ();
   },
   skyBoxToCubeMap: (function ()
   {
      const offsets = [
         new (Vector2_default()) (1, 1), // Front
         new (Vector2_default()) (3, 1), // Back
         new (Vector2_default()) (0, 1), // Left
         new (Vector2_default()) (2, 1), // Right
         new (Vector2_default()) (1, 0), // Top
         new (Vector2_default()) (1, 2), // Bottom
      ];

      //     -----
      //     | t |
      // -----------------
      // | l | f | r | b |
      // -----------------
      //     | b |
      //     -----

      return function (skyBoxTexture, width, height)
      {
         const
            gl          = this .getBrowser () .getContext (),
            framebuffer = gl .createFramebuffer (),
            width1_4    = width / 4,
            height1_3   = height / 3,
            data        = new Uint8Array (width1_4 * height1_3 * 4);

         // Init cube map texture.

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
            gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, width1_4, height1_3, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

         // Extract images.

         gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
         gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, skyBoxTexture, 0);

         let transparent = false;

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            gl .copyTexSubImage2D (this .getTargets () [i], 0, 0, 0, offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3);

            // Determine image alpha.

            if (!transparent)
            {
               gl .readPixels (offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3, gl .RGBA, gl .UNSIGNED_BYTE, data);

               transparent = this .isImageTransparent (data);
            }
         }

         gl .deleteFramebuffer (framebuffer);
         gl .deleteTexture (skyBoxTexture);

         // Update size and transparent field.

         this .setTransparent (transparent);
         this .setSize (width1_4);
      };
   })(),
   panoramaToCubeMap (panoramaTexture, width, height)
   {
      // Mercator Projection

      const
         browser     = this .getBrowser (),
         gl          = browser .getContext (),
         shaderNode  = browser .getPanoramaShader (),
         framebuffer = gl .createFramebuffer (),
         textureUnit = browser .getTextureCubeUnit (),
         size        = height / 2,
         data        = new Uint8Array (size * size * 4);

      // Adjust panorama texture.

      gl .bindTexture (gl .TEXTURE_2D, panoramaTexture);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S, gl .MIRRORED_REPEAT);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T, gl .MIRRORED_REPEAT);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .LINEAR);
      gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .LINEAR);

      // Init cube map texture.

      gl .bindTexture (this .getTarget (), this .getTexture ());

      for (let i = 0; i < 6; ++ i)
         gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, size, size, 0, gl .RGBA, gl .UNSIGNED_BYTE, null);

      // Render faces.

      gl .useProgram (shaderNode .getProgram ());

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, panoramaTexture);
      gl .uniform1i (shaderNode .x3d_PanoramaTexture, textureUnit);

      gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
      gl .viewport (0, 0, size, size);
      gl .disable (gl .DEPTH_TEST);
      gl .enable (gl .CULL_FACE);
      gl .frontFace (gl .CCW);
      gl .clearColor (0, 0, 0, 0);
      gl .bindVertexArray (browser .getFullscreenVertexArrayObject ());

      let transparent = false;

      for (let i = 0; i < 6; ++ i)
      {
         gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, this .getTargets () [i], this .getTexture (), 0);
         gl .clear (gl .COLOR_BUFFER_BIT);
         gl .uniform1i (shaderNode .x3d_CurrentFace, i);
         gl .drawArrays (gl .TRIANGLES, 0, 6);

         if (!transparent)
         {
            gl .readPixels (0, 0, size, size, gl .RGBA, gl .UNSIGNED_BYTE, data);

            transparent = this .isImageTransparent (data);
         }
      }

      gl .enable (gl .DEPTH_TEST);
      gl .deleteFramebuffer (framebuffer);
      gl .deleteTexture (panoramaTexture);

      browser .resetTextureUnits ();

      // Update size and transparent field.

      this .setTransparent (transparent);
      this .setSize (size);
   },
   dispose ()
   {
      X3DUrlObject_default().prototype .dispose .call (this);
      CubeMapTexturing_X3DEnvironmentTextureNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageCubeMapTexture,
{
   typeName:
   {
      value: "ImageCubeMapTexture",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "CubeMapTexturing", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "texture",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",             new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",          new (Fields_default()).SFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "load",                 new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "url",                  new (Fields_default()).MFString ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefresh",          new (Fields_default()).SFTime ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefreshTimeLimit", new (Fields_default()).SFTime (3600)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties",    new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ImageCubeMapTexture_default_ = ImageCubeMapTexture;
;

Namespace_default().add ("ImageCubeMapTexture", "x_ite/Components/CubeMapTexturing/ImageCubeMapTexture", ImageCubeMapTexture_default_);
/* harmony default export */ const CubeMapTexturing_ImageCubeMapTexture = (ImageCubeMapTexture_default_);
;// CONCATENATED MODULE: ./src/assets/components/CubeMapTexturing.js
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
   name: "CubeMapTexturing",
   concreteNodes:
   [
      CubeMapTexturing_ComposedCubeMapTexture,
      CubeMapTexturing_GeneratedCubeMapTexture,
      CubeMapTexturing_ImageCubeMapTexture,
   ],
   abstractNodes:
   [
      CubeMapTexturing_X3DEnvironmentTextureNode,
   ],
   browserContext: CubeMapTexturing_X3DCubeMapTexturingContext,
});

const CubeMapTexturing_default_ = undefined;
;

Namespace_default().add ("CubeMapTexturing", "assets/components/CubeMapTexturing", CubeMapTexturing_default_);
/* harmony default export */ const CubeMapTexturing = ((/* unused pure expression or super */ null && (CubeMapTexturing_default_)));
})();

/******/ })()
;