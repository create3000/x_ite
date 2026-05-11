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

   this .rectangleCenter = new Vector2 (); // Useful for tools.
   this .rectangleSize   = new Vector2 (); // Useful for tools.
}

Object .assign (Object .setPrototypeOf (Layout .prototype, X3DLayoutNode .prototype),
{
   initialize ()
   {
      X3DLayoutNode .prototype .initialize .call (this);

      this ._align       .addInterest ("set_align__",       this);
      this ._offsetUnits .addInterest ("set_offsetUnits__", this);
      this ._offset      .addInterest ("set_offset__",      this);
      this ._sizeUnits   .addInterest ("set_sizeUnits__",   this);
      this ._size        .addInterest ("set_size__",        this);
      this ._scaleMode   .addInterest ("set_scaleMode__",   this);

      this .set_align__ ();
      this .set_offsetUnits__ ();
      this .set_offset__ ();
      this .set_sizeUnits__ ();
      this .set_size__ ();
      this .set_scaleMode__ ();
   },
   set_align__ ()
   {
      // If the align field has only one value, that value shall be "CENTER".

      // X

      if (this ._align [0] === "LEFT")
         this .alignX = LEFT;

      else if (this ._align [0] === "RIGHT")
         this .alignX = RIGHT;

      else
         this .alignX = CENTER;

      // Y

      if (this ._align [1] === "BOTTOM")
         this .alignY = BOTTOM;

      else if (this ._align [1] === "TOP")
         this .alignY = TOP;

      else
         this .alignY = CENTER;
   },
   set_offsetUnits__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .offsetUnitY = this .offsetUnitX;
      }
   },
   set_offset__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

      // X and Y

      this .offsetX = this ._offset [0] ?? 0;
      this .offsetY = this ._offset [1] ?? this .offsetX;
   },
   set_sizeUnits__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .sizeUnitY = this .sizeUnitX;
      }
   },
   set_size__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

      // X and Y

      this .sizeX = this ._size [0] ?? 0;
      this .sizeY = this ._size [1] ?? this .sizeX;
   },
   set_scaleMode__ ()
   {
      // If a field has a length of one, that value applies to both the horizontal and vertical directions.

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
      {
         this .scaleModeY = this .scaleModeX;
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
   getOffsetUnitX (parents, index)
   {
      if (this .offsetUnitX === WORLD)
         return parents [index] ?.getOffsetUnitX (parents, index - 1) ?? FRACTION;

      return this .offsetUnitX;
   },
   getOffsetUnitY (parents, index)
   {
      if (this .offsetUnitY === WORLD)
         return parents [index] ?.getOffsetUnitY (parents, index - 1) ?? FRACTION;

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
   getSizeUnitX (parents, index)
   {
      if (this .sizeUnitX === WORLD)
         return parents [index] ?.getSizeUnitX (parents, index - 1) ?? FRACTION;

      return this .sizeUnitX;
   },
   getSizeUnitY (parents, index)
   {
      if (this .sizeUnitY === WORLD)
         return parents [index] ?.getSizeUnitY (parents, index - 1) ?? FRACTION;

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
   getScaleModeX (parent)
   {
      if (parent)
         return this .scaleModeX;

      if (this .scaleModeX === NONE)
         return FRACTION;

      return this .scaleModeX;
   },
   getScaleModeY (parent)
   {
      if (parent)
         return this .scaleModeY;

      if (this .scaleModeY === NONE)
         return FRACTION;

      return this .scaleModeY;
   },
   transform: (() =>
   {
      const
         viewportPixel      = new Vector2 (), // in pixels
         pixelSize          = new Vector2 (), // size of one pixel in meters
         translation        = new Vector3 (),
         offset             = new Vector3 (),
         scale              = new Vector3 (),
         currentTranslation = new Vector3 (),
         currentRotation    = new Rotation4 (),
         currentScale       = new Vector3 (),
         matrix             = new Matrix4 ();

      return function (type, renderObject)
      {
         const
            parents = renderObject .getLayouts (),
            index   = parents .length - 1;

         // Calculate rectangleSize

         const
            browser             = this .getBrowser (),
            contentScale        = browser .getRenderingProperty ("ContentScale"),
            navigationInfoNode  = renderObject .getNavigationInfo (),
            viewpointNode       = renderObject .getViewpoint (),
            nearValue           = viewpointNode .getNearDistance (navigationInfoNode),    // in meters
            viewport            = renderObject .getViewVolume () .getViewport (),         // in pixels
            viewportMeter       = viewpointNode .getViewportSize (viewport, nearValue),   // in meters
            parentRectangleSize = parents [index] ?.getRectangleSize () ?? viewportMeter, // in meters
            rectangleSize       = this .rectangleSize,
            rectangleCenter     = this .rectangleCenter;

         viewportPixel .set (viewport [2], viewport [3]) .divide (contentScale); // in pixel
         pixelSize     .assign (viewportMeter) .divVec (viewportPixel);          // size of one pixel in meter

         // Determine rectangle size.

         const
            sizeUnitX = this .getSizeUnitX (parents, index),
            sizeUnitY = this .getSizeUnitY (parents, index);

         switch (sizeUnitX)
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

         switch (sizeUnitY)
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

         // Determine translation.

         translation .set (0);

         switch (this .getAlignX ())
         {
            case LEFT:
               translation .x = -(parentRectangleSize .x - rectangleSize .x) / 2;
               break;
            case CENTER:

               if (sizeUnitX === PIXEL && viewportPixel .x & 1)
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

               if (sizeUnitX === PIXEL && viewportPixel .y & 1)
                  translation .y = -pixelSize .y / 2;

               break;
            case TOP:
               translation .y = (parentRectangleSize .y - rectangleSize .y) / 2;
               break;
         }

         // Determine offset.

         offset .set (0);

         switch (this .getOffsetUnitX (parents, index))
         {
            case FRACTION:
               offset .x = this .offsetX * parentRectangleSize .x;
               break;
            case PIXEL:
               offset .x = this .offsetX * viewportMeter .x / viewportPixel .x;
               break;
         }

         switch (this .getOffsetUnitY (parents, index))
         {
            case FRACTION:
               offset .y = this .offsetY * parentRectangleSize .y;
               break;
            case PIXEL:
               offset .y = this .offsetY * viewportMeter .y / viewportPixel .y;
               break;
         }

         // Determine scale.

         const
            scaleModeX = this .getScaleModeX (parents [index]),
            scaleModeY = this .getScaleModeY (parents [index]);

         scale .set (1)

         const modelViewMatrix = renderObject .getModelViewMatrix () .get ();

         modelViewMatrix .get (currentTranslation, currentRotation, currentScale);

         switch (scaleModeX)
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

         switch (scaleModeY)
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

         // Determine scale for scaleMode STRETCH.

         if (scaleModeX === STRETCH)
         {
            if (scaleModeY === STRETCH)
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
            {
               scale .x = scale .y;
            }
         }
         else if (scaleModeY === STRETCH)
         {
            scale .y = scale .x;
         }

         // Determine matrix.

         rectangleCenter .assign (translation .add (offset));

         matrix
            .set (currentTranslation, currentRotation)
            .translate (translation)
            .scale (scale);

         return matrix;
      };
   })(),
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
