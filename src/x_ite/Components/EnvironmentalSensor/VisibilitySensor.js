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

import Fields                     from "../../Fields.js";
import X3DFieldDefinition         from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray       from "../../Base/FieldDefinitionArray.js";
import X3DNode                    from "../Core/X3DNode.js";
import X3DEnvironmentalSensorNode from "./X3DEnvironmentalSensorNode.js";
import TraverseType               from "../../Rendering/TraverseType.js";
import X3DConstants               from "../../Base/X3DConstants.js";
import Vector3                    from "../../../standard/Math/Numbers/Vector3.js";
import Box3                       from "../../../standard/Math/Geometry/Box3.js";

function VisibilitySensor (executionContext)
{
   X3DEnvironmentalSensorNode .call (this, executionContext);

   this .addType (X3DConstants .VisibilitySensor);

   this .setVisibleObject (true);
   this .setZeroTest (false);

   this .visible = false;
}

Object .assign (Object .setPrototypeOf (VisibilitySensor .prototype, X3DEnvironmentalSensorNode .prototype),
{
   initialize ()
   {
      X3DEnvironmentalSensorNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_enabled__", this);

      this .set_enabled__ ();
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue ())
         delete this .traverse;
      else
         this .traverse = Function .prototype;
   },
   update ()
   {
      if (this .visible && this .getTraversed ())
      {
         if (!this ._isActive .getValue ())
         {
            this ._isActive  = true;
            this ._enterTime = this .getBrowser () .getCurrentTime ();
         }

         this .visible = false;
      }
      else
      {
         if (this ._isActive .getValue ())
         {
            this ._isActive = false;
            this ._exitTime = this .getBrowser () .getCurrentTime ();
         }
      }

      this .setTraversed (false);
   },
   traverse: (() =>
   {
      const
         bbox     = new Box3 (),
         infinity = new Vector3 (-1, -1, -1);

      return function (type, renderObject)
      {
         this .setTraversed (true);

         if (this .visible)
            return;

         if (this ._size .getValue () .equals (infinity))
         {
            this .visible = true;
         }
         else
         {
            bbox
               .set (this ._size .getValue (), this ._center .getValue ())
               .multRight (renderObject .getModelViewMatrix () .get ());

            this .visible = renderObject .getViewVolume () .intersectsBox (bbox);
         }
      };
   })(),
});

Object .defineProperties (VisibilitySensor,
{
   ... X3DNode .getStaticProperties ("VisibilitySensor", "EnvironmentalSensor", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "enterTime",   new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "exitTime",    new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",    new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default VisibilitySensor;
