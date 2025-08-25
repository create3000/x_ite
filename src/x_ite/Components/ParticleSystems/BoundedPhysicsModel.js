import Fields                      from "../../Fields.js";
import X3DFieldDefinition          from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray        from "../../Base/FieldDefinitionArray.js";
import X3DNode                     from "../Core/X3DNode.js";
import X3DParticlePhysicsModelNode from "./X3DParticlePhysicsModelNode.js";
import X3DConstants                from "../../Base/X3DConstants.js";
import X3DCast                     from "../../Base/X3DCast.js";

function BoundedPhysicsModel (executionContext)
{
   X3DParticlePhysicsModelNode .call (this, executionContext);

   this .addType (X3DConstants .BoundedPhysicsModel);
}

Object .assign (Object .setPrototypeOf (BoundedPhysicsModel .prototype, X3DParticlePhysicsModelNode .prototype),
{
   initialize ()
   {
      X3DParticlePhysicsModelNode .prototype .initialize .call (this);

      this ._geometry .addInterest ("set_geometry__", this);

      this .set_geometry__ ();
   },
   getBBox ()
   {
      return this .geometryNode ?.getBBox ();
   },
   set_geometry__ ()
   {
      this .geometryNode ?._rebuild .removeInterest ("addNodeEvent", this);

      this .geometryNode = X3DCast (X3DConstants .X3DGeometryNode, this ._geometry);

      this .geometryNode ?._rebuild .addInterest ("addNodeEvent", this);
   },
   addGeometry (boundedNormals, boundedVertices)
   {
      if (!this .geometryNode)
         return;

      if (!this ._enabled .getValue ())
         return;

      const
         damping  = this ._damping .getValue (),
         normals  = this .geometryNode .getNormals ()  .getValue (),
         vertices = this .geometryNode .getVertices () .getValue ();

      for (const value of normals)
         boundedNormals .push (value * damping);

      for (const value of vertices)
         boundedVertices .push (value);
   },
});

Object .defineProperties (BoundedPhysicsModel,
{
   ... X3DNode .getStaticProperties ("BoundedPhysicsModel", "ParticleSystems", 2, "physics", "3.2"),
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "damping",  new Fields .SFFloat (1)), // skip test
         new X3DFieldDefinition (X3DConstants .inputOutput, "geometry", new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default BoundedPhysicsModel;
