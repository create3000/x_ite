import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import TraverseType from "../../Rendering/TraverseType.js";
import Vector3      from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4      from "../../../standard/Math/Numbers/Matrix4.js";
import Box3         from "../../../standard/Math/Geometry/Box3.js";

function X3DBoundedObject (executionContext)
{
   this .addType (X3DConstants .X3DBoundedObject);

   this .addChildObjects (X3DConstants .outputOnly, "hidden",           new Fields .SFBool (),
                          X3DConstants .outputOnly, "display",          new Fields .SFBool (true),
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
      this ._hidden      .addInterest ("set_visible_and_hidden__", this);
      this ._visible     .addInterest ("set_visible_and_hidden__", this);
      this ._bboxDisplay .addInterest ("set_bboxDisplay__",        this);

      this .set_visible_and_hidden__ ();
      this .set_bboxDisplay__ ();
   },
   isVisible ()
   {
      return this ._display .getValue ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   isDefaultBBoxSize: (() =>
   {
      const defaultBBoxSize = new Vector3 (-1);

      return function ()
      {
         return this ._bboxSize .getValue () .equals (defaultBBoxSize);
      };
   })(),
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
      return this .bboxNode;
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
   set_visible_and_hidden__ ()
   {
      const value = this ._visible .getValue () && !this ._hidden .getValue ();

      if (value === this ._display .getValue ())
         return;

      this ._display = value;
   },
   set_bboxDisplay__: (() =>
   {
      const
         bbox   = new Box3 (),
         matrix = new Matrix4 ();

      return function ()
      {
         if (this ._bboxDisplay .getValue ())
         {
            this .bboxNode ??= (() =>
            {
               // Create dummy Group.

               const
                  browser  = this .getBrowser (),
                  bboxNode = this .getExecutionContext () .createNode ("Group", false);

               bboxNode ._children = [browser .getBBoxShape ()];

               bboxNode .setPrivate (true);
               bboxNode .setup ();

               // Override traverse.

               bboxNode .traverse = (type, renderObject) =>
               {
                  if (type === TraverseType .PICKING)
                     return;

                  const modelViewMatrix = renderObject .getModelViewMatrix ();

                  this .getBBox (bbox);

                  const
                     bboxSize   = bbox .size,
                     bboxCenter = bbox .center;

                  if (bboxSize .x === 0 || bboxSize .y === 0 || bboxSize .z === 0)
                     return;

                  matrix .set (bboxCenter, null, bboxSize);

                  modelViewMatrix .push ();
                  modelViewMatrix .multLeft (matrix);

                  browser .getBBoxShape () .traverse (type, renderObject);

                  modelViewMatrix .pop ();
               };

               return bboxNode;
            })();
         }
         else
         {
            this .bboxNode = null;
         }
      };
   })(),
   dispose () { },
});

Object .defineProperties (X3DBoundedObject, X3DNode .getStaticProperties ("X3DBoundedObject", "Grouping", 1));

export default X3DBoundedObject;
