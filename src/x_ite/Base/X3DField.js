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

import X3DChildObject  from "./X3DChildObject.js";
import X3DConstants    from "./X3DConstants.js";
import Events          from "./Events.js";
import IterableWeakSet from "./IterableWeakSet.js";

const
   _value               = Symbol (),
   _accessType          = Symbol (),
   _unit                = Symbol (),
   _references          = Symbol (),
   _referencesCallbacks = Symbol (),
   _fieldInterests      = Symbol (),
   _fieldCallbacks      = Symbol (),
   _inputRoutes         = Symbol (),
   _outputRoutes        = Symbol (),
   _routeCallbacks      = Symbol (),
   _uniformLocation     = Symbol .for ("X_ITE.X3DField.uniformLocation");

function X3DField (value)
{
   X3DChildObject .call (this);

   this [_value] = value;
}

Object .assign (Object .setPrototypeOf (X3DField .prototype, X3DChildObject .prototype),
{
   [_value]: null,
   [_accessType]: X3DConstants .initializeOnly,
   [_unit]: null,
   [_references]: new IterableWeakSet (),
   [_referencesCallbacks]: new Map (),
   [_fieldInterests]: new IterableWeakSet (),
   [_fieldCallbacks]: new Map (),
   [_inputRoutes]: new IterableWeakSet (),
   [_outputRoutes]: new IterableWeakSet (),
   [_routeCallbacks]: new Map (),
   [_uniformLocation]: null,
   create ()
   {
      return new (this .constructor) ();
   },
   equals (field)
   {
      return this [_value] === field .valueOf ();
   },
   assign (field)
   {
      // Assigns field to this field.
      this .set (field .getValue ());
      this .addEvent ();
   },
   set (value)
   {
      // Sets internal value without generating event.
      this [_value] = value;
   },
   setValue (value)
   {
      // Sets internal value and generates event.
      this .set (value instanceof this .constructor ? value .getValue () : value);
      this .addEvent ();
   },
   getValue ()
   {
      return this [_value];
   },
   getType ()
   {
      return X3DConstants [this .constructor .typeName];
   },
   setAccessType (value)
   {
      this [_accessType] = value;
   },
   getAccessType ()
   {
      return this [_accessType];
   },
   isInitializable ()
   {
      return !! (this [_accessType] & X3DConstants .initializeOnly);
   },
   isInput ()
   {
      return !! (this [_accessType] & X3DConstants .inputOnly);
   },
   isOutput ()
   {
      return !! (this [_accessType] & X3DConstants .outputOnly);
   },
   isReadable ()
   {
      return this [_accessType] !== X3DConstants .inputOnly;
   },
   isWritable ()
   {
      return this [_accessType] !== X3DConstants .outputOnly;
   },
   setUnit (value)
   {
      this [_unit] = value;
   },
   getUnit ()
   {
      return this [_unit];
   },
   isReference (accessType)
   {
      return accessType === this [_accessType] || accessType === X3DConstants .inputOutput;
   },
   addReference (reference)
   {
      if (this [_references] === X3DField .prototype [_references])
         this [_references] = new IterableWeakSet ();

      if (this [_references] .has (reference))
         return;

      this [_references] .add (reference);

      // Create IS relationship

      switch (this .getAccessType () & reference .getAccessType ())
      {
         case X3DConstants .initializeOnly:
            reference .addFieldInterest (this);
            this .processEvent (Events .from (reference));
            break;
         case X3DConstants .inputOnly:
            reference .addFieldInterest (this);
            break;
         case X3DConstants .outputOnly:
            this .addFieldInterest (reference);
            break;
         case X3DConstants .inputOutput:
            reference .addFieldInterest (this);
            this .addFieldInterest (reference);
            this .processEvent (Events .from (reference));
            break;
      }

      this .processReferencesCallbacks ();
   },
   removeReference (reference)
   {
      this .getReferences () .delete (reference);

      // Create IS relationship

      switch (this .getAccessType () & reference .getAccessType ())
      {
         case X3DConstants .initializeOnly:
            reference .removeFieldInterest (this);
            break;
         case X3DConstants .inputOnly:
            reference .removeFieldInterest (this);
            break;
         case X3DConstants .outputOnly:
            this .removeFieldInterest (reference);
            break;
         case X3DConstants .inputOutput:
            reference .removeFieldInterest (this);
            this .removeFieldInterest (reference);
            break;
      }

      this .processReferencesCallbacks ();
   },
   getReferences ()
   {
      return this [_references];
   },
   addReferencesCallback (key, object)
   {
      this [_referencesCallbacks] = new Map (this [_referencesCallbacks]);

      this [_referencesCallbacks] .set (key, object);
   },
   removeReferencesCallback (key)
   {
      this [_referencesCallbacks] .delete (key);
   },
   getReferencesCallbacks ()
   {
      return this [_referencesCallbacks];
   },
   processReferencesCallbacks ()
   {
      for (const callback of this [_referencesCallbacks] .values ())
         callback ();
   },
   addFieldInterest (field)
   {
      if (this [_fieldInterests] === X3DField .prototype [_fieldInterests])
         this [_fieldInterests] = new IterableWeakSet ();

      this [_fieldInterests] .add (field);
   },
   removeFieldInterest (field)
   {
      this [_fieldInterests] .delete (field);
   },
   getFieldInterests ()
   {
      return this [_fieldInterests];
   },
   addFieldCallback (key, object)
   {
      this [_fieldCallbacks] = new Map (this [_fieldCallbacks]);

      this [_fieldCallbacks] .set (key, object);
   },
   removeFieldCallback (key)
   {
      this [_fieldCallbacks] .delete (key);
   },
   getFieldCallbacks ()
   {
      return this [_fieldCallbacks];
   },
   addInputRoute (route)
   {
      if (this [_inputRoutes] === X3DField .prototype [_inputRoutes])
         this [_inputRoutes] = new IterableWeakSet ();

      this [_inputRoutes] .add (route);

      this .processRouteCallbacks ();
   },
   removeInputRoute (route)
   {
      this [_inputRoutes] .delete (route);

      this .processRouteCallbacks ();
   },
   getInputRoutes ()
   {
      return this [_inputRoutes];
   },
   addOutputRoute (route)
   {
      if (this [_outputRoutes] === X3DField .prototype [_outputRoutes])
         this [_outputRoutes] = new IterableWeakSet ();

      this [_outputRoutes] .add (route);

      this .processRouteCallbacks ();
   },
   removeOutputRoute (route)
   {
      this [_outputRoutes] .delete (route);

      this .processRouteCallbacks ();
   },
   getOutputRoutes ()
   {
      return this [_outputRoutes];
   },
   addRouteCallback (key, object)
   {
      // Processed if routes are changed.

      this [_routeCallbacks] = new Map (this [_routeCallbacks]);

      this [_routeCallbacks] .set (key, object);
   },
   removeRouteCallback (key)
   {
      this [_routeCallbacks] .delete (key);
   },
   getRouteCallbacks ()
   {
      return this [_routeCallbacks];
   },
   processRouteCallbacks ()
   {
      for (const callback of this [_routeCallbacks] .values ())
         callback ();
   },
   processEvent (event = Events .create (this))
   {
      event .add (this);

      this .setTainted (false);

      const field = event .field;

      if (field !== this)
         this .set (field .getValue (), field .length);

      // Process interests.

      this .processInterests ();

      // Process routes.

      let first = true;

      for (const field of this [_fieldInterests])
      {
         if (event .has (field))
            continue;

         if (first)
         {
            first = false;
            field .addEventObject (this, event);
         }
         else
         {
            field .addEventObject (this, Events .copy (event));
         }
      }

      if (first)
         Events .push (event);

      // Process field callbacks.

      for (const callback of this [_fieldCallbacks] .values ())
         callback (this .valueOf ());
   },
   fromString (string, scene)
   {
      // Function will be overridden in VRMLParser.
   },
   dispose ()
   {
      for (const reference of this [_references])
         reference .removeFieldInterest (this);

      for (const route of new Set (this [_inputRoutes]))
         route .dispose ();

      for (const route of new Set (this [_outputRoutes]))
         route .dispose ();

      this [_references]          .clear ();
      this [_referencesCallbacks] .clear ();
      this [_fieldInterests]      .clear ();
      this [_fieldCallbacks]      .clear ();
      this [_inputRoutes]         .clear ();
      this [_outputRoutes]        .clear ();
      this [_routeCallbacks]      .clear ();

      X3DChildObject .prototype .dispose .call (this);
   }
});

for (const key of Object .keys (X3DField .prototype))
   Object .defineProperty (X3DField .prototype, key, { enumerable: false });

export default X3DField;
