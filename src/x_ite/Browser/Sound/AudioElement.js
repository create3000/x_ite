
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

export default
{
   create (audioContext, audioSource, audioBuffer)
   {
      let
         audioBufferSource = new AudioBufferSourceNode (audioContext),
         duration          = audioBuffer ?.duration ?? 0,
         detune            = 0,
         playbackRate      = 1,
         loopStart         = 0,
         loopEnd           = 0,
         loop              = false,
         startTime         = 0,
         currentTime       = 0,
         active            = false;

      return Object .defineProperties ({ },
      {
         detune:
         {
            get ()
            {
               return detune;
            },
            set (value)
            {
               detune                           = value;
               audioBufferSource .detune .value = value;
            },
         },
         playbackRate:
         {
            get ()
            {
               return playbackRate;
            },
            set (value)
            {
               playbackRate                           = value;
               audioBufferSource .playbackRate .value = value;
            },
         },
         loopStart:
         {
            get ()
            {
               return loopStart;
            },
            set (value)
            {
               loopStart                    = value;
               audioBufferSource .loopStart = value;
            },
         },
         loopEnd:
         {
            get ()
            {
               return loopEnd;
            },
            set (value)
            {
               loopEnd                    = value;
               audioBufferSource .loopEnd = value;
            },
         },
         loop:
         {
            get ()
            {
               return loop;
            },
            set (value)
            {
               loop                    = value;
               audioBufferSource .loop = value;
            },
         },
         currentTime:
         {
            get ()
            {
               if (active)
               {
                  if (this .duration)
                  {
                     if (this .loop)
                        return (audioContext .currentTime - startTime) % this .duration;

                     return audioContext .currentTime - startTime;
                  }

                  return 0;
               }

               return currentTime;
            },
            set (value)
            {
               currentTime = value;
               startTime   = audioContext .currentTime - currentTime;

               if (!active)
                  return;

               this .pause ();
               this .play ();
            },
         },
         duration:
         {
            get ()
            {
               return duration;
            },
         },
         play:
         {
            value ()
            {
               if (active)
                  return Promise .resolve ();

               audioBufferSource = new AudioBufferSourceNode (audioContext);

               audioBufferSource .buffer              = audioBuffer;
               audioBufferSource .loopStart           = loopStart;
               audioBufferSource .loopEnd             = loopEnd;
               audioBufferSource .loop                = loop;
               audioBufferSource .playbackRate .value = playbackRate;

               audioBufferSource .connect (audioSource);
               audioBufferSource .start (0, currentTime);

               startTime = audioContext .currentTime - currentTime;
               active    = true;

               return Promise .resolve ();
            },
         },
         pause:
         {
            value ()
            {
               if (!active)
                  return;

               audioBufferSource .stop ();
               audioBufferSource .disconnect ();

               currentTime = this .currentTime;
               active      = false;

               // Create 1s silence to clear channels.

               const silence = new AudioBufferSourceNode (audioContext);

               silence .connect (audioSource);
               silence .start ();
               silence .stop (audioContext .currentTime + 1);
            },
         },
      });
   },
};
