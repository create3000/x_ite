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

import X3DNode      from "../Core/X3DNode.js";
import X3DSoundNode from "./X3DSoundNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DCast      from "../../Base/X3DCast.js";
import Algorithm    from "../../../standard/Math/Algorithm.js";

function X3DSoundDestinationNode (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .X3DSoundDestinationNode);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .childNodes       = [ ];
   this .audioDestination = new GainNode (audioContext, { gain: 0 });
}

Object .assign (Object .setPrototypeOf (X3DSoundDestinationNode .prototype, X3DSoundNode .prototype),
{
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      this .getLive () .addInterest ("set_enabled__", this);

      this ._enabled               .addInterest ("set_enabled__",               this);
      this ._gain                  .addInterest ("set_gain__",                  this);
      this ._channelCount          .addInterest ("set_channelCount__",          this);
      this ._channelCountMode      .addInterest ("set_channelCountMode__",      this);
      this ._channelInterpretation .addInterest ("set_channelInterpretation__", this);
      this ._children              .addInterest ("set_children__",              this);

      this .set_enabled__ ();
      this .set_gain__ ();
      this .set_channelCount__ ();
      this .set_channelCountMode__ ();
      this .set_channelInterpretation__ ();
      this .set_children__ ();
   },
   getAudioDestination ()
   {
      return this .audioDestination;
   },
   set_enabled__ ()
   {
      if (this ._enabled .getValue () && this .getLive () .getValue ())
         this .audioDestination .connect (this .getSoundDestination ());
      else
         this .audioDestination .disconnect ();

      this ._isActive = this ._enabled;
   },
   set_gain__ ()
   {
      this .audioDestination .gain .value = this ._gain .getValue ();
   },
   set_channelCount__ ()
   {
      this .audioDestination .channelCount = Algorithm .clamp (this ._channelCount .getValue (), 1, 32);
   },
   set_channelCountMode__: (() =>
   {
      const channelCountModes = new Map ([
         ["MAX",         "max"],
         ["CLAMPED-MAX", "clamped-max"],
         ["EXPLICIT",    "explicit"],
      ]);

      return function ()
      {
         if (!this ._enabled .getValue ())
            return;

         this .audioDestination .channelCountMode = channelCountModes .get (this ._channelCountMode .getValue ()) ?? "max";
      };
   })(),
   set_channelInterpretation__: (() =>
   {
      const channelInterpretations = new Map ([
         ["SPEAKERS", "speakers"],
         ["DISCRETE", "discrete"],
      ]);

      return function ()
      {
         if (!this ._enabled .getValue ())
            return;

         this .audioDestination .channelInterpretation = channelInterpretations .get (this ._channelInterpretation .getValue ()) ?? "speakers";
      };
   })(),
   set_children__ ()
   {
      for (const childNode of this .childNodes)
         childNode .getAudioSource () .disconnect (this .audioDestination);

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
         childNode .getAudioSource () .connect (this .audioDestination);
   },
});

Object .defineProperties (X3DSoundDestinationNode, X3DNode .getStaticProperties ("X3DSoundDestinationNode", "Sound", 2));

export default X3DSoundDestinationNode;
