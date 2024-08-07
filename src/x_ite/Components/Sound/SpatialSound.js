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

function SpatialSound (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .SpatialSound);

   this .addChildObjects (X3DConstants .outputOnly, "traversed", new Fields .SFBool (true));

   this ._location       .setUnit ("length");
   this ._coneInnerAngle .setUnit ("angle");
   this ._coneOuterAngle .setUnit ("angle");

   this .childNodes       = [ ];
   this .currentTraversed = true;
}

Object .assign (Object .setPrototypeOf (SpatialSound .prototype, X3DSoundNode .prototype),
{
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      const
         audioContext = this .getBrowser () .getAudioContext (),
         gainNode     = new GainNode (audioContext, { gain: 0 }),
         pannerNode   = new PannerNode (audioContext);

      gainNode .channelCount          = 2;
      gainNode .channelCountMode      = "explicit";
      gainNode .channelInterpretation = "speakers";

      gainNode   .connect (pannerNode);
      pannerNode .connect (audioContext .destination);

      this .gainNode   = gainNode;
      this .pannerNode = pannerNode;

      this .getLive () .addInterest ("set_live__", this);
      this ._traversed .addInterest ("set_live__", this);

      this ._spatialize        .addInterest ("set_spatialize__",        this);
      this ._intensity         .addInterest ("set_intensity__",         this);
      this ._gain              .addInterest ("set_intensity__",         this);
      this ._enableHRTF        .addInterest ("set_enableHRTF__",        this);
      this ._dopplerEnabled    .addInterest ("set_dopplerEnabled__",    this);
      this ._coneOuterGain     .addInterest ("set_coneOuterGain__",     this);
      this ._coneInnerAngle    .addInterest ("set_coneInnerAngle__",    this);
      this ._coneOuterAngle    .addInterest ("set_coneOuterAngle__",    this);
      this ._distanceModel     .addInterest ("set_distanceModel__",     this);
      this ._maxDistance       .addInterest ("set_maxDistance__",       this);
      this ._referenceDistance .addInterest ("set_referenceDistance__", this);
      this ._rolloffFactor     .addInterest ("set_distanceModel__",     this);
      this ._children          .addInterest ("set_children__",          this);

      this .set_live__ ();
      this .set_spatialize__ ();
      this .set_intensity__ ();
      this .set_coneOuterGain__ ();
      this .set_coneInnerAngle__ ();
      this .set_coneOuterAngle__ ();
      this .set_distanceModel__ ();
      this .set_maxDistance__ ();
      this .set_referenceDistance__ ();
      this .set_enableHRTF__ ();
      this .set_dopplerEnabled__ ();
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
   set_live__ ()
   {
      this .pannerNode .disconnect ();

      if (this .getLive () .getValue () && this ._traversed .getValue ())
      {
         const audioContext = this .getBrowser () .getAudioContext ();

         this .getBrowser () .sensorEvents () .addInterest ("update", this);

         this .pannerNode .connect (audioContext .destination);
      }
      else
      {
         this .getBrowser () .sensorEvents () .removeInterest ("update", this);
      }
   },
   set_spatialize__ ()
   {
      const audioContext = this .getBrowser () .getAudioContext ();

      this .gainNode .disconnect ();

      if (this ._spatialize .getValue ())
         this .gainNode .connect (this .pannerNode);
      else
         this .gainNode .connect (audioContext .destination);
   },
   set_intensity__ ()
   {
      this .gainNode .gain .value = Algorithm .clamp (this ._intensity .getValue (), 0, 1) * this ._gain .getValue ();
   },
   set_coneOuterGain__ ()
   {
      this .pannerNode .coneOuterGain = Algorithm .clamp (this ._coneOuterGain .getValue (), 0, 1);
   },
   set_coneInnerAngle__ ()
   {
      this .pannerNode .coneInnerAngle = Algorithm .clamp (Algorithm .degrees (this ._coneInnerAngle .getValue ()), 0, 360);
   },
   set_coneOuterAngle__ ()
   {
      this .pannerNode .coneOuterAngle = Algorithm .clamp (Algorithm .degrees (this ._coneOuterAngle .getValue ()), 0, 360);
   },
   set_distanceModel__: (function ()
   {
      const distanceModels = new Map ([
         ["LINEAR",      "linear"],
         ["INVERSE",     "inverse"],
         ["EXPONENTIAL", "exponential"],
      ]);

      return function ()
      {
         this .pannerNode .distanceModel = distanceModels .get (this ._distanceModel .getValue ()) ?? "inverse";

         let rolloffFactor = Math .max (this ._rolloffFactor .getValue (), 0);

         if (this .pannerNode .distanceModel === "linear")
            rolloffFactor = Math .min (rolloffFactor, 1);

         this .pannerNode .rolloffFactor = rolloffFactor;
      };
   })(),
   set_maxDistance__ ()
   {
      this .pannerNode .maxDistance = Math .max (this ._maxDistance .getValue (), 0);
   },
   set_referenceDistance__ ()
   {
      this .pannerNode .refDistance = Math .max (this ._referenceDistance .getValue (), 0);
   },
   set_enableHRTF__ ()
   {
      if (this ._enableHRTF .getValue ())
         this .pannerNode .panningModel = "HRTF";
      else
         this .pannerNode .panningModel = "equalpower";
   },
   set_dopplerEnabled__ ()
   {
      // Depreciated: https://github.com/WebAudio/web-audio-api/issues/372.
   },
   set_children__ ()
   {
      for (const childNode of this .childNodes)
         childNode .getAudioSource () .disconnect (this .gainNode);

      this .childNodes .length = 0;

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
         location  = new Vector3 (),
         direction = new Vector3 ();

      return function (type, renderObject)
      {
         if (type !== TraverseType .DISPLAY)
            return;

         this .setTraversed (true);

         const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

         modelViewMatrix .multVecMatrix (location  .assign (this ._location  .getValue ()));
         modelViewMatrix .multDirMatrix (direction .assign (this ._direction .getValue ())) .normalize ();

         this .pannerNode .positionX .value = location .x;
         this .pannerNode .positionY .value = location .y;
         this .pannerNode .positionZ .value = location .z;

         this .pannerNode .orientationX .value = direction .x;
         this .pannerNode .orientationY .value = direction .y;
         this .pannerNode .orientationZ .value = direction .z;
      };
   })(),
});

Object .defineProperties (SpatialSound, X3DNode .staticProperties ("SpatialSound", "Sound", 2, "children", "4.0"));

Object .defineProperties (SpatialSound,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .initializeOnly, "spatialize",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",         new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",          new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",         new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gain",              new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coneOuterGain",     new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coneInnerAngle",    new Fields .SFFloat (6.2832)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coneOuterAngle",    new Fields .SFFloat (6.2832)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "distanceModel",     new Fields .SFString ("INVERSE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxDistance",       new Fields .SFFloat (10000)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "referenceDistance", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rolloffFactor",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enableHRTF",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dopplerEnabled",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "priority",          new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default SpatialSound;
