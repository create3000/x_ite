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
import X3DSoundSourceNode   from "./X3DSoundSourceNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function ListenerPointSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);

   this .addType (X3DConstants .ListenerPointSource);

   this .addChildObjects (X3DConstants .inputOutput, "loop",      new Fields .SFBool (),
                          X3DConstants .outputOnly,  "traversed", new Fields .SFBool (true));

   this ._position .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ListenerPointSource .prototype, X3DSoundSourceNode .prototype),
{
   traverse: (() =>
   {
      const
         position        = new Vector3 (0, 0, 0),
         orientation     = new Rotation4 (),
         modelViewMatrix = new Matrix4 (),
         forwardVector   = new Vector3 (0, 0, 0),
         upVector        = new Vector3 (0, 0, 0);

      return function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         const
            audioContext = this .getBrowser () .getAudioContext (),
            listener     = audioContext .listener;

         if (this ._trackCurrentView .getValue ())
         {
            listener .positionX .value = 0;
            listener .positionY .value = 0;
            listener .positionZ .value = 0;

            listener .forwardX .value = 0;
            listener .forwardY .value = 0;
            listener .forwardZ .value = -1;

            listener .upX .value = 0;
            listener .upY .value = 1;
            listener .upZ .value = 0;
         }
         else
         {
            modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());
            modelViewMatrix .multVecMatrix (position  .assign (this ._position .getValue ()));
            modelViewMatrix .rotate (this ._orientation .getValue ()) .get (null, orientation);

            orientation .mulVecRot (forwardVector .assign (Vector3 .zAxis)) .negate ();
            orientation .mulVecRot (upVector .assign (Vector3 .yAxis));

            listener .positionX .value = position .x;
            listener .positionY .value = position .y;
            listener .positionZ .value = position .z;

            listener .forwardX .value = forwardVector .x;
            listener .forwardY .value = forwardVector .y;
            listener .forwardZ .value = forwardVector .z;

            listener .upX .value = upVector .x;
            listener .upY .value = upVector .y;
            listener .upZ .value = upVector .z;
         }
      };
   })(),
});

Object .defineProperties (ListenerPointSource,
{
   typeName:
   {
      value: "ListenerPointSource",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Sound", level: 2 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "4.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "position",             new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",          new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "trackCurrentView",     new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "interauralDistance",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "dopplerEnabled",       new Fields .SFBool ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",            new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",           new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",            new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",          new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default ListenerPointSource;
