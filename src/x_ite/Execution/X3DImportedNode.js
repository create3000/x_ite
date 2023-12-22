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

import X3DNode      from "../Components/Core/X3DNode.js";
import X3DObject    from "../Base/X3DObject.js";
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "../Fields/SFNodeCache.js";

const
   _inlineNode   = Symbol (),
   _exportedName = Symbol (),
   _importedName = Symbol (),
   _routes       = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName)
{
   X3DNode .call (this, executionContext);

   this [_inlineNode]   = SFNodeCache .get (inlineNode);
   this [_exportedName] = exportedName;
   this [_importedName] = importedName;
   this [_routes]       = new Set ();

   this .getInlineNode () ._loadState .addInterest ("set_loadState__", this);
}

// Must be of type X3DNode, to get routes work.
Object .assign (Object .setPrototypeOf (X3DImportedNode .prototype, X3DNode .prototype),
{
   getExecutionContext ()
   {
      return this [_inlineNode] .getValue () .getExecutionContext ();
   },
   getInlineNode ()
   {
      return this [_inlineNode] .getValue ();
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
   hasRoutes (baseNode)
   {
      for (const route of this [_routes])
      {
         if (route .sourceNode === baseNode)
            return true;

         if (route .destinationNode === baseNode)
            return true;
      }

      return false;
   },
   addRoute (sourceNode, sourceField, destinationNode, destinationField)
   {
      // Add route.

      const route = {
         sourceNode,
         sourceField,
         destinationNode,
         destinationField,
      };

      this [_routes] .push (route);

      // Try to resolve source or destination node routes.

      if (this .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE)
         this .resolveRoute (route);
   },
   resolveRoute (route)
   {
      try
      {
         const
            sourceField      = route .sourceField,
            destinationField = route .destinationField;

         let
            sourceNode      = route .sourceNode,
            destinationNode = route .destinationNode;

         if (route .real)
            route .real .dispose ();

         if (sourceNode instanceof X3DImportedNode)
            sourceNode = sourceNode .getExportedNode ();

         if (destinationNode instanceof X3DImportedNode)
            destinationNode = destinationNode .getExportedNode ();

         route .real = this .getExecutionContext () .addSimpleRoute (sourceNode, sourceField, destinationNode, destinationField);
      }
      catch (error)
      {
         console .error (error .message);
      }
   },
   deleteRoute (real)
   {
      for (const route of this [_routes])
      {
         if (route .real === real)
            this [_routes] .delete (route);
      }
   },
   deleteRoutes ()
   {
      for (const route of this [_routes])
      {
         const real = route .real

         if (real)
         {
            delete route .real;
            this .getExecutionContext () .deleteSimpleRoute (real);
         }
      }
   },
   getRoutes ()
   {
      return this [_routes];
   },
   set_loadState__ ()
   {
      switch (this .getInlineNode () .checkLoadState ())
      {
         case X3DConstants .NOT_STARTED_STATE:
         case X3DConstants .FAILED_STATE:
         {
            this .deleteRoutes ();
            break;
         }
         case X3DConstants .COMPLETE_STATE:
         {
            this .deleteRoutes ();

            for (const route of this [_routes])
               this .resolveRoute (route);

            break;
         }
      }
   },
   toStream (generator)
   {
      X3DObject .prototype .toStream .call (this, generator);
   },
   toVRMLStream (generator)
   {
      if (generator .ExistsNode (this .getInlineNode ()))
      {
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

         try
         {
            generator .AddRouteNode (this);
            generator .AddImportedNode (this .getExportedNode (), importedName);
         }
         catch
         {
            // Output unresolved routes.

            for (const route of this [_routes])
            {
               const
                  sourceNode       = route .sourceNode,
                  sourceField      = route .sourceField,
                  destinationNode  = route .destinationNode,
                  destinationField = route .destinationField;

               if (generator .ExistsRouteNode (sourceNode) && generator .ExistsRouteNode (destinationNode))
               {
                  const sourceNodeName = sourceNode instanceof X3DImportedNode
                     ? sourceNode .getImportedName ()
                     : generator .Name (sourceNode);

                  const destinationNodeName = destinationNode instanceof X3DImportedNode
                     ? destinationNode .getImportedName ()
                     : generator .Name (destinationNode);

                  generator .string += generator .TidyBreak ();
                  generator .string += generator .Indent ();
                  generator .string += "ROUTE";
                  generator .string += generator .Space ();
                  generator .string += sourceNodeName;
                  generator .string += ".";
                  generator .string += sourceField;
                  generator .string += generator .Space ();
                  generator .string += "TO";
                  generator .string += generator .Space ();
                  generator .string += destinationNodeName;
                  generator .string += ".";
                  generator .string += destinationField;
               }
            }
         }
      }
      else
      {
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");
      }
   },
   toXMLStream (generator)
   {
      if (generator .ExistsNode (this .getInlineNode ()))
      {
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

         try
         {
            generator .AddRouteNode (this);
            generator .AddImportedNode (this .getExportedNode (), importedName);
         }
         catch
         {
            // Output unresolved routes.

            for (const route of this [_routes])
            {
               const
                  sourceNode       = route .sourceNode,
                  sourceField      = route .sourceField,
                  destinationNode  = route .destinationNode,
                  destinationField = route .destinationField;

               if (generator .ExistsRouteNode (sourceNode) && generator .ExistsRouteNode (destinationNode))
               {
                  const sourceNodeName = sourceNode instanceof X3DImportedNode
                     ? sourceNode .getImportedName ()
                     : generator .Name (sourceNode);

                  const destinationNodeName = destinationNode instanceof X3DImportedNode
                     ? destinationNode .getImportedName ()
                     : generator .Name (destinationNode);

                  generator .string += generator .TidyBreak ();
                  generator .string += generator .Indent ();
                  generator .string += "<ROUTE";
                  generator .string += generator .Space ();
                  generator .string += "fromNode='";
                  generator .string += generator .XMLEncode (sourceNodeName);
                  generator .string += "'";
                  generator .string += generator .Space ();
                  generator .string += "fromField='";
                  generator .string += generator .XMLEncode (sourceField);
                  generator .string += "'";
                  generator .string += generator .Space ();
                  generator .string += "toNode='";
                  generator .string += generator .XMLEncode (destinationNodeName);
                  generator .string += "'";
                  generator .string += generator .Space ();
                  generator .string += "toField='";
                  generator .string += generator .XMLEncode (destinationField);
                  generator .string += "'";
                  generator .string += generator .closingTags ? "></ROUTE>" : "/>";
               }
            }
         }
      }
      else
      {
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");
      }
   },
   toJSONStream (generator)
   {
      if (generator .ExistsNode (this .getInlineNode ()))
      {
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

         try
         {
            generator .AddRouteNode (this);
            generator .AddImportedNode (this .getExportedNode (), importedName);
         }
         catch
         {
            // Output unresolved routes.

            for (const route of this [_routes])
            {
               const
                  sourceNode       = route .sourceNode,
                  sourceField      = route .sourceField,
                  destinationNode  = route .destinationNode,
                  destinationField = route .destinationField;

               if (generator .ExistsRouteNode (sourceNode) && generator .ExistsRouteNode (destinationNode))
               {
                  const sourceNodeName = sourceNode instanceof X3DImportedNode
                     ? sourceNode .getImportedName ()
                     : generator .Name (sourceNode);

                  const destinationNodeName = destinationNode instanceof X3DImportedNode
                     ? destinationNode .getImportedName ()
                     : generator .Name (destinationNode);

                  generator .string += ',';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += "ROUTE";
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
                  generator .string += "@fromNode";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (sourceNodeName);
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@fromField";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (sourceField);
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@toNode";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (destinationNodeName);
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@toField";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (destinationField);
                  generator .string += '"';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';
               }
            }
         }
      }
      else
      {
         throw new Error ("X3DImportedNode.toJSONStream: Inline node does not exist.");
      }
   },
   dispose ()
   {
      this .getInlineNode () ._loadState .removeInterest ("set_loadState__", this);

      this .deleteRoutes ();

      X3DNode .prototype .dispose .call (this);
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
         return this [_inlineNode];
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
