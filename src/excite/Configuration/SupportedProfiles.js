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
 * This file is part of the Excite X3D Project.
 *
 * Excite X3D is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * Excite X3D is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with Excite X3D.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"excite/Configuration/ProfileInfo",
	"excite/Configuration/ProfileInfoArray",
	"excite/Configuration/ComponentInfoArray",
	"excite/Browser/Networking/urls",
],
function ($,
          ProfileInfo,
          ProfileInfoArray,
          ComponentInfoArray,
          urls)
{
"use strict";

	return function (browser)
	{
		function add (title, name, components)
		{
			supportedProfiles .add (name, new ProfileInfo (name, title, urls .povider, new ComponentInfoArray (browser, components)));
		}

		var
			supportedComponents = browser .supportedComponents,
			supportedProfiles   = new ProfileInfoArray ();

		add ("Computer-Aided Design (CAD) interchange", "CADInterchange", [
			supportedComponents ["Core"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Navigation"],
			supportedComponents ["Shaders"],
			supportedComponents ["CADGeometry"],
		]);
	
		add ("Core", "Core", [
			supportedComponents ["Core"],
		]);
	
		add ("Full", "Full", [
			supportedComponents ["Core"],
			supportedComponents ["Time"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Geometry3D"],
			supportedComponents ["Geometry2D"],
			supportedComponents ["Text"],
			supportedComponents ["Sound"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Interpolation"],
			supportedComponents ["PointingDeviceSensor"],
			supportedComponents ["KeyDeviceSensor"],
			supportedComponents ["EnvironmentalSensor"],
			supportedComponents ["Navigation"],
			supportedComponents ["EnvironmentalEffects"],
			supportedComponents ["Geospatial"],
			supportedComponents ["H-Anim"],
			supportedComponents ["NURBS"],
			supportedComponents ["DIS"],
			supportedComponents ["Scripting"],
			supportedComponents ["EventUtilities"],
			supportedComponents ["Shaders"],
			supportedComponents ["CADGeometry"],
			supportedComponents ["Texturing3D"],
			supportedComponents ["CubeMapTexturing"],
			supportedComponents ["Layering"],
			supportedComponents ["Layout"],
			supportedComponents ["RigidBodyPhysics"],
			supportedComponents ["Picking"],
			supportedComponents ["Followers"],
			supportedComponents ["ParticleSystems"], /*,
			supportedComponents ["VolumeRendering"], */
		]);
	
		add ("Immersive", "Immersive", [
			supportedComponents ["Core"],
			supportedComponents ["Time"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Geometry3D"],
			supportedComponents ["Geometry2D"],
			supportedComponents ["Text"],
			supportedComponents ["Sound"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Interpolation"],
			supportedComponents ["PointingDeviceSensor"],
			supportedComponents ["KeyDeviceSensor"],
			supportedComponents ["EnvironmentalSensor"],
			supportedComponents ["Navigation"],
			supportedComponents ["EnvironmentalEffects"],
			supportedComponents ["Scripting"],
			supportedComponents ["EventUtilities"],
		]);
	
		add ("Interactive", "Interactive", [
			supportedComponents ["Core"],
			supportedComponents ["Time"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Geometry3D"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Interpolation"],
			supportedComponents ["PointingDeviceSensor"],
			supportedComponents ["KeyDeviceSensor"],
			supportedComponents ["EnvironmentalSensor"],
			supportedComponents ["Navigation"],
			supportedComponents ["EnvironmentalEffects"],
			supportedComponents ["EventUtilities"],
		]);
	
		add ("Interchange", "Interchange", [
			supportedComponents ["Core"],
			supportedComponents ["Time"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Geometry3D"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Interpolation"],
			supportedComponents ["Navigation"],
			supportedComponents ["EnvironmentalEffects"],
		]);
	
	//	add ("Medical interchange", "MedicalInterchange", [
	//		supportedComponents ["Core"],
	//		supportedComponents ["Time"],
	//		supportedComponents ["Networking"],
	//		supportedComponents ["Grouping"],
	//		supportedComponents ["Rendering"],
	//		supportedComponents ["Shape"],
	//		supportedComponents ["Geometry3D"],
	//		supportedComponents ["Geometry2D"],
	//		supportedComponents ["Text"],
	//		supportedComponents ["Lighting"],
	//		supportedComponents ["Texturing"],
	//		supportedComponents ["Interpolation"],
	//		supportedComponents ["Navigation"],
	//		supportedComponents ["EnvironmentalEffects"],
	//		supportedComponents ["EventUtilities"],
	//		supportedComponents ["Texturing3D"],
	//		supportedComponents ["VolumeRendering"],
	//	]);
	
		add ("MPEG-4 interactive", "MPEG-4", [
			supportedComponents ["Core"],
			supportedComponents ["Time"],
			supportedComponents ["Networking"],
			supportedComponents ["Grouping"],
			supportedComponents ["Rendering"],
			supportedComponents ["Shape"],
			supportedComponents ["Geometry3D"],
			supportedComponents ["Lighting"],
			supportedComponents ["Texturing"],
			supportedComponents ["Interpolation"],
			supportedComponents ["PointingDeviceSensor"],
			supportedComponents ["EnvironmentalSensor"],
			supportedComponents ["Navigation"],
			supportedComponents ["EnvironmentalEffects"],
		]);
	
		Object .preventExtensions (supportedProfiles);
		Object .freeze (supportedProfiles);
		Object .seal (supportedProfiles);
	
		return supportedProfiles;
	};
});