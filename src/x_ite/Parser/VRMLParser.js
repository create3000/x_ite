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

import X3DParser                 from "./X3DParser.js";
import Expressions               from "./Expressions.js";
import Fields                    from "../Fields.js";
import X3DField                  from "../Base/X3DField.js";
import X3DExternProtoDeclaration from "../Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration       from "../Prototype/X3DProtoDeclaration.js";
import X3DConstants              from "../Base/X3DConstants.js";
import Color3                    from "../../standard/Math/Numbers/Color3.js";
import Color4                    from "../../standard/Math/Numbers/Color4.js";
import Matrix3                   from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4                   from "../../standard/Math/Numbers/Matrix4.js";
import Rotation4                 from "../../standard/Math/Numbers/Rotation4.js";
import Vector2                   from "../../standard/Math/Numbers/Vector2.js";
import Vector3                   from "../../standard/Math/Numbers/Vector3.js";
import Vector4                   from "../../standard/Math/Numbers/Vector4.js";
import DEVELOPMENT               from "../DEVELOPMENT.js";

/*
 *  Grammar
 */

// VRML lexical elements
const Grammar = Expressions ({
   // General
   Whitespaces: /[\x20\n,\t\r]+/gy,
   Comment:     /#\/\*[\s\S]*?\*\/#|#.*?(?=[\n\r]|$)/gy,
   Comment3_2:  /#.*?(?=[\n\r]|$)/gy,
   Break:       /\r?\n/g,

   // Header
   Header:      /^#(VRML|X3D) V(.*?) (utf8)(?:[ \t]+(.*?))?[ \t]*[\n\r]/gy,

   // Keywords
   AS:          /AS/gy,
   COMPONENT:   /COMPONENT/gy,
   DEF:         /DEF/gy,
   EXPORT:      /EXPORT/gy,
   EXTERNPROTO: /EXTERNPROTO/gy,
   FALSE:       /FALSE|false/gy,
   IMPORT:      /IMPORT/gy,
   IS:          /IS/gy,
   META:        /META/gy,
   NULL:        /NULL|null/gy,
   TRUE:        /TRUE|true/gy,
   PROFILE:     /PROFILE/gy,
   PROTO:       /PROTO/gy,
   ROUTE:       /ROUTE/gy,
   TO:          /TO/gy,
   UNIT:        /UNIT/gy,
   USE:         /USE/gy,

   // Terminal symbols
   OpenBrace:    /\{/gy,
   CloseBrace:   /\}/gy,
   OpenBracket:  /\[/gy,
   CloseBracket: /\]/gy,
   Period:       /\./gy,
   Colon:        /\:/gy,

   Id: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/gy,
   ComponentNameId: /[^\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]{1}[^\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f\x3a]*/gy,

   initializeOnly: /initializeOnly/gy,
   inputOnly:      /inputOnly/gy,
   outputOnly:     /outputOnly/gy,
   inputOutput:    /inputOutput/gy,

   field:        /field/gy,
   eventIn:      /eventIn/gy,
   eventOut:     /eventOut/gy,
   exposedField: /exposedField/gy,

   FieldType: /[SM]F(?:Bool|ColorRGBA|Color|Double|Float|Image|Int32|Matrix3d|Matrix3f|Matrix4d|Matrix4f|Node|Rotation|String|Time|Vec2d|Vec2f|Vec3d|Vec3f|Vec4d|Vec4f)/gy,

   // Values
   int32: /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/gy,
   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   doubleQuotes: /"/gy,
   noDoubleQuotes: /[^"]+/gy,

   CONSTANTS: /([+-]?)\b(NAN|INFINITY|INF|PI|PI2|PI1_4|PI2_4|PI3_4|PI4_4|PI5_4|PI6_4|PI7_4|PI8_4|PI1_2|PI2_2|PI3_2|PI4_2|PI1_3|PI2_3|PI3_3|PI4_3|PI5_3|PI6_3|SQRT1_2|SQRT2)\b/igy,
   HTMLColor: /[a-zA-Z]+|0[xX][\da-fA-F]+|rgba?\(.*?\)/gy,
});

/*
 *  Parser
 */

function VRMLParser (scene)
{
   X3DParser .call (this, scene);

   this .Grammar =
   {
      Comment: Grammar .Comment,
   };
}

Object .assign (Object .setPrototypeOf (VRMLParser .prototype, X3DParser .prototype),
{
   accessTypes:
   {
      field:          X3DConstants .initializeOnly,
      eventIn:        X3DConstants .inputOnly,
      eventOut:       X3DConstants .outputOnly,
      exposedField:   X3DConstants .inputOutput,
      initializeOnly: X3DConstants .initializeOnly,
      inputOnly:      X3DConstants .inputOnly,
      outputOnly:     X3DConstants .outputOnly,
      inputOutput:    X3DConstants .inputOutput,
   },
   SFImage: new Fields .SFImage (),
   SFNode: new Fields .SFNode (),
   MFString: new Fields .MFString (),
   Color3: new Color3 (),
   Color4: new Color4 (),
   Matrix3: new Matrix3 (),
   Matrix4: new Matrix4 (),
   Rotation4: new Rotation4 (),
   Vector2: new Vector2 (),
   Vector3: new Vector3 (),
   Vector4: new Vector4 (),
   CONSTANTS: {
      NAN: Number .NaN,
      INFINITY: Number .POSITIVE_INFINITY,
      INF: Number .POSITIVE_INFINITY,
      PI:    Math .PI,
      PI2:   Math .PI * 2,
      PI1_4: Math .PI * 1/4,
      PI2_4: Math .PI * 2/4,
      PI3_4: Math .PI * 3/4,
      PI4_4: Math .PI * 4/4,
      PI5_4: Math .PI * 5/4,
      PI6_4: Math .PI * 6/4,
      PI7_4: Math .PI * 7/4,
      PI8_4: Math .PI * 8/4,
      PI1_2: Math .PI * 1/2,
      PI2_2: Math .PI * 2/2,
      PI3_2: Math .PI * 3/2,
      PI4_2: Math .PI * 4/2,
      PI1_3: Math .PI * 1/3,
      PI2_3: Math .PI * 2/3,
      PI3_3: Math .PI * 3/3,
      PI4_3: Math .PI * 4/3,
      PI5_3: Math .PI * 5/3,
      PI6_3: Math .PI * 6/3,
      SQRT1_2: Math .SQRT1_2,
      SQRT2:   Math .SQRT2,
   },
   unknownLevel: 0,
   getEncoding ()
   {
      return "STRING";
   },
   setInput (vrmlSyntax)
   {
      this .input      = vrmlSyntax;
      this .lineNumber = 1;
      this .lastIndex  = 0;
   },
   isValid ()
   {
      if (!(typeof this .input === "string"))
         return false;

      return !! this .input .match (/^(?:#X3D|#VRML|(?:[\x20\n,\t\r]*|#.*?[\r\n])*(PROFILE|COMPONENT|META|UNIT|EXTERNPROTO|PROTO|DEF|NULL|IMPORT|EXPORT|ROUTE|\w+(?:[\x20\n,\t\r]*|#.*?[\r\n])\{|$))/);
   },
   parseIntoScene (resolve, reject)
   {
      try
      {
         this .resolve = resolve;
         this .reject  = reject;

         this .getScene () .setEncoding ("VRML");
         this .getScene () .setProfile (this .getBrowser () .getProfile ("Full"));
         this .x3dScene ();
      }
      catch (error)
      {
         throw new Error (this .getError (error));
      }
   },
   getError (error)
   {
      if (DEVELOPMENT)
         console .error (error);

      const
         string     = error .message,
         unexpected = this .lastIndex === this .input .length ? "Unexpected end of file. " : "";

      let
         rest     = this .getLine (),
         line     = this .getLastLine (),
         lastLine = this .getLastLine (),
         linePos  = line .length - rest .length + 1;

      if (line .length > 80)
      {
         line     = line .substring (linePos - 40, linePos + 40);
         lastLine = "";
         linePos  = 40;
      }

      // Get world URL.

      let worldURL = this .getExecutionContext () .getWorldURL ();

      if (worldURL .startsWith ("data:"))
         worldURL = worldURL .substring (0, worldURL .indexOf (","));

      // Format error.

      const message = "\n"
         + `********************************************************************************\n`
         + `Parser error at line ${this .lineNumber}:${linePos}\n`
         + `in '${worldURL}'\n`
         + `\n`
         + `${lastLine}\n`
         + `${line}\n`
         + `${Array (linePos) .join (" ")}^\n`
         + `${unexpected}${string}\n`
         + `********************************************************************************\n`
      ;

      return message;
   },
   getLine ()
   {
      let
         input     = this .input,
         lastIndex = this .lastIndex,
         line      = "";

      while (lastIndex < input .length && input [lastIndex] !== "\n" && input [lastIndex] !== "\r")
         line += input [lastIndex ++];

      this .lastIndex = lastIndex;

      return line;
   },
   getLastLine ()
   {
      let
         input     = this .input,
         lastIndex = Math .min (this .lastIndex, this .input .length - 1),
         line      = "";

      if (lastIndex < input .length && (input [lastIndex] !== "\n" || input [lastIndex] !== "\r"))
         -- lastIndex;

      while (lastIndex >= 0 && input [lastIndex] !== "\n" && input [lastIndex] !== "\r")
         line = input [lastIndex --] + line;

      this .lastIndex = lastIndex;

      return line;
   },
   comments ()
   {
      while (this .comment ())
         ;
   },
   comment ()
   {
      if (this .whitespaces ())
         return true;

      return this .Grammar .Comment .parse (this);
   },
   whitespaces ()
   {
      if (Grammar .Whitespaces .parse (this))
      {
         this .lines (this .result [0]);

         return true;
      }

      return false;
   },
   lines (string)
   {
      const match = string .match (Grammar .Break);

      if (match)
         this .lineNumber += match .length;
   },
   x3dScene: (() =>
   {
      const VRML =
      [
         "EnvironmentalSensor",
         "PointingDeviceSensor",
         "Scripting",
         "Sound",
         "Text",
      ];

      return function ()
      {
         const
            browser = this .getBrowser (),
            scene   = this .getScene ();

         this .headerStatement ();
         this .profileStatement ();
         this .componentStatements ();
         this .unitStatements ();
         this .metaStatements ();

         if (scene .getSpecificationVersion () === "2.0")
         {
            scene .setProfile (browser .getProfile ("Interchange"));

            for (const componentName of VRML)
               scene .updateComponent (browser .getComponent (componentName));
         }

         if (this .resolve)
         {
            browser .loadComponents (scene) .then (() =>
            {
               try
               {
                  this .statements (this .getExecutionContext () .rootNodes);

                  if (this .lastIndex < this .input .length)
                     throw new Error ("Unknown statement.");

                  this .resolve (scene);
               }
               catch (error)
               {
                  throw new Error (this .getError (error));
               }
            })
            .catch (this .reject);
         }
         else
         {
            this .statements (this .getExecutionContext () .rootNodes);

            if (this .lastIndex < this .input .length)
               throw new Error ("Unknown statement.");
         }
      };
   })(),
   headerStatement ()
   {
      if (Grammar .Header .parse (this))
      {
         this .getScene () .setSpecificationVersion (this .result [2]);

         if (this .getScene () .getSpecificationVersion () <= 3.2)
            this .Grammar .Comment = Grammar .Comment3_2;

         return true;
      }

      return false;
   },
   profileStatement ()
   {
      this .comments ();

      if (Grammar .PROFILE .parse (this))
      {
         if (this .profileNameId ())
         {
            const profile = this .getBrowser () .getProfile (this .result [0]);

            this .getScene () .setProfile (profile);
            return;
         }

         throw new Error ("Expected a profile name.");
      }
   },
   componentStatements ()
   {
      let component;

      while (component = this .componentStatement ())
         this .getScene () .updateComponent (component);
   },
   componentStatement ()
   {
      this .comments ();

      if (Grammar .COMPONENT .parse (this))
      {
         if (this .componentNameId ())
         {
            const componentNameIdCharacters = this .result [0];

            this .comments ();

            if (Grammar .Colon .parse (this))
            {
               if (this .componentSupportLevel ())
               {
                  const componentSupportLevel = this .value;

                  return this .getBrowser () .getComponent (componentNameIdCharacters, componentSupportLevel);
               }

               throw new Error ("Expected a component support level.");
            }

            throw new Error ("Expected a ':' after component name.");
         }

         throw new Error ("Expected a component name.");
      }

      return null;
   },
   componentSupportLevel ()
   {
      return this .int32 ();
   },
   unitStatements ()
   {
      while (this .unitStatement ())
         ;
   },
   unitStatement ()
   {
      this .comments ();

      if (Grammar .UNIT .parse (this))
      {
         if (this .categoryNameId ())
         {
            const categoryNameId = this .result [0];

            if (this .unitNameId ())
            {
               const unitNameId = this .result [0];

               if (this .unitConversionFactor ())
               {
                  const unitConversionFactor = this .value;

                  try
                  {
                     this .getScene () .updateUnit (categoryNameId, unitNameId, unitConversionFactor);
                     return true;
                  }
                  catch (error)
                  {
                     console .warn (`Parser error at line ${this .lineNumber}: ${error .message}`);
                     return true;
                  }
               }

               throw new Error ("Expected unit conversion factor.");
            }

            throw new Error ("Expected unit name identifier.");
         }

         throw new Error ("Expected category name identifier after UNIT statement.");
      }

      return false;
   },
   unitConversionFactor ()
   {
      return this .double ();
   },
   metaStatements ()
   {
      while (this .metaStatement ())
         ;
   },
   metaStatement ()
   {
      this .comments ();

      if (Grammar .META .parse (this))
      {
         if (this .metaKey ())
         {
            const metaKey = this .value;

            if (this .metaValue ())
            {
               const metaValue = this .value;

               this .getScene () .addMetaData (metaKey, metaValue);
               return true;
            }

            throw new Error ("Expected metadata value.");
         }

         throw new Error ("Expected metadata key.");
      }

      return false;
   },
   metaKey ()
   {
      return this .string ();
   },
   metaValue ()
   {
      return this .string ();
   },
   exportStatement ()
   {
      this .comments ();

      if (Grammar .EXPORT .parse (this))
      {
         if (this .nodeNameId ())
         {
            const localNodeNameId = this .result [0];

            this .comments ();

            const node = this .getScene () .getLocalNode (localNodeNameId);

            if (Grammar .AS .parse (this))
            {
               if (this .exportedNodeNameId ())
                  var exportedNodeNameId = this .result [0];
               else
                  throw new Error ("No name given after AS.");
            }
            else
            {
               var exportedNodeNameId = localNodeNameId;
            }

            try
            {
               const existingNode = this .getScene () .getExportedNode (exportedNodeNameId);

               this .getScene () .addExportedNode (this .getScene () .getUniqueExportName (exportedNodeNameId), existingNode);
            }
            catch
            { }

            this .getScene () .updateExportedNode (exportedNodeNameId, node);
            return true;
         }

         throw new Error ("No name given after EXPORT.");
      }

      return false;
   },
   importStatement ()
   {
      this .comments ();

      if (Grammar .IMPORT .parse (this))
      {
         if (this .nodeNameId ())
         {
            const
               inlineNodeNameId = this .result [0],
               namedNode        = this .getExecutionContext () .getNamedNode (inlineNodeNameId);

            this .comments ();

            if (Grammar .Period .parse (this))
            {
               if (this .exportedNodeNameId ())
               {
                  const exportedNodeNameId = this .result [0];

                  this .comments ();

                  if (Grammar .AS .parse (this))
                  {
                     if (this .nodeNameId ())
                        var nodeNameId = this .result [0];

                     else
                        throw new Error ("No name given after AS.");
                  }
                  else
                  {
                     var nodeNameId = exportedNodeNameId;
                  }

                  // Rename existing imported node.

                  this .renameExistingNode (nodeNameId);

                  // Add new imported node.

                  this .getExecutionContext () .addImportedNode (namedNode, exportedNodeNameId, nodeNameId);
                  return true;
               }

               throw new Error ("Expected exported node name.");
            }

            throw new Error ("Expected a '.' after exported node name.");
         }

         throw new Error ("No name given after IMPORT statement.");
      }
      return false;
   },
   statements (field)
   {
      while (this .statement (field))
         ;
   },
   statement (field)
   {
      if (this .protoStatement ())
         return true;

      if (this .routeStatement ())
         return true;

      if (this .importStatement ())
         return true;

      if (this .exportStatement ())
         return true;

      const node = this .nodeStatement ();

      if (node !== false)
      {
         field .push (node);
         return true;
      }

      return false;
   },
   nodeStatement ()
   {
      this .comments ();

      if (Grammar .DEF .parse (this))
      {
         if (this .nodeNameId ())
            return this .node (this .result [0]);

         throw new Error ("No name given after DEF.");
      }

      if (Grammar .USE .parse (this))
      {
         if (this .nodeNameId ())
            return this .getExecutionContext () .getNamedNode (this .result [0]) .getValue ();

         throw new Error ("No name given after USE.");
      }

      if (Grammar .NULL .parse (this))
         return null;

      return this .node ("");
   },
   protoStatement ()
   {
      if (this .proto ())
         return true;

      if (this .externproto ())
         return true;

      return false;
   },
   protoStatements ()
   {
      while (this .protoStatement ())
         ;
   },
   proto ()
   {
      this .comments ();

      if (Grammar .PROTO .parse (this))
      {
         if (this .nodeTypeId ())
         {
            const nodeTypeId = this .result [0];

            this .comments ();

            if (Grammar .OpenBracket .parse (this))
            {
               const interfaceDeclarations = this .interfaceDeclarations ();

               this .comments ();

               if (Grammar .CloseBracket .parse (this))
               {
                  this .comments ();

                  if (Grammar .OpenBrace .parse (this))
                  {
                     const proto = new X3DProtoDeclaration (this .getExecutionContext ());

                     for (const field of interfaceDeclarations)
                        proto .addUserDefinedField (field .getAccessType (), field .getName (), field);

                     this .pushExecutionContext (proto .getBody ());

                     this .protoBody (proto .getBody () .rootNodes);

                     this .popExecutionContext ();

                     this .comments ();

                     if (Grammar .CloseBrace .parse (this))
                     {
                        proto .setup ();

                        try
                        {
                           const existingProto = this .getExecutionContext () .getProtoDeclaration (nodeTypeId);

                           console .warn (`A proto named '${nodeTypeId}' is already defined and will be overridden.`);

                           this .getExecutionContext () .updateProtoDeclaration (this .getExecutionContext () .getUniqueProtoName (nodeTypeId), existingProto);
                        }
                        catch
                        { }

                        this .getExecutionContext () .updateProtoDeclaration (nodeTypeId, proto);

                        return true;
                     }

                     throw new Error ("Expected a '}' at the end of PROTO body.");
                  }

                  throw new Error ("Expected a '{' at the beginning of PROTO body.");
               }

               throw new Error ("Expected a ']' at the end of PROTO interface declaration.");
            }

            throw new Error ("Expected a '[' at the beginning of PROTO interface declaration.");
         }

         throw new Error ("Invalid PROTO definition name.");
      }

      return false;
   },
   protoBody (rootNodes)
   {
      this .protoStatements ();

      const rootNodeStatement = this .rootNodeStatement ();

      if (rootNodeStatement !== false)
         rootNodes .push (rootNodeStatement);

      this .statements (rootNodes);
   },
   rootNodeStatement ()
   {
      this .comments ();

      if (Grammar .DEF .parse (this))
      {
         if (this .nodeNameId ())
         {
            const
               nodeNameId = this .result [0],
               baseNode   = this .node (nodeNameId);

            if (baseNode !== false)
               return baseNode;

            throw new Error ("Expected node type name after DEF.");
         }

         throw new Error ("No name given after DEF.");
      }

      const baseNode = this .node ("");

      if (baseNode !== false)
         return baseNode;

      return false;
   },
   interfaceDeclarations ()
   {
      const interfaceDeclarations = [ ];

      let field;

      while (field = this .interfaceDeclaration ())
         interfaceDeclarations .push (field);

      return interfaceDeclarations;
   },
   restrictedInterfaceDeclaration ()
   {
      this .comments ();

      if (Grammar .inputOnly .parse (this) || Grammar .eventIn .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .inputOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .inputOnly);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ();

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      if (Grammar .outputOnly .parse (this) || Grammar .eventOut .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .outputOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .outputOnly);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ();

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      if (Grammar .initializeOnly .parse (this) || Grammar .field .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .initializeOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               if (this .fieldValue (field))
               {
                  field .setAccessType (X3DConstants .initializeOnly);
                  field .setName (fieldId);
                  return field;
               }

               throw new Error (`Couldn't read value for field '${fieldId}'.`);
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ();

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      return null;
   },
   interfaceDeclaration ()
   {
      const field = this .restrictedInterfaceDeclaration ();

      if (field)
         return field;

      this .comments ();

      if (Grammar .inputOutput .parse (this) || Grammar .exposedField .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .inputOutputId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               if (this .fieldValue (field))
               {
                  field .setAccessType (X3DConstants .inputOutput);
                  field .setName (fieldId);
                  return field;
               }

               throw new Error (`Couldn't read value for field '${fieldId}'.`);
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ();

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      return null;
   },
   externproto ()
   {
      this .comments ();

      if (Grammar .EXTERNPROTO .parse (this))
      {
         if (this .nodeTypeId ())
         {
            const nodeTypeId = this .result [0];

            this .comments ();

            if (Grammar .OpenBracket .parse (this))
            {
               const externInterfaceDeclarations = this .externInterfaceDeclarations ();

               this .comments ();

               if (Grammar .CloseBracket .parse (this))
               {
                  if (this .URLList (this .MFString))
                  {
                     const externproto = new X3DExternProtoDeclaration (this .getExecutionContext (), this .MFString);

                     for (const field of externInterfaceDeclarations)
                        externproto .addUserDefinedField (field .getAccessType (), field .getName (), field);

                     externproto .setup ();

                     try
                     {
                        const existingExternProto = this .getExecutionContext () .getExternProtoDeclaration (nodeTypeId);

                        console .warn (`A extern proto named '${nodeTypeId}' is already defined and will be overridden.`);

                        this .getExecutionContext () .updateExternProtoDeclaration (this .getExecutionContext () .getUniqueExternProtoName (nodeTypeId), existingExternProto);
                     }
                     catch
                     { }

                     this .getExecutionContext () .updateExternProtoDeclaration (nodeTypeId, externproto);
                     return true;
                  }

                  throw new Error (`Expected a URL list after EXTERNPROTO interface declaration '${nodeTypeId}'.`);
               }

               throw new Error ("Expected a ']' at the end of EXTERNPROTO interface declaration.");
            }

            throw new Error ("Expected a '[' at the beginning of EXTERNPROTO interface declaration.");
         }

         throw new Error ("Invalid EXTERNPROTO definition name.");
      }

      return false;
   },
   externInterfaceDeclarations ()
   {
      const externInterfaceDeclarations = [ ];

      let field;

      while (field = this .externInterfaceDeclaration ())
         externInterfaceDeclarations .push (field);

      return externInterfaceDeclarations;
   },
   externInterfaceDeclaration ()
   {
      this .comments ();

      if (Grammar .inputOnly .parse (this) || Grammar .eventIn .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .inputOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .inputOnly);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ()

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      if (Grammar .outputOnly .parse (this) || Grammar .eventOut .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .outputOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .outputOnly);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ()

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      if (Grammar .initializeOnly .parse (this) || Grammar .field .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .initializeOnlyId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .initializeOnly);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ()

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      if (Grammar .inputOutput .parse (this) || Grammar .exposedField .parse (this))
      {
         if (this .fieldType ())
         {
            const fieldType = this .result [0];

            if (this .inputOutputId ())
            {
               const
                  fieldId = this .result [0],
                  field   = new (Fields [fieldType]) ();

               field .setAccessType (X3DConstants .inputOutput);
               field .setName (fieldId);
               return field;
            }

            throw new Error ("Expected a name for field.");
         }

         this .Id ()

         throw new Error (`Unknown event or field type: '${this .result [0]}'.`);
      }

      return null;
   },
   URLList (field)
   {
      return this .mfstringValue (field);
   },
   routeStatement ()
   {
      this .comments ();

      if (Grammar .ROUTE .parse (this))
      {
         if (this .nodeNameId ())
         {
            const
               fromNodeId = this .result [0],
               fromNode   = this .getExecutionContext () .getLocalNode (fromNodeId);

            this .comments ();

            if (Grammar .Period .parse (this))
            {
               if (this .outputOnlyId ())
               {
                  const eventOutId = this .result [0];

                  this .comments ();

                  if (Grammar .TO .parse (this))
                  {
                     if (this .nodeNameId ())
                     {
                        const
                           toNodeId = this .result [0],
                           toNode   = this .getExecutionContext () .getLocalNode (toNodeId);

                        this .comments ();

                        if (Grammar .Period .parse (this))
                        {
                           if (this .inputOnlyId ())
                           {
                              try
                              {
                                 const eventInId = this .result [0];

                                 this .getExecutionContext () .addRoute (fromNode, eventOutId, toNode, eventInId);
                                 return true;
                              }
                              catch (error)
                              {
                                 console .warn (`Parser error at line ${this .lineNumber}: ${error .message}`);

                                 return true;
                              }
                           }

                           throw new Error ("Bad ROUTE specification: Expected a field name.");
                        }

                        throw new Error ("Bad ROUTE specification: Expected a '.' after node name.");
                     }

                     throw new Error ("Bad ROUTE specification: Expected a node name.");
                  }

                  throw new Error ("Bad ROUTE specification: Expected a 'TO'.");
               }

               throw new Error ("Bad ROUTE specification: Expected a field name.");
            }

            throw new Error ("Bad ROUTE specification: Expected a '.' after node name.");
         }

         throw new Error ("Bad ROUTE specification: Expected a node name.");
      }

      return false;
   },
   node (nodeNameId)
   {
      if (this .nodeTypeId ())
      {
         const nodeTypeId = this .result [0];

         const baseNode = this .getExecutionContext () .createNode (nodeTypeId, false)
            ?? this .getExecutionContext () .createProto (nodeTypeId, false);

         if (!baseNode)
         {
            // Parse unknown node.

            if (!this .unknownLevel)
            {
               console .warn (`Parser error at line ${this .lineNumber}: Unknown node type or proto '${nodeTypeId}', you probably have insufficient component/profile statements, and/or an inappropriate specification version.`);
            }

            this .comments ();

            if (Grammar .OpenBrace .parse (this))
            {
               ++ this .unknownLevel;

               this .nodeBody (this .getExecutionContext () .createNode ("MetadataBoolean", false));

               -- this .unknownLevel;

               this .comments ();

               if (Grammar .CloseBrace .parse (this))
                  return null;
            }

            return false;
         }

         if (nodeNameId .length)
         {
            this .renameExistingNode (nodeNameId);

            this .getExecutionContext () .updateNamedNode (nodeNameId, baseNode);
         }

         this .comments ();

         if (Grammar .OpenBrace .parse (this))
         {
            if (baseNode .canUserDefinedFields ())
               this .scriptBody (baseNode);

            else
               this .nodeBody (baseNode);

            this .comments ();

            if (Grammar .CloseBrace .parse (this))
            {
               if (!this .isInsideProtoDeclaration ())
                  baseNode .setup ();

               return baseNode;
            }

            throw new Error ("Expected '}' at the end of node body.");
         }

         throw new Error ("Expected '{' at the beginning of node body.");
      }

      return false;
   },
   scriptBody (baseNode)
   {
      while (this .scriptBodyElement (baseNode))
         ;
   },
   scriptBodyElement (baseNode)
   {
      const
         lastIndex  = this .lastIndex,
         lineNumber = this .lineNumber;

      if (this .Id ())
      {
         const accessType = this .accessTypes [this .result [0]];

         if (accessType)
         {
            if (this .fieldType ())
            {
               const fieldType = this .result [0];

               if (this .Id ())
               {
                  const fieldId = this .result [0];

                  this .comments ();

                  if (Grammar .IS .parse (this))
                  {
                     if (this .isInsideProtoDeclaration ())
                     {
                        if (this .Id ())
                        {
                           const isId = this .result [0];

                           try
                           {
                              var reference = this .getOuterNode () .getField (isId);
                           }
                           catch
                           {
                              console .warn (`Parser error at line ${this .lineNumber}: No such event or field '${isId}' inside PROTO ${this .getOuterNode () .getName ()} interface declaration.`);

                              return true;
                           }

                           if (X3DConstants [fieldType] === reference .getType ())
                           {
                              if (reference .isReference (accessType))
                              {
                                 let field = $.try (() => baseNode .getUserDefinedField (fieldId));

                                 if (!field)
                                 {
                                    field = new (Fields [fieldType]) ();

                                    baseNode .addUserDefinedField (accessType, fieldId, field);
                                 }

                                 if (accessType === field .getAccessType () && reference .getType () === field .getType ())
                                 {
                                    field .addReference (reference);
                                    return true;
                                 }

                                 throw new Error (`Couldn't add field '${fieldId}', field already exists with different access type or data type.`);
                              }

                              throw new Error (`Field '${fieldId}' and '${reference .getName ()}' in PROTO '${this .getOuterNode () .getName ()}' are incompatible as an IS mapping.`);
                           }

                           throw new Error (`Field '${fieldId}' and '${reference .getName ()}' in PROTO '${this .getOuterNode () .getName ()}' have different types.`);
                        }

                        throw new Error ("No name give after IS statement.");
                     }

                     throw new Error ("IS statement outside PROTO definition.");
                  }
               }
            }
         }
      }

      this .lastIndex  = lastIndex;
      this .lineNumber = lineNumber;

      const field = this .interfaceDeclaration ();

      if (field)
      {
         const existingField = $.try (() => baseNode .getUserDefinedField (field .getName ()));

         if (existingField)
         {
            if (existingField .getAccessType () === field .getAccessType () && existingField .getType () === field .getType ())
            {
               existingField .assign (field);
               return true;
            }

            throw new Error (`Couldn't set value for field '${field .getName ()}', field already exists with different access type or data type.`);
         }

         baseNode .addUserDefinedField (field .getAccessType (), field .getName (), field);
         return true;
      }

      return this .nodeBodyElement (baseNode);
   },
   nodeBody (baseNode)
   {
      while (this .nodeBodyElement (baseNode))
         ;
   },
   nodeBodyElement (baseNode)
   {
      if (this .protoStatement ())
         return true;

      if (this .routeStatement ())
         return true;

      if (this .Id ())
      {
         const fieldId = this .result [0];

         try
         {
            var field = baseNode .getPredefinedField (fieldId);
         }
         catch
         {
            // Parse unknown field value.

            const lineNumber = this .lineNumber;

            if (this .unknownValue ())
            {
               if (!this .unknownLevel)
               {
                  console .warn (`Parser error at line ${lineNumber}: Unknown field '${fieldId}' in class '${baseNode .getTypeName ()}'.`);
               }

               return true;
            }

            throw new Error (`Unknown field '${fieldId}' in class '${baseNode .getTypeName ()}'.`);
         }

         this .comments ();

         if (Grammar .IS .parse (this))
         {
            if (this .isInsideProtoDeclaration ())
            {
               if (this .Id ())
               {
                  const isId = this .result [0];

                  try
                  {
                     var reference = this .getOuterNode () .getField (isId);
                  }
                  catch
                  {
                     console .warn (`Parser error at line ${this .lineNumber}: No such event or field '${isId}' inside PROTO ${this .getOuterNode () .getName ()}`);

                     return true;
                  }

                  if (field .getType () === reference .getType ())
                  {
                     if (reference .isReference (field .getAccessType ()))
                     {
                        field .addReference (reference);
                        return true;
                     }

                     throw new Error (`Field '${field .getName ()}' and '${reference .getName ()}' in PROTO ${this .getOuterNode () .getName ()} are incompatible as an IS mapping.`);
                  }

                  throw new Error (`Field '${field .getName ()}' and '${reference .getName ()}' in PROTO ${this .getOuterNode () .getName ()} have different types.`);
               }

               throw new Error("No name give after IS statement.");
            }

            throw new Error ("IS statement outside PROTO definition.");
         }

         if (field .isInitializable ())
         {
            if (this .fieldValue (field))
               return true;

            throw new Error (`Couldn't read value for field '${fieldId}'.`);
         }

         throw new Error (`Couldn't assign value to ${this .accessTypeToString (field .getAccessType ())} field '${fieldId}'.`);
      }

      return false;
   },
   profileNameId () { return this .Id (); },
   componentNameId ()
   {
      this .comments ();

      return Grammar .ComponentNameId .parse (this);
   },
   categoryNameId () { return this .Id (); },
   unitNameId () { return this .Id (); },
   exportedNodeNameId () { return this .Id (); },
   nodeNameId () { return this .Id (); },
   nodeTypeId () { return this .Id (); },
   initializeOnlyId () { return this .Id (); },
   inputOnlyId () { return this .Id (); },
   outputOnlyId () { return this .Id (); },
   inputOutputId () { return this .Id (); },
   Id ()
   {
      this .comments ();

      return Grammar .Id .parse (this);
   },
   fieldType ()
   {
      this .comments ();

      return Grammar .FieldType .parse (this);
   },
   fieldValue (field)
   {
      return this [field .getType ()] (field, field .getUnit ());
   },
   bool ()
   {
      this .comments ();

      if (Grammar .TRUE .parse (this))
      {
         this .value = true;
         return true;
      }

      if (Grammar .FALSE .parse (this))
      {
         this .value = false;
         return true;
      }

      return false;
   },
   double ()
   {
      this .comments ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);
         return true;
      }

      // Constants

      if (Grammar .CONSTANTS .parse (this))
      {
         this .value = this .CONSTANTS [this .result [2] .toUpperCase ()];

         if (this .result [1] === "-")
            this .value = -this .value;

         return true;
      }

      return false;
   },
   int32 ()
   {
      this .comments ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [0]);
         return true;
      }

      return false;
   },
   string ()
   {
      this .comments ();

      if (Grammar .doubleQuotes .parse (this))
      {
         let value = "";

         while (Grammar .noDoubleQuotes .parse (this))
         {
            value += this .result [0];

            const m = value .match (/\\+$/);

            if (!m || m [0] .length % 2 === 0)
               break;

            Grammar .doubleQuotes .parse (this);

            value += '"';
         }

         if (Grammar .doubleQuotes .parse (this))
         {
            this .lines (value);

            this .value = Fields .SFString .unescape (value);

            return true;
         }
      }

      return false;
   },
   sfboolValue (field)
   {
      if (this .bool ())
      {
         field .setValue (this .value);
         return true;
      }

      return false;
   },
   mfboolValue (field)
   {
      field .length = 0;

      if (this .bool ())
      {
         field .push (this .value);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfboolValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfboolValues (field)
   {
      const array = [ ];

      while (this .bool ())
         array .push (this .value);

      field .setValue (array);

      return field .length !== 0;
   },
   sfcolorValue (field)
   {
      const lastIndex = this .lastIndex;

      if (this .double ())
      {
         const r = this .value;

         if (this .double ())
         {
            const g = this .value;

            if (this .double ())
            {
               const b = this .value;

               field .r = r;
               field .g = g;
               field .b = b;

               return true;
            }
         }
      }

      this .lastIndex = lastIndex;

      this .comments ();

      if (Grammar .HTMLColor .parse (this))
      {
         const color = this .convertColor (this .result [0] .replace (/0x/i, "#"));

         field .r = color [0];
         field .g = color [1];
         field .b = color [2];

         return true;
      }

      return false;
   },
   mfcolorValue (field)
   {
      field .length = 0;

      if (this .sfcolorValue (this .Color3))
      {
         field .push (this .Color3);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfcolorValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfcolorValues (field)
   {
      const array = [ ];

      while (this .double ())
         array .push (this .value);

      field .setValue (array);

      return field .length !== 0;
   },
   sfcolorrgbaValue (field)
   {
      const lastIndex = this .lastIndex;

      if (this .double ())
      {
         const r = this .value;

         if (this .double ())
         {
            const g = this .value;

            if (this .double ())
            {
               const b = this .value;

               if (this .double ())
               {
                  const a = this .value;

                  field .r = r;
                  field .g = g;
                  field .b = b;
                  field .a = a;

                  return true;
               }
            }
         }
      }

      this .lastIndex = lastIndex;

      this .comments ();

      if (Grammar .HTMLColor .parse (this))
      {
         const color = this .convertColor (this .result [0] .replace (/0x/i, "#"));

         field .r = color [0];
         field .g = color [1];
         field .b = color [2];
         field .a = color [3];

         return true;
      }

      return false;
   },
   mfcolorrgbaValue (field)
   {
      field .length = 0;

      if (this .sfcolorrgbaValue (this .Color4))
      {
         field .push (this .Color4);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfcolorValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfdoubleValue (field)
   {
      if (this .double ())
      {
         field .setValue (this .fromUnit (field .getUnit (), this .value));
         return true;
      }

      return false;
   },
   mfdoubleValue (field)
   {
      field .length = 0;

      if (this .double ())
      {
         field .push (this .fromUnit (field .getUnit (), this .value));
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfdoubleValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfdoubleValues (field)
   {
      const
         unit  = field .getUnit (),
         array = [ ];

      while (this .double ())
         array .push (this .fromUnit (unit, this .value));

      field .setValue (array);

      return field .length !== 0;
   },
   sfimageValue (field)
   {
      if (this .int32 ())
      {
         const width = this .value;

         if (this .int32 ())
         {
            const height = this .value;

            if (this .int32 ())
            {
               const
                  comp  = this .value,
                  size  = width * height,
                  array = [ ];

               for (let i = 0; i < size; ++ i)
               {
                  if (this .int32 ())
                  {
                     array .push (this .value);
                     continue;
                  }

                  return false;
               }

               field .width  = width;
               field .height = height;
               field .comp   = comp;
               field .array  = array;

               return true;
            }
         }
      }

      return false;
   },
   mfimageValue (field)
   {
      field .length = 0;

      if (this .sfimageValue (this .SFImage))
      {
         field .push (this .SFImage);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfimageValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfimageValues (field)
   {
      field .length = 0;

      const
         target = field .getTarget (),
         value  = this .SFImage;

      while (this .sfimageValue (value))
         target .push (value);

      return field .length !== 0;
   },
   sfint32Value (field)
   {
      if (this .int32 ())
      {
         field .setValue (this .value);
         return true;
      }

      return false;
   },
   mfint32Value (field)
   {
      field .length = 0;

      if (this .int32 ())
      {
         field .push (this .value);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfint32Values (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfint32Values (field)
   {
      const array = [ ];

      while (this .int32 ())
         array .push (this .value);

      field .setValue (array);

      return field .length !== 0;
   },
   sfmatrix3Value (field)
   {
      if (this .double ())
      {
         const m00 = this .value;

         if (this .double ())
         {
            const m01 = this .value;

            if (this .double ())
            {
               const m02 = this .value;

                  if (this .double ())
                  {
                     const m10 = this .value;

                     if (this .double ())
                     {
                        const m11 = this .value;

                        if (this .double ())
                        {
                           const m12 = this .value;

                           if (this .double ())
                           {
                              const m20 = this .value;

                              if (this .double ())
                              {
                                 const m21 = this .value;

                                 if (this .double ())
                                 {
                                    const m22 = this .value;

                                    field [0] = m00;
                                    field [1] = m01;
                                    field [2] = m02;
                                    field [3] = m10;
                                    field [4] = m11;
                                    field [5] = m12;
                                    field [6] = m20;
                                    field [7] = m21;
                                    field [8] = m22;

                                    return true;
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }

      return false;
   },
   mfmatrix3Value (field)
   {
      field .length = 0;

      if (this .sfmatrix3Value (this .Matrix3))
      {
         field .push (this .Matrix3);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfmatrixValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfmatrixValues (field)
   {
      const array = [ ];

      while (this .double ())
         array .push (this .value);

      field .setValue (array);

      return field .length !== 0;
   },
   sfmatrix4Value (field)
   {
      if (this .double ())
      {
         const m00 = this .value;

         if (this .double ())
         {
            const m01 = this .value;

            if (this .double ())
            {
               const m02 = this .value;

               if (this .double ())
               {
                  const m03 = this .value;

                  if (this .double ())
                  {
                     const m10 = this .value;

                     if (this .double ())
                     {
                        const m11 = this .value;

                        if (this .double ())
                        {
                           const m12 = this .value;

                           if (this .double ())
                           {
                              const m13 = this .value;

                              if (this .double ())
                              {
                                 const m20 = this .value;

                                 if (this .double ())
                                 {
                                    const m21 = this .value;

                                    if (this .double ())
                                    {
                                       const m22 = this .value;

                                       if (this .double ())
                                       {
                                          const m23 = this .value;

                                          if (this .double ())
                                          {
                                             const m30 = this .value;

                                             if (this .double ())
                                             {
                                                const m31 = this .value;

                                                if (this .double ())
                                                {
                                                   const m32 = this .value;

                                                   if (this .double ())
                                                   {
                                                      const m33 = this .value;

                                                      field [ 0] = m00;
                                                      field [ 1] = m01;
                                                      field [ 2] = m02;
                                                      field [ 3] = m03;
                                                      field [ 4] = m10;
                                                      field [ 5] = m11;
                                                      field [ 6] = m12;
                                                      field [ 7] = m13;
                                                      field [ 8] = m20;
                                                      field [ 9] = m21;
                                                      field [10] = m22;
                                                      field [11] = m23;
                                                      field [12] = m30;
                                                      field [13] = m31;
                                                      field [14] = m32;
                                                      field [15] = m33;

                                                      return true;
                                                   }
                                                }
                                             }
                                          }
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }

      return false;
   },
   mfmatrix4Value (field)
   {
      field .length = 0;

      if (this .sfmatrix4Value (this .Matrix4))
      {
         field .push (this .Matrix4);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfmatrixValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfnodeValue (field)
   {
      const baseNode = this .nodeStatement ();

      if (baseNode !== false)
      {
         field .setValue (baseNode);
         return true;
      }

      return false;
   },
   mfnodeValue (field)
   {
      field .length = 0;

      const node = this .nodeStatement ();

      if (node !== false)
      {
         field .push (node);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .nodeStatements (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   nodeStatements (field)
   {
      this .statements (field);

      // let node = this .nodeStatement ();

      // while (node !== false)
      // {
      //    field .push (node);

      //    node = this .nodeStatement ();
      // }
   },
   sfrotationValue (field)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            if (this .double ())
            {
               const z = this .value;

               if (this .double ())
               {
                  const angle = this .value;

                  field .x     = x;
                  field .y     = y;
                  field .z     = z;
                  field .angle = this .fromUnit ("angle", angle);

                  return true;
               }
            }
         }
      }

      return false;
   },
   mfrotationValue (field)
   {
      field .length = 0;

      if (this .sfrotationValue (this .Rotation4))
      {
         field .push (this .Rotation4);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfrotationValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfrotationValues (field)
   {
      field .length = 0;

      const
         target = field .getTarget (),
         value  = this .Rotation4;

      while (this .sfrotationValue (value))
         target .push (value);

      return field .length !== 0;
   },
   sfstringValue (field)
   {
      if (this .string ())
      {
         field .setValue (this .value);
         return true;
      }

      return false;
   },
   mfstringValue (field)
   {
      field .length = 0;

      if (this .string ())
      {
         field .push (this .value);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfstringValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfstringValues (field)
   {
      const array = [ ];

      while (this .string ())
         array .push (this .value);

      field .setValue (array);

      return field .length !== 0;
   },
   sfvec2Value (field, unit)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            field .x = this .fromUnit (unit, x);
            field .y = this .fromUnit (unit, y);

            return true;
         }
      }

      return false;
   },
   mfvec2Value (field)
   {
      field .length = 0;

      if (this .sfvec2Value (this .Vector2, field .getUnit ()))
      {
         field .push (this .Vector2);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfvecValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfvecValues (field)
   {
      const
         unit  = field .getUnit (),
         array = [ ];

      while (this .double ())
         array .push (this .fromUnit (unit, this .value));

      field .setValue (array);

      return field .length !== 0;
   },
   sfvec3Value (field, unit)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            if (this .double ())
            {
               const z = this .value;

               field .x = this .fromUnit (unit, x);
               field .y = this .fromUnit (unit, y);
               field .z = this .fromUnit (unit, z);

               return true;
            }
         }
      }

      return false;
   },
   mfvec3Value (field)
   {
      field .length = 0;

      if (this .sfvec3Value (this .Vector3, field .getUnit ()))
      {
         field .push (this .Vector3);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfvecValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfvec4Value (field, unit)
   {
      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            if (this .double ())
            {
               const z = this .value;

               if (this .double ())
               {
                  const w = this .value;

                  field .x = this .fromUnit (unit, x);
                  field .y = this .fromUnit (unit, y);
                  field .z = this .fromUnit (unit, z);
                  field .w = this .fromUnit (unit, w);

                  return true;
               }
            }
         }
      }

      return false;
   },
   mfvec4Value (field)
   {
      field .length = 0;

      if (this .sfvec4Value (this .Vector4, field .getUnit ()))
      {
         field .push (this .Vector4);
         return true;
      }

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfvecValues (field);

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   unknownValue ()
   {
      try
      {
         ++ this .unknownLevel;

         if (Grammar .IS .parse (this))
         {
            if (this .isInsideProtoDeclaration ())
            {
               if (this .Id ())
                  return true;
            }
         }

         if (this .mfunknownValue ())
            return true;

         return false;
      }
      finally
      {
         -- this .unknownLevel;
      }
   },
   sfunknownValue ()
   {
      if (this .sfboolValue (new Fields .SFBool ()))
         return true;

      if (this .sfdoubleValues (new Fields .MFFloat ()))
         return true;

      if (this .sfstringValue (new Fields .SFString ()))
         return true;

      if (this .sfnodeValue (new Fields .SFNode ()))
         return true;

      return false;
   },
   mfunknownValue ()
   {
      if (this .sfunknownValue ())
         return true;

      if (Grammar .OpenBracket .parse (this))
      {
         this .sfunknownValues ();

         if (Grammar .CloseBracket .parse (this))
            return true;

         throw new Error ("Expected ']'.");
      }

      return false;
   },
   sfunknownValues ()
   {
      while (this .sfunknownValue ())
         ;
   },
   accessTypeToString (accessType)
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
});

Object .assign (VRMLParser .prototype,
{
   [X3DConstants .SFBool]:      VRMLParser .prototype .sfboolValue,
   [X3DConstants .SFColor]:     VRMLParser .prototype .sfcolorValue,
   [X3DConstants .SFColorRGBA]: VRMLParser .prototype .sfcolorrgbaValue,
   [X3DConstants .SFDouble]:    VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFFloat]:     VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFImage]:     VRMLParser .prototype .sfimageValue,
   [X3DConstants .SFInt32]:     VRMLParser .prototype .sfint32Value,
   [X3DConstants .SFMatrix3f]:  VRMLParser .prototype .sfmatrix3Value,
   [X3DConstants .SFMatrix3d]:  VRMLParser .prototype .sfmatrix3Value,
   [X3DConstants .SFMatrix4f]:  VRMLParser .prototype .sfmatrix4Value,
   [X3DConstants .SFMatrix4d]:  VRMLParser .prototype .sfmatrix4Value,
   [X3DConstants .SFNode]:      VRMLParser .prototype .sfnodeValue,
   [X3DConstants .SFRotation]:  VRMLParser .prototype .sfrotationValue,
   [X3DConstants .SFString]:    VRMLParser .prototype .sfstringValue,
   [X3DConstants .SFTime]:      VRMLParser .prototype .sfdoubleValue,
   [X3DConstants .SFVec2d]:     VRMLParser .prototype .sfvec2Value,
   [X3DConstants .SFVec2f]:     VRMLParser .prototype .sfvec2Value,
   [X3DConstants .SFVec3d]:     VRMLParser .prototype .sfvec3Value,
   [X3DConstants .SFVec3f]:     VRMLParser .prototype .sfvec3Value,
   [X3DConstants .SFVec4d]:     VRMLParser .prototype .sfvec4Value,
   [X3DConstants .SFVec4f]:     VRMLParser .prototype .sfvec4Value,

   [X3DConstants .VrmlMatrix]:  VRMLParser .prototype .sfmatrix4Value,

   [X3DConstants .MFBool]:      VRMLParser .prototype .mfboolValue,
   [X3DConstants .MFColor]:     VRMLParser .prototype .mfcolorValue,
   [X3DConstants .MFColorRGBA]: VRMLParser .prototype .mfcolorrgbaValue,
   [X3DConstants .MFDouble]:    VRMLParser .prototype .mfdoubleValue,
   [X3DConstants .MFFloat]:     VRMLParser .prototype .mfdoubleValue,
   [X3DConstants .MFImage]:     VRMLParser .prototype .mfimageValue,
   [X3DConstants .MFInt32]:     VRMLParser .prototype .mfint32Value,
   [X3DConstants .MFMatrix3d]:  VRMLParser .prototype .mfmatrix3Value,
   [X3DConstants .MFMatrix3f]:  VRMLParser .prototype .mfmatrix3Value,
   [X3DConstants .MFMatrix4d]:  VRMLParser .prototype .mfmatrix4Value,
   [X3DConstants .MFMatrix4f]:  VRMLParser .prototype .mfmatrix4Value,
   [X3DConstants .MFNode]:      VRMLParser .prototype .mfnodeValue,
   [X3DConstants .MFRotation]:  VRMLParser .prototype .mfrotationValue,
   [X3DConstants .MFString]:    VRMLParser .prototype .mfstringValue,
   [X3DConstants .MFTime]:      VRMLParser .prototype .mfdoubleValue,
   [X3DConstants .MFVec2d]:     VRMLParser .prototype .mfvec2Value,
   [X3DConstants .MFVec2f]:     VRMLParser .prototype .mfvec2Value,
   [X3DConstants .MFVec3d]:     VRMLParser .prototype .mfvec3Value,
   [X3DConstants .MFVec3f]:     VRMLParser .prototype .mfvec3Value,
   [X3DConstants .MFVec4d]:     VRMLParser .prototype .mfvec4Value,
   [X3DConstants .MFVec4f]:     VRMLParser .prototype .mfvec4Value,
});

X3DField .prototype .fromVRMLString = function (string, scene)
{
   const parser = new VRMLParser (scene);

   parser .setUnits (!!scene);
   parser .setInput (string);

   if (parser .fieldValue (this))
      return;

   throw new Error (`Couldn't read value for field '${this .getName ()}'.`);
};

export default VRMLParser;
