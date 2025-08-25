function Spheroid3 (semiMajorAxis = 1, semiMinorAxis = 1, use_f_1 = false)
{
   this .set (semiMajorAxis, semiMinorAxis, use_f_1);
}

Object .assign (Spheroid3 .prototype,
{
   copy ()
   {
      const copy = Object .create (Spheroid3 .prototype);

      copy .semiMajorAxis = this .semiMajorAxis; // a
      copy .semiMinorAxis = this .semiMinorAxis; // c

      return copy;
   },
   assign (spheroid)
   {
      this .semiMajorAxis = spheroid .semiMajorAxis;
      this .semiMinorAxis = spheroid .semiMinorAxis;

      return this;
   },
   equals (spheroid)
   {
      return this .semiMajorAxis === spheroid .semiMajorAxis && this .semiMinorAxis === spheroid .semiMinorAxis;
   },
   set (semiMajorAxis = 1, semiMinorAxis = 1, use_f_1 = false)
   {
      if (use_f_1)
      {
         const f_1 = semiMinorAxis;

         this .semiMajorAxis = semiMajorAxis;                   // a
         this .semiMinorAxis = semiMajorAxis * (1 - (1 / f_1)); // c
      }
      else
      {
         this .semiMajorAxis = semiMajorAxis; // a
         this .semiMinorAxis = semiMinorAxis; // c
      }

      return this;
   },
   toString ()
   {
      return `${this .semiMajorAxis} ${this .semiMinorAxis}`;
   },
});

export default Spheroid3;
