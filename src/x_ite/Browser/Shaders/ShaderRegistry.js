/* WebGL 1 */
import Fragment1 from "../../../assets/shaders/webgl1/common/Fragment1.glsl.js";
import Texture1  from "../../../assets/shaders/webgl1/common/Texture1.glsl.js";
import Vertex1   from "../../../assets/shaders/webgl1/common/Vertex1.glsl.js";

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

/* WebGL 1 */
import FullScreenVertex1 from "../../../assets/shaders/webgl1/FullScreen1.vs.js";
import DefaultVertex1    from "../../../assets/shaders/webgl1/Default1.vs.js";
import DepthFragment1    from "../../../assets/shaders/webgl1/Depth1.fs.js";
import DepthVertex1      from "../../../assets/shaders/webgl1/Depth1.vs.js";
import MaterialFragment1 from "../../../assets/shaders/webgl1/Material1.fs.js";
import PhysicalFragment1 from "../../../assets/shaders/webgl1/Physical1.fs.js";
import PointingFragment1 from "../../../assets/shaders/webgl1/Pointing1.fs.js";
import PointingVertex1   from "../../../assets/shaders/webgl1/Pointing1.vs.js";
import UnlitFragment1    from "../../../assets/shaders/webgl1/Unlit1.fs.js";

/* WebGL 2 */
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

/* PBR 2 */
import BRDF2         from "../../../assets/shaders/webgl2/pbr/BRDF2.glsl.js";
import IBL2          from "../../../assets/shaders/webgl2/pbr/IBL2.glsl.js";
import MaterialInfo2 from "../../../assets/shaders/webgl2/pbr/MaterialInfo2.glsl.js";
import PBR2          from "../../../assets/shaders/webgl2/pbr/PBR2.glsl.js";
import Punctual2     from "../../../assets/shaders/webgl2/pbr/Punctual2.glsl.js";
import ToneMapping2  from "../../../assets/shaders/webgl2/pbr/ToneMapping2.glsl.js";

const ShaderRegistry = {
   includes: {
      1: {
         ClipPlanes: ClipPlanes2,
         Fog: Fog2,
         Fragment: Fragment1,
         Hatch: Hatch2,
         Lighting: Lighting2,
         Material: Material2,
         Normal: Normal2,
         Perlin: Perlin2,
         Point: Point2,
         PointSize: PointSize2,
         Shadow: Shadow2,
         Texture: Texture1,
         Unlit: Unlit2,
         Vertex: Vertex1,
         // PBR
         BRDF: BRDF2,
         IBL: IBL2,
         MaterialInfo: MaterialInfo2,
         PBR: PBR2,
         Punctual: Punctual2,
         ToneMapping: ToneMapping2,
      },
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
      1: {
         Default: DefaultVertex1,
         Depth: DepthVertex1,
         FullScreen: FullScreenVertex1,
         Pointing: PointingVertex1,
      },
      2: {
         Default: DefaultVertex2,
         Depth: DepthVertex2,
         FullScreen: FullScreenVertex2,
         LineTransform: LineTransformVertex2,
         Pointing: PointingVertex2,
      },
   },
   fragment: {
      1: {
         Depth: DepthFragment1,
         Material: MaterialFragment1,
         Physical: PhysicalFragment1,
         Pointing: PointingFragment1,
         Unlit: UnlitFragment1,
      },
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
   addInclude: function (name, shader1, shader2 = shader1)
   {
      this .includes [1] [name] = shader1;
      this .includes [2] [name] = shader2;
   },
   addFragment: function (name, shader1, shader2)
   {
      this .fragment [1] [name] = shader1;
      this .fragment [2] [name] = shader2;
   },
};

export default ShaderRegistry;
