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
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Line3                from "../../../standard/Math/Geometry/Line3.js";
import Sphere3              from "../../../standard/Math/Geometry/Sphere3.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function Sound (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .Sound);

   this .addChildObjects ("traversed", new Fields .SFBool (true));

   this ._location .setUnit ("length");
   this ._minBack  .setUnit ("length");
   this ._minFront .setUnit ("length");
   this ._maxBack  .setUnit ("length");
   this ._maxFront .setUnit ("length");

   this .currentTraversed = true;
}

Object .assign (Object .setPrototypeOf (Sound .prototype, X3DSoundNode .prototype),
{
   constructor: Sound,
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      this .getLive ()  .addInterest ("set_live__", this);
      this ._traversed .addInterest ("set_live__", this);

      this ._source .addInterest ("set_source__", this);

      this .set_live__ ();
      this .set_source__ ();
   },
   setTraversed (value)
   {
      if (value)
      {
         if (this ._traversed .getValue () === false)
            this ._traversed = true;
      }
      else
      {
         if (this .currentTraversed !== this ._traversed .getValue ())
            this ._traversed = this .currentTraversed;
      }

      this .currentTraversed = value;
   },
   getTraversed ()
   {
      return this .currentTraversed;
   },
   set_live__ ()
   {
      if (this .getLive () .getValue () && this ._traversed .getValue ())
      {
         this .getBrowser () .sensorEvents () .addInterest ("update", this);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);
      }
   },
   set_source__ ()
   {
      if (this .sourceNode)
         this .sourceNode .setVolume (0);

      this .sourceNode = X3DCast (X3DConstants .X3DSoundSourceNode, this ._source);
   },
   update ()
   {
      if (! this .getTraversed ())
      {
         if (this .sourceNode)
            this .sourceNode .setVolume (0);
      }

      this .setTraversed (false);
   },
   traverse: (function ()
   {
      const
         min = { distance: 0, intersection: new Vector3 (0, 0, 0) },
         max = { distance: 0, intersection: new Vector3 (0, 0, 0) };

      return function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         if (! this .sourceNode)
            return;

         if (! this .sourceNode ._isActive .getValue () || this .sourceNode ._isPaused .getValue ())
            return;

         this .setTraversed (true);

         const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

         this .getEllipsoidParameter (modelViewMatrix,
                                       Math .max (this ._maxBack  .getValue (), 0),
                                       Math .max (this ._maxFront .getValue (), 0),
                                       max);

         if (max .distance < 1) // Sphere radius is 1
         {
            this .getEllipsoidParameter (modelViewMatrix,
                                          Math .max (this ._minBack  .getValue (), 0),
                                          Math .max (this ._minFront .getValue (), 0),
                                          min);

            if (min .distance < 1) // Sphere radius is 1
            {
               this .sourceNode .setVolume (this ._intensity .getValue ());
            }
            else
            {
               const
                  d1        = max .intersection .magnitude (), // Viewer is here at (0, 0, 0)
                  d2        = max .intersection .distance (min .intersection),
                  d         = Math .min (d1 / d2, 1),
                  intensity = Algorithm .clamp (this ._intensity .getValue (), 0, 1),
                  volume    = intensity * d;

               this .sourceNode .setVolume (volume);
            }
         }
         else
         {
            this .sourceNode .setVolume (0);
         }
      };
   })(),
   getEllipsoidParameter: (function ()
   {
      const
         location        = new Vector3 (0, 0, 0),
         sphereMatrix    = new Matrix4 (),
         invSphereMatrix = new Matrix4 (),
         rotation        = new Rotation4 (),
         scale           = new Vector3 (1, 1, 1),
         sphere          = new Sphere3 (1, Vector3 .Zero),
         normal          = new Vector3 (0, 0, 0),
         line            = new Line3 (Vector3 .Zero, Vector3 .zAxis),
         enterPoint      = new Vector3 (0, 0, 0),
         exitPoint       = new Vector3 (0, 0, 0);

      return function (modelViewMatrix, back, front, value)
      {
         /*
          * https://de.wikipedia.org/wiki/Ellipse
          *
          * The ellipsoid is transformed to a sphere for easier calculation and then the viewer position is
          * transformed into this coordinate system. The radius and distance can then be obtained.
          *
          * throws Error
          */

         if (back == 0 || front == 0)
         {
            sphereMatrix .multVecMatrix (value .intersection .assign (this ._location .getValue ()));
            value .distance = 1;
            return;
         }

         const
            a = (back + front) / 2,
            e = a - back,
            b = Math .sqrt (a * a - e * e);

         location .set (0, 0, e);
         scale    .set (b, b, a);
         rotation .setFromToVec (Vector3 .zAxis, this ._direction .getValue ());

         sphereMatrix
            .assign (modelViewMatrix)
            .translate (this ._location .getValue ())
            .rotate (rotation)
            .translate (location)
            .scale (scale);

         invSphereMatrix .assign (sphereMatrix) .inverse ();

         const viewer = invSphereMatrix .origin;
         location .negate () .divVec (scale);

         normal .assign (location) .subtract (viewer) .normalize ();
         line .set (viewer, normal);
         sphere .intersectsLine (line, enterPoint, exitPoint);

         value .intersection .assign (sphereMatrix .multVecMatrix (enterPoint));
         value .distance = viewer .magnitude ();
      };
   })(),
});

Object .defineProperties (Sound,
{
   typeName:
   {
      value: "Sound",
      enumerable: true,
   },
   componentName:
   {
      value: "Sound",
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "spatialize",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",   new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",   new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "minBack",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "minFront",    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxBack",     new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxFront",    new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "priority",    new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "source",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",    new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Sound;
