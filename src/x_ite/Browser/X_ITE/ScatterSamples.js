class ScatterSamples
{
   static SCATTER_SAMPLES_COUNT = 64; // Number of samples for the Burley diffusion profile.

   static
   {
      const [scatterSamples, minRadius] = this .#computeScatterSamples ();

      this .SCATTER_SAMPLES    = scatterSamples;
      this .SCATTER_MIN_RADIUS = minRadius;
   }

   /**
    * Using blender implementation of Burley diffusion profile.
    */
   static #computeScatterSamples ()
   {
      // Precompute sample position with white albedo.
      const d = this .#burleySetup (1, 1);

      const randU = 0.2; // Random value between 0 and 1, fixed here for determinism.
      const randV = 0.5;

      // Find minimum radius that we can represent because we are only sampling the largest radius.
      let min_radius = 1;

      const goldenAngle  = Math .PI * (3 - Math .sqrt (5));
      const uniformArray = [ ];

      for (let i = 0; i < this .SCATTER_SAMPLES_COUNT; ++ i)
      {
         const theta = goldenAngle * i + Math .PI * 2 * randU;
         const x     = (randV + i) / this .SCATTER_SAMPLES_COUNT;
         const r     = this .#burleySample (d, x);

         min_radius = Math .min (min_radius, r);

         uniformArray .push (theta, r, 1 / this .#burleyPdf (d, r));
      }

      // Avoid float imprecision.
      min_radius = Math .max (min_radius, 0.00001);

      return [new Float32Array (uniformArray), min_radius];
   }

   static #burleySample (d, xRand)
   {
      xRand *= 0.9963790093708328;

      const tolerance         = 1e-6;
      const maxIterationCount = 10;

      let r;

      if (xRand <= 0.9)
         r = Math .exp (xRand * xRand * 2.4) - 1;
      else
         r = 15;

      // Solve against scaled radius.
      for (let i = 0; i < maxIterationCount; ++ i)
      {
         const exp_r_3 = Math .exp (-r / 3);
         const exp_r   = exp_r_3 * exp_r_3 * exp_r_3;
         const f       = 1 - 0.25 * exp_r - 0.75 * exp_r_3 - xRand;
         const f_      = 0.25 * exp_r + 0.25 * exp_r_3;

         if (Math .abs (f) < tolerance || f_ === 0)
            break;

         r = r - f / f_;
         r = Math .max (r, 0);
      }

      return r * d;
   }

   static #burleyEval (d, r)
   {
      if (r >= 16 * d)
         return 0;

      const exp_r_3_d = Math .exp (-r / (3 * d));
      const exp_r_d   = exp_r_3_d * exp_r_3_d * exp_r_3_d;

      return (exp_r_d + exp_r_3_d) / (8 * Math .PI * d);
   }

   static #burleyPdf (d, r)
   {
      return this .#burleyEval (d, r) / 0.9963790093708328;
   }

   static #burleySetup (radius, albedo)
   {
      const m_1_pi = 0.318309886183790671538;
      const s      = 1.9 - albedo + 3.5 * ((albedo - 0.8) * (albedo - 0.8));
      const l      = 0.25 * m_1_pi * radius;

      return l / s;
   }
}

export default ScatterSamples;
