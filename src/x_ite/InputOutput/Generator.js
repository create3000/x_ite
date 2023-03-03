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

import X3DConstants      from "../Base/X3DConstants.js";
import { getUniqueName } from "../Execution/NamedNodesHandling.js";

function Generator ({ style = "TIDY", precision = 7, doublePrecision = 15 })
{
   this .Style (style);

   this .string              = "";
   this .indent              = "";
   this .listIndent          = "";
   this .precision           = precision;
   this .doublePrecision     = doublePrecision;
   this .removeTrailingZeros = /(?:\.|(\.[0-9]*?))0*(?=[eE]|$)/;

   this .executionContextStack = [ null ];
   this .importedNodesIndex    = new Map ();
   this .exportedNodesIndex    = new Map ();
   this .nodes                 = new Set ();
   this .names                 = new Map ();
   this .namesByNode           = new Map ();
   this .importedNames         = new Map ();
   this .routeNodes            = new Set ();
   this .level                 = 0;
   this .containerFields       = [ ];
   this .units                 = true;
   this .unitCategories        = [ ];

   this .names .set (null, new Set ());
}

Generator .prototype =
{
   constructor: Generator,
   Style: function (style)
   {
      switch (style)
      {
         case "CLEAN":
         {
            this .comma          = " ";
            this .break          = " ";
            this .tidyBreak      = "";
            this .tidySpace      = "";
            this .indentChar     = "";
            this .listEnclosure  = "";
            this .listBreak      = "";
            this .listIndentChar = "";
            this .attribBreak    = " ";
            break;
         }
         case "SMALL":
         {
            this .comma          = ",";
            this .break          = "\n";
            this .tidyBreak      = "\n";
            this .tidySpace      = "";
            this .indentChar     = "";
            this .listEnclosure  = "";
            this .listBreak      = "";
            this .listIndentChar = "";
            this .attribBreak    = " ";
            break;
         }
         case "COMPACT":
         {
            this .comma          = ",";
            this .break          = "\n";
            this .tidyBreak      = "\n";
            this .tidySpace      = " ";
            this .indentChar     = "  ";
            this .listEnclosure  = " ";
            this .listBreak      = " ";
            this .listIndentChar = "";
            this .attribBreak    = " ";
            break;
         }
         case "TIDY":
         default:
         {
            this .comma          = ",";
            this .break          = "\n";
            this .tidyBreak      = "\n";
            this .tidySpace      = " ";
            this .indentChar     = "  ";
            this .listEnclosure  = "\n";
            this .listBreak      = "\n";
            this .listIndentChar = "  ";
            this .attribBreak    = "\n";
            break;
         }
      }
   },
   Comma: function ()
   {
      return this .comma;
   },
   Break: function ()
   {
      return this .break;
   },
   TidyBreak: function ()
   {
      return this .tidyBreak;
   },
   ForceBreak: function ()
   {
      return "\n";
   },
   Space: function ()
   {
      return " ";
   },
   TidySpace: function ()
   {
      return this .tidySpace;
   },
   ListStart: function ()
   {
      return this .listEnclosure;
   },
   ListEnd: function ()
   {
      return this .listEnclosure;
   },
   ListBreak: function ()
   {
      return this .listBreak;
   },
   AttribBreak: function ()
   {
      return this .attribBreak;
   },
   Indent: function ()
   {
      return this .indent;
   },
   ListIndent: function ()
   {
      return this .listIndent;
   },
   IncIndent: function ()
   {
      this .indent     += this .indentChar;
      this .listIndent += this .listIndentChar;

      return "";
   },
   DecIndent: function ()
   {
      this .indent = this .indent .slice (0, this .indent .length - this .indentChar .length);
      this .listIndent = this .listIndent .slice (0, this .listIndent .length - this .listIndentChar .length);

      return "";
   },
   Precision: function (value)
   {
      return Math .fround (value) .toPrecision (this .precision) .replace (this .removeTrailingZeros, "$1");
   },
   DoublePrecision: function (value)
   {
      return value .toPrecision (this .doublePrecision) .replace (this .removeTrailingZeros, "$1");
   },
   PushExecutionContext: function (executionContext)
   {
      this .executionContextStack .push (executionContext);

      if (! this .names .has (executionContext))
         this .names .set (executionContext, new Set ());

      if (! this .importedNodesIndex .has (executionContext))
         this .importedNodesIndex .set (executionContext, new Set ());

      if (! this .exportedNodesIndex .has (executionContext))
         this .exportedNodesIndex .set (executionContext, new Set ());
   },
   PopExecutionContext: function ()
   {
      this .executionContextStack .pop ();

      if (this .ExecutionContext ())
         return;

      this .importedNodesIndex .clear ();
      this .exportedNodesIndex .clear ();
   },
   ExecutionContext: function ()
   {
      return this .executionContextStack .at (-1);
   },
   EnterScope: function ()
   {
      ++ this .level;
   },
   LeaveScope: function ()
   {
      -- this .level;

      if (this .level === 0)
      {
         this .nodes         .clear ();
         this .namesByNode   .clear ();
         this .importedNames .clear ();
      }
   },
   ExportedNodes: function (exportedNodes)
   {
      const index = this .exportedNodesIndex .get (this .ExecutionContext ());

      exportedNodes .forEach (function (exportedNode)
      {
         try
         {
            index .add (exportedNode .getLocalNode ())
         }
         catch (error)
         { }
      });
   },
   ImportedNodes: function (importedNodes)
   {
      const index = this .importedNodesIndex .get (this .ExecutionContext ());

      importedNodes .forEach (function (importedNode)
      {
         try
         {
            index .add (importedNode .getInlineNode ());
         }
         catch (error)
         { }
      });
   },
   AddImportedNode: function (exportedNode, importedName)
   {
      this .importedNames .set (exportedNode, importedName);
   },
   AddRouteNode: function (routeNode)
   {
      this .routeNodes .add (routeNode);
   },
   ExistsRouteNode: function (routeNode)
   {
      return this .routeNodes .has (routeNode);
   },
   IsSharedNode: function (baseNode)
   {
      return this .ExecutionContext () !== baseNode .getExecutionContext ();
   },
   AddNode: function (baseNode)
   {
      this .nodes .add (baseNode);

      this .AddRouteNode (baseNode);
   },
   ExistsNode: function (baseNode)
   {
      return this .nodes .has (baseNode);
   },
   Name: function (baseNode)
   {
      // Is the node already in index

      const name = this .namesByNode .get (baseNode);

      if (name !== undefined)
      {
         return name;
      }
      else
      {
         const names = this .names .get (this .ExecutionContext ());

         let name = baseNode .getName ();

         if (name .length)
         {
            // The node has a name.

            if (name .replace (/_\d+$/, "") .length)
            {
               name = getUniqueName (names, name, !! name .match (/_\d+$/));
            }
            else
            {
               if (!this .NeedsName (baseNode))
                  return "";

               name = getUniqueName (names, "", true);
            }
         }
         else
         {
            // The node has no name.

            if (!this .NeedsName (baseNode))
               return "";

            name = getUniqueName (names, "", true);
         }

         names .add (name);
         this .namesByNode .set (baseNode, name);

         return name;
      }
   },
   NeedsName: function (baseNode)
   {
      if (baseNode .getCloneCount () > 1)
         return true;

      if (baseNode .hasRoutes ())
         return true;

      const
         executionContext = baseNode .getExecutionContext (),
         index            = this .importedNodesIndex .get (executionContext);

      if (index)
      {
         if (index .has (baseNode))
            return true;
      }
      else
      {
         const index = this .exportedNodesIndex .get (executionContext);

         if (index)
         {
            if (index .has (baseNode))
               return true;
         }

         return false;
      }
   },
   LocalName: function (baseNode)
   {
      const importedName = this .importedNames .get (baseNode);

      if (importedName !== undefined)
         return importedName;

      if (this .ExistsNode (baseNode))
         return this .Name (baseNode);

      throw new Error ("Couldn't get local name for node '" + baseNode .getTypeName () + "'.");
   },
   PushContainerField: function (field)
   {
      this .containerFields .push (field);
   },
   PopContainerField: function ()
   {
      this .containerFields .pop ();
   },
   ContainerField: function ()
   {
      if (this .containerFields .length)
         return this .containerFields [this .containerFields .length - 1];

      return null;
   },
   AccessType: function (accessType)
   {
      switch (accessType)
      {
         case X3DConstants .initializeOnly:
            return "initializeOnly";
         case X3DConstants .inputOnly:
            return "inputOnly";
         case X3DConstants .outputOnly:
            return "outputOnly";
         case X3DConstants .inputOutput:
            return "inputOutput";
      }
   },
   SetUnits: function (value)
   {
      this .units = value;
   },
   GetUnits: function ()
   {
      return this .units;
   },
   PushUnitCategory: function (category)
   {
      this .unitCategories .push (category);
   },
   PopUnitCategory: function ()
   {
      this .unitCategories .pop ();
   },
   Unit: function (category)
   {
      if (this .unitCategories .length == 0)
         return category;

      return this .unitCategories .at (-1);
   },
   ToUnit: function (category, value)
   {
      if (this .units)
      {
         const executionContext = this .ExecutionContext ();

         if (executionContext)
            return executionContext .toUnit (category, value);
      }

      return value;
   },
   XMLEncode: (function ()
   {
      const map = {
         "\\": "\\\\",
         "\r": "&#xD;",
         "\n": "&#xA;",
         "\t": "&#x9;",
         "\"": "\\\"",
         "'": "&apos;",
         "<": "&lt;",
         ">": "&gt;",
         "&": "&amp;",
      };

      const regex = /([\\\r\n\t"'<>&])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   escapeCDATA: function (string)
   {
      return string .replace (/\]\]\>/g, "\\]\\]\\>");
   },
   JSONEncode: (function ()
   {
      const map = {
         "\\": "\\\\",
         "\r": "\\r",
         "\n": "\\n",
         "\t": "\\t",
         "\"": "\\\"",
      };

      const regex = /([\\\t\n\r"])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   JSONNumber: function (value)
   {
      switch (value)
      {
         case "NaN":
         case "Infinity":
         case "-Infinity":
            return '"' + value + '"';
         default:
            return value;
      }
   },
   JSONRemoveComma: function ()
   {
      // this .string = this .string .replace (/,(\s*)$/s, "$1");

      this .string = this .string .trimEnd ();

      if (this .string .endsWith (','))
         this .string = this .string .slice (0, -1);

      this .string += this .TidyBreak ();
   },
};

for (const key of Reflect .ownKeys (Generator .prototype))
   Object .defineProperty (Generator .prototype, key, { enumerable: false });

export default Generator;
