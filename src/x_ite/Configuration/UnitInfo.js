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

import X3DObject from "../Base/X3DObject.js";

function UnitInfo (category, name, conversionFactor)
{
   Object .defineProperties (this,
   {
      category: { value: category, enumerable: true },
      name: { value: name, enumerable: true },
      conversionFactor: { value: conversionFactor, enumerable: true },
   });
}

UnitInfo .prototype = Object .assign (Object .create (X3DObject .prototype),
{
   constructor: UnitInfo,
   getTypeName: function ()
   {
      return "UnitInfo";
   },
   toVRMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "UNIT";
      generator .string += generator .Space ();
      generator .string += this .category;
      generator .string += generator .Space ();
      generator .string += this .name;
      generator .string += generator .Space ();
      generator .string += this .conversionFactor;
   },
   toXMLStream: function (generator)
   {
      generator .string += generator .Indent ();
      generator .string += "<unit";
      generator .string += generator .Space ();
      generator .string += "category='";
      generator .string += this .category;
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "name='";
      generator .string += generator .XMLEncode (this .name);
      generator .string += "'";
      generator .string += generator .Space ();
      generator .string += "conversionFactor='";
      generator .string += this .conversionFactor;
      generator .string += "'";
      generator .string += generator .closingTags ? "></unit>" : "/>";
   },
   toJSONStream: function (generator, _throw)
   {
      if (this .conversionFactor === 1)
         throw new Error ("conversionFactor is 1");

      generator .string += generator .Indent ();

      generator .string += '{';
      generator .string += generator .TidyBreak ();
      generator .string += generator .IncIndent ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@category";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += '"';
      generator .string += this .category;
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
      generator .string += generator .JSONEncode (this .name);
      generator .string += '"';
      generator .string += ',';
      generator .string += generator .TidyBreak ();

      generator .string += generator .Indent ();
      generator .string += '"';
      generator .string += "@conversionFactor";
      generator .string += '"';
      generator .string += ':';
      generator .string += generator .TidySpace ();
      generator .string += this .conversionFactor;
      generator .string += generator .TidyBreak ();

      generator .string += generator .DecIndent ();
      generator .string += generator .Indent ();
      generator .string += '}';
   },
});

for (const key of Reflect .ownKeys (UnitInfo .prototype))
   Object .defineProperty (UnitInfo .prototype, key, { enumerable: false });

Object .defineProperty (UnitInfo .prototype, "conversion_factor",
{
   get: function () { return this .conversionFactor; },
});

export default UnitInfo;
