(function () {

	var
		define  = X3D .define,
		require = X3D .require;

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


define ('x_ite/Components/Texturing3D/X3DTexture3DNode',[
	"x_ite/Components/Texturing/X3DTextureNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (X3DTextureNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	var defaultData = new Uint8Array ([ 255, 255, 255, 255 ]);

	function X3DTexture3DNode (executionContext)
	{
		X3DTextureNode .call (this, executionContext);

		this .addType (X3DConstants .X3DTexture3DNode);

		this .width  = 0;
		this .height = 0;
		this .depth  = 0;
		this .data   = null;
	}

	X3DTexture3DNode .prototype = Object .assign (Object .create (X3DTextureNode .prototype),
	{
		constructor: X3DTexture3DNode,
		initialize: function ()
		{
			X3DTextureNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .target = gl .TEXTURE_3D;

			this .repeatS_           .addInterest ("updateTextureProperties", this);
			this .repeatT_           .addInterest ("updateTextureProperties", this);
			this .repeatR_           .addInterest ("updateTextureProperties", this);
			this .textureProperties_ .addInterest ("set_textureProperties__", this);

			gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
			gl .texImage3D  (gl .TEXTURE_3D, 0, gl .RGBA, 1, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);

			this .set_textureProperties__ ();
		},
		set_textureProperties__: function ()
		{
			if (this .texturePropertiesNode)
				this .texturePropertiesNode .removeInterest ("updateTextureProperties", this);

			this .texturePropertiesNode = X3DCast (X3DConstants .TextureProperties, this .textureProperties_);

			if (! this .texturePropertiesNode)
				this .texturePropertiesNode = this .getBrowser () .getDefaultTextureProperties ();

			this .texturePropertiesNode .addInterest ("updateTextureProperties", this);

			this .updateTextureProperties ();
		},
		getTarget: function ()
		{
			return this .target;
		},
		getWidth: function ()
		{
			return this .width;
		},
		getHeight: function ()
		{
			return this .height;
		},
		getDepth: function ()
		{
			return this .depth;
		},
		getFlipY: function ()
		{
			return false;
		},
		getData: function ()
		{
			return this .data;
		},
		clearTexture: function ()
		{
			var gl = this .getBrowser () .getContext ();

			this .setTexture (1, 1, 1, false, gl .RGBA, defaultData);
		},
		setTexture: function (width, height, depth, transparent, format, data)
		{
			try
			{
				this .width  = width;
				this .height = height;
				this .depth  = depth;
				this .data   = data;

				var gl = this .getBrowser () .getContext ();

				if (gl .getVersion () < 2)
					return;

				gl .pixelStorei (gl .UNPACK_FLIP_Y_WEBGL, false);
				gl .pixelStorei (gl .UNPACK_ALIGNMENT, 1);
				gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
				gl .texImage3D  (gl .TEXTURE_3D, 0, format, width, height, depth, 0, format, gl .UNSIGNED_BYTE, data);

				this .setTransparent (transparent);
				this .updateTextureProperties ();
				this .addNodeEvent ();
			}
			catch (error)
			{ }
		},
		updateTextureProperties: function ()
		{
			var gl = this .getBrowser () .getContext ();

			X3DTextureNode .prototype .updateTextureProperties .call (this,
			                                                          gl .TEXTURE_3D,
			                                                          this .textureProperties_ .getValue (),
			                                                          this .texturePropertiesNode,
			                                                          this .width,
			                                                          this .height,
			                                                          this .repeatS_ .getValue (),
			                                                          this .repeatT_ .getValue (),
			                                                          this .repeatR_ .getValue ());
		},
		setShaderUniformsToChannel: function (gl, shaderObject, i)
		{
			if (gl .getVersion () >= 2)
			{
				gl .activeTexture (gl .TEXTURE0 + shaderObject .getBrowser () .getTexture3DUnits () [i]);
				gl .bindTexture (gl .TEXTURE_3D, this .getTexture ());
			}

			gl .uniform1i (shaderObject .x3d_TextureType [i], 3);
		},
	});

	return X3DTexture3DNode;
});

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


define ('x_ite/Components/Texturing3D/ComposedTexture3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture3DNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function ComposedTexture3D (executionContext)
	{
		X3DTexture3DNode .call (this, executionContext);

		this .addType (X3DConstants .ComposedTexture3D);

		this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));

		this .textureNodes = [ ];
	}

	ComposedTexture3D .prototype = Object .assign (Object .create (X3DTexture3DNode .prototype),
	{
		constructor: ComposedTexture3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",           new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "ComposedTexture3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture3DNode .prototype .initialize .call (this);

			this .texture_ .addInterest ("set_texture__", this);

			this .set_texture__ ();
		},
		checkLoadState: function ()
		{
			return this .loadState_ .getValue ();
		},
		set_texture__: function ()
		{
			var textureNodes = this .textureNodes;

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				textureNodes [i] .removeInterest ("update", this);

			textureNodes .length = 0;

			for (var i = 0, length = this .texture_ .length; i < length; ++ i)
			{
				var textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this .texture_ [i]);

				if (textureNode)
					textureNodes .push (textureNode);
			}

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				textureNodes [i] .addInterest ("update", this);

			this .update ();
		},
		update: function ()
		{
			var
				textureNodes = this .textureNodes,
				complete     = 0;

			for (var i = 0, length = textureNodes .length; i < length; ++ i)
				complete += textureNodes [i] .checkLoadState () === X3DConstants .COMPLETE_STATE;

			if (textureNodes .length === 0 || complete !== textureNodes .length)
			{
				this .clearTexture ();

				this .loadState_ = X3DConstants .FAILED_STATE;
			}
			else
			{
				var
					gl           = this .getBrowser () .getContext (),
					textureNode0 = textureNodes [0],
					width        = textureNode0 .getWidth (),
					height       = textureNode0 .getHeight (),
					depth        = textureNodes .length,
					transparent  = 0,
					size         = width * height * 4,
					data         = new Uint8Array (size * depth);

				for (var i = 0, d = 0; i < depth; ++ i)
				{
					var
						textureNode = this .textureNodes [i],
						tData       = textureNode .getData ();

					transparent += textureNode .getTransparent ();

					for (var t = 0; t < size; ++ t, ++ d)
					{
						data [d] = tData [t];
					}
				}

				this .setTexture (width, height, depth, !! transparent, gl .RGBA, data);
				this .loadState_ = X3DConstants .COMPLETE_STATE;
			}
		},
	});

	return ComposedTexture3D;
});

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


