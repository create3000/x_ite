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

import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DDamperNode            from "./X3DDamperNode.js";
import X3DArrayFollowerTemplate from "../../Browser/Followers/X3DArrayFollowerTemplate.js";
import X3DConstants             from "../../Base/X3DConstants.js";
import Vector2                  from "../../../standard/Math/Numbers/Vector2.js";

var X3DArrayFollowerObject = X3DArrayFollowerTemplate (X3DDamperNode);

function TexCoordDamper2D (executionContext)
{
   X3DDamperNode          .call (this, executionContext);
   X3DArrayFollowerObject .call (this, executionContext);

   this .addType (X3DConstants .TexCoordDamper2D);
}

Object .assign (Object .setPrototypeOf (TexCoordDamper2D .prototype, X3DDamperNode .prototype),
   X3DArrayFollowerObject .prototype,
{
   getVector ()
   {
      return new Vector2 ();
   },
});

Object .defineProperties (TexCoordDamper2D,
{
   ... X3DNode .getStaticProperties ("TexCoordDamper2D", "Followers", 1, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .MFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "order",              new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tau",                new Fields .SFTime (0.3)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "tolerance",          new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default TexCoordDamper2D;
