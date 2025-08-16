
import ndloop           from "./utils/ndloop.js";
import variable         from "./utils/variable.js";
import accessorPreamble from "./utils/accessor-preamble.js";
import inferType        from "./utils/infer-type.js";
import isArrayLike      from "./utils/is-array-like.js";
import sizeGetter       from "./utils/size-getter.js";

const supportCache = {};

export default function (cacheKey, nurbs, accessors, debug, checkBounds) {
   const cachedSupport = supportCache[cacheKey];
   if (cachedSupport) {
      return cachedSupport.bind(nurbs);
   }

   const degree = nurbs.degree;
   const knots = nurbs.knots;
   const splineDimension = nurbs.splineDimension;
   const boundary = nurbs.boundary;

   const code = [];
   const functionName = "support" + cacheKey;

   const knotAccessor = accessors.knot;

   const tVar = variable("t");
   const domainVar = debug ? "domain" : "d";
   const sizeVar = variable(debug ? "size" : "s");
   const knotIndex = variable(debug ? "knotIndex" : "i");

   let allDimensionUniform = true;
   for (let d = 0; d < splineDimension; ++ d) {
      if (isArrayLike(knots) && isArrayLike(knots[d])) {
         allDimensionUniform = false;
      }
   }

   // Just to indent properly and save lots of typing
   function line (str) {
      code.push("  " + (str || ""));
   }

   const parameterArgs = [];
   for (let i = 0; i < splineDimension; ++ i) {
      parameterArgs.push(tVar([i]));
   }

   code.push("function " + functionName + " (out, " + parameterArgs.join(", ") + ") {");

   let c = 0;
   function pushSupport (args, period) {
      if (period === undefined) {
         line("out[" + (c ++) + "] = " + args.join(" + ") + ";");
      } else {
         line("out[" + (c ++) + "] = (" + args.join(" + ") + " + " + period + ") % " + period + ";");
      }
   }

   line("var h, m;");
   line("var c = 0;");

   if (checkBounds) {
      line("var " + domainVar + " = this.domain;");
      line("for (var i = 0; i < this.splineDimension; ++ i) {");
      line("  a = arguments[i + 1];");
      line("  if (a < " + domainVar + "[i][0] || a > " + domainVar + "[i][1] || a === undefined || isNaN(a)) {");
      line("    throw new Error(\"Invalid Spline parameter in dimension \"+i+\". Valid domain is [\"+" + domainVar + "[i][0]+\", \"+" + domainVar + "[i][1]+\"]. but got t\"+i+\" = \"+arguments[i + 1]+\".\");");
      line("  }");
      line("}");
   }

   for (let d = 0; d < splineDimension; ++ d) {
      line("var " + sizeVar(d) + " = " + sizeGetter(nurbs.points, "this.points", d) + ";");
   }

   if (!allDimensionUniform) {
      code.push(accessorPreamble(nurbs, "k", "this.knots", knots));
   }

   const hasKnots = [];
   for (let d = 0; d < splineDimension; ++ d) {
      switch (inferType(knots)) {
         case inferType.NDARRAY:
            hasKnots[d] = true;
            break;
         case inferType.ARRAY_OF_ARRAYS:
            hasKnots[d] = isArrayLike(knots[d]);
            break;
      }
   }

   for (let d = 0; d < splineDimension; ++ d) {
      if (hasKnots[d]) {
         line("var " + knotIndex(d) + " = 0;");
         line("h = " + sizeVar(d) + ";");
         line("while(h > " + knotIndex(d) + " + 1) {");
         line("  m = 0.5 * (h + " + knotIndex(d) + ") | 0;");
         line("  if (" + knotAccessor([d, "m"]) + " > " + tVar(d) + ") h = m;");
         line("  else " + knotIndex(d) + " = m;");
         line("}");
      } else {
         if (boundary[d] === "closed") {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0) % " + sizeVar(d) + ";");
         } else {
            line(knotIndex(d) + " = (" + tVar(d) + " | 0);");
            line("if (" + knotIndex(d) + " < " + degree[d] + ") " + knotIndex(d) + " = " + degree[d] + ";");
            line("if (" + knotIndex(d) + " > " + sizeVar(d) + " - 1) " + knotIndex(d) + " = " + sizeVar(d) + " - 1;");
         }
      }
   }

   const n = [];

   for (let d = 0; d < splineDimension; ++ d) {
      n[d] = degree[d] + 1;
   }

   ndloop(n, function (dst) {
      const readIdx = [];
      const period = [];
      for (let d = 0; d < splineDimension; ++ d) {
         readIdx[d] = [knotIndex(d), dst[d] - degree[d]];
         if (boundary[d] === "closed" && dst[d] - degree[d] < 0) period[d] = sizeVar(d);
      }
      for (let d = 0; d < splineDimension; ++ d) {
         pushSupport(readIdx[d], period[d]);
      }
   });

   line("out.length = " + c + ";");

   line("return out;");
   code.push("}");

   if (debug) console.log(code.join("\n"));

   const evaluator = new Function([code.join("\n"), "; return ", functionName].join(""))();
   supportCache[cacheKey] = evaluator;
   return evaluator.bind(nurbs);
}
