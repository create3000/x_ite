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
import X3DNode                 from "../Core/X3DNode.js";
import X3DTextureProjectorNode from "./X3DTextureProjectorNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";
import Camera                  from "../../../standard/Math/Geometry/Camera.js";
import Vector3                 from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4               from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4                 from "../../../standard/Math/Numbers/Matrix4.js";
import MatrixStack             from "../../../standard/Math/Utility/MatrixStack.js";
import ObjectCache             from "../../../standard/Utility/ObjectCache.js";

const TextureProjectorParallelCache = ObjectCache (TextureProjectorParallelContainer);

function TextureProjectorParallelContainer ()
{
   this .projectionMatrix                = new Matrix4 ();
   this .modelViewMatrix                 = new MatrixStack (Matrix4);
   this .modelMatrix                     = new Matrix4 ();
   this .invTextureSpaceMatrix           = new Matrix4 ();
   this .location                        = new Vector3 ();
   this .locationArray                   = new Float32Array (3);
   this .invTextureSpaceProjectionMatrix = new Matrix4 ();
   this .direction                       = new Vector3 ();
   this .rotation                        = new Rotation4 ();
   this .matrix                          = new Matrix4 ();
   this .matrixArray                     = new Float32Array (16);
   this .textureMatrix                   = new Matrix4 ();
}

Object .assign (TextureProjectorParallelContainer .prototype,
{
   set (lightNode, groupNode, modelViewMatrix)
   {
      this .browser   = lightNode .getBrowser ();
      this .lightNode = lightNode;
      this .global    = lightNode .getGlobal ();

      this .modelViewMatrix .push (modelViewMatrix);
      this .textureMatrix .assign (lightNode .getTexture () .getMatrix ());
   },
   renderShadowMap (renderObject)
   {
      const
         lightNode             = this .lightNode,
         cameraSpaceMatrix     = renderObject .getCameraSpaceMatrixArray (),
         modelMatrix           = this .modelMatrix .assign (this .modelViewMatrix .get ()) .multRight (cameraSpaceMatrix),
         invTextureSpaceMatrix = this .invTextureSpaceMatrix .assign (this .global ? modelMatrix : Matrix4 .Identity);

      this .rotation .setFromToVec (Vector3 .zAxis, this .direction .assign (lightNode .getDirection ()) .negate ());
      lightNode .straightenHorizon (this .rotation);

      invTextureSpaceMatrix .translate (lightNode .getLocation ());
      invTextureSpaceMatrix .rotate (this .rotation);
      invTextureSpaceMatrix .inverse ();

      const
         width        = lightNode .getTexture () .getWidth (),
         height       = lightNode .getTexture () .getHeight (),
         aspect       = width / height,
         minimumX     = lightNode .getMinimumX (),
         maximumX     = lightNode .getMaximumX (),
         minimumY     = lightNode .getMinimumY (),
         maximumY     = lightNode .getMaximumY (),
         sizeX        = lightNode .getSizeX (),
         sizeY        = lightNode .getSizeY (),
         nearDistance = lightNode .getNearDistance (),
         farDistance  = lightNode .getFarDistance ();

      if (aspect > sizeX / sizeY)
      {
         const
            center  = (minimumX + maximumX) / 2,
            size1_2 = (sizeY * aspect) / 2;

         Camera .ortho (center - size1_2, center + size1_2, minimumY, maximumY, nearDistance, farDistance, this .projectionMatrix);
      }
      else
      {
         const
            center  = (minimumY + maximumY) / 2,
            size1_2 = (sizeX / aspect) / 2;

         Camera .ortho (minimumX, maximumX, center - size1_2, center + size1_2, nearDistance, farDistance, this .projectionMatrix);
      }

      if (!this .global)
         invTextureSpaceMatrix .multLeft (modelMatrix .inverse ());

      this .invTextureSpaceProjectionMatrix
         .assign (invTextureSpaceMatrix)
         .multRight (this .projectionMatrix)
         .multRight (lightNode .getBiasMatrix ())
         .multRight (this .textureMatrix);

      this .modelViewMatrix .get () .multVecMatrix (this .location .assign (lightNode ._location .getValue ()));
      this .locationArray .set (this .location);
   },
   setGlobalVariables (renderObject)
   {
      this .matrix
         .assign (renderObject .getView () ?.inverse ?? Matrix4 .Identity)
         .multRight (renderObject .getCameraSpaceMatrixArray ())
         .multRight (this .invTextureSpaceProjectionMatrix);

      this .matrixArray .set (this .matrix);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const i = shaderObject .numTextureProjectors ++;

      const
         lightNode   = this .lightNode,
         texture     = lightNode .getTexture (),
         textureUnit = this .global
            ? (this .textureUnit = this .textureUnit ?? this .browser .popTexture2DUnit ())
            : this .browser .getTexture2DUnit ();

      gl .activeTexture (gl .TEXTURE0 + textureUnit);
      gl .bindTexture (gl .TEXTURE_2D, texture .getTexture ());
      gl .uniform1i (shaderObject .x3d_TextureProjectorTexture [i], textureUnit);

      if (shaderObject .hasTextureProjector (i, this))
         return;

      const
         nearParameter = lightNode .getNearParameter (),
         farParameter  = lightNode .getFarParameter ();

      gl .uniform3f        (shaderObject .x3d_TextureProjectorColor [i],         ... lightNode .getColor ());
      gl .uniform1f        (shaderObject .x3d_TextureProjectorIntensity [i],     lightNode .getIntensity ());
      gl .uniform3fv       (shaderObject .x3d_TextureProjectorLocation [i],      this .locationArray);
      gl .uniform3f        (shaderObject .x3d_TextureProjectorParams [i],        nearParameter, farParameter, texture .isLinear ());
      gl .uniformMatrix4fv (shaderObject .x3d_TextureProjectorMatrix [i], false, this .matrixArray);
   },
   dispose ()
   {
      this .browser .pushTexture2DUnit (this .textureUnit);

      this .modelViewMatrix .clear ();

      this .textureUnit = undefined;

      TextureProjectorParallelCache .push (this);
   },
});

