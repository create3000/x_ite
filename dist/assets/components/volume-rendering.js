(function () {

	var
		define  = X3D .define,
		require = X3D .require;

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode',[
	"x_ite/Components/Core/X3DNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DNode,
          X3DConstants)
{
"use strict";

	function X3DVolumeRenderStyleNode (executionContext)
	{
		X3DNode .call (this, executionContext);

		this .addType (X3DConstants .X3DVolumeRenderStyleNode);
	}

	X3DVolumeRenderStyleNode .prototype = Object .assign (Object .create (X3DNode .prototype),
	{
		constructor: X3DVolumeRenderStyleNode,
		addShaderFields: function (shaderNode)
		{ },
		getUniformsText: function ()
		{
			return "";
		},
		getFunctionsText: function ()
		{
			return "";
		},
	});

	return X3DVolumeRenderStyleNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode',[
	"x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (X3DVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function X3DComposableVolumeRenderStyleNode (executionContext)
	{
		X3DVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .X3DComposableVolumeRenderStyleNode);
	}

	X3DComposableVolumeRenderStyleNode .prototype = Object .assign (Object .create (X3DVolumeRenderStyleNode .prototype),
	{
		constructor: X3DComposableVolumeRenderStyleNode,
	});

	return X3DComposableVolumeRenderStyleNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/OpacityMapVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function OpacityMapVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .OpacityMapVolumeStyle);
	}

	OpacityMapVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: OpacityMapVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",          new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "transferFunction", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "OpacityMapVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
		initialize: function ()
		{
			X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .transferFunction_ .addInterest ("set_transferFunction__", this);

			this .set_transferFunction__ ();
		},
		set_transferFunction__: function ()
		{
			this .transferFunctionNode = X3DCast (X3DConstants .X3DTexture2DNode, this .transferFunction_);

			//if (! transferFunctionNode)
			//	transferFunctionNode = X3DCast (X3DConstants .X3DTexture3DNode, this .transferFunction_);

			if (! this .transferFunctionNode)
				this .transferFunctionNode = this .getBrowser () .getDefaultTransferFunction ();
		},
		addShaderFields: function (shaderNode)
		{
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transferFunction_" + this .getId (), new Fields .SFNode (this .transferFunctionNode));
		},
		getUniformsText: function ()
		{
			return "uniform sampler2D transferFunction_" + this .getId () + ";\n";
		},
		getFunctionsText: function ()
		{
			return "	textureColor = texture (transferFunction_" + this .getId () + ", textureColor .ra);\n";
		},
	});

	return OpacityMapVolumeStyle;
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


