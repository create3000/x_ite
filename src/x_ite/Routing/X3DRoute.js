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

const
   _executionContext = Symbol (),
   _sourceNode       = Symbol (),
   _sourceField      = Symbol (),
   _destinationNode  = Symbol (),
   _destinationField = Symbol ();

function X3DRoute (executionContext, sourceNode, sourceField, destinationNode, destinationField)
{
   X3DObject .call (this, executionContext);

   this [_executionContext] = executionContext;
   this [_sourceNode]       = sourceNode;
   this [_sourceField]      = sourceField;
   this [_destinationNode]  = destinationNode;
   this [_destinationField] = destinationField;

   // Must connect in every context, to make X3DBaseNode.hasRoutes work.

   sourceField .addFieldInterest (destinationField);

   sourceField      .addOutputRoute (this);
   destinationField .addInputRoute (this);
}

X3DRoute .prototype = Object .assign (Object .create (X3DObject .prototype),
{
   getTypeName: function ()
   {
      return "X3DRoute";
   },
   getExecutionContext: function ()
   {
      return this [_executionContext];
   },
   getSourceNode: function ()
   {
      ///  SAI
      return this [_sourceNode];
   },
   getSourceField: function ()
   {
      ///  SAI
      return this [_sourceField];
   },
   getDestinationNode: function ()
   {
      ///  SAI
      return this [_destinationNode];
   },
   getDestinationField: function ()
   {
      ///  SAI
      return this [_destinationField];
   },
   disconnect: function ()
   {
      this [_sourceField] .removeFieldInterest (this [_destinationField]);

      this [_sourceField]      .removeOutputRoute (this);
      this [_destinationField] .removeInputRoute (this);
   },
   toVRMLStream: function (generator)
   {
      const
         sourceNodeName      = generator .LocalName (this [_sourceNode]),
         destinationNodeName = generator .LocalName (this [_destinationNode]);

      generator .string += generator .Indent ();
      generator .string += "ROUTE";
      generator .string += generator .Space ();
      generator .string += sourceNodeName;
      generator .string += ".";
      generator .string += this [_sourceField] .getName ();

      if (this [_sourceField] .getAccessType () === X3DConstants .inputOutput)
         generator .string += "_changed";

      generator .string += generator .Space ();
      generator .string += "TO";
      generator .string += generator .Space ();
      generator .string += destinationNodeName;
      generator .string += ".";

      if (this [_destinationField] .getAccessType () === X3DConstants .inputOutput)
         generator .string += "set_";

      generator .string += this [_destinationField] .getName ();
   },
   toXMLStream: function (generator)
   {
      const
         sourceNodeName      = generator .LocalName (this [_sourceNode]),
         destinationNodeName = generator .LocalName (this [_destinationNode]);

      generator .string += generator .Indent ();
      generator .string += "<ROUTE";
      generator .string += generator .Space ();
      generator .string += "fromNode='";
      generator .string += generator .XMLEncode (sourceNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "fromField='";
      generator .string += generator .XMLEncode (this [_sourceField] .getName ());

      if (this [_sourceField] .getAccessType () === X3DConstants .inputOutput)
         generator .string += "_changed";

      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toNode='";
      generator .string += generator .XMLEncode (destinationNodeName);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "toField='";

      if (this [_destinationField] .getAccessType () === X3DConstants .inputOutput)
         generator .string += "set_";

      generator .string += generator .XMLEncode (this [_destinationField] .getName ());
      generator .string += "'";
      generator .string += generator .closingTags ? "></ROUTE>" : "/>";
   },
   toJSONStream: function (generator)
   {
      const
         sourceNodeName      = generator .LocalName (this [_sourceNode]),
         destinationNodeName = generator .LocalName (this [_destinationNode]);

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
      generator .string += generator .JSONEncode (this [_sourceField] .getName ());
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

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
      generator .string += generator .JSONEncode (this [_destinationField] .getName ());
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
   dispose: function ()
   {
      this .disconnect ();

      this [_executionContext] .deleteRoute (this);

      X3DObject .prototype .dispose .call (this);
   }
});

for (const key of Reflect .ownKeys (X3DRoute .prototype))
   Object .defineProperty (X3DRoute .prototype, key, { enumerable: false });

Object .defineProperty (X3DRoute .prototype, "sourceNode",
{
   get: function ()
   {
      return SFNodeCache .get (this [_sourceNode]);
   },
   enumerable: true,
});

Object .defineProperty (X3DRoute .prototype, "sourceField",
{
   get: function ()
   {
      return this [_sourceField] .getName ();
   },
   enumerable: true,
});

Object .defineProperty (X3DRoute .prototype, "destinationNode",
{
   get: function ()
   {
      return SFNodeCache .get (this [_destinationNode]);
   },
   enumerable: true,
});

Object .defineProperty (X3DRoute .prototype, "destinationField",
{
   get: function ()
   {
      return this [_destinationField] .getName ();
   },
   enumerable: true,
});

export default X3DRoute;
