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

import X3DNode              from "../Core/X3DNode.js";
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DTimeDependentNode from "../Time/X3DTimeDependentNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function X3DSoundSourceNode (executionContext)
{
   X3DSoundNode         .call (this, executionContext);
   X3DTimeDependentNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundSourceNode);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .audioSource  = new GainNode (audioContext, { gain: 0 });
   this .mediaElement = null;
}

Object .assign (Object .setPrototypeOf (X3DSoundSourceNode .prototype, X3DSoundNode .prototype),
   X3DTimeDependentNode .prototype,
{
   initialize ()
   {
      X3DSoundNode         .prototype .initialize .call (this);
      X3DTimeDependentNode .prototype .initialize .call (this);

      this ._gain .addInterest ("set_gain__", this);

      this .set_gain__ ();
   },
   getAudioSource ()
   {
      return this .audioSource;
   },
   getMediaElement ()
   {
      return this .mediaElement;
   },
   setMediaElement (value)
   {
      this .mediaElement ?.pause ();

      this .mediaElement = value;

      if (!value)
         return;

      // Init mediaElement.

      this .set_loop ();

      // Handle events.

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
   },
   set_gain__ ()
   {
      this .audioSource .gain .value = this ._gain .getValue ();
   },
   set_pitch ()
   { },
   set_loop ()
   {
      if (!this .mediaElement)
         return;

      this .mediaElement .loop = this ._loop .getValue ();
   },
   set_start ()
   {
      if (!this .mediaElement)
         return;

      this .mediaElement .currentTime = 0;

      this .getBrowser () .startAudioElement (this .mediaElement);
   },
   set_pause ()
   {
      this .mediaElement ?.pause ();
   },
   set_resume ()
   {
      this .getBrowser () .startAudioElement (this .mediaElement);
   },
   set_stop ()
   {
      this .mediaElement ?.pause ();
   },
   set_end ()
   {
      if (this ._loop .getValue ())
         return;

      this .stop ();
   },
   set_time ()
   {
      if (!this .mediaElement)
         return;

      this ._elapsedTime = this .getElapsedTime ();

      if (this .mediaElement .currentTime < this .mediaElement .duration)
         return;

      this .set_end ();
   },
   dispose ()
   {
      X3DTimeDependentNode .prototype .dispose .call (this);
      X3DSoundNode         .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DSoundSourceNode,
{
   typeName:
   {
      value: "X3DSoundSourceNode",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Sound", level: 1 }),
      enumerable: true,
   },
});

export default X3DSoundSourceNode;
