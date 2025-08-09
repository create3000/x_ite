
import inferType from "./infer-type.js";

export default function (nurbs, variableName, propertyName, data)
{
   const code = [ ];

   switch (inferType (data))
   {
      case inferType .NDARRAY:
      {
         code .push ("  var " + variableName + " = " + propertyName + ".data;");
         code .push ("  var " + variableName + "Offset = " + propertyName + ".offset;");

         for (let i = 0; i < data .dimension; ++ i) {
            code .push ("  var " + variableName + "Stride" + i + " = " + propertyName + ".stride[" + i + "];");
         }

         break;
      }
      case inferType .ARRAY_OF_OBJECTS:
      case inferType .ARRAY_OF_ARRAYS:
         code .push ("  var " + variableName + " = " + propertyName + ";");
   }

   return code .join ("\n");
};
