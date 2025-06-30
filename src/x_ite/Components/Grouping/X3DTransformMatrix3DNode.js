import X3DNode         from "../Core/X3DNode.js";
import X3DGroupingNode from "./X3DGroupingNode.js";
import X3DConstants    from "../../Base/X3DConstants.js";
import Vector3         from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4       from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4         from "../../../standard/Math/Numbers/Matrix4.js";

function X3DTransformMatrix3DNode (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .X3DTransformMatrix3DNode);

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (X3DTransformMatrix3DNode .prototype, X3DGroupingNode .prototype),
{
   getBBox (bbox, shadows)
   {
      if (this .isDefaultBBoxSize ())
         return this .getSubBBox (bbox, shadows) .multRight (this .matrix);

      return bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
   },
   getMatrix ()
   {
      return this .matrix;
   },
   setMatrix (matrix)
   {
      if (matrix .equals (Matrix4 .Identity))
      {
         this .matrix .identity ();

         if (this .isDefaultBBoxSize ())
            this .getBBox = this .getSubBBox;
         else
            delete this .getBBox;

         this .traverse = this .groupTraverse;
      }
      else
      {
         this .matrix .assign (matrix);

         delete this .getBBox;
         delete this .traverse;
      }
   },
   setTransform (t, r, s, so, c)
   {
      if (t .equals (Vector3 .Zero) && r .equals (Rotation4 .Identity) && s .equals (Vector3 .One))
      {
         this .matrix .identity ();

         if (this .isDefaultBBoxSize ())
            this .getBBox = this .getSubBBox;
         else
            delete this .getBBox;

         this .traverse = this .groupTraverse;
      }
      else
      {
         this .matrix .set (t, r, s, so, c);

         delete this .getBBox;
         delete this .traverse;
      }
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse: X3DGroupingNode .prototype .traverse,
});

Object .defineProperties (X3DTransformMatrix3DNode, X3DNode .getStaticProperties ("X3DTransformMatrix3DNode", "Grouping", 1));

export default X3DTransformMatrix3DNode;
