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
	"x_ite/Basic/X3DField",
],
function (X3DField)
{
"use strict";

	return function (Matrix, SFVec)
	{
		return Object .assign (Object .create (X3DField .prototype),
		{
			copy: function ()
			{
				return new (this .constructor) (this .getValue () .copy ());
			},
			equals: function (matrix)
			{
				return this .getValue () .equals (matrix .getValue ());
			},
			isDefaultValue: function ()
			{
				return this .getValue () .equals (Matrix .Identity);
			},
			set: function (value)
			{
				this .getValue () .assign (value);
			},
			setTransform: function (translation, rotation, scale, scaleOrientation, center)
			{
				translation      = translation      ? translation      .getValue () : null;
				rotation         = rotation         ? rotation         .getValue () : null;
				scale            = scale            ? scale            .getValue () : null;
				scaleOrientation = scaleOrientation ? scaleOrientation .getValue () : null;
				center           = center           ? center           .getValue () : null;
	
				this .getValue () .set (translation, rotation, scale, scaleOrientation, center);
			},
			getTransform: function (translation, rotation, scale, scaleOrientation, center)
			{
				translation      = translation      ? translation      .getValue () : null;
				rotation         = rotation         ? rotation         .getValue () : null;
				scale            = scale            ? scale            .getValue () : null;
				scaleOrientation = scaleOrientation ? scaleOrientation .getValue () : null;
				center           = center           ? center           .getValue () : null;
	
				this .getValue () .get (translation, rotation, scale, scaleOrientation, center);
			},
			transpose: function ()
			{
				return new (this .constructor) (Matrix .transpose (this .getValue ()));
			},
			inverse: function ()
			{
				return new (this .constructor) (Matrix .inverse (this .getValue ()));
			},
			multLeft: function (matrix)
			{
				return new (this .constructor) (Matrix .multLeft (this .getValue (), matrix .getValue ()));
			},
			multRight: function (matrix)
			{
				return new (this .constructor) (Matrix .multRight (this .getValue (), matrix .getValue ()));
			},
			multVecMatrix: function (vector)
			{
				return new SFVec (this .getValue () .multVecMatrix (vector .getValue () .copy ()));
			},
			multMatrixVec: function (vector)
			{
				return new SFVec (this .getValue () .multMatrixVec (vector .getValue () .copy ()));
			},
			multDirMatrix: function (vector)
			{
				return new SFVec (this .getValue () .multDirMatrix (vector .getValue () .copy ()));
			},
			multMatrixDir: function (vector)
			{
				return new SFVec (this .getValue () .multMatrixDir (vector .getValue () .copy ()));
			},
			toStream: function (stream)
			{
				stream .string += this .getValue () .toString ();
			},
			toVRMLStream: function (stream)
			{
				this .toStream (stream);
			},
			toXMLStream: function (stream)
			{
				this .toStream (stream);
			},
		});
	};
});
