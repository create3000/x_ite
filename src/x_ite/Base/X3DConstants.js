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
   browserEvent = 0,
   loadState    = 0,
   fieldType    = 0;

const _nodeType = Symbol .for ("X_ITE.nodeType");

const X3DConstants =
{
   // Browser event

   CONNECTION_ERROR:  browserEvent ++,
   BROWSER_EVENT:     browserEvent ++,
   INITIALIZED_EVENT: browserEvent ++,
   SHUTDOWN_EVENT:    browserEvent ++,
   INITIALIZED_ERROR: browserEvent ++,

   // Load state

   NOT_STARTED_STATE: loadState ++,
   IN_PROGRESS_STATE: loadState ++,
   COMPLETE_STATE:    loadState ++,
   FAILED_STATE:      loadState ++,

   // Access type

   initializeOnly: 0b001,
   inputOnly:      0b010,
   outputOnly:     0b100,
   inputOutput:    0b111,

   // X3DField

   SFBool:      fieldType ++,
   SFColor:     fieldType ++,
   SFColorRGBA: fieldType ++,
   SFDouble:    fieldType ++,
   SFFloat:     fieldType ++,
   SFImage:     fieldType ++,
   SFInt32:     fieldType ++,
   SFMatrix3d:  fieldType ++,
   SFMatrix3f:  fieldType ++,
   SFMatrix4d:  fieldType ++,
   SFMatrix4f:  fieldType ++,
   SFNode:      fieldType ++,
   SFRotation:  fieldType ++,
   SFString:    fieldType ++,
   SFTime:      fieldType ++,
   SFVec2d:     fieldType ++,
   SFVec2f:     fieldType ++,
   SFVec3d:     fieldType ++,
   SFVec3f:     fieldType ++,
   SFVec4d:     fieldType ++,
   SFVec4f:     fieldType ++,

   VrmlMatrix:  fieldType ++,

   // X3DArrayField

   MFBool:      fieldType ++,
   MFColor:     fieldType ++,
   MFColorRGBA: fieldType ++,
   MFDouble:    fieldType ++,
   MFFloat:     fieldType ++,
   MFImage:     fieldType ++,
   MFInt32:     fieldType ++,
   MFMatrix3d:  fieldType ++,
   MFMatrix3f:  fieldType ++,
   MFMatrix4d:  fieldType ++,
   MFMatrix4f:  fieldType ++,
   MFNode:      fieldType ++,
   MFRotation:  fieldType ++,
   MFString:    fieldType ++,
   MFTime:      fieldType ++,
   MFVec2d:     fieldType ++,
   MFVec2f:     fieldType ++,
   MFVec3d:     fieldType ++,
   MFVec3f:     fieldType ++,
   MFVec4d:     fieldType ++,
   MFVec4f:     fieldType ++,

   // Abstract nodes and nodes types are added later.

   X3DBaseNode: 0,

   [_nodeType]: 0,
};

export default X3DConstants;
