import X3DConstants     from "../../Base/X3DConstants.js";
import Fields           from "../../Fields.js";
import ExamineViewer    from "./ExamineViewer.js";
import WalkViewer       from "./WalkViewer.js";
import FlyViewer        from "./FlyViewer.js";
import PlaneViewer      from "./PlaneViewer.js";
import NoneViewer       from "./NoneViewer.js";
import LookAtViewer     from "./LookAtViewer.js";
import DirectionalLight from "../../Components/Lighting/DirectionalLight.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";

const
   _activeCollisions   = Symbol (),
   _viewerNode         = Symbol (),
   _headlightContainer = Symbol ();

function X3DNavigationContext ()
{
   this .addChildObjects (X3DConstants .outputOnly, "availableViewers", new Fields .MFString (),
                          X3DConstants .outputOnly, "viewer",           new Fields .SFString ("EXAMINE"));

   this [_activeCollisions] = new Set ();
   this [_viewerNode]       = new NoneViewer (this .getPrivateScene ());
}

Object .assign (X3DNavigationContext .prototype,
{
   initialize ()
   {
      this ._viewer .addInterest ("set_viewer__", this);

      this .shutdown ()    .addInterest ("remove_world__", this);
      this .initialized () .addInterest ("set_world__",    this);

      this [_headlightContainer] = this .createHeadlight ();
      this [_viewerNode] .setup ();
   },
   createHeadlight ()
   {
      const headlight = new DirectionalLight (this .getPrivateScene ());

      headlight .setup ();

      const headlightContainer = headlight .getLights () .pop ();

      headlightContainer .set (headlight, null, Matrix4 .IDENTITY);
      headlightContainer .dispose = Function .prototype;

      return headlightContainer;
   },
   getHeadlight ()
   {
      return this [_headlightContainer];
   },
   getActiveLayer ()
   {
      return this ._activeLayer .getValue ();
   },
   getActiveNavigationInfo ()
   {
      return this ._activeNavigationInfo .getValue ();
   },
   getActiveViewpoint ()
   {
      return this ._activeViewpoint .getValue ();
   },
   getCurrentViewer ()
   {
      return this ._viewer .getValue ();
   },
   getViewer ()
   {
      return this [_viewerNode];
   },
   addCollision (object)
   {
      this [_activeCollisions] .add (object);
   },
   removeCollision (object)
   {
      this [_activeCollisions] .delete (object);
   },
   getCollisionCount ()
   {
      return this [_activeCollisions] .size;
   },
   remove_world__ ()
   {
      this [_viewerNode] ?.disconnect ();

      this .getWorld () ._activeLayer .removeInterest ("set_activeLayer__", this);
   },
   set_world__ ()
   {
      this .getWorld () ._activeLayer .addInterest ("set_activeLayer__", this);

      this .set_activeLayer__ ();
   },
   set_activeLayer__ ()
   {
      // Remove active layer.
      {
         const activeLayer = this ._activeLayer .getValue ();

         if (activeLayer)
         {
            activeLayer .getNavigationInfoStack () .removeInterest ("set_activeNavigationInfo__", this);
            activeLayer .getViewpointStack ()      .removeInterest ("set_activeViewpoint__",      this);
         }
      }

      // Add active layer.
      {
         const activeLayer = this ._activeLayer = this .getWorld () .getActiveLayer ();

         if (activeLayer)
         {
            activeLayer .getNavigationInfoStack () .addInterest ("set_activeNavigationInfo__", this);
            activeLayer .getViewpointStack ()      .addInterest ("set_activeViewpoint__",      this);
         }
      }

      this .set_activeNavigationInfo__ ();
      this .set_activeViewpoint__ ();
   },
   set_activeNavigationInfo__ ()
   {
      this ._activeNavigationInfo .getValue () ?._viewer .removeFieldInterest (this ._viewer);

      const navigationInfo = this ._activeLayer .getValue () ?.getNavigationInfo ();

      this ._activeNavigationInfo = navigationInfo;

      navigationInfo ?._viewer .addFieldInterest (this ._viewer);

      this ._viewer = navigationInfo ?._viewer ?? "NONE";
   },
   set_activeViewpoint__ ()
   {
      this ._activeViewpoint = this ._activeLayer .getValue () ?.getViewpoint ();
   },
   set_viewer__ (viewer)
   {
      const navigationInfo = this ._activeNavigationInfo .getValue ();

      this ._availableViewers = navigationInfo ?._availableViewers ?? [ ];

      // Create viewer node.

      this [_viewerNode] ?.dispose ();

      switch (viewer .getValue ())
      {
         case "EXAMINE":
            this [_viewerNode] = new ExamineViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "WALK":
            this [_viewerNode] = new WalkViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "FLY":
            this [_viewerNode] = new FlyViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "PLANE":
         case "PLANE_create3000.github.io":
         case "PLANE_create3000.de":
            this [_viewerNode] = new PlaneViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "NONE":
            this [_viewerNode] = new NoneViewer (this .getPrivateScene (), navigationInfo);
            break;
         case "LOOKAT":
            this [_viewerNode] = new LookAtViewer (this .getPrivateScene (), navigationInfo);
            break;
         default:
            this [_viewerNode] = new ExamineViewer (this .getPrivateScene (), navigationInfo);
            break;
      }

      this [_viewerNode] .setup ();
   },
   dispose ()
   {
      this [_viewerNode] ?.dispose ();
   },
});

export default X3DNavigationContext;
