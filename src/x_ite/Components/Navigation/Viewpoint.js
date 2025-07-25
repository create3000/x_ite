import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DViewpointNode     from "./X3DViewpointNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Camera               from "../../../standard/Math/Geometry/Camera.js";
import Vector2              from "../../../standard/Math/Numbers/Vector2.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function Viewpoint (executionContext)
{
   X3DViewpointNode .call (this, executionContext);

   this .addType (X3DConstants .Viewpoint);

   // Units

   this ._position         .setUnit ("length");
   this ._centerOfRotation .setUnit ("length");
   this ._fieldOfView      .setUnit ("angle");

   // Private properties

   this .projectionMatrix = new Matrix4 ();
}

Object .assign (Object .setPrototypeOf (Viewpoint .prototype, X3DViewpointNode .prototype),
{
   getRelativeTransformation (fromViewpointNode)
   {
      const relative = X3DViewpointNode .prototype .getRelativeTransformation .call (this, fromViewpointNode);

      if (fromViewpointNode .constructor === this .constructor)
         relative .fieldOfView = fromViewpointNode .getUserFieldOfView ();

      return relative;
   },
   setInterpolators (fromViewpointNode, relative)
   {
      if (fromViewpointNode .constructor === this .constructor)
      {
         const scale = relative .fieldOfView / this .getUserFieldOfView ();

         this .fieldOfViewScaleInterpolator ._keyValue = new Fields .MFFloat (scale, this ._fieldOfViewScale .getValue ());

         this ._fieldOfViewScale = scale;
      }
      else
      {
         this .fieldOfViewScaleInterpolator ._keyValue = new Fields .MFFloat (this ._fieldOfViewScale .getValue (), this ._fieldOfViewScale .getValue ());

         this ._fieldOfViewScale = this ._fieldOfViewScale .getValue ();
      }
   },
   getLogarithmicDepthBuffer ()
   {
      return false;
   },
   getFieldOfView ()
   {
      const fov = this ._fieldOfView .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   setFieldOfView (value)
   {
      this ._fieldOfView = value;
   },
   getUserFieldOfView ()
   {
      const fov = this ._fieldOfView .getValue () * this ._fieldOfViewScale .getValue ();

      return fov > 0 && fov < Math .PI ? fov : Math .PI / 4;
   },
   getScreenScale (point, viewport, screenScale)
   {
      // Returns the screen scale in meter/pixel for on pixel.

      const
         width  = viewport [2],
         height = viewport [3],
         pose   = this .getBrowser () .getPose ();

      // MDN says fov can be determined from projectionMatrix.
      // https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API/Perspective
      const fov1_2 = pose
         ? 1 / pose .views [0] .projectionMatrix [5]
         : Math .tan (this .getUserFieldOfView () / 2);

      let size = Math .abs (point .z) * fov1_2 * 2;

      if (width > height)
         size /= height;
      else
         size /= width;

      return screenScale .set (size, size, size);
   },
   getViewportSize: (() =>
   {
      const viewportSize = new Vector2 ();

      return function (viewport, nearValue)
      {
         // Returns viewport size in meters.

         const
            width  = viewport [2],
            height = viewport [3],
            size   = nearValue * Math .tan (this .getUserFieldOfView () / 2) * 2,
            aspect = width / height;

         if (aspect > 1)
            return viewportSize .set (size * aspect, size);

         return viewportSize .set (size, size / aspect);
      };
   })(),
   getLookAtDistance (bbox)
   {
      return (bbox .size .magnitude () / 2) / Math .tan (this .getUserFieldOfView () / 2);
   },
   getProjectionMatrixWithLimits (nearValue, farValue, viewport)
   {
      return Camera .perspective (this .getUserFieldOfView (), nearValue, farValue, viewport [2], viewport [3], this .projectionMatrix);
   },
});

Object .defineProperties (Viewpoint,
{
   ... X3DNode .getStaticProperties ("Viewpoint", "Navigation", 1, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_bind",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",       new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",          new Fields .SFVec3f (0, 0, 10)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",       new Fields .SFRotation ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "centerOfRotation",  new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "fieldOfView",       new Fields .SFFloat (0.785398)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "nearDistance",      new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "farDistance",       new Fields .SFFloat (-1)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "viewAll",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "jump",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "retainUserOffsets", new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "isBound",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "bindTime",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "navigationInfo",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default Viewpoint;
