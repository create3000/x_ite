import Fields       from "../../Fields.js";
import X3DNode      from "../Core/X3DNode.js";
import X3DConstants from "../../Base/X3DConstants.js";
import ObjectCache  from "../../../standard/Utility/ObjectCache.js";

const Fogs = ObjectCache (FogContainer);

function FogContainer ()
{
   this .fogMatrix = new Float32Array (9);
}

Object .assign (FogContainer .prototype,
{
   set (fogNode, modelViewMatrix)
   {
      this .fogNode = fogNode;

      this .fogMatrix .set (modelViewMatrix .submatrix .inverse ());
   },
   getFogType ()
   {
      return this .fogNode .getFogType ();
   },
   setShaderUniforms (gl, shaderObject)
   {
      if (shaderObject .hasFog (this))
         return;

      const fogNode = this .fogNode;

      gl .uniform3fv       (shaderObject .x3d_FogColor,           fogNode .colorArray);
      gl .uniform1f        (shaderObject .x3d_FogVisibilityStart, fogNode .visibilityStart);
      gl .uniform1f        (shaderObject .x3d_FogVisibilityRange, fogNode .visibilityRange);
      gl .uniformMatrix3fv (shaderObject .x3d_FogMatrix, false,   this .fogMatrix);
   },
   dispose ()
   {
      Fogs .push (this);
   },
});

function X3DFogObject (executionContext)
{
   this .addType (X3DConstants .X3DFogObject);

   this .addChildObjects (X3DConstants .inputOutput, "hidden", new Fields .SFBool ());

   // Units

   this ._visibilityRange .setUnit ("length");

   // Private properties

   this .colorArray = new Float32Array (3);
}

Object .assign (X3DFogObject .prototype,
{
   initialize ()
   {
      this ._hidden          .addInterest ("set_fogType__",         this);
      this ._fogType         .addInterest ("set_fogType__",         this);
      this ._color           .addInterest ("set_color__",           this);
      this ._visibilityStart .addInterest ("set_visibilityRange__", this);
      this ._visibilityRange .addInterest ("set_visibilityRange__", this);

      this .set_color__ ();
      this .set_visibilityRange__ ();
   },
   isHidden ()
   {
      return this ._hidden .getValue ();
   },
   setHidden (value)
   {
      if (value === this ._hidden .getValue ())
         return;

      this ._hidden = value;
   },
   getFogType ()
   {
      return this .fogType;
   },
   getFogs ()
   {
      return Fogs;
   },
   set_fogType__: (() =>
   {
      const fogTypes = new Map ([
         ["LINEAR",      1],
         ["EXPONENTIAL", 2],
      ]);

      return function ()
      {
         if (this ._hidden .getValue () || (this .visibilityRange === 0 && this .visibilityStart === 0))
            this .fogType = 0;
         else
            this .fogType = fogTypes .get (this ._fogType .getValue ()) || 1;
      };
   })(),
   set_color__ ()
   {
      this .colorArray .set (this ._color .getValue ());
   },
   set_visibilityRange__ ()
   {
      this .visibilityStart = Math .max (this ._visibilityStart .getValue (), 0);
      this .visibilityRange = Math .max (this ._visibilityRange .getValue (), 0);

      this .set_fogType__ ();
   },
   dispose () { },
});

Object .defineProperties (X3DFogObject, X3DNode .getStaticProperties ("X3DFogObject", "EnvironmentalEffects", 1));

export default X3DFogObject;
