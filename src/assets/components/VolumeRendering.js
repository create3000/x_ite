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

import Components                         from "../../x_ite/Components.js";
import X3DVolumeRenderingContext          from "../../x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext.js";
import BlendedVolumeStyle                 from "../../x_ite/Components/VolumeRendering/BlendedVolumeStyle.js";
import BoundaryEnhancementVolumeStyle     from "../../x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle.js";
import CartoonVolumeStyle                 from "../../x_ite/Components/VolumeRendering/CartoonVolumeStyle.js";
import ComposedVolumeStyle                from "../../x_ite/Components/VolumeRendering/ComposedVolumeStyle.js";
import EdgeEnhancementVolumeStyle         from "../../x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle.js";
import IsoSurfaceVolumeData               from "../../x_ite/Components/VolumeRendering/IsoSurfaceVolumeData.js";
import OpacityMapVolumeStyle              from "../../x_ite/Components/VolumeRendering/OpacityMapVolumeStyle.js";
import ProjectionVolumeStyle              from "../../x_ite/Components/VolumeRendering/ProjectionVolumeStyle.js";
import SegmentedVolumeData                from "../../x_ite/Components/VolumeRendering/SegmentedVolumeData.js";
import ShadedVolumeStyle                  from "../../x_ite/Components/VolumeRendering/ShadedVolumeStyle.js";
import SilhouetteEnhancementVolumeStyle   from "../../x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle.js";
import ToneMappedVolumeStyle              from "../../x_ite/Components/VolumeRendering/ToneMappedVolumeStyle.js";
import VolumeData                         from "../../x_ite/Components/VolumeRendering/VolumeData.js";
import X3DComposableVolumeRenderStyleNode from "../../x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode.js";
import X3DVolumeDataNode                  from "../../x_ite/Components/VolumeRendering/X3DVolumeDataNode.js";
import X3DVolumeRenderStyleNode           from "../../x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode.js";

Components .add ({
   name: "VolumeRendering",
   concreteNodes:
   [
      BlendedVolumeStyle,
      BoundaryEnhancementVolumeStyle,
      CartoonVolumeStyle,
      ComposedVolumeStyle,
      EdgeEnhancementVolumeStyle,
      IsoSurfaceVolumeData,
      OpacityMapVolumeStyle,
      ProjectionVolumeStyle,
      SegmentedVolumeData,
      ShadedVolumeStyle,
      SilhouetteEnhancementVolumeStyle,
      ToneMappedVolumeStyle,
      VolumeData,
   ],
   abstractNodes:
   [
      X3DComposableVolumeRenderStyleNode,
      X3DVolumeDataNode,
      X3DVolumeRenderStyleNode,
   ],
   browserContext: X3DVolumeRenderingContext,
});

export default undefined;
