import Components                   from "../../x_ite/Components.js";
import CADAssembly                  from "../../x_ite/Components/CADGeometry/CADAssembly.js";
import CADFace                      from "../../x_ite/Components/CADGeometry/CADFace.js";
import CADLayer                     from "../../x_ite/Components/CADGeometry/CADLayer.js";
import CADPart                      from "../../x_ite/Components/CADGeometry/CADPart.js";
import IndexedQuadSet               from "../../x_ite/Components/CADGeometry/IndexedQuadSet.js";
import QuadSet                      from "../../x_ite/Components/CADGeometry/QuadSet.js";
import X3DProductStructureChildNode from "../../x_ite/Components/CADGeometry/X3DProductStructureChildNode.js";

Components .add ({
   name: "CADGeometry",
   concreteNodes:
   [
      CADAssembly,
      CADFace,
      CADLayer,
      CADPart,
      IndexedQuadSet,
      QuadSet,
   ],
   abstractNodes:
   [
      X3DProductStructureChildNode,
   ],
});

export default undefined;
