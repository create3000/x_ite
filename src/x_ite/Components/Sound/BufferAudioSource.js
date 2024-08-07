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
import X3DSoundSourceNode   from "./X3DSoundSourceNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import FileLoader           from "../../InputOutput/FileLoader.js";
import AudioElement         from "../../Browser/Sound/AudioElement.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function BufferAudioSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);
   X3DUrlObject       .call (this, executionContext);

   this .addType (X3DConstants .BufferAudioSource);
}

Object .assign (Object .setPrototypeOf (BufferAudioSource .prototype, X3DSoundSourceNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);
      X3DUrlObject       .prototype .initialize .call (this);

      this ._numberOfChannels .addInterest ("set_buffer__",       this);
      this ._sampleRate       .addInterest ("set_buffer__",       this);
      this ._bufferLength     .addInterest ("set_buffer__",       this);
      this ._buffer           .addInterest ("set_buffer__",       this);
      this ._detune           .addInterest ("set_detune__",       this);
      this ._playbackRate     .addInterest ("set_playbackRate__", this);
      this ._loopStart        .addInterest ("set_loopStart__",    this);
      this ._loopEnd          .addInterest ("set_loopEnd__",      this);

      this .set_buffer__ ();

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_live__ ()
   {
      X3DSoundSourceNode .prototype .set_live__ .call (this);
      X3DUrlObject       .prototype .set_live__ .call (this);
   },
   set_buffer__ ()
   {
      if (this ._load .getValue ())
         return;

      const
         audioContext     = this .getBrowser () .getAudioContext (),
         numberOfChannels = Algorithm .clamp (this ._numberOfChannels .getValue (), 1, 32),
         sampleRate       = Algorithm .clamp (this ._sampleRate .getValue (), 3000, 768000),
         bufferLength     = Math .max (this ._bufferLength .getValue (), 0);

      if (bufferLength)
      {
         const
            audioBuffer = audioContext .createBuffer (numberOfChannels, bufferLength, sampleRate),
            buffer      = this ._buffer .getValue ();

         this ._bufferDuration = bufferLength / sampleRate;

         if (this ._buffer .length >= bufferLength * numberOfChannels)
         {
            for (let i = 0; i < numberOfChannels; ++ i)
            {
               const channelData = audioBuffer .getChannelData (i);

               channelData .set (buffer .subarray (i * bufferLength, (i + 1) * bufferLength));
            }
         }

         this .setMediaElement (AudioElement .create (audioContext, this .getAudioSource (), audioBuffer));

         this .set_detune__ ();
         this .set_playbackRate__ ();
         this .set_loopStart__ ();
         this .set_loopEnd__ ();
      }
      else
      {
         this ._bufferDuration = 0;

         this .setMediaElement (null);
      }
   },
   set_detune__ ()
   {
      const media = this .getMediaElement ();

      if (media)
         media .detune = this ._detune .getValue ();
   },
   set_playbackRate__ ()
   {
      const media = this .getMediaElement ();

      if (media)
         media .playbackRate = this ._playbackRate .getValue ();
   },
   set_loopStart__ ()
   {
      const media = this .getMediaElement ();

      if (media)
         media .loopStart = Math .max (this ._loopStart .getValue (), 0);
   },
   set_loopEnd__ ()
   {
      const media = this .getMediaElement ();

      if (media)
         media .loopEnd = Math .max (this ._loopEnd .getValue (), 0);
   },
   unloadData ()
   {
      this .set_buffer__ ();
   },
   loadData ()
   {
      this .setMediaElement (null);

      new FileLoader (this) .loadDocument (this ._url, async (data, URL) =>
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .setMediaElement (null);
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else if (data instanceof ArrayBuffer)
         {
            await this .setArrayBuffer (data);

            this .setLoadState (X3DConstants .COMPLETE_STATE);

            if (DEVELOPMENT)
            {
               if (URL .protocol !== "data:")
                  console .info (`Done loading audio '${decodeURI (URL .href)}'.`);
            }
         }
      });
   },
   async setArrayBuffer (arrayBuffer)
   {
      const
         audioContext = this .getBrowser () .getAudioContext (),
         audioBuffer  = await audioContext .decodeAudioData (arrayBuffer),
         bufferData   = new Float32Array (audioBuffer .length * audioBuffer .numberOfChannels);

      for (let i = 0; i < audioBuffer .numberOfChannels; ++ i)
         bufferData .set (audioBuffer .getChannelData (i), i * audioBuffer .length);

      this ._numberOfChannels = audioBuffer .numberOfChannels;
      this ._sampleRate       = audioBuffer .sampleRate;
      this ._bufferLength     = audioBuffer .length;
      this ._buffer           = bufferData;
      this ._bufferDuration   = audioBuffer .duration;

      this .setMediaElement (AudioElement .create (audioContext, this .getAudioSource (), audioBuffer));

      this .set_detune__ ();
      this .set_playbackRate__ ();
      this .set_loopStart__ ();
      this .set_loopEnd__ ();
   },
   dispose ()
   {
      X3DUrlObject       .prototype .dispose .call (this);
      X3DSoundSourceNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (BufferAudioSource, X3DNode .staticProperties ("BufferAudioSource", "Sound", 2, "children", "4.0"));

Object .defineProperties (BufferAudioSource,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                   new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",           new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit",  new Fields .SFTime (3600)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "numberOfChannels",      new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sampleRate",            new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "bufferLength",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "buffer",                new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bufferDuration",        new Fields .SFTime ()),  // skip test

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "detune",                new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "playbackRate",          new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loopStart",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loopEnd",               new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .inputOutput, "loop",                  new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",            new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",             new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",              new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",           new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default BufferAudioSource;
