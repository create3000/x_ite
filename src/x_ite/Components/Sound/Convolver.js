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

function Convolver (executionContext)
{
   X3DSoundProcessingNode .call (this, executionContext);

   this .addType (X3DConstants .Convolver);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .convolverNode = new ConvolverNode (audioContext);

   this .convolverNode .connect (this .getAudioSource ());
}

Object .assign (Object .setPrototypeOf (Convolver .prototype, X3DSoundProcessingNode .prototype),
{
   initialize ()
   {
      X3DSoundProcessingNode .prototype .initialize .call (this);

      this ._numberOfChannels .addInterest ("set_buffer__",    this);
      this ._buffer           .addInterest ("set_buffer__",    this);
      this ._normalize        .addInterest ("set_normalize__", this);

      this .setSoundProcessor (this .convolverNode);

      this .set_buffer__ ();
      this .set_normalize__ ();
   },
   set_buffer__ ()
   {
      const
         audioContext     = this .getBrowser () .getAudioContext (),
         numberOfChannels = Algorithm .clamp (this ._numberOfChannels .getValue (), 1, 32),
         sampleRate       = audioContext .sampleRate,
         bufferLength     = Math .max (Math .floor (this ._buffer .length / numberOfChannels), 1),
         audioBuffer      = audioContext .createBuffer (numberOfChannels, bufferLength, sampleRate),
         buffer           = this ._buffer .getValue ();

      if (this ._buffer .length >= bufferLength * numberOfChannels)
      {
         for (let i = 0; i < numberOfChannels; ++ i)
         {
            const channelData = audioBuffer .getChannelData (i);

            channelData .set (buffer .subarray (i * bufferLength, (i + 1) * bufferLength));
         }
      }

      this .convolverNode .buffer = audioBuffer;
   },
   set_normalize__ ()
   {
      this .convolverNode .normalize = this ._normalize .getValue ();
   },
});

Object .defineProperties (Convolver, X3DNode .getStaticProperties ("Convolver", "Sound", 2, "children", "4.0"));

Object .defineProperties (Convolver,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "numberOfChannels",      new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "buffer",                new Fields .MFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "tailTime",              new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "normalize",             new Fields .SFBool ()),

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

export default Convolver;
