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

import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DTimeDependentNode from "../Time/X3DTimeDependentNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function X3DSoundSourceNode (executionContext)
{
   X3DChildNode         .call (this, executionContext);
   X3DTimeDependentNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundSourceNode);

   this .volume = 0;
   this .media  = null;
}

Object .assign (Object .setPrototypeOf (X3DSoundSourceNode .prototype, X3DChildNode .prototype),
   X3DTimeDependentNode .prototype,
{
   initialize ()
   {
      X3DChildNode         .prototype .initialize .call (this);
      X3DTimeDependentNode .prototype .initialize .call (this);
   },
   setMedia (value)
   {
      if (this .media)
      {
         this .media .muted = true;
         this .media .pause ();
      }

      this .media = value;

      if (value)
      {
         // Create audio context.

         const
            audioContext = new AudioContext (),
            source       = audioContext .createMediaElementSource (value),
            stereoNode   = new StereoPannerNode (audioContext, { pan: 0 }),
            gainNode     = new GainNode (audioContext, { gain: 0 });

         source .connect (gainNode) .connect (stereoNode) .connect (audioContext .destination);

         this .gainNode   = gainNode;
         this .stereoNode = stereoNode;

         // Init media.

         this .media .muted  = true;
         this .media .volume = 0;
         this .media .loop   = this ._loop .getValue ();

         // Handle events.

         this .setVolume (0);
         this ._duration_changed = this .media .duration;

         this .resetElapsedTime ();

         if (this ._isActive .getValue ())
         {
            if (this ._isPaused .getValue ())
            {
               this .set_pause ();
            }
            else
            {
               if (this .getLiveState ())
                  this .set_start ();
               else
                  this .set_pause ();
            }
         }
         else
         {
            this .set_stop ();
         }
      }
   },
   setVolume (volume, pan = 0.5)
   {
      if (!this .media)
         return;

      const
         mute      = this .getBrowser () ._mute .getValue (),
         intensity = Algorithm .clamp (this .getBrowser () ._volume .getValue (), 0, 1);

      volume = (!mute) * intensity * volume;

      this .media .muted           = volume === 0;
      this .gainNode .gain .value  = volume;
      this .stereoNode .pan .value = pan;
   },
   set_loop ()
   {
      if (this .media)
         this .media .loop = this ._loop .getValue ();
   },
   set_speed ()
   { },
   set_pitch ()
   { },
   set_start ()
   {
      if (this .media)
      {
         if (this ._speed .getValue ())
         {
            this .media .currentTime = 0;
            this .media .play () .catch (Function .prototype);
         }
      }
   },
   set_pause ()
   {
      if (this .media)
         this .media .pause ();
   },
   set_resume ()
   {
      if (this .media)
      {
         if (this ._speed .getValue ())
            this .media .play () .catch (Function .prototype);
      }
   },
   set_stop ()
   {
      if (this .media)
         this .media .pause ();
   },
   set_end ()
   {
      if (this ._loop .getValue ())
         return;

      this .stop ();
   },
   set_time ()
   {
      if (!this .media)
         return;

      this ._elapsedTime = this .getElapsedTime ();

      if (this .media .currentTime < this .media .duration)
         return;

      this .set_end ();
   },
   dispose ()
   {
      X3DTimeDependentNode .prototype .dispose .call (this);
      X3DChildNode         .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DSoundSourceNode,
{
   typeName:
   {
      value: "X3DSoundSourceNode",
      enumerable: true,
   },
   componentName:
   {
      value: "Sound",
      enumerable: true,
   },
});

export default X3DSoundSourceNode;
