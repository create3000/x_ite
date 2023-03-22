/* X_ITE v8.6.12 */(() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 355:
/***/ ((module) => {

module.exports = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("lib/jquery");

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
const Components_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Components");
var Components_default = /*#__PURE__*/__webpack_require__.n(Components_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DFieldDefinition\")"
const X3DFieldDefinition_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Base/X3DFieldDefinition");
var X3DFieldDefinition_default = /*#__PURE__*/__webpack_require__.n(X3DFieldDefinition_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/FieldDefinitionArray\")"
const FieldDefinitionArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Base/FieldDefinitionArray");
var FieldDefinitionArray_default = /*#__PURE__*/__webpack_require__.n(FieldDefinitionArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DField\")"
const X3DField_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Base/X3DField");
var X3DField_default = /*#__PURE__*/__webpack_require__.n(X3DField_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DArrayField\")"
const X3DArrayField_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Base/X3DArrayField");
var X3DArrayField_default = /*#__PURE__*/__webpack_require__.n(X3DArrayField_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Fields\")"
const Fields_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Fields");
var Fields_default = /*#__PURE__*/__webpack_require__.n(Fields_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Browser/X3DBrowser\")"
const X3DBrowser_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Browser/X3DBrowser");
var X3DBrowser_default = /*#__PURE__*/__webpack_require__.n(X3DBrowser_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/ComponentInfo\")"
const ComponentInfo_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/ComponentInfo");
var ComponentInfo_default = /*#__PURE__*/__webpack_require__.n(ComponentInfo_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/ComponentInfoArray\")"
const ComponentInfoArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/ComponentInfoArray");
var ComponentInfoArray_default = /*#__PURE__*/__webpack_require__.n(ComponentInfoArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/ProfileInfo\")"
const ProfileInfo_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/ProfileInfo");
var ProfileInfo_default = /*#__PURE__*/__webpack_require__.n(ProfileInfo_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/ProfileInfoArray\")"
const ProfileInfoArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/ProfileInfoArray");
var ProfileInfoArray_default = /*#__PURE__*/__webpack_require__.n(ProfileInfoArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/UnitInfo\")"
const UnitInfo_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/UnitInfo");
var UnitInfo_default = /*#__PURE__*/__webpack_require__.n(UnitInfo_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Configuration/UnitInfoArray\")"
const UnitInfoArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Configuration/UnitInfoArray");
var UnitInfoArray_default = /*#__PURE__*/__webpack_require__.n(UnitInfoArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Execution/X3DExecutionContext\")"
const X3DExecutionContext_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Execution/X3DExecutionContext");
var X3DExecutionContext_default = /*#__PURE__*/__webpack_require__.n(X3DExecutionContext_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Execution/X3DScene\")"
const X3DScene_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Execution/X3DScene");
var X3DScene_default = /*#__PURE__*/__webpack_require__.n(X3DScene_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Prototype/ExternProtoDeclarationArray\")"
const ExternProtoDeclarationArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Prototype/ExternProtoDeclarationArray");
var ExternProtoDeclarationArray_default = /*#__PURE__*/__webpack_require__.n(ExternProtoDeclarationArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Prototype/ProtoDeclarationArray\")"
const ProtoDeclarationArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Prototype/ProtoDeclarationArray");
var ProtoDeclarationArray_default = /*#__PURE__*/__webpack_require__.n(ProtoDeclarationArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Prototype/X3DExternProtoDeclaration\")"
const X3DExternProtoDeclaration_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Prototype/X3DExternProtoDeclaration");
var X3DExternProtoDeclaration_default = /*#__PURE__*/__webpack_require__.n(X3DExternProtoDeclaration_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Prototype/X3DProtoDeclaration\")"
const X3DProtoDeclaration_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Prototype/X3DProtoDeclaration");
var X3DProtoDeclaration_default = /*#__PURE__*/__webpack_require__.n(X3DProtoDeclaration_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Routing/RouteArray\")"
const RouteArray_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Routing/RouteArray");
var RouteArray_default = /*#__PURE__*/__webpack_require__.n(RouteArray_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Routing/X3DRoute\")"
const X3DRoute_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Routing/X3DRoute");
var X3DRoute_default = /*#__PURE__*/__webpack_require__.n(X3DRoute_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Namespace\")"
const Namespace_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Namespace");
var Namespace_default = /*#__PURE__*/__webpack_require__.n(Namespace_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Browser/Scripting/evaluate.js
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

function evaluate (globalObject, sourceText)
{
   return Function (/* js */ `with (arguments [0])
   {
      delete arguments [0];
      arguments .length = 0;
      ${sourceText}
   }`)
   (globalObject);
}

const __default__ = evaluate;
;

Namespace_default().set ("x_ite/Browser/Scripting/evaluate", __default__);
/* harmony default export */ const Scripting_evaluate = (__default__);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Core/X3DChildNode\")"
const X3DChildNode_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Components/Core/X3DChildNode");
var X3DChildNode_default = /*#__PURE__*/__webpack_require__.n(X3DChildNode_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Components/Networking/X3DUrlObject\")"
const X3DUrlObject_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Components/Networking/X3DUrlObject");
var X3DUrlObject_default = /*#__PURE__*/__webpack_require__.n(X3DUrlObject_namespaceObject);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/Base/X3DConstants\")"
const X3DConstants_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/Base/X3DConstants");
var X3DConstants_default = /*#__PURE__*/__webpack_require__.n(X3DConstants_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Scripting/X3DScriptNode.js
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





function X3DScriptNode (executionContext)
{
   X3DChildNode_default().call (this, executionContext);
   X3DUrlObject_default().call (this, executionContext);

   this .addType ((X3DConstants_default()).X3DScriptNode);
}

X3DScriptNode .prototype = Object .assign (Object .create ((X3DChildNode_default()).prototype),
   (X3DUrlObject_default()).prototype,
{
   constructor: X3DScriptNode,
   initialize: function ()
   {
      X3DChildNode_default().prototype.initialize.call (this);
      X3DUrlObject_default().prototype.initialize.call (this);
   },
   dispose: function ()
   {
      X3DUrlObject_default().prototype.dispose.call (this);
      X3DChildNode_default().prototype.dispose.call (this);
   },
});

const X3DScriptNode_default_ = X3DScriptNode;
;

Namespace_default().set ("x_ite/Components/Scripting/X3DScriptNode", X3DScriptNode_default_);
/* harmony default export */ const Scripting_X3DScriptNode = (X3DScriptNode_default_);
;// CONCATENATED MODULE: external "window [Symbol .for (\"X_ITE.X3D\")] .require (\"x_ite/InputOutput/FileLoader\")"
const FileLoader_namespaceObject = window [Symbol .for ("X_ITE.X3D-8.6.12")] .require ("x_ite/InputOutput/FileLoader");
var FileLoader_default = /*#__PURE__*/__webpack_require__.n(FileLoader_namespaceObject);
;// CONCATENATED MODULE: ./src/x_ite/Components/Scripting/Script.js
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


























function Script (executionContext)
{
   Scripting_X3DScriptNode.call (this, executionContext);

   this .addType ((X3DConstants_default()).Script);

   this .pauseTime = 0;
}

Script .prototype = Object .assign (Object .create (Scripting_X3DScriptNode.prototype),
{
   constructor: Script,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new (FieldDefinitionArray_default()) ([
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "metadata",             new (Fields_default()).SFNode ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "description",          new (Fields_default()).SFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "load",                 new (Fields_default()).SFBool (true)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "url",                  new (Fields_default()).MFString ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefresh",          new (Fields_default()).SFTime ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).inputOutput,    "autoRefreshTimeLimit", new (Fields_default()).SFTime (3600)),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "directOutput",         new (Fields_default()).SFBool ()),
      new (X3DFieldDefinition_default()) ((X3DConstants_default()).initializeOnly, "mustEvaluate",         new (Fields_default()).SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "Script";
   },
   getComponentName: function ()
   {
      return "Scripting";
   },
   getContainerField: function ()
   {
      return "children";
   },
   initialize: function ()
   {
      Scripting_X3DScriptNode.prototype.initialize.call (this);

      for (const field of this .getUserDefinedFields ())
         field .setModificationTime (0);

      this .requestImmediateLoad ();
   },
   getExtendedEventHandling: function ()
   {
      return false;
   },
   canUserDefinedFields: function ()
   {
      return true;
   },
   addUserDefinedField: function (accessType, name, field)
   {
      Scripting_X3DScriptNode.prototype.addUserDefinedField.call (this, accessType, name, field);

      if (! this .isInitialized ())
         return;

      this .setLoadState ((X3DConstants_default()).NOT_STARTED_STATE);
      this .requestImmediateLoad ();
   },
   removeUserDefinedField: function (name)
   {
      Scripting_X3DScriptNode.prototype.removeUserDefinedField.call (this, name);

      if (! this .isInitialized ())
         return;

      this .setLoadState ((X3DConstants_default()).NOT_STARTED_STATE);
      this .requestImmediateLoad ();
   },
   getSourceText: function ()
   {
      return this ._url;
   },
   unLoadNow: function ()
   {
      this .initialize__ ("");
   },
   loadNow: function ()
   {
      this .initialized = false;

      new (FileLoader_default()) (this) .loadDocument (this ._url,
      function (data)
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .setLoadState ((X3DConstants_default()).FAILED_STATE);
         }
         else
         {
            this .setLoadState ((X3DConstants_default()).COMPLETE_STATE);
            this .initialize__ ($.decodeText (data));
         }
      }
      .bind (this));
   },
   getContext: function (text)
   {
      try
      {
         const callbacks = ["initialize", "prepareEvents", "eventsProcessed", "shutdown"];

         for (const field of this .getUserDefinedFields ())
         {
            switch (field .getAccessType ())
            {
               case (X3DConstants_default()).inputOnly:
                  callbacks .push (field .getName ());
                  break;
               case (X3DConstants_default()).inputOutput:
                  callbacks .push ("set_" + field .getName ());
                  break;
            }
         }

         text += "\nreturn [" + callbacks .map (function (c)
         {
            return `typeof ${c} !== "undefined" ? ${c} : undefined`;
         })
         .join (",") + "];";

         this .global = this .getGlobal ();

         const
            result  = Scripting_evaluate (this .global, text),
            context = { };

         for (let i = 0; i < callbacks .length; ++ i)
            context [callbacks [i]] = result [i];

         return context;
      }
      catch (error)
      {
         this .setError ("while evaluating script source", error);

         return { };
      }
   },
   evaluate: function (text)
   {
      return Scripting_evaluate (this .global, `return (${text})`);
   },
   getGlobal: function ()
   {
      const
         browser          = this .getBrowser (),
         executionContext = this .getExecutionContext (),
         live             = this .isLive ();

      function SFNode (vrmlSyntax)
      {
         const
            scene     = browser .createX3DFromString (String (vrmlSyntax)),
            rootNodes = scene .getRootNodes ();

         live .addFieldInterest (scene .isLive ());

         scene .setLive (live .getValue ());
         scene .setPrivate (executionContext .isPrivate ());
         scene .setExecutionContext (executionContext);

         if (rootNodes .length && rootNodes [0])
         {
            return rootNodes [0];
         }

         throw new Error ("SFNode.new: invalid argument, must be 'string' is 'undefined'.");
      }

      SFNode .prototype = (Fields_default()).SFNode.prototype;

      const global =
      {
         NULL:  { value: null },
         FALSE: { value: false },
         TRUE:  { value: true },
         print: { value: browser .println .bind (browser) },
         trace: { value: browser .println .bind (browser) },

         Browser: { value: browser },

         X3DConstants:                { value: (X3DConstants_default()) },
         X3DBrowser:                  { value: (X3DBrowser_default()) },
         X3DExecutionContext:         { value: (X3DExecutionContext_default()) },
         X3DScene:                    { value: (X3DScene_default()) },
         ComponentInfo:               { value: (ComponentInfo_default()) },
         ComponentInfoArray:          { value: (ComponentInfoArray_default()) },
         ProfileInfo:                 { value: (ProfileInfo_default()) },
         ProfileInfoArray:            { value: (ProfileInfoArray_default()) },
         UnitInfo:                    { value: (UnitInfo_default()) },
         UnitInfoArray:               { value: (UnitInfoArray_default()) },
         ExternProtoDeclarationArray: { value: (ExternProtoDeclarationArray_default()) },
         ProtoDeclarationArray:       { value: (ProtoDeclarationArray_default()) },
         X3DExternProtoDeclaration:   { value: (X3DExternProtoDeclaration_default()) },
         X3DProtoDeclaration:         { value: (X3DProtoDeclaration_default()) },
         RouteArray:                  { value: (RouteArray_default()) },
         X3DRoute:                    { value: (X3DRoute_default()) },

         X3DFieldDefinition:   { value: (X3DFieldDefinition_default()) },
         FieldDefinitionArray: { value: (FieldDefinitionArray_default()) },

         X3DField:      { value: (X3DField_default()) },
         X3DArrayField: { value: (X3DArrayField_default()) },

         SFColor:       { value: (Fields_default()).SFColor },
         SFColorRGBA:   { value: (Fields_default()).SFColorRGBA },
         SFImage:       { value: (Fields_default()).SFImage },
         SFMatrix3d:    { value: (Fields_default()).SFMatrix3d },
         SFMatrix3f:    { value: (Fields_default()).SFMatrix3f },
         SFMatrix4d:    { value: (Fields_default()).SFMatrix4d },
         SFMatrix4f:    { value: (Fields_default()).SFMatrix4f },
         SFNode:        { value: SFNode },
         SFRotation:    { value: (Fields_default()).SFRotation },
         SFVec2d:       { value: (Fields_default()).SFVec2d },
         SFVec2f:       { value: (Fields_default()).SFVec2f },
         SFVec3d:       { value: (Fields_default()).SFVec3d },
         SFVec3f:       { value: (Fields_default()).SFVec3f },
         SFVec4d:       { value: (Fields_default()).SFVec4d },
         SFVec4f:       { value: (Fields_default()).SFVec4f },
         VrmlMatrix:    { value: (Fields_default()).VrmlMatrix },

         MFBool:        { value: (Fields_default()).MFBool },
         MFColor:       { value: (Fields_default()).MFColor },
         MFColorRGBA:   { value: (Fields_default()).MFColorRGBA },
         MFDouble:      { value: (Fields_default()).MFDouble },
         MFFloat:       { value: (Fields_default()).MFFloat },
         MFImage:       { value: (Fields_default()).MFImage },
         MFInt32:       { value: (Fields_default()).MFInt32 },
         MFMatrix3d:    { value: (Fields_default()).MFMatrix3d },
         MFMatrix3f:    { value: (Fields_default()).MFMatrix3f },
         MFMatrix4d:    { value: (Fields_default()).MFMatrix4d },
         MFMatrix4f:    { value: (Fields_default()).MFMatrix4f },
         MFNode:        { value: (Fields_default()).MFNode },
         MFRotation:    { value: (Fields_default()).MFRotation },
         MFString:      { value: (Fields_default()).MFString },
         MFTime:        { value: (Fields_default()).MFTime },
         MFVec2d:       { value: (Fields_default()).MFVec2d },
         MFVec2f:       { value: (Fields_default()).MFVec2f },
         MFVec3d:       { value: (Fields_default()).MFVec3d },
         MFVec3f:       { value: (Fields_default()).MFVec3f },
         MFVec4d:       { value: (Fields_default()).MFVec4d },
         MFVec4f:       { value: (Fields_default()).MFVec4f },
      };

      for (const field of this .getUserDefinedFields ())
      {
         const name = field .getName ();

         if (field .getAccessType () === (X3DConstants_default()).inputOnly)
            continue;

         if (! (name in global))
         {
            global [name] =
            {
               get: field .valueOf .bind (field),
               set: field .setValue .bind (field),
            };
         }

         if (field .getAccessType () === (X3DConstants_default()).inputOutput)
         {
            global [name + "_changed"] =
            {
               get: field .valueOf  .bind (field),
               set: field .setValue .bind (field),
            };
         }
      }

      return Object .create (Object .prototype, global);
   },
   processOutstandingEvents: function ()
   {
      for (const field of this .getUserDefinedFields ())
      {
         if (field .getModificationTime () <= this .pauseTime)
            continue;

         switch (field .getAccessType ())
         {
            case (X3DConstants_default()).inputOnly:
            {
               const callback = this .context [field .getName ()];

               if (typeof callback === "function")
                  this .set_field__ (callback, field);

               break;
            }
            case (X3DConstants_default()).inputOutput:
            {
               const callback = this .context ["set_" + field .getName ()];

               if (typeof callback === "function")
                  this .set_field__ (callback, field);

               break;
            }
         }
      }
   },
   initialize__: function (text)
   {
      this .context = this .getContext (text);

      this .set_live__ ();
   },
   set_live__: function ()
   {
      Scripting_X3DScriptNode.prototype.set_live__.call (this);

      if (!this .context)
         return;

      if (this .isLive () .getValue ())
      {
         if (!this .initialized)
         {
            this .initialized = true;

            // Call initialize function.

            if (typeof this .context .initialize === "function")
            {
               const browser = this .getBrowser ();

               browser .getScriptStack () .push (this);

               try
               {
                  this .context .initialize ();
               }
               catch (error)
               {
                  this .setError ("in function 'initialize'", error);
               }

               browser .getScriptStack () .pop ();
            }

            if (typeof this .context .shutdown === "function")
               $(window) .on ("unload", this .shutdown__ .bind (this));
         }

         if (typeof this .context .prepareEvents === "function")
            this .getBrowser () .prepareEvents () .addInterest ("prepareEvents__", this);

         if (typeof this .context .eventsProcessed === "function")
            this .addInterest ("eventsProcessed__", this);

         for (const field of this .getUserDefinedFields ())
         {
            switch (field .getAccessType ())
            {
               case (X3DConstants_default()).inputOnly:
               {
                  const callback = this .context [field .getName ()];

                  if (typeof callback === "function")
                     field .addInterest ("set_field__", this, callback);

                  break;
               }
               case (X3DConstants_default()).inputOutput:
               {
                  const callback = this .context ["set_" + field .getName ()];

                  if (typeof callback === "function")
                     field .addInterest ("set_field__", this, callback);

                  break;
               }
            }
         }

         this .processOutstandingEvents ();
      }
      else
      {
         if (this .context .prepareEvents)
            this .getBrowser () .prepareEvents () .removeInterest ("prepareEvents__", this);

         if (this .context .eventsProcessed)
            this .removeInterest ("eventsProcessed__", this);

         for (const field of this .getUserDefinedFields ())
         {
            switch (field .getAccessType ())
            {
               case (X3DConstants_default()).inputOnly:
               case (X3DConstants_default()).inputOutput:
                  field .removeInterest ("set_field__", this);
                  break;
            }
         }

         if (this .initialized)
            this .pauseTime = Date .now ();
      }
   },
   prepareEvents__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .prepareEvents (browser .getCurrentTime ());
         browser .addBrowserEvent ();
      }
      catch (error)
      {
         this .setError ("in function 'prepareEvents'", error);
      }

      browser .getScriptStack () .pop ();
   },
   set_field__: function (callback, field)
   {
      const browser = this .getBrowser ();

      field .setTainted (true);
      browser .getScriptStack () .push (this);

      try
      {
         callback (field .valueOf (), browser .getCurrentTime ());
      }
      catch (error)
      {
         this .setError ("in function '" + field .getName () + "'", error);
      }

      browser .getScriptStack () .pop ();
      field .setTainted (false);
   },
   eventsProcessed__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .eventsProcessed ();
      }
      catch (error)
      {
         this .setError ("in function 'eventsProcessed'", error);
      }

      browser .getScriptStack () .pop ();
   },
   shutdown__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .shutdown ();
      }
      catch (error)
      {
         this .setError ("in function 'shutdown'", error);
      }

      browser .getScriptStack () .pop ();
   },
   setError: function (reason, error)
   {
      console .error ("JavaScript Error in Script '" + this .getName () + "', " + reason + "\nworld url is '" + this .getExecutionContext () .getWorldURL () + "':");
      console .error (error);
   },
});

const Script_default_ = Script;
;

Namespace_default().set ("x_ite/Components/Scripting/Script", Script_default_);
/* harmony default export */ const Scripting_Script = (Script_default_);
;// CONCATENATED MODULE: ./src/assets/components/Scripting.js
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
   name: "Scripting",
   types:
   {
      Script: Scripting_Script,
   },
   abstractTypes:
   {
      X3DScriptNode: Scripting_X3DScriptNode,
   },
});

const Scripting_default_ = undefined;
;

Namespace_default().set ("assets/components/Scripting", Scripting_default_);
/* harmony default export */ const Scripting = ((/* unused pure expression or super */ null && (Scripting_default_)));
})();

/******/ })()
;