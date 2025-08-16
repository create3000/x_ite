import Components                   from "../../x_ite/Components.js";
import Contour2D                    from "../../x_ite/Components/NURBS/Contour2D.js";
import ContourPolyline2D            from "../../x_ite/Components/NURBS/ContourPolyline2D.js";
import NurbsCurve                   from "../../x_ite/Components/NURBS/NurbsCurve.js";
import NurbsCurve2D                 from "../../x_ite/Components/NURBS/NurbsCurve2D.js";
import NurbsOrientationInterpolator from "../../x_ite/Components/NURBS/NurbsOrientationInterpolator.js";
import NurbsPatchSurface            from "../../x_ite/Components/NURBS/NurbsPatchSurface.js";
import NurbsPositionInterpolator    from "../../x_ite/Components/NURBS/NurbsPositionInterpolator.js";
import NurbsSet                     from "../../x_ite/Components/NURBS/NurbsSet.js";
import NurbsSurfaceInterpolator     from "../../x_ite/Components/NURBS/NurbsSurfaceInterpolator.js";
import NurbsSweptSurface            from "../../x_ite/Components/NURBS/NurbsSweptSurface.js";
import NurbsSwungSurface            from "../../x_ite/Components/NURBS/NurbsSwungSurface.js";
import NurbsTextureCoordinate       from "../../x_ite/Components/NURBS/NurbsTextureCoordinate.js";
import NurbsTrimmedSurface          from "../../x_ite/Components/NURBS/NurbsTrimmedSurface.js";
import X3DNurbsControlCurveNode     from "../../x_ite/Components/NURBS/X3DNurbsControlCurveNode.js";
import X3DNurbsSurfaceGeometryNode  from "../../x_ite/Components/NURBS/X3DNurbsSurfaceGeometryNode.js";
import X3DParametricGeometryNode    from "../../x_ite/Components/NURBS/X3DParametricGeometryNode.js";

Components .add ({
   name: "NURBS",
   concreteNodes:
   [
      Contour2D,
      ContourPolyline2D,
      NurbsCurve,
      NurbsCurve2D,
      NurbsOrientationInterpolator,
      NurbsPatchSurface,
      NurbsPositionInterpolator,
      NurbsSet,
      NurbsSurfaceInterpolator,
      NurbsSweptSurface,
      NurbsSwungSurface,
      NurbsTextureCoordinate,
      NurbsTrimmedSurface,
   ],
   abstractNodes:
   [
      X3DNurbsControlCurveNode,
      X3DNurbsSurfaceGeometryNode,
      X3DParametricGeometryNode,
   ],
});

export default undefined;
