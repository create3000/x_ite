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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DNode                 from "../Core/X3DNode.js";
import X3DSoundDestinationNode from "./X3DSoundDestinationNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function AudioDestination (executionContext)
{
   X3DSoundDestinationNode .call (this, executionContext);

   this .addType (X3DConstants .AudioDestination);

   this .audioElement = new Audio ();
}

Object .assign (Object .setPrototypeOf (AudioDestination .prototype, X3DSoundDestinationNode .prototype),
{
   initialize ()
   {
      X3DSoundDestinationNode .prototype .initialize .call (this);

      const audioContext = this .getBrowser () .getAudioContext ();

      this ._mediaDeviceID .addInterest ("set_mediaDeviceID__", this);

      this ._maxChannelCount = audioContext .destination .maxChannelCount;

      this .set_mediaDeviceID__ ();
   },
   getSoundDestination ()
   {
      return this .mediaStreamAudioDestinationNode;
   },
   set_enabled__ ()
   {
      const active = this ._enabled .getValue () && this .getLive () .getValue ();

      if (!!this .mediaStreamAudioDestinationNode === active)
         return;

      if (active)
      {
         const audioContext = this .getBrowser () .getAudioContext ();

         this .mediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode (audioContext);
         this .audioElement .srcObject         = this .mediaStreamAudioDestinationNode .stream;

         this .getBrowser () .startAudioElement (this .audioElement);
      }
      else
      {
         this .audioElement .pause ();

         for (const track of this .mediaStreamAudioDestinationNode .stream .getAudioTracks ())
            track .stop ();

         for (const track of this .mediaStreamAudioDestinationNode .stream .getVideoTracks ())
            track .stop ();

         this .mediaStreamAudioDestinationNode = null;
      }

      X3DSoundDestinationNode .prototype .set_enabled__ .call (this);
   },
   set_mediaDeviceID__ ()
   {
      // Safari has no support for `setSinkId` yet, as of Aug 2023.

      this .audioElement .setSinkId ?.(this ._mediaDeviceID .getValue ()) .catch (error =>
      {
         console .error (error .message);

         this .audioElement .setSinkId ("default") .catch (Function .prototype);
      });
   },
});

Object .defineProperties (AudioDestination, X3DNode .getStaticProperties ("AudioDestination", "Sound", 2, "children", "4.0"));

Object .defineProperties (AudioDestination,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",              new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",           new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",               new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mediaDeviceID",         new Fields .SFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCount",          new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("SPEAKERS")),

         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "maxChannelCount",       new Fields .SFInt32 ()), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",              new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default AudioDestination;
