import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import Extrusion                 from "../Geometry3D/Extrusion.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import X3DCast                   from "../../Base/X3DCast.js";

function NurbsSweptSurface (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsSweptSurface);

   this .extrusion = new Extrusion (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSweptSurface .prototype, X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._crossSectionCurve .addInterest ("set_crossSectionCurve__", this);
      this ._trajectoryCurve   .addInterest ("set_trajectoryCurve__",   this);

      const extrusion = this .extrusion;

      extrusion ._beginCap     = false;
      extrusion ._endCap       = false;
      extrusion ._solid        = true;
      extrusion ._ccw          = true;
      extrusion ._convex       = true;
      extrusion ._creaseAngle  = Math .PI;

      extrusion .setup ();

      extrusion ._crossSection .setTainted (true);
      extrusion ._spine        .setTainted (true);

      this .set_crossSectionCurve__ ();
      this .set_trajectoryCurve__ ();
   },
   getTrajectoryCurve ()
   {
      return this .trajectoryCurveNode;
   },
   set_crossSectionCurve__ ()
   {
      this .crossSectionCurveNode ?.removeInterest ("requestRebuild", this);

      this .crossSectionCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._crossSectionCurve);

      this .crossSectionCurveNode ?.addInterest ("requestRebuild", this);
   },
   set_trajectoryCurve__ ()
   {
      this .trajectoryCurveNode ?._rebuild .removeInterest ("requestRebuild", this);

      this .trajectoryCurveNode = X3DCast (X3DConstants .NurbsCurve, this ._trajectoryCurve);

      this .trajectoryCurveNode ?._rebuild .addInterest ("requestRebuild", this);
   },
   build ()
   {
      if (!this .crossSectionCurveNode)
         return;

      if (!this .trajectoryCurveNode)
         return;

      const extrusion = this .extrusion;

      extrusion ._crossSection = this .crossSectionCurveNode .tessellate (0);
      extrusion ._spine        = this .trajectoryCurveNode   .tessellate (0);

      extrusion .rebuild ();

      this .getColors ()    .assign (extrusion .getColors ());
      this .getTexCoords () .assign (extrusion .getTexCoords ());
      this .getTangents ()  .assign (extrusion .getTangents ());
      this .getNormals ()   .assign (extrusion .getNormals ());
      this .getVertices ()  .assign (extrusion .getVertices ());

      this .getMultiTexCoords () .push (this .getTexCoords ());

      if (!this ._ccw .getValue ())
      {
         const
            normalsArray = this .getNormals (),
            numNormals   = normalsArray .length;

         for (let i = 0; i < numNormals; ++ i)
            normalsArray [i] *= -1;
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (NurbsSweptSurface,
{
   ... X3DNode .getStaticProperties ("NurbsSweptSurface", "NURBS", 3, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSectionCurve", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve",   new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default NurbsSweptSurface;
