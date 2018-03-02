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
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Grouping/X3DGroupingNode",
	"x_ite/Components/Core/X3DSensorNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode, 
          X3DSensorNode, 
          X3DConstants)
{
"use strict";

	function EspduTransform (executionContext)
	{
		X3DGroupingNode .call (this, executionContext);
		X3DSensorNode .call (this, executionContext);

		this .addType (X3DConstants .EspduTransform);
	}

	EspduTransform .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),new X3DSensorNode (),
	{
		constructor: EspduTransform,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                                   new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                                    new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                                   new Fields .SFVec3f (-1, -1, -1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",                                new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",                             new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "children",                                   new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                                   new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue0",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue1",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue2",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue3",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue4",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue5",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue6",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOnly,      "set_articulationParameterValue7",            new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                                    new Fields .SFString ("localhost")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",                              new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterCount",                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterDesignatorArray",       new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterChangeIndicatorArray",  new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterIdPartAttachedToArray", new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterTypeArray",             new Fields .MFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "articulationParameterArray",                 new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "center",                                     new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "collisionType",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "deadReckoning",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationLocation",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationRelativeLocation",                 new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "detonationResult",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityCategory",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityCountry",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityDomain",                               new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityExtra",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                                   new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entityKind",                                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entitySpecific",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "entitySubCategory",                          new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventApplicationID",                         new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventEntityID",                              new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventNumber",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "eventSiteID",                                new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fired1",                                     new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fired2",                                     new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fireMissionIndex",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "firingRange",                                new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "firingRate",                                 new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "forceID",                                    new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "fuse",                                       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "linearVelocity",                             new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "linearAcceleration",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "marking",                                    new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",                         new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",                         new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionApplicationID",                      new Fields .SFInt32 (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionEndPoint",                           new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionEntityID",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionQuantity",                           new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionSiteID",                             new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "munitionStartPoint",                         new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",                                new Fields .SFString ("standAlone")),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                                       new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",                               new Fields .SFTime (0.1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",                                   new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",                                      new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation",                           new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                                     new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",                                new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "warhead",                                    new Fields .SFInt32 ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",                              new Fields .SFTime (1)),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue0_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue1_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue2_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue3_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue4_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue5_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue6_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "articulationParameterValue7_changed",        new Fields .SFFloat ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "collideTime",                                new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "detonateTime",                               new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "firedTime",                                  new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isCollided",                                 new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isDetonated",                                new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",                            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",                            new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",                           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",                               new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                                  new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "rtpHeaderExpected",                          new Fields .SFBool ()),
		]),
		getTypeName: function ()
		{
			return "EspduTransform";
		},
		getComponentName: function ()
		{
			return "DIS";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return EspduTransform;
});


