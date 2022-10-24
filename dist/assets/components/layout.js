(function ()
{
// Undefine global variables.
var module = { }, exports, process;

const
	X3D     = window [Symbol .for ("X_ITE.X3D-6.1.0")],
	define  = X3D .define,
	require = X3D .require;
/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Browser/Layout/X3DLayoutContext',[
   "jquery",
   "x_ite/Components/Texturing/TextureProperties",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/ViewVolume",
],
function ($,
          TextureProperties,
          Vector3,
          Matrix4,
          ViewVolume)
{
"use strict";

   const
      _screenTextureProperties = Symbol ();

   function X3DLayoutContext ()
   { }

   X3DLayoutContext .prototype =
   {
      getScreenTextureProperties: function ()
      {
         this [_screenTextureProperties] = new TextureProperties (this .getPrivateScene ());

         this [_screenTextureProperties] ._boundaryModeS       = "CLAMP";
         this [_screenTextureProperties] ._boundaryModeT       = "CLAMP";
         this [_screenTextureProperties] ._boundaryModeR       = "CLAMP";
         this [_screenTextureProperties] ._minificationFilter  = "NEAREST_PIXEL";
         this [_screenTextureProperties] ._magnificationFilter = "NEAREST_PIXEL";
         this [_screenTextureProperties] ._generateMipMaps     = false;

         this [_screenTextureProperties] .setup ();

         this .getScreenTextureProperties = function () { return this [_screenTextureProperties]; };

         Object .defineProperty (this, "getScreenTextureProperties", { enumerable: false });

         return this [_screenTextureProperties];
      },
      getScreenScaleMatrix: (function ()
      {
         const
            screenScale  = new Vector3 (0, 0, 0),
            screenPoint  = new Vector3 (0, 0, 0),
            screenMatrix = new Matrix4 ();

         return function (renderObject, matrix)
         {
            // throws domain error

            const
               modelViewMatrix  = renderObject .getModelViewMatrix () .get (),
               projectionMatrix = renderObject .getProjectionMatrix () .get (),
               viewport         = renderObject .getViewVolume () .getViewport ();

            // Determine screenMatrix.
            // Same as in ScreenText.

            renderObject .getViewpoint () .getScreenScale (modelViewMatrix .origin, viewport, screenScale); // in meter/pixel

            const
               x = modelViewMatrix .xAxis .normalize () .multiply (screenScale .x),
               y = modelViewMatrix .yAxis .normalize () .multiply (screenScale .y),
               z = modelViewMatrix .zAxis .normalize () .multiply (screenScale .x);

            screenMatrix .set (x .x, x .y, x .z, 0,
                               y .x, y .y, y .z, 0,
                               z .x, z .y, z .z, 0,
                               modelViewMatrix [12], modelViewMatrix [13], modelViewMatrix [14], 1);

            // Snap to whole pixel.

            ViewVolume .projectPoint (Vector3 .Zero, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .x = Math .round (screenPoint .x);
            screenPoint .y = Math .round (screenPoint .y);

            ViewVolume .unProjectPoint (screenPoint .x, screenPoint .y, screenPoint .z, screenMatrix, projectionMatrix, viewport, screenPoint);

            screenPoint .z = 0;
            screenMatrix .translate (screenPoint);

            // Assign relative matrix.

            matrix .assign (modelViewMatrix) .inverse () .multLeft (screenMatrix);
         };
      })(),
   };

   return X3DLayoutContext;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/X3DLayoutNode',[
   "x_ite/Components/Core/X3DChildNode",
   "x_ite/Base/X3DConstants",
],
function (X3DChildNode,
          X3DConstants)
{
"use strict";

   function X3DLayoutNode (executionContext)
   {
      X3DChildNode .call (this, executionContext);

      this .addType (X3DConstants .X3DLayoutNode);
   }

   X3DLayoutNode .prototype = Object .assign (Object .create (X3DChildNode .prototype),
   {
      constructor: X3DLayoutNode,
   });

   return X3DLayoutNode;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/Layout',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Layout/X3DLayoutNode",
   "x_ite/Base/X3DCast",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Vector2",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Rotation4",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLayoutNode,
          X3DCast,
          X3DConstants,
          Vector2,
          Vector3,
          Rotation4,
          Matrix4)
{
"use strict";

   var
      i        = 0,
      LEFT     = i++,
      CENTER   = i++,
      RIGHT    = i++,
      BOTTOM   = i++,
      TOP      = i++,
      WORLD    = i++,
      FRACTION = i++,
      PIXEL    = i++,
      NONE     = i++,
      STRETCH  = i++;

   function Layout (executionContext)
   {
      X3DLayoutNode .call (this, executionContext);

      this .addType (X3DConstants .Layout);

      this .alignX          = CENTER;
      this .alignY          = CENTER;
      this .offsetUnitX     = WORLD;
      this .offsetUnitY     = WORLD;
      this .offsetX         = 0;
      this .offsetY         = 0;
      this .sizeUnitX       = WORLD;
      this .sizeUnitY       = WORLD;
      this .sizeX           = 1;
      this .sizeY           = 1;
      this .scaleModeX      = NONE;
      this .scaleModeY      = NONE;
      this .parent          = null;
      this .rectangleCenter = new Vector2 (0, 0);
      this .rectangleSize   = new Vector2 (0, 0);
      this .matrix          = new Matrix4 ();
   }

   Layout .prototype = Object .assign (Object .create (X3DLayoutNode .prototype),
   {
      constructor: Layout,
      viewportPixel: new Vector2 (0, 0),
      pixelSize: new Vector2 (0, 0),
      translation: new Vector3 (0, 0, 0),
      offset: new Vector3 (0, 0, 0),
      scale: new Vector3 (1, 1, 1),
      currentTranslation: new Vector3 (0, 0, 0),
      currentRotation: new Rotation4 (0, 0, 1, 0),
      currentScale: new Vector3 (0, 0, 0),
      modelViewMatrix: new Matrix4 (),
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "align",       new Fields .MFString ("CENTER", "CENTER")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offsetUnits", new Fields .MFString ("WORLD", "WORLD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",      new Fields .MFFloat (0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sizeUnits",   new Fields .MFString ("WORLD", "WORLD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .MFFloat (1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scaleMode",   new Fields .MFString ("NONE", "NONE")),
      ]),
      getTypeName: function ()
      {
         return "Layout";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "layout";
      },
      initialize: function ()
      {
         X3DLayoutNode .prototype .initialize .call (this);

         this ._align       .addInterest ("set_align__", this);
         this ._offsetUnits .addInterest ("set_offsetUnits__", this);
         this ._offset      .addInterest ("set_offset__", this);
         this ._sizeUnits   .addInterest ("set_sizeUnits__", this);
         this ._size        .addInterest ("set_size__", this);
         this ._scaleMode   .addInterest ("set_scaleMode__", this);

         this .set_align__ ();
         this .set_offsetUnits__ ();
         this .set_offset__ ();
         this .set_sizeUnits__ ();
         this .set_size__ ();
         this .set_scaleMode__ ();
      },
      set_align__: function ()
      {
         // X

         if (this ._align .length > 0)
         {
            if (this ._align [0] === "LEFT")
               this .alignX = LEFT;

            else if (this ._align [0] === "RIGHT")
               this .alignX = RIGHT;

            else
               this .alignX = CENTER;
         }
         else
            this .alignX = CENTER;

         // Y

         if (this ._align .length > 1)
         {
            if (this ._align [1] === "BOTTOM")
               this .alignY = BOTTOM;

            else if (this ._align [1] === "TOP")
               this .alignY = TOP;

            else
               this .alignY = CENTER;
         }
         else
            this .alignY = CENTER;
      },
      set_offsetUnits__: function ()
      {
         if (this ._offsetUnits .length > 0)
         {
            // X

            if (this ._offsetUnits [0] === "FRACTION")
               this .offsetUnitX = FRACTION;

            else if (this ._offsetUnits [0] === "PIXEL")
               this .offsetUnitX = PIXEL;

            else
               this .offsetUnitX = WORLD;

            // Y

            if (this ._offsetUnits .length > 1)
            {
               if (this ._offsetUnits [1] === "FRACTION")
                  this .offsetUnitY = FRACTION;

               else if (this ._offsetUnits [1] === "PIXEL")
                  this .offsetUnitY = PIXEL;

               else
                  this .offsetUnitY = WORLD;
            }
            else
               this .offsetUnitY = this .offsetUnitX;
         }
         else
         {
            this .offsetUnitX = WORLD;
            this .offsetUnitY = WORLD;
         }
      },
      set_offset__: function ()
      {
         if (this ._offset .length > 0)
         {
            // X

            this .offsetX = this ._offset [0];

            // Y

            if (this ._offset .length > 1)
               this .offsetY = this ._offset [1];

            else
               this .offsetY = offsetX;
         }
         else
         {
            this .offsetX = 0;
            this .offsetY = 0;
         }
      },
      set_sizeUnits__: function ()
      {
         if (this ._sizeUnits .length > 0)
         {
            // X

            if (this ._sizeUnits [0] === "FRACTION")
               this .sizeUnitX = FRACTION;

            else if (this ._sizeUnits [0] === "PIXEL")
               this .sizeUnitX = PIXEL;

            else
               this .sizeUnitX = WORLD;

            // Y

            if (this ._sizeUnits .length > 1)
            {
               if (this ._sizeUnits [1] === "FRACTION")
                  this .sizeUnitY = FRACTION;

               else if (this ._sizeUnits [1] === "PIXEL")
                  this .sizeUnitY = PIXEL;

               else
                  this .sizeUnitY = WORLD;
            }
            else
               this .sizeUnitY = this .sizeUnitX;
         }
         else
         {
            this .sizeUnitX = WORLD;
            this .sizeUnitY = WORLD;
         }
      },
      set_size__: function ()
      {
         if (this ._size .length > 0)
         {
            // X

            this .sizeX = this ._size [0];

            // Y

            if (this ._size .length > 1)
               this .sizeY = this ._size [1];

            else
               this .sizeY = this .sizeX;
         }
         else
         {
            this .sizeX = 0;
            this .sizeY = 0;
         }
      },
      set_scaleMode__: function ()
      {
         if (this ._scaleMode .length > 0)
         {
            // X

            if (this ._scaleMode [0] === "FRACTION")
               this .scaleModeX = FRACTION;

            else if (this ._scaleMode [0] === "PIXEL")
               this .scaleModeX = PIXEL;

            else if (this ._scaleMode [0] === "STRETCH")
               this .scaleModeX = STRETCH;

            else
               this .scaleModeX = NONE;

            // Y

            if (this ._scaleMode .length > 1)
            {
               if (this ._scaleMode [1] === "FRACTION")
                  this .scaleModeY = FRACTION;

               else if (this ._scaleMode [1] === "PIXEL")
                  this .scaleModeY = PIXEL;

               else if (this ._scaleMode [1] === "STRETCH")
                  this .scaleModeY = STRETCH;

               else
                  this .scaleModeY = NONE;
            }
            else
               this .scaleModeY = this .scaleModeX;
         }
         else
         {
            this .scaleModeX = NONE;
            this .scaleModeY = NONE;
         }
      },
      getRectangleCenter: function ()
      {
         return this .rectangleCenter;
      },
      getRectangleSize: function ()
      {
         return this .rectangleSize;
      },
      getAlignX: function ()
      {
         return this .alignX;
      },
      getAlignY: function ()
      {
         return this .alignY;
      },
      getOffsetUnitX: function ()
      {
         if (this .offsetUnitX === WORLD)
         {
            if (this .parent)
               return this .parent .getOffsetUnitX ();

            return FRACTION;
         }

         return this .offsetUnitX;
      },
      getOffsetUnitY: function ()
      {
         if (this .offsetUnitY === WORLD)
         {
            if (this .parent)
               return this .parent .getOffsetUnitY ();

            return FRACTION;
         }

         return this .offsetUnitY;
      },
      getOffsetX: function ()
      {
         return this .offsetX;
      },
      getOffsetY: function ()
      {
         return this .offsetY;
      },
      getSizeUnitX: function ()
      {
         if (this .sizeUnitX === WORLD)
         {
            if (this .parent)
               return this .parent .getSizeUnitX ();

            return FRACTION;
         }

         return this .sizeUnitX;
      },
      getSizeUnitY: function ()
      {
         if (this .sizeUnitY === WORLD)
         {
            if (this .parent)
               return this .parent .getSizeUnitY ();

            return FRACTION;
         }

         return this .sizeUnitY;
      },
      getSizeX: function ()
      {
         return this .sizeX;
      },
      getSizeY: function ()
      {
         return this .sizeY;
      },
      getScaleModeX: function ()
      {
         if (this .parent)
            return this .scaleModeX;

         if (this .scaleModeX === NONE)
            return FRACTION;

         return this .scaleModeX;
      },
      getScaleModeY: function ()
      {
         if (this .parent)
            return this .scaleModeY;

         if (this .scaleModeY === NONE)
            return FRACTION;

         return this .scaleModeY;
      },
      transform: function (type, renderObject)
      {
         var parent = this .parent = renderObject .getParentLayout ();

         // Calculate rectangleSize

         var
            matrix              = this .matrix,
            viewpoint           = renderObject .getViewpoint (),
            nearValue           = renderObject .getNavigationInfo () .getNearValue (),       // in meters
            viewport            = renderObject .getViewVolume () .getScissor (),             // in pixels
            viewportMeter       = viewpoint .getViewportSize (viewport, nearValue),          // in meters
            viewportPixel       = this .viewportPixel,                                       // in pixels
            pixelSize           = this .pixelSize,                                           // size of one pixel in meters
            parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter,      // in meters
            rectangleSize       = this .rectangleSize,
            rectangleCenter     = this .rectangleCenter;

         viewportPixel .set (viewport [2], viewport [3]);                                 // in pixel
         pixelSize     .assign (viewportMeter) .divVec (viewportPixel);                   // size of one pixel in meter

         switch (this .getSizeUnitX ())
         {
            case FRACTION:
               rectangleSize .x = this .sizeX * parentRectangleSize .x;
               break;
            case PIXEL:
               rectangleSize .x = this .sizeX * pixelSize .x;
               break;
            default:
               break;
         }

         switch (this .getSizeUnitY ())
         {
            case FRACTION:
               rectangleSize .y = this .sizeY * parentRectangleSize .y;
               break;
            case PIXEL:
               rectangleSize .y = this .sizeY * pixelSize .y;
               break;
            default:
               break;
         }

         // Calculate translation

         var translation = this .translation .set (0, 0, 0);

         switch (this .getAlignX ())
         {
            case LEFT:
               translation .x = -(parentRectangleSize .x - rectangleSize .x) / 2;
               break;
            case CENTER:

               if (this .getSizeUnitX () === PIXEL && viewportPixel .x & 1)
                  translation .x = -pixelSize .x / 2;

               break;
            case RIGHT:
               translation .x = (parentRectangleSize .x - rectangleSize .x) / 2;
               break;
         }

         switch (this .getAlignY ())
         {
            case BOTTOM:
               translation .y = -(parentRectangleSize .y - rectangleSize .y) / 2;
               break;
            case CENTER:

               if (this .getSizeUnitX === PIXEL && viewportPixel .y & 1)
                  translation .y = -pixelSize .y / 2;

               break;
            case TOP:
               translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
               break;
         }

         // Calculate offset

         var offset = this .offset .set (0, 0, 0);

         switch (this .getOffsetUnitX ())
         {
            case FRACTION:
               offset .x = this .offsetX * parentRectangleSize .x;
               break;
            case PIXEL:
               offset .x = this .offsetX * viewportMeter .x / viewportPixel .x;
               break;
         }

         switch (this .getOffsetUnitY ())
         {
            case FRACTION:
               offset .y = this .offsetY * parentRectangleSize .y;
               break;
            case PIXEL:
               offset .y = this .offsetY * viewportMeter .y / viewportPixel .y;
               break;
         }

         // Calculate scale

         var
            scale              = this .scale .set (1, 1, 1),
            currentTranslation = this .currentTranslation,
            currentRotation    = this .currentRotation,
            currentScale       = this .currentScale;

         var modelViewMatrix = renderObject .getModelViewMatrix () .get ();
         modelViewMatrix .get (currentTranslation, currentRotation, currentScale);

         switch (this .getScaleModeX ())
         {
            case NONE:
               scale .x = currentScale .x;
               break;
            case FRACTION:
               scale .x = rectangleSize .x;
               break;
            case STRETCH:
               break;
            case PIXEL:
               scale .x = viewportMeter .x / viewportPixel .x;
               break;
         }

         switch (this .getScaleModeY ())
         {
            case NONE:
               scale .y = currentScale .y;
               break;
            case FRACTION:
               scale .y = rectangleSize .y;
               break;
            case STRETCH:
               break;
            case PIXEL:
               scale .y = viewportMeter .y / viewportPixel .y;
               break;
         }

         // Calculate scale for scaleMode STRETCH

         if (this .getScaleModeX () === STRETCH)
         {
            if (this .getScaleModeY () === STRETCH)
            {
               if (rectangleSize .x > rectangleSize .y)
               {
                  scale .x = rectangleSize .x;
                  scale .y = scale .x;
               }
               else
               {
                  scale .y = rectangleSize .y;
                  scale .x = scale .y;
               }
            }
            else
               scale .x = scale .y;
         }
         else if (this .getScaleModeY () === STRETCH)
            scale .y = scale .x;

         // Transform

         rectangleCenter .assign (translation) .add (offset);

         matrix .set (currentTranslation, currentRotation);
         matrix .translate (translation .add (offset));
         matrix .scale (scale);

         return matrix;
      },
   });

   return Layout;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/LayoutGroup',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Base/X3DCast",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DCast,
          TraverseType,
          X3DConstants,
          Matrix4)
{
"use strict";

   function LayoutGroup (executionContext)
   {
      X3DGroupingNode .call (this, executionContext);

      this .addType (X3DConstants .LayoutGroup);

      this .viewportNode    = null;
      this .layoutNode      = null;
      this .modelViewMatrix = new Matrix4 ();
      this .screenMatrix    = new Matrix4 ();
   }

   LayoutGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
   {
      constructor: LayoutGroup,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "layout",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewport",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "LayoutGroup";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DGroupingNode .prototype .initialize .call (this);

         this ._viewport .addInterest ("set_viewport__", this);
         this ._layout   .addInterest ("set_layout__", this);

         this .set_viewport__ ();
         this .set_layout__ ();
      },
      set_viewport__: function ()
      {
         this .viewportNode = X3DCast (X3DConstants .X3DViewportNode, this ._viewport);
      },
      set_layout__: function ()
      {
         this .layoutNode = X3DCast (X3DConstants .X3DLayoutNode, this ._layout);
      },
      getBBox: function (bbox, shadow)
      {
         return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadow) .multRight (this .getMatrix ());
      },
      getMatrix: function ()
      {
         if (this .layoutNode)
            this .matrix .assign (this .modelViewMatrix) .inverse () .multLeft (this .screenMatrix);
         else
            this .matrix .identity ();

         return this .matrix;
      },
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .COLLISION:
            {
               return;
            }
            default:
            {
               if (this .viewportNode)
                  this .viewportNode .push ();

               if (this .layoutNode)
               {
                  var modelViewMatrix = renderObject .getModelViewMatrix ();

                  this .modelViewMatrix .assign (modelViewMatrix .get ());
                  this .screenMatrix .assign (this .layoutNode .transform (type, renderObject));

                  modelViewMatrix .pushMatrix (this .screenMatrix);
                  renderObject .getLayouts () .push (this .layoutNode);

                  X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

                  renderObject .getLayouts () .pop ();
                  modelViewMatrix .pop ();
               }
               else
               {
                  X3DGroupingNode .prototype .traverse .call (this, type, renderObject);
               }

               if (this .viewportNode)
                  this .viewportNode .pop ();

               return;
            }
         }
      },
   });

   return LayoutGroup;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/LayoutLayer',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Layering/X3DLayerNode",
   "x_ite/Components/Layout/LayoutGroup",
   "x_ite/Components/Navigation/OrthoViewpoint",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DLayerNode,
          LayoutGroup,
          OrthoViewpoint,
          X3DConstants)
{
"use strict";

   function LayoutLayer (executionContext)
   {
      X3DLayerNode .call (this,
                          executionContext,
                          new OrthoViewpoint (executionContext),
                          new LayoutGroup (executionContext));

      this .addType (X3DConstants .LayoutLayer);
   }

   LayoutLayer .prototype = Object .assign (Object .create (X3DLayerNode .prototype),
   {
      constructor: LayoutLayer,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "isPickable",     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "layout",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewport",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "LayoutLayer";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "layers";
      },
      initialize: function ()
      {
         X3DLayerNode .prototype .initialize .call (this);

         this ._layout         .addFieldInterest (this .getGroup () ._layout);
         this ._addChildren    .addFieldInterest (this .getGroup () ._addChildren);
         this ._removeChildren .addFieldInterest (this .getGroup () ._removeChildren);
         this ._children       .addFieldInterest (this .getGroup () ._children);

         this .getGroup () ._layout   = this ._layout;
         this .getGroup () ._children = this ._children;

         this .getGroup () .setPrivate (true);
         this .getGroup () .setup ();
      },
   });

   return LayoutLayer;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Browser/Layout/ScreenText',[
   "jquery",
   "x_ite/Browser/Text/X3DTextGeometry",
   "x_ite/Browser/Text/TextAlignment",
   "x_ite/Components/Texturing/PixelTexture",
   "x_ite/Components/Rendering/X3DGeometryNode",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Geometry/Box3",
   "standard/Math/Algorithm",
],
function ($,
          X3DTextGeometry,
          TextAlignment,
          PixelTexture,
          X3DGeometryNode,
          Vector3,
          Matrix4,
          Box3,
          Algorithm)
{
"use strict";

   function ScreenText (text, fontStyle)
   {
      X3DTextGeometry .call (this, text, fontStyle);

      text .setTransparent (true);

      this .texCoordArray = X3DGeometryNode .createArray ();
      this .textureNode   = new PixelTexture (text .getExecutionContext ());
      this .canvas        = $("<canvas></canvas>");
      this .context       = this .canvas [0] .getContext ("2d", { willReadFrequently: true });
      this .matrix        = new Matrix4 ();

      this .textureNode ._textureProperties = fontStyle .getBrowser () .getScreenTextureProperties ();
      this .textureNode .setup ();
   }

   ScreenText .prototype = Object .assign (Object .create (X3DTextGeometry .prototype),
   {
      constructor: ScreenText,
      modelViewMatrix: new Matrix4 (),
      getTransparent: function ()
      {
         return true;
      },
      getMatrix: function ()
      {
         return this .matrix;
      },
      update: (function ()
      {
         const
            min = new Vector3 (0, 0, 0),
            max = new Vector3 (1, 1, 0);

         return function ()
         {
            X3DTextGeometry .prototype .update .call (this);

            const
               fontStyle = this .getFontStyle (),
               text      = this .getText (),
               offset    = 1; // For antialiasing border on bottom and right side

            text ._textBounds .x = Math .ceil (text ._textBounds .x) + offset;
            text ._textBounds .y = Math .ceil (text ._textBounds .y) + offset;

            this .getBBox () .getExtents (min, max);

            min .x -= offset;
            min .y -= offset;

            switch (fontStyle .getMajorAlignment ())
            {
               case TextAlignment .BEGIN:
               case TextAlignment .FIRST:
                  min .x = Math .floor (min .x);
                  max .x = min .x + text ._textBounds .x;
                  break;
               case TextAlignment .MIDDLE:
                  min .x = Math .round (min .x);
                  max .x = min .x + text ._textBounds .x;
                  break;
               case TextAlignment .END:
                  max .x = Math .ceil (max .x);
                  min .x = max .x - text ._textBounds .x;
                  break;
            }

            switch (fontStyle .getMinorAlignment ())
            {
               case TextAlignment .BEGIN:
               case TextAlignment .FIRST:
                  max .y = Math .ceil (max .y);
                  min .y = max .y - text ._textBounds .y;
                  break;
               case TextAlignment .MIDDLE:
                  max .y = Math .round (max .y);
                  min .y = max .y - text ._textBounds .y;
                  break;
               case TextAlignment .END:
                  min .y = Math .floor (min .y);
                  max .y = min .y + text ._textBounds .y;
                  break;
            }

            text ._origin .x = min .x;
            text ._origin .y = max .y;

            this .getBBox () .setExtents (min, max);
         };
      })(),
      build: (function ()
      {
         const
            min = new Vector3 (0, 0, 0),
            max = new Vector3 (1, 1, 0);

         return function ()
         {
            const
               fontStyle = this .getFontStyle (),
               font      = fontStyle .getFont ();

            if (! font)
               return;

            const
               text           = this .getText (),
               glyphs         = this .getGlyphs (),
               minorAlignment = this .getMinorAlignment (),
               translations   = this .getTranslations (),
               charSpacings   = this .getCharSpacings (),
               size           = fontStyle .getScale (), // in pixel
               sizeUnitsPerEm = size / font .unitsPerEm,
               texCoordArray  = this .texCoordArray,
               normalArray    = text .getNormals (),
               vertexArray    = text .getVertices (),
               canvas         = this .canvas [0],
               cx             = this .context;

            // Set texCoord.

            texCoordArray .length = 0;

            text .getMultiTexCoords () .push (texCoordArray);

            // Triangle one and two.

            this .getBBox () .getExtents (min, max);

            normalArray  .push (0, 0, 1,
                                0, 0, 1,
                                0, 0, 1,
                                0, 0, 1,
                                0, 0, 1,
                                0, 0, 1);

            vertexArray .push (min .x, min .y, 0, 1,
                               max .x, min .y, 0, 1,
                               max .x, max .y, 0, 1,
                               min .x, min .y, 0, 1,
                               max .x, max .y, 0, 1,
                               min .x, max .y, 0, 1);

            // Generate texture.

            const
               width  = text ._textBounds .x,
               height = text ._textBounds .y;

            // Scale canvas.

            canvas .width  = Algorithm .nextPowerOfTwo (width),
            canvas .height = Algorithm .nextPowerOfTwo (height);

            const
               w = width  / canvas .width,
               h = height / canvas .height,
               y = 1 - h;

            texCoordArray .push (0, y, 0, 1,
                                 w, y, 0, 1,
                                 w, 1, 0, 1,
                                 0, y, 0, 1,
                                 w, 1, 0, 1,
                                 0, 1, 0, 1);

            // Setup canvas.

            cx .fillStyle = "rgba(255,255,255,0)";
            cx .fillRect (0, 0, canvas .width, canvas .height);
            cx .fillStyle = "rgba(255,255,255,1)";

            cx .save ();
            cx .translate (0, canvas .height);
            cx .scale (1, -1);

            // Draw glyphs.

            if (fontStyle ._horizontal .getValue ())
            {
               for (let l = 0, length = glyphs .length; l < length; ++ l)
               {
                  const
                     line        = glyphs [l],
                     charSpacing = charSpacings [l],
                     translation = translations [l];

                  let advanceWidth = 0;

                  for (let g = 0, gl = line .length; g < gl; ++ g)
                  {
                     const
                        glyph = line [g],
                        x     = minorAlignment .x + translation .x + advanceWidth + g * charSpacing - min .x,
                        y     = minorAlignment .y + translation .y - max .y;

                     this .drawGlyph (cx, font, glyph, x, y, size);

                     // Calculate advanceWidth.

                     let kerning = 0;

                     if (g + 1 < line .length)
                        kerning = font .getKerningValue (glyph, line [g + 1]);

                     advanceWidth += (glyph .advanceWidth + kerning) * sizeUnitsPerEm;
                  }
               }
            }
            else
            {
               const
                  leftToRight = fontStyle ._leftToRight .getValue (),
                  topToBottom = fontStyle ._topToBottom .getValue (),
                  first       = leftToRight ? 0 : text ._string .length - 1,
                  last        = leftToRight ? text ._string .length  : -1,
                  step        = leftToRight ? 1 : -1;

               for (let l = first, t = 0; l !== last; l += step)
               {
                  const line = glyphs [l];

                  const
                     numChars = line .length,
                     firstG   = topToBottom ? 0 : numChars - 1,
                     lastG    = topToBottom ? numChars : -1,
                     stepG    = topToBottom ? 1 : -1;

                  for (let g = firstG; g !== lastG; g += stepG, ++ t)
                  {
                     const translation = translations [t];

                     const
                        x = minorAlignment .x + translation .x - min .x,
                        y = minorAlignment .y + translation .y - max .y;

                     this .drawGlyph (cx, font, line [g], x, y, size);
                  }
               }
            }

            cx .restore ();

            // Transfer texture data.

            const imageData = cx .getImageData (0, 0, canvas .width, canvas .height);

            // If the canvas is to large imageData is null.

            if (imageData)
               this .textureNode .setTexture (canvas .width, canvas .height, true, new Uint8Array (imageData .data .buffer), false);
            else
               this .textureNode .clear ();
         };
      })(),
      drawGlyph: function (cx, font, glyph, x, y, size)
      {
         //console .log (glyph .name, x, y);

         // Get curves for the current glyph.

         const
            path     = glyph .getPath (x, -y, size),
            commands = path .commands;

         cx .beginPath ();

         for (let i = 0, cl = commands .length; i < cl; ++ i)
         {
            const command = commands [i];

            switch (command .type)
            {
               case "M": // Start
               {
                  cx .moveTo (command .x, command .y);
                  continue;
               }
               case "Z": // End
               {
                  cx .closePath ();
                  continue;
               }
               case "L": // Linear
               {
                  cx .lineTo (command .x, command .y);
                  continue;
               }
               case "Q": // Cubic
               {
                  cx .quadraticCurveTo (command .x1, command .y1, command .x, command .y);
                  continue;
               }
               case "C": // Bezier
               {
                  cx .bezierCurveTo (command .x1, command .y1, command .x2, command .y2, command .x, command .y);
                  continue;
               }
            }
         }

         if (path .fill)
            cx .fill ();

         if (path .stroke)
         {
            cx .lineWidth = path .strokeWidth;
            cx .stroke ();
         }
      },
      getGlyphExtents: function (font, glyph, primitiveQuality, min, max)
      {
         const unitsPerEm = font .unitsPerEm;

         min .set ((glyph .xMin || 0) / unitsPerEm, (glyph .yMin || 0) / unitsPerEm, 0);
         max .set ((glyph .xMax || 0) / unitsPerEm, (glyph .yMax || 0) / unitsPerEm, 0);
      },
      traverse: (function ()
      {
         const bbox = new Box3 ();

         return function (type, renderObject)
         {
            this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix);

            // Update Text bbox.

            bbox .assign (this .getBBox ()) .multRight (this .matrix);

            this .getText () .setBBox (bbox);
         };
      })(),
      display: function (gl, context)
      {
         Matrix4 .prototype .multLeft .call (context .modelViewMatrix, this .matrix);

         context .textureNode = this .textureNode;
      },
      transformLine: function (line)
      {
         // Apply screen nodes transformation in place here.
         return line .multLineMatrix (Matrix4 .inverse (this .matrix));
      },
      transformMatrix: function (matrix)
      {
         // Apply screen nodes transformation in place here.
         return matrix .multLeft (this .matrix);
      },
   });

   return ScreenText;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/ScreenFontStyle',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Text/X3DFontStyleNode",
   "x_ite/Browser/Layout/ScreenText",
   "x_ite/Base/X3DConstants",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DFontStyleNode,
          ScreenText,
          X3DConstants)
{
"use strict";

   function ScreenFontStyle (executionContext)
   {
      X3DFontStyleNode .call (this, executionContext);

      this .addType (X3DConstants .ScreenFontStyle);
   }

   ScreenFontStyle .prototype = Object .assign (Object .create (X3DFontStyleNode .prototype),
   {
      constructor: ScreenFontStyle,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "language",    new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "family",      new Fields .MFString ("SERIF")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "style",       new Fields .SFString ("PLAIN")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSize",   new Fields .SFFloat (12)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "spacing",     new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "horizontal",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "leftToRight", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "topToBottom", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "justify",     new Fields .MFString ("BEGIN")),
      ]),
      getTypeName: function ()
      {
         return "ScreenFontStyle";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "fontStyle";
      },
      getTextGeometry: function (text)
      {
         return new ScreenText (text, this);
      },
      getScale: function ()
      {
         return this ._pointSize .getValue () * this .getBrowser () .getPixelPerPoint ();
      },
   });

   return ScreenFontStyle;
});

