import Background        from "./EnvironmentalEffects/Background.js";
import Fog               from "./EnvironmentalEffects/Fog.js";
import FogCoordinate     from "./EnvironmentalEffects/FogCoordinate.js";
import LocalFog          from "./EnvironmentalEffects/LocalFog.js";
import TextureBackground from "./EnvironmentalEffects/TextureBackground.js";
import X3DBackgroundNode from "./EnvironmentalEffects/X3DBackgroundNode.js";
import X3DFogObject      from "./EnvironmentalEffects/X3DFogObject.js";

export default {
   name: "EnvironmentalEffects",
   concreteNodes:
   [
      Background,
      Fog,
      FogCoordinate,
      LocalFog,
      TextureBackground,
   ],
   abstractNodes:
   [
      X3DBackgroundNode,
      X3DFogObject,
   ],
};
