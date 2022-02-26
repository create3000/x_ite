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
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/KeyDeviceSensor/X3DKeyDeviceSensorNode",
   "x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DKeyDeviceSensorNode,
          X3DConstants)
{
"use strict";

   function StringSensor (executionContext)
   {
      X3DKeyDeviceSensorNode .call (this, executionContext);

      this .addType (X3DConstants .StringSensor);
   }

   StringSensor .prototype = Object .assign (Object .create (X3DKeyDeviceSensorNode .prototype),
   {
      constructor: StringSensor,
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "deletionAllowed", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enteredText",     new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "finalText",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",        new Fields .SFBool ()),
      ]),
      getTypeName: function ()
      {
         return "StringSensor";
      },
      getComponentName: function ()
      {
         return "KeyDeviceSensor";
      },
      getContainerField: function ()
      {
         return "children";
      },
      keydown: function (event)
      {
         event .preventDefault ();

         switch (event .key)
         {
            case "Backspace":
            {
               if (this .isActive_ .getValue ())
               {
                  if (this .deletionAllowed_ .getValue ())
                  {
                     if (this .enteredText_ .length)
                        this .enteredText_  = this .enteredText_ .getValue () .substr (0, this .enteredText_ .length - 1);
                  }
               }

               break;
            }
            case "Enter":
            {
               this .finalText_ = this .enteredText_;

               this .enteredText_ .set ("");

               if (this .isActive_ .getValue ())
                  this .isActive_ = false;

               break;
            }
            case "Escape":
            {
               this .enteredText_ .set ("");

               if (this .isActive_ .getValue ())
                  this .isActive_ = false;

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
                     if (! this .isActive_ .getValue ())
                     {
                        this .isActive_    = true;
                        this .enteredText_ = "";
                     }

                     this .enteredText_ = this .enteredText_ .getValue () + event .key;
                  }
               }

               break;
            }
         }
      },
   });

   return StringSensor;
});
