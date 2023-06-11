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

let
   BROWSER_EVENT = 0,
   LOAD_STATE    = 0,
   FIELD_TYPE    = 0,
   NODE_TYPE     = 0;

const X3DConstants =
{
   // Browser event

   CONNECTION_ERROR:  BROWSER_EVENT ++,
   BROWSER_EVENT:     BROWSER_EVENT ++,
   INITIALIZED_EVENT: BROWSER_EVENT ++,
   SHUTDOWN_EVENT:    BROWSER_EVENT ++,
   INITIALIZED_ERROR: BROWSER_EVENT ++,

   // Load state

   NOT_STARTED_STATE: LOAD_STATE ++,
   IN_PROGRESS_STATE: LOAD_STATE ++,
   COMPLETE_STATE:    LOAD_STATE ++,
   FAILED_STATE:      LOAD_STATE ++,

   // Access type

   initializeOnly: 0b001,
   inputOnly:      0b010,
   outputOnly:     0b100,
   inputOutput:    0b111,

   // X3DField

   SFBool:      FIELD_TYPE ++,
   SFColor:     FIELD_TYPE ++,
   SFColorRGBA: FIELD_TYPE ++,
   SFDouble:    FIELD_TYPE ++,
   SFFloat:     FIELD_TYPE ++,
   SFImage:     FIELD_TYPE ++,
   SFInt32:     FIELD_TYPE ++,
   SFMatrix3d:  FIELD_TYPE ++,
   SFMatrix3f:  FIELD_TYPE ++,
   SFMatrix4d:  FIELD_TYPE ++,
   SFMatrix4f:  FIELD_TYPE ++,
   SFNode:      FIELD_TYPE ++,
   SFRotation:  FIELD_TYPE ++,
   SFString:    FIELD_TYPE ++,
   SFTime:      FIELD_TYPE ++,
   SFVec2d:     FIELD_TYPE ++,
   SFVec2f:     FIELD_TYPE ++,
   SFVec3d:     FIELD_TYPE ++,
   SFVec3f:     FIELD_TYPE ++,
   SFVec4d:     FIELD_TYPE ++,
   SFVec4f:     FIELD_TYPE ++,

   VrmlMatrix:  FIELD_TYPE ++,

   // X3DArrayField

   MFBool:      FIELD_TYPE ++,
   MFColor:     FIELD_TYPE ++,
   MFColorRGBA: FIELD_TYPE ++,
   MFDouble:    FIELD_TYPE ++,
   MFFloat:     FIELD_TYPE ++,
   MFImage:     FIELD_TYPE ++,
   MFInt32:     FIELD_TYPE ++,
   MFMatrix3d:  FIELD_TYPE ++,
   MFMatrix3f:  FIELD_TYPE ++,
   MFMatrix4d:  FIELD_TYPE ++,
   MFMatrix4f:  FIELD_TYPE ++,
   MFNode:      FIELD_TYPE ++,
   MFRotation:  FIELD_TYPE ++,
   MFString:    FIELD_TYPE ++,
   MFTime:      FIELD_TYPE ++,
   MFVec2d:     FIELD_TYPE ++,
   MFVec2f:     FIELD_TYPE ++,
   MFVec3d:     FIELD_TYPE ++,
   MFVec3f:     FIELD_TYPE ++,
   MFVec4d:     FIELD_TYPE ++,
   MFVec4f:     FIELD_TYPE ++,

   // Abstract nodes and nodes types are added later.

   X3DBaseNode: NODE_TYPE,

   [Symbol .toStringTag]: "X3DConstants",
};

Object .defineProperty (X3DConstants, "addNode",
{
   value ({ typeName })
   {
      if (this [typeName])
         return;

      this [typeName] = ++ NODE_TYPE;
   },
});

export default X3DConstants;
