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
import X3DConstants         from "../../Base/X3DConstants.js";

function MicrophoneSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);

   this .addType (X3DConstants .MicrophoneSource);

   this .addChildObjects (X3DConstants .inputOutput, "loop", new Fields .SFBool ());
}

Object .assign (Object .setPrototypeOf (MicrophoneSource .prototype, X3DSoundSourceNode .prototype),
{
   initialize ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);

      this ._mediaDeviceID .addInterest ("set_mediaDeviceID__", this);
   },
   set_mediaDeviceID__ ()
   {
      this .set_stop ();

      if (this ._isActive .getValue ())
         this .set_start ();
   },
   set_start ()
   {
      if (!navigator .mediaDevices)
         return;

      this .restore = false;

      navigator .mediaDevices .getUserMedia ({
         audio:
         {
            deviceId: this ._mediaDeviceID .getValue (),
         },
      })
      .then (mediaStream =>
      {
         const audioContext = this .getBrowser () .getAudioContext ();

         this .mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode (audioContext, { mediaStream });

         if (this ._isActive .getValue ())
         {
            if (this ._isPaused .getValue () || !this .getLive () .getValue ())
               this .set_pause ();
            else
               this .set_resume ();
         }
         else
         {
            this .set_stop ();
         }
      })
      .catch (error =>
      {
         console .error (error .message);
      });
   },
   set_pause ()
   {
      if (!this .mediaStreamAudioSourceNode)
         return;

      if (this .getLive () .getValue ())
      {
         this .mediaStreamAudioSourceNode .disconnect ();

         for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
            track .enabled = false;

         for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
            track .enabled = false;
      }
      else
      {
         this .set_stop (true);
      }
   },
   set_resume ()
   {
      if (this .restore)
         return this .set_start ();

      if (!this .mediaStreamAudioSourceNode)
         return;

      this .mediaStreamAudioSourceNode .connect (this .getAudioSource ());

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
         track .enabled = true;

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
         track .enabled = true;
   },
   set_stop (restore = false)
   {
      if (!this .mediaStreamAudioSourceNode)
         return;

      this .mediaStreamAudioSourceNode .disconnect ();

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getAudioTracks ())
         track .stop ();

      for (const track of this .mediaStreamAudioSourceNode .mediaStream .getVideoTracks ())
         track .stop ();

      this .mediaStreamAudioSourceNode = null;
      this .restore                    = restore;
   },
});

Object .defineProperties (MicrophoneSource,
{
   ... X3DNode .getStaticProperties ("MicrophoneSource", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",          new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mediaDeviceID", new Fields .SFString ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",     new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",    new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",     new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",      new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",   new Fields .SFTime ()),
      ]),
      enumerable: true,
   },
});

export default MicrophoneSource;
