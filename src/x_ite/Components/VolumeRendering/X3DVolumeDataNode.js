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
   this .volumeMaterialNode       = new VolumeMaterial (privateScene, this);
   this .textureTransformNode     = privateScene .createNode ("TextureTransform3D",  false);
   this .appearanceNode           = privateScene .createNode ("Appearance",          false);
   this .lowShapeNode             = privateScene .createNode ("Shape",               false);
   this .lowGeometryNode          = privateScene .createNode ("QuadSet",             false);
   this .lowTextureCoordinateNode = privateScene .createNode ("TextureCoordinate3D", false);
   this .lowCoordinateNode        = privateScene .createNode ("Coordinate",          false);
   this .hiShapeNode              = privateScene .createNode ("Shape",               false);
   this .hiGeometryNode           = privateScene .createNode ("QuadSet",             false);
   this .hiTextureCoordinateNode  = privateScene .createNode ("TextureCoordinate3D", false);
   this .hiCoordinateNode         = privateScene .createNode ("Coordinate",          false);
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

      this ._bboxDisplay .addFieldInterest (this .groupNode ._bboxDisplay);

      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .transformNode ._rotation);
      this .proximitySensorNode ._orientation_changed .addFieldInterest (this .textureTransformNode ._rotation);

      this .groupNode ._children       = [this .proximitySensorNode, this .transformNode];
      this .proximitySensorNode ._size = new Fields .SFVec3f (-1, -1, -1);
      this .transformNode ._children   = [this .lowShapeNode, this .hiShapeNode];

      this .textureTransformNode ._translation = new Fields .SFVec3f (0.5, 0.5, 0.5);
      this .textureTransformNode ._center      = new Fields .SFVec3f (-0.5, -0.5, -0.5);
      this .appearanceNode ._alphaMode         = "BLEND";
      this .appearanceNode ._material          = this .volumeMaterialNode;
      this .appearanceNode ._textureTransform  = this .textureTransformNode;

      this .lowShapeNode ._pointerEvents = false;
      this .lowShapeNode ._castShadow    = false;
      this .lowShapeNode ._visible       = false;
      this .lowShapeNode ._appearance    = this .appearanceNode;
      this .lowShapeNode ._geometry      = this .lowGeometryNode;
      this .lowGeometryNode ._texCoord   = this .lowTextureCoordinateNode;
      this .lowGeometryNode ._coord      = this .lowCoordinateNode;

      this .hiShapeNode ._pointerEvents = false;
      this .hiShapeNode ._castShadow    = false;
      this .hiShapeNode ._visible       = false;
      this .hiShapeNode ._appearance    = this .appearanceNode;
      this .hiShapeNode ._geometry      = this .hiGeometryNode;
      this .hiGeometryNode ._texCoord   = this .hiTextureCoordinateNode;
      this .hiGeometryNode ._coord      = this .hiCoordinateNode;

      this .volumeMaterialNode       .setPrivate (true);
      this .textureTransformNode     .setPrivate (true);
      this .appearanceNode           .setPrivate (true);

      this .lowCoordinateNode        .setPrivate (true);
      this .lowTextureCoordinateNode .setPrivate (true);
      this .lowGeometryNode          .setPrivate (true);
      this .lowShapeNode             .setPrivate (true);

      this .hiCoordinateNode         .setPrivate (true);
      this .hiTextureCoordinateNode  .setPrivate (true);
      this .hiGeometryNode           .setPrivate (true);
      this .hiShapeNode              .setPrivate (true);

      this .transformNode            .setPrivate (true);
      this .proximitySensorNode      .setPrivate (true);
      this .groupNode                .setPrivate (true);

      this .volumeMaterialNode       .setup ();
      this .textureTransformNode     .setup ();
      this .appearanceNode           .setup ();

      this .lowCoordinateNode        .setup ();
      this .lowTextureCoordinateNode .setup ();
      this .lowGeometryNode          .setup ();
      this .lowShapeNode             .setup ();

      this .hiCoordinateNode         .setup ();
      this .hiTextureCoordinateNode  .setup ();
      this .hiGeometryNode           .setup ();
      this .hiShapeNode              .setup ();

      this .transformNode            .setup ();
      this .proximitySensorNode      .setup ();
      this .groupNode                .setup ();

      this .connectChildNode (this .groupNode);

      if (gl .getVersion () < 2)
         return;

      this .getLive () .addInterest ("set_live__", this, true);

      this ._dimensions          .addInterest ("set_dimensions__",       this);
      this .textureTransformNode .addInterest ("set_textureTransform__", this);

      this .set_live__ (false);
      this .set_dimensions__ ();
      this .set_textureTransform__ ();
      this .update ();
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
   getNumPlanes (quality)
   {
      switch (quality)
      {
         case TextureQuality .LOW:
            return 200;
         case TextureQuality .MEDIUM:
            return 400;
         case TextureQuality .HIGH:
            return 600;
      }
   },
   getPoints (quality)
   {
      const
         numPlanes = this .getNumPlanes (quality),
         size      = this ._dimensions .getValue () .magnitude (),
         size1_2   = size / 2,
         points    = [ ];

      for (let i = 0; i < numPlanes; ++ i)
      {
         const z = i / (numPlanes - 1) - 0.5;

         points .push ( size1_2,  size1_2, size * z,
                       -size1_2,  size1_2, size * z,
                       -size1_2, -size1_2, size * z,
                        size1_2, -size1_2, size * z);
      }

      return points;
   },
   set_live__ (rebuild)
   {
      const
         browser      = this .getBrowser (),
         alwaysUpdate = this .isLive () && browser .getBrowserOption ("AlwaysUpdateGeometries");

      if (this .getLive () .getValue () || alwaysUpdate)
      {
         browser .getBrowserOptions () ._TextureQuality    .addInterest ("set_dimensions__", this);
         browser .getBrowserOptions () ._QualityWhenMoving .addInterest ("set_dimensions__", this);

         browser .sensorEvents () .addInterest ("update", this);

         if (rebuild)
            this .set_dimensions__ ();
      }
      else
      {
         browser .getBrowserOptions () ._TextureQuality    .removeInterest ("set_dimensions__", this);
         browser .getBrowserOptions () ._QualityWhenMoving .removeInterest ("set_dimensions__", this);

         browser .sensorEvents () .removeInterest ("update", this);
      }
   },
   set_dimensions__ ()
   {
      const
         browser = this .getBrowser (),
         quality = browser .getBrowserOptions () .getTextureQuality (),
         moving  = browser .getBrowserOptions () .getQualityWhenMoving ();

      this .textureTransformNode ._scale = this ._dimensions .inverse ();

      const hi = this .getPoints (quality);

      this .hiCoordinateNode ._point        = hi;
      this .hiTextureCoordinateNode ._point = hi;

      const low = moving !== undefined ? this .getPoints (moving) : hi;

      this .lowCoordinateNode ._point        = low;
      this .lowTextureCoordinateNode ._point = low;
   },
   set_textureTransform__ ()
   {
      this .textureNormalMatrixArray .set (new Matrix4 (... this .textureTransformNode .getMatrix ()) .submatrix .inverse ());
   },
   update ()
   {
      const
         browser = this .getBrowser (),
         moving  = browser .getCurrentSpeed () > 0 || browser .getViewer () .isActive ();

      if (this .lowShapeNode ._visible .getValue () !== moving)
         this .lowShapeNode ._visible = moving;

      if (this .hiShapeNode ._visible .getValue () !== !moving)
         this .hiShapeNode ._visible = !moving;
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
