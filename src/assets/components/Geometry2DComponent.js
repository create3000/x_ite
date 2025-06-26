import Components           from "../../x_ite/Components.js";
import X3DGeometry2DContext from "../../x_ite/Browser/Geometry2D/X3DGeometry2DContext.js";
import Arc2D                from "../../x_ite/Components/Geometry2D/Arc2D.js";
import ArcClose2D           from "../../x_ite/Components/Geometry2D/ArcClose2D.js";
import Circle2D             from "../../x_ite/Components/Geometry2D/Circle2D.js";
import Disk2D               from "../../x_ite/Components/Geometry2D/Disk2D.js";
import Polyline2D           from "../../x_ite/Components/Geometry2D/Polyline2D.js";
import Polypoint2D          from "../../x_ite/Components/Geometry2D/Polypoint2D.js";
import Rectangle2D          from "../../x_ite/Components/Geometry2D/Rectangle2D.js";
import TriangleSet2D        from "../../x_ite/Components/Geometry2D/TriangleSet2D.js";

Components .add ({
   name: "Geometry2D",
   concreteNodes:
   [
      Arc2D,
      ArcClose2D,
      Circle2D,
      Disk2D,
      Polyline2D,
      Polypoint2D,
      Rectangle2D,
      TriangleSet2D,
   ],
   abstractNodes:
   [
   ],
   browserContext: X3DGeometry2DContext,
});

export default undefined;
