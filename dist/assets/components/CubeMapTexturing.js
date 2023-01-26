/* X_ITE v8.5.2 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((module) => {

module.exports = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("lib/jquery");

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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/X3DSingleTextureNode\")"
const X3DSingleTextureNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Components/Texturing/X3DSingleTextureNode");
var X3DSingleTextureNode_default = /*#__PURE__*/__webpack_require__.n(X3DSingleTextureNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
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
}

X3DEnvironmentTextureNode .prototype = Object .assign (Object .create ((X3DSingleTextureNode_default()).prototype),
{
   constructor: X3DEnvironmentTextureNode,
   getTarget: function ()
   {
      return this .target;
   },
   getTextureType: function ()
   {
      return 4;
   },
   getTextureTypeString: function ()
   {
      return "CUBE";
   },
   getTargets: function ()
   {
      return this .targets;
   },
   clearTexture: (function ()
   {
      const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

      return function ()
      {
         const gl = this .getBrowser () .getContext ();

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (const target of this .getTargets ())
            gl .texImage2D (target, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      };
   })(),
   updateTextureParameters: function ()
   {
      X3DSingleTextureNode_default().prototype.updateTextureParameters.call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      128,
                                                                      128,
                                                                      false,
                                                                      false,
                                                                      false);
   },
   setShaderUniforms: function (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTextureCubeUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this .getTexture ());
      gl .uniform1i (channel .textureCube, textureUnit);
   },
});

const __default__ = X3DEnvironmentTextureNode;
;

Namespace_default().set ("x_ite/Components/CubeMapTexturing/X3DEnvironmentTextureNode", __default__);
/* harmony default export */ const CubeMapTexturing_X3DEnvironmentTextureNode = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Utility/BitSet\")"
const BitSet_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Utility/BitSet");
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
   CubeMapTexturing_X3DEnvironmentTextureNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).ComposedCubeMapTexture);

   this .addAlias ("front",  this ._frontTexture);
   this .addAlias ("back",   this ._backTexture);
   this .addAlias ("left",   this ._leftTexture);
   this .addAlias ("right",  this ._rightTexture);
   this .addAlias ("bottom", this ._bottomTexture);
   this .addAlias ("top",    this ._topTexture);

   this .textures      = [null, null, null, null, null, null];
   this .symbols       = [Symbol (), Symbol (), Symbol (), Symbol (), Symbol (), Symbol ()];
   this .loadStateBits = new (BitSet_default()) ();
}

