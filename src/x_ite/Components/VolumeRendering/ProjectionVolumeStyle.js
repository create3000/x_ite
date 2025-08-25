import Fields                   from "../../Fields.js";
import X3DFieldDefinition       from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray     from "../../Base/FieldDefinitionArray.js";
import X3DNode                  from "../Core/X3DNode.js";
import X3DVolumeRenderStyleNode from "./X3DVolumeRenderStyleNode.js";
import X3DConstants             from "../../Base/X3DConstants.js";

function ProjectionVolumeStyle (executionContext)
{
   X3DVolumeRenderStyleNode .call (this, executionContext);

   this .addType (X3DConstants .ProjectionVolumeStyle);
}

Object .assign (Object .setPrototypeOf (ProjectionVolumeStyle .prototype, X3DVolumeRenderStyleNode .prototype),
{
   addShaderFields (shaderNode)
   {
      if (! this ._enabled .getValue ())
         return;

      shaderNode .addUserDefinedField (X3DConstants .inputOutput, "intensityThreshold_" + this .getId (), this ._intensityThreshold .copy ());
   },
   getDefines (defines)
   {
      defines .add ("#define X3D_PLANE");
   },
   getUniformsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "// ProjectionVolumeStyle\n";
      string += "\n";
      string += "uniform float intensityThreshold_" + this .getId () + ";\n";

      string += "\n";
      string += "vec4\n";
      string += "getProjectionStyle_" + this .getId () + "(in vec4 originalColor, in vec3 texCoord)\n";
      string += "{\n";
      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
         case "MIN":
         {
            string += "   float  projectionColor = 1.0;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "   float  projectionColor = 0.0;\n";
            break;
         }
      }

      string += "   const  int samples     = 16;\n";
      string += "   vec3   normal          = normalize (x3d_TextureNormalMatrix * vec3 (0.0, 0.0, 1.0));\n";
      string += "   Plane3 plane           = plane3 (vec3 (0.5), normal);\n";
      string += "   vec3   point           = texCoord + plane3_perpendicular_vector (plane, texCoord);\n";
      string += "   vec3   ray             = point - normal * M_SQRT1_2;\n";
      string += "   vec3   step            = normal * (M_SQRT2 / float (samples));\n";
      string += "   bool   first           = false;\n";
      string += "\n";
      string += "   for (int i = 0; i < samples; ++ i, ray += step)\n";
      string += "   {\n";
      string += "      if (any (greaterThan (abs (ray - 0.5), vec3 (0.5))))\n";
      string += "         continue;\n";
      string += "\n";
      string += "      float intensity = texture (x3d_Texture3D [0], ray) .r;\n";
      string += "\n";

      switch (this ._type .getValue ())
      {
         default:
         case "MAX":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity <= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "MIN":
         {
            string += "      if (intensity < intensityThreshold_" + this .getId () + ")\n";
            string += "         continue;\n";
            string += "\n";
            string += "      if (first && intensityThreshold_" + this .getId () + " > 0.0)\n";
            string += "         break;\n";
            string += "\n";
            string += "      if (intensity >= projectionColor)\n";
            string += "      {\n";
            string += "         first = true;\n";
            string += "         continue;\n";
            string += "      }\n";
            string += "\n";
            string += "      projectionColor = intensity;\n";
            break;
         }
         case "AVERAGE":
         {
            string += "      projectionColor += intensity;\n";
            break;
         }
      }

      string += "   }\n";
      string += "\n";

      if (this ._type .getValue () === "AVERAGE")
         string += "   projectionColor /= float (samples);\n";

      string += "   return vec4 (vec3 (projectionColor), originalColor .a);\n";
      string += "}\n";

      return string;
   },
   getFunctionsText ()
   {
      if (! this ._enabled .getValue ())
         return "";

      let string = "";

      string += "\n";
      string += "   // ProjectionVolumeStyle\n";
      string += "\n";
      string += "   textureColor = getProjectionStyle_" + this .getId () + " (textureColor, texCoord);\n";

      return string;
   },
});

Object .defineProperties (ProjectionVolumeStyle,
{
   ... X3DNode .getStaticProperties ("ProjectionVolumeStyle", "VolumeRendering", 2, "renderStyle", "3.3"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",            new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",               new Fields .SFString ("MAX")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "intensityThreshold", new Fields .SFFloat ()),
      ]),
      enumerable: true,
   },
});

export default ProjectionVolumeStyle;
