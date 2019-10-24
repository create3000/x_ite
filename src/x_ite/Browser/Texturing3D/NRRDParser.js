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
	"pako_inflate",
],
function (pako)
{
"use strict";

	// Grammar

	var Grammar =
	{
		NRRD: new RegExp ("^NRRD(\\d+)\\n", 'gy'),
		field: new RegExp ("(\\w+):\\s*(.+?)\\n", 'gy'),
		comment: new RegExp ("#[^\\n]\\n", 'gy'),
		newLine: new RegExp ("\n", 'gy'),
		data: new RegExp ("([^]*)$", 'gy'),
	};

	function parse (parser)
	{
		this .lastIndex = parser .lastIndex;

		parser .result = this .exec (parser .input);

		if (parser .result)
		{
			parser .lastIndex = this .lastIndex;
			return true;
		}

		return false;
	}

	for (var key in Grammar)
		Grammar [key] .parse = parse;

	// Parser

	function NRRDParser ()
	{
		this .fieldFunction = new Map ([
			["type",      this .type],
			["encoding",  this .encoding],
			["dimension", this .dimension],
			["sizes",     this .sizes],
		]);
	}

	NRRDParser .prototype =
	{
		parse: function (input)
		{
			this .setInput (input);
			this .NRRD ();
			this .fields ();
			this .data ();
			return this .nrrd;
		},
		setInput: function (value)
		{
			this .input     = value;
			this .lastIndex = 0;
			this .nrrd      = { };
		},
		NRRD: function ()
		{
			if (Grammar .NRRD .parse (this))
			{
				this .nrrd .version = parseInt (this .result [1]);
				return;
			}

			throw new Error ("Invalid NRRD file.");
		},
		fields: function ()
		{
			while (Grammar .comment .parse (this))
				;

			while (Grammar .field .parse (this))
			{
				var
					key   = this .result [1],
					value = this .result [2] .trim () .toLowerCase (),
					fun   = this .fieldFunction .get (key .toLowerCase ());

				if (fun)
					fun .call (this, value);

				while (Grammar .comment .parse (this))
					;
			}
		},
		type: (function ()
		{
			var types = new Map ([
				["signed char",        ["signed char", 1]],
				["int8",               ["signed char", 1]],
				["int8_t",             ["signed char", 1]],
				["uchar",              ["unsigned char", 1]],
				["unsigned char",      ["unsigned char", 1]],
				["uint8",              ["unsigned char", 1]],
				["uint8_t",            ["unsigned char", 1]],
				["short",              ["signed short", 2]],
				["short int",          ["signed short", 2]],
				["signed short",       ["signed short", 2]],
				["signed short int",   ["signed short", 2]],
				["int16",              ["signed short", 2]],
				["int16_t",            ["signed short", 2]],
				["ushort",             ["unsigned short", 2]],
				["unsigned short",     ["unsigned short", 2]],
				["unsigned short int", ["unsigned short", 2]],
				["uint16",             ["unsigned short", 2]],
				["uint16_t",           ["unsigned short", 2]],
				["int",                ["signed int", 4]],
				["signed int",         ["signed int", 4]],
				["int32",              ["signed int", 4]],
				["int32_t",            ["signed int", 4]],
				["uint",               ["unsigned int", 4]],
				["unsigned int",       ["unsigned int", 4]],
				["uint32",             ["unsigned int", 4]],
				["uint32_t",           ["unsigned int", 4]],
				["float",              ["float", 4]],
				["double",             ["double", 8]],
			]);

			return function (value)
			{
				var type = types .get (value);

				if (type === undefined)
					throw new Error ("Unsupported NRRD type '" + value + "'.");

				this .byteType = type [0];
				this .bytes    = type [1];
			};
		})(),
		encoding: (function ()
		{
			var encodings = new Map ([
				["ascii", "ascii"],
				["txt",   "ascii"],
				["text",  "ascii"],
				["raw",   "raw"],
				["hex",   "hex"],
				["gz",    "gzip"],
				["gzip",  "gzip"],
			]);

			return function (value)
			{
				var encoding = encodings .get (value);

				if (encoding === undefined)
					throw new Error ("Unsupported NRRD encoding '" + value + "'.");

				this .encoding = encoding;
			};
		})(),
		dimension: function (value)
		{
			var result = value .match (/(\d+)/);

			if (result)
			{
				var dimension = parseInt (result [1]);

				switch (dimension)
				{
					case 1:
					case 2:
					case 3:
					case 4:
						this .nrrd .dimension = dimension;
						return;
				}
			}

			throw new Error ("Unsupported NRRD dimension '" + dimension + "', must be 1, 2, 3, or 4.");
		},
		sizes: function (value)
		{
			var
				num    = new RegExp ("\\s*(\\d+)", 'gy'),
				result = null,
				sizes  = [ ];

			while (result = num .exec (value))
			{
				sizes .push (parseInt (result [1]));
			}

			switch (sizes .length)
			{
				case 1:
				{
					this .nrrd .components = 1;
					this .nrrd .width      = sizes [0];
					this .nrrd .height     = 1;
					this .nrrd .depth      = 1;
					return;
				}
				case 2:
				{
					this .nrrd .components = 1;
					this .nrrd .width      = sizes [0];
					this .nrrd .height     = sizes [1];
					this .nrrd .depth      = 1;
					return;
				}
				case 3:
				{
					this .nrrd .components = 1;
					this .nrrd .width      = sizes [0];
					this .nrrd .height     = sizes [1];
					this .nrrd .depth      = sizes [2];
					return;
				}
				case 4:
				{
					this .nrrd .components = sizes [0];
					this .nrrd .width      = sizes [1];
					this .nrrd .height     = sizes [2];
					this .nrrd .depth      = sizes [3];
					return;
				}
				default:
					throw new Error ("Unsupported NRRD sizes.");
			}
		},
		data: function ()
		{
			switch (this .encoding)
			{
				case "ascii":
				{
					this .ascii ();
					break;
				}
				case "raw":
				{
					this .raw ();
					break;
				}
				case "hex":
				{
					this .hex ();
					break;
				}
				case "gzip":
				{
					this .gzip ();
					break;
				}
			}
		},
		ascii: function ()
		{
			var
				dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
				data       = new Uint8Array (dataLength);

			this .nrrd .data = data;

			if (! Grammar .data .parse (this))
				return;

			var numbers = this .result [1] .trim () .split (/\s+/);

			switch (this .byteType)
			{
				case "signed char":
				case "unsigned char":
				{
					numbers .forEach (function (value, i)
					{
						data [i] = parseInt (value);
					});

					return;
				}
				case "signed short":
				case "unsigned short":
				{
					numbers .forEach (function (value, i)
					{
						data [i] = parseInt (value) / 256;
					});

					return;
				}
				case "signed int":
				case "unsigned int":
				{
					numbers .forEach (function (value, i)
					{
						data [i] = parseInt (value) / 16777216;
					});

					return;
				}
				case "float":
				case "double":
				{
					numbers .forEach (function (value, i)
					{
						data [i] = parseFloat (value) * 255;
					});

					return;
				}
			}
		},
		raw: function ()
		{
			var
				input      = this .input,
				dataLength = this .nrrd .components * this .nrrd .width * this .nrrd .height * this .nrrd .depth,
				length     = dataLength * this .bytes,
				data       = new Uint8Array (dataLength);

			this .nrrd .data = data;

			switch (this .byteType)
			{
				case "signed char":
				case "unsigned char":
				{
					for (var i = input .length - length, d = 0; i < input .length; ++ i, ++ d)
						data [d] = input .charCodeAt (i);

					return;
				}
				case "signed short":
				case "unsigned short":
				{
					for (var i = input .length - length, d = 0; i < input .length; i += 2, ++ d)
						data [d] = (input .charCodeAt (i) << 8 | input .charCodeAt (i + 1)) / 256;

					return;
				}
				case "signed int":
				case "unsigned int":
				{
					for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
						data [d] = (input .charCodeAt (i) << 24 | input .charCodeAt (i + 1) << 16 | input .charCodeAt (i + 2) << 8 | input .charCodeAt (i + 3)) / 16777216;

					return;
				}
				case "float":
				{
					for (var i = input .length - length, d = 0; i < input .length; i += 4, ++ d)
						data [d] = this .float2byte (input .charCodeAt (i),
						                             input .charCodeAt (i + 1),
						                             input .charCodeAt (i + 2),
						                             input .charCodeAt (i + 3));

					return;
				}
				case "double":
				{
					for (var i = input .length - length, d = 0; i < input .length; i += 8, ++ d)
						data [d] = this .double2byte (input .charCodeAt (i),
																input .charCodeAt (i + 1),
																input .charCodeAt (i + 2),
																input .charCodeAt (i + 3),
																input .charCodeAt (i + 4),
																input .charCodeAt (i + 5),
																input .charCodeAt (i + 6),
																input .charCodeAt (i + 7));

					return;
				}
			}
		},
		hex: function ()
		{
			Grammar .data .parse (this);

			var raw = this .result [1] .match (/([0-9a-fA-F]{2})/g) .map (function (value)
			{
				return parseInt (value, 16);
			});

			this .input = String .fromCharCode .apply (String, raw);

			this .raw ();
		},
		gzip: function ()
		{
			if (! Grammar .newLine .parse (this))
				throw new Error ("Invalid NRRD data.");

			Grammar .data .parse (this);

			var raw = pako .ungzip (this .result [1], { to: "raw" });

			this .input = String .fromCharCode .apply (String, raw);

			this .raw ();
		},
		float2byte: (function ()
		{
			var
				bytes  = new Uint8Array (4),
				number = new Float32Array (bytes .buffer);

			return function (b0, b1, b2, b3)
			{
				bytes [0] = b0;
				bytes [1] = b1;
				bytes [2] = b2;
				bytes [3] = b3;

				return number [0] * 255;
			};
		})(),
		double2byte: (function ()
		{
			var
				bytes  = new Uint8Array (8),
				number = new Float64Array (bytes .buffer);

			return function (b0, b1, b2, b3, b4, b5, b6, b7)
			{
				bytes [0] = b0;
				bytes [1] = b1;
				bytes [2] = b2;
				bytes [3] = b3;
				bytes [4] = b4;
				bytes [5] = b5;
				bytes [6] = b6;
				bytes [7] = b7;

				return number [0] * 255;
			};
		})(),
	};

	return NRRDParser;
});
