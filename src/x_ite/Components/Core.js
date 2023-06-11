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

import MetadataBoolean      from "./Core/MetadataBoolean.js";
import MetadataDouble       from "./Core/MetadataDouble.js";
import MetadataFloat        from "./Core/MetadataFloat.js";
import MetadataInteger      from "./Core/MetadataInteger.js";
import MetadataSet          from "./Core/MetadataSet.js";
import MetadataString       from "./Core/MetadataString.js";
import WorldInfo            from "./Core/WorldInfo.js";
import X3DBindableNode      from "./Core/X3DBindableNode.js";
import X3DChildNode         from "./Core/X3DChildNode.js";
import X3DInfoNode          from "./Core/X3DInfoNode.js";
import X3DMetadataObject    from "./Core/X3DMetadataObject.js";
import X3DNode              from "./Core/X3DNode.js";
import X3DPrototypeInstance from "./Core/X3DPrototypeInstance.js";
import X3DSensorNode        from "./Core/X3DSensorNode.js";

export default {
   name: "Core",
   concreteNodes:
   [
      MetadataBoolean,
      MetadataDouble,
      MetadataFloat,
      MetadataInteger,
      MetadataSet,
      MetadataString,
      WorldInfo,
   ],
   abstractNodes:
   [
      X3DBindableNode,
      X3DChildNode,
      X3DInfoNode,
      X3DMetadataObject,
      X3DNode,
      X3DPrototypeInstance,
      X3DSensorNode,
   ],
};
