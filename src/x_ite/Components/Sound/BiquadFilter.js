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
import X3DSoundProcessingNode from "./X3DSoundProcessingNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function BiquadFilter (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .BiquadFilter);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .biquadFilterNode = new BiquadFilterNode (audioContext);

   this .biquadFilterNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (BiquadFilter .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._detune        .addInterest ("set_detune__",        this);
      this ._type          .addInterest ("set_type__",          this);
      this ._frequency     .addInterest ("set_frequency__",     this);
      this ._qualityFactor .addInterest ("set_qualityFactor__", this);

      this .setSoundProcessor (this .biquadFilterNode);

      this .set_detune__ ();
      this .set_type__ ();
      this .set_frequency__ ();
      this .set_qualityFactor__ ();
   },
   set_detune__ ()
   {
      this .biquadFilterNode .detune .value = this ._detune .getValue ();
   },
   set_type__: (function ()
   {
      const types = new Map ([
         ["LOWPASS",   "lowpass"],
         ["HIGHPASS",  "highpass"],
         ["BANDPASS",  "bandpass"],
         ["LOWSHELF",  "lowshelf"],
         ["HIGHSHELF", "highshelf"],
         ["PEAKING",   "peaking"],
         ["NOTCH",     "notch"],
         ["ALLPASS",   "allpass"],
      ]);

      return function ()
      {
         this .biquadFilterNode .type = types .get (this ._type .getValue ()) ?? "lowpass";
      };
   })(),
   set_frequency__ ()
   {
      this .biquadFilterNode .frequency .value = Math .max (this ._frequency .getValue (), 0);
   },
   set_qualityFactor__ ()
   {
      this .biquadFilterNode .Q .value = Algorithm .clamp (this ._qualityFactor .getValue (), 0.0001, 1000);
   },
});

Object .defineProperties (BiquadFilter,
{
   ... X3DNode .getStaticProperties ("BiquadFilter", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "detune",                new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",                  new Fields .SFString ("LOWPASS")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "frequency",             new Fields .SFFloat (350)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "qualityFactor",         new Fields .SFFloat (1)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",            new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",              new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",           new Fields .SFTime ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default BiquadFilter;
