/* X_ITE v11.2.2 */
const __X_ITE_X3D__ = window [Symbol .for ("X_ITE.X3D-11.2.2")];
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
;// external "__X_ITE_X3D__ .Namespace"
const external_X_ITE_X3D_Namespace_namespaceObject = __X_ITE_X3D__ .Namespace;
var external_X_ITE_X3D_Namespace_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_Namespace_namespaceObject);
;// ./src/x_ite/Browser/KeyDeviceSensor/X3DKeyDeviceSensorContext.js
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
   _keyDeviceSensorNodes = Symbol (),
   _keydown              = Symbol (),
   _keyup                = Symbol ();

function X3DKeyDeviceSensorContext ()
{
   this [_keyDeviceSensorNodes] = new Set ();
}

Object .assign (X3DKeyDeviceSensorContext .prototype,
{
   initialize ()
   {
      const element = this .getElement ();

      element .on ("keydown.X3DKeyDeviceSensorContext", this [_keydown] .bind (this));
      element .on ("keyup.X3DKeyDeviceSensorContext",   this [_keyup]   .bind (this));
   },
   addKeyDeviceSensorNode (keyDeviceSensorNode)
   {
      this [_keyDeviceSensorNodes] .add (keyDeviceSensorNode);
   },
   removeKeyDeviceSensorNode (keyDeviceSensorNode)
   {
      this [_keyDeviceSensorNodes] .delete (keyDeviceSensorNode);
   },
   getKeyDeviceSensorNodes ()
   {
      return this [_keyDeviceSensorNodes];
   },
   [_keydown] (event)
   {
      //console .log (event .keyCode);

      for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
         keyDeviceSensorNode .keydown (event);
   },
   [_keyup] (event)
   {
      //console .log (event .which);

      for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
         keyDeviceSensorNode .keyup (event);
   },
   dispose ()
   {
      this .getElement () .off (".X3DKeyDeviceSensorContext");
   },
});

const __default__ = X3DKeyDeviceSensorContext;
;

/* harmony default export */ const KeyDeviceSensor_X3DKeyDeviceSensorContext = (external_X_ITE_X3D_Namespace_default().add ("X3DKeyDeviceSensorContext", __default__));
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
;// external "__X_ITE_X3D__ .X3DSensorNode"
const external_X_ITE_X3D_X3DSensorNode_namespaceObject = __X_ITE_X3D__ .X3DSensorNode;
var external_X_ITE_X3D_X3DSensorNode_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DSensorNode_namespaceObject);
;// external "__X_ITE_X3D__ .X3DConstants"
const external_X_ITE_X3D_X3DConstants_namespaceObject = __X_ITE_X3D__ .X3DConstants;
var external_X_ITE_X3D_X3DConstants_default = /*#__PURE__*/__webpack_require__.n(external_X_ITE_X3D_X3DConstants_namespaceObject);
;// ./src/x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode.js
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





function X3DKeyDeviceSensorNode (executionContext)
{
   external_X_ITE_X3D_X3DSensorNode_default().call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).X3DKeyDeviceSensorNode);
}

Object .assign (Object .setPrototypeOf (X3DKeyDeviceSensorNode .prototype, (external_X_ITE_X3D_X3DSensorNode_default()).prototype),
{
   initialize ()
   {
      external_X_ITE_X3D_X3DSensorNode_default().prototype .initialize .call (this);

      this .getLive () .addInterest ("set_live__", this);

      this .set_live__ ();
   },
   set_live__ ()
   {
      if (this .getLive () .getValue ())
      {
         this ._enabled .addInterest ("set_enabled__", this);

         if (this ._enabled .getValue ())
            this .enable ();
      }
      else
      {
         this ._enabled .removeInterest ("set_enabled__", this);

         this .disable ();
      }
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .enable ();
      else
         this .disable ();
   },
   enable ()
   {
      this .getBrowser () .addKeyDeviceSensorNode (this);
   },
   disable ()
   {
      this .getBrowser () .removeKeyDeviceSensorNode (this);

      this .release ();
   },
   keydown () { },
   keyup () { },
   release () { },
});

