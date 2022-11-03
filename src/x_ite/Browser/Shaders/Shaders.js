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
   "text!assets/shaders/webgl1/include/ClipPlanes.glsl",
   "text!assets/shaders/webgl1/include/Colors.glsl",
   "text!assets/shaders/webgl1/include/Fog.glsl",
   "text!assets/shaders/webgl1/include/Fragment.glsl",
   "text!assets/shaders/webgl1/include/Hatch.glsl",
   "text!assets/shaders/webgl1/include/Material.glsl",
   "text!assets/shaders/webgl1/include/Normal.glsl",
   "text!assets/shaders/webgl1/include/Pack.glsl",
   "text!assets/shaders/webgl1/include/Perlin.glsl",
   "text!assets/shaders/webgl1/include/Point.glsl",
   "text!assets/shaders/webgl1/include/PointSize.glsl",
   "text!assets/shaders/webgl1/include/Shadow.glsl",
   "text!assets/shaders/webgl1/include/SpotFactor.glsl",
   "text!assets/shaders/webgl1/include/Texture.glsl",
   "text!assets/shaders/webgl1/include/Vertex.glsl",

   "text!assets/shaders/webgl2/include/ClipPlanes.glsl",
   "text!assets/shaders/webgl2/include/Colors.glsl",
   "text!assets/shaders/webgl2/include/Fog.glsl",
   "text!assets/shaders/webgl2/include/Fragment.glsl",
   "text!assets/shaders/webgl2/include/Hatch.glsl",
   "text!assets/shaders/webgl2/include/Line2.glsl",
   "text!assets/shaders/webgl2/include/Material.glsl",
   "text!assets/shaders/webgl2/include/Normal.glsl",
   "text!assets/shaders/webgl2/include/Pack.glsl",
   "text!assets/shaders/webgl2/include/Particle.glsl",
   "text!assets/shaders/webgl2/include/Perlin.glsl",
   "text!assets/shaders/webgl2/include/Point.glsl",
   "text!assets/shaders/webgl2/include/PointSize.glsl",
   "text!assets/shaders/webgl2/include/Shadow.glsl",
   "text!assets/shaders/webgl2/include/Stipple.glsl",
   "text!assets/shaders/webgl2/include/SpotFactor.glsl",
   "text!assets/shaders/webgl2/include/Texture.glsl",
   "text!assets/shaders/webgl2/include/Vertex.glsl",
   /* WebGL 1 */
   "text!assets/shaders/webgl1/Default.vs",
   "text!assets/shaders/webgl1/Depth.vs",
   "text!assets/shaders/webgl1/Gouraud.vs",
   "text!assets/shaders/webgl1/Depth.fs",
   "text!assets/shaders/webgl1/Gouraud.fs",
   "text!assets/shaders/webgl1/PBR.fs",
   "text!assets/shaders/webgl1/Phong.fs",
   "text!assets/shaders/webgl1/Unlit.fs",
   /* WebGL 2 */
   "text!assets/shaders/webgl2/Default.vs",
   "text!assets/shaders/webgl2/Depth.vs",
   "text!assets/shaders/webgl2/Gouraud.vs",
   "text!assets/shaders/webgl2/LineTransform.vs",
   "text!assets/shaders/webgl2/Depth.fs",
   "text!assets/shaders/webgl2/Gouraud.fs",
   "text!assets/shaders/webgl2/LineTransform.fs",
   "text!assets/shaders/webgl2/PBR.fs",
   "text!assets/shaders/webgl2/Phong.fs",
   "text!assets/shaders/webgl2/Unlit.fs",
],
function (/* WebGL 1 */
          ClipPlanes1,
          Colors1,
          Fog1,
          Fragment1,
          Hatch1,
          Material1,
          Normal1,
          Pack1,
          Perlin1,
          Point1,
          PointSize1,
          Shadow1,
          SpotFactor1,
          Texture1,
          Vertex1,
          /* WebGL 2 */
          ClipPlanes2,
          Colors2,
          Fog2,
          Fragment2,
          Hatch2,
          Line22,
          Material2,
          Normal2,
          Pack2,
          Particle2,
          Perlin2,
          Point2,
          PointSize2,
          Shadow2,
          Stipple2,
          SpotFactor2,
          Texture2,
          Vertex2,
          /* WebGL 1 */
          DefaultVertex1,
          DepthVertex1,
          GouraudVertex1,
          DepthFragment1,
          GouraudFragment1,
          PBRFragment1,
          PhongFragment1,
          UnlitFragment1,
          /* WebGL 2 */
          DefaultVertex2,
          DepthVertex2,
          GouraudVertex2,
          LineTransformVertex2,
          DepthFragment2,
          GouraudFragment2,
          LineTransformFragment2,
          PBRFragment2,
          PhongFragment2,
          UnlitFragment2)
{
"use strict";

   const Shaders = {
      includes: {
         1: {
            ClipPlanes: ClipPlanes1,
            Colors: Colors1,
            Fog: Fog1,
            Fragment: Fragment1,
            Hatch: Hatch1,
            Material: Material1,
            Normal: Normal1,
            Pack: Pack1,
            Perlin: Perlin1,
            Point: Point1,
            PointSize: PointSize1,
            Shadow: Shadow1,
            SpotFactor: SpotFactor1,
            Texture: Texture1,
            Vertex: Vertex1,
         },
         2: {
            ClipPlanes: ClipPlanes2,
            Colors: Colors2,
            Fog: Fog2,
            Fragment: Fragment2,
            Hatch: Hatch2,
            Line2: Line22,
            Material: Material2,
            Normal: Normal2,
            Pack: Pack2,
            Particle: Particle2,
            Perlin: Perlin2,
            Point: Point2,
            PointSize: PointSize2,
            Shadow: Shadow2,
            Stipple: Stipple2,
            SpotFactor: SpotFactor2,
            Texture: Texture2,
            Vertex: Vertex2,
         },
      },
      vertex: {
         1: {
            Default: DefaultVertex1,
            Depth: DepthVertex1,
            Gouraud: GouraudVertex1,
         },
         2: {
            Default: DefaultVertex2,
            Depth: DepthVertex2,
            Gouraud: GouraudVertex2,
            LineTransform: LineTransformVertex2,
         },
      },
      fragment: {
         1: {
            Depth: DepthFragment1,
            Gouraud: GouraudFragment1,
            PBR: PBRFragment1,
            Phong: PhongFragment1,
            Unlit: UnlitFragment1,
         },
         2: {
            Depth: DepthFragment2,
            Gouraud: GouraudFragment2,
            LineTransform: LineTransformFragment2,
            PBR: PBRFragment2,
            Phong: PhongFragment2,
            Unlit: UnlitFragment2,
         },
      },
   };

   return Shaders;
});
