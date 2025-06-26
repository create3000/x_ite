import X3DConstants      from "../Base/X3DConstants.js";
import Algorithm         from "../../standard/Math/Algorithm.js";
import { getUniqueName } from "../Execution/NamedNodesHandling.js";

function Generator ({ style = "TIDY", indent = "", indentChar = "  ", precision = 7, doublePrecision = 15, html = false, closingTags = false })
{
   this .string          = "";
   this .indent          = indent;
   this .listIndent      = indent;
   this .precision       = Algorithm .clamp (precision, 1, 21);
   this .doublePrecision = Algorithm .clamp (doublePrecision, 1, 21);
   this .html            = html;
   this .closingTags     = html || closingTags;

   this .floatFormat             = this .createFloatFormat (this .precision);
   this .floatExponentialFormat  = this .createFloatExponentialFormat (this .precision);
   this .doubleFormat            = this .createFloatFormat (this .doublePrecision);
   this .doubleExponentialFormat = this .createFloatExponentialFormat (this .doublePrecision);

   this .Style (style, indentChar);

   this .executionContextStack = [ ];
   this .executionContextIndex = new Set ();
   this .importedNodesIndex    = new Map ();
   this .importedNames         = new Map ();
   this .exportedNodesIndex    = new Map ();
   this .nodes                 = new Map ();
   this .names                 = new Map ();
   this .namesByNode           = new Map ();
   this .routeNodes            = new Map ();
   this .containerFields       = [ ];
}

Object .assign (Generator .prototype,
{
   Style (style, indentChar = "  ")
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
            this .indentChar     = indentChar;
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
            this .indentChar     = indentChar;
            this .listEnclosure  = "\n";
            this .listBreak      = "\n";
            this .listIndentChar = this .indentChar;
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
   createFloatFormat (precision)
   {
      return new Intl .NumberFormat ("en",
      {
         notation: "standard",
         maximumSignificantDigits: precision,
         useGrouping: false,
      })
      .format;
   },
   createFloatExponentialFormat (precision)
   {
      return new Intl .NumberFormat ("en",
      {
         notation: "scientific",
         maximumSignificantDigits: precision,
         useGrouping: false,
      })
      .format;
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

      if (this .executionContextIndex .has (executionContext))
         return;

      this .executionContextIndex .add (executionContext);
      this .importedNodesIndex    .set (executionContext, new Set ());
      this .importedNames         .set (executionContext, new Map ());
      this .exportedNodesIndex    .set (executionContext, new Set ());
      this .nodes                 .set (executionContext, new Set ());
      this .names                 .set (executionContext, new Set ());
      this .namesByNode           .set (executionContext, new Map ());
      this .routeNodes            .set (executionContext, new Set ());
   },
   PopExecutionContext ()
   {
      const executionContext = this .executionContextStack .pop ();

      if (this .executionContextStack .at (-1) === executionContext)
         return;

      this .executionContextIndex .delete (executionContext);
      this .importedNodesIndex    .delete (executionContext);
      this .importedNames         .delete (executionContext);
      this .exportedNodesIndex    .delete (executionContext);
      this .nodes                 .delete (executionContext);
      this .names                 .delete (executionContext);
      this .namesByNode           .delete (executionContext);
      this .routeNodes            .delete (executionContext);
   },
   ExecutionContext ()
   {
      return this .executionContextStack .at (-1);
   },
   EnterScope ()
   {
      // TODO: remove me.
   },
   LeaveScope ()
   {
      // TODO: remove me.
   },
   NamedNodes (namedNodes)
   {
      const
         names       = this .names .get (this .ExecutionContext ()),
         namesByNode = this .namesByNode .get (this .ExecutionContext ());

      for (const node of namedNodes)
      {
         if (node .getNodeName () .match (/^_\d+$/))
            continue;

         names .add (node .getNodeName ());
         namesByNode .set (node .getValue (), node .getNodeName ());
      }
   },
   ExportedNodes (exportedNodes)
   {
      const index = this .exportedNodesIndex .get (this .ExecutionContext ());

      for (const exportedNode of exportedNodes)
         index .add (exportedNode .getLocalNode ());
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
   AddRouteNode (routeNode)
   {
      const routeNodes = this .routeNodes .get (this .ExecutionContext ());

      routeNodes .add (routeNode);
   },
   ExistsRouteNode (routeNode)
   {
      const routeNodes = this .routeNodes .get (this .ExecutionContext ());

      return routeNodes .has (routeNode);
   },
   IsSharedNode (baseNode)
   {
      return this .ExecutionContext () !== baseNode .getExecutionContext ();
   },
   AddNode (baseNode)
   {
      const nodes = this .nodes .get (this .ExecutionContext ());

      nodes .add (baseNode);

      this .AddRouteNode (baseNode);
   },
   ExistsNode (baseNode)
   {
      const nodes = this .nodes .get (this .ExecutionContext ());

      return nodes .has (baseNode);
   },
   Name (baseNode)
   {
      // Is the node already in index.

      const
         namesByNode = this .namesByNode .get (this .ExecutionContext ()),
         name        = namesByNode .get (baseNode);

      if (name !== undefined)
      {
         return name;
      }
      else
      {
         const
            names = this .names .get (this .ExecutionContext ()),
            name  = baseNode .getName ();

         // The node has no name.

         if (name .match (/^(?:_\d+)?$/) && !this .NeedsName (baseNode))
            return "";

         const newName = getUniqueName (names, name);

         // Add to indices.

         names .add (newName);
         namesByNode .set (baseNode, newName);

         return newName;
      }
   },
   NeedsName (baseNode)
   {
      if (baseNode .getCloneCount () > 1)
         return true;

      if (baseNode .hasRoutes ())
         return true;

      const executionContext = this .ExecutionContext ();

      if (this .importedNodesIndex .get (executionContext) .has (baseNode))
         return true;

      if (this .exportedNodesIndex .get (executionContext) .has (baseNode))
         return true;

      return false;
   },
   ImportedName (importedNode)
   {
      const importedNames = this .importedNames .get (this .ExecutionContext ());

      if (importedNames .has (importedNode))
         return importedNames .get (importedNode);

      const
         names   = this .names .get (this .ExecutionContext ()),
         newName = getUniqueName (names, importedNode .getImportedName ());

      // Add to indices.

      names .add (newName);
      importedNames .set (importedNode, newName);

      return newName;
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
      return this .containerFields .at (-1);
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
   ToUnit (category, value)
   {
      return this .ExecutionContext () ?.toUnit (category, value) ?? value;
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
