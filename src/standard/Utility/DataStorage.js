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

const
   storages   = new WeakMap (),
   namespaces = new WeakMap (),
   defaults   = new WeakMap ();

const handler =
{
   get (target, key)
   {
      const property = target [key];

      if (property !== undefined)
         return property;

      const string = target .getStorage () [target .getNameSpace () + key];

      if (string === undefined || string === "undefined" || string === null)
         return target .getDefaultValue (key);

      const value = JSON .parse (string);

      return value;
   },
   set (target, key, value)
   {
      if (value === undefined)
         target .getStorage () .removeItem (target .getNameSpace () + key);

      else
         target .getStorage () [target .getNameSpace () + key] = JSON .stringify (value);

      return true;
   },
};

function DataStorage (storage, namespace)
{
   this .target  = this;

   storages   .set (this, storage);
   namespaces .set (this, namespace);
   defaults   .set (this, { });

   return new Proxy (this, handler);
}

DataStorage .prototype = {
   constructor: DataStorage,
   getStorage ()
   {
      return storages .get (this .target);
   },
   getNameSpace ()
   {
      return namespaces .get (this .target);
   },
   addNameSpace (namespace)
   {
      return new DataStorage (this .getStorage (), this .getNameSpace () + namespace);
   },
   addDefaultValues (object)
   {
      Object .assign (defaults .get (this .target), object);
   },
   getDefaultValue (key)
   {
      const value = defaults .get (this .target) [key];

      return value === undefined ? undefined : JSON .parse (JSON .stringify (value));
   },
   clear ()
   {
      const
         storage   = this .getStorage (),
         namespace = this .getNameSpace ();

      for (const key of Object .keys (storage))
      {
         if (key .startsWith (namespace))
            storage .removeItem (key)
      }
   },
}

export default DataStorage;
