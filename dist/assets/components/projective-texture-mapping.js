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


define ('x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode',[
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
],
function (X3DChildNode,
          X3DConstants,
          X3DCast,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

   function X3DTextureProjectorNode (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DTextureProjectorNode);

      this ._location    .setUnit ("length");
      this ._farDistance .setUnit ("length");
      this ._location    .setUnit ("length");
   }

   X3DTextureProjectorNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: X3DTextureProjectorNode,
      initialize: function ()
      {
         X3DChildNode .prototype .initialize .call (this);

         this ._on      .addInterest ("set_on__",      this);
         this ._texture .addInterest ("set_texture__", this);

         this .set_texture__ ();
      },
      getGlobal: function ()
      {
         return this ._global .getValue ();
      },
      getLocation: function ()
      {
         return this ._location .getValue ();
      },
      getDirection: function ()
      {
         return this ._direction .getValue ();
      },
      getNearDistance: function ()
      {
         return this ._nearDistance .getValue ();
      },
      getFarDistance: function ()
      {
         return this ._farDistance .getValue ();
      },
      getTexture: function ()
      {
         return this .textureNode;
      },
      getBiasMatrix: (function ()
      {
         // Transforms normalized coords from range (-1, 1) to (0, 1).
         var biasMatrix = new Matrix4 (0.5, 0.0, 0.0, 0.0,
                                       0.0, 0.5, 0.0, 0.0,
                                       0.0, 0.0, 0.5, 0.0,
                                       0.5, 0.5, 0.5, 1.0);

         return function ()
         {
            return biasMatrix;
         };
      })(),
      straightenHorizon: (function ()
      {
         var
            localXAxis = new Vector3 (0, 0, 0),
            localZAxis = new Vector3 (0, 0, 0),
            upVector   = new Vector3 (0, 0, 0),
            rotation   = new Rotation4 (0, 0, 1, 0);

         return function (orientation)
         {
            orientation .multVecRot (localXAxis .assign (Vector3 .xAxis) .negate ());
            orientation .multVecRot (localZAxis .assign (Vector3 .zAxis));
            upVector .assign (this ._upVector .getValue ()) .normalize ();

            var vector = localZAxis .cross (upVector);

            // If viewer looks along the up vector.
            if (Math .abs (localZAxis .dot (upVector)) >= 1)
               return orientation;

            if (Math .abs (vector .dot (localXAxis)) >= 1)
               return orientation;

            rotation .setFromToVec (localXAxis, vector);

            return orientation .multRight (rotation);
         };
      })(),
      set_on__: function ()
      {
         if (this ._on .getValue () && this .textureNode && this .getBrowser () .getProjectiveTextureMapping ())
         {
            delete this .push;
            delete this .pop;
         }
         else
         {
            this .push = Function .prototype;
            this .pop  = Function .prototype;
         }
      },
      set_texture__: function ()
      {
         if (this .textureNode)
            this .textureNode .removeInterest ("set_aspectRatio__", this);

         this .textureNode = X3DCast (X3DConstants .X3DTexture2DNode, this ._texture);

         if (this .textureNode)
            this .textureNode .addInterest ("set_aspectRatio__", this);

         this .set_aspectRatio__ ();
         this .set_on__ ();
      },
      set_aspectRatio__: function ()
      {
         if (this .textureNode)
            this ._aspectRatio = this .textureNode .getWidth () / this .textureNode .getHeight ();
         else
            this ._aspectRatio = 0;
      },
      push: function (renderObject)
      {
         var textureProjectorContainer = this .getTextureProjectors () .pop ();

         textureProjectorContainer .set (renderObject .getBrowser (),
                                         this,
                                         renderObject .getModelViewMatrix () .get ());

         if (this ._global .getValue ())
         {
            renderObject .getGlobalObjects ()     .push (textureProjectorContainer);
            renderObject .getTextureProjectors () .push (textureProjectorContainer);
         }
         else
         {
            renderObject .getLocalObjects ()      .push (textureProjectorContainer);
            renderObject .getTextureProjectors () .push (textureProjectorContainer);
         }
      },
      pop: function (renderObject)
      {
         if (this ._global .getValue ())
            return;

         renderObject .getLocalObjects () .pop ();
      },
   });

   return X3DTextureProjectorNode;
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


