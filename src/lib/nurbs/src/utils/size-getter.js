
import isNdarrayLike from "./is-ndarray-like.js";

export default function (data, dataVariableName, dimension) {
   if (!data) {
      return "this.size[" + dimension + "]";
   } else if (isNdarrayLike(data)) {
      return dataVariableName + ".shape[" + dimension + "]";
   } else {
      let str = dataVariableName;
      for (let i = 0; i < dimension; ++ i) {
         str += "[0]";
      }
      return str + ".length";
   }
};
