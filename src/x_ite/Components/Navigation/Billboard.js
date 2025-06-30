import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Billboard (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .Billboard);

   // Private properties

   this .matrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Billboard .prototype, X3DGroupingNode .prototype),
{
   initialize ()
   {
      X3DGroupingNode .prototype .initialize .call (this);

      this ._bboxSize .addInterest ("set_visibleObjects__", this);
   },
   set_visibleObjects__ ()
   {
      this .setVisibleObject (this .visibleObjects .size || this .bboxObjects .size || this .boundedObjects .size || !this .isDefaultBBoxSize ());
   },
   getBBox (bbox, shadows)
   {
      return X3DGroupingNode .prototype .getBBox .call (this, bbox, shadows) .multRight (this .matrix);
   },
   getMatrix ()
   {
      return this .matrix;
   },
   rotate: (() =>
   {
      const
         inverseModelViewMatrix = new Matrix4 (),
         viewerYAxis            = new Vector3 (),
         y                      = new Vector3 (),
         N1                     = new Vector3 (),
         N2                     = new Vector3 (),
         rotation               = new Rotation4 ();

      return function (modelViewMatrix)
      {
         // throws domain error

         inverseModelViewMatrix .assign (modelViewMatrix) .inverse ();

         const billboardToViewer = inverseModelViewMatrix .origin .normalize (); // Normalized to get work with Geo

         if (this ._axisOfRotation .getValue () .equals (Vector3 .Zero))
         {
            inverseModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis)) .normalize (); // Normalized to get work with Geo

            const x = viewerYAxis .cross (billboardToViewer);
            y .assign (billboardToViewer) .cross (x);
            const z = billboardToViewer;

            // Compose rotation

            x .normalize ();
            y .normalize ();

            this .matrix .set (x .x, x .y, x .z, 0,
                               y .x, y .y, y .z, 0,
                               z .x, z .y, z .z, 0,
                               0,    0,    0,    1);
         }
         else
         {
            N1 .assign (this ._axisOfRotation .getValue ()) .cross (billboardToViewer); // Normal vector of plane as in specification
            N2 .assign (this ._axisOfRotation .getValue ()) .cross (Vector3 .zAxis);    // Normal vector of plane between axisOfRotation and zAxis

            this .matrix .setRotation (rotation .setFromToVec (N2, N1));                // Rotate zAxis in plane
         }

         return this .matrix;
      };
   })(),
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();

      switch (type)
      {
         case TraverseType .CAMERA:
         case TraverseType .PICKING:
         case TraverseType .SHADOW:
            // No clone support for shadows, generated cube map texture, and bbox
            modelViewMatrix .multLeft (this .matrix);
            break;
         default:
            modelViewMatrix .multLeft (this .rotate (modelViewMatrix .get ()));
            break;
      }

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (Billboard,
{
   ... X3DNode .getStaticProperties ("Billboard", "Navigation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "axisOfRotation", new Fields .SFVec3f (0, 1, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",     new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",    new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren", new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",       new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default Billboard;
