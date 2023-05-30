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

import X3DBrowserContext    from "./Browser/X3DBrowserContext.js";
import SupportedNodes       from "./Configuration/SupportedNodes.js";
import Core                 from "./Components/Core.js";
import EnvironmentalEffects from "./Components/EnvironmentalEffects.js";
import EnvironmentalSensor  from "./Components/EnvironmentalSensor.js";
import Followers            from "./Components/Followers.js";
import Geometry3D           from "./Components/Geometry3D.js";
import Grouping             from "./Components/Grouping.js";
import Interpolation        from "./Components/Interpolation.js";
import Layering             from "./Components/Layering.js";
import Lighting             from "./Components/Lighting.js";
import Navigation           from "./Components/Navigation.js";
import Networking           from "./Components/Networking.js";
import PointingDeviceSensor from "./Components/PointingDeviceSensor.js";
import Rendering            from "./Components/Rendering.js";
import Shaders              from "./Components/Shaders.js";
import Shape                from "./Components/Shape.js";
import Sound                from "./Components/Sound.js";
import Texturing            from "./Components/Texturing.js";
import Time                 from "./Components/Time.js";
import DEBUG                from "./DEBUG.js";

class Components
{
   static addComponent ({ name, types, abstractTypes, browserContext })
   {
      if (types)
      {
         for (const [typeName, type] of Object .entries (types))
            SupportedNodes .addNodeType (typeName, type);
      }

      if (abstractTypes)
      {
         for (const [typeName, type] of Object .entries (abstractTypes))
            SupportedNodes .addAbstractNodeType (typeName, type);
      }

      if (browserContext)
         X3DBrowserContext .addBrowserContext (browserContext);

      if (DEBUG)
         console .info (`Done loading external component '${name}'.`);
   }
}

export default Components;
