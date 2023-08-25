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
   _audioContext        = Symbol (),
   _defaultPeriodicWave = Symbol ();

function X3DSoundContext ()
{
   this [_audioContext] = new AudioContext ();
}

Object .assign (X3DSoundContext .prototype,
{
   initialize ()
   {
      this .startAudioElement (this [_audioContext], "resume");
   },
   getAudioContext ()
   {
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
   startAudioElement (audioElement, functionName = "play")
   {
      const
         id   = `X3DSoundContext-${X3DObject .getId (audioElement)}`,
         keys = [ ];

      for (const k in this .getElement () [0])
         keys .push (k)

      const events = keys
         .filter (key => key .startsWith ("on"))
         .map (key => key .substring (2))
         .map (event => `${event}.${id}`);

      this .getElement () .on (events .join (" "), event =>
      {
         audioElement [functionName] ()
            .then (() => this .getElement () .off (`.${id}`))
            .catch (() => this .getElement () .off (`${event .type}.${id}`));
      });
   },
});

export default X3DSoundContext;
