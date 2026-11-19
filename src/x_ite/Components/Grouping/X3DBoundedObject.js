import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import X3DBBoxNode  from "../../Browser/Grouping/X3DBBoxNode.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";

function X3DBoundedObject (/* executionContext */)
{
   this .addType (X3DConstants .X3DBoundedObject);

   this .addChildObjects (X3DConstants .outputOnly, "hidden",           new Fields .SFInt32 (),
                          X3DConstants .outputOnly, "transformSensors", new Fields .SFTime ());

   // Units

   this ._bboxSize   .setUnit ("length");
   this ._bboxCenter .setUnit ("length");

   // Private properties

   this .childBBox            = new Box3 (); // Must be unique for each X3DBoundedObject.
   this .transformSensorNodes = new Set ();
}

Object .assign (X3DBoundedObject .prototype,
{
   childBBox: new Box3 (), // X3DExecutionContext needs this.
   initialize ()
   {
      this ._visible    .addInterest ("set_visible__",           this);
      this ._bboxSize   .addInterest ("set_bboxSizeAndCenter__", this);
      this ._bboxCenter .addInterest ("set_bboxSizeAndCenter__", this);

      this .set_visible__ ();
   },
   isVisible ()
   {
      return !this ._hidden .getValue ();
   },
   isHidden ()
   {
      return this ._hidden .getValue () & 0b1;
   },
   setHidden (value)
   {
      this .setNodeFlag (this ._hidden, 0, value);
   },
   isDefaultBBoxSize ()
   {
      return this ._bboxSize .getValue () .equals (Vector3 .NEGATIVE_ONE);
   },
   isBBoxVisible ()
   {
      return this ._bboxDisplay .getValue ();
   },
   getBBox (nodes, bbox, shadows)
   {
      // Must be unique for each X3DBoundedObject.
      const childBBox = this .childBBox;

      // Add bounding boxes.

      bbox .set ();

      for (const node of nodes)
         bbox .add (node .getBBox ?.(childBBox, shadows) ?? childBBox .set ());

      return bbox;
   },
   getBBoxNode ()
   {
      return this .bboxNode ??= (() =>
      {
         const bboxNode = new X3DBBoxNode (this .getExecutionContext (), this);

         bboxNode .setPrivate (true);
         bboxNode .setup ();

         return bboxNode;
      })();
   },
   addTransformSensor (transformSensorNode)
   {
      this .transformSensorNodes .add (transformSensorNode);

      this ._transformSensors = this .getBrowser () .getCurrentTime ();
   },
   removeTransformSensor (transformSensorNode)
   {
      this .transformSensorNodes .delete (transformSensorNode);

      this ._transformSensors = this .getBrowser () .getCurrentTime ();
   },
   getTransformSensors ()
   {
      return this .transformSensorNodes;
   },
   set_visible__ ()
   {
      this .setNodeFlag (this ._hidden, 1, !this ._visible .getValue ());
   },
   set_bboxSizeAndCenter__ ()
   {
      this .getExecutionContext () ._bbox_changed = Date .now () / 1000;
   },
   dispose ()
   { },
});

Object .defineProperties (X3DBoundedObject, X3DNode .getStaticProperties ("X3DBoundedObject", "Grouping", 1));

export default X3DBoundedObject;
