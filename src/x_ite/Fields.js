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
	"x_ite/Fields/SFBool",
	"x_ite/Fields/SFColor",
	"x_ite/Fields/SFColorRGBA",
	"x_ite/Fields/SFDouble",
	"x_ite/Fields/SFFloat",
	"x_ite/Fields/SFImage",
	"x_ite/Fields/SFInt32",
	"x_ite/Fields/SFMatrix3",
	"x_ite/Fields/SFMatrix4",
	"x_ite/Fields/SFNode",
	"x_ite/Fields/SFRotation",
	"x_ite/Fields/SFString",
	"x_ite/Fields/SFTime",
	"x_ite/Fields/SFVec2",
	"x_ite/Fields/SFVec3",
	"x_ite/Fields/SFVec4",
	"x_ite/Fields/ArrayFields",
],
function (SFBool,
          SFColor,
          SFColorRGBA,
          SFDouble,
          SFFloat,
          SFImage,
          SFInt32,
          SFMatrix3,
          SFMatrix4,
          SFNode,
          SFRotation,
          SFString,
          SFTime,
          SFVec2,
          SFVec3,
          SFVec4,
          ArrayFields)
{
"use strict";

	var Fields = Object .assign (
	{
		SFBool:      SFBool,
		SFColor:     SFColor,
		SFColorRGBA: SFColorRGBA,
		SFDouble:    SFDouble,
		SFFloat:     SFFloat,
		SFImage:     SFImage,
		SFInt32:     SFInt32,
		SFMatrix3d:  SFMatrix3 .SFMatrix3d,
		SFMatrix3f:  SFMatrix3 .SFMatrix3f,
		SFMatrix4d:  SFMatrix4 .SFMatrix4d,
		SFMatrix4f:  SFMatrix4 .SFMatrix4f,
		SFNode:      SFNode,
		SFRotation:  SFRotation,
		SFString:    SFString,
		SFTime:      SFTime,
		SFVec2d:     SFVec2 .SFVec2d,
		SFVec2f:     SFVec2 .SFVec2f,
		SFVec3d:     SFVec3 .SFVec3d,
		SFVec3f:     SFVec3 .SFVec3f,
		SFVec4d:     SFVec4 .SFVec4d,
		SFVec4f:     SFVec4 .SFVec4f,
		VrmlMatrix:  SFMatrix4 .VrmlMatrix,
	},
	ArrayFields);

	Object .preventExtensions (Fields);
	Object .freeze (Fields);
	Object .seal (Fields);

	return Fields;
});