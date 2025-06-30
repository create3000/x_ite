import ColorChaser       from "./Followers/ColorChaser.js";
import ColorDamper       from "./Followers/ColorDamper.js";
import CoordinateChaser  from "./Followers/CoordinateChaser.js";
import CoordinateDamper  from "./Followers/CoordinateDamper.js";
import OrientationChaser from "./Followers/OrientationChaser.js";
import OrientationDamper from "./Followers/OrientationDamper.js";
import PositionChaser    from "./Followers/PositionChaser.js";
import PositionChaser2D  from "./Followers/PositionChaser2D.js";
import PositionDamper    from "./Followers/PositionDamper.js";
import PositionDamper2D  from "./Followers/PositionDamper2D.js";
import ScalarChaser      from "./Followers/ScalarChaser.js";
import ScalarDamper      from "./Followers/ScalarDamper.js";
import TexCoordChaser2D  from "./Followers/TexCoordChaser2D.js";
import TexCoordDamper2D  from "./Followers/TexCoordDamper2D.js";
import X3DChaserNode     from "./Followers/X3DChaserNode.js";
import X3DDamperNode     from "./Followers/X3DDamperNode.js";
import X3DFollowerNode   from "./Followers/X3DFollowerNode.js";

export default {
   name: "Followers",
   concreteNodes:
   [
      ColorChaser,
      ColorDamper,
      CoordinateChaser,
      CoordinateDamper,
      OrientationChaser,
      OrientationDamper,
      PositionChaser,
      PositionChaser2D,
      PositionDamper,
      PositionDamper2D,
      ScalarChaser,
      ScalarDamper,
      TexCoordChaser2D,
      TexCoordDamper2D,
   ],
   abstractNodes:
   [
      X3DChaserNode,
      X3DDamperNode,
      X3DFollowerNode,
   ],
};
