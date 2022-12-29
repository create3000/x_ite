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
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "../Fields/SFNodeCache.js";
import Generator    from "../InputOutput/Generator.js";

const
   _inlineNode   = Symbol (),
   _exportedName = Symbol (),
   _importedName = Symbol (),
   _routes       = Symbol ();

function X3DImportedNode (executionContext, inlineNode, exportedName, importedName)
{
   X3DNode .call (this, executionContext);

   this [_inlineNode]   = inlineNode;
   this [_exportedName] = exportedName;
   this [_importedName] = importedName;
   this [_routes]       = new Set ();

   this [_inlineNode] ._loadState .addInterest ("set_loadState__", this);
}

X3DImportedNode .prototype = Object .assign (Object .create (X3DNode .prototype),
{
   constructor: X3DImportedNode,
   getInlineNode: function ()
   {
      return this [_inlineNode];
   },
   getExportedName: function ()
   {
      return this [_exportedName];
   },
   getExportedNode: function ()
   {
      return this [_inlineNode] .getInternalScene () .getExportedNode (this [_exportedName]) .getValue ();
   },
   getImportedName: function ()
   {
      return this [_importedName];
   },
   addRoute: function (sourceNode, sourceField, destinationNode, destinationField)
   {
      // Add route.

      const route = {
         sourceNode: sourceNode,
         sourceField: sourceField,
         destinationNode: destinationNode,
         destinationField: destinationField,
      };

      this [_routes] .add (route);

      // Try to resolve source or destination node routes.

      if (this [_inlineNode] .checkLoadState () === X3DConstants .COMPLETE_STATE)
         this .resolveRoute (route);
   },
   resolveRoute: function (route)
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
   deleteRoute: function (real)
   {
      for (const route of this [_routes])
      {
         if (route .real === real)
            this [_routes] .delete (route);
      }
   },
   deleteRoutes: function ()
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
   set_loadState__: function ()
   {
      switch (this [_inlineNode] .checkLoadState ())
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
   toVRMLStream: function (stream)
   {
      const generator = Generator .Get (stream);

      if (generator .ExistsNode (this .getInlineNode ()))
      {
         stream .string += generator .Indent ();
         stream .string += "IMPORT";
         stream .string += generator .Space ();
         stream .string += generator .Name (this .getInlineNode ());
         stream .string += ".";
         stream .string += this .getExportedName ();

         if (this .getImportedName () !== this .getExportedName ())
         {
            stream .string += generator .Space ();
            stream .string += "AS";
            stream .string += generator .Space ();
            stream .string += this .getImportedName ();
         }

         try
         {
            generator .AddRouteNode (this);
            generator .AddImportedNode (this .getExportedNode (), this .getImportedName ());
         }
         catch (error)
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

                  stream .string += generator .Break ();
                  stream .string += generator .TidyBreak ();
                  stream .string += generator .Indent ();
                  stream .string += "ROUTE";
                  stream .string += generator .Space ();
                  stream .string += sourceNodeName;
                  stream .string += ".";
                  stream .string += sourceField;
                  stream .string += generator .Space ();
                  stream .string += "TO";
                  stream .string += generator .Space ();
                  stream .string += destinationNodeName;
                  stream .string += ".";
                  stream .string += destinationField;
               }
            }
         }
      }
      else
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");
   },
   toXMLStream: function (stream)
   {
      const generator = Generator .Get (stream);

      if (generator .ExistsNode (this .getInlineNode ()))
      {
         stream .string += generator .Indent ();
         stream .string += "<IMPORT";
         stream .string += generator .Space ();
         stream .string += "inlineDEF='";
         stream .string += generator .XMLEncode (generator .Name (this .getInlineNode ()));
         stream .string += "'";
         stream .string += generator .Space ();
         stream .string += "importedDEF='";
         stream .string += generator .XMLEncode (this .getExportedName ());
         stream .string += "'";

         if (this .getImportedName () !== this .getExportedName ())
         {
            stream .string += generator .Space ();
            stream .string += "AS='";
            stream .string += generator .XMLEncode (this .getImportedName ());
            stream .string += "'";
         }

         stream .string += "/>";

         try
         {
            generator .AddRouteNode (this);
            generator .AddImportedNode (this .getExportedNode (), this .getImportedName ());
         }
         catch (error)
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

                  stream .string += generator .Break ();
                  stream .string += generator .TidyBreak ();
                  stream .string += generator .Indent ();
                  stream .string += "<ROUTE";
                  stream .string += generator .Space ();
                  stream .string += "fromNode='";
                  stream .string += generator .XMLEncode (sourceNodeName);
                  stream .string += "'";
                  stream .string += generator .Space ();
                  stream .string += "fromField='";
                  stream .string += generator .XMLEncode (sourceField);
                  stream .string += "'";
                  stream .string += generator .Space ();
                  stream .string += "toNode='";
                  stream .string += generator .XMLEncode (destinationNodeName);
                  stream .string += "'";
                  stream .string += generator .Space ();
                  stream .string += "toField='";
                  stream .string += generator .XMLEncode (destinationField);
                  stream .string += "'";
                  stream .string += "/>";
               }
            }
         }
      }
      else
         throw new Error ("X3DImportedNode.toXMLStream: Inline node does not exist.");
   },
   dispose: function ()
   {
      this [_inlineNode] ._loadState .removeInterest ("set_loadState__", this);

      this .deleteRoutes ();

      X3DNode .prototype .dispose .call (this);
   },
});

for (const key of Reflect .ownKeys (X3DImportedNode .prototype))
   Object .defineProperty (X3DImportedNode .prototype, key, { enumerable: false });

Object .defineProperty (X3DImportedNode .prototype, "inlineNode",
{
   get: function ()
   {
      return SFNodeCache .get (this [_inlineNode]);
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DImportedNode .prototype, "exportedName",
{
   get: function ()
   {
      return this [_exportedName];
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DImportedNode .prototype, "exportedNode",
{
   get: function ()
   {
      return this [_inlineNode] .getInternalScene () .getExportedNode (this [_exportedName]);
   },
   enumerable: true,
   configurable: false
});

Object .defineProperty (X3DImportedNode .prototype, "importedName",
{
   get: function ()
   {
      return this [_importedName];
   },
   enumerable: true,
   configurable: false
});

export default X3DImportedNode;
