
import accessorPreamble from "./utils/accessor-preamble.js";
import sizeGetter       from "./utils/size-getter.js";
import variable         from "./utils/variable.js";

const transformerCache = {};

export default function createTransform (cacheKey, nurbs, accessors, debug)
{
   const cachedTransformer = transformerCache[cacheKey];
   if (cachedTransformer) {
      return cachedTransformer.bind(nurbs);
   }

   const code = [];
   const functionName = "transform" + cacheKey;

   code.push("function " + functionName + "(m) {");
   code.push("var i, w;");
   code.push(accessorPreamble(nurbs, "x", "this.points", nurbs.points));

   const sizeVar = variable(debug ? "size" : "s");
   for (let i = 0; i < nurbs.splineDimension; ++ i) {
      code.push("var " + sizeVar(i) + " = " + sizeGetter(nurbs.points, "this.points", i) + ";");
   }

   const iterators = [];
   for (let i = 0; i < nurbs .splineDimension; ++ i) {
      const iterator = "i" + i;
      iterators.push(iterator);
      code.push("for (" + iterator + " = " + sizeVar(i) + "- 1; " + iterator + " >= 0; -- " + iterator + ") {");
   }

   for (let i = 0; i < nurbs.dimension; ++ i) {
      code.push("x" + i + " = " + accessors.point(iterators.concat([i])));
   }

   const terms = [];
   for (let i = 0; i < nurbs.dimension; ++ i) {
      terms.push("m[" + ((nurbs.dimension + 1) * (i + 1) - 1) + "] * x" + i);
   }
   terms.push("m[" + ((nurbs.dimension + 1) * (nurbs.dimension + 1) - 1) + "]");
   code.push("var w = (" + terms.join(" + ") + ") || 1.0;");

   for (let i = 0; i < nurbs.dimension; ++ i) {
      const terms = [];
      const n = nurbs.dimension;
      let j = 0;
      for (; j < n; ++ j) {
         terms.push("m[" + (j * (n + 1) + i) + "] * x" + j);
      }
      terms.push("m[" + (j * (n + 1) + i) + "]");
      const lvalue = accessors.point(iterators.concat([i]));
      const rvalue = "(" + terms.join(" + ") + ") / w";
      code.push(lvalue + " = " + rvalue + ";");
   }

   for (let i = nurbs.splineDimension - 1; i >= 0; -- i) {
      code.push("}");
   }

   code.push("return this;");
   code.push("}");

   const transform = new Function([code.join("\n"), "; return ", functionName].join(""))();

   if (debug) console.log(code.join("\n"));

   transformerCache[cacheKey] = transform;
   return transform.bind(nurbs);
};
