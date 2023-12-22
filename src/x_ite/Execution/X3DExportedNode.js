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

import X3DObject   from "../Base/X3DObject.js";
import SFNodeCache from "../Fields/SFNodeCache.js";

const
   _exportedName = Symbol (),
   _localNode    = Symbol ();

function X3DExportedNode (exportedName, localNode)
{
   X3DObject .call (this);

   this [_exportedName] = exportedName;
   this [_localNode]    = localNode;
}

Object .assign (Object .setPrototypeOf (X3DExportedNode .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_localNode] .getExecutionContext ();
   },
   getExportedName ()
   {
      return this [_exportedName];
   },
   getLocalNode ()
   {
      return this [_localNode];
   },
   toVRMLStream (generator)
   {
      const localName = generator .LocalName (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += "EXPORT";
      generator .string += generator .Space ();
      generator .string += localName;

      if (this [_exportedName] !== localName)
      {
         generator .string += generator .Space ();
         generator .string += "AS";
         generator .string += generator .Space ();
         generator .string += this [_exportedName];
      }
   },
   toXMLStream (generator)
   {
      const localName = generator .LocalName (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += "<EXPORT";
      generator .string += generator .Space ();
      generator .string += "localDEF='";
      generator .string += generator .XMLEncode (localName);
      generator .string += "'";

      if (this [_exportedName] !== localName)
      {
         generator .string += generator .Space ();
         generator .string += "AS='";
         generator .string += generator .XMLEncode (this [_exportedName]);
         generator .string += "'";
      }

      generator .string += generator .closingTags ? "></EXPORT>" : "/>";
   },
   toJSONStream (generator)
   {
      const localName = generator .LocalName (this .getLocalNode ());

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "EXPORT";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@localDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (localName);
      generator .string += '"';

      if (this [_exportedName] !== localName)
      {
         generator .string += ',';
         generator .string += generator .TidyBreak ();
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "@AS";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '"';
         generator .string += generator .JSONEncode (this [_exportedName]);
         generator .string += '"';
         generator .string += generator .TidyBreak ();
      }
      else
      {
         generator .string += generator .TidyBreak ();
      }

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Object .keys (X3DExportedNode .prototype))
   Object .defineProperty (X3DExportedNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DExportedNode .prototype,
{
   exportedName:
   {
      get ()
      {
         return this [_exportedName];
      },
      enumerable: true,
   },
   localNode:
   {
      get ()
      {
         return SFNodeCache .get (this [_localNode]);
      },
      enumerable: true,
   },
});

Object .defineProperties (X3DExportedNode,
{
   typeName:
   {
      value: "X3DExportedNode",
      enumerable: true,
   },
});

export default X3DExportedNode;
