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
import X3DSoundSourceNode   from "./X3DSoundSourceNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function BufferAudioSource (executionContext)
{
   X3DSoundSourceNode .call (this, executionContext);
   X3DUrlObject       .call (this, executionContext);

   this .addType (X3DConstants .BufferAudioSource);

   this .addChildObjects ("speed", new Fields .SFFloat (1));
}

BufferAudioSource .prototype = Object .assign (Object .create (X3DSoundSourceNode .prototype),
   X3DUrlObject .prototype,
{
   constructor: BufferAudioSource,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),

      new X3DFieldDefinition (X3DConstants .inputOutput, "load",                 new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "url",                  new Fields .MFString ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefresh",          new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "autoRefreshTimeLimit", new Fields .SFTime (3600)),

      new X3DFieldDefinition (X3DConstants .inputOutput, "gain",                 new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "buffer",               new Fields .MFFloat ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "detune",               new Fields .SFFloat (0)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "bufferDuration",       new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "loopStart",            new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "loopEnd",              new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "numberOfChannels",     new Fields .SFInt32 ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "playbackRate",         new Fields .SFFloat (1)),
      new X3DFieldDefinition (X3DConstants .inputOutput, "sampleRate",           new Fields .SFFloat (0)),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "bufferLength",         new Fields .SFInt32 ()),

      new X3DFieldDefinition (X3DConstants .outputOnly,  "channelCount",          new Fields .SFInt32 ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "channelCountMode",      new Fields .SFString ("max")),
      new X3DFieldDefinition (X3DConstants .inputOutput, "channelInterpretation", new Fields .SFString ("speakers")),

      new X3DFieldDefinition (X3DConstants .inputOutput, "loop",                 new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "startTime",            new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "resumeTime",           new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "pauseTime",            new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .inputOutput, "stopTime",             new Fields .SFTime ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "isPaused",             new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "isActive",             new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .outputOnly,  "elapsedTime",          new Fields .SFTime ()),
   ]),
   getTypeName: function ()
   {
      return "BufferAudioSource";
   },
   getComponentName: function ()
   {
      return "Sound";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["4.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DSoundSourceNode .prototype .initialize .call (this);
      X3DUrlObject       .prototype .initialize .call (this);
   },
   dispose: function ()
   {
      X3DUrlObject       .prototype .dispose .call (this);
      X3DSoundSourceNode .prototype .dispose .call (this);
   },
});

export default BufferAudioSource;
