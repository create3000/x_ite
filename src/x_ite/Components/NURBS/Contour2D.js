import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

function Contour2D (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .Contour2D);

   this .childNodes = [ ];
}

Object .assign (Object .setPrototypeOf (Contour2D .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this ._addChildren    .addInterest ("set_addChildren__",    this);
      this ._removeChildren .addInterest ("set_removeChildren__", this);
      this ._children       .addInterest ("set_children__",       this);

      this .set_children__ ();
   },
   set_addChildren__ ()
   {
      this ._addChildren .setTainted (true);
      this ._addChildren .assign (filter (this ._addChildren, this ._children));

      for (const child of this ._addChildren)
         this ._children .push (child);

      this ._addChildren .length = 0;
      this ._addChildren .setTainted (false);
   },
   set_removeChildren__ ()
   {
      this ._removeChildren .setTainted (true);
      this ._children .assign (filter (this ._children, this ._removeChildren));

      this ._removeChildren .length = 0;
      this ._removeChildren .setTainted (false);
   },
   set_children__ ()
   {
      const childNodes = this .childNodes;

      for (const childNode of childNodes)
         childNode .removeInterest ("addNodeEvent", this);

      childNodes .length = 0;

      for (const node of this ._children)
      {
         const childNode = X3DCast (X3DConstants .NurbsCurve2D, node)
            ?? X3DCast (X3DConstants .ContourPolyline2D, node);

         if (childNode)
            childNodes .push (childNode);
      }

      for (const childNode of childNodes)
         childNode .addInterest ("addNodeEvent", this);
   },
   addTrimmingContour (offset, scale, trimmingContours)
   {
      const trimmingContour = [ ];

      for (const childNode of this .childNodes)
         childNode .tessellate (2, trimmingContour);

      if (!trimmingContour .length)
         return;

      for (const point of trimmingContour)
         point .subtract (offset) .divVec (scale);

      trimmingContours .push (trimmingContour);
   }
});

function filter (array, remove)
{
   const set = new Set (remove);

   return array .filter (value => !set .has (value));
}

Object .defineProperties (Contour2D,
{
   ... X3DNode .getStaticProperties ("Contour2D", "NURBS", 4, "trimmingContour", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Contour2D;
