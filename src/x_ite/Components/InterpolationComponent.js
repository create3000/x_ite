import ColorInterpolator            from "./Interpolation/ColorInterpolator.js";
import CoordinateInterpolator       from "./Interpolation/CoordinateInterpolator.js";
import CoordinateInterpolator2D     from "./Interpolation/CoordinateInterpolator2D.js";
import EaseInEaseOut                from "./Interpolation/EaseInEaseOut.js";
import NormalInterpolator           from "./Interpolation/NormalInterpolator.js";
import OrientationInterpolator      from "./Interpolation/OrientationInterpolator.js";
import PositionInterpolator         from "./Interpolation/PositionInterpolator.js";
import PositionInterpolator2D       from "./Interpolation/PositionInterpolator2D.js";
import ScalarInterpolator           from "./Interpolation/ScalarInterpolator.js";
import SplinePositionInterpolator   from "./Interpolation/SplinePositionInterpolator.js";
import SplinePositionInterpolator2D from "./Interpolation/SplinePositionInterpolator2D.js";
import SplineScalarInterpolator     from "./Interpolation/SplineScalarInterpolator.js";
import SquadOrientationInterpolator from "./Interpolation/SquadOrientationInterpolator.js";
import X3DInterpolatorNode          from "./Interpolation/X3DInterpolatorNode.js";

export default {
   name: "Interpolation",
   concreteNodes:
   [
      ColorInterpolator,
      CoordinateInterpolator,
      CoordinateInterpolator2D,
      EaseInEaseOut,
      NormalInterpolator,
      OrientationInterpolator,
      PositionInterpolator,
      PositionInterpolator2D,
      ScalarInterpolator,
      SplinePositionInterpolator,
      SplinePositionInterpolator2D,
      SplineScalarInterpolator,
      SquadOrientationInterpolator,
   ],
   abstractNodes:
   [
      X3DInterpolatorNode,
   ],
};
