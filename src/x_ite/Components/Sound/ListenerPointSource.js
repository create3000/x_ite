import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Matrix4              from "../../../standard/Math/Numbers/Matrix4.js";

function ListenerPointSource (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .ListenerPointSource);

   this .setVisibleObject (true);

   // Units

   this ._position .setUnit ("length");
}

Object .assign (Object .setPrototypeOf (ListenerPointSource .prototype, X3DSoundNode .prototype),
{
   initialize ()
   {
      X3DSoundNode .prototype .initialize .call (this);

      this ._enabled          .addInterest ("set_trackCurrentView__", this)
      this ._trackCurrentView .addInterest ("set_trackCurrentView__", this);

      this .set_trackCurrentView__ ();
   },
   set_trackCurrentView__ ()
   {
      if (!this ._enabled .getValue ())
         return;

      if (!this ._trackCurrentView .getValue ())
         return;

      const
         audioContext = this .getBrowser () .getAudioContext (),
         listener     = audioContext .listener;

      listener .positionX .value = 0;
      listener .positionY .value = 0;
      listener .positionZ .value = 0;

      listener .forwardX .value = 0;
      listener .forwardY .value = 0;
      listener .forwardZ .value = -1;

      listener .upX .value = 0;
      listener .upY .value = 1;
      listener .upZ .value = 0;
   },
   traverse: (() =>
   {
      const
         position        = new Vector3 (),
         orientation     = new Rotation4 (),
         modelViewMatrix = new Matrix4 (),
         forwardVector   = new Vector3 (),
         upVector        = new Vector3 ();

      return function (type, renderObject)
      {
         if (!this ._enabled .getValue ())
            return;

         if (this ._trackCurrentView .getValue ())
            return;

         const
            audioContext = this .getBrowser () .getAudioContext (),
            listener     = audioContext .listener;

         modelViewMatrix
            .assign (renderObject .getModelViewMatrix () .get ())
            .translate (this ._position .getValue ())
            .rotate (this ._orientation .getValue ())
            .get (position, orientation);

         orientation .multVecRot (forwardVector .assign (Vector3 .zAxis) .negate ()) .normalize ();
         orientation .multVecRot (upVector .assign (Vector3 .yAxis)) .normalize ();

         listener .positionX .value = position .x;
         listener .positionY .value = position .y;
         listener .positionZ .value = position .z;

         listener .forwardX .value = forwardVector .x;
         listener .forwardY .value = forwardVector .y;
         listener .forwardZ .value = forwardVector .z;

         listener .upX .value = upVector .x;
         listener .upY .value = upVector .y;
         listener .upZ .value = upVector .z;
      };
   })(),
});

Object .defineProperties (ListenerPointSource,
{
   ... X3DNode .getStaticProperties ("ListenerPointSource", "Sound", 2, "children", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",              new Fields .SFBool (true)),

         new X3DFieldDefinition (X3DConstants .inputOutput, "trackCurrentView",     new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "position",             new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "orientation",          new Fields .SFRotation ()),

         new X3DFieldDefinition (X3DConstants .inputOutput, "interauralDistance",   new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "dopplerEnabled",       new Fields .SFBool ()),
      ]),
      enumerable: true,
   },
});

export default ListenerPointSource;
