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

const SupportedProfiles = new ProfileInfoArray ();

SupportedProfiles .add ("CADInterchange",
{
   title: "Computer-Aided Design (CAD) interchange",
   components: [
      SupportedComponents .get ("CADGeometry"),
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Shaders"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Texturing"),
   ],
});

SupportedProfiles .add ("Core",
{
   title: "Core",
   components: [
      SupportedComponents .get ("Core"),
   ],
});

SupportedProfiles .add ("Full",
{
   title: "Full",
   components: [
      //SupportedComponents .get ("Annotation"),
      SupportedComponents .get ("CADGeometry"),
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("CubeMapTexturing"),
      SupportedComponents .get ("DIS"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("EnvironmentalSensor"),
      SupportedComponents .get ("EventUtilities"),
      SupportedComponents .get ("Followers"),
      SupportedComponents .get ("Geometry2D"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Geospatial"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("HAnim"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("KeyDeviceSensor"),
      SupportedComponents .get ("Layering"),
      SupportedComponents .get ("Layout"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("NURBS"),
      SupportedComponents .get ("ParticleSystems"),
      SupportedComponents .get ("Picking"),
      SupportedComponents .get ("PointingDeviceSensor"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("RigidBodyPhysics"),
      SupportedComponents .get ("Scripting"),
      SupportedComponents .get ("Shaders"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Sound"),
      SupportedComponents .get ("Text"),
      SupportedComponents .get ("TextureProjection"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Texturing3D"),
      SupportedComponents .get ("Time"),
      SupportedComponents .get ("VolumeRendering"),
   ],
});

SupportedProfiles .add ("Immersive",
{
   title: "Immersive",
   components: [
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("EnvironmentalSensor"),
      SupportedComponents .get ("EventUtilities"),
      SupportedComponents .get ("Geometry2D"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("KeyDeviceSensor"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("PointingDeviceSensor"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Scripting"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Sound"),
      SupportedComponents .get ("Text"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Time"),
   ],
});

SupportedProfiles .add ("Interactive",
{
   title: "Interactive",
   components: [
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("EnvironmentalSensor"),
      SupportedComponents .get ("EventUtilities"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("KeyDeviceSensor"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("PointingDeviceSensor"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Time"),
   ],
});

SupportedProfiles .add ("Interchange",
{
   title: "Interchange",
   components: [
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Time"),
   ],
});

SupportedProfiles .add ("MedicalInterchange",
{
   title: "Medical interchange",
   components: [
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("EventUtilities"),
      SupportedComponents .get ("Geometry2D"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Text"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Texturing3D"),
      SupportedComponents .get ("Time"),
      SupportedComponents .get ("VolumeRendering"),
   ],
});

SupportedProfiles .add ("MPEG-4",
{
   title: "MPEG-4 interactive",
   components: [
      SupportedComponents .get ("Core"),
      SupportedComponents .get ("EnvironmentalEffects"),
      SupportedComponents .get ("EnvironmentalSensor"),
      SupportedComponents .get ("Geometry3D"),
      SupportedComponents .get ("Grouping"),
      SupportedComponents .get ("Interpolation"),
      SupportedComponents .get ("Lighting"),
      SupportedComponents .get ("Navigation"),
      SupportedComponents .get ("Networking"),
      SupportedComponents .get ("PointingDeviceSensor"),
      SupportedComponents .get ("Rendering"),
      SupportedComponents .get ("Shape"),
      SupportedComponents .get ("Texturing"),
      SupportedComponents .get ("Time"),
   ],
});

export default SupportedProfiles;
