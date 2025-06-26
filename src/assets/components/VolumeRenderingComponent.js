import Components                         from "../../x_ite/Components.js";
import X3DVolumeRenderingContext          from "../../x_ite/Browser/VolumeRendering/X3DVolumeRenderingContext.js";
import BlendedVolumeStyle                 from "../../x_ite/Components/VolumeRendering/BlendedVolumeStyle.js";
import BoundaryEnhancementVolumeStyle     from "../../x_ite/Components/VolumeRendering/BoundaryEnhancementVolumeStyle.js";
import CartoonVolumeStyle                 from "../../x_ite/Components/VolumeRendering/CartoonVolumeStyle.js";
import ComposedVolumeStyle                from "../../x_ite/Components/VolumeRendering/ComposedVolumeStyle.js";
import EdgeEnhancementVolumeStyle         from "../../x_ite/Components/VolumeRendering/EdgeEnhancementVolumeStyle.js";
import IsoSurfaceVolumeData               from "../../x_ite/Components/VolumeRendering/IsoSurfaceVolumeData.js";
import OpacityMapVolumeStyle              from "../../x_ite/Components/VolumeRendering/OpacityMapVolumeStyle.js";
import ProjectionVolumeStyle              from "../../x_ite/Components/VolumeRendering/ProjectionVolumeStyle.js";
import SegmentedVolumeData                from "../../x_ite/Components/VolumeRendering/SegmentedVolumeData.js";
import ShadedVolumeStyle                  from "../../x_ite/Components/VolumeRendering/ShadedVolumeStyle.js";
import SilhouetteEnhancementVolumeStyle   from "../../x_ite/Components/VolumeRendering/SilhouetteEnhancementVolumeStyle.js";
import ToneMappedVolumeStyle              from "../../x_ite/Components/VolumeRendering/ToneMappedVolumeStyle.js";
import VolumeData                         from "../../x_ite/Components/VolumeRendering/VolumeData.js";
import X3DComposableVolumeRenderStyleNode from "../../x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode.js";
import X3DVolumeDataNode                  from "../../x_ite/Components/VolumeRendering/X3DVolumeDataNode.js";
import X3DVolumeRenderStyleNode           from "../../x_ite/Components/VolumeRendering/X3DVolumeRenderStyleNode.js";

Components .add ({
   name: "VolumeRendering",
   concreteNodes:
   [
      BlendedVolumeStyle,
      BoundaryEnhancementVolumeStyle,
      CartoonVolumeStyle,
      ComposedVolumeStyle,
      EdgeEnhancementVolumeStyle,
      IsoSurfaceVolumeData,
      OpacityMapVolumeStyle,
      ProjectionVolumeStyle,
      SegmentedVolumeData,
      ShadedVolumeStyle,
      SilhouetteEnhancementVolumeStyle,
      ToneMappedVolumeStyle,
      VolumeData,
   ],
   abstractNodes:
   [
      X3DComposableVolumeRenderStyleNode,
      X3DVolumeDataNode,
      X3DVolumeRenderStyleNode,
   ],
   browserContext: X3DVolumeRenderingContext,
});

export default undefined;
