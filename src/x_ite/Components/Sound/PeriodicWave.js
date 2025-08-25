import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DSoundNode         from "./X3DSoundNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function PeriodicWave (executionContext)
{
   X3DSoundNode .call (this, executionContext);

   this .addType (X3DConstants .PeriodicWave);

   this .real = new Float32Array (2);
   this .imag = new Float32Array (2);
}

Object .assign (Object .setPrototypeOf (PeriodicWave .prototype, X3DSoundNode .prototype),
{
   createPeriodicWave ()
   {
      const
         audioContext = this .getBrowser () .getAudioContext (),
         optionsReal  = this ._optionsReal .shrinkToFit (),
         optionsImag  = this ._optionsImag .shrinkToFit (),
         length       = Math .max (optionsReal .length, optionsImag .length, 2);

      if (this .real .length !== length)
      {
         this .real = new Float32Array (length);
         this .imag = new Float32Array (length);
      }

      this .real .set (optionsReal);
      this .imag .set (optionsImag);

      return audioContext .createPeriodicWave (this .real, this .imag);
   },
});

Object .defineProperties (PeriodicWave,
{
   ... X3DNode .getStaticProperties ("PeriodicWave", "Sound", 2, "periodicWave", "4.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "description",   new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",       new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "type",          new Fields .SFString ("SQUARE")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "optionsReal",   new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "optionsImag",   new Fields .MFFloat ()),
      ]),
      enumerable: true,
   },
});

export default PeriodicWave;
