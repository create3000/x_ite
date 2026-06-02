import UnlitMaterial from "../../Components/Shape/UnlitMaterial.js";
import vs            from "./VolumeStyle.vs.js";
import fs            from "./VolumeStyle.fs.js";

function VolumeMaterial (executionContext, volumeDataNode)
{
   UnlitMaterial .call (this, executionContext);

   this .volumeDataNode    = volumeDataNode;
   this .volumeShaderNodes = this .getBrowser () .getShaders ();
}

Object .assign (Object .setPrototypeOf (VolumeMaterial .prototype, UnlitMaterial .prototype),
{
   getVolumeShaders ()
   {
      return this .volumeShaderNodes;
   },
   getShader (geometryContext, renderContext)
   {
      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      let key = "VD";

      key += this .getId (); // TODO: this .volumeDataNode .getKey ();
      key += ".";
      key += renderObject .getRenderKey ();
      key += fogNode ?.getFogType () ?? 0;
      key += ".";
      key += localObjectsKeys .sort () .join (""); // ClipPlane, X3DLightNode

      return this .volumeShaderNodes .get (key)
         ?? this .createShader (key, geometryContext, renderContext);
   },
   createShader (key, geometryContext, renderContext)
   {
      const
         options    = this .getShaderOptions (geometryContext, renderContext),
         shaderNode = this .volumeDataNode .createShader (options, vs, fs);

      this .volumeShaderNodes .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, textureTransformMapping, textureCoordinateMapping)
   {
      this .volumeDataNode .setShaderUniforms (gl, shaderObject);
   },
});

Object .defineProperties (VolumeMaterial,
{
   typeName:
   {
      value: "VolumeMaterial",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Shape", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "material",
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: UnlitMaterial .fieldDefinitions,
   },
});

export default VolumeMaterial;
