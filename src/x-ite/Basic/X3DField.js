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
 * This file is part of the X-ITE Project.
 *
 * X-ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X-ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X-ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x-ite/Base/X3DChildObject",
	"x-ite/Bits/X3DConstants",
	"x-ite/Base/Events",
],
function ($,
	       X3DChildObject,
	       X3DConstants,
	       Events)
{
"use strict";

	function X3DField (value)
	{
		X3DChildObject .call (this);
	
		this ._value = value;

		return this;
	}

	X3DField .prototype = $.extend (Object .create (X3DChildObject .prototype),
	{
		constructor: X3DField,
		_value: null,
		_references: { },
		_fieldInterests: { },
		_fieldCallbacks: { },
		_inputRoutes: { },
		_outputRoutes: { },
		_accessType: X3DConstants .initializeOnly,
		_set: false,
		_uniformLocation: null,
		clone: function ()
		{
			return this .copy ();
		},
		equals: function (value)
		{
			return this ._value === value .valueOf ();
		},
		setValue: function (value)
		{
			this .set (value instanceof this .constructor ? value .getValue () : value);
			this .addEvent ();
		},
		set: function (value)
		{
			this ._value = value;
		},
		getValue: function ()
		{
			return this ._value;
		},
		setAccessType: function (value)
		{
			this ._accessType = value;
		},
		getAccessType: function ()
		{
			return this ._accessType;
		},
		isInitializable: function ()
		{
			return this .getAccessType () & X3DConstants .initializeOnly;
		},
		isInput: function ()
		{
			return this .getAccessType () & X3DConstants .inputOnly;
		},
		isOutput: function ()
		{
			return this .getAccessType () & X3DConstants .outputOnly;
		},
		isReadable: function ()
		{
			return this .getAccessType () !== X3DConstants .inputOnly;
		},
		isWritable: function ()
		{
			return this .getAccessType () !== X3DConstants .initializeOnly;
		},
		setSet: function (value)
		{
			// Boolean indication whether the value is set during parse, or undefined.
			return this ._set = value;
		},
		getSet: function ()
		{
			return this ._set;
		},
		hasReferences: function ()
		{
			if (this .hasOwnProperty ("_references"))
				return ! $.isEmptyObject (this ._references);

			return false;
		},
		isReference: function (accessType)
		{
			return accessType === this .getAccessType () || accessType === X3DConstants .inputOutput;
		},
		addReference: function (reference)
		{
			var references = this .getReferences ();

			if (references [reference .getId ()])
				return;

			references [reference .getId ()] = reference;

			// Create IS relationship

			switch (this .getAccessType () & reference .getAccessType ())
			{
				case X3DConstants .initializeOnly:
					this .set (reference .getValue ());
					return;
				case X3DConstants .inputOnly:
					reference .addFieldInterest (this);
					return;
				case X3DConstants .outputOnly:
					this .addFieldInterest (reference);
					return;
				case X3DConstants .inputOutput:
					reference .addFieldInterest (this);
					this .addFieldInterest (reference);
					this .set (reference .getValue ());
					return;
			}
		},
		getReferences: function ()
		{
			if (! this .hasOwnProperty ("_references"))
				this ._references = { };

			return this ._references;
		},
		updateReferences: function ()
		{
			if (this .hasOwnProperty ("_references"))
			{
				for (var id in this ._references)
				{
					var reference = this ._references [id];

					switch (this .getAccessType () & reference .getAccessType ())
					{
						case X3DConstants .inputOnly:
						case X3DConstants .outputOnly:
							continue;
						case X3DConstants .initializeOnly:
						case X3DConstants .inputOutput:
							this .set (reference .getValue ());
							continue;
					}
				}
			}
		},
		addFieldInterest: function (field)
		{
			if (! this .hasOwnProperty ("_fieldInterests"))
				this ._fieldInterests = { };

			this ._fieldInterests [field .getId ()] = field;
		},
		removeFieldInterest: function (field)
		{
			delete this ._fieldInterests [field .getId ()];
		},
		getFieldInterests: function ()
		{
			return this ._fieldInterests;
		},
		addFieldCallback: function (string, object)
		{
			if (! this .hasOwnProperty ("_fieldCallbacks"))
				this ._fieldCallbacks = { };

			this ._fieldCallbacks [string] = object;
		},
		removeFieldCallback: function (string)
		{
			delete this ._fieldCallbacks [string];
		},
		getFieldCallbacks: function ()
		{
			return this ._fieldCallbacks;
		},
		addOutputRoute: function (route)
		{
			if (! this .hasOwnProperty ("_outputRoutes"))
				this ._outputRoutes = { };

			this ._outputRoutes [route .getId ()] = route;
		},
		removeOutputRoute: function (route)
		{
			delete this ._outputRoutes [route .getId ()];
		},
		getOutputRoutes: function ()
		{
			return this ._outputRoutes;
		},
		addInputRoute: function (route)
		{
			if (! this .hasOwnProperty ("_inputRoutes"))
				this ._inputRoutes = { };

			this ._inputRoutes [route .getId ()] = route;
		},
		removeInputRoute: function (route)
		{
			delete this ._inputRoutes [route .getId ()];
		},
		getInputRoutes: function ()
		{
			return this ._inputRoutes;
		},
		processEvent: function (event)
		{
			if (event .sources [this .getId ()])
				return;

			event .sources [this .getId ()] = true;

			this .setTainted (false);

			if (event .field !== this)
				this .set (event .field .getValue ());

			// Process interests

			this .processInterests ();

			// Process routes

			var
				fieldInterests = this ._fieldInterests,
				first          = true;

			for (var key in fieldInterests)
			{
				if (first)
				{
					first = false;
					fieldInterests [key] .addEventObject (this, event);
				}
				else
					fieldInterests [key] .addEventObject (this, Events .copy (event));
			}

			if (first)
			   Events .push (event);

			// Process field callbacks

			var fieldCallbacks = this ._fieldCallbacks;

			for (var key in fieldCallbacks)
				fieldCallbacks [key] (this .valueOf ());
		},
		valueOf: function ()
		{
			return this;
		},
	});

	return X3DField;
});
