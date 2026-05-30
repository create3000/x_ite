import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import GaussianSplatsShape  from "../../Browser/X_ITE/GaussianSplatsShape.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function GaussianSplats (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .GaussianSplats);

   // Units

   this ._positions .setUnit ("length");

   // Private Properties

   this .shapeNode = new GaussianSplatsShape (executionContext, this);
}

Object .assign (Object .setPrototypeOf (GaussianSplats .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._visible     .addFieldInterest (this .shapeNode ._visible);
      this ._bboxDisplay .addFieldInterest (this .shapeNode ._bboxDisplay);
      this ._bboxSize    .addFieldInterest (this .shapeNode ._bboxSize);
      this ._bboxCenter  .addFieldInterest (this .shapeNode ._bboxCenter);

      this .shapeNode ._visible     = this ._visible;
      this .shapeNode ._bboxDisplay = this ._bboxDisplay;
      this .shapeNode ._bboxSize    = this ._bboxSize;
      this .shapeNode ._bboxCenter  = this ._bboxCenter;

      this .shapeNode .setup ();
   },
   getInnerNode ()
   {
      return this .shapeNode;
   },
   getBBox (bbox, shadows)
   {
      return this .shapeNode .getBBox (bbox, shadows);
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (GaussianSplats,
{
   ... X3DNode .getStaticProperties ("GaussianSplats", "X_ITE", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",            new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "colorSpace",          new Fields .SFString ("SRGB_REC709_DISPLAY")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "positions",           new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientations",        new Fields .MFVec4f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",              new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "opacities",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics1", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics2", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonics3", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",         new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",            new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",          new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplats;
