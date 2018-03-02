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
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Browser/PointingDeviceSensor/PointingDeviceSensorContainer",
	"x_ite/Bits/X3DConstants",
],
function (X3DSensorNode,
          PointingDeviceSensorContainer,
          X3DConstants)
{
"use strict";

	function X3DPointingDeviceSensorNode (executionContext)
	{
		X3DSensorNode .call (this, executionContext);

		this .addType (X3DConstants .X3DPointingDeviceSensorNode);
	}

	X3DPointingDeviceSensorNode .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
	{
		constructor: X3DPointingDeviceSensorNode,
		initialize: function ()
		{
			X3DSensorNode .prototype .initialize .call (this);

			this .enabled_ .addInterest ("set_enabled__", this);
		},
		getMatrices: function ()
		{
			return this .matrices;
		},
		set_enabled__: function ()
		{
			if (this .enabled_ .getValue ())
				return;

			if (this .isActive_ .getValue ())
				this .isActive_ = false;

			if (this .isOver_ .getValue ())
				this .isOver_ = false;
		},
		set_over__: function (over, hit)
		{
			if (over !== this .isOver_ .getValue ())
			{
				this .isOver_ = over;

				if (this .isOver_ .getValue ())
					this .getBrowser () .getNotification () .string_ = this .description_;
			}
		},
		set_active__: function (active, hit)
		{
			if (active !== this .isActive_ .getValue ())
				this .isActive_ = active
		},
		set_motion__: function (hit)
		{ },
		push: function (renderObject, sensors)
		{
			if (this .enabled_ .getValue ())
			{
				sensors [this .getId ()] = new PointingDeviceSensorContainer (this,
				                                                              renderObject .getModelViewMatrix  () .get (),
				                                                              renderObject .getProjectionMatrix () .get (),
				                                                              renderObject .getViewVolume () .getViewport ());
			}
		},
	});

	return X3DPointingDeviceSensorNode;
});