define ('x_ite/Components/ProjectiveTextureMapping/TextureProjectorPerspective',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Geometry/Camera",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   "standard/Utility/ObjectCache",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureProjectorNode,
          X3DConstants,
          Camera,
          Vector3,
          Rotation4,
          Matrix4,
          ObjectCache)
{
"use strict";

   var TextureProjectorPerspectiveCache = ObjectCache (TextureProjectorPerspectiveContainer);

   function TextureProjectorPerspectiveContainer ()
   {
      this .projectionMatrix                = new Matrix4 ();
      this .modelViewMatrix                 = new Matrix4 ();
      this .modelMatrix                     = new Matrix4 ();
      this .invTextureSpaceMatrix           = new Matrix4 ();
      this .invTextureSpaceProjectionMatrix = new Matrix4 ();
      this .location                        = new Vector3 (0, 0, 0);
      this .locationArray                   = new Float32Array (3);
      this .direction                       = new Vector3 (0, 0, 0);
      this .rotation                        = new Rotation4 ();
      this .projectiveTextureMatrix         = new Matrix4 ();
      this .projectiveTextureMatrixArray    = new Float32Array (16);
   }

   TextureProjectorPerspectiveContainer .prototype =
   {
      constructor: TextureProjectorPerspectiveContainer,
      set: function (browser, textureProjectorNode, modelViewMatrix)
      {
         this .browser              = browser;
         this .textureProjectorNode = textureProjectorNode;

         this .modelViewMatrix .assign (modelViewMatrix);
      },
      getModelViewMatrix: function ()
      {
         return this .modelViewMatrix;
      },
      setGlobalVariables: function (renderObject)
      {
         var
            textureProjectorNode  = this .textureProjectorNode,
            cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
            modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
            invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

         this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
         textureProjectorNode .straightenHorizon (this .rotation);

         invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
         invTextureSpaceMatrix .rotate (this .rotation);
         invTextureSpaceMatrix .inverse ();

         var
            width            = textureProjectorNode .getTexture () .getWidth (),
            height           = textureProjectorNode .getTexture () .getHeight (),
            nearDistance     = textureProjectorNode .getNearDistance (),
            farDistance      = textureProjectorNode .getFarDistance (),
            fieldOfView      = textureProjectorNode .getFieldOfView ();

         Camera .perspective (fieldOfView, nearDistance, farDistance, width, height, this .projectionMatrix);

         if (! textureProjectorNode .getGlobal ())
            invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

         this .invTextureSpaceProjectionMatrix .assign (invTextureSpaceMatrix) .multRight (this .projectionMatrix) .multRight (textureProjectorNode .getBiasMatrix ());

         this .projectiveTextureMatrix .assign (cameraSpaceMatrix) .multRight (this .invTextureSpaceProjectionMatrix);
         this .projectiveTextureMatrixArray .set (this .projectiveTextureMatrix);

         this .modelViewMatrix .multVecMatrix (this .location .assign (textureProjectorNode ._location .getValue ()));
         this .locationArray .set (this .location);
      },
      setShaderUniforms: function (gl, shaderObject, renderObject)
      {
         const i = shaderObject .numProjectiveTextures ++;

         if (shaderObject .hasTextureProjector (i, this))
            return;

         const
            texture     = this .textureProjectorNode .getTexture (),
            textureUnit = renderObject .getBrowser () .getTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         gl .uniform1i (shaderObject .x3d_ProjectiveTexture [i], textureUnit);

         gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
         gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
      },
      dispose: function ()
      {
         TextureProjectorPerspectiveCache .push (this);
      },
   };

   function TextureProjectorPerspective (executionContext)
   {
      X3DTextureProjectorNode .call (this, executionContext);

      this .addType (X3DConstants .TextureProjectorPerspective);

      this ._fieldOfView .setUnit ("angle");
   }

   TextureProjectorPerspective .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
   {
      constructor: TextureProjectorPerspective,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "global",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "location",     new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",    new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "upVector",     new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView" , new Fields .SFFloat (0.7854)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",  new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "aspectRatio",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texture",      new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "TextureProjectorPerspective";
      },
      getComponentName: function ()
      {
         return "ProjectiveTextureMapping";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTextureProjectorNode .prototype .initialize .call (this);
      },
      getFieldOfView: function ()
      {
         var fov = this ._fieldOfView .getValue ();

         return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
      },
      getTextureProjectors: function ()
      {
         return TextureProjectorPerspectiveCache;
      },
   });

   return TextureProjectorPerspective;
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


