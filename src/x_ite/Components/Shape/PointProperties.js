import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DNode                from "../Core/X3DNode.js";
import X3DAppearanceChildNode from "./X3DAppearanceChildNode.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Algorithm              from "../../../standard/Math/Algorithm.js";

function PointProperties (executionContext)
{
   X3DAppearanceChildNode .call (this, executionContext);

   this .addType (X3DConstants .PointProperties);

   this .attenuation = new Float32Array (3);
}

Object .assign (Object .setPrototypeOf (PointProperties .prototype, X3DAppearanceChildNode .prototype),
{
   initialize ()
   {
      X3DAppearanceChildNode .prototype .initialize .call (this);

      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      this .pointSizeRange = gl .getParameter (gl .ALIASED_POINT_SIZE_RANGE);

      browser .getRenderingProperties () ._ContentScale .addInterest ("set_contentScale__", this);

      this ._pointSizeScaleFactor .addInterest ("set_pointSizeScaleFactor__", this);
      this ._pointSizeMinValue    .addInterest ("set_pointSizeMinValue__",    this);
      this ._pointSizeMaxValue    .addInterest ("set_pointSizeMaxValue__",    this);
      this ._attenuation          .addInterest ("set_attenuation__",          this);

      this .set_pointSizeScaleFactor__ ();
      this .set_pointSizeMinValue__ ();
      this .set_pointSizeMaxValue__ ();
      this .set_attenuation__ ();
   },
   getStyleKey ()
   {
      return 1;
   },
   set_contentScale__ ()
   {
      this .set_pointSizeScaleFactor__ ();
      this .set_pointSizeMinValue__ ();
      this .set_pointSizeMaxValue__ ();
   },
   set_pointSizeScaleFactor__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeScaleFactor = Math .max (this ._pointSizeScaleFactor .getValue (), 0) * contentScale;
   },
   set_pointSizeMinValue__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeMinValue = Algorithm .clamp (this ._pointSizeMinValue .getValue (), 0, this .pointSizeRange [1]) * contentScale;
   },
   set_pointSizeMaxValue__ ()
   {
      const contentScale = this .getBrowser () .getRenderingProperty ("ContentScale");

      this .pointSizeMaxValue = Algorithm .clamp (this ._pointSizeMaxValue .getValue (), 0, this .pointSizeRange [1]) * contentScale;
   },
   set_attenuation__ ()
   {
      this .attenuation [0] = Math .max (0, this ._attenuation [0]);
      this .attenuation [1] = Math .max (0, this ._attenuation [1]);
      this .attenuation [2] = Math .max (0, this ._attenuation [2]);
   },
   setShaderUniforms (gl, shaderObject)
   {
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeScaleFactor, this .pointSizeScaleFactor);
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMinValue,    this .pointSizeMinValue);
      gl .uniform1f  (shaderObject .x3d_PointPropertiesPointSizeMaxValue,    this .pointSizeMaxValue);
      gl .uniform3fv (shaderObject .x3d_PointPropertiesAttenuation,          this .attenuation);
   },
});

Object .defineProperties (PointProperties,
{
   ... X3DNode .getStaticProperties ("PointProperties", "Shape", 5, "pointProperties", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeScaleFactor", new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMinValue",    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "pointSizeMaxValue",    new Fields .SFFloat (1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "attenuation",          new Fields .SFVec3f (1, 0, 0)),
      ]),
      enumerable: true,
   },
});

export default PointProperties;
