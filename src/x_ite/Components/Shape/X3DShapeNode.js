import X3DNode          from "../Core/X3DNode.js";
import X3DChildNode     from "../Core/X3DChildNode.js";
import X3DBoundedObject from "../Grouping/X3DBoundedObject.js";
import X3DCast          from "../../Base/X3DCast.js";
import X3DConstants     from "../../Base/X3DConstants.js";
import TraverseType     from "../../Rendering/TraverseType.js";
import GeometryType     from "../../Browser/Shape/GeometryType.js";
import AlphaMode        from "../../Browser/Shape/AlphaMode.js";
import RenderPass       from "../../Rendering/RenderPass.js";
import Box3             from "../../../standard/Math/Geometry/Box3.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";

function X3DShapeNode (executionContext)
{
   X3DChildNode     .call (this, executionContext);
   X3DBoundedObject .call (this, executionContext);

   this .addType (X3DConstants .X3DShapeNode);

   // Set default values which are almost right in most cases.

   this .setBoundedObject (true);
   this .setPointingObject (true);
   this .setCollisionObject (true);
   this .setShadowObject (true);
   this .setVisibleObject (true);

   // Private properties

   this .bbox            = new Box3 ();
   this .bboxSize        = new Vector3 ();
   this .bboxCenter      = new Vector3 ();
   this .renderPasses    = RenderPass .RENDER;
   this .renderPassNodes = [this];
}

