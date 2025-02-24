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

import PeriodicWave from "../../Components/Sound/PeriodicWave.js";
import X3DObject    from "../../Base/X3DObject.js";

const
   _audioElements       = Symbol (),
   _audioContext        = Symbol (),
   _defaultPeriodicWave = Symbol ();

function X3DSoundContext ()
{
   this [_audioElements] = new Map ();
}

Object .assign (X3DSoundContext .prototype,
{
   initialize ()
   {
      const id = `X3DSoundContext-${this .getId ()}`;

      const events = [
         "blur",
         "click",
         "contextmenu",
         "dblclick",
         "focus",
         "keydown",
         "keyup",
         "mousedown",
         "mouseup",
         "mousewheel",
         "pointerup",
         "touchend",
         "touchmove",
         "touchstart",
      ]
      .map (event => `${event}.${id}`);

      this .getCanvas () .on (events .join (" "), () => this .startAudioElements ());
   },
   getAudioContext ()
   {
      this [_audioContext] = new AudioContext ();

      this .startAudioElement (this [_audioContext], "resume");

      this .getAudioContext = function () { return this [_audioContext]; };

      Object .defineProperty (this, "getAudioContext", { enumerable: false });

      return this [_audioContext];
   },
   getDefaultPeriodicWave ()
   {
      this [_defaultPeriodicWave] = new PeriodicWave (this .getPrivateScene ());
      this [_defaultPeriodicWave] .setPrivate (true);
      this [_defaultPeriodicWave] .setup ();

      this .getDefaultPeriodicWave = function () { return this [_defaultPeriodicWave]; };

      Object .defineProperty (this, "getDefaultPeriodicWave", { enumerable: false });

      return this [_defaultPeriodicWave];
   },
   startAudioElements ()
   {
      for (const [audioElement, functionName] of this [_audioElements])
      {
         audioElement [functionName] ()
            .then (() => this [_audioElements] .delete (audioElement))
            .catch (Function .prototype);
      }
   },
   startAudioElement (audioElement, functionName = "play")
   {
      if (!audioElement)
         return;

      this [_audioElements] .set (audioElement, functionName);

      this .startAudioElements ();
   },
   stopAudioElement (audioElement, functionName = "pause")
   {
      if (!audioElement)
         return;

      this [_audioElements] .delete (audioElement);

      audioElement [functionName] ();
   },
});

export default X3DSoundContext;
