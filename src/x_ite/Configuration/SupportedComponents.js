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

import ComponentInfoArray from "./ComponentInfoArray.js";

const SupportedComponents = new ComponentInfoArray ([ ]);

SupportedComponents .add ("Annotation",
{
   title: "Annotation",
   level: 2,
   external: true,
});

SupportedComponents .add ("CADGeometry",
{
   title: "CAD geometry",
   level: 2,
   external: true,
});

SupportedComponents .add ("Core",
{
   title: "Core",
   level: 2,
});

SupportedComponents .add ("CubeMapTexturing",
{
   title: "Cube map environmental texturing",
   level: 3,
   external: true,
});

SupportedComponents .add ("DIS",
{
   title: "Distributed interactive simulation",
   level: 2,
   external: true,
});

SupportedComponents .add ("EnvironmentalEffects",
{
   title: "Environmental effects",
   level: 4,
});

SupportedComponents .add ("EnvironmentalSensor",
{
   title: "Environmental sensor",
   level: 3,
});

SupportedComponents .add ("EventUtilities",
{
   title: "Event utilities",
   level: 1,
   external: true,
});

SupportedComponents .add ("Followers",
{
   title: "Followers",
   level: 1,
});

SupportedComponents .add ("Geometry2D",
{
   title: "Geometry2D",
   level: 2,
   external: true,
});

SupportedComponents .add ("Geometry3D",
{
   title: "Geometry3D",
   level: 4,
});

SupportedComponents .add ("Geospatial",
{
   title: "Geospatial",
   level: 2,
   external: true,
});

SupportedComponents .add ("Grouping",
{
   title: "Grouping",
   level: 3,
});

SupportedComponents .add ("HAnim",
{
   title: "Humanoid animation (HAnim)",
   level: 3,
   external: true,
});

SupportedComponents .alias ("H-Anim", SupportedComponents .get ("HAnim"));

SupportedComponents .add ("Interpolation",
{
   title: "Interpolation",
   level: 5,
});

SupportedComponents .add ("KeyDeviceSensor",
{
   title: "Key device sensor",
   level: 2,
   external: true,
});

SupportedComponents .add ("Layering",
{
   title: "Layering",
   level: 1,
});

SupportedComponents .add ("Layout",
{
   title: "Layout",
   level: 2,
   external: true,
   dependencies: ["Text"],
});

SupportedComponents .add ("Lighting",
{
   title: "Lighting",
   level: 3,
});

SupportedComponents .add ("Navigation",
{
   title: "Navigation",
   level: 3,
});

SupportedComponents .add ("Networking",
{
   title: "Networking",
   level: 4,
});

SupportedComponents .add ("NURBS",
{
   title: "NURBS",
   level: 4,
   external: true,
});

SupportedComponents .add ("ParticleSystems",
{
   title: "Particle systems",
   level: 3,
   external: true,
});

SupportedComponents .add ("Picking",
{
   title: "Picking",
   level: 3,
   external: true,
   dependencies: ["RigidBodyPhysics"],
});

SupportedComponents .add ("PointingDeviceSensor",
{
   title: "Pointing device sensor",
   level: 1,
});

SupportedComponents .add ("Shaders",
{
   title: "Programmable shaders",
   level: 1,
});

SupportedComponents .add ("TextureProjection",
{
   title: "Texture Projection",
   level: 2,
   external: true,
});

SupportedComponents .alias ("TextureProjector",         SupportedComponents .get ("TextureProjection"));
SupportedComponents .alias ("ProjectiveTextureMapping", SupportedComponents .get ("TextureProjection"));

SupportedComponents .add ("Rendering",
{
   title: "Rendering",
   level: 5,
});

SupportedComponents .add ("RigidBodyPhysics",
{
   title: "Rigid body physics",
   level: 2,
   external: true,
});

SupportedComponents .add ("Scripting",
{
   title: "Scripting",
   level: 1,
   external: true,
});

SupportedComponents .add ("Shape",
{
   title: "Shape",
   level: 4,
});

SupportedComponents .add ("Sound",
{
   title: "Sound",
   level: 3,
});

SupportedComponents .add ("Text",
{
   title: "Text",
   level: 1,
   external: true,
});

SupportedComponents .add ("Texturing",
{
   title: "Texturing",
   level: 4,
});

SupportedComponents .add ("Texturing3D",
{
   title: "Texturing3D",
   level: 2,
   external: true,
});

SupportedComponents .add ("Time",
{
   title: "Time",
   level: 2,
});

SupportedComponents .add ("VolumeRendering",
{
   title: "Volume rendering",
   level: 4,
   external: true,
   dependencies: ["CADGeometry", "Texturing3D"],
});

SupportedComponents .add ("WebXR",
{
   title: "WebXR",
   level: 1,
   external: true,
});

SupportedComponents .add ("X_ITE",
{
   title: "X_ITE",
   level: 1,
   external: true,
});

export default SupportedComponents;
