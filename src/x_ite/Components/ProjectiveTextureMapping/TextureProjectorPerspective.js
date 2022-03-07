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
         try
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
         }
         catch (error)
         {
            console .log (error);
         }
      },
      setShaderUniforms: function (gl, shaderObject)
      {
         var i = shaderObject .numProjectiveTextures ++;

         if (shaderObject .hasTextureProjector (i, this))
            return;

         var
            textureProjectorNode = this .textureProjectorNode,
            texture              = textureProjectorNode .getTexture ();

         gl .activeTexture (gl .TEXTURE0 + this .browser .getProjectiveTextureUnits () [i]);
         gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
         gl .activeTexture (gl .TEXTURE0);

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
      [Symbol .for ("X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
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