Object .defineProperties (X3DKeyDeviceSensorNode, external_X_ITE_X3D_X3DNode_default().getStaticProperties ("X3DKeyDeviceSensorNode", "KeyDeviceSensor", 1));

const X3DKeyDeviceSensorNode_default_ = X3DKeyDeviceSensorNode;
;

/* harmony default export */ const KeyDeviceSensor_X3DKeyDeviceSensorNode = (external_X_ITE_X3D_Namespace_default().add ("X3DKeyDeviceSensorNode", X3DKeyDeviceSensorNode_default_));
;// ./src/x_ite/Components/KeyDeviceSensor/KeySensor.js
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
   KEY_F1  = 1,
   KEY_F2  = 2,
   KEY_F3  = 3,
   KEY_F4  = 4,
   KEY_F5  = 5,
   KEY_F6  = 6,
   KEY_F7  = 7,
   KEY_F8  = 8,
   KEY_F9  = 9,
   KEY_F10 = 10,
   KEY_F11 = 11,
   KEY_F12 = 12,

   KEY_HOME  = 13,
   KEY_END   = 14,
   KEY_PGUP  = 15,
   KEY_PGDN  = 16,
   KEY_UP    = 17,
   KEY_DOWN  = 18,
   KEY_LEFT  = 19,
   KEY_RIGHT = 20;

function KeySensor (executionContext)
{
   KeyDeviceSensor_X3DKeyDeviceSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).KeySensor);
}

