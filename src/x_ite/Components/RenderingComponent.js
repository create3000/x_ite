import ClipPlane                from "./Rendering/ClipPlane.js";
import Color                    from "./Rendering/Color.js";
import ColorRGBA                from "./Rendering/ColorRGBA.js";
import Coordinate               from "./Rendering/Coordinate.js";
import CoordinateDouble         from "./Rendering/CoordinateDouble.js";
import IndexedLineSet           from "./Rendering/IndexedLineSet.js";
import IndexedTriangleFanSet    from "./Rendering/IndexedTriangleFanSet.js";
import IndexedTriangleSet       from "./Rendering/IndexedTriangleSet.js";
import IndexedTriangleStripSet  from "./Rendering/IndexedTriangleStripSet.js";
import LineSet                  from "./Rendering/LineSet.js";
import Normal                   from "./Rendering/Normal.js";
import PointSet                 from "./Rendering/PointSet.js";
import Tangent                  from "./Rendering/Tangent.js";
import TriangleFanSet           from "./Rendering/TriangleFanSet.js";
import TriangleSet              from "./Rendering/TriangleSet.js";
import TriangleStripSet         from "./Rendering/TriangleStripSet.js";
import X3DColorNode             from "./Rendering/X3DColorNode.js";
import X3DComposedGeometryNode  from "./Rendering/X3DComposedGeometryNode.js";
import X3DCoordinateNode        from "./Rendering/X3DCoordinateNode.js";
import X3DGeometricPropertyNode from "./Rendering/X3DGeometricPropertyNode.js";
import X3DGeometryNode          from "./Rendering/X3DGeometryNode.js";
import X3DNormalNode            from "./Rendering/X3DNormalNode.js";
import X3DTangentNode           from "./Rendering/X3DTangentNode.js";

export default {
   name: "Rendering",
   concreteNodes:
   [
      ClipPlane,
      Color,
      ColorRGBA,
      Coordinate,
      CoordinateDouble,
      IndexedLineSet,
      IndexedTriangleFanSet,
      IndexedTriangleSet,
      IndexedTriangleStripSet,
      LineSet,
      Normal,
      PointSet,
      Tangent,
      TriangleFanSet,
      TriangleSet,
      TriangleStripSet,
   ],
   abstractNodes:
   [
      X3DColorNode,
      X3DComposedGeometryNode,
      X3DCoordinateNode,
      X3DGeometricPropertyNode,
      X3DGeometryNode,
      X3DNormalNode,
      X3DTangentNode,
   ],
};
