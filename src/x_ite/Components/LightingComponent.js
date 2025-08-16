import DirectionalLight from "./Lighting/DirectionalLight.js";
import EnvironmentLight from "./Lighting/EnvironmentLight.js";
import PointLight       from "./Lighting/PointLight.js";
import SpotLight        from "./Lighting/SpotLight.js";
import X3DLightNode     from "./Lighting/X3DLightNode.js";

export default {
   name: "Lighting",
   concreteNodes:
   [
      DirectionalLight,
      EnvironmentLight,
      PointLight,
      SpotLight,
   ],
   abstractNodes:
   [
      X3DLightNode,
   ],
};
