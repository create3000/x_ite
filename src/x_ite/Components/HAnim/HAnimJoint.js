import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTransformNode     from "../Grouping/X3DTransformNode.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function HAnimJoint (executionContext)
{
   X3DTransformNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimJoint);

   this .addChildObjects (X3DConstants .outputOnly, "displacements",       new Fields .SFTime (),
                          X3DConstants .outputOnly, "displacementWeights", new Fields .SFTime ());

   this .setVisibleObject (true);
   this .addAllowedTypes (X3DConstants .HAnimJoint, X3DConstants .HAnimSegment);

   // Legacy

   if (executionContext .getSpecificationVersion () <= 3.3)
      this .addAllowedTypes (X3DConstants .HAnimSite);

   // Private properties

   this .displacerNodes  = [ ];
   this .modelViewMatrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (HAnimJoint .prototype, X3DTransformNode .prototype),
{
   initialize ()
   {
      X3DTransformNode .prototype .initialize .call (this);

      this ._displacers .addInterest ("set_displacers__", this);

      this .set_displacers__ ();
   },
   getModelViewMatrix ()
   {
      return this .modelViewMatrix;
   },
   getDisplacers ()
   {
      return this .displacerNodes;
   },
   set_visibleObjects__ ()
   { },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .removeInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .removeInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .removeInterest ("addEvent", this ._displacementWeights);
      }

      displacerNodes .length = 0;

      for (const node of this ._displacers)
      {
         const displacerNode = X3DCast (X3DConstants .HAnimDisplacer, node);

         if (displacerNode)
            displacerNodes .push (displacerNode);
      }

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacements);
         displacerNode ._displacements .addInterest ("addEvent", this ._displacements);
         displacerNode ._coordIndex    .addInterest ("addEvent", this ._displacementWeights);
         displacerNode ._weight        .addInterest ("addEvent", this ._displacementWeights);
      }

      this ._displacements       .addEvent ();
      this ._displacementWeights .addEvent ();
   },
   traverse (type, renderObject)
   {
      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .getMatrix ());

      if (type === TraverseType .DISPLAY)
         this .modelViewMatrix .assign (modelViewMatrix .get ());

      X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
   groupTraverse (type, renderObject)
   {
      if (type === TraverseType .DISPLAY)
         this .modelViewMatrix .assign (renderObject .getModelViewMatrix () .get ());

      X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);
   },
});

Object .defineProperties (HAnimJoint,
{
   ... X3DNode .getStaticProperties ("HAnimJoint", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "llimit",           new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "ulimit",           new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "limitOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "stiffness",        new Fields .MFFloat (0, 0, 0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordIndex",   new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "skinCoordWeight",  new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",          new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",      new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",         new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",       new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "addChildren",      new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "removeChildren",   new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",         new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default HAnimJoint;
