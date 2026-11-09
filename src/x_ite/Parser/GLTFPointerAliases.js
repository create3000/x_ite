class GLTFPointerAliases
{
   static #aliases = new Map ();

   static addAlias (typeName, field, alias)
   {
      const key = `${typeName}.${field}`;

      this .#aliases .set (key, alias);
   }

   static getAlias (path, node)
   {
      const
         field = path .match (/([^/]+)$/) [1] .replace (/Factor$/, ""),
         key   = `${node .getTypeName ()}.${field}`;

      return this .#aliases .get (key) ?? field;
   }

   static isBaseColor (node, field)
   {
      switch (node .getTypeName ())
      {
         case "PhysicalMaterial":
            return field .getName () === "baseColor";
         case "SpecularGlossinessMaterial":
         case "Material":
            return field .getName () === "diffuseColor";
         case "UnlitMaterial":
            return field .getName () === "emissiveColor";
         default:
            return false;
      }
   }
}

GLTFPointerAliases .addAlias ("OrthoViewpoint", "zfar",           "farDistance");
GLTFPointerAliases .addAlias ("OrthoViewpoint", "znear",          "nearDistance");
GLTFPointerAliases .addAlias ("PointLight",     "range",          "radius");
GLTFPointerAliases .addAlias ("Script",         "offset",         "translation");
GLTFPointerAliases .addAlias ("SpotLight",      "innerConeAngle", "beamWidth");
GLTFPointerAliases .addAlias ("SpotLight",      "outerConeAngle", "cutOffAngle");
GLTFPointerAliases .addAlias ("SpotLight",      "range",          "radius");
GLTFPointerAliases .addAlias ("Switch",         "scene",          "whichChoice");
GLTFPointerAliases .addAlias ("UnlitMaterial",  "baseColor",      "emissiveColor");
GLTFPointerAliases .addAlias ("Viewpoint",      "yfov",           "fieldOfView");
GLTFPointerAliases .addAlias ("Viewpoint",      "zfar",           "farDistance");
GLTFPointerAliases .addAlias ("Viewpoint",      "znear",          "nearDistance");

export default GLTFPointerAliases;
