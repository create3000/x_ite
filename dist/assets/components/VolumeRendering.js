/* X_ITE v9.1.6 */(() => { // webpackBootstrap
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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/PixelTexture\")"
const PixelTexture_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Texturing/PixelTexture");
var PixelTexture_default = /*#__PURE__*/__webpack_require__.n(PixelTexture_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/TextureProperties\")"
const TextureProperties_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Texturing/TextureProperties");
var TextureProperties_default = /*#__PURE__*/__webpack_require__.n(TextureProperties_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DNode\")"
const X3DNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Core/X3DNode");
var X3DNode_default = /*#__PURE__*/__webpack_require__.n(X3DNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode.js
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




function X3DVolumeRenderStyleNode (executionContext)
{
   X3DNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DVolumeRenderStyleNode);

   this .volumeDataNodes = new Set ();
}

Object .assign (Object .setPrototypeOf (X3DVolumeRenderStyleNode .prototype, (X3DNode_default()).prototype),
{
   addShaderFields (shaderNode)
   { },
   getUniformsText ()
   {
      return "";
   },
   getFunctionsText ()
   {
      return "";
   },
   getVolumeData ()
   {
      return this .volumeDataNodes;
   },
   addVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .add (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      this .volumeDataNodes .delete (volumeDataNode);
   },
   getNormalText (surfaceNormalsNode)
   {
      let string = "";

      if (surfaceNormalsNode)
      {
         string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec3 n = texture (surfaceNormals_" + this .getId () + ", texCoord) .xyz * 2.0 - 1.0;\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }
      else
      {
         string += "\n";
         string += "vec4\n";
         string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
         string += "{\n";
         string += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         string += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         string += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         string += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         string += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         string += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         string += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         string += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         string += "\n";
         string += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         string += "}\n";
      }

      return string;
   },
});

Object .defineProperties (X3DVolumeRenderStyleNode,
{
   typeName:
   {
      value: "X3DVolumeRenderStyleNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 1 }),
      enumerable: true,
   },
});

const __default__ = X3DVolumeRenderStyleNode;
;

Namespace_default().add ("X3DVolumeRenderStyleNode", "x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode", __default__);
/* harmony default export */ const VolumeRendering_X3DVolumeRenderStyleNode = (__default__);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode.js
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




function X3DComposableVolumeRenderStyleNode (executionContext)
{
   VolumeRendering_X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DComposableVolumeRenderStyleNode);
}

Object .setPrototypeOf (X3DComposableVolumeRenderStyleNode .prototype, VolumeRendering_X3DVolumeRenderStyleNode .prototype);

Object .defineProperties (X3DComposableVolumeRenderStyleNode,
{
   typeName:
   {
      value: "X3DComposableVolumeRenderStyleNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 1 }),
      enumerable: true,
   },
});

const X3DComposableVolumeRenderStyleNode_default_ = X3DComposableVolumeRenderStyleNode;
;

Namespace_default().add ("X3DComposableVolumeRenderStyleNode", "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode", X3DComposableVolumeRenderStyleNode_default_);
/* harmony default export */ const VolumeRendering_X3DComposableVolumeRenderStyleNode = (X3DComposableVolumeRenderStyleNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/OpacityMapVolumeStyle.js
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








function OpacityMapVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).OpacityMapVolumeStyle);
}

Object .assign (Object .setPrototypeOf (OpacityMapVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._transferFunction .addInterest ("set_transferFunction__", this);

      this .set_transferFunction__ ();
   },
   set_transferFunction__ ()
   {
      this .transferFunctionNode = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._transferFunction);

      if (! this .transferFunctionNode)
         this .transferFunctionNode = this .getBrowser () .getDefaultTransferFunction ();
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "transferFunction_" + this .getId (), new (Fields_default()).SFNode (this .transferFunctionNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// OpacityMapVolumeStyle\n";
      string += "\n";

      if (this .transferFunctionNode .getType () .includes ((X3DConstants_default()).X3DTexture2DNode))
      {
         string += "uniform sampler2D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rg);\n";
         string += "}\n";
      }
      else
      {
         string += "uniform sampler3D transferFunction_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
         string += "{\n";
         string += "   return texture (transferFunction_" + this .getId () + ", originalColor .rgb);\n";
         string += "}\n";
      }

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // OpacityMapVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getOpacityMapStyle_" + this .getId () + " (textureColor);\n";

      return string;
   },
});

