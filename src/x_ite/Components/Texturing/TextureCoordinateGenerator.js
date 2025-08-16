import Fields                         from "../../Fields.js";
import X3DFieldDefinition             from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray           from "../../Base/FieldDefinitionArray.js";
import X3DNode                        from "../Core/X3DNode.js";
import X3DSingleTextureCoordinateNode from "./X3DSingleTextureCoordinateNode.js";
import X3DConstants                   from "../../Base/X3DConstants.js";
import ModeType                       from "../../Browser/Texturing/TextureCoordinateGeneratorModeType.js";

function TextureCoordinateGenerator (executionContext)
{
   X3DSingleTextureCoordinateNode .call (this, executionContext);

   this .addType (X3DConstants .TextureCoordinateGenerator);

   this .mode      = ModeType .SPHERE;
   this .parameter = new Float32Array (6);
}

Object .assign (Object .setPrototypeOf (TextureCoordinateGenerator .prototype, X3DSingleTextureCoordinateNode .prototype),
{
   initialize ()
   {
      X3DSingleTextureCoordinateNode .prototype .initialize .call (this);

      this ._mode      .addInterest ("set_mode__",      this);
      this ._parameter .addInterest ("set_parameter__", this);

      this .set_mode__ ();
      this .set_parameter__ ();
   },
   set_mode__: (() =>
   {
      const modes = new Map ([
         ["SPHERE",                      ModeType .SPHERE],
         ["CAMERASPACENORMAL",           ModeType .CAMERASPACENORMAL],
         ["CAMERASPACEPOSITION",         ModeType .CAMERASPACEPOSITION],
         ["CAMERASPACEREFLECTIONVECTOR", ModeType .CAMERASPACEREFLECTIONVECTOR],
         ["SPHERE-LOCAL",                ModeType .SPHERE_LOCAL],
         ["COORD",                       ModeType .COORD],
         ["COORD-EYE",                   ModeType .COORD_EYE],
         ["NOISE",                       ModeType .NOISE],
         ["NOISE-EYE",                   ModeType .NOISE_EYE],
         ["SPHERE-REFLECT",              ModeType .SPHERE_REFLECT],
         ["SPHERE-REFLECT-LOCAL",        ModeType .SPHERE_REFLECT_LOCAL],
      ]);

      return function ()
      {
         this .mode = modes .get (this ._mode .getValue ());

         if (this .mode === undefined)
            this .mode = ModeType .SPHERE;
      };
   })(),
   set_parameter__ ()
   {
      const length = Math .min (this .parameter .length, this ._parameter .length)

      for (let i = 0; i < length; ++ i)
         this .parameter [i] = this ._parameter [i];

      this .parameter .fill (0, length);
   },
   addPointToChannel (index, array)
   {
      array .push (0, 0, 0, 1);
   },
   addPoints (array)
   {
      return array;
   },
   setShaderUniforms (gl, shaderObject, channel = 0)
   {
      gl .uniform1i  (shaderObject .x3d_TextureCoordinateGeneratorMode [channel],      this .mode);
      gl .uniform1fv (shaderObject .x3d_TextureCoordinateGeneratorParameter [channel], this .parameter);
   },
});

Object .defineProperties (TextureCoordinateGenerator,
{
   ... X3DNode .getStaticProperties ("TextureCoordinateGenerator", "Texturing", 2, "texCoord", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mapping",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "mode",      new Fields .SFString ("SPHERE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "parameter", new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default TextureCoordinateGenerator;
