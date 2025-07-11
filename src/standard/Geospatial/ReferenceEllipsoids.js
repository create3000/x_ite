import Spheroid3 from "../Math/Geometry/Spheroid3.js";

const ReferenceEllipsoids = new Map ([
   // Earth
   // X3D Specification
   ["AA", new Spheroid3 (6377563.396, 299.3249646,   true)], // Airy 1830
   ["AM", new Spheroid3 (6377340.189, 299.3249646,   true)], // Modified Airy
   ["AN", new Spheroid3 (6378160,     298.25,        true)], // Australian National
   ["BN", new Spheroid3 (6377483.865, 299.1528128,   true)], // Bessel 1841 (Namibia)
   ["BR", new Spheroid3 (6377397.155, 299.1528128,   true)], // Bessel 1841 (Ethiopia Indonesia...)
   ["CC", new Spheroid3 (6378206.4,   294.9786982,   true)], // Clarke 1866
   ["CD", new Spheroid3 (6378249.145, 293.465,       true)], // Clarke 1880
   ["EA", new Spheroid3 (6377276.345, 300.8017,      true)], // Everest (India 1830)
   ["EB", new Spheroid3 (6377298.556, 300.8017,      true)], // Everest (Sabah & Sarawak)
   ["EC", new Spheroid3 (6377301.243, 300.8017,      true)], // Everest (India 1956)
   ["ED", new Spheroid3 (6377295.664, 300.8017,      true)], // Everest (W. Malaysia 1969)
   ["EE", new Spheroid3 (6377304.063, 300.8017,      true)], // Everest (W. Malaysia & Singapore 1948)
   ["EF", new Spheroid3 (6377309.613, 300.8017,      true)], // Everest (Pakistan)
   ["FA", new Spheroid3 (6378155,     298.3,         true)], // Modified Fischer 1960
   ["HE", new Spheroid3 (6378200,     298.3,         true)], // Helmert 1906
   ["HO", new Spheroid3 (6378270,     297,           true)], // Hough 1960
   ["ID", new Spheroid3 (6378160,     298.247,       true)], // Indonesian 1974
   ["IN", new Spheroid3 (6378388,     297,           true)], // International 1924
   ["KA", new Spheroid3 (6378245,     298.3,         true)], // Krassovsky 1940
   ["RF", new Spheroid3 (6378137,     298.257222101, true)], // Geodetic Reference System 1980 (GRS 80)
   ["SA", new Spheroid3 (6378160,     298.25,        true)], // South American 1969
   ["WD", new Spheroid3 (6378135,     298.26,        true)], // WGS 72
   ["WE", new Spheroid3 (6378137,     298.257223563, true)], // WGS 84
   // Solar System
   // https:,//en.wikipedia.de
   // Can someone give me more accurate parameters.
   ["SUN",     new Spheroid3 (696342000, 1 / 9e-6, true)],
   ["MERCURY", new Spheroid3 (2439700,  2439700)],
   ["VENUS",   new Spheroid3 (6051800,  6051800)],
   ["MOON",    new Spheroid3 (1738140,  1735970)],
   ["MARS",    new Spheroid3 (3395428,  3377678)], // https",//adsabs.harvard.edu/abs/2010EM%26P..106....1A
   ["JUPITER", new Spheroid3 (71492000, 66854000)],
   ["SATURN",  new Spheroid3 (60268000, 54364000)],
   ["URANUS",  new Spheroid3 (2555000,  24973000)],
   ["NEPTUNE", new Spheroid3 (24764000, 24341000)],
   ["PLUTO",   new Spheroid3 (1153000,  1153000)],
]);

export default ReferenceEllipsoids;
