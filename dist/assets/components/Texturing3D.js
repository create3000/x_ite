/* X_ITE v7.0.0-4553 */ (() => { // webpackBootstrap
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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/X3DSingleTextureNode\")"
const X3DSingleTextureNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components/Texturing/X3DSingleTextureNode");
var X3DSingleTextureNode_default = /*#__PURE__*/__webpack_require__.n(X3DSingleTextureNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/X3DTexture3DNode.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/





const defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

function X3DTexture3DNode (executionContext)
{
   X3DSingleTextureNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DTexture3DNode);

   const gl = this .getBrowser () .getContext ();

   this .target = gl .TEXTURE_3D;
   this .width  = 0;
   this .height = 0;
   this .depth  = 0;
   this .data   = null;
}

X3DTexture3DNode .prototype = Object .assign (Object .create ((X3DSingleTextureNode_default()).prototype),
{
   constructor: X3DTexture3DNode,
   initialize: function ()
   {
      X3DSingleTextureNode_default().prototype.initialize.call (this);

      this ._repeatS .addInterest ("updateTextureParameters", this);
      this ._repeatT .addInterest ("updateTextureParameters", this);
      this ._repeatR .addInterest ("updateTextureParameters", this);

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
   },
   getTarget: function ()
   {
      return this .target;
   },
   getTextureType: function ()
   {
      return 3;
   },
   getTextureTypeString: function ()
   {
      return "3D";
   },
   getWidth: function ()
   {
      return this .width;
   },
   getHeight: function ()
   {
      return this .height;
   },
   getDepth: function ()
   {
      return this .depth;
   },
   getFlipY: function ()
   {
      return false;
   },
   getData: function ()
   {
      return this .data;
   },
   clearTexture: function ()
   {
      const gl = this .getBrowser () .getContext ();

      this .setTexture (1, 1, 1, false, gl .RGBA, defaultData);

      this .data = null;
   },
   setTexture: function (width, height, depth, transparent, format, data)
   {
      this .width  = width;
      this .height = height;
      this .depth  = depth;
      this .data   = data;

      const gl = this .getBrowser () .getContext ();

      if (gl .getVersion () < 2)
         return;

      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .texImage3D  (gl .TEXTURE_3D, 0, format, width, height, depth, 0, format, gl .UNSIGNED_BYTE, data);

      this .setTransparent (transparent);
      this .updateTextureParameters ();
      this .addNodeEvent ();
   },
   updateTextureParameters: function ()
   {
      X3DSingleTextureNode_default().prototype.updateTextureParameters.call (this,
                                                                      this .target,
                                                                      this ._textureProperties .getValue (),
                                                                      this .texturePropertiesNode,
                                                                      this .width,
                                                                      this .height,
                                                                      this ._repeatS .getValue (),
                                                                      this ._repeatT .getValue (),
                                                                      this ._repeatR .getValue ());
   },
   setShaderUniforms: function (gl, shaderObject, renderObject, channel = shaderObject .x3d_Texture [0])
   {
      const textureUnit = this .getBrowser () .getTexture3DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
      gl .uniform1i (channel .texture3D, textureUnit);
   },
});

/* harmony default export */ const Texturing3D_X3DTexture3DNode = (X3DTexture3DNode);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DCast\")"
const X3DCast_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Base/X3DCast");
var X3DCast_default = /*#__PURE__*/__webpack_require__.n(X3DCast_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/ComposedTexture3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function ComposedTexture3D (executionContext)
{
   Texturing3D_X3DTexture3DNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).ComposedTexture3D);

   this .addChildObjects ("loadState", new (Fields_default()).SFInt32 ((X3DConstants_default()).NOT_STARTED_STATE));

   this .textureNodes = [ ];
}

ComposedTexture3D .prototype = Object .assign (Object .create (Texturing3D_X3DTexture3DNode.prototype),
{
   constructor: ComposedTexture3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatS",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatT",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatR",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "texture",           new (Fields_default()).MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ComposedTexture3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      Texturing3D_X3DTexture3DNode.prototype.initialize.call (this);

      this ._texture .addInterest ("set_texture__", this);

      this .set_texture__ ();
   },
   checkLoadState: function ()
   {
      return this ._loadState .getValue ();
   },
   set_texture__: function ()
   {
      const textureNodes = this .textureNodes;

      for (const textureNode of textureNodes)
         textureNode .removeInterest ("update", this);

      textureNodes .length = 0;

      for (const node of this ._texture)
      {
         const textureNode = X3DCast_default() ((X3DConstants_default()).X3DTexture2DNode, node);

         if (textureNode)
            textureNodes .push (textureNode);
      }

      for (const textureNode of textureNodes)
         textureNode .addInterest ("update", this);

      this .update ();
   },
   update: function ()
   {
      const
         textureNodes = this .textureNodes,
         complete     = textureNodes .every (function (textureNode) { return textureNode .checkLoadState () === (X3DConstants_default()).COMPLETE_STATE; });

      if (textureNodes .length === 0 || !complete)
      {
         this .clearTexture ();

         this ._loadState = (X3DConstants_default()).FAILED_STATE;
      }
      else
      {
         const
            gl           = this .getBrowser () .getContext (),
            textureNode0 = textureNodes [0],
            width        = textureNode0 .getWidth (),
            height       = textureNode0 .getHeight (),
            depth        = textureNodes .length,
            size         = width * height * 4,
            data         = new Uint8Array (size * depth);

         let transparent = 0;

         for (let i = 0, d = 0; i < depth; ++ i, d += size)
         {
            const
               textureNode = this .textureNodes [i],
               tData       = textureNode .getData ();

            if (textureNode .getWidth () === width && textureNode .getHeight () === height)
            {
               transparent += textureNode .getTransparent ();

               data .set (tData, d);
            }
            else
            {
               console .log ("ComposedTexture3D: all textures must have same size.");
            }
         }

         this .setTexture (width, height, depth, !!transparent, gl .RGBA, data);
         this ._loadState = (X3DConstants_default()).COMPLETE_STATE;
      }
   },
});

