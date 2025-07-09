import Panorama1FS from "./Panorama1.fs.js";
import Panorama2FS from "./Panorama2.fs.js";

const
   _panoramaShader         = Symbol (),
   _transparentTextureCube = Symbol ();

function X3DCubeMapTexturingContext () { }

Object .assign (X3DCubeMapTexturingContext .prototype,
{
   initialize ()
   {
      const gl = this .getContext ();

      // Transparent Texture

      const defaultData = new Uint8Array (4);

      this [_transparentTextureCube] = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_CUBE_MAP, this [_transparentTextureCube]);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
      gl .texImage2D (gl .TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl .RGBA, 1, 1, 0, gl .RGBA, gl .UNSIGNED_BYTE, defaultData);
   },
   getPanoramaShader ()
   {
      return this [_panoramaShader] ??= this .createShader ("Panorama", "FullScreen", "data:x-shader/x-fragment," + ["", Panorama1FS, Panorama2FS][this .getContext () .getVersion ()], [ ], ["x3d_PanoramaTexture", "x3d_CurrentFace"]);
   },
   getTransparentTextureCube ()
   {
      return this [_transparentTextureCube];
   },
});

export default X3DCubeMapTexturingContext;
