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
	"x_ite/Configuration/ProfileInfo",
	"x_ite/Configuration/ProfileInfoArray",
	"x_ite/Configuration/ComponentInfoArray",
	"x_ite/Configuration/SupportedComponents",
	"x_ite/Browser/Networking/urls",
],
function (ProfileInfo,
          ProfileInfoArray,
          ComponentInfoArray,
          SupportedComponents,
          urls)
{
"use strict";

	var SupportedProfiles = new ProfileInfoArray ();

	SupportedProfiles .addProfile ({
		title: "Computer-Aided Design (CAD) interchange",
		name: "CADInterchange",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["Shaders"],
			SupportedComponents ["CADGeometry"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Core",
		name: "Core",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Full",
		name: "Full",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Geometry2D"],
			SupportedComponents ["Text"],
			SupportedComponents ["Sound"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["PointingDeviceSensor"],
			SupportedComponents ["KeyDeviceSensor"],
			SupportedComponents ["EnvironmentalSensor"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
			SupportedComponents ["Geospatial"],
			SupportedComponents ["H-Anim"],
			SupportedComponents ["NURBS"],
			SupportedComponents ["DIS"],
			SupportedComponents ["Scripting"],
			SupportedComponents ["EventUtilities"],
			SupportedComponents ["Shaders"],
			SupportedComponents ["CADGeometry"],
			SupportedComponents ["Texturing3D"],
			SupportedComponents ["CubeMapTexturing"],
			SupportedComponents ["Layering"],
			SupportedComponents ["Layout"],
			SupportedComponents ["RigidBodyPhysics"],
			SupportedComponents ["Picking"],
			SupportedComponents ["Followers"],
			SupportedComponents ["ParticleSystems"],
			SupportedComponents ["VolumeRendering"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Immersive",
		name: "Immersive",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Geometry2D"],
			SupportedComponents ["Text"],
			SupportedComponents ["Sound"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["PointingDeviceSensor"],
			SupportedComponents ["KeyDeviceSensor"],
			SupportedComponents ["EnvironmentalSensor"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
			SupportedComponents ["Scripting"],
			SupportedComponents ["EventUtilities"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Interactive",
		name: "Interactive",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["PointingDeviceSensor"],
			SupportedComponents ["KeyDeviceSensor"],
			SupportedComponents ["EnvironmentalSensor"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
			SupportedComponents ["EventUtilities"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Interchange",
		name: "Interchange",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "Medical interchange",
		name: "MedicalInterchange",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Geometry2D"],
			SupportedComponents ["Text"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
			SupportedComponents ["EventUtilities"],
			SupportedComponents ["Texturing3D"],
			SupportedComponents ["VolumeRendering"],
		],
	});

	SupportedProfiles .addProfile ({
		title: "MPEG-4 interactive",
		name: "MPEG-4",
		providerUrl: urls .providerUrl,
		components: [
			SupportedComponents ["Core"],
			SupportedComponents ["Time"],
			SupportedComponents ["Networking"],
			SupportedComponents ["Grouping"],
			SupportedComponents ["Rendering"],
			SupportedComponents ["Shape"],
			SupportedComponents ["Geometry3D"],
			SupportedComponents ["Lighting"],
			SupportedComponents ["Texturing"],
			SupportedComponents ["Interpolation"],
			SupportedComponents ["PointingDeviceSensor"],
			SupportedComponents ["EnvironmentalSensor"],
			SupportedComponents ["Navigation"],
			SupportedComponents ["EnvironmentalEffects"],
		],
	});

	return SupportedProfiles;
});
