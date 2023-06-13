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
import Algorithm         from "../../standard/Math/Algorithm.js";

function Generator ({ style = "TIDY", indent = "", precision = 7, doublePrecision = 15, html = false, closingTags = false })
{
   this .string           = "";
   this .indent           = indent;
   this .listIndent       = indent;
   this .precision        = Algorithm .clamp (precision, 1, 21);
   this .doublePrecision  = Algorithm .clamp (doublePrecision, 1, 21);
   this .html             = html;
   this .closingTags      = html || closingTags;

   this .floatFormat = new Intl .NumberFormat ("en", {
      notation: "standard",
      maximumSignificantDigits: this .precision,
      useGrouping: false,
   }) .format;

   this .floatExponentialFormat = new Intl .NumberFormat ("en", {
      notation: "scientific",
      maximumSignificantDigits: this .precision,
      useGrouping: false,
   }) .format;

   this .doubleFormat = new Intl .NumberFormat ("en", {
      notation: "standard",
      maximumSignificantDigits: this .doublePrecision,
      useGrouping: false,
   }) .format;

   this .doubleExponentialFormat = new Intl .NumberFormat ("en", {
      notation: "scientific",
      maximumSignificantDigits: this .doublePrecision,
      useGrouping: false,
   }) .format;

   this .Style (style);

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

   this .names .set (null, Object .assign (new Set (), { index: 0 }));
}

