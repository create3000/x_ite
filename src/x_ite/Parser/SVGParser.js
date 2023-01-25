/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import X3DParser   from "./X3DParser.js";
import Expressions from "./Expressions.js";
import Algorithm   from "../../standard/Math/Algorithm.js";
import Color3      from "../../standard/Math/Numbers/Color3.js";
import Color4      from "../../standard/Math/Numbers/Color4.js";
import Vector2     from "../../standard/Math/Numbers/Vector2.js";
import Vector3     from "../../standard/Math/Numbers/Vector3.js";
import Vector4     from "../../standard/Math/Numbers/Vector4.js";
import Rotation4   from "../../standard/Math/Numbers/Rotation4.js";
import Matrix3     from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4     from "../../standard/Math/Numbers/Matrix4.js";
import Box2        from "../../standard/Math/Geometry/Box2.js"
import Bezier      from "../../standard/Math/Algorithms/Bezier.js";

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r]+/gy,
   comma: /,/gy,
   openParenthesis: /\(/gy,
   closeParenthesis: /\)/gy,

   // Units
   em: /em/gy,
   ex: /ex/gy,
   px: /px/gy,
   in: /in/gy,
   cm: /cm/gy,
   mm: /mm/gy,
   pt: /pt/gy,
   pc: /pc/gy,
   percentSign: /%/gy,

   // Values
   int32: /((?:0[xX][\da-fA-F]+)|(?:[+-]?\d+))/gy,
   double: /([+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?))/gy,
   matrix: /matrix/gy,
   translate: /translate/gy,
   rotate: /rotate/gy,
   scale: /scale/gy,
   skewX: /skewX/gy,
   skewY: /skewY/gy,
   color: /([a-zA-Z]+|#[\da-fA-F]+|rgba?\(.*?\))/gy,
   url: /url\("?(.*?)"?\)/gy,
   path: /([mMlLhHvVqQtTcCsSaAzZ])/gy,
});

/*
 *  Constants
 */

const
   INCH            = 0.0254,    // One inch in meters.
   POINT           = INCH / 72, // One point in meters.
   PIXEL           = INCH / 90, // One pixel in meters.
   BEZIER_STEPS    = 10,
   CIRCLE_STEPS    = 64,
   GRADIENT_WIDTH  = 256,
   GRADIENT_HEIGHT = 256;

/*
 *  Parser
 */

function SVGParser (scene)
{
   X3DParser .call (this, scene);

   this .solid  = false;
   this .tessy  = this .createTesselator ();
   this .canvas = document .createElement ("canvas");
   this .cx     = this .canvas .getContext ("2d");

   this .canvas .width  = GRADIENT_WIDTH;
   this .canvas .height = GRADIENT_HEIGHT;
}

