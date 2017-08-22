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
 * This file is part of the Excite Project.
 *
 * Excite is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Configuration/ComponentInfoArray",
	"excite/Browser/Networking/urls",
],
function ($, ComponentInfoArray, urls)
{
"use strict";

	return function (browser)
	{
		var supportedComponents = new ComponentInfoArray (browser);

		supportedComponents .addComponentInfo (
		{
			title:      "Computer-Aided Design (CAD) model geometry",
			name:       "CADGeometry",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Core",
			name:       "Core",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Cube map environmental texturing",
			name:       "CubeMapTexturing",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Distributed interactive simulation (DIS)",
			name:       "DIS",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Environmental effects",
			name:       "EnvironmentalEffects",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Environmental sensor",
			name:       "EnvironmentalSensor",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Event utilities",
			name:       "EventUtilities",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Followers",
			name:       "Followers",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Geometry2D",
			name:       "Geometry2D",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Geometry3D",
			name:       "Geometry3D",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Geospatial",
			name:       "Geospatial",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Grouping",
			name:       "Grouping",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Humanoid animation (H-Anim)",
			name:       "H-Anim",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Interpolation",
			name:       "Interpolation",
			level:       5,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Key device sensor",
			name:       "KeyDeviceSensor",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Layering",
			name:       "Layering",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Layout",
			name:       "Layout",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Lighting",
			name:       "Lighting",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Navigation",
			name:       "Navigation",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Networking",
			name:       "Networking",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Non-uniform Rational B-Spline (NURBS)",
			name:       "NURBS",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Particle systems",
			name:       "ParticleSystems",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Picking sensor",
			name:       "Picking",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Pointing device sensor",
			name:       "PointingDeviceSensor",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Programmable shaders",
			name:       "Shaders",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Rendering",
			name:       "Rendering",
			level:       5,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Rigid body physics",
			name:       "RigidBodyPhysics",
			level:       5,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Scripting",
			name:       "Scripting",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Shape",
			name:       "Shape",
			level:       4,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Sound",
			name:       "Sound",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Text",
			name:       "Text",
			level:       1,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Texturing",
			name:       "Texturing",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Texturing3D",
			name:       "Texturing3D",
			level:       3,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Time",
			name:       "Time",
			level:       2,
			providerUrl: urls .provider,
		});

		supportedComponents .addComponentInfo (
		{
			title:      "Volume rendering",
			name:       "VolumeRendering",
			level:       2,
			providerUrl: urls .provider,
		});

		// Custom, non-standard component.

		supportedComponents .addComponentInfo (
		{
			title:      "Excite",
			name:       "Excite",
			level:       1,
			providerUrl: urls .provider,
		});

		Object .preventExtensions (supportedComponents);
		Object .freeze (supportedComponents);
		Object .seal (supportedComponents);
	
		return supportedComponents;
	};
});