/* harmony default export */ const Texturing3D_ComposedTexture3D = (ComposedTexture3D);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Networking/X3DUrlObject\")"
const X3DUrlObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components/Networking/X3DUrlObject");
var X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(X3DUrlObject_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Texturing3D/NRRDParser.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


// Grammar

var Grammar =
{
   NRRD: new RegExp ("^NRRD(\\d+)\\n", 'gy'),
   field: new RegExp ("([\\w\\s]+):\\s*(.+?)\\n", 'gy'),
   comment: new RegExp ("#[^\\n]*\\n", 'gy'),
   newLine: new RegExp ("\n", 'gy'),
   data: new RegExp ("([^]*)$", 'gy'),
};

function parse (parser)
{
   this .lastIndex = parser .lastIndex;

   parser .result = this .exec (parser .input);

   if (parser .result)
   {
      parser .lastIndex = this .lastIndex;
      return true;
   }

   return false;
}

for (var key in Grammar)
   Grammar [key] .parse = parse;

// Parser

function NRRDParser ()
{
   this .fieldFunction = new Map ([
      ["type",      this .getType],
      ["encoding",  this .getEncoding],
      ["dimension", this .getDimension],
      ["sizes",     this .getSizes],
      ["endian",    this .getEndian],
   ]);
}

NRRDParser .prototype =
{
   parse: function (input)
   {
      this .setInput (input);

      if (this .getNRRD ())
      {
         this .getFields ();
         this .getData ();
      }

      return this .nrrd;
   },
   setInput: function (value)
   {
      this .input     = value;
      this .lastIndex = 0;
      this .nrrd      = { };
      this .endian    = "little";
   },
   getNRRD: function ()
   {
      if (Grammar .NRRD .parse (this))
      {
         this .nrrd .nrrd    = true;
         this .nrrd .version = parseInt (this .result [1]);
         this .endian        = this .getEndianess ();
         return true;
      }

      this .nrrd .nrrd = false;
      return false;
   },
   getFields: function ()
   {
      while (Grammar .comment .parse (this))
         ;

      while (Grammar .field .parse (this))
      {
         var
            key   = this .result [1] .toLowerCase (),
            value = this .result [2] .trim () .toLowerCase (),
            fun   = this .fieldFunction .get (key);

         if (fun)
            fun .call (this, value);

         while (Grammar .comment .parse (this))
            ;
      }
   },
   getType: (function ()
   {
      var types = new Map ([
         ["signed char",        ["signed char", 1]],
         ["int8",               ["signed char", 1]],
         ["int8_t",             ["signed char", 1]],
         ["uchar",              ["unsigned char", 1]],
         ["unsigned char",      ["unsigned char", 1]],
         ["uint8",              ["unsigned char", 1]],
         ["uint8_t",            ["unsigned char", 1]],
         ["short",              ["signed short", 2]],
         ["short int",          ["signed short", 2]],
         ["signed short",       ["signed short", 2]],
         ["signed short int",   ["signed short", 2]],
         ["int16",              ["signed short", 2]],
         ["int16_t",            ["signed short", 2]],
         ["ushort",             ["unsigned short", 2]],
         ["unsigned short",     ["unsigned short", 2]],
         ["unsigned short int", ["unsigned short", 2]],
         ["uint16",             ["unsigned short", 2]],
         ["uint16_t",           ["unsigned short", 2]],
         ["int",                ["signed int", 4]],
         ["signed int",         ["signed int", 4]],
         ["int32",              ["signed int", 4]],
         ["int32_t",            ["signed int", 4]],
         ["uint",               ["unsigned int", 4]],
         ["unsigned int",       ["unsigned int", 4]],
         ["uint32",             ["unsigned int", 4]],
         ["uint32_t",           ["unsigned int", 4]],
         ["float",              ["float", 4]],
         ["double",             ["double", 8]],
      ]);

      return function (value)
      {
         var type = types .get (value);

         if (type === undefined)
            throw new Error ("Unsupported NRRD type '" + value + "'.");

         this .byteType = type [0];
         this .bytes    = type [1];
      };
   })(),
   getEncoding: (function ()
   {
      var encodings = new Map ([
         ["ascii", "ascii"],
         ["txt",   "ascii"],
         ["text",  "ascii"],
         ["raw",   "raw"],
         ["hex",   "hex"],
         ["gz",    "gzip"],
         ["gzip",  "gzip"],
      ]);

      return function (value)
      {
         var encoding = encodings .get (value);

         if (encoding === undefined)
            throw new Error ("Unsupported NRRD encoding '" + value + "'.");

         this .encoding = encoding;
      };
   })(),
   getDimension: function (value)
   {
      var
         result    = value .match (/(\d+)/),
         dimension = 0;

      if (result)
      {
         dimension = parseInt (result [1]);

         switch (dimension)
         {
            case 1:
            case 2:
            case 3:
            case 4:
               this .dimension = dimension;
               return;
         }
      }

      throw new Error ("Unsupported NRRD dimension '" + dimension + "', must be 1, 2, 3, or 4.");
   },
   getSizes: function (value)
   {
      var
         num    = new RegExp ("\\s*(\\d+)", 'gy'),
         result = null,
         sizes  = [ ];

      while (result = num .exec (value))
      {
         sizes .push (parseInt (result [1]));
      }

      switch (sizes .length)
      {
         case 1:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = 1;
            this .nrrd .depth      = 1;
            return;
         }
         case 2:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = sizes [1];
            this .nrrd .depth      = 1;
            return;
         }
         case 3:
         {
            this .nrrd .components = 1;
            this .nrrd .width      = sizes [0];
            this .nrrd .height     = sizes [1];
            this .nrrd .depth      = sizes [2];
            return;
         }
         case 4:
         {
            this .nrrd .components = sizes [0];
            this .nrrd .width      = sizes [1];
            this .nrrd .height     = sizes [2];
            this .nrrd .depth      = sizes [3];
            return;
         }
         default:
            throw new Error ("Unsupported NRRD sizes.");
      }
   },
   getEndian: function (value)
   {
      if (value === 'little' || value === 'big')
      {
         this .endian = value;
         return;
      }

      throw new Error ("Unsupported NRRD endian, must be 'little' or 'big'.");
   },
   getData: function ()
   {
      switch (this .encoding)
      {
         case "ascii":
         {
            this .ascii ();
            break;
         }
         case "raw":
         {
            this .rawString (this .input);
            break;
         }
         case "hex":
         {
            this .hex ();
            break;
         }
         case "gzip":
         {
            this .gzip ();
            break;
         }
      }
   },
   ascii: function ()
   {
      var
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      if (! Grammar .data .parse (this))
         return;

      var numbers = this .result [1] .trim () .split (/\s+/);

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            numbers .forEach (function (value, i)
            {
               data [i] = parseInt (value);
            });

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            numbers .forEach (function (value, i)
            {
               data [i] = parseInt (value) / 256;
            });

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            numbers .forEach (function (value, i)
            {
               data [i] = parseInt (value) / 16777216;
            });

            return;
         }
         case "float":
         {
            numbers .forEach (function (value, i)
            {
               data [i] = parseFloat (value) / 256;
            });

            return;
         }
         case "double":
         {
            numbers .forEach (function (value, i)
            {
               data [i] = parseFloat (value) / 16777216;
            });

            return;
         }
      }
   },
   rawString: function (input)
   {
      var
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         length     = dataLength * this .bytes,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (var i = input .length - length, d = 0; i < input .length; ++ i, ++ d)
               data [d] = input .charCodeAt (i);

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1;
            else
               var e0 = 1, e1 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 2, ++ d)
               data [d] = this .short2byte (input .charCodeAt (i + e0),
                                            input .charCodeAt (i + e1));

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .int2byte (input .charCodeAt (i + e0),
                                          input .charCodeAt (i + e1),
                                          input .charCodeAt (i + e2),
                                          input .charCodeAt (i + e3));

            return;
         }
         case "float":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .float2byte (input .charCodeAt (i + e0),
                                            input .charCodeAt (i + e1),
                                            input .charCodeAt (i + e2),
                                            input .charCodeAt (i + e3));

            return;
         }
         case "double":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3, e4 = 4, e5 = 5, e6 = 6, e7 = 7;
            else
               var e0 = 7, e1 = 6, e2 = 5, e3 = 4, e4 = 3, e5 = 2, e6 = 1, e7 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 8, ++ d)
               data [d] = this .double2byte (input .charCodeAt (i + e0),
                                             input .charCodeAt (i + e1),
                                             input .charCodeAt (i + e2),
                                             input .charCodeAt (i + e3),
                                             input .charCodeAt (i + e4),
                                             input .charCodeAt (i + e5),
                                             input .charCodeAt (i + e6),
                                             input .charCodeAt (i + e7));

            return;
         }
      }
   },
   rawArray: function (input)
   {
      var
         dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
         length     = dataLength * this .bytes,
         data       = new Uint8Array (dataLength);

      this .nrrd .data = data;

      switch (this .byteType)
      {
         case "signed char":
         case "unsigned char":
         {
            for (var i = input .length - length, d = 0; i < input .length; ++ i, ++ d)
               data [d] = input [i];

            return;
         }
         case "signed short":
         case "unsigned short":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1;
            else
               var e0 = 1, e1 = 0;

               for (var i = input .length - length, d = 0; i < input .length; i += 2, ++ d)
                  data [d] = this .short2byte (input [i + e0],
                                               input [i + e1]);

            return;
         }
         case "signed int":
         case "unsigned int":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .int2byte (input [i + e0],
                                          input [i + e1],
                                          input [i + e2],
                                          input [i + e3]);

            return;
         }
         case "float":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3;
            else
               var e0 = 3, e1 = 2, e2 = 1, e3 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
               data [d] = this .float2byte (input [i + e0],
                                            input [i + e1],
                                            input [i + e2],
                                            input [i + e3]);

            return;
         }
         case "double":
         {
            if (this .getEndianess () === this .endian)
               var e0 = 0, e1 = 1, e2 = 2, e3 = 3, e4 = 4, e5 = 5, e6 = 6, e7 = 7;
            else
               var e0 = 7, e1 = 6, e2 = 5, e3 = 4, e4 = 3, e5 = 2, e6 = 1, e7 = 0;

            for (var i = input .length - length, d = 0; i < input .length; i += 8, ++ d)
               data [d] = this .double2byte (input [i + e0],
                                             input [i + e1],
                                             input [i + e2],
                                             input [i + e3],
                                             input [i + e4],
                                             input [i + e5],
                                             input [i + e6],
                                             input [i + e7]);

            return;
         }
      }
   },
   hex: function ()
   {
      if (Grammar .data .parse (this))
      {
         var match = this .result [1] .match (/([0-9a-fA-F]{2})/g);

         if (match)
         {
            var raw = match .map (function (value)
            {
               return parseInt (value, 16);
            });

            this .rawArray (raw);
            return;
         }
      }

      throw new Error ("Invalid NRRD data.");
   },
   gzip: function ()
   {
      try
      {
         if (! Grammar .newLine .parse (this))
            throw new Error ("Invalid NRRD data.");

         Grammar .data .parse (this);

         const
            buffer = this .binaryStringToBuffer (this .result [1]),
            raw    = pako .ungzip (buffer, { to: "raw" });

         this .rawArray (raw);
      }
      catch (error)
      {
         throw new Error ("Invalid NRRD data.");
      }
   },
   binaryStringToBuffer: function (string)
   {
      const buffer = new Uint8Array (string .length);

      for (let i = 0, length = string .length; i < length; ++ i)
         buffer [i] = string .charCodeAt (i);

      return buffer;
   },
   getEndianess: function ()
   {
      var
         buffer = new ArrayBuffer (4),
         int    = new Uint32Array (buffer),
         bytes  = new Uint8Array (buffer);

      int [0] = 0x01020304;

      if (bytes [0] == 1 && bytes [1] == 2 && bytes [2] == 3 && bytes [3] == 4)
         return 'big';

      if (bytes [0] == 4 && bytes [1] == 3 && bytes [2] == 2 && bytes [3] == 1)
         return 'little';

      throw new Error ("NRRD: unkown system endianess,");
   },
   short2byte: (function ()
   {
      var
         bytes  = new Uint8Array (2),
         number = new Uint16Array (bytes .buffer);

      return function (b0, b1)
      {
         bytes [0] = b0;
         bytes [1] = b1;

         return number [0] / 256;
      };
   })(),
   int2byte: (function ()
   {
      var
         bytes  = new Uint8Array (4),
         number = new Uint32Array (bytes .buffer);

      return function (b0, b1, b2, b3)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;

         return number [0] / 16777216;
      };
   })(),
   float2byte: (function ()
   {
      var
         bytes  = new Uint8Array (4),
         number = new Float32Array (bytes .buffer);

      return function (b0, b1, b2, b3)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;

         return number [0] / 256;
      };
   })(),
   double2byte: (function ()
   {
      var
         bytes  = new Uint8Array (8),
         number = new Float64Array (bytes .buffer);

      return function (b0, b1, b2, b3, b4, b5, b6, b7)
      {
         bytes [0] = b0;
         bytes [1] = b1;
         bytes [2] = b2;
         bytes [3] = b3;
         bytes [4] = b4;
         bytes [5] = b5;
         bytes [6] = b6;
         bytes [7] = b7;

         return number [0] / 16777216;
      };
   })(),
};

/* harmony default export */ const Texturing3D_NRRDParser = (NRRDParser);

;// CONCATENATED MODULE: ./src/lib/jpeg/jpeg.js
// jshint ignore: start

