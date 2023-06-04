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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

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
   initialize: function ()
   {
      X3DSensorNode    .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);
   },
   dispose: function ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DSensorNode    .prototype .dispose .call (this);
   },
});

Object .defineProperties (ReceiverPdu,
{
   typeName:
   {
      value: "ReceiverPdu",
      enumerable: true,
   },
   componentName:
   {
      value: "DIS",
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["3.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
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
      enumerable: true,
   },
});

export default ReceiverPdu;
