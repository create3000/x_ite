import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DNode              from "../Core/X3DNode.js";
import X3DChildNode         from "../Core/X3DChildNode.js";
import NurbsPatchSurface    from "./NurbsPatchSurface.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Vector3              from "../../../standard/Math/Numbers/Vector3.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";

function NurbsSurfaceInterpolator (executionContext)
{
   X3DChildNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsSurfaceInterpolator);

   this .geometry = new NurbsPatchSurface (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSurfaceInterpolator .prototype, X3DChildNode .prototype),
{
   initialize ()
   {
      X3DChildNode .prototype .initialize .call (this);

      this ._set_fraction .addInterest ("set_fraction__", this);

      this ._uOrder       .addFieldInterest (this .geometry ._uOrder);
      this ._vOrder       .addFieldInterest (this .geometry ._vOrder);
      this ._uDimension   .addFieldInterest (this .geometry ._uDimension);
      this ._vDimension   .addFieldInterest (this .geometry ._vDimension);
      this ._uKnot        .addFieldInterest (this .geometry ._uKnot);
      this ._vKnot        .addFieldInterest (this .geometry ._vKnot);
      this ._weight       .addFieldInterest (this .geometry ._weight);
      this ._controlPoint .addFieldInterest (this .geometry ._controlPoint);

      this .geometry ._uTessellation = 1;
      this .geometry ._vTessellation = 1;
      this .geometry ._uOrder        = this ._uOrder;
      this .geometry ._vOrder        = this ._vOrder;
      this .geometry ._uDimension    = this ._uDimension;
      this .geometry ._vDimension    = this ._vDimension;
      this .geometry ._uKnot         = this ._uKnot;
      this .geometry ._vKnot         = this ._vKnot;
      this .geometry ._weight        = this ._weight;
      this .geometry ._controlPoint  = this ._controlPoint;

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

         this .uDerivative = surface .evaluator ([1, 0]);
         this .vDerivative = surface .evaluator ([0, 1]);
      }
      else
      {
         this .set_fraction__ = Function .prototype;
      }
   },
   set_fraction__: (() =>
   {
      const
         uVector  = new Vector3 (),
         vVector  = new Vector3 (),
         position = new Vector3 ();

      return function ()
      {
         const
            fraction  = this ._set_fraction .getValue (),
            uFraction = Algorithm .clamp (fraction .x, 0, 1),
            vFraction = Algorithm .clamp (fraction .y, 0, 1),
            surface   = this .geometry .getSurface (),
            uDomain   = surface .domain [0],
            vDomain   = surface .domain [1],
            u         = Algorithm .project (uFraction, 0, 1, ... uDomain),
            v         = Algorithm .project (vFraction, 0, 1, ... vDomain);

         this .uDerivative (uVector, u, v);
         this .vDerivative (vVector, u, v);
         surface .evaluate (position, u, v);

         this ._normal_changed   = uVector .cross (vVector);
         this ._position_changed = position;
      };
   })(),
});

Object .defineProperties (NurbsSurfaceInterpolator,
{
   ... X3DNode .getStaticProperties ("NurbsSurfaceInterpolator", "NURBS", 1, "children", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_fraction",     new Fields .SFVec2f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vOrder",           new Fields .SFInt32 (3)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vDimension",       new Fields .SFInt32 ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "uKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "vKnot",            new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "weight",           new Fields .MFDouble ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "controlPoint",     new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "normal_changed",   new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "position_changed", new Fields .SFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default NurbsSurfaceInterpolator;
