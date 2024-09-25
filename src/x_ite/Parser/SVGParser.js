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

import X3DParser    from "./X3DParser.js";
import X3DOptimizer from "./X3DOptimizer.js";
import Expressions  from "./Expressions.js";
import Algorithm    from "../../standard/Math/Algorithm.js";
import Color3       from "../../standard/Math/Numbers/Color3.js";
import Color4       from "../../standard/Math/Numbers/Color4.js";
import Vector2      from "../../standard/Math/Numbers/Vector2.js";
import Vector3      from "../../standard/Math/Numbers/Vector3.js";
import Vector4      from "../../standard/Math/Numbers/Vector4.js";
import Rotation4    from "../../standard/Math/Numbers/Rotation4.js";
import Matrix3      from "../../standard/Math/Numbers/Matrix3.js";
import Matrix4      from "../../standard/Math/Numbers/Matrix4.js";
import Complex      from "../../standard/Math/Numbers/Complex.js";
import Box2         from "../../standard/Math/Geometry/Box2.js"
import Bezier       from "../../standard/Math/Algorithms/Bezier.js";
import MatrixStack  from "../../standard/Math/Utility/MatrixStack.js";

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
   length: /em|ex|px|in|cm|mm|pt|pc|%/gy,
   percent: /%/gy,

   // Values
   int32: /(?:0[xX][\da-fA-F]+)|(?:[+-]?\d+)/gy,
   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   constants: /([+-])((?:NAN|INF|INFINITY))/igy,
   matrix: /matrix/gy,
   translate: /translate/gy,
   rotate: /rotate/gy,
   scale: /scale/gy,
   skewX: /skewX/gy,
   skewY: /skewY/gy,
   color: /[a-zA-Z]+|#[\da-fA-F]+|rgba?\(.*?\)/gy,
   url: /url\("?(.*?)"?\)/gy,
   path: /[mMlLhHvVqQtTcCsSaAzZ]/gy,
});

/*
 *  Constants
 */

const
   MM     = 0.001,     // One mm in meters.
   CM     = 0.01,      // One cm in meters.
   INCH   = 0.0254,    // One inch in meters.
   POINT  = INCH / 72, // One point in meters.
   PICA   = INCH / 6,  // One pica in meters.
   PIXEL  = INCH / 90, // One pixel in meters.
   EM     = 16,        // One em in pixels.
   SPREAD = 16;        // Spread factor, Integer.

/*
 *  Parser
 */

function SVGParser (scene)
{
   X3DParser    .call (this, scene);
   X3DOptimizer .call (this);

   // Optimizer

   this .removeEmptyGroups    = true;
   this .combineGroupingNodes = true;

   // Options

   this .solid = false; // Are 2D primitives solid?

   // Globals

   this .viewBox          = new Vector4 (0, 0, 100, 100);
   this .modelMatrix      = new MatrixStack (Matrix4);
   this .fillGeometries   = new Map ();
   this .strokeGeometries = new Map ();
   this .lineProperties   = new Map ();
   this .tessy            = this .createTesselator ();
   this .canvas           = document .createElement ("canvas");
   this .context          = this .canvas .getContext ("2d");
   this .numSwitchNodes   = 0;

   this .styles = [{
      display: "inline",
      fillType: "COLOR",
      fillColor: Color4 .Black,
      fillURL: "",
      fillOpacity: 1,
      fillRule: "nonzero",
      strokeType: "none",
      strokeColor: Color4 .Black,
      strokeURL: "",
      strokeOpacity: 1,
      strokeWidth: 1,
      opacity: 1,
      stopColor: Color4 .Black,
      stopOpacity: 1,
      vectorEffect: "none",
   }];

   // Constants

   const browser = scene .getBrowser ()

   switch (browser .getBrowserOption ("PrimitiveQuality"))
   {
      case "LOW":
         this .BEZIER_STEPS = 6;  // Subdivisions of a span.
         this .CIRCLE_STEPS = 20; // Subdivisions of a circle, used for arc and rounded rect.
         break;
      case "HIGH":
         this .BEZIER_STEPS = 10; // Subdivisions of a span.
         this .CIRCLE_STEPS = 64; // Subdivisions of a circle, used for arc and rounded rect.
         break;
      default:
         this .BEZIER_STEPS = 8;  // Subdivisions of a span.
         this .CIRCLE_STEPS = 32; // Subdivisions of a circle, used for arc and rounded rect.
         break;
   }

   switch (browser .getBrowserOption ("TextureQuality"))
   {
      case "LOW":
         this .GRADIENT_SIZE = 128; // In pixels.
         break;
      case "HIGH":
         this .GRADIENT_SIZE = 512; // In pixels.
         break;
      default:
         this .GRADIENT_SIZE = 256; // In pixels.
         break;
   }

   this .canvas .width  = this .GRADIENT_SIZE;
   this .canvas .height = this .GRADIENT_SIZE;
}

