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
   "jquery",
   "x_ite/Base/X3DChildObject",
   "x_ite/Bits/X3DConstants",
   "x_ite/Base/Events",
   "standard/Utility/MapUtilities",
],
function ($,
          X3DChildObject,
          X3DConstants,
          Events,
          MapUtilities)
{
"use strict";

   const
      _value           = Symbol (),
      _accessType      = Symbol (),
      _unit            = Symbol (),
      _references      = Symbol (),
      _fieldInterests  = Symbol (),
      _fieldCallbacks  = Symbol (),
      _inputRoutes     = Symbol (),
      _outputRoutes    = Symbol (),
      _routeCallbacks  = Symbol (),
      _uniformLocation = Symbol .for ("X3DField.uniformLocation");

   function X3DField (value)
   {
      X3DChildObject .call (this);

      this [_value] = value;

      return this;
   }

   X3DField .prototype = Object .assign (Object .create (X3DChildObject .prototype),
   {
      constructor: X3DField,
      [_value]: null,
      [_accessType]: X3DConstants .initializeOnly,
      [_unit]: null,
      [_uniformLocation]: null,
      [_references]: new Set (),
      [_fieldInterests]: new Set (),
      [_fieldCallbacks]: new Map (),
      [_inputRoutes]: new Set (),
      [_outputRoutes]: new Set (),
      [_routeCallbacks]: new Map (),
      equals: function (field)
      {
         return this [_value] === field .valueOf ();
      },
      assign: function (field)
      {
         // Assigns field to this field.
         this .set (field .getValue ());
         this .addEvent ();
      },
      set: function (value)
      {
         // Sets internal value without generating event.
         this [_value] = value;
      },
      setValue: function (value)
      {
         // Sets internal value and generates event.
         this .set (value instanceof this .constructor ? value .getValue () : value);
         this .addEvent ();
      },
      getValue: function ()
      {
         return this [_value];
      },
      setAccessType: function (value)
      {
         this [_accessType] = value;
      },
      getAccessType: function ()
      {
         return this [_accessType];
      },
      isInitializable: function ()
      {
         return this [_accessType] & X3DConstants .initializeOnly;
      },
      isInput: function ()
      {
         return this [_accessType] & X3DConstants .inputOnly;
      },
      isOutput: function ()
      {
         return this [_accessType] & X3DConstants .outputOnly;
      },
      isReadable: function ()
      {
         return this [_accessType] !== X3DConstants .inputOnly;
      },
      isWritable: function ()
      {
         return this [_accessType] !== X3DConstants .initializeOnly;
      },
      setUnit: function (value)
      {
         this [_unit] = value;
      },
      getUnit: function ()
      {
         return this [_unit];
      },
      hasReferences: function ()
      {
         if (this .hasOwnProperty (_references))
            return this [_references] .size !== 0;

         return false;
      },
      isReference: function (accessType)
      {
         return accessType === this [_accessType] || accessType === X3DConstants .inputOutput;
      },
      addReference: function (reference)
      {
         const references = this .getReferences ();

         if (references .has (reference))
            return; // throw ???

         references .add (reference);

         // Create IS relationship

         switch (this .getAccessType () & reference .getAccessType ())
         {
            case X3DConstants .initializeOnly:
               reference .addFieldInterest (this);
               this .set (reference .getValue (), reference .length);
               return;
            case X3DConstants .inputOnly:
               reference .addFieldInterest (this);
               return;
            case X3DConstants .outputOnly:
               this .addFieldInterest (reference);
               return;
            case X3DConstants .inputOutput:
               reference .addFieldInterest (this);
               this .addFieldInterest (reference);
               this .set (reference .getValue (), reference .length);
               return;
         }
      },
      removeReference: function (reference)
      {
         this .getReferences () .delete (reference);

         // Create IS relationship

         switch (this .getAccessType () & reference .getAccessType ())
         {
            case X3DConstants .initializeOnly:
               reference .removeFieldInterest (this);
               return;
            case X3DConstants .inputOnly:
               reference .removeFieldInterest (this);
               return;
            case X3DConstants .outputOnly:
               this .removeFieldInterest (reference);
               return;
            case X3DConstants .inputOutput:
               reference .removeFieldInterest (this);
               this .removeFieldInterest (reference);
               return;
         }
      },
      getReferences: function ()
      {
         if (!this .hasOwnProperty (_references))
            this [_references] = new Set ();

         return this [_references];
      },
      addFieldInterest: function (field)
      {
         if (!this .hasOwnProperty (_fieldInterests))
            this [_fieldInterests] = new Set ();

         this [_fieldInterests] .add (field);
      },
      removeFieldInterest: function (field)
      {
         this [_fieldInterests] .delete (field);
      },
      getFieldInterests: function ()
      {
         return this [_fieldInterests];
      },
      addFieldCallback: function (key, object)
      {
         if (!this .hasOwnProperty (_fieldCallbacks))
            this [_fieldCallbacks] = new Map ();

         this [_fieldCallbacks] .set (key, object);
      },
      removeFieldCallback: function (key)
      {
         this [_fieldCallbacks] .delete (key);
      },
      getFieldCallbacks: function ()
      {
         return this [_fieldCallbacks];
      },
      addInputRoute: function (route)
      {
         if (!this .hasOwnProperty (_inputRoutes))
            this [_inputRoutes] = new Set ();

         this [_inputRoutes] .add (route);

         this .processRouteCallbacks ();
      },
      removeInputRoute: function (route)
      {
         this [_inputRoutes] .delete (route);

         this .processRouteCallbacks ();
      },
      getInputRoutes: function ()
      {
         return this [_inputRoutes];
      },
      addOutputRoute: function (route)
      {
         if (!this .hasOwnProperty (_outputRoutes))
            this [_outputRoutes] = new Set ();

         this [_outputRoutes] .add (route);

         this .processRouteCallbacks ();
      },
      removeOutputRoute: function (route)
      {
         this [_outputRoutes] .delete (route);

         this .processRouteCallbacks ();
      },
      getOutputRoutes: function ()
      {
         return this [_outputRoutes];
      },
      addRouteCallback: function (key, object)
      {
         if (!this .hasOwnProperty (_routeCallbacks))
            this [_routeCallbacks] = new Map ();

         this [_routeCallbacks] .set (key, object);
      },
      removeRouteCallback: function (key)
      {
         this [_routeCallbacks] .delete (key);
      },
      getRouteCallbacks: function ()
      {
         return this [_routeCallbacks];
      },
      processRouteCallbacks: (function ()
      {
         const routeCallbacksTemp = [ ];

         return function ()
         {
            if (this [_routeCallbacks] .size)
            {
               for (const routeCallback of MapUtilities .values (routeCallbacksTemp, this [_routeCallbacks]))
                  routeCallback ();
            }
         };
      })(),
      processEvent: (function ()
      {
         const fieldCallbacksTemp = [ ];

         return function (event)
         {
            if (event .has (this))
               return;

            event .add (this);

            this .setTainted (false);

            const field = event .field;

            if (field !== this)
               this .set (field .getValue (), field .length);

            // Process interests

            this .processInterests ();

            // Process routes

            let first = true;

            if (this [_fieldInterests] .size)
            {
               for (const fieldInterest of this [_fieldInterests] .values ())
               {
                  if (first)
                  {
                     first = false;
                     fieldInterest .addEventObject (this, event);
                  }
                  else
                     fieldInterest .addEventObject (this, Events .copy (event));
               }
            }

            if (first)
               Events .push (event);

            // Process field callbacks

            if (this [_fieldCallbacks] .size)
            {
               for (const fieldCallback of MapUtilities .values (fieldCallbacksTemp, this [_fieldCallbacks]))
                  fieldCallback (this .valueOf ());
            }
         };
      })(),
      addCloneCount: Function .prototype,
      removeCloneCount: Function .prototype,
      valueOf: function ()
      {
         return this;
      },
      fromString: function (string, scene)
      {
         const
            Parser = require ("x_ite/Parser/Parser"),
            parser = new Parser (scene);

         parser .setUnits (!!scene);
         parser .setInput (string);

         if (parser .fieldValue (this))
            return;

         throw new Error ("Couldn't read value for field '" + this .getName () + "'.");
      },
   });

   return X3DField;
});
