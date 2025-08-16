import AcousticProperties      from "./Shape/AcousticProperties.js";
import Appearance              from "./Shape/Appearance.js";
import FillProperties          from "./Shape/FillProperties.js";
import LineProperties          from "./Shape/LineProperties.js";
import Material                from "./Shape/Material.js";
import PhysicalMaterial        from "./Shape/PhysicalMaterial.js";
import PointProperties         from "./Shape/PointProperties.js";
import Shape                   from "./Shape/Shape.js";
import TwoSidedMaterial        from "./Shape/TwoSidedMaterial.js";
import UnlitMaterial           from "./Shape/UnlitMaterial.js";
import X3DAppearanceChildNode  from "./Shape/X3DAppearanceChildNode.js";
import X3DAppearanceNode       from "./Shape/X3DAppearanceNode.js";
import X3DMaterialNode         from "./Shape/X3DMaterialNode.js";
import X3DOneSidedMaterialNode from "./Shape/X3DOneSidedMaterialNode.js";
import X3DShapeNode            from "./Shape/X3DShapeNode.js";

export default {
   name: "Shape",
   concreteNodes:
   [
      AcousticProperties,
      Appearance,
      FillProperties,
      LineProperties,
      Material,
      PhysicalMaterial,
      PointProperties,
      Shape,
      TwoSidedMaterial,
      UnlitMaterial,
   ],
   abstractNodes:
   [
      X3DAppearanceChildNode,
      X3DAppearanceNode,
      X3DMaterialNode,
      X3DOneSidedMaterialNode,
      X3DShapeNode,
   ],
};
