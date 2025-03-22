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
import AudioElement         from "../../Browser/Sound/AudioElement.js";
import FileLoader           from "../../InputOutput/FileLoader.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function AudioClip (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);
   X3DUrlObject       .call (this, executionContext);

   this .addType (X3DConstants .AudioClip);
}

Object .assign (Object .setPrototypeOf (AudioClip .prototype, X3DSoundSourceNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);
      X3DUrlObject       .prototype .initialize .call (this);

      this ._pitch .addInterest ("set_pitch__", this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_live__ ()
   {
      X3DSoundSourceNode .prototype .set_live__ .call (this);
      X3DUrlObject       .prototype .set_live__ .call (this);
   },
   set_pitch__ ()
   {
      const media = this .getMediaElement ();

      if (media)
         media .playbackRate = Math .max (this ._pitch .getValue (), 0);
   },
   unloadData ()
   {
      this .setMediaElement (null);
   },
   loadData ()
   {
      this .unloadData ();

      new FileLoader (this) .loadDocument (this ._url, async (data, URL) =>
      {
         if (data === null)
         {
            this .unloadData ();
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else if (data instanceof ArrayBuffer)
         {
            await this .setArrayBuffer (data);

            this .setLoadState (X3DConstants .COMPLETE_STATE);

            if (DEVELOPMENT)
            {
               if (URL .protocol !== "data:")
                  console .info (`Done loading audio '${decodeURI (URL)}'.`);
            }
         }
      });
   },
   async setArrayBuffer (arrayBuffer)
   {
      const
         audioContext = this .getBrowser () .getAudioContext (),
         audioBuffer  = await audioContext .decodeAudioData (arrayBuffer),
         media        = AudioElement .create (audioContext, this .getAudioSource (), audioBuffer);

      this ._duration_changed = media .duration;

      this .setMediaElement (media);

      this .set_pitch__ ();
   },
   dispose ()
   {
      X3DUrlObject       .prototype .dispose .call (this);
      X3DSoundSourceNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (AudioClip,
{
   ... X3DNode .getStaticProperties ("AudioClip", "Sound", 1, "source", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pitch",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "loop",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",           new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "duration_changed",     new Fields .SFTime (-1)),
      ]),
      enumerable: true,
   },
});

export default AudioClip;
