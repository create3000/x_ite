import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture3DNode     from "./X3DTexture3DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import NRRDParser           from "../../Browser/Texturing3D/NRRDParser.js";
import DICOMParser          from "../../Browser/Texturing3D/DICOMParser.js";
import FileLoader           from "../../InputOutput/FileLoader.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function ImageTexture3D (executionContext)
{
   X3DTexture3DNode .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);

   this .addType (X3DConstants .ImageTexture3D);
}

Object .assign (Object .setPrototypeOf (ImageTexture3D .prototype, X3DTexture3DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture3DNode .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getInternalType (components)
   {
      const gl = this .getBrowser () .getContext ();

      switch (components)
      {
         case 1:
            return gl .LUMINANCE;
         case 2:
            return gl .LUMINANCE_ALPHA;
         case 3:
            return gl .RGB;
         case 4:
            return gl .RGBA;
      }
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      new FileLoader (this, { dataAsString: false }) .loadDocument (this ._url, (data, URL) =>
      {
         if (data === null)
         {
            // No URL could be loaded.
            this .clearTexture ();
            this .updateOutputs (0, 0, 0, 0);
            this .setLoadState (X3DConstants .FAILED_STATE);
         }
         else if (data instanceof ArrayBuffer)
         {
            if (URL .pathname .match (/\.ktx2?(?:\.gz)?$/) || URL .href .match (/^data:image\/ktx2[;,]/))
            {
               this .setLinear (true);
               this .setMipMaps (false);

               return this .getBrowser () .getKTXDecoder ()
                  .then (decoder => decoder .loadKTXFromBuffer (data))
                  .then (texture => this .setKTXTexture (texture, URL));
            }

            this .setLinear (false);
            this .setMipMaps (true);

            const nrrd = new NRRDParser () .parse (data);

            if (nrrd .nrrd)
            {
               const { width, height, depth, components, data } = nrrd;

               const
                  internalType = this .getInternalType (components),
                  transparent  = !(components & 1);

               this .setTextureData (width, height, depth, transparent, internalType, data);
               this .updateOutputs (width, height, depth, components);
               this .setLoadState (X3DConstants .COMPLETE_STATE);
               return;
            }

            const dicom = new DICOMParser () .parse (data);

            if (dicom .dicom)
            {
               const { width, height, depth, components, data } = dicom;

               const
                  internalType = this .getInternalType (components),
                  transparent  = !(components & 1);

               this .setTextureData (width, height, depth, transparent, internalType, data);
               this .updateOutputs (width, height, depth, components);
               this .setLoadState (X3DConstants .COMPLETE_STATE);
               return;
            }

            throw new Error ("ImageTexture3D: no suitable file type handler found.");
         }
      });
   },
   setKTXTexture (texture, URL)
   {
      if (texture .target !== this .getTarget ())
         throw new Error ("Invalid KTX texture target, must be 'TEXTURE_3D'.");

      if (DEVELOPMENT)
      {
         if (URL .protocol !== "data:")
            console .info (`Done loading image texture 3D '${decodeURI (URL)}'.`);
      }

      const { baseWidth, baseHeight, baseDepth, numComponents } = texture;

      this .setTexture (texture);
      this .setTransparent (false);
      this .setWidth (baseWidth);
      this .setHeight (baseHeight);
      this .setDepth (baseDepth); // TODO: Always 1
      this .updateTextureParameters ();
      this .updateOutputs (baseWidth, baseHeight, baseDepth, numComponents);

      this .setLoadState (X3DConstants .COMPLETE_STATE);
   },
   updateOutputs (width, height, depth, colorDepth)
   {
      this ._width      = width;
      this ._height     = height;
      this ._depth      = depth;
      this ._colorDepth = colorDepth;
   },
   dispose ()
   {
      X3DUrlObject     .prototype .dispose .call (this);
      X3DTexture3DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageTexture3D,
{
   ... X3DNode .getStaticProperties ("ImageTexture3D", "Texturing3D", 2, "texture", "3.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime (0)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "width",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "height",               new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "depth",                new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "colorDepth",           new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatR",              new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageTexture3D;