/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
 /* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/*
 Copyright 2011 notmasteryet

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

// - The JPEG specification can be found in the ITU CCITT Recommendation T.81
//   (www.w3.org/Graphics/JPEG/itu-t81.pdf)
// - The JFIF specification can be found in the JPEG File Interchange Format
//   (www.w3.org/Graphics/JPEG/jfif3.pdf)
// - The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
//   in PostScript Level 2, Technical Note #5116
//   (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)

var ColorSpace = {Unkown: 0, Grayscale: 1, AdobeRGB: 2, RGB: 3, CYMK: 4};
var JpegImage = (function jpegImage() {
  "use strict";
  var dctZigZag = new Int32Array([
    0,
    1, 8,
    16, 9, 2,
    3, 10, 17, 24,
    32, 25, 18, 11, 4,
    5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13, 6,
    7, 14, 21, 28, 35, 42, 49, 56,
    57, 50, 43, 36, 29, 22, 15,
    23, 30, 37, 44, 51, 58,
    59, 52, 45, 38, 31,
    39, 46, 53, 60,
    61, 54, 47,
    55, 62,
    63
  ]);

  var dctCos1 = 4017;   // cos(pi/16)
  var dctSin1 = 799;   // sin(pi/16)
  var dctCos3 = 3406;   // cos(3*pi/16)
  var dctSin3 = 2276;   // sin(3*pi/16)
  var dctCos6 = 1567;   // cos(6*pi/16)
  var dctSin6 = 3784;   // sin(6*pi/16)
  var dctSqrt2 = 5793;   // sqrt(2)
  var dctSqrt1d2 = 2896;  // sqrt(2) / 2

  function constructor() {
  }

  function buildHuffmanTable(codeLengths, values) {
    var k = 0, code = [], i, j, length = 16;
    while (length > 0 && !codeLengths[length - 1])
      length--;
    code.push({children: [], index: 0});
    var p = code[0], q;
    for (i = 0; i < length; i++) {
      for (j = 0; j < codeLengths[i]; j++) {
        p = code.pop();
        p.children[p.index] = values[k];
        while (p.index > 0) {
          p = code.pop();
        }
        p.index++;
        code.push(p);
        while (code.length <= i) {
          code.push(q = {children: [], index: 0});
          p.children[p.index] = q.children;
          p = q;
        }
        k++;
      }
      if (i + 1 < length) {
        // p here points to last code
        code.push(q = {children: [], index: 0});
        p.children[p.index] = q.children;
        p = q;
      }
    }
    return code[0].children;
  }

  function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
  }

  function decodeScan(data, offset,
                      frame, components, resetInterval,
                      spectralStart, spectralEnd,
                      successivePrev, successive) {
    var precision = frame.precision;
    var samplesPerLine = frame.samplesPerLine;
    var scanLines = frame.scanLines;
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;
    var maxH = frame.maxH, maxV = frame.maxV;

    var startOffset = offset, bitsData = 0, bitsCount = 0;

    function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return (bitsData >> bitsCount) & 1;
      }
      bitsData = data[offset++];
      if (bitsData == 0xFF) {
        var nextByte = data[offset++];
        if (nextByte) {
          throw "unexpected marker: " + ((bitsData << 8) | nextByte).toString(16);
        }
        // unstuff 0
      }
      bitsCount = 7;
      return bitsData >>> 7;
    }

    function decodeHuffman(tree) {
      var node = tree;
      var bit;
      while ((bit = readBit()) !== null) {
        node = node[bit];
        if (typeof node === 'number')
          return node;
        if (typeof node !== 'object')
          throw "invalid huffman sequence";
      }
      return null;
    }

    function receive(length) {
      var n = 0;
      while (length > 0) {
        var bit = readBit();
        if (bit === null)
          return;
        n = (n << 1) | bit;
        length--;
      }
      return n;
    }

    function receiveAndExtend(length) {
      var n = receive(length);
      if (n >= 1 << (length - 1))
        return n;
      return n + (-1 << length) + 1;
    }

    function decodeBaseline(component, offset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t);
      component.blockData[offset] = (component.pred += diff);
      var k = 1;
      while (k < 64) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15, r = rs >> 4;
        if (s === 0) {
          if (r < 15)
            break;
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[offset + z] = receiveAndExtend(s);
        k++;
      }
    }

    function decodeDCFirst(component, offset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : (receiveAndExtend(t) << successive);
      component.blockData[offset] = (component.pred += diff);
    }

    function decodeDCSuccessive(component, offset) {
      component.blockData[offset] |= readBit() << successive;
    }

    var eobrun = 0;
    function decodeACFirst(component, offset) {
      if (eobrun > 0) {
        eobrun--;
        return;
      }
      var k = spectralStart, e = spectralEnd;
      while (k <= e) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15, r = rs >> 4;
        if (s === 0) {
          if (r < 15) {
            eobrun = receive(r) + (1 << r) - 1;
            break;
          }
          k += 16;
          continue;
        }
        k += r;
        var z = dctZigZag[k];
        component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
        k++;
      }
    }

    var successiveACState = 0, successiveACNextValue;
    function decodeACSuccessive(component, offset) {
      var k = spectralStart, e = spectralEnd, r = 0;
      while (k <= e) {
        var z = dctZigZag[k];
        switch (successiveACState) {
          case 0: // initial state
            var rs = decodeHuffman(component.huffmanTableAC);
            var s = rs & 15;
            r = rs >> 4;
            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r);
                successiveACState = 4;
              } else {
                r = 16;
                successiveACState = 1;
              }
            } else {
              if (s !== 1)
                throw "invalid ACn encoding";
              successiveACNextValue = receiveAndExtend(s);
              successiveACState = r ? 2 : 3;
            }
            continue;
          case 1: // skipping r zero items
          case 2:
            if (component.blockData[offset + z]) {
              component.blockData[offset + z] += (readBit() << successive);
            } else {
              r--;
              if (r === 0)
                successiveACState = successiveACState == 2 ? 3 : 0;
            }
            break;
          case 3: // set value for a zero item
            if (component.blockData[offset + z]) {
              component.blockData[offset + z] += (readBit() << successive);
            } else {
              component.blockData[offset + z] = successiveACNextValue << successive;
              successiveACState = 0;
            }
            break;
          case 4: // eob
            if (component.blockData[offset + z]) {
              component.blockData[offset + z] += (readBit() << successive);
            }
            break;
        }
        k++;
      }
      if (successiveACState === 4) {
        eobrun--;
        if (eobrun === 0)
          successiveACState = 0;
      }
    }

    function decodeMcu(component, decode, mcu, row, col) {
      var mcuRow = (mcu / mcusPerLine) | 0;
      var mcuCol = mcu % mcusPerLine;
      var blockRow = mcuRow * component.v + row;
      var blockCol = mcuCol * component.h + col;
      var offset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, offset);
    }

    function decodeBlock(component, decode, mcu) {
      var blockRow = (mcu / component.blocksPerLine) | 0;
      var blockCol = mcu % component.blocksPerLine;
      var offset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, offset);
    }

    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;
    if (progressive) {
      if (spectralStart === 0)
        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
      else
        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
    } else {
      decodeFn = decodeBaseline;
    }

    var mcu = 0, marker;
    var mcuExpected;
    if (componentsLength == 1) {
      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    } else {
      mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }
    if (!resetInterval) {
      resetInterval = mcuExpected;
    }

    var h, v;
    while (mcu < mcuExpected) {
      // reset interval stuff
      for (i = 0; i < componentsLength; i++) {
        components[i].pred = 0;
      }
      eobrun = 0;

      if (componentsLength == 1) {
        component = components[0];
        for (n = 0; n < resetInterval; n++) {
          decodeBlock(component, decodeFn, mcu);
          mcu++;
        }
      } else {
        for (n = 0; n < resetInterval; n++) {
          for (i = 0; i < componentsLength; i++) {
            component = components[i];
            h = component.h;
            v = component.v;
            for (j = 0; j < v; j++) {
              for (k = 0; k < h; k++) {
                decodeMcu(component, decodeFn, mcu, j, k);
              }
            }
          }
          mcu++;
        }
      }

      // find marker
      bitsCount = 0;
      marker = (data[offset] << 8) | data[offset + 1];
      if (marker <= 0xFF00) {
        throw "marker was not found";
      }

      if (marker >= 0xFFD0 && marker <= 0xFFD7) { // RSTx
        offset += 2;
      } else {
        break;
      }
    }

    return offset - startOffset;
  }

  // A port of poppler's IDCT method which in turn is taken from:
  //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
  //   "Practical Fast 1-D DCT Algorithms with 11 Multiplications",
  //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
  //   988-991.
  function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable;
    var v0, v1, v2, v3, v4, v5, v6, v7, t;
    var i;

    // dequant
    for (i = 0; i < 64; i++) {
      p[i] = component.blockData[blockBufferOffset + i] * qt[i];
    }

    // inverse DCT on rows
    for (i = 0; i < 8; ++i) {
      var row = 8 * i;

      // check for all-zero AC coefficients
      if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 &&
        p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 &&
        p[7 + row] === 0) {
        t = (dctSqrt2 * p[0 + row] + 512) >> 10;
        p[0 + row] = t;
        p[1 + row] = t;
        p[2 + row] = t;
        p[3 + row] = t;
        p[4 + row] = t;
        p[5 + row] = t;
        p[6 + row] = t;
        p[7 + row] = t;
        continue;
      }

      // stage 4
      v0 = (dctSqrt2 * p[0 + row] + 128) >> 8;
      v1 = (dctSqrt2 * p[4 + row] + 128) >> 8;
      v2 = p[2 + row];
      v3 = p[6 + row];
      v4 = (dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128) >> 8;
      v7 = (dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128) >> 8;
      v5 = p[3 + row] << 4;
      v6 = p[5 + row] << 4;

      // stage 3
      t = (v0 - v1 + 1) >> 1;
      v0 = (v0 + v1 + 1) >> 1;
      v1 = t;
      t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
      v3 = t;
      t = (v4 - v6 + 1) >> 1;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = t;
      t = (v7 + v5 + 1) >> 1;
      v5 = (v7 - v5 + 1) >> 1;
      v7 = t;

      // stage 2
      t = (v0 - v3 + 1) >> 1;
      v0 = (v0 + v3 + 1) >> 1;
      v3 = t;
      t = (v1 - v2 + 1) >> 1;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = t;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p[0 + row] = v0 + v7;
      p[7 + row] = v0 - v7;
      p[1 + row] = v1 + v6;
      p[6 + row] = v1 - v6;
      p[2 + row] = v2 + v5;
      p[5 + row] = v2 - v5;
      p[3 + row] = v3 + v4;
      p[4 + row] = v3 - v4;
    }

    // inverse DCT on columns
    for (i = 0; i < 8; ++i) {
      var col = i;

      // check for all-zero AC coefficients
      if (p[1 * 8 + col] === 0 && p[2 * 8 + col] === 0 && p[3 * 8 + col] === 0 &&
        p[4 * 8 + col] === 0 && p[5 * 8 + col] === 0 && p[6 * 8 + col] === 0 &&
        p[7 * 8 + col] === 0) {
        t = (dctSqrt2 * p[i + 0] + 8192) >> 14;
        p[0 * 8 + col] = t;
        p[1 * 8 + col] = t;
        p[2 * 8 + col] = t;
        p[3 * 8 + col] = t;
        p[4 * 8 + col] = t;
        p[5 * 8 + col] = t;
        p[6 * 8 + col] = t;
        p[7 * 8 + col] = t;
        continue;
      }

      // stage 4
      v0 = (dctSqrt2 * p[0 * 8 + col] + 2048) >> 12;
      v1 = (dctSqrt2 * p[4 * 8 + col] + 2048) >> 12;
      v2 = p[2 * 8 + col];
      v3 = p[6 * 8 + col];
      v4 = (dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048) >> 12;
      v7 = (dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048) >> 12;
      v5 = p[3 * 8 + col];
      v6 = p[5 * 8 + col];

      // stage 3
      t = (v0 - v1 + 1) >> 1;
      v0 = (v0 + v1 + 1) >> 1;
      v1 = t;
      t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
      v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
      v3 = t;
      t = (v4 - v6 + 1) >> 1;
      v4 = (v4 + v6 + 1) >> 1;
      v6 = t;
      t = (v7 + v5 + 1) >> 1;
      v5 = (v7 - v5 + 1) >> 1;
      v7 = t;

      // stage 2
      t = (v0 - v3 + 1) >> 1;
      v0 = (v0 + v3 + 1) >> 1;
      v3 = t;
      t = (v1 - v2 + 1) >> 1;
      v1 = (v1 + v2 + 1) >> 1;
      v2 = t;
      t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
      v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
      v7 = t;
      t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
      v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
      v6 = t;

      // stage 1
      p[0 * 8 + col] = v0 + v7;
      p[7 * 8 + col] = v0 - v7;
      p[1 * 8 + col] = v1 + v6;
      p[6 * 8 + col] = v1 - v6;
      p[2 * 8 + col] = v2 + v5;
      p[5 * 8 + col] = v2 - v5;
      p[3 * 8 + col] = v3 + v4;
      p[4 * 8 + col] = v3 - v4;
    }

    // convert to 8-bit integers
    for (i = 0; i < 64; ++i) {
      var index = blockBufferOffset + i;
      var q = p[i];
      q = (q <= -2056 / component.bitConversion) ? 0 :
        (q >= 2024 / component.bitConversion) ? 255 / component.bitConversion :
        (q + 2056 / component.bitConversion) >> 4;
      component.blockData[index] = q;
    }
  }

  function buildComponentData(frame, component) {
    var lines = [];
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var samplesPerLine = blocksPerLine << 3;
    var computationBuffer = new Int32Array(64);

    var i, j, ll = 0;
    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        quantizeAndInverse(component, offset, computationBuffer);
      }
    }
    return component.blockData;
  }

  function clampToUint8(a) {
    return a <= 0 ? 0 : a >= 255 ? 255 : a | 0;
  }

  constructor.prototype = {
    load: function load(path) {
      var handleData = (function (data) {
        this.parse(data);
        if (this.onload)
          this.onload();
      }).bind(this);

      if (path.indexOf("data:") > -1) {
        var offset = path.indexOf("base64,") + 7;
        var data = atob(path.substring(offset));
        var arr = new Uint8Array(data.length);
        for (var i = data.length - 1; i >= 0; i--) {
          arr[i] = data.charCodeAt(i);
        }
        handleData(data);
      } else {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = (function () {
          // TODO catch parse error
          var data = new Uint8Array(xhr.response);
          handleData(data);
        }).bind(this);
        xhr.send(null);
      }
    },
    parse: function parse(data) {

      function readUint16() {
        var value = (data[offset] << 8) | data[offset + 1];
        offset += 2;
        return value;
      }

      function readDataBlock() {
        var length = readUint16();
        var array = data.subarray(offset, offset + length - 2);
        offset += array.length;
        return array;
      }

      function prepareComponents(frame) {
        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);
        for (var i = 0; i < frame.components.length; i++) {
          component = frame.components[i];
          var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / frame.maxH);
          var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / frame.maxV);
          var blocksPerLineForMcu = mcusPerLine * component.h;
          var blocksPerColumnForMcu = mcusPerColumn * component.v;

          var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
          component.blockData = new Int16Array(blocksBufferSize);
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
        }
        frame.mcusPerLine = mcusPerLine;
        frame.mcusPerColumn = mcusPerColumn;
      }

      var offset = 0, length = data.length;
      var jfif = null;
      var adobe = null;
      var pixels = null;
      var frame, resetInterval;
      var quantizationTables = [];
      var huffmanTablesAC = [], huffmanTablesDC = [];
      var fileMarker = readUint16();
      if (fileMarker != 0xFFD8) { // SOI (Start of Image)
        throw "SOI not found";
      }

      fileMarker = readUint16();
      while (fileMarker != 0xFFD9) { // EOI (End of image)
        var i, j, l;
        switch (fileMarker) {
          case 0xFFE0: // APP0 (Application Specific)
          case 0xFFE1: // APP1
          case 0xFFE2: // APP2
          case 0xFFE3: // APP3
          case 0xFFE4: // APP4
          case 0xFFE5: // APP5
          case 0xFFE6: // APP6
          case 0xFFE7: // APP7
          case 0xFFE8: // APP8
          case 0xFFE9: // APP9
          case 0xFFEA: // APP10
          case 0xFFEB: // APP11
          case 0xFFEC: // APP12
          case 0xFFED: // APP13
          case 0xFFEE: // APP14
          case 0xFFEF: // APP15
          case 0xFFFE: // COM (Comment)
            var appData = readDataBlock();

            if (fileMarker === 0xFFE0) {
              if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 &&
                appData[3] === 0x46 && appData[4] === 0) { // 'JFIF\x00'
                jfif = {
                  version: {major: appData[5], minor: appData[6]},
                  densityUnits: appData[7],
                  xDensity: (appData[8] << 8) | appData[9],
                  yDensity: (appData[10] << 8) | appData[11],
                  thumbWidth: appData[12],
                  thumbHeight: appData[13],
                  thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                };
              }
            }
            // TODO APP1 - Exif
            if (fileMarker === 0xFFEE) {
              if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F &&
                appData[3] === 0x62 && appData[4] === 0x65 && appData[5] === 0) { // 'Adobe\x00'
                adobe = {
                  version: appData[6],
                  flags0: (appData[7] << 8) | appData[8],
                  flags1: (appData[9] << 8) | appData[10],
                  transformCode: appData[11]
                };
              }
            }
            break;

          case 0xFFDB: // DQT (Define Quantization Tables)
            var quantizationTablesLength = readUint16();
            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
            while (offset < quantizationTablesEnd) {
              var quantizationTableSpec = data[offset++];
              var tableData = new Int32Array(64);
              if ((quantizationTableSpec >> 4) === 0) { // 8 bit values
                for (j = 0; j < 64; j++) {
                  var z = dctZigZag[j];
                  tableData[z] = data[offset++];
                }
              } else if ((quantizationTableSpec >> 4) === 1) { //16 bit
                for (j = 0; j < 64; j++) {
                  var zz = dctZigZag[j];
                  tableData[zz] = readUint16();
                }
              } else
                throw "DQT: invalid table spec";
              quantizationTables[quantizationTableSpec & 15] = tableData;
            }
            break;

          case 0xFFC0: // SOF0 (Start of Frame, Baseline DCT)
          case 0xFFC1: // SOF1 (Start of Frame, Extended DCT)
          case 0xFFC2: // SOF2 (Start of Frame, Progressive DCT)
            if (frame) {
              throw "Only single frame JPEGs supported";
            }
            readUint16(); // skip data length
            frame = {};
            frame.extended = (fileMarker === 0xFFC1);
            frame.progressive = (fileMarker === 0xFFC2);
            frame.precision = data[offset++];
            frame.scanLines = readUint16();
            frame.samplesPerLine = readUint16();
            frame.components = [];
            frame.componentIds = {};
            var componentsCount = data[offset++], componentId;
            var maxH = 0, maxV = 0;
            for (i = 0; i < componentsCount; i++) {
              componentId = data[offset];
              var h = data[offset + 1] >> 4;
              var v = data[offset + 1] & 15;
              if (maxH < h)
                maxH = h;
              if (maxV < v)
                maxV = v;
              var qId = data[offset + 2];
              l = frame.components.push({
                h: h,
                v: v,
                quantizationTable: quantizationTables[qId],
                quantizationTableId: qId,
                bitConversion: 255 / ((1 << frame.precision) - 1)
              });
              frame.componentIds[componentId] = l - 1;
              offset += 3;
            }
            frame.maxH = maxH;
            frame.maxV = maxV;
            prepareComponents(frame);
            break;

          case 0xFFC4: // DHT (Define Huffman Tables)
            var huffmanLength = readUint16();
            for (i = 2; i < huffmanLength; ) {
              var huffmanTableSpec = data[offset++];
              var codeLengths = new Uint8Array(16);
              var codeLengthSum = 0;
              for (j = 0; j < 16; j++, offset++)
                codeLengthSum += (codeLengths[j] = data[offset]);
              var huffmanValues = new Uint8Array(codeLengthSum);
              for (j = 0; j < codeLengthSum; j++, offset++)
                huffmanValues[j] = data[offset];
              i += 17 + codeLengthSum;

              ((huffmanTableSpec >> 4) === 0 ?
                huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] =
                buildHuffmanTable(codeLengths, huffmanValues);
            }
            break;

          case 0xFFDD: // DRI (Define Restart Interval)
            readUint16(); // skip data length
            resetInterval = readUint16();
            break;

          case 0xFFDA: // SOS (Start of Scan)
            var scanLength = readUint16();
            var selectorsCount = data[offset++];
            var components = [], component;
            for (i = 0; i < selectorsCount; i++) {
              var componentIndex = frame.componentIds[data[offset++]];
              component = frame.components[componentIndex];
              var tableSpec = data[offset++];
              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
              components.push(component);
            }
            var spectralStart = data[offset++];
            var spectralEnd = data[offset++];
            var successiveApproximation = data[offset++];
            var processed = decodeScan(data, offset,
              frame, components, resetInterval,
              spectralStart, spectralEnd,
              successiveApproximation >> 4, successiveApproximation & 15);
            offset += processed;
            break;
          case 0xFFFF: // Fill bytes
            if (data[offset] !== 0xFF) { // Avoid skipping a valid marker.
              offset--;
            }
            break;
          default:
            if (data[offset - 3] == 0xFF &&
              data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
              // could be incorrect encoding -- last 0xFF byte of the previous
              // block was eaten by the encoder
              offset -= 3;
              break;
            }
            throw "unknown JPEG marker " + fileMarker.toString(16);
        }
        fileMarker = readUint16();
      }

      this.width = frame.samplesPerLine;
      this.height = frame.scanLines;
      this.jfif = jfif;
      this.adobe = adobe;
      this.components = [];
      switch (frame.components.length)
      {
        case 1:
          this.colorspace = ColorSpace.Grayscale;
          break;
        case 3:
          if (this.adobe)
            this.colorspace = ColorSpace.AdobeRGB;
          else
            this.colorspace = ColorSpace.RGB;
          break;
        case 4:
          this.colorspace = ColorSpace.CYMK;
          break;
        default:
          this.colorspace = ColorSpace.Unknown;
      }
      for (var i = 0; i < frame.components.length; i++) {
        var component = frame.components[i];
        if (!component.quantizationTable && component.quantizationTableId !== null)
          component.quantizationTable = quantizationTables[component.quantizationTableId];
        this.components.push({
          output: buildComponentData(frame, component),
          scaleX: component.h / frame.maxH,
          scaleY: component.v / frame.maxV,
          blocksPerLine: component.blocksPerLine,
          blocksPerColumn: component.blocksPerColumn,
          bitConversion: component.bitConversion
        });
      }
    },
    getData16: function getData16(width, height) {
      if (this.components.length !== 1)
        throw 'Unsupported color mode';
      var scaleX = this.width / width, scaleY = this.height / height;

      var component, componentScaleX, componentScaleY;
      var x, y, i;
      var offset = 0;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint16Array(dataLength);
      var componentLine;

      // lineData is reused for all components. Assume first component is
      // the biggest
      var lineData = new Uint16Array((this.components[0].blocksPerLine << 3) *
      this.components[0].blocksPerColumn * 8);

      // First construct image data ...
      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        var blocksPerLine = component.blocksPerLine;
        var blocksPerColumn = component.blocksPerColumn;
        var samplesPerLine = blocksPerLine << 3;

        var j, k, ll = 0;
        var lineOffset = 0;
        for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
          var scanLine = blockRow << 3;
          for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
            var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
            var offset = 0, sample = blockCol << 3;
            for (j = 0; j < 8; j++) {
              var lineOffset = (scanLine + j) * samplesPerLine;
              for (k = 0; k < 8; k++) {
                lineData[lineOffset + sample + k] =
                  component.output[bufferOffset + offset++];
              }
            }
          }
        }

        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;

        var cx, cy;
        var index;
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            cy = 0 | (y * componentScaleY);
            cx = 0 | (x * componentScaleX);
            index = cy * samplesPerLine + cx;
            data[offset] = lineData[index];
            offset += numComponents;
          }
        }
      }
      return data;
    },
    getData: function getData(width, height) {
      var scaleX = this.width / width, scaleY = this.height / height;

      var component, componentScaleX, componentScaleY;
      var x, y, i;
      var offset = 0;
      var Y, Cb, Cr, K, C, M, Ye, R, G, B;
      var colorTransform;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint8Array(dataLength);
      var componentLine;

      // lineData is reused for all components. Assume first component is
      // the biggest
      var lineData = new Uint8Array((this.components[0].blocksPerLine << 3) *
      this.components[0].blocksPerColumn * 8);

      // First construct image data ...
      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        var blocksPerLine = component.blocksPerLine;
        var blocksPerColumn = component.blocksPerColumn;
        var samplesPerLine = blocksPerLine << 3;

        var j, k, ll = 0;
        var lineOffset = 0;
        for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
          var scanLine = blockRow << 3;
          for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
            var bufferOffset = getBlockBufferOffset(component, blockRow, blockCol);
            var offset = 0, sample = blockCol << 3;
            for (j = 0; j < 8; j++) {
              var lineOffset = (scanLine + j) * samplesPerLine;
              for (k = 0; k < 8; k++) {
                lineData[lineOffset + sample + k] =
                  component.output[bufferOffset + offset++] * component.bitConversion;
              }
            }
          }
        }

        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;

        var cx, cy;
        var index;
        for (y = 0; y < height; y++) {
          for (x = 0; x < width; x++) {
            cy = 0 | (y * componentScaleY);
            cx = 0 | (x * componentScaleX);
            index = cy * samplesPerLine + cx;
            data[offset] = lineData[index];
            offset += numComponents;
          }
        }
      }

      // ... then transform colors, if necessary
      switch (numComponents) {
        case 1:
        case 2:
          break;
        // no color conversion for one or two compoenents

        case 3:
          // The default transform for three components is true
          colorTransform = true;
          // The adobe transform marker overrides any previous setting
          if (this.adobe && this.adobe.transformCode)
            colorTransform = true;
          else if (typeof this.colorTransform !== 'undefined')
            colorTransform = !!this.colorTransform;

          if (colorTransform) {
            for (i = 0; i < dataLength; i += numComponents) {
              Y = data[i    ];
              Cb = data[i + 1];
              Cr = data[i + 2];

              R = clampToUint8(Y - 179.456 + 1.402 * Cr);
              G = clampToUint8(Y + 135.459 - 0.344 * Cb - 0.714 * Cr);
              B = clampToUint8(Y - 226.816 + 1.772 * Cb);

              data[i    ] = R;
              data[i + 1] = G;
              data[i + 2] = B;
            }
          }
          break;
        case 4:
          if (!this.adobe)
            throw 'Unsupported color mode (4 components)';
          // The default transform for four components is false
          colorTransform = false;
          // The adobe transform marker overrides any previous setting
          if (this.adobe && this.adobe.transformCode)
            colorTransform = true;
          else if (typeof this.colorTransform !== 'undefined')
            colorTransform = !!this.colorTransform;

          if (colorTransform) {
            for (i = 0; i < dataLength; i += numComponents) {
              Y = data[i];
              Cb = data[i + 1];
              Cr = data[i + 2];

              C = clampToUint8(434.456 - Y - 1.402 * Cr);
              M = clampToUint8(119.541 - Y + 0.344 * Cb + 0.714 * Cr);
              Y = clampToUint8(481.816 - Y - 1.772 * Cb);

              data[i    ] = C;
              data[i + 1] = M;
              data[i + 2] = Y;
              // K is unchanged
            }
          }
          break;
        default:
          throw 'Unsupported color mode';
      }
      return data;
    }
  };

  return constructor;
})();

/* harmony default export */ const jpeg_jpeg = (JpegImage);