define ('x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext',[
	"x_ite/Components/Texturing/PixelTexture",
	"x_ite/Components/Texturing/TextureProperties",
	"x_ite/Components/VolumeRendering/OpacityMapVolumeStyle",
],
function (PixelTexture,
          TextureProperties,
          OpacityMapVolumeStyle)
{
"use strict";

	function X3DVolumeRenderingContext () { }

	X3DVolumeRenderingContext .prototype =
	{
		getDefaultVolumeStyle: function ()
		{
			if (this .defaultVolumeStyle !== undefined)
				return this .defaultVolumeStyle;

			this .defaultVolumeStyle = new OpacityMapVolumeStyle (this .getPrivateScene ());
			this .defaultVolumeStyle .setup ();

			return this .defaultVolumeStyle;
		},
		getDefaultTransferFunction: function ()
		{
			if (this .defaultTransferFunction !== undefined)
				return this .defaultTransferFunction;

			this .defaultTransferFunction = new PixelTexture (this .getPrivateScene ());

			var textureProperties = new TextureProperties (this .getPrivateScene ());

			textureProperties .generateMipMaps_ = true;
			textureProperties .boundaryModeS_   = "CLAMP_TO_EDGE";
			textureProperties .boundaryModeT_   = "REPEAT";

			this .defaultTransferFunction .textureProperties_ = textureProperties;

			this .defaultTransferFunction .image_ .width  = 256;
			this .defaultTransferFunction .image_ .height = 1;
			this .defaultTransferFunction .image_ .comp   = 2;

			var array = this .defaultTransferFunction .image_ .array;

			for (var i = 0; i < 256; ++ i)
				array [i] = (i << 8) | i;

			textureProperties             .setup ();
			this .defaultTransferFunction .setup ();

			return this .defaultTransferFunction;
		},
	};

	return X3DVolumeRenderingContext;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/BlendedVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function BlendedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .BlendedVolumeStyle);
	}

	BlendedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: BlendedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                 new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightConstant1",         new Fields .SFFloat (0.5)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightConstant2",         new Fields .SFFloat (0.5)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightFunction1",         new Fields .SFString ("CONSTANT")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightFunction2",         new Fields .SFString ("CONSTANT")),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightTransferFunction1", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "weightTransferFunction2", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle",             new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "voxels",                  new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "BlendedVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
		initialize: function ()
		{
			X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .weightTransferFunction1_ .addInterest ("set_weightTransferFunction1__", this);
			this .weightTransferFunction2_ .addInterest ("set_weightTransferFunction2__", this);
			this .renderStyle_             .addInterest ("set_renderStyle__",             this);
			this .voxels_                  .addInterest ("set_voxels__",                  this);

			this .set_weightTransferFunction1__ ();
			this .set_weightTransferFunction2__ ();
			this .set_renderStyle__ ();
			this .set_voxels__ ();
		},
		set_weightTransferFunction1__: function ()
		{
			this .weightTransferFunction1Node = X3DCast (X3DConstants .X3DTexture2DNode, this .weightTransferFunction1_);
		},
		set_weightTransferFunction2__: function ()
		{
			this .weightTransferFunction2Node = X3DCast (X3DConstants .X3DTexture2DNode, this .weightTransferFunction2_);
		},
		set_renderStyle__: function ()
		{
			if (this .renderStyleNode)
				this .renderStyleNode .removeInterest ("addNodeEvent", this);

			this .renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this .renderStyle_);

			if (! this .renderStyleNode)
				this .renderStyleNode = this .getBrowser () .getDefaultVolumeStyle ();

			if (this .renderStyleNode)
				this .renderStyleNode .addInterest ("addNodeEvent", this);
		},
		set_voxels__: function ()
		{
			if (this .voxelsNode)
				this .voxelsNode .removeInterest ("set_textureSize__", this);

			this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .voxels_);

			if (this .voxelsNode)
			{
				this .voxelsNode .addInterest ("set_textureSize__", this);

				this .set_textureSize__ ();
			}
		},
		set_textureSize__: function ()
		{
			var textureSize = this .textureSize;

			if (textureSize)
			{
				textureSize .x = this .voxelsNode .getWidth ();
				textureSize .y = this .voxelsNode .getHeight ();
				textureSize .z = this .voxelsNode .getDepth ();
			}
		},
		addShaderFields: function (shaderNode)
		{
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant1_" + this .getId (), this .weightConstant1_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant2_" + this .getId (), this .weightConstant2_ .copy ());

			if (this .weightTransferFunction1Node)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction1_" + this .getId (), new Fields .SFNode (this .weightTransferFunction1Node));

			if (this .weightTransferFunction2Node)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction2_" + this .getId (), new Fields .SFNode (this .weightTransferFunction2Node));

			if (this .voxelsNode)
			{
				this .textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "voxels_"      + this .getId (), new Fields .SFNode (this .voxelsNode));
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "textureSize_" + this .getId (), this .textureSize);
			}
			else
			{
				this .textureSize = null;
			}

			this .renderStyleNode .addShaderFields (shaderNode);
		},
		getUniformsText: function ()
		{
			if (! this .voxelsNode)
				return "";

			var string = "";

			string += "\n";
			string += "// BlendedVolumeStyle\n";
			string += "\n";
			string += "uniform float     weightConstant1_" + this .getId () + ";\n";
			string += "uniform float     weightConstant2_" + this .getId () + ";\n";

			if (this .weightTransferFunction1Node)
				string += "uniform sampler2D weightTransferFunction1_" + this .getId () + ";\n";

			if (this .weightTransferFunction2Node)
				string += "uniform sampler2D weightTransferFunction2_" + this .getId () + ";\n";

			string += "uniform sampler3D voxels_"      + this .getId () + ";\n";
			string += "uniform vec3      textureSize_" + this .getId () + ";\n";

			var uniformsText = this .renderStyleNode .getUniformsText ();

			uniformsText = uniformsText .replace (/x3d_Texture3D \[0\]/g, "voxels_"      + this .getId ());
			uniformsText = uniformsText .replace (/x3d_TextureSize/g,     "textureSize_" + this .getId ());

			string += "\n";
			string += uniformsText;

			return string;
		},
		getFunctionsText: function ()
		{
			if (! this .voxelsNode)
				return "";

			var string = "";

			string += "\n";
			string += "	// BlendedVolumeStyle\n";
			string += "\n";

			string += "	vec4 blendColor_" + this .getId () + " = texture (voxels_" + this .getId () + ", texCoord);";

			var functionsText = this .renderStyleNode .getFunctionsText ();

			functionsText = functionsText .replace (/textureColor/g, "blendColor_" + this .getId ());

			string += "\n";
			string += functionsText;
			string += "\n";
			string += "	// BlendedVolumeStyle\n";
			string += "\n";

			switch (this .weightFunction1_ .getValue ())
			{
				default: // CONSTANT
				{
					string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
					break;
				}
				case "ALPHA1":
				{
					string += "	float w1_" + this .getId () + " = textureColor .a;\n";
					break;
				}
				case "ALPHA2":
				{
					string += "	float w1_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
					break;
				}
				case "ONE_MINUS_ALPHA1":
				{
					string += "	float w1_" + this .getId () + " = 1.0 - textureColor .a;\n";
					break;
				}
				case "ONE_MINUS_ALPHA2":
				{
					string += "	float w1_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
					break;
				}
				case "TABLE":
				{
					if (this .weightTransferFunction1Node)
					{
						string += "	float w1_" + this .getId () + " = texture (weightTransferFunction1_" + this .getId () + ", vec2 (textureColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
					}
					else
					{
						// Use default CONSTANT value.
						string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
					}

					break;
				}
			}

			switch (this .weightFunction2_ .getValue ())
			{
				default: // CONSTANT
				{
					string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
					break;
				}
				case "ALPHA1":
				{
					string += "	float w2_" + this .getId () + " = textureColor .a;\n";
					break;
				}
				case "ALPHA2":
				{
					string += "	float w2_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
					break;
				}
				case "ONE_MINUS_ALPHA1":
				{
					string += "	float w2_" + this .getId () + " = 1.0 - textureColor .a;\n";
					break;
				}
				case "ONE_MINUS_ALPHA2":
				{
					string += "	float w2_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
					break;
				}
				case "TABLE":
				{
					if (this .weightTransferFunction2Node)
					{
						string += "	float w2_" + this .getId () + " = texture (weightTransferFunction2_" + this .getId () + ", vec2 (textureColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
					}
					else
					{
						// Use default CONSTANT value.
						string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
					}

					break;
				}
			}

			string += "	textureColor = clamp (textureColor * w1_" + this .getId () + " + blendColor_" + this .getId () + " * w2_" + this .getId () + ", 0.0, 1.0);\n";

			return string;
		},
	});

	return BlendedVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function BoundaryEnhancementVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .BoundaryEnhancementVolumeStyle);
	}

	BoundaryEnhancementVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: BoundaryEnhancementVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "boundaryOpacity", new Fields .SFFloat (0.9)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "opacityFactor",   new Fields .SFFloat (2)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "retainedOpacity", new Fields .SFFloat (0.2)),
		]),
		getTypeName: function ()
		{
			return "BoundaryEnhancementVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return BoundaryEnhancementVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/CartoonVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function CartoonVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .CartoonVolumeStyle);
	}

	CartoonVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: CartoonVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "colorSteps",      new Fields .SFInt32 (4)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "orthogonalColor", new Fields .SFColorRGBA (1, 1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "parallelColor",   new Fields .SFColorRGBA (0, 0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",  new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "CartoonVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return CartoonVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/ComposedVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function ComposedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ComposedVolumeStyle);
	}

	ComposedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: ComposedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle", new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "ComposedVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return ComposedVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function EdgeEnhancementVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .EdgeEnhancementVolumeStyle);
	}

	EdgeEnhancementVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: EdgeEnhancementVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "edgeColor",         new Fields .SFColorRGBA (0, 0, 0, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",           new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "gradientThreshold", new Fields .SFFloat (0.4)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",    new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "EdgeEnhancementVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return EdgeEnhancementVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/X3DVolumeDataNode',[
	"x_ite/Fields",
	"x_ite/Components/Core/X3DChildNode",
	"x_ite/Components/Grouping/X3DBoundedObject",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Core/TextureQuality",
	"standard/Math/Numbers/Vector3",
],
function (Fields,
          X3DChildNode,
          X3DBoundedObject,
          X3DConstants,
          TextureQuality,
          Vector3)
{
"use strict";

	function X3DVolumeDataNode (executionContext)
	{
		X3DChildNode     .call (this, executionContext);
		X3DBoundedObject .call (this, executionContext);

		this .addType (X3DConstants .X3DVolumeDataNode);

		this .proximitySensorNode   = executionContext .createNode ("ProximitySensor", false);
		this .transformNode         = executionContext .createNode ("Transform", false);
		this .shapeNode             = executionContext .createNode ("Shape", false);
		this .appearanceNode        = executionContext .createNode ("Appearance", false);
		this .textureTransformNode  = executionContext .createNode ("TextureTransform3D", false);
		this .geometryNode          = executionContext .createNode ("QuadSet", false);
		this .textureCoordinateNode = executionContext .createNode ("TextureCoordinate3D", false);
		this .coordinateNode        = executionContext .createNode ("Coordinate", false);

		this .setCameraObject (true);
	}

	X3DVolumeDataNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
		X3DBoundedObject .prototype,
	{
		constructor: X3DVolumeDataNode,
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);
		},
		initialize: function ()
		{
			X3DChildNode     .prototype .initialize .call (this);
			X3DBoundedObject .prototype .initialize .call (this);

			var
				browser = this .getBrowser (),
				gl      = browser .getContext ();

			browser .getBrowserOptions () .TextureQuality_ .addInterest ("set_dimensions__", this);

			if (gl .getVersion () >= 2)
			{
				this .dimensions_ .addInterest ("set_dimensions__", this);

				this .set_dimensions__ ();
			}

			this .appearanceNode .setPrivate (true);

			this .proximitySensorNode .orientation_changed_ .addFieldInterest (this .transformNode .rotation_);
			this .proximitySensorNode .orientation_changed_ .addFieldInterest (this .textureTransformNode .rotation_);

			this .proximitySensorNode .size_         = new Fields .SFVec3f (-1, -1, -1);
			this .transformNode .children_           = new Fields .MFNode (this .shapeNode);
			this .shapeNode .appearance_             = this .appearanceNode;
			this .shapeNode .geometry_               = this .geometryNode;
			this .appearanceNode .textureTransform_  = this .textureTransformNode;
			this .textureTransformNode .translation_ = new Fields .SFVec3f (0.5, 0.5, 0.5);
			this .textureTransformNode .center_      = new Fields .SFVec3f (-0.5, -0.5, -0.5);
			this .geometryNode .texCoord_            = this .textureCoordinateNode;
			this .geometryNode .coord_               = this .coordinateNode;

			this .coordinateNode        .setup ();
			this .textureCoordinateNode .setup ();
			this .geometryNode          .setup ();
			this .textureTransformNode  .setup ();
			this .appearanceNode        .setup ();
			this .shapeNode             .setup ();
			this .transformNode         .setup ();
			this .proximitySensorNode   .setup ();
		},
		getBBox: function (bbox)
		{
			if (this .bboxSize_ .getValue () .equals (this .getDefaultBBoxSize ()))
				return bbox .set (this .dimensions_ .getValue (), Vector3 .Zero);

			return bbox .set (this .bboxSize_ .getValue (), this .bboxCenter_ .getValue ());
		},
		getAppearance: function ()
		{
			return this .appearanceNode;
		},
		getNumPlanes: function ()
		{
			switch (this .getBrowser () .getBrowserOptions () .getTextureQuality ())
			{
				case TextureQuality .LOW:
				{
					return 200;
				}
				case TextureQuality .MEDIUM:
				{
					return 400;
				}
				case TextureQuality .HIGH:
				{
					return 600;
				}
			}

			return 200;
		},
		set_dimensions__: function ()
		{
			var
				NUM_PLANES = this .getNumPlanes (),
				size       = this .dimensions_ .getValue () .abs (),
				size1_2    = size / 2,
				points     = [ ];

			this .coordinateNode .point_ .length = 0;

			for (var i = 0; i < NUM_PLANES; ++ i)
			{
				var z = i / (NUM_PLANES - 1) - 0.5;

				points .push ( size1_2,  size1_2, size * z,
				              -size1_2,  size1_2, size * z,
				              -size1_2, -size1_2, size * z,
				               size1_2, -size1_2, size * z);
			}

			this .coordinateNode .point_        = points;
			this .textureCoordinateNode .point_ = points;

			this .textureTransformNode .scale_ = new Fields .SFVec3f (1 / this .dimensions_ .x, 1 / this .dimensions_ .y, 1 / this .dimensions_ .z);
		},
		traverse: function (type, renderObject)
		{
			this .proximitySensorNode .traverse (type, renderObject);
			this .transformNode       .traverse (type, renderObject);
		}
	});

	return X3DVolumeDataNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/IsoSurfaceVolumeData',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DVolumeDataNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeDataNode,
          X3DConstants)
{
"use strict";

	function IsoSurfaceVolumeData (executionContext)
	{
		X3DVolumeDataNode .call (this, executionContext);

		this .addType (X3DConstants .IsoSurfaceVolumeData);
	}

	IsoSurfaceVolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
	{
		constructor: IsoSurfaceVolumeData,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "contourStepSize",  new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",       new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "gradients",        new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",      new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceTolerance", new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceValues",    new Fields .MFFloat ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
		]),
		getTypeName: function ()
		{
			return "IsoSurfaceVolumeData";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return IsoSurfaceVolumeData;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/ProjectionVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function ProjectionVolumeStyle (executionContext)
	{
		X3DVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ProjectionVolumeStyle);
	}

	ProjectionVolumeStyle .prototype = Object .assign (Object .create (X3DVolumeRenderStyleNode .prototype),
	{
		constructor: ProjectionVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "intensityThreshold", new Fields .SFFloat (0)),
		]),
		getTypeName: function ()
		{
			return "ProjectionVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return ProjectionVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/SegmentedVolumeData',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DVolumeDataNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeDataNode,
          X3DConstants)
{
"use strict";

	function SegmentedVolumeData (executionContext)
	{
		X3DVolumeDataNode .call (this, executionContext);

		this .addType (X3DConstants .SegmentedVolumeData);
	}

	SegmentedVolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
	{
		constructor: SegmentedVolumeData,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",         new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",        new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentEnabled",     new Fields .MFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentIdentifiers", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",             new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",         new Fields .SFVec3f (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",           new Fields .SFVec3f (-1, -1, -1)),
		]),
		getTypeName: function ()
		{
			return "SegmentedVolumeData";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "children";
		},
	});

	return SegmentedVolumeData;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/ShadedVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function ShadedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ShadedVolumeStyle);
	}

	ShadedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: ShadedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "lighting",       new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "material",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",        new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceNormals", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "phaseFunction",  new Fields .SFString ("Henyey-Greenstein")),
		]),
		getTypeName: function ()
		{
			return "ShadedVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return ShadedVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants)
{
"use strict";

	function SilhouetteEnhancementVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .SilhouetteEnhancementVolumeStyle);
	}

	SilhouetteEnhancementVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: SilhouetteEnhancementVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                   new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteBoundaryOpacity", new Fields .SFFloat (0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteRetainedOpacity", new Fields .SFFloat (1)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteSharpness",       new Fields .SFFloat (0.5)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals",            new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "SilhouetteEnhancementVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
	});

	return SilhouetteEnhancementVolumeStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/ToneMappedVolumeStyle',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

	function ToneMappedVolumeStyle (executionContext)
	{
		X3DComposableVolumeRenderStyleNode .call (this, executionContext);

		this .addType (X3DConstants .ToneMappedVolumeStyle);
	}

	ToneMappedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
	{
		constructor: ToneMappedVolumeStyle,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",        new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "coolColor",      new Fields .SFColorRGBA (0, 0, 1, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "warmColor",      new Fields .SFColorRGBA (1, 1, 0, 0)),
			new X3DFieldDefinition (X3DConstants .inputOutput, "surfaceNormals", new Fields .SFNode ()),
		]),
		getTypeName: function ()
		{
			return "ToneMappedVolumeStyle";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "renderStyle";
		},
		initialize: function ()
		{
			X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .surfaceNormals_ .addInterest ("set_surfaceNormals__", this);

			this .set_surfaceNormals__ ();
		},
		set_surfaceNormals__: function ()
		{
			this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .surfaceNormals_);
		},
		addShaderFields: function (shaderNode)
		{
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "coolColor_" + this .getId (), this .coolColor_ .copy ());
			shaderNode .addUserDefinedField (X3DConstants .inputOutput, "warmColor_" + this .getId (), this .warmColor_ .copy ());

			if (this .surfaceNormalsNode)
				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
		},
		getUniformsText: function ()
		{
			var string = "";

			string += "\n";
			string += "// ToneMappedVolumeStyle\n";
			string += "\n";
			string += "uniform vec4 coolColor_" + this .getId () + ";\n";
			string += "uniform vec4 warmColor_" + this .getId () + ";\n";

			if (this .surfaceNormalsNode)
			{
				string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 n = texture (surfaceNormals_" + this .getId () + ", texCoord) * 2.0 - 1.0\n";
				string += "	return vec4 (normalize (n .xyz), length (n .xyz));\n";
				string += "}\n";
			}
			else
			{
				string += "\n";
				string += "vec4\n"
				string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
				string += "{\n";
				string += "	vec4 offset = vec4 (1.0 / x3d_TextureSize .x, 1.0 / x3d_TextureSize .y, 1.0 / x3d_TextureSize .z, 0.0);\n";
				string += "	float v0 = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
				string += "	float v1 = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
				string += "	float v2 = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
				string += "	float v3 = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
				string += "	float v4 = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
				string += "	float v5 = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
				string += "	vec3 n = vec3 (v0 - v1, v2 - v3, v4 - v5) * 0.5;\n";
				string += "	return vec4 (normalize (n), length (n));\n";
	  			string += "}\n";
			}

			string += "\n";
			string += "vec4\n";
			string += "toneMapped_" + this .getId () + " (in vec4 surfaceNormal, in vec3 lightDir, in vec4 coolColor, in vec4 warmColor)\n"
			string += "{\n"
			string += "	float colorFactor = (1.0 + dot (lightDir, surfaceNormal .xyz)) * 0.5;\n"
			string += "	return mix (warmColor, coolColor, colorFactor);\n"
			string += "}\n";

			return string;
		},
		getFunctionsText: function ()
		{
			var string = "";

			string += "\n";
			string += "	// ToneMappedVolumeStyle\n";
			string += "\n";
			string += "	{\n";

			string += "		vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
			string += "		vec4 toneColor = vec4 (0.0);\n";
			string += "\n";
			string += "		for (int i = 0; i < x3d_MaxLights; ++ i)\n";
			string += "		{\n";
			string += "			if (i == x3d_NumLights)\n";
			string += "				break;\n";
			string += "\n";
			string += "			x3d_LightSourceParameters light = x3d_LightSource [i];\n";
			string += "\n";
			string += "			vec3 L = light .type == x3d_DirectionalLight ? -light .direction : light .location - vertex;\n";
			string += "			toneColor += toneMapped_" + this .getId () + " (surfaceNormal, L, coolColor_" + this .getId () + ", warmColor_" + this .getId () + ");\n";
			string += "		}\n";
			string += "\n";
			string += "		textureColor .rgb = toneColor .rgb;\n"
			string += "		textureColor .a  *= toneColor .a;\n"

			string += "	}\n";

			return string;
		},
	});

	return ToneMappedVolumeStyle;
});


