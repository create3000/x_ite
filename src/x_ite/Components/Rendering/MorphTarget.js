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

   // Private properties

   this .geometricPropertyNodes = [ ];
}

Object .assign (Object .setPrototypeOf (MorphTarget .prototype, X3DNode .prototype),
{
   initialize ()
   {
      X3DNode .prototype .initialize .call (this);

      this ._displacements .addInterest ("set_displacements__", this);

      this .set_displacements__ ();
   },
   set_displacements__ ()
   {
      const geometricPropertyNodes = this .geometricPropertyNodes;

      for (const geometricPropertyNode of geometricPropertyNodes)
         geometricPropertyNode .removeInterest ("addNodeEvent", this);

      geometricPropertyNodes .length = 0;

      for (const node of this ._displacements)
      {
         const geometricPropertyNode = X3DCast (X3DConstants .X3DGeometricPropertyNode, node);

         if (geometricPropertyNode)
            geometricPropertyNodes .push (geometricPropertyNode);
      }

      for (const geometricPropertyNode of geometricPropertyNodes)
         geometricPropertyNode .addInterest ("addNodeEvent", this);
   },
   getDisplacements (target)
   {
      for (const geometricPropertyNode of this .geometricPropertyNodes)
      {
         const type = geometricPropertyNode .getType ();

         for (let t = type .length; t >= 0; -- t)
         {
            switch (type [t])
            {
               case X3DConstants .X3DColorNode:
                  geometricPropertyNode .addColors (target .COLOR);
                  break;
               case X3DConstants .Tangent:
                  geometricPropertyNode .addVectors (target .TANGENT);
                  break;
               case X3DConstants .Normal:
                  geometricPropertyNode .addVectors (target .NORMAL);
                  break;
               case X3DConstants .X3DCoordinateNode:
                  geometricPropertyNode .addPoints (target .POSITION);
                  break;
               default:
                  continue;
            }

            break;
         }
      }

      return target;
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
