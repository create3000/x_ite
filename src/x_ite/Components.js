import CoreComponent                 from "./Components/CoreComponent.js";
import EnvironmentalEffectsComponent from "./Components/EnvironmentalEffectsComponent.js";
import EnvironmentalSensorComponent  from "./Components/EnvironmentalSensorComponent.js";
import FollowersComponent            from "./Components/FollowersComponent.js";
import Geometry3DComponent           from "./Components/Geometry3DComponent.js";
import GroupingComponent             from "./Components/GroupingComponent.js";
import InterpolationComponent        from "./Components/InterpolationComponent.js";
import LayeringComponent             from "./Components/LayeringComponent.js";
import LightingComponent             from "./Components/LightingComponent.js";
import NavigationComponent           from "./Components/NavigationComponent.js";
import NetworkingComponent           from "./Components/NetworkingComponent.js";
import PointingDeviceSensorComponent from "./Components/PointingDeviceSensorComponent.js";
import RenderingComponent            from "./Components/RenderingComponent.js";
import ShadersComponent              from "./Components/ShadersComponent.js";
import ShapeComponent                from "./Components/ShapeComponent.js";
import SoundComponent                from "./Components/SoundComponent.js";
import TexturingComponent            from "./Components/TexturingComponent.js";
import TimeComponent                 from "./Components/TimeComponent.js";
import X3DBrowserContext             from "./Browser/X3DBrowserContext.js";

let external = false;

const Components =
{
   add ({ name, concreteNodes, abstractNodes, browserContext })
   {
      X3DBrowserContext .addComponent ({ name, concreteNodes, abstractNodes, browserContext, external });
   },
};

Components .add (CoreComponent);
Components .add (EnvironmentalEffectsComponent);
Components .add (EnvironmentalSensorComponent);
Components .add (FollowersComponent);
Components .add (Geometry3DComponent);
Components .add (GroupingComponent);
Components .add (InterpolationComponent);
Components .add (LayeringComponent);
Components .add (LightingComponent);
Components .add (NavigationComponent);
Components .add (NetworkingComponent);
Components .add (PointingDeviceSensorComponent);
Components .add (RenderingComponent);
Components .add (ShadersComponent);
Components .add (ShapeComponent);
Components .add (SoundComponent);
Components .add (TexturingComponent);
Components .add (TimeComponent);

external = true;

export default Components;