define('text/text!x_ite/Browser/VolumeRendering/VolumeStyle.vs',[],function () { return '#version 300 es\n\nprecision mediump float;\nprecision mediump int;\n\nuniform mat4 x3d_ProjectionMatrix;\nuniform mat4 x3d_ModelViewMatrix;\nuniform mat4 x3d_TextureMatrix [1];\n\nin vec4 x3d_Vertex;\nin vec4 x3d_TexCoord0;\n\nout vec3 vertex;\nout vec4 texCoord;\n\nvoid\nmain ()\n{\n\tvec4 position = x3d_ModelViewMatrix * x3d_Vertex;\n\n\tvertex   = position .xyz;\n\ttexCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;\n\n\tgl_Position = x3d_ProjectionMatrix * position;\n}\n';});


define('text/text!x_ite/Browser/VolumeRendering/VolumeStyle.fs',[],function () { return '#version 300 es\n\nprecision mediump float;\nprecision mediump int;\nprecision mediump sampler3D;\n\nuniform int x3d_NumLights;\nuniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];\n\nuniform int       x3d_NumTextures;\nuniform sampler3D x3d_Texture3D [1];\nuniform vec3      x3d_TextureSize;\n\n// VOLUME_STYLES_UNIFORMS\n\nin vec3 vertex;\nin vec4 texCoord;\n\nout vec4 x3d_FragColor;\n\n#pragma X3D include "../webgl2/include/ClipPlanes.glsl"\n\nvec4\ngetTextureColor (in vec3 texCoord)\n{\n\tif (x3d_NumTextures == 0)\n\t\tdiscard;\n\n\tif (texCoord .s < 0.0 || texCoord .s > 1.0)\n\t\tdiscard;\n\n\tif (texCoord .t < 0.0 || texCoord .t > 1.0)\n\t\tdiscard;\n\n\tif (texCoord .p < 0.0 || texCoord .p > 1.0)\n\t\tdiscard;\n\n\tvec4 textureColor = texture (x3d_Texture3D [0], texCoord);\n\n\t// Apply volume styles.\n\n// VOLUME_STYLES_FUNCTIONS\n\n\treturn textureColor;\n}\n\nvoid\nmain ()\n{\n\tclip ();\n\n\tx3d_FragColor = getTextureColor (texCoord .stp / texCoord .q);\n}\n';});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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


