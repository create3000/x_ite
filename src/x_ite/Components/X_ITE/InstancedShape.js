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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DShapeNode         from "../Shape/X3DShapeNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import VertexArray          from "../../Rendering/VertexArray.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import Box3                 from "../../../standard/Math/Geometry/Box3.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function InstancedShape (executionContext)
{
   X3DShapeNode .call (this, executionContext);

   this .addType (X3DConstants .InstancedShape);

   this .addChildObjects (X3DConstants .outputOnly, "matrices", new Fields .SFTime ());

   this .min   = new Vector3 ();
   this .max   = new Vector3 ();
   this .scale = new Vector3 (1, 1, 1);

   this .numInstances       = 0;
   this .instancesStride    = Float32Array .BYTES_PER_ELEMENT * (16 + 9); // mat4 + mat3
   this .matrixOffset       = 0;
   this .normalMatrixOffset = Float32Array .BYTES_PER_ELEMENT * 16;
}

Object .assign (Object .setPrototypeOf (InstancedShape .prototype, X3DShapeNode .prototype),
{
   initialize ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Check version.

      if (browser .getContext () .getVersion () < 2)
         return;

      this .instances = Object .assign (gl .createBuffer (),
      {
         vertexArrayObject: new VertexArray (gl),
         thickLinesVertexArrayObject: new VertexArray (gl),
         lineTrianglesBuffer: gl .createBuffer (),
         numLines: 0,
      });

      this ._translations .addInterest ("set_transform__", this);
      this ._rotations    .addInterest ("set_transform__", this);
      this ._scales       .addInterest ("set_transform__", this);
      this ._matrices     .addInterest ("set_matrices__",  this);

      this .set_transform__ ();
   },
   getShapeKey ()
   {
      return 3;
   },
   getNumInstances ()
   {
      return this .numInstances;
   },
   getInstances ()
   {
      return this .instances;
   },
   set_bbox__: (function ()
   {
      const
         min  = new Vector3 (),
         max  = new Vector3 (),
         bbox = new Box3 ();

      return function ()
      {
         if (this .numInstances)
         {
            if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
            {
               if (this .getGeometry ())
                  bbox .assign (this .getGeometry () .getBBox ());
               else
                  bbox .set ();

               const
                  size1_2 = bbox .size .multiply (this .scale .magnitude () / 2),
                  center  = bbox .center;

               min .assign (this .min) .add (center) .subtract (size1_2);
               max .assign (this .max) .add (center) .add      (size1_2);

               this .bbox .setExtents (min, max);
            }
            else
            {
               this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
            }
         }
         else
         {
            this .bbox .set ();
         }

         this .getBBoxSize ()   .assign (this .bbox .size);
         this .getBBoxCenter () .assign (this .bbox .center);
      };
   })(),
   set_transform__ ()
   {
      this ._matrices = this .getBrowser () .getCurrentTime ();
   },
   set_matrices__ ()
   {
      const
         browser         = this .getBrowser (),
         gl              = browser .getContext (),
         translations    = this ._translations,
         rotations       = this ._rotations,
         scales          = this ._scales,
         numTranslations = translations .length,
         numRotations    = rotations .length,
         numScales       = scales .length,
         numInstances    = Math .max (numTranslations, numRotations, numScales),
         stride          = this .instancesStride / Float32Array .BYTES_PER_ELEMENT,
         length          = this .instancesStride * numInstances,
         data            = new Float32Array (length),
         matrix          = new Matrix4 ();

      this .numInstances = numInstances;

      const
         min   = this .min .set (Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY, Number .POSITIVE_INFINITY),
         max   = this .max .set (Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY, Number .NEGATIVE_INFINITY),
         scale = this .scale .assign (numScales ? max : Vector3 .One);

      for (let i = 0, o = 0; i < numInstances; ++ i, o += stride)
      {
         matrix .set (numTranslations ? translations [Math .min (i, numTranslations - 1)] .getValue () : null,
                      numRotations    ? rotations    [Math .min (i, numRotations    - 1)] .getValue () : null,
                      numScales       ? scales       [Math .min (i, numScales       - 1)] .getValue () : null);

         if (numScales)
            scale .max (scales [Math .min (i, numScales - 1)] .getValue ());

         data .set (matrix, o);
         data .set (matrix .submatrix .transpose () .inverse (), o + 16);

         min .min (matrix .origin);
         max .max (matrix .origin);
      }

      gl .bindBuffer (gl .ARRAY_BUFFER, this .instances);
      gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);

      this .set_bbox__ ();
   },
   set_geometry__ ()
   {
      X3DShapeNode .prototype .set_geometry__ .call (this);

      if (this .getGeometry ())
         delete this .traverse;
      else
         this .traverse = Function .prototype;

      this .set_transform__ ();
   },
   intersectsBox (box, clipPlanes, modelViewMatrix)
   { },
   traverse (type, renderObject)
   {
      if (!this .numInstances)
         return;

      // Always look at ParticleSystem if you do modify something here and there.

      switch (type)
      {
         case TraverseType .POINTER:
         {
            if (this ._pointerEvents .getValue ())
               renderObject .addPointingShape (this);

            break;
         }
         case TraverseType .PICKING:
         {
            break;
         }
         case TraverseType .COLLISION:
         {
            renderObject .addCollisionShape (this);
            break;
         }
         case TraverseType .SHADOW:
         {
            if (this ._castShadow .getValue ())
               renderObject .addShadowShape (this);

            break;
         }
         case TraverseType .DISPLAY:
         {
            if (renderObject .addDisplayShape (this))
            {
               // Currently used for GeneratedCubeMapTexture.
               this .getAppearance () .traverse (type, renderObject);
            }

            break;
         }
      }

      // Currently used for ScreenText and Tools.
      this .getGeometry () .traverse (type, renderObject);
   },
   displaySimple (gl, renderContext, shaderNode)
   {
      this .getGeometry () .displaySimpleInstanced (gl, shaderNode, this);
   },
   display (gl, renderContext)
   {
      this .getGeometry () .displayInstanced (gl, renderContext, this);
   },
});

Object .defineProperties (InstancedShape, X3DNode .getStaticProperties ("InstancedShape", "X_ITE", 1, "children", "2.0"));

Object .defineProperties (InstancedShape,
{
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translations",  new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotations",     new Fields .MFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",        new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",    new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",   new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",      new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",    new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",      new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default InstancedShape;