ComposedCubeMapTexture .prototype = Object .assign (Object .create (CubeMapTexturing_X3DEnvironmentTextureNode.prototype),
{
   constructor: ComposedCubeMapTexture,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "frontTexture",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "backTexture",       new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "leftTexture",       new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "rightTexture",      new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bottomTexture",     new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "topTexture",        new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ComposedCubeMapTexture";
   },
   getComponentName: function ()
   {
      return "CubeMapTexturing";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode.prototype.initialize.call (this);

      // Upload default data.

      this .clearTexture ();

      // Initialize.

      this ._frontTexture  .addInterest ("set_texture__", this, 0);
      this ._backTexture   .addInterest ("set_texture__", this, 1);
      this ._leftTexture   .addInterest ("set_texture__", this, 2);
      this ._rightTexture  .addInterest ("set_texture__", this, 3);
      this ._topTexture    .addInterest ("set_texture__", this, 5);
      this ._bottomTexture .addInterest ("set_texture__", this, 4);

      this .set_texture__ (this ._frontTexture,  0);
      this .set_texture__ (this ._backTexture,   1);
      this .set_texture__ (this ._leftTexture,   2);
      this .set_texture__ (this ._rightTexture,  3);
      this .set_texture__ (this ._topTexture,    4);
      this .set_texture__ (this ._bottomTexture, 5);
   },
   set_texture__: function (node, index)
   {
      let texture = this .textures [index];

      if (texture)
      {
         texture .removeInterest ("set_loadState__", this);
         texture ._loadState .removeFieldCallback (this .symbols [index]);
      }

      texture = this .textures [index] = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, node);

      if (texture)
      {
         texture .addInterest ("set_loadState__", this, texture, index);
         texture ._loadState .addFieldCallback (this .symbols [index], this .set_loadState__ .bind (this, texture, index));
      }

      this .set_loadState__ (texture, index);
   },
   set_loadState__: function (texture, index)
   {
      if (texture)
         this .setLoadStateBit (index, texture .checkLoadState (), texture .getData ());
      else
         this .setLoadStateBit (index, (X3DConstants_default()).NOT_STARTED, null);

      this .updateTextures ();
   },
   setLoadStateBit: function (bit, loadState, data)
   {
      this .loadStateBits .set (bit, loadState === (X3DConstants_default()).COMPLETE_STATE || data);
   },
   isComplete: function ()
   {
      if (+this .loadStateBits !== 0b111111)
         return false;

      const
         textures = this .textures,
         size     = textures [0] .getWidth ();

      for (const texture of textures)
      {
         if (texture .getWidth () !== size)
            return false;

         if (texture .getHeight () !== size)
            return false;
      }

      return true;
   },
   updateTextures: function ()
   {
      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (this .getTarget (), this .getTexture ());

      if (this .isComplete ())
      {
         const textures = this .textures;

         for (let i = 0; i < 6; ++ i)
         {
            const
               texture = textures [i],
               width   = texture .getWidth (),
               height  = texture .getHeight (),
               data    = texture .getData ();

            gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, !texture .getFlipY ());

            if (data instanceof Uint8Array)
            {
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
            }
            else
            {
               gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, data);
            }
         }

         gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);

         this .updateTextureParameters ();
      }
      else
      {
         this .clearTexture ();
      }

      this .set_transparent__ ();
   },
   set_transparent__: function ()
   {
      const transparent = false;

      if (this .isComplete ())
      {
         for (const texture of this .textures)
         {
            if (texture ._transparent .getValue ())
            {
               transparent = true;
               break;
            }
         }
      }

      this .setTransparent (transparent);
   },
});

const ComposedCubeMapTexture_default_ = ComposedCubeMapTexture;
;

