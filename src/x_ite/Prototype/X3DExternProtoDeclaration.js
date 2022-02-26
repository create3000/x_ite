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
   "jquery",
   "x_ite/Configuration/SupportedNodes",
   "x_ite/Fields",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Networking/X3DUrlObject",
   "x_ite/Prototype/X3DProtoDeclarationNode",
   "x_ite/Base/X3DConstants",
   "x_ite/InputOutput/Generator",
],
function ($,
          SupportedNodes,
          Fields,
          FieldDefinitionArray,
          X3DUrlObject,
          X3DProtoDeclarationNode,
          X3DConstants,
          Generator)
{
"use strict";

   SupportedNodes .addAbstractType ("X3DExternProtoDeclaration");

   function X3DExternProtoDeclaration (executionContext, url)
   {
      X3DProtoDeclarationNode .call (this, executionContext);
      X3DUrlObject            .call (this, executionContext);

      this .addType (X3DConstants .X3DExternProtoDeclaration)

      this .addChildObjects ("load",                 new Fields .SFBool (true),
                             "url",                  url .copy (), // Must be of type MFString.
                             "autoRefresh",          new Fields .SFTime (),
                             "autoRefreshTimeLimit", new Fields .SFTime (3600));

      this .deferred = $.Deferred ();
   }

   X3DExternProtoDeclaration .prototype = Object .assign (Object .create (X3DProtoDeclarationNode .prototype),
      X3DUrlObject .prototype,
   {
      constructor: X3DExternProtoDeclaration,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([ ]),
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

         this .scene .setLive (this .isLive () .getValue ());
      },
      canUserDefinedFields: function ()
      {
         return true;
      },
      setProtoDeclaration: function (proto)
      {
         this .proto = proto;

         if (!this .proto)
            return

         const fieldDefinitions = this .getFieldDefinitions ();

         for (const protoFieldDefinition of proto .getFieldDefinitions ())
         {
            const fieldDefinition = fieldDefinitions .get (protoFieldDefinition .name);

            if (fieldDefinition)
               fieldDefinition .value .setValue (protoFieldDefinition .value);
         }
      },
      getProtoDeclaration: function ()
      {
         return this .proto;
      },
      addCallback: function (callback)
      {
         this .deferred .done (callback);
      },
      loadNow: function ()
      {
         // 7.73 — ExternProtoDeclaration function

         this .getScene () .addInitLoadCount (this);

         const FileLoader = require ("x_ite/InputOutput/FileLoader");

         new FileLoader (this) .createX3DFromURL (this .urlBuffer_, null, this .setInternalSceneAsync .bind (this));
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
         this .scene = value;

         const
            protoName = new URL (this .scene .getWorldURL ()) .hash .substr (1),
            proto     = protoName ? this .scene .protos .get (protoName) : this .scene .protos [0];

         if (!proto)
            throw new Error ("PROTO not found");

         this .scene .setLive (this .isLive () .getValue ());
         this .scene .setPrivate (this .getScene () .getPrivate ());
         this .scene .setExecutionContext (this .getExecutionContext ());

         this .setLoadState (X3DConstants .COMPLETE_STATE);
         this .setProtoDeclaration (proto);

         this .deferred .resolve ();
      },
      getInternalScene: function ()
      {
         ///  Returns the internal X3DScene of this extern proto, that is loaded from the url given.

         return this .scene;
      },
      setError: function (error)
      {
         console .error ("Error loading extern prototype:", error);

         this .scene = this .getBrowser () .getPrivateScene ();

         this .setLoadState (X3DConstants .FAILED_STATE);
         this .setProtoDeclaration (null);

         this .deferred .resolve ();
         this .deferred = $.Deferred ();
      },
      toVRMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         stream .string += generator .Indent ();
         stream .string += "EXTERNPROTO";
         stream .string += " ";
         stream .string += this .getName ();
         stream .string += " ";
         stream .string += "[";

         const userDefinedFields = this .getUserDefinedFields ();

         let
            fieldTypeLength   = 0,
            accessTypeLength  = 0;

         if (userDefinedFields .length === 0)
         {
            stream .string += " ";
         }
         else
         {
            for (const field of userDefinedFields)
            {
               fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
               accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
            }

            stream .string += "\n";

            generator .IncIndent ();

            for (const field of userDefinedFields)
            {
               this .toVRMLStreamUserDefinedField (stream, field, fieldTypeLength, accessTypeLength);
               stream .string += "\n";
            }

            generator .DecIndent ();

            stream .string += generator .Indent ();
         }

         stream .string += "]";
         stream .string += "\n";

         stream .string += generator .Indent ();

         this .url_ .toVRMLStream (stream);
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
      },
      toXMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         stream .string += generator .Indent ();
         stream .string += "<ExternProtoDeclare";
         stream .string += " ";
         stream .string += "name='";
         stream .string += generator .XMLEncode (this .getName ());
         stream .string += "'";
         stream .string += " ";
         stream .string += "url='";

         this .url_ .toXMLStream (stream);

         stream .string += "'";
         stream .string += ">\n";

         generator .IncIndent ();

         const userDefinedFields = this .getUserDefinedFields ();

         for (const field of userDefinedFields)
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
            stream .string += "/>\n";
         }

         generator .DecIndent ();

         stream .string += generator .Indent ();
         stream .string += "</ExternProtoDeclare>";
      },
   });

   for (const key of Reflect .ownKeys (X3DExternProtoDeclaration .prototype))
      Object .defineProperty (X3DExternProtoDeclaration .prototype, key, { enumerable: false });

   Object .defineProperty (X3DExternProtoDeclaration .prototype, "name",
   {
      get: function () { return this .getName (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExternProtoDeclaration .prototype, "fields",
   {
      get: function () { return this .getFieldDefinitions (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExternProtoDeclaration .prototype, "isExternProto",
   {
      get: function () { return true; },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExternProtoDeclaration .prototype, "urls",
   {
      get: function () { return this .url_ .copy (); },
      enumerable: true,
      configurable: false
   });

   Object .defineProperty (X3DExternProtoDeclaration .prototype, "loadState",
   {
      get: function () { return this .checkLoadState (); },
      enumerable: true,
      configurable: false
   });

   return X3DExternProtoDeclaration;
});