Object .assign (Object .setPrototypeOf (SVGParser .prototype, X3DParser .prototype),
   X3DOptimizer .prototype,
{
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   getEncoding ()
   {
      return "XML";
   },
   setInput (xmlElement)
   {
      try
      {
         if (typeof xmlElement === "string")
            xmlElement = $.parseXML (xmlElement);

         this .input = xmlElement;
      }
      catch
      {
         this .input = undefined;
      }
   },
   isValid ()
   {
      if (!(this .input instanceof XMLDocument))
         return false;

      if ($(this .input) .children ("svg") .length)
         return true;

      if (this .input .nodeName === "svg")
         return true;

      return false;
   },
   parseIntoScene (resolve, reject)
   {
      this .xmlElement (this .input)
         .then (resolve)
         .catch (reject);
   },
   async xmlElement (xmlElement)
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
   async svgElement (xmlElement)
   {
      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("SVG");
      scene .setProfile (browser .getProfile ("Interchange"));
      scene .addComponent (browser .getComponent ("Geometry2D", 2));

      await browser .loadComponents (scene);

      // Init nodes.

      this .document              = this .input;
      this .rootTransform         = scene .createNode ("Transform");
      this .groupNodes            = [this .rootTransform];
      this .texturePropertiesNode = this .createTextureProperties ();

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
         defaultWidth   = this .lengthAttribute (xmlElement .getAttribute ("width"),  300, "width"),
         defaultHeight  = this .lengthAttribute (xmlElement .getAttribute ("height"), 150, "height"),
         defaultViewBox = this .viewBox .set (0, 0, defaultWidth, defaultHeight),
         viewBox        = this .viewBoxAttribute (xmlElement .getAttribute ("viewBox"), defaultViewBox),
         width          = this .lengthAttribute (xmlElement .getAttribute ("width"),  viewBox [2], "width"),
         height         = this .lengthAttribute (xmlElement .getAttribute ("height"), viewBox [3], "height");

      if (true) // default
      {
         // preserveAspectRatio = "xMidYMid meet"

         const
            r  = width / height,
            rv = viewBox [2] / viewBox [3];

         if (rv > r)
            viewBox [3] += viewBox [2] / r - viewBox [3];
         else
            viewBox [2] += viewBox [3] * r - viewBox [2];
      }

      // Create viewpoint.

      const
         viewpoint = scene .createNode ("OrthoViewpoint"),
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
      scene .addExportedNode (scene .getUniqueExportName ("ViewBox"), this .rootTransform);
      scene .getRootNodes () .push (this .rootTransform);

      // Optimize scene graph.

      this .optimizeSceneGraph (scene .getRootNodes ());
   },
   elements (xmlElement)
   {
      for (const childNode of xmlElement .childNodes)
         this .element (childNode);
   },
   element (xmlElement)
   {
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
   useElement (xmlElement)
   {
      // Get href.

      const usedElement = this .hrefAttribute (xmlElement .getAttribute ("href") || xmlElement .getAttribute ("xlink:href"));

      if (!usedElement)
         return;

      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         x      = this .lengthAttribute (xmlElement .getAttribute ("x"),      0, "width"),
         y      = this .lengthAttribute (xmlElement .getAttribute ("y"),      0, "height"),
         width  = this .lengthAttribute (xmlElement .getAttribute ("width"),  0, "width"),
         height = this .lengthAttribute (xmlElement .getAttribute ("height"), 0, "height");

      const transformNode = this .createTransform (xmlElement, new Vector2 (x, y));

      this .groupNodes .push (transformNode);

      this .element (usedElement);

      this .popAll ();
   },
   gElement (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const transformNode = this .createTransform (xmlElement);

      // Get child elements.

      this .groupNodes .push (transformNode);

      this .elements (xmlElement);

      this .popAll ();
   },
   switchElement (xmlElement)
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

      scene .addExportedNode (scene .getUniqueExportName (`Switch${++ this .numSwitchNodes}`), node);

      // Get child elements.

      this .groupNodes .push (switchNode);

      this .elements (xmlElement);

      this .popAll ();
   },
   aElement (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Get attributes.

      const
         href   = xmlElement .getAttribute ("href") || xmlElement .getAttribute ("xlink:href"),
         title  = xmlElement .getAttribute ("title") || xmlElement .getAttribute ("xlink:title"),
         target = xmlElement .getAttribute ("target");

      // Create Transform node.

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement),
         anchorNode    = scene .createNode ("Anchor");

      transformNode .children .push (anchorNode);

      anchorNode .description = title;
      anchorNode .url         = [href];

      if (target)
         anchorNode .parameter = [`target=${target}`];

      // Get child elements.

      this .groupNodes .push (anchorNode);

      this .elements (xmlElement);

      this .popAll ();
   },
   rectElement (xmlElement)
   {
      // Create Transform node.

      const
         x      = this .lengthAttribute (xmlElement .getAttribute ("x"),      0, "width"),
         y      = this .lengthAttribute (xmlElement .getAttribute ("y"),      0, "height"),
         width  = this .lengthAttribute (xmlElement .getAttribute ("width"),  0, "width"),
         height = this .lengthAttribute (xmlElement .getAttribute ("height"), 0, "height");

      let
         rx = Math .max (0, this .lengthAttribute (xmlElement .getAttribute ("rx"), 0, "width")),
         ry = Math .max (0, this .lengthAttribute (xmlElement .getAttribute ("ry"), 0, "height"));

      if (rx === 0 && ry === 0)
      {
         // Determine style.

         if (!this .styleAttributes (xmlElement))
            return;

         // Create Transform node.

         const
            scene         = this .getExecutionContext (),
            size          = new Vector2 (width, height),
            center        = new Vector2 (x + width / 2, y + height / 2),
            bbox          = new Box2 (size, center),
            transformNode = this .createTransform (xmlElement, center);

         this .groupNodes .push (transformNode);

         // Create nodes.

         if (this .style .fillType !== "none")
         {
            const
               shapeNode     = scene .createNode ("Shape"),
               rectangleNode = this .fillGeometries .get (xmlElement);

            transformNode .children .push (shapeNode);
            shapeNode .appearance = this .createFillAppearance (bbox);

            if (rectangleNode)
            {
               shapeNode .geometry = rectangleNode;
            }
            else
            {
               const rectangleNode = scene .createNode ("Rectangle2D");

               this .fillGeometries .set (xmlElement, rectangleNode);

               shapeNode .geometry  = rectangleNode;
               rectangleNode .solid = this .solid;
               rectangleNode .size  = size;
            }
         }

         if (this .style .strokeType !== "none")
         {
            const
               shapeNode    = scene .createNode ("Shape"),
               polylineNode = this .strokeGeometries .get (xmlElement);

            transformNode .children .push (shapeNode);
            shapeNode .appearance = this .createStrokeAppearance ();

            if (polylineNode)
            {
               shapeNode .geometry = polylineNode;
            }
            else
            {
               const
                  polylineNode = scene .createNode ("Polyline2D"),
                  width1_2     = width / 2,
                  height1_2    = height / 2;

               this .strokeGeometries .set (xmlElement, polylineNode);

               shapeNode .geometry = polylineNode;

               polylineNode .lineSegments = [ width1_2,  height1_2,
                                             -width1_2,  height1_2,
                                             -width1_2, -height1_2,
                                              width1_2, -height1_2,
                                              width1_2,  height1_2];
            }
         }

         this .popAll ();
      }
      else
      {
         // Create points.

         if (rx && !ry) ry = rx;
         if (ry && !rx) rx = ry;

         rx = Math .min (rx, width / 2);
         ry = Math .min (ry, height / 2);

         const
            xOffsets = [x + width - rx, x + rx , x + rx, x + width - rx],
            yOffsets = [y + height - ry, y + height - ry, y + ry, y + ry],
            points   = Object .assign ([ ], { closed: true });

         for (let c = 0; c < 4; ++ c)
         {
            const s = c * Math .PI / 2;

            for (let i = 0, N = this .CIRCLE_STEPS / 4; i < N; ++ i)
            {
               const p = Complex .Polar (1, s + Math .PI / 2 * i / (N - 1));

               points .push (new Vector3 (xOffsets [c] + p .real * rx, yOffsets [c] + p .imag * ry, 0));
            }
         }

         points .pop ();

         // Create nodes.

         this .pathLikeElement (xmlElement, [points]);
      }
   },
   circleElement (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         cx = this .lengthAttribute (xmlElement .getAttribute ("cx"), 0, "width"),
         cy = this .lengthAttribute (xmlElement .getAttribute ("cy"), 0, "height"),
         r  = this .lengthAttribute (xmlElement .getAttribute ("r"),  0);

      const
         scene         = this .getExecutionContext (),
         bbox          = new Box2 (new Vector2 (r * 2, r * 2), new Vector2 (cx, cy)),
         transformNode = this .createTransform (xmlElement, new Vector2 (cx, cy));

      this .groupNodes .push (transformNode);

      // Create nodes.

      if (this .style .fillType !== "none")
      {
         const
            shapeNode = scene .createNode ("Shape"),
            diskNode  = this .fillGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createFillAppearance (bbox);

         if (diskNode)
         {
            shapeNode .geometry = diskNode;
         }
         else
         {
            const diskNode = scene .createNode ("Disk2D");

            this .fillGeometries .set (xmlElement, diskNode);

            shapeNode .geometry   = diskNode;
            diskNode .solid       = this .solid;
            diskNode .outerRadius = r;
         }
      }

      if (this .style .strokeType !== "none")
      {
         const
            shapeNode  = scene .createNode ("Shape"),
            circleNode = this .strokeGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createStrokeAppearance ();

         if (circleNode)
         {
            shapeNode .geometry = circleNode;
         }
         else
         {
            const circleNode = scene .createNode ("Circle2D");

            this .strokeGeometries .set (xmlElement, circleNode);

            shapeNode .geometry = circleNode;
            circleNode .radius  = r;
         }
      }

      this .popAll ();
   },
   ellipseElement (xmlElement)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Create Transform node.

      const
         cx = this .lengthAttribute (xmlElement .getAttribute ("cx"), 0, "width"),
         cy = this .lengthAttribute (xmlElement .getAttribute ("cy"), 0, "height"),
         rx = this .lengthAttribute (xmlElement .getAttribute ("rx"), 0, "width"),
         ry = this .lengthAttribute (xmlElement .getAttribute ("ry"), 0, "height");

      const
         scene         = this .getExecutionContext (),
         rMin          = Math .min (rx, ry),
         bbox          = new Box2 (new Vector2 (rx * 2, ry * 2), new Vector2 (cx, cy)),
         transformNode = this .createTransform (xmlElement, new Vector2 (cx, cy), new Vector2 (rx / rMin, ry / rMin));

      this .groupNodes .push (transformNode);

      // Create nodes.

      if (this .style .fillType !== "none")
      {
         const
            shapeNode = scene .createNode ("Shape"),
            diskNode  = this .fillGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createFillAppearance (bbox);

         if (diskNode)
         {
            shapeNode .geometry = diskNode;
         }
         else
         {
            const diskNode = scene .createNode ("Disk2D");

            this .fillGeometries .set (xmlElement, diskNode);

            shapeNode .geometry   = diskNode;
            diskNode .solid       = this .solid;
            diskNode .outerRadius = rMin;
         }
      }

      if (this .style .strokeType !== "none")
      {
         const
            shapeNode  = scene .createNode ("Shape"),
            circleNode = this .strokeGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createStrokeAppearance ();

         if (circleNode)
         {
            shapeNode .geometry = circleNode;
         }
         else
         {
            const circleNode = scene .createNode ("Circle2D");

            this .strokeGeometries .set (xmlElement, circleNode);

            shapeNode .geometry = circleNode;
            circleNode .radius  = rMin;
         }
      }

      this .popAll ();
   },
   textElement (xmlElement)
   {

   },
   imageElement (xmlElement)
   {
      const transformNode = this .fillGeometries .get (xmlElement);

      if (transformNode)
      {
         this .groupNodes .at (-1) .children .push (transformNode);
      }
      else
      {
         // Determine style.

         if (!this .styleAttributes (xmlElement))
            return;

         // Create Transform node.

         const
            x      = this .lengthAttribute (xmlElement .getAttribute ("x"),      0, "width"),
            y      = this .lengthAttribute (xmlElement .getAttribute ("y"),      0, "height"),
            width  = this .lengthAttribute (xmlElement .getAttribute ("width"),  0, "width"),
            height = this .lengthAttribute (xmlElement .getAttribute ("height"), 0, "height"),
            href   = xmlElement .getAttribute ("href") || xmlElement .getAttribute ("xlink:href");

         const
            scene         = this .getExecutionContext (),
            transformNode = this .createTransform (xmlElement, new Vector2 (x + width / 2, y + height / 2), new Vector2 (1, -1));

         this .fillGeometries .set (xmlElement, transformNode);
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

         this .popAll ();
      }
   },
   polylineElement (xmlElement)
   {
      // Get points.

      const points = [ ];

      if (!this .pointsAttribute (xmlElement .getAttribute ("points"), points))
         return;

      // Create nodes.

      this .pathLikeElement (xmlElement, [points]);
   },
   polygonElement (xmlElement)
   {
      // Get points.

      const points = Object .assign ([ ], { closed: true });

      if (!this .pointsAttribute (xmlElement .getAttribute ("points"), points))
         return;

      // Create nodes.

      this .pathLikeElement (xmlElement, [points]);
   },
   pathElement (xmlElement)
   {
      // Get path points.

      const contours = [ ];

      if (!this .dAttribute (xmlElement .getAttribute ("d"), contours))
         return;

      // Create nodes.

      this .pathLikeElement (xmlElement, contours);
   },
   pathLikeElement (xmlElement, contours)
   {
      // Determine style.

      if (!this .styleAttributes (xmlElement))
         return;

      // Filter consecutive equal points.

      const EPSILON = 1e-9; // Min point distance.

      contours = contours .map (points =>
      {
         if (points .closed)
         {
            return Object .assign (points .filter ((p, i, a) => p .distance (a [(i + 1) % a .length]) > EPSILON),
            {
               closed: true,
            });
         }
         else
         {
            return points .filter ((p, i, a) => !i || p .distance (a [i - 1]) > EPSILON);
         }
      })
      .filter (points => points .length > 2);

      // Add index property to points.

      contours .forEach ((points, i, a) => points .index = i ? a [i - 1] .index + a [i - 1] .length : 0);

      // Create Transform node.

      const
         scene         = this .getExecutionContext (),
         transformNode = this .createTransform (xmlElement),
         bbox          = new Box2 ();

      for (const points of contours)
         bbox .add (Box2 .Points (points));

      this .groupNodes .push (transformNode);

      // Create nodes.

      const coordinateNode = scene .createNode ("Coordinate");

      for (const points of contours)
         coordinateNode .point .push (... points);

      if (this .style .fillType !== "none")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = this .fillGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createFillAppearance (bbox);

         if (geometryNode)
         {
            shapeNode .geometry = geometryNode;
         }
         else
         {
            const geometryNode = scene .createNode ("IndexedTriangleSet");

            this .fillGeometries .set (xmlElement, geometryNode);

            shapeNode .geometry    = geometryNode;
            geometryNode .solid    = this .solid;
            geometryNode .index    = this .triangulatePolygon (contours, coordinateNode);
            geometryNode .texCoord = this .createTextureCoordinate (coordinateNode, bbox, shapeNode .appearance);
            geometryNode .coord    = coordinateNode;
         }
      }

      if (this .style .strokeType !== "none")
      {
         const
            shapeNode    = scene .createNode ("Shape"),
            geometryNode = this .strokeGeometries .get (xmlElement);

         transformNode .children .push (shapeNode);
         shapeNode .appearance = this .createStrokeAppearance ();

         if (geometryNode)
         {
            shapeNode .geometry = geometryNode;
         }
         else
         {
            const geometryNode = scene .createNode ("IndexedLineSet");

            this .strokeGeometries .set (xmlElement, geometryNode);

            shapeNode .geometry = geometryNode;
            geometryNode .coord = coordinateNode;

            // Create contour indices.

            const indices = [ ];

            for (const points of contours)
            {
               for (const i of points .keys ())
                  indices .push (points .index + i);

               if (points .closed)
                  indices .push (points .index);

               indices .push (-1);
            }

            geometryNode .coordIndex = indices;
         }
      }

      this .popAll ();
   },
   linearGradientElementUrl (xmlElement, bbox)
   {
      const
         g        = this .linearGradientElement (xmlElement, bbox, { stops: [ ] }),
         gradient = this .context .createLinearGradient (g .x1, g .y1, g .x2, g .y2);

      return this .drawGradient (gradient, g, bbox);
   },
   linearGradientElement (xmlElement, bbox, gradient)
   {
      if (xmlElement .nodeName !== "linearGradient")
         return;

      // Attribute xlink:href

      const refElement = this .hrefAttribute (xmlElement .getAttribute ("href") || xmlElement .getAttribute ("xlink:href"));

      if (refElement)
         this .gradientElement (refElement, bbox, gradient);

      // Attributes

      gradient .x1        = this .lengthAttribute (xmlElement .getAttribute ("x1"), gradient .x1 || 0, "width");
      gradient .y1        = this .lengthAttribute (xmlElement .getAttribute ("y1"), gradient .y1 || 0, "height");
      gradient .x2        = this .lengthAttribute (xmlElement .getAttribute ("x2"), gradient .x2 || 1, "width");
      gradient .y2        = this .lengthAttribute (xmlElement .getAttribute ("y2"), gradient .y2 || 0, "height");
      gradient .units     = xmlElement .getAttribute ("gradientUnits") || "objectBoundingBox";
      gradient .transform = this .transformAttribute (xmlElement .getAttribute ("gradientTransform"));

      // Spread matrix

      const
         s = new Matrix3 (),
         c = new Vector2 (gradient .x1, gradient .y1);

      s .translate (c);
      s .scale (new Vector2 (SPREAD, SPREAD));
      s .translate (c .negate ());

      gradient .spreadMatrix = s;

      // Stops

      for (const childNode of xmlElement .childNodes)
         this .gradientChild (childNode, gradient);

      return gradient;
   },
   radialGradientElementUrl (xmlElement, bbox)
   {
      const
         g        = this .radialGradientElement (xmlElement, bbox, { stops: [ ] }),
         gradient = this .context .createRadialGradient (g .fx, g .fy, g .fr, g .cx, g .cy, g .r);

      return this .drawGradient (gradient, g, bbox);
   },
   radialGradientElement (xmlElement, bbox, gradient)
   {
      // Attribute xlink:href

      const refElement = this .hrefAttribute (xmlElement .getAttribute ("href") || xmlElement .getAttribute ("xlink:href"));

      if (refElement)
         this .gradientElement (refElement, bbox, gradient);

      // Attributes

      gradient .cx           = this .lengthAttribute (xmlElement .getAttribute ("cx"), gradient .cx || 0.5, "width"),
      gradient .cy           = this .lengthAttribute (xmlElement .getAttribute ("cy"), gradient .cy || 0.5, "height"),
      gradient .r            = this .lengthAttribute (xmlElement .getAttribute ("r"),  gradient .r  || 0.5),
      gradient .fx           = this .lengthAttribute (xmlElement .getAttribute ("fx"), gradient .fx || gradient .cx, "width"),
      gradient .fy           = this .lengthAttribute (xmlElement .getAttribute ("fy"), gradient .fy || gradient .cy, "height"),
      gradient .fr           = this .lengthAttribute (xmlElement .getAttribute ("fr"), gradient .fr || 0),
      gradient .units        = xmlElement .getAttribute ("gradientUnits") || "objectBoundingBox";
      gradient .spreadMethod = xmlElement .getAttribute ("spreadMethod");
      gradient .transform    = this .transformAttribute (xmlElement .getAttribute ("gradientTransform"));

      // Spread matrix

      const
         s = new Matrix3 (),
         c = new Vector2 (gradient .fx, gradient .fy);

      s .translate (c);
      s .scale (new Vector2 (SPREAD, SPREAD));
      s .translate (c .negate ());

      gradient .spreadMatrix = s;

      // Stops

      for (const childNode of xmlElement .childNodes)
         this .gradientChild (childNode, gradient);

      return gradient;
   },
   gradientElement (xmlElement, bbox, gradient)
   {
      if (!xmlElement)
         return;

      switch (xmlElement .nodeName)
      {
         case "linearGradient":
            return this .linearGradientElement (xmlElement, bbox, gradient);
         case "radialGradient":
            return this .radialGradientElement (xmlElement, bbox, gradient);
      }
   },
   gradientChild (xmlElement, gradient)
   {
      if (xmlElement .nodeName === "stop")
         return this .stopElement (xmlElement, gradient);
   },
   stopElement (xmlElement, gradient)
   {
      if (!this .styleAttributes (xmlElement))
         return;

      const offset = this .percentAttribute (xmlElement .getAttribute ("offset"), 0);

      if (offset < 0 || offset > 1)
         return;

      const { stopColor, stopOpacity } = this .style;

      gradient .stops .push ([offset, stopColor, stopOpacity]);

      this .styles .pop ();
   },
   drawGradient (gradient, g, bbox)
   {
      // Add color stops.

      switch (g .spreadMethod)
      {
         default: // pad
         {
            g .spreadMatrix .identity ();

            for (const [o, c, a] of g .stops)
               gradient .addColorStop (o, this .cssColor (c, a));

            break;
         }
         case "repeat":
         {
            for (let i = 0; i < SPREAD; ++ i)
            {
               const s = i / SPREAD;

               for (const [o, c, a] of g .stops)
                  gradient .addColorStop (s + o / SPREAD, this .cssColor (c, a));
            }

            break;
         }
         case "reflect":
         {
            for (let i = 0; i < SPREAD; ++ i)
            {
               const s = i / SPREAD;

               for (const [o, c, a] of g .stops)
                  gradient .addColorStop (s + (i % 2 ? 1 - o : o) / SPREAD, this .cssColor (c, a));
            }

            break;
         }
      }

      // Create Matrix.

      const m = new Matrix3 ();

      m .scale (new Vector2 (this .GRADIENT_SIZE / 2, this .GRADIENT_SIZE / 2));
      m .translate (Vector2 .One);
      m .scale (new Vector2 (1, -1));

      if (g .units === "userSpaceOnUse")
         m .multLeft (bbox .matrix .copy () .inverse ());
      else
         m .multLeft (new Matrix3 (2, 0, 0, 0, 2, 0, -1, -1, 1));

      m .multLeft (g .transform);
      m .multLeft (g .spreadMatrix);

      // Paint.

      const cx = this .context;

      cx .fillStyle = gradient;
      cx .save ();
      cx .clearRect (0, 0, this .GRADIENT_SIZE, this .GRADIENT_SIZE);
      cx .rect (0, 0, this .GRADIENT_SIZE, this .GRADIENT_SIZE);
      cx .transform (m [0], m [1], m [3], m [4], m [6], m [7]);
      cx .fill ();
      cx .restore ();

      // Use PNG because image can have alpha channel.
      return this .canvas .toDataURL ("image/png");
   },
   patternUrl (xmlElement)
   {
      //console .debug ("pattern");
   },
   idAttribute (attribute, node)
   {
      if (attribute === null)
         return;

      const
         scene = this .getExecutionContext (),
         name  = this .sanitizeName (attribute);

      if (!name)
         return;

      scene .addNamedNode (scene .getUniqueName (name), node);
      scene .addExportedNode (scene .getUniqueExportName (name), node);
   },
   viewBoxAttribute (attribute, defaultValue)
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
   hrefAttribute (attribute)
   {
      if (!attribute)
         return;

      const
         scene = this .getExecutionContext (),
         hash  = new URL (attribute, scene .getBaseURL ()) .hash .slice (1);

      return this .document .getElementById (hash);
   },
   lengthAttribute (attribute, defaultValue, percent)
   {
      // Returns length in pixel.

      if (attribute === null)
         return defaultValue;

      this .parseValue (attribute);

      if (this .double ())
      {
         let value = this .value;

         // Parse unit

         if (Grammar .length .parse (this))
         {
            switch (this .result [0])
            {
               case "em":
                  value *= EM;
                  break;
               case "ex":
                  // TODO
                  break;
               case "px":
                  // We are pixels :)
                  break;
               case "in":
                  value *= INCH / PIXEL;
                  break;
               case "cm":
                  value *= CM / PIXEL;
                  break;
               case "mm":
                  value *= MM / PIXEL;
                  break;
               case "pt":
                  value *= POINT / PIXEL;
                  break;
               case "pc":
                  value *= PICA / PIXEL;
                  break;
               case "%":
               {
                  switch (percent)
                  {
                     case "width":
                        value *= this .viewBox [2] / 100;
                        break;
                     case "height":
                        value *= this .viewBox [3] / 100;
                        break;
                     default:
                        value *= Math .hypot (this .viewBox [2], this .viewBox [3]) / 100;
                        break;
                     }

                  break;
               }
            }
         }

         return value;
      }

      return defaultValue;
   },
   percentAttribute (attribute, defaultValue)
   {
      this .parseValue (attribute);

      if (this .double ())
      {
         let value = this .value;

         // Parse unit

         if (Grammar .percent .parse (this))
            value /= 100;

         return Algorithm .clamp (value, 0, 1);
      }

      return defaultValue;
   },
   pointsAttribute (attribute, points)
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

                  points .push (new Vector3 (x, y, 0));

                  if (this .comma ())
                     continue;
               }
            }
         }

         break;
      }

      return !! points .length;
   },
   dAttribute (attribute, contours)
   {
      if (attribute === null)
         return false;

      this .parseValue (attribute);

      let
         points   = [ ],
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
         command  = this .result [0];
         relative = command === command .toLowerCase ();

         switch (command)
         {
            case "m":
            case "M":
            {
               // moveto

               if (points .length > 2)
                  contours .push (Object .assign (points, { closed: false }));

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

                        points .push (new Vector3 (x, y, 0));

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

                        points .push (new Vector3 (x, y, 0));

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

                     points .push (new Vector3 (x, ay, 0));

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

                     points .push (new Vector3 (ax, y, 0));

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

                              Bezier .quadric (ax, ay, 0, x1, y1, 0, x, y, 0, this .BEZIER_STEPS, points);

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

                        Bezier .quadric (ax, ay, 0, x1, y1, 0, x, y, 0, this .BEZIER_STEPS, points);

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

                                    Bezier .cubic (ax, ay, 0, x1, y1, 0, x2, y2, 0, x, y, 0, this .BEZIER_STEPS, points);

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
                                    var x1 = ax + (ax - px);
                                    var y1 = ay + (ay - py);
                                    break;
                                 }
                                 default:
                                 {
                                    var x1 = ax;
                                    var y1 = ay;
                                    break;
                                 }
                              }

                              Bezier .cubic (ax, ay, 0, x1, y1, 0, x2, y2, 0, x, y, 0, this .BEZIER_STEPS, points);

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
                           let xAxisRotation = Algorithm .radians (this .value);

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

                                       Bezier .arc (ax, ay, rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y, this .CIRCLE_STEPS, points);

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

               if (points .length > 2)
               {
                  ax = points [0] .x;
                  ay = points [0] .y;

                  contours .push (Object .assign (points, { closed: true }));
               }

               points = [ ];

               this .comma ();
               continue;
            }
         }

         break;
      }

      if (points .length > 2)
         contours .push (Object .assign (points, { closed: false }));

      return !! contours .length;
   },
   transformAttribute (attribute)
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
                        var ty = this .value;
                     }
                  }
                  else
                  {
                     var ty = 0;
                  }

                  this .whitespaces ();

                  if (Grammar .closeParenthesis .parse (this))
                  {
                     matrix .translate (new Vector2 (tx, ty));
                     continue;
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
                        var sy = this .value;
                     }
                  }
                  else
                  {
                     var sy = sx;
                  }

                  this .whitespaces ();

                  if (Grammar .closeParenthesis .parse (this))
                  {
                     matrix .scale (new Vector2 (sx, sy));
                     continue;
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
   styleAttributes (xmlElement)
   {
      const style = Object .assign ({ }, this .styles .at (-1));

      if (this .style .display === "none")
         return false;

      this .styles .push (style);

      for (const attribute of xmlElement .attributes)
         this .parseStyle (attribute .name, attribute .value)

      // Style attribute has higher precedence.

      this .styleAttribute (xmlElement .getAttribute ("style"));

      return true;
   },
   styleAttribute (attribute)
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
   parseStyle (style, value)
   {
      if (value === "inherit" || value == "unset")
         return;

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
         case "vector-effect":
            this .vectorEffectStyle (value);
            break;
      }
   },
   displayStyle (value)
   {
      if (value === "default")
      {
         this .style .display = "inline";
         return;
      }

      this .style .display = value;
   },
   fillStyle (value)
   {
      if (value === "default")
      {
         this .style .fillType  = this .styles [0] .fillType;
         this .style .fillColor = this .styles [0] .fillColor;
         this .style .fillURL   = this .styles [0] .fillURL;
         return;
      }

      if (value === "transparent")
      {
         this .style .fillType = "none";
         return;
      }

      if (value === "none")
      {
         this .style .fillType = "none";
         return;
      }

      if (this .urlValue ())
      {
         this .style .fillType = "URL";
         this .style .fillURL  = this .result [1] .trim ();
         return;
      }

      if (this .colorValue (this .styles .at (-1) .fillColor))
      {
         this .style .fillType  = "COLOR";
         this .style .fillColor = this .value .copy ();
         return;
      }
   },
   fillOpacityStyle (value)
   {
      if (value === "default")
      {
         this .style .fillOpacity = this .styles [0] .fillOpacity;
         return;
      }

      if (value === "transparent")
      {
         this .style .fillOpacity = 0;
         return;
      }

      if (this .double ())
      {
         this .style .fillOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }
   },
   fillRuleStyle (value)
   {
      if (value === "default")
      {
         this .style .fillRule = this .styles [0] .fillRule;
         return;
      }

      this .style .fillRule = value;
   },
   strokeStyle (value)
   {
      if (value === "default")
      {
         this .style .strokeType  = this .styles [0] .strokeType;
         this .style .strokeColor = this .styles [0] .strokeColor;
         this .style .strokeURL   = this .styles [0] .strokeURL;
         return;
      }

      if (value === "transparent")
      {
         this .style .strokeType = "none";
         return;
      }

      if (value === "none")
      {
         this .style .strokeType = "none";
         return;
      }

      if (this .urlValue ())
      {
         this .style .strokeType = "URL";
         this .style .strokeURL  = this .result [1] .trim ();
         return;
      }

      if (this .colorValue (this .styles .at (-1) .strokeColor))
      {
         this .style .strokeType  = "COLOR";
         this .style .strokeColor = this .value .copy ();
         return;
      }
   },
   strokeOpacityStyle (value)
   {
      if (value === "default")
      {
         this .style .strokeOpacity = this .styles [0] .strokeOpacity;
         return;
      }

      if (value === "transparent")
      {
         this .style .strokeOpacity = 0;
         return;
      }

      if (this .double ())
      {
         this .style .strokeOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }
   },
   strokeWidthStyle (value)
   {
      if (value === "default")
      {
         this .style .strokeWidth = this .styles [0] .strokeWidth;
         return;
      }

      if (value === "none")
      {
         this .style .strokeWidth = 0;
         return;
      }

      if (this .double ())
      {
         this .style .strokeWidth = this .lengthAttribute (this .value, 1);
         return;
      }
   },
   opacityStyle (value)
   {
      if (value === "default")
      {
         this .style .opacity = this .styles [0] .opacity;
         return;
      }

      if (value === "transparent")
      {
         this .style .opacity = 0;
         return;
      }

      if (this .double ())
      {
         this .style .opacity = Algorithm .clamp (this .value, 0, 1) * this .styles .at (-1) .opacity;
         return;
      }
   },
   stopColorStyle (value)
   {
      if (value === "default")
      {
         this .style .stopColor = this .styles [0] .stopColor;
         return;
      }

      if (this .colorValue (Color4 .Black))
      {
         this .style .stopColor = this .value .copy ();
         return;
      }
   },
   stopOpacityStyle (value)
   {
      if (value === "default")
      {
         this .style .stopOpacity = this .styles [0] .stopOpacity;
         return;
      }

      if (value === "transparent")
      {
         this .style .stopOpacity = 0;
         return;
      }

      if (this .double ())
      {
         this .style .stopOpacity = Algorithm .clamp (this .value, 0, 1);
         return;
      }
   },
   vectorEffectStyle (value)
   {
      if (value === "default")
      {
         this .style .vectorEffect = this .styles [0] .vectorEffect;
         return;
      }

      this .style .vectorEffect = value;
   },
   parseValue (value)
   {
      this .input     = value;
      this .lastIndex = 0;
      this .value     = undefined;
   },
   whitespaces ()
   {
      return Grammar .whitespaces .parse (this);
   },
   comma ()
   {
      return !! (this .whitespaces () | Grammar .comma .parse (this));
   },
   int32 ()
   {
      this .whitespaces ();

      if (Grammar .int32 .parse (this))
      {
         this .value = parseInt (this .result [0]);

         return true;
      }

      return false;
   },
   double ()
   {
      this .whitespaces ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

         return true;
      }

      if (Grammar .constants .parse (this))
      {
         this .value = this .CONSTANTS .get (this .result [2] .toUpperCase ());

         if (this .result [1] === "-")
            this .value = - this .value;

         return true;
      }

      return false;
   },
   colorValue: (() =>
   {
      const color = new Color4 ();

      return function (c)
      {
         if (!Grammar .color .parse (this))
            return false;

         const defaultColor = this .cssColor (c);

         this .value = color .set (... this .convertColor (this .result [0], defaultColor));

         return true;
      };
   })(),
   urlValue ()
   {
      return Grammar .url .parse (this);
   },
   cssColor (c, a = c .a)
   {
      return `rgba(${c .r * 255},${c .g * 255},${c .b * 255},${a})`;
   },
   createTransform (xmlElement, t = Vector2 .Zero, s = Vector2 .One)
   {
      // Determine matrix.

      const
         scene = this .getExecutionContext (),
         m     = this .transformAttribute (xmlElement .getAttribute ("transform"));

      this .modelMatrix .push ();
      this .modelMatrix .multLeft (Matrix4 .Matrix3 (m));

      m .translate (t);
      m .scale (s);

      // Create node.

      const
         transformNode    = scene .createNode ("Transform"),
         matrix           = Matrix4 .Matrix3 (m),
         translation      = new Vector3 (),
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

      // Add node to parent.

      this .groupNodes .at (-1) .children .push (transformNode);

      return transformNode;
   },
   popAll ()
   {
      this .groupNodes  .pop ();
      this .modelMatrix .pop ();
      this .styles      .pop ();
   },
   createFillAppearance (bbox)
   {
      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance");

      switch (this .style .fillType)
      {
         case "none":
         {
            return null;
         }
         case "COLOR":
         {
            const materialNode = scene .createNode ("UnlitMaterial");

            appearanceNode .material    = materialNode;
            materialNode .emissiveColor = new Color3 (... this .style .fillColor);
            materialNode .transparency  = 1 - this .style .fillOpacity * this .style .opacity;

            break;
         }
         case "URL":
         {
            // Gradient

            const
               scene       = this .getExecutionContext (),
               textureNode = scene .createNode ("ImageTexture"),
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
   getFillUrl (fillURL, bbox)
   {
      const xmlElement = this .hrefAttribute (fillURL);

      if (!xmlElement)
         return;

      switch (xmlElement .nodeName)
      {
         case "linearGradient":
            return this .linearGradientElementUrl (xmlElement, bbox);

         case "radialGradient":
            return this .radialGradientElementUrl (xmlElement, bbox);

         case "pattern":
            return this .patternUrl (xmlElement);
      }
   },
   createStrokeAppearance ()
   {
      const
         scene          = this .getExecutionContext (),
         appearanceNode = scene .createNode ("Appearance"),
         materialNode   = scene .createNode ("UnlitMaterial");

      appearanceNode .material    = materialNode;
      materialNode .emissiveColor = new Color3 (... this .style .strokeColor);
      materialNode .transparency  = 1 - this .style .strokeOpacity * this .style .opacity;

      const strokeWidth = this .vectorEffect === "non-scaling-stroke"
         ? this .style .strokeWidth
         : this .getStokeWidth ();

      if (strokeWidth > 1)
         appearanceNode .lineProperties = this .getLineProperties (strokeWidth);

      return appearanceNode;
   },
   getStokeWidth ()
   {
      const
         modelMatrix = this .modelMatrix .get (),
         strokeWidth = modelMatrix .multDirMatrix (new Vector3 (this .style .strokeWidth, this .style .strokeWidth, 0));

      return (strokeWidth .x + strokeWidth .y) / 2;
   },
   getLineProperties (strokeWidth)
   {
      const lineProperties = this .lineProperties .get (strokeWidth);

      if (lineProperties)
      {
         return lineProperties;
      }
      else
      {
         const
            scene          = this .getExecutionContext (),
            lineProperties = scene .createNode ("LineProperties");

         lineProperties .linewidthScaleFactor = strokeWidth;

         this .lineProperties .set (strokeWidth, lineProperties);

         return lineProperties;
      }
   },
   createTextureProperties ()
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
   createTextureCoordinate (coordinateNode, bbox, appearance)
   {
      if (!appearance || !appearance .texture)
         return null;

      const
         scene        = this .getExecutionContext (),
         texCoordNode = scene .createNode ("TextureCoordinate"),
         invMatrix    = bbox .matrix .copy () .inverse ();

      for (const point of coordinateNode .point)
         texCoordNode .point .push (invMatrix .multVecMatrix (new Vector2 (point .x, point .y)) .add (Vector2 .One) .divide (2));

      return texCoordNode;
   },
   createTesselator ()
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
   triangulatePolygon (contours, coordinateNode)
   {
      // Callback for when segments intersect and must be split.

      function combineCallback (coords, data, weight)
      {
         const index = coordinateNode .point .length;

         coordinateNode .point .push (new Vector3 (... coords));

         return index;
      }

      const
         tessy     = this .tessy,
         winding   = this .style .fillRule === "evenodd" ? "GLU_TESS_WINDING_ODD" : "GLU_TESS_WINDING_NONZERO",
         triangles = [ ];

      tessy .gluTessProperty (libtess .gluEnum .GLU_TESS_WINDING_RULE, libtess .windingRule [winding]);
      tessy .gluTessCallback (libtess .gluEnum .GLU_TESS_COMBINE,      combineCallback);
      tessy .gluTessBeginPolygon (triangles);

      for (const points of contours)
      {
         tessy .gluTessBeginContour ();

         for (const [i, point] of points .entries ())
            tessy .gluTessVertex (point, points .index + i);

         tessy .gluTessEndContour ();
      }

      tessy .gluTessEndPolygon ();

      // Array of indices of triangles.
      return triangles;
   },
});

Object .defineProperty (SVGParser .prototype, "style",
{
   get ()
   {
      return this .styles .at (-1);
   },
})

export default SVGParser;
