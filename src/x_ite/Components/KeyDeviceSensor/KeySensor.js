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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DKeyDeviceSensorNode from "./X3DKeyDeviceSensorNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

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
   X3DKeyDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .KeySensor);
}

Object .assign (Object .setPrototypeOf (KeySensor .prototype, X3DKeyDeviceSensorNode .prototype),
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

Object .defineProperties (KeySensor, X3DNode .staticProperties ("KeySensor", "KeyDeviceSensor", 1, "children", "3.0"));

Object .defineProperties (KeySensor,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "controlKey",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "shiftKey",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "altKey",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "actionKeyPress",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "actionKeyRelease", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "keyPress",         new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "keyRelease",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",         new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default KeySensor;
