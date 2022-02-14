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
   "x_ite/Components/Interpolation/ColorInterpolator",
   "x_ite/Components/Interpolation/CoordinateInterpolator",
   "x_ite/Components/Interpolation/CoordinateInterpolator2D",
   "x_ite/Components/Interpolation/EaseInEaseOut",
   "x_ite/Components/Interpolation/NormalInterpolator",
   "x_ite/Components/Interpolation/OrientationInterpolator",
   "x_ite/Components/Interpolation/PositionInterpolator",
   "x_ite/Components/Interpolation/PositionInterpolator2D",
   "x_ite/Components/Interpolation/ScalarInterpolator",
   "x_ite/Components/Interpolation/SplinePositionInterpolator",
   "x_ite/Components/Interpolation/SplinePositionInterpolator2D",
   "x_ite/Components/Interpolation/SplineScalarInterpolator",
   "x_ite/Components/Interpolation/SquadOrientationInterpolator",
   "x_ite/Components/Interpolation/X3DInterpolatorNode",
],
function (SupportedNodes,
          ColorInterpolator,
          CoordinateInterpolator,
          CoordinateInterpolator2D,
          EaseInEaseOut,
          NormalInterpolator,
          OrientationInterpolator,
          PositionInterpolator,
          PositionInterpolator2D,
          ScalarInterpolator,
          SplinePositionInterpolator,
          SplinePositionInterpolator2D,
          SplineScalarInterpolator,
          SquadOrientationInterpolator,
          X3DInterpolatorNode)
{
"use strict";

   const Types =
   {
      ColorInterpolator:            ColorInterpolator,
      CoordinateInterpolator:       CoordinateInterpolator,
      CoordinateInterpolator2D:     CoordinateInterpolator2D,
      EaseInEaseOut:                EaseInEaseOut,
      NormalInterpolator:           NormalInterpolator,
      OrientationInterpolator:      OrientationInterpolator,
      PositionInterpolator:         PositionInterpolator,
      PositionInterpolator2D:       PositionInterpolator2D,
      ScalarInterpolator:           ScalarInterpolator,
      SplinePositionInterpolator:   SplinePositionInterpolator,
      SplinePositionInterpolator2D: SplinePositionInterpolator2D,
      SplineScalarInterpolator:     SplineScalarInterpolator,
      SquadOrientationInterpolator: SquadOrientationInterpolator,
   };

   const AbstractTypes =
   {
      X3DInterpolatorNode: X3DInterpolatorNode,
   };

   for (const typeName in Types)
      SupportedNodes .addType (typeName, Types [typeName]);

   for (const typeName in AbstractTypes)
      SupportedNodes .addAbstractType (typeName, AbstractTypes [typeName]);
});
