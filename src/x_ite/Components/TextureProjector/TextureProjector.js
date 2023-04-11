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

const TextureProjectorCache = ObjectCache (TextureProjectorContainer);

function TextureProjectorContainer ()
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

TextureProjectorContainer .prototype =
{
   constructor: TextureProjectorContainer,
   set: function (textureProjectorNode, modelViewMatrix)
   {
      this .browser              = textureProjectorNode .getBrowser ();
      this .textureProjectorNode = textureProjectorNode;

      this .modelViewMatrix .assign (modelViewMatrix);
   },
   setGlobalVariables: function (renderObject)
   {
      const
         textureProjectorNode  = this .textureProjectorNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrix () .get (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (textureProjectorNode .getGlobal () ? modelMatrix : Matrix4 .Identity);

      this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (textureProjectorNode .getDirection ()) .negate ());
      textureProjectorNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (textureProjectorNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
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
         textureUnit = this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_ProjectiveTexture [i], textureUnit);

      gl .uniformMatrix4fv (shaderObject .x3d_ProjectiveTextureMatrix [i], false, this .projectiveTextureMatrixArray);
      gl .uniform3fv (shaderObject .x3d_ProjectiveTextureLocation [i], this .locationArray);
   },
   dispose: function ()
   {
      TextureProjectorCache .push (this);
   },
};

function TextureProjector (executionContext)
{
   X3DTextureProjectorNode .call (this, executionContext);

   this .addType (X3DConstants .TextureProjector);

   this ._fieldOfView .setUnit ("angle");
}

TextureProjector .prototype = Object .assign (Object .create (X3DTextureProjectorNode .prototype),
{
   constructor: TextureProjector,
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
      return "TextureProjector";
   },
   getComponentName: function ()
   {
      return "TextureProjector";
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
      X3DTextureProjectorNode .prototype .initialize .call (this);
   },
   getFieldOfView: function ()
   {
      const fov = this ._fieldOfView .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   getTextureProjectors: function ()
   {
      return TextureProjectorCache;
   },
});

export default TextureProjector;