SVGParser .prototype = Object .assign (Object .create (X3DParser .prototype),
{
   constructor: SVGParser,
   getEncoding: function ()
   {
      return "XML";
   },
   isValid: function ()
   {
      if (!(this .input instanceof XMLDocument))
         return false;

      if ($(this .input) .children ("svg") .length)
         return true;

      if (this .input .nodeName === "svg")
         return true;

      return false;
   },
   getInput: function ()
   {
      return this .input;
   },
   setInput (xmlElement)
   {
      try
      {
         if (typeof xmlElement === "string")
            xmlElement = $.parseXML (xmlElement);

         this .input = xmlElement;
      }
      catch (error)
      {
         this .input = undefined;
      }
   },
   parseIntoScene: function (success, error)
   {
      const scene = this .getExecutionContext ();

      this .document              = this .input;
      this .rootTransform         = scene .createNode ("Transform");
      this .groupNodes            = [this .rootTransform];
      this .texturePropertiesNode = this .createTextureProperties ();
      this .styles                = [{
         display: "inline",
         fillType: "COLOR",
         fillColor: Color4 .Black,
         fillURL: "",
         fillOpacity: 1,
         fillRule: "nonzero",
         strokeType: "NONE",
         strokeColor: Color4 .Black,
         strokeURL: "",
         strokeOpacity: 1,
         strokeWidth: 1,
         opacity: 1,
         stopColor: Color4 .Black,
         stopOpacity: 1,
      }];

      this .xmlElement (this .input)
         .then (success)
         .catch (error);
   },
   xmlElement: async function (xmlElement)
   {
      switch (xmlElement .nodeName)
      {
         case "#document":
         {
            const svg = $(xmlElement) .children ("svg");

            for (const xmlElement of svg)
               await this .svgElement (xmlElement);

            break;
         }
         case "svg":
         {
            await this .svgElement (xmlElement);
            break;
         }
      }

      return this .getScene ();
   },
   svgElement: async function (xmlElement)
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("SVG");
      scene .setProfile (browser .getProfile ("Interchange"));
      scene .addComponent (browser .getComponent ("Geometry2D", 2));

      await this .loadComponents ();

      // Create background.

      const background = scene .createNode ("Background");

      background .skyColor = [1, 1, 1];

      scene .getRootNodes () .push (background);

      // Create navigation info.

      const navigationInfo = scene .createNode ("NavigationInfo");

      navigationInfo .type = ["PLANE_create3000.github.io", "PLANE", "EXAMINE", "ANY"];

      scene .getRootNodes () .push (navigationInfo);

      // Get attributes of svg element.

      const
         viewBox = this .viewBoxAttribute (xmlElement .getAttribute ("viewBox"), new Vector4 (0, 0, 100, 100)),
         width   = this .lengthAttribute (xmlElement .getAttribute ("width", viewBox [2])),
         height  = this .lengthAttribute (xmlElement .getAttribute ("height", viewBox [3]));

      // Create viewpoint.

      const
         viewpoint = scene .createNode ("OrthoViewpoint",),
         x         =  (viewBox .x + width  / 2) * PIXEL,
         y         = -(viewBox .y + height / 2) * PIXEL;

      viewpoint .position         = new Vector3 (x, y, 10);
      viewpoint .centerOfRotation = new Vector3 (x, y, 0);

      viewpoint .fieldOfView = [
         -width  / 2 * PIXEL,
         -height / 2 * PIXEL,
          width  / 2 * PIXEL,
          height / 2 * PIXEL,
      ];

      scene .getRootNodes () .push (viewpoint);

      // Create view matrix.

      const
         scale       = new Vector3 (width * PIXEL / viewBox [2], -height * PIXEL / viewBox [3], 1),
         translation = new Vector3 (-viewBox .x, viewBox .y, 0) .multVec (scale);

      this .rootTransform .translation = translation;
      this .rootTransform .scale       = scale;

      // Parse elements.

      this .elements (xmlElement);

      // Add root Transform node.

      scene .addNamedNode (scene .getUniqueName ("ViewBox"), this .rootTransform);
      scene .getRootNodes () .push (this .rootTransform);
   },
   elements: function (xmlElement)
   {
      for (const childNode of xmlElement .childNodes)
		   this .element (childNode);
   },
   element: function (xmlElement)
   {
      if (this .used (xmlElement))
			return;

      switch (xmlElement .nodeName)
      {
         case "use":
            return this .useElement (xmlElement);
         case "g":
            return this .gElement (xmlElement);
         case "switch":
            return this .switchElement (xmlElement);
         case "a":
            return this .aElement (xmlElement);
         case "rect":
            return this .rectElement (xmlElement);
         case "circle":
            return this .circleElement (xmlElement);
         case "ellipse":
            return this .ellipseElement (xmlElement);
         case "text":
            return this .textElement (xmlElement);
         case "image":
            return this .imageElement (xmlElement);
         case "polyline":
            return this .polylineElement (xmlElement);
         case "polygon":
            return this .polygonElement (xmlElement);
         case "path":
            return this .pathElement (xmlElement);
      }
   },
   used: function (xmlElement)
   {
      try
      {
         const
            scene = this .getExecutionContext (),
            id    = xmlElement .getAttribute ("id"),
            name  = this .sanitizeName (id),
            node  = scene .getNamedNode (name);

         this .groupNodes .at (-1) .children .push (node);

         return true;
      }
      catch (error)
      {
         return false;
      }
   },
   useElement: function (xmlElement)
   {

   },
   gElement: function (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const transformNode = this .createTransform (xmlElement);

      // Get child elements.

      this .groupNodes .push (transformNode);

      this .elements (xmlElement);

      this .styles     .pop ();
      this .groupNodes .pop ();

      // Add node.

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   switchElement: function (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement),
         switchNode    = scene .createNode ("Switch");

      transformNode .children .push (switchNode);
      switchNode .whichChoice = 0;

      // Get child elements.

      this .groupNodes .push (switchNode);

      this .elements (xmlElement);

      this .styles     .pop ();
      this .groupNodes .pop ();

      // Add node.

      if (switchNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   aElement: function (xmlElement)
   {

   },
   rectElement: function (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         x      = this .lengthAttribute (xmlElement .getAttribute ("x"), 0),
         y      = this .lengthAttribute (xmlElement .getAttribute ("y"), 0),
         width  = this .lengthAttribute (xmlElement .getAttribute ("width"), 0),
         height = this .lengthAttribute (xmlElement .getAttribute ("height"), 0);

      const
         scene         = this .getExecutionContext (),
         size          = new Vector2 (width, height),
         center        = new Vector2 (x + width / 2, y + height / 2),
         bbox          = new Box2 (size, center),
         transformNode = this .createTransform (xmlElement, center);

      this .groupNodes .push (transformNode);

      // Create nodes.

      if (this .style .fillType !== "NONE")
      {
         const
            shapeNode     = scene .createNode ("Shape"),
            rectangleNode = scene .createNode ("Rectangle2D");

         shapeNode .appearance = this .createFillAppearance (bbox);
         shapeNode .geometry   = rectangleNode;
         rectangleNode .solid  = this .solid;
         rectangleNode .size   = size;

         transformNode .children .push (shapeNode);
      }

      if (this .style .strokeType !== "NONE")
      {
         const
            shapeNode     = scene .createNode ("Shape"),
            polylineNode  = scene .createNode ("Polyline2D"),
            width1_2      = width / 2,
            height1_2     = height / 2;

         shapeNode .appearance = this .createStrokeAppearance ();
         shapeNode .geometry   = polylineNode;

         polylineNode .lineSegments = [ width1_2,  height1_2,
                                       -width1_2,  height1_2,
                                       -width1_2, -height1_2,
                                        width1_2, -height1_2,
                                        width1_2,  height1_2];

         transformNode .children .push (shapeNode);
      }

      this .groupNodes .pop ();
      this .styles     .pop ();

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   circleElement: function (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         cx = this .lengthAttribute (xmlElement .getAttribute ("cx"), 0),
         cy = this .lengthAttribute (xmlElement .getAttribute ("cy"), 0),
         r  = this .lengthAttribute (xmlElement .getAttribute ("r"),  0);

      const
         scene         = this .getExecutionContext (),
         bbox          = new Box2 (new Vector2 (r * 2, r * 2), new Vector2 (cx, cy)),
         transformNode = this .createTransform (xmlElement, new Vector2 (cx, cy));

      this .groupNodes .push (transformNode);

      // Create nodes.

      if (this .style .fillType !== "NONE")
      {
         const
            shapeNode = scene .createNode ("Shape"),
            diskNode  = scene .createNode ("Disk2D");

         shapeNode .appearance = this .createFillAppearance (bbox);
         shapeNode .geometry   = diskNode;
         diskNode .solid       = this .solid;
         diskNode .outerRadius = r;

         transformNode .children .push (shapeNode);
      }

      if (this .style .strokeType !== "NONE")
      {
         const
            shapeNode  = scene .createNode ("Shape"),
            circleNode = scene .createNode ("Circle2D");

         shapeNode .appearance = this .createStrokeAppearance ();
         shapeNode .geometry   = circleNode;
         circleNode .radius    = r;

         transformNode .children .push (shapeNode);
      }

      this .groupNodes .pop ();
      this .styles     .pop ();

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   ellipseElement: function (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         cx = this .lengthAttribute (xmlElement .getAttribute ("cx"), 0),
         cy = this .lengthAttribute (xmlElement .getAttribute ("cy"), 0),
         rx = this .lengthAttribute (xmlElement .getAttribute ("rx"), 0),
         ry = this .lengthAttribute (xmlElement .getAttribute ("ry"), 0);

      const
         scene         = this .getExecutionContext (),
         rMin          = Math .min (rx, ry),
         bbox          = new Box2 (new Vector2 (rx * 2, ry * 2), new Vector2 (cx, cy)),
         transformNode = this .createTransform (xmlElement, new Vector2 (cx, cy), new Vector2 (rx / rMin, ry / rMin));

      this .groupNodes .push (transformNode);

      // Create nodes.

      if (this .style .fillType !== "NONE")
      {
         const
            shapeNode = scene .createNode ("Shape"),
            diskNode  = scene .createNode ("Disk2D");

         shapeNode .appearance = this .createFillAppearance (bbox);
         shapeNode .geometry   = diskNode;
         diskNode .solid       = this .solid;
         diskNode .outerRadius = rMin;

         transformNode .children .push (shapeNode);
      }

      if (this .style .strokeType !== "NONE")
      {
         const
            shapeNode  = scene .createNode ("Shape"),
            circleNode = scene .createNode ("Circle2D");

         shapeNode .appearance = this .createStrokeAppearance ();
         shapeNode .geometry   = circleNode;
         circleNode .radius    = rMin;

         transformNode .children .push (shapeNode);
      }

      this .groupNodes .pop ();
      this .styles     .pop ();

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   textElement: function (xmlElement)
   {

   },
   imageElement: function (xmlElement)
   {
      // Create Transform node.

      const
         x      = this .lengthAttribute (xmlElement .getAttribute ("x"),      0),
         y      = this .lengthAttribute (xmlElement .getAttribute ("y"),      0),
         width  = this .lengthAttribute (xmlElement .getAttribute ("width"),  0),
         height = this .lengthAttribute (xmlElement .getAttribute ("height"), 0),
         href   = xmlElement .getAttribute ("xlink:href");

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement, new Vector2 (x + width / 2, y + height / 2), new Vector2 (1, -1));

      this .groupNodes .push (transformNode);

      // Create nodes.

      const
         shapeNode      = scene .createNode ("Shape"),
         appearanceNode = scene .createNode ("Appearance"),
         textureNode    = scene .createNode ("ImageTexture"),
         rectangleNode  = scene .createNode ("Rectangle2D");

      shapeNode .appearance          = appearanceNode;
      shapeNode .geometry            = rectangleNode;
      appearanceNode .texture        = textureNode;
      textureNode .url               = [href];
      textureNode .textureProperties = this .texturePropertiesNode;
      rectangleNode .solid           = this .solid;
      rectangleNode .size            = new Vector2 (width, height);

      transformNode .children .push (shapeNode);

      this .groupNodes .pop ();
      this .groupNodes .at (-1) .children .push (transformNode);
   },
   polylineElement: function (xmlElement, closed = false)
   {
      const points = Object .assign ([ ], { index: 0 });

      if (!this .pointsAttribute (xmlElement .getAttribute ("points"), points))
         return;

      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement),
         bbox          = new Box2 (Vector2 .min (... points), Vector2 .max (... points), true);

      this .groupNodes .push (transformNode);

      // Create nodes.

      const coordinateNode = scene .createNode ("Coordinate");

      for (const point of points)
         coordinateNode .point .push (new Vector3 (point .x, point .y, 0));

      if (this .style .fillType !== "NONE")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = scene .createNode ("IndexedTriangleSet");

         shapeNode .appearance  = this .createFillAppearance (bbox);
         shapeNode .geometry    = geometryNode;
         geometryNode .solid    = this .solid;
         geometryNode .index    = this .triangulatePolygon ([points], coordinateNode);
         geometryNode .texCoord = this .createTextureCoordinate (coordinateNode, bbox);
         geometryNode .coord    = coordinateNode;

         transformNode .children .push (shapeNode);
      }

      if (this .style .strokeType !== "NONE")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = scene .createNode ("IndexedLineSet");

         shapeNode .appearance    = this .createStrokeAppearance ();
         shapeNode .geometry      = geometryNode;
         geometryNode .coordIndex = [... points .keys (), ... (closed ? [points [0]] : [ ]), -1];
         geometryNode .coord      = coordinateNode;

         transformNode .children .push (shapeNode);
      }

      this .groupNodes .pop ();
      this .styles     .pop ();

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   polygonElement: function (xmlElement)
   {
      this .polylineElement (xmlElement, true);
   },
   pathElement: function (xmlElement)
   {
      // Get path points.

      const contours = [ ];

      if (!this .dAttribute (xmlElement .getAttribute ("d"), contours))
         return;

      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement),
         bbox          = new Box2 ();

      for (const points of contours)
         bbox .add (new Box2 (Vector2 .min (... points), Vector2 .max (... points), true));

      this .groupNodes .push (transformNode);

      // Create nodes.

      const coordinateNode = scene .createNode ("Coordinate");

      for (const points of contours)
      {
         for (const point of points)
            coordinateNode .point .push (new Vector3 (point .x, point .y, 0));
      }

      if (this .style .fillType !== "NONE")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = scene .createNode ("IndexedTriangleSet");

         shapeNode .appearance  = this .createFillAppearance (bbox);
         shapeNode .geometry    = geometryNode;
         geometryNode .solid    = this .solid;
         geometryNode .index    = this .triangulatePolygon (contours, coordinateNode);
         geometryNode .texCoord = this .createTextureCoordinate (coordinateNode, bbox);
         geometryNode .coord    = coordinateNode;

         transformNode .children .push (shapeNode);
      }

      if (this .style .strokeType !== "NONE")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = scene .createNode ("IndexedLineSet");

         shapeNode .appearance = this .createStrokeAppearance ();
         shapeNode .geometry   = geometryNode;
         geometryNode .coord   = coordinateNode;

         for (const points of contours)
         {
            for (const i of points .keys ())
               geometryNode .coordIndex .push (points .index + i);

            if (points .closed)
               geometryNode .coordIndex .push (points .index);

            geometryNode .coordIndex .push (-1);
         }

         transformNode .children .push (shapeNode);
      }

      this .groupNodes .pop ();
      this .styles     .pop ();

      if (transformNode .children .length)
         this .groupNodes .at (-1) .children .push (transformNode);
   },
   linearGradientElementURL: function (xmlElement, bbox)
   {
      const
         g        = this .linearGradientElement (xmlElement, { stops: [ ] }),
         gradient = this .cx .createLinearGradient (g .x1, g .y1, g .x2, g .y2);

      for (const [o, c, a] of g .stops)
         gradient .addColorStop (o, `rgba(${c .r * 255},${c .g * 255},${c .b * 255},${a})`);

      return this .drawGradient (gradient, g .transform, bbox);
   },
   linearGradientElement: function (xmlElement, gradient)
   {
      if (xmlElement .nodeName !== "linearGradient")
         return;

      // Attribute xlink:href

      const href = xmlElement .getAttribute ("xlink:href");

      if (href)
      {
         const
            scene = this .getExecutionContext (),
            hash  = new URL (href, scene .getWorldURL ()) .hash .slice (1);

         if (hash)
            this .gradientElement (this .document .getElementById (hash), gradient);
      }

      // Attributes

      gradient .x1        = this .lengthAttribute (xmlElement .getAttribute ("x1"), gradient .x1 || 0);
      gradient .y1        = this .lengthAttribute (xmlElement .getAttribute ("y1"), gradient .y1 || 0);
      gradient .x2        = this .lengthAttribute (xmlElement .getAttribute ("x2"), gradient .x2 || 0);
      gradient .y2        = this .lengthAttribute (xmlElement .getAttribute ("y2"), gradient .y2 || 0);
      gradient .units     = xmlElement .getAttribute ("gradientUnits");
      gradient .transform = this .transformAttribute (xmlElement .getAttribute ("gradientTransform"));

      // Stops

      for (const childNode of xmlElement .childNodes)
         this .gradientChild (childNode, gradient);

      return gradient;
   },
   radialGradientElementURL: function (xmlElement, bbox)
   {
      const
         g        = this .radialGradientElement (xmlElement, { stops: [ ] }),
         gradient = this .cx .createRadialGradient (g .fx, g .fy, 0, g .cx, g .cy, g .r);

      for (const [o, c, a] of g .stops)
         gradient .addColorStop (o, `rgba(${c .r * 255},${c .g * 255},${c .b * 255},${a})`);

      return this .drawGradient (gradient, g .transform, bbox);
   },
   radialGradientElement: function (xmlElement, gradient)
   {
      // Attribute xlink:href

      const href = xmlElement .getAttribute ("xlink:href");

      if (href)
      {
         const
            scene = this .getExecutionContext (),
            hash  = new URL (href, scene .getWorldURL ()) .hash .slice (1);

         if (hash)
            this .gradientElement (this .document .getElementById (hash), gradient);
      }

      // Attributes

      gradient .cx           = this .lengthAttribute (xmlElement .getAttribute ("cx"), gradient .cx || 0),
      gradient .cy           = this .lengthAttribute (xmlElement .getAttribute ("cy"), gradient .cy || 0),
      gradient .x2           = this .lengthAttribute (xmlElement .getAttribute ("x2"), gradient .x2 || 0),
      gradient .y2           = this .lengthAttribute (xmlElement .getAttribute ("y2"), gradient .y2 || 0),
      gradient .r            = this .lengthAttribute (xmlElement .getAttribute ("r"),  gradient .cx),
      gradient .fx           = this .lengthAttribute (xmlElement .getAttribute ("fx"), gradient .cx),
      gradient .fy           = this .lengthAttribute (xmlElement .getAttribute ("fy"), gradient .cy),
      gradient .units        = xmlElement .getAttribute ("gradientUnits");
      gradient .spreadMethod = xmlElement .getAttribute ("spreadMethod");
      gradient .transform    = this .transformAttribute (xmlElement .getAttribute ("gradientTransform"));

      // Stops

      for (const childNode of xmlElement .childNodes)
         this .gradientChild (childNode, gradient);

      return gradient;
   },
   gradientElement: function (xmlElement, gradient)
   {
      if (!xmlElement)
         return;

      switch (xmlElement .nodeName)
      {
         case "linearGradient":
            return this .linearGradientElement (xmlElement, gradient);
         case "radialGradient":
            return this .radialGradientElement (xmlElement, gradient);
      }
   },
   gradientChild: function (xmlElement, gradient)
   {
      if (xmlElement .nodeName === "stop")
		   return this .stopElement (xmlElement, gradient);
   },
   stopElement: function (xmlElement, gradient)
   {
      const offset = this .percentAttribute (xmlElement .getAttribute ("offset"), 0);

      if (!this .styleAttributes (xmlElement))
         return;

      const { stopColor, stopOpacity } = this .style;

      gradient .stops .push ([offset, stopColor, stopOpacity]);

      this .styles .pop ();
   },
   drawGradient: function (gradient, transform, bbox)
   {
      const m = new Matrix3 ();

      m .scale     (new Vector2 (GRADIENT_WIDTH / 2, GRADIENT_HEIGHT / 2));
      m .translate (Vector2 .One);
      m .scale     (new Vector2 (1, -1));
      m .multLeft  (Matrix3 .inverse (bbox .matrix));
      m .multLeft  (transform);

      // Paint.

      const cx = this .cx;

      cx .fillStyle = gradient;
      cx .save ();
      cx .clearRect (0, 0, GRADIENT_WIDTH, GRADIENT_HEIGHT);
      cx .rect (0, 0, GRADIENT_WIDTH, GRADIENT_HEIGHT);
      cx .transform (m [0], m [1], m [3], m [4], m [6], m [7]);
      cx .fill ();
      cx .restore ();

      return this .canvas .toDataURL ("image/png");
   },
   idAttribute: function (attribute, node)
   {
      if (attribute === null)
         return;

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (attribute);

      if (name)
		   scene.addNamedNode (scene .getUniqueName (name), node);
   },
   viewBoxAttribute: function (attribute, defaultValue)
   {
      if (attribute === null)
         return defaultValue;

      this .parseValue (attribute);

      if (this .double ())
      {
         const x = this .value;

         if (this .double ())
         {
            const y = this .value;

            if (this .double ())
            {
               const width = this .value;

               if (this .double ())
               {
                  const height = this .value;

                  return new Vector4 (x, y, width, height);
               }
            }
         }
      }

      return defaultValue;
   },
   lengthAttribute: function (attribute, defaultValue)
   {
      // Returns length in pixel.

      if (attribute === null)
         return defaultValue;

      this .parseValue (attribute);

      if (this .double ())
      {
         // Parse unit

         if (Grammar .mm .parse (this))
            this .value /= 1000 * PIXEL;

         else if (Grammar .cm .parse (this))
            this .value /= 100 * PIXEL;

         else if (Grammar .in .parse (this))
            this .value *= INCH / PIXEL;

         return this .value;
      }

      return defaultValue;
   },
   percentAttribute: function (attribute, defaultValue)
   {
      this .parseValue (attribute);

      if (this .double ())
      {
         let value = this .value;

         // Parse unit

         if (Grammar .percentSign .parse (this))
            value /= 100;

         return Algorithm .clamp (value, 0, 1);
      }

      return defaultValue;
   },
   pointsAttribute: function (attribute, points)
   {
      if (attribute === null)
         return false;

      this .parseValue (attribute);

      while (true)
      {
         if (this .double ())
         {
            const x = this .value;

            if (this .comma ())
            {
               if (this .double ())
               {
                  const y = this .value;

                  points .push (new Vector2 (x, y));

                  if (this .comma ())
                     continue;
               }
            }
         }

         break;
      }

      return !! points .length;
   },
   dAttribute: function (attribute, contours)
   {
      if (attribute === null)
         return false;

      this .parseValue (attribute);

      let
         points   = [ ],
         index    = 0,
         previous = "",
         command  = "",
         relative = false,
         ax       = 0,
         ay       = 0,
         px       = 0,
         py       = 0;

      while (true)
      {
         this .whitespaces ();

         if (!Grammar .path .parse (this))
            break;

         previous = command;
         command  = this .result [1];
         relative = command === command .toLowerCase ();

         switch (command)
         {
            case "m":
            case "M":
            {
               // moveto

               points = this .removeConsecutiveIdenticalPoints (points);

               if (points .length > 2)
               {
                  contours .push (Object .assign (points, { index: index, closed: false }));

                  index += points .length;
               }

               points = [ ];

               while (true)
               {
                  if (this .double ())
                  {
                     let x = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y = this .value;

                        if (relative)
                        {
                           x += ax;
                           y += ay;
                        }

                        points .push (new Vector2 (x, y));

                        ax = x;
                        ay = y;

                        this .comma ();
                        continue;
                     }
                  }

                  break;
               }

               continue;
            }
            case "l":
            case "L":
            {
               // lineto

               while (true)
               {
                  if (this .double ())
                  {
                     let x = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y = this .value;

                        if (relative)
                        {
                           x += ax;
                           y += ay;
                        }

                        points .push (new Vector2 (x, y));

                        ax = x;
                        ay = y;

                        this .comma ();
                        continue;
                     }
                  }

                  break;
               }

               continue;
            }
            case "h":
            case "H":
            {
               // horizontal lineto

               while (true)
               {
                  if (this .double ())
                  {
                     let x = this .value;

                     if (relative)
                        x += ax;

                     points .push (x, ay);

                     ax = x;

                     this .comma ();
                     continue;
                  }

                  break;
               }

               continue;
            }
            case "v":
            case "V":
            {
               // vertical lineto

               while (this)
               {
                  if (this .double ())
                  {
                     let y = this .value;

                     if (relative)
                        y += ay;

                     points .push (ax, y);

                     ay = y;

                     this .comma ();
                     continue;
                  }

                  break;
               }

               continue;
            }
            case "q":
            case "Q":
            {
               // quadratic Bézier curveto

               while (true)
               {
                  if (this .double ())
                  {
                     let x1 = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y1 = this .value;

                        this .comma ();

                        if (this .double ())
                        {
                           let x = this .value;

                           this .comma ();

                           if (this .double ())
                           {
                              let y = this .value;

                              if (relative)
                              {
                                 x1 += ax;
                                 y1 += ay;
                                 x  += ax;
                                 y  += ay;
                              }

                              const curve = new Bezier (ax, ay, x1, y1, x, y);

                              points .push (... curve .getPoints ("quadric", BEZIER_STEPS));

                              ax = x;
                              ay = y;
                              px = x1;
                              py = y1;

                              this .comma ();
                              continue;
                           }
                        }
                     }
                  }

                  break;
               }

               continue;
            }
            case "t":
            case "T":
            {
               // Shorthand/smooth quadratic Bézier curveto

               while (true)
               {
                  if (this .double ())
                  {
                     let x = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y = this .value;

                        if (relative)
                        {
                           x += ax;
                           y += ay;
                        }

                        switch (previous)
                        {
                           case 'Q':
                           case 'q':
                           case 'T':
                           case 't':
                           {
                              x1 = ax + (ax - px);
                              y1 = ay + (ay - py);
                              break;
                           }
                           default:
                           {
                              x1 = ax;
                              y1 = ay;
                              break;
                           }
                        }

                        const curve = new Bezier (ax, ay, x1, y1, x, y);

                        points .push (... curve .getPoints ("quadric", BEZIER_STEPS));

                        ax = x;
                        ay = y;

                        this .comma ();
                        continue;
                     }
                  }

                  break;
               }

               continue;
            }
            case "c":
            case "C":
            {
               // curveto, cubic Bézier curve

               while (true)
               {
                  if (this .double ())
                  {
                     let x1 = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y1 = this .value;

                        this .comma ();

                        if (this .double ())
                        {
                           let x2 = this .value;

                           this .comma ();

                           if (this .double ())
                           {
                              let y2 = this .value;

                              this .comma ();

                              if (this .double ())
                              {
                                 let x = this .value;

                                 this .comma ();

                                 if (this .double ())
                                 {
                                    let y = this .value;

                                    if (relative)
                                    {
                                       x1 += ax;
                                       y1 += ay;
                                       x2 += ax;
                                       y2 += ay;
                                       x  += ax;
                                       y  += ay;
                                    }

                                    const curve = new Bezier (ax, ay, x1, y1, x2, y2, x, y);

                                    points .push (... curve .getPoints ("cubic", BEZIER_STEPS));

                                    ax = x;
                                    ay = y;
                                    px = x2;
                                    py = y2;

                                    this .comma ();
                                    continue;
                                 }
                              }
                           }
                        }
                     }
                  }

                  break;
               }

               continue;
            }
            case "s":
            case "S":
            {
               // shorthand/smooth curveto, cubic Bézier curve

               while (true)
               {
                  if (this .double ())
                  {
                     let x2 = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let y2 = this .value;

                        this .comma ();

                        if (this .double ())
                        {
                           let x = this .value;

                           this .comma ();

                           if (this .double ())
                           {
                              let y = this .value;

                              if (relative)
                              {
                                 x2 += ax;
                                 y2 += ay;
                                 x  += ax;
                                 y  += ay;
                              }

                              switch (previous)
                              {
                                 case 'C':
                                 case 'c':
                                 case 'S':
                                 case 's':
                                 {
                                    x1 = ax + (ax - px);
                                    y1 = ay + (ay - py);
                                    break;
                                 }
                                 default:
                                 {
                                    x1 = ax;
                                    y1 = ay;
                                    break;
                                 }
                              }

                              const curve = new Bezier (ax, ay, x1, y1, x2, y2, x, y);

                              points .push (... curve .getPoints ("cubic", BEZIER_STEPS));

                              ax = x;
                              ay = y;
                              px = x2;
                              py = y2;

                              this .comma ();
                              continue;
                           }
                        }
                     }
                  }

                  break;
               }

               continue;
            }
            case "a":
            case "A":
            {
               // elliptical arc

               while (true)
               {
                  if (this .double ())
                  {
                     let rx = this .value;

                     this .comma ();

                     if (this .double ())
                     {
                        let ry = this .value;

                        this .comma ();

                        if (this .double ())
                        {
                           let xAxisRotation = this .value;

                           this .comma ();

                           if (this .int32 ())
                           {
                              let largeArcFlag = this .value;

                              this .comma ();

                              if (this .int32 ())
                              {
                                 let sweepFlag = this .value;

                                 this .comma ();

                                 if (this .double ())
                                 {
                                    let x = this .value;

                                    this .comma ();

                                    if (this .double ())
                                    {
                                       let y = this .value;

                                       if (relative)
                                       {
                                          x += ax;
                                          y += ay;
                                       }

                                       const curve = new Bezier (ax, ay, rx, ry, Algorithm .radians (xAxisRotation), largeArcFlag, sweepFlag, x, y);

                                       points .push (... curve .getPoints ("arc", CIRCLE_STEPS));

                                       ax = x;
                                       ay = y;

                                       this .comma ();
                                       continue;
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }

                  break;
               }

               continue;
            }
            case "z":
            case "Z":
            {
               // closepath

               points = this .removeConsecutiveIdenticalPoints (points);

               if (points .length > 2)
               {
                  ax = points [0] .x;
                  ay = points [0] .y;

                  contours .push (Object .assign (points, { index: index, closed: true }));

                  index += points .length;
               }

               points = [ ];

               this .comma ();
               continue;
            }
         }

         break;
      }

      points = this .removeConsecutiveIdenticalPoints (points);

      if (points .length > 2)
		   contours .push (Object .assign (points, { index: index, closed: false }));

      return !! contours .length;
   },
   removeConsecutiveIdenticalPoints: function (points)
   {
      return points .filter ((p, i, a) => !p .equals (a [(i + 1) % a .length]));
   },
   transformAttribute: function (attribute)
   {
      const matrix = new Matrix3 ();

      if (attribute === null)
         return matrix;

      this .parseValue (attribute);

      while (true)
      {
         this .comma ();
         this .whitespaces ();

         if (Grammar .matrix .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const a = this .value;

                  if (this .comma ())
                  {
                     if (this .double ())
                     {
                        const b = this .value;

                        if (this .comma ())
                        {
                           if (this .double ())
                           {
                              const c = this .value;

                              if (this .comma ())
                              {
                                 if (this .double ())
                                 {
                                    const d = this .value;

                                    if (this .comma ())
                                    {
                                       if (this .double ())
                                       {
                                          const e = this .value;

                                          if (this .comma ())
                                          {
                                             if (this .double ())
                                             {
                                                const f = this .value;

                                                this .whitespaces ();

                                                if (Grammar .closeParenthesis .parse (this))
                                                {
                                                   matrix .multLeft (new Matrix3 (a, b, 0, c, d, 0, e, f, 1));
                                                   continue;
                                                }
                                             }
                                          }
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
         else if (Grammar .translate .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const tx = this .value;

                  if (this .comma ())
                  {
                     if (this .double ())
                     {
                        const ty = this .value;

                        this .whitespaces ();

                        if (Grammar .closeParenthesis .parse (this))
                        {
                           matrix .translate (new Vector2 (tx, ty));
                           continue;
                        }
                     }
                  }
               }
            }
         }
         else if (Grammar .rotate .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const angle = this .value;

                  this .whitespaces ();

                  if (Grammar .closeParenthesis .parse (this))
                  {
                     matrix .rotate (Algorithm .radians (angle));
                     continue;
                  }
                  else
                  {
                     if (this .comma ())
                     {
                        if (this .double ())
                        {
                           const cx = this .value;

                           if (this .comma ())
                           {
                              if (this .double ())
                              {
                                 const cy = this .value;

                                 this .whitespaces ();

                                 if (Grammar .closeParenthesis .parse (this))
                                 {
                                    matrix .translate (new Vector2 (cx, cy));
                                    matrix .rotate (Algorithm .radians (angle));
                                    matrix .translate (new Vector2 (-cx, -cy));
                                    continue;
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
         else if (Grammar .scale .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const sx = this .value;

                  if (this .comma ())
                  {
                     if (this .double ())
                     {
                        const sy = this .value;

                        this .whitespaces ();

                        if (Grammar .closeParenthesis .parse (this))
                        {
                           matrix .scale (new Vector2 (sx, sy));
                           continue;
                        }
                     }
                  }
               }
            }
         }
         else if (Grammar .skewX .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const angle = this .value;

                  this .whitespaces ();

                  if (Grammar .closeParenthesis .parse (this))
                  {
                     matrix .skewX (Algorithm .radians (angle));
                     continue;
                  }
               }
            }
         }
         else if (Grammar .skewY .parse (this))
         {
            this .whitespaces ();

            if (Grammar .openParenthesis .parse (this))
            {
               if (this .double ())
               {
                  const angle = this .value;

                  this .whitespaces ();

                  if (Grammar .closeParenthesis .parse (this))
                  {
                     matrix .skewY (Algorithm .radians (angle));
                     continue;
                  }
               }
            }
         }

         break;
      }

      return matrix;
   },
   styleAttributes: (function ()
   {
      const Styles = [
         "display",
         "fill",
         "fill-opacity",
         "fill-rule",
         "stroke",
         "stroke-opacity",
         "stroke-width",
         "opacity",
         "stop-color",
         "stop-opacity",
      ];

      return function (xmlElement)
      {
         const style = Object .assign ({ }, this .styles [0]);

         if (this .style .display === "none")
            return false;

         this .styles .push (style);

         for (const style of Styles)
         {
            const attribute = xmlElement .getAttribute (style);

            this .parseStyle (style, attribute ?? "default");
         }

         // Style attribute has higher precedence.

         this .styleAttribute (xmlElement .getAttribute ("style"));

         return true;
      };
   })(),
   styleAttribute: function (attribute)
   {
      if (attribute === null)
         return;

      const values = attribute .split (";");

      for (const value of values)
      {
         const pair = value .split (":");

         if (pair .length !== 2)
            continue;

         this .parseStyle (pair [0] .trim (), pair [1] .trim ());
      }
   },
   parseStyle: function (style, value)
   {
      this .parseValue (value);

      switch (style)
      {
         case "display":
            this .displayStyle (value);
            break;
         case "fill":
            this .fillStyle (value);
            break;
         case "fill-opacity":
            this .fillOpacityStyle (value);
            break;
         case "fill-rule":
            this .fillRuleStyle (value);
            break;
         case "stroke":
            this .strokeStyle (value);
            break;
         case "stroke-opacity":
            this .strokeOpacityStyle (value);
            break;
         case "stroke-width":
            this .strokeWidthStyle (value);
            break;
         case "opacity":
            this .opacityStyle (value);
            break;
         case "stop-color":
            this .stopColorStyle (value);
            break;
         case "stop-opacity":
            this .stopOpacityStyle (value);
            break;
      }
   },
   displayStyle: function (value)
   {
      if (value === null)
         return;

      if (value === "default")
         return;

      if (value === "inherit")
      {
         this .style .display = styles .at (-1) .display;
         return;
      }

      this .style .display = value;
   },
   fillStyle: function (value)
   {
      if (this .urlValue ())
      {
         this .style .fillType = "URL";
         this .style .fillURL  = this .result [1] .trim ();
         return;
      }

      if (value === "transparent")
      {
         this .style .fillType = "NONE";
         return;
      }

      if (value === "none")
      {
         this .style .fillType ="NONE";
         return;
      }

      if (!value .match (/^(?:inherit|unset|default)$/))
      {
         if (this .colorValue ())
         {
            this .style .fillType  = "COLOR";
            this .style .fillColor = this .value .copy ();
            return;
         }
      }

      // inherit

      this .style .fillType  = this .styles .at (-1) .fillType;
      this .style .fillColor = this .styles .at (-1) .fillColor;
      this .style .fillURL   = this .styles .at (-1) .fillURL;
   },
   fillOpacityStyle: function (value)
   {
      if (this .double ())
      {
         this .style .fillOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }

      if (value === "transparent")
      {
         this .style .fillOpacity = 0;
         return;
      }

      // inherit

      this .style .fillOpacity = this .styles .at (-1) .fillOpacity;
   },
   fillRuleStyle: function (value)
   {
      this .style .fillRule = value;
   },
   strokeStyle: function (value)
   {
      if (this .urlValue ())
      {
         this .style .strokeType = "URL";
         this .style .strokeURL  = this .result [1] .trim ();
         return;
      }

      if (value === "transparent")
      {
         this .style .strokeType = "NONE";
         return;
      }

      if (value === "none")
      {
         this .style .strokeType ="NONE";
         return;
      }

      if (!value .match (/^(?:inherit|unset|default)$/))
      {
         if (this .colorValue ())
         {
            this .style .strokeType  = "COLOR";
            this .style .strokeColor = this .value .copy ();
            return;
         }
      }

      // inherit

      this .style .strokeType  = this .styles .at (-1) .strokeType;
      this .style .strokeColor = this .styles .at (-1) .strokeColor;
      this .style .strokeURL   = this .styles .at (-1) .strokeURL;
   },
   strokeOpacityStyle: function (value)
   {
      if (this .double ())
      {
         this .style .strokeOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }

      if (value === "transparent")
      {
         this .style .strokeOpacity = 0;
         return;
      }

      // inherit

      this .style .strokeOpacity = this .styles .at (-1) .strokeOpacity;
   },
   strokeWidthStyle: function (value)
   {
      if (this .double ())
      {
         this .style .strokeWidth = this .value / (1000 * PIXEL);
         return;
      }

      if (value === "none")
      {
         this .style .strokeWidth = 0;
         return;
      }

      // inherit

      this .style .strokeWidth = this .styles .at (-1) .strokeWidth;
   },
   opacityStyle: function (value)
   {
      if (this .double ())
      {
         this .style .opacity = Algorithm .clamp (this .value, 0, 1) * this .styles .at (-1) .opacity;
         return;
      }

      if (value === "transparent")
      {
         this .style .opacity = 0;
         return;
      }
   },
   stopColorStyle: function (value)
   {
      if (this .colorValue ())
      {
         this .style .stopColor = this .value .copy ();
         return;
      }
   },
   stopOpacityStyle: function (value)
   {
      if (this .double ())
      {
         this .style .stopOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }

      if (value === "transparent")
      {
         this .style .stopOpacity = 0;
         return;
      }
   },
   parseValue: function (value)
   {
      this .input     = value;
      this .lastIndex = 0;
      this .value     = undefined;
   },
   whitespaces: function ()
   {
      return Grammar .whitespaces .parse (this);
   },
   comma: function ()
   {
      return !! (this .whitespaces () | Grammar .comma .parse (this));
   },
   int32: function ()
   {
      this .whitespaces ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [1]);

         return true;
      }

      return false;
   },
   double: function ()
   {
      this .whitespaces ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [1]);

         return true;
      }

      return false;
   },
   colorValue: (function ()
   {
      const color = new Color4 (0, 0, 0, 0);

      return function ()
      {
         if (!Grammar .color .parse (this))
            return false;

         this .value = color .set (... this .convertColor (this .result [1]));

         return true;
      };
   })(),
   urlValue: function ()
   {
      return Grammar .url .parse (this);
   },
   createTransform: function (xmlElement, t = Vector2 .Zero, s = Vector2 .One)
   {
      // Determine matrix.

      const
         scene  = this .getExecutionContext (),
         m      = this .transformAttribute (xmlElement .getAttribute ("transform"));

      m .translate (t);
      m .scale (s);

      // Create node.

      const
         transformNode    = scene .createNode ("Transform"),
         matrix           = new Matrix4 (m [0], m [1], 0, 0, m [3], m [4], 0, 0, 0, 0, 1, 0, m [6], m [7], 0, 1),
         translation      = new Vector3 (0, 0, 0),
         rotation         = new Rotation4 (),
         scale            = new Vector3 (1, 1, 1),
         scaleOrientation = new Rotation4 ();

      matrix .get (translation, rotation, scale, scaleOrientation);

      transformNode .translation      = translation;
      transformNode .rotation         = rotation;
      transformNode .scale            = scale;
      transformNode .scaleOrientation = scaleOrientation;

      // Set name.

      this .idAttribute (xmlElement .getAttribute ("id"), transformNode);

      return transformNode;
   },
   createFillAppearance: function (bbox)
   {
      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance");

      switch (this .style .fillType)
      {
         case "NONE":
         {
            return null;
         }
         case "COLOR":
         {
            const materialNode = scene .createNode ("Material");

            appearanceNode .material   = materialNode;
            materialNode .diffuseColor = new Color3 (... this .style .fillColor);
            materialNode .transparency = 1 - this .style .fillOpacity * this .style .opacity;

            break;
         }
         case "URL":
         {
            // Gradient

            const
               scene       = this .getExecutionContext (),
               textureNode = scene.createNode ("ImageTexture"),
               url         = this .getFillUrl (this .style .fillURL, bbox);

            // Get image from url.

            if (!url)
               return null;

            textureNode .url               = [url];
            textureNode .textureProperties = this .texturePropertiesNode;
            appearanceNode .texture        = textureNode;

            break;
         }
      }

      return appearanceNode;
   },
   getFillUrl: function (fillURL, bbox)
   {
      const
         scene = this .getExecutionContext (),
         hash  = new URL (fillURL, scene .getWorldURL ()) .hash .slice (1);

      if (!hash)
         return;

      const xmlElement = this .document .getElementById (hash);

      if (!xmlElement)
         return;

      switch (xmlElement .nodeName)
      {
         case "linearGradient":
            return this .linearGradientElementURL (xmlElement, bbox);

         case "radialGradient":
            return this .radialGradientElementURL (xmlElement, bbox);
      }
   },
   createStrokeAppearance: function ()
   {
      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance"),
         materialNode   = scene .createNode ("Material");

      appearanceNode .material    = materialNode;
      materialNode .emissiveColor = new Color3 (... this .style .strokeColor);
      materialNode .transparency  = 1 - this .style .strokeOpacity * this .style .opacity;

      if (this .style .strokeWidth !== 1)
      {
         const lineProperties = scene .createNode ("LineProperties");

         appearanceNode .lineProperties       = lineProperties;
         lineProperties .linewidthScaleFactor = this .style .strokeWidth;
      }

      return appearanceNode;
   },
   createTextureProperties: function ()
   {
      const
         scene                 = this .getExecutionContext (),
         texturePropertiesNode = scene .createNode ("TextureProperties");

      texturePropertiesNode .generateMipMaps     = true;
      texturePropertiesNode .minificationFilter  = "NICEST";
      texturePropertiesNode .magnificationFilter = "NICEST";
      texturePropertiesNode .boundaryModeS       = "CLAMP_TO_EDGE";
      texturePropertiesNode .boundaryModeT       = "CLAMP_TO_EDGE";
      texturePropertiesNode .boundaryModeR       = "CLAMP_TO_EDGE";
      texturePropertiesNode .textureCompression  = "DEFAULT";

      return texturePropertiesNode;
   },
   createTextureCoordinate: function (coordinateNode, bbox)
   {
      const
         scene        = this .getExecutionContext (),
         texCoordNode = scene .createNode ("TextureCoordinate"),
         invMatrix    = Matrix3 .inverse (bbox .matrix);

      for (const point of coordinateNode .point)
         texCoordNode .point .push (invMatrix .multVecMatrix (new Vector2 (point .x, point .y)) .add (Vector2 .One) .divide (2));

      return texCoordNode;
   },
   createTesselator: function ()
   {
      // Function called for each vertex of tessellator output.

      function vertexCallback (index, triangles)
      {
         triangles .push (index);
      }

      const tessy = new libtess .GluTesselator ();

      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_VERTEX_DATA, vertexCallback);
      tessy .gluTessNormal (0, 0, 1);

      return tessy;
   },
   triangulatePolygon: function (contours, coordinateNode)
   {
      // Callback for when segments intersect and must be split.

      function combineCallback (coords, data, weight)
      {
         const
            point = new Vector3 (... coords),
            index = coordinateNode .point .length;

         coordinateNode .point .push (point);

         return index;
      }

      const
         tessy     = this .tessy,
         winding   = this .style .fillRule === "evenodd" ? "GLU_TESS_WINDING_ODD" : "GLU_TESS_WINDING_NONZERO",
         triangles = [ ];

      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule [winding]);
      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE, combineCallback);
      tessy .gluTessBeginPolygon (triangles);

      for (const points of contours)
      {
         tessy .gluTessBeginContour ();

         for (const [i, p] of points .entries ())
            tessy .gluTessVertex ([p .x, p. y, 0], points .index + i);

         tessy .gluTessEndContour ();
      }

      tessy .gluTessEndPolygon ();

      // Array of indices of triangles.
      return triangles;
   },
});

Object .defineProperty (SVGParser .prototype, "style",
{
   get: function ()
   {
      return this .styles .at (-1);
   },
})

export default SVGParser;