define ('x_ite/Browser/Texturing3D/NRRDParser',[
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
			var
				result    = value .match (/(\d+)/),
				dimension = 0;

			if (result)
			{
				dimension = parseInt (result [1]);

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


define ('x_ite/Components/Texturing3D/ImageTexture3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
	"x_ite/Components/Networking/X3DUrlObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Texturing3D/NRRDParser",
	"x_ite/InputOutput/FileLoader",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture3DNode,
          X3DUrlObject,
			 X3DConstants,
			 NRRDParser,
          FileLoader)
{
"use strict";

	function ImageTexture3D (executionContext)
	{
		X3DTexture3DNode .call (this, executionContext);
		X3DUrlObject     .call (this, executionContext);

		this .addType (X3DConstants .ImageTexture3D);

		this .addChildObjects ("buffer", new Fields .MFString ());
	}

	ImageTexture3D .prototype = Object .assign (Object .create (X3DTexture3DNode .prototype),
		X3DUrlObject .prototype,
	{
		constructor: ImageTexture3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "url",               new Fields .MFString ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ImageTexture3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture3DNode .prototype .initialize .call (this);
			X3DUrlObject     .prototype .initialize .call (this);

			this .url_    .addInterest ("set_url__",   this);
			this .buffer_ .addInterest ("set_buffer__", this);

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

			this .buffer_ = this .url_;
		},
		getInternalType: function (gl, components)
		{
			switch (components)
			{
				case 1:
					return gl .LUMINANCE;
				case 2:
					return gl .LUMINANCE_ALPHA;
				case 3:
					return gl .RGB;
				case 4:
					return gl .RGBA;
			}
		},
		set_buffer__: function ()
		{
			new FileLoader (this) .loadBinaryDocument (this .buffer_,
			function (data)
			{
				if (data === null)
				{
					// No URL could be loaded.
					this .setLoadState (X3DConstants .FAILED_STATE);
					this .clearTexture ();
				}
				else
				{
					var
						gl           = this .getBrowser () .getContext (),
						nrrd         = new NRRDParser () .parse (data),
						internalType = this .getInternalType (gl, nrrd .components);

					this .setTexture (nrrd .width, nrrd .height, nrrd .depth, false, internalType, nrrd .data);
					this .setLoadState (X3DConstants .COMPLETE_STATE);
				}
			}
			.bind (this));
		},
	});

	return ImageTexture3D;
});

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


define ('x_ite/Components/Texturing3D/PixelTexture3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTexture3DNode,
          X3DConstants)
{
"use strict";

	function PixelTexture3D (executionContext)
	{
		X3DTexture3DNode .call (this, executionContext);

		this .addType (X3DConstants .PixelTexture3D);

		this .addChildObjects ("loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));
	}

	PixelTexture3D .prototype = Object .assign (Object .create (X3DTexture3DNode .prototype),
	{
		constructor: PixelTexture3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "image",             new Fields .MFInt32 (0, 0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",           new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "PixelTexture3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texture";
		},
		initialize: function ()
		{
			X3DTexture3DNode .prototype .initialize .call (this);

			this .image_ .addInterest ("set_image__", this);

			this .set_image__ ();
		},
		checkLoadState: function ()
		{
			return this .loadState_ .getValue ();
		},
		set_image__: (function ()
		{
			var
				OFFSET     = 4,
				COMPONENTS = 0,
				WIDTH      = 1,
				HEIGHT     = 2,
				DEPTH      = 3;

			return function ()
			{
				var image = this .image_;

				if (image .length < OFFSET)
				{
					this .clearTexture ();
					this .loadState_ = X3DConstants .FAILED_STATE;
					return;
				}

				var
					gl          = this .getBrowser () .getContext (),
					components  = image [COMPONENTS],
					width       = image [WIDTH],
					height      = image [HEIGHT],
					depth       = image [DEPTH],
					transparent = ! (components & 1),
					size3D      = width * height * depth;

				switch (components)
				{
					case 1:
					{
						var
							format = gl .LUMINANCE,
							data   = new Uint8Array (size3D);

						for (var i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
						{
							data [d ++] = image [i];
						}

						break;
					}
					case 2:
					{
						var
							format = gl .LUMINANCE_ALPHA,
							data   = new Uint8Array (size3D * 2);

							for (var i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
							{
								var p = image [i];

								data [d ++ ] = (p >>> 8) & 0xff;
								data [d ++ ] = p & 0xff;
							}

							break;
					}
					case 3:
					{
						var
							format = gl .RGB,
							data   = new Uint8Array (size3D * 3);

						for (var i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
						{
							var p = image [i];

							data [d ++ ] = (p >>> 16) & 0xff;
							data [d ++ ] = (p >>> 8)  & 0xff;
							data [d ++ ] = p & 0xff;
						}

						break;
					}
					case 4:
					{
						var
							format = gl .RGBA,
							data   = new Uint8Array (size3D * 4);

						for (var i = OFFSET, length = OFFSET + size3D, d = 0; i < length; ++ i)
						{
							var p = image [i];

							data [d ++ ] = (p >>> 24) & 0xff;
							data [d ++ ] = (p >>> 16) & 0xff;
							data [d ++ ] = (p >>> 8)  & 0xff;
							data [d ++ ] = p & 0xff;
						}

						break;
					}
					default:
					{
						this .clearTexture ();
						this .loadState_ = X3DConstants .FAILED_STATE;
						return;
					}
				}

				this .setTexture (width, height, depth, transparent, format, data);
				this .loadState_ = X3DConstants .COMPLETE_STATE;
			};
		})(),
	});

	return PixelTexture3D;
});

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


define ('x_ite/Components/Texturing3D/TextureCoordinate3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants)
{
"use strict";

	function TextureCoordinate3D (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinate3D);
	}

	TextureCoordinate3D .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 3;

				return vector .set (point [index], point [index + 1], point [index + 2], 1);
			}
			else
			{
				return vector .set (0, 0, 0, 1);
			}
		},
		addTexCoordToChannel: function (index, array)
		{
			if (index >= 0 && index < this .length)
			{
				var point = this .point;

				index *= 3;

				array .push (point [index], point [index + 1], point [index + 2], 1);
			}
			else
				array .push (0, 0, 0, 1);
		},
		getTexCoord: function (array)
		{
			var point = this .point_;

			for (var i = 0, length = point .length; i < length; ++ i)
			{
				var p = point [i];

				array [i] = new Vector4 (p .x, p .y, p .z, 1);
			}

			array .length = length;

			return array;
		},
	});

	return TextureCoordinate3D;
});



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


