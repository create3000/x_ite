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

import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DField                    from "../../Base/X3DField.js";
import X3DArrayField               from "../../Base/X3DArrayField.js";
import Fields                      from "../../Fields.js";
import X3DBrowser                  from "../../Browser/X3DBrowser.js";
import ComponentInfo               from "../../Configuration/ComponentInfo.js";
import ComponentInfoArray          from "../../Configuration/ComponentInfoArray.js";
import ProfileInfo                 from "../../Configuration/ProfileInfo.js";
import ProfileInfoArray            from "../../Configuration/ProfileInfoArray.js";
import UnitInfo                    from "../../Configuration/UnitInfo.js";
import UnitInfoArray               from "../../Configuration/UnitInfoArray.js";
import X3DExecutionContext         from "../../Execution/X3DExecutionContext.js";
import X3DScene                    from "../../Execution/X3DScene.js";
import ExternProtoDeclarationArray from "../../Prototype/ExternProtoDeclarationArray.js";
import ProtoDeclarationArray       from "../../Prototype/ProtoDeclarationArray.js";
import X3DExternProtoDeclaration   from "../../Prototype/X3DExternProtoDeclaration.js";
import X3DProtoDeclaration         from "../../Prototype/X3DProtoDeclaration.js";
import RouteArray                  from "../../Routing/RouteArray.js";
import X3DRoute                    from "../../Routing/X3DRoute.js";
import evaluate                    from "../../Browser/Scripting/evaluate.js";
import X3DScriptNode               from "./X3DScriptNode.js";
import FileLoader                  from "../../InputOutput/FileLoader.js";
import X3DConstants                from "../../Base/X3DConstants.js";

function Script (executionContext)
{
   X3DScriptNode .call (this, executionContext);

   this .addType (X3DConstants .Script);

   this .pauseTime = 0;
}

