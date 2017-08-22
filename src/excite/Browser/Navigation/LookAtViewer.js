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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"cobweb/Browser/Navigation/X3DViewer",
	"lib/gettext",
	"jquery-mousewheel",
],
function ($, X3DViewer, _)
{
"use strict";

	function LookAtViewer (executionContext)
	{
		X3DViewer .call (this, executionContext);

		this .button = -1;
	}

	LookAtViewer .prototype = $.extend (Object .create (X3DViewer .prototype),
	{
		constructor: LookAtViewer,
		initialize: function ()
		{
			X3DViewer .prototype .initialize .call (this);

			var
			   browser = this .getBrowser (),
			   canvas  = browser .getCanvas ();

			canvas .bind ("mousedown.LookAtViewer",  this .mousedown  .bind (this));
			canvas .bind ("mouseup.LookAtViewer",    this .mouseup    .bind (this));
		},
		mousedown: function (event)
		{
			if (this .button >= 0)
				return;
		
			this .pressTime = performance .now ();

			switch (event .button)
			{
				case 0:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .button = event .button;
					
					$(document) .bind ("mouseup.LookAtViewer" + this .getId (), this .mouseup .bind (this));

					this .getActiveViewpoint () .transitionStop ();
					break;
				}
			}
		},
		mouseup: function (event)
		{
			if (event .button !== this .button)
				return;

			this .button = -1;
		
			$(document) .unbind (".LookAtViewer" + this .getId ());

			var
				offset = this .getBrowser () .getCanvas () .offset (), 
				x      = event .pageX - offset .left,
				y      = this .getBrowser () .getCanvas () .height () - (event .pageY - offset .top);

			switch (event .button)
			{
				case 0:
				{
					// Stop event propagation.

					event .preventDefault ();
					event .stopImmediatePropagation ();

					this .lookAt (x, y, true);
					break;
				}
			}
		},
		dispose: function ()
		{
			this .getBrowser () .getCanvas () .unbind (".LookAtViewer");
			$(document) .unbind (".LookAtViewer" + this .getId ());
		},
	});

	return LookAtViewer;
});
