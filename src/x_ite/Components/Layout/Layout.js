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

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DLayoutNode        from "./X3DLayoutNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

let i = 0;

const
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

   // Private properties

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
   this .rectangleCenter = new Vector2 ();
   this .rectangleSize   = new Vector2 ();
   this .matrix          = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Layout .prototype, X3DLayoutNode .prototype),
{
   viewportPixel: new Vector2 (),
   pixelSize: new Vector2 (),
   translation: new Vector3 (),
   offset: new Vector3 (),
   scale: new Vector3 (1, 1, 1),
   currentTranslation: new Vector3 (),
   currentRotation: new Rotation4 (),
   currentScale: new Vector3 (),
   modelViewMatrix: new Matrix4 (),
   initialize ()
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
   set_align__ ()
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
   set_offsetUnits__ ()
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
   set_offset__ ()
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
   set_sizeUnits__ ()
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
   set_size__ ()
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
   set_scaleMode__ ()
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
   getRectangleCenter ()
   {
      return this .rectangleCenter;
   },
   getRectangleSize ()
   {
      return this .rectangleSize;
   },
   getAlignX ()
   {
      return this .alignX;
   },
   getAlignY ()
   {
      return this .alignY;
   },
   getOffsetUnitX ()
   {
      if (this .offsetUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitX ();

         return FRACTION;
      }

      return this .offsetUnitX;
   },
   getOffsetUnitY ()
   {
      if (this .offsetUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getOffsetUnitY ();

         return FRACTION;
      }

      return this .offsetUnitY;
   },
   getOffsetX ()
   {
      return this .offsetX;
   },
   getOffsetY ()
   {
      return this .offsetY;
   },
   getSizeUnitX ()
   {
      if (this .sizeUnitX === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitX ();

         return FRACTION;
      }

      return this .sizeUnitX;
   },
   getSizeUnitY ()
   {
      if (this .sizeUnitY === WORLD)
      {
         if (this .parent)
            return this .parent .getSizeUnitY ();

         return FRACTION;
      }

      return this .sizeUnitY;
   },
   getSizeX ()
   {
      return this .sizeX;
   },
   getSizeY ()
   {
      return this .sizeY;
   },
   getScaleModeX ()
   {
      if (this .parent)
         return this .scaleModeX;

      if (this .scaleModeX === NONE)
         return FRACTION;

      return this .scaleModeX;
   },
   getScaleModeY ()
   {
      if (this .parent)
         return this .scaleModeY;

      if (this .scaleModeY === NONE)
         return FRACTION;

      return this .scaleModeY;
   },
   transform (type, renderObject)
   {
      const parent = this .parent = renderObject .getParentLayout ();

      // Calculate rectangleSize

      const
         browser             = this .getBrowser (),
         contentScale        = browser .getRenderingProperty ("ContentScale"),
         matrix              = this .matrix,
         viewpoint           = renderObject .getViewpoint (),
         nearValue           = renderObject .getNavigationInfo () .getNearValue (viewpoint), // in meters
         viewport            = renderObject .getViewVolume () .getScissor (),                // in pixels
         viewportMeter       = viewpoint .getViewportSize (viewport, nearValue),             // in meters
         viewportPixel       = this .viewportPixel,                                          // in pixels
         pixelSize           = this .pixelSize,                                              // size of one pixel in meters
         parentRectangleSize = parent ? parent .getRectangleSize () : viewportMeter,         // in meters
         rectangleSize       = this .rectangleSize,
         rectangleCenter     = this .rectangleCenter;

      viewportPixel .set (viewport [2], viewport [3]) .divide (contentScale); // in pixel
      pixelSize     .assign (viewportMeter) .divVec (viewportPixel);          // size of one pixel in meter

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

      const translation = this .translation .set (0, 0, 0);

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

            if (this .getSizeUnitX () === PIXEL && viewportPixel .y & 1)
               translation .y = -pixelSize .y / 2;

            break;
         case TOP:
            translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
            break;
      }

      // Calculate offset

      const offset = this .offset .set (0, 0, 0);

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

      const
         scale              = this .scale .set (1, 1, 1),
         currentTranslation = this .currentTranslation,
         currentRotation    = this .currentRotation,
         currentScale       = this .currentScale;

      const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

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

      rectangleCenter .assign (translation .add (offset));

      matrix .set (currentTranslation, currentRotation);
      matrix .translate (translation);
      matrix .scale (scale);

      return matrix;
   },
});

Object .defineProperties (Layout,
{
   ... X3DNode .getStaticProperties ("Layout", "Layout", 1, "layout", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "align",       new Fields .MFString ("CENTER", "CENTER")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offsetUnits", new Fields .MFString ("WORLD", "WORLD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "offset",      new Fields .MFFloat (0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "sizeUnits",   new Fields .MFString ("WORLD", "WORLD")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "size",        new Fields .MFFloat (1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "scaleMode",   new Fields .MFString ("NONE", "NONE")),
      ]),
      enumerable: true,
   },
});

export default Layout;