;// CONCATENATED MODULE: ./src/x_ite/Browser/Texturing3D/DICOMParser.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/



// Global instances of JPEG libraries.

var
   charLS   = undefined,
   openJPEG = undefined;

// DicomParser

function DicomParser ()
{
   this .dicom = { dicom: false };
}

DicomParser .prototype =
{
   parse: function (input)
   {
      try
      {
         var inputArray = new Uint8Array (input .length);

         for (var i = 0, length = input .length; i < length; ++ i)
            inputArray [i] = input .charCodeAt (i);

         this .dataSet      = dicomParser .parseDicom (inputArray);
         this .dicom .dicom = true;
      }
      catch (error)
      {
         console .error (error);
         this .dicom .dicom = false;
         return this .dicom;
      }

      this .getPhotometricInterpretation ();
      this .getComponents ();
      this .getWidth ();
      this .getHeight ();
      this .getDepth ();
      this .getBitsAllocated ();
      this .getBitsStored ();
      this .getPixelRepresentation ();
      this .getPlanarConfiguration ();
      this .getTansferSyntax ();
      this .getPixelData ();

      // if (DEBUG)
      //    console .log (this);

      return this .dicom;
   },
   getPhotometricInterpretation: function ()
   {
      // https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280004
      this .photometricInterpretation = this .dataSet .string ("x00280004");
   },
   getComponents: function ()
   {
      // https://dicom.innolitics.com/ciods/ct-image/image-pixel/00280002
      this .dicom .components = this .dataSet .uint16 ("x00280002");
   },
   getWidth: function ()
   {
      this .dicom .width = this .dataSet .uint16 ("x00280011");
   },
   getHeight: function ()
   {
      this .dicom .height = this .dataSet .uint16 ("x00280010");
   },
   getDepth: function ()
   {
      if (this .dataSet .elements .x00280008)
      {
         this .dicom .depth = this .dataSet .intString ("x00280008");
      }
      else
         this .dicom .depth = 1;
   },
   getBitsAllocated: function ()
   {
      this .bitsAllocated  = this .dataSet .uint16 ("x00280100");
   },
   getBitsStored: function ()
   {
      this .bitsStored  = this .dataSet .uint16 ("x00280101");
   },
   getPixelRepresentation: function ()
   {
      this .pixelRepresentation = this .dataSet .uint16 ("x00280103") || 0;
   },
   getPlanarConfiguration: function ()
   {
      this .planarConfiguration = this .dataSet .uint16 ("x00280006") || 0;
   },
   getTansferSyntax: function ()
   {
      this .transferSyntax = this .dataSet .string ("x00020010");
   },
   getPixelData: function ()
   {
      var
         dicom        = this .dicom,
         pixelElement = this .dataSet .elements .x7fe00010 || this .dataSet .elements .x7fe00008, // pixel or float pixel
         components   = this .photometricInterpretation === "PALETTE COLOR" ? 3 : this .dicom .components,
         imageLength  = dicom .width * dicom .height * components,
         byteLength   = imageLength * dicom .depth,
         bytes        = new Uint8Array (byteLength),
         frames       = this .getFrames (pixelElement);

      frames .forEach (function (frame, f)
      {
         // Handle transfer syntax.

         // https://www.dicomlibrary.com/dicom/transfer-syntax/

         switch (this .transferSyntax)
         {
            case "1.2.840.10008.1.2":      // Implicit VR Little Endian
            case "1.2.840.10008.1.2.1":    // Explicit VR Little Endian
            case "1.2.840.10008.1.2.1.99": // Deflated Explicit VR Little Endian
            {
               frame = this .decodeLittleEndian (frame);
               break;
            }
            case "1.2.840.10008.1.2.2": // Explicit VR Big Endian (retired)
            {
               frame = this .decodeBigEndian (frame);
               break;
            }
            case "1.2.840.10008.1.2.5": // RLE Lossless
            {
               frame = this .decodeRLE (frame);
               break;
            }
            case "1.2.840.10008.1.2.4.50": // JPEG Baseline lossy process 1 (8 bit)
            case "1.2.840.10008.1.2.4.51": // JPEG Baseline lossy process 2 & 4 (12 bit)
            {
               frame = this .decodeJPEGBaseline (frame);
               break;
            }
            case "1.2.840.10008.1.2.4.57": // JPEG Lossless, Nonhierarchical (Processes 14)
            case "1.2.840.10008.1.2.4.70": // JPEG Lossless, Nonhierarchical (Processes 14 [Selection 1])
            {
               frame = this .decodeJPEGLossless (frame);
               break;
            }
            case "1.2.840.10008.1.2.4.80": // JPEG-LS Lossless Image Compression
            case "1.2.840.10008.1.2.4.81": // JPEG-LS Lossy (Near-Lossless) Image Compression
            {
               frame = this .decodeJPEGLS (frame);
               break;
            }
            case "1.2.840.10008.1.2.4.90": // JPEG 2000 Lossless
            case "1.2.840.10008.1.2.4.91": // JPEG 2000 Lossy
            {
               frame = this .decodeJPEG2000 (frame);
               break;
            }
            case "1.2.840.10008.1.2.4.52":
            case "1.2.840.10008.1.2.4.53":
            case "1.2.840.10008.1.2.4.54":
            case "1.2.840.10008.1.2.4.55":
            case "1.2.840.10008.1.2.4.56":
            case "1.2.840.10008.1.2.4.58":
            case "1.2.840.10008.1.2.4.59":
            case "1.2.840.10008.1.2.4.60":
            case "1.2.840.10008.1.2.4.61":
            case "1.2.840.10008.1.2.4.62":
            case "1.2.840.10008.1.2.4.63":
            case "1.2.840.10008.1.2.4.64":
            case "1.2.840.10008.1.2.4.65":
            case "1.2.840.10008.1.2.4.66":
            case "1.2.840.10008.1.2.4.92":
            case "1.2.840.10008.1.2.4.93":
            {
               // JPEG
               throw new Error ("DICOM: this JPEG encoding (" + this .transferSyntax + ") is not supported.");
            }
            default:
            {
               throw new Error ("DICOM: unsupported transfer syntax '" + this .transferSyntax + "'.");
            }
         }

         // Convert to stored type array (int, uint, float, 8/16 bit).

         frame = this .getTypedArray (frame);

         // Handle bits stored.

         if (this .pixelRepresentation === 1 && this .bitsStored !== undefined)
         {
            var shift = 32 - this .bitsStored;

            for (var i = 0, length = frame .length; i < length; ++ i)
               frame [i] = frame [i] << shift >> shift;
         }

         // Handle photometric interpretation.

         switch (this .photometricInterpretation)
         {
            case "MONOCHROME1":
            case "MONOCHROME2":
            {
               break;
            }
            case "RGB":
            case "YBR_RCT":
            case "YBR_ICT":
            case "YBR_FULL_422":
            {
               if (this .planarConfiguration === 1)
                  frame = this .convertRGBColorByPlane (frame);

               break;
            }
            case "YBR_FULL":
            {
               if (this .planarConfiguration === 0)
                  frame = this .convertYBRFullByPixel (frame);
               else
                  frame = this .convertYBRFullByPlane (frame);

               break;
            }
            case "PALETTE COLOR":
            {
               frame = this .convertPaletteColor (frame);
               break;
            }
            default:
            {
               throw new Error ("DICOM: unsupported image type '" + this .photometricInterpretation + "'.");
            }
         }

         // Normalize frame pixel data in the range [0, 255], and assign to image block;

         frame = this .flipImage (frame, components);

         var
            normalize = this .getNormalizeOffsetAndFactor (frame),
            b         = f * imageLength;

         for (var i = 0, length = frame .length; i < length; ++ i, ++ b)
            bytes [b] = (frame [i] - normalize .offset) * normalize .factor;
      },
      this);

      // Invert MONOCHROME1 pixels.

      if (this .photometricInterpretation === "MONOCHROME1")
      {
         for (var i = 0, length = bytes .length; i < length; ++ i)
            bytes [i] = 255 - bytes [i];
      }

      // Set Uint8Array.

      dicom .components = components;
      dicom .data       = bytes;
   },
   getFrames: function (pixelElement)
   {
      var frames = [ ];

      if (pixelElement .encapsulatedPixelData)
      {
         if (pixelElement .basicOffsetTable .length)
         {
            for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               frames .push (dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i));
         }
         else if (this .dicom .depth !== pixelElement .fragments .length)
         {
            var basicOffsetTable = dicomParser .createJPEGBasicOffsetTable (this .dataSet, pixelElement);

            for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               frames .push (dicomParser .readEncapsulatedImageFrame (this .dataSet, pixelElement, i, basicOffsetTable));
         }
         else
         {
            for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               frames .push (dicomParser .readEncapsulatedPixelDataFromFragments (this .dataSet, pixelElement, i));
         }
      }
      else
      {
         var pixelsPerFrame = this .dicom .width * this .dicom .height * this .dicom .components;

         switch (this .bitsAllocated)
         {
            case 1:
            {
               for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               {
                  var frameOffset = pixelElement .dataOffset + i * pixelsPerFrame / 8;

                  frames .push (this .unpackBinaryFrame (this .dataSet .byteArray, frameOffset, pixelsPerFrame));
               }

               this .bitsAllocated = 8;
               break;
            }
            case 8:
            case 16:
            case 32:
            {
               var bytesAllocated = this .bitsAllocated / 8;

               for (var i = 0, length = this .dicom .depth; i < length; ++ i)
               {
                  var frameOffset = pixelElement .dataOffset + i * pixelsPerFrame * bytesAllocated;

                  frames .push (new Uint8Array (this .dataSet .byteArray .buffer, frameOffset, pixelsPerFrame * bytesAllocated));
               }

               break;
            }
            default:
               throw new Error ("DICOM: unsupported pixel format.");
         }
      }

      return frames;
   },
   getTypedArray: function (frame)
   {
      switch (this .bitsAllocated)
      {
         case 8:
            return new (this .pixelRepresentation ? Int8Array : Uint8Array) (frame .buffer, frame .byteOffset, frame .length);
         case 16:
            return new (this .pixelRepresentation ? Int16Array : Uint16Array) (frame .buffer, frame .byteOffset, frame .length / 2);
         case 32:
            return new Float32Array (frame .buffer, frame .byteOffset, frame .length / 4);
         default:
            throw new Error ("DICOM: unsupported pixel format.");
      }
   },
   flipImage: function (frame, components)
   {
      var
         width  = this .dicom .width,
         height = this .dicom .height,
         out    = new (frame .constructor) (frame .length);

      for (var y = 0; y < height; ++ y)
      {
         var
            inputRow  = components * width * (height - 1 - y),
            outputRow = components * width * y;

         for (var x = 0, w = components * width; x < w; ++ x)
         {
            out [outputRow + x] = frame [inputRow + x];
         }
      }

      return out;
   },
   getNormalizeOffsetAndFactor: function (data)
   {
      var
         min = Number .POSITIVE_INFINITY,
         max = Number .NEGATIVE_INFINITY;

      for (var i = 0, length = data .length; i < length; ++ i)
      {
         min = Math .min (min, data [i]);
         max = Math .max (max, data [i]);
      }

      var diverence = max - min;

      return { offset: min, factor: diverence ? 1 / diverence * 255 : 0 };
   },
   unpackBinaryFrame: function (byteArray, frameOffset, pixelsPerFrame)
   {
      function isBitSet (byte, bitPos)
      {
         return byte & (1 << bitPos);
      }

      // Create a new pixel array given the image size
      var pixelData = new Uint8Array (pixelsPerFrame);

      for (var i = 0; i < pixelsPerFrame; ++ i)
      {
         // Compute byte position
         var bytePos = Math .floor (i / 8);

         // Get the current byte
         var byte = byteArray [bytePos + frameOffset];

         // Bit position (0-7) within byte
         var bitPos = (i % 8);

         // Check whether bit at bitpos is set
         pixelData [i] = isBitSet (byte, bitPos) ? 1 : 0;
      }

      return pixelData;
   },
   decodeLittleEndian: function (pixelData)
   {
      var
         buffer = pixelData .buffer,
         offset = pixelData .byteOffset,
         length = pixelData .length;

      if (this .bitsAllocated === 16)
      {
        // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
        // buffers on it

        if (offset % 2)
        {
            buffer = buffer .slice (offset);
            offset = 0;
         }

         return new Uint8Array (buffer, offset, length);

      }
      else if (this .bitsAllocated === 32)
      {
         // if pixel data is not aligned on even boundary, shift it
         if (offset % 4)
         {
            buffer = buffer .slice (offset);
            offset = 0;
         }

         return new Uint8Array (buffer, offset, length);
      }

      return pixelData;
   },
   decodeBigEndian: function (pixelData)
   {
      function swap16 (value)
      {
         return ((value & 0xFF) << 8) | ((value >> 8) & 0xFF);
      }

      if (this .bitsAllocated === 16)
      {
         var
            buffer = pixelData .buffer,
            offset = pixelData .byteOffset,
            length = pixelData .length;

         // if pixel data is not aligned on even boundary, shift it so we can create the 16 bit array
         // buffers on it

         if (offset % 2)
         {
            buffer = buffer .slice (offset);
            offset = 0;
         }

         pixelData = new Uint16Array (buffer, offset, length / 2);

         // Do the byte swap
         for (var i = 0, l = pixelData .length; i < l; ++ i)
            pixelData [i] = swap16 (pixelData [i]);

         return new Uint8Array (buffer, offset, length);
      }

      return pixelData;
   },
   decodeRLE: function  (pixelData)
   {
      if (this .bitsAllocated === 8)
      {
         if (this .planarConfiguration)
             return this .decodeRLE8Planar (pixelData);

         return this .decodeRLE8 (pixelData);
      }

      if (this .bitsAllocated === 16)
         return this .decodeRLE16 (pixelData);

      throw new Error ("DICOM: unsupported pixel format for RLE.");
   },
   decodeRLE8: function  (pixelData)
   {
      const frameData  = pixelData;
      const frameSize  = this .dicom .width * this .dicom .height;
      const components = this .dicom .components;
      const outFrame   = new ArrayBuffer (frameSize * this .dicom .components);
      const header     = new DataView (frameData .buffer, frameData .byteOffset);
      const data       = new Int8Array(frameData .buffer, frameData .byteOffset);
      const out        = new Int8Array (outFrame);

      let   outIndex    = 0;
      const numSegments = header .getInt32 (0, true);

      for (let s = 0; s < numSegments; ++ s)
      {
         outIndex = s;

         let inIndex  = header .getInt32 ((s + 1) * 4, true);
         let maxIndex = header .getInt32 ((s + 2) * 4, true);

         if (maxIndex === 0)
            maxIndex = frameData.length;

         const endOfSegment = frameSize * numSegments;

         while (inIndex < maxIndex)
         {
            const n = data [inIndex ++];

            if (n >= 0 && n <= 127)
            {
               // copy n bytes
               for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++ i)
               {
                  out [outIndex] = data [inIndex ++];
                  outIndex += components;
               }
            }
            else if (n <= -1 && n >= -127)
            {
               const value = data [inIndex ++];

               // run of n bytes
               for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++ j)
               {
                  out [outIndex] = value;
                  outIndex += components;
               }
             }
         }
      }

      return out;
   },
   decodeRLE8Planar: function  (pixelData)
   {
      const frameData = pixelData;
      const frameSize = this .dicom .width * this .dicom .height;
      const outFrame  = new ArrayBuffer (frameSize * this .dicom .components);
      const header    = new DataView (frameData .buffer, frameData .byteOffset);
      const data      = new Int8Array (frameData .buffer, frameData .byteOffset);
      const out       = new Int8Array (outFrame);

      let   outIndex    = 0;
      const numSegments = header .getInt32 (0, true);

      for (let s = 0; s < numSegments; ++ s)
      {
         outIndex = s * frameSize;

         let inIndex  = header .getInt32 ((s + 1) * 4, true);
         let maxIndex = header .getInt32 ((s + 2) * 4, true);

         if (maxIndex === 0)
            maxIndex = frameData .length;

         const endOfSegment = frameSize * numSegments;

         while (inIndex < maxIndex)
         {
            const n = data [inIndex ++];

            if (n >= 0 && n <= 127)
            {
               // copy n bytes
               for (let i = 0; i < n + 1 && outIndex < endOfSegment; ++ i)
               {
                  out [outIndex] = data [inIndex ++];
                  ++ outIndex;
               }
            }
            else if (n <= -1 && n >= -127)
            {
               const value = data[inIndex++];

               // run of n bytes
               for (let j = 0; j < -n + 1 && outIndex < endOfSegment; ++ j)
               {
                  out [outIndex] = value;
                  ++ outIndex;
               }
             }
         }
      }

      return out;
   },
   decodeRLE16: function  (pixelData)
   {
      const frameData = pixelData;
      const frameSize = this .dicom .width * this .dicom .height;
      const outFrame  = new ArrayBuffer (frameSize * this .dicom .components * 2);
      const header    = new DataView (frameData.buffer, frameData.byteOffset);
      const data      = new Int8Array (frameData.buffer, frameData.byteOffset);
      const out       = new Int8Array (outFrame);

      const numSegments = header .getInt32 (0, true);

      for (let s = 0; s < numSegments; ++ s)
      {
         let   outIndex = 0;
         const highByte = (s === 0 ? 1 : 0);

           let inIndex  = header .getInt32 ((s + 1) * 4, true);
           let maxIndex = header .getInt32 ((s + 2) * 4, true);

         if (maxIndex === 0)
            maxIndex = frameData.length;

         while (inIndex < maxIndex)
         {
            const n = data [inIndex ++];

            if (n >= 0 && n <= 127)
            {
               for (let i = 0; i < n + 1 && outIndex < frameSize; ++ i)
               {
                  out[(outIndex * 2) + highByte] = data[inIndex++];
                  ++ outIndex;
               }
            }
            else if (n <= -1 && n >= -127)
            {
               const value = data [inIndex ++];

               for (let j = 0; j < -n + 1 && outIndex < frameSize; ++ j)
               {
                  out [(outIndex * 2) + highByte] = value;
                  ++ outIndex;
               }
            }
         }
      }

      return out;
   },
   decodeJPEGBaseline: function (pixelData)
   {
      var jpeg = new jpeg_jpeg ();

      jpeg .parse (pixelData);

      jpeg .colorTransform = true; // default is true

      var data = jpeg .getData (this .dicom .width, this .dicom .height);

      this .bitsAllocated = 8;

      return data;
    },
    decodeJPEGLossless: function (pixelData)
    {
      var
         decoder = new jpegLossless .lossless .Decoder (),
         buffer  = decoder .decompress (pixelData);

      return new Uint8Array (buffer);
   },
   decodeJPEGLS: function (pixelData)
   {
      var image = this .jpegLSDecode (pixelData, this .pixelRepresentation === 1);

      // throw error if not success or too much data
      if (image .result !== 0 && image .result !== 6)
         throw new Error (`DICOM: JPEG-LS decoder failed to decode frame (error code ${image.result}).`);

      return new Uint8Array (image .pixelData .buffer);
   },
   jpegLSDecode: function (data, isSigned)
   {
      // Init global instance.
      charLS = charLS || CharLS ();

      // prepare input parameters
      const dataPtr = charLS._malloc(data.length);

      charLS.writeArrayToMemory(data, dataPtr);

      // prepare output parameters
      const imagePtrPtr = charLS._malloc(4);
      const imageSizePtr = charLS._malloc(4);
      const widthPtr = charLS._malloc(4);
      const heightPtr = charLS._malloc(4);
      const bitsPerSamplePtr = charLS._malloc(4);
      const stridePtr = charLS._malloc(4);
      const allowedLossyErrorPtr = charLS._malloc(4);
      const componentsPtr = charLS._malloc(4);
      const interleaveModePtr = charLS._malloc(4);

      // Decode the image
      const result = charLS.ccall(
         'jpegls_decode',
         'number',
         ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'number'],
         [dataPtr, data.length, imagePtrPtr, imageSizePtr, widthPtr, heightPtr, bitsPerSamplePtr, stridePtr, componentsPtr, allowedLossyErrorPtr, interleaveModePtr]
      );

      // Extract result values into object
      const image = {
         result,
         width: charLS.getValue(widthPtr, 'i32'),
         height: charLS.getValue(heightPtr, 'i32'),
         bitsPerSample: charLS.getValue(bitsPerSamplePtr, 'i32'),
         stride: charLS.getValue(stridePtr, 'i32'),
         components: charLS.getValue(componentsPtr, 'i32'),
         allowedLossyError: charLS.getValue(allowedLossyErrorPtr, 'i32'),
         interleaveMode: charLS.getValue(interleaveModePtr, 'i32'),
         pixelData: undefined
      };

      // Copy image from emscripten heap into appropriate array buffer type
      const imagePtr = charLS.getValue(imagePtrPtr, '*');

      if (image.bitsPerSample <= 8) {
         image.pixelData = new Uint8Array(image.width * image.height * image.components);
         image.pixelData.set(new Uint8Array(charLS.HEAP8.buffer, imagePtr, image.pixelData.length));
      } else if (isSigned) {
         image.pixelData = new Int16Array(image.width * image.height * image.components);
         image.pixelData.set(new Int16Array(charLS.HEAP16.buffer, imagePtr, image.pixelData.length));
      } else {
         image.pixelData = new Uint16Array(image.width * image.height * image.components);
         image.pixelData.set(new Uint16Array(charLS.HEAP16.buffer, imagePtr, image.pixelData.length));
      }

      // free memory and return image object
      charLS._free(dataPtr);
      charLS._free(imagePtr);
      charLS._free(imagePtrPtr);
      charLS._free(imageSizePtr);
      charLS._free(widthPtr);
      charLS._free(heightPtr);
      charLS._free(bitsPerSamplePtr);
      charLS._free(stridePtr);
      charLS._free(componentsPtr);
      charLS._free(interleaveModePtr);

      return image;
   },
   decodeJPEG2000: function (pixelData)
   {
      var
         bytesPerPixel = this .bitsAllocated <= 8 ? 1 : 2,
         signed        = this .pixelRepresentation === 1,
         image         = this .decodeOpenJPEG (pixelData, bytesPerPixel, signed);

      if (image .nbChannels > 1)
         this .photometricInterpretation = "RGB";

      return new Uint8Array (image .pixelData .buffer);
   },
   decodeOpenJPEG: function  (data, bytesPerPixel, signed)
   {
      // Init global instance.
      openJPEG = openJPEG || OpenJPEG ();

      const dataPtr = openJPEG._malloc(data.length);

      openJPEG.writeArrayToMemory(data, dataPtr);

      // create param outpout
      const imagePtrPtr = openJPEG._malloc(4);
      const imageSizePtr = openJPEG._malloc(4);
      const imageSizeXPtr = openJPEG._malloc(4);
      const imageSizeYPtr = openJPEG._malloc(4);
      const imageSizeCompPtr = openJPEG._malloc(4);

      const t0 = new Date().getTime();
      const ret = openJPEG.ccall('jp2_decode', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'],
        [dataPtr, data.length, imagePtrPtr, imageSizePtr, imageSizeXPtr, imageSizeYPtr, imageSizeCompPtr]);
      // add num vomp..etc

      if (ret !== 0) {
         console.log('[opj_decode] decoding failed!');
         openJPEG._free(dataPtr);
         openJPEG._free(openJPEG.getValue(imagePtrPtr, '*'));
         openJPEG._free(imageSizeXPtr);
         openJPEG._free(imageSizeYPtr);
         openJPEG._free(imageSizePtr);
         openJPEG._free(imageSizeCompPtr);

         return;
      }

      const imagePtr = openJPEG.getValue(imagePtrPtr, '*');

      const image = {
         length: openJPEG.getValue(imageSizePtr, 'i32'),
         sx: openJPEG.getValue(imageSizeXPtr, 'i32'),
         sy: openJPEG.getValue(imageSizeYPtr, 'i32'),
         nbChannels: openJPEG.getValue(imageSizeCompPtr, 'i32'), // hard coded for now
         perf_timetodecode: undefined,
         pixelData: undefined
      };

      // Copy the data from the EMSCRIPTEN heap into the correct type array
      const length = image.sx * image.sy * image.nbChannels;
      const src32 = new Int32Array(openJPEG.HEAP32.buffer, imagePtr, length);

      if (bytesPerPixel === 1) {
         if (Uint8Array.from) {
            image.pixelData = Uint8Array.from(src32);
         } else {
            image.pixelData = new Uint8Array(length);
            for (let i = 0; i < length; i++) {
               image.pixelData[i] = src32[i];
            }
         }
      } else if (signed) {
         if (Int16Array.from) {
            image.pixelData = Int16Array.from(src32);
         } else {
            image.pixelData = new Int16Array(length);
            for (let i = 0; i < length; i++) {
               image.pixelData[i] = src32[i];
            }
         }
      } else if (Uint16Array.from) {
         image.pixelData = Uint16Array.from(src32);
      } else {
         image.pixelData = new Uint16Array(length);
         for (let i = 0; i < length; i++) {
            image.pixelData[i] = src32[i];
         }
      }

      const t1 = new Date().getTime();

      image.perf_timetodecode = t1 - t0;

      // free
      openJPEG._free(dataPtr);
      openJPEG._free(imagePtrPtr);
      openJPEG._free(imagePtr);
      openJPEG._free(imageSizePtr);
      openJPEG._free(imageSizeXPtr);
      openJPEG._free(imageSizeYPtr);
      openJPEG._free(imageSizeCompPtr);

      return image;
    },
   convertRGBColorByPlane: function (pixelData)
   {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertRGBColorByPlane: RGB buffer length must be divisble by 3.");

      var
         numPixels = pixelData .length / 3,
         rgbIndex  = 0,
         rIndex    = 0,
         gIndex    = numPixels,
         bIndex    = numPixels * 2,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
        out [rgbIndex ++] = pixelData [rIndex ++]; // red
        out [rgbIndex ++] = pixelData [gIndex ++]; // green
        out [rgbIndex ++] = pixelData [bIndex ++]; // blue
      }

      return out;
    },
    convertYBRFullByPixel: function (pixelData)
    {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertYBRFullByPixel: YBR buffer length must be divisble by 3.");

      console .log (pixelData);

      var
         numPixels = pixelData .length / 3,
         ybrIndex  = 0,
         rgbIndex  = 0,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
         var
            y  = pixelData [ybrIndex ++],
            cb = pixelData [ybrIndex ++],
            cr = pixelData [ybrIndex ++];

         out [rgbIndex ++] = y + 1.40200 * (cr - 128);                        // red
         out [rgbIndex ++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green
         out [rgbIndex ++] = y + 1.77200 * (cb - 128);                        // blue
      }

      return out;
    },
    convertYBRFullByPlane: function (pixelData)
    {
      if (pixelData .length % 3 !== 0)
         throw new Error ("DICOM: convertYBRFullByPlane: YBR buffer length must be divisble by 3.");

      var
         numPixels = pixelData .length / 3,
         rgbIndex  = 0,
         yIndex    = 0,
         cbIndex   = numPixels,
         crIndex   = numPixels * 2,
         out       = new (pixelData .constructor) (pixelData .length);

      for (var i = 0; i < numPixels; ++ i)
      {
         var
            y  = pixelData [yIndex ++],
            cb = pixelData [cbIndex ++],
            cr = pixelData [crIndex ++];

        out [rgbIndex++] = y + 1.40200 * (cr - 128);                        // red
        out [rgbIndex++] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128); // green
        out [rgbIndex++] = y + 1.77200 * (cb - 128);                        // blue
      }

      return out;
   },
   convertPaletteColor: function (pixelData)
   {
      function convertLUTto8Bit (lut, shift)
      {
         if (lut .cleaned)
            return lut .cleaned;

         const numEntries = lut .length;
         const cleanedLUT = new Uint8ClampedArray (numEntries);

         for (let i = 0; i < numEntries; ++i)
            cleanedLUT [i] = lut [i] >> shift;

         lut .cleaned = cleanedLUT;

         return cleanedLUT;
      }

      const LUT       = this .getLUT ();
      const numPixels = this .dicom .width * this .dicom .height;
      const rData     = LUT .redPaletteColorLookupTableData;
      const gData     = LUT .greenPaletteColorLookupTableData;
      const bData     = LUT .bluePaletteColorLookupTableData;
      const len       = LUT .redPaletteColorLookupTableData .length;

      let palIndex = 0;
      let rgbIndex = 0;

      const start = LUT .redPaletteColorLookupTableDescriptor [1];
      const shift = LUT .redPaletteColorLookupTableDescriptor [2] === 8 ? 0 : 8;

      const rDataCleaned = convertLUTto8Bit (rData, shift);
      const gDataCleaned = convertLUTto8Bit (gData, shift);
      const bDataCleaned = convertLUTto8Bit (bData, shift);

      let out = new Uint8Array (pixelData .length * 3);

      for (let i = 0; i < numPixels; ++ i)
      {
         let value = pixelData [palIndex++];

         if (value < start)
            value = 0;
         else if (value > start + len - 1)
            value = len - 1;
         else
            value -= start;

         out [rgbIndex++] = rDataCleaned [value];
         out [rgbIndex++] = gDataCleaned [value];
         out [rgbIndex++] = bDataCleaned [value];
      }

      return out;
   },
   getLUT: function ()
   {
      if (this .LUT)
          return this .LUT;

      this .LUT = { };

      this .populatePaletteColorLut (this .dataSet, this .LUT);

      return this .LUT;
   },
   populatePaletteColorLut: function (dataSet, imagePixelModule)
   {
      imagePixelModule .redPaletteColorLookupTableDescriptor   = this .getLutDescriptor (dataSet, 'x00281101');
      imagePixelModule .greenPaletteColorLookupTableDescriptor = this .getLutDescriptor (dataSet, 'x00281102');
      imagePixelModule .bluePaletteColorLookupTableDescriptor  = this .getLutDescriptor (dataSet, 'x00281103');

      // The first Palette Color Lookup Table Descriptor value is the number of entries in the lookup table.
      // When the number of table entries is equal to 2ˆ16 then this value shall be 0.
      // See http://dicom.nema.org/MEDICAL/DICOM/current/output/chtml/part03/sect_C.7.6.3.html#sect_C.7.6.3.1.5
      if (imagePixelModule .redPaletteColorLookupTableDescriptor [0] === 0)
      {
         imagePixelModule .redPaletteColorLookupTableDescriptor   [0] = 65536;
         imagePixelModule .greenPaletteColorLookupTableDescriptor [0] = 65536;
         imagePixelModule .bluePaletteColorLookupTableDescriptor  [0] = 65536;
      }

      // The third Palette Color Lookup Table Descriptor value specifies the number of bits for each entry in the Lookup Table Data.
      // It shall take the value of 8 or 16.
      // The LUT Data shall be stored in a format equivalent to 8 bits allocated when the number of bits for each entry is 8, and 16 bits allocated when the number of bits for each entry is 16, where in both cases the high bit is equal to bits allocated-1.
      // The third value shall be identical for each of the Red, Green and Blue Palette Color Lookup Table Descriptors.
      //
      // Note: Some implementations have encoded 8 bit entries with 16 bits allocated, padding the high bits;
      // this can be detected by comparing the number of entries specified in the LUT Descriptor with the actual value length of the LUT Data entry.
      // The value length in bytes should equal the number of entries if bits allocated is 8, and be twice as long if bits allocated is 16.
      const numLutEntries    = imagePixelModule .redPaletteColorLookupTableDescriptor [0];
      const lutData          = dataSet .elements .x00281201;
      const lutBitsAllocated = lutData .length === numLutEntries ? 8 : 16;

      // If the descriptors do not appear to have the correct values, correct them
      if (imagePixelModule.redPaletteColorLookupTableDescriptor [2] !== lutBitsAllocated)
      {
         imagePixelModule .redPaletteColorLookupTableDescriptor   [2] = lutBitsAllocated;
         imagePixelModule .greenPaletteColorLookupTableDescriptor [2] = lutBitsAllocated;
         imagePixelModule .bluePaletteColorLookupTableDescriptor  [2] = lutBitsAllocated;
      }

      imagePixelModule .redPaletteColorLookupTableData   = this .getLutData (dataSet, 'x00281201', imagePixelModule .redPaletteColorLookupTableDescriptor);
      imagePixelModule .greenPaletteColorLookupTableData = this .getLutData (dataSet, 'x00281202', imagePixelModule .greenPaletteColorLookupTableDescriptor);
      imagePixelModule .bluePaletteColorLookupTableData  = this .getLutData (dataSet, 'x00281203', imagePixelModule .bluePaletteColorLookupTableDescriptor);
   },
   getLutDescriptor: function  (dataSet, tag)
   {
      if (! dataSet .elements [tag] || dataSet .elements [tag] .length !== 6)
         return;

      return [dataSet .uint16 (tag, 0), dataSet .uint16 (tag, 1), dataSet .uint16 (tag, 2)];
   },
   getLutData: function  (lutDataSet, tag, lutDescriptor)
   {
      const lut     = [];
      const lutData = lutDataSet .elements [tag];

      for (let i = 0; i < lutDescriptor [0]; ++ i)
      {
         // Output range is always unsigned
         if (lutDescriptor [2] === 16)
            lut [i] = lutDataSet .uint16 (tag, i);
         else
            lut [i] = lutDataSet .byteArray [i + lutData .dataOffset];
      }

      return lut;
   },
};

