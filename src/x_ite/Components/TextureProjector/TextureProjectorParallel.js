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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DTextureProjectorNode from "./X3DTextureProjectorNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Camera                  from "../../../standard/Math/Geometry/Camera.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";
import ObjectCache             from "../../../standard/Utility/ObjectCache.js";

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
   set: function (textureProjectorNode, modelViewMatrix)
   {
      this .browser              = textureProjectorNode .getBrowser ();
      this .textureProjectorNode = textureProjectorNode;

      this .modelViewMatrix .assign (modelViewMatrix);
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
         textureUnit = this .browser .getTexture2DUnit ();

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
      new X3DFieldDefinition (X3DConstants .inputOutput, "upVector",     new Fields .SFVec3f (0, 1, 0)),
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
      return "TextureProjector";
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
});

export default TextureProjectorParallel;