define ('x_ite/Components/ProjectiveTextureMapping/TextureProjectorParallel',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
   "x_ite/Base/X3DConstants",
   "standard/Math/Geometry/Camera",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
   "standard/Utility/ObjectCache",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DTextureProjectorNode,
          X3DConstants,
          Camera,
          Vector3,
          Rotation4,
          Matrix4,
          ObjectCache)
{
"use strict";

   var TextureProjectorParallelCache = ObjectCache (TextureProjectorParallelContainer);

   function TextureProjectorParallelContainer ()
   {
      this .projectionMatrix                = new Matrix4 ();
      this .modelViewMatrix                 = new Matrix4 ();
      this .modelMatrix                     = new Matrix4 ();
      this .invTextureSpaceMatrix           = new Matrix4 ();
      this .location                        = new Vector3 (0, 0, 0);
      this .locationArray                   = new Float32Array (3);
      this .invTextureSpaceProjectionMatrix = new Matrix4 ();
      this .direction                       = new Vector3 (0, 0, 0);
      this .rotation                        = new Rotation4 ();
      this .projectiveTextureMatrix         = new Matrix4 ();
      this .projectiveTextureMatrixArray    = new Float32Array (16);
   }

   TextureProjectorParallelContainer .prototype =
   {
      constructor: TextureProjectorParallelContainer,
      set: function (browser, textureProjectorNode, modelViewMatrix)
      {
         this .browser              = browser;
         this .textureProjectorNode = textureProjectorNode;

         this .modelViewMatrix .assign (modelViewMatrix);
      },
      getModelViewMatrix: function ()
      {
         return this .modelViewMatrix;
      },
      setGlobalVariables: function (renderObject)
      {
         var
            textureProjectorNode  = this .textureProjectorNode,
            cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
            modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
            invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

         this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
         textureProjectorNode .straightenHorizon (this .rotation);

         invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
         invTextureSpaceMatrix .rotate (this .rotation);
         invTextureSpaceMatrix .inverse ();

         var
            width        = textureProjectorNode .getTexture () .getWidth (),
            height       = textureProjectorNode .getTexture () .getHeight (),
            aspect       = width / height,
            minimumX     = textureProjectorNode .getMinimumX (),
            maximumX     = textureProjectorNode .getMaximumX (),
            minimumY     = textureProjectorNode .getMinimumY (),
            maximumY     = textureProjectorNode .getMaximumY (),
            sizeX        = textureProjectorNode .getSizeX (),
            sizeY        = textureProjectorNode .getSizeY (),
            nearDistance = textureProjectorNode .getNearDistance (),
            farDistance  = textureProjectorNode .getFarDistance ();

         if (aspect > sizeX / sizeY)
         {
            var
               center  = (minimumX + maximumX) / 2,
               size1_2 = (sizeY * aspect) / 2;

            Camera .ortho (center - size1_2, center + size1_2, minimumY, maximumY, nearDistance, farDistance, this .projectionMatrix);
         }
         else
         {
            var
               center  = (minimumY + maximumY) / 2,
               size1_2 = (sizeX / aspect) / 2;

            Camera .ortho (minimumX, maximumX, center - size1_2, center + size1_2, nearDistance, farDistance, this .projectionMatrix);
         }

         if (! textureProjectorNode .getGlobal ())
            invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

         this .invTextureSpaceProjectionMatrix .assign (invTextureSpaceMatrix) .multRight (this .projectionMatrix) .multRight (textureProjectorNode .getBiasMatrix ());

         this .projectiveTextureMatrix .assign (cameraSpaceMatrix) .multRight (this .invTextureSpaceProjectionMatrix);
         this .projectiveTextureMatrixArray .set (this .projectiveTextureMatrix);

         this .modelViewMatrix .multVecMatrix (this .location .assign (textureProjectorNode ._location .getValue ()));
         this .locationArray .set (this .location);
      },
      setShaderUniforms: function (gl, shaderObject, renderObject)
      {
         const i = shaderObject .numProjectiveTextures ++;

         if (shaderObject .hasTextureProjector (i, this))
            return;

         const
            texture     = this .textureProjectorNode .getTexture (),
            textureUnit = renderObject .getBrowser () .getTexture2DUnit ();

         gl .activeTexture (gl .TEXTURE0 + textureUnit);
         gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         gl .uniform1i (shaderObject .x3d_ProjectiveTexture [i], textureUnit);

         gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
         gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
      },
      dispose: function ()
      {
         TextureProjectorParallelCache .push (this);
      },
   };

   function TextureProjectorParallel (executionContext)
   {
      X3DTextureProjectorNode .call (this, executionContext);

      this .addType (X3DConstants .TextureProjectorParallel);

      this ._fieldOfView .setUnit ("length");
   }

   TextureProjectorParallel .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
   {
      constructor: TextureProjectorParallel,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",  new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "on",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "global",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "location",     new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "direction",    new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "upVector",     new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView" , new Fields .MFFloat (-1, -1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",  new Fields .SFFloat (10)),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "aspectRatio",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "texture",      new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "TextureProjectorParallel";
      },
      getComponentName: function ()
      {
         return "ProjectiveTextureMapping";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DTextureProjectorNode .prototype .initialize .call (this);

         this ._fieldOfView .addInterest ("set_fieldOfView___", this);

         this .set_fieldOfView___ ();
      },
      getMinimumX: function ()
      {
         return this .minimumX;
      },
      getMinimumY: function ()
      {
         return this .minimumY;
      },
      getMaximumX: function ()
      {
         return this .maximumX;
      },
      getMaximumY: function ()
      {
         return this .maximumY;
      },
      getSizeX: function ()
      {
         return this .sizeX;
      },
      getSizeY: function ()
      {
         return this .sizeY;
      },
      getTextureProjectors: function ()
      {
         return TextureProjectorParallelCache;
      },
      set_fieldOfView___: function ()
      {
         var length = this ._fieldOfView .length;

         this .minimumX = (length > 0 ? this ._fieldOfView [0] : -1);
         this .minimumY = (length > 1 ? this ._fieldOfView [1] : -1);
         this .maximumX = (length > 2 ? this ._fieldOfView [2] :  1);
         this .maximumY = (length > 3 ? this ._fieldOfView [3] :  1);

         this .sizeX = this .maximumX - this .minimumX;
         this .sizeY = this .maximumY - this .minimumY;
      },
   });

   return TextureProjectorParallel;
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


define (require .getComponentUrl ("projective-texture-mapping"), [
   "x_ite/Components",
   "x_ite/Components/ProjectiveTextureMapping/TextureProjectorPerspective",
   "x_ite/Components/ProjectiveTextureMapping/TextureProjectorParallel",
   "x_ite/Components/ProjectiveTextureMapping/X3DTextureProjectorNode",
],
function (Components,
          TextureProjectorPerspective,
          TextureProjectorParallel,
          X3DTextureProjectorNode)
{
"use strict";

   Components .addComponent ({
      name: "ProjectiveTextureMapping",
      types:
      {
         TextureProjectorPerspective:  TextureProjectorPerspective,
         TextureProjectorParallel: TextureProjectorParallel,
      },
      abstractTypes:
      {
         X3DTextureProjectorNode: X3DTextureProjectorNode,
      },
   });
});


})();
