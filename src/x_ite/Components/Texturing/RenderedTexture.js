import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DUrlOutputObject   from "../Networking/X3DUrlOutputObject.js";
import Group                from "../Grouping/Group.js";
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
   X3DTexture2DNode   .call (this, executionContext);
   X3DUrlOutputObject .call (this, executionContext);

   this .addType (X3DConstants .RenderedTexture);

   this .addChildObjects (X3DConstants .outputOnly, "loadState", new Fields .SFInt32 (X3DConstants .COMPLETE_STATE));

   // Private properties

   this .groupNode          = new Group (executionContext);
   this .lastUpdate         = -1;
   this .dependentRenderers = new WeakMap ();
}

Object .assign (Object .setPrototypeOf (RenderedTexture .prototype, X3DTexture2DNode .prototype),
{
   initialize ()
   {
      X3DTexture2DNode   .prototype .initialize .call (this);
      X3DUrlOutputObject .prototype .initialize .call (this);

      this ._singleFrame .addInterest ("set_singleFrame__", this);
      this ._width       .addInterest ("set_dimensions__",  this);
      this ._height      .addInterest ("set_dimensions__",  this);
      this ._depthMap    .addInterest ("set_dimensions__",  this);
      this ._children    .addInterest ("set_children__",    this);

      this .set_singleFrame__ ();
      this .set_dimensions__ ();
      this .set_children__ ();

      this .groupNode .setup ();
   },
   getTextureType ()
   {
      return 2;
   },
   isRenderedTexture ()
   {
      return true;
   },
   getRenderedTextures (renderedTextures)
   {
      renderedTextures .add (this);
   },
   checkLoadState ()
   {
      return this ._loadState .getValue ();
   },
   set_singleFrame__ ()
   {
      this .update = true;
   },
   set_dimensions__ ()
   {
      const browser = this .getBrowser ();

      // Dispose old framebuffer.

      this .frameBuffer ?.dispose ();

      // Create framebuffer.

      const
         width  = Math .max (this ._width .getValue (), 0),
         height = Math .max (this ._height .getValue (), 0);

      // const components = this ._colorDepth .getValue ();

      if (width > 0 && height > 0)
      {
         // Properties

         const float = this ._depthMap .getValue ();

         this .viewport    = new Vector4 (0, 0, width, height);
         this .frameBuffer = new TextureBuffer ({ browser, width, height, float });

         this .setFloat (float);
         this .setTextureData (width, height, false, false, null);
      }
      else
      {
         this .frameBuffer = null;

         this .setWidth (0);
         this .setHeight (0);
         this .setFloat (false);
         this .clearTexture ();
      }

      this .traverseType = this ._depthMap .getValue () ? TraverseType .DEPTH : TraverseType .DISPLAY;
   },
   set_children__ ()
   {
      this .backgroundNode = null;
      this .fogNode        = null;
      this .viewpointNode  = null;

      this .groupNode ._children .length = 0;

      for (const child of this ._children)
         this .setChild (child);
   },
   setChild (child)
   {
      const childNode = X3DCast (X3DConstants .X3DChildNode, child);

      if (!childNode)
         return;

      const type = childNode .getType ();

      for (let t = type .length - 1; t >= 0; -- t)
      {
         switch (type [t])
         {
            case X3DConstants .X3DBackgroundNode:
            {
               this .backgroundNode = childNode;
               break;
            }
            case X3DConstants .Fog:
            {
               this .fogNode = childNode;
               break;
            }
            case X3DConstants .X3DViewpointNode:
            {
               this .viewpointNode = childNode;
               break;
            }
            case X3DConstants .X3DChildNode:
            {
               this .groupNode ._children .push (childNode);
               break;
            }
            default:
               continue;
         }

         break;
      }
   },
   traverse (type, renderObject)
   {
      // TraverseType .DISPLAY

      if (!renderObject .isIndependent ())
         return;

      if (!this .frameBuffer)
         return;

      if (!this .update)
         return;

      if (Date .now () - this .lastUpdate < this ._updateInterval .getValue () * 1000)
         return;

      this .lastUpdate = Date .now ();

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

            this .dependentRenderers .set (renderObject, dependentRenderer);
            dependentRenderer .setDepthClearColor (1, 1, 1, 1);
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

         dependentRenderer .getViewVolumes ()      .push (viewVolume .set (projectionMatrix, viewport, viewport));
         dependentRenderer .getProjectionMatrix () .push (projectionMatrix);

         dependentRenderer .getCameraSpaceMatrix () .push (viewpointNode .getCameraSpaceMatrix ());
         dependentRenderer .getViewMatrix ()        .push (viewpointNode .getViewMatrix ());
         dependentRenderer .getModelViewMatrix ()   .push (viewpointNode .getViewMatrix ());

         if (headlight)
         {
            headlightContainer .modelViewMatrix .push (renderObject .getViewMatrix () .get ());
            headlightContainer .modelViewMatrix .multLeft (viewpointNode .getCameraSpaceMatrix ());

            if (this .groupNode ._children .length)
            {
               dependentRenderer .getGlobalLights ()     .push (headlightContainer);
               dependentRenderer .getGlobalLightsKeys () .push (headlightContainer .lightNode .getLightKey ());
            }
         }

         if (this .groupNode ._children .length)
            dependentRenderer .render (this .traverseType, this .groupNode .traverse, this .groupNode);
         else
            layer .traverse (this .traverseType, dependentRenderer);

         if (headlight)
            headlightContainer .modelViewMatrix .pop ();

         dependentRenderer .getModelViewMatrix ()   .pop ();
         dependentRenderer .getViewMatrix ()        .pop ();
         dependentRenderer .getCameraSpaceMatrix () .pop ();

         dependentRenderer .getProjectionMatrix () .pop ();
         dependentRenderer .getViewVolumes ()      .pop ();

         // Transfer image.

         gl .bindTexture (this .getTarget (), this .getTexture ());
         gl .copyTexSubImage2D (this .getTarget (), 0, 0, 0, 0, 0, width, height);

         // Finish.

         this .updateTextureParameters ();

         if (this ._singleFrame .getValue ())
            this .update = false;
      };
   })(),
   dispose ()
   {
      X3DUrlOutputObject .prototype .dispose .call (this);
      X3DTexture2DNode   .prototype .dispose .call (this);
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
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "replaceImage",      new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxNumberFrames",   new Fields .SFInt32 (1000)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",               new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "singleFrame",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "updateInterval",    new Fields .SFTime (0.1)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "width",             new Fields .SFInt32 (128)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "height",            new Fields .SFInt32 (128)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "colorDepth",        new Fields .SFInt32 (4)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "depthMap",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "children",          new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default RenderedTexture;
