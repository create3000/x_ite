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
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Contact (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .Contact);

   // Units

   this ._position                 .setUnit ("length");
   this ._depth                    .setUnit ("length");
   this ._minBounceSpeed           .setUnit ("speed");
   this ._surfaceSpeed             .setUnit ("speed");
   this ._softnessConstantForceMix .setUnit ("force");
}

Object .setPrototypeOf (Contact .prototype, X3DNode .prototype);

Object .defineProperties (Contact, X3DNode .staticProperties ("Contact", "RigidBodyPhysics", 2, "contacts", "3.2"));

Object .defineProperties (Contact,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                 new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",                 new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "contactNormal",            new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depth",                    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "appliedParameters",        new Fields .MFString ("BOUNCE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bounce",                   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "minBounceSpeed",           new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frictionDirection",        new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frictionCoefficients",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceSpeed",             new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "slipCoefficients",         new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "softnessConstantForceMix", new Fields .SFFloat (0.0001)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "softnessErrorCorrection",  new Fields .SFFloat (0.8)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry1",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry2",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body1",                    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "body2",                    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Contact;
