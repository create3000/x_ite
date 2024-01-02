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

import X3DObject    from "../Base/X3DObject.js";
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "../Fields/SFNodeCache.js";

const
   _executionContext = Symbol (),
   _inlineNode       = Symbol (),
   _exportedName     = Symbol (),
   _importedName     = Symbol (),
   _routes           = Symbol (),
   _real             = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName)
{
   X3DObject .call (this);

   this [_executionContext] = executionContext;
   this [_inlineNode]       = inlineNode;
   this [_exportedName]     = exportedName;
   this [_importedName]     = importedName;
}

Object .assign (Object .setPrototypeOf (X3DImportedNode .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getInlineNode ()
   {
      return this [_inlineNode];
   },
   getExportedName ()
   {
      return this [_exportedName];
   },
   getExportedNode ()
   {
      return this .getInlineNode () .getInternalScene () .getExportedNode (this [_exportedName]) .getValue ();
   },
   getImportedName ()
   {
      return this [_importedName];
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toVRMLStream: Inline node does not exist.");

      const importedName = generator .ImportedName (this .getImportedName ());

      generator .string += generator .Indent ();
      generator .string += "IMPORT";
      generator .string += generator .Space ();
      generator .string += generator .Name (this .getInlineNode ());
      generator .string += ".";
      generator .string += this .getExportedName ();

      if (importedName !== this .getExportedName ())
      {
         generator .string += generator .Space ();
         generator .string += "AS";
         generator .string += generator .Space ();
         generator .string += importedName;
      }

      // try
      // {
      //    generator .AddRouteNode (this);
      //    generator .AddImportedNode (this .getExportedNode (), importedName);
      // }
   },
   toXMLStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");

      const importedName = generator .ImportedName (this .getImportedName ());

      generator .string += generator .Indent ();
      generator .string += "<IMPORT";
      generator .string += generator .Space ();
      generator .string += "inlineDEF='";
      generator .string += generator .XMLEncode (generator .Name (this .getInlineNode ()));
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "importedDEF='";
      generator .string += generator .XMLEncode (this .getExportedName ());
      generator .string += "'";

      if (importedName !== this .getExportedName ())
      {
         generator .string += generator .Space ();
         generator .string += "AS='";
         generator .string += generator .XMLEncode (importedName);
         generator .string += "'";
      }

      generator .string += generator .closingTags ? "></IMPORT>" : "/>";
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsNode (this .getInlineNode ()))
         throw new Error ("X3DImportedNode.toJSONStream: Inline node does not exist.");

      const importedName = generator .ImportedName (this .getImportedName ());

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "IMPORT";
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
      generator .string += "@inlineDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (generator .Name (this .getInlineNode ()));
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@importedDEF";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getExportedName ());
      generator .string += '"';

      if (importedName !== this .getExportedName ())
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
         generator .string += generator .JSONEncode (importedName);
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
   dispose ()
   {
      for (const route of Array .from (this [_executionContext] .routes))
      {
         if (route .getSourceNode ()=== this)
         {
            this [_executionContext] .deleteRoute (route);
            continue;
         }

         if (route .getDestinationNode () === this)
         {
            this [_executionContext] .deleteRoute (route);
            continue;
         }
      }

      X3DObject .prototype .dispose .call (this);
   },
});

for (const key of Object .keys (X3DImportedNode .prototype))
   Object .defineProperty (X3DImportedNode .prototype, key, { enumerable: false });

Object .defineProperties (X3DImportedNode .prototype,
{
   inlineNode:
   {
      get ()
      {
         return SFNodeCache .get (this [_inlineNode]);
      },
      enumerable: true,
   },
   exportedName:
   {
      get ()
      {
         return this [_exportedName];
      },
      enumerable: true,
   },
   exportedNode:
   {
      get ()
      {
         return this .getInlineNode () .getInternalScene () .getExportedNode (this [_exportedName]);
      },
      enumerable: true,
   },
   importedName:
   {
      get ()
      {
         return this [_importedName];
      },
      enumerable: true,
   },
});

Object .defineProperties (X3DImportedNode,
{
   typeName:
   {
      value: "X3DImportedNode",
      enumerable: true,
   },
});

export default X3DImportedNode;
