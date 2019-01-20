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


require ([
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Components/NURBS/Contour2D",
	"x_ite/Components/NURBS/ContourPolyline2D",
	"x_ite/Components/NURBS/CoordinateDouble",
	"x_ite/Components/NURBS/NurbsCurve",
	"x_ite/Components/NURBS/NurbsCurve2D",
	"x_ite/Components/NURBS/NurbsOrientationInterpolator",
	"x_ite/Components/NURBS/NurbsPatchSurface",
	"x_ite/Components/NURBS/NurbsPositionInterpolator",
	"x_ite/Components/NURBS/NurbsSet",
	"x_ite/Components/NURBS/NurbsSurfaceInterpolator",
	"x_ite/Components/NURBS/NurbsSweptSurface",
	"x_ite/Components/NURBS/NurbsSwungSurface",
	"x_ite/Components/NURBS/NurbsTextureCoordinate",
	"x_ite/Components/NURBS/NurbsTrimmedSurface",
],
function (SupportedNodes,
          Contour2D,
          ContourPolyline2D,
          CoordinateDouble,
          NurbsCurve,
          NurbsCurve2D,
          NurbsOrientationInterpolator,
          NurbsPatchSurface,
          NurbsPositionInterpolator,
          NurbsSet,
          NurbsSurfaceInterpolator,
          NurbsSweptSurface,
          NurbsSwungSurface,
          NurbsTextureCoordinate,
          NurbsTrimmedSurface)
{
"use strict";

	var NURBS =
	{
		Contour2D:                    Contour2D,
		ContourPolyline2D:            ContourPolyline2D,
		CoordinateDouble:             CoordinateDouble,
		NurbsCurve:                   NurbsCurve,
		NurbsCurve2D:                 NurbsCurve2D,
		NurbsOrientationInterpolator: NurbsOrientationInterpolator,
		NurbsPatchSurface:            NurbsPatchSurface,
		NurbsPositionInterpolator:    NurbsPositionInterpolator,
		NurbsSet:                     NurbsSet,
		NurbsSurfaceInterpolator:     NurbsSurfaceInterpolator,
		NurbsSweptSurface:            NurbsSweptSurface,
		NurbsSwungSurface:            NurbsSwungSurface,
		NurbsTextureCoordinate:       NurbsTextureCoordinate,
		NurbsTrimmedSurface:          NurbsTrimmedSurface,
	};

	for (var typeName in NURBS)
		SupportedNodes .addType (typeName, NURBS [typeName]); 

	return NURBS;
});

