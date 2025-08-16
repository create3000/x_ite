
const args = [];
const tmp = [];

export default function numericalDerivative (out, order, dimension) {
   if (order !== 1) {
      throw new Error("Numerical derivative not implemented for order n = " + order + ".");
   }

   const h = arguments[this.splineDimension + 3] === undefined ? 1e-4 : arguments[this.splineDimension + 3];

   args.length = this.splineDimension;
   for (let i = 0; i < this.splineDimension; ++ i) {
      args[i + 1] = arguments[i + 3];
   }

   const domain = this.domain;
   const k0 = domain[dimension][0];
   const k1 = domain[dimension][1];

   const t0 = args[dimension + 1];
   let tm, tp;
   let dt = (k1 - k0) * h;
   if (this.boundary[dimension] === "closed") {
      const T = k1 - k0;
      tm = k0 + ((t0 - k0 - dt + T) % T);
      tp = k0 + ((t0 - k0 + dt + T) % T);
      dt *= 2;
   } else {
      tm = Math.min(k1, Math.max(k0, t0 - dt));
      tp = Math.min(k1, Math.max(k0, t0 + dt));
      dt = tp - tm;
   }

   args[dimension + 1] = tm;
   args[0] = tmp;
   this.evaluate.apply(null, args);

   args[dimension + 1] = tp;
   args[0] = out;
   this.evaluate.apply(null, args);

   for (let i = 0; i < this .dimension; ++ i) {
      out[i] = (out[i] - tmp[i]) / dt;
   }

   return out;
};
