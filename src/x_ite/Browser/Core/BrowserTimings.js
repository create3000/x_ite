import X3DBaseNode  from "../../Base/X3DBaseNode.js";
import StopWatch    from "../../../standard/Time/StopWatch.js";
import X3DConstants from "../../Base/X3DConstants.js";
import GeometryType from "../Shape/GeometryType.js";
import _            from "../../../locale/gettext.js";

function BrowserTimings (executionContext)
{
   X3DBaseNode .call (this, executionContext);

   // Private properties

   this .localStorage  = this .getBrowser () .getLocalStorage () .addNameSpace ("BrowserTimings.");
   this .fps           = new StopWatch ();
   this .primitives    = { };
}

Object .assign (Object .setPrototypeOf (BrowserTimings .prototype, X3DBaseNode .prototype),
{
   initialize ()
   {
      X3DBaseNode .prototype .initialize .call (this);

      this .localStorage .setDefaultValues ({ type: "LESS" });

      this .localStorage .type = this .localStorage .type === "MORE" ? "LESS" : "MORE";

      // HTML

      const html = /* html */ `
<div class="x_ite-private-browser-timings x_ite-private-hidden"><table>
   <thead>
      <tr>
         <th colspan="2">${_("Browser Timings")}</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>${_("Frame rate")}:</td>
         <td class="frame-rate"></td>
      </tr>
      <tr class="x_ite-private-more">
         <td>${_("Speed")}:</td>
         <td class="speed"></td>
      </tr>
      <tr>
         <td>${_("Browser")}:</td>
         <td class="browser-time"></td>
      </tr>
      <tr>
         <td>${_("X3D total")}:</td>
         <td class="x3d-total"></td>
      </tr>
      <tr>
         <td>${_("Event Processing")}:</td>
         <td class="event-processing"></td>
      </tr>
      <tr>
         <td>${_("Pointer")}:</td>
         <td class="pointer"></td>
      </tr>
      <tr>
         <td>${_("Camera")}:</td>
         <td class="camera"></td>
      </tr>
      <tr>
         <td>${_("Picking")}:</td>
         <td class="picking"></td>
      </tr>
      <tr>
         <td>${_("Collision Detection")}:</td>
         <td class="collision-detection"></td>
      </tr>
      <tr>
         <td>${_("Rendering")}:</td>
         <td class="rendering"></td>
      </tr>
      <tr>
         <td>${_("Number of Primitives")}:</td>
         <td class="primitives pointer" title="${_("Points; Lines; Triangles")}"></td>
      </tr>
      <tr>
         <td>${_("Number of Shapes")}:</td>
         <td class="shapes pointer" title="${_("Opaque Shapes + Transparent Shapes")}"></td>
      </tr>
      <tr>
         <td>${_("Number of Sensors")}:</td>
         <td class="sensors"></td>
      </tr>
   </tbody>
   <tfoot>
      <tr>
         <td colspan="2"><button></button></td>
      </tr>
   </tfoot>
</table></div>`;

      this .getBrowser () .getSurface () .insertAdjacentHTML ("beforeend", html);

      const element = this .getBrowser () .getSurface () .querySelector (":scope > :last-child");

      this .element         = element;
      this .table           = element .querySelector ("table");
      this .frameRate       = element .querySelector (".frame-rate");
      this .speed           = element .querySelector (".speed");
      this .browserTime     = element .querySelector (".browser-time");
      this .x3dTotal        = element .querySelector (".x3d-total");
      this .eventProcessing = element .querySelector (".event-processing");
      this .pointerTime     = element .querySelector (".pointer");
      this .cameraTime      = element .querySelector (".camera");
      this .pickingTime     = element .querySelector (".picking");
      this .collisionTime   = element .querySelector (".collision-detection");
      this .renderTime      = element .querySelector (".rendering");
      this .numPrimitives   = element .querySelector (".primitives");
      this .numShapes       = element .querySelector (".shapes");
      this .sensors         = element .querySelector (".sensors");
      this .button          = element .querySelector ("button");

      // Events

      this .button .addEventListener ("click",    this .set_type__ .bind (this));
      this .button .addEventListener ("touchend", this .set_type__ .bind (this));

      this .getBrowser () .getBrowserOptions () ._Timings .addInterest ("set_enabled__", this);

      this .set_type__ ();
   },
   set_enabled__ ()
   {
      const { element } = this;

      if (this .getBrowser () .getBrowserOption ("Timings"))
      {
         element .classList .remove ("x_ite-private-fade-out-300", "x_ite-private-hidden");
         element .classList .add ("x_ite-private-fade-in-300");

         this .getBrowser () .addBrowserCallback (this, X3DConstants .INITIALIZED_EVENT, () => this .reset ());
         this .getBrowser () .prepareEvents () .addInterest ("update", this);
         this .reset ();
      }
      else
      {
         element .classList .remove ("x_ite-private-fade-in-300");
         element .classList .add ("x_ite-private-fade-out-300");

         this .getBrowser () .removeBrowserCallback (this, X3DConstants .INITIALIZED_EVENT);
         this .getBrowser () .prepareEvents () .removeInterest ("update", this);
      }
   },
   set_type__ ()
   {
      const { localStorage, table, button } = this;

      if (localStorage .type === "MORE")
      {
         localStorage .type = "LESS";
         table .classList .add ("less");
         table .classList .remove ("more");
         button .textContent = _("More Properties");
      }
      else
      {
         localStorage .type = "MORE";
         table .classList .add ("more");
         table .classList .remove ("less");
         button .textContent = _("Less Properties");
      }

      this .build ();
   },
   async reset ()
   {
      await this .getBrowser () .nextFrame ();

      this .fps .reset ();
      this .build ();
   },
   update ()
   {
      this .fps .stop ();

      if (this .fps .elapsedTime > 1000)
      {
         this .build ();
         this .fps .reset ();
      }

      this .fps .start ();
   },
   build ()
   {
      const browser = this .getBrowser ();

      if (this .fps .elapsedTime)
      {
         this .frameRate .textContent = `${f2 (1000 / this .fps .averageTime)} ${_("fps")}`;
         this .speed .textContent = `${f2 (this .getSpeed (browser .currentSpeed ))} ${this .getSpeedUnit (browser .currentSpeed)}`;
      }
      else
      {
         this .frameRate .textContent = `${f2 (0)} ${_("fps")}`;
         this .speed .textContent = `${f2 (this .getSpeed (0))} ${this .getSpeedUnit (0)}`;
      }

      if (this .localStorage .type !== "MORE" || !browser .getWorld ())
         return;

      const
         layers            = browser .getWorld () .getLayerSet () .getLayers (),
         activeLayer       = browser .getActiveLayer (),
         navigationTime    = activeLayer ?.getCollisionTime () .averageTime ?? 0,
         collisionTime     = browser .getCollisionTime () .averageTime + navigationTime,
         routingTime       = Math .max (0, browser .getBrowserTime () .averageTime - (browser .getCameraTime () .averageTime + browser .getCollisionTime () .averageTime + browser .getDisplayTime () .averageTime)),
         prepareEvents     = browser .prepareEvents () .getInterests () .size - 1,
         sensors           = browser .timeEvents () .getInterests () .size + browser .sensorEvents () .getInterests () .size + browser .getCollisionCount (),
         primitives        = this .getPrimitives (layers),
         opaqueShapes      = this .getOpaqueShapes (layers),
         transparentShapes = this .getTransparentShapes (layers);

      this .browserTime     .textContent = `${f2 (browser .getSystemTime () .averageTime)} ${_("ms")}`;
      this .x3dTotal        .textContent = `${f2 (browser .getBrowserTime () .averageTime)} ${_("ms")}`;
      this .eventProcessing .textContent = `${f2 (routingTime)} ${_("ms")}`;
      this .pointerTime     .textContent = `${f2 (browser .getPointingTime () .averageTime)} ${_("ms")}`;
      this .cameraTime      .textContent = `${f2 (browser .getCameraTime () .averageTime)} ${_("ms")}`;
      this .pickingTime     .textContent = `${f2 (browser .getPickingTime () .averageTime)} ${_("ms")}`;
      this .collisionTime   .textContent = `${f2 (collisionTime)} ${_("ms")}`;
      this .renderTime      .textContent = `${f2 (browser .getDisplayTime () .averageTime)} ${_("ms")}`;
      this .numPrimitives   .textContent = `${f0 (primitives .points)}; ${f0 (primitives .lines)}; ${f0 (primitives .triangles)}`;
      this .numShapes       .textContent = `${f0 (opaqueShapes)} + ${f0 (transparentShapes)}`;
      this .sensors         .textContent = f0 (prepareEvents + sensors);

      browser .getSystemTime ()    .reset ();
      browser .getBrowserTime ()   .reset ();
      browser .getPointingTime ()  .reset ();
      browser .getCameraTime ()    .reset ();
      browser .getPickingTime ()   .reset ();
      browser .getCollisionTime () .reset ();
      browser .getDisplayTime ()   .reset ();

      activeLayer ?.getCollisionTime () .reset ();
   },
   getSpeed (speed)
   {
      if (speed < 15)
         return speed;

      return speed * 3.6;
   },
   getSpeedUnit (speed)
   {
      if (speed < 15)
         return _("m/s");

      return _("km/h");
   },
   getPrimitives (layerNodes)
   {
      this .primitives .points    = 0;
      this .primitives .lines     = 0;
      this .primitives .triangles = 0;

      for (const layerNode of layerNodes)
      {
         const
            numOpaqueShapes      = layerNode .getNumOpaqueShapes (),
            numTransparentShapes = layerNode .getNumTransparentShapes (),
            opaqueShapes         = layerNode .getOpaqueShapes (),
            transparentShapes    = layerNode .getTransparentShapes ();

         this .countPrimitives (opaqueShapes,      numOpaqueShapes);
         this .countPrimitives (transparentShapes, numTransparentShapes);
      }

      return this .primitives;
   },
   countPrimitives (shapes, numShapes)
   {
      for (let i = 0; i < numShapes; ++ i)
      {
         const
            shapeNode    = shapes [i] .shapeNode,
            numInstances = shapeNode .getNumInstances ();

         if (!shapeNode .getExecutionContext () .getCountPrimitives ())
            continue;

         switch (shapeNode .getGeometryType ())
         {
            case GeometryType .POINT:
            {
               this .primitives .points += numInstances;
               continue;
            }
            case GeometryType .LINE:
            {
               this .primitives .lines += numInstances;
               continue;
            }
            case GeometryType .TRIANGLE:
            case GeometryType .QUAD:
            case GeometryType .SPRITE:
            {
               this .primitives .triangles += numInstances * 2;
               continue;
            }
            case GeometryType .GEOMETRY:
            {
               const geometryNode = shapeNode .getGeometry ();

               // ParticleSystem nodes may have no geometry.
               if (!geometryNode)
                  continue;

               const vertices = geometryNode .getVertices () .length / 4 * numInstances;

               switch (geometryNode .getGeometryType ())
               {
                  case 0:
                  {
                     this .primitives .points += vertices;
                     break;
                  }
                  case 1:
                  {
                     this .primitives .lines += vertices / 2;
                     break;
                  }
                  case 2:
                  case 3:
                  {
                     this .primitives .triangles += vertices / 3;
                     break;
                  }
               }

               continue;
            }
         }
      }
   },
   getOpaqueShapes (layers)
   {
      return layers .reduce ((n, layer) => n + this .countShapes (layer .getOpaqueShapes (), layer .getNumOpaqueShapes ()), 0);
   },
   getTransparentShapes (layers)
   {
      return layers .reduce ((n, layer) => n + this .countShapes (layer .getTransparentShapes (), layer .getNumTransparentShapes ()), 0);
   },
   countShapes (shapes, numShapes)
   {
      let count = 0;

      for (let i = 0; i < numShapes; ++ i)
      {
         if (!shapes [i] .shapeNode .getExecutionContext () .getCountPrimitives ())
            continue;

         ++ count;
      }

      return count;
   },
});

Object .defineProperties (BrowserTimings,
{
   typeName:
   {
      value: "BrowserTimings",
      enumerable: true,
   },
});

function format (minimumFractionDigits, maximumFractionDigits)
{
   const format = new Intl .NumberFormat (navigator .language || navigator .userLanguage, {
      notation: "standard",
      minimumFractionDigits,
      maximumFractionDigits,
   }) .format;

   return function (value)
   {
      return format (Number .isFinite (value) ? value : 0);
   };
}

const
   f0 = format (0, 0),
   f2 = format (2, 2);

export default BrowserTimings;