Object .defineProperties (OpacityMapVolumeStyle,
{
   typeName:
   {
      value: "OpacityMapVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "transferFunction", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const OpacityMapVolumeStyle_default_ = OpacityMapVolumeStyle;
;

Namespace_default().add ("OpacityMapVolumeStyle", "x_ite/Components/VolumeRendering/OpacityMapVolumeStyle", OpacityMapVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_OpacityMapVolumeStyle = (OpacityMapVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext.js
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
   _defaultVoxelsNode         = Symbol (),
   _defaultVolumeStyle        = Symbol (),
   _defaultBlendedVolumeStyle = Symbol (),
   _defaultTransferFunction   = Symbol ();

function X3DVolumeRenderingContext () { }

Object .assign (X3DVolumeRenderingContext .prototype,
{
   getDefaultVoxels ()
   {
      this [_defaultVoxelsNode] = this .getPrivateScene () .createNode ("PixelTexture3D", false);
      this [_defaultVoxelsNode] ._image = [1, 1, 1, 1, 255];
      this [_defaultVoxelsNode] .repeatS = true;
      this [_defaultVoxelsNode] .repeatT = true;
      this [_defaultVoxelsNode] .repeatR = true;
      this [_defaultVoxelsNode] .setPrivate (true);
      this [_defaultVoxelsNode] .setup ();

      this .getDefaultVoxels = function () { return this [_defaultVoxelsNode]; };

      Object .defineProperty (this, "getDefaultVoxels", { enumerable: false });

      return this [_defaultVoxelsNode];
   },
   getDefaultVolumeStyle ()
   {
      this [_defaultVolumeStyle] = new VolumeRendering_OpacityMapVolumeStyle (this .getPrivateScene ());
      this [_defaultVolumeStyle] .setPrivate (true);
      this [_defaultVolumeStyle] .setup ();

      this .getDefaultVolumeStyle = function () { return this [_defaultVolumeStyle]; };

      Object .defineProperty (this, "getDefaultVolumeStyle", { enumerable: false });

      return this [_defaultVolumeStyle];
   },
   getDefaultBlendedVolumeStyle ()
   {
      this [_defaultBlendedVolumeStyle] = new VolumeRendering_OpacityMapVolumeStyle (this .getPrivateScene ());
      this [_defaultBlendedVolumeStyle] .setPrivate (true);
      this [_defaultBlendedVolumeStyle] .setup ();

      this .getDefaultBlendedVolumeStyle = function () { return this [_defaultBlendedVolumeStyle]; };

      Object .defineProperty (this, "getDefaultBlendedVolumeStyle", { enumerable: false });

      return this [_defaultBlendedVolumeStyle];
   },
   getDefaultTransferFunction ()
   {
      const textureProperties = new (TextureProperties_default()) (this .getPrivateScene ());
      textureProperties ._boundaryModeS       = "CLAMP_TO_EDGE";
      textureProperties ._boundaryModeT       = "REPEAT";
      textureProperties ._magnificationFilter = "DEFAULT";
      textureProperties ._minificationFilter  = "DEFAULT";
      textureProperties ._generateMipMaps     = true;
      textureProperties ._textureCompression  = "DEFAULT";
      textureProperties .setPrivate (true);
      textureProperties .setup ();

      this [_defaultTransferFunction] = new (PixelTexture_default()) (this .getPrivateScene ());
      this [_defaultTransferFunction] ._textureProperties = textureProperties;
      this [_defaultTransferFunction] ._image .width      = 256;
      this [_defaultTransferFunction] ._image .height     = 1;
      this [_defaultTransferFunction] ._image .comp       = 2;
      this [_defaultTransferFunction] ._image .array      = Array .from ({ length: 256 }, (v, i) => (i << 8) | i);
      this [_defaultTransferFunction] .setPrivate (true);
      this [_defaultTransferFunction] .setup ();

      this .getDefaultTransferFunction = function () { return this [_defaultTransferFunction]; };

      Object .defineProperty (this, "getDefaultTransferFunction", { enumerable: false });

      return this [_defaultTransferFunction];
   },
});

const X3DVolumeRenderingContext_default_ = X3DVolumeRenderingContext;
;

Namespace_default().add ("X3DVolumeRenderingContext", "x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext", X3DVolumeRenderingContext_default_);
/* harmony default export */ const VolumeRendering_X3DVolumeRenderingContext = (X3DVolumeRenderingContext_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/BlendedVolumeStyle.js
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








function BlendedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).BlendedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BlendedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._weightTransferFunction1 .addInterest ("set_weightTransferFunction1__", this);
      this ._weightTransferFunction2 .addInterest ("set_weightTransferFunction2__", this);
      this ._renderStyle             .addInterest ("set_renderStyle__",             this);
      this ._voxels                  .addInterest ("set_voxels__",                  this);

      this .set_weightTransferFunction1__ ();
      this .set_weightTransferFunction2__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();
   },
   addVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      if (this .renderStyleNode)
         this .renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      if (this .renderStyleNode)
         this .renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_weightTransferFunction1__ ()
   {
      this .weightTransferFunction1Node = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, this ._weightTransferFunction1);
   },
   set_weightTransferFunction2__ ()
   {
      this .weightTransferFunction2Node = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, this ._weightTransferFunction2);
   },
   set_renderStyle__ ()
   {
      if (this .renderStyleNode)
      {
         this .renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            this .renderStyleNode .removeVolumeData (volumeDataNode);
      }

      this .renderStyleNode = X3DCast_default() ((X3DConstants_default()).X3DComposableVolumeRenderStyleNode, this ._renderStyle);

      if (this .renderStyleNode)
      {
         this .renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            this .renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._voxels);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "weightConstant1_" + this .getId (), this ._weightConstant1 .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "weightConstant2_" + this .getId (), this ._weightConstant2 .copy ());

      if (this .weightTransferFunction1Node)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "weightTransferFunction1_" + this .getId (), new (Fields_default()).SFNode (this .weightTransferFunction1Node));

      if (this .weightTransferFunction2Node)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "weightTransferFunction2_" + this .getId (), new (Fields_default()).SFNode (this .weightTransferFunction2Node));

      if (this .voxelsNode)
      {
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "voxels_" + this .getId (), new (Fields_default()).SFNode (this .voxelsNode));
      }

      this .getBrowser () .getDefaultBlendedVolumeStyle () .addShaderFields (shaderNode);

      if (this .renderStyleNode)
         this .renderStyleNode .addShaderFields (shaderNode);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      if (! this .voxelsNode)
         return "";

      let string = "";

      string += "\n";
      string += "// BlendedVolumeStyle\n";
      string += "\n";
      string += "uniform float     weightConstant1_" + this .getId () + ";\n";
      string += "uniform float     weightConstant2_" + this .getId () + ";\n";

      if (this .weightTransferFunction1Node)
         string += "uniform sampler2D weightTransferFunction1_" + this .getId () + ";\n";

      if (this .weightTransferFunction2Node)
         string += "uniform sampler2D weightTransferFunction2_" + this .getId () + ";\n";

      string += "uniform sampler3D voxels_" + this .getId () + ";\n";

      let uniformsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getUniformsText ();

      if (this .renderStyleNode)
         uniformsText += this .renderStyleNode .getUniformsText ();

      uniformsText = uniformsText .replace (/x3d_Texture3D\s*\[0\]/g, "voxels_" + this .getId ());

      string += "\n";
      string += uniformsText;

      string += "\n";
      string += "vec4\n";
      string += "getBlendedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";

      string += "   vec4 blendColor_" + this .getId () + " = texture (voxels_" + this .getId () + ", texCoord);";

      let functionsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getFunctionsText ();

      if (this .renderStyleNode)
         functionsText += this .renderStyleNode .getFunctionsText ();

      functionsText = functionsText .replace (/textureColor/g, "blendColor_" + this .getId ());

      string += "\n";
      string += functionsText;

      switch (this ._weightFunction1 .getValue ())
      {
         default: // CONSTANT
         {
            string += "   float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
            break;
         }
         case "ALPHA0":
         {
            string += "   float w1_" + this .getId () + " = originalColor .a;\n";
            break;
         }
         case "ALPHA1":
         {
            string += "   float w1_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA0":
         {
            string += "   float w1_" + this .getId () + " = 1.0 - originalColor .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA1":
         {
            string += "   float w1_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "TABLE":
         {
            if (this .weightTransferFunction1Node)
            {
               string += "   float w1_" + this .getId () + " = texture (weightTransferFunction1_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
            }
            else
            {
               // Use default CONSTANT value.
               string += "   float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
            }

            break;
         }
      }

      switch (this ._weightFunction2 .getValue ())
      {
         default: // CONSTANT
         {
            string += "   float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
            break;
         }
         case "ALPHA0":
         {
            string += "   float w2_" + this .getId () + " = originalColor .a;\n";
            break;
         }
         case "ALPHA1":
         {
            string += "   float w2_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA0":
         {
            string += "   float w2_" + this .getId () + " = 1.0 - originalColor .a;\n";
            break;
         }
         case "ONE_MINUS_ALPHA1":
         {
            string += "   float w2_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
            break;
         }
         case "TABLE":
         {
            if (this .weightTransferFunction2Node)
            {
               string += "   float w2_" + this .getId () + " = texture (weightTransferFunction2_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
            }
            else
            {
               // Use default CONSTANT value.
               string += "   float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
            }

            break;
         }
      }

      string += "\n";
      string += "   return clamp (originalColor * w1_" + this .getId () + " + blendColor_" + this .getId () + " * w2_" + this .getId () + ", 0.0, 1.0);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      if (! this .voxelsNode)
         return "";

      let string = "";

      string += "\n";
      string += "   // BlendedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBlendedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BlendedVolumeStyle,
{
   typeName:
   {
      value: "BlendedVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",                new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",                 new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightConstant1",         new (Fields_default()).SFFloat (0.5)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightConstant2",         new (Fields_default()).SFFloat (0.5)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightFunction1",         new (Fields_default()).SFString ("CONSTANT")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightFunction2",         new (Fields_default()).SFString ("CONSTANT")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightTransferFunction1", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "weightTransferFunction2", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "renderStyle",             new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "voxels",                  new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const BlendedVolumeStyle_default_ = BlendedVolumeStyle;
;

Namespace_default().add ("BlendedVolumeStyle", "x_ite/Components/VolumeRendering/BlendedVolumeStyle", BlendedVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_BlendedVolumeStyle = (BlendedVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle.js
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







function BoundaryEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).BoundaryEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (BoundaryEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "retainedOpacity_" + this .getId (), this ._retainedOpacity .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "boundaryOpacity_" + this .getId (), this ._boundaryOpacity .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "opacityFactor_"   + this .getId (), this ._opacityFactor   .copy ());
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float retainedOpacity_" + this .getId () + ";\n";
      string += "uniform float boundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float opacityFactor_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getBoundaryEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   float f0 = texture (x3d_Texture3D [0], texCoord) .r;\n";
      string += "   float f1 = texture (x3d_Texture3D [0], texCoord + vec3 (0.0, 0.0, 1.0 / float (textureSize (x3d_Texture3D [0], 0) .z))) .r;\n";
      string += "   float f  = abs (f0 - f1);\n";
      string += "\n";
      string += "   float retainedOpacity = retainedOpacity_" + this .getId () + ";\n";
      string += "   float boundaryOpacity = boundaryOpacity_" + this .getId () + ";\n";
      string += "   float opacityFactor   = opacityFactor_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (retainedOpacity + boundaryOpacity * pow (f, opacityFactor)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // BoundaryEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getBoundaryEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (BoundaryEnhancementVolumeStyle,
{
   typeName:
   {
      value: "BoundaryEnhancementVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",         new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "retainedOpacity", new (Fields_default()).SFFloat (0.2)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "boundaryOpacity", new (Fields_default()).SFFloat (0.9)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "opacityFactor",   new (Fields_default()).SFFloat (2)),
      ]),
      enumerable: true,
   },
});

const BoundaryEnhancementVolumeStyle_default_ = BoundaryEnhancementVolumeStyle;
;

Namespace_default().add ("BoundaryEnhancementVolumeStyle", "x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle", BoundaryEnhancementVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_BoundaryEnhancementVolumeStyle = (BoundaryEnhancementVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/CartoonVolumeStyle.js
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








function CartoonVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).CartoonVolumeStyle);
}

Object .assign (Object .setPrototypeOf (CartoonVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "colorSteps_"      + this .getId (), this ._colorSteps      .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "orthogonalColor_" + this .getId (), this ._orthogonalColor .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "parallelColor_"   + this .getId (), this ._parallelColor   .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// CartoonVolumeStyle\n";
      string += "\n";
      string += "uniform int  colorSteps_" + this .getId () + ";\n";
      string += "uniform vec4 orthogonalColor_" + this .getId () + ";\n";
      string += "uniform vec4 parallelColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec3\n";
      string += "rgb2hsv_" + this .getId () + " (in vec3 color)\n";
      string += "{\n";
      string += "   float h = 0.0;\n";
      string += "   float s = 0.0;\n";
      string += "   float v = 0.0;\n";
      string += "\n";
      string += "   float min = min (min (color .r, color .g), color .b);\n";
      string += "   float max = max (max (color .r, color .g), color .b);\n";
      string += "   v = max; // value\n";
      string += "\n";
      string += "   float delta = max - min;\n";
      string += "\n";
      string += "   if (max != 0.0 && delta != 0.0)\n";
      string += "   {\n";
      string += "      s = delta / max; // s\n";
      string += "\n";
      string += "      if (color .r == max)\n";
      string += "         h =     (color .g - color .b) / delta;  // between yellow & magenta\n";
      string += "      else if (color .g == max)\n";
      string += "         h = 2.0 + (color .b - color .r) / delta;  // between cyan & yellow\n";
      string += "      else\n";
      string += "         h = 4.0 + (color .r - color .g) / delta;  // between magenta & cyan\n";
      string += "\n";
      string += "      h *= M_PI / 3.0;  // radiants\n";
      string += "      if (h < 0.0)\n";
      string += "         h += M_PI * 2.0;\n";
      string += "   }\n";
      string += "   else\n";
      string += "      s = h = 0.0;         // s = 0, h is undefined\n";
      string += "\n";
      string += "   return vec3 (h, s, v);\n";
      string += "}\n";

      string += "\n";
      string += "vec3\n";
      string += "hsv2rgb_" + this .getId () + " (in vec3 hsv)\n";
      string += "{\n";
      string += "   float h = hsv [0];\n";
      string += "   float s = clamp (hsv [1], 0.0, 1.0);\n";
      string += "   float v = clamp (hsv [2], 0.0, 1.0);\n";
      string += "\n";
      string += "   // H is given on [0, 2 * Pi]. S and V are given on [0, 1].\n";
      string += "   // RGB are each returned on [0, 1].\n";
      string += "\n";
      string += "   if (s == 0.0)\n";
      string += "   {\n";
      string += "      // achromatic (grey)\n";
      string += "      return vec3 (v, v, v);\n";
      string += "   }\n";
      string += "   else\n";
      string += "   {\n";
      string += "      float w = (h * (180.0 / M_PI)) / 60.0;     // sector 0 to 5\n";
      string += "\n";
      string += "      float i = floor (w);\n";
      string += "      float f = w - i;                      // factorial part of h\n";
      string += "      float p = v * ( 1.0 - s );\n";
      string += "      float q = v * ( 1.0 - s * f );\n";
      string += "      float t = v * ( 1.0 - s * ( 1.0 - f ) );\n";
      string += "\n";
      string += "      switch (int (i) % 6)\n";
      string += "      {\n";
      string += "         case 0:  return vec3 (v, t, p);\n";
      string += "         case 1:  return vec3 (q, v, p);\n";
      string += "         case 2:  return vec3 (p, v, t);\n";
      string += "         case 3:  return vec3 (p, q, v);\n";
      string += "         case 4:  return vec3 (t, p, v);\n";
      string += "         default: return vec3 (v, p, q);\n";
      string += "      }\n";
      string += "   }\n";
      string += "\n";
      string += "   return vec3 (0.0);\n";
      string += "}\n";

      string += "\n";
      string += "vec3\n";
      string += "mix_hsv_" + this .getId () + " (in vec3 a, in vec3 b, in float t)\n";
      string += "{\n";
      string += "   // Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.\n";
      string += "   // Source and destination color must be in HSV space.\n";
      string += "\n";
      string += "   float ha = a [0];\n";
      string += "   float sa = a [1];\n";
      string += "   float va = a [2];\n";
      string += "\n";
      string += "   float hb = b [0];\n";
      string += "   float sb = b [1];\n";
      string += "   float vb = b [2];\n";
      string += "\n";
      string += "   if (sa == 0.0)\n";
      string += "      ha = hb;\n";
      string += "\n";
      string += "   if (sb == 0.0)\n";
      string += "      hb = ha;\n";
      string += "\n";
      string += "   float range = abs (hb - ha);\n";
      string += "\n";
      string += "   if (range <= M_PI)\n";
      string += "   {\n";
      string += "      float h = ha + t * (hb - ha);\n";
      string += "      float s = sa + t * (sb - sa);\n";
      string += "      float v = va + t * (vb - va);\n";
      string += "      return vec3 (h, s, v);\n";
      string += "   }\n";
      string += "\n";
      string += "   float PI2  = M_PI * 2.0;\n";
      string += "   float step = (PI2 - range) * t;\n";
      string += "   float h    = ha < hb ? ha - step : ha + step;\n";
      string += "\n";
      string += "   if (h < 0.0)\n";
      string += "      h += PI2;\n";
      string += "\n";
      string += "   else if (h > PI2)\n";
      string += "      h -= PI2;\n";
      string += "\n";
      string += "   float s = sa + t * (sb - sa);\n";
      string += "   float v = va + t * (vb - va);\n";
      string += "   return vec3 (h, s, v);\n";
      string += "}\n";

      string += "\n";
      string += "vec4\n";
      string += "getCartoonStyle_" + this .getId () + " (in vec4 originalColor, vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 orthogonalColor = orthogonalColor_" + this .getId () + ";\n";
      string += "   vec4 parallelColor   = parallelColor_" + this .getId () + ";\n";
      string += "   int  colorSteps      = colorSteps_" + this .getId () + ";\n";
      string += "\n";
      string += "   float steps    = clamp (float (colorSteps), 1.0, 64.0);\n";
      string += "   float step     = M_PI / 2.0 / steps;\n";
      string += "   float cosTheta = min (dot (surfaceNormal .xyz, normalize (vertex)), 1.0);\n";
      string += "\n";
      string += "   if (cosTheta < 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   float t             = cos (min (floor (acos (cosTheta) / step) * (steps > 1.0 ? steps / (steps - 1.0) : 1.0), steps) * step);\n";
      string += "   vec3  orthogonalHSV = rgb2hsv_" + this .getId () + " (orthogonalColor .rgb);\n";
      string += "   vec3  parallelHSV   = rgb2hsv_" + this .getId () + " (parallelColor .rgb);\n";
      string += "\n";
      string += "   return vec4 (hsv2rgb_" + this .getId () + " (mix_hsv_" + this .getId () + " (orthogonalHSV, parallelHSV, t)), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // CartoonVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getCartoonStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (CartoonVolumeStyle,
{
   typeName:
   {
      value: "CartoonVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",         new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "colorSteps",      new (Fields_default()).SFInt32 (4)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "orthogonalColor", new (Fields_default()).SFColorRGBA (1, 1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "parallelColor",   new (Fields_default()).SFColorRGBA (0, 0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceNormals",  new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const CartoonVolumeStyle_default_ = CartoonVolumeStyle;
;

Namespace_default().add ("CartoonVolumeStyle", "x_ite/Components/VolumeRendering/CartoonVolumeStyle", CartoonVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_CartoonVolumeStyle = (CartoonVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/ComposedVolumeStyle.js
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








function ComposedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).ComposedVolumeStyle);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (ComposedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._renderStyle .addInterest ("set_renderStyle__", this);

      this .set_renderStyle__ ();
   },
   addVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addVolumeData (volumeDataNode);
   },
   removeVolumeData (volumeDataNode)
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .removeVolumeData (volumeDataNode);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .removeVolumeData (volumeDataNode);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast_default() ((X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("addNodeEvent", this);

         for (const volumeDataNode of this .getVolumeData ())
            renderStyleNode .addVolumeData (volumeDataNode);
      }
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getUniformsText ();

      string += "\n";
      string += "vec4\n";
      string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
      string += "{\n";

      for (const renderStyleNode of this .renderStyleNodes)
         string += renderStyleNode .getFunctionsText ();

      string += "\n";
      string += "   return textureColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ComposedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   }
});

Object .defineProperties (ComposedVolumeStyle,
{
   typeName:
   {
      value: "ComposedVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",     new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "renderStyle", new (Fields_default()).MFNode ()),
      ]),
      enumerable: true,
   },
});

const ComposedVolumeStyle_default_ = ComposedVolumeStyle;
;

Namespace_default().add ("ComposedVolumeStyle", "x_ite/Components/VolumeRendering/ComposedVolumeStyle", ComposedVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_ComposedVolumeStyle = (ComposedVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle.js
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








function EdgeEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).EdgeEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (EdgeEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "edgeColor_"         + this .getId (), this ._edgeColor         .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "gradientThreshold_" + this .getId (), this ._gradientThreshold .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform vec4  edgeColor_" + this .getId () + ";\n";
      string += "uniform float gradientThreshold_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getEdgeEnhacementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4  edgeColor         = edgeColor_" + this .getId () + ";\n";
      string += "   float gradientThreshold = gradientThreshold_" + this .getId () + ";\n";
      string += "\n";
      string += "   float angle = abs (dot (surfaceNormal .xyz, normalize (vertex)));\n";
      string += "\n";
      string += "   if (angle >= cos (gradientThreshold))\n";
      string += "      return originalColor;\n";
      string += "   else\n";
      string += "      return vec4 (mix (edgeColor .rgb, originalColor.rgb, angle), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // EdgeEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getEdgeEnhacementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (EdgeEnhancementVolumeStyle,
{
   typeName:
   {
      value: "EdgeEnhancementVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",          new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",           new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "edgeColor",         new (Fields_default()).SFColorRGBA (0, 0, 0, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "gradientThreshold", new (Fields_default()).SFFloat (0.4)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceNormals",    new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const EdgeEnhancementVolumeStyle_default_ = EdgeEnhancementVolumeStyle;
;

Namespace_default().add ("EdgeEnhancementVolumeStyle", "x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle", EdgeEnhancementVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_EdgeEnhancementVolumeStyle = (EdgeEnhancementVolumeStyle_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Grouping/X3DBoundedObject\")"
const X3DBoundedObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Grouping/X3DBoundedObject");
var X3DBoundedObject_default = /*#__PURE__*/__webpack_require__.n(X3DBoundedObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/Core/TextureQuality\")"
const TextureQuality_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Browser/Core/TextureQuality");
var TextureQuality_default = /*#__PURE__*/__webpack_require__.n(TextureQuality_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Shape/UnlitMaterial\")"
const UnlitMaterial_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Shape/UnlitMaterial");
var UnlitMaterial_default = /*#__PURE__*/__webpack_require__.n(UnlitMaterial_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/VolumeRendering/VolumeStyle.vs.js
const VolumeStyle_vs_default_ = /* glsl */ `#version 300 es
precision highp float;precision highp int;uniform mat4 x3d_ProjectionMatrix;uniform mat4 x3d_ModelViewMatrix;uniform mat4 x3d_TextureMatrix[1];in vec4 x3d_TexCoord0;in vec4 x3d_Vertex;out vec3 vertex;out vec4 texCoord;void main(){vec4 position=x3d_ModelViewMatrix*x3d_Vertex;vertex=position.xyz;texCoord=x3d_TextureMatrix[0]*x3d_TexCoord0;gl_Position=x3d_ProjectionMatrix*position;}`
;

Namespace_default().add ("VolumeStyle.vs", "x_ite/Browser/VolumeRendering/VolumeStyle.vs", VolumeStyle_vs_default_);
/* harmony default export */ const VolumeStyle_vs = (VolumeStyle_vs_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/VolumeRendering/VolumeStyle.fs.js
const VolumeStyle_fs_default_ = /* glsl */ `#version 300 es
precision highp float;precision highp int;precision highp sampler3D;in vec3 vertex;in vec4 texCoord;uniform sampler3D x3d_Texture3D[1];uniform mat3 x3d_TextureNormalMatrix;uniform x3d_LightSourceParameters x3d_LightSource[x3d_MaxLights];const float M_PI=3.14159265359;
#pragma X3D include "includes/ClipPlanes.glsl"
#pragma X3D include "includes/Fog.glsl"
__VOLUME_STYLES_UNIFORMS__ out vec4 x3d_FragColor;vec4 getTextureColor(in vec3 texCoord){if(any(greaterThan(abs(texCoord-0.5),vec3(0.5))))discard;vec4 textureColor=texture(x3d_Texture3D[0],texCoord);__VOLUME_STYLES_FUNCTIONS__ return textureColor;}void main(){
#if defined(X3D_CLIP_PLANES)
clip();
#endif
vec4 finalColor=getTextureColor(texCoord.stp/texCoord.q);
#if defined(X3D_FOG)
finalColor.rgb=getFogColor(finalColor.rgb);
#endif
x3d_FragColor=finalColor;}`
;

Namespace_default().add ("VolumeStyle.fs", "x_ite/Browser/VolumeRendering/VolumeStyle.fs", VolumeStyle_fs_default_);
/* harmony default export */ const VolumeStyle_fs = (VolumeStyle_fs_default_);
;// CONCATENATED MODULE: ./src/x_ite/Browser/VolumeRendering/VolumeMaterial.js
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





function VolumeMaterial (executionContext, volumeDataNode)
{
   UnlitMaterial_default().call (this, executionContext);

   this .volumeDataNode    = volumeDataNode;
   this .volumeShaderNodes = new Map ();
}

Object .assign (Object .setPrototypeOf (VolumeMaterial .prototype, (UnlitMaterial_default()).prototype),
{
   getVolumeShaders ()
   {
      return this .volumeShaderNodes;
   },
   getShader (geometryContext, renderContext)
   {
      const { fogNode, objectsKeys } = renderContext;

      let key = "";

      key += fogNode ?.getFogType () ?? 0;
      key += ".";
      key += objectsKeys .sort () .join (""); // ClipPlane, X3DLightNode

      return this .volumeShaderNodes .get (key) ?? this .createShader (key, geometryContext, renderContext);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = [ ];

      const { fogNode, objectsKeys } = renderContext;

      switch (fogNode ?.getFogType ())
      {
         case 1:
            options .push ("X3D_FOG", "X3D_FOG_LINEAR");
            break;
         case 2:
            options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
            break;
      }

      const
         numClipPlanes        = objectsKeys .reduce ((a, c) => a + (c === 0), 0),
         numLights            = objectsKeys .reduce ((a, c) => a + (c === 1), 0),
         numEnvironmentLights = objectsKeys .reduce ((a, c) => a + (c === 2), 0),
         numTextureProjectors = objectsKeys .reduce ((a, c) => a + (c === 3), 0);

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES")
         options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
      }

      if (numLights)
      {
         options .push ("X3D_LIGHTING")
         options .push (`X3D_NUM_LIGHTS ${Math .min (numLights, browser .getMaxLights ())}`);
      }

      const shaderNode = this .volumeDataNode .createShader (options, VolumeStyle_vs, VolumeStyle_fs);

      this .volumeShaderNodes .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      this .volumeDataNode .setShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (VolumeMaterial,
{
   typeName:
   {
      value: "VolumeMaterial",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "material",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: (UnlitMaterial_default()).fieldDefinitions,
   },
});

const VolumeMaterial_default_ = VolumeMaterial;
;

Namespace_default().add ("VolumeMaterial", "x_ite/Browser/VolumeRendering/VolumeMaterial", VolumeMaterial_default_);
/* harmony default export */ const VolumeRendering_VolumeMaterial = (VolumeMaterial_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/X3DVolumeDataNode.js
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










function X3DVolumeDataNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);
   X3DBoundedObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DVolumeDataNode);

   const browser = this .getBrowser ();

   this .proximitySensorNode      = browser .getPrivateScene () .createNode ("ProximitySensor",     false);
   this .transformNode            = browser .getPrivateScene () .createNode ("Transform",           false);
   this .shapeNode                = browser .getPrivateScene () .createNode ("Shape",               false);
   this .appearanceNode           = browser .getPrivateScene () .createNode ("Appearance",          false);
   this .textureTransformNode     = browser .getPrivateScene () .createNode ("TextureTransform3D",  false);
   this .geometryNode             = browser .getPrivateScene () .createNode ("QuadSet",             false);
   this .textureCoordinateNode    = browser .getPrivateScene () .createNode ("TextureCoordinate3D", false);
   this .coordinateNode           = browser .getPrivateScene () .createNode ("Coordinate",          false);
   this .volumeMaterialNode       = new VolumeRendering_VolumeMaterial (browser .getPrivateScene (), this);
   this .textureNormalMatrixArray = new Float32Array (9);

   this .setCameraObject (true);
}

Object .assign (Object .setPrototypeOf (X3DVolumeDataNode .prototype, (X3DChildNode_default()).prototype),
   (X3DBoundedObject_default()).prototype,
{
   initialize ()
   {
      X3DChildNode_default().prototype .initialize .call (this);
      X3DBoundedObject_default().prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      browser .getBrowserOptions () ._TextureQuality .addInterest ("set_dimensions__", this);

      if (gl .getVersion () >= 2)
      {
         this ._dimensions .addInterest ("set_dimensions__", this);

         this .set_dimensions__ ();
      }

      this ._bboxDisplay .addFieldInterest (this .transformNode ._bboxDisplay);

      this .proximitySensorNode ._size         = new (Fields_default()).SFVec3f (-1, -1, -1);
      this .transformNode ._children           = new (Fields_default()).MFNode (this .shapeNode);
      this .shapeNode ._appearance             = this .appearanceNode;
      this .shapeNode ._geometry               = this .geometryNode;
      this .appearanceNode ._alphaMode         = "BLEND";
      this .appearanceNode ._material          = this .volumeMaterialNode;
      this .appearanceNode ._textureTransform  = this .textureTransformNode;
      this .textureTransformNode ._translation = new (Fields_default()).SFVec3f (0.5, 0.5, 0.5);
      this .textureTransformNode ._center      = new (Fields_default()).SFVec3f (-0.5, -0.5, -0.5);
      this .geometryNode ._texCoord            = this .textureCoordinateNode;
      this .geometryNode ._coord               = this .coordinateNode;

      this .coordinateNode        .setPrivate (true);
      this .textureCoordinateNode .setPrivate (true);
      this .geometryNode          .setPrivate (true);
      this .textureTransformNode  .setPrivate (true);
      this .volumeMaterialNode    .setPrivate (true);
      this .appearanceNode        .setPrivate (true);
      this .shapeNode             .setPrivate (true);
      this .transformNode         .setPrivate (true);
      this .proximitySensorNode   .setPrivate (true);

      this .coordinateNode        .setup ();
      this .textureCoordinateNode .setup ();
      this .geometryNode          .setup ();
      this .textureTransformNode  .setup ();
      this .volumeMaterialNode    .setup ();
      this .appearanceNode        .setup ();
      this .shapeNode             .setup ();
      this .transformNode         .setup ();
      this .proximitySensorNode   .setup ();

      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .transformNode ._rotation);
      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .textureTransformNode ._rotation);

      this .textureTransformNode .addInterest ("set_textureTransform__", this);

      this .set_textureTransform__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
         return bbox .set (this ._dimensions .getValue (), (Vector3_default()).Zero);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getAppearance ()
   {
      return this .appearanceNode;
   },
   updateShader ()
   {
      this .volumeMaterialNode .getVolumeShaders () .clear ();
   },
   addShaderUniformNames (uniformNames)
   {
      uniformNames .push ("x3d_TextureNormalMatrix");
   },
   getNumPlanes ()
   {
      switch (this .getBrowser () .getBrowserOptions () .getTextureQuality ())
      {
         case (TextureQuality_default()).LOW:
         {
            return 200;
         }
         case (TextureQuality_default()).MEDIUM:
         {
            return 400;
         }
         case (TextureQuality_default()).HIGH:
         {
            return 600;
         }
      }

      return 200;
   },
   set_dimensions__ ()
   {
      const
         NUM_PLANES = this .getNumPlanes (),
         size       = this ._dimensions .getValue () .magnitude (),
         size1_2    = size / 2,
         points     = [ ];

      this .coordinateNode ._point .length = 0;

      for (let i = 0; i < NUM_PLANES; ++ i)
      {
         const z = i / (NUM_PLANES - 1) - 0.5;

         points .push ( size1_2,  size1_2, size * z,
                       -size1_2,  size1_2, size * z,
                       -size1_2, -size1_2, size * z,
                        size1_2, -size1_2, size * z);
      }

      this .coordinateNode ._point        = points;
      this .textureCoordinateNode ._point = points;
      this .textureTransformNode ._scale  = new (Fields_default()).SFVec3f (1 / this ._dimensions .x,
                                                                 1 / this ._dimensions .y,
                                                                 1 / this ._dimensions .z);
   },
   set_textureTransform__ ()
   {
      this .textureNormalMatrixArray .set (new (Matrix4_default()) (... this .textureTransformNode .getMatrix ()) .submatrix .inverse ());
   },
   traverse (type, renderObject)
   {
      this .proximitySensorNode .traverse (type, renderObject);
      this .transformNode       .traverse (type, renderObject);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniformMatrix3fv (shaderObject .x3d_TextureNormalMatrix, true, this .textureNormalMatrixArray);
   },
   dispose ()
   {
      X3DBoundedObject_default().prototype .dispose .call (this);
      X3DChildNode_default().prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DVolumeDataNode,
{
   typeName:
   {
      value: "X3DVolumeDataNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 1 }),
      enumerable: true,
   },
});

const X3DVolumeDataNode_default_ = X3DVolumeDataNode;
;

Namespace_default().add ("X3DVolumeDataNode", "x_ite/Components/VolumeRendering/X3DVolumeDataNode", X3DVolumeDataNode_default_);
/* harmony default export */ const VolumeRendering_X3DVolumeDataNode = (X3DVolumeDataNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Shaders/ComposedShader\")"
const ComposedShader_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Shaders/ComposedShader");
var ComposedShader_default = /*#__PURE__*/__webpack_require__.n(ComposedShader_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Shaders/ShaderPart\")"
const ShaderPart_namespaceObject = window [Symbol .for ("X_ITE.X3D-9.1.6")] .require ("x_ite/Components/Shaders/ShaderPart");
var ShaderPart_default = /*#__PURE__*/__webpack_require__.n(ShaderPart_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/IsoSurfaceVolumeData.js
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










function IsoSurfaceVolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).IsoSurfaceVolumeData);

   this .renderStyleNodes = [ ];
}

Object .assign (Object .setPrototypeOf (IsoSurfaceVolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._gradients        .addInterest ("set_gradients__",   this);
      this ._renderStyle      .addInterest ("set_renderStyle__", this);

      this ._contourStepSize  .addInterest ("updateShader", this);
      this ._surfaceValues    .addInterest ("updateShader", this);
      this ._surfaceTolerance .addInterest ("updateShader", this);
      this ._renderStyle      .addInterest ("updateShader", this);

      this .set_gradients__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_gradients__ ()
   {
      this .gradientsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._gradients);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("updateShader", this);
         renderStyleNode .removeVolumeData (this);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast_default() ((X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("updateShader", this);
         renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating VolumeData Shader ...");

      const opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle ();

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      styleUniforms  += "\n";
      styleUniforms  += "uniform float surfaceValues [" + this ._surfaceValues .length + "];\n";
      styleUniforms  += "uniform float surfaceTolerance;\n";

      for (const renderStyleNode of this .renderStyleNodes)
         styleUniforms  += renderStyleNode .getUniformsText ();

      styleFunctions += "\n";
      styleFunctions += "   // IsoSurfaceVolumeData\n";
      styleFunctions += "\n";

      if (this .gradientsNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D gradients;\n";

         styleFunctions += "   if (length (texture (gradients, texCoord) .xyz * 2.0 - 1.0) < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }
      else
      {
         styleUniforms += "\n";
         styleUniforms += "vec4\n";
         styleUniforms += "getNormal (in vec3 texCoord)\n";
         styleUniforms += "{\n";
         styleUniforms += "   vec4  offset = vec4 (1.0 / vec3 (textureSize (x3d_Texture3D [0], 0)), 0.0);\n";
         styleUniforms += "   float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
         styleUniforms += "   float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
         styleUniforms += "   float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
         styleUniforms += "   float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
         styleUniforms += "   float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
         styleUniforms += "   float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
         styleUniforms += "   vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
         styleUniforms += "\n";
         styleUniforms += "   return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
         styleUniforms += "}\n";

         styleFunctions += "   if (getNormal (texCoord) .w < surfaceTolerance)\n";
         styleFunctions += "      discard;\n";
      }

      styleFunctions += "\n";
      styleFunctions += "   float intensity = textureColor .r;\n";
      styleFunctions += "\n";

      if (this ._surfaceValues .length === 1)
      {
         const contourStepSize = Math .abs (this ._contourStepSize .getValue ());

         if (contourStepSize === 0)
         {
            styleFunctions += "   if (intensity > surfaceValues [0])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [0]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
         else
         {
            const surfaceValues = [ ];

            for (let v = this ._surfaceValues [0] - contourStepSize; v > 0; v -= contourStepSize)
               surfaceValues .unshift (v);

            surfaceValues .push (this ._surfaceValues [0]);

            for (let v = this ._surfaceValues [0] + contourStepSize; v < 1; v += contourStepSize)
               surfaceValues .push (v);

            styleFunctions += "   if (false)\n";
            styleFunctions += "   { }\n";

            for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
            {
               styleFunctions += "   else if (intensity > " + surfaceValues [i] + ")\n";
               styleFunctions += "   {\n";
               styleFunctions += "      textureColor = vec4 (vec3 (" + surfaceValues [i] + "), 1.0);\n";

               if (this .renderStyleNodes .length)
               {
                  styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
               }

               styleFunctions += "   }\n";
            }

            styleFunctions += "   else\n";
            styleFunctions += "   {\n";
            styleFunctions += "      discard;\n";
            styleFunctions += "   }\n";
            styleFunctions += "\n";
         }
      }
      else
      {
         styleFunctions += "   if (false)\n";
         styleFunctions += "   { }\n";

         for (let i = this ._surfaceValues .length - 1; i >= 0; -- i)
         {
            styleFunctions += "   else if (intensity > surfaceValues [" + i + "])\n";
            styleFunctions += "   {\n";
            styleFunctions += "      textureColor = vec4 (vec3 (surfaceValues [" + i + "]), 1.0);\n";

            if (this .renderStyleNodes .length)
            {
               const r = Math .min (i, this .renderStyleNodes .length - 1);

               styleFunctions += this .renderStyleNodes [r] .getFunctionsText ();
            }

            styleFunctions += "   }\n";
         }

         styleFunctions += "   else\n";
         styleFunctions += "   {\n";
         styleFunctions += "      discard;\n";
         styleFunctions += "   }\n";
         styleFunctions += "\n";
      }

      fs = fs
         .replace (/__VOLUME_STYLES_UNIFORMS__/,  styleUniforms)
         .replace (/__VOLUME_STYLES_FUNCTIONS__/, styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new (ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("VolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("VolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("VolumeDataShader");

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceValues",    this ._surfaceValues    .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceTolerance", this ._surfaceTolerance .copy ());

      if (this .gradientsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "gradients", new (Fields_default()).SFNode (this .gradientsNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const renderStyleNode of this .renderStyleNodes)
         renderStyleNode .addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (IsoSurfaceVolumeData,
{
   typeName:
   {
      value: "IsoSurfaceVolumeData",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",         new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "dimensions",       new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "contourStepSize",  new (Fields_default()).SFFloat (0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceValues",    new (Fields_default()).MFFloat ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceTolerance", new (Fields_default()).SFFloat (0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",          new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",      new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",         new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",       new (Fields_default()).SFVec3f (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "renderStyle",      new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "gradients",        new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "voxels",           new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const IsoSurfaceVolumeData_default_ = IsoSurfaceVolumeData;
;

Namespace_default().add ("IsoSurfaceVolumeData", "x_ite/Components/VolumeRendering/IsoSurfaceVolumeData", IsoSurfaceVolumeData_default_);
/* harmony default export */ const VolumeRendering_IsoSurfaceVolumeData = (IsoSurfaceVolumeData_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/ProjectionVolumeStyle.js
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







function ProjectionVolumeStyle (executionContext)
{
   VolumeRendering_X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).ProjectionVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ProjectionVolumeStyle .prototype, VolumeRendering_X3DVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "intensityThreshold_" + this .getId (), this ._intensityThreshold .copy ());
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ProjectionVolumeStyle\n";
      string += "\n";
      string += "uniform float intensityThreshold_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getProjectionStyle_" + this .getId () + "(in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "   float projectionColor = 0.0;\n";
            break;
         }
         case "MIN":
         {
            string += "   float projectionColor = 1.0;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "   float projectionColor = 0.0;\n";
            break;
         }
      }

      string += "   const int samples     = 32;\n";
      string += "   vec3  step            = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0)) / float (samples);\n";
      string += "   vec3  ray             = texCoord - step * float (samples) * 0.5;\n";
      string += "   bool  first           = false;\n";
      string += "\n";
      string += "   for (int i = 0; i < samples; ++ i, ray += step)\n";
      string += "   {\n";
      string += "      if (ray .s < 0.0 || ray .s > 1.0)\n";
      string += "         continue;\n";
      string += "\n";
      string += "      if (ray .t < 0.0 || ray .t > 1.0)\n";
      string += "         continue;\n";
      string += "\n";
      string += "      if (ray .p < 0.0 || ray .p > 1.0)\n";
      string += "         continue;\n";
      string += "\n";
      string += "      float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
      string += "\n";

      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity <= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "MIN":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity >= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "      projectionColor += intensity;\n";
            break;
         }
      }

      string += "   }\n";
      string += "\n";

      if (this ._type .getValue () === "AVERAGE")
         string += "   projectionColor /= float (samples);\n";

      string += "   return vec4 (vec3 (projectionColor), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ProjectionVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getProjectionStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ProjectionVolumeStyle,
{
   typeName:
   {
      value: "ProjectionVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",           new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",            new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "type",               new (Fields_default()).SFString ("MAX")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "intensityThreshold", new (Fields_default()).SFFloat (0)),
      ]),
      enumerable: true,
   },
});

const ProjectionVolumeStyle_default_ = ProjectionVolumeStyle;
;

Namespace_default().add ("ProjectionVolumeStyle", "x_ite/Components/VolumeRendering/ProjectionVolumeStyle", ProjectionVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_ProjectionVolumeStyle = (ProjectionVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/SegmentedVolumeData.js
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










function SegmentedVolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).SegmentedVolumeData);

   this .segmentIdentifiersNode = null;
   this .renderStyleNodes       = [ ];
}

Object .assign (Object .setPrototypeOf (SegmentedVolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._segmentIdentifiers .addInterest ("set_segmentIdentifiers__", this);
      this ._renderStyle        .addInterest ("set_renderStyle__",        this);

      this ._segmentEnabled     .addInterest ("updateShader", this);
      this ._segmentIdentifiers .addInterest ("updateShader", this);
      this ._renderStyle        .addInterest ("updateShader", this);

      this .set_segmentIdentifiers__ ();
      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   getSegmentEnabled (index)
   {
      return index < this ._segmentEnabled .length ? this ._segmentEnabled [index] : true;
   },
   set_segmentIdentifiers__ ()
   {
      this .segmentIdentifiersNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._segmentIdentifiers);
   },
   set_renderStyle__ ()
   {
      const renderStyleNodes = this .renderStyleNodes;

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .removeInterest ("updateShader", this);
         renderStyleNode .removeVolumeData (this);
      }

      renderStyleNodes .length = 0;

      for (const node of this ._renderStyle)
      {
         const renderStyleNode = X3DCast_default() ((X3DConstants_default()).X3DComposableVolumeRenderStyleNode, node);

         if (renderStyleNode)
            renderStyleNodes .push (renderStyleNode);
      }

      for (const renderStyleNode of renderStyleNodes)
      {
         renderStyleNode .addInterest ("updateShader", this);
         renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating SegmentedVolumeData Shader ...");

      const opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle ();

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .segmentIdentifiersNode)
      {
         styleUniforms += "\n";
         styleUniforms += "uniform sampler3D segmentIdentifiers;\n";
         styleUniforms += "\n";

         styleFunctions += "\n";
         styleFunctions += "   int segment = int (texture (segmentIdentifiers, texCoord) .r * 255.0);\n";
      }
      else
      {
         styleFunctions += "   int segment = 0;\n";
      }

      if (this .renderStyleNodes .length)
      {
         styleFunctions += "\n";
         styleFunctions += "   switch (segment)\n";
         styleFunctions += "   {\n";

         for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
         {
            styleFunctions += "      case " + i + ":\n";
            styleFunctions += "      {\n";

            if (this .getSegmentEnabled (i))
            {
               styleUniforms  += renderStyleNode .getUniformsText (),
               styleFunctions += renderStyleNode .getFunctionsText ();
               styleFunctions += "         break;\n";
            }
            else
            {
               styleFunctions += "         discard;\n";
            }

            styleFunctions += "      }\n";
         }

         styleFunctions += "   }\n";
      }

      fs = fs
         .replace (/__VOLUME_STYLES_UNIFORMS__/,  styleUniforms)
         .replace (/__VOLUME_STYLES_FUNCTIONS__/, styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new (ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("SegmentedVolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("SegmentedVolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("SegmentedVolumeDataShader");

      if (this .segmentIdentifiersNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "segmentIdentifiers", new (Fields_default()).SFNode (this .segmentIdentifiersNode));

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      for (const [i, renderStyleNode] of this .renderStyleNodes .entries ())
      {
         if (this .getSegmentEnabled (i))
            renderStyleNode .addShaderFields (shaderNode);
      }

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (SegmentedVolumeData,
{
   typeName:
   {
      value: "SegmentedVolumeData",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",           new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "dimensions",         new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "segmentEnabled",     new (Fields_default()).MFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",            new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay",        new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",           new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",         new (Fields_default()).SFVec3f (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "segmentIdentifiers", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "renderStyle",        new (Fields_default()).MFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "voxels",             new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SegmentedVolumeData_default_ = SegmentedVolumeData;
;

Namespace_default().add ("SegmentedVolumeData", "x_ite/Components/VolumeRendering/SegmentedVolumeData", SegmentedVolumeData_default_);
/* harmony default export */ const VolumeRendering_SegmentedVolumeData = (SegmentedVolumeData_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/ShadedVolumeStyle.js
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








function ShadedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).ShadedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ShadedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._material       .addInterest ("set_material__",       this);
      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_material__ ();
      this .set_surfaceNormals__ ();
   },
   set_material__ ()
   {
      if (this .materialNode)
         this .materialNode .removeInterest ("addNodeEvent", this);

      this .materialNode = X3DCast_default() ((X3DConstants_default()).X3DMaterialNode, this ._material);

      if (this .materialNode)
         this .materialNode .addInterest ("addNodeEvent", this);
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      if (this .materialNode)
      {
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "ambientIntensity_" + this .getId (), this .materialNode ._ambientIntensity .copy ());
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "diffuseColor_"     + this .getId (), this .materialNode ._diffuseColor     .copy ());
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "specularColor_"    + this .getId (), this .materialNode ._specularColor    .copy ());
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "emissiveColor_"    + this .getId (), this .materialNode ._emissiveColor    .copy ());
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "shininess_"        + this .getId (), this .materialNode ._shininess        .copy ());
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "transparency_"     + this .getId (), this .materialNode ._transparency     .copy ());
      }

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ShadedVolumeStyle\n";
      string += "\n";
      string += "uniform float ambientIntensity_" + this .getId () + ";\n";
      string += "uniform vec3  diffuseColor_" + this .getId () + ";\n";
      string += "uniform vec3  specularColor_" + this .getId () + ";\n";
      string += "uniform vec3  emissiveColor_" + this .getId () + ";\n";
      string += "uniform float shininess_" + this .getId () + ";\n";
      string += "uniform float transparency_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "float\n";
      string += "getSpotFactor_" + this .getId () + " (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)\n";
      string += "{\n";
      string += "   float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));\n";
      string += "\n";
      string += "   if (spotAngle >= cutOffAngle)\n";
      string += "      return 0.0;\n";
      string += "   else if (spotAngle <= beamWidth)\n";
      string += "      return 1.0;\n";
      string += "\n";
      string += "   return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);\n";
      string += "}\n";

      string += "\n";
      string += "vec4\n";
      string += "getShadedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec4 shadedColor   = vec4 (0.0);\n";

      if (this ._lighting .getValue ())
      {
         if (this .materialNode)
         {
            string += "   vec3 diffuseFactor = diffuseColor_" + this .getId () + ";\n";
            string += "   vec3 ambientTerm   = diffuseFactor * ambientIntensity_" + this .getId () + ";\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   vec3 diffuseFactor = originalColor .rgb;\n";
            string += "   vec3 ambientTerm   = vec3 (0.0);\n";
            string += "\n";
            string += "   shadedColor .a = originalColor .a;\n";
         }

         string += "\n";
         string += "   vec3 N = surfaceNormal .xyz;\n";
         string += "   vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position\n";
         string += "\n";
         string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
         string += "   {\n";
         string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
         string += "\n";
         string += "      vec3  vL = light .location - vertex; // Light to fragment\n";
         string += "      float dL = length (light .matrix * vL);\n";
         string += "      bool  di = light .type == x3d_DirectionalLight;\n";
         string += "\n";
         string += "      if (di || dL <= light .radius)\n";
         string += "      {\n";
         string += "         vec3 d = light .direction;\n";
         string += "         vec3 c = light .attenuation;\n";
         string += "         vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.\n";
         string += "         vec3 H = normalize (L + V);             // Specular term\n";
         string += "\n";
         string += "         float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.\n";
         string += "         vec3  diffuseTerm    = diffuseFactor * lightAngle;\n";
         string += "         float specularFactor = shininess_" + this .getId () + " > 0.0 ? pow (max (dot (N, H), 0.0), shininess_" + this .getId () + " * 128.0) : 1.0;\n";
         string += "         vec3  specularTerm   = light .intensity * specularColor_" + this .getId () + " * specularFactor;\n";
         string += "\n";
         string += "         float attenuationFactor     = di ? 1.0 : 1.0 / max (dot (c, vec3 (1.0, dL, dL * dL)), 1.0);\n";
         string += "         float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor_" + this .getId () + " (light .cutOffAngle, light .beamWidth, L, d) : 1.0;\n";
         string += "         float attenuationSpotFactor = attenuationFactor * spotFactor;\n";
         string += "         vec3  ambientColor          = light .ambientIntensity * ambientTerm;\n";
         string += "         vec3  diffuseSpecularColor  = light .intensity * (diffuseTerm + specularTerm);\n";
         string += "\n";
         string += "         shadedColor .rgb += attenuationSpotFactor * light .color * (ambientColor + diffuseSpecularColor);\n";
         string += "      }\n";
         string += "\n";
         string += "      shadedColor .rgb += emissiveColor_" + this .getId () + ";\n";
         string += "   }\n";
      }
      else
      {
         if (this .materialNode)
         {
            string += "   shadedColor .rgb = diffuseColor_" + this .getId () + ";\n";
            string += "   shadedColor .a   = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
         }
         else
         {
            string += "   shadedColor = originalColor;\n";
         }
      }

      string += "\n";
      string += "   return shadedColor;\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ShadedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getShadedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ShadedVolumeStyle,
{
   typeName:
   {
      value: "ShadedVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 3 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "enabled",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "lighting",       new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "shadows",        new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "phaseFunction",  new (Fields_default()).SFString ("Henyey-Greenstein")),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "material",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "surfaceNormals", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ShadedVolumeStyle_default_ = ShadedVolumeStyle;
;

Namespace_default().add ("ShadedVolumeStyle", "x_ite/Components/VolumeRendering/ShadedVolumeStyle", ShadedVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_ShadedVolumeStyle = (ShadedVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle.js
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








function SilhouetteEnhancementVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).SilhouetteEnhancementVolumeStyle);
}

Object .assign (Object .setPrototypeOf (SilhouetteEnhancementVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "silhouetteRetainedOpacity_" + this .getId (), this ._silhouetteRetainedOpacity .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "silhouetteBoundaryOpacity_" + this .getId (), this ._silhouetteBoundaryOpacity .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "silhouetteSharpness_"       + this .getId (), this ._silhouetteSharpness       .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "uniform float silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "uniform float silhouetteSharpness_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getSilhouetteEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "   \n";
      string += "   float silhouetteRetainedOpacity = silhouetteRetainedOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteBoundaryOpacity = silhouetteBoundaryOpacity_" + this .getId () + ";\n";
      string += "   float silhouetteSharpness       = silhouetteSharpness_" + this .getId () + ";\n";
      string += "\n";
      string += "   return vec4 (originalColor .rgb, originalColor .a * (silhouetteRetainedOpacity + silhouetteBoundaryOpacity * pow (1.0 - abs (dot (surfaceNormal .xyz, normalize (vertex))), silhouetteSharpness)));\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // SilhouetteEnhancementVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getSilhouetteEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (SilhouetteEnhancementVolumeStyle,
{
   typeName:
   {
      value: "SilhouetteEnhancementVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",                  new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",                   new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "silhouetteRetainedOpacity", new (Fields_default()).SFFloat (1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "silhouetteBoundaryOpacity", new (Fields_default()).SFFloat (0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "silhouetteSharpness",       new (Fields_default()).SFFloat (0.5)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceNormals",            new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const SilhouetteEnhancementVolumeStyle_default_ = SilhouetteEnhancementVolumeStyle;
;

Namespace_default().add ("SilhouetteEnhancementVolumeStyle", "x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle", SilhouetteEnhancementVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_SilhouetteEnhancementVolumeStyle = (SilhouetteEnhancementVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/ToneMappedVolumeStyle.js
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








function ToneMappedVolumeStyle (executionContext)
{
   VolumeRendering_X3DComposableVolumeRenderStyleNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).ToneMappedVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ToneMappedVolumeStyle .prototype, VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

      this .set_surfaceNormals__ ();
   },
   set_surfaceNormals__ ()
   {
      this .surfaceNormalsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._surfaceNormals);
   },
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "coolColor_" + this .getId (), this ._coolColor .copy ());
      shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "warmColor_" + this .getId (), this ._warmColor .copy ());

      if (this .surfaceNormalsNode)
         shaderNode .addUserDefinedField ((X3DConstants_default()).inputOutput, "surfaceNormals_" + this .getId (), new (Fields_default()).SFNode (this .surfaceNormalsNode));
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ToneMappedVolumeStyle\n";
      string += "\n";
      string += "uniform vec4 coolColor_" + this .getId () + ";\n";
      string += "uniform vec4 warmColor_" + this .getId () + ";\n";

      string += this .getNormalText (this .surfaceNormalsNode);

      string += "\n";
      string += "vec4\n";
      string += "getToneMappedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      string += "   vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
      string += "\n";
      string += "   if (surfaceNormal .w == 0.0)\n";
      string += "      return vec4 (0.0);\n";
      string += "\n";
      string += "   vec3 toneColor = vec3 (0.0);\n";
      string += "   vec3 coolColor = coolColor_" + this .getId () + " .rgb;\n";
      string += "   vec3 warmColor = warmColor_" + this .getId () + " .rgb;\n";
      string += "\n";
      string += "   for (int i = 0; i < X3D_NUM_LIGHTS; ++ i)\n";
      string += "   {\n";
      string += "      x3d_LightSourceParameters light = x3d_LightSource [i];\n";
      string += "\n";
      string += "      vec3  L           = light .type == x3d_DirectionalLight ? -light .direction : normalize (light .location - vertex);\n";
      string += "      float colorFactor = dot (L, surfaceNormal .xyz) * 0.5 + 0.5;\n";
      string += "\n";
      string += "      toneColor += mix (warmColor .rgb, coolColor .rgb, colorFactor);\n";
      string += "   }\n";
      string += "\n";
      string += "   return vec4 (toneColor, originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ToneMappedVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getToneMappedStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ToneMappedVolumeStyle,
{
   typeName:
   {
      value: "ToneMappedVolumeStyle",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "renderStyle",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",       new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "enabled",        new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "coolColor",      new (Fields_default()).SFColorRGBA (0, 0, 1, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "warmColor",      new (Fields_default()).SFColorRGBA (1, 1, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "surfaceNormals", new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const ToneMappedVolumeStyle_default_ = ToneMappedVolumeStyle;
;

Namespace_default().add ("ToneMappedVolumeStyle", "x_ite/Components/VolumeRendering/ToneMappedVolumeStyle", ToneMappedVolumeStyle_default_);
/* harmony default export */ const VolumeRendering_ToneMappedVolumeStyle = (ToneMappedVolumeStyle_default_);
;// CONCATENATED MODULE: ./src/x_ite/Components/VolumeRendering/VolumeData.js
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










function VolumeData (executionContext)
{
   VolumeRendering_X3DVolumeDataNode .call (this, executionContext);

   this .addType ((X3DConstants_default()).VolumeData);

   this .renderStyleNode = null;
  }

Object .assign (Object .setPrototypeOf (VolumeData .prototype, VolumeRendering_X3DVolumeDataNode .prototype),
{
   initialize ()
   {
      VolumeRendering_X3DVolumeDataNode .prototype .initialize .call (this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      this ._renderStyle .addInterest ("set_renderStyle__", this);
      this ._voxels      .addInterest ("set_voxels__",      this);
      this ._renderStyle .addInterest ("updateShader",      this);

      this .set_renderStyle__ ();
      this .set_voxels__ ();

      this .updateShader ();
   },
   set_renderStyle__ ()
   {
      if (this .renderStyleNode)
      {
         this .renderStyleNode .removeInterest ("updateShader", this);
         this .renderStyleNode .removeVolumeData (this);
      }

      this .renderStyleNode = X3DCast_default() ((X3DConstants_default()).X3DVolumeRenderStyleNode, this ._renderStyle);

      if (this .renderStyleNode)
      {
         this .renderStyleNode .addInterest ("updateShader", this);
         this .renderStyleNode .addVolumeData (this);
      }
   },
   set_voxels__ ()
   {
      this .voxelsNode = X3DCast_default() ((X3DConstants_default()).X3DTexture3DNode, this ._voxels);

      if (this .voxelsNode)
         this .getAppearance () ._texture = this ._voxels;
      else
         this .getAppearance () ._texture = this .getBrowser () .getDefaultVoxels ();
   },
   createShader (options, vs, fs)
   {
      // if (DEVELOPMENT)
      //    console .log ("Creating VolumeData Shader ...");

      const opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle ();

      let
         styleUniforms  = opacityMapVolumeStyle .getUniformsText (),
         styleFunctions = opacityMapVolumeStyle .getFunctionsText ();

      if (this .renderStyleNode)
      {
         styleUniforms  += this .renderStyleNode .getUniformsText (),
         styleFunctions += this .renderStyleNode .getFunctionsText ();
      }

      fs = fs
         .replace (/__VOLUME_STYLES_UNIFORMS__/,  styleUniforms)
         .replace (/__VOLUME_STYLES_FUNCTIONS__/, styleFunctions);

      // if (DEVELOPMENT)
      //    this .getBrowser () .print (fs);

      const vertexShader = new (ShaderPart_default()) (this .getExecutionContext ());
      vertexShader ._url .push (encodeURI ("data:x-shader/x-vertex," + vs));
      vertexShader .setPrivate (true);
      vertexShader .setName ("VolumeDataVertexShader");
      vertexShader .setOptions (options);
      vertexShader .setup ();

      const fragmentShader = new (ShaderPart_default()) (this .getExecutionContext ());
      fragmentShader ._type = "FRAGMENT";
      fragmentShader ._url .push (encodeURI ("data:x-shader/x-fragment," + fs));
      fragmentShader .setPrivate (true);
      fragmentShader .setName ("VolumeDataFragmentShader");
      fragmentShader .setOptions (options);
      fragmentShader .setup ();

      const shaderNode = new (ComposedShader_default()) (this .getExecutionContext ());
      shaderNode ._language = "GLSL";
      shaderNode ._parts .push (vertexShader);
      shaderNode ._parts .push (fragmentShader);
      shaderNode .setPrivate (true);
      shaderNode .setName ("VolumeDataShader");

      opacityMapVolumeStyle .addShaderFields (shaderNode);

      if (this .renderStyleNode)
         this .renderStyleNode .addShaderFields (shaderNode);

      const uniformNames = [ ];

      this .addShaderUniformNames (uniformNames);

      shaderNode .setUniformNames (uniformNames);
      shaderNode .setup ();

      return shaderNode;
   },
});

Object .defineProperties (VolumeData,
{
   typeName:
   {
      value: "VolumeData",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "VolumeRendering", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.3", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new (FieldDefinitionArray_default()) ([
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",    new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "dimensions",  new (Fields_default()).SFVec3f (1, 1, 1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "visible",     new (Fields_default()).SFBool (true)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "bboxDisplay", new (Fields_default()).SFBool ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxSize",    new (Fields_default()).SFVec3f (-1, -1, -1)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "bboxCenter",  new (Fields_default()).SFVec3f (0, 0, 0)),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "renderStyle", new (Fields_default()).SFNode ()),
         new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "voxels",      new (Fields_default()).SFNode ()),
      ]),
      enumerable: true,
   },
});

const VolumeData_default_ = VolumeData;
;

Namespace_default().add ("VolumeData", "x_ite/Components/VolumeRendering/VolumeData", VolumeData_default_);
/* harmony default export */ const VolumeRendering_VolumeData = (VolumeData_default_);
;// CONCATENATED MODULE: ./src/assets/components/VolumeRendering.js
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
   name: "VolumeRendering",
   concreteNodes:
   [
      VolumeRendering_BlendedVolumeStyle,
      VolumeRendering_BoundaryEnhancementVolumeStyle,
      VolumeRendering_CartoonVolumeStyle,
      VolumeRendering_ComposedVolumeStyle,
      VolumeRendering_EdgeEnhancementVolumeStyle,
      VolumeRendering_IsoSurfaceVolumeData,
      VolumeRendering_OpacityMapVolumeStyle,
      VolumeRendering_ProjectionVolumeStyle,
      VolumeRendering_SegmentedVolumeData,
      VolumeRendering_ShadedVolumeStyle,
      VolumeRendering_SilhouetteEnhancementVolumeStyle,
      VolumeRendering_ToneMappedVolumeStyle,
      VolumeRendering_VolumeData,
   ],
   abstractNodes:
   [
      VolumeRendering_X3DComposableVolumeRenderStyleNode,
      VolumeRendering_X3DVolumeDataNode,
      VolumeRendering_X3DVolumeRenderStyleNode,
   ],
   browserContext: VolumeRendering_X3DVolumeRenderingContext,
});

const VolumeRendering_default_ = undefined;
;

Namespace_default().add ("VolumeRendering", "assets/components/VolumeRendering", VolumeRendering_default_);
/* harmony default export */ const VolumeRendering = ((/* unused pure expression or super */ null && (VolumeRendering_default_)));
/******/ })()
;