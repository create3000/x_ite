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


define ([
	"x_ite/Configuration/SupportedNodes",
	"x_ite/Components/Followers/ColorChaser",
	"x_ite/Components/Followers/ColorDamper",
	"x_ite/Components/Followers/CoordinateChaser",
	"x_ite/Components/Followers/CoordinateDamper",
	"x_ite/Components/Followers/OrientationChaser",
	"x_ite/Components/Followers/OrientationDamper",
	"x_ite/Components/Followers/PositionChaser",
	"x_ite/Components/Followers/PositionChaser2D",
	"x_ite/Components/Followers/PositionDamper",
	"x_ite/Components/Followers/PositionDamper2D",
	"x_ite/Components/Followers/ScalarChaser",
	"x_ite/Components/Followers/ScalarDamper",
	"x_ite/Components/Followers/TexCoordChaser2D",
	"x_ite/Components/Followers/TexCoordDamper2D",
	"x_ite/Components/Followers/X3DChaserNode",
	"x_ite/Components/Followers/X3DDamperNode",
	"x_ite/Components/Followers/X3DFollowerNode",
],
function (SupportedNodes,
          ColorChaser,
          ColorDamper,
          CoordinateChaser,
          CoordinateDamper,
          OrientationChaser,
          OrientationDamper,
          PositionChaser,
          PositionChaser2D,
          PositionDamper,
          PositionDamper2D,
          ScalarChaser,
          ScalarDamper,
          TexCoordChaser2D,
          TexCoordDamper2D,
          X3DChaserNode,
          X3DDamperNode,
          X3DFollowerNode)
{
"use strict";

	var Types =
	{
		ColorChaser:       ColorChaser,
		ColorDamper:       ColorDamper,
		CoordinateChaser:  CoordinateChaser,
		CoordinateDamper:  CoordinateDamper,
		OrientationChaser: OrientationChaser,
		OrientationDamper: OrientationDamper,
		PositionChaser:    PositionChaser,
		PositionChaser2D:  PositionChaser2D,
		PositionDamper:    PositionDamper,
		PositionDamper2D:  PositionDamper2D,
		ScalarChaser:      ScalarChaser,
		ScalarDamper:      ScalarDamper,
		TexCoordChaser2D:  TexCoordChaser2D,
		TexCoordDamper2D:  TexCoordDamper2D,
	};

	var AbstractTypes =
	{
		X3DChaserNode: X3DChaserNode,
		X3DDamperNode: X3DDamperNode,
		X3DFollowerNode: X3DFollowerNode,
	};
	
	for (var typeName in Types)
		SupportedNodes .addType (typeName, Types [typeName]); 

	for (var typeName in AbstractTypes)
		SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]); 
});

