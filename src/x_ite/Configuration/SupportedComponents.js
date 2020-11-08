/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
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
	"x_ite/Configuration/ComponentInfoArray",
	"x_ite/Browser/Networking/urls",
],
function (ComponentInfoArray,
          urls)
{
"use strict";

	var SupportedComponents = new ComponentInfoArray ();

	SupportedComponents .addBaseComponent (
	{
		title:      "Annotation",
		name:       "Annotation",
		level:       2,
		providerUrl: urls .getProviderUrl ("annotation"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Computer-Aided Design (CAD) model geometry",
		name:       "CADGeometry",
		level:       2,
		providerUrl: urls .getProviderUrl ("cad-geometry"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Core",
		name:       "Core",
		level:       2,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Cube map environmental texturing",
		name:       "CubeMapTexturing",
		level:       3,
		providerUrl: urls .getProviderUrl ("cube-map-texturing"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Distributed interactive simulation (DIS)",
		name:       "DIS",
		level:       2,
		providerUrl: urls .getProviderUrl ("dis"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Environmental effects",
		name:       "EnvironmentalEffects",
		level:       4,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Environmental sensor",
		name:       "EnvironmentalSensor",
		level:       4,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Event utilities",
		name:       "EventUtilities",
		level:       4,
		providerUrl: urls .getProviderUrl ("event-utilities"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Followers",
		name:       "Followers",
		level:       4,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Geometry2D",
		name:       "Geometry2D",
		level:       2,
		providerUrl: urls .getProviderUrl ("geometry2d"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Geometry3D",
		name:       "Geometry3D",
		level:       4,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Geospatial",
		name:       "Geospatial",
		level:       2,
		providerUrl: urls .getProviderUrl ("geospatial"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Grouping",
		name:       "Grouping",
		level:       3,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Humanoid animation (HAnim)",
		name:       "HAnim",
		level:       3,
		providerUrl: urls .getProviderUrl ("h-anim"),
	});

	SupportedComponents .addAlias ("H-Anim", "HAnim");

	SupportedComponents .addBaseComponent (
	{
		title:      "Interpolation",
		name:       "Interpolation",
		level:       5,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Key device sensor",
		name:       "KeyDeviceSensor",
		level:       2,
		providerUrl: urls .getProviderUrl ("key-device-sensor"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Layering",
		name:       "Layering",
		level:       1,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Layout",
		name:       "Layout",
		level:       2,
		providerUrl: urls .getProviderUrl ("layout"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Lighting",
		name:       "Lighting",
		level:       3,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Navigation",
		name:       "Navigation",
		level:       3,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Networking",
		name:       "Networking",
		level:       4,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Non-uniform Rational B-Spline (NURBS)",
		name:       "NURBS",
		level:       4,
		providerUrl: urls .getProviderUrl ("nurbs"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Particle systems",
		name:       "ParticleSystems",
		level:       3,
		providerUrl: urls .getProviderUrl ("particle-systems"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Picking sensor",
		name:       "Picking",
		level:       3,
		providerUrl: urls .getProviderUrl ("picking"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Pointing device sensor",
		name:       "PointingDeviceSensor",
		level:       1,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Projective Texture Mapping",
		name:       "ProjectiveTextureMapping",
		level:       2,
		providerUrl: urls .getProviderUrl ("projective-texture-mapping"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Programmable shaders",
		name:       "Shaders",
		level:       1,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Rendering",
		name:       "Rendering",
		level:       5,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Rigid body physics",
		name:       "RigidBodyPhysics",
		level:       5,
		providerUrl: urls .getProviderUrl ("rigid-body-physics"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Scripting",
		name:       "Scripting",
		level:       1,
		providerUrl: urls .getProviderUrl ("scripting"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Shape",
		name:       "Shape",
		level:       5,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Sound",
		name:       "Sound",
		level:       1,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Text",
		name:       "Text",
		level:       1,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Texturing",
		name:       "Texturing",
		level:       3,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Texturing3D",
		name:       "Texturing3D",
		level:       3,
		providerUrl: urls .getProviderUrl ("texturing-3d"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Time",
		name:       "Time",
		level:       2,
		providerUrl: urls .getProviderUrl (),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "Volume rendering",
		name:       "VolumeRendering",
		level:       2,
		providerUrl: urls .getProviderUrl ("volume-rendering"),
	});

	SupportedComponents .addBaseComponent (
	{
		title:      "X_ITE",
		name:       "X_ITE",
		level:       1,
		providerUrl: urls .getProviderUrl ("x_ite"),
	});

	return SupportedComponents;
});