Namespace_default().set ("x_ite/Components/CubeMapTexturing/ComposedCubeMapTexture", ComposedCubeMapTexture_default_);
/* harmony default export */ const CubeMapTexturing_ComposedCubeMapTexture = (ComposedCubeMapTexture_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DBaseNode\")"
const X3DBaseNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Base/X3DBaseNode");
var X3DBaseNode_default = /*#__PURE__*/__webpack_require__.n(X3DBaseNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/X3DRenderObject\")"
const X3DRenderObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Rendering/X3DRenderObject");
var X3DRenderObject_default = /*#__PURE__*/__webpack_require__.n(X3DRenderObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TraverseType\")"
const TraverseType_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Rendering/TraverseType");
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

DependentRenderer .prototype = Object .assign (Object .create ((X3DBaseNode_default()).prototype),
   (X3DRenderObject_default()).prototype,
{
   constructor: DependentRenderer,
   initialize: function ()
   {
      X3DBaseNode_default().prototype.initialize.call (this);
      X3DRenderObject_default().prototype.initialize.call (this);
   },
   isIndependent: function ()
   {
      return false;
   },
   setRenderer: function (value)
   {
      this .renderObject = value;
   },
   getLayer: function ()
   {
      return this .renderObject .getLayer ();
   },
   getBackground: function ()
   {
      return this .renderObject .getBackground ();
   },
   getFog: function ()
   {
      return this .renderObject .getFog ();
   },
   getNavigationInfo: function ()
   {
      return this .renderObject .getNavigationInfo ();
   },
   getViewpoint: function ()
   {
      return this .renderObject .getViewpoint ();
   },
   getLightContainer: function ()
   {
      return this .renderObject .getLights () [this .lightIndex ++];
   },
   render: function (type, callback, group)
   {
      switch (type)
      {
         case (TraverseType_default()).COLLISION:
         {
            X3DRenderObject_default().prototype.render.call (this, type, callback, group);
            break;
         }
         case (TraverseType_default()).SHADOW:
         {
            X3DRenderObject_default().prototype.render.call (this, type, callback, group);
            break;
         }
         case (TraverseType_default()).DISPLAY:
         {
            this .lightIndex = 0;

            X3DRenderObject_default().prototype.render.call (this, type, callback, group);

            for (const light of this .renderObject .getLights ())
               light .getModelViewMatrix () .pop ();

            break;
         }
      }
   },
});

for (const key of Reflect .ownKeys (DependentRenderer .prototype))
   Object .defineProperty (DependentRenderer .prototype, key, { enumerable: false });

const DependentRenderer_default_ = DependentRenderer;
;

Namespace_default().set ("x_ite/Rendering/DependentRenderer", DependentRenderer_default_);
/* harmony default export */ const Rendering_DependentRenderer = (DependentRenderer_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Rendering/TextureBuffer\")"
const TextureBuffer_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Rendering/TextureBuffer");
var TextureBuffer_default = /*#__PURE__*/__webpack_require__.n(TextureBuffer_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/Camera\")"
const Camera_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Geometry/Camera");
var Camera_default = /*#__PURE__*/__webpack_require__.n(Camera_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Geometry/ViewVolume\")"
const ViewVolume_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Geometry/ViewVolume");
var ViewVolume_default = /*#__PURE__*/__webpack_require__.n(ViewVolume_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector4\")"
const Vector4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Numbers/Vector4");
var Vector4_default = /*#__PURE__*/__webpack_require__.n(Vector4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Algorithm\")"
const Algorithm_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Algorithm");
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
   CubeMapTexturing_X3DEnvironmentTextureNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).GeneratedCubeMapTexture);

   this .dependentRenderer = new Rendering_DependentRenderer (executionContext);
   this .projectionMatrix  = new (Matrix4_default()) ();
   this .modelMatrix       = new (Matrix4_default()) ();
   this .viewVolume        = new (ViewVolume_default()) ();
}

GeneratedCubeMapTexture .prototype = Object .assign (Object .create (CubeMapTexturing_X3DEnvironmentTextureNode.prototype),
{
   constructor: GeneratedCubeMapTexture,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "update",            new (Fields_default()).SFString ("NONE")),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "size",              new (Fields_default()).SFInt32 (128)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "GeneratedCubeMapTexture";
   },
   getComponentName: function ()
   {
      return "CubeMapTexturing";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode.prototype.initialize.call (this);

      this ._size .addInterest ("set_size__", this);

      this .dependentRenderer .setup ();

      this .set_size__ ();
   },
   set_size__: function ()
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

         // Properties

         this .viewport    = new (Vector4_default()) (0, 0, size, size);
         this .frameBuffer = new (TextureBuffer_default()) (this .getBrowser (), size, size);
      }
      else
      {
         this .frameBuffer = null;
      }
   },
   traverse: function (type, renderObject)
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
   renderTexture: (function ()
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
            projectionMatrix   = Camera_default().perspective (Algorithm_default().radians (90.0), nearValue, farValue, 1, 1, this .projectionMatrix);

         this .setTransparent (background .getTransparent ());

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
               headlightContainer .getModelViewMatrix () .pushMatrix (invCameraSpaceMatrix);
               headlightContainer .getModelViewMatrix () .multLeft (viewpoint .getCameraSpaceMatrix ());
            }

            // Render layer's children.

            layer .traverse ((TraverseType_default()).DISPLAY, dependentRenderer);

            // Pop matrices.

            if (headlight)
               headlightContainer .getModelViewMatrix () .pop ();

            dependentRenderer .getModelViewMatrix ()   .pop ();
            dependentRenderer .getCameraSpaceMatrix () .pop ();
            dependentRenderer .getViewMatrix ()        .pop ();

            // Transfer image.

            const
               data   = this .frameBuffer .readPixels (),
               width  = this .frameBuffer .getWidth (),
               height = this .frameBuffer .getHeight ();

            gl .bindTexture (this .getTarget (), this .getTexture ());
            gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width, height, false, gl .RGBA, gl .UNSIGNED_BYTE, data);
         }

         this .updateTextureParameters ();

         dependentRenderer .getProjectionMatrix () .pop ();
         dependentRenderer .getViewVolumes      () .pop ();

         this .frameBuffer .unbind ();

         if (this ._update .getValue () === "NEXT_FRAME_ONLY")
            this ._update = "NONE";
      };
   })(),
   setShaderUniforms: (function ()
   {
      const zeros = new Float32Array (16); // Trick: zero model view matrix to hide object.

      return function (gl, shaderObject, renderObject, channel)
      {
         CubeMapTexturing_X3DEnvironmentTextureNode.prototype.setShaderUniforms.call (this, gl, shaderObject, renderObject, channel);

         if (renderObject === this .dependentRenderer)
            gl .uniformMatrix4fv (shaderObject .x3d_ModelViewMatrix, false, zeros);
      };
   })(),
});

