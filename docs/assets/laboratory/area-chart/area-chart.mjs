class AreaChart
{
   constructor (canvas)
   {
      this .canvas  = canvas;
      this .browser = canvas .browser;
   }

   async build (data, { border = 0, explode = 0, aspectRatio = 1, sort = true } = { })
   {
      // Sort descending by area.

      if (sort)
         data .sort ((a, b) => a .area - b .area);

      const
         profile    = this .browser .getProfile ("Immersive"),
         components = [this .browser .getComponent ("X_ITE")];

      this .scene   = await this .browser .createScene (profile, ... components);
      this .group   = this .scene .createNode ("Group");
      this .box     = this .scene .createNode ("Box");
      this .lineBox = this .createLineBox ();

      this .box .size = new X3D .SFVec3f (1, 1, 1);

      const maxHeight = data .reduce ((p, c) => Math .max (p, c .height), 0);

      for (const rectangle of this .arrangeAreas (data, aspectRatio))
         this .group .children .push (this .createBox (rectangle, maxHeight, 1 + explode));

      this .scene .rootNodes .push (this .createViewpoint (this .rectangle, 1 + explode + border));
      this .scene .rootNodes .push (this .createFloor (this .rectangle, 1 + explode + border));
      this .scene .rootNodes .push (this .createHeadlineText (this .rectangle, border, 1 + explode));
      this .scene .rootNodes .push (this .createAreaText (this .rectangle, border, 1 + explode));
      this .scene .rootNodes .push (this .group);

      await this .browser .replaceWorld (this .scene);
   }

   createViewpoint ({ x, y, width, height }, explode)
   {
      const
         viewpoint = this .scene .createNode ("Viewpoint"),
         distance  = (height * explode / 2) / Math .tan (Math .PI / 8) * Math .SQRT1_2 * 1.2;

      viewpoint .description = "Initial View";
      viewpoint .position    = new X3D .SFVec3f (0, distance, distance);
      viewpoint .orientation = new X3D .SFRotation (-1, 0, 0, Math .PI / 4);

      return viewpoint;
   }

   createFloor ({ x, y: z, width, height }, explode)
   {
      const
         scene      = this .scene,
         transform  = scene .createNode ("Transform"),
         shape      = scene .createNode ("Shape"),
         appearance = scene .createNode ("Appearance"),
         material   = scene .createNode ("Material"),
         box        = scene .createNode ("Box");

      appearance .material = material;
      shape .appearance    = appearance;
      shape .geometry      = box;
      transform .children  = [shape];

      material .diffuseColor = new X3D .SFColor (0.2, 0.2, 0.2);
      box .size              = new X3D .SFVec3f (1, 1, 1);

      transform .translation .x = x;
      transform .translation .y = -1;
      transform .translation .z = z;
      transform .rotation       = new X3D .SFRotation (1, 0, 0, Math .PI / 2);
      transform .scale .x       = width * explode;
      transform .scale .y       = height * explode;

      return transform;

   }

   createHeadlineText ({ x, y, width, height }, border, explode)
   {
      const
         scene      = this .scene,
         transform  = scene .createNode ("Transform"),
         shape      = scene .createNode ("Shape"),
         appearance = scene .createNode ("Appearance"),
         material   = scene .createNode ("Material"),
         depthMode  = scene .createNode ("DepthMode"),
         text       = this .scene .createNode ("Text"),
         fontStyle  = this .scene .createNode ("FontStyle");

      appearance .material  = material;
      appearance .depthMode = depthMode;
      shape .appearance     = appearance;
      shape .geometry       = text;
      transform .children   = [shape];

      material .diffuseColor   = new X3D .SFColor (0, 0, 0);
      depthMode .polygonOffset = new X3D .SFVec2f (-1, -1);

      text .string    = [`Area Chart`];
      text .fontStyle = fontStyle;
      text .solid     = true;

      fontStyle .size    = height * border / 2 * 0.5;
      fontStyle .justify = ["BEGIN", "MIDDLE"];

      transform .translation .x = -width / 2 * (explode + border / 2);
      transform .translation .z = height / 2 * explode;
      transform .rotation       = new X3D .SFRotation (-1, 0, 0, Math .PI / 2) .multiply (new X3D .SFRotation (0, 1, 0, Math .PI / 2));

      return transform;
   }

   createAreaText ({ x, y, width, height }, border, explode)
   {
      const
         scene      = this .scene,
         transform  = scene .createNode ("Transform"),
         shape      = scene .createNode ("Shape"),
         appearance = scene .createNode ("Appearance"),
         material   = scene .createNode ("Material"),
         depthMode  = scene .createNode ("DepthMode"),
         text       = this .scene .createNode ("Text"),
         fontStyle  = this .scene .createNode ("FontStyle");

      appearance .material  = material;
      appearance .depthMode = depthMode;
      shape .appearance     = appearance;
      shape .geometry       = text;
      transform .children   = [shape];

      material .diffuseColor = new X3D .SFColor (0, 0, 0);
      depthMode .depthTest   = false;

      text .string    = [`Total Area: ${Math .round (width * height)} m²`];
      text .fontStyle = fontStyle;
      text .solid     = true;

      fontStyle .size    = height * border / 2 * 0.75;
      fontStyle .justify = ["BEGIN", "MIDDLE"];

      transform .translation .x = -width / 2 * explode;
      transform .translation .z = height / 2 * (explode + border / 2);
      transform .rotation       = new X3D .SFRotation (-1, 0, 0, Math .PI / 2);

      return transform;
   }

   createBox ({ x, y: z, width, height: depth, data: { id, area, height } }, maxHeight, explode)
   {
      const
         scene       = this .scene,
         transform   = scene .createNode ("Transform"),
         touchSensor = scene .createNode ("TouchSensor"),
         switchNode  = scene .createNode ("Switch"),
         shape       = scene .createNode ("Shape"),
         appearance  = scene .createNode ("Appearance"),
         material    = scene .createNode ("Material"),
         box         = this .box;

      appearance .material = material;
      shape .appearance    = appearance;
      shape .geometry      = box;
      switchNode .children = [null, this .lineBox];
      transform .children  = [shape, touchSensor, switchNode];

      touchSensor .description = `Area: ${Math .round (width * depth)} m², Height ${height} m`;

      material .diffuseColor = this .createColor (height, maxHeight);

      transform .translation .x = x * explode;
      transform .translation .y = height / 2;
      transform .translation .z = z * explode;
      transform .scale .x       = width;
      transform .scale .y       = height;
      transform .scale .z       = depth;

      touchSensor .addFieldCallback ("areaChart", "isOver", value =>
      {
         switchNode .whichChoice = value;

         if (!value)
            return;

         $("#data-id")     .text (`${id}`);
         $("#data-area")   .text (`${area} m²`);
         $("#data-height") .text (`${height} m`);
      });

      return transform;
   }

   createLineBox ()
   {
      const
         scene          = this .scene,
         shape          = scene .createNode ("Shape"),
         appearance     = scene .createNode ("Appearance"),
         lineProperties = scene .createNode ("LineProperties"),
         box            = scene .createNode ("IndexedLineSet"),
         coordinate     = scene .createNode ("Coordinate");

      lineProperties .linewidthScaleFactor = 2;

      coordinate .point = [0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5];

      box .coordIndex = [0, 1, 2, 3, 0, -1, 4, 5, 6, 7, 4, -1, 0, 4, -1, 1, 5, -1, 2, 6, -1, 3, 7, -1];

      appearance .lineProperties = lineProperties;
      box .coord                 = coordinate;
      shape .appearance          = appearance;
      shape .geometry            = box;

      return shape;
   }

   createColor (height, maxHeight)
   {
      const
         color = new X3D .SFColor (),
         hue   = (1 - height / maxHeight) * Math .PI / 2;

      color .setHSV (hue, 0.9, 0.7);

      return color;
   }

   arrangeAreas (data0, aspectRatio)
   {
      if (data0 .length === 0)
         return [ ];

      const area0 = data0 .reduce ((p, c) => p + c .area, 0);

      const
         width  = Math .sqrt (area0 * aspectRatio),
         height = area0 / width;

      const rectangle0 =
      {
         x: 0,
         y: 0,
         width,
         height,
      };

      this .rectangle = rectangle0;

      return this .arrangeAreasInRectangle (data0, rectangle0);
   }

   arrangeAreasInRectangle (data0, rectangle0)
   {
      if (data0 .length < 2)
         return [Object .assign (rectangle0, { data: data0 [0] })];

      // Divide area0 in almost two equal areas.

      const [data1, data2] = this .divideAreas (data0);

      // Determine area sizes.

      const
         area1 = data1 .reduce ((p, c) => p + c .area, 0),
         area2 = data2 .reduce ((p, c) => p + c .area, 0);

      if (rectangle0 .width >= rectangle0 .height)
      {
         const x0 = rectangle0 .x - rectangle0 .width / 2;

         const
            width1 = area1 / rectangle0 .height,
            width2 = area2 / rectangle0 .height;

         const rectangle1 = {
            x: x0 + width1 / 2,
            y: rectangle0 .y,
            width: width1,
            height: rectangle0 .height,
         };

         const rectangle2 = {
            x: x0 + width1 + width2 / 2,
            y: rectangle0 .y,
            width: width2,
            height: rectangle0 .height,
         };

         return [
            this .arrangeAreasInRectangle (data1, rectangle1),
            this .arrangeAreasInRectangle (data2, rectangle2)
         ]
         .flat ();
      }
      else
      {
         const y0 = rectangle0 .y - rectangle0 .height / 2;

         const
            height1 = area1 / rectangle0 .width,
            height2 = area2 / rectangle0 .width;

         const rectangle1 = {
            x: rectangle0 .x,
            y: y0 + height1 / 2,
            width: rectangle0 .width,
            height: height1,
         };

         const rectangle2 = {
            x: rectangle0 .x,
            y: y0 + height1 + height2 / 2,
            width: rectangle0 .width,
            height: height2,
         };

         return [
            this .arrangeAreasInRectangle (data1, rectangle1),
            this .arrangeAreasInRectangle (data2, rectangle2)
         ]
         .flat ();
      }
   }

   divideAreas (data0)
   {
      const
         data1 = [ ],
         data2 = [ ];

      let
         area1 = 0,
         area2 = 0;

      for (const value of data0)
      {
         if (area1 + value .area < area2 + value .area)
         {
            area1 += value .area;
            data1 .push (value);
         }
         else
         {
            area2 += value .area;
            data2 .push (value);
         }
      }

      return [data1, data2];
   }
}

function random (min, max)
{
   return Math .floor (Math .random () * (max - min + 1)) + min;
}

const
   canvas    = document .getElementById ("chart"),
   areaChart = new AreaChart (canvas),
   count     = 500;

$("#rebuild") .on ("click", () =>
{
   const data = Array .from ({ length: count }, (_, i) => ({
      id: i,
      area: random (1, 100),
      height: random (1, 30),
   }));

   areaChart .build (data, { explode: 0.1, border: 0.25, aspectRatio: 16 / 9, sort: false });
   return false;
})
.trigger ("click");
