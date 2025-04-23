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

import ProfileInfoArray    from "./ProfileInfoArray.js";
import SupportedComponents from "./SupportedComponents.js";
import ComponentInfo       from "./ComponentInfo.js";
import DEVELOPMENT         from "../DEVELOPMENT.js";

function getComponent (name, level = 0)
{
   const component = SupportedComponents .get (name);

   if (DEVELOPMENT)
   {
      if (level < 1 || level > component .level)
         throw new Error (`Component ${name} level ${level} exceeds maximum level ${component .level}.`);
   }

   return new ComponentInfo (component .name,
      level,
      component .title,
      component .providerURL,
      component .external,
      component .dependencies);
}

const SupportedProfiles = new ProfileInfoArray ();

SupportedProfiles .add ("CADInterchange",
{
   title: "Computer-Aided Design (CAD) interchange",
   components: [
      getComponent ("CADGeometry", 2),
      getComponent ("Core", 1),
      getComponent ("Grouping", 1),
      getComponent ("Lighting", 1),
      getComponent ("Navigation", 3),
      getComponent ("Networking", 2),
      getComponent ("Rendering", 4),
      getComponent ("Shaders", 1),
      getComponent ("Shape", 2),
      getComponent ("Texturing", 2),
   ],
});

SupportedProfiles .add ("Core",
{
   title: "Core",
   components: [
      getComponent ("Core", 1),
   ],
});

SupportedProfiles .add ("Full",
{
   title: "Full",
   components: [
      //getComponent ("Annotation", 1),
      getComponent ("CADGeometry", 2),
      getComponent ("Core", 2),
      getComponent ("CubeMapTexturing", 3),
      getComponent ("DIS", 2),
      getComponent ("EnvironmentalEffects", 4),
      getComponent ("EnvironmentalSensor", 3),
      getComponent ("EventUtilities", 1),
      getComponent ("Followers", 1),
      getComponent ("Geometry2D", 2),
      getComponent ("Geometry3D", 3),
      getComponent ("Geospatial", 2),
      getComponent ("Grouping", 3),
      getComponent ("HAnim", 3),
      getComponent ("Interpolation", 5),
      getComponent ("KeyDeviceSensor", 2),
      getComponent ("Layering", 1),
      getComponent ("Layout", 2),
      getComponent ("Lighting", 3),
      getComponent ("Navigation", 3),
      getComponent ("Networking", 4),
      getComponent ("NURBS", 4),
      getComponent ("ParticleSystems", 3),
      getComponent ("Picking", 3),
      getComponent ("PointingDeviceSensor", 1),
      getComponent ("Rendering", 5),
      getComponent ("RigidBodyPhysics", 2),
      getComponent ("Scripting", 1),
      getComponent ("Shaders", 1),
      getComponent ("Shape", 4),
      getComponent ("Sound", 3),
      getComponent ("Text", 1),
      getComponent ("TextureProjection", 2),
      getComponent ("Texturing", 4),
      getComponent ("Texturing3D", 2),
      getComponent ("Time", 2),
      getComponent ("VolumeRendering", 4),
   ],
});

SupportedProfiles .add ("Immersive",
{
   title: "Immersive",
   components: [
      getComponent ("Core", 2),
      getComponent ("EnvironmentalEffects", 2),
      getComponent ("EnvironmentalSensor", 2),
      getComponent ("EventUtilities", 1),
      getComponent ("Geometry2D", 2),
      getComponent ("Geometry3D", 3),
      getComponent ("Grouping", 2),
      getComponent ("Interpolation", 2),
      getComponent ("KeyDeviceSensor", 2),
      getComponent ("Lighting", 2),
      getComponent ("Navigation", 2),
      getComponent ("Networking", 3),
      getComponent ("PointingDeviceSensor", 1),
      getComponent ("Rendering", 3),
      getComponent ("Scripting", 1),
      getComponent ("Shape", 2),
      getComponent ("Sound", 1),
      getComponent ("Text", 1),
      getComponent ("Texturing", 3),
      getComponent ("Time", 1),
   ],
});

SupportedProfiles .add ("Interactive",
{
   title: "Interactive",
   components: [
      getComponent ("Core", 1),
      getComponent ("EnvironmentalEffects", 1),
      getComponent ("EnvironmentalSensor", 1),
      getComponent ("EventUtilities", 1),
      getComponent ("Geometry3D", 3),
      getComponent ("Grouping", 2),
      getComponent ("Interpolation", 2),
      getComponent ("KeyDeviceSensor", 1),
      getComponent ("Lighting", 2),
      getComponent ("Navigation", 1),
      getComponent ("Networking", 2),
      getComponent ("PointingDeviceSensor", 1),
      getComponent ("Rendering", 3),
      getComponent ("Shape", 1),
      getComponent ("Texturing", 2),
      getComponent ("Time", 1),
   ],
});

SupportedProfiles .add ("Interchange",
{
   title: "Interchange",
   components: [
      getComponent ("Core", 1),
      getComponent ("EnvironmentalEffects", 1),
      getComponent ("Geometry3D", 3),
      getComponent ("Grouping", 1),
      getComponent ("Interpolation", 2),
      getComponent ("Lighting", 1),
      getComponent ("Navigation", 1),
      getComponent ("Networking", 1),
      getComponent ("Rendering", 3),
      getComponent ("Shape", 1),
      getComponent ("Texturing", 2),
      getComponent ("Time", 1),
   ],
});

SupportedProfiles .add ("MedicalInterchange",
{
   title: "Medical interchange",
   components: [
      getComponent ("Core", 1),
      getComponent ("EnvironmentalEffects", 1),
      getComponent ("EventUtilities", 1),
      getComponent ("Geometry2D", 2),
      getComponent ("Geometry3D", 3),
      getComponent ("Grouping", 3),
      getComponent ("Interpolation", 2),
      getComponent ("Lighting", 1),
      getComponent ("Navigation", 3),
      getComponent ("Networking", 2),
      getComponent ("Rendering", 5),
      getComponent ("Shape", 3),
      getComponent ("Text", 1),
      getComponent ("Texturing", 2),
      getComponent ("Texturing3D", 2),
      getComponent ("Time", 1),
      getComponent ("VolumeRendering", 4),
   ],
});

SupportedProfiles .add ("MPEG-4",
{
   title: "MPEG-4 interactive",
   components: [
      getComponent ("Core", 1),
      getComponent ("EnvironmentalEffects", 1),
      getComponent ("EnvironmentalSensor", 1),
      getComponent ("Geometry3D", 3),
      getComponent ("Grouping", 2),
      getComponent ("Interpolation", 2),
      getComponent ("Lighting", 2),
      getComponent ("Navigation", 1),
      getComponent ("Networking", 2),
      getComponent ("PointingDeviceSensor", 1),
      getComponent ("Rendering", 1),
      getComponent ("Shape", 1),
      getComponent ("Texturing", 1),
      getComponent ("Time", 1),
   ],
});

export default SupportedProfiles;
