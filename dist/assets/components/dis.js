(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
	define  = X3D .define,
	require = X3D .require;
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


define ('x_ite/Components/DIS/DISEntityManager',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DChildNode,
          X3DConstants)
{
"use strict";

   function DISEntityManager (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .DISEntityManager);
   }

   DISEntityManager .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: DISEntityManager,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "address",         new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "applicationID",   new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",         new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "port",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "siteID",          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "addedEntities",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "removedEntities", new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "DISEntityManager";
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

   return DISEntityManager;
});

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


define ('x_ite/Components/DIS/DISEntityTypeMapping',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DInfoNode",
   "x_ite/Components/Networking/X3DUrlObject",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DInfoNode,
          X3DUrlObject,
          X3DConstants)
{
"use strict";

   function DISEntityTypeMapping (executionContext)
   {
      X3DInfoNode  .call (this, executionContext);
      X3DUrlObject .call (this, executionContext);

      this .addType (X3DConstants .DISEntityTypeMapping);
   }

   DISEntityTypeMapping .prototype = Object .assign (Object .create (X3DInfoNode .prototype),
      X3DUrlObject .prototype,
   {
      constructor: DISEntityTypeMapping,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "category",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "country",              new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "domain",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "extra",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "kind",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "specific",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "subcategory",          new Fields .SFInt32 ()),
      ]),
      getTypeName: function ()
      {
         return "DISEntityTypeMapping";
      },
      getComponentName: function ()
      {
         return "DIS";
      },
      getContainerField: function ()
      {
         return "mapping";
      },
      initialize: function ()
      {
         X3DInfoNode  .prototype .initialize .call (this);
         X3DUrlObject .prototype .initialize .call (this);
      },
      requestImmediateLoad: function (cache = true)
      { },
      requestUnload: function ()
      { },
      set_load__: function ()
      { },
      set_url__: function ()
      { },
   });

   return DISEntityTypeMapping;
});

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


define ('x_ite/Components/DIS/EspduTransform',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Base/X3DConstants",
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
      X3DSensorNode   .call (this, executionContext);

      this .addType (X3DConstants .EspduTransform);
   }

   EspduTransform .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
      X3DSensorNode .prototype,
   {
      constructor: EspduTransform,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                                   new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                                    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                                    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",                                new Fields .SFBool ()),
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
      initialize: function ()
      {
         X3DGroupingNode .prototype .initialize .call (this);
         X3DSensorNode   .prototype .initialize .call (this);
      },
   });

   return EspduTransform;
});

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


define ('x_ite/Components/DIS/ReceiverPdu',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode,
          X3DBoundedObject,
          X3DConstants)
{
"use strict";

   function ReceiverPdu (executionContext)
   {
      X3DSensorNode    .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .ReceiverPdu);
   }

   ReceiverPdu .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
      X3DBoundedObject .prototype,
   {
      constructor: ReceiverPdu,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                 new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",               new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                  new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",            new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",              new Fields .SFString ("standAlone")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                     new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioID",                  new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",             new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "receivedPower",            new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "receiverState",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rtpHeaderExpected",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitterApplicationID", new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitterEntityID",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitterRadioID",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitterSiteID",        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichGeometry",            new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",            new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "ReceiverPdu";
      },
      getComponentName: function ()
      {
         return "DIS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DSensorNode    .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);
      },
   });

   return ReceiverPdu;
});

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


define ('x_ite/Components/DIS/SignalPdu',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode,
          X3DBoundedObject,
          X3DConstants)
{
"use strict";

   function SignalPdu (executionContext)
   {
      X3DSensorNode    .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .SignalPdu);
   }

   SignalPdu .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
      X3DBoundedObject .prototype,
   {
      constructor: SignalPdu,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",           new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "address",            new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",      new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "data",               new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dataLength",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "encodingScheme",     new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",        new Fields .SFString ("standAlone")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "port",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioID",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",       new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rtpHeaderExpected",  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sampleRate",         new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "samples",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tdlType",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichGeometry",      new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",      new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",          new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "SignalPdu";
      },
      getComponentName: function ()
      {
         return "DIS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DSensorNode    .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);
      },
   });

   return SignalPdu;
});

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


define ('x_ite/Components/DIS/TransmitterPdu',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Core/X3DSensorNode",
   "x_ite/Components/Grouping/X3DBoundedObject",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DSensorNode,
          X3DBoundedObject,
          X3DConstants)
{
"use strict";

   function TransmitterPdu (executionContext)
   {
      X3DSensorNode    .call (this, executionContext);
      X3DBoundedObject .call (this, executionContext);

      this .addType (X3DConstants .TransmitterPdu);
   }

   TransmitterPdu .prototype = Object .assign (Object .create (X3DSensorNode .prototype),
      X3DBoundedObject .prototype,
   {
      constructor: TransmitterPdu,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",                        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                           new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "address",                            new Fields .SFString ("localhost")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaLocation",                    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternLength",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "antennaPatternType",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "applicationID",                      new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoKeyID",                        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "cryptoSystem",                       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "entityID",                           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "frequency",                          new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "inputSource",                        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lengthOfModulationParameters",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeDetail",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeMajor",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSpreadSpectrum",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "modulationTypeSystem",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayHost",                 new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "multicastRelayPort",                 new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "networkMode",                        new Fields .SFString ("standAlone")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "port",                               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "power",                              new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCategory",            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeCountry",             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeDomain",              new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeKind",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclature",        new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioEntityTypeNomenclatureVersion", new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "radioID",                            new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "readInterval",                       new Fields .SFFloat (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "relativeAntennaLocation",            new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rtpHeaderExpected",                  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "siteID",                             new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitFrequencyBandwidth",         new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "transmitState",                      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "whichGeometry",                      new Fields .SFInt32 (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "writeInterval",                      new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkReader",                    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isNetworkWriter",                    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isRtpHeaderHeard",                   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isStandAlone",                       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "timestamp",                          new Fields .SFTime ()),
      ]),
      getTypeName: function ()
      {
         return "TransmitterPdu";
      },
      getComponentName: function ()
      {
         return "DIS";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DSensorNode    .prototype .initialize .call (this);
         X3DBoundedObject .prototype .initialize .call (this);
      },
   });

   return TransmitterPdu;
});

/*******************************************************************************
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


define (require .getComponentUrl ("dis"), [
   "x_ite/Components",
   "x_ite/Components/DIS/DISEntityManager",
   "x_ite/Components/DIS/DISEntityTypeMapping",
   "x_ite/Components/DIS/EspduTransform",
   "x_ite/Components/DIS/ReceiverPdu",
   "x_ite/Components/DIS/SignalPdu",
   "x_ite/Components/DIS/TransmitterPdu",
],
function (Components,
          DISEntityManager,
          DISEntityTypeMapping,
          EspduTransform,
          ReceiverPdu,
          SignalPdu,
          TransmitterPdu)
{
"use strict";

   Components .addComponent ({
      name: "DIS",
      types:
      {
         DISEntityManager:     DISEntityManager,
         DISEntityTypeMapping: DISEntityTypeMapping,
         EspduTransform:       EspduTransform,
         ReceiverPdu:          ReceiverPdu,
         SignalPdu:            SignalPdu,
         TransmitterPdu:       TransmitterPdu,
      },
      abstractTypes:
      {
      },
   });
});


})();
