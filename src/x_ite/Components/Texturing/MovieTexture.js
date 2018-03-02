/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
	"jquery",
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTexture2DNode",
	"x_ite/Components/Sound/X3DSoundSourceNode",
	"x_ite/Components/Networking/X3DUrlObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Networking/urls",
	"standard/Networking/URI",
	"standard/Math/Algorithm",
	"x_ite/DEBUG",
],
function ($,
          Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture2DNode, 
          X3DSoundSourceNode, 
          X3DUrlObject, 
          X3DConstants,
          urls,
          URI,
          Algorithm,
          DEBUG)
{
"use strict";

	function MovieTexture (executionContext)
	{
		X3DTexture2DNode   .call (this, executionContext);
		X3DSoundSourceNode .call (this, executionContext);
		X3DUrlObject       .call (this, executionContext);

		this .addType (X3DConstants .MovieTexture);
		
		this .addChildObjects ("buffer", new Fields .SFTime ());

		this .urlStack = new Fields .MFString ();
	}

	MovieTexture .prototype = Object .assign (Object .create (X3DTexture2DNode .prototype),
		X3DSoundSourceNode .prototype,
		X3DUrlObject .prototype,
	{
		constructor: MovieTexture,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "url",               new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "speed",             new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "pitch",             new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "loop",              new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "startTime",         new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "resumeTime",        new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "pauseTime",         new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "stopTime",          new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isPaused",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "cycleTime",         new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "elapsedTime",       new Fields .SFTime ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "duration_changed",  new Fields .SFTime (-1)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "MovieTexture";
		},
		getComponentName: function ()
		{
			return "Texturing";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture2DNode   .prototype .initialize .call (this);
			X3DSoundSourceNode .prototype .initialize .call (this);
			X3DUrlObject       .prototype .initialize .call (this);

			this .url_    .addInterest ("set_url__",    this);
			this .buffer_ .addInterest ("set_buffer__", this);

			this .canvas = $("<canvas></canvas>");

			this .video = $("<video></video>");
			this .video .on ("error", this .setError .bind (this));
			this .video .bind ("abort", this .setError .bind (this));

			this .video [0] .preload     = "auto";
			this .video [0] .volume      = 0;
			this .video [0] .crossOrigin = "Anonymous";

			this .set_url__ ();
		},
		set_url__: function ()
		{
			this .setLoadState (X3DConstants .NOT_STARTED_STATE);

			this .requestAsyncLoad ();
		},
		requestAsyncLoad: function ()
		{
			if (this .checkLoadState () === X3DConstants .COMPLETE_STATE || this .checkLoadState () === X3DConstants .IN_PROGRESS_STATE)
				return;

			this .setLoadState (X3DConstants .IN_PROGRESS_STATE);

			this .buffer_ .addEvent ();
		},
		set_buffer__: function ()
		{
			this .setMedia (null);
			this .urlStack .setValue (this .url_);
			this .video .bind ("canplaythrough", this .setVideo .bind (this));
			this .loadNext ();
		},
		loadNext: function ()
		{
			if (this .urlStack .length === 0)
			{
			   this .duration_changed_ = -1;
				this .clear (); // clearTexture
				this .setLoadState (X3DConstants .FAILED_STATE);
				return;
			}

			// Get URL.

			this .URL = new URI (this .urlStack .shift ());
			this .URL = this .getExecutionContext () .getURL () .transform (this .URL);
			// In Firefox we don't need getRelativePath if there is a file scheme, do we in Chrome???
	
			this .video .attr ("src", this .URL);
		},
		setError: function ()
		{
			var URL = this .URL .toString ();

			if (DEBUG)
			{
				if (! (this .URL .isLocal () || this .URL .host === "localhost"))
				{
					if (! URL .match (urls .fallbackExpression))
						this .urlStack .unshift (urls .fallbackUrl + URL);
				}
			}

			if (this .URL .scheme !== "data")
				console .warn ("Error loading movie:", this .URL .toString ());

			this .loadNext ();
		},
		setVideo: function ()
		{
			if (DEBUG)
			{
				if (this .URL .scheme !== "data")
					console .info ("Done loading movie:", this .URL .toString ());
			}

		   var video = this .video [0];
	
			try
			{
				var
					width  = video .videoWidth,
					height = video .videoHeight,
					canvas = this .canvas [0],
					cx     = canvas .getContext ("2d");

				if (! Algorithm .isPowerOfTwo (width) || ! Algorithm .isPowerOfTwo (height))
					throw new Error ("The movie texture is a non power-of-two texture.");

				canvas .width  = width;
				canvas .height = height;

				cx .drawImage (video, 0, 0);

				var data = cx .getImageData (0, 0, width, height) .data;

				setTimeout (function ()
				{
				   this .video .unbind ("canplaythrough");
				   this .setMedia (this .video);
					this .setTexture (width, height, false, new Uint8Array (data), true);
					this .setLoadState (X3DConstants .COMPLETE_STATE);
				}
				.bind (this), 16);
			}
			catch (error)
			{
				// Catch security error from cross origin requests.
				console .log (error .message);
				this .setError ();
			}
		},
		set_time: function ()
		{
		   X3DSoundSourceNode .prototype .set_time .call (this);

			if (this .checkLoadState () === X3DConstants .COMPLETE_STATE)
				this .updateTexture (this .getMedia () [0], true);
		},
		traverse: X3DTexture2DNode .prototype .traverse,
	});

	return MovieTexture;
});


