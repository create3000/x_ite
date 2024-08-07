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
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Line3                from "../../../standard/Math/Geometry/Line3.js";
import Sphere3              from "../../../standard/Math/Geometry/Sphere3.js";

function Sound (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .Sound);

   this .addChildObjects (X3DConstants .outputOnly, "traversed", new Fields .SFBool (true));

   this ._location .setUnit ("length");
   this ._minBack  .setUnit ("length");
   this ._minFront .setUnit ("length");
   this ._maxBack  .setUnit ("length");
   this ._maxFront .setUnit ("length");

   this .childNodes       = [ ];
   this .currentTraversed = true;
}

Object .assign (Object .setPrototypeOf (Sound .prototype, X3DSoundNode .prototype),
{
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      const
         audioContext       = this .getBrowser () .getAudioContext (),
         gainNode           = new GainNode (audioContext, { gain: 0 }),
         splitterNode       = new ChannelSplitterNode (audioContext, { numberOfOutputs: 2 }),
         mergerNode         = new ChannelMergerNode (audioContext, { numberOfInputs: 2 }),
         gainFrontLeftNode  = new GainNode (audioContext, { gain: 0 }),
         gainFrontRightNode = new GainNode (audioContext, { gain: 0 }),
         gainBackLeftNode   = new GainNode (audioContext, { gain: 0 }),
         gainBackRightNode  = new GainNode (audioContext, { gain: 0 });

      gainNode .channelCount          = 2;
      gainNode .channelCountMode      = "explicit";
      gainNode .channelInterpretation = "speakers";

      gainNode           .connect (splitterNode);
      splitterNode       .connect (gainFrontLeftNode,  0);
      splitterNode       .connect (gainFrontRightNode, 1);
      splitterNode       .connect (gainBackRightNode, 0);
      splitterNode       .connect (gainBackLeftNode,  1);
      gainFrontLeftNode  .connect (mergerNode, 0, 0);
      gainFrontRightNode .connect (mergerNode, 0, 1);
      gainBackLeftNode   .connect (mergerNode, 0, 0);
      gainBackRightNode  .connect (mergerNode, 0, 1);
      mergerNode         .connect (audioContext .destination);

      this .gainNode           = gainNode;
      this .splitterNode       = splitterNode;
      this .gainFrontLeftNode  = gainFrontLeftNode;
      this .gainFrontRightNode = gainFrontRightNode;
      this .gainBackLeftNode   = gainBackLeftNode;
      this .gainBackRightNode  = gainBackRightNode;
      this .mergerNode         = mergerNode;

      this .getLive () .addInterest ("set_live__", this);
      this ._traversed .addInterest ("set_live__", this);

      this ._intensity .addInterest ("set_intensity__", this);
      this ._source    .addInterest ("set_children__",  this);
      this ._children  .addInterest ("set_children__",  this);

      this .set_live__ ();
      this .set_intensity__ ();
      this .set_children__ ();
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
   setGain (gain, pan = 0.5, rotation = 0)
   {
      const
         panLeft       = 1 - pan ** 2,
         panRight      = 1 - (1 - pan) ** 2,
         rotationFront = 1 - rotation,
         rotationBack  = rotation;

      this .gainFrontLeftNode  .gain .value = gain * rotationFront * panLeft;
      this .gainFrontRightNode .gain .value = gain * rotationFront * panRight;
      this .gainBackLeftNode   .gain .value = gain * rotationBack  * panLeft;
      this .gainBackRightNode  .gain .value = gain * rotationBack  * panRight;
   },
   set_live__ ()
   {
      this .mergerNode .disconnect ();

      if (this .getLive () .getValue () && this ._traversed .getValue ())
      {
         const audioContext = this .getBrowser () .getAudioContext ();

         this .getBrowser () .sensorEvents () .addInterest ("update", this);

         this .mergerNode .connect (audioContext .destination);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);
      }
   },
   set_intensity__ ()
   {
      this .gainNode .gain .value = Algorithm .clamp (this ._intensity .getValue (), 0, 1);
   },
   set_children__ ()
   {
      for (const childNode of this .childNodes)
         childNode .getAudioSource () .disconnect (this .gainNode);

      this .childNodes .length = 0;

      const sourceNode = X3DCast (X3DConstants .X3DSoundSourceNode, this ._source);

      if (sourceNode)
         this .childNodes .push (sourceNode);

      for (const child of this ._children)
      {
         const childNode = X3DCast (X3DConstants .X3DChildNode, child);

         if (!childNode)
            continue;

         const type = childNode .getType ();

         for (let t = type .length - 1; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DSoundChannelNode:
               case X3DConstants .X3DSoundProcessingNode:
               case X3DConstants .X3DSoundSourceNode:
                  this .childNodes .push (childNode);
                  break;
               default:
                  continue;
            }

            break;
         }
      }

      for (const childNode of this .childNodes)
         childNode .getAudioSource () .connect (this .gainNode);
   },
   update ()
   {
      this .setTraversed (false);
   },
   traverse: (() =>
   {
      const
         min = { distance: 0, intersection: new Vector3 () },
         max = { distance: 0, intersection: new Vector3 () };

      return function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         if (!this .childNodes .length)
            return;

         this .setTraversed (true);

         const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

         this .getEllipsoidParameter (modelViewMatrix,
                                      Math .max (this ._maxBack  .getValue (), 0),
                                      Math .max (this ._maxFront .getValue (), 0),
                                      max);

         if (max .distance < 1) // Radius of normalized sphere is 1.
         {
            this .getEllipsoidParameter (modelViewMatrix,
                                         Math .max (this ._minBack  .getValue (), 0),
                                         Math .max (this ._minFront .getValue (), 0),
                                         min);

            const { pan, rotation } = this .getPan (modelViewMatrix);

            if (min .distance < 1) // Radius of normalized sphere is 1.
            {
               this .setGain (1, pan, rotation);
            }
            else
            {
               const
                  d1 = max .intersection .magnitude (), // Viewer is here at (0, 0, 0)
                  d2 = max .intersection .distance (min .intersection),
                  d  = Math .min (d1 / d2, 1);

               this .setGain (d, pan, rotation);
            }
         }
         else
         {
            this .setGain (0);
         }
      };
   })(),
   getEllipsoidParameter: (() =>
   {
      const
         location        = new Vector3 (),
         sphereMatrix    = new Matrix4 (),
         invSphereMatrix = new Matrix4 (),
         rotation        = new Rotation4 (),
         scale           = new Vector3 (1, 1, 1),
         sphere          = new Sphere3 (1, Vector3 .Zero),
         normal          = new Vector3 (),
         line            = new Line3 (Vector3 .Zero, Vector3 .zAxis),
         enterPoint      = new Vector3 (),
         exitPoint       = new Vector3 ();

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
   getPan: (function ()
   {
      const
         rotation  = new Rotation4 (),
         location  = new Vector3 (),
         direction = new Vector3 (),
         xAxis     = new Vector3 (),
         result    = { };

      return function (modelViewMatrix)
      {
         if (!this ._spatialize .getValue ())
         {
            result .pan      = 0.5;
            result .rotation = 0;
            return result;
         }

         location  .assign (this ._location  .getValue ());
         direction .assign (this ._direction .getValue ());
         rotation .setFromToVec (Vector3 .zAxis, direction) .straighten ();
         rotation .multVecRot (xAxis .assign (Vector3 .xAxis));

         modelViewMatrix .multVecMatrix (location) .normalize ();
         modelViewMatrix .multDirMatrix (xAxis)    .normalize ();

         result .pan      = 1 - Math .acos (Algorithm .clamp (location .dot (Vector3 .xAxis), -1, 1)) / Math .PI;
         result .rotation =     Math .acos (Algorithm .clamp (xAxis    .dot (Vector3 .xAxis), -1, 1)) / Math .PI;

         return result;
      };
   })(),
});

Object .defineProperties (Sound, X3DNode .staticProperties ("Sound", "Sound", 1, "children", "2.0", "Infinity"));

Object .defineProperties (Sound,
{
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
