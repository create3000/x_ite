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

class X3DConstants
{
   // Browser event

   static CONNECTION_ERROR  = BROWSER_EVENT ++
   static BROWSER_EVENT     = BROWSER_EVENT ++
   static INITIALIZED_EVENT = BROWSER_EVENT ++
   static SHUTDOWN_EVENT    = BROWSER_EVENT ++
   static INITIALIZED_ERROR = BROWSER_EVENT ++

   // Load state

   static NOT_STARTED_STATE = LOAD_STATE ++
   static IN_PROGRESS_STATE = LOAD_STATE ++
   static COMPLETE_STATE    = LOAD_STATE ++
   static FAILED_STATE      = LOAD_STATE ++

   // Access type

   static initializeOnly = 0b001
   static inputOnly      = 0b010
   static outputOnly     = 0b100
   static inputOutput    = 0b111

   // X3DField

   static SFBool      = FIELD_TYPE ++
   static SFColor     = FIELD_TYPE ++
   static SFColorRGBA = FIELD_TYPE ++
   static SFDouble    = FIELD_TYPE ++
   static SFFloat     = FIELD_TYPE ++
   static SFImage     = FIELD_TYPE ++
   static SFInt32     = FIELD_TYPE ++
   static SFMatrix3d  = FIELD_TYPE ++
   static SFMatrix3f  = FIELD_TYPE ++
   static SFMatrix4d  = FIELD_TYPE ++
   static SFMatrix4f  = FIELD_TYPE ++
   static SFNode      = FIELD_TYPE ++
   static SFRotation  = FIELD_TYPE ++
   static SFString    = FIELD_TYPE ++
   static SFTime      = FIELD_TYPE ++
   static SFVec2d     = FIELD_TYPE ++
   static SFVec2f     = FIELD_TYPE ++
   static SFVec3d     = FIELD_TYPE ++
   static SFVec3f     = FIELD_TYPE ++
   static SFVec4d     = FIELD_TYPE ++
   static SFVec4f     = FIELD_TYPE ++

   static VrmlMatrix  = FIELD_TYPE ++

   // X3DArrayField

   static MFBool      = FIELD_TYPE ++
   static MFColor     = FIELD_TYPE ++
   static MFColorRGBA = FIELD_TYPE ++
   static MFDouble    = FIELD_TYPE ++
   static MFFloat     = FIELD_TYPE ++
   static MFImage     = FIELD_TYPE ++
   static MFInt32     = FIELD_TYPE ++
   static MFMatrix3d  = FIELD_TYPE ++
   static MFMatrix3f  = FIELD_TYPE ++
   static MFMatrix4d  = FIELD_TYPE ++
   static MFMatrix4f  = FIELD_TYPE ++
   static MFNode      = FIELD_TYPE ++
   static MFRotation  = FIELD_TYPE ++
   static MFString    = FIELD_TYPE ++
   static MFTime      = FIELD_TYPE ++
   static MFVec2d     = FIELD_TYPE ++
   static MFVec2f     = FIELD_TYPE ++
   static MFVec3d     = FIELD_TYPE ++
   static MFVec3f     = FIELD_TYPE ++
   static MFVec4d     = FIELD_TYPE ++
   static MFVec4f     = FIELD_TYPE ++

   // Abstract nodes and nodes types are added later.

   static X3DBaseNode = NODE_TYPE

   static addNode ({ typeName })
   {
      if (X3DConstants [typeName])
         return;

      X3DConstants [typeName] = ++ NODE_TYPE;
   }
}

export default X3DConstants;
