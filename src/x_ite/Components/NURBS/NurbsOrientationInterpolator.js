import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import NurbsCurve           from "./NurbsCurve.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Rotation4            from "../../../standard/Math/Numbers/Rotation4.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import nurbs                from "../../../lib/nurbs/nurbs.js";

function NurbsOrientationInterpolator (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsOrientationInterpolator);

   this .geometry = new NurbsCurve (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsOrientationInterpolator .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._order        .addFieldInterest (this .geometry ._order);
      this ._knot         .addFieldInterest (this .geometry ._knot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._tessellation = 1;
      this .geometry ._order        = this ._order;
      this .geometry ._knot         = this ._knot;
      this .geometry ._weight       = this ._weight;
      this .geometry ._controlPoint = this ._controlPoint;

      this .geometry ._rebuild .addInterest ("set_geometry__", this);
      this .geometry .setup ();

      this .set_geometry__ ();
   },
   set_geometry__ ()
   {
      const surface = this .geometry .getSurface ();

      if (surface)
      {
         delete this .set_fraction__;

         this .derivative = surface .evaluator (1);
      }
      else
      {
         this .set_fraction__ = Function .prototype;
      }
   },
   set_fraction__: (() =>
   {
      const
         direction = new Vector3 (),
         rotation  = new Rotation4 ();

      return function ()
      {
         const
            fraction = Algorithm .clamp (this ._set_fraction .getValue (), 0, 1),
            surface  = this .geometry .getSurface (),
            uDomain  = surface .domain [0],
            u        = Algorithm .project (fraction, 0, 1, ... uDomain);

         this .derivative (direction, u);

         this ._value_changed = rotation .setFromToVec (Vector3 .zAxis, direction);
      };
   })(),
});

Object .defineProperties (NurbsOrientationInterpolator,
{
   ... X3DNode .getStaticProperties ("NurbsOrientationInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,   "set_fraction",  new Fields .SFFloat ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "order",         new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "knot",          new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weight",        new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "controlPoint",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,  "value_changed", new Fields .SFRotation ()),
      ]),
      enumerable: true,
   },
});

export default NurbsOrientationInterpolator;