define ('x_ite/Components/Texturing3D/TextureCoordinate4D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureCoordinateNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureCoordinateNode, 
          X3DConstants)
{
"use strict";

	function TextureCoordinate4D (executionContext)
	{
		X3DTextureCoordinateNode .call (this, executionContext);

		this .addType (X3DConstants .TextureCoordinate4D);
	}

	TextureCoordinate4D .prototype = Object .assign (Object .create (X3DTextureCoordinateNode .prototype),
	{
		constructor: TextureCoordinate4D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "point",    new Fields .MFVec4f ()),
		]),
		getTypeName: function ()
		{
			return "TextureCoordinate4D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "texCoord";
		},
		initialize: function ()
		{
			X3DTextureCoordinateNode .prototype .initialize .call (this);

			this .point_ .addInterest ("set_point__", this);

			this .set_point__ ();
		},
		set_point__: function ()
		{
			this .point  = this .point_ .getValue ();
			this .length = this .point_ .length;
		},
		isEmpty: function ()
		{
			return this .length === 0;
		},
		getSize: function ()
		{
			return this .length;
		},
		get1Point: function (index, vector)
		{
			if (index < this .length)
			{
				const point = this .point;

				index *= 4;

				return vector .set (point [index], point [index + 1], point [index + 2], point [index + 3]);
			}
			else
			{
				return vector .set (0, 0, 0, 1);
			}
		},
		addTexCoordToChannel: function (index, array)
		{
			if (index >= 0 && index < this .length)
			{
				var point = this .point;

				index *= 4;

				array .push (point [index], point [index + 1], point [index + 2], point [index + 3]);
			}
			else
				array .push (0, 0, 0, 1);
		},
		getTexCoord: function (array)
		{
			var point = this .point_;

			for (var i = 0, length = point .length; i < length; ++ i)
			{
				var p = point [i];

				array [i] = new Vector4 (p .x, p .y, p .z, p .w);
			}

			array .length = length;

			return array;
		},
	});

	return TextureCoordinate4D;
});



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


