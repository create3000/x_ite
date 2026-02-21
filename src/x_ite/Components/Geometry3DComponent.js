import Box            from "./Geometry3D/Box.js";
import Cone           from "./Geometry3D/Cone.js";
import Cylinder       from "./Geometry3D/Cylinder.js";
import ElevationGrid  from "./Geometry3D/ElevationGrid.js";
import Extrusion      from "./Geometry3D/Extrusion.js";
import IndexedFaceSet from "./Geometry3D/IndexedFaceSet.js";
import Sphere         from "./Geometry3D/Sphere.js";

export default {
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
   [
   ],
};
