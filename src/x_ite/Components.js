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

import CoreComponent                 from "./Components/CoreComponent.js";
import EnvironmentalEffectsComponent from "./Components/EnvironmentalEffectsComponent.js";
import EnvironmentalSensorComponent  from "./Components/EnvironmentalSensorComponent.js";
import FollowersComponent            from "./Components/FollowersComponent.js";
import Geometry3DComponent           from "./Components/Geometry3DComponent.js";
import GroupingComponent             from "./Components/GroupingComponent.js";
import InterpolationComponent        from "./Components/InterpolationComponent.js";
import LayeringComponent             from "./Components/LayeringComponent.js";
import LightingComponent             from "./Components/LightingComponent.js";
import NavigationComponent           from "./Components/NavigationComponent.js";
import NetworkingComponent           from "./Components/NetworkingComponent.js";
import PointingDeviceSensorComponent from "./Components/PointingDeviceSensorComponent.js";
import RenderingComponent            from "./Components/RenderingComponent.js";
import ShadersComponent              from "./Components/ShadersComponent.js";
import ShapeComponent                from "./Components/ShapeComponent.js";
import SoundComponent                from "./Components/SoundComponent.js";
import TexturingComponent            from "./Components/TexturingComponent.js";
import TimeComponent                 from "./Components/TimeComponent.js";
import X3DBrowserContext             from "./Browser/X3DBrowserContext.js";

let external = false;

const Components =
{
   add ({ name, concreteNodes, abstractNodes, browserContext })
   {
      X3DBrowserContext .addComponent ({ name, concreteNodes, abstractNodes, browserContext, external });
   },
};

Components .add (CoreComponent);
Components .add (EnvironmentalEffectsComponent);
Components .add (EnvironmentalSensorComponent);
Components .add (FollowersComponent);
Components .add (Geometry3DComponent);
Components .add (GroupingComponent);
Components .add (InterpolationComponent);
Components .add (LayeringComponent);
Components .add (LightingComponent);
Components .add (NavigationComponent);
Components .add (NetworkingComponent);
Components .add (PointingDeviceSensorComponent);
Components .add (RenderingComponent);
Components .add (ShadersComponent);
Components .add (ShapeComponent);
Components .add (SoundComponent);
Components .add (TexturingComponent);
Components .add (TimeComponent);

external = true;

export default Components;
