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
	"x_ite/Components/Interpolation/X3DInterpolatorNode",
	"x_ite/Browser/Interpolation/CatmullRomSplineInterpolator3",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInterpolatorNode, 
          CatmullRomSplineInterpolator3,
          X3DConstants)
{
"use strict";

	function SplinePositionInterpolator (executionContext)
	{
		X3DInterpolatorNode .call (this, executionContext);

		this .addType (X3DConstants .SplinePositionInterpolator);

		this .spline = new CatmullRomSplineInterpolator3 ();
	}

	SplinePositionInterpolator .prototype = Object .assign (Object .create (X3DInterpolatorNode .prototype),
	{
		constructor: SplinePositionInterpolator,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",      new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "closed",            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "key",               new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",          new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "keyVelocity",       new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "normalizeVelocity", new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed",     new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "SplinePositionInterpolator";
		},
		getComponentName: function ()
		{
			return "Interpolation";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DInterpolatorNode .prototype .initialize .call (this);
		
			this .keyValue_          .addInterest ("set_keyValue__",          this);
			this .keyVelocity_       .addInterest ("set_keyVelocity__",       this);
			this .normalizeVelocity_ .addInterest ("set_normalizeVelocity__", this);
		},
		set_keyValue__: function ()
		{
			var
				key      = this .key_,
				keyValue = this .keyValue_;

			if (keyValue .length < key .length)
				keyValue .resize (key .length, keyValue .length ? keyValue [keyValue .length - 1] : new Fields .SFVec3f ());
		
			this .set_keyVelocity__ ();
		},
		set_keyVelocity__: function ()
		{
			if (this .keyVelocity_ .length)
			{
				if (this .keyVelocity_ .length < this .key_ .length)
					this .keyVelocity_ .resize (this .key_ .length, new Fields .SFVec3f ());
			}

			this .set_normalizeVelocity__ ();
		},
		set_normalizeVelocity__: function ()
		{
			this .spline .generate (this .closed_ .getValue (),
			                        this .key_,
			                        this .keyValue_,
			                        this .keyVelocity_,
			                        this .normalizeVelocity_ .getValue ());
		},
		interpolate: function (index0, index1, weight)
		{
			this .value_changed_ = this .spline .interpolate (index0, index1, weight, this .keyValue_);
		},
	});

	return SplinePositionInterpolator;
});