Script .prototype = Object .assign (Object .create (X3DScriptNode .prototype),
{
   constructor: Script,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "directOutput",         new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "mustEvaluate",         new Fields .SFBool ()),
   ]),
   getTypeName: function ()
   {
      return "Script";
   },
   getComponentName: function ()
   {
      return "Scripting";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["2.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DScriptNode .prototype .initialize .call (this);

      for (const field of this .getUserDefinedFields ())
         field .setModificationTime (0);

      this .requestImmediateLoad ();
   },
   getExtendedEventHandling: function ()
   {
      return false;
   },
   canUserDefinedFields: function ()
   {
      return true;
   },
   addUserDefinedField: function (accessType, name, field)
   {
      X3DScriptNode .prototype .addUserDefinedField .call (this, accessType, name, field);

      if (! this .isInitialized ())
         return;

      this .setLoadState (X3DConstants .NOT_STARTED_STATE);
      this .requestImmediateLoad ();
   },
   removeUserDefinedField: function (name)
   {
      X3DScriptNode .prototype .removeUserDefinedField .call (this, name);

      if (! this .isInitialized ())
         return;

      this .setLoadState (X3DConstants .NOT_STARTED_STATE);
      this .requestImmediateLoad ();
   },
   getSourceText: function ()
   {
      return this ._url;
   },
   unLoadNow: function ()
   {
      this .initialize__ ("");
   },
   loadNow: function ()
   {
      new FileLoader (this) .loadDocument (this ._url,
      (data) =>
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else
         {
            this .setLoadState (X3DConstants .COMPLETE_STATE);

            if (this .getExecutionContext () .getOuterNode () instanceof X3DProtoDeclaration)
               return;

            this .initialize__ ($.decodeText (data));
         }
      });
   },
   getContext: function (text)
   {
      try
      {
         const callbacks = ["initialize", "prepareEvents", "eventsProcessed", "shutdown"];

         for (const field of this .getUserDefinedFields ())
         {
            switch (field .getAccessType ())
            {
               case X3DConstants .inputOnly:
                  callbacks .push (field .getName ());
                  break;
               case X3DConstants .inputOutput:
                  callbacks .push ("set_" + field .getName ());
                  break;
            }
         }

         text += "\nreturn [" + callbacks .map (function (c)
         {
            return `typeof ${c} !== "undefined" ? ${c} : undefined`;
         })
         .join (",") + "];";

         this .global = this .getGlobal ();

         const
            result  = evaluate (this .global, text),
            context = { };

         for (let i = 0; i < callbacks .length; ++ i)
            context [callbacks [i]] = result [i];

         return context;
      }
      catch (error)
      {
         this .setError ("while evaluating script source", error);

         return { };
      }
   },
   evaluate: function (text)
   {
      return evaluate (this .global, `return (${text})`);
   },
   getGlobal: function ()
   {
      const
         browser          = this .getBrowser (),
         executionContext = this .getExecutionContext (),
         live             = this .getLive ();

      function SFNode (vrmlSyntax)
      {
         const
            scene     = browser .createX3DFromString (String (vrmlSyntax)),
            rootNodes = scene .getRootNodes ();

         live .addFieldInterest (scene .getLive ());

         scene .setLive (live .getValue ());
         scene .setPrivate (executionContext .isPrivate ());
         scene .setExecutionContext (executionContext);

         if (rootNodes .length && rootNodes [0])
         {
            return rootNodes [0];
         }

         throw new Error ("SFNode.new: invalid argument, must be 'string' is 'undefined'.");
      }

      SFNode .prototype = Fields .SFNode .prototype;

      const global =
      {
         NULL:  { value: null },
         FALSE: { value: false },
         TRUE:  { value: true },
         print: { value: browser .println .bind (browser) },
         trace: { value: browser .println .bind (browser) },

         Browser: { value: browser },

         X3DConstants:                { value: X3DConstants },
         X3DBrowser:                  { value: X3DBrowser },
         X3DExecutionContext:         { value: X3DExecutionContext },
         X3DScene:                    { value: X3DScene },
         ComponentInfo:               { value: ComponentInfo },
         ComponentInfoArray:          { value: ComponentInfoArray },
         ProfileInfo:                 { value: ProfileInfo },
         ProfileInfoArray:            { value: ProfileInfoArray },
         UnitInfo:                    { value: UnitInfo },
         UnitInfoArray:               { value: UnitInfoArray },
         ExternProtoDeclarationArray: { value: ExternProtoDeclarationArray },
         ProtoDeclarationArray:       { value: ProtoDeclarationArray },
         X3DExternProtoDeclaration:   { value: X3DExternProtoDeclaration },
         X3DProtoDeclaration:         { value: X3DProtoDeclaration },
         RouteArray:                  { value: RouteArray },
         X3DRoute:                    { value: X3DRoute },

         X3DFieldDefinition:   { value: X3DFieldDefinition },
         FieldDefinitionArray: { value: FieldDefinitionArray },

         X3DField:      { value: X3DField },
         X3DArrayField: { value: X3DArrayField },

         SFColor:       { value: Fields .SFColor },
         SFColorRGBA:   { value: Fields .SFColorRGBA },
         SFImage:       { value: Fields .SFImage },
         SFMatrix3d:    { value: Fields .SFMatrix3d },
         SFMatrix3f:    { value: Fields .SFMatrix3f },
         SFMatrix4d:    { value: Fields .SFMatrix4d },
         SFMatrix4f:    { value: Fields .SFMatrix4f },
         SFNode:        { value: SFNode },
         SFRotation:    { value: Fields .SFRotation },
         SFVec2d:       { value: Fields .SFVec2d },
         SFVec2f:       { value: Fields .SFVec2f },
         SFVec3d:       { value: Fields .SFVec3d },
         SFVec3f:       { value: Fields .SFVec3f },
         SFVec4d:       { value: Fields .SFVec4d },
         SFVec4f:       { value: Fields .SFVec4f },
         VrmlMatrix:    { value: Fields .VrmlMatrix },

         MFBool:        { value: Fields .MFBool },
         MFColor:       { value: Fields .MFColor },
         MFColorRGBA:   { value: Fields .MFColorRGBA },
         MFDouble:      { value: Fields .MFDouble },
         MFFloat:       { value: Fields .MFFloat },
         MFImage:       { value: Fields .MFImage },
         MFInt32:       { value: Fields .MFInt32 },
         MFMatrix3d:    { value: Fields .MFMatrix3d },
         MFMatrix3f:    { value: Fields .MFMatrix3f },
         MFMatrix4d:    { value: Fields .MFMatrix4d },
         MFMatrix4f:    { value: Fields .MFMatrix4f },
         MFNode:        { value: Fields .MFNode },
         MFRotation:    { value: Fields .MFRotation },
         MFString:      { value: Fields .MFString },
         MFTime:        { value: Fields .MFTime },
         MFVec2d:       { value: Fields .MFVec2d },
         MFVec2f:       { value: Fields .MFVec2f },
         MFVec3d:       { value: Fields .MFVec3d },
         MFVec3f:       { value: Fields .MFVec3f },
         MFVec4d:       { value: Fields .MFVec4d },
         MFVec4f:       { value: Fields .MFVec4f },
      };

      for (const field of this .getUserDefinedFields ())
      {
         const name = field .getName ();

         if (field .getAccessType () === X3DConstants .inputOnly)
            continue;

         if (! (name in global))
         {
            global [name] =
            {
               get: field .valueOf .bind (field),
               set: field .setValue .bind (field),
            };
         }

         if (field .getAccessType () === X3DConstants .inputOutput)
         {
            global [name + "_changed"] =
            {
               get: field .valueOf  .bind (field),
               set: field .setValue .bind (field),
            };
         }
      }

      return Object .create (Object .prototype, global);
   },
   processOutstandingEvents: function ()
   {
      for (const field of this .getUserDefinedFields ())
      {
         if (field .getModificationTime () <= this .pauseTime)
            continue;

         switch (field .getAccessType ())
         {
            case X3DConstants .inputOnly:
            {
               const callback = this .context [field .getName ()];

               if (typeof callback === "function")
                  this .set_field__ (callback, field);

               break;
            }
            case X3DConstants .inputOutput:
            {
               const callback = this .context ["set_" + field .getName ()];

               if (typeof callback === "function")
                  this .set_field__ (callback, field);

               break;
            }
         }
      }
   },
   initialize__: function (text)
   {
      const browser = this .getBrowser ();

      this .context = this .getContext (text);

      // Call initialize function.

      if (typeof this .context .initialize === "function")
      {
         browser .getScriptStack () .push (this);

         try
         {
            this .context .initialize ();
         }
         catch (error)
         {
            this .setError ("in function 'initialize'", error);
         }

         browser .getScriptStack () .pop ();
      }

      // shutdown

      if (typeof this .context .shutdown === "function")
         $(window) .on ("unload", this .shutdown__ .bind (this));

      // prepareEvents

      if (typeof this .context .prepareEvents === "function")
         browser .prepareEvents () .addInterest ("prepareEvents__", this);

      // eventsProcessed

      if (typeof this .context .eventsProcessed === "function")
         this .addInterest ("eventsProcessed__", this);

      // fields

      for (const field of this .getUserDefinedFields ())
      {
         switch (field .getAccessType ())
         {
            case X3DConstants .inputOnly:
            {
               const callback = this .context [field .getName ()];

               if (typeof callback === "function")
                  field .addInterest ("set_field__", this, callback);

               break;
            }
            case X3DConstants .inputOutput:
            {
               const callback = this .context ["set_" + field .getName ()];

               if (typeof callback === "function")
                  field .addInterest ("set_field__", this, callback);

               break;
            }
         }
      }

      this .processOutstandingEvents ();
   },
   prepareEvents__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .prepareEvents (browser .getCurrentTime ());
         browser .addBrowserEvent ();
      }
      catch (error)
      {
         this .setError ("in function 'prepareEvents'", error);
      }

      browser .getScriptStack () .pop ();
   },
   set_field__: function (callback, field)
   {
      const browser = this .getBrowser ();

      field .setTainted (true);
      browser .getScriptStack () .push (this);

      try
      {
         callback (field .valueOf (), browser .getCurrentTime ());
      }
      catch (error)
      {
         this .setError ("in function '" + field .getName () + "'", error);
      }

      browser .getScriptStack () .pop ();
      field .setTainted (false);
   },
   eventsProcessed__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .eventsProcessed ();
      }
      catch (error)
      {
         this .setError ("in function 'eventsProcessed'", error);
      }

      browser .getScriptStack () .pop ();
   },
   shutdown__: function ()
   {
      const browser = this .getBrowser ();

      browser .getScriptStack () .push (this);

      try
      {
         this .context .shutdown ();
      }
      catch (error)
      {
         this .setError ("in function 'shutdown'", error);
      }

      browser .getScriptStack () .pop ();
   },
   setError: function (reason, error)
   {
      console .error ("JavaScript Error in Script '" + this .getName () + "', " + reason + "\nworld url is '" + this .getExecutionContext () .getWorldURL () + "':");
      console .error (error);
   },
});

export default Script;
