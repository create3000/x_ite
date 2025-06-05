/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This file is part of the X_ITE Project.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains "non-military use only" components.
 *
 * Copyright 2016 Andreas Plesch.
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

import X3DConstants from "../Base/X3DConstants.js";

const
   nodeTypeNames = new Map (), // (TYPENAME -> TypeName)
   fieldNames    = new Map (); // (fieldname -> fieldName)

const HTMLSupport =
{
   addConcreteNode ({ typeName, fieldDefinitions })
   {
      if (nodeTypeNames .has (typeName))
         return;

      this .addNodeTypeName (typeName);

      for (const { name, accessType } of fieldDefinitions)
      {
         if (accessType & X3DConstants .initializeOnly)
            this .addFieldName (name)
      }
   },
   addNodeTypeName (typeName)
   {
      nodeTypeNames .set (typeName,                 typeName);
      nodeTypeNames .set (typeName .toUpperCase (), typeName);
   },
   getNodeTypeName (typeName)
   {
      return nodeTypeNames .get (typeName);
   },
   addFieldName (name)
   {
      fieldNames .set (name,                 name);
      fieldNames .set (name .toLowerCase (), name);
   },
   getFieldName (name)
   {
      return fieldNames .get (name);
   },
};

HTMLSupport .addNodeTypeName ("ProtoInstance");

export default HTMLSupport;