// ftp://medical.nema.org/medical/dicom/DataSets/WG04/

/* harmony default export */ const DICOMParser = (DicomParser);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/InputOutput/FileLoader\")"
const FileLoader_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/InputOutput/FileLoader");
var FileLoader_default = /*#__PURE__*/__webpack_require__.n(FileLoader_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/ImageTexture3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/












function ImageTexture3D (executionContext)
{
   Texturing3D_X3DTexture3DNode.call (this, executionContext);
   X3DUrlObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).ImageTexture3D);
}

ImageTexture3D .prototype = Object .assign (Object .create (Texturing3D_X3DTexture3DNode.prototype),
   (X3DUrlObject_default()).prototype,
{
   constructor: ImageTexture3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",             new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",          new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "load",                 new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "url",                  new (Fields_default()).MFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefresh",          new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefreshTimeLimit", new (Fields_default()).SFTime (3600)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatS",              new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatT",              new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatR",              new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties",    new (Fields_default()).SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "ImageTexture3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      Texturing3D_X3DTexture3DNode.prototype.initialize.call (this);
      X3DUrlObject_default().prototype.initialize.call (this);

      this .requestImmediateLoad ();
   },
   getInternalType: function (components)
   {
      const gl = this .getBrowser () .getContext ();

      switch (components)
      {
         case 1:
            return gl .LUMINANCE;
         case 2:
            return gl .LUMINANCE_ALPHA;
         case 3:
            return gl .RGB;
         case 4:
            return gl .RGBA;
      }
   },
   unLoadNow: function ()
   {
      this .clearTexture ();
   },
   loadNow: function ()
   {
      new (FileLoader_default()) (this) .loadBinaryDocument (this ._url,
      function (data)
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .setLoadState ((X3DConstants_default()).FAILED_STATE);
            this .clearTexture ();
         }
         else
         {
            const nrrd = new Texturing3D_NRRDParser () .parse (data);

            if (nrrd .nrrd)
            {
               const internalType = this .getInternalType (nrrd .components);

               this .setTexture (nrrd .width, nrrd .height, nrrd .depth, false, internalType, nrrd .data);
               this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
               return;
            }

            const dicom = new DICOMParser () .parse (data);

            if (dicom .dicom)
            {
               const internalType = this .getInternalType (dicom .components);

               this .setTexture (dicom .width, dicom .height, dicom .depth, false, internalType, dicom .data);
               this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
               return;
            }

            throw new Error ("ImageTexture3D: no appropriate file type handler found.");
         }
      }
      .bind (this));
   },
});

