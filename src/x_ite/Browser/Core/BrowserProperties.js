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
import X3DBaseNode          from "../../Base/X3DBaseNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

// https://www.web3d.org/documents/specifications/19775-2/V3.3/Part02/servRef.html#getBrowserProperties

function BrowserProperties (executionContext)
{
   X3DBaseNode .call (this, executionContext);
}

Object .setPrototypeOf (BrowserProperties .prototype, X3DBaseNode .prototype);

Object .defineProperties (BrowserProperties,
{
   typeName:
   {
      value: "BrowserProperties",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ABSTRACT_NODES",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "CONCRETE_NODES",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "EXTERNAL_INTERACTIONS", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "PROTOTYPE_CREATE",      new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "DOM_IMPORT",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "XML_ENCODING",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "CLASSIC_VRML_ENCODING", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "BINARY_ENCODING",       new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default BrowserProperties;