Object .assign (Object .setPrototypeOf (X3DShapeNode .prototype, X3DChildNode .prototype),
   X3DBoundedObject .prototype,
{
   initialize ()
   {
      X3DChildNode     .prototype .initialize .call (this);
      X3DBoundedObject .prototype .initialize .call (this);

      this ._transformSensors .addInterest ("set_pickableObject__", this);

      this ._pointerEvents .addInterest ("set_pointingObject__", this);
      this ._castShadow    .addInterest ("set_shadowObject__",   this);
      this ._bboxSize      .addInterest ("set_boundedObject__",  this);
      this ._bboxSize      .addInterest ("set_bbox__",           this);
      this ._bboxCenter    .addInterest ("set_bbox__",           this);
      this ._appearance    .addInterest ("set_appearance__",     this);
      this ._geometry      .addInterest ("set_geometry__",       this);

      this .set_appearance__ ();
      this .set_geometry__ ();
   },
   getGeometryType ()
   {
      return GeometryType .GEOMETRY;
   },
   getNumInstances ()
   {
      return 1;
   },
   isEnabled ()
   {
      return this .getNumInstances () && (this .geometryNode || this .getGeometryType () !== GeometryType .GEOMETRY);
   },
   getBBox (bbox, shadows)
   {
      if (shadows)
      {
         if (this ._castShadow .getValue ())
            return bbox .assign (this .bbox);
         else
            return bbox .set ();
      }
      else
      {
         return bbox .assign (this .bbox);
      }
   },
   getBBoxSize ()
   {
      return this .bboxSize;
   },
   getBBoxCenter ()
   {
      return this .bboxCenter;
   },
   isTransparent ()
   {
      return this .transparent;
   },
   setTransparent (value)
   {
      // Used by ParticleSystem!
      this .transparent = !!value;
   },
   getAlphaMode ()
   {
      return this .alphaMode;
   },
   setAlphaMode (value)
   {
      // Used by ParticleSystem!
      this .alphaMode = !!value;
   },
   getRenderPasses ()
   {
      return this .renderPasses;
   },
   getRenderPassNodes ()
   {
      return this .renderPassNodes;
   },
   getAppearance ()
   {
      return this .appearanceNode;
   },
   getGeometry ()
   {
      return this .geometryNode;
   },
   getGeometryContext ()
   {
      return this .getGeometry ();
   },
   set_bbox__ ()
   {
      if (this .isDefaultBBoxSize ())
      {
         if (this .getGeometry ())
            this .bbox .assign (this .getGeometry () .getBBox ());
         else
            this .bbox .set ();
      }
      else
      {
         this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());
      }

      this .bboxSize   .assign (this .bbox .size);
      this .bboxCenter .assign (this .bbox .center);
   },
   set_appearance__ ()
   {
      if (this .appearanceNode)
      {
         this .appearanceNode ._alphaMode     .removeInterest ("set_transparent__",   this);
         this .appearanceNode ._transparent   .removeInterest ("set_transparent__",   this);
         this .appearanceNode ._transmission  .removeInterest ("set_transmission__",  this);
         this .appearanceNode ._volumeScatter .removeInterest ("set_volumeScatter__", this);
      }

      this .appearanceNode = X3DCast (X3DConstants .X3DAppearanceNode, this ._appearance)
         ?? this .getBrowser () .getDefaultAppearance ();

      this .appearanceNode ._alphaMode     .addInterest ("set_transparent__",   this);
      this .appearanceNode ._transparent   .addInterest ("set_transparent__",   this);
      this .appearanceNode ._transmission  .addInterest ("set_transmission__",  this);
      this .appearanceNode ._volumeScatter .addInterest ("set_volumeScatter__", this);

      this .set_transparent__ ();
      this .set_transmission__ ();
      this .set_volumeScatter__ ();
   },
   set_geometry__ ()
   {
      if (this .geometryNode)
      {
         this .geometryNode ._transparent  .addInterest ("set_transparent__", this);
         this .geometryNode ._bbox_changed .addInterest ("set_bbox__",        this);
      }

      this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._geometry);

      if (this .geometryNode)
      {
         this .geometryNode ._transparent  .addInterest ("set_transparent__", this);
         this .geometryNode ._bbox_changed .addInterest ("set_bbox__",        this);
      }

      this .set_bbox__ ();
      this .set_transparent__ ();
      this .set_objects__ ();
   },
   set_transparent__ ()
   {
      // This function is overloaded in ParticleSystem!

      const alphaMode = this .appearanceNode .getAlphaMode ();

      if (alphaMode === AlphaMode .AUTO)
      {
         this .transparent = !!(this .appearanceNode .isTransparent () || this .geometryNode ?.isTransparent ());
         this .alphaMode   = this .transparent ? AlphaMode .BLEND : AlphaMode .OPAQUE;
      }
      else
      {
         this .transparent = alphaMode === AlphaMode .BLEND;
         this .alphaMode   = alphaMode;
      }
   },
   set_transmission__ ()
   {
      this .set_renderPass__ (this .appearanceNode .isTransmission (), RenderPass .TRANSMISSION);

      this .renderPassNodes [1] = this .appearanceNode .isTransmission () ? undefined : this;
   },
   set_volumeScatter__ ()
   {
      this .set_renderPass__ (this .appearanceNode .isVolumeScatter (), RenderPass .VOLUME_SCATTER);

      this .renderPassNodes [2] = this .appearanceNode .isVolumeScatter () ? this : undefined;
   },
   set_renderPass__ (value, bit)
   {
      if (value)
         this .renderPasses |= bit;
      else
         this .renderPasses &= ~bit;
   },
   set_objects__ ()
   {
      this .set_boundedObject__ ();
      this .set_pointingObject__ ();
      this .set_pickableObject__ ();
      this .set_collisionObject__ ();
      this .set_shadowObject__ ();
      this .set_visibleObject__ ();
   },
   set_boundedObject__ ()
   {
      this .setBoundedObject (this .isEnabled () || !this .isDefaultBBoxSize ());
   },
   set_pointingObject__ ()
   {
      this .setPointingObject (this .isEnabled () && this ._pointerEvents .getValue ());
   },
   set_pickableObject__ ()
   {
      this .setPickableObject (this .getTransformSensors () .size);
   },
   set_collisionObject__ ()
   {
      this .setCollisionObject (this .isEnabled ());
   },
   set_shadowObject__ ()
   {
      this .setShadowObject (this .isEnabled () && this ._castShadow .getValue ());
   },
   set_visibleObject__ ()
   {
      this .setVisibleObject (this .isEnabled ());
   },
   traverse (type, renderObject)
   {
      switch (type)
      {
         case TraverseType .POINTER:
         {
            renderObject .addPointingShape (this);
            break;
         }
         case TraverseType .PICKING:
         {
            this .picking (renderObject);
            break;
         }
         case TraverseType .COLLISION:
         {
            renderObject .addCollisionShape (this);
            break;
         }
         case TraverseType .SHADOW:
         {
            renderObject .addShadowShape (this);
            break;
         }
         case TraverseType .DISPLAY:
         {
            // X3DAppearanceNode traverse is needed for GeneratedCubeMapTexture.

            if (renderObject .addDisplayShape (this))
               this .appearanceNode .traverse (type, renderObject);

            break;
         }
      }

      // Needed for ScreenText and Tools.
      this .geometryNode ?.traverse (type, renderObject);
   },
   picking (renderObject)
   {
      const modelMatrix = renderObject .getModelViewMatrix () .get ();

      for (const transformSensorNode of this .getTransformSensors ())
         transformSensorNode .collect (modelMatrix);

      if (!this .geometryNode)
         return;

      const
         browser          = this .getBrowser (),
         pickSensorStack  = browser .getPickSensors (),
         pickingHierarchy = browser .getPickingHierarchy ();

      pickingHierarchy .push (this);

      for (const pickSensorNode of pickSensorStack .at (-1))
         pickSensorNode .collect (this .geometryNode, modelMatrix, pickingHierarchy);

      pickingHierarchy .pop ();
   },
   dispose ()
   {
      X3DBoundedObject .prototype .dispose .call (this);
      X3DChildNode     .prototype .dispose .call (this);
   },
});

Object .defineProperties (X3DShapeNode, X3DNode .getStaticProperties ("X3DShapeNode", "Shape", 1));

export default X3DShapeNode;
