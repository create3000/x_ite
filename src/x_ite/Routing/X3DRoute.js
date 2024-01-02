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

import X3DObject    from "../Base/X3DObject.js";
import X3DConstants from "../Base/X3DConstants.js";
import SFNodeCache  from "../Fields/SFNodeCache.js";
import X3DNode      from "../Components/Core/X3DNode.js";

const
   _executionContext     = Symbol (),
   _sourceNode           = Symbol (),
   _sourceFieldName      = Symbol (),
   _sourceField          = Symbol (),
   _destinationNode      = Symbol (),
   _destinationFieldName = Symbol (),
   _destinationField     = Symbol ();

function X3DRoute (executionContext, sourceNode, sourceField, destinationNode, destinationField)
{
   X3DObject .call (this, executionContext);

   this [_executionContext]     = executionContext;
   this [_sourceNode]           = sourceNode;
   this [_sourceFieldName]      = sourceField;
   this [_destinationNode]      = destinationNode;
   this [_destinationFieldName] = destinationField;

   this .reconnect ();
}

Object .assign (Object .setPrototypeOf (X3DRoute .prototype, X3DObject .prototype),
{
   getExecutionContext ()
   {
      return this [_executionContext];
   },
   getRouteId ()
   {
      return X3DRoute .getRouteId (this [_sourceNode], this [_sourceFieldName], this [_destinationNode], this [_destinationFieldName]);
   },
   getSourceNode ()
   {
      ///  SAI
      return this [_sourceNode];
   },
   getSourceField ()
   {
      ///  SAI
      return this [_sourceFieldName];
   },
   getDestinationNode ()
   {
      ///  SAI
      return this [_destinationNode];
   },
   getDestinationField ()
   {
      ///  SAI
      return this [_destinationFieldName];
   },
   reconnect ()
   {
      try
      {
         this .disconnect ();
         this .connect ();
      }
      catch (error)
      {
         if ((this [_sourceNode] instanceof X3DNode ||
              this [_sourceNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE) &&
             (this [_destinationNode] instanceof X3DNode ||
              this [_destinationNode] .getInlineNode () .checkLoadState () === X3DConstants .COMPLETE_STATE))
         {
            console .warn (error .message);
         }
      }
   },
   connect ()
   {
      const sourceNode = this [_sourceNode] instanceof X3DNode
         ? this [_sourceNode]
         : this [_sourceNode] .getExportedNode ();

      const destinationNode = this [_destinationNode] instanceof X3DNode
         ? this [_destinationNode]
         : this [_destinationNode] .getExportedNode ();

      this [_sourceField]      = sourceNode      .getField (this [_sourceFieldName]),
      this [_destinationField] = destinationNode .getField (this [_destinationFieldName]);

      this [_sourceField]      .addOutputRoute (this);
      this [_destinationField] .addInputRoute (this);

      this [_sourceField] .addFieldInterest (this [_destinationField]);
   },
   disconnect ()
   {
      if (!this [_sourceField])
         return;

      if (!this [_destinationField])
         return;

      this [_sourceField]      .removeOutputRoute (this);
      this [_destinationField] .removeInputRoute (this);

      this [_sourceField] .removeFieldInterest (this [_destinationField]);

      this [_sourceField]      = null;
      this [_destinationField] = null;
   },
   toVRMLStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : this [_sourceNode] .getImportedName ();

      generator .string += generator .Indent ();
      generator .string += "ROUTE";
      generator .string += generator .Space ();
      generator .string += sourceNodeName;
      generator .string += ".";
      generator .string += this [_sourceFieldName];

      if (this [_sourceField] ?.getAccessType () === X3DConstants .inputOutput)
         generator .string += "_changed";

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : this [_destinationNode] .getImportedName ();

      generator .string += generator .Space ();
      generator .string += "TO";
      generator .string += generator .Space ();
      generator .string += destinationNodeName;
      generator .string += ".";

      if (this [_destinationField] ?.getAccessType () === X3DConstants .inputOutput)
         generator .string += "set_";

      generator .string += this [_destinationFieldName];
   },
   toXMLStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : this [_sourceNode] .getImportedName ();

      generator .string += generator .Indent ();
      generator .string += "<ROUTE";
      generator .string += generator .Space ();
      generator .string += "fromNode='";
      generator .string += generator .XMLEncode (sourceNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "fromField='";
      generator .string += generator .XMLEncode (this [_sourceFieldName]);

      if (this [_sourceField] ?.getAccessType () === X3DConstants .inputOutput)
         generator .string += "_changed";

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : this [_destinationNode] .getImportedName ();

      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toNode='";
      generator .string += generator .XMLEncode (destinationNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toField='";

      if (this [_destinationField] ?.getAccessType () === X3DConstants .inputOutput)
         generator .string += "set_";

      generator .string += generator .XMLEncode (this [_destinationFieldName]);
      generator .string += "'";
      generator .string += generator .closingTags ? "></ROUTE>" : "/>";
   },
   toJSONStream (generator)
   {
      if (!generator .ExistsRouteNode (this [_sourceNode]))
         throw new Error (`Source node does not exist in scene graph.`);

      if (!generator .ExistsRouteNode (this [_destinationNode]))
         throw new Error (`Destination node does not exist in scene graph.`);

      const sourceNodeName = this [_sourceNode] instanceof X3DNode
         ? generator .Name (this [_sourceNode])
         : this [_sourceNode] .getImportedName ();

      generator .string += generator .Indent ();
      generator .string += '{';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += "ROUTE";
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
      generator .string += "@fromNode";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (sourceNodeName);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@fromField";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this [_sourceFieldName]);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      const destinationNodeName = this [_destinationNode] instanceof X3DNode
         ? generator .Name (this [_destinationNode])
         : this [_destinationNode] .getImportedName ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@toNode";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (destinationNodeName);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@toField";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += generator .JSONEncode (this [_destinationFieldName]);
      generator .string += '"';
      generator .string += generator .TidyBreak ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
      generator .string += generator .TidyBreak ();
      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
   dispose ()
   {
      this .disconnect ();

      this [_executionContext] .deleteRoute (this);

      X3DObject .prototype .dispose .call (this);
   }
});

for (const key of Object .keys (X3DRoute .prototype))
   Object .defineProperty (X3DRoute .prototype, key, { enumerable: false });

Object .defineProperties (X3DRoute .prototype,
{
   sourceNode:
   {
      get ()
      {
         if (this [_sourceNode] instanceof X3DNode)
            return SFNodeCache .get (this [_sourceNode]);
         else
            return this [_sourceNode];
      },
      enumerable: true,
   },
   sourceField:
   {
      get ()
      {
         return this [_sourceFieldName];
      },
      enumerable: true,
   },
   destinationNode:
   {
      get ()
      {
         if (this [_sourceNode] instanceof X3DNode)
            return SFNodeCache .get (this [_destinationNode]);
         else
            return this [_destinationNode];
      },
      enumerable: true,
   },
   destinationField:
   {
      get ()
      {
         return this [_destinationFieldName];
      },
      enumerable: true,
   },
});

Object .defineProperties (X3DRoute,
{
   typeName:
   {
      value: "X3DRoute",
      enumerable: true,
   },
});

Object .assign (X3DRoute,
{
   getRouteId (sourceNode, sourceField, destinationNode, destinationField)
   {
      return `${sourceNode .getId ()}.${sourceField}.${destinationNode .getId ()}.${destinationField}`;
   },
});

export default X3DRoute;
