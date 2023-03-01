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

/* WebGL 1 */
import ClipPlanes1            from "../../../assets/shaders/webgl1/include/ClipPlanes.glsl.js";
import Colors1                from "../../../assets/shaders/webgl1/include/Colors.glsl.js";
import Fog1                   from "../../../assets/shaders/webgl1/include/Fog.glsl.js";
import Fragment1              from "../../../assets/shaders/webgl1/include/Fragment.glsl.js";
import Hatch1                 from "../../../assets/shaders/webgl1/include/Hatch.glsl.js";
import Material1              from "../../../assets/shaders/webgl1/include/Material.glsl.js";
import Normal1                from "../../../assets/shaders/webgl1/include/Normal.glsl.js";
import Particle1              from "../../../assets/shaders/webgl1/include/Particle.glsl.js";
import Perlin1                from "../../../assets/shaders/webgl1/include/Perlin.glsl.js";
import Point1                 from "../../../assets/shaders/webgl1/include/Point.glsl.js";
import PointSize1             from "../../../assets/shaders/webgl1/include/PointSize.glsl.js";
import Shadow1                from "../../../assets/shaders/webgl1/include/Shadow.glsl.js";
import SpotFactor1            from "../../../assets/shaders/webgl1/include/SpotFactor.glsl.js";
import Texture1               from "../../../assets/shaders/webgl1/include/Texture.glsl.js";
import Vertex1                from "../../../assets/shaders/webgl1/include/Vertex.glsl.js";

/* WebGL 2 */
import ClipPlanes2            from "../../../assets/shaders/webgl2/include/ClipPlanes.glsl.js";
import Colors2                from "../../../assets/shaders/webgl2/include/Colors.glsl.js";
import Fog2                   from "../../../assets/shaders/webgl2/include/Fog.glsl.js";
import Fragment2              from "../../../assets/shaders/webgl2/include/Fragment.glsl.js";
import Hatch2                 from "../../../assets/shaders/webgl2/include/Hatch.glsl.js";
import Line22                 from "../../../assets/shaders/webgl2/include/Line2.glsl.js";
import Material2              from "../../../assets/shaders/webgl2/include/Material.glsl.js";
import Normal2                from "../../../assets/shaders/webgl2/include/Normal.glsl.js";
import Particle2              from "../../../assets/shaders/webgl2/include/Particle.glsl.js";
import Perlin2                from "../../../assets/shaders/webgl2/include/Perlin.glsl.js";
import Point2                 from "../../../assets/shaders/webgl2/include/Point.glsl.js";
import PointSize2             from "../../../assets/shaders/webgl2/include/PointSize.glsl.js";
import Shadow2                from "../../../assets/shaders/webgl2/include/Shadow.glsl.js";
import Stipple2               from "../../../assets/shaders/webgl2/include/Stipple.glsl.js";
import SpotFactor2            from "../../../assets/shaders/webgl2/include/SpotFactor.glsl.js";
import Texture2               from "../../../assets/shaders/webgl2/include/Texture.glsl.js";
import Vertex2                from "../../../assets/shaders/webgl2/include/Vertex.glsl.js";

/* WebGL 1 */
import DefaultVertex1         from "../../../assets/shaders/webgl1/Default.vs.js";
import PointingVertex1        from "../../../assets/shaders/webgl1/Pointing.vs.js";
import DepthVertex1           from "../../../assets/shaders/webgl1/Depth.vs.js";
import GouraudVertex1         from "../../../assets/shaders/webgl1/Gouraud.vs.js";
import PointingFragment1      from "../../../assets/shaders/webgl1/Pointing.fs.js";
import DepthFragment1         from "../../../assets/shaders/webgl1/Depth.fs.js";
import GouraudFragment1       from "../../../assets/shaders/webgl1/Gouraud.fs.js";
import PBRFragment1           from "../../../assets/shaders/webgl1/PBR.fs.js";
import PhongFragment1         from "../../../assets/shaders/webgl1/Phong.fs.js";
import UnlitFragment1         from "../../../assets/shaders/webgl1/Unlit.fs.js";

/* WebGL 2 */
import DefaultVertex2         from "../../../assets/shaders/webgl2/Default.vs.js";
import PointingVertex2        from "../../../assets/shaders/webgl2/Pointing.vs.js";
import DepthVertex2           from "../../../assets/shaders/webgl2/Depth.vs.js";
import GouraudVertex2         from "../../../assets/shaders/webgl2/Gouraud.vs.js";
import LineTransformVertex2   from "../../../assets/shaders/webgl2/LineTransform.vs.js";
import PointingFragment2      from "../../../assets/shaders/webgl2/Pointing.fs.js";
import DepthFragment2         from "../../../assets/shaders/webgl2/Depth.fs.js";
import GouraudFragment2       from "../../../assets/shaders/webgl2/Gouraud.fs.js";
import LineTransformFragment2 from "../../../assets/shaders/webgl2/LineTransform.fs.js";
import PBRFragment2           from "../../../assets/shaders/webgl2/PBR.fs.js";
import PhongFragment2         from "../../../assets/shaders/webgl2/Phong.fs.js";
import UnlitFragment2         from "../../../assets/shaders/webgl2/Unlit.fs.js";

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
         Particle: Particle1,
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
         Pointing: PointingVertex1,
         Depth: DepthVertex1,
         Gouraud: GouraudVertex1,
      },
      2: {
         Default: DefaultVertex2,
         Pointing: PointingVertex2,
         Depth: DepthVertex2,
         Gouraud: GouraudVertex2,
         LineTransform: LineTransformVertex2,
      },
   },
   fragment: {
      1: {
         Pointing: PointingFragment1,
         Depth: DepthFragment1,
         Gouraud: GouraudFragment1,
         PBR: PBRFragment1,
         Phong: PhongFragment1,
         Unlit: UnlitFragment1,
      },
      2: {
         Pointing: PointingFragment2,
         Depth: DepthFragment2,
         Gouraud: GouraudFragment2,
         LineTransform: LineTransformFragment2,
         PBR: PBRFragment2,
         Phong: PhongFragment2,
         Unlit: UnlitFragment2,
      },
   },
};

export default Shaders;