define ('x_ite/Components/Texturing3D/TextureTransform3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureTransformNode",
	"x_ite/Bits/X3DConstants",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Rotation4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode, 
          X3DConstants,
          Vector3,
          Rotation4)
{
"use strict";

	var vector = new Vector3 (0, 0, 0);

	function TextureTransform3D (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext);

		this .addType (X3DConstants .TextureTransform3D);
	}

	TextureTransform3D .prototype = Object .assign (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransform3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "translation", new Fields .SFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "rotation",    new Fields .SFRotation ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "scale",       new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "center",      new Fields .SFVec3f ()),
		]),
		getTypeName: function ()
		{
			return "TextureTransform3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
		initialize: function ()
		{
			X3DTextureTransformNode .prototype .initialize .call (this);
			
			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			var
				translation = this .translation_ .getValue (),
				rotation    = this .rotation_ .getValue (),
				scale       = this .scale_ .getValue (),
				center      = this .center_ .getValue (),
				matrix4     = this .getMatrix ();

			matrix4 .identity ();

			if (! center .equals (Vector3 .Zero))
				matrix4 .translate (vector .assign (center) .negate ());

			if (! scale .equals (Vector3 .One))
				matrix4 .scale (scale);

			if (! rotation .equals (Rotation4 .Identity))
				matrix4 .rotate (rotation);

			if (! center .equals (Vector3 .Zero))
				matrix4 .translate (center);

			if (! translation .equals (Vector3 .Zero))
				matrix4 .translate (translation);

			this .setMatrix (matrix4);
		},
	});

	return TextureTransform3D;
});



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


