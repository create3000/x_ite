/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
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
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Components           from "../../x_ite/Components.js";
import X3DGeometry2DContext from "../../x_ite/Browser/Geometry2D/X3DGeometry2DContext.js";
import Arc2D                from "../../x_ite/Components/Geometry2D/Arc2D.js";
import ArcClose2D           from "../../x_ite/Components/Geometry2D/ArcClose2D.js";
import Circle2D             from "../../x_ite/Components/Geometry2D/Circle2D.js";
import Disk2D               from "../../x_ite/Components/Geometry2D/Disk2D.js";
import Polyline2D           from "../../x_ite/Components/Geometry2D/Polyline2D.js";
import Polypoint2D          from "../../x_ite/Components/Geometry2D/Polypoint2D.js";
import Rectangle2D          from "../../x_ite/Components/Geometry2D/Rectangle2D.js";
import TriangleSet2D        from "../../x_ite/Components/Geometry2D/TriangleSet2D.js";

Components .add ({
   name: "Geometry2D",
   concreteNodes:
   [
      Arc2D,
      ArcClose2D,
      Circle2D,
      Disk2D,
      Polyline2D,
      Polypoint2D,
      Rectangle2D,
      TriangleSet2D,
   ],
   abstractNodes:
   [
   ],
   browserContext: X3DGeometry2DContext,
});

export default undefined;
