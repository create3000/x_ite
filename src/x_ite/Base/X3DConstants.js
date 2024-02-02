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

const X3DConstants =
{
   [Symbol .toStringTag]: "X3DConstants",
};

let CONSTANT_VALUE = 1000;

Object .defineProperty (X3DConstants, "addConstant",
{
   value (name, value)
   {
      if (this .hasOwnProperty (name) || this .hasOwnProperty (value))
         return;

      this [this [name] = value ?? ++ CONSTANT_VALUE] = name;
   },
});

Object .entries ({
   // Access types

   initializeOnly: 0b001,
   inputOnly:      0b010,
   outputOnly:     0b100,
   inputOutput:    0b111,
})
.forEach (([name, value]) => X3DConstants .addConstant (name, value));

[
   // Browser events

   "CONNECTION_ERROR",
   "BROWSER_EVENT",
   "INITIALIZED_EVENT",
   "SHUTDOWN_EVENT",
   "INITIALIZED_ERROR",

   // Load states

   "NOT_STARTED_STATE",
   "IN_PROGRESS_STATE",
   "COMPLETE_STATE",
   "FAILED_STATE",

   // X3DField

   "SFBool",
   "SFColor",
   "SFColorRGBA",
   "SFDouble",
   "SFFloat",
   "SFImage",
   "SFInt32",
   "SFMatrix3d",
   "SFMatrix3f",
   "SFMatrix4d",
   "SFMatrix4f",
   "SFNode",
   "SFRotation",
   "SFString",
   "SFTime",
   "SFVec2d",
   "SFVec2f",
   "SFVec3d",
   "SFVec3f",
   "SFVec4d",
   "SFVec4f",

   "VrmlMatrix",

   // X3DArrayField

   "MFBool",
   "MFColor",
   "MFColorRGBA",
   "MFDouble",
   "MFFloat",
   "MFImage",
   "MFInt32",
   "MFMatrix3d",
   "MFMatrix3f",
   "MFMatrix4d",
   "MFMatrix4f",
   "MFNode",
   "MFRotation",
   "MFString",
   "MFTime",
   "MFVec2d",
   "MFVec2f",
   "MFVec3d",
   "MFVec3f",
   "MFVec4d",
   "MFVec4f",

   // Abstract and concrete nodes and nodes types are added later.

   "X3DBaseNode",
]
.forEach (name => X3DConstants .addConstant (name));

export default X3DConstants;
