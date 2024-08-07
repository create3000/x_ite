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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSensorNode        from "../Core/X3DSensorNode.js";
import X3DTimeDependentNode from "./X3DTimeDependentNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function TimeSensor (executionContext)
{
   X3DSensorNode        .call (this, executionContext);
   X3DTimeDependentNode .call (this, executionContext);

   this .addType (X3DConstants .TimeSensor);

   this .addChildObjects (X3DConstants .inputOutput, "range", new Fields .MFFloat (0, 0, 1)); // current, first, last (in fractions) - play range starting at current

   this .cycle    = 0;
   this .interval = 0;
   this .fraction = 0;
   this .first    = 0;
   this .last     = 1;
   this .scale    = 1;
}

Object .assign (Object .setPrototypeOf (TimeSensor .prototype, X3DSensorNode .prototype),
   X3DTimeDependentNode .prototype,
{
   initialize ()
   {
      X3DSensorNode        .prototype .initialize .call (this);
      X3DTimeDependentNode .prototype .initialize .call (this);

      this ._cycleInterval .addInterest ("set_cycleInterval__", this);
      this ._range         .addInterest ("set_range__",         this);
   },
   setRange (fraction, firstFraction, lastFraction, offset)
   {
      const
         currentTime   = this .getBrowser () .getCurrentTime (),
         startTime     = this ._startTime .getValue (),
         cycleInterval = this ._cycleInterval .getValue ();

      this .first    = Algorithm .clamp (firstFraction, 0, 1);
      this .last     = Algorithm .clamp (lastFraction, 0, 1);
      this .scale    = this .last - this .first;
      this .interval = cycleInterval * this .scale;
      this .offset   = offset && this .interval ? (currentTime - startTime) / this .interval : 0;
      this .fraction = Algorithm .fract (fraction + this .offset);
      this .cycle    = currentTime - (this .fraction - this .first) * cycleInterval;
   },
   set_cycleInterval__ ()
   {
      if (!this ._isActive .getValue ())
         return;

      this .setRange (this .fraction, this ._range [1], this ._range [2], false);
   },
   set_range__ ()
   {
      if (!this ._isActive .getValue ())
         return;

      this .setRange (this ._range [0], this ._range [1], this ._range [2], false);

      if (this ._isPaused .getValue ())
         return;

      this .set_fraction (this .getBrowser () .getCurrentTime ());
   },
   set_start ()
   {
      this .setRange (this ._range [0], this ._range [1], this ._range [2], true);

      const time = this .getBrowser () .getCurrentTime ();

      this ._cycleTime        = time;
      this ._fraction_changed = this .fraction;
      this ._time             = time;
   },
   set_resume (pauseInterval)
   {
      this .setRange (this .fraction, this ._range [1], this ._range [2], false);
   },
   set_fraction (time)
   {
      this ._fraction_changed = this .fraction = this .first + (this .interval ? Algorithm .fract ((time - this .cycle) / this .interval) : 0) * this .scale;
   },
   set_time ()
   {
      // The event order below is very important.

      const time = this .getBrowser () .getCurrentTime ();

      if (time - this .cycle >= this .interval)
      {
         if (this ._loop .getValue ())
         {
            if (this .interval)
            {
               this .cycle += this .interval * Math .floor ((time - this .cycle) / this .interval);

               this ._elapsedTime = this .getElapsedTime ();
               this ._cycleTime   = time;

               this .set_fraction (time);
            }
         }
         else
         {
            this ._fraction_changed = this .fraction = this .last;
            this .stop ();
         }
      }
      else
      {
         this ._elapsedTime = this .getElapsedTime ();

         this .set_fraction (time);
      }

      this ._time = time;
   },
   dispose ()
   {
      X3DTimeDependentNode .prototype .dispose .call (this);
      X3DSensorNode        .prototype .dispose .call (this);
   },
});

Object .defineProperties (TimeSensor,
{
   ... X3DNode .getStaticProperties ("TimeSensor", "Time", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "cycleInterval",    new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loop",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",        new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",       new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",        new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",         new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "cycleTime",        new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",      new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "fraction_changed", new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "time",             new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default TimeSensor;
