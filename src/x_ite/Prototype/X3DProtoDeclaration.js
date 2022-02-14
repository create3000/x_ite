/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Configuration/SupportedNodes",
   "x_ite/Fields",
   "x_ite/Basic/FieldDefinitionArray",
   "x_ite/Execution/X3DExecutionContext",
   "x_ite/Prototype/X3DProtoDeclarationNode",
   "x_ite/Bits/X3DConstants",
   "x_ite/InputOutput/Generator",
],
function (SupportedNodes,
          Fields,
          FieldDefinitionArray,
          X3DExecutionContext,
          X3DProtoDeclarationNode,
          X3DConstants,
          Generator)
{
"use strict";

   SupportedNodes .addAbstractType ("X3DProtoDeclaration");

   function X3DProtoDeclaration (executionContext)
   {
      X3DProtoDeclarationNode .call (this, executionContext);

      this .addType (X3DConstants .X3DProtoDeclaration)

      this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));

      this .setLive (false);

      this .body = new X3DExecutionContext (executionContext);
      this .body .setNode (this);
   }

   X3DProtoDeclaration .prototype = Object .assign (Object .create (X3DProtoDeclarationNode .prototype),
   {
      constructor: X3DProtoDeclaration,
      fieldDefinitions: new FieldDefinitionArray ([ ]),
      getTypeName: function ()
      {
         return "X3DProtoDeclaration";
      },
      initialize: function ()
      {
         X3DProtoDeclarationNode .prototype .initialize .call (this);

         this .body .setup ();

         this .loadState_ = X3DConstants .COMPLETE_STATE;
      },
      getProtoDeclaration: function ()
      {
         return this;
      },
      getBody: function ()
      {
         return this .body;
      },
      checkLoadState: function ()
      {
         return this .loadState_ .getValue ();
      },
      hasUserDefinedFields: function ()
      {
         return true;
      },
      toVRMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         stream .string += generator .Indent ();
         stream .string += "PROTO";
         stream .string += " ";
         stream .string += this .getName ();
         stream .string += " ";
         stream .string += "[";

         generator .EnterScope ();

         const userDefinedFields = this .getUserDefinedFields ();

         let
            fieldTypeLength  = 0,
            accessTypeLength = 0;

         if (userDefinedFields .size === 0)
         {
            stream .string += " ";
         }
         else
         {
            userDefinedFields .forEach (function (field)
            {
               fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
               accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
            });

            stream .string += "\n";

            generator .IncIndent ();

            userDefinedFields .forEach (function (field)
            {
               this .toVRMLStreamUserDefinedField (stream, field, fieldTypeLength, accessTypeLength);
               stream .string += "\n";
            },
            this);

            generator .DecIndent ();

            stream .string += generator .Indent ();
         }

         generator .LeaveScope ();

         stream .string += "]";
         stream .string += "\n";

         stream .string += generator .Indent ();
         stream .string += "{";
         stream .string += "\n";

         generator .IncIndent ();

         this .body .toVRMLStream (stream);

         generator .DecIndent ();

         stream .string += generator .Indent ();
         stream .string += "}";
      },
      toVRMLStreamUserDefinedField: function (stream, field, fieldTypeLength, accessTypeLength)
      {
         const generator = Generator .Get (stream);

         stream .string += generator .Indent ();
         stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
         stream .string += " ";
         stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
         stream .string += " ";
         stream .string += field .getName ();

         if (field .isInitializable ())
         {
            stream .string += " ";

            field .toVRMLStream (stream);
         }
      },
      toXMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         stream .string += generator .Indent ();
         stream .string += "<ProtoDeclare";
         stream .string += " ";
         stream .string += "name='";
         stream .string += generator .XMLEncode (this .getName ());
         stream .string += "'";
         stream .string += ">";
         stream .string += "\n";

         // <ProtoInterface>

         generator .EnterScope ();

         const userDefinedFields = this .getUserDefinedFields ();

         if (userDefinedFields .size !== 0)
         {
            generator .IncIndent ();

            stream .string += generator .Indent ();
            stream .string += "<ProtoInterface>\n";

            generator .IncIndent ();

            userDefinedFields .forEach (function (field)
            {
               stream .string += generator .Indent ();
               stream .string += "<field";
               stream .string += " ";
               stream .string += "accessType='";
               stream .string += generator .AccessType (field .getAccessType ());
               stream .string += "'";
               stream .string += " ";
               stream .string += "type='";
               stream .string += field .getTypeName ();
               stream .string += "'";
               stream .string += " ";
               stream .string += "name='";
               stream .string += generator .XMLEncode (field .getName ());
               stream .string += "'";

               if (field .isDefaultValue ())
               {
                  stream .string += "/>\n";
               }
               else
               {
                  switch (field .getType ())
                  {
                     case X3DConstants .SFNode:
                     case X3DConstants .MFNode:
                     {
                        generator .PushContainerField (field);

                        stream .string += ">\n";

                        generator .IncIndent ();

                        field .toXMLStream (stream);

                        stream .string += "\n";

                        generator .DecIndent ();

                        stream .string += generator .Indent ();
                        stream .string += "</field>\n";

                        generator .PopContainerField ();
                        break;
                     }
                     default:
                     {
                        stream .string += " ";
                        stream .string += "value='";

                        field .toXMLStream (stream);

                        stream .string += "'";
                        stream .string += "/>\n";
                        break;
                     }
                  }
               }
            });

            generator .DecIndent ();

            stream .string += generator .Indent ();
            stream .string += "</ProtoInterface>\n";

            generator .DecIndent ();
         }

         generator .LeaveScope ();

         // </ProtoInterface>

         // <ProtoBody>

         generator .IncIndent ();

         stream .string += generator .Indent ();
         stream .string += "<ProtoBody>\n";

         generator .IncIndent ();

         this .body .toXMLStream (stream);

         generator .DecIndent ();

         stream .string += generator .Indent ();
         stream .string += "</ProtoBody>\n";

         generator .DecIndent ();

         // </ProtoBody>

         stream .string += generator .Indent ();
         stream .string += "</ProtoDeclare>";
      },
   });

   Object .defineProperty (X3DProtoDeclaration .prototype, "name",
   {
      get: function () { return this .getName (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DProtoDeclaration .prototype, "fields",
   {
      get: function () { return this .getFieldDefinitions (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DProtoDeclaration .prototype, "isExternProto",
   {
      get: function () { return false; },
      enumerable: true,
      configurable: false
   });

   return X3DProtoDeclaration;
});
