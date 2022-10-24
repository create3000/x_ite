(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
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
   "x_ite/Base/X3DConstants",
],
function (X3DNode,
          X3DConstants)
{
"use strict";

   function X3DVolumeRenderStyleNode (executionContext)
   {
      X3DNode .call (this, executionContext);

      this .addType (X3DConstants .X3DVolumeRenderStyleNode);

      this .volumeDataNodes = new Set ();
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
      getVolumeData: function ()
      {
         return this .volumeDataNodes;
      },
      addVolumeData: function (volumeDataNode)
      {
         this .volumeDataNodes .add (volumeDataNode);
      },
      removeVolumeData: function (volumeDataNode)
      {
         this .volumeDataNodes .delete (volumeDataNode);
      },
      getNormalText: function (surfaceNormalsNode)
      {
         var string = "";

         if (surfaceNormalsNode)
         {
            string += "uniform sampler3D surfaceNormals_" + this .getId () + ";\n";

            string += "\n";
            string += "vec4\n";
            string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
            string += "{\n";
            string += "	vec3 n = texture (surfaceNormals_" + this .getId () + ", texCoord) .xyz * 2.0 - 1.0;\n";
            string += "\n";
            string += "	return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
            string += "}\n";
         }
         else
         {
            string += "\n";
            string += "vec4\n";
            string += "getNormal_" + this .getId () + " (in vec3 texCoord)\n";
            string += "{\n";
            string += "	vec4  offset = vec4 (1.0 / x3d_TextureSize, 0.0);\n";
            string += "	float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
            string += "	float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
            string += "	float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
            string += "	float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
            string += "	float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
            string += "	float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
            string += "	vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
            string += "\n";
            string += "	return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
            string += "}\n";
         }

         return string;
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
   "x_ite/Base/X3DConstants",
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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

         this ._transferFunction .addInterest ("set_transferFunction__", this);

         this .set_transferFunction__ ();
      },
      set_transferFunction__: function ()
      {
         this .transferFunctionNode = X3DCast (X3DConstants .X3DTexture2DNode, this ._transferFunction);

         if (! this .transferFunctionNode)
            this .transferFunctionNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._transferFunction);

         if (! this .transferFunctionNode)
            this .transferFunctionNode = this .getBrowser () .getDefaultTransferFunction ();
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transferFunction_" + this .getId (), new Fields .SFNode (this .transferFunctionNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// OpacityMapVolumeStyle\n";
         string += "\n";

         if (this .transferFunctionNode .getType () .indexOf (X3DConstants .X3DTexture2DNode) !== -1)
         {
            string += "uniform sampler2D transferFunction_" + this .getId () + ";\n";

            string += "\n";
            string += "vec4\n";
            string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
            string += "{\n";
            string += "	return texture (transferFunction_" + this .getId () + ", originalColor .rg);\n";
            string += "}\n";
         }
         else
         {
            string += "uniform sampler3D transferFunction_" + this .getId () + ";\n";

            string += "\n";
            string += "vec4\n";
            string += "getOpacityMapStyle_" + this .getId () + " (in vec4 originalColor)\n";
            string += "{\n";
            string += "	return texture (transferFunction_" + this .getId () + ", originalColor .rgb);\n";
            string += "}\n";
         }

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// OpacityMapVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getOpacityMapStyle_" + this .getId () + " (textureColor);\n";

         return string;
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

   const
      _defaultVolumeStyle        = Symbol (),
      _defaultBlendedVolumeStyle = Symbol (),
      _defaultTransferFunction   = Symbol ();

   function X3DVolumeRenderingContext () { }

   X3DVolumeRenderingContext .prototype =
   {
      getDefaultVolumeStyle: function ()
      {
         this [_defaultVolumeStyle] = new OpacityMapVolumeStyle (this .getPrivateScene ());
         this [_defaultVolumeStyle] .setup ();

         this .getDefaultVolumeStyle = function () { return this [_defaultVolumeStyle]; };

         Object .defineProperty (this, "getDefaultVolumeStyle", { enumerable: false });

         return this [_defaultVolumeStyle];
      },
      getDefaultBlendedVolumeStyle: function ()
      {
         this [_defaultBlendedVolumeStyle] = new OpacityMapVolumeStyle (this .getPrivateScene ());
         this [_defaultBlendedVolumeStyle] .setup ();

         this .getDefaultBlendedVolumeStyle = function () { return this [_defaultBlendedVolumeStyle]; };

         Object .defineProperty (this, "getDefaultBlendedVolumeStyle", { enumerable: false });

         return this [_defaultBlendedVolumeStyle];
      },
      getDefaultTransferFunction: function ()
      {
         this [_defaultTransferFunction] = new PixelTexture (this .getPrivateScene ());

         const textureProperties = new TextureProperties (this .getPrivateScene ());

         textureProperties ._generateMipMaps = true;
         textureProperties ._boundaryModeS   = "CLAMP_TO_EDGE";
         textureProperties ._boundaryModeT   = "REPEAT";

         this [_defaultTransferFunction] ._textureProperties = textureProperties;

         this [_defaultTransferFunction] ._image .width  = 256;
         this [_defaultTransferFunction] ._image .height = 1;
         this [_defaultTransferFunction] ._image .comp   = 2;

         const array = this [_defaultTransferFunction] ._image .array;

         for (let i = 0; i < 256; ++ i)
            array [i] = (i << 8) | i;

         textureProperties               .setup ();
         this [_defaultTransferFunction] .setup ();

         this .getDefaultTransferFunction = function () { return this [_defaultTransferFunction]; };

         Object .defineProperty (this, "getDefaultTransferFunction", { enumerable: false });

         return this [_defaultTransferFunction];
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/DEBUG",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast,
          DEBUG)
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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

         this ._weightTransferFunction1 .addInterest ("set_weightTransferFunction1__", this);
         this ._weightTransferFunction2 .addInterest ("set_weightTransferFunction2__", this);
         this ._renderStyle             .addInterest ("set_renderStyle__",             this);
         this ._voxels                  .addInterest ("set_voxels__",                  this);

         this .set_weightTransferFunction1__ ();
         this .set_weightTransferFunction2__ ();
         this .set_renderStyle__ ();
         this .set_voxels__ ();
      },
      addVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

         if (this .renderStyleNode)
            this .renderStyleNode .addVolumeData (volumeDataNode);
      },
      removeVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

         if (this .renderStyleNode)
            this .renderStyleNode .removeVolumeData (volumeDataNode);
      },
      set_weightTransferFunction1__: function ()
      {
         this .weightTransferFunction1Node = X3DCast (X3DConstants .X3DTexture2DNode, this ._weightTransferFunction1);
      },
      set_weightTransferFunction2__: function ()
      {
         this .weightTransferFunction2Node = X3DCast (X3DConstants .X3DTexture2DNode, this ._weightTransferFunction2);
      },
      set_renderStyle__: function ()
      {
         if (this .renderStyleNode)
         {
            this .renderStyleNode .removeInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               this .renderStyleNode .removeVolumeData (volumeDataNode);
            }
            .bind (this));
         }

         this .renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this ._renderStyle);

         if (this .renderStyleNode)
         {
            this .renderStyleNode .addInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               this .renderStyleNode .addVolumeData (volumeDataNode);
            }
            .bind (this));
         }
      },
      set_voxels__: function ()
      {
         if (this .voxelsNode)
            this .voxelsNode .removeInterest ("set_textureSize__", this);

         this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);

         if (this .voxelsNode)
         {
            this .voxelsNode .addInterest ("set_textureSize__", this);

            this .set_textureSize__ ();
         }
      },
      set_textureSize__: function ()
      {
         this .getVolumeData () .forEach (function (volumeDataNode)
         {
            try
            {
               var textureSize = volumeDataNode .getShader () .getField ("textureSize_" + this .getId ());

               textureSize .x = this .voxelsNode .getWidth ();
               textureSize .y = this .voxelsNode .getHeight ();
               textureSize .z = this .voxelsNode .getDepth ();
            }
            catch (error)
            {
               if (DEBUG)
                  console .error (error);
            }
         }
         .bind (this));
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant1_" + this .getId (), this ._weightConstant1 .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant2_" + this .getId (), this ._weightConstant2 .copy ());

         if (this .weightTransferFunction1Node)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction1_" + this .getId (), new Fields .SFNode (this .weightTransferFunction1Node));

         if (this .weightTransferFunction2Node)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction2_" + this .getId (), new Fields .SFNode (this .weightTransferFunction2Node));

         if (this .voxelsNode)
         {
            var textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "voxels_"      + this .getId (), new Fields .SFNode (this .voxelsNode));
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "textureSize_" + this .getId (), textureSize);
         }
         else
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "textureSize_" + this .getId (), new Fields .SFVec3f ());
         }

         this .getBrowser () .getDefaultBlendedVolumeStyle () .addShaderFields (shaderNode);

         if (this .renderStyleNode)
            this .renderStyleNode .addShaderFields (shaderNode);
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

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

         var uniformsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getUniformsText ();

         if (this .renderStyleNode)
            uniformsText += this .renderStyleNode .getUniformsText ();

         uniformsText = uniformsText .replace (/x3d_Texture3D \[0\]/g, "voxels_"      + this .getId ());
         uniformsText = uniformsText .replace (/x3d_TextureSize/g,     "textureSize_" + this .getId ());

         string += "\n";
         string += uniformsText;

         string += "\n";
         string += "vec4\n";
         string += "getBlendedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";

         string += "	vec4 blendColor_" + this .getId () + " = texture (voxels_" + this .getId () + ", texCoord);";

         var functionsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getFunctionsText ();

         if (this .renderStyleNode)
            functionsText += this .renderStyleNode .getFunctionsText ();

         functionsText = functionsText .replace (/textureColor/g, "blendColor_" + this .getId ());

         string += "\n";
         string += functionsText;

         switch (this ._weightFunction1 .getValue ())
         {
            default: // CONSTANT
            {
               string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
               break;
            }
            case "ALPHA0":
            {
               string += "	float w1_" + this .getId () + " = originalColor .a;\n";
               break;
            }
            case "ALPHA1":
            {
               string += "	float w1_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA0":
            {
               string += "	float w1_" + this .getId () + " = 1.0 - originalColor .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA1":
            {
               string += "	float w1_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "TABLE":
            {
               if (this .weightTransferFunction1Node)
               {
                  string += "	float w1_" + this .getId () + " = texture (weightTransferFunction1_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
               }
               else
               {
                  // Use default CONSTANT value.
                  string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
               }

               break;
            }
         }

         switch (this ._weightFunction2 .getValue ())
         {
            default: // CONSTANT
            {
               string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
               break;
            }
            case "ALPHA0":
            {
               string += "	float w2_" + this .getId () + " = originalColor .a;\n";
               break;
            }
            case "ALPHA1":
            {
               string += "	float w2_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA0":
            {
               string += "	float w2_" + this .getId () + " = 1.0 - originalColor .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA1":
            {
               string += "	float w2_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "TABLE":
            {
               if (this .weightTransferFunction2Node)
               {
                  string += "	float w2_" + this .getId () + " = texture (weightTransferFunction2_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
               }
               else
               {
                  // Use default CONSTANT value.
                  string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
               }

               break;
            }
         }

         string += "\n";
         string += "	return clamp (originalColor * w1_" + this .getId () + " + blendColor_" + this .getId () + " * w2_" + this .getId () + ", 0.0, 1.0);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         if (! this .voxelsNode)
            return "";

         var string = "";

         string += "\n";
         string += "	// BlendedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getBlendedStyle_" + this .getId () + " (textureColor, texCoord);\n";

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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainedOpacity", new Fields .SFFloat (0.2)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "boundaryOpacity", new Fields .SFFloat (0.9)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "opacityFactor",   new Fields .SFFloat (2)),
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
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "retainedOpacity_" + this .getId (), this ._retainedOpacity .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "boundaryOpacity_" + this .getId (), this ._boundaryOpacity .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "opacityFactor_"   + this .getId (), this ._opacityFactor   .copy ());
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// BoundaryEnhancementVolumeStyle\n";
         string += "\n";
         string += "uniform float retainedOpacity_" + this .getId () + ";\n";
         string += "uniform float boundaryOpacity_" + this .getId () + ";\n";
         string += "uniform float opacityFactor_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getBoundaryEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         string += "	float f0 = texture (x3d_Texture3D [0], texCoord) .r;\n";
         string += "	float f1 = texture (x3d_Texture3D [0], texCoord + vec3 (0.0, 0.0, 1.0 / x3d_TextureSize .z)) .r;\n";
         string += "	float f  = abs (f0 - f1);\n";
         string += "\n";
         string += "	float retainedOpacity = retainedOpacity_" + this .getId () + ";\n";
         string += "	float boundaryOpacity = boundaryOpacity_" + this .getId () + ";\n";
         string += "	float opacityFactor   = opacityFactor_" + this .getId () + ";\n";
         string += "\n";
         string += "	return vec4 (originalColor .rgb, originalColor .a * (retainedOpacity + boundaryOpacity * pow (f, opacityFactor)));\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// BoundaryEnhancementVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getBoundaryEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",         new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "colorSteps",      new Fields .SFInt32 (4)),
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
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

         this .set_surfaceNormals__ ();
      },
      set_surfaceNormals__: function ()
      {
         this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "colorSteps_"      + this .getId (), this ._colorSteps      .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "orthogonalColor_" + this .getId (), this ._orthogonalColor .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "parallelColor_"   + this .getId (), this ._parallelColor   .copy ());

         if (this .surfaceNormalsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// CartoonVolumeStyle\n";
         string += "\n";
         string += "uniform int  colorSteps_" + this .getId () + ";\n";
         string += "uniform vec4 orthogonalColor_" + this .getId () + ";\n";
         string += "uniform vec4 parallelColor_" + this .getId () + ";\n";

         string += this .getNormalText (this .surfaceNormalsNode);

         string += "\n";
         string += "vec3\n";
         string += "rgb2hsv_" + this .getId () + " (in vec3 color)\n";
         string += "{\n";
         string += "	float h = 0.0;\n";
         string += "	float s = 0.0;\n";
         string += "	float v = 0.0;\n";
         string += "\n";
         string += "	float min = min (min (color .r, color .g), color .b);\n";
         string += "	float max = max (max (color .r, color .g), color .b);\n";
         string += "	v = max; // value\n";
         string += "\n";
         string += "	float delta = max - min;\n";
         string += "\n";
         string += "	if (max != 0.0 && delta != 0.0)\n";
         string += "	{\n";
         string += "		s = delta / max; // s\n";
         string += "\n";
         string += "		if (color .r == max)\n";
         string += "			h =     (color .g - color .b) / delta;  // between yellow & magenta\n";
         string += "		else if (color .g == max)\n";
         string += "			h = 2.0 + (color .b - color .r) / delta;  // between cyan & yellow\n";
         string += "		else\n";
         string += "			h = 4.0 + (color .r - color .g) / delta;  // between magenta & cyan\n";
         string += "\n";
         string += "		h *= M_PI / 3.0;  // radiants\n";
         string += "		if (h < 0.0)\n";
         string += "			h += M_PI * 2.0;\n";
         string += "	}\n";
         string += "	else\n";
         string += "		s = h = 0.0;         // s = 0, h is undefined\n";
         string += "\n";
         string += "	return vec3 (h, s, v);\n";
         string += "}\n";

         string += "\n";
         string += "vec3\n";
         string += "hsv2rgb_" + this .getId () + " (in vec3 hsv)\n";
         string += "{\n";
         string += "	float h = hsv [0];\n";
         string += "	float s = clamp (hsv [1], 0.0, 1.0);\n";
         string += "	float v = clamp (hsv [2], 0.0, 1.0);\n";
         string += "\n";
         string += "	// H is given on [0, 2 * Pi]. S and V are given on [0, 1].\n";
         string += "	// RGB are each returned on [0, 1].\n";
         string += "\n";
         string += "	if (s == 0.0)\n";
         string += "	{\n";
         string += "		// achromatic (grey)\n";
         string += "		return vec3 (v, v, v);\n";
         string += "	}\n";
         string += "	else\n";
         string += "	{\n";
         string += "		float w = (h * (180.0 / M_PI)) / 60.0;     // sector 0 to 5\n";
         string += "\n";
         string += "		float i = floor (w);\n";
         string += "		float f = w - i;                      // factorial part of h\n";
         string += "		float p = v * ( 1.0 - s );\n";
         string += "		float q = v * ( 1.0 - s * f );\n";
         string += "		float t = v * ( 1.0 - s * ( 1.0 - f ) );\n";
         string += "\n";
         string += "		switch (int (i) % 6)\n";
         string += "		{\n";
         string += "			case 0:  return vec3 (v, t, p);\n";
         string += "			case 1:  return vec3 (q, v, p);\n";
         string += "			case 2:  return vec3 (p, v, t);\n";
         string += "			case 3:  return vec3 (p, q, v);\n";
         string += "			case 4:  return vec3 (t, p, v);\n";
         string += "			default: return vec3 (v, p, q);\n";
         string += "		}\n";
         string += "	}\n";
         string += "\n";
         string += "	return vec3 (0.0);\n";
         string += "}\n";

         string += "\n";
         string += "vec3\n";
         string += "mix_hsv_" + this .getId () + " (in vec3 a, in vec3 b, in float t)\n";
         string += "{\n";
         string += "	// Linearely interpolate in HSV space between source color @a a and destination color @a b by an amount of @a t.\n";
         string += "	// Source and destination color must be in HSV space.\n";
         string += "\n";
         string += "	float ha = a [0];\n";
         string += "	float sa = a [1];\n";
         string += "	float va = a [2];\n";
         string += "\n";
         string += "	float hb = b [0];\n";
         string += "	float sb = b [1];\n";
         string += "	float vb = b [2];\n";
         string += "\n";
         string += "	if (sa == 0.0)\n";
         string += "		ha = hb;\n";
         string += "\n";
         string += "	if (sb == 0.0)\n";
         string += "		hb = ha;\n";
         string += "\n";
         string += "	float range = abs (hb - ha);\n";
         string += "\n";
         string += "	if (range <= M_PI)\n";
         string += "	{\n";
         string += "		float h = ha + t * (hb - ha);\n";
         string += "		float s = sa + t * (sb - sa);\n";
         string += "		float v = va + t * (vb - va);\n";
         string += "		return vec3 (h, s, v);\n";
         string += "	}\n";
         string += "\n";
         string += "	float PI2  = M_PI * 2.0;\n";
         string += "	float step = (PI2 - range) * t;\n";
         string += "	float h    = ha < hb ? ha - step : ha + step;\n";
         string += "\n";
         string += "	if (h < 0.0)\n";
         string += "		h += PI2;\n";
         string += "\n";
         string += "	else if (h > PI2)\n";
         string += "		h -= PI2;\n";
         string += "\n";
         string += "	float s = sa + t * (sb - sa);\n";
         string += "	float v = va + t * (vb - va);\n";
         string += "	return vec3 (h, s, v);\n";
         string += "}\n";

         string += "\n";
         string += "vec4\n";
         string += "getCartoonStyle_" + this .getId () + " (in vec4 originalColor, vec3 texCoord)\n";
         string += "{\n";
         string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
         string += "\n";
         string += "	if (surfaceNormal .w == 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "\n";
         string += "	vec4 orthogonalColor = orthogonalColor_" + this .getId () + ";\n";
         string += "	vec4 parallelColor   = parallelColor_" + this .getId () + ";\n";
         string += "	int  colorSteps      = colorSteps_" + this .getId () + ";\n";
         string += "\n";
         string += "	float steps    = clamp (float (colorSteps), 1.0, 64.0);\n";
         string += "	float step     = M_PI / 2.0 / steps;\n";
         string += "	float cosTheta = min (dot (surfaceNormal .xyz, normalize (vertex)), 1.0);\n";
         string += "\n";
         string += "	if (cosTheta < 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "\n";
         string += "	float t             = cos (min (floor (acos (cosTheta) / step) * (steps > 1.0 ? steps / (steps - 1.0) : 1.0), steps) * step);\n";
         string += "	vec3  orthogonalHSV = rgb2hsv_" + this .getId () + " (orthogonalColor .rgb);\n";
         string += "	vec3  parallelHSV   = rgb2hsv_" + this .getId () + " (parallelColor .rgb);\n";
         string += "\n";
         string += "	return vec4 (hsv2rgb_" + this .getId () + " (mix_hsv_" + this .getId () + " (orthogonalHSV, parallelHSV, t)), originalColor .a);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// CartoonVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getCartoonStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
{
"use strict";

   function ComposedVolumeStyle (executionContext)
   {
      X3DComposableVolumeRenderStyleNode .call (this, executionContext);

      this .addType (X3DConstants .ComposedVolumeStyle);

      this .renderStyleNodes = [ ];
   }

   ComposedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
   {
      constructor: ComposedVolumeStyle,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",     new Fields .SFBool (true)),
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
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._renderStyle .addInterest ("set_renderStyle__", this);

         this .set_renderStyle__ ();
      },
      addVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addVolumeData (volumeDataNode);
         }
      },
      removeVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeVolumeData (volumeDataNode);
         }
      },
      set_renderStyle__: function ()
      {
         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               renderStyleNode .removeVolumeData (volumeDataNode);
            });
         }

         renderStyleNodes .length = 0;

         for (var i = 0, length = this ._renderStyle .length; i < length; ++ i)
         {
            var renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this ._renderStyle [i]);

            if (renderStyleNode)
               renderStyleNodes .push (renderStyleNode);
         }

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addInterest ("addNodeEvent", this);

            this .getVolumeData () .forEach (function (volumeDataNode)
            {
               renderStyleNode .addVolumeData (volumeDataNode);
            });
         }
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            renderStyleNodes [i] .addShaderFields (shaderNode);
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var
            renderStyleNodes = this .renderStyleNodes,
            string           = "";

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            string += renderStyleNodes [i] .getUniformsText ();

         string += "\n";
         string += "vec4\n";
         string += "getComposedStyle_" + this .getId () + " (in vec4 textureColor, in vec3 texCoord)\n";
         string += "{\n";

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
            string += renderStyleNodes [i] .getFunctionsText ();

         string += "\n";
         string += "	return textureColor;\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// ComposedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getComposedStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
      }
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "edgeColor",         new Fields .SFColorRGBA (0, 0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "gradientThreshold", new Fields .SFFloat (0.4)),
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
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

         this .set_surfaceNormals__ ();
      },
      set_surfaceNormals__: function ()
      {
         this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "edgeColor_"         + this .getId (), this ._edgeColor         .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "gradientThreshold_" + this .getId (), this ._gradientThreshold .copy ());

         if (this .surfaceNormalsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// EdgeEnhancementVolumeStyle\n";
         string += "\n";
         string += "uniform vec4  edgeColor_" + this .getId () + ";\n";
         string += "uniform float gradientThreshold_" + this .getId () + ";\n";

         string += this .getNormalText (this .surfaceNormalsNode);

         string += "\n";
         string += "vec4\n";
         string += "getEdgeEnhacementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
         string += "\n";
         string += "	if (surfaceNormal .w == 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "\n";
         string += "	vec4  edgeColor         = edgeColor_" + this .getId () + ";\n";
         string += "	float gradientThreshold = gradientThreshold_" + this .getId () + ";\n";
         string += "\n";
         string += "	float angle = abs (dot (surfaceNormal .xyz, normalize (vertex)));\n";
         string += "\n";
         string += "	if (angle >= cos (gradientThreshold))\n";
         string += "		return originalColor;\n";
         string += "	else\n";
         string += "		return vec4 (mix (edgeColor .rgb, originalColor.rgb, angle), originalColor .a);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// EdgeEnhancementVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getEdgeEnhacementStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DConstants",
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

      this .proximitySensorNode   = executionContext .createNode ("ProximitySensor",     false);
      this .transformNode         = executionContext .createNode ("Transform",           false);
      this .shapeNode             = executionContext .createNode ("Shape",               false);
      this .appearanceNode        = executionContext .createNode ("Appearance",          false);
      this .textureTransformNode  = executionContext .createNode ("TextureTransform3D",  false);
      this .geometryNode          = executionContext .createNode ("QuadSet",             false);
      this .textureCoordinateNode = executionContext .createNode ("TextureCoordinate3D", false);
      this .coordinateNode        = executionContext .createNode ("Coordinate",          false);

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

         var
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         browser .getBrowserOptions () ._TextureQuality .addInterest ("set_dimensions__", this);

         if (gl .getVersion () >= 2)
         {
            this ._dimensions .addInterest ("set_dimensions__", this);

            this .set_dimensions__ ();
         }

         this .appearanceNode .setPrivate (true);

         this .proximitySensorNode ._size         = new Fields .SFVec3f (-1, -1, -1);
         this .transformNode ._children           = new Fields .MFNode (this .shapeNode);
         this .shapeNode ._appearance             = this .appearanceNode;
         this .shapeNode ._geometry               = this .geometryNode;
         this .appearanceNode ._alphaMode         = "BLEND";
         this .appearanceNode ._textureTransform  = this .textureTransformNode;
         this .textureTransformNode ._translation = new Fields .SFVec3f (0.5, 0.5, 0.5);
         this .textureTransformNode ._center      = new Fields .SFVec3f (-0.5, -0.5, -0.5);
         this .geometryNode ._texCoord            = this .textureCoordinateNode;
         this .geometryNode ._coord               = this .coordinateNode;

         this .coordinateNode        .setup ();
         this .textureCoordinateNode .setup ();
         this .geometryNode          .setup ();
         this .textureTransformNode  .setup ();
         this .appearanceNode        .setup ();
         this .shapeNode             .setup ();
         this .transformNode         .setup ();
         this .proximitySensorNode   .setup ();

         this .proximitySensorNode ._orientation_changed .addFieldInterest (this .transformNode ._rotation);
         this .proximitySensorNode ._orientation_changed .addFieldInterest (this .textureTransformNode ._rotation);

         this .textureTransformNode .addInterest ("set_textureTransform__", this);
      },
      getBBox: function (bbox, shadow)
      {
         if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
            return bbox .set (this ._dimensions .getValue (), Vector3 .Zero);

         return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      },
      getAppearance: function ()
      {
         return this .appearanceNode;
      },
      setShader: function (shaderNode)
      {
         this .getAppearance () ._shaders [0] = shaderNode;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureNormalMatrix" , new Fields .SFMatrix3f ());
         shaderNode .setup ();

         this .set_textureTransform__ ();
      },
      getShader: function ()
      {
         var node = this .appearanceNode ._shaders [0];

         if (node)
            return node .getValue ();

         return null;
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
            size       = this ._dimensions .getValue () .magnitude (),
            size1_2    = size / 2,
            points     = [ ];

         this .coordinateNode ._point .length = 0;

         for (var i = 0; i < NUM_PLANES; ++ i)
         {
            var z = i / (NUM_PLANES - 1) - 0.5;

            points .push ( size1_2,  size1_2, size * z,
                          -size1_2,  size1_2, size * z,
                          -size1_2, -size1_2, size * z,
                           size1_2, -size1_2, size * z);
         }

         this .coordinateNode ._point        = points;
         this .textureCoordinateNode ._point = points;

         this .textureTransformNode ._scale = new Fields .SFVec3f (1 / this ._dimensions .x, 1 / this ._dimensions .y, 1 / this ._dimensions .z);
      },
      set_textureTransform__: function ()
      {
         var shaderNode = this .getShader ();

         if (shaderNode)
         {
            var invTextureMatrix = shaderNode .getField ("x3d_TextureNormalMatrix");

            invTextureMatrix .setValue (this .textureTransformNode .getMatrix () .submatrix .inverse () .transpose ());
         }
      },
      traverse: function (type, renderObject)
      {
         this .proximitySensorNode .traverse (type, renderObject);
         this .transformNode       .traverse (type, renderObject);
      }
   });

   return X3DVolumeDataNode;
});


