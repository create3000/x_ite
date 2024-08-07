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

import X3DChildObject      from "../../Base/X3DChildObject.js";
import X3DNode             from "./X3DNode.js";
import X3DExecutionContext from "../../Execution/X3DExecutionContext.js";
import X3DConstants        from "../../Base/X3DConstants.js";

const
   _fieldDefinitions = Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions"),
   _protoNode        = Symbol (),
   _protoFields      = Symbol (),
   _body             = Symbol ();

function X3DPrototypeInstance (executionContext, protoNode)
{
   this [_protoNode]        = protoNode;
   this [_fieldDefinitions] = protoNode .getFieldDefinitions ();
   this [_body]             = null;

   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DPrototypeInstance);

   this .setProtoNode (protoNode, true);
}

Object .assign (Object .setPrototypeOf (X3DPrototypeInstance .prototype, X3DNode .prototype),
{
   create (executionContext)
   {
      return new X3DPrototypeInstance (executionContext, this [_protoNode]);
   },
   getTypeName ()
   {
      return this [_protoNode] .getName ();
   },
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this .realize ();
   },
   construct ()
   {
      const
         protoNode = this [_protoNode],
         proto     = protoNode .getProtoDeclaration ();

      // Dispose body and assign field definitions.

      this [_body] ?.dispose ();

      // If there is a proto, the externproto is completely loaded.

      if (protoNode .isExternProto)
      {
         if (protoNode .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         {
            this [_body] = null;

            if (this .isInitialized ())
               X3DChildObject .prototype .addEvent .call (this);

            protoNode ._updateInstances .addInterest ("construct", this);
            protoNode .requestImmediateLoad () .catch (Function .prototype);

            return;
         }

         for (const protoField of proto .getUserDefinedFields ())
         {
            try
            {
               const field = this .getField (protoField .getName ());

               // Continue if different.
               if (field .getAccessType () !== protoField .getAccessType ())
                  continue;

               // Continue if different.
               if (field .getType () !== protoField .getType ())
                  continue;

               // Continue if field is eventIn or eventOut.
               if (!field .isInitializable ())
                  continue;

               // Is set during parse, or already changed by an route event.
               if (field .getModificationTime ())
                  continue;

               // Has IS references.
               if (field .getReferences () .size)
                  continue;

               // Default value of protoField is different from field.
               if (field .equals (protoField))
                  continue;

               // Update default value of field.
               field .assign (protoField);
            }
            catch
            {
               // Definition exists in proto but does not exist in extern proto.
               this .addPredefinedField (proto .getFieldDefinitions () .get (protoField .getName ()));
            }
         }
      }

      if (this .isInitialized ())
         this .realize ();

      protoNode ._updateInstances .removeInterest ("construct", this);
      protoNode ._updateInstances .addInterest ("update", this);
   },
   realize ()
   {
      const
         protoNode = this [_protoNode],
         proto     = protoNode .getProtoDeclaration ();

      if (protoNode .isExternProto && protoNode .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         return;

      // Create execution context.

      this [_body] = new X3DExecutionContext (proto .getExecutionContext (), this);

      // Copy proto.

      this .importExternProtos  (proto .getBody () .externprotos);
      this .importProtos        (proto .getBody () .protos);
      this .copyRootNodes       (proto .getBody () .rootNodes);
      this .importImportedNodes (proto .getBody () .importedNodes);
      this .copyRoutes          (proto .getBody () .routes);

      this [_body] .setup ();

      X3DChildObject .prototype .addEvent .call (this);
   },
   update ()
   {
      // Remove old fields.

      const
         oldProtoFields = this [_protoFields],
         oldFields      = Array .from (this .getPredefinedFields ());

      for (const field of oldFields)
         this .removePredefinedField (field .getName ());

      // Add new fields.

      this [_protoFields] = Array .from (this [_protoNode] .getUserDefinedFields ());

      for (const fieldDefinition of this [_protoNode] .getFieldDefinitions ())
         this .addPredefinedField (fieldDefinition);

      // Reuse old fields, and therefor routes.

      for (const protoField of this [_protoFields])
      {
         const oldFieldName = oldProtoFields .find (field => field === protoField) ?.getName ()
            ?? protoField .getName ();

         if (!oldFieldName)
            continue;

         const
            newField = this .getPredefinedFields () .get (protoField .getName ()),
            oldField = oldFields .find (field => field .getName () === oldFieldName);

         if (!oldField)
            continue;

         if (oldField .getType () !== newField .getType ())
            continue;

         // Assign default value.
         if (oldField .isInitializable ())
         {
            if (oldField .getModificationTime () === 0)
            {
               oldField .assign (newField);
               oldField .setModificationTime (0);
            }
         }

         oldField .addParent (this);
         oldField .setAccessType (newField .getAccessType ());
         oldField .setName (newField .getName ());

         // Replace field, ie. reuse old field.
         this .getPredefinedFields () .update (newField .getName (), newField .getName (), oldField);

         const references = Array .from (oldField .getReferences ());

         // Remove references and routes.
         for (const field of oldField .getFieldInterests ())
            oldField .removeFieldInterest (field);

         // Readd references.
         for (const field of references)
         {
            oldField .removeReference (field);
            oldField .addReference (field);
         }

         // Reconnect input routes.
         for (const route of Array .from (oldField .getInputRoutes ()))
         {
            try
            {
               const { sourceNode, sourceField } = route;

               route .getExecutionContext () .deleteRoute (route);
               route .getExecutionContext () .addRoute (sourceNode, sourceField, this, oldField .getName ());
            }
            catch
            { }
         }

         // Reconnect output routes.
         for (const route of Array .from (oldField .getOutputRoutes ()))
         {
            try
            {
               const { destinationNode, destinationField } = route;

               route .getExecutionContext () .deleteRoute (route);
               route .getExecutionContext () .addRoute (this, oldField .getName (), destinationNode, destinationField );
            }
            catch
            { }
         }

         // Remove from old fields and dispose new field.
         oldFields .splice (oldFields .indexOf (oldField), 1);
         newField .dispose ();
      }

      // Dispose unused old fields.

      for (const oldField of oldFields)
         oldField .dispose ();

      // Construct now.

      this .construct ();
   },
   getExtendedEventHandling ()
   {
      return false;
   },
   getProtoNode ()
   {
      return this [_protoNode];
   },
   setProtoNode (protoNode, construct = false)
   {
      // Disconnect old proto node.

      const oldProtoNode = this [_protoNode];

      oldProtoNode ._name_changed .removeFieldInterest (this ._typeName_changed);
      oldProtoNode ._updateInstances .removeInterest ("construct", this);
      oldProtoNode ._updateInstances .removeInterest ("update",    this);

      // Get fields from new proto node.

      this [_protoNode]        = protoNode;
      this [_fieldDefinitions] = protoNode .getFieldDefinitions ();
      this [_protoFields]      = Array .from (protoNode .getUserDefinedFields ());

      protoNode ._name_changed .addFieldInterest (this ._typeName_changed);

      construct ? this .construct () : this .update ();
   },
   getBody ()
   {
      return this [_body];
   },
   getInnerNode ()
   {
      if (this [_body])
      {
         const rootNodes = this [_body] .getRootNodes ();

         if (rootNodes .length)
         {
            const rootNode = rootNodes [0];

            if (rootNode)
               return rootNode .getValue () .getInnerNode ();
         }
      }

      throw new Error ("Root node not available.");
   },
   importExternProtos (externprotos1)
   {
      const externprotos2 = this [_body] .externprotos;

      for (const externproto of externprotos1)
         externprotos2 .add (externproto .getName (), externproto);
   },
   importProtos (protos1)
   {
      const protos2 = this [_body] .protos;

      for (const proto of protos1)
         protos2 .add (proto .getName (), proto);
   },
   copyRootNodes (rootNodes1)
   {
      const rootNodes2 = this [_body] .getRootNodes ();

      for (const node of rootNodes1)
         rootNodes2 .push (node .copy (this));
   },
   importImportedNodes (importedNodes)
   {
      for (const importedNode of importedNodes)
      {
         try
         {
            const inlineNode = this [_body] .getNamedNode (importedNode .getInlineNode () .getName ());

            this [_body] .addImportedNode (inlineNode, importedNode .getExportedName (), importedNode .getImportedName ());
         }
         catch (error)
         {
            console .error (error);
         }
      }
   },
   copyRoutes (routes)
   {
      for (const route of routes)
      {
         try
         {
            const sourceNode = route .getSourceNode () instanceof X3DNode
               ? this [_body] .getLocalNode (route .getSourceNode () .getName ())
               : this [_body] .getLocalNode (route .getSourceNode () .getImportedName ());

            const destinationNode = route .getDestinationNode () instanceof X3DNode
               ? this [_body] .getLocalNode (route .getDestinationNode () .getName ())
               : this [_body] .getLocalNode (route .getDestinationNode () .getImportedName ());

            this [_body] .addRoute (sourceNode, route .sourceField, destinationNode, route .destinationField);
         }
         catch (error)
         {
            console .error (error);
         }
      }
   },
   toXMLStream (generator)
   {
      const sharedNode = generator .IsSharedNode (this);

      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .string += generator .Indent ();
            generator .string += "<ProtoInstance";
            generator .string += generator .Space ();
            generator .string += "name='";
            generator .string += generator .XMLEncode (this .getTypeName ());
            generator .string += "'";
            generator .string += generator .Space ();
            generator .string += "USE='";
            generator .string += generator .XMLEncode (name);
            generator .string += "'";

            const containerField = generator .ContainerField ();

            if (containerField)
            {
               if (containerField .getName () !== this .getContainerField ())
               {
                  generator .string += generator .Space ();
                  generator .string += "containerField='";
                  generator .string += generator .XMLEncode (containerField .getName ());
                  generator .string += "'";
               }
            }

            generator .string += generator .closingTags ? "></ProtoInstance>" : "/>";

            generator .LeaveScope ();
            return;
         }
      }

      generator .string += generator .Indent ();
      generator .string += "<ProtoInstance";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .getTypeName ());
      generator .string += "'";

      if (name .length)
      {
         generator .AddNode (this);

         generator .string += generator .Space ();
         generator .string += "DEF='";
         generator .string += generator .XMLEncode (name);
         generator .string += "'";
      }

      const containerField = generator .ContainerField ();

      if (containerField)
      {
         if (containerField .getName () !== this .getContainerField ())
         {
            generator .string += generator .Space ();
            generator .string += "containerField='";
            generator .string += generator .XMLEncode (containerField .getName ());
            generator .string += "'";
         }
      }

      const fields = this .getChangedFields ();

      if (fields .length === 0)
      {
         generator .string += generator .closingTags ? "></ProtoInstance>" : "/>";
      }
      else
      {
         generator .string += ">";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         const references = [ ];

         for (const field of fields)
         {
            // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
            // for this field.

            let mustOutputValue = false;

            if (generator .ExecutionContext ())
            {
               if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
               {
                  if (![... field .getReferences ()] .some (reference => reference .isInitializable ()))
                     mustOutputValue = !this .isDefaultValue (field);
               }
            }

            // If we have no execution context we are not in a proto and must not generate IS references the same is true
            // if the node is a shared node as the node does not belong to the execution context.

            if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode || mustOutputValue)
            {
               if (mustOutputValue)
                  references .push (field);

               switch (field .getType ())
               {
                  case X3DConstants .MFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += "<fieldValue";
                     generator .string += generator .Space ();
                     generator .string += "name='";
                     generator .string += generator .XMLEncode (field .getName ());
                     generator .string += "'";

                     if (field .length === 0)
                     {
                        generator .string += generator .closingTags ? "></fieldValue>" : "/>";
                        generator .string += generator .TidyBreak ();
                     }
                     else
                     {
                        generator .PushContainerField (field);

                        generator .string += ">";
                        generator .string += generator .TidyBreak ();

                        generator .IncIndent ();

                        field .toXMLStream (generator);

                        generator .string += generator .TidyBreak ();

                        generator .DecIndent ();

                        generator .string += generator .Indent ();
                        generator .string += "</fieldValue>";
                        generator .string += generator .TidyBreak ();

                        generator .PopContainerField ();
                     }

                     break;
                  }
                  case X3DConstants .SFNode:
                  {
                     if (field .getValue () !== null)
                     {
                        generator .PushContainerField (null);

                        generator .string += generator .Indent ();
                        generator .string += "<fieldValue";
                        generator .string += generator .Space ();
                        generator .string += "name='";
                        generator .string += generator .XMLEncode (field .getName ());
                        generator .string += "'";
                        generator .string += ">";
                        generator .string += generator .TidyBreak ();

                        generator .IncIndent ();

                        field .toXMLStream (generator);

                        generator .string += generator .TidyBreak ();

                        generator .DecIndent ();

                        generator .string += generator .Indent ();
                        generator .string += "</fieldValue>";
                        generator .string += generator .TidyBreak ();

                        generator .PopContainerField ();
                        break;
                     }

                     // Proceed with next case.
                  }
                  default:
                  {
                     generator .string += generator .Indent ();
                     generator .string += "<fieldValue";
                     generator .string += generator .Space ();
                     generator .string += "name='";
                     generator .string += generator .XMLEncode (field .getName ());
                     generator .string += "'";
                     generator .string += generator .Space ();
                     generator .string += "value='";

                     field .toXMLStream (generator);

                     generator .string += "'";
                     generator .string += generator .closingTags ? "></fieldValue>" : "/>";
                     generator .string += generator .TidyBreak ();
                     break;
                  }
               }
            }
            else
            {
               references .push (field);
            }
         }

         if (references .length && !sharedNode)
         {
            generator .string += generator .Indent ();
            generator .string += "<IS>";
            generator .string += generator .TidyBreak ();

            generator .IncIndent ();

            for (const field of references)
            {
               const protoFields = field .getReferences ();

               for (const protoField of protoFields)
               {
                  generator .string += generator .Indent ();
                  generator .string += "<connect";
                  generator .string += generator .Space ();
                  generator .string += "nodeField='";
                  generator .string += generator .XMLEncode (field .getName ());
                  generator .string += "'";
                  generator .string += generator .Space ();
                  generator .string += "protoField='";
                  generator .string += generator .XMLEncode (protoField .getName ());
                  generator .string += "'";
                  generator .string += generator .closingTags ? "></connect>" : "/>";
                  generator .string += generator .TidyBreak ();
               }
            }

            generator .DecIndent ();

            generator .string += generator .Indent ();
            generator .string += "</IS>";
            generator .string += generator .TidyBreak ();
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</ProtoInstance>";
      }

      generator .LeaveScope ();
   },
   toJSONStream (generator)
   {
      const sharedNode = generator .IsSharedNode (this);

      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .string += '{';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += "ProtoInstance";
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
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .JSONEncode (this .getTypeName ());
            generator .string += '"';
            generator .string += ',';
            generator .string += generator .TidyBreak ();

            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "@USE";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += generator .JSONEncode (name);
            generator .string += '"';
            generator .string += generator .TidyBreak ();

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';
            generator .string += generator .TidyBreak ();
            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';

            generator .LeaveScope ();
            return;
         }
      }

      // Type name

      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ProtoInstance";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();
      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();


      // DEF name

      if (name .length)
      {
         generator .AddNode (this);

         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "@DEF";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '"';
         generator .string += generator .JSONEncode (name);
         generator .string += '"';
         generator .string += ',';
         generator .string += generator .TidyBreak ();
      }


      // Type name

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@name";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getTypeName ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();


      // Fields

      const
         fields     = this .getChangedFields (),
         references = [ ];

      if (fields .length)
      {
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "fieldValue";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         const outputFields = [ ];

         for (const field of fields)
         {
            // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
            // for this field.

            let mustOutputValue = false;

            if (generator .ExecutionContext ())
            {
               if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
               {
                  if (![... field .getReferences ()] .some (reference => reference .isInitializable ()))
                     mustOutputValue = !this .isDefaultValue (field);
               }
            }

            // If we have no execution context we are not in a proto and must not generate IS references the same is true
            // if the node is a shared node as the node does not belong to the execution context.

            if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode || mustOutputValue)
            {
               if (mustOutputValue)
                  references .push (field);

               outputFields .push (field);
            }
            else
            {
               references .push (field);
            }
         }

         for (const field of outputFields)
         {
            switch (field .getType ())
            {
               case X3DConstants .SFNode:
               {
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .IncIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@name";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (field .getName ());
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();
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
                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';
                  break;
               }
               case X3DConstants .MFNode:
               {
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .IncIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@name";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (field .getName ());
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "-children";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();

                  field .toJSONStream (generator);

                  generator .string += generator .TidyBreak ();
                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';
                  break;
               }
               default:
               {
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .IncIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@name";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (field .getName ());
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@value";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();

                  field .toJSONStream (generator);

                  generator .string += generator .TidyBreak ();
                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';
                  break;
               }
            }

            if (field !== outputFields .at (-1))
               generator .string += ',';

            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';
         generator .string += ',';
         generator .string += generator .TidyBreak ();


         // IS references

         if (references .length && !sharedNode)
         {
            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "IS";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '{';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();
            generator .string += generator .Indent ();
            generator .string += '"';
            generator .string += "connect";
            generator .string += '"';
            generator .string += ':';
            generator .string += generator .TidySpace ();
            generator .string += '[';
            generator .string += generator .TidyBreak ();
            generator .string += generator .IncIndent ();

            for (const field of references)
            {
               const protoFields = [... field .getReferences ()];

               for (const protoField of protoFields)
               {
                  generator .string += generator .Indent ();
                  generator .string += '{';
                  generator .string += generator .TidyBreak ();
                  generator .string += generator .IncIndent ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@nodeField";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (field .getName ());
                  generator .string += '"';
                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .Indent ();
                  generator .string += '"';
                  generator .string += "@protoField";
                  generator .string += '"';
                  generator .string += ':';
                  generator .string += generator .TidySpace ();
                  generator .string += '"';
                  generator .string += generator .JSONEncode (protoField .getName ());
                  generator .string += '"';
                  generator .string += generator .TidyBreak ();

                  generator .string += generator .DecIndent ();
                  generator .string += generator .Indent ();
                  generator .string += '}';

                  if (field === references .at (-1) && protoField === protoFields .at (-1))
                     ;
                  else
                  {
                     generator .string += ',';
                  }

                  generator .string += generator .TidyBreak ();
               }
            }

            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += ']';
            generator .string += generator .TidyBreak ();
            generator .string += generator .DecIndent ();
            generator .string += generator .Indent ();
            generator .string += '}';
            generator .string += ',';
            generator .string += generator .TidyBreak ();
         }
      }

      generator .JSONRemoveComma ();


      // End

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';

      generator .LeaveScope ();
   },
   dispose ()
   {
      const protoNode = this [_protoNode];

      protoNode ._name_changed .removeFieldInterest (this ._typeName_changed);
      protoNode ._updateInstances .removeInterest ("construct", this);
      protoNode ._updateInstances .removeInterest ("update",    this);

      this [_body] ?.dispose ();

      X3DNode .prototype .dispose .call (this);
   },
});


Object .defineProperties (X3DPrototypeInstance, X3DNode .getStaticProperties ("X3DPrototypeInstance", "Core", 2, "children", "2.0"));

export default X3DPrototypeInstance;
