
import isArrayLike from "./is-array-like.js";

function capitalize (str) {
   return str[0].toUpperCase() + str.slice(1);
}

export default function (nurbs, debug, checkBounds, pointType, weightType, knotType) {
   const degreeParts = [];
   let hasAnyKnots = false;
   for (let d = 0; d < nurbs.splineDimension; ++ d) {
      const hasKnots = isArrayLike(nurbs.knots) && isArrayLike(nurbs.knots[d]);
      if (hasKnots) hasAnyKnots = true;
      degreeParts.push(
         "Deg" +
         nurbs.degree[d] +
         (hasKnots ? "" : "Uniform") +
         capitalize(nurbs.boundary[d])
      );
   }
   const parts = [
      [
         hasAnyKnots ? "NU" : "",
         nurbs.weights ? "RBS" : "BS"
      ].join("") +
      nurbs.dimension + "D",
      degreeParts.join("_")
   ];

   if (pointType) {
      parts.push(pointType + "Pts");
   }
   if (weightType) {
      parts.push(weightType + "Wts");
   }
   if (knotType) {
      parts.push(knotType + "Kts");
   }

   if (debug) {
      parts.push("debug");
   }

   if (checkBounds) {
      parts.push("chk");
   }

   return parts.join("_");
};
