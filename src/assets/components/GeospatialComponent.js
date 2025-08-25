import Components              from "../../x_ite/Components.js";
import GeoCoordinate           from "../../x_ite/Components/Geospatial/GeoCoordinate.js";
import GeoElevationGrid        from "../../x_ite/Components/Geospatial/GeoElevationGrid.js";
import GeoLOD                  from "../../x_ite/Components/Geospatial/GeoLOD.js";
import GeoLocation             from "../../x_ite/Components/Geospatial/GeoLocation.js";
import GeoMetadata             from "../../x_ite/Components/Geospatial/GeoMetadata.js";
import GeoOrigin               from "../../x_ite/Components/Geospatial/GeoOrigin.js";
import GeoPositionInterpolator from "../../x_ite/Components/Geospatial/GeoPositionInterpolator.js";
import GeoProximitySensor      from "../../x_ite/Components/Geospatial/GeoProximitySensor.js";
import GeoTouchSensor          from "../../x_ite/Components/Geospatial/GeoTouchSensor.js";
import GeoTransform            from "../../x_ite/Components/Geospatial/GeoTransform.js";
import GeoViewpoint            from "../../x_ite/Components/Geospatial/GeoViewpoint.js";
import X3DGeospatialObject     from "../../x_ite/Components/Geospatial/X3DGeospatialObject.js";

Components .add ({
   name: "Geospatial",
   concreteNodes:
   [
      GeoCoordinate,
      GeoElevationGrid,
      GeoLOD,
      GeoLocation,
      GeoMetadata,
      GeoOrigin,
      GeoPositionInterpolator,
      GeoProximitySensor,
      GeoTouchSensor,
      GeoTransform,
      GeoViewpoint,
   ],
   abstractNodes:
   [
      X3DGeospatialObject,
   ],
});

export default undefined;