define ('x_ite/Components/VolumeRendering/VolumeData',[
	"x_ite/Fields",
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/VolumeRendering/X3DVolumeDataNode",
	"x_ite/Components/Shaders/ComposedShader",
	"x_ite/Components/Shaders/ShaderPart",
	"x_ite/Bits/X3DConstants",
	"x_ite/Bits/X3DCast",
	"text!x_ite/Browser/VolumeRendering/VolumeStyle.vs",
	"text!x_ite/Browser/VolumeRendering/VolumeStyle.fs",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DVolumeDataNode,
          ComposedShader,
          ShaderPart,
          X3DConstants,
          X3DCast,
          vs,
          fs)
{
"use strict";

	function VolumeData (executionContext)
	{
		X3DVolumeDataNode .call (this, executionContext);

		this .addType (X3DConstants .VolumeData);

		this .renderStyleNode = null;
		this .blendModeNode   = executionContext .createNode ("BlendMode", false)
  }

	VolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
	{
		constructor: VolumeData,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",  new Fields .SFVec3f (1, 1, 1)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle", new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",      new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f (0, 0, 0)),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
		]),
		getTypeName: function ()
		{
			return "VolumeData";
		},
		getComponentName: function ()
		{
			return "VolumeRendering";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DVolumeDataNode .prototype .initialize .call (this);

			var gl = this .getBrowser () .getContext ();

			if (gl .getVersion () < 2)
				return;

			this .renderStyle_ .addInterest ("set_renderStyle__", this);
			this .voxels_      .addFieldInterest (this .getAppearance () .texture_);

			this .blendModeNode .setup ();

			this .getAppearance () .texture_   = this .voxels_;
			this .getAppearance () .blendMode_ = this .blendModeNode;

			this .set_renderStyle__ ();
			this .set_voxels__ ();
		},
		set_renderStyle__: function ()
		{
			if (this .renderStyleNode)
				this .renderStyleNode .removeInterest ("set_createShader__", this);

			this .renderStyleNode = X3DCast (X3DConstants .X3DVolumeRenderStyleNode, this .renderStyle_);

			if (! this .renderStyleNode)
				this .renderStyleNode = this .getBrowser () .getDefaultVolumeStyle ();

			if (this .renderStyleNode)
				this .renderStyleNode .addInterest ("set_createShader__", this);

			this .set_createShader__ ();
		},
		set_voxels__: function ()
		{
			if (this .voxelsNode)
				this .voxelsNode .removeInterest ("set_textureSize__", this);

			this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this .voxels_);

			if (this .voxelsNode)
			{
				this .voxelsNode .addInterest ("set_textureSize__", this);

				this .set_textureSize__ ();
			}
		},
		set_textureSize__: function ()
		{
			var textureSize = this .textureSize;

			if (textureSize)
			{
				textureSize .x = this .voxelsNode .getWidth ();
				textureSize .y = this .voxelsNode .getHeight ();
				textureSize .z = this .voxelsNode .getDepth ();
			}
		},
		set_createShader__: function ()
		{
			this .getAppearance () .shaders_ [0] = this .createShader ();
		},
		createShader: function ()
		{
			console .log ("Creating VolumeData Shader ...");

			fs = fs .replace (/\/\/ VOLUME_STYLES_UNIFORMS\n/,  this .renderStyleNode .getUniformsText ());
			fs = fs .replace (/\/\/ VOLUME_STYLES_FUNCTIONS\n/, this .renderStyleNode .getFunctionsText ());

			this .getBrowser () .print (fs);

			var vertexShader = new ShaderPart (this .getExecutionContext ());
			vertexShader .setName ("VolumeDataVertexShader");
			vertexShader .url_ .push ("data:x-shader/x-vertex," + vs);
			vertexShader .setup ();

			var fragmentShader = new ShaderPart (this .getExecutionContext ());
			fragmentShader .setName ("VolumeDataFragmentShader");
			fragmentShader .type_ = "FRAGMENT";
			fragmentShader .url_ .push ("data:x-shader/x-fragment," + fs);
			fragmentShader .setup ();

			var shaderNode = new ComposedShader (this .getExecutionContext ());
			shaderNode .setName ("VolumeDataShader");
			shaderNode .language_ = "GLSL";
			shaderNode .parts_ .push (vertexShader);
			shaderNode .parts_ .push (fragmentShader);

			if (this .voxelsNode)
			{
				this .textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

				shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", this .textureSize);
			}
			else
			{
				this .textureSize = null;
			}

			this .renderStyleNode .addShaderFields (shaderNode);

			shaderNode .setup ();

			return shaderNode;
		},
	});

	return VolumeData;
});

