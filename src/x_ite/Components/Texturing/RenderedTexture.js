import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TextureBuffer        from "../../Rendering/TextureBuffer.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";

function RenderedTexture (executionContext)
{
   X3DTexture2DNode .call (this, executionContext);

   this .addType (X3DConstants .RenderedTexture);

   this .addChildObjects (X3DConstants .outputOnly, "loadState", new Fields .SFInt32 (X3DConstants .NOT_STARTED_STATE));

   // Private properties

   this .dependentRenderers = new WeakMap ();
}

Object .assign (Object .setPrototypeOf (RenderedTexture .prototype, X3DTexture2DNode .prototype),
{
   initialize ()
   {
      X3DTexture2DNode .prototype .initialize .call (this);

      this ._dimensions .addInterest ("set_dimensions__", this);

      this .set_dimensions__ ();
   },
   getTextureType ()
   {
      return 2;
   },
   getTexture ()
   {
      return this .frameBuffer ?.getColorTexture (0) ??
         X3DTexture2DNode .prototype .getTexture .call (this);
   },
   checkLoadState ()
   {
      return this ._loadState .getValue ();
   },
   set_dimensions__ ()
   {
      const
         browser = this .getBrowser (),
         gl      = browser .getContext ();

      // Transfer 6 textures of size x size pixels.

      const
         width      = this ._dimensions .length > 0 ? this ._dimensions [0] : 128,
         height     = this ._dimensions .length > 1 ? this ._dimensions [1] : 128,
         components = this ._dimensions .length > 2 ? this ._dimensions [2] : 4;

      if (width > 0 && height > 0)
      {
         // Properties

         this .viewport    = new Vector4 (0, 0, width, height);
         this .frameBuffer = new TextureBuffer ({ browser, width, height });

         this .setWidth (width);
         this .setHeight (height);
      }
      else
      {
         this .frameBuffer = null;

         this .setWidth (0);
         this .setHeight (0);
      }
   },
   traverse (type, renderObject)
   {
      // TraverseType .DISPLAY

      if (this ._update .getValue () === "NONE")
         return;

      if (!renderObject .isIndependent ())
         return;

      if (!this .frameBuffer)
         return;

      renderObject .getRenderedTextures () .add (this);
   },
   renderTexture (renderObject)
   {

   },
});

Object .defineProperties (RenderedTexture,
{
   ... X3DNode .getStaticProperties ("RenderedTexture", "Texturing", 4, "texture", "4.1"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "update",            new Fields .SFString ("NONE")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "dimensions",        new Fields .MFInt32 (128, 128, 4, 1, 1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "depthMap",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoint",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default RenderedTexture;
