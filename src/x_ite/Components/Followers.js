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

import ColorChaser       from "./Followers/ColorChaser.js";
import ColorDamper       from "./Followers/ColorDamper.js";
import CoordinateChaser  from "./Followers/CoordinateChaser.js";
import CoordinateDamper  from "./Followers/CoordinateDamper.js";
import OrientationChaser from "./Followers/OrientationChaser.js";
import OrientationDamper from "./Followers/OrientationDamper.js";
import PositionChaser    from "./Followers/PositionChaser.js";
import PositionChaser2D  from "./Followers/PositionChaser2D.js";
import PositionDamper    from "./Followers/PositionDamper.js";
import PositionDamper2D  from "./Followers/PositionDamper2D.js";
import ScalarChaser      from "./Followers/ScalarChaser.js";
import ScalarDamper      from "./Followers/ScalarDamper.js";
import TexCoordChaser2D  from "./Followers/TexCoordChaser2D.js";
import TexCoordDamper2D  from "./Followers/TexCoordDamper2D.js";
import X3DChaserNode     from "./Followers/X3DChaserNode.js";
import X3DDamperNode     from "./Followers/X3DDamperNode.js";
import X3DFollowerNode   from "./Followers/X3DFollowerNode.js";

export default {
   name: "Followers",
   concreteNodes:
   [
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
   ],
   abstractNodes:
   [
      X3DChaserNode,
      X3DDamperNode,
      X3DFollowerNode,
   ],
};
