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
],
function (Fields)
{
"use strict";
	
	function X3DKeyDeviceSensorContext ()
	{
		this .keyDeviceSensorNode = null;

		this .addChildObjects ("controlKey",  new Fields .SFBool (),
		                       "shiftKey",    new Fields .SFBool (),
		                       "altKey",      new Fields .SFBool (),
		                       "altGrKey",    new Fields .SFBool ());
	}

	X3DKeyDeviceSensorContext .prototype =
	{
		initialize: function ()
		{
			this .getElement () .bind ("keydown.X3DKeyDeviceSensorContext", this .keydown .bind (this));
			this .getElement () .bind ("keyup.X3DKeyDeviceSensorContext",   this .keyup   .bind (this));
		},
		setKeyDeviceSensorNode: function (value)
		{
			this .keyDeviceSensorNode = value;
		},
		getKeyDeviceSensorNode: function ()
		{
			return this .keyDeviceSensorNode;
		},
		getShiftKey: function ()
		{
			return this .shiftKey_ .getValue ();
		},
		getControlKey: function ()
		{
			return this .controlKey_ .getValue ();
		},
		getAltKey: function ()
		{
			return this .altKey_ .getValue ();
		},
		getAltGrKey: function ()
		{
			return this .altGrKey_ .getValue ();
		},
		keydown: function (event)
		{
			//console .log (event .keyCode);

			if (this .keyDeviceSensorNode)
			   this .keyDeviceSensorNode .keydown (event);
	
			switch (event .keyCode)
			{
				case 16: // Shift
				{
					this .shiftKey_ = true;
					break;
				}
				case 17: // Ctrl
				{
					this .controlKey_ = true;
					break;
				}
				case 18: // Alt
				{
					this .altKey_ = true;
					break;
				}
				case 49: // 1
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							this .setBrowserOption ("Shading", "POINTSET");
							this .getNotification () .string_ = "Shading: Pointset";
						}
					}

					break;
				}
				case 50: // 2
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							this .setBrowserOption ("Shading", "WIREFRAME");
							this .getNotification () .string_ = "Shading: Wireframe";
						}
					}

					break;
				}
				case 51: // 3
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							this .setBrowserOption ("Shading", "FLAT");
							this .getNotification () .string_ = "Shading: Flat";
						}
					}

					break;
				}
				case 52: // 4
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							this .setBrowserOption ("Shading", "GOURAUD");
							this .getNotification () .string_ = "Shading: Gouraud";
						}
					}

					break;
				}
				case 53: // 5
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							this .setBrowserOption ("Shading", "PHONG");
							this .getNotification () .string_ = "Shading: Phong";
						}
					}

					break;
				}
				case 83: // s
				{
					if (this .getDebug ())
					{
						if (this .getControlKey ())
						{
							if (this .isLive () .getValue ())
								this .endUpdate ();
							else
								this .beginUpdate ();
							
							this .getNotification () .string_ = this .isLive () .getValue () ? "Begin Update" : "End Update";
						}
					}

					break;
				}
				case 225: // Alt Gr
				{
					this .altGrKey_ = true;
					break;
				}
				case 171: // Plus // Firefox
				case 187: // Plus // Opera
				{
					if (this .getControlKey ())
						this .getBrowserTimings () .setEnabled (! this .getBrowserTimings () .getEnabled ());
					break;
				}
				case 36: // Pos 1
				{
					this .firstViewpoint ();
					break;
				}
				case 35: // End
				{
					this .lastViewpoint ();
					break;
				}
				case 33: // Page Up
				{
					this .previousViewpoint ();
					break;
				}
				case 34: // Page Down
				{
					this .nextViewpoint ();
					break;
				}
			}
		},
		keyup: function (event)
		{
			//console .log (event .which);

			event .preventDefault ();
			event .stopImmediatePropagation ();

			if (this .keyDeviceSensorNode)
			   this .keyDeviceSensorNode .keyup (event);

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
				case 225: // Alt Gr
				{
					this .altGrKey_ = false;
					break;
				}
			}
		},
	};

	return X3DKeyDeviceSensorContext;
});