Object .assign (Object .setPrototypeOf (KeySensor .prototype, KeyDeviceSensor_X3DKeyDeviceSensorNode .prototype),
{
   keydown (event)
   {
      event .preventDefault ();

      if (! this ._isActive .getValue ())
         this ._isActive = true;

      switch (event .which)
      {
         case 16: // Shift
            this ._shiftKey = true;
            break;
         case 17: // Ctrl
            this ._controlKey = true;
            break;
         case 18: // Alt
            this ._altKey = true;
            break;
         //////////////////////////////////
         case 112:
            this ._actionKeyPress = KEY_F1;
            break;
         case 113:
            this ._actionKeyPress = KEY_F2;
            break;
         case 114:
            this ._actionKeyPress = KEY_F3;
            break;
         case 115:
            this ._actionKeyPress = KEY_F4;
            break;
         case 116:
            this ._actionKeyPress = KEY_F5;
            break;
         case 117:
            this ._actionKeyPress = KEY_F6;
            break;
         case 118:
            this ._actionKeyPress = KEY_F7;
            break;
         case 119:
            this ._actionKeyPress = KEY_F8;
            break;
         case 120:
            this ._actionKeyPress = KEY_F9;
            break;
         case 121:
            this ._actionKeyPress = KEY_F10;
            break;
         case 122:
            this ._actionKeyPress = KEY_F11;
            break;
         case 123:
            this ._actionKeyPress = KEY_F12;
            break;
         ////////////////////////////////////
         case 36:
            this ._actionKeyPress = KEY_HOME;
            break;
         case 35:
            this ._actionKeyPress = KEY_END;
            break;
         case 33:
            this ._actionKeyPress = KEY_PGUP;
            break;
         case 34:
            this ._actionKeyPress = KEY_PGDN;
            break;
         case 38:
            this ._actionKeyPress = KEY_UP;
            break;
         case 40:
            this ._actionKeyPress = KEY_DOWN;
            break;
         case 37:
            this ._actionKeyPress = KEY_LEFT;
            break;
         case 39:
            this ._actionKeyPress = KEY_RIGHT;
            break;
         ////////////////////////////////////
         default:
         {
            if (event .charCode || event .keyCode)
            {
               switch (event .key)
               {
                  case "AltGraph":
                  case "CapsLock":
                  case "Insert":
                     break;
                  case "Backspace":
                     this ._keyPress = String .fromCharCode (8);
                     break;
                  case "Delete":
                     this ._keyPress = String .fromCharCode (127);
                     break;
                  case "Enter":
                     this ._keyPress = "\n";
                     break;
                  case "Escape":
                     this ._keyPress = String .fromCharCode (27);
                     break;
                  case "Tab":
                     this ._keyPress = "\t";
                     break;
                  default:
                     if (event .key .length === 1)
                        this ._keyPress = event .key;
                     break;
               }
            }

            break;
         }
      }
   },
   keyup (event)
   {
      event .preventDefault ();

      switch (event .which)
      {
         case 16: // Shift
         {
            this ._shiftKey = false;
            break;
         }
         case 17: // Ctrl
         {
            this ._controlKey = false;
            break;
         }
         case 18: // Alt
         {
            this ._altKey = false;
            break;
         }
         //////////////////////////////////
         case 112:
            this ._actionKeyRelease = KEY_F1;
            break;
         case 113:
            this ._actionKeyRelease = KEY_F2;
            break;
         case 114:
            this ._actionKeyRelease = KEY_F3;
            break;
         case 115:
            this ._actionKeyRelease = KEY_F4;
            break;
         case 116:
            this ._actionKeyRelease = KEY_F5;
            break;
         case 117:
            this ._actionKeyRelease = KEY_F6;
            break;
         case 118:
            this ._actionKeyRelease = KEY_F7;
            break;
         case 119:
            this ._actionKeyRelease = KEY_F8;
            break;
         case 120:
            this ._actionKeyRelease = KEY_F9;
            break;
         case 121:
            this ._actionKeyRelease = KEY_F10;
            break;
         case 122:
            this ._actionKeyRelease = KEY_F11;
            break;
         case 123:
            this ._actionKeyRelease = KEY_F12;
            break;
         ////////////////////////////////////
         case 36:
            this ._actionKeyRelease = KEY_HOME;
            break;
         case 35:
            this ._actionKeyRelease = KEY_END;
            break;
         case 33:
            this ._actionKeyRelease = KEY_PGUP;
            break;
         case 34:
            this ._actionKeyRelease = KEY_PGDN;
            break;
         case 38:
            this ._actionKeyRelease = KEY_UP;
            break;
         case 40:
            this ._actionKeyRelease = KEY_DOWN;
            break;
         case 37:
            this ._actionKeyRelease = KEY_LEFT;
            break;
         case 39:
            this ._actionKeyRelease = KEY_RIGHT;
            break;
         ////////////////////////////////////
         default:
         {
            if (event .charCode || event .keyCode)
            {
               switch (event .key)
               {
                  case "AltGraph":
                  case "CapsLock":
                  case "Insert":
                     break;
                  case "Backspace":
                     this ._keyRelease = String .fromCharCode (8);
                     break;
                  case "Delete":
                     this ._keyRelease = String .fromCharCode (127);
                     break;
                  case "Enter":
                     this ._keyRelease = "\n";
                     break;
                  case "Escape":
                     this ._keyRelease = String .fromCharCode (27);
                     break;
                  case "Tab":
                     this ._keyRelease = "\t";
                     break;
                  default:
                     if (event .key .length === 1)
                        this ._keyRelease = event .key;
                     break;
               }
            }

            break;
         }
      }

      if (this ._isActive .getValue ())
         this ._isActive = false;
   },
   release ()
   {
      if (this ._shiftKey .getValue ())
         this ._shiftKey = false;

      if (this ._controlKey .getValue ())
         this ._controlKey = false;

      if (this ._altKey .getValue ())
         this ._altKey = false;
   },
});