/* harmony default export */ const Texturing3D_ImageTexture3D = (ImageTexture3D);

;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/PixelTexture3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function PixelTexture3D (executionContext)
{
   Texturing3D_X3DTexture3DNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).PixelTexture3D);

   this .addChildObjects ("loadState", new (Fields_default()).SFInt32 ((X3DConstants_default()).NOT_STARTED_STATE));
}

PixelTexture3D .prototype = Object .assign (Object .create (Texturing3D_X3DTexture3DNode.prototype),
{
   constructor: PixelTexture3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",          new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",       new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "image",             new (Fields_default()).MFInt32 (0, 0, 0, 0)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatS",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatT",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "repeatR",           new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "textureProperties", new (Fields_default()).SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "PixelTexture3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texture";
   },
   initialize: function ()
   {
      Texturing3D_X3DTexture3DNode.prototype.initialize.call (this);

      this ._image .addInterest ("set_image__", this);

      this .set_image__ ();
   },
   checkLoadState: function ()
   {
      return this ._loadState .getValue ();
   },
   set_image__: (function ()
   {
      const
         OFFSET     = 4,
         COMPONENTS = 0,
         WIDTH      = 1,
         HEIGHT     = 2,
         DEPTH      = 3;

      return function ()
      {
         const image = this ._image;

         if (image .length < OFFSET)
         {
            this .clearTexture ();
            this ._loadState = (X3DConstants_default()).FAILED_STATE;
            return;
         }

         const
            gl          = this .getBrowser () .getContext (),
            components  = image [COMPONENTS],
            width       = image [WIDTH],
            height      = image [HEIGHT],
            depth       = image [DEPTH],
            transparent = ! (components & 1),
            size3D      = width * height * depth;

         let data, format;

         switch (components)
         {
            case 1:
            {
               data   = new Uint8Array (size3D);
               format = gl .LUMINANCE;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  data [d ++] = image [i];
               }

               break;
            }
            case 2:
            {
               data   = new Uint8Array (size3D * 2);
               format = gl .LUMINANCE_ALPHA;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++ ] = (p >>> 8) & 0xff;
                  data [d ++ ] = p & 0xff;
               }

               break;
            }
            case 3:
            {
               data   = new Uint8Array (size3D * 3);
               format = gl .RGB;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++ ] = (p >>> 16) & 0xff;
                  data [d ++ ] = (p >>> 8)  & 0xff;
                  data [d ++ ] = p & 0xff;
               }

               break;
            }
            case 4:
            {
               data   = new Uint8Array (size3D * 4);
               format = gl .RGBA;

               for (let i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
               {
                  const p = image [i];

                  data [d ++ ] = (p >>> 24) & 0xff;
                  data [d ++ ] = (p >>> 16) & 0xff;
                  data [d ++ ] = (p >>> 8)  & 0xff;
                  data [d ++ ] = p & 0xff;
               }

               break;
            }
            default:
            {
               this .clearTexture ();
               this ._loadState = (X3DConstants_default()).FAILED_STATE;
               return;
            }
         }

         this .setTexture (width, height, depth, transparent, format, data);
         this ._loadState = (X3DConstants_default()).COMPLETE_STATE;
      };
   })(),
});

