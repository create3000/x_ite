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

import X3DField from "../Base/X3DField.js";

function SFString (value)
{
   X3DField .call (this, arguments .length ? "" + value : "");
}

Object .assign (Object .setPrototypeOf (SFString .prototype, X3DField .prototype),
{
   *[Symbol .iterator] ()
   {
      yield* this .getValue ();
   },
   copy ()
   {
      return new SFString (this .getValue ());
   },
   isDefaultValue ()
   {
      return this .getValue () === "";
   },
   set (value)
   {
      X3DField .prototype .set .call (this, "" + value);
   },
   valueOf: X3DField .prototype .getValue,
   toStream (generator)
   {
      generator .string += '"';
      generator .string += SFString .escape (this .getValue ());
      generator .string += '"';
   },
   toVRMLStream (generator)
   {
      this .toStream (generator);
   },
   toXMLStream (generator, sourceText = false)
   {
      generator .string += sourceText
         ? generator .XMLEncodeSourceText (this .getValue ())
         : generator .XMLEncode (this .getValue ());
   },
   toJSONStream (generator)
   {
      this .toJSONStreamValue (generator)
   },
   toJSONStreamValue (generator)
   {
      generator .string += '"';
      generator .string += generator .JSONEncode (this .getValue ());
      generator .string += '"';
   },
});

for (const key of Reflect .ownKeys (SFString .prototype))
   Object .defineProperty (SFString .prototype, key, { enumerable: false });

Object .defineProperty (SFString .prototype, "length",
{
   get ()
   {
      return this .getValue () .length;
   },
});

Object .defineProperties (SFString,
{
   typeName:
   {
      value: "SFString",
      enumerable: true,
   },
});

Object .assign (SFString,
{
   unescape (string)
   {
      return string .replace (/\\([\\"])/g, "$1");
   },
   escape (string)
   {
      return string .replace (/([\\"])/g, "\\$1");
   },
});

export default SFString;