define('text!x_ite/Browser/VolumeRendering/VolumeStyle.vs',[],function () { return '#version 300 es\n\nprecision highp float;\nprecision highp int;\n\nuniform mat4 x3d_ProjectionMatrix;\nuniform mat4 x3d_ModelViewMatrix;\nuniform mat4 x3d_TextureMatrix [1];\n\nin float x3d_FogDepth;\nin vec4  x3d_TexCoord0;\nin vec4  x3d_Vertex;\n\nout float fogDepth;\nout vec3 vertex;\nout vec4 texCoord;\n\nvoid\nmain ()\n{\n   vec4 position = x3d_ModelViewMatrix * x3d_Vertex;\n\n   fogDepth = x3d_FogDepth;\n   vertex   = position .xyz;\n   texCoord = x3d_TextureMatrix [0] * x3d_TexCoord0;\n\n   gl_Position = x3d_ProjectionMatrix * position;\n}\n';});


define('text!x_ite/Browser/VolumeRendering/VolumeStyle.fs',[],function () { return '#version 300 es\n\nprecision highp float;\nprecision highp int;\nprecision highp sampler3D;\n\nuniform int x3d_NumLights;\nuniform x3d_LightSourceParameters x3d_LightSource [x3d_MaxLights];\n\nuniform int       x3d_NumTextures;\nuniform sampler3D x3d_Texture3D [1];\nuniform vec3      x3d_TextureSize;\n\nuniform mat3 x3d_TextureNormalMatrix;\n\nconst float M_PI = 3.14159265359;\n\nin float fogDepth;\nin vec3  vertex;\nin vec4  texCoord;\n\n\nuniform x3d_FogParameters x3d_Fog;\n\nfloat\ngetFogInterpolant ()\n{\n   // Returns 0.0 for fog color and 1.0 for material color.\n\n   if (x3d_Fog .type == x3d_None)\n      return 1.0;\n\n   if (x3d_Fog .fogCoord)\n      return clamp (1.0 - fogDepth, 0.0, 1.0);\n\n   float visibilityRange = x3d_Fog .visibilityRange;\n\n   if (visibilityRange <= 0.0)\n      return 1.0;\n\n   float dV = length (x3d_Fog .matrix * vertex);\n\n   if (dV >= visibilityRange)\n      return 0.0;\n\n   switch (x3d_Fog .type)\n   {\n      case x3d_LinearFog:\n      {\n         return (visibilityRange - dV) / visibilityRange;\n      }\n      case x3d_ExponentialFog:\n      {\n         return exp (-dV / (visibilityRange - dV));\n      }\n      default:\n      {\n         return 1.0;\n      }\n   }\n}\n\nvec3\ngetFogColor (const in vec3 color)\n{\n   return mix (x3d_Fog .color, color, getFogInterpolant ());\n}\n\n// VOLUME_STYLES_UNIFORMS\n\nout vec4 x3d_FragColor;\n\n\nuniform int  x3d_NumClipPlanes;\nuniform vec4 x3d_ClipPlane [x3d_MaxClipPlanes];\n\nvoid\nclip ()\n{\n   for (int i = 0; i < x3d_MaxClipPlanes; ++ i)\n   {\n      if (i == x3d_NumClipPlanes)\n         break;\n\n      if (dot (vertex, x3d_ClipPlane [i] .xyz) - x3d_ClipPlane [i] .w < 0.0)\n         discard;\n   }\n}\n\nvec4\ngetTextureColor (in vec3 texCoord)\n{\n   if (x3d_NumTextures == 0)\n      discard;\n\n   if (texCoord .s < 0.0 || texCoord .s > 1.0)\n      discard;\n\n   if (texCoord .t < 0.0 || texCoord .t > 1.0)\n      discard;\n\n   if (texCoord .p < 0.0 || texCoord .p > 1.0)\n      discard;\n\n   vec4 textureColor = texture (x3d_Texture3D [0], texCoord);\n\n   // Apply volume styles.\n\n// VOLUME_STYLES_FUNCTIONS\n\n   return textureColor;\n}\n\nvoid\nmain ()\n{\n   clip ();\n\n   x3d_FragColor = getTextureColor (texCoord .stp / texCoord .q);\n}\n';});

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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DVolumeDataNode",
   "x_ite/Components/Shaders/ComposedShader",
   "x_ite/Components/Shaders/ShaderPart",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.vs",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.fs",
   "x_ite/DEBUG",
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
          fs,
          DEBUG)
{
"use strict";

   function IsoSurfaceVolumeData (executionContext)
   {
      X3DVolumeDataNode .call (this, executionContext);

      this .addType (X3DConstants .IsoSurfaceVolumeData);

      this .renderStyleNodes = [ ];
   }

   IsoSurfaceVolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
   {
      constructor: IsoSurfaceVolumeData,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",       new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "contourStepSize",  new Fields .SFFloat (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceValues",    new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceTolerance", new Fields .SFFloat (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "gradients",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",           new Fields .SFNode ()),
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
      initialize: function ()
      {
         X3DVolumeDataNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._gradients          .addInterest ("set_gradients__",   this);
         this ._renderStyle        .addInterest ("set_renderStyle__", this);
         this ._voxels             .addFieldInterest (this .getAppearance () ._texture);

         this ._contourStepSize    .addInterest ("update", this);
         this ._surfaceValues      .addInterest ("update", this);
         this ._surfaceTolerance   .addInterest ("update", this);
         this ._renderStyle        .addInterest ("update", this);

         this .getAppearance () ._texture = this ._voxels;

         this .set_gradients__ ();
         this .set_renderStyle__ ();
         this .set_voxels__ ();

         this .update ();
      },
      set_gradients__: function ()
      {
         this .gradientsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._gradients);
      },
      set_renderStyle__: function ()
      {
         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeInterest ("update", this);
            renderStyleNode .removeVolumeData (this);
         }

         renderStyleNodes .length = 0;

         for (var i = 0, length = this ._renderStyle .length; i < length; ++ i)
         {
            var renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this ._renderStyle [i]);

            if (renderStyleNode)
               renderStyleNodes .push (renderStyleNode);
         }

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addInterest ("update", this);
            renderStyleNode .addVolumeData (this);
         }
      },
      set_voxels__: function ()
      {
         if (this .voxelsNode)
            this .voxelsNode .removeInterest ("set_textureSize__", this);

         this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);

         if (this .voxelsNode)
         {
            this .voxelsNode .addInterest ("set_textureSize__", this);

            this .set_textureSize__ ();
         }
      },
      set_textureSize__: function ()
      {
         try
         {
            var textureSize = this .getShader () .getField ("x3d_TextureSize");

            textureSize .x = this .voxelsNode .getWidth ();
            textureSize .y = this .voxelsNode .getHeight ();
            textureSize .z = this .voxelsNode .getDepth ();
         }
         catch (error)
         {
            if (DEBUG)
               console .log (error .message);
         }
      },
      update: function ()
      {
         this .setShader (this .createShader (vs, fs));
      },
      createShader: function (vs, fs)
      {
         // if (DEBUG)
         // 	console .log ("Creating VolumeData Shader ...");

         var
            opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
            styleUniforms         = opacityMapVolumeStyle .getUniformsText (),
            styleFunctions        = opacityMapVolumeStyle .getFunctionsText ();

         styleUniforms  += "\n";
         styleUniforms  += "uniform float surfaceValues [" + this ._surfaceValues .length + "];\n";
         styleUniforms  += "uniform float surfaceTolerance;\n";

         for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
            styleUniforms  += this .renderStyleNodes [i] .getUniformsText ();

         styleFunctions += "\n";
         styleFunctions += "	// IsoSurfaceVolumeData\n";
         styleFunctions += "\n";

         if (this .gradientsNode)
         {
            styleUniforms += "\n";
            styleUniforms += "uniform sampler3D gradients;\n";

            styleFunctions += "	if (length (texture (gradients, texCoord) .xyz * 2.0 - 1.0) < surfaceTolerance)\n";
            styleFunctions += "		discard;\n";
         }
         else
         {
            styleUniforms += "\n";
            styleUniforms += "vec4\n";
            styleUniforms += "getNormal (in vec3 texCoord)\n";
            styleUniforms += "{\n";
            styleUniforms += "	vec4  offset = vec4 (1.0 / x3d_TextureSize, 0.0);\n";
            styleUniforms += "	float i0     = texture (x3d_Texture3D [0], texCoord + offset .xww) .r;\n";
            styleUniforms += "	float i1     = texture (x3d_Texture3D [0], texCoord - offset .xww) .r;\n";
            styleUniforms += "	float i2     = texture (x3d_Texture3D [0], texCoord + offset .wyw) .r;\n";
            styleUniforms += "	float i3     = texture (x3d_Texture3D [0], texCoord - offset .wyw) .r;\n";
            styleUniforms += "	float i4     = texture (x3d_Texture3D [0], texCoord + offset .wwz) .r;\n";
            styleUniforms += "	float i5     = texture (x3d_Texture3D [0], texCoord - offset .wwz) .r;\n";
            styleUniforms += "	vec3  n      = vec3 (i1 - i0, i3 - i2, i5 - i4);\n";
            styleUniforms += "\n";
            styleUniforms += "	return vec4 (normalize (x3d_TextureNormalMatrix * n), length (n));\n";
            styleUniforms += "}\n";

            styleFunctions += "	if (getNormal (texCoord) .w < surfaceTolerance)\n";
            styleFunctions += "		discard;\n";
         }

         styleFunctions += "\n";
         styleFunctions += "	float intensity = textureColor .r;\n";
         styleFunctions += "\n";

         if (this ._surfaceValues .length === 1)
         {
            var contourStepSize = Math .abs (this ._contourStepSize .getValue ());

            if (contourStepSize === 0)
            {
               styleFunctions += "	if (intensity > surfaceValues [0])\n";
               styleFunctions += "	{\n";
               styleFunctions += "		textureColor = vec4 (vec3 (surfaceValues [0]), 1.0);\n";

               if (this .renderStyleNodes .length)
               {
                  styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
               }

               styleFunctions += "	}\n";
               styleFunctions += "	else\n";
               styleFunctions += "	{\n";
               styleFunctions += "		discard;\n";
               styleFunctions += "	}\n";
               styleFunctions += "\n";
            }
            else
            {
               var surfaceValues = [ ];

               for (var v = this ._surfaceValues [0] - contourStepSize; v > 0; v -= contourStepSize)
                  surfaceValues .unshift (v);

               surfaceValues .push (this ._surfaceValues [0]);

               for (var v = this ._surfaceValues [0] + contourStepSize; v < 1; v += contourStepSize)
                  surfaceValues .push (v);

               styleFunctions += "	if (false)\n";
               styleFunctions += "	{ }\n";

               for (var i = surfaceValues_ .length - 1; i >= 0; -- i)
               {
                  styleFunctions += "	else if (intensity > " + surfaceValues [i] + ")\n";
                  styleFunctions += "	{\n";
                  styleFunctions += "		textureColor = vec4 (vec3 (" + surfaceValues [i] + "), 1.0);\n";

                  if (this .renderStyleNodes .length)
                  {
                     styleFunctions += this .renderStyleNodes [0] .getFunctionsText ();
                  }

                  styleFunctions += "	}\n";
               }

               styleFunctions += "	else\n";
               styleFunctions += "	{\n";
               styleFunctions += "		discard;\n";
               styleFunctions += "	}\n";
               styleFunctions += "\n";
            }
         }
         else
         {
            styleFunctions += "	if (false)\n";
            styleFunctions += "	{ }\n";

            for (var i = this ._surfaceValues .length - 1; i >= 0; -- i)
            {
               styleFunctions += "	else if (intensity > surfaceValues [" + i + "])\n";
               styleFunctions += "	{\n";
               styleFunctions += "		textureColor = vec4 (vec3 (surfaceValues [" + i + "]), 1.0);\n";

               if (this .renderStyleNodes .length)
               {
                  var r = Math .min (i, this .renderStyleNodes .length - 1);

                  styleFunctions += this .renderStyleNodes [r] .getFunctionsText ();
               }

               styleFunctions += "	}\n";
            }

            styleFunctions += "	else\n";
            styleFunctions += "	{\n";
            styleFunctions += "		discard;\n";
            styleFunctions += "	}\n";
            styleFunctions += "\n";
         }

         fs = fs .replace (/\/\/ VOLUME_STYLES_UNIFORMS\n/,  styleUniforms);
         fs = fs .replace (/\/\/ VOLUME_STYLES_FUNCTIONS\n/, styleFunctions);

         // if (DEBUG)
         // 	this .getBrowser () .print (fs);

         var vertexShader = new ShaderPart (this .getExecutionContext ());
         vertexShader .setName ("VolumeDataVertexShader");
         vertexShader ._url .push ("data:x-shader/x-vertex," + vs);
         vertexShader .setup ();

         var fragmentShader = new ShaderPart (this .getExecutionContext ());
         fragmentShader .setName ("VolumeDataFragmentShader");
         fragmentShader ._type = "FRAGMENT";
         fragmentShader ._url .push ("data:x-shader/x-fragment," + fs);
         fragmentShader .setup ();

         var shaderNode = new ComposedShader (this .getExecutionContext ());
         shaderNode .setName ("VolumeDataShader");
         shaderNode ._language = "GLSL";
         shaderNode ._parts .push (vertexShader);
         shaderNode ._parts .push (fragmentShader);

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceValues",    this ._surfaceValues    .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceTolerance", this ._surfaceTolerance .copy ());

         if (this .gradientsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "grandients", new Fields .SFNode (this .gradientsNode));

         if (this .voxelsNode)
         {
            var textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", textureSize);
         }
         else
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", new Fields .SFVec3f ());
         }

         opacityMapVolumeStyle .addShaderFields (shaderNode);

         for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
            this .renderStyleNodes [i] .addShaderFields (shaderNode);

         return shaderNode;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .SFString ("MAX")),
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
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "intensityThreshold_" + this .getId (), this ._intensityThreshold .copy ());
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// ProjectionVolumeStyle\n";
         string += "\n";
         string += "uniform float intensityThreshold_" + this .getId () + ";\n";

         string += "\n";
         string += "vec4\n";
         string += "getProjectionStyle_" + this .getId () + "(in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         switch (this ._type .getValue ())
         {
            default:
            case "MAX":
            {
               string += "	float projectionColor = 0.0;\n";
               break;
            }
            case "MIN":
            {
               string += "	float projectionColor = 1.0;\n";
               break;
            }
            case "AVERAGE":
            {
               string += "	float projectionColor = 0.0;\n";
               break;
            }
         }

         string += "	const int samples     = 32;\n";
         string += "	vec3  step            = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0)) / float (samples);\n";
         string += "	vec3  ray             = texCoord - step * float (samples) * 0.5;\n";
         string += "	bool  first           = false;\n";
         string += "\n";
         string += "	for (int i = 0; i < samples; ++ i, ray += step)\n";
         string += "	{\n";
         string += "		if (ray .s < 0.0 || ray .s > 1.0)\n";
         string += "			continue;\n";
         string += "\n";
         string += "		if (ray .t < 0.0 || ray .t > 1.0)\n";
         string += "			continue;\n";
         string += "\n";
         string += "		if (ray .p < 0.0 || ray .p > 1.0)\n";
         string += "			continue;\n";
         string += "\n";
         string += "		float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
         string += "\n";

         switch (this ._type .getValue ())
         {
            default:
            case "MAX":
            {
               string += "		if (intensity < intensityThreshold_" + this .getId () + ")\n";
               string += "			continue;\n";
               string += "\n";
               string += "		if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
               string += "			break;\n";
               string += "\n";
               string += "		if (intensity <= projectionColor)\n";
               string += "		{\n";
               string += "			first = true;\n";
               string += "			continue;\n";
               string += "		}\n";
               string += "\n";
               string += "		projectionColor = intensity;\n";
               break;
            }
            case "MIN":
            {
               string += "		if (intensity < intensityThreshold_" + this .getId () + ")\n";
               string += "			continue;\n";
               string += "\n";
               string += "		if (intensityThreshold_" + this .getId () + " > 0.0 && first)\n";
               string += "			break;\n";
               string += "\n";
               string += "		if (intensity >= projectionColor)\n";
               string += "		{\n";
               string += "			first = true;\n";
               string += "			continue;\n";
               string += "		}\n";
               string += "\n";
               string += "		projectionColor = intensity;\n";
               break;
            }
            case "AVERAGE":
            {
               string += "		projectionColor += intensity;\n";
               break;
            }
         }

         string += "	}\n";
         string += "\n";

         if (this ._type .getValue () === "AVERAGE")
            string += "	projectionColor /= float (samples);\n";

         string += "	return vec4 (vec3 (projectionColor), originalColor .a);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// ProjectionVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getProjectionStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DVolumeDataNode",
   "x_ite/Components/Shaders/ComposedShader",
   "x_ite/Components/Shaders/ShaderPart",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.vs",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.fs",
   "x_ite/DEBUG",
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
          fs,
          DEBUG)
{
"use strict";

   function SegmentedVolumeData (executionContext)
   {
      X3DVolumeDataNode .call (this, executionContext);

      this .addType (X3DConstants .SegmentedVolumeData);

      this .segmentIdentifiersNode = null;
      this .renderStyleNodes       = [ ];
   }

   SegmentedVolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
   {
      constructor: SegmentedVolumeData,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",         new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentEnabled",     new Fields .MFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",         new Fields .SFVec3f (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",           new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "segmentIdentifiers", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle",        new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",             new Fields .SFNode ()),
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
      initialize: function ()
      {
         X3DVolumeDataNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._segmentIdentifiers .addInterest ("set_segmentIdentifiers__", this);
         this ._renderStyle        .addInterest ("set_renderStyle__",        this);
         this ._voxels             .addFieldInterest (this .getAppearance () ._texture);

         this ._segmentEnabled     .addInterest ("update", this);
         this ._segmentIdentifiers .addInterest ("update", this);
         this ._renderStyle        .addInterest ("update", this);

         this .getAppearance () ._texture = this ._voxels;

         this .set_segmentIdentifiers__ ();
         this .set_renderStyle__ ();
         this .set_voxels__ ();

         this .update ();
      },
      getSegmentEnabled: function (index)
      {
         return index < this ._segmentEnabled .length ? this ._segmentEnabled [index] : true;
      },
      set_segmentIdentifiers__: function ()
      {
         this .segmentIdentifiersNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._segmentIdentifiers);
      },
      set_renderStyle__: function ()
      {
         var renderStyleNodes = this .renderStyleNodes;

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .removeInterest ("update", this);
            renderStyleNode .removeVolumeData (this);
         }

         renderStyleNodes .length = 0;

         for (var i = 0, length = this ._renderStyle .length; i < length; ++ i)
         {
            var renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this ._renderStyle [i]);

            if (renderStyleNode)
               renderStyleNodes .push (renderStyleNode);
         }

         for (var i = 0, length = renderStyleNodes .length; i < length; ++ i)
         {
            var renderStyleNode = renderStyleNodes [i];

            renderStyleNode .addInterest ("update", this);
            renderStyleNode .addVolumeData (this);
         }
      },
      set_voxels__: function ()
      {
         if (this .voxelsNode)
            this .voxelsNode .removeInterest ("set_textureSize__", this);

         this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);

         if (this .voxelsNode)
         {
            this .voxelsNode .addInterest ("set_textureSize__", this);

            this .set_textureSize__ ();
         }
      },
      set_textureSize__: function ()
      {
         try
         {
            var textureSize = this .getShader () .getField ("x3d_TextureSize");

            textureSize .x = this .voxelsNode .getWidth ();
            textureSize .y = this .voxelsNode .getHeight ();
            textureSize .z = this .voxelsNode .getDepth ();
         }
         catch (error)
         {
            if (DEBUG)
               console .log (error .message);
         }
      },
      update: function ()
      {
         this .setShader (this .createShader (vs, fs));
      },
      createShader: function (vs, fs)
      {
         // if (DEBUG)
         // 	console .log ("Creating SegmentedVolumeData Shader ...");

         var
            opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
            styleUniforms         = opacityMapVolumeStyle .getUniformsText (),
            styleFunctions        = opacityMapVolumeStyle .getFunctionsText ();

         if (this .segmentIdentifiersNode)
         {
            styleUniforms  += "\n";
            styleUniforms  += "uniform sampler3D segmentIdentifiers;\n";
            styleFunctions += "\n";

            styleFunctions += "\n";
            styleFunctions += "	int segment = int (texture (segmentIdentifiers, texCoord) .r * 255.0);\n";
         }
         else
         {
            styleFunctions += "	int segment = 0;\n";
         }

         if (this .renderStyleNodes .length)
         {
            styleFunctions += "\n";
            styleFunctions += "	switch (segment)\n";
            styleFunctions += "	{\n";

            for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
            {
               styleFunctions += "		case " + i + ":\n";
               styleFunctions += "		{\n";

               if (this .getSegmentEnabled (i))
               {
                  styleUniforms  += this .renderStyleNodes [i] .getUniformsText (),
                  styleFunctions += this .renderStyleNodes [i] .getFunctionsText ();
                  styleFunctions += "			break;\n";
               }
               else
               {
                  styleFunctions += "			discard;\n";
               }

               styleFunctions += "		}\n";
            }

            styleFunctions += "	}\n";
         }

         fs = fs .replace (/\/\/ VOLUME_STYLES_UNIFORMS\n/,  styleUniforms);
         fs = fs .replace (/\/\/ VOLUME_STYLES_FUNCTIONS\n/, styleFunctions);

         // if (DEBUG)
         // 	this .getBrowser () .print (fs);

         var vertexShader = new ShaderPart (this .getExecutionContext ());
         vertexShader .setName ("SegmentedVolumeDataVertexShader");
         vertexShader ._url .push ("data:x-shader/x-vertex," + vs);
         vertexShader .setup ();

         var fragmentShader = new ShaderPart (this .getExecutionContext ());
         fragmentShader .setName ("SegmentedVolumeDataFragmentShader");
         fragmentShader ._type = "FRAGMENT";
         fragmentShader ._url .push ("data:x-shader/x-fragment," + fs);
         fragmentShader .setup ();

         var shaderNode = new ComposedShader (this .getExecutionContext ());
         shaderNode .setName ("SegmentedVolumeDataShader");
         shaderNode ._language = "GLSL";
         shaderNode ._parts .push (vertexShader);
         shaderNode ._parts .push (fragmentShader);

         if (this .voxelsNode)
         {
            var textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", textureSize);
         }
         else
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", new Fields .SFVec3f ());
         }

         if (this .segmentIdentifiersNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "segmentIdentifiers", new Fields .SFNode (this .segmentIdentifiersNode));

         opacityMapVolumeStyle .addShaderFields (shaderNode);

         for (var i = 0, length = this .renderStyleNodes .length; i < length; ++ i)
         {
            if (this .getSegmentEnabled (i))
               this .renderStyleNodes [i] .addShaderFields (shaderNode);
         }

         return shaderNode;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lighting",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",        new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "phaseFunction",  new Fields .SFString ("Henyey-Greenstein")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "material",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "surfaceNormals", new Fields .SFNode ()),
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
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._material       .addInterest ("set_material__",       this);
         this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

         this .set_material__ ();
         this .set_surfaceNormals__ ();
      },
      set_material__: function ()
      {
         if (this .materialNode)
            this .materialNode .removeInterest ("addNodeEvent", this);

         this .materialNode = X3DCast (X3DConstants .X3DMaterialNode, this ._material);

         if (this .materialNode)
            this .materialNode .addInterest ("addNodeEvent", this);
      },
      set_surfaceNormals__: function ()
      {
         this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         if (this .materialNode)
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "ambientIntensity_" + this .getId (), this .materialNode ._ambientIntensity .copy ());
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "diffuseColor_"     + this .getId (), this .materialNode ._diffuseColor     .copy ());
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "specularColor_"    + this .getId (), this .materialNode ._specularColor    .copy ());
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "emissiveColor_"    + this .getId (), this .materialNode ._emissiveColor    .copy ());
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "shininess_"        + this .getId (), this .materialNode ._shininess        .copy ());
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "transparency_"     + this .getId (), this .materialNode ._transparency     .copy ());
         }

         if (this .surfaceNormalsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// ShadedVolumeStyle\n";
         string += "\n";
         string += "uniform float ambientIntensity_" + this .getId () + ";\n";
         string += "uniform vec3  diffuseColor_" + this .getId () + ";\n";
         string += "uniform vec3  specularColor_" + this .getId () + ";\n";
         string += "uniform vec3  emissiveColor_" + this .getId () + ";\n";
         string += "uniform float shininess_" + this .getId () + ";\n";
         string += "uniform float transparency_" + this .getId () + ";\n";

         string += this .getNormalText (this .surfaceNormalsNode);

         string += "\n";
         string += "float\n";
         string += "getSpotFactor_" + this .getId () + " (const in float cutOffAngle, const in float beamWidth, const in vec3 L, const in vec3 d)\n";
         string += "{\n";
         string += "	float spotAngle = acos (clamp (dot (-L, d), -1.0, 1.0));\n";
         string += "\n";
         string += "	if (spotAngle >= cutOffAngle)\n";
         string += "		return 0.0;\n";
         string += "	else if (spotAngle <= beamWidth)\n";
         string += "		return 1.0;\n";
         string += "\n";
         string += "	return (spotAngle - cutOffAngle) / (beamWidth - cutOffAngle);\n";
         string += "}\n";

         string += "\n";
         string += "vec4\n";
         string += "getShadedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
         string += "\n";
         string += "	if (surfaceNormal .w == 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "\n";
         string += "	vec4 shadedColor   = vec4 (0.0);\n";

         if (this ._lighting .getValue ())
         {
            if (this .materialNode)
            {
               string += "	vec3 diffuseFactor = diffuseColor_" + this .getId () + ";\n";
               string += "	vec3 ambientTerm   = diffuseFactor * ambientIntensity_" + this .getId () + ";\n";
               string += "\n";
               string += "	shadedColor .a = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
            }
            else
            {
               string += "	vec3 diffuseFactor = originalColor .rgb;\n";
               string += "	vec3 ambientTerm   = vec3 (0.0);\n";
               string += "\n";
               string += "	shadedColor .a = originalColor .a;\n";
            }

            string += "\n";
            string += "	vec3 N = surfaceNormal .xyz;\n";
            string += "	vec3 V = normalize (-vertex); // normalized vector from point on geometry to viewer's position\n";
            string += "\n";
            string += "	for (int i = 0; i < x3d_MaxLights; ++ i)\n";
            string += "	{\n";
            string += "		if (i == x3d_NumLights)\n";
            string += "			break;\n";
            string += "\n";
            string += "		x3d_LightSourceParameters light = x3d_LightSource [i];\n";
            string += "\n";
            string += "		vec3  vL = light .location - vertex; // Light to fragment\n";
            string += "		float dL = length (light .matrix * vL);\n";
            string += "		bool  di = light .type == x3d_DirectionalLight;\n";
            string += "\n";
            string += "		if (di || dL <= light .radius)\n";
            string += "		{\n";
            string += "			vec3 d = light .direction;\n";
            string += "			vec3 c = light .attenuation;\n";
            string += "			vec3 L = di ? -d : normalize (vL);      // Normalized vector from point on geometry to light source i position.\n";
            string += "			vec3 H = normalize (L + V);             // Specular term\n";
            string += "\n";
            string += "			float lightAngle     = max (dot (N, L), 0.0);      // Angle between normal and light ray.\n";
            string += "			vec3  diffuseTerm    = diffuseFactor * lightAngle;\n";
            string += "			float specularFactor = shininess_" + this .getId () + " > 0.0 ? pow (max (dot (N, H), 0.0), shininess_" + this .getId () + " * 128.0) : 1.0;\n";
            string += "			vec3  specularTerm   = light .intensity * specularColor_" + this .getId () + " * specularFactor;\n";
            string += "\n";
            string += "			float attenuationFactor     = di ? 1.0 : 1.0 / max (c [0] + c [1] * dL + c [2] * (dL * dL), 1.0);\n";
            string += "			float spotFactor            = light .type == x3d_SpotLight ? getSpotFactor_" + this .getId () + " (light .cutOffAngle, light .beamWidth, L, d) : 1.0;\n";
            string += "			float attenuationSpotFactor = attenuationFactor * spotFactor;\n";
            string += "			vec3  ambientColor          = light .ambientIntensity * ambientTerm;\n";
            string += "			vec3  diffuseSpecularColor  = light .intensity * (diffuseTerm + specularTerm);\n";
            string += "\n";
            string += "			shadedColor .rgb += attenuationSpotFactor * light .color * (ambientColor + diffuseSpecularColor);\n";
            string += "		}\n";
            string += "\n";
            string += "		shadedColor .rgb += emissiveColor_" + this .getId () + ";\n";
            string += "		shadedColor .rgb  = getFogColor (shadedColor .rgb);\n";
            string += "	}\n";
         }
         else
         {
            if (this .materialNode)
            {
               string += "	shadedColor .rgb = diffuseColor_" + this .getId () + ";\n";
               string += "	shadedColor .a   = originalColor .a * (1.0 - transparency_" + this .getId () + ");\n";
            }
            else
            {
               string += "	shadedColor = originalColor;\n";
            }
         }

         string += "\n";
         string += "	return shadedColor;\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// ShadedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getShadedStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast)
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteRetainedOpacity", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "silhouetteBoundaryOpacity", new Fields .SFFloat (0)),
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
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

         this .set_surfaceNormals__ ();
      },
      set_surfaceNormals__: function ()
      {
         this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteRetainedOpacity_" + this .getId (), this ._silhouetteRetainedOpacity .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteBoundaryOpacity_" + this .getId (), this ._silhouetteBoundaryOpacity .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "silhouetteSharpness_"       + this .getId (), this ._silhouetteSharpness       .copy ());

         if (this .surfaceNormalsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// SilhouetteEnhancementVolumeStyle\n";
         string += "\n";
         string += "uniform float silhouetteRetainedOpacity_" + this .getId () + ";\n";
         string += "uniform float silhouetteBoundaryOpacity_" + this .getId () + ";\n";
         string += "uniform float silhouetteSharpness_" + this .getId () + ";\n";

         string += this .getNormalText (this .surfaceNormalsNode);

         string += "\n";
         string += "vec4\n";
         string += "getSilhouetteEnhancementStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
         string += "\n";
         string += "	if (surfaceNormal .w == 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "	\n";
         string += "	float silhouetteRetainedOpacity = silhouetteRetainedOpacity_" + this .getId () + ";\n";
         string += "	float silhouetteBoundaryOpacity = silhouetteBoundaryOpacity_" + this .getId () + ";\n";
         string += "	float silhouetteSharpness       = silhouetteSharpness_" + this .getId () + ";\n";
         string += "\n";
         string += "	return vec4 (originalColor .rgb, originalColor .a * (silhouetteRetainedOpacity + silhouetteBoundaryOpacity * pow (1.0 - abs (dot (surfaceNormal .xyz, normalize (vertex))), silhouetteSharpness)));\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// SilhouetteEnhancementVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getSilhouetteEnhancementStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
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
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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

         this ._surfaceNormals .addInterest ("set_surfaceNormals__", this);

         this .set_surfaceNormals__ ();
      },
      set_surfaceNormals__: function ()
      {
         this .surfaceNormalsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._surfaceNormals);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "coolColor_" + this .getId (), this ._coolColor .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "warmColor_" + this .getId (), this ._warmColor .copy ());

         if (this .surfaceNormalsNode)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "surfaceNormals_" + this .getId (), new Fields .SFNode (this .surfaceNormalsNode));
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "// ToneMappedVolumeStyle\n";
         string += "\n";
         string += "uniform vec4 coolColor_" + this .getId () + ";\n";
         string += "uniform vec4 warmColor_" + this .getId () + ";\n";

         string += this .getNormalText (this .surfaceNormalsNode);

         string += "\n";
         string += "vec4\n";
         string += "getToneMappedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";
         string += "	vec4 surfaceNormal = getNormal_" + this .getId () + " (texCoord);\n";
         string += "\n";
         string += "	if (surfaceNormal .w == 0.0)\n";
         string += "		return vec4 (0.0);\n";
         string += "\n";
         string += "	vec3 toneColor = vec3 (0.0);\n";
         string += "	vec3 coolColor = coolColor_" + this .getId () + " .rgb;\n";
         string += "	vec3 warmColor = warmColor_" + this .getId () + " .rgb;\n";
         string += "\n";
         string += "	for (int i = 0; i < x3d_MaxLights; ++ i)\n";
         string += "	{\n";
         string += "		if (i == x3d_NumLights)\n";
         string += "			break;\n";
         string += "\n";
         string += "		x3d_LightSourceParameters light = x3d_LightSource [i];\n";
         string += "\n";
         string += "		vec3  L           = light .type == x3d_DirectionalLight ? -light .direction : normalize (light .location - vertex);\n";
         string += "		float colorFactor = (1.0 + dot (L, surfaceNormal .xyz)) * 0.5;\n";
         string += "\n";
         string += "		toneColor += mix (warmColor .rgb, coolColor .rgb, colorFactor);\n";
         string += "	}\n";
         string += "\n";
         string += "	return vec4 (toneColor, originalColor .a);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         var string = "";

         string += "\n";
         string += "	// ToneMappedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getToneMappedStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
      },
   });

   return ToneMappedVolumeStyle;
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


