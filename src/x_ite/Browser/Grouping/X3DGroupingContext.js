import Shape          from "../../Components/Shape/Shape.js";
import IndexedLineSet from "../../Components/Rendering/IndexedLineSet.js";
import Coordinate     from "../../Components/Rendering/Coordinate.js";

const _bboxShape = Symbol ();

function X3DGroupingContext () { }

Object .assign (X3DGroupingContext .prototype,
{
   getBBoxNode ()
   {
      return this [_bboxShape] ??= (() =>
      {
         const
            bboxShape      = new Shape (this .getPrivateScene ()),
            bboxGeometry   = new IndexedLineSet (this .getPrivateScene ()),
            bboxCoordinate = new Coordinate (this .getPrivateScene ());

         bboxShape ._geometry      = bboxGeometry;
         bboxGeometry ._coordIndex = [0, 1, 2, 3, 0, -1, 4, 5, 6, 7, 4, -1, 0, 4, -1, 1, 5, -1, 2, 6, -1, 3, 7, -1];
         bboxGeometry ._coord      = bboxCoordinate;
         bboxCoordinate ._point    = [0.5, 0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5];

         bboxCoordinate .setup ();
         bboxGeometry   .setup ();
         bboxShape      .setup ();

         return bboxShape;
      })();
   },
});

export default X3DGroupingContext;
