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
import X3DNetworkSensorNode from "./X3DNetworkSensorNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function LoadSensor (executionContext)
{
   X3DNetworkSensorNode .call (this, executionContext);

   this .addType (X3DConstants .LoadSensor);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .addAlias ("watchList", this ._children);

   // Private properties

   this .urlObjects = [ ];
   this .aborted    = false;
   this .timeOutId  = undefined;
}

Object .assign (Object .setPrototypeOf (LoadSensor .prototype, X3DNetworkSensorNode .prototype),
{
   initialize ()
   {
      X3DNetworkSensorNode .prototype .initialize .call (this);

      this ._enabled  .addInterest ("set_enabled__",  this);
      this ._timeOut  .addInterest ("set_timeOut__",  this);
      this ._children .addInterest ("set_children__", this);

      this .set_children__ ();
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         this .reset ();

      else
      {
         this .abort ();
         this .remove ();
      }
   },
   set_timeOut__ ()
   {
      if (this ._isActive .getValue ())
      {
         this .clearTimeout ();

         this .aborted = false;

         if (this ._timeOut .getValue () > 0)
            this .timeOutId = setTimeout (this .abort .bind (this), this ._timeOut .getValue () * 1000);
      }
   },
   set_children__ ()
   {
      this .reset ();
   },
   set_loadState__ (urlObject)
   {
      switch (urlObject .checkLoadState ())
      {
         case X3DConstants .NOT_STARTED_STATE:
            break;
         case X3DConstants .IN_PROGRESS_STATE:
         case X3DConstants .COMPLETE_STATE:
         case X3DConstants .FAILED_STATE:
         {
            this .count ();
            break;
         }
      }
   },
   count ()
   {
      const urlObjects = this .urlObjects;

      if (urlObjects .length)
      {
         let
            complete = 0,
            failed   = 0;

         for (const urlObject of urlObjects)
         {
            complete += urlObject .checkLoadState () == X3DConstants .COMPLETE_STATE;
            failed   += urlObject .checkLoadState () == X3DConstants .FAILED_STATE;
         }

         const
            loaded   = complete === urlObjects .length,
            progress = complete / urlObjects .length;

         if (this .aborted || failed || loaded)
         {
            this .clearTimeout ();

            this ._isActive = false;
            this ._isLoaded = loaded;
            this ._progress = progress;

            if (loaded)
               this ._loadTime = this .getBrowser () .getCurrentTime ();
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               this ._progress = progress;
            }
            else
            {
               this ._isActive = true;
               this ._progress = progress;

               this .set_timeOut__ ();
            }
         }
      }
      else
      {
         this ._isActive = false;
         this ._isLoaded = false;
         this ._progress = 0;
      }
   },
   abort ()
   {
      this .clearTimeout ();

      this .aborted = true;

      if (this ._enabled .getValue ())
         this .count ();
   },
   reset ()
   {
      this .remove ();

      if (! this ._enabled .getValue ())
         return;

      const urlObjects = this .urlObjects;

      for (const node of this ._children)
      {
         const urlObject = X3DCast (X3DConstants .X3DUrlObject, node);

         if (urlObject)
         {
            urlObjects .push (urlObject);

            urlObject ._loadState .addInterest ("set_loadState__", this, urlObject);
         }
      }

      this .count ();
   },
   remove ()
   {
      this .clearTimeout ();

      const urlObjects = this .urlObjects;

      for (const urlObject of urlObjects)
         urlObject ._loadState .removeInterest ("set_loadState__", this);

      urlObjects .length = 0;
   },
   clearTimeout ()
   {
      clearTimeout (this .timeOutId);

      this .timeOutId = undefined;
   },
});

Object .defineProperties (LoadSensor, X3DNode .staticProperties ("LoadSensor", "Networking", 3, "children", "3.0", "Infinity"));

Object .defineProperties (LoadSensor,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "timeOut",     new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isLoaded",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "progress",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "loadTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default LoadSensor;
