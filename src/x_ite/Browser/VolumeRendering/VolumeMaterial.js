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

import UnlitMaterial from "../../Components/Shape/UnlitMaterial.js";
import vs            from "./VolumeStyle.vs.js";
import fs            from "./VolumeStyle.fs.js";

function VolumeMaterial (executionContext, volumeDataNode)
{
   UnlitMaterial .call (this, executionContext);

   this .volumeDataNode    = volumeDataNode;
   this .volumeShaderNodes = new Map ();
}

Object .assign (Object .setPrototypeOf (VolumeMaterial .prototype, UnlitMaterial .prototype),
{
   getVolumeShaders ()
   {
      return this .volumeShaderNodes;
   },
   getShader (geometryContext, renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "";

      key += renderObject .getRenderAndGlobalLightsKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += ".";
      key += localObjectsKeys .sort () .join (""); // ClipPlane, X3DLightNode

      return this .volumeShaderNodes .get (key)
         ?? this .createShader (key, geometryContext, renderContext);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         browser = this .getBrowser (),
         options = [ ];

      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      const objectsKeys = localObjectsKeys .concat (renderObject .getGlobalLightsKeys ());

      if (browser .getRenderingProperty ("XRSession"))
         options .push ("X3D_XR_SESSION");

      if (renderObject .getLogarithmicDepthBuffer ())
         options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

      if (renderObject .getOrderIndependentTransparency ())
         options .push ("X3D_ORDER_INDEPENDENT_TRANSPARENCY");

      switch (fogNode ?.getFogType ())
      {
         case 1:
            options .push ("X3D_FOG", "X3D_FOG_LINEAR");
            break;
         case 2:
            options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
            break;
      }

      const
         numClipPlanes = objectsKeys .reduce ((a, c) => a + (c === 0), 0),
         numLights     = objectsKeys .reduce ((a, c) => a + (c === 1), 0);

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES")
         options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
      }

      if (numLights)
      {
         options .push ("X3D_LIGHTING")
         options .push (`X3D_NUM_LIGHTS ${Math .min (numLights, browser .getMaxLights ())}`);
      }

      const shaderNode = this .volumeDataNode .createShader (options, vs, fs);

      this .volumeShaderNodes .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
   {
      this .volumeDataNode .setShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (VolumeMaterial,
{
   typeName:
   {
      value: "VolumeMaterial",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "material",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: UnlitMaterial .fieldDefinitions,
   },
});

export default VolumeMaterial;
