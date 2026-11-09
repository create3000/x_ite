import Components                           from "../../x_ite/Components.js";
import X3DX_ITEContext                      from "../../x_ite/Browser/X_ITE/X3DX_ITEContext.js";
import AnisotropyMaterialExtension          from "../../x_ite/Components/X_ITE/AnisotropyMaterialExtension.js";
import BehaviorEngine                       from "../../x_ite/Components/X_ITE/BehaviorEngine.js";
import BlendMode                            from "../../x_ite/Components/X_ITE/BlendMode.js";
import ClearcoatMaterialExtension           from "../../x_ite/Components/X_ITE/ClearcoatMaterialExtension.js";
import DepthMode                            from "../../x_ite/Components/X_ITE/DepthMode.js";
import DiffuseTransmissionMaterialExtension from "../../x_ite/Components/X_ITE/DiffuseTransmissionMaterialExtension.js";
import DispersionMaterialExtension          from "../../x_ite/Components/X_ITE/DispersionMaterialExtension.js";
import EmissiveStrengthMaterialExtension    from "../../x_ite/Components/X_ITE/EmissiveStrengthMaterialExtension.js";
import HoverabilityExtension                from "../../x_ite/Components/X_ITE/HoverabilityExtension.js";
import InstancedShape                       from "../../x_ite/Components/X_ITE/InstancedShape.js";
import IORMaterialExtension                 from "../../x_ite/Components/X_ITE/IORMaterialExtension.js";
import IridescenceMaterialExtension         from "../../x_ite/Components/X_ITE/IridescenceMaterialExtension.js";
import RetroreflectionMaterialExtension     from "../../x_ite/Components/X_ITE/RetroreflectionMaterialExtension.js";
import ScatterMaterialExtension             from "../../x_ite/Components/X_ITE/ScatterMaterialExtension.js";
import SelectabilityExtension               from "../../x_ite/Components/X_ITE/SelectabilityExtension.js";
import SheenMaterialExtension               from "../../x_ite/Components/X_ITE/SheenMaterialExtension.js";
import SpecularGlossinessMaterial           from "../../x_ite/Components/X_ITE/SpecularGlossinessMaterial.js";
import SpecularMaterialExtension            from "../../x_ite/Components/X_ITE/SpecularMaterialExtension.js";
import TransmissionMaterialExtension        from "../../x_ite/Components/X_ITE/TransmissionMaterialExtension.js";
import VolumeMaterialExtension              from "../../x_ite/Components/X_ITE/VolumeMaterialExtension.js";
import X3DInteractivitySensorNode           from "../../x_ite/Components/X_ITE/X3DInteractivitySensorNode.js";
import X3DMaterialExtensionNode             from "../../x_ite/Components/X_ITE/X3DMaterialExtensionNode.js";

Components .add ({
   name: "X_ITE",
   concreteNodes:
   [
      AnisotropyMaterialExtension,
      BehaviorEngine,
      BlendMode,
      ClearcoatMaterialExtension,
      DepthMode,
      DiffuseTransmissionMaterialExtension,
      DispersionMaterialExtension,
      EmissiveStrengthMaterialExtension,
      HoverabilityExtension,
      InstancedShape,
      IORMaterialExtension,
      IridescenceMaterialExtension,
      RetroreflectionMaterialExtension,
      ScatterMaterialExtension,
      SelectabilityExtension,
      SheenMaterialExtension,
      SpecularGlossinessMaterial,
      SpecularMaterialExtension,
      TransmissionMaterialExtension,
      VolumeMaterialExtension,
   ],
   abstractNodes:
   [
      X3DInteractivitySensorNode,
      X3DMaterialExtensionNode,
   ],
   browserContext: X3DX_ITEContext,
});

export default undefined;
