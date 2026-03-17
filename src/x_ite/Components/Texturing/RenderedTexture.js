import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import TraverseType         from "../../Rendering/TraverseType.js";
import X3DCast              from "../../Base/X3DCast.js";
import DependentRenderer    from "../../Rendering/DependentRenderer.js";
import TextureBuffer        from "../../Rendering/TextureBuffer.js";
import ViewVolume           from "../../../standard/Math/Geometry/ViewVolume.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";

/**
 * THIS NODE IS STILL EXPERIMENTAL.
 */

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
      this ._background .addInterest ("set_background__", this);
      this ._fog        .addInterest ("set_fog__",        this);
      this ._viewpoint  .addInterest ("set_viewpoint__",  this);
      this ._scene      .addInterest ("set_scene__",      this);

      this .set_dimensions__ ();
      this .set_background__ ();
      this .set_fog__ ();
      this .set_viewpoint__ ();
      this .set_scene__ ();
   },
   getTextureType ()
   {
      return 2;
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

         this .setTextureData (width, height, false, false, null);
      }
      else
      {
         this .frameBuffer = null;

         this .setWidth (0);
         this .setHeight (0);
      }
   },
   set_background__ ()
   {
      this .backgroundNode = X3DCast (X3DConstants .X3DBackgroundNode, this ._background);
   },
   set_fog__ ()
   {
      this .fogNode = X3DCast (X3DConstants .X3DFogObject, this ._fog);
   },
   set_viewpoint__ ()
   {
      this .viewpointNode = X3DCast (X3DConstants .X3DViewpointNode, this ._viewpoint);
   },
   set_scene__ ()
   {
      this .scene = X3DCast (X3DConstants .X3DChildNode, this ._scene);
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
   renderTexture: (() =>
   {
      const viewVolume = new ViewVolume ();

      return function (renderObject)
      {
         // Make dependent renderer.

         if (!this .dependentRenderers .has (renderObject))
         {
            const dependentRenderer = new DependentRenderer (this .getExecutionContext (), renderObject);

            dependentRenderer .setup ();

            this .dependentRenderers .set (renderObject, dependentRenderer);
         }

         // Prepare.

         this .viewpointNode ?.update ();

         const
            browser            = this .getBrowser (),
            gl                 = browser .getContext (),
            dependentRenderer  = this .dependentRenderers .get (renderObject),
            layer              = renderObject .getLayer (),
            viewport           = this .viewport,
            navigationInfoNode = dependentRenderer .getNavigationInfo (),
            viewpointNode      = this .viewpointNode ?? dependentRenderer .getViewpoint (),
            projectionMatrix   = viewpointNode .getProjectionMatrix (dependentRenderer, viewport),
            headlight          = navigationInfoNode ._headlight .getValue (),
            headlightContainer = browser .getHeadlight (),
            width              = this .getWidth (),
            height             = this .getHeight ();

         dependentRenderer .setBackground (this .backgroundNode);
         dependentRenderer .setFog (this .fogNode);
         dependentRenderer .setFramebuffer (this .frameBuffer);

         this .setTransparent (dependentRenderer .getBackground () .isTransparent ());

         // Render layer's children.

         this .frameBuffer .bind ();

         gl .viewport (... this .viewport);
         gl .scissor (... this .viewport);
         gl .clearColor (0, 0, 0, 0);
         gl .clear (gl .COLOR_BUFFER_BIT);

         dependentRenderer .getViewVolumes () .push (viewVolume .set (projectionMatrix, viewport, viewport));
         dependentRenderer .getProjectionMatrix () .push (projectionMatrix);

         dependentRenderer .getCameraSpaceMatrix () .push (viewpointNode .getCameraSpaceMatrix ());
         dependentRenderer .getViewMatrix () .push (viewpointNode .getViewMatrix ());
         dependentRenderer .getModelViewMatrix () .push (viewpointNode .getViewMatrix ());

         if (headlight)
         {
            headlightContainer .modelViewMatrix .push (viewpointNode .getViewMatrix ());

            if (this .scene)
            {
               dependentRenderer .getGlobalLights ()     .push (headlightContainer);
               dependentRenderer .getGlobalLightsKeys () .push (headlightContainer .lightNode .getLightKey ());
            }
         }

         if (this .scene)
            dependentRenderer .render (TraverseType .DISPLAY, this .scene .traverse, this .scene);
         else
            layer .traverse (TraverseType .DISPLAY, dependentRenderer);

         if (headlight)
            headlightContainer .modelViewMatrix .pop ();

         dependentRenderer .getModelViewMatrix () .pop ();
         dependentRenderer .getViewMatrix () .pop ();
         dependentRenderer .getCameraSpaceMatrix () .pop ();

         dependentRenderer .getProjectionMatrix () .pop ();
         dependentRenderer .getViewVolumes () .pop ();

         // Transfer image.

         gl .bindTexture (this .getTarget (), this .getTexture ());
         gl .copyTexSubImage2D (this .getTarget (), 0, 0, 0, 0, 0, width, height);

         // Finish.

         this .updateTextureParameters ();

         if (this ._update .equals ("NEXT_FRAME_ONLY"))
            this ._update = "NONE";
      };
   })(),
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "background",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fog",               new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "viewpoint",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "scene",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default RenderedTexture;
