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
   "x_ite/Basic/X3DBaseNode",
   "x_ite/Fields",
   "x_ite/Bits/X3DConstants",
   "x_ite/InputOutput/Generator",
],
function (X3DBaseNode,
          Fields,
          X3DConstants,
          Generator)
{
"use strict";

   function X3DNode (executionContext)
   {
      X3DBaseNode .call (this, executionContext);

      this .addType (X3DConstants .X3DNode);
   }

   X3DNode .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
   {
      constructor: X3DNode,
      getDisplayName: (function ()
      {
         const _TrailingNumber = /_\d+$/;

         return function ()
         {
            return this .getName () .replace (_TrailingNumber, "");
         };
      })(),
      traverse: function () { },
      toStream: function (stream)
      {
         stream .string += this .getTypeName () + " { }";
      },
      toVRMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         if (generator .IsSharedNode (this))
         {
            stream .string += "NULL";
            return;
         }

         generator .EnterScope ();

         const name = generator .Name (this);

         if (name .length)
         {
            if (generator .ExistsNode (this))
            {
               stream .string += "USE";
               stream .string += " ";
               stream .string += name;

               generator .LeaveScope ();
               return;
            }
         }

         if (name .length)
         {
            generator .AddNode (this);

            stream .string += "DEF";
            stream .string += " ";
            stream .string += name;
            stream .string += " ";
         }

         stream .string += this .getTypeName ();
         stream .string += " ";
         stream .string += "{";

         const
            fields            = this .getChangedFields (),
            userDefinedFields = this .getUserDefinedFields ();

         let
            fieldTypeLength  = 0,
            accessTypeLength = 0;

         if (this .hasUserDefinedFields ())
         {
            for (const field of userDefinedFields)
            {
               fieldTypeLength  = Math .max (fieldTypeLength, field .getTypeName () .length);
               accessTypeLength = Math .max (accessTypeLength, generator .AccessType (field .getAccessType ()) .length);
            }

            if (userDefinedFields .length)
            {
               stream .string += "\n";
               generator .IncIndent ();

               for (const field of userDefinedFields)
               {
                  this .toVRMLStreamUserDefinedField (stream, field, fieldTypeLength, accessTypeLength);

                  stream .string += "\n";
               }

               generator .DecIndent ();

               if (fields .length !== 0)
                  stream .string += "\n";
            }
         }

         if (fields .length === 0)
         {
            if (userDefinedFields .length)
               stream .string += generator .Indent ();
            else
               stream .string += " ";
         }
         else
         {
            if (userDefinedFields .length === 0)
               stream .string += "\n";

            generator .IncIndent ();

            fields .forEach (function (field)
            {
               this .toVRMLStreamField (stream, field, fieldTypeLength, accessTypeLength);

               stream .string += "\n";
            },
            this);

            generator .DecIndent ();
            stream .string += generator .Indent ();
         }

         stream .string += "}";

         generator .LeaveScope ();
      },
      toVRMLStreamField: function (stream, field, fieldTypeLength, accessTypeLength)
      {
         const generator = Generator .Get (stream);

         if (field .getReferences () .size === 0 || !generator .ExecutionContext ())
         {
            if (field .isInitializable ())
            {
               stream .string += generator .Indent ();
               stream .string += field .getName ();
               stream .string += " ";

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
               stream .string += " ";
               stream .string += "IS";
               stream .string += " ";
               stream .string += reference .getName ();

               ++ index;

               if (index !== field .getReferences () .size)
                  stream .string += "\n";
            });

            if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !this .isDefaultValue (field))
            {
               // Output build in field

               stream .string += "\n";
               stream .string += generator .Indent ();
               stream .string += field .getName ();
               stream .string += " ";

               field .toVRMLStream (stream);
            }
         }
      },
      toVRMLStreamUserDefinedField: function (stream, field, fieldTypeLength, accessTypeLength)
      {
         const generator = Generator .Get (stream);

         if (field .getReferences () .size === 0 || !generator .ExecutionContext ())
         {
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
               stream .string += " ";
               stream .string += generator .PadRight (field .getTypeName (), fieldTypeLength);
               stream .string += " ";
               stream .string += field .getName ();
               stream .string += " ";
               stream .string += "IS";
               stream .string += " ";
               stream .string += reference .getName ();

               ++ index;

               if (index !== field .getReferences () .size)
                  stream .string += "\n";
            });

            if (field .getAccessType () === X3DConstants .inputOutput && !initializableReference && !field .isDefaultValue ())
            {
               stream .string += "\n";
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
            }
         }
      },
      toXMLStream: function (stream)
      {
         const generator = Generator .Get (stream);

         if (generator .IsSharedNode (this))
         {
            stream .string += generator .Indent ();
            stream .string += "<!-- NULL -->";
            return;
         }

         generator .EnterScope ();

         const name = generator .Name (this);

         if (name .length)
         {
            if (generator .ExistsNode (this))
            {
               stream .string += generator .Indent ();
               stream .string += "<";
               stream .string += this .getTypeName ();
               stream .string += " ";
               stream .string += "USE='";
               stream .string += generator .XMLEncode (name);
               stream .string += "'";

               const containerField = generator .ContainerField ();

               if (containerField)
               {
                  if (containerField .getName () !== this .getContainerField ())
                  {
                     stream .string += " ";
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

            stream .string += " ";
            stream .string += "DEF='";
            stream .string += generator .XMLEncode (name);
            stream .string += "'";
         }

         const containerField = generator .ContainerField ();

         if (containerField)
         {
            if (containerField .getName () !== this .getContainerField ())
            {
               stream .string += " ";
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

            if (field .getReferences () .size === 0 || !generator .ExecutionContext () || mustOutputValue)
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

                        stream .string += "\n";
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

         if ((!this .hasUserDefinedFields () || userDefinedFields .length === 0) && references .length === 0 && childNodes .length === 0 && !cdata)
         {
            stream .string += "/>";
         }
         else
         {
            stream .string += ">\n";

            generator .IncIndent ();

            if (this .hasUserDefinedFields ())
            {
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

                  if ((field .getReferences () .size === 0 || !generator .ExecutionContext ()) || mustOutputValue)
                  {
                     if (mustOutputValue && generator .ExecutionContext ())
                        references .push (field);

                     if (!field .isInitializable () || field .isDefaultValue ())
                     {
                        stream .string += "/>\n";
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
                  }
                  else
                  {
                     if (generator .ExecutionContext ())
                        references .push (field);

                     stream .string += "/>\n";
                  }
               }
            }

            if (references .length)
            {
               stream .string += generator .Indent ();
               stream .string += "<IS>";
               stream .string += "\n";

               generator .IncIndent ();

               for (const field of references)
               {
                  const protoFields = field .getReferences ();

                  protoFields .forEach (function (protoField)
                  {
                     stream .string += generator .Indent ();
                     stream .string += "<connect";
                     stream .string += " ";
                     stream .string += "nodeField='";
                     stream .string += generator .XMLEncode (field .getName ());
                     stream .string += "'";
                     stream .string += " ";
                     stream .string += "protoField='";
                     stream .string += generator .XMLEncode (protoField .getName ());
                     stream .string += "'";
                     stream .string += "/>\n";
                  });
               }

               generator .DecIndent ();

               stream .string += generator .Indent ();
               stream .string += "</IS>\n";
            }

            for (const field of childNodes)
            {
               generator .PushContainerField (field);

               field .toXMLStream (stream);

               stream .string += "\n";

               generator .PopContainerField ();
            }

            if (cdata)
            {
               for (const value of cdata)
               {
                  stream .string += "<![CDATA[";
                  stream .string += generator .escapeCDATA (value);
                  stream .string += "]]>\n";
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
         // TODO: remove named node if any. (do this in NamedNode)
         // TODO: remove imported node if any. (do this in ImportedNode)
         // TODO: remove exported node if any. (do this in ExportedNode)
         // TODO: remove routes from and to node if any. (do this in Route)

         for (const field of this .getFields ())
            field .dispose ();

         // Remove node from entire scene graph.

         const firstParents = new Set (this .getParents ());

         firstParents .forEach (function (firstParent)
         {
            if (firstParent instanceof Fields .SFNode)
            {
               const secondParents = new Set (firstParent .getParents ());

               secondParents .forEach (function (secondParent)
               {
                  if (secondParent instanceof Fields .MFNode)
                  {
                     const length = secondParent .length;

                     secondParent .erase (secondParent .remove (0, length, firstParent), length);
                  }
               });

               firstParent .setValue (null);
            }
         });
      },
   });

   return X3DNode;
});
