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

import SFBool      from "./Fields/SFBool.js";
import SFColor     from "./Fields/SFColor.js";
import SFColorRGBA from "./Fields/SFColorRGBA.js";
import SFNumber    from "./Fields/SFNumber.js";
import SFImage     from "./Fields/SFImage.js";
import SFInt32     from "./Fields/SFInt32.js";
import SFMatrix3   from "./Fields/SFMatrix3.js";
import SFMatrix4   from "./Fields/SFMatrix4.js";
import SFNode      from "./Fields/SFNode.js";
import SFRotation  from "./Fields/SFRotation.js";
import SFString    from "./Fields/SFString.js";
import SFVec2      from "./Fields/SFVec2.js";
import SFVec3      from "./Fields/SFVec3.js";
import SFVec4      from "./Fields/SFVec4.js";
import ArrayFields from "./Fields/ArrayFields.js";

const Fields = {
   SFBool:      SFBool,
   SFColor:     SFColor,
   SFColorRGBA: SFColorRGBA,
   ... SFNumber,
   SFImage:     SFImage,
   SFInt32:     SFInt32,
   ... SFMatrix3,
   ... SFMatrix4,
   SFNode:      SFNode,
   SFRotation:  SFRotation,
   SFString:    SFString,
   ... SFVec2,
   ... SFVec3,
   ... SFVec4,

   ... ArrayFields,
};

export default Fields;