define ('x_ite/Components/VolumeRendering/VolumeData',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DVolumeDataNode",
   "x_ite/Components/Shaders/ComposedShader",
   "x_ite/Components/Shaders/ShaderPart",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.vs",
   "text!x_ite/Browser/VolumeRendering/VolumeStyle.fs",
   "x_ite/DEBUG",
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
          fs,
          DEBUG)
{
"use strict";

   function VolumeData (executionContext)
   {
      X3DVolumeDataNode .call (this, executionContext);

      this .addType (X3DConstants .VolumeData);

      this .renderStyleNode = null;
  }

   VolumeData .prototype = Object .assign (Object .create (X3DVolumeDataNode .prototype),
   {
      constructor: VolumeData,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",  new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "renderStyle", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "voxels",      new Fields .SFNode ()),
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

         this ._renderStyle .addInterest ("set_renderStyle__", this);
         this ._voxels      .addInterest ("set_voxels__",      this);
         this ._voxels      .addFieldInterest (this .getAppearance () ._texture);

         this ._renderStyle .addInterest ("update", this);

         this .getAppearance () ._texture   = this ._voxels;

         this .set_renderStyle__ ();
         this .set_voxels__ ();

         this .update ();
      },
      set_renderStyle__: function ()
      {
         if (this .renderStyleNode)
         {
            this .renderStyleNode .removeInterest ("update", this);
            this .renderStyleNode .removeVolumeData (this);
         }

         this .renderStyleNode = X3DCast (X3DConstants .X3DVolumeRenderStyleNode, this ._renderStyle);

         if (this .renderStyleNode)
         {
            this .renderStyleNode .addInterest ("update", this);
            this .renderStyleNode .addVolumeData (this);
         }
      },
      set_voxels__: function ()
      {
         if (this .voxelsNode)
            this .voxelsNode .removeInterest ("set_textureSize__", this);

         this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);

         if (this .voxelsNode)
         {
            this .voxelsNode .addInterest ("set_textureSize__", this);

            this .set_textureSize__ ();
         }
      },
      set_textureSize__: function ()
      {
         try
         {
            var textureSize = this .getShader () .getField ("x3d_TextureSize");

            textureSize .x = this .voxelsNode .getWidth ();
            textureSize .y = this .voxelsNode .getHeight ();
            textureSize .z = this .voxelsNode .getDepth ();
         }
         catch (error)
         {
            if (DEBUG)
               console .log (error .message);
         }
      },
      update: function ()
      {
         this .setShader (this .createShader (vs, fs));
      },
      createShader: function (vs, fs)
      {
         // if (DEBUG)
         // 	console .log ("Creating VolumeData Shader ...");

         var
            opacityMapVolumeStyle = this .getBrowser () .getDefaultVolumeStyle (),
            styleUniforms         = opacityMapVolumeStyle .getUniformsText (),
            styleFunctions        = opacityMapVolumeStyle .getFunctionsText ();

         if (this .renderStyleNode)
         {
            styleUniforms  += this .renderStyleNode .getUniformsText (),
            styleFunctions += this .renderStyleNode .getFunctionsText ();
         }

         fs = fs .replace (/\/\/ VOLUME_STYLES_UNIFORMS\n/,  styleUniforms);
         fs = fs .replace (/\/\/ VOLUME_STYLES_FUNCTIONS\n/, styleFunctions);

         // if (DEBUG)
         // 	this .getBrowser () .print (fs);

         var vertexShader = new ShaderPart (this .getExecutionContext ());
         vertexShader .setName ("VolumeDataVertexShader");
         vertexShader ._url .push ("data:x-shader/x-vertex," + vs);
         vertexShader .setup ();

         var fragmentShader = new ShaderPart (this .getExecutionContext ());
         fragmentShader .setName ("VolumeDataFragmentShader");
         fragmentShader ._type = "FRAGMENT";
         fragmentShader ._url .push ("data:x-shader/x-fragment," + fs);
         fragmentShader .setup ();

         var shaderNode = new ComposedShader (this .getExecutionContext ());
         shaderNode .setName ("VolumeDataShader");
         shaderNode ._language = "GLSL";
         shaderNode ._parts .push (vertexShader);
         shaderNode ._parts .push (fragmentShader);

         if (this .voxelsNode)
         {
            var textureSize = new Fields .SFVec3f (this .voxelsNode .getWidth (), this .voxelsNode .getHeight (), this .voxelsNode .getDepth ());

            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", textureSize);
         }
         else
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "x3d_TextureSize", new Fields .SFVec3f ());
         }

         opacityMapVolumeStyle .addShaderFields (shaderNode);

         if (this .renderStyleNode)
            this .renderStyleNode .addShaderFields (shaderNode);

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


define (require .getComponentUrl ("volume-rendering"), [
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
   require .getComponentUrl ("cad-geometry"),
   require .getComponentUrl ("texturing-3d"),
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
      context: X3DVolumeRenderingContext,
   });
});


})();
