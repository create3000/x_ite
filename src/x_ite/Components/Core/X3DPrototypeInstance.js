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

import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DChildObject       from "../../Base/X3DChildObject.js";
import X3DNode              from "./X3DNode.js";
import X3DExecutionContext  from "../../Execution/X3DExecutionContext.js";
import X3DConstants         from "../../Base/X3DConstants.js";

const
   _fieldDefinitions = Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions"),
   _protoNode        = Symbol (),
   _protoFields      = Symbol (),
   _body             = Symbol ();

function X3DPrototypeInstance (executionContext, protoNode)
{
   this [_protoNode]        = protoNode;
   this [_fieldDefinitions] = new FieldDefinitionArray (protoNode .getFieldDefinitions ());
   this [_body]             = null;

   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .X3DPrototypeInstance);
}

X3DPrototypeInstance .prototype = Object .assign (Object .create (X3DNode .prototype),
{
   constructor: X3DPrototypeInstance,
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

      this .setProtoNode (this [_protoNode]);
   },
   construct ()
   {
      this [_body] ?.dispose ();

      const proto = this [_protoNode] .getProtoDeclaration ();

      if (!proto)
      {
         this [_body] = new X3DExecutionContext (this .getExecutionContext (), this);
         this [_body] .setup ();

         if (this .isInitialized ())
            X3DChildObject .prototype .addEvent .call (this);

         return;
      }

      // If there is a proto the externproto is completely loaded.

      if (this [_protoNode] .isExternProto)
      {
         for (const protoField of proto .getUserDefinedFields ())
         {
            try
            {
               const field = this .getField (protoField .getName ());

               // Continue if something is wrong.
               if (field .getAccessType () !== protoField .getAccessType ())
                  continue;

               // Continue if something is wrong.
               if (field .getType () !== protoField .getType ())
                  continue;

               // Continue if field is eventIn or eventOut.
               if (!field .isInitializable ())
                  continue;

               // Is set during parse.
               if (field .getModificationTime ())
                  continue;

               // Has IS references.
               if (field .hasReferences ())
                  continue;

               if (field .equals (protoField))
                  continue;

               // If default value of protoField is different from field, thus update default value for field.
               field .assign (protoField);
            }
            catch (error)
            {
               // Definition exists in proto but does not exist in extern proto.
               this .addPredefinedField (proto .getFieldDefinitions () .get (protoField .getName ()));
            }
         }
      }

      // Create execution context.

      this [_body] = new X3DExecutionContext (proto .getExecutionContext (), this);

      // Copy proto.

      this .importExternProtos (proto .getBody () .externprotos);
      this .importProtos       (proto .getBody () .protos);
      this .copyRootNodes      (proto .getBody () .rootNodes);
      this .copyImportedNodes  (proto .getBody (), proto .getBody () .getImportedNodes ());
      this .copyRoutes         (proto .getBody (), proto .getBody () .routes);

      this [_body] .setup ();

      if (this .isInitialized ())
         X3DChildObject .prototype .addEvent .call (this);

      this [_protoNode] ._updateInstances .removeInterest ("construct", this);
      this [_protoNode] ._updateInstances .addInterest ("update", this);
   },
   update ()
   {
      // Assign field definitions.

      this [_fieldDefinitions] .assign (this [_protoNode] .getFieldDefinitions ());

      // Remove old fields.

      const
         oldProtoFields = this [_protoFields],
         oldFields      = new Map (Array .from (this .getPredefinedFields (), f => [f .getName (), f]));

      for (const field of oldFields .values ())
         this .removePredefinedField (field .getName ());

      // Add new fields.

      this [_protoFields] = new Map (Array .from (this [_protoNode] .getUserDefinedFields (), f => [f, f .getName ()]));

      for (const fieldDefinition of this .getFieldDefinitions ())
         this .addPredefinedField (fieldDefinition);

      // Reuse old fields, and therefor routes.

      for (const protoField of this [_protoFields] .keys ())
      {
         const oldFieldName = oldProtoFields .get (protoField);

         if (!oldFieldName)
            continue;

         const
            newField = this .getPredefinedFields () .get (protoField .getName ()),
            oldField = oldFields .get (oldFieldName);

         oldField .addParent (this);
         oldField .setAccessType (newField .getAccessType ());
         oldField .setName (newField .getName ());

         this .getPredefinedFields () .update (newField .getName (), newField .getName (), oldField);

         if (!this .isPrivate ())
            oldField .addCloneCount (1);

         oldFields .delete (oldFieldName);
         newField .dispose ();
      }

      for (const oldField of oldFields .values ())
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
   setProtoNode (protoNode)
   {
      // Disconnect old proto node.

      this [_protoNode] ._name_changed .removeFieldInterest (this ._typeName_changed);
      this [_protoNode] ._updateInstances .removeInterest ("construct", this);
      this [_protoNode] ._updateInstances .removeInterest ("update",    this);

      // Get fields from new proto node.

      this [_protoNode]   = protoNode;
      this [_protoFields] = new Map (Array .from (protoNode .getUserDefinedFields (), f => [f, f .getName ()]));

      protoNode ._name_changed .addFieldInterest (this ._typeName_changed);

      if (protoNode .isExternProto)
      {
         if (this [_protoNode] .checkLoadState () === X3DConstants .COMPLETE_STATE)
         {
            this .construct ();
         }
         else
         {
            protoNode ._updateInstances .addInterest ("construct", this);
            protoNode .requestImmediateLoad () .catch (Function .prototype);
         }
      }
      else
      {
         this .construct ();
      }
   },
   getBody ()
   {
      return this [_body];
   },
   getInnerNode ()
   {
      const rootNodes = this [_body] .getRootNodes ();

      if (rootNodes .length)
      {
         const rootNode = rootNodes [0];

         if (rootNode)
            return rootNode .getValue () .getInnerNode ();
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
   copyImportedNodes (executionContext, importedNodes)
   {
      for (const importedNode of importedNodes)
      {
         try
         {
            const
               inlineNode   = this [_body] .getNamedNode (importedNode .getInlineNode () .getName ()),
               importedName = importedNode .getImportedName (),
               exportedName = importedNode .getExportedName ();

            this [_body] .addImportedNode (inlineNode, exportedName, importedName);
         }
         catch (error)
         {
            console .error ("Bad IMPORT specification in copy: ", error);
         }
      }
   },
   copyRoutes (executionContext, routes)
   {
      for (const route of routes)
      {
         try
         {
            const
               sourceNode      = this [_body] .getLocalNode (executionContext .getLocalName (route .sourceNode)),
               destinationNode = this [_body] .getLocalNode (executionContext .getLocalName (route .destinationNode));

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
      this [_protoNode] ._name_changed .removeFieldInterest (this ._typeName_changed);
      this [_protoNode] ._updateInstances .removeInterest ("construct", this);
      this [_protoNode] ._updateInstances .removeInterest ("update",    this);

      this [_body] ?.dispose ();

      X3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DPrototypeInstance,
{
   typeName:
   {
      value: "X3DPrototypeInstance",
      enumerable: true,
   },
   componentName:
   {
      value: "Core",
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
      enumerable: true,
   },
});

export default X3DPrototypeInstance;