/*******************************************************************************
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
	"x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext",
	"x_ite/Components/VolumeRendering/BlendedVolumeStyle",
	"x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle",
	"x_ite/Components/VolumeRendering/CartoonVolumeStyle",
	"x_ite/Components/VolumeRendering/ComposedVolumeStyle",
	"x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle",
	"x_ite/Components/VolumeRendering/IsoSurfaceVolumeData",
	"x_ite/Components/VolumeRendering/OpacityMapVolumeStyle",
	"x_ite/Components/VolumeRendering/ProjectionVolumeStyle",
	"x_ite/Components/VolumeRendering/SegmentedVolumeData",
	"x_ite/Components/VolumeRendering/ShadedVolumeStyle",
	"x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle",
	"x_ite/Components/VolumeRendering/ToneMappedVolumeStyle",
	"x_ite/Components/VolumeRendering/VolumeData",
	"x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
	"x_ite/Components/VolumeRendering/X3DVolumeDataNode",
	"x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode",
	X3D .getComponentUrl ("cad-geometry"),
	X3D .getComponentUrl ("texturing-3d"),
	X3D .getComponentUrl ("x_ite"),
],
function (Components,
          X3DVolumeRenderingContext,
          BlendedVolumeStyle,
          BoundaryEnhancementVolumeStyle,
          CartoonVolumeStyle,
          ComposedVolumeStyle,
          EdgeEnhancementVolumeStyle,
          IsoSurfaceVolumeData,
          OpacityMapVolumeStyle,
          ProjectionVolumeStyle,
          SegmentedVolumeData,
          ShadedVolumeStyle,
          SilhouetteEnhancementVolumeStyle,
          ToneMappedVolumeStyle,
          VolumeData,
          X3DComposableVolumeRenderStyleNode,
          X3DVolumeDataNode,
          X3DVolumeRenderStyleNode)
{
"use strict";

	Components .addComponent ({
		name: "VolumeRendering",
		types:
		{
			BlendedVolumeStyle:               BlendedVolumeStyle,
			BoundaryEnhancementVolumeStyle:   BoundaryEnhancementVolumeStyle,
			CartoonVolumeStyle:               CartoonVolumeStyle,
			ComposedVolumeStyle:              ComposedVolumeStyle,
			EdgeEnhancementVolumeStyle:       EdgeEnhancementVolumeStyle,
			IsoSurfaceVolumeData:             IsoSurfaceVolumeData,
			OpacityMapVolumeStyle:            OpacityMapVolumeStyle,
			ProjectionVolumeStyle:            ProjectionVolumeStyle,
			SegmentedVolumeData:              SegmentedVolumeData,
			ShadedVolumeStyle:                ShadedVolumeStyle,
			SilhouetteEnhancementVolumeStyle: SilhouetteEnhancementVolumeStyle,
			ToneMappedVolumeStyle:            ToneMappedVolumeStyle,
			VolumeData:                       VolumeData,
		},
		abstractTypes:
		{
			X3DComposableVolumeRenderStyleNode: X3DComposableVolumeRenderStyleNode,
			X3DVolumeDataNode:                  X3DVolumeDataNode,
			X3DVolumeRenderStyleNode:           X3DVolumeRenderStyleNode,
		},
		browser: X3DVolumeRenderingContext,
	});
});


}());
