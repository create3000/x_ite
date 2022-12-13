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
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function SpatialSound (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .SpatialSound);

   this ._location .setUnit ("length");
}

SpatialSound .prototype = Object .assign (Object .create (X3DSoundNode .prototype),
{
   constructor: SpatialSound,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description", new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),

      new X3DFieldDefinition (X3DConstants .initializeOnly, "spatialize",        new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "coneInnerAngle",    new Fields .SFFloat (6.2832)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "coneOuterAngle",    new Fields .SFFloat (6.2832)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "coneOuterGain",     new Fields .SFFloat (0)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",         new Fields .SFVec3f (0, 0, 1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "distanceModel",     new Fields .SFString ("INVERSE")),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "dopplerEnabled",    new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "enableHRTF",        new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "gain",              new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",         new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "location",          new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "maxDistance",       new Fields .SFFloat (10000)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "priority",          new Fields .SFFloat ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "referenceDistance", new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "rolloffFactor",     new Fields .SFFloat (1)),

      new X3DFieldDefinition (X3DConstants .inputOutput,    "children",    new Fields .MFNode ()),
   ]),
   getTypeName: function ()
   {
      return "SpatialSound";
   },
   getComponentName: function ()
   {
      return "Sound";
   },
   getContainerField: function ()
   {
      return "children";
   },
});

export default SpatialSound;
