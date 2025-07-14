import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DInterpolatorNode  from "./X3DInterpolatorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Color3               from "../../../standard/Math/Numbers/Color3.js";

function ColorInterpolator (executionContext)
{
   X3DInterpolatorNode .call (this, executionContext);

   this .addType (X3DConstants .ColorInterpolator);

   this .hsv = [ ];
}

Object .assign (Object .setPrototypeOf (ColorInterpolator .prototype, X3DInterpolatorNode .prototype),
{
   initialize ()
   {
      X3DInterpolatorNode .prototype .initialize .call (this);

      this ._keyValue .addInterest ("set_keyValue__", this);
   },
   set_keyValue__ ()
   {
      const keyValue = this ._keyValue;

      if (keyValue .length < this ._key .length)
         this ._keyValue .resize (this ._key .length, keyValue .length ? keyValue [this ._keyValue .length - 1] : new Fields .SFColor ());

      this .hsv .length = 0;

      for (const value of keyValue)
         this .hsv .push (value .getHSV ());

      if (this ._set_fraction .getModificationTime () >= this .getBrowser () .getCurrentTime ())
         this .set_fraction__ ();
   },
   interpolate: (() =>
   {
      const value = [ ];

      return function (index0, index1, weight)
      {
         Color3 .lerp (this .hsv [index0], this .hsv [index1], weight, value);

         this ._value_changed .setHSV (value [0], value [1], value [2]);
      };
   })(),
});

Object .defineProperties (ColorInterpolator,
{
   ... X3DNode .getStaticProperties ("ColorInterpolator", "Interpolation", 2, "children", "2.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "key",           new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "keyValue",      new Fields .MFColor ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFColor ()),
      ]),
      enumerable: true,
   },
});

export default ColorInterpolator;
