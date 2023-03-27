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
import X3DShapeNode         from "./X3DShapeNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function Shape (executionContext)
{
   X3DShapeNode .call (this, executionContext);

   this .addType (X3DConstants .Shape);
}

Shape .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
{
   constructor: Shape,
   [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
      new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",    new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",     new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",  new Fields .SFBool (true)),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay", new Fields .SFBool ()),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",    new Fields .SFVec3f (-1, -1, -1)),
      new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",  new Fields .SFVec3f ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",  new Fields .SFNode ()),
      new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",    new Fields .SFNode ()),
   ]),
   getTypeName: function ()
   {
      return "Shape";
   },
   getComponentName: function ()
   {
      return "Shape";
   },
   getContainerField: function ()
   {
      return "children";
   },
   getSpecificationRange: function ()
   {
      return ["2.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DShapeNode .prototype .initialize .call (this);

      this ._transformSensors_changed .addInterest ("set_transformSensors__", this);

      this .set_transformSensors__ ();
   },
   getShapeKey: function ()
   {
      return 0;
   },
   getGeometryContext: X3DShapeNode .prototype .getGeometry,
   set_geometry__: function ()
   {
      X3DShapeNode .prototype .set_geometry__ .call (this);

      if (this .getGeometry ())
         delete this .traverse;
      else
         this .traverse = Function .prototype;
   },
   set_transformSensors__: function ()
   {
      this .setPickableObject (this .getTransformSensors () .size);
   },
   intersectsBox: function (box, clipPlanes, modelViewMatrix)
   {
      return this .getGeometry () .intersectsBox (box, clipPlanes, modelViewMatrix);
   },
   traverse: function (type, renderObject)
   {
      // Always look at ParticleSystem if you do modify something here and there.

      switch (type)
      {
         case TraverseType .POINTER:
         {
            renderObject .addPointingShape (this);
            break;
         }
         case TraverseType .PICKING:
         {
            this .picking (renderObject);
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
               this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

            break;
         }
      }

      this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
   },
   picking: function (renderObject)
   {
      const modelMatrix = renderObject .getModelViewMatrix () .get ();

      if (this .getTransformSensors () .size)
      {
         for (const transformSensorNode of this .getTransformSensors ())
            transformSensorNode .collect (modelMatrix);
      }

      const
         browser          = this .getBrowser (),
         pickSensorStack  = browser .getPickSensors (),
         pickingHierarchy = browser .getPickingHierarchy ();

      pickingHierarchy .push (this);

      for (const pickSensor of pickSensorStack .at (-1))
      {
         pickSensor .collect (this .getGeometry (), modelMatrix, pickingHierarchy);
      }

      pickingHierarchy .pop ();
   },
   displaySimple: function (gl, renderContext, shaderNode)
   {
      this .getGeometry () .displaySimple (gl, renderContext, shaderNode);
   },
   display: function (gl, renderContext)
   {
      this .getGeometry () .display (gl, renderContext);
   },
});

export default Shape;