/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ('x_ite/Components/Layout/ScreenGroup',[
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Grouping/X3DGroupingNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Rendering/TraverseType",
   "standard/Math/Numbers/Matrix4",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DGroupingNode,
          X3DConstants,
          TraverseType,
          Matrix4,)
{
"use strict";

   function ScreenGroup (executionContext)
   {
      X3DGroupingNode .call (this, executionContext);

      this .addType (X3DConstants .ScreenGroup);

      this .matrix = new Matrix4 ();
   }

   ScreenGroup .prototype = Object .assign (Object .create (X3DGroupingNode .prototype),
   {
      constructor: ScreenGroup,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      getTypeName: function ()
      {
         return "ScreenGroup";
      },
      getComponentName: function ()
      {
         return "Layout";
      },
      getContainerField: function ()
      {
         return "children";
      },
      getBBox: function (bbox, shadow)
      {
         return this .getSubBBox (bbox, shadow) .multRight (this .matrix);
      },
      getMatrix: function ()
      {
         return this .matrix;
      },
      traverse: function (type, renderObject)
      {
         switch (type)
         {
            case TraverseType .CAMERA:
            case TraverseType .PICKING:
            case TraverseType .SHADOW: // ???
               // No clone support for shadow, generated cube map texture and bbox
               break;
            default:
               this .getBrowser () .getScreenScaleMatrix (renderObject, this .matrix);
               break;
         }

         const modelViewMatrix = renderObject .getModelViewMatrix ();

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (this .matrix);

         X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

         modelViewMatrix .pop ();
      },
   });

   return ScreenGroup;
});

/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define (require .getComponentUrl ("layout"), [
   "x_ite/Components",
   "x_ite/Browser/Layout/X3DLayoutContext",
   "x_ite/Components/Layout/Layout",
   "x_ite/Components/Layout/LayoutGroup",
   "x_ite/Components/Layout/LayoutLayer",
   "x_ite/Components/Layout/ScreenFontStyle",
   "x_ite/Components/Layout/ScreenGroup",
   "x_ite/Components/Layout/X3DLayoutNode",
],
function (Components,
          X3DLayoutContext,
          Layout,
          LayoutGroup,
          LayoutLayer,
          ScreenFontStyle,
          ScreenGroup,
          X3DLayoutNode)
{
"use strict";

   Components .addComponent ({
      name: "Layout",
      types:
      {
         Layout:          Layout,
         LayoutGroup:     LayoutGroup,
         LayoutLayer:     LayoutLayer,
         ScreenFontStyle: ScreenFontStyle,
         ScreenGroup:     ScreenGroup,
      },
      abstractTypes:
      {
         X3DLayoutNode: X3DLayoutNode,
      },
      context: X3DLayoutContext,
   });
});


})();