/* harmony default export */ const Texturing3D_PixelTexture3D = (PixelTexture3D);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/X3DSingleTextureCoordinateNode\")"
const X3DSingleTextureCoordinateNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components/Texturing/X3DSingleTextureCoordinateNode");
var X3DSingleTextureCoordinateNode_default = /*#__PURE__*/__webpack_require__.n(X3DSingleTextureCoordinateNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector4\")"
const Vector4_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("standard/Math/Numbers/Vector4");
;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/TextureCoordinate3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function TextureCoordinate3D (executionContext)
{
   X3DSingleTextureCoordinateNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureCoordinate3D);
}

TextureCoordinate3D .prototype = Object .assign (Object .create ((X3DSingleTextureCoordinateNode_default()).prototype),
{
   constructor: TextureCoordinate3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata", new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mapping",  new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "point",    new (Fields_default()).MFVec3f ()),
   ]),
   getTypeName: function ()
   {
      return "TextureCoordinate3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texCoord";
   },
   initialize: function ()
   {
      X3DSingleTextureCoordinateNode_default().prototype.initialize.call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__: function ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   isEmpty: function ()
   {
      return this .length === 0;
   },
   getSize: function ()
   {
      return this .length;
   },
   get1Point: function (index, vector)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 3;

         return vector .set (point [index], point [index + 1], point [index + 2], 1);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 3;

         return vector .set (point [index], point [index + 1], point [index + 2], 1);
      }
      else
      {
         return vector .set (0, 0, 0, 1);
      }
   },
   addTexCoordToChannel: function (index, array)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 3;

         array .push (point [index], point [index + 1], point [index + 2], 1);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 3;

         array .push (point [index], point [index + 1], point [index + 2], 1);
      }
      else
      {
         array .push (0, 0, 0, 1);
      }
   },
   getTexCoord: function (array)
   {
      const
         point  = this .point,
         length = this .length;

      for (let i = 0, p = 0; i < length; ++ i, p += 3)
         array .push (point [p], point [p + 1], point [p + 2], 1);

      return array;
   },
});

