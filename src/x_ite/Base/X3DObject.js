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

import Generator from "../InputOutput/Generator.js";
import Features  from "../Features.js";

const
   _name       = Symbol (),
   _interests  = Symbol (),
   _registry   = Symbol (),
   _userData   = Symbol (),
   _generator  = Symbol ();

const EMPTY = [ ];

function X3DObject () { }

Object .assign (X3DObject .prototype,
{
   [_name]: "",
   [_interests]: null,
   [_registry]: null,
   [_userData]: null,
   [_generator]: new Generator ({ }),
   getId ()
   {
      return X3DObject .getId (this);
   },
   getTypeName ()
   {
      return this .constructor .typeName;
   },
   setName (value)
   {
      this [_name] = value;
   },
   getName ()
   {
      return this [_name];
   },
   getDisplayName ()
   {
      return this [_name];
   },
   hasInterest (callbackName, object)
   {
      return this [_interests] ?.has (X3DObject .getInterestId (object [callbackName], object)) ?? false;
   },
   addInterest (callbackName, object, ... args)
   {
      const
         weakRef    = new WeakRef (object),
         callback   = object [callbackName],
         interestId = X3DObject .getInterestId (callback, object);

      this [_registry] ??= new FinalizationRegistry (objectId =>
      {
         for (const interestId of this [_interests] .keys ())
         {
            if (interestId .endsWith (objectId))
               this [_interests] .delete (interestId);
         }
      });

      this [_interests] = new Map (this [_interests]);

      this [_registry] .register (object, interestId .replace (/^\d+/, ""), object);
      this [_interests] .set (interestId, { callback, weakRef, args });
   },
   removeInterest (callbackName, object)
   {
      this [_interests] ?.delete (X3DObject .getInterestId (object [callbackName], object));
   },
   getInterests ()
   {
      return this [_interests] ??= new Map ();
   },
   processInterests ()
   {
      for (const { callback, weakRef, args } of this [_interests] ?.values () ?? EMPTY)
      {
         const object = weakRef .deref ();

         if (object)
            callback .call (object, ... args, this);
      }
   },
   getUserData (key)
   {
      return this [_userData] ?.get (key);
   },
   setUserData (key, value)
   {
      this [_userData] ??= new Map ();

      this [_userData] .set (key, value);
   },
   removeUserData (key)
   {
      this [_userData] ?.delete (key);
   },
   toString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? this [_generator]
         : new Generator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toVRMLString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? this [_generator]
         : new Generator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toVRMLStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toXMLString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? this [_generator]
         : new Generator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toXMLStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toJSONString (options)
   {
      const generator = !options || $.isEmptyObject (options)
         ? this [_generator]
         : new Generator (options);

      generator .string = "";

      generator .PushExecutionContext (options ?.scene ?? null);

      this .toJSONStream (generator);

      generator .PopExecutionContext ();

      return generator .string;
   },
   toStream (generator)
   {
      generator .string = Object .prototype .toString .call (this);
   },
   dispose ()
   {
      this [_interests] ?.clear ();
      this [_userData]  ?.clear ();
   },
});

for (const key of Object .keys (X3DObject .prototype))
   Object .defineProperty (X3DObject .prototype, key, { enumerable: false });

Object .defineProperties (X3DObject .prototype,
{
   [Symbol .toStringTag]:
   {
      get () { return this .getTypeName (); },
   },
});

Object .assign (X3DObject,
{
   getId: Features .FINALIZATION_REGISTRY ? (() =>
   {
      const
         map      = new WeakMap (),
         cache    = [ ],
         registry = new FinalizationRegistry (id => cache .push (id));

      let counter = 0;

      return function (object)
      {
         const id = map .get (object);

         if (id !== undefined)
         {
            return id;
         }
         else
         {
            const id = cache .pop () ?? ++ counter;

            map .set (object, id);
            registry .register (object, id);

            return id;
         }
      };
   })() : (() =>
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
   })(),
   getInterestId (callback, object)
   {
      return `${this .getId (callback)}:${this .getId (object)}`;
   },
});

export default X3DObject;
