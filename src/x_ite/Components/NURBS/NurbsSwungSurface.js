import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import Extrusion                 from "../Geometry3D/Extrusion.js";
import X3DNode                   from "../Core/X3DNode.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import X3DCast                   from "../../Base/X3DCast.js";

function NurbsSwungSurface (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsSwungSurface);

   this .extrusion = new Extrusion (executionContext);
}

Object .assign (Object .setPrototypeOf (NurbsSwungSurface .prototype, X3DParametricGeometryNode .prototype),
{
   initialize ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._profileCurve    .addInterest ("set_profileCurve__",    this);
      this ._trajectoryCurve .addInterest ("set_trajectoryCurve__", this);

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

      this .set_profileCurve__ ();
      this .set_trajectoryCurve__ ();
   },
   getTrajectoryCurve ()
   {
      return this .trajectoryCurveNode;
   },
   set_profileCurve__ ()
   {
      this .profileCurveNode ?.removeInterest ("requestRebuild", this);

      this .profileCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._profileCurve);

      this .profileCurveNode ?.addInterest ("requestRebuild", this);
   },
   set_trajectoryCurve__ ()
   {
      this .trajectoryCurveNode ?.removeInterest ("requestRebuild", this);

      this .trajectoryCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._trajectoryCurve);

      this .trajectoryCurveNode ?.addInterest ("requestRebuild", this);
   },
   build ()
   {
      if (!this .profileCurveNode)
         return;

      if (!this .trajectoryCurveNode)
         return;

      const extrusion = this .extrusion;

      extrusion ._crossSection = this .profileCurveNode    .tessellate (0);
      extrusion ._spine        = this .trajectoryCurveNode .tessellate (1);

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

Object .defineProperties (NurbsSwungSurface,
{
   ... X3DNode .getStaticProperties ("NurbsSwungSurface", "NURBS", 3, "geometry", "3.0"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "profileCurve",    new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default NurbsSwungSurface;