define ('x_ite/Components/Texturing3D/TextureTransformMatrix3D',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Texturing/X3DTextureTransformNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureTransformNode,
          X3DConstants)
{
"use strict";

	function TextureTransformMatrix3D (executionContext)
	{
		X3DTextureTransformNode .call (this, executionContext);

		this .addType (X3DConstants .TextureTransformMatrix3D);
	}

	TextureTransformMatrix3D .prototype = Object .assign (Object .create (X3DTextureTransformNode .prototype),
	{
		constructor: TextureTransformMatrix3D,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "matrix",   new Fields .SFMatrix4f (1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)),
		]),
		getTypeName: function ()
		{
			return "TextureTransformMatrix3D";
		},
		getComponentName: function ()
		{
			return "Texturing3D";
		},
		getContainerField: function ()
		{
			return "textureTransform";
		},
		ininitialize: function ()
		{
			X3DTextureTransformNode .prototype .ininitialize .call (this);

			this .addInterest ("eventsProcessed", this);

			this .eventsProcessed ();
		},
		eventsProcessed: function ()
		{
			var matrix4 = this .getMatrix ();

			matrix4 .assign (this .matrix_ .getValue ());

			this .setMatrix (matrix4);
		},
	});

	return TextureTransformMatrix3D;
});

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
	"x_ite/Components",
	"x_ite/Components/Texturing3D/ComposedTexture3D",
	"x_ite/Components/Texturing3D/ImageTexture3D",
	"x_ite/Components/Texturing3D/PixelTexture3D",
	"x_ite/Components/Texturing3D/TextureCoordinate3D",
	"x_ite/Components/Texturing3D/TextureCoordinate4D",
	"x_ite/Components/Texturing3D/TextureTransform3D",
	"x_ite/Components/Texturing3D/TextureTransformMatrix3D",
	"x_ite/Components/Texturing3D/X3DTexture3DNode",
],
function (Components,
          ComposedTexture3D,
          ImageTexture3D,
          PixelTexture3D,
          TextureCoordinate3D,
          TextureCoordinate4D,
          TextureTransform3D,
          TextureTransformMatrix3D,
          X3DTexture3DNode)
{
"use strict";

	Components .addComponent ({
		name: "Texturing3D",
		types:
		{
			ComposedTexture3D:        ComposedTexture3D,        // Not implemented yet.
			ImageTexture3D:           ImageTexture3D,           // Not implemented yet.
			PixelTexture3D:           PixelTexture3D,           // Not implemented yet.
			TextureCoordinate3D:      TextureCoordinate3D,
			TextureCoordinate4D:      TextureCoordinate4D,
			TextureTransform3D:       TextureTransform3D,
			TextureTransformMatrix3D: TextureTransformMatrix3D,
		},
		abstractTypes:
		{
	   	X3DTexture3DNode: X3DTexture3DNode, // Not implemented yet.
		},
	});
});



}());
