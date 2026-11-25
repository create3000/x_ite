import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import X3DCast              from "../../Base/X3DCast.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

function MorphTarget (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .MorphTarget);
}

Object .assign (Object .setPrototypeOf (MorphTarget .prototype, X3DNode .prototype),
{
   getDisplacements (targets)
   {
      for (const node of this ._displacements)
      {
         const geometricPropertyNode = X3DCast (X3DConstants .X3DGeometricPropertyNode, node);

         if (!geometricPropertyNode)
            continue;

         const type = geometricPropertyNode .getType ();

         for (let t = type .length; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .Color:
               case X3DConstants .ColorRGBA:
               case X3DConstants .Normal:
               case X3DConstants .Tangent:
                  break;
               case X3DConstants .X3DCoordinateNode:
               {
                  geometricPropertyNode .addPoints (targets .POSITION);
                  break;
               }
               default:
                  continue;
            }

            break;
         }
      }
   },
});

Object .defineProperties (MorphTarget,
{
   ... X3DNode .getStaticProperties ("MorphTarget", "Rendering", 5, "targets", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         // new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "displacements", new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MorphTarget;