const GeneratedCubeMapTexture_default_ = GeneratedCubeMapTexture;
;

Namespace_default().set ("x_ite/Components/CubeMapTexturing/GeneratedCubeMapTexture", GeneratedCubeMapTexture_default_);
/* harmony default export */ const CubeMapTexturing_GeneratedCubeMapTexture = (GeneratedCubeMapTexture_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Networking/X3DUrlObject\")"
const X3DUrlObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/Components/Networking/X3DUrlObject");
var X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(X3DUrlObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector2\")"
const Vector2_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("standard/Math/Numbers/Vector2");
var Vector2_default = /*#__PURE__*/__webpack_require__.n(Vector2_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/DEBUG\")"
const DEBUG_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.5.2")] .require ("x_ite/DEBUG");
var DEBUG_default = /*#__PURE__*/__webpack_require__.n(DEBUG_namespaceObject);
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

const offsets = [
   new (Vector2_default()) (1, 1), // Front
   new (Vector2_default()) (3, 1), // Back
   new (Vector2_default()) (0, 1), // Left
   new (Vector2_default()) (2, 1), // Right
   new (Vector2_default()) (1, 0), // Bottom, must be exchanged with top
   new (Vector2_default()) (1, 2), // Top, must be exchanged with bottom
];

function ImageCubeMapTexture (executionContext)
{
   CubeMapTexturing_X3DEnvironmentTextureNode.call (this, executionContext);
   X3DUrlObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ImageCubeMapTexture);

   this .image    = $("<img></img>");
   this .canvas   = $("<canvas></canvas>");
   this .urlStack = new (Fields_default()).MFString ();
}

ImageCubeMapTexture .prototype = Object .assign (Object .create (CubeMapTexturing_X3DEnvironmentTextureNode.prototype),
   (X3DUrlObject_default()).prototype,
{
   constructor: ImageCubeMapTexture,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",             new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",          new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "load",                 new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "url",                  new (Fields_default()).MFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefresh",          new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefreshTimeLimit", new (Fields_default()).SFTime (3600)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties",    new (Fields_default()).SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ImageCubeMapTexture";
   },
   getComponentName: function ()
   {
      return "CubeMapTexturing";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      CubeMapTexturing_X3DEnvironmentTextureNode.prototype.initialize.call (this);
      X3DUrlObject_default().prototype.initialize.call (this);

      // Upload default data.

      const gl = this .getBrowser () .getContext ();

      gl .bindTexture (this .getTarget (), this .getTexture ());

      for (let i = 0; i < 6; ++ i)
         gl .texImage2D  (this .getTargets () [i], 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

      // Initialize.

      this .image .on ("load",        this .setImage .bind (this));
      this .image .on ("abort error", this .setError .bind (this));
      this .image .prop ("crossOrigin", "Anonymous");

      this .requestImmediateLoad ();
   },
   unLoadNow: function ()
   {
      this .clearTexture ();
   },
   loadNow: function ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext: function ()
   {
      if (this .urlStack .length === 0)
      {
         this .clearTexture ();
         this .setLoadState ((X3DConstants_default()).FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getWorldURL ());

      if (this .URL .protocol !== "data:")
      {
         if (!this .getCache ())
            this .URL .searchParams .set ("_", Date .now ());
      }

      this .image .attr ("src", this .URL .href);
   },
   setError: function ()
   {
      if (this .URL .protocol !== "data:")
         console .warn ("Error loading image:", decodeURI (this .URL .href));

      this .loadNext ();
   },
   setImage: function ()
   {
      if ((DEBUG_default()))
      {
          if (this .URL .protocol !== "data:")
            console .info ("Done loading image cube map texture:", decodeURI (this .URL .href));
      }

      try
      {
         const
            image  = this .image [0],
            canvas = this .canvas [0],
            cx     = canvas .getContext ("2d", { willReadFrequently: true });

         let
            width     = image .width,
            height    = image .height,
            width1_4  = Math .floor (width / 4),
            height1_3 = Math .floor (height / 3);

         // Scale image.

         if (! Algorithm_default().isPowerOfTwo (width1_4) || ! Algorithm_default().isPowerOfTwo (height1_3) || width1_4 * 4 !== width || height1_3 * 3 !== height)
         {
            width1_4  = Algorithm_default().nextPowerOfTwo (width1_4);
            height1_3 = Algorithm_default().nextPowerOfTwo (height1_3);
            width     = width1_4  * 4;
            height    = height1_3 * 3;

            canvas .width  = width;
            canvas .height = height;

            cx .drawImage (image, 0, 0, image .width, image .height, 0, 0, width, height);
         }
         else
         {
            canvas .width  = width;
            canvas .height = height;

            cx .drawImage (image, 0, 0);
         }

         // Extract images.

         const gl = this .getBrowser () .getContext ();

         let opaque = true;

         gl .bindTexture (this .getTarget (), this .getTexture ());

         for (let i = 0; i < 6; ++ i)
         {
            const data = cx .getImageData (offsets [i] .x * width1_4, offsets [i] .y * height1_3, width1_4, height1_3) .data;

            // Determine image alpha.

            if (opaque)
            {
               for (let a = 3; a < data .length; a += 4)
               {
                  if (data [a] !== 255)
                  {
                     opaque = false;
                     break;
                  }
               }
            }

            // Transfer image.

            gl .texImage2D (this .getTargets () [i], 0, gl .RGBA, width1_4, height1_3, false, gl .RGBA, gl .UNSIGNED_BYTE, new Uint8Array (data .buffer));
         }

         this .updateTextureParameters ();

         // Update transparent field.

         this .setTransparent (! opaque);

         // Update load state.

         this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         console .log (error .message);
         this .setError ();
      }
   },
   dispose: function ()
   {
      X3DUrlObject_default().prototype.dispose.call (this);
      CubeMapTexturing_X3DEnvironmentTextureNode.prototype.dispose.call (this);
   },
});

const ImageCubeMapTexture_default_ = ImageCubeMapTexture;
;

Namespace_default().set ("x_ite/Components/CubeMapTexturing/ImageCubeMapTexture", ImageCubeMapTexture_default_);
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







Components_default().addComponent ({
   name: "CubeMapTexturing",
   types:
   {
      ComposedCubeMapTexture:  CubeMapTexturing_ComposedCubeMapTexture,
      GeneratedCubeMapTexture: CubeMapTexturing_GeneratedCubeMapTexture,
      ImageCubeMapTexture:     CubeMapTexturing_ImageCubeMapTexture,
   },
   abstractTypes:
   {
      X3DEnvironmentTextureNode: CubeMapTexturing_X3DEnvironmentTextureNode,
   },
});

const CubeMapTexturing_default_ = undefined;
;

Namespace_default().set ("assets/components/CubeMapTexturing", CubeMapTexturing_default_);
/* harmony default export */ const CubeMapTexturing = ((/* unused pure expression or super */ null && (CubeMapTexturing_default_)));
})();

/******/ })()
;