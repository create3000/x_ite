import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTransformNode     from "../Grouping/X3DTransformNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function HAnimSite (executionContext)
{
   X3DTransformNode .call (this, executionContext);

   this .addType (X3DConstants .HAnimSite);

   // Private properties

   this .displacerNodes = [ ];
   this .jointMatrix    = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (HAnimSite .prototype, X3DTransformNode .prototype),
{
   initialize ()
   {
      X3DTransformNode .prototype .initialize .call (this);

      // Events

      this ._displacers .addInterest ("set_displacers__", this);
      this ._coord      .addInterest ("set_coord__",      this);

      this .set_displacers__ ();
      this .set_coord__ ();
   },
   getHAnimKey ()
   {
      return this .coordNode .getHAnimKey ();
   },
   getDisplacers ()
   {
      return this .displacerNodes;
   },
   getJointMatrix ()
   {
      return this .jointMatrix;
   },
   set_displacers__ ()
   {
      const displacerNodes = this .displacerNodes;

      for (const displacerNode of displacerNodes)
      {
         displacerNode ._coordIndex    .removeInterest ("set_displacementsTexture__",       this);
         displacerNode ._displacements .removeInterest ("set_displacementsTexture__",       this);
         displacerNode ._coordIndex    .removeInterest ("set_displacementWeightsTexture__", this);
         displacerNode ._weight        .removeInterest ("set_displacementWeightsTexture__", this);
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
         displacerNode ._coordIndex    .addInterest ("set_displacementsTexture__",       this);
         displacerNode ._displacements .addInterest ("set_displacementsTexture__",       this);
         displacerNode ._coordIndex    .addInterest ("set_displacementWeightsTexture__", this);
         displacerNode ._weight        .addInterest ("set_displacementWeightsTexture__", this);
      }

      this .set_displacementsTexture__ ();
      this .set_displacementWeightsTexture__ ();
   },
   set_displacementsTexture__ ()
   {
      this .coordNode ?._displacementsTexture .addEvent ();
   },
   set_displacementWeightsTexture__ ()
   {
      this .coordNode ?._displacementWeightsTexture .addEvent ();
   },
   set_coord__ ()
   {
      this .coordNode ?.removeHAnimDisplacers (this);

      this .coordNode = X3DCast (X3DConstants .Coordinate, this ._coord)
         ?? X3DCast (X3DConstants .CoordinateDouble, this ._coord);

      this .coordNode ?.addHAnimDisplacers (this);

      this .set_displacementsTexture__ ();
      this .set_displacementWeightsTexture__ ();
   },
   traverse (type, renderObject)
   {
      if (this .coordNode ?.numDisplacements)
      {
         const modelViewMatrix = renderObject .getModelViewMatrix ();

         modelViewMatrix .push ();
         modelViewMatrix .multLeft (this .getMatrix ());

         if (type === TraverseType .DISPLAY)
         {
            const invHumanoidMatrix = renderObject .getInvHumanoidMatrix () .get ();

            this .jointMatrix
               .multRight (modelViewMatrix .get ())
               .multRight (invHumanoidMatrix);

            this .coordNode .updateSkin ();
         }

         const hAnimNodes = this .coordNode .getHAnimNodes ();

         hAnimNodes .push (this);

         X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);

         hAnimNodes .pop ();
         modelViewMatrix .pop ();
      }
      else
      {
         X3DTransformNode .prototype .traverse .call (this, type, renderObject);
      }
   },
   groupTraverse (type, renderObject)
   {
      if (this .coordNode ?.numDisplacements)
      {
         if (type === TraverseType .DISPLAY)
         {
            const invHumanoidMatrix = renderObject .getInvHumanoidMatrix () .get ();

            this .jointMatrix
               .multRight (renderObject .getModelViewMatrix () .get ())
               .multRight (invHumanoidMatrix);

            this .coordNode .updateSkin ();
         }

         const hAnimNodes = this .coordNode .getHAnimNodes ();

         hAnimNodes .push (this);

         X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);

         hAnimNodes .pop ();
      }
      else
      {
         X3DTransformNode .prototype .groupTraverse .call (this, type, renderObject);
      }
   },
   getShaderOptions (options)
   {
      this .coordNode .getHAnimShaderOptions (options);
   },
   setShaderUniforms (gl, shaderObject)
   {
      this .coordNode .setHAnimShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (HAnimSite,
{
   ... X3DNode .getStaticProperties ("HAnimSite", "HAnim", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "name",             new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "purpose",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "translation",      new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "rotation",         new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scale",            new Fields .SFVec3f (1, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scaleOrientation", new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "center",           new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "meshVertexIndex",  new Fields .SFInt32 (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "displacers",       new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",            new Fields .SFNode ()),
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

export default HAnimSite;
