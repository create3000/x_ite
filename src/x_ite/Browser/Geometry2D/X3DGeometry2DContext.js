import Arc2DOptions       from "./Arc2DOptions.js";
import ArcClose2DOptions  from "./ArcClose2DOptions.js";
import Circle2DOptions    from "./Circle2DOptions.js";
import Disk2DOptions      from "./Disk2DOptions.js";
import Rectangle2DOptions from "./Rectangle2DOptions.js";
import PrimitiveQuality   from "../Core/PrimitiveQuality.js";

const
   _arc2DOptions       = Symbol (),
   _arcClose2DOptions  = Symbol (),
   _circle2DOptions    = Symbol (),
   _disk2DOptions      = Symbol (),
   _rectangle2DOptions = Symbol ();

function X3DGeometry2DContext () { }

Object .assign (X3DGeometry2DContext .prototype,
{
   initialize ()
   {
      this .setPrimitiveQuality2D (this .getBrowserOptions () .getPrimitiveQuality ());
   },
   getArc2DOptions ()
   {
      return getOptionNode .call (this, _arc2DOptions, Arc2DOptions);
   },
   getArcClose2DOptions ()
   {
      return getOptionNode .call (this, _arcClose2DOptions, ArcClose2DOptions);
   },
   getCircle2DOptions ()
   {
      return getOptionNode .call (this, _circle2DOptions, Circle2DOptions);
   },
   getDisk2DOptions ()
   {
      return getOptionNode .call (this, _disk2DOptions, Disk2DOptions);
   },
   getRectangle2DOptions ()
   {
      return getOptionNode .call (this, _rectangle2DOptions, Rectangle2DOptions);
   },
   setPrimitiveQuality2D (primitiveQuality)
   {
      const
         arc      = this .getArc2DOptions (),
         arcClose = this .getArcClose2DOptions (),
         circle   = this .getCircle2DOptions (),
         disk     = this .getDisk2DOptions ();

      switch (primitiveQuality)
      {
         case PrimitiveQuality .LOW:
         {
            arc      ._dimension = 20;
            arcClose ._dimension = 20;
            circle   ._dimension = 20;
            disk     ._dimension = 20;
            break;
         }
         case PrimitiveQuality .MEDIUM:
         {
            arc      ._dimension = 40;
            arcClose ._dimension = 40;
            circle   ._dimension = 40;
            disk     ._dimension = 40;
            break;
         }
         case PrimitiveQuality .HIGH:
         {
            arc      ._dimension = 80;
            arcClose ._dimension = 80;
            circle   ._dimension = 80;
            disk     ._dimension = 80;
            break;
         }
      }
   },
});

function getOptionNode (key, OptionNode)
{
   return this [key] ??= (() =>
   {
      const optionNode = new OptionNode (this .getPrivateScene ());

      optionNode .setup ();

      return optionNode;
   })();
}

export default X3DGeometry2DContext;
