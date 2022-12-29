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

import Generator    from "../InputOutput/Generator.js";
import MapUtilities from "../../standard/Utility/MapUtilities.js";

const
   _name      = Symbol (),
   _interests = Symbol (),
   _values    = Symbol ();

function X3DObject () { }

X3DObject .prototype =
{
   constructor: X3DObject,
   [_name]: "",
   [_interests]: new Map (),
   [_values]: [ ],
   getId: function ()
   {
      return X3DObject .getId (this);
   },
   getTypeName: function ()
   {
      return "X3DObject";
   },
   setName: function (value)
   {
      this [_name] = value;
   },
   getName: function ()
   {
      return this [_name];
   },
   getDisplayName: function ()
   {
      return this [_name];
   },
   getInterestId: function (callbackName, object)
   {
      return X3DObject .getId (object) + "." + String (callbackName);
   },
   hasInterest: function (callbackName, object)
   {
      return this [_interests] .has (this .getInterestId (callbackName, object));
   },
   addInterest: function (callbackName, object)
   {
      if (this [_interests] === X3DObject .prototype [_interests])
      {
         this [_interests] = new Map ();
         this [_values]    = [ ];
      }

      const
         interestId = this .getInterestId (callbackName, object),
         callback   = object [callbackName];

      if (arguments .length > 2)
      {
         const args = Array .prototype .slice .call (arguments, 2);

         args .unshift (object);
         args .push (this);

         this [_interests] .set (interestId, Function .prototype .bind .apply (callback, args));
      }
      else
      {
         this [_interests] .set (interestId, callback .bind (object, this));
      }
   },
   removeInterest: function (callbackName, object)
   {
      this [_interests] .delete (this .getInterestId (callbackName, object));
   },
   getInterests: function ()
   {
      return this [_interests];
   },
   processInterests: function ()
   {
      if (this [_interests] .size)
      {
         for (const interest of MapUtilities .values (this [_values], this [_interests]))
            interest ();
      }
   },
   toString: function ({ scene } = Object .prototype)
   {
      const generator = new Generator ();

      if (scene)
         generator .PushExecutionContext (scene);

      this .toStream (generator);

      return generator .string;
   },
   toVRMLString: function  ({ scene, style } = Object .prototype)
   {
      const generator = new Generator (style);

      if (scene)
         generator .PushExecutionContext (scene);

      this .toVRMLStream (generator);

      return generator .string;
   },
   toXMLString: function  ({ scene, style } = Object .prototype)
   {
      const generator = new Generator (style);

      if (scene)
         generator .PushExecutionContext (scene);

      this .toXMLStream (generator);

      return generator .string;
   },
   toJSONString: function ({ scene, style } = Object .prototype)
   {
      const generator = new Generator (style);

      if (scene)
         generator .PushExecutionContext (scene);

      this .toVRMLStream (generator); // TODO.

      return generator .string;
   },
   toStream: function (generator)
   {
      generator .string = "[object " + this .getTypeName () + "]";
   },
   dispose: function () { },
};

for (const key of Reflect .ownKeys (X3DObject .prototype))
   Object .defineProperty (X3DObject .prototype, key, { enumerable: false });

X3DObject .getId = (function ()
{
   const map = new WeakMap ();

   let counter = 0;

   return function (object)
   {
      const id = map .get (object);

      if (id !== undefined)
         return id;

      map .set (object, ++ counter);

      return counter;
   };
})();

export default X3DObject;
