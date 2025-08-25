import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DGeometricPropertyNode from "../Rendering/X3DGeometricPropertyNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function FogCoordinate (executionContext)
{
   X3DGeometricPropertyNode .call (this, executionContext);

   this .addType (X3DConstants .FogCoordinate);

   // Units

   this ._depth .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (FogCoordinate .prototype, X3DGeometricPropertyNode .prototype),
{
   initialize ()
   {
      X3DGeometricPropertyNode .prototype .initialize .call (this);

      this ._depth .addInterest ("set_depth__", this);

      this .set_depth__ ();
   },
   set_depth__ ()
   {
      this .depth  = this ._depth .getValue ();
      this .length = this ._depth .length;
   },
   getSize ()
   {
      return this .length;
   },
   addDepth (index, array)
   {
      if (index >= 0 && this .length)
      {
         return array .push (this .depth [index % this .length]);
      }
      else
      {
         array .push (0);
      }
   },
   addDepths (array, min = this .length)
   {
      const length = this .length;

      if (length)
      {
         const depth = this .depth;

         for (let index = 0; index < min; ++ index)
            array .push (depth [index % length]);
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (0);
      }

      return array;
   },
});

Object .defineProperties (FogCoordinate,
{
   ... X3DNode .getStaticProperties ("FogCoordinate", "EnvironmentalEffects", 4, "fogCoord", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "depth",    new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default FogCoordinate;