function TextureProjectorParallel (executionContext)
{
   X3DTextureProjectorNode .call (this, executionContext);

   this .addType (X3DConstants .TextureProjectorParallel);

   // Units

   this ._fieldOfView .setUnit ("length");

   // Legacy

   if (executionContext .getSpecificationVersion () <= 4.0)
      this ._upVector = new Vector3 (0, 0, 1);
}

Object .assign (Object .setPrototypeOf (TextureProjectorParallel .prototype, X3DTextureProjectorNode .prototype),
{
   initialize ()
   {
      X3DTextureProjectorNode .prototype .initialize .call (this);

      this ._fieldOfView .addInterest ("set_fieldOfView___", this);

      this .set_fieldOfView___ ();
   },
   set_fieldOfView___ ()
   {
      this .minimumX = this ._fieldOfView [0];
      this .minimumY = this ._fieldOfView [1];
      this .maximumX = this ._fieldOfView [2];
      this .maximumY = this ._fieldOfView [3];

      this .sizeX = this .maximumX - this .minimumX;
      this .sizeY = this .maximumY - this .minimumY;
   },
   getMinimumX ()
   {
      return this .minimumX;
   },
   getMinimumY ()
   {
      return this .minimumY;
   },
   getMaximumX ()
   {
      return this .maximumX;
   },
   getMaximumY ()
   {
      return this .maximumY;
   },
   getSizeX ()
   {
      return this .sizeX;
   },
   getSizeY ()
   {
      return this .sizeY;
   },
   getLights ()
   {
      return TextureProjectorParallelCache;
   },
});

Object .defineProperties (TextureProjectorParallel,
{
   ... X3DNode .getStaticProperties ("TextureProjectorParallel", "TextureProjection", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "global",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "on",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",            new Fields .SFColor (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "intensity",        new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ambientIntensity", new Fields .SFFloat ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "location",         new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "direction",        new Fields .SFVec3f (0, 0, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "upVector",         new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fieldOfView",      new Fields .MFFloat (-1, -1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "nearDistance",     new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "farDistance",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "aspectRatio",      new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texture",          new Fields .SFNode ()),

         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadows",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowColor",      new Fields .SFColor ()),      // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowIntensity",  new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "shadowBias",       new Fields .SFFloat (0.005)), // skip test
         new X3DFieldDefinition (X3DConstants .initializeOnly, "shadowMapSize",    new Fields .SFInt32 (1024)),  // skip test
      ]),
      enumerable: true,
   },
});

export default TextureProjectorParallel;