Object .assign (Generator .prototype,
{
   Style (style)
   {
      switch (style)
      {
         case "CLEAN":
         {
            this .listIndent = "";

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
            this .listIndent = "";

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
            this .listIndent = "";

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
   Comma ()
   {
      return this .comma;
   },
   Break ()
   {
      return this .break;
   },
   TidyBreak ()
   {
      return this .tidyBreak;
   },
   ForceBreak ()
   {
      return "\n";
   },
   Space ()
   {
      return " ";
   },
   TidySpace ()
   {
      return this .tidySpace;
   },
   ListStart ()
   {
      return this .listEnclosure;
   },
   ListEnd ()
   {
      return this .listEnclosure;
   },
   ListBreak ()
   {
      return this .listBreak;
   },
   AttribBreak ()
   {
      return this .attribBreak;
   },
   Indent ()
   {
      return this .indent;
   },
   ListIndent ()
   {
      return this .listIndent;
   },
   IncIndent ()
   {
      this .indent     += this .indentChar;
      this .listIndent += this .listIndentChar;

      return "";
   },
   DecIndent ()
   {
      this .indent     = this .indent     .slice (0, this .indent     .length - this .indentChar     .length);
      this .listIndent = this .listIndent .slice (0, this .listIndent .length - this .listIndentChar .length);

      return "";
   },
   FloatFormat  (value)
   {
      if (Number .isFinite (value))
      {
         const exponent = Math .log10 (Math .abs (value));

         if ((this .precision > exponent && exponent >= -4) || value === 0)
            return this .floatFormat (value);

         return this .floatExponentialFormat (value) .toLowerCase ();
      }
      else
      {
         return String (value);
      }
   },
   DoubleFormat  (value)
   {
      if (Number .isFinite (value))
      {
         const exponent = Math .log10 (Math .abs (value));

         if ((this .doublePrecision > exponent && exponent >= -4) || value === 0)
            return this .doubleFormat (value);

         return this .doubleExponentialFormat (value) .toLowerCase ();
      }
      else
      {
         return String (value);
      }
   },
   PushExecutionContext (executionContext)
   {
      this .executionContextStack .push (executionContext);

      if (!this .names .has (executionContext))
         this .names .set (executionContext, Object .assign (new Set (), { index: 0 }));

      if (!this .importedNodesIndex .has (executionContext))
         this .importedNodesIndex .set (executionContext, new Set ());

      if (!this .exportedNodesIndex .has (executionContext))
         this .exportedNodesIndex .set (executionContext, new Set ());
   },
   PopExecutionContext ()
   {
      this .executionContextStack .pop ();

      if (this .ExecutionContext ())
         return;

      this .importedNodesIndex .clear ();
      this .exportedNodesIndex .clear ();
   },
   ExecutionContext ()
   {
      return this .executionContextStack .at (-1);
   },
   EnterScope ()
   {
      ++ this .level;
   },
   LeaveScope ()
   {
      -- this .level;

      if (this .level === 0)
      {
         this .nodes         .clear ();
         this .namesByNode   .clear ();
         this .importedNames .clear ();
      }
   },
   ExportedNodes (exportedNodes)
   {
      const index = this .exportedNodesIndex .get (this .ExecutionContext ());

      for (const exportedNode of exportedNodes)
      {
         try
         {
            index .add (exportedNode .getLocalNode ())
         }
         catch
         { }
      }
   },
   ImportedNodes (importedNodes)
   {
      const index = this .importedNodesIndex .get (this .ExecutionContext ());

      for (const importedNode of importedNodes)
      {
         try
         {
            index .add (importedNode .getInlineNode ());
         }
         catch
         { }
      }
   },
   AddImportedNode (exportedNode, importedName)
   {
      this .importedNames .set (exportedNode, importedName);
   },
   AddRouteNode (routeNode)
   {
      this .routeNodes .add (routeNode);
   },
   ExistsRouteNode (routeNode)
   {
      return this .routeNodes .has (routeNode);
   },
   IsSharedNode (baseNode)
   {
      return this .ExecutionContext () !== baseNode .getExecutionContext ();
   },
   AddNode (baseNode)
   {
      this .nodes .add (baseNode);

      this .AddRouteNode (baseNode);
   },
   ExistsNode (baseNode)
   {
      return this .nodes .has (baseNode);
   },
   Name (baseNode)
   {
      // Is the node already in index.

      const name = this .namesByNode .get (baseNode);

      if (name !== undefined)
      {
         return name;
      }
      else
      {
         const
            name  = baseNode .getName (),
            match = name .match (/^(.*?)(_\d+)?$/),
            names = this .names .get (this .ExecutionContext ());

         if (match [1])
         {
            // The node has a name.

            var newName = getUniqueName (names, name, !! match [2]);
         }
         else
         {
            // The node has no name.

            if (!this .NeedsName (baseNode))
               return "";

            var newName = `_${++ names .index}`;
         }

         // Add to indices.

         names .add (newName);
         this .namesByNode .set (baseNode, newName);

         return newName;
      }
   },
   NeedsName (baseNode)
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
   LocalName (baseNode)
   {
      const importedName = this .importedNames .get (baseNode);

      if (importedName !== undefined)
         return importedName;

      if (this .ExistsNode (baseNode))
         return this .Name (baseNode);

      throw new Error (`Couldn't get local name for node '${baseNode .getTypeName ()}'.`);
   },
   PushContainerField (field)
   {
      this .containerFields .push (field);
   },
   PopContainerField ()
   {
      this .containerFields .pop ();
   },
   ContainerField ()
   {
      if (this .containerFields .length)
         return this .containerFields [this .containerFields .length - 1];

      return null;
   },
   AccessType (accessType)
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
   SetUnits (value)
   {
      this .units = value;
   },
   GetUnits ()
   {
      return this .units;
   },
   PushUnitCategory (category)
   {
      this .unitCategories .push (category);
   },
   PopUnitCategory ()
   {
      this .unitCategories .pop ();
   },
   Unit (category)
   {
      if (this .unitCategories .length == 0)
         return category;

      return this .unitCategories .at (-1);
   },
   ToUnit (category, value)
   {
      if (this .units)
      {
         const executionContext = this .ExecutionContext ();

         if (executionContext)
            return executionContext .toUnit (category, value);
      }

      return value;
   },
   XMLEncode: (() =>
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
   XMLEncodeSourceText: (() =>
   {
      const map = {
         "\\": "\\\\",
         "\"": "\\\"",
         "'": "&apos;",
         "<": "&lt;",
         ">": "&gt;",
         "&": "&amp;",
      };

      const regex = /([\\"'<>&])/g;

      return function (string)
      {
         return string .replace (regex, char => map [char]);
      };
   })(),
   JSONEncode: (() =>
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
   JSONNumber (value)
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
   JSONRemoveComma ()
   {
      // this .string = this .string .replace (/,(\s*)$/s, "$1");

      this .string = this .string .trimEnd ();

      if (this .string .endsWith (','))
         this .string = this .string .slice (0, -1);

      this .string += this .TidyBreak ();
   },
});

for (const key of Object .keys (Generator .prototype))
   Object .defineProperty (Generator .prototype, key, { enumerable: false });

export default Generator;
