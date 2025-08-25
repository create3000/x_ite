import Panorama2FS from "./Panorama2.fs.js";

const _panoramaShader = Symbol ();

function X3DCubeMapTexturingContext () { }

Object .assign (X3DCubeMapTexturingContext .prototype,
{
   getPanoramaShader ()
   {
      return this [_panoramaShader] ??= this .createShader ("Panorama", "FullScreen", `data:x-shader/x-fragment,${Panorama2FS}`, [ ], ["x3d_PanoramaTextureEXT", "x3d_CurrentFaceEXT"]);
   },
});

export default X3DCubeMapTexturingContext;
