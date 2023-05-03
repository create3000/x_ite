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

import Fields       from "../../Fields.js";
import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import SFNodeCache  from "../../Fields/SFNodeCache.js";

function X3DNode (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   this .addType (X3DConstants .X3DNode);
}

X3DNode .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
{
   constructor: X3DNode,
   copy: function (instance)
   {
      if (!instance || instance .getType () .includes (X3DConstants .X3DExecutionContext))
      {
         return X3DBaseNode .prototype .copy .call (this, instance);
      }
      else
      {
         const executionContext = instance .getBody ();

         // First try to get a named node with the node's name.

         if (this .getName () .length)
         {
            const namedNode = executionContext .getNamedNodes () .get (this .getName ());

            if (namedNode)
               return namedNode;
         }

         // Create copy.

         const copy = this .create (executionContext);

         if (this .getNeedsName ())
            this .getExecutionContext () .updateNamedNode (this .getExecutionContext () .getUniqueName (), this);

         if (this .getName () .length)
            executionContext .updateNamedNode (this .getName (), copy);

         // Default fields

         for (const sourceField of this .getPredefinedFields ())
         {
            try
            {
               const destinationField = copy .getField (sourceField .getName ());

               if (sourceField .hasReferences ())
               {
                  // IS relationship

                  for (const originalReference of sourceField .getReferences ())
                  {
                     try
                     {
                        destinationField .addReference (instance .getField (originalReference .getName ()));
                     }
                     catch (error)
                     {
                        console .error (error .message);
                     }
                  }
               }
               else
               {
                  if (sourceField .getAccessType () & X3DConstants .initializeOnly)
                  {
                     switch (sourceField .getType ())
                     {
                        case X3DConstants .SFNode:
                        case X3DConstants .MFNode:
                           destinationField .assign (sourceField .copy (instance));
                           break;
                        default:
                           destinationField .assign (sourceField);
                           break;
                     }
                  }
               }

               destinationField .setModificationTime (sourceField .getModificationTime ());
            }
            catch (error)
            {
               console .log (error .message);
            }
         }

         // User-defined fields

         for (const sourceField of this .getUserDefinedFields ())
         {
            const destinationField = sourceField .copy (instance);

            copy .addUserDefinedField (sourceField .getAccessType (),
                                       sourceField .getName (),
                                       destinationField);

            if (sourceField .hasReferences ())
            {
               // IS relationship

               for (const originalReference of sourceField .getReferences ())
               {
                  try
                  {
                     destinationField .addReference (instance .getField (originalReference .getName ()));
                  }
                  catch (error)
                  {
                     console .error ("No reference '" + originalReference .getName () + "' inside execution context " + instance .getTypeName () + " '" + instance .getName () + "'.");
                  }
               }
            }

            destinationField .setModificationTime (sourceField .getModificationTime ());
         }

         copy .setup ();

         return copy;
      }
   },
   getDisplayName: function ()
   {
      return this .getName () .replace (/_\d+$/, "");
   },
   getNeedsName: function ()
   {
      if (this .getName () .length)
         return false;

      if (this .getCloneCount () > 1)
         return true;

      if (this .hasRoutes ())
         return true;

      const executionContext = this .getExecutionContext ()

      for (const importedNode of executionContext .getImportedNodes ())
      {
         if (importedNode .getInlineNode () === this)
            return true;
      }

      if (executionContext .isScene ())
      {
         for (const exportedNode of executionContext .getExportedNodes ())
         {
            if (exportedNode .getLocalNode () === this)
               return true;
         }
      }

      return false;
   },
   getSourceText: function ()
   {
      return null;
   },
   traverse: function () { },
   toStream: function (generator)
   {
      generator .string += this .getTypeName () + " { }";
   },
   toVRMLStream: function (generator)
   {
      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .string += "USE";
            generator .string += generator .Space ();
            generator .string += name;

            generator .LeaveScope ();
            return;
         }
      }

      if (name .length)
      {
         generator .AddNode (this);

         generator .string += "DEF";
         generator .string += generator .Space ();
         generator .string += name;
         generator .string += generator .Space ();
      }

      generator .string += this .getTypeName ();
      generator .string += generator .TidySpace ();
      generator .string += "{";

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      if (this .canUserDefinedFields ())
      {
         if (userDefinedFields .length)
         {
            let
               fieldTypeLength  = 0,
               accessTypeLength = 0;

            for (const field of userDefinedFields)
            {
               fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
               accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
            }

            const last = userDefinedFields .at (-1);

            generator .string += generator .TidyBreak ();
            generator .IncIndent ();

            for (const field of userDefinedFields)
            {
               this .toVRMLStreamUserDefinedField (generator, field, fieldTypeLength, accessTypeLength);

               if (field === last)
                  generator .string += generator .TidyBreak ();
               else
                  generator .string += generator .Break ();
            }

            generator .DecIndent ();

            if (fields .length !== 0)
               generator .string += generator .TidyBreak ();
         }
      }

      if (fields .length === 0)
      {
         if (userDefinedFields .length)
            generator .string += generator .Indent ();
         else
            generator .string += generator .TidySpace ();
      }
      else
      {
         const last = fields .at (-1);

         if (userDefinedFields .length === 0)
            generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of fields)
         {
            this .toVRMLStreamField (generator, field);

            if (field === last)
               generator .string += generator .TidyBreak ();
            else
               generator .string += generator .Break ();
         }

         generator .DecIndent ();
         generator .string += generator .Indent ();
      }

      generator .string += "}";

      generator .LeaveScope ();
   },
   toVRMLStreamUserDefinedField: function (generator, field, fieldTypeLength, accessTypeLength)
   {
      const sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         generator .string += generator .Indent ();
         generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, " ");
         generator .string += generator .Space ();
         generator .string += field .getTypeName () .padEnd (fieldTypeLength, " ");
         generator .string += generator .Space ();
         generator .string += field .getName ();

         if (field .isInitializable ())
         {
            generator .string += generator .Space ();

            field .toVRMLStream (generator);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReference = false;

         for (const reference of field .getReferences ())
         {
            initializableReference = initializableReference || reference .isInitializable ();

            // Output user defined reference field

            generator .string += generator .Indent ();
            generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, " ");
            generator .string += generator .Space ();
            generator .string += field .getTypeName () .padEnd (fieldTypeLength, " ");
            generator .string += generator .Space ();
            generator .string += field .getName ();
            generator .string += generator .Space ();
            generator .string += "IS";
            generator .string += generator .Space ();
            generator .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               generator .string += generator .Break ();
         }

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !field .isDefaultValue ())
         {
            generator .string += generator .Break ();
            generator .string += generator .Indent ();
            generator .string += generator .AccessType (field .getAccessType ()) .padEnd (accessTypeLength, " ");
            generator .string += generator .Space ();
            generator .string += field .getTypeName () .padEnd (fieldTypeLength, " ");
            generator .string += generator .Space ();
            generator .string += field .getName ();

            if (field .isInitializable ())
            {
               generator .string += generator .Space ();

               field .toVRMLStream (generator);
            }
         }
      }
   },
   toVRMLStreamField: function (generator, field)
   {
      const sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         if (field .isInitializable ())
         {
            generator .string += generator .Indent ();
            generator .string += field .getName ();
            generator .string += generator .Space ();

            field .toVRMLStream (generator);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReference = false;

         for (const reference of field .getReferences ())
         {
            initializableReference = initializableReference || reference .isInitializable ();

            // Output build in reference field

            generator .string += generator .Indent ();
            generator .string += field .getName ();
            generator .string += generator .Space ();
            generator .string += "IS";
            generator .string += generator .Space ();
            generator .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               generator .string += generator .Break ();
         }

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !this .isDefaultValue (field))
         {
            // Output build in field

            generator .string += generator .Break ();
            generator .string += generator .Indent ();
            generator .string += field .getName ();
            generator .string += generator .Space ();

            field .toVRMLStream (generator);
         }
      }
   },
   toXMLStream: function (generator)
   {
      const sharedNode = generator .IsSharedNode (this);

      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .string += generator .Indent ();
            generator .string += "<";
            generator .string += this .getTypeName ();

            if (generator .html && this .getTypeName () === "Script")
            {
               generator .string += generator .Space ();
               generator .string += "type='model/x3d+xml'";
            }

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

            if (generator .selfClosingTags)
            {
               generator .string += "/>";
            }
            else
            {
               generator .string += "></";
               generator .string += this .getTypeName ();
               generator .string += ">";
            }

            generator .LeaveScope ();
            return;
         }
      }

      generator .string += generator .Indent ();
      generator .string += "<";
      generator .string += this .getTypeName ();

      if (generator .html && this .getTypeName () === "Script")
      {
         generator .string += generator .Space ();
         generator .string += "type='model/x3d+xml'";
      }

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

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      const
         references = [ ],
         childNodes = [ ];

      let cdata = this .getSourceText ();

      if (cdata ?.length === 0)
         cdata = null;

      generator .IncIndent ();
      generator .IncIndent ();

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

            if (field .isInitializable ())
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  case X3DConstants .MFNode:
                  {
                     childNodes .push (field);
                     break;
                  }
                  default:
                  {
                     if (field === cdata)
                        break;

                     generator .string += generator .AttribBreak ();
                     generator .string += generator .ListIndent ();
                     generator .string += field .getName ();
                     generator .string += "='";

                     field .toXMLStream (generator);

                     generator .string += "'";
                     break;
                  }
               }
            }
         }
         else
         {
            references .push (field);
         }
      }

      generator .DecIndent ();
      generator .DecIndent ();

      if ((!this .canUserDefinedFields () || !userDefinedFields .length) && (!references .length || sharedNode) && !childNodes .length && !cdata)
      {
         if (generator .selfClosingTags)
         {
            generator .string += "/>";
         }
         else
         {
            generator .string += "></";
            generator .string += this .getTypeName ();
            generator .string += ">";
         }
      }
      else
      {
         generator .string += ">";
         generator .string += generator .TidyBreak ();

         generator .IncIndent ();

         if (this .canUserDefinedFields ())
         {
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

               if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || sharedNode || mustOutputValue)
               {
                  if (mustOutputValue && generator .ExecutionContext ())
                     references .push (field);

                  if (!field .isInitializable () || field .isDefaultValue ())
                  {
                     generator .string += generator .selfClosingTags ? "/>" : "></field>";
                     generator .string += generator .TidyBreak ();
                  }
                  else
                  {
                     // Output value

                     switch (field .getType ())
                     {
                        case X3DConstants .SFNode:
                        case X3DConstants .MFNode:
                        {
                           generator .PushContainerField (null);

                           generator .string += ">";
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
                           generator .string += generator .selfClosingTags ? "/>" : "></field>";
                           generator .string += generator .TidyBreak ();
                           break;
                        }
                     }
                  }
               }
               else
               {
                  if (generator .ExecutionContext ())
                     references .push (field);

                  generator .string += generator .selfClosingTags ? "/>" : "></field>";
                  generator .string += generator .TidyBreak ();
               }
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
                  generator .string += generator .selfClosingTags ? "/>" : "></connect>";
                  generator .string += generator .TidyBreak ();
               }
            }

            generator .DecIndent ();

            generator .string += generator .Indent ();
            generator .string += "</IS>";
            generator .string += generator .TidyBreak ();
         }

         for (const field of childNodes)
         {
            generator .PushContainerField (field);

            field .toXMLStream (generator);

            generator .string += generator .TidyBreak ();

            generator .PopContainerField ();
         }

         if (cdata)
         {
            for (const value of cdata)
            {
               generator .string += "<![CDATA[";
               generator .string += value;
               generator .string += "]]>";
               generator .string += generator .TidyBreak ();
            }
         }

         generator .DecIndent ();

         generator .string += generator .Indent ();
         generator .string += "</";
         generator .string += this .getTypeName ();
         generator .string += ">";
      }

      generator .LeaveScope ();
   },
   toJSONStream: function (generator)
   {
      try
      {
      const sharedNode = generator .IsSharedNode (this);

      generator .EnterScope ();

      const name = generator .Name (this);

      // USE name

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            generator .string += '{';
            generator .string += generator .TidySpace ();
            generator .string += '"';
            generator .string += this .getTypeName ();
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
      generator .string += this .getTypeName ();
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


      // Fields

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      const references = [ ];

      let sourceText = this .getSourceText ();

      // Source text

      if (sourceText)
      {
         if (sourceText .length !== 1)
            sourceText = null;

         if (sourceText && ! sourceText [0] .match (/^\s*(?:ecmascript|javascript|vrmlscript)\:/s))
            sourceText = null;
      }


      // Predefined fields

      if (fields .length)
      {
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

               if (field !== sourceText)
                  outputFields .push (field);
            }
            else
            {
               references .push (field);
            }
         }

         for (const field of outputFields)
         {
            if (field .isInitializable ())
            {
               switch (field .getType ())
               {
                  case X3DConstants .SFNode:
                  case X3DConstants .MFNode:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += '-';
                     generator .string += field .getName ();
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);
                     break;
                  }
                  default:
                  {
                     generator .string += generator .Indent ();
                     generator .string += '"';
                     generator .string += '@';
                     generator .string += field .getName ();
                     generator .string += '"';
                     generator .string += ':';
                     generator .string += generator .TidySpace ();

                     field .toJSONStream (generator);
                     break;
                  }
               }

               generator .string += ',';
               generator .string += generator .TidyBreak ();
            }
         }
      }

      // User defined fields

      if (! this .canUserDefinedFields () || ! userDefinedFields .length)
         ;
      else
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

            if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || sharedNode || mustOutputValue)
            {
               if (mustOutputValue && generator .ExecutionContext ())
                  references .push (field);

               if (!field .isInitializable () || field .isDefaultValue ())
                  ;
               else
               {
                  // Output value

                  generator .string += ',';
                  generator .string += generator .TidyBreak ();

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
                        break;
                     }
                  }
               }
            }
            else
            {
               if (generator .ExecutionContext ())
                  references .push (field);
            }

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

      // Source text

      if (sourceText)
      {
         generator .string += generator .Indent ();
         generator .string += '"';
         generator .string += "#sourceText";
         generator .string += '"';
         generator .string += ':';
         generator .string += generator .TidySpace ();
         generator .string += '[';
         generator .string += generator .TidyBreak ();
         generator .string += generator .IncIndent ();

         const sourceTextLines = sourceText [0] .split ("\n");

         for (let i = 0, length = sourceTextLines .length; i < length; ++ i)
         {
            generator .string += generator .ListIndent ();
            generator .string += '"';
            generator .string += generator .JSONEncode (sourceTextLines [i]);
            generator .string += '"';

            if (i !== length - 1)
               generator .string += ',';

            generator .string += generator .TidyBreak ();
         }

         generator .string += generator .DecIndent ();
         generator .string += generator .Indent ();
         generator .string += ']';
         generator .string += ',';
         generator .string += generator .TidyBreak ();
      }


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
         generator .string += generator .TidyBreak ();
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
      }
      catch (error)
      {
         console .log (error)
      }
   },
   dispose: function ()
   {
      const executionContext = this .getExecutionContext ();

      // Remove named node if any.

      if (this .getName ())
         executionContext .removeNamedNode (this .getName ())

      if (executionContext .isScene ())
      {
         // Remove imported node if any.

         if (!executionContext .isMainScene ())
         {
            const parentContext = executionContext .getExecutionContext ();

            for (const importedNode of parentContext .getImportedNodes ())
            {
               try
               {
                  if (importedNode .getExportedNode () === this)
                     parentContext .removeImportedNode (importedNode .getImportedName ());
               }
               catch (error)
               {
                  //console .error (error);
               }
            }
         }

         // Remove exported node if any.

         for (const exportedNode of executionContext .getExportedNodes ())
         {
            if (exportedNode .getLocalNode () === this)
               executionContext .removeExportedNode (exportedNode .getExportedName ());
         }
      }

      // Remove node from entire scene graph.

      for (const firstParent of new Set (this .getParents ()))
      {
         if (firstParent instanceof Fields .SFNode)
         {
            for (const secondParent of new Set (firstParent .getParents ()))
            {
               if (secondParent instanceof Fields .MFNode)
               {
                  const length = secondParent .length;

                  secondParent .erase (secondParent .remove (0, length, firstParent), length);
               }
            }

            firstParent .setValue (null);
         }
      }

      // Call super.dispose, where fields get disposed.

      X3DBaseNode .prototype .dispose .call (this);
   },
});

export default X3DNode;
