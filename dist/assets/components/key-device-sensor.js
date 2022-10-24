(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
	define  = X3D .define,
	require = X3D .require;
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


define ('x_ite/Browser/KeyDeviceSensor/X3DKeyDeviceSensorContext',[
   "x_ite/Fields",
],
function (Fields)
{
"use strict";

   const
      _keyDeviceSensorNodes = Symbol (),
      _keydown              = Symbol (),
      _keyup                = Symbol ();

   function X3DKeyDeviceSensorContext ()
   {
      this [_keyDeviceSensorNodes] = new Set ();
   }

   X3DKeyDeviceSensorContext .prototype =
   {
      initialize: function ()
      {
         const element = this .getElement ();

         element .bind ("keydown.X3DKeyDeviceSensorContext", this [_keydown] .bind (this));
         element .bind ("keyup.X3DKeyDeviceSensorContext",   this [_keyup]   .bind (this));
      },
      addKeyDeviceSensorNode: function (keyDeviceSensorNode)
      {
         this [_keyDeviceSensorNodes] .add (keyDeviceSensorNode);
      },
      removeKeyDeviceSensorNode: function (keyDeviceSensorNode)
      {
         this [_keyDeviceSensorNodes] .delete (keyDeviceSensorNode);
      },
      getKeyDeviceSensorNodes: function ()
      {
         return this [_keyDeviceSensorNodes];
      },
      [_keydown]: function (event)
      {
         //console .log (event .keyCode);

         for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
            keyDeviceSensorNode .keydown (event);
      },
      [_keyup]: function (event)
      {
         //console .log (event .which);

         for (const keyDeviceSensorNode of this [_keyDeviceSensorNodes])
            keyDeviceSensorNode .keyup (event);
      },
   };

   return X3DKeyDeviceSensorContext;
});

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


define ('x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode',[
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Base/X3DConstants",
],
function (X3DSensorNode,
          X3DConstants)
{
"use strict";

   function X3DKeyDeviceSensorNode (executionContext)
   {
      X3DSensorNode .call (this, executionContext);

      this .addType (X3DConstants .X3DKeyDeviceSensorNode);
   }

   X3DKeyDeviceSensorNode .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
   {
      constructor: X3DKeyDeviceSensorNode,
      initialize: function ()
      {
         X3DSensorNode .prototype .initialize .call (this);

         this .isLive () .addInterest ("set_live__", this);

         this .set_live__ ();
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
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
      set_enabled__: function ()
      {
         if (this ._enabled .getValue ())
            this .enable ();
         else
            this .disable ();
      },
      enable: function ()
      {
         this .getBrowser () .addKeyDeviceSensorNode (this);
      },
      disable: function ()
      {
         this .getBrowser () .removeKeyDeviceSensorNode (this);

         this .release ();
      },
      keydown: function () { },
      keyup: function () { },
      release: function () { },
   });

   return X3DKeyDeviceSensorNode;
});

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


define ('x_ite/Components/KeyDeviceSensor/KeySensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DKeyDeviceSensorNode,
          X3DConstants)
{
"use strict";

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

   KeySensor .prototype = Object .assign (Object .create (X3DKeyDeviceSensorNode .prototype),
   {
      constructor: KeySensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
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
      getTypeName: function ()
      {
         return "KeySensor";
      },
      getComponentName: function ()
      {
         return "KeyDeviceSensor";
      },
      getContainerField: function ()
      {
         return "children";
      },
      keydown: function (event)
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
      keyup: function (event)
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
      release: function ()
      {
         if (this ._shiftKey .getValue ())
            this ._shiftKey = false;

         if (this ._controlKey .getValue ())
            this ._controlKey = false;

         if (this ._altKey .getValue ())
            this ._altKey = false;
      },
   });

   return KeySensor;
});

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


define ('x_ite/Components/KeyDeviceSensor/StringSensor',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DKeyDeviceSensorNode,
          X3DConstants)
{
"use strict";

   function StringSensor (executionContext)
   {
      X3DKeyDeviceSensorNode .call (this, executionContext);

      this .addType (X3DConstants .StringSensor);
   }

   StringSensor .prototype = Object .assign (Object .create (X3DKeyDeviceSensorNode .prototype),
   {
      constructor: StringSensor,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "deletionAllowed", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enteredText",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "finalText",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",        new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "StringSensor";
      },
      getComponentName: function ()
      {
         return "KeyDeviceSensor";
      },
      getContainerField: function ()
      {
         return "children";
      },
      keydown: function (event)
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
                        this ._enteredText  = this ._enteredText .getValue () .substr (0, this ._enteredText .length - 1);
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

   return StringSensor;
});

/*******************************************************************************
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


define (require .getComponentUrl ("key-device-sensor"), [
   "x_ite/Components",
   "x_ite/Browser/KeyDeviceSensor/X3DKeyDeviceSensorContext",
   "x_ite/Components/KeyDeviceSensor/KeySensor",
   "x_ite/Components/KeyDeviceSensor/StringSensor",
   "x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode",
],
function (Components,
          X3DKeyDeviceSensorContext,
          KeySensor,
          StringSensor,
          X3DKeyDeviceSensorNode)
{
"use strict";

   Components .addComponent ({
      name: "KeyDeviceSensor",
      types:
      {
         KeySensor:    KeySensor,
         StringSensor: StringSensor,
      },
      abstractTypes:
      {
         X3DKeyDeviceSensorNode: X3DKeyDeviceSensorNode,
      },
      context: X3DKeyDeviceSensorContext,
   });
});


})();
