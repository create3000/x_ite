/* WebGL 2 */
import ClipPlanes2 from "../../../assets/shaders/webgl2/common/ClipPlanes2.glsl.js";
import Fog2        from "../../../assets/shaders/webgl2/common/Fog2.glsl.js";
import Fragment2   from "../../../assets/shaders/webgl2/common/Fragment2.glsl.js";
import Hatch2      from "../../../assets/shaders/webgl2/common/Hatch2.glsl.js";
import Lighting2   from "../../../assets/shaders/webgl2/common/Lighting2.glsl.js";
import Line22      from "../../../assets/shaders/webgl2/common/Line22.glsl.js";
import Material2   from "../../../assets/shaders/webgl2/common/Material2.glsl.js";
import Normal2     from "../../../assets/shaders/webgl2/common/Normal2.glsl.js";
import Instancing2 from "../../../assets/shaders/webgl2/common/Instancing2.glsl.js";
import Perlin2     from "../../../assets/shaders/webgl2/common/Perlin2.glsl.js";
import Point2      from "../../../assets/shaders/webgl2/common/Point2.glsl.js";
import PointSize2  from "../../../assets/shaders/webgl2/common/PointSize2.glsl.js";
import Shadow2     from "../../../assets/shaders/webgl2/common/Shadow2.glsl.js";
import Stipple2    from "../../../assets/shaders/webgl2/common/Stipple2.glsl.js";
import Texture2    from "../../../assets/shaders/webgl2/common/Texture2.glsl.js";
import Unlit2      from "../../../assets/shaders/webgl2/common/Unlit2.glsl.js";
import Utils2      from "../../../assets/shaders/webgl2/common/Utils2.glsl.js";
import Vertex2     from "../../../assets/shaders/webgl2/common/Vertex2.glsl.js";

/* PBR 2 */
import BRDF2         from "../../../assets/shaders/webgl2/pbr/BRDF2.glsl.js";
import IBL2          from "../../../assets/shaders/webgl2/pbr/IBL2.glsl.js";
import MaterialInfo2 from "../../../assets/shaders/webgl2/pbr/MaterialInfo2.glsl.js";
import PBR2          from "../../../assets/shaders/webgl2/pbr/PBR2.glsl.js";
import Punctual2     from "../../../assets/shaders/webgl2/pbr/Punctual2.glsl.js";
import ToneMapping2  from "../../../assets/shaders/webgl2/pbr/ToneMapping2.glsl.js";

/* WebGL 2 Vertex and Fragment */
import FullScreenVertex2      from "../../../assets/shaders/webgl2/FullScreen2.vs.js";
import DefaultVertex2         from "../../../assets/shaders/webgl2/Default2.vs.js";
import DepthFragment2         from "../../../assets/shaders/webgl2/Depth2.fs.js";
import DepthVertex2           from "../../../assets/shaders/webgl2/Depth2.vs.js";
import MaterialFragment2      from "../../../assets/shaders/webgl2/Material2.fs.js";
import LineTransformFragment2 from "../../../assets/shaders/webgl2/LineTransform2.fs.js";
import LineTransformVertex2   from "../../../assets/shaders/webgl2/LineTransform2.vs.js";
import OITComposeFragment2    from "../../../assets/shaders/webgl2/OITCompose2.fs.js";
import PhysicalFragment2      from "../../../assets/shaders/webgl2/Physical2.fs.js";
import PointingFragment2      from "../../../assets/shaders/webgl2/Pointing2.fs.js";
import PointingVertex2        from "../../../assets/shaders/webgl2/Pointing2.vs.js";
import UnlitFragment2         from "../../../assets/shaders/webgl2/Unlit2.fs.js";

const ShaderRegistry = {
   includes: {
      2: {
         ClipPlanes: ClipPlanes2,
         Fog: Fog2,
         Fragment: Fragment2,
         Hatch: Hatch2,
         Instancing: Instancing2,
         Lighting: Lighting2,
         Line2: Line22,
         Material: Material2,
         Normal: Normal2,
         Perlin: Perlin2,
         Point: Point2,
         PointSize: PointSize2,
         Shadow: Shadow2,
         Stipple: Stipple2,
         Texture: Texture2,
         Unlit: Unlit2,
         Utils: Utils2,
         Vertex: Vertex2,
         // PBR
         BRDF: BRDF2,
         IBL: IBL2,
         MaterialInfo: MaterialInfo2,
         PBR: PBR2,
         Punctual: Punctual2,
         ToneMapping: ToneMapping2,
      },
   },
   vertex: {
      2: {
         Default: DefaultVertex2,
         Depth: DepthVertex2,
         FullScreen: FullScreenVertex2,
         LineTransform: LineTransformVertex2,
         Pointing: PointingVertex2,
      },
   },
   fragment: {
      2: {
         Depth: DepthFragment2,
         LineTransform: LineTransformFragment2,
         Material: MaterialFragment2,
         OITCompose: OITComposeFragment2,
         Physical: PhysicalFragment2,
         Pointing: PointingFragment2,
         Unlit: UnlitFragment2,
      },
   },
   addInclude: function (name, shader2)
   {
      this .includes [2] [name] = shader2;
   },
   addFragment: function (name, shader2)
   {
      this .fragment [2] [name] = shader2;
   },
};

export default ShaderRegistry;
