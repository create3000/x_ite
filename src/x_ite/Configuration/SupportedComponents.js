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

SupportedComponents .addComponent (
{
   title: "Annotation",
   name: "Annotation",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "CAD geometry",
   name: "CADGeometry",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Core",
   name: "Core",
   level: 2,
});

SupportedComponents .addComponent (
{
   title: "Cube map environmental texturing",
   name: "CubeMapTexturing",
   level: 3,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Distributed interactive simulation",
   name: "DIS",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Environmental effects",
   name: "EnvironmentalEffects",
   level: 4,
});

SupportedComponents .addComponent (
{
   title: "Environmental sensor",
   name: "EnvironmentalSensor",
   level: 3,
});

SupportedComponents .addComponent (
{
   title: "Event utilities",
   name: "EventUtilities",
   level: 1,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Followers",
   name: "Followers",
   level: 1,
});

SupportedComponents .addComponent (
{
   title: "Geometry2D",
   name: "Geometry2D",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Geometry3D",
   name: "Geometry3D",
   level: 4,
});

SupportedComponents .addComponent (
{
   title: "Geospatial",
   name: "Geospatial",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Grouping",
   name: "Grouping",
   level: 3,
});

SupportedComponents .addComponent (
{
   title: "Humanoid animation (HAnim)",
   name: "HAnim",
   level: 3,
   external: true,
});

SupportedComponents .addAlias ("H-Anim", "HAnim");

SupportedComponents .addComponent (
{
   title: "Interpolation",
   name: "Interpolation",
   level: 5,
});

SupportedComponents .addComponent (
{
   title: "Key device sensor",
   name: "KeyDeviceSensor",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Layering",
   name: "Layering",
   level: 1,
});

SupportedComponents .addComponent (
{
   title: "Layout",
   name: "Layout",
   level: 2,
   external: true,
   dependencies: ["Text"],
});

SupportedComponents .addComponent (
{
   title: "Lighting",
   name: "Lighting",
   level: 3,
});

SupportedComponents .addComponent (
{
   title: "Navigation",
   name: "Navigation",
   level: 3,
});

SupportedComponents .addComponent (
{
   title: "Networking",
   name: "Networking",
   level: 4,
});

SupportedComponents .addComponent (
{
   title: "NURBS",
   name: "NURBS",
   level: 4,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Particle systems",
   name: "ParticleSystems",
   level: 3,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Picking",
   name: "Picking",
   level: 3,
   external: true,
   dependencies: ["RigidBodyPhysics"],
});

SupportedComponents .addComponent (
{
   title: "Pointing device sensor",
   name: "PointingDeviceSensor",
   level: 1,
});

SupportedComponents .addComponent (
{
   title: "Programmable shaders",
   name: "Shaders",
   level: 1,
});

SupportedComponents .addComponent (
{
   title: "Texture Projector",
   name: "TextureProjector",
   level: 2,
   external: true,
});

SupportedComponents .addAlias ("ProjectiveTextureMapping", "TextureProjector");

SupportedComponents .addComponent (
{
   title: "Rendering",
   name: "Rendering",
   level: 5,
});

SupportedComponents .addComponent (
{
   title: "Rigid body physics",
   name: "RigidBodyPhysics",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Scripting",
   name: "Scripting",
   level: 1,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Shape",
   name: "Shape",
   level: 4,
});

SupportedComponents .addComponent (
{
   title: "Sound",
   name: "Sound",
   level: 3,
});

SupportedComponents .addComponent (
{
   title: "Text",
   name: "Text",
   level: 1,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Texturing",
   name: "Texturing",
   level: 4,
});

SupportedComponents .addComponent (
{
   title: "Texturing3D",
   name: "Texturing3D",
   level: 2,
   external: true,
});

SupportedComponents .addComponent (
{
   title: "Time",
   name: "Time",
   level: 2,
});

SupportedComponents .addComponent (
{
   title: "Volume rendering",
   name: "VolumeRendering",
   level: 4,
   external: true,
   dependencies: ["CADGeometry", "Texturing3D"],
});

SupportedComponents .addComponent (
{
   title: "X_ITE",
   name: "X_ITE",
   level: 1,
   external: true,
});

export default SupportedComponents;
