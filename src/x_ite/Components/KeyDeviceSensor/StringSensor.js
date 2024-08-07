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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DKeyDeviceSensorNode from "./X3DKeyDeviceSensorNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";

function StringSensor (executionContext)
{
   X3DKeyDeviceSensorNode .call (this, executionContext);

   this .addType (X3DConstants .StringSensor);
}

Object .assign (Object .setPrototypeOf (StringSensor .prototype, X3DKeyDeviceSensorNode .prototype),
{
   keydown (event)
   {
      event .preventDefault ();

      switch (event .key)
      {
         case "Backspace":
         {
            if (this ._isActive .getValue ())
            {
               if (this ._deletionAllowed .getValue ())
               {
                  if (this ._enteredText .length)
                     this ._enteredText = this ._enteredText .getValue () .substring (0, this ._enteredText .length - 1);
               }
            }

            break;
         }
         case "Enter":
         {
            this ._finalText = this ._enteredText;

            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Escape":
         {
            this ._enteredText .set ("");

            if (this ._isActive .getValue ())
               this ._isActive = false;

            break;
         }
         case "Tab":
         {
            break;
         }
         default:
         {
            if (event .charCode || event .keyCode)
            {
               if (event .key .length === 1)
               {
                  if (! this ._isActive .getValue ())
                  {
                     this ._isActive    = true;
                     this ._enteredText = "";
                  }

                  this ._enteredText = this ._enteredText .getValue () + event .key;
               }
            }

            break;
         }
      }
   },
});

Object .defineProperties (StringSensor, X3DNode .getStaticProperties ("StringSensor", "KeyDeviceSensor", 2, "children", "3.0"));

Object .defineProperties (StringSensor,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "deletionAllowed", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enteredText",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "finalText",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",        new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default StringSensor;
