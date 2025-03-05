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

import Fields           from "../../Fields.js";
import X3DNode          from "../Core/X3DNode.js";
import X3DChildNode     from "../Core/X3DChildNode.js";
import X3DBoundedObject from "../Grouping/X3DBoundedObject.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import TextureQuality   from "../../Browser/Core/TextureQuality.js";
import VolumeMaterial   from "../../Browser/VolumeRendering/VolumeMaterial.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";

function X3DVolumeDataNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DVolumeDataNode);

   this .setCameraObject (true);

   // Private properties

   const
      browser      = this .getBrowser (),
      privateScene = browser .getPrivateScene ();

   this .groupNode                = privateScene .createNode ("Group",               false);
   this .proximitySensorNode      = privateScene .createNode ("ProximitySensor",     false);
   this .transformNode            = privateScene .createNode ("Transform",           false);
   this .shapeNode                = privateScene .createNode ("Shape",               false);
   this .appearanceNode           = privateScene .createNode ("Appearance",          false);
   this .textureTransformNode     = privateScene .createNode ("TextureTransform3D",  false);
   this .geometryNode             = privateScene .createNode ("QuadSet",             false);
   this .textureCoordinateNode    = privateScene .createNode ("TextureCoordinate3D", false);
   this .coordinateNode           = privateScene .createNode ("Coordinate",          false);
   this .volumeMaterialNode       = new VolumeMaterial (privateScene, this);
   this .textureNormalMatrixArray = new Float32Array (9);
}

Object .assign (Object .setPrototypeOf (X3DVolumeDataNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .groupNode ._isPointingObject  .addFieldInterest (this ._isPointingObject);
      this .groupNode ._isCameraObject    .addFieldInterest (this ._isCameraObject);
      this .groupNode ._isPickableObject  .addFieldInterest (this ._isPickableObject);
      this .groupNode ._isCollisionObject .addFieldInterest (this ._isCollisionObject);
      this .groupNode ._isShadowObject    .addFieldInterest (this ._isShadowObject);
      this .groupNode ._isVisibleObject   .addFieldInterest (this ._isVisibleObject);

      this ._bboxDisplay .addFieldInterest (this .groupNode ._bboxDisplay);

      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .transformNode ._rotation);
      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .textureTransformNode ._rotation);

      this .groupNode ._children               = [this .proximitySensorNode, this .transformNode];
      this .proximitySensorNode ._size         = new Fields .SFVec3f (-1, -1, -1);
      this .transformNode ._children           = [this .shapeNode];
      this .shapeNode ._pointerEvents          = false;
      this .shapeNode ._castShadow             = false;
      this .shapeNode ._appearance             = this .appearanceNode;
      this .shapeNode ._geometry               = this .geometryNode;
      this .appearanceNode ._alphaMode         = "BLEND";
      this .appearanceNode ._material          = this .volumeMaterialNode;
      this .appearanceNode ._textureTransform  = this .textureTransformNode;
      this .textureTransformNode ._translation = new Fields .SFVec3f (0.5, 0.5, 0.5);
      this .textureTransformNode ._center      = new Fields .SFVec3f (-0.5, -0.5, -0.5);
      this .geometryNode ._texCoord            = this .textureCoordinateNode;
      this .geometryNode ._coord               = this .coordinateNode;

      this .coordinateNode        .setPrivate (true);
      this .textureCoordinateNode .setPrivate (true);
      this .geometryNode          .setPrivate (true);
      this .textureTransformNode  .setPrivate (true);
      this .volumeMaterialNode    .setPrivate (true);
      this .appearanceNode        .setPrivate (true);
      this .shapeNode             .setPrivate (true);
      this .transformNode         .setPrivate (true);
      this .proximitySensorNode   .setPrivate (true);
      this .groupNode             .setPrivate (true);

      this .coordinateNode        .setup ();
      this .textureCoordinateNode .setup ();
      this .geometryNode          .setup ();
      this .textureTransformNode  .setup ();
      this .volumeMaterialNode    .setup ();
      this .appearanceNode        .setup ();
      this .shapeNode             .setup ();
      this .transformNode         .setup ();
      this .proximitySensorNode   .setup ();
      this .groupNode             .setup ();

      this .setPointingObject (this .groupNode .isPointingObject ());
      this .setCameraObject   (this .groupNode .isCameraObject ());
      this .setPickableObject (this .groupNode .isPickableObject ());
      this .setVisibleObject  (this .groupNode .isVisibleObject ());

      if (gl .getVersion () < 2)
         return;

      this .getLive () .addInterest ("set_live__", this);

      this ._dimensions .addInterest ("set_dimensions__", this);
      this .textureTransformNode .addInterest ("set_textureTransform__", this);

      this .set_live__ ();
      this .set_dimensions__ ();
      this .set_textureTransform__ ();
   },
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return bbox .set (this ._dimensions .getValue (), Vector3 .Zero);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getAppearance ()
   {
      return this .appearanceNode;
   },
   updateShader ()
   {
      this .volumeMaterialNode .getVolumeShaders () .clear ();
   },
   addShaderUniformNames (uniformNames)
   {
      uniformNames .push ("x3d_TextureNormalMatrix");
   },
   getNumPlanes ()
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
   set_live__ ()
   {
      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

       if (this .getLive () .getValue () || alwaysUpdate)
          browser .getBrowserOptions () ._TextureQuality .addInterest ("set_dimensions__", this);
      else
         browser .getBrowserOptions () ._TextureQuality .removeInterest ("set_dimensions__", this);
   },
   set_dimensions__ ()
   {
      const
         NUM_PLANES = this .getNumPlanes (),
         size       = this ._dimensions .getValue () .magnitude (),
         size1_2    = size / 2,
         points     = [ ];

      this .coordinateNode ._point .length = 0;

      for (let i = 0; i < NUM_PLANES; ++ i)
      {
         const z = i / (NUM_PLANES - 1) - 0.5;

         points .push ( size1_2,  size1_2, size * z,
                       -size1_2,  size1_2, size * z,
                       -size1_2, -size1_2, size * z,
                        size1_2, -size1_2, size * z);
      }

      this .coordinateNode ._point        = points;
      this .textureCoordinateNode ._point = points;
      this .textureTransformNode ._scale  = new Fields .SFVec3f (1 / this ._dimensions .x,
                                                                 1 / this ._dimensions .y,
                                                                 1 / this ._dimensions .z);
   },
   set_textureTransform__ ()
   {
      this .textureNormalMatrixArray .set (new Matrix4 (... this .textureTransformNode .getMatrix ()) .submatrix .inverse ());
   },
   traverse (type, renderObject)
   {
      this .groupNode .traverse (type, renderObject);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniformMatrix3fv (shaderObject .x3d_TextureNormalMatrix, true, this .textureNormalMatrixArray);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DVolumeDataNode, X3DNode .getStaticProperties ("X3DVolumeDataNode", "VolumeRendering", 1));

export default X3DVolumeDataNode;
