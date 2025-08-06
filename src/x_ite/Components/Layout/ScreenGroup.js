import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DGroupingNode      from "../Grouping/X3DGroupingNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";
import X3DProtoDeclaration  from "../../Prototype/X3DProtoDeclaration.js";

function ScreenGroup (executionContext)
{
   X3DGroupingNode .call (this, executionContext);

   this .addType (X3DConstants .ScreenGroup);

   // Private properties

   if (executionContext .getOuterNode () instanceof X3DProtoDeclaration)
      this .matrix = new Matrix4 ();
   else
      this .matrix = new Matrix4 (0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0);
}

Object .assign (Object .setPrototypeOf (ScreenGroup .prototype, X3DGroupingNode .prototype),
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
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .CAMERA:
         case TraverseType .PICKING:
         case TraverseType .SHADOW: // ???
            // No clone support for shadows, generated cube map texture and bbox
            break;
         default:
         {
            const browser = this .getBrowser ();

            browser .getScreenScaleMatrix (renderObject, this .matrix, browser .getRenderingProperty ("ContentScale"), false);
            break;
         }
      }

      const modelViewMatrix = renderObject .getModelViewMatrix ();

      modelViewMatrix .push ();
      modelViewMatrix .multLeft (this .matrix);

      X3DGroupingNode .prototype .traverse .call (this, type, renderObject);

      modelViewMatrix .pop ();
   },
});

Object .defineProperties (ScreenGroup,
{
   ... X3DNode .getStaticProperties ("ScreenGroup", "Layout", 2, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",       new Fields .SFNode ()),
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

export default ScreenGroup;
