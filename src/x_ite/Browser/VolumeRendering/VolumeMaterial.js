import UnlitMaterial from "../../Components/Shape/UnlitMaterial.js";
import vs            from "./VolumeStyle.vs.js";
import fs            from "./VolumeStyle.fs.js";

function VolumeMaterial (executionContext, volumeDataNode)
{
   UnlitMaterial .call (this, executionContext);

   this .volumeDataNode    = volumeDataNode;
   this .volumeShaderNodes = new Map ();
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

      let key = "";

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
         browser = this .getBrowser (),
         options = [ ];

      const { renderObject, fogNode, localObjectsKeys } = renderContext;

      const objectsKeys = localObjectsKeys .concat (renderObject .getGlobalLightsKeys ());

      if (browser .getRenderingProperty ("XRSession"))
         options .push ("X3D_XR_SESSION");

      if (renderObject .getLogarithmicDepthBuffer ())
         options .push ("X3D_LOGARITHMIC_DEPTH_BUFFER");

      if (renderObject .getOrderIndependentTransparency ())
         options .push ("X3D_ORDER_INDEPENDENT_TRANSPARENCY");

      switch (fogNode ?.getFogType ())
      {
         case 1:
            options .push ("X3D_FOG", "X3D_FOG_LINEAR");
            break;
         case 2:
            options .push ("X3D_FOG", "X3D_FOG_EXPONENTIAL");
            break;
      }

      const
         numClipPlanes = objectsKeys .reduce ((a, c) => a + (c === 0), 0),
         numLights     = objectsKeys .reduce ((a, c) => a + (c === 1), 0);

      if (numClipPlanes)
      {
         options .push ("X3D_CLIP_PLANES")
         options .push (`X3D_NUM_CLIP_PLANES ${Math .min (numClipPlanes, browser .getMaxClipPlanes ())}`);
      }

      if (numLights)
      {
         options .push ("X3D_LIGHTING")
         options .push (`X3D_NUM_LIGHTS ${Math .min (numLights, browser .getMaxLights ())}`);
      }

      const shaderNode = this .volumeDataNode .createShader (options, vs, fs);

      this .volumeShaderNodes .set (key, shaderNode);

      return shaderNode;
   },
   setShaderUniforms (gl, shaderObject, renderObject, textureTransformMapping, textureCoordinateMapping)
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
