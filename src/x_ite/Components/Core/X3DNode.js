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
import Generator    from "../../InputOutput/Generator.js";

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
   getDisplayName: (function ()
   {
      const _TrailingNumber = /_\d+$/;

      return function ()
      {
         return this .getName () .replace (_TrailingNumber, "");
      };
   })(),
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
   getFieldsAreEnumerable: function ()
   {
      return true;
   },
   traverse: function () { },
   toStream: function (stream)
   {
      stream .string += this .getTypeName () + " { }";
   },
   toVRMLStream: function (stream)
   {
      const generator = Generator .Get (stream);

      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            stream .string += "USE";
            stream .string += generator .Space ();
            stream .string += name;

            generator .LeaveScope ();
            return;
         }
      }

      if (name .length)
      {
         generator .AddNode (this);

         stream .string += "DEF";
         stream .string += generator .Space ();
         stream .string += name;
         stream .string += generator .Space ();
      }

      stream .string += this .getTypeName ();
      stream .string += generator .TidySpace ();
      stream .string += "{";

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

            stream .string += generator .TidyBreak ();
            generator .IncIndent ();

            for (const field of userDefinedFields)
            {
               this .toVRMLStreamUserDefinedField (stream, field, fieldTypeLength, accessTypeLength);

               if (field === last)
                  stream .string += generator .TidyBreak ();
               else
                  stream .string += generator .Break ();
            }

            generator .DecIndent ();

            if (fields .length !== 0)
               stream .string += generator .TidyBreak ();
         }
      }

      if (fields .length === 0)
      {
         if (userDefinedFields .length)
            stream .string += generator .Indent ();
         else
            stream .string += generator .TidySpace ();
      }
      else
      {
         const last = fields .at (-1);

         if (userDefinedFields .length === 0)
            stream .string += generator .TidyBreak ();

         generator .IncIndent ();

         for (const field of fields)
         {
            this .toVRMLStreamField (stream, field);

            if (field === last)
               stream .string += generator .TidyBreak ();
            else
               stream .string += generator .Break ();
         }

         generator .DecIndent ();
         stream .string += generator .Indent ();
      }

      stream .string += "}";

      generator .LeaveScope ();
   },
   toVRMLStreamUserDefinedField: function (stream, field, fieldTypeLength, accessTypeLength)
   {
      const
         generator  = Generator .Get (stream),
         sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         stream .string += generator .Indent ();
         stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
         stream .string += generator .Space ();
         stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
         stream .string += generator .Space ();
         stream .string += field .getName ();

         if (field .isInitializable ())
         {
            stream .string += generator .Space ();

            field .toVRMLStream (stream);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReference = false;

         field .getReferences () .forEach (function (reference)
         {
            initializableReference = initializableReference || reference .isInitializable ();

            // Output user defined reference field

            stream .string += generator .Indent ();
            stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
            stream .string += generator .Space ();
            stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
            stream .string += generator .Space ();
            stream .string += field .getName ();
            stream .string += generator .Space ();
            stream .string += "IS";
            stream .string += generator .Space ();
            stream .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               stream .string += generator .Break ();
         });

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !field .isDefaultValue ())
         {
            stream .string += generator .Break ();
            stream .string += generator .Indent ();
            stream .string += generator .PadRight (generator .AccessType (field .getAccessType ()), accessTypeLength);
            stream .string += generator .Space ();
            stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
            stream .string += generator .Space ();
            stream .string += field .getName ();

            if (field .isInitializable ())
            {
               stream .string += generator .Space ();

               field .toVRMLStream (stream);
            }
         }
      }
   },
   toVRMLStreamField: function (stream, field)
   {
      const
         generator  = Generator .Get (stream),
         sharedNode = generator .IsSharedNode (this);

      if (field .getReferences () .size === 0 || !generator .ExecutionContext () || sharedNode)
      {
         if (field .isInitializable ())
         {
            stream .string += generator .Indent ();
            stream .string += field .getName ();
            stream .string += generator .Space ();

            field .toVRMLStream (stream);
         }
      }
      else
      {
         let
            index                  = 0,
            initializableReference = false;

         field .getReferences () .forEach (function (reference)
         {
            initializableReference = initializableReference || reference .isInitializable ();

            // Output build in reference field

            stream .string += generator .Indent ();
            stream .string += field .getName ();
            stream .string += generator .Space ();
            stream .string += "IS";
            stream .string += generator .Space ();
            stream .string += reference .getName ();

            ++ index;

            if (index !== field .getReferences () .size)
               stream .string += generator .Break ();
         });

         if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !this .isDefaultValue (field))
         {
            // Output build in field

            stream .string += generator .Break ();
            stream .string += generator .Indent ();
            stream .string += field .getName ();
            stream .string += generator .Space ();

            field .toVRMLStream (stream);
         }
      }
   },
   toXMLStream: function (stream)
   {
      const
         generator  = Generator .Get (stream),
         sharedNode = generator .IsSharedNode (this);

      generator .EnterScope ();

      const name = generator .Name (this);

      if (name .length)
      {
         if (generator .ExistsNode (this))
         {
            stream .string += generator .Indent ();
            stream .string += "<";
            stream .string += this .getTypeName ();
            stream .string += generator .Space ();
            stream .string += "USE='";
            stream .string += generator .XMLEncode (name);
            stream .string += "'";

            const containerField = generator .ContainerField ();

            if (containerField)
            {
               if (containerField .getName () !== this .getContainerField ())
               {
                  stream .string += generator .Space ();
                  stream .string += "containerField='";
                  stream .string += generator .XMLEncode (containerField .getName ());
                  stream .string += "'";
               }
            }

            stream .string += "/>";

            generator .LeaveScope ();
            return;
         }
      }

      stream .string += generator .Indent ();
      stream .string += "<";
      stream .string += this .getTypeName ();

      if (name .length)
      {
         generator .AddNode (this);

         stream .string += generator .Space ();
         stream .string += "DEF='";
         stream .string += generator .XMLEncode (name);
         stream .string += "'";
      }

      const containerField = generator .ContainerField ();

      if (containerField)
      {
         if (containerField .getName () !== this .getContainerField ())
         {
            stream .string += generator .Space ();
            stream .string += "containerField='";
            stream .string += generator .XMLEncode (containerField .getName ());
            stream .string += "'";
         }
      }

      const
         fields            = this .getChangedFields (),
         userDefinedFields = this .getUserDefinedFields ();

      const
         references = [ ],
         childNodes = [ ];

      let cdata = this .getSourceText ();

      if (cdata && cdata .length === 0)
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
               let initializableReference = false;

               field .getReferences () .forEach (function (fieldReference)
               {
                  initializableReference = initializableReference || fieldReference .isInitializable ();
               });

               if (!initializableReference)
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

                     stream .string += generator .Break ();
                     stream .string += generator .Indent ();
                     stream .string += field .getName ();
                     stream .string += "='";

                     field .toXMLStream (stream);

                     stream .string += "'";
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
         stream .string += "/>";
      }
      else
      {
         stream .string += ">";
         stream .string += generator .TidyBreak ();

         generator .IncIndent ();

         if (this .canUserDefinedFields ())
         {
            for (const field of userDefinedFields)
            {
               stream .string += generator .Indent ();
               stream .string += "<field";
               stream .string += generator .Space ();
               stream .string += "accessType='";
               stream .string += generator .AccessType (field .getAccessType ());
               stream .string += "'";
               stream .string += generator .Space ();
               stream .string += "type='";
               stream .string += field .getTypeName ();
               stream .string += "'";
               stream .string += generator .Space ();
               stream .string += "name='";
               stream .string += generator .XMLEncode (field .getName ());
               stream .string += "'";

               // If the field is a inputOutput and we have as reference only inputOnly or outputOnly we must output the value
               // for this field.

               let mustOutputValue = false;

               if (field .getAccessType () === X3DConstants .inputOutput && field .getReferences () .size !== 0)
               {
                  let initializableReference = false;

                  field .getReferences () .forEach (function (fieldReference)
                  {
                     initializableReference = initializableReference || fieldReference .isInitializable ();
                  });

                  if (!initializableReference)
                     mustOutputValue = true;
               }

               if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || sharedNode || mustOutputValue)
               {
                  if (mustOutputValue && generator .ExecutionContext ())
                     references .push (field);

                  if (!field .isInitializable () || field .isDefaultValue ())
                  {
                     stream .string += "/>";
                     stream .string += generator .TidyBreak ();
                  }
                  else
                  {
                     // Output value

                     switch (field .getType ())
                     {
                        case X3DConstants .SFNode:
                        case X3DConstants .MFNode:
                        {
                           generator .PushContainerField (field);

                           stream .string += ">";
                           stream .string += generator .TidyBreak ();

                           generator .IncIndent ();

                           field .toXMLStream (stream);

                           stream .string += generator .TidyBreak ();

                           generator .DecIndent ();

                           stream .string += generator .Indent ();
                           stream .string += "</field>";
                           stream .string += generator .TidyBreak ();

                           generator .PopContainerField ();
                           break;
                        }
                        default:
                        {
                           stream .string += generator .Space ();
                           stream .string += "value='";

                           field .toXMLStream (stream);

                           stream .string += "'";
                           stream .string += "/>";
                           stream .string += generator .TidyBreak ();
                           break;
                        }
                     }
                  }
               }
               else
               {
                  if (generator .ExecutionContext ())
                     references .push (field);

                  stream .string += "/>";
                  stream .string += generator .TidyBreak ();
               }
            }
         }

         if (references .length && !sharedNode)
         {
            stream .string += generator .Indent ();
            stream .string += "<IS>";
            stream .string += generator .TidyBreak ();

            generator .IncIndent ();

            for (const field of references)
            {
               const protoFields = field .getReferences ();

               protoFields .forEach (function (protoField)
               {
                  stream .string += generator .Indent ();
                  stream .string += "<connect";
                  stream .string += generator .Space ();
                  stream .string += "nodeField='";
                  stream .string += generator .XMLEncode (field .getName ());
                  stream .string += "'";
                  stream .string += generator .Space ();
                  stream .string += "protoField='";
                  stream .string += generator .XMLEncode (protoField .getName ());
                  stream .string += "'";
                  stream .string += "/>";
                  stream .string += generator .TidyBreak ();
               });
            }

            generator .DecIndent ();

            stream .string += generator .Indent ();
            stream .string += "</IS>";
            stream .string += generator .TidyBreak ();
         }

         for (const field of childNodes)
         {
            generator .PushContainerField (field);

            field .toXMLStream (stream);

            stream .string += generator .TidyBreak ();

            generator .PopContainerField ();
         }

         if (cdata)
         {
            for (const value of cdata)
            {
               stream .string += "<![CDATA[";
               stream .string += generator .escapeCDATA (value);
               stream .string += "]]>";
               stream .string += generator .TidyBreak ();
            }
         }

         generator .DecIndent ();

         stream .string += generator .Indent ();
         stream .string += "</";
         stream .string += this .getTypeName ();
         stream .string += ">";
      }

      generator .LeaveScope ();
   },
   dispose: function ()
   {
      const executionContext = this .getExecutionContext ();

      // Remove named node if any.

      if (this .getName ())
         executionContext .removeNamedNode (this .getName ())

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

      if (executionContext .isScene ())
      {
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
