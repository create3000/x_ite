import Components           from "../../x_ite/Components.js";
import X3DGeometry3DContext from "../../x_ite/Browser/Geometry3D/X3DGeometry3DContext.js";
import Box                  from "../../x_ite/Components/Geometry3D/Box.js";
import Cone                 from "../../x_ite/Components/Geometry3D/Cone.js";
import Cylinder             from "../../x_ite/Components/Geometry3D/Cylinder.js";
import ElevationGrid        from "../../x_ite/Components/Geometry3D/ElevationGrid.js";
import Extrusion            from "../../x_ite/Components/Geometry3D/Extrusion.js";
import IndexedFaceSet       from "../../x_ite/Components/Geometry3D/IndexedFaceSet.js";
import Sphere               from "../../x_ite/Components/Geometry3D/Sphere.js";

Components .add ({
   name: "Geometry3D",
   concreteNodes:
   [
      Box,
      Cone,
      Cylinder,
      ElevationGrid,
      Extrusion,
      IndexedFaceSet,
      Sphere,
   ],
   abstractNodes:
   [ ],
   browserContext: X3DGeometry3DContext,
});

export default undefined;