Object .defineProperties (KeySensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("KeySensor", "KeyDeviceSensor", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",         new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "description",      new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",          new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "controlKey",       new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "shiftKey",         new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "altKey",           new (external_X_ITE_X3D_Fields_default()).SFBool ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "actionKeyPress",   new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "actionKeyRelease", new (external_X_ITE_X3D_Fields_default()).SFInt32 ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "keyPress",         new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "keyRelease",       new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "isActive",         new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const KeySensor_default_ = KeySensor;
;

/* harmony default export */ const KeyDeviceSensor_KeySensor = (external_X_ITE_X3D_Namespace_default().add ("KeySensor", KeySensor_default_));
;// ./src/x_ite/Components/KeyDeviceSensor/StringSensor.js
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








function StringSensor (executionContext)
{
   KeyDeviceSensor_X3DKeyDeviceSensorNode .call (this, executionContext);

   this .addType ((external_X_ITE_X3D_X3DConstants_default()).StringSensor);
}

Object .assign (Object .setPrototypeOf (StringSensor .prototype, KeyDeviceSensor_X3DKeyDeviceSensorNode .prototype),
{
   keydown (event)
   {
      event .preventDefault ();

      switch (event .key)
      {
         case "Backspace":
         {
            if (this ._isActive .getValue ())
            {
               if (this ._deletionAllowed .getValue ())
               {
                  if (this ._enteredText .length)
                     this ._enteredText = this ._enteredText .getValue () .substring (0, this ._enteredText .length - 1);
               }
            }

            break;
         }
         case "Enter":
         {
            this ._finalText = this ._enteredText;

            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Escape":
         {
            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Tab":
         {
            break;
         }
         default:
         {
            if (event .charCode || event .keyCode)
            {
               if (event .key .length === 1)
               {
                  if (! this ._isActive .getValue ())
                  {
                     this ._isActive    = true;
                     this ._enteredText = "";
                  }

                  this ._enteredText = this ._enteredText .getValue () + event .key;
               }
            }

            break;
         }
      }
   },
});

Object .defineProperties (StringSensor,
{
   ... external_X_ITE_X3D_X3DNode_default().getStaticProperties ("StringSensor", "KeyDeviceSensor", 2, "children", "3.0"),
   fieldDefinitions:
   {
      value: new (external_X_ITE_X3D_FieldDefinitionArray_default()) ([
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "metadata",        new (external_X_ITE_X3D_Fields_default()).SFNode ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "description",     new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "enabled",         new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).inputOutput, "deletionAllowed", new (external_X_ITE_X3D_Fields_default()).SFBool (true)),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "enteredText",     new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "finalText",       new (external_X_ITE_X3D_Fields_default()).SFString ()),
         new (external_X_ITE_X3D_X3DFieldDefinition_default()) ((external_X_ITE_X3D_X3DConstants_default()).outputOnly,  "isActive",        new (external_X_ITE_X3D_Fields_default()).SFBool ()),
      ]),
      enumerable: true,
   },
});

const StringSensor_default_ = StringSensor;
;

/* harmony default export */ const KeyDeviceSensor_StringSensor = (external_X_ITE_X3D_Namespace_default().add ("StringSensor", StringSensor_default_));
;// ./src/assets/components/KeyDeviceSensorComponent.js
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
   name: "KeyDeviceSensor",
   concreteNodes:
   [
      KeyDeviceSensor_KeySensor,
      KeyDeviceSensor_StringSensor,
   ],
   abstractNodes:
   [
      KeyDeviceSensor_X3DKeyDeviceSensorNode,
   ],
   browserContext: KeyDeviceSensor_X3DKeyDeviceSensorContext,
});

const KeyDeviceSensorComponent_default_ = undefined;
;

/* harmony default export */ const KeyDeviceSensorComponent = (external_X_ITE_X3D_Namespace_default().add ("KeyDeviceSensorComponent", KeyDeviceSensorComponent_default_));
/******/ })()
;