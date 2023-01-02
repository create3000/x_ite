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

import SupportedNodes          from "../Configuration/SupportedNodes.js";
import Fields                  from "../Fields.js";
import X3DFieldDefinition      from "../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../Base/FieldDefinitionArray.js";
import X3DExecutionContext     from "../Execution/X3DExecutionContext.js";
import X3DProtoDeclarationNode from "./X3DProtoDeclarationNode.js";
import X3DConstants            from "../Base/X3DConstants.js";

SupportedNodes .addAbstractType ("X3DProtoDeclaration", X3DProtoDeclaration);

const
   _body = Symbol ();

function X3DProtoDeclaration (executionContext)
{
   X3DProtoDeclarationNode .call (this, executionContext);

   this .addType (X3DConstants .X3DProtoDeclaration)

   this [_body] = new X3DExecutionContext (executionContext);
   this [_body] .setOuterNode (this);
   this [_body] .setLive (false);
   this .setLive (false);
}

X3DProtoDeclaration .prototype = Object .assign (Object .create (X3DProtoDeclarationNode .prototype),
{
   constructor: X3DProtoDeclaration,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "X3DProtoDeclaration";
   },
   initialize: function ()
   {
      X3DProtoDeclarationNode .prototype .initialize .call (this);

      this [_body] .setup ();
   },
   getProtoDeclaration: function ()
   {
      return this;
   },
   getBody: function ()
   {
      return this [_body];
   },
   canUserDefinedFields: function ()
   {
      return true;
   },
   toVRMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "PROTO";
      generator .string += generator .Space ();
      generator .string += this .getName ();
      generator .string += generator .TidySpace ();
      generator .string += "[";

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length === 0)
      {
         generator .string += generator .TidySpace ();
      }
      else
      {
         let
            fieldTypeLength  = 0,
            accessTypeLength = 0;

         for (const field of userDefinedFields)
         {
            fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
            accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
         }

         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

            generator .string += generator .Break ();
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
      }

      generator .LeaveScope ();

      generator .string += "]";
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += "{";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      this [_body] .toVRMLStream (generator);

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "}";
   },
   toVRMLStreamUserDefinedField: function (generator, field, fieldTypeLength, accessTypeLength)
   {
      generator .string += generator .Indent ();
      generator .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
      generator .string += generator .Space ();
      generator .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
      generator .string += generator .Space ();
      generator .string += field .getName ();

      if (field .isInitializable ())
      {
         generator .string += generator .Space ();

         field .toVRMLStream (generator);
      }
   },
   toXMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<ProtoDeclare";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .getName ());
      generator .string += "'";
      generator .string += ">";
      generator .string += generator .TidyBreak ();

      // <ProtoInterface>

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length !== 0)
      {
         generator .IncIndent ();

         generator .string += generator .Indent ();
         generator .string += "<ProtoInterface>";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += "<field";
            generator .string += generator .Space ();
            generator .string += "accessType='";
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "type='";
            generator .string += field .getTypeName ();
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "name='";
            generator .string += generator .XMLEncode (field .getName ());
            generator .string += "'";

            if (field .isDefaultValue ())
            {
               generator .string += "/>";
               generator .string += generator .TidyBreak ();
            }
            else
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  case X3DConstants .MFNode:
                  {
                     generator .PushContainerField (field);

                     generator .string += generator .TidyBreak ();

                     generator .IncIndent ();

                     field .toXMLStream (generator);

                     generator .string += generator .TidyBreak ();

                     generator .DecIndent ();

                     generator .string += generator .Indent ();
                     generator .string += "</field>";
                     generator .string += generator .TidyBreak ();

                     generator .PopContainerField ();
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Space ();
                     generator .string += "value='";

                     field .toXMLStream (generator);

                     generator .string += "'";
                     generator .string += "/>";
                     generator .string += generator .TidyBreak ();
                     break;
                  }
               }
            }
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</ProtoInterface>";
         generator .string += generator .TidyBreak ();

         generator .DecIndent ();
      }

      generator .LeaveScope ();

      // </ProtoInterface>

      // <ProtoBody>

      generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += "<ProtoBody>";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      this [_body] .toXMLStream (generator);

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "</ProtoBody>";
      generator .string += generator .TidyBreak ();

      generator .DecIndent ();

      // </ProtoBody>

      generator .string += generator .Indent ();
      generator .string += "</ProtoDeclare>";
   },
   toJSONStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ProtoDeclare";
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
      generator .string += "@name";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .JSONEncode (this .getName ());
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "ProtoInterface";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();


      // Fields

      generator .EnterScope ();

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length)
      {
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "field";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         for (const field of userDefinedFields)
         {
            generator .string += generator .Indent ();
            generator .string += '{';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@accessType";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .AccessType (field .getAccessType ());
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@type";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += field .getTypeName ();
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@name";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += generator .JSONEncode (field .getName ());

            if (field .isDefaultValue ())
            {
               generator .string += generator .TidyBreak ();
            }
            else
            {
               generator .string += ',';
               generator .string += generator .TidyBreak ();

               // Output value

               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "-children";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();
                     generator .string += '[';
                     generator .string += generator .TidyBreak ();
                     generator .string += generator .IncIndent ();
                     generator .string += generator .Indent ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     generator .string += generator .DecIndent ();
                     generator .string += generator .Indent ();
                     generator .string += ']';
                     generator .string += generator .TidyBreak ();
                     break;
                  }
                  case X3DConstants .MFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "-children";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += "@value";
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);

                     generator .string += generator .TidyBreak ();
                     break;
                  }
               }
            }

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';

            if (field !== userDefinedFields .at (-1))
               generator .string += ',';

            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';
      }

      generator .string += generator .DecIndent ();
      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .LeaveScope ();


      // ProtoBody

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "ProtoBody";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "-children";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '[';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      this [_body] .toJSONStream (generator);

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += ']';
      generator .string += generator .TidyBreak ();

      // End

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Reflect .ownKeys (X3DProtoDeclaration .prototype))
   Object .defineProperty (X3DProtoDeclaration .prototype, key, { enumerable: false });

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

export default X3DProtoDeclaration;
