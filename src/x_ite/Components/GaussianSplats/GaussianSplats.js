import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DBoundedObject     from "../Grouping/X3DBoundedObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import GaussianSplatsShape  from "../../Browser/GaussianSplats/GaussianSplatsShape.js";

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

      this ._pointerEvents .addFieldInterest (this .shapeNode ._pointerEvents);
      this ._castShadow    .addFieldInterest (this .shapeNode ._castShadow);
      this ._hidden        .addFieldInterest (this .shapeNode ._hidden);
      this ._visible       .addFieldInterest (this .shapeNode ._visible);
      this ._bboxDisplay   .addFieldInterest (this .shapeNode ._bboxDisplay);
      this ._bboxSize      .addFieldInterest (this .shapeNode ._bboxSize);
      this ._bboxCenter    .addFieldInterest (this .shapeNode ._bboxCenter);

      this .shapeNode ._pointerEvents = this ._pointerEvents;
      this .shapeNode ._hidden        = this ._hidden;
      this .shapeNode ._visible       = this ._visible;
      this .shapeNode ._bboxDisplay   = this ._bboxDisplay;
      this .shapeNode ._bboxSize      = this ._bboxSize;
      this .shapeNode ._bboxCenter    = this ._bboxCenter;

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
   ... X3DNode .getStaticProperties ("GaussianSplats", "GaussianSplats", 1, "children", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                       new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "colorSpace",                     new Fields .SFString ("SRGB_REC709_DISPLAY")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "positions",                      new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "orientations",                   new Fields .MFQuaternion ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scales",                         new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "opacities",                      new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree0Coef0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree1Coef0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree1Coef1", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree1Coef2", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree2Coef0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree2Coef1", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree2Coef2", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree2Coef3", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree2Coef4", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef0", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef1", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef2", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef3", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef4", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef5", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "sphericalHarmonicsDegree3Coef6", new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "pointerEvents",                  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",                     new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",                        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",                    new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",                       new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",                     new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default GaussianSplats;
