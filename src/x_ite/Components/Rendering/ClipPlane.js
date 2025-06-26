import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector4              from "../../../standard/Math/Numbers/Vector4.js";
import Plane3               from "../../../standard/Math/Geometry/Plane3.js";
import ObjectCache          from "../../../standard/Utility/ObjectCache.js";

const ClipPlanes = ObjectCache (ClipPlaneContainer);

function ClipPlaneContainer ()
{
   this .plane     = new Plane3 ();
   this .planeView = new Plane3 ();
}

Object .assign (ClipPlaneContainer .prototype,
{
   isClipped (point)
   {
      return this .plane .getDistanceToPoint (point) < 0;
   },
   set (clipPlane, modelViewMatrix)
   {
      const
         plane      = this .plane,
         localPlane = clipPlane .plane;

      plane .normal .assign (localPlane);
      plane .distanceFromOrigin = -localPlane .w;

      plane .multRight (modelViewMatrix);
   },
   setShaderUniforms (gl, shaderObject, renderObject)
   {
      const view = renderObject ?.getView ();

      const plane = view
         ? this .planeView .assign (this .plane) .multRight (view .matrix)
         : this .plane;

      gl .uniform4f (shaderObject .x3d_ClipPlane [shaderObject .numClipPlanes ++], ... plane .normal, plane .distanceFromOrigin);
   },
   dispose ()
   {
      ClipPlanes .push (this);
   },
});

function ClipPlane (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .ClipPlane);

   this .enabled = false;
   this .plane   = new Vector4 ();
}

Object .assign (Object .setPrototypeOf (ClipPlane .prototype, X3DChildNode .prototype),
{
   getClipPlaneKey ()
   {
      return 0;
   },
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._enabled .addInterest ("set_enabled__", this);
      this ._plane   .addInterest ("set_enabled__", this);

      this .set_enabled__ ();
   },
   set_enabled__ ()
   {
      this .plane .assign (this ._plane .getValue ());

      this .enabled = this ._enabled .getValue () && ! this .plane .equals (Vector4 .Zero);
   },
   push (renderObject)
   {
      if (this .enabled)
      {
         const clipPlaneContainer = ClipPlanes .pop ();

         clipPlaneContainer .set (this, renderObject .getModelViewMatrix () .get ());

         renderObject .getLocalObjects ()     .push (clipPlaneContainer);
         renderObject .getLocalObjectsKeys () .push (this .getClipPlaneKey ());
      }
   },
   pop (renderObject)
   {
      if (this .enabled)
      {
         this .getBrowser () .getLocalObjects () .push (renderObject .getLocalObjects () .pop ());
         renderObject .getLocalObjectsKeys () .pop ();
      }
   },
});

Object .defineProperties (ClipPlane,
{
   ... X3DNode .getStaticProperties ("ClipPlane", "Rendering", 5, "children", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "plane",    new Fields .SFVec4f (0, 1, 0, 0)),
      ]),
      enumerable: true,
   },
});

export default ClipPlane;