/* harmony default export */ const Texturing3D_TextureCoordinate3D = (TextureCoordinate3D);

;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/TextureCoordinate4D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/









function TextureCoordinate4D (executionContext)
{
   X3DSingleTextureCoordinateNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureCoordinate4D);
}

TextureCoordinate4D .prototype = Object .assign (Object .create ((X3DSingleTextureCoordinateNode_default()).prototype),
{
   constructor: TextureCoordinate4D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata", new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mapping",  new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "point",    new (Fields_default()).MFVec4f ()),
   ]),
   getTypeName: function ()
   {
      return "TextureCoordinate4D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "texCoord";
   },
   initialize: function ()
   {
      X3DSingleTextureCoordinateNode_default().prototype.initialize.call (this);

      this ._point .addInterest ("set_point__", this);

      this .set_point__ ();
   },
   set_point__: function ()
   {
      this .point  = this ._point .getValue ();
      this .length = this ._point .length;
   },
   isEmpty: function ()
   {
      return this .length === 0;
   },
   getSize: function ()
   {
      return this .length;
   },
   get1Point: function (index, vector)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 4;

         return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 4;

         return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else
      {
         return vector .set (0, 0, 0, 1);
      }
   },
   addTexCoordToChannel: function (index, array)
   {
      if (index >= 0 && index < this .length)
      {
         const point = this .point;

         index *= 4;

         array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else if (index >= 0 && this .length)
      {
         const point = this .point;

         index %= this .length;
         index *= 4;

         array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
      }
      else
      {
         array .push (0, 0, 0, 1);
      }
   },
   getTexCoord: function (array)
   {
      const
         point  = this .point,
         length = this .length;

      for (let i = 0, p = 0; i < length; ++ i, p += 4)
         array .push (point [p], point [p + 1], point [p + 2], point [p + 3]);

      return array;
   },
});

/* harmony default export */ const Texturing3D_TextureCoordinate4D = (TextureCoordinate4D);

;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Texturing/X3DSingleTextureTransformNode\")"
const X3DSingleTextureTransformNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("x_ite/Components/Texturing/X3DSingleTextureTransformNode");
var X3DSingleTextureTransformNode_default = /*#__PURE__*/__webpack_require__.n(X3DSingleTextureTransformNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Vector3\")"
const Vector3_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("standard/Math/Numbers/Vector3");
var Vector3_default = /*#__PURE__*/__webpack_require__.n(Vector3_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Rotation4\")"
const Rotation4_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("standard/Math/Numbers/Rotation4");
var Rotation4_default = /*#__PURE__*/__webpack_require__.n(Rotation4_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"standard/Math/Numbers/Matrix4\")"
const Matrix4_namespaceObject = window [Symbol .for ("X_ITE.X3D-7.0.0")] .require ("standard/Math/Numbers/Matrix4");
var Matrix4_default = /*#__PURE__*/__webpack_require__.n(Matrix4_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/TextureTransform3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/











function TextureTransform3D (executionContext)
{
   X3DSingleTextureTransformNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureTransform3D);

   this .matrix = new (Matrix4_default()) ();
}

TextureTransform3D .prototype = Object .assign (Object .create ((X3DSingleTextureTransformNode_default()).prototype),
{
   constructor: TextureTransform3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata",    new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mapping",     new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "translation", new (Fields_default()).SFVec3f ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "rotation",    new (Fields_default()).SFRotation ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "scale",       new (Fields_default()).SFVec3f (1, 1, 1)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "center",      new (Fields_default()).SFVec3f ()),
   ]),
   getTypeName: function ()
   {
      return "TextureTransform3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "textureTransform";
   },
   initialize: function ()
   {
      X3DSingleTextureTransformNode_default().prototype.initialize.call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   getMatrix: function ()
   {
      return this .matrix;
   },
   eventsProcessed: (function ()
   {
      const vector = new (Vector3_default()) (0, 0, 0);

      return function ()
      {
         const
            translation = this ._translation .getValue (),
            rotation    = this ._rotation .getValue (),
            scale       = this ._scale .getValue (),
            center      = this ._center .getValue (),
            matrix4     = this .matrix;

         matrix4 .identity ();

         if (! center .equals ((Vector3_default()).Zero))
            matrix4 .translate (vector .assign (center) .negate ());

         if (! scale .equals ((Vector3_default()).One))
            matrix4 .scale (scale);

         if (! rotation .equals ((Rotation4_default()).Identity))
            matrix4 .rotate (rotation);

         if (! center .equals ((Vector3_default()).Zero))
            matrix4 .translate (center);

         if (! translation .equals ((Vector3_default()).Zero))
            matrix4 .translate (translation);

         this .setMatrix (matrix4);
      };
   })(),
});

/* harmony default export */ const Texturing3D_TextureTransform3D = (TextureTransform3D);

;// CONCATENATED MODULE: ./src/x_ite/Components/Texturing3D/TextureTransformMatrix3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/








function TextureTransformMatrix3D (executionContext)
{
   X3DSingleTextureTransformNode_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).TextureTransformMatrix3D);
}

TextureTransformMatrix3D .prototype = Object .assign (Object .create ((X3DSingleTextureTransformNode_default()).prototype),
{
   constructor: TextureTransformMatrix3D,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "metadata", new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "mapping",  new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput, "matrix",   new (Fields_default()).SFMatrix4f ()),
   ]),
   getTypeName: function ()
   {
      return "TextureTransformMatrix3D";
   },
   getComponentName: function ()
   {
      return "Texturing3D";
   },
   getContainerField: function ()
   {
      return "textureTransform";
   },
   initialize: function ()
   {
      X3DSingleTextureTransformNode_default().prototype.initialize.call (this);

      this .addInterest ("eventsProcessed", this);

      this .eventsProcessed ();
   },
   getMatrix: function ()
   {
      return this ._matrix .getValue ();
   },
   eventsProcessed: function ()
   {
      this .setMatrix (this ._matrix .getValue ());
   },
});

/* harmony default export */ const Texturing3D_TextureTransformMatrix3D = (TextureTransformMatrix3D);

;// CONCATENATED MODULE: ./src/assets/components/Texturing3D.js
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/












Components_default().addComponent ({
   name: "Texturing3D",
   types:
   {
      ComposedTexture3D:        Texturing3D_ComposedTexture3D,        // Not implemented yet.
      ImageTexture3D:           Texturing3D_ImageTexture3D,           // Not implemented yet.
      PixelTexture3D:           Texturing3D_PixelTexture3D,           // Not implemented yet.
      TextureCoordinate3D:      Texturing3D_TextureCoordinate3D,
      TextureCoordinate4D:      Texturing3D_TextureCoordinate4D,
      TextureTransform3D:       Texturing3D_TextureTransform3D,
      TextureTransformMatrix3D: Texturing3D_TextureTransformMatrix3D,
   },
   abstractTypes:
   {
      X3DTexture3DNode: Texturing3D_X3DTexture3DNode, // Not implemented yet.
   },
});

/* harmony default export */ const Texturing3D = ((/* unused pure expression or super */ null && (undefined)));

/******/ })()
;