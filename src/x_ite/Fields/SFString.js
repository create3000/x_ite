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

import X3DField     from "../Base/X3DField.js";
import X3DConstants from "../Base/X3DConstants.js";

const
   unescape = /\\([\\"])/g,
   escape   = /([\\"])/g;

function SFString (value)
{
   return X3DField .call (this, arguments .length ? "" + value : "");
}

Object .assign (SFString,
{
   unescape: function (string)
   {
      return string .replace (unescape, "$1");
   },
   escape: function (string)
   {
      return string .replace (escape, "\\$1");
   },
});

SFString .prototype = Object .assign (Object .create (X3DField .prototype),
{
   constructor: SFString,
   [Symbol .iterator]: function* ()
   {
      yield* this .getValue ();
   },
   copy: function ()
   {
      return new SFString (this .getValue ());
   },
   getTypeName: function ()
   {
      return "SFString";
   },
   getType: function ()
   {
      return X3DConstants .SFString;
   },
   isDefaultValue: function ()
   {
      return this .getValue () === "";
   },
   set: function (value)
   {
      X3DField .prototype .set .call (this, "" + value);
   },
   valueOf: X3DField .prototype .getValue,
   toStream: function (generator)
   {
      generator .string += '"' + SFString .escape (this .getValue ()) + '"';
   },
   toVRMLStream: function (generator)
   {
      this .toStream (generator);
   },
   toXMLStream: function (generator)
   {
      generator .string += generator .XMLEncode (this .getValue ());
   },
   toJSONStream: function (generator)
   {
      this .toJSONStreamValue (generator)
   },
   toJSONStreamValue: function (generator)
   {
      generator .string += generator .JSONEncode (this .getValue ());
   },
});

for (const key of Reflect .ownKeys (SFString .prototype))
   Object .defineProperty (SFString .prototype, key, { enumerable: false });

Object .defineProperty (SFString .prototype, "length",
{
   get: function ()
   {
      return this .getValue () .length;
   },
   enumerable: true,
   configurable: false
});

export default SFString;
