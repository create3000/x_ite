import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";

function NurbsTextureCoordinate (executionContext)
{
   X3DNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsTextureCoordinate);

   this .array = [ ];
}

Object .assign (Object .setPrototypeOf (NurbsTextureCoordinate .prototype, X3DNode .prototype),
{
   getControlPoints (texWeights)
   {
      const
         uDimension    = this ._uDimension .getValue (),
         vDimension    = this ._vDimension .getValue (),
         controlPoints = this ._controlPoint .getValue (),
         array         = this .array;

      for (let u = 0; u < uDimension; ++ u)
      {
         const cp = array [u] ??= [ ];

         for (let v = 0; v < vDimension; ++ v)
         {
            const
               index = v * uDimension + u,
               p     = cp [v] ?? new Vector4 (),
               i     = index * 2;

            cp [v] = p .set (controlPoints [i], controlPoints [i + 1], 0, texWeights ? texWeights [index] : 1);
         }

         cp .length = vDimension;
      }

      array .length = uDimension;

      return array;
   },
   isValid ()
   {
      if (this ._uOrder .getValue () < 2)
         return false;

      if (this ._vOrder .getValue () < 2)
         return false;

      if (this ._uDimension .getValue () < this ._uOrder .getValue ())
         return false;

      if (this ._vDimension .getValue () < this ._vOrder .getValue ())
         return false;

      if (this ._controlPoint .length < this ._uDimension .getValue () * this ._vDimension .getValue ())
         return false;

      return true;
   }
});

Object .defineProperties (NurbsTextureCoordinate,
{
   ... X3DNode .getStaticProperties ("NurbsTextureCoordinate", "NURBS", 1, "texCoord", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",       new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",   new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",       new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint", new Fields .MFVec2f ()),
      ]),
      enumerable: true,
   },
});

export default NurbsTextureCoordinate;
