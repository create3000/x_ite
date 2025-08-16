
import isNdarray     from "./is-ndarray.js";
import isNdarrayLike from "./is-ndarray-like.js";
import isArrayLike   from "./is-array-like.js";

function inferType (x)
{
   if (!x)
      return undefined;

   if (isNdarray (x) || isNdarrayLike (x))
   {
      if (x.dtype === "generic")
         return inferType .GENERIC_NDARRAY;

      return inferType .NDARRAY;
   }
   else
   {
      if (isArrayLike (x))
      {
         let ptr = x;

         while (isArrayLike (ptr [0]))
            ptr = ptr [0];

         if ("x" in ptr)
            return inferType .ARRAY_OF_OBJECTS;

         // if (isArrayLike(x[0])) {
         return inferType .ARRAY_OF_ARRAYS;
         // }
         // return inferType.PACKED;
      }

      throw new Error("Unhandled data type. Got type: " + (typeof x));
   }
}

inferType .ARRAY_OF_OBJECTS = "Obj";
inferType .ARRAY_OF_ARRAYS  = "Arr";
inferType .NDARRAY          = "Nd";
inferType .GENERIC_NDARRAY  = "GenNd";
inferType .PACKED           = "PackArr";

export default inferType;
