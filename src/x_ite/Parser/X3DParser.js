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

function X3DParser (scene)
{
   this .scene             = scene;
   this .executionContexts = [ scene ];
   this .prototypes        = [ ];
   this .units             = true;
}

X3DParser .prototype = {
   constructor: X3DParser,
   getScene: function ()
   {
      return this .scene;
   },
   getBrowser: function ()
   {
      return this .scene .getBrowser ();
   },
   getExecutionContext: function ()
   {
      return this .executionContexts .at (-1);
   },
   pushExecutionContext: function (executionContext)
   {
      return this .executionContexts .push (executionContext);
   },
   popExecutionContext: function ()
   {
      this .executionContexts .pop ();
   },
   getPrototype: function ()
   {
      return this .prototypes .at (-1);
   },
   pushPrototype: function (prototype)
   {
      return this .prototypes .push (prototype);
   },
   popPrototype: function ()
   {
      this .prototypes .pop ();
   },
   isInsideProtoDefinition: function ()
   {
      return Boolean (this .prototypes .length);
   },
   loadComponents: (function ()
   {
      const VRML =
      [
         "Core",
         "EnvironmentalEffects",
         "EnvironmentalSensor",
         "Geometry3D",
         "Grouping",
         "Interpolation",
         "Lighting",
         "Navigation",
         "Networking",
         "PointingDeviceSensor",
         "Rendering",
         "Scripting",
         "Shape",
         "Sound",
         "Text",
         "Texturing",
         "Time",
      ];

      return function ()
      {
         const
            browser = this .getBrowser (),
            scene   = this .getScene ();

         if (scene .getSpecificationVersion () === "2.0")
            return browser .loadComponents (VRML);

         return Promise .all ([
            browser .loadComponents (scene .getProfile () || browser .getProfile ("Full")),
            browser .loadComponents (scene .getComponents ()),
         ]);
      };
   })(),
   setUnits: function (generator)
   {
      if (typeof arguments [0] == "boolean")
      {
         this .units = arguments [0];
         return;
      }

      const
         version = /Titania\s+V(\d+).*/,
         match   = generator .match (version);

      if (match)
      {
         const major = parseInt (match [1]);

         // Before version 4 units are wrongly implemented.
         if (major < 4)
         {
            this .units = false;
            return;
         }
      }

      this .units = true;
   },
   getUnits: function ()
   {
      return this .units;
   },
   fromUnit: function (category, value)
   {
      if (this .units)
         return this .scene .fromUnit (category, value);

      return value;
   },
   sanitizeName: function (name)
   {
      if (typeof name !== "string")
         return;

      // NonIdFirstChar
      name = name .replace (/^[\x30-\x39\x00-\x20\x22\x23\x27\x2b\x2c\x2d\x2e\x5b\x5c\x5d\x7b\x7d\x7f]*/, "");

      // NonIdChars
      name = name .replace (/[\x00-\x20\x22\x23\x27\x2c\x2e\x5b\x5c\x5d\x7b\x7d\x7f]/g, "");

      // Spaces
      name = name .trim () .replace (/\s+/g, "-");

      return name;
   },
};

export default X3DParser;
