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


define ([
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode",
	"x_ite/Bits/X3DConstants",
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
		fieldDefinitions: new FieldDefinitionArray ([
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

			this .isActive_ = true;

			switch (event .which)
			{
				case 16: // Shift
					this .shiftKey_ = true;
					break;
				case 17: // Ctrl
					this .controlKey_ = true;
					break;
				case 18: // Alt
					this .altKey_ = true;
					break;
				//////////////////////////////////
				case 112:
					this .actionKeyPress_ = KEY_F1;
					break;
				case 113:
					this .actionKeyPress_ = KEY_F2;
					break;
				case 114:
					this .actionKeyPress_ = KEY_F3;
					break;
				case 115:
					this .actionKeyPress_ = KEY_F4;
					break;
				case 116:
					this .actionKeyPress_ = KEY_F5;
					break;
				case 117:
					this .actionKeyPress_ = KEY_F6;
					break;
				case 118:
					this .actionKeyPress_ = KEY_F7;
					break;
				case 119:
					this .actionKeyPress_ = KEY_F8;
					break;
				case 120:
					this .actionKeyPress_ = KEY_F9;
					break;
				case 121:
					this .actionKeyPress_ = KEY_F10;
					break;
				case 122:
					this .actionKeyPress_ = KEY_F11;
					break;
				case 123:
					this .actionKeyPress_ = KEY_F12;
					break;
				////////////////////////////////////
				case 36:
					this .actionKeyPress_ = KEY_HOME;
					break;
				case 35:
					this .actionKeyPress_ = KEY_END;
					break;
				case 33:
					this .actionKeyPress_ = KEY_PGUP;
					break;
				case 34:
					this .actionKeyPress_ = KEY_PGDN;
					break;
				case 38:
					this .actionKeyPress_ = KEY_UP;
					break;
				case 40:
					this .actionKeyPress_ = KEY_DOWN;
					break;
				case 37:
					this .actionKeyPress_ = KEY_LEFT;
					break;
				case 39:
					this .actionKeyPress_ = KEY_RIGHT;
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
						      this .keyPress_ = String .fromCharCode (8);
								break;
							case "Delete":
						      this .keyPress_ = String .fromCharCode (127);
								break;
							case "Enter":
						      this .keyPress_ = "\n";
								break;
							case "Escape":
								this .keyPress_ = String .fromCharCode (27);
								break;
							case "Tab":
						      this .keyPress_ = "\t";
								break;
							default:
								if (event .key .length === 1)
						         this .keyPress_ = event .key;
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
					this .shiftKey_ = false;
					break;
				}
				case 17: // Ctrl
				{
					this .controlKey_ = false;
					break;
				}
				case 18: // Alt
				{
					this .altKey_ = false;
					break;
				}
				//////////////////////////////////
				case 112:
					this .actionKeyRelease_ = KEY_F1;
					break;
				case 113:
					this .actionKeyRelease_ = KEY_F2;
					break;
				case 114:
					this .actionKeyRelease_ = KEY_F3;
					break;
				case 115:
					this .actionKeyRelease_ = KEY_F4;
					break;
				case 116:
					this .actionKeyRelease_ = KEY_F5;
					break;
				case 117:
					this .actionKeyRelease_ = KEY_F6;
					break;
				case 118:
					this .actionKeyRelease_ = KEY_F7;
					break;
				case 119:
					this .actionKeyRelease_ = KEY_F8;
					break;
				case 120:
					this .actionKeyRelease_ = KEY_F9;
					break;
				case 121:
					this .actionKeyRelease_ = KEY_F10;
					break;
				case 122:
					this .actionKeyRelease_ = KEY_F11;
					break;
				case 123:
					this .actionKeyRelease_ = KEY_F12;
					break;
				////////////////////////////////////
				case 36:
					this .actionKeyRelease_ = KEY_HOME;
					break;
				case 35:
					this .actionKeyRelease_ = KEY_END;
					break;
				case 33:
					this .actionKeyRelease_ = KEY_PGUP;
					break;
				case 34:
					this .actionKeyRelease_ = KEY_PGDN;
					break;
				case 38:
					this .actionKeyRelease_ = KEY_UP;
					break;
				case 40:
					this .actionKeyRelease_ = KEY_DOWN;
					break;
				case 37:
					this .actionKeyRelease_ = KEY_LEFT;
					break;
				case 39:
					this .actionKeyRelease_ = KEY_RIGHT;
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
						      this .keyRelease_ = String .fromCharCode (8);
								break;
							case "Delete":
						      this .keyRelease_ = String .fromCharCode (127);
								break;
							case "Enter":
						      this .keyRelease_ = "\n";
								break;
							case "Escape":
								this .keyRelease_ = String .fromCharCode (27);
								break;
							case "Tab":
						      this .keyRelease_ = "\t";
								break;
							default:
								if (event .key .length === 1)
							      this .keyRelease_ = event .key;
								break;
						}
					}

				   break;
				}
			}

			this .isActive_ = false;
		},
		release: function ()
		{
			if (this .shiftKey_ .getValue ())
				this .shiftKey_ = false;

			if (this .controlKey_ .getValue ())
				this .controlKey_ = false;

			if (this .altKey_ .getValue ())
				this .altKey_ = false;
		},
	});

	return KeySensor;
});


