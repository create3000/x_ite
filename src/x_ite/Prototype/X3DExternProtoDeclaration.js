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
import X3DUrlObject            from "../Components/Networking/X3DUrlObject.js";
import X3DProtoDeclarationNode from "./X3DProtoDeclarationNode.js";
import X3DConstants            from "../Base/X3DConstants.js";
import FileLoader              from "../InputOutput/FileLoader.js";

SupportedNodes .addAbstractNodeType ("X3DExternProtoDeclaration", X3DExternProtoDeclaration);

const
   _proto = Symbol (),
   _scene = Symbol ();

function X3DExternProtoDeclaration (executionContext, url)
{
   X3DProtoDeclarationNode .call (this, executionContext);
   X3DUrlObject            .call (this, executionContext);

   this .addType (X3DConstants .X3DExternProtoDeclaration)

   this .addChildObjects ("load",                 new Fields .SFBool (true),
                          "url",                  url .copy (), // Must be of type MFString.
                          "autoRefresh",          new Fields .SFTime (),
                          "autoRefreshTimeLimit", new Fields .SFTime (3600));
}

X3DExternProtoDeclaration .prototype = Object .assign (Object .create (X3DProtoDeclarationNode .prototype),
   X3DUrlObject .prototype,
{
   constructor: X3DExternProtoDeclaration,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "X3DExternProtoDeclaration";
   },
   initialize: function ()
   {
      X3DProtoDeclarationNode .prototype .initialize .call (this);
      X3DUrlObject            .prototype .initialize .call (this);
   },
   set_live__: function ()
   {
      X3DUrlObject .prototype .set_live__ .call (this);

      if (this .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         return;

      this [_scene] .setLive (this .getLive () .getValue ());
   },
   canUserDefinedFields: function ()
   {
      return true;
   },
   setProtoDeclaration: function (proto)
   {
      this [_proto] = proto;

      if (proto)
      {
         for (const field of [... this .getUserDefinedFields ()])
            this .removeUserDefinedField (field .getName ())

         for (const field of proto .getUserDefinedFields ())
            this .addUserDefinedField (field .getAccessType (), field .getName (), field);
      }

      this .updateInstances ();
   },
   getProtoDeclaration: function ()
   {
      return this [_proto];
   },
   loadData: function ()
   {
      // 7.73 — ExternProtoDeclaration function

      this .getScene () .addInitLoadCount (this);

      new FileLoader (this) .createX3DFromURL (this ._url, null, this .setInternalSceneAsync .bind (this));
   },
   setInternalSceneAsync: function (value)
   {
      if (value)
         this .setInternalScene (value);

      else
         this .setError (new Error ("File could not be loaded."));

      this .getScene () .removeInitLoadCount (this);
   },
   setInternalScene: function (value)
   {
      this [_scene] = value;

      const
         protoName = decodeURIComponent (new URL (this [_scene] .getWorldURL ()) .hash .substr (1)),
         proto     = protoName ? this [_scene] .protos .get (protoName) : this [_scene] .protos [0];

      if (!proto)
         throw new Error ("PROTO not found");

      this [_scene] .setLive (this .getLive () .getValue ());
      this [_scene] .setPrivate (this .getScene () .isPrivate ());
      this [_scene] .setExecutionContext (this .getExecutionContext ());

      this .setLoadState (X3DConstants .COMPLETE_STATE);
      this .setProtoDeclaration (proto);
   },
   getInternalScene: function ()
   {
      ///  Returns the internal X3DScene of this extern proto, that is loaded from the url given.

      return this [_scene];
   },
   setError: function (error)
   {
      console .error (`Error loading extern prototype '${this .getName ()}':`, error);

      this [_scene] = this .getBrowser () .getPrivateScene ();

      this .setLoadState (X3DConstants .FAILED_STATE);
      this .setProtoDeclaration (null);
   },
   toVRMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "EXTERNPROTO";
      generator .string += generator .Space ();
      generator .string += this .getName ();
      generator .string += generator .TidySpace ();
      generator .string += "[";

      const userDefinedFields = this .getUserDefinedFields ();

      if (userDefinedFields .length === 0)
      {
         generator .string += generator .TidySpace ();
      }
      else
      {
         let
            fieldTypeLength   = 0,
            accessTypeLength  = 0;

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

      generator .string += "]";
      generator .string += generator .TidyBreak ();
      generator .string += generator .Indent ();

      this ._url .toVRMLStream (generator);
   },
   toVRMLStreamUserDefinedField: function (generator, field, fieldTypeLength, accessTypeLength)
   {
      generator .string += generator .Indent ();
      generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, " ");
      generator .string += generator .Space ();
      generator .string += field .getTypeName () .padEnd (fieldTypeLength, " ");
      generator .string += generator .Space ();
      generator .string += field .getName ();
   },
   toXMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<ExternProtoDeclare";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .getName ());
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "url='";

      this ._url .toXMLStream (generator);

      generator .string += "'";
      generator .string += ">";
      generator .string += generator .TidyBreak ();

      generator .IncIndent ();

      const userDefinedFields = this .getUserDefinedFields ();

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
         generator .string += generator .closingTags ? "></field>" : "/>";
         generator .string += generator .TidyBreak ();
      }

      generator .DecIndent ();

      generator .string += generator .Indent ();
      generator .string += "</ExternProtoDeclare>";
   },
   toJSONStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ExternProtoDeclare";
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
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getName ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Fields

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
            generator .string += '"';
            generator .string += generator .JSONEncode (field .getName ());
            generator .string += '"';
            generator .string += generator .TidyBreak ();

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
         generator .string += ',';
         generator .string += generator .TidyBreak ();
      }


      // URL

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@url";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();

      this ._url .toJSONStream (generator);

      generator .string += generator .TidyBreak ();


      // End

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Reflect .ownKeys (X3DExternProtoDeclaration .prototype))
   Object .defineProperty (X3DExternProtoDeclaration .prototype, key, { enumerable: false });

Object .defineProperties (X3DExternProtoDeclaration .prototype,
{
   name:
   {
      get: X3DExternProtoDeclaration .prototype .getName,
      enumerable: true,
   },
   fields:
   {
      get: X3DExternProtoDeclaration .prototype .getFieldDefinitions,
      enumerable: true,
   },
   isExternProto:
   {
      value: true,
      enumerable: true,
   },
   urls:
   {
      get: function () { return this ._url; },
      enumerable: true,
   },
   loadState:
   {
      get: X3DExternProtoDeclaration .prototype .checkLoadState,
      enumerable: true,
   },
});

export default X3DExternProtoDeclaration;
