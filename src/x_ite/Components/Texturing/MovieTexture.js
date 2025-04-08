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
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DSoundSourceNode   from "../Sound/X3DSoundSourceNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import GifMedia             from "../../Browser/Texturing/GifMedia.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function MovieTexture (executionContext)
{
   X3DTexture2DNode   .call (this, executionContext);
   X3DSoundSourceNode .call (this, executionContext);
   X3DUrlObject       .call (this, executionContext);

   this .addType (X3DConstants .MovieTexture);

   const audioContext = this .getBrowser () .getAudioContext ();

   this .urlStack               = new Fields .MFString ();
   this .video                  = $("<video></video>");
   this .sourceNode             = audioContext .createMediaElementSource (this .video [0]);
   this .mediaStreamDestination = audioContext .createMediaStreamDestination ();

   this .sourceNode .connect (this .getAudioSource ()) .connect (this .mediaStreamDestination);

   this .getMatrix () .set ([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]); // flipY
}

Object .assign (Object .setPrototypeOf (MovieTexture .prototype, X3DTexture2DNode .prototype),
   X3DSoundSourceNode .prototype,
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture2DNode   .prototype .initialize .call (this);
      X3DSoundSourceNode .prototype .initialize .call (this);
      X3DUrlObject       .prototype .initialize .call (this);

      this ._speed .addInterest ("set_speed__", this);
      this ._pitch .addInterest ("set_speed__", this);

      this .video
         .on ("abort error", this .setError .bind (this))
         .on ("suspend stalled", this .setTimeout .bind (this))
         .attr ("crossorigin", "anonymous")
         .attr ("preload", "auto")
         .prop ("muted", true);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   set_live__ ()
   {
      X3DSoundSourceNode .prototype .set_live__ .call (this);
      X3DUrlObject       .prototype .set_live__ .call (this);
   },
   getTextureType ()
   {
      return 1;
   },
   unloadData ()
   {
      this .clearTexture ();
      this .setMediaElement (null);
   },
   loadData ()
   {
      this .setMediaElement (null);
      this .urlStack .setValue (this ._url);
      this .video .on ("loadeddata", this .setVideo .bind (this));
      this .loadNext ();
   },
   loadNext ()
   {
      this .clearTimeout ();

      if (this .urlStack .length === 0)
      {
         this .video .off ("loadeddata");
         this ._duration_changed = -1;
         this .clearTexture ();
         this .setLoadState (X3DConstants .FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getBaseURL ());

      if (this .URL .protocol !== "data:")
      {
         if (!this .getCache ())
            this .URL .searchParams .set ("_", Date .now ());
      }

      if (this .URL .pathname .endsWith (".gif"))
      {
         const
            img = $("<img></img>") .appendTo ($("<div></div>")),
            gif = new SuperGif ({ gif: img [0], on_error: type => this .setError ({ type: type }) });

         gif .load_url (this .URL, () => this .setGif (gif));

         // this .setTimeout ({ type: "timeout" });
      }
      else
      {
         this .video
            .prop ("muted", true)
            .attr ("src", this .URL)
            .get (0) .load ();
      }
   },
   setTimeout (event)
   {
      this .clearTimeout ();

      this .timeoutId = setTimeout (() =>
      {
         if (this .checkLoadState () === X3DConstants .IN_PROGRESS_STATE)
            this .setError (event);
      },
      30_000);
   },
   clearTimeout ()
   {
      clearTimeout (this .timeoutId);
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading movie '${decodeURI (this .URL)}':`, event .type);

      this .loadNext ();
   },
   setVideo ()
   {
      try
      {
         if (DEVELOPMENT)
         {
            if (this .URL .protocol !== "data:")
               console .info (`Done loading movie '${decodeURI (this .URL)}'.`);
         }

         this .clearTimeout ();

         this .video .off ("loadeddata");

         const
            gl     = this .getBrowser () .getContext (),
            video  = this .video [0],
            width  = video .videoWidth,
            height = video .videoHeight;

         if (gl .getVersion () === 1 && !(Algorithm .isPowerOfTwo (width) && Algorithm .isPowerOfTwo (height)))
            throw new Error ("The movie texture is a non power-of-two texture.");

         this ._duration_changed = video .duration;

         this .setMediaElement (video);
         this .setTextureData (width, height, true, false, video);
         this .setLoadState (X3DConstants .COMPLETE_STATE);

         this .set_gain__ ();
         this .set_speed__ ();
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   setGif (gif)
   {
      try
      {
         GifMedia (gif, this);

         this ._duration_changed = gif .duration;

         this .setMediaElement (gif);
         this .setTextureData (gif .get_canvas () .width, gif .get_canvas () .height, true, false, gif .get_frames () [0] .data);
         this .setLoadState (X3DConstants .COMPLETE_STATE);

         this .set_speed__ ();
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   set_gain__ ()
   {
      X3DSoundSourceNode .prototype .set_gain__ .call (this);

      const media = this .getMediaElement ();

      if (media)
         media .muted = this ._gain .getValue () === 0;
   },
   set_speed__ ()
   {
      const media = this .getMediaElement ();

      if (!media)
         return;

      media .playbackRate   = this ._speed .getValue () * Math .max (this ._pitch .getValue (), 0);
      media .preservesPitch = this ._pitch .getValue () === 1;
   },
   set_time ()
   {
      X3DSoundSourceNode .prototype .set_time .call (this);

      if (this .checkLoadState () !== X3DConstants .COMPLETE_STATE)
         return;

      const media = this .getMediaElement ();

      if (media)
         this .updateTextureData (media .currentFrame ?.data ?? media);
   },
   traverse: X3DTexture2DNode .prototype .traverse,
   dispose ()
   {
      X3DUrlObject       .prototype .dispose .call (this);
      X3DSoundSourceNode .prototype .dispose .call (this);
      X3DTexture2DNode   .prototype .dispose .call (this);
   },
});

Object .defineProperties (MovieTexture,
{
   ... X3DNode .getStaticProperties ("MovieTexture", "Texturing", 3, "texture", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gain",                 new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pitch",                new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "loop",                 new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "startTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "resumeTime",           new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pauseTime",            new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stopTime",             new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isPaused",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",             new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "elapsedTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "duration_changed",     new Fields .SFTime (-1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default MovieTexture;